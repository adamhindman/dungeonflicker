// js/SanctuaryHealing.js
// The Sanctuary's healing font: the character whose turn it is can spend one
// of their own mana/charges to restore themselves to full health.
//
// A clickable "prop" (see SanctuaryShrine): GameController finds it with
// pickAt(), shows getInfo() in the disc-info popup, and calls activate() on
// click when canActivate() is true.

import {
  CylinderGeometry, Group, LatheGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, SphereGeometry,
  TorusGeometry, Vector2,
} from 'three';
import { getResource, formatAmount } from './PartyResources.js';

const COST = 1;
const STONE_COLOR = 0x6e6a64;
const GILT_COLOR = 0xd9a93a;    // gold trim
const WATER_COLOR = 0xff4a6e;   // the Healing Orb's red
const PULSE_SPEED = 2;          // radians per second
const HIT_RADIUS = 2;           // generous invisible hover/click target
const HIT_HEIGHT = 2.4;

// The fountain, from the floor up: two stepped octagonal plinths, then a stem
// that flares into a wide basin (spun from the profile below), a gilded rim,
// glowing water, and a slim spout topped by a glowing orb.
const STEPS = [                  // [radius, height] of each plinth, bottom first
  [2.0, 0.16],
  [1.65, 0.16],
];
const STEPS_TOP = STEPS.reduce((y, [, h]) => y + h, 0);
// (radius, height above the plinths): the outside of the stem and basin up to
// the rim, then back down the inside to the basin floor.
const BASIN_PROFILE = [
  [0, 0], [1.05, 0], [0.95, 0.08], [0.6, 0.2], [0.44, 0.36], [0.4, 0.62], [0.48, 0.72],
  [0.8, 0.82], [1.3, 0.96], [1.58, 1.1], [1.62, 1.22], [1.48, 1.24], [1.36, 1.12], [0, 1.06],
];
const RIM_RADIUS = 1.56;
const RIM_HEIGHT = STEPS_TOP + 1.23;
const WATER_RADIUS = 1.4;
const WATER_HEIGHT = STEPS_TOP + 1.14;
const SPOUT_HEIGHT = 0.6;       // above the water
const ORB_RADIUS = 0.18;
const FINIAL_RADIUS = 0.13;     // gilded orbs on the lower step

export class SanctuaryHealing {
  constructor(gc) {
    this.gc = gc;
    this.mesh = null;
    this._water = null;
    this._orb = null;
    this._time = 0;
    this.prop = {
      getInfo: () => this._getInfo(),
      canActivate: () => !this._blocker(this._user()),
      activate: () => this._heal(),
    };
  }

