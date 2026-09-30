// js/ItemManager.js
// Items bought in the Sanctuary shop: the catalog, each character's inventory,
// the action-bar buttons for owned items, and the item behaviours.
//
// Inventories are keyed by character kind, so they carry over between rooms
// (discs are rebuilt each room) and survive death + resurrection.

import {
  AdditiveBlending, BackSide, Box3, CylinderGeometry, DoubleSide, Group, Mesh, MeshBasicMaterial,
  Plane, TorusGeometry, Vector3,
} from 'three';
import { getResource, formatAmount, isMainPC } from './PartyResources.js';

export const GHOST_OPACITY = 0.55;

/**
 * Every item the shop can offer. `cost` is the purchase price, `color` is the
 * item's unique colour (a ring's gem), and `model` picks its shop display.
 * A character can own each item once.
 */
export const ITEMS = {
  warpRing: {
    name: 'Warp Ring',
    cost: 1,
    useCost: 2,
    color: 0xff1fd2, // hot magenta
    model: 'ring',
    description: 'Instantly jump to any open spot in the room. Each use costs 2 mana or charges. ' +
      'Can be used before or after moving.',
  },
  ghostRing: {
    name: 'Ghost Ring',
    cost: 3,
    color: 0x00e5ff, // electric cyan
    model: 'ring',
    description: 'Toggle on to pass through discs and obstacles, taking and dealing no damage. ' +
      'Turning it on costs 1 HP and 1 mana or charge, and it costs the same again at the ' +
      'start of each of your turns while it stays on. Turning it off is free; it switches ' +
      'off by itself when you run out of mana or charges.',
  },
};

const WARP_RING_KEY = '6';
const GHOST_RING_KEY = '7';

// Teleport beams: same shape as the turn-start beam (tall, open, drawn from the
// inside) plus a bright additive core. Timings in seconds.
const BEAM_HEIGHT = 200;
const SHAFT_OPACITY = 0.45;
const CORE_OPACITY = 0.85;
const VANISH_DELAY = 0.12;     // disc stays visible inside the beam for a moment
const RISE_DURATION = 0.4;     // origin beam shoots up into the sky
const DESCEND_DELAY = 0.3;     // destination beam starts falling
const DESCEND_DURATION = 0.2;
const LAND_HOLD = 0.1;         // beam holds at full brightness after landing
const LAND_FADE_DURATION = 0.45;

export class ItemManager {
  constructor(gc) {
    this.gc = gc;
    this.inventories = {};           // kind → { [itemId]: true } for each owned item
    this.teleportTargetingActive = false;
    this._teleportRing = null;
    this._teleportTarget = new Vector3();
    this._teleportTargetValid = false;
    this._teleport = null;           // in-flight teleport effect state
    this._buttonStateKey = '';
    this.warpRingButton = null;
    this.ghostRingButton = null;
  }

  init(actionButtonsContainer) {
    this.warpRingButton = this._createButton(actionButtonsContainer, 'warp-ring-button', WARP_RING_KEY);
    this.warpRingButton.addEventListener('click', () => this.startTeleportTargeting());
    this.ghostRingButton = this._createButton(actionButtonsContainer, 'ghost-ring-button', GHOST_RING_KEY);
    this.ghostRingButton.addEventListener('click', () => this.toggleGhostRing());
  }

  /**
   * Orders the action bar as: every character's skill buttons, then the item
   * buttons, then the End Turn buttons (each character has its own, and only
   * the current character's is visible).
   */
  placeButtons(container) {
    if (!container) return;
    container.append(this.warpRingButton, this.ghostRingButton);
    const endTurnButtons = [...container.querySelectorAll('button')].filter(b => b.id.includes('end-turn'));
    container.append(...endTurnButtons);
  }

  _createButton(container, id, shortcut) {
    const button = document.createElement('button');
    button.id = id;
    button.dataset.shortcut = shortcut;
    button.style.display = 'none';
    if (container) container.appendChild(button);
    return button;
  }

  /** Clears every inventory (new game). */
  reset() {
    this.inventories = {};
    this.onLevelUnload();
  }

  /** Cancels targeting and in-flight effects. Call before the level unloads. */
  onLevelUnload() {
    this.cancelTeleportTargeting();
    if (this._teleport) {
      this._teleport.pillars.forEach(p => this._disposeMesh(p));
      this._teleport = null;
    }
  }

