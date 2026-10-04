// js/SanctuaryHealing.js
// The Sanctuary's healing font: the character whose turn it is can spend one
// of their own mana/charges to restore themselves to full health.
//
// A clickable "prop" (see SanctuaryShrine): GameController finds it with
// pickAt(), shows getInfo() in the disc-info popup, and calls activate() on
// click when canActivate() is true.

import { CylinderGeometry, Group, Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three';
import { getResource, formatAmount } from './PartyResources.js';

const COST = 1;
const BASIN_COLOR = 0x6e6a64;   // stone
const WATER_COLOR = 0xff4a6e;   // the Healing Orb's red
const PULSE_SPEED = 2;          // radians per second
const HIT_RADIUS = 1.4;         // generous invisible hover/click target
const HIT_HEIGHT = 1.6;

export class SanctuaryHealing {
  constructor(gc) {
    this.gc = gc;
    this.mesh = null;
    this._water = null;
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
    const basin = new Mesh(
      new CylinderGeometry(1.0, 1.2, 0.6, 32),
      new MeshStandardMaterial({ color: BASIN_COLOR, roughness: 0.8 }),
    );
    basin.position.y = 0.3;
    this.mesh.add(basin);
    // Mostly self-lit so it glows in the dim Sanctuary lighting.
    this._water = new Mesh(
      new CylinderGeometry(0.85, 0.85, 0.05, 32),
      new MeshStandardMaterial({ color: WATER_COLOR, emissive: WATER_COLOR, emissiveIntensity: 0.8 }),
    );
    this._water.position.y = 0.6;
    this.mesh.add(this._water);
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
  }

  /** Gently pulses the water's glow. Call every frame. */
  update(deltaTime) {
    if (!this._water) return;
    this._time += deltaTime;
    this._water.material.emissiveIntensity = 0.65 + 0.25 * Math.sin(this._time * PULSE_SPEED);
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
    const cost = `Costs ${res ? formatAmount(res, COST) : `${COST} mana or charge`}`;
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