  /** Call after the Sanctuary's discs are spawned. */
  setup() {
    this.teardown();
    const pos = this.gc.level?.isSanctuary && this.gc.level.healingPosition;
    if (!pos) return;

    this.mesh = new Group();
    this.mesh.position.set(pos.x, 0, pos.z);
    const stone = () => new MeshStandardMaterial({ color: STONE_COLOR, roughness: 0.8 });
    const gilt = () => new MeshStandardMaterial({
      color: GILT_COLOR, metalness: 0.8, roughness: 0.3, emissive: 0x7a5410, emissiveIntensity: 0.8,
    });
    // Mostly self-lit so the water glows in the dim Sanctuary lighting.
    const glow = () => new MeshStandardMaterial({ color: WATER_COLOR, emissive: WATER_COLOR, emissiveIntensity: 0.8 });

    // Stepped octagonal plinths.
    let y = 0;
    for (const [radius, height] of STEPS) {
      const step = new Mesh(new CylinderGeometry(radius, radius, height, 8), stone());
      step.position.y = y + height / 2;
      this.mesh.add(step);
      y += height;
    }
    // Gilded orbs on four corners of the lower step.
    const [lowerRadius, lowerHeight] = STEPS[0];
    for (let i = 0; i < 4; i++) {
      const angle = Math.PI / 8 + i * Math.PI / 2;
      const finial = new Mesh(new SphereGeometry(FINIAL_RADIUS, 12, 8), gilt());
      const r = lowerRadius * 0.88;
      finial.position.set(Math.sin(angle) * r, lowerHeight + FINIAL_RADIUS, Math.cos(angle) * r);
      this.mesh.add(finial);
    }

    // Stem and basin.
    const basin = new Mesh(new LatheGeometry(BASIN_PROFILE.map(([r, h]) => new Vector2(r, h)), 40), stone());
    basin.position.y = STEPS_TOP;
    this.mesh.add(basin);
    const rim = new Mesh(new TorusGeometry(RIM_RADIUS, 0.06, 8, 48), gilt());
    rim.rotation.x = Math.PI / 2;
    rim.position.y = RIM_HEIGHT;
    this.mesh.add(rim);

    // Water, and a spout topped by a glowing orb.
    this._water = new Mesh(new CylinderGeometry(WATER_RADIUS, WATER_RADIUS, 0.04, 40), glow());
    this._water.position.y = WATER_HEIGHT;
    this.mesh.add(this._water);
    const spout = new Mesh(new CylinderGeometry(0.06, 0.1, SPOUT_HEIGHT, 12), gilt());
    spout.position.y = WATER_HEIGHT + SPOUT_HEIGHT / 2;
    this.mesh.add(spout);
    this._orb = new Mesh(new SphereGeometry(ORB_RADIUS, 16, 12), glow());
    this._orb.position.y = WATER_HEIGHT + SPOUT_HEIGHT + ORB_RADIUS * 0.6;
    this.mesh.add(this._orb);

    const hitArea = new Mesh(
      new CylinderGeometry(HIT_RADIUS, HIT_RADIUS, HIT_HEIGHT, 16),
      new MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
    );
    hitArea.position.y = HIT_HEIGHT / 2;
    this.mesh.add(hitArea);
    this.gc.scene.add(this.mesh);
  }

  /** Removes the font from the scene. Call before Level.unload(). */
  teardown() {
    if (!this.mesh) return;
    this.gc.scene.remove(this.mesh);
    this.mesh.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) o.material.dispose();
    });
    this.mesh = null;
    this._water = null;
    this._orb = null;
  }

  /** Gently pulses the water's and the orb's glow. Call every frame. */
  update(deltaTime) {
    if (!this._water) return;
    this._time += deltaTime;
    const pulse = Math.sin(this._time * PULSE_SPEED);
    this._water.material.emissiveIntensity = 0.65 + 0.25 * pulse;
    this._orb.material.emissiveIntensity = 0.9 + 0.5 * pulse;
  }

  /** @returns {object|null} the font's prop if the ray hits it. */
  pickAt(raycaster) {
    if (!this.mesh) return null;
    return raycaster.intersectObject(this.mesh, true).length > 0 ? this.prop : null;
  }

  _user() {
    return this.gc.itemManager.activeCharacter();
  }

  /** Why `user` can't use the font right now, or null if they can. */
  _blocker(user) {
    if (!user) return 'Only the character whose turn it is can drink.';
    if (user.hitPoints >= user.maxHitPoints) return `${user.discName} is already at full health.`;
    const res = getResource(this.gc, user.kind);
    if (!res || res.controller[res.field] < COST) return `${user.discName} needs ${res ? formatAmount(res, COST) : `${COST} mana`}.`;
    return null;
  }

  _getInfo() {
    const user = this._user();
    const res = user && getResource(this.gc, user.kind);
    const cost = `Costs ${res ? formatAmount(res, COST) : `${COST} mana`}`;
    let description = 'Drink to restore your health to full.';
    if (user) {
      description += `\n\n${user.discName} has ${user.hitPoints}/${user.maxHitPoints} HP`;
      if (res) description += ` and ${formatAmount(res, res.controller[res.field])}`;
      const blocker = this._blocker(user);
      description += blocker ? `. ${blocker}` : `. Click to heal ${user.discName}.`;
    }
    return { name: 'Healing Font', cost, description };
  }

  _heal() {
    const user = this._user();
    if (this._blocker(user)) return;
    const res = getResource(this.gc, user.kind);
    res.controller[res.field] -= COST;
    user.restoreHealth(user.maxHitPoints - user.hitPoints); // shows its own "+N HP"
    this.gc.soundManager?.playPurchase();
    this.gc.updateDiscNames();
    this.gc._refreshActionUI();
  }
}