  getInventory(kind) {
    if (!this.inventories[kind]) this.inventories[kind] = {};
    return this.inventories[kind];
  }

  // ─── Shop support ─────────────────────────────────────────────────────────

  /** Why `buyer` can't buy `itemId` right now, or null if they can. */
  purchaseBlocker(itemId, buyer) {
    if (!isMainPC(buyer) || buyer.dead) return 'Only a living character can buy items.';
    const res = getResource(this.gc, buyer.kind);
    if (!res) return 'Only a living character can buy items.';
    if (this.getInventory(buyer.kind)[itemId]) {
      return `${buyer.discName} already has a ${ITEMS[itemId].name}.`;
    }
    if (res.controller[res.field] < ITEMS[itemId].cost) return `Not enough ${res.units} yet.`;
    return null;
  }

  /** Spends the buyer's own mana/charges and adds the item to their inventory. */
  purchase(itemId, buyer) {
    if (this.purchaseBlocker(itemId, buyer)) return false;
    const res = getResource(this.gc, buyer.kind);
    res.controller[res.field] -= ITEMS[itemId].cost;
    this.getInventory(buyer.kind)[itemId] = true;
    this._buttonStateKey = ''; // force a button refresh
    return true;
  }

  // ─── Per-frame update ─────────────────────────────────────────────────────

  update(deltaTime) {
    this._updateTeleportTargeting();
    this._updateTeleportEffect(deltaTime);
    this._updateButtons();
  }

  /** The living main character whose turn it is, or null. */
  activeCharacter() {
    const gc = this.gc;
    if (gc.gameOverState.active || gc.levelTransitionInProgress) return null;
    const disc = gc.currentTurnIndex !== -1 ? gc.discs[gc.currentTurnIndex] : null;
    return isMainPC(disc) && !disc.dead ? disc : null;
  }

  /** True while discs are in motion or an item effect is playing. */
  _busy() {
    return !!(this.gc.waitingForDiscToStop || this._teleport || this.teleportTargetingActive);
  }

  _updateButtons() {
    const disc = this.activeCharacter();
    const inv = disc ? this.getInventory(disc.kind) : null;
    const busy = this._busy();

    const hasWarp = !!(inv && inv.warpRing);
    const res = disc ? getResource(this.gc, disc.kind) : null;
    const funds = res ? res.controller[res.field] : 0;
    const warpCost = res ? formatAmount(res, ITEMS.warpRing.useCost) : '';
    const warpBlocker = hasWarp && funds < ITEMS.warpRing.useCost ? `Needs ${warpCost}.` : null;

    const hasRing = !!(inv && inv.ghostRing);
    const ghost = !!(disc && disc.isGhost);
    let ringBlocker = null;
    if (hasRing && !busy) ringBlocker = ghost ? this._ghostOffBlocker(disc) : this._ghostOnBlocker(disc);

    // Only touch the DOM when something changed.
    const key = [hasWarp, warpCost, warpBlocker, hasRing, ghost, busy, ringBlocker].join('|');
    if (key === this._buttonStateKey) return;
    this._buttonStateKey = key;

    this._setButton(this.warpRingButton, hasWarp, busy || !!warpBlocker,
      `<kbd>${WARP_RING_KEY}</kbd> Warp Ring`,
      warpBlocker || ITEMS.warpRing.description);
    this._setButton(this.ghostRingButton, hasRing, busy || !!ringBlocker,
      `<kbd>${GHOST_RING_KEY}</kbd> Ghost Ring: ${ghost ? 'On' : 'Off'}`,
      ringBlocker || (ghost
        ? 'Turn off the Ghost Ring.'
        : `Turn on the Ghost Ring (costs 1 HP and ${res ? formatAmount(res, 1) : '1 mana'}, then the same each turn).`));
  }

  _setButton(button, visible, disabled, html, title) {
    if (!button) return;
    button.style.display = visible ? 'inline-block' : 'none';
    button.disabled = !visible || disabled;
    button.innerHTML = html;
    button.title = title;
  }

  // ─── Ghost Ring ───────────────────────────────────────────────────────────

