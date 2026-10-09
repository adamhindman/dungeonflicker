import { Vector3 } from 'three';
import Disc from './Disc.js';
import { isMainPC } from './PartyResources.js';
import { slideDistanceForSpeed } from './RangeOverlay.js';

// ── Tuning ───────────────────────────────────────────────────────────────────
// It arrives at the start of round ARRIVAL_BASE_ROUNDS + (the room's enemy
// points ÷ POINTS_PER_ROUND), so rooms with more to fight give more time.
const ARRIVAL_BASE_ROUNDS = 3;
const POINTS_PER_ROUND = 2;
// TESTING: arrive at this round in every room; null for the normal timing.
const ARRIVAL_ROUND_OVERRIDE = null;
const WARNING_ROUNDS = 3;            // the on-screen countdown starts this many rounds ahead
// How far it glides on its first turn: 64% of a Wizard's full-power flick on open floor.
const FIRST_TURN_DISTANCE = 0.64 * slideDistanceForSpeed({ kind: 'Wizard' }, 1);
const ACCELERATION = 1.07;           // each turn it glides this much farther than the last
const CATCH_DAMAGE = 3;              // to every party member it touches
const SHOVE_SPEED = 0.6;             // launch speed of a party member it touches
const GLIDE_SPEED = 10;              // units per second, for the look of it
const ENTRY_DEPTH = 3;               // how far inside the doorway it comes to rest on arrival

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * The Pursuer: it can't be hurt (blows still shove it), passes through walls,
 * columns and monsters, and on each of its turns glides straight at the
 * nearest party member, a little farther every turn. Anyone it touches takes
 * CATCH_DAMAGE, and it carries on toward the next.
 */
export class Pursuer extends Disc {
  constructor(scene, startX, startZ, gameController, description) {
    super(
      /* radius: */ 1.6,
      /* height: */ 0.5,
      /* color: */ 0x2b0f3a, // bruise purple
      /* startX: */ startX,
      /* startZ: */ startZ,
      /* scene: */ scene,
      /* discName: */ "The Pursuer",
      /* type: */ "NPC",
      /* kind: */ "Pursuer",
      /* hitPoints: */ 99, // never lowered; high so it isn't tinted as nearly dead
      /* skillLevel: */ 100,
      /* imagePath: */ "images/pursuer.webp",
      /* canDoReboundDamage: */ false,
      /* throwPowerMultiplier: */ 1,
      /* mass: */ 6, // as hard to shove as a Warden
      /* rageIsActiveForNextThrow: */ false,
      /* rageWasUsedThisThrow: */ false,
      /* attackDamage: */ CATCH_DAMAGE,
      /* gameController: */ gameController,
      /* description: */ description
    );
    this.turnDistance = FIRST_TURN_DISTANCE;
    this.baseOpacity = 1; // fully solid (other discs are drawn at 0.9)
  }

  /** It can't be hurt. (Collisions still shove it as usual.) */
  takeHit() {}

  /** Its turn: glide at the party, then hand over. */
  async takeTurn() {
    const gc = this.gameController;
    await gc.pursuerController.glideAtParty(this, this.turnDistance);
    this.turnDistance *= ACCELERATION;
    // Over, or someone it shoved slid out through the door into the next room.
    if (gc.gameOverState.active || gc.pursuerController.pursuer !== this) return;
    await wait(300);
    await gc._proceedToNextPlayerTurn();
  }
}

/**
 * Times the Pursuer's arrival in each combat room, shows the countdown, brings
 * it in through the door (which stays open as an escape route) and animates
 * its glides. GameController owns one and drives it.
 */
export class PursuerController {
  constructor(gc) {
    this.gc = gc;
    this.pursuer = null;      // the disc, once it has arrived
    this._arrivalRound = null; // room round it arrives at; null = never (Sanctuary, boss) or already here
    this._round = 1;           // the room's current round
    this._glide = null;        // { disc, ... } while it's moving
    this._warningEl = null;
  }

  /** True while the Pursuer is in the room. */
  get isPresent() {
    return !!this.pursuer;
  }

  /** True for the Pursuer while it glides: physics leaves it alone. */
  isGliding(disc) {
    return !!this._glide && this._glide.disc === disc;
  }

  /** A combat room was built with `enemyPoints` worth of enemies: start the clock. */
  onRoomStart(enemyPoints) {
    this.reset();
    this._arrivalRound = ARRIVAL_ROUND_OVERRIDE ??
      ARRIVAL_BASE_ROUNDS + Math.round(enemyPoints / POINTS_PER_ROUND);
    this._refreshWarning();
  }

