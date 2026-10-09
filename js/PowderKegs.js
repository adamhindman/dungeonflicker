// js/PowderKegs.js
// Powder kegs (the Powder Store room): heavy barrels that blow up, hurting and
// shoving everything nearby, friend or foe.
//
//   • Hit hard, or touched by fire (a fireball, a Fire Elemental, lava, Flame
//     Strike, any blast), a keg goes off almost at once.
//   • Hit gently, it starts smoking, and goes off at the end of the next turn
//     of whoever's turn it was when it was lit, so they always get one more
//     move to get clear (or a monster that lit it dies, at the next round).
//
// A keg caught in another keg's blast goes off a moment later, so a cluster
// ripples off one keg at a time. Great kegs are bigger and blow wider and
// harder. Kegs are discs of type 'item', so turn order, the turn list and
// room-clear checks all ignore them; monster AI uses them on purpose (see
// chooseKegShot).

import {
  CanvasTexture, CircleGeometry, CylinderGeometry, LatheGeometry, Mesh, MeshBasicMaterial, MeshPhongMaterial,
  RepeatWrapping, SRGBColorSpace, SphereGeometry, TorusGeometry, Vector2, Vector3,
} from 'three';
import Disc from './Disc.js';
import { applyBlastAt } from './RadiusBlast.js';

export const KEG_RADIUS = 0.9;   // at the belly of an ordinary keg; also its collision radius
const KEG_END_RADIUS = 0.74;     // at the top and bottom
const KEG_HEIGHT = 1.5;
const IRON_COLOR = 0x2a2a2e;
// How much the barrel shows in the dark (see PowderKeg): the wood's own texture
// times this, and a flat glint on the iron. Raise for brighter barrels.
const BASE_GLOW = 0x626262;
const IRON_GLOW = 0x131313;

// Ordinary and great kegs. A great keg is the same barrel scaled up, with red-painted hoops.
const KEG_SIZES = {
  normal: {
    scale: 1, mass: 3, hoopColor: IRON_COLOR,
    blast: { radius: 5, damage: 2, force: 3 }, // a mortar shell is radius 7, force 3.5
    name: 'Powder Keg',
  },
  great: {
    scale: 1.5, mass: 6, hoopColor: 0x8a1a12,
    blast: { radius: 8, damage: 3, force: 4.5 },
    name: 'Great Powder Keg',
  },
};

// Impact speed (closing speed along the hit, in world units per frame; a
// full-power throw starts at 1, a precision throw at most 0.5).
const STRONG_HIT = 0.25;         // at or above: goes off at once
const WEAK_HIT = 0.05;           // at or above: starts smoking (below: just resting contact)

const FUSE_SECONDS = 0.15;       // from being set off to the bang; also the step of a chain
const SCHEDULED_STAGGER = 0.3;   // between smoking kegs that are due at the same moment
// A chain reaction hurts each disc once, not once per keg (it still shoves them every time).
const CHAIN_GRACE_MS = 1000;

// Monster aim (see chooseKegShot)
const AI_IMPACT_SPEED = 0.35;    // what a Skeleton aims to hit a keg at (comfortably over STRONG_HIT)
const SLIDE_PER_SPEED = 25;      // distance a disc slides per unit of speed it loses (friction 0.96)
const FIREBALL_RANGE = 22;       // matches the Fire Elemental's
const FIREBALL_RADIUS = 0.4;
const MIN_SHOT_WORTH = 2;        // 2 per party member caught, -1 per monster caught

const SMOKE_INTERVAL = 0.12;
const SMOKE_LIFE = 1.6;
const SMOKE_RISE = 1.6;          // units per second

export const KEG_DESCRIPTION = "A keg of black powder. Hit it hard, or touch it with fire, and it blows: 2 damage and a hard shove to everything nearby. Hit it gently and it starts to smoke, and blows at the end of the next turn of whoever lit it.";
const GREAT_KEG_DESCRIPTION = "A great keg of black powder: a bigger, wider blast than an ordinary keg, 3 damage and a huge shove. Hit it hard, or touch it with fire, and it blows. Hit it gently and it starts to smoke, and blows at the end of the next turn of whoever lit it.";