  _ghostOnBlocker(disc) {
    if (disc.hitPoints <= 1) return 'Needs more than 1 HP to turn on.';
    const res = getResource(this.gc, disc.kind);
    if (!res || res.controller[res.field] < 1) return `Needs ${res ? formatAmount(res, 1) : '1 mana'} to turn on.`;
    return null;
  }

  /** Spends 1 of the disc's own mana/charges (never below 0). */
  _spendOne(disc) {
    const res = getResource(this.gc, disc.kind);
    if (res) res.controller[res.field] = Math.max(0, res.controller[res.field] - 1);
  }

  _funds(disc) {
    const res = getResource(this.gc, disc.kind);
    return res ? res.controller[res.field] : 0;
  }

  /**
   * Ghost Ring upkeep, called by GameController when a turn begins. While the
   * ring is on, the wearer pays 1 HP and 1 mana/charge (the HP loss can kill
   * them). Once they are out of mana/charges the ring switches itself off.
   */
  applyGhostUpkeep(disc) {
    if (!disc || !disc.isGhost || disc.dead) return;
    if (this._funds(disc) > 0) {
      this._spendOne(disc);
      disc.isGhost = false; // let the upkeep damage through the ghost's immunity
      disc.takeHit(1, null);
      if (disc.hitPoints > 0) {
        disc.isGhost = true;
      } else {
        this.gc.updateAllDiscDeadStates();
        if (!this.gc.gameOverState.active) this.gc.checkGameOverConditions();
      }
    }
    if (disc.isGhost && this._funds(disc) <= 0) this._forceGhostOff(disc);
    this.gc.updateDiscNames();
    this.gc._refreshActionUI();
    this._buttonStateKey = '';
  }

  /** Turning the ring off is free; the only thing that blocks it is being inside an obstacle. */
  _ghostOffBlocker(disc) {
    return this._insideObstacle(disc) ? "Can't turn off while inside an obstacle." : null;
  }

  /**
   * Switches the ring off without the player choosing to (out of mana). If the
   * disc is inside an obstacle, it is first moved to the nearest open spot.
   */
  _forceGhostOff(disc) {
    if (this._insideObstacle(disc)) {
      const spot = this._nearestClearSpot(disc);
      if (spot) this._placeDisc(disc, spot);
    }
    disc.isGhost = false;
  }

  /**
   * True if the disc overlaps something inside the room: an obstacle, column,
   * crusher or prop. The room's outer walls don't count; a ghost can't pass
   * through them, so resting against one is normal.
   */
  _insideObstacle(disc) {
    const level = this.gc.level;
    const { x, z } = disc.mesh.position;
    const r = disc.radius - 0.05; // ignore mere touching

    for (const obs of level.obstacles || []) {
      if (obs.type === 'pillar' || obs.type === 'triangle') {
        if (Math.hypot(x - obs.x, z - obs.z) < obs.width / 2 + r) return true;
      } else if (Math.abs(x - obs.x) < obs.width / 2 + r && Math.abs(z - obs.z) < obs.depth / 2 + r) {
        return true;
      }
    }

    const boundary = new Set(level.getAllWalls(true));
    const box = new Box3();
    for (const wall of level.getAllWalls()) {
      if (boundary.has(wall)) continue;
      box.setFromObject(wall);
      const cx = Math.max(box.min.x, Math.min(x, box.max.x));
      const cz = Math.max(box.min.z, Math.min(z, box.max.z));
      if ((cx - x) ** 2 + (cz - z) ** 2 < r * r) return true;
    }
    return false;
  }

  /** Searches outward in rings for the closest spot the disc could sit. */
  _nearestClearSpot(disc) {
    const { x, z } = disc.mesh.position;
    for (let dist = 0.5; dist <= 20; dist += 0.5) {
      const steps = Math.max(8, Math.ceil(dist * 6));
      for (let i = 0; i < steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const px = x + Math.cos(a) * dist;
        const pz = z + Math.sin(a) * dist;
        if (this._isClearSpot(px, pz, disc)) return new Vector3(px, 0, pz);
      }
    }
    return null;
  }

  toggleGhostRing() {
    const disc = this.activeCharacter();
    if (!disc || this._busy() || !this.getInventory(disc.kind).ghostRing) return;

    if (disc.isGhost) {
      if (this._ghostOffBlocker(disc)) return;
      disc.isGhost = false;
    } else {
      if (this._ghostOnBlocker(disc)) return;
      // The price of phasing; HP is taken before the disc becomes immune.
      disc.takeHit(1, null);
      this._spendOne(disc);
      disc.isGhost = true;
      this.gc.updateDiscNames();
    }
    this.gc._refreshActionUI();
    this._buttonStateKey = '';
  }