  /** A new round begins: count down, and arrive when due. */
  async onRoundStart() {
    if (this._arrivalRound === null || this.isPresent) return;
    this._round++;
    this._refreshWarning();
    if (this._round >= this._arrivalRound) await this._arrive();
  }

  /** Forgets the room (on leaving it). The disc itself goes with the room's discs. */
  reset() {
    const glide = this._glide; // its disc may already be disposed: just let the turn finish
    this._glide = null;
    glide?.resolve();
    this.pursuer = null;
    this._arrivalRound = null;
    this._round = 1;
    this._refreshWarning();
  }

  _refreshWarning() {
    const roundsLeft = this._arrivalRound === null ? null : this._arrivalRound - this._round;
    const show = roundsLeft !== null && roundsLeft >= 1 && roundsLeft <= WARNING_ROUNDS;
    if (!show) {
      this._warningEl?.remove();
      this._warningEl = null;
      return;
    }
    if (!this._warningEl) {
      this._warningEl = document.createElement('div');
      this._warningEl.id = 'pursuer-warning';
      document.body.appendChild(this._warningEl);
    }
    this._warningEl.textContent = `The Pursuer arrives in ${roundsLeft} round${roundsLeft === 1 ? '' : 's'}`;
  }

  /** Opens the door and brings the Pursuer in through it. */
  async _arrive() {
    const gc = this.gc;
    const level = gc.level;
    this._arrivalRound = null;
    this._refreshWarning();

    // It comes in through the door, or (in a room that lists them) out of one
    // of its entrances, such as a Mirror Gate, picked at random.
    const door = level._doorOpeningCenter ?? { x: 0, z: 0 };
    const entrances = level.pursuerEntrances;
    const entrance = entrances?.length ? entrances[Math.floor(Math.random() * entrances.length)] : null;
    const origin = entrance ?? door;
    const pursuer = new Pursuer(gc.scene, origin.x, origin.z, gc, gc.discDescriptions.Pursuer);
    gc.discs.push(pursuer); // last in the turn order: the party gets a round to react
    this.pursuer = pursuer;
    gc.updateDiscNames();
    gc._updateSpotlights();
    // The door opens as an escape route. It may already be open (the room was
    // cleared, or it's open from the start): then no unlock sound.
    if (!level.doorIsOpen && !level._doorAnimating) {
      level.openDoor();
      gc.soundManager?.playDoorUnlock(new Vector3(door.x, 0, door.z));
    }
    if (entrance?.flash !== undefined) entrance.flash = 1; // a Mirror Gate flares as it comes through

    // Glide in: out of the entrance it came from, or from the doorway toward
    // the middle of the room.
    const inward = entrance ? new Vector3(entrance.nx, 0, entrance.nz) : new Vector3(-door.x, 0, -door.z);
    if (inward.lengthSq() < 0.001) inward.set(0, 0, -1);
    inward.normalize();
    let entry = null;
    for (let depth = pursuer.radius + ENTRY_DEPTH; depth < 30 && !entry; depth += 1) {
      const x = origin.x + inward.x * depth;
      const z = origin.z + inward.z * depth;
      if (this._isFreeSpot(pursuer, x, z)) entry = { x, z };
    }
    if (entry) {
      gc.soundManager?.playPursuerMove(pursuer.mesh.position.clone());
      await this._runGlide({ disc: pursuer, target: entry, catches: false });
    }
  }

  /**
   * One of its turns: glides up to `distance` toward the nearest party member
   * it hasn't touched yet this turn, hurting and shoving each one it touches.
   */
  async glideAtParty(disc, distance) {
    this.gc.soundManager?.playPursuerMove(disc.mesh.position.clone());
    await this._runGlide({ disc, remaining: distance, catches: true });
    await this.gc._waitForCrusherFlingToSettle(); // let the shoved come to rest
  }

  _runGlide(glide) {
    glide.disc.velocity.set(0, 0, 0); // updatePosition() adds it every frame
    glide.disc.moving = false;
    return new Promise(resolve => {
      this._glide = {
        ...glide,
        caught: new Set(),
        path: [{ x: glide.disc.mesh.position.x, z: glide.disc.mesh.position.z }],
        resolve,
      };
    });
  }

