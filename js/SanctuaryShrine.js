// js/SanctuaryShrine.js
// The resurrection orb above the altar of a Sanctuary room: a huge golden orb
// that floats, bobs gently and sheds golden light. Appears only when a player
// character is dead; clicking it spends 2 mana/charges from the living
// character to bring the fallen ally back at full health and starting mana.
//
// Like SanctuaryShop items, it is a clickable "prop": GameController finds it
// with pickAt(), shows getInfo() in the disc-info popup, and calls activate()
// on click when canActivate() is true.

import {
  AdditiveBlending, BackSide, CanvasTexture, CircleGeometry, Group, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, PointLight, SphereGeometry, Vector3,
} from 'three';
import { getResource, formatAmount, isMainPC } from './PartyResources.js';

const RESURRECT_COST = 2;
const ORB_RADIUS = 1.6;
const FLOAT_HEIGHT = 4.6;   // orb centre above the floor (high enough for its shadow to show)
const BOB_AMPLITUDE = 0.25;
const BOB_SPEED = 1.6;      // radians per second
const GOLD = 0xffc53d;
const SHADOW_RADIUS = ORB_RADIUS * 1.7;
const SHADOW_OPACITY = 0.9;
const LIGHT_INTENSITY = 45;
const VANISH_DURATION = 0.7; // seconds for the orb to shrink away after a resurrection
const VANISH_SWELL = 0.12;   // it first swells by this much before shrinking

/** A soft round shadow: black in the middle fading to transparent at the edge. */
function makeShadowTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(0,0,0,1)');
  g.addColorStop(0.55, 'rgba(0,0,0,0.85)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
}

export class SanctuaryShrine {
  constructor(gc) {
    this.gc = gc;
    this.mesh = null;       // Group: orb + halo + light
    this._orb = null;
    this._shadow = null;    // blob shadow on the floor (doesn't bob with the orb)
    this._bobTime = 0;
  }

  /** Call after the Sanctuary's discs are spawned. Places the orb if an ally is dead. */
  setup() {
    this.teardown();
    const level = this.gc.level;
    if (!level || !level.isSanctuary || !this._getDeadAlly()) return;

    this._orb = new Mesh(
      new SphereGeometry(ORB_RADIUS, 48, 32),
      new MeshStandardMaterial({
        color: GOLD, emissive: 0xffa800, emissiveIntensity: 0.9, metalness: 0.6, roughness: 0.25,
      }),
    );
    // Soft glow shell around the orb.
    const halo = new Mesh(
      new SphereGeometry(ORB_RADIUS * 1.35, 32, 24),
      new MeshBasicMaterial({
        color: GOLD, transparent: true, opacity: 0.18, side: BackSide,
        depthWrite: false, blending: AdditiveBlending,
      }),
    );
    const light = new PointLight(0xffc040, LIGHT_INTENSITY, 20, 1.6);
    this._light = light;
    this._vanishElapsed = null;

    this.mesh = new Group();
    this.mesh.add(this._orb, halo, light);
    const altar = level.altarPosition || { x: 0, z: 0 };
    this.mesh.position.set(altar.x, FLOAT_HEIGHT, altar.z);
    this.gc.scene.add(this.mesh);

    // Shadow straight down on the floor, to show the orb is floating.
    this._shadow = new Mesh(
      new CircleGeometry(SHADOW_RADIUS, 48),
      new MeshBasicMaterial({
        map: makeShadowTexture(), transparent: true, opacity: SHADOW_OPACITY, depthWrite: false,
      }),
    );
    this._shadow.rotation.x = -Math.PI / 2;
    this._shadow.position.set(altar.x, 0.03, altar.z);
    this.gc.scene.add(this._shadow);
    this._bobTime = 0;

    // The orb's heartbeat loops for as long as the orb is here.
    if (this.gc.soundManager) {
      this.gc.soundManager.startHeartbeat(new Vector3(altar.x, 0, altar.z));
    }
  }