  // ─── Warp Ring ────────────────────────────────────────────────────────────

  _canAffordWarp(disc) {
    const res = getResource(this.gc, disc.kind);
    return !!res && res.controller[res.field] >= ITEMS.warpRing.useCost;
  }

  startTeleportTargeting() {
    const disc = this.activeCharacter();
    if (!disc || this._busy() || !this.getInventory(disc.kind).warpRing || !this._canAffordWarp(disc)) return;

    this.teleportTargetingActive = true;
    this._teleportDisc = disc;
    const geo = new TorusGeometry(disc.radius, 0.08, 8, 48);
    const mat = new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, side: DoubleSide });
    this._teleportRing = new Mesh(geo, mat);
    this._teleportRing.rotation.x = Math.PI / 2;
    this._teleportRing.position.set(disc.mesh.position.x, 0.1, disc.mesh.position.z);
    this.gc.scene.add(this._teleportRing);

    this.gc.controlsEnabled = false;
    if (this.gc.controls) this.gc.controls.enabled = false;
    if (this.gc.uiManager) this.gc.uiManager.updateThrowInfo('Click an open spot to teleport  •  Esc to cancel', true);
    this._buttonStateKey = '';
  }

  cancelTeleportTargeting() {
    if (!this.teleportTargetingActive) return;
    this.teleportTargetingActive = false;
    this._teleportDisc = null;
    this._disposeMesh(this._teleportRing);
    this._teleportRing = null;
    this.gc.controlsEnabled = true;
    if (this.gc.controls) this.gc.controls.enabled = true;
    if (this.gc.uiManager) this.gc.uiManager.updateThrowInfo('', false);
    this._buttonStateKey = '';
  }

  /** Called on a click while targeting: teleports if the spot is valid. */
  confirmTeleport() {
    if (!this.teleportTargetingActive) return;
    if (!this._teleportTargetValid) return; // keep targeting until a valid spot is clicked
    const disc = this._teleportDisc;
    const target = this._teleportTarget.clone();
    this.cancelTeleportTargeting();
    if (!this._canAffordWarp(disc)) return;

    const res = getResource(this.gc, disc.kind);
    res.controller[res.field] -= ITEMS.warpRing.useCost;
    this.gc._refreshActionUI(); // mana/charge display and skill buttons
    this._startTeleportEffect(disc, target);
  }

  _updateTeleportTargeting() {
    if (!this.teleportTargetingActive || !this._teleportRing) return;
    const gc = this.gc;
    gc.raycaster.setFromCamera(gc.mouse, gc.camera);
    const hit = new Vector3();
    if (!gc.raycaster.ray.intersectPlane(new Plane(new Vector3(0, 1, 0), 0), hit)) return;

    this._teleportTarget.set(hit.x, 0, hit.z);
    this._teleportTargetValid = this._isClearSpot(hit.x, hit.z, this._teleportDisc);
    this._teleportRing.position.set(hit.x, gc.level.getTerrainHeightAt(hit.x, hit.z) + 0.1, hit.z);
    this._teleportRing.material.color.setHex(this._teleportTargetValid ? 0xffffff : 0xff4444);
  }

  /** A white light beam (wide faint shaft + bright core) with its bottom at y = 0. */
  _makeBeam(x, z, radius) {
    const shaft = new Mesh(
      new CylinderGeometry(radius * 1.3, radius * 1.3, BEAM_HEIGHT, 32, 1, true),
      new MeshBasicMaterial({
        color: 0xffffff, transparent: true, opacity: SHAFT_OPACITY,
        side: BackSide, depthWrite: false, blending: AdditiveBlending,
      }),
    );
    const core = new Mesh(
      new CylinderGeometry(radius * 0.45, radius * 0.45, BEAM_HEIGHT, 16, 1, true),
      new MeshBasicMaterial({
        color: 0xffffff, transparent: true, opacity: CORE_OPACITY,
        side: DoubleSide, depthWrite: false, blending: AdditiveBlending,
      }),
    );
    const beam = new Group();
    beam.add(shaft, core);
    beam.position.set(x, BEAM_HEIGHT / 2, z);
    this.gc.scene.add(beam);
    return beam;
  }

  /** Sets a beam's brightness, 0–1. */
  _setBeamStrength(beam, strength) {
    const [shaft, core] = beam.children;
    shaft.material.opacity = SHAFT_OPACITY * strength;
    core.material.opacity = CORE_OPACITY * strength;
  }

  _startTeleportEffect(disc, target) {
    const from = disc.mesh.position;
    const rising = this._makeBeam(from.x, from.z, disc.radius);
    const falling = this._makeBeam(target.x, target.z, disc.radius);
    falling.visible = false;

    disc.velocity.set(0, 0, 0);
    disc.moving = false;
    this.gc._spawnTurnStartRings(disc); // ripple in the disc's colour where it leaves
    if (this.gc.soundManager) this.gc.soundManager.playTeleport();

    this._teleport = { disc, target, rising, falling, pillars: [rising, falling], elapsed: 0, landed: false };
  }

  _updateTeleportEffect(deltaTime) {
    const t = this._teleport;
    if (!t) return;
    t.elapsed += deltaTime;
    const restY = BEAM_HEIGHT / 2;

    // Origin beam: the disc vanishes inside it, then it shoots up into the sky and fades.
    if (t.elapsed >= VANISH_DELAY && t.disc.mesh.visible && !t.landed) {
      t.disc.mesh.visible = false;
      t.disc.spotlight.visible = false;
    }
    if (t.rising) {
      const p = Math.min(Math.max(t.elapsed - VANISH_DELAY, 0) / RISE_DURATION, 1);
      t.rising.position.y = restY + p * p * BEAM_HEIGHT;
      this._setBeamStrength(t.rising, 1 - p);
      if (p >= 1) { this._disposeMesh(t.rising); t.rising = null; }
    }

    // Destination beam: drops from the sky, the disc appears, then it fades.
    const d = t.elapsed - DESCEND_DELAY;
    if (d >= 0 && t.falling) {
      t.falling.visible = true;
      const p = Math.min(d / DESCEND_DURATION, 1);
      t.falling.position.y = restY + BEAM_HEIGHT * (1 - p);
      if (p >= 1 && !t.landed) {
        t.landed = true;
        this._placeDisc(t.disc, t.target);
        this.gc._spawnTurnStartRings(t.disc);      }
      if (t.landed) {
        const f = Math.min(Math.max(d - DESCEND_DURATION - LAND_HOLD, 0) / LAND_FADE_DURATION, 1);
        this._setBeamStrength(t.falling, 1 - f);
        if (f >= 1) { this._disposeMesh(t.falling); t.falling = null; }
      }
    }

    if (!t.rising && !t.falling) {
      this._teleport = null;
      this._buttonStateKey = '';
    }
  }

  _placeDisc(disc, target) {
    const level = this.gc.level;
    const y = (level ? level.getTerrainHeightAt(target.x, target.z) : 0) + disc.basePositionY;
    disc.mesh.position.set(target.x, y, target.z);
    disc.velocity.set(0, 0, 0);
    disc.updatePosition(); // moves the spotlight and any attached rings with the disc
    disc.mesh.visible = true;
    disc.spotlight.visible = true;
    this.gc._updateSpotlights();
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  /**
   * True if a disc of `disc`'s size could be placed at (x, z) without
   * overlapping obstacles, walls, lava or other living discs.
   */
  _isClearSpot(x, z, disc) {
    const gc = this.gc;
    const r = disc.radius;
    if (!gc.isPositionValid(x, z, r, true, [disc])) return false;

    // Walls, columns, crushers and props are only in getAllWalls().
    const box = new Box3();
    for (const wall of gc.level.getAllWalls()) {
      box.setFromObject(wall);
      const cx = Math.max(box.min.x, Math.min(x, box.max.x));
      const cz = Math.max(box.min.z, Math.min(z, box.max.z));
      if ((cx - x) ** 2 + (cz - z) ** 2 < r * r) return false;
    }
    return true;
  }

  /** Removes a mesh or group from the scene and frees its GPU resources. */
  _disposeMesh(object) {
    if (!object) return;
    this.gc.scene.remove(object);
    object.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) o.material.dispose();
    });
  }
}