/** A powder keg: a heavy barrel that explodes. Managed by PowderKegManager. */
export class PowderKeg extends Disc {
  constructor(scene, startX, startZ, discName, gameController, great = false) {
    const size = great ? KEG_SIZES.great : KEG_SIZES.normal;
    const s = size.scale;
    super(
      /* radius: */ KEG_RADIUS * s,
      /* height: */ KEG_HEIGHT * s,
      /* color: */ 0xffffff,
      /* startX: */ startX,
      /* startZ: */ startZ,
      /* scene: */ scene,
      /* discName: */ discName,
      /* type: */ "item",
      /* kind: */ "PowderKeg",
      /* hitPoints: */ 1,
      /* skillLevel: */ 0,
      /* imagePath: */ null,
      /* canDoReboundDamage: */ false,
      /* throwPowerMultiplier: */ 0,
      /* mass: */ size.mass,
      /* rageIsActiveForNextThrow: */ false,
      /* rageWasUsedThisThrow: */ false,
      /* attackDamage: */ 0,
      /* gameController: */ gameController,
      /* description: */ great ? GREAT_KEG_DESCRIPTION : KEG_DESCRIPTION
    );
    this.great = great;
    this.blast = size.blast;
    this.baseOpacity = 1; // solid (GameController otherwise draws discs at 0.9 every frame)
    this.smoking = false;
    this.litBy = null; // whose turn it was when it was lit: it goes off at the end of their next one
    this.litTurn = 0;  // PowderKegManager's turn count when it was lit
    this.fuse = null;  // seconds until it goes off, once set off

    // A barrel, not a disc: swap the flat cylinder for a bellied body of
    // wooden staves, ringed with iron hoops and capped with a planked lid.
    const h = KEG_HEIGHT * s;
    const end = KEG_END_RADIUS * s;
    this.mesh.geometry.dispose();
    this.mesh.geometry = makeBarrelBody(s);
    this.mesh.material.dispose();
    this.mesh.material = new MeshPhongMaterial({ map: staveTexture(), shininess: 8 });
    // Two hoops near each end (chime and quarter hoops), none on the belly.
    for (const y of [-0.85, -0.55, 0.55, 0.85].map(f => f * h / 2)) {
      const hoop = new Mesh(
        new TorusGeometry(barrelRadiusAt(y, s) + 0.015 * s, 0.035 * s, 6, 40),
        new MeshPhongMaterial({ color: size.hoopColor, shininess: 60 }),
      );
      hoop.rotation.x = Math.PI / 2;
      hoop.position.y = y;
      this.mesh.add(hoop);
    }
    const lid = new Mesh(new CircleGeometry(end - 0.03 * s, 40), new MeshPhongMaterial({ map: lidTexture(), shininess: 8 }));
    lid.rotation.x = -Math.PI / 2;
    lid.position.y = h / 2 - 0.04 * s; // set a little into the rim, as a real head is
    this.mesh.add(lid);
    const rim = new Mesh(
      new TorusGeometry(end - 0.01 * s, 0.045 * s, 6, 40),
      new MeshPhongMaterial({ color: size.hoopColor, shininess: 60 }),
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = h / 2;
    this.mesh.add(rim);
    const bung = new Mesh(new CylinderGeometry(0.09 * s, 0.11 * s, 0.06 * s, 12), new MeshPhongMaterial({ color: 0x1a1008 }));
    bung.position.set(end * 0.5, h / 2 - 0.01 * s, 0);
    this.mesh.add(bung);

    // The rooms are lit only by each disc's own spotlight, which kegs don't
    // have. So the wood shows its own grain a little (emissive maps), and the
    // iron a touch, without lighting up the floor around it.
    this.mesh.material.emissive.setHex(BASE_GLOW);
    this.mesh.material.emissiveMap = staveTexture();
    lid.material.emissive.setHex(BASE_GLOW);
    lid.material.emissiveMap = lidTexture();
    for (const iron of [...this.mesh.children].filter(c => c !== lid && c !== bung)) {
      iron.material.emissive.setHex(IRON_GLOW);
    }

    // Its light would be one of dozens in the room: kegs go without.
    scene.remove(this.spotlight);
  }

  /** Any damage at all (lava, blasts, Flame Strike, a bomb…) sets it off. */
  takeHit() {
    this.gameController?.powderKegs?.setOff(this);
  }

  dispose() {
    for (const child of this.mesh.children) {
      child.geometry?.dispose();
      child.material?.dispose();
    }
    super.dispose();
  }
}

// ── Barrel shape and textures (shared by every keg) ─────────────────────────

/** The body's radius at height `y` (0 = the middle) on a keg of scale `s`: widest at the belly. */
function barrelRadiusAt(y, s = 1) {
  const t = y / (KEG_HEIGHT * s / 2); // -1 at the bottom, 1 at the top
  return (KEG_END_RADIUS + (KEG_RADIUS - KEG_END_RADIUS) * (1 - t * t)) * s;
}

/** The bellied side of the barrel, turned on the lathe about the Y axis. */
function makeBarrelBody(s = 1) {
  const points = [];
  const steps = 16;
  const h = KEG_HEIGHT * s;
  for (let i = 0; i <= steps; i++) {
    const y = -h / 2 + (i / steps) * h;
    points.push(new Vector2(barrelRadiusAt(y, s), y));
  }
  return new LatheGeometry(points, 48);
}

let _staveTexture = null;
let _lidTexture = null;

/** Wooden staves running top to bottom, with grain and dark seams between them. */
function staveTexture() {
  if (_staveTexture) return _staveTexture;
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const STAVES = 16;
  const w = canvas.width / STAVES;
  for (let s = 0; s < STAVES; s++) {
    // Each stave a slightly different shade of oak
    const shade = 0.85 + Math.random() * 0.3;
    ctx.fillStyle = `rgb(${Math.round(122 * shade)}, ${Math.round(74 * shade)}, ${Math.round(34 * shade)})`;
    ctx.fillRect(s * w, 0, w, canvas.height);
    // Grain: faint streaks along the stave
    for (let g = 0; g < 4; g++) {
      ctx.strokeStyle = `rgba(60, 32, 12, ${0.15 + Math.random() * 0.2})`;
      ctx.lineWidth = 1;
      const x = s * w + 3 + Math.random() * (w - 6);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.bezierCurveTo(x + 2, 40, x - 2, 88, x + 1, canvas.height);
      ctx.stroke();
    }
    // Seam
    ctx.fillStyle = 'rgba(30, 16, 6, 0.9)';
    ctx.fillRect(s * w, 0, 2, canvas.height);
  }
  _staveTexture = new CanvasTexture(canvas);
  _staveTexture.colorSpace = SRGBColorSpace;
  _staveTexture.wrapS = RepeatWrapping;
  return _staveTexture;
}

/** The barrel head seen from above: planks across it, the bung near one edge. */
function lidTexture() {
  if (_lidTexture) return _lidTexture;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const PLANKS = 5;
  const h = canvas.height / PLANKS;
  for (let p = 0; p < PLANKS; p++) {
    const shade = 0.75 + Math.random() * 0.25;
    ctx.fillStyle = `rgb(${Math.round(110 * shade)}, ${Math.round(66 * shade)}, ${Math.round(30 * shade)})`;
    ctx.fillRect(0, p * h, canvas.width, h);
    for (let g = 0; g < 5; g++) {
      ctx.strokeStyle = `rgba(55, 30, 10, ${0.15 + Math.random() * 0.2})`;
      const y = p * h + 4 + Math.random() * (h - 8);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(80, y + 3, 170, y - 3, canvas.width, y + 1);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(30, 16, 6, 0.9)';
    ctx.fillRect(0, p * h, canvas.width, 3);
  }
  _lidTexture = new CanvasTexture(canvas);
  _lidTexture.colorSpace = SRGBColorSpace;
  return _lidTexture;
}

const flatDistance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

/** Distance from point `p` to the segment `a`–`b` (all on the floor plane). */
function distanceToSegment(p, a, b) {
  const abx = b.x - a.x, abz = b.z - a.z;
  const lenSq = abx * abx + abz * abz;
  const t = lenSq > 0 ? Math.max(0, Math.min(1, ((p.x - a.x) * abx + (p.z - a.z) * abz) / lenSq)) : 0;
  return Math.hypot(p.x - (a.x + abx * t), p.z - (a.z + abz * t));
}

/** Runs the room's kegs: lighting, smoke, fuses, blasts and chain reactions. */
export class PowderKegManager {
  constructor(gc) {
    this.gc = gc;
    this._puffs = [];
    this._smokeTimer = 0;
    this._lastHurt = new WeakMap(); // disc → when a keg last hurt it (performance.now())
    this._turnsEnded = 0;           // turns ended so far: a smoking keg remembers when it was lit
    this._smokeGeometry = new SphereGeometry(0.35, 8, 6);
  }

  _kegs() {
    return this.gc.discs.filter(d => d.kind === 'PowderKeg');
  }

  /** True while a keg is about to go off (the turn waits for it). */
  isBusy() {
    return this._kegs().some(k => k.fuse !== null);
  }

  /** `keg` was struck by `other` with closing speed `speed` (PhysicsEngine). */
  onKegStruck(keg, other, speed) {
    const fiery = other.kind === 'Fireball' || other.kind === 'FireElemental';
    if (fiery) {
      if (other.kind === 'Fireball') other.takeHit(999, keg); // used up, as on a player
      this.setOff(keg);
    } else if (speed >= STRONG_HIT) {
      this.setOff(keg);
    } else if (speed >= WEAK_HIT) {
      this.light(keg);
    }
  }

  /** Starts `keg` smoking: it goes off at the end of the current turn-taker's next turn. */
  light(keg) {
    if (keg.smoking || keg.fuse !== null) return;
    keg.smoking = true;
    keg.litBy = this.gc.discs[this.gc.currentTurnIndex] ?? null;
    keg.litTurn = this._turnsEnded;
    this.gc.soundManager?.playLavaHiss(keg.mesh.position);
  }

  /** `keg` goes off in a moment (or sooner, if it's already due). */
  setOff(keg, delay = FUSE_SECONDS) {
    if (!this.gc.discs.includes(keg)) return; // already gone
    keg.fuse = keg.fuse === null ? delay : Math.min(keg.fuse, delay);
  }

  /** Is (x, z) inside the blast of a keg that's smoking or about to go off? */
  inDangerAt(x, z) {
    return this._kegs().some(k => (k.smoking || k.fuse !== null) &&
      Math.hypot(k.mesh.position.x - x, k.mesh.position.z - z) <= k.blast.radius);
  }

  /**
   * End of `disc`'s turn: the kegs it lit on an earlier turn go off. (Not the
   * ones it lit this turn: they wait for the end of its next, so it always
   * gets a move to get clear.)
   */
  async onTurnEnd(disc) {
    const turn = this._turnsEnded++;
    if (!disc) return;
    await this._detonate(this._kegs().filter(k =>
      k.smoking && k.fuse === null && k.litBy === disc && k.litTurn < turn));
  }

  /**
   * Start of a round: smoking kegs whose lighter has died (and so has no next
   * turn to end), or that were lit before anyone's turn, go off instead.
   */
  async onRoundStart() {
    const gc = this.gc;
    await this._detonate(this._kegs().filter(k => k.smoking && k.fuse === null &&
      (!k.litBy || k.litBy.dead || !gc.discs.includes(k.litBy))));
  }

  /** Sets off `kegs` one after another and waits for the aftermath to settle. */
  async _detonate(kegs) {
    if (kegs.length === 0) return;
    kegs.forEach((keg, i) => this.setOff(keg, FUSE_SECONDS + i * SCHEDULED_STAGGER));
    await new Promise(resolve => {
      const poll = setInterval(() => {
        if (!this.isBusy()) { clearInterval(poll); resolve(); }
      }, 50);
    });
    const gc = this.gc;
    await gc._waitForCrusherFlingToSettle(); // let the shoved come to rest
    gc.updateAllDiscDeadStates();
    gc.updateDiscNames();
    gc.checkGameOverConditions();
  }

  // ── Monster aim ─────────────────────────────────────────────────────────────

  /** `keg` and every keg its blast would set off, and theirs, and so on. */
  _chainFrom(keg, kegs) {
    const chain = [keg];
    for (let i = 0; i < chain.length; i++) {
      const k = chain[i];
      for (const other of kegs) {
        if (!chain.includes(other) && flatDistance(k.mesh.position, other.mesh.position) <= k.blast.radius) {
          chain.push(other);
        }
      }
    }
    return chain;
  }

  /**
   * A shot at a keg that's worth more to the monsters than throwing at the
   * party: `shooter` hurls itself at it hard enough to set it off, or (with
   * `fireball`) shoots a fireball at it. `party` are the discs it may target.
   * Worth: 2 for each party member the chain reaction would catch, -1 for each
   * other monster. A Skeleton doesn't count itself: it's mindless.
   * @returns {{ keg, dir: Vector3, speed: number }|null} speed: what to throw
   *   the shooter at (unused for a fireball, which has its own)
   */
  chooseKegShot(shooter, party, pathBlocked, { fireball = false } = {}) {
    const gc = this.gc;
    const kegs = this._kegs().filter(k => k.fuse === null);
    if (kegs.length === 0 || party.length === 0) return null;
    const from = shooter.mesh.position;
    const shotRadius = fireball ? FIREBALL_RADIUS : shooter.radius;
    const monsters = gc.discs.filter(d => d.type === 'NPC' && !d.dead && d !== shooter &&
      d.kind !== 'Fireball' && d.kind !== 'Pursuer' && d.kind !== 'Mortar');
    const blockers = gc.discs.filter(d => d !== shooter && d.mesh && !d.isGhost && d.kind !== 'Knife' &&
      d.kind !== 'ResurrectionFlask' && d.kind !== 'DroppedPotion' && !(d.dead && d.isDissolving));

    let best = null;
    for (const keg of kegs) {
      const to = keg.mesh.position;
      const distance = flatDistance(from, to);
      const contact = distance - keg.radius - shotRadius; // how far the shot travels before it hits
      let speed = 0;
      if (fireball) {
        if (distance > FIREBALL_RANGE) continue;
      } else {
        speed = AI_IMPACT_SPEED + Math.max(0, contact) / SLIDE_PER_SPEED;
        if (speed > 1) continue; // can't reach it hard enough
      }
      if (pathBlocked(from.clone(), to.clone())) continue;
      // Nothing else in the way (it would be hit instead)
      if (blockers.some(d => d !== keg && flatDistance(from, d.mesh.position) < distance &&
          distanceToSegment(d.mesh.position, from, to) < d.radius + shotRadius)) continue;

      const chain = this._chainFrom(keg, kegs);
      const caught = d => chain.some(k => flatDistance(k.mesh.position, d.mesh.position) <= k.blast.radius);
      const partyCaught = party.filter(caught).length;
      if (partyCaught === 0) continue;
      const worth = 2 * partyCaught - monsters.filter(caught).length;
      if (worth < MIN_SHOT_WORTH) continue;
      if (best && (worth < best.worth || (worth === best.worth && distance >= best.distance))) continue;
      const dir = new Vector3(to.x - from.x, 0, to.z - from.z).normalize();
      best = { keg, dir, speed, worth, distance };
    }
    return best;
  }

  // ── Per frame ───────────────────────────────────────────────────────────────

  update(deltaTime) {
    const kegs = this._kegs();

    // Fuses
    for (const keg of kegs) {
      if (keg.fuse === null) continue;
      keg.fuse -= deltaTime;
      if (keg.fuse <= 0) this._explode(keg);
    }

    // Smoking kegs glow and puff smoke
    const pulse = 0.5 + 0.5 * Math.sin(performance.now() / 120);
    this._smokeTimer += deltaTime;
    const emit = this._smokeTimer >= SMOKE_INTERVAL;
    if (emit) this._smokeTimer = 0;
    for (const keg of kegs) {
      if (!keg.smoking || !this.gc.discs.includes(keg)) continue;
      const emissive = keg.mesh.material.emissive.setHex(BASE_GLOW); // its usual glow, plus a red pulse
      emissive.r += 0.4 * pulse;
      emissive.g += 0.04 * pulse;
      if (emit) this._puff(keg);
    }

    // Smoke drifts up, spreads and fades
    for (let i = this._puffs.length - 1; i >= 0; i--) {
      const p = this._puffs[i];
      p.age += deltaTime;
      const t = p.age / SMOKE_LIFE;
      if (t >= 1) {
        this.gc.scene.remove(p.mesh);
        p.mesh.material.dispose();
        this._puffs.splice(i, 1);
        continue;
      }
      p.mesh.position.y += SMOKE_RISE * deltaTime;
      p.mesh.position.x += p.drift.x * deltaTime;
      p.mesh.position.z += p.drift.z * deltaTime;
      p.mesh.scale.setScalar(p.size * (0.6 + t * 1.6));
      p.mesh.material.opacity = 0.55 * (1 - t);
    }
  }

  _puff(keg) {
    const mesh = new Mesh(this._smokeGeometry, new MeshBasicMaterial({
      color: 0x8a8a8a, transparent: true, opacity: 0.55, depthWrite: false,
    }));
    const { x, y, z } = keg.mesh.position;
    mesh.position.set(x + keg.radius * 0.4, y + keg.height / 2 + 0.2, z);
    this.gc.scene.add(mesh);
    this._puffs.push({
      mesh, age: 0, size: keg.great ? 1.4 : 1,
      drift: { x: (Math.random() - 0.5) * 0.6, z: (Math.random() - 0.5) * 0.6 },
    });
  }

  /** Takes `keg` out of the room and blasts everything around where it stood. */
  _explode(keg) {
    const gc = this.gc;
    const pos = keg.mesh.position.clone();
    const { radius, damage, force } = keg.blast;
    this._remove(keg);

    gc.soundManager?.playRogueGrenadeExplode(pos);
    gc.explosionParticles?.spawn(pos, keg.great ? { count: 90, scale: 1.9 } : { count: 50, scale: 1.2 });
    gc.blastRings?.spawn(pos.x, 0.1, pos.z, radius, 0xff7a1a);
    // Kegs in reach are set off in turn (applyBlastAt calls their takeHit).
    applyBlastAt(gc, pos.x, pos.z, radius, force, {
      damage,
      shouldDamage: disc => {
        const now = performance.now();
        if (now - (this._lastHurt.get(disc) ?? -Infinity) < CHAIN_GRACE_MS) return false;
        this._lastHurt.set(disc, now);
        return true;
      },
    });
    gc.updateAllDiscDeadStates();
    gc.updateDiscNames();
    gc.checkGameOverConditions();
  }

  _remove(keg) {
    const gc = this.gc;
    const index = gc.discs.indexOf(keg);
    if (index > -1) {
      gc.discs.splice(index, 1);
      if (index < gc.currentTurnIndex) gc.currentTurnIndex--;
    }
    if (gc.discInfoPopupSelectedDisc === keg) gc.discInfoPopupSelectedDisc = null;
    keg.dispose();
  }

  /** Clears the smoke (the kegs themselves go with the room's other discs). */
  reset() {
    for (const p of this._puffs) {
      this.gc.scene.remove(p.mesh);
      p.mesh.material.dispose();
    }
    this._puffs = [];
    this._smokeTimer = 0;
  }
}

/**
 * Places the room's kegs, in clusters spread around the floor and as loners
 * out by the walls, clear of obstacles, lava, walls and the party, and returns
 * them. Each keg's spot is added to `existingPositions` so the monsters placed
 * after keep clear of it.
 * `config`: { clusters: [min, max], kegs: [min, max] (kegs per cluster),
 * great: [min, max] (clusters built round a great keg), spacing (between
 * cluster centres, default 12), loners (fraction of the kegs to stand alone,
 * default 0), fringe (how far in from the walls loners stand, default 5) }.
 */
export function placeKegClusters(gc, existingPositions, config) {
  const level = gc.level;
  const between = ([min, max]) => min + Math.floor(Math.random() * (max - min + 1));
  const partyPositions = [...existingPositions];
  const centres = [];
  const placed = []; // { x, z, radius, blast } of every keg so far
  const kegs = [];

  const clusterCount = between(config.clusters);
  const greatCount = config.great ? between(config.great) : 0;
  const CENTRE_SPACING = config.spacing ?? 12;
  const PARTY_CLEARANCE = 6;  // from a party member to a cluster centre
  const KEG_PARTY_CLEARANCE = 3.5;
  const GAP = 0.25;           // between neighbouring kegs
  const free = (x, z, radius) =>
    gc.isPositionValid(x, z, radius + 0.3) &&
    !partyPositions.some(p => Math.hypot(p.x - x, p.z - z) < KEG_PARTY_CLEARANCE + radius) &&
    !placed.some(p => Math.hypot(p.x - x, p.z - z) < p.radius + radius + GAP);

  const addKeg = (x, z, great) => {
    const size = great ? KEG_SIZES.great : KEG_SIZES.normal;
    placed.push({ x, z, radius: KEG_RADIUS * size.scale, blast: size.blast.radius });
    existingPositions.push({ x, z });
    const name = great ? `Great Powder Keg ${kegs.filter(k => k.great).length + 1}`
                       : `Powder Keg ${kegs.filter(k => !k.great).length + 1}`;
    kegs.push(new PowderKeg(gc.scene, x, z, name, gc, great));
  };

  // How many: each cluster's size is drawn, then about `loners` of the total
  // are taken out of the biggest clusters (each keeps at least 2) to stand alone.
  const sizes = Array.from({ length: clusterCount }, () => between(config.kegs));
  const total = sizes.reduce((sum, n) => sum + n, 0);
  let lonerCount = 0;
  for (let n = Math.round(total * (config.loners ?? 0)); n > 0; n--) {
    const i = sizes.indexOf(Math.max(...sizes));
    if (sizes[i] <= 2) break;
    sizes[i]--;
    lonerCount++;
  }

  for (let c = 0; c < clusterCount; c++) {
    const great = c < greatCount;
    const centreRadius = great ? KEG_RADIUS * KEG_SIZES.great.scale : KEG_RADIUS;
    let centre = null;
    for (let attempt = 0; attempt < 100 && !centre; attempt++) {
      const x = (Math.random() - 0.5) * (level.fieldWidth - 8);
      const z = (Math.random() - 0.5) * (level.fieldDepth - 8);
      if (!free(x, z, centreRadius)) continue;
      if (centres.some(p => Math.hypot(p.x - x, p.z - z) < CENTRE_SPACING)) continue;
      if (partyPositions.some(p => Math.hypot(p.x - x, p.z - z) < PARTY_CLEARANCE)) continue;
      centre = { x, z, radius: centreRadius, great };
    }
    if (!centre) { lonerCount += sizes[c]; continue; } // the room's too full: its kegs stand alone instead
    centres.push(centre);

    const spots = [centre];
    const isFree = (x, z) => free(x, z, KEG_RADIUS) &&
      !spots.some(p => Math.hypot(p.x - x, p.z - z) < p.radius + KEG_RADIUS + GAP);
    for (let attempt = 0; attempt < 80 && spots.length < sizes[c]; attempt++) {
      const angle = Math.random() * Math.PI * 2;
      const r = centreRadius + KEG_RADIUS + GAP + Math.random() * 1.6;
      const x = centre.x + Math.cos(angle) * r;
      const z = centre.z + Math.sin(angle) * r;
      if (!isFree(x, z)) continue;
      spots.push({ x, z, radius: KEG_RADIUS, great: false });
    }
    lonerCount += sizes[c] - spots.length; // any that didn't fit
    for (const spot of spots) addKeg(spot.x, spot.z, spot.great);
  }

  // Loners: out towards the walls, each beyond the reach of every other keg's
  // blast (and its own beyond theirs), so they outlast the big chain reaction
  // and stay as obstacles. Clear of the door. If the room's too crowded for
  // that, a loner settles for any free spot near the walls, then anywhere.
  const FRINGE = config.fringe ?? 5;  // how far in from the walls a loner may stand
  const DOOR_CLEARANCE = 5;
  const door = level.doorSlab?.position;
  const loneBlast = KEG_SIZES.normal.blast.radius;
  const nearWall = (x, z) => Math.min(level.fieldWidth / 2 - Math.abs(x), level.fieldDepth / 2 - Math.abs(z)) <= FRINGE;
  const isolated = (x, z) => placed.every(p => Math.hypot(p.x - x, p.z - z) > Math.max(p.blast, loneBlast) + 0.5);
  for (let n = 0; n < lonerCount; n++) {
    for (let attempt = 0; attempt < 400; attempt++) {
      const x = (Math.random() - 0.5) * level.fieldWidth;
      const z = (Math.random() - 0.5) * level.fieldDepth;
      if (!free(x, z, KEG_RADIUS)) continue;
      if (door && Math.hypot(door.x - x, door.z - z) < DOOR_CLEARANCE) continue;
      if (attempt < 300 && !nearWall(x, z)) continue;
      if (attempt < 200 && !isolated(x, z)) continue;
      addKeg(x, z, false);
      break;
    }
  }
  return kegs;
}