  /**
   * Bobs the orb gently up and down; its shadow tightens as it dips. While
   * vanishing, the orb (with its light and shadow) swells slightly and then
   * shrinks to nothing. Call every frame.
   */
  update(deltaTime) {
    if (!this.mesh) return;
    this._bobTime += deltaTime;
    const bob = Math.sin(this._bobTime * BOB_SPEED); // -1 (low) … 1 (high)
    this.mesh.position.y = FLOAT_HEIGHT + bob * BOB_AMPLITUDE;

    let size = 1;
    if (this._vanishElapsed !== null) {
      this._vanishElapsed += deltaTime;
      const t = Math.min(this._vanishElapsed / VANISH_DURATION, 1);
      // Swell over the first 20%, then shrink with an accelerating ease-in.
      size = t < 0.2
        ? 1 + VANISH_SWELL * Math.sin((t / 0.2) * Math.PI / 2)
        : (1 + VANISH_SWELL) * (1 - ((t - 0.2) / 0.8) ** 2);
      if (t >= 1) { this.teardown(); return; }
    }
    this.mesh.scale.setScalar(size);
    this._light.intensity = LIGHT_INTENSITY * Math.min(size, 1);
    this._shadow.scale.setScalar((1 + bob * 0.06) * size);
    this._shadow.material.opacity = SHADOW_OPACITY * (1 - bob * 0.12) * Math.min(size, 1);
  }

  /** Starts the shrink-away animation; the orb removes itself when it finishes. */
  _vanish() {
    if (!this.mesh || this._vanishElapsed !== null) return;
    this._vanishElapsed = 0;
    if (this.gc.soundManager) this.gc.soundManager.stopHeartbeat();
  }

  /** Removes the orb and its shadow and stops its heartbeat. Call before Level.unload(). */
  teardown() {
    if (!this.mesh) return;
    if (this.gc.soundManager) this.gc.soundManager.stopHeartbeat();
    for (const object of [this.mesh, this._shadow]) {
      this.gc.scene.remove(object);
      object.traverse(o => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (o.material.map) o.material.map.dispose();
          o.material.dispose();
        }
      });
    }
    this.mesh = null;
    this._orb = null;
    this._shadow = null;
  }

  /** @returns {SanctuaryShrine|null} this prop if the ray hits the orb. */
  pickAt(raycaster) {
    if (!this._orb || this._vanishElapsed !== null) return null; // not clickable while vanishing
    return raycaster.intersectObject(this._orb, false).length > 0 ? this : null;
  }

  /** Title, cost line and description for the shared disc-info popup. */
  getInfo() {
    const ally = this._getDeadAlly();
    const payer = this._getPayer();
    const res = payer && getResource(this.gc, payer.kind);
    const allyName = ally ? ally.discName : 'your fallen ally';

    let description =
      `The Big Golden Orb can bring back the fallen. Spend ${RESURRECT_COST} mana or charges ` +
      `to resurrect ${allyName} with full health and their starting mana or charges. ` +
      `Any items they had are lost.`;
    if (payer && res) {
      description += `\n\n${payer.discName} has ${formatAmount(res, res.controller[res.field])}.`;
      description += this.canActivate() ? ' Click to resurrect.' : ` Not enough ${res.units} yet.`;
    }
    const cost = `Costs ${res ? formatAmount(res, RESURRECT_COST) : `${RESURRECT_COST} mana`}`;
    return { name: 'Big Golden Orb', cost, description };
  }

  canActivate() {
    const payer = this._getPayer();
    const res = payer && getResource(this.gc, payer.kind);
    return !!res && !!this._getDeadAlly() && res.controller[res.field] >= RESURRECT_COST;
  }

  activate() {
    if (!this.canActivate()) return;
    const ally = this._getDeadAlly();
    const payerRes = getResource(this.gc, this._getPayer().kind);
    payerRes.controller[payerRes.field] -= RESURRECT_COST;

    this.gc.itemManager?.discardSetAside(ally.kind); // the orb doesn't return their items
    ally.revive(ally.maxHitPoints);
    const allyRes = getResource(this.gc, ally.kind);
    if (allyRes) allyRes.controller[allyRes.field] = allyRes.start;

    if (this.gc.soundManager) {
      this.gc.soundManager.playBreath(ally.mesh.position.clone());
    }

    this._vanish();
    this.gc.updateDiscNames();
    this.gc._updateSpotlights();
  }

  _getDeadAlly() {
    return this.gc.discs.find(d => isMainPC(d) && d.dead) || null;
  }

  _getPayer() {
    return this.gc.discs.find(d => isMainPC(d) && !d.dead) || null;
  }
}