  /** Call every frame. */
  update(dt) {
    const glide = this._glide;
    if (!glide) return;
    const { disc } = glide;
    const pos = disc.mesh.position;
    let step = GLIDE_SPEED * dt;

    let target = glide.target ?? null;
    if (glide.catches) {
      if (glide.remaining <= 0) { this._finishGlide(); return; }
      step = Math.min(step, glide.remaining);
      // Prefer party members it can reach (inside its bounds, if the room sets them).
      const untouched = this._party().filter(p => !glide.caught.has(p));
      const reachable = untouched.filter(p => this._inBounds(p.mesh.position, 0));
      const prey = reachable.length ? reachable : untouched;
      target = prey.reduce((best, p) =>
        !best || dist(p, pos) < dist(best, pos) ? p : best, null)?.mesh.position;
      if (!target) { this._finishGlide(); return; }
    }

    const dx = target.x - pos.x;
    const dz = target.z - pos.z;
    const gap = Math.hypot(dx, dz);
    const move = Math.min(step, gap);
    if (gap > 0.0001) {
      pos.x += (dx / gap) * move;
      pos.z += (dz / gap) * move;
    }
    // It passes through walls, but not out of the part of the room it's held to.
    const bounds = this.gc.level?.pursuerBounds;
    if (bounds) {
      pos.x = Math.min(Math.max(pos.x, bounds.minX + disc.radius), bounds.maxX - disc.radius);
      pos.z = Math.min(Math.max(pos.z, bounds.minZ + disc.radius), bounds.maxZ - disc.radius);
    }
    disc.updatePosition(); // velocity is zero: this just brings its spotlight along
    glide.path.push({ x: pos.x, z: pos.z });

    if (glide.catches) {
      glide.remaining -= move;
      for (const member of this._party()) {
        if (glide.caught.has(member)) continue;
        if (dist(member, pos) > disc.radius + member.radius) continue;
        glide.caught.add(member);
        this._catch(disc, member);
        if (this.gc.gameOverState.active) { this._finishGlide(); return; }
      }
    } else if (move >= gap) {
      this._finishGlide();
    }
  }

  /** Hurts `member` and knocks it away from the Pursuer. */
  _catch(disc, member) {
    const gc = this.gc;
    member.takeHit(CATCH_DAMAGE, disc);
    gc.soundManager?.playDiscHit(member.mesh.position.clone());
    const away = new Vector3(member.mesh.position.x - disc.mesh.position.x, 0, member.mesh.position.z - disc.mesh.position.z);
    if (away.lengthSq() < 0.0001) away.set(1, 0, 0);
    away.normalize().multiplyScalar(SHOVE_SPEED / member.mass);
    member.velocity.set(away.x, 0, away.z);
    member.moving = true;
    gc.updateAllDiscDeadStates();
    gc.updateDiscNames();
    gc.checkGameOverConditions();
  }

  /** Ends the glide where it can rest: back along its path if it stopped inside something. */
  _finishGlide() {
    const glide = this._glide;
    if (!glide) return;
    this._glide = null;
    const { disc, path } = glide;
    for (let i = path.length - 1; i >= 0; i--) {
      if (this._isFreeSpot(disc, path[i].x, path[i].z)) {
        disc.mesh.position.x = path[i].x;
        disc.mesh.position.z = path[i].z;
        break;
      }
    }
    disc.updatePosition();
    glide.resolve();
  }

  /** Is `pos` inside the room's Pursuer bounds (shrunk by `margin`)? Always, if the room sets none. */
  _inBounds(pos, margin) {
    const b = this.gc.level?.pursuerBounds;
    return !b || (pos.x >= b.minX + margin && pos.x <= b.maxX - margin &&
                  pos.z >= b.minZ + margin && pos.z <= b.maxZ - margin);
  }

  /** Living party members (the main characters), hidden or not: it always finds them. */
  _party() {
    return this.gc.discs.filter(d => isMainPC(d) && !d.dead && d.hitPoints > 0);
  }

  /** Inside the room, clear of walls and columns, and not overlapping another disc. */
  _isFreeSpot(disc, x, z) {
    const gc = this.gc;
    if (!gc.level.isPositionValid(x, z, disc.radius)) return false;
    return !gc.discs.some(d => d !== disc && !d.dead && d.type !== 'item' && d.mesh &&
      Math.hypot(d.mesh.position.x - x, d.mesh.position.z - z) < d.radius + disc.radius);
  }
}

const dist = (disc, pos) => Math.hypot(disc.mesh.position.x - pos.x, disc.mesh.position.z - pos.z);
