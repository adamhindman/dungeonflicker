import { DoubleSide, Mesh, MeshBasicMaterial, SphereGeometry } from 'three';
import Disc from './Disc.js';
import { distToSegment, segmentHitsObstacle } from './Geometry2D.js';
import { growHomunculi } from './Homunculus.js';
import { isMainPC } from './PartyResources.js';
import { applyRadiusBlast } from './RadiusBlast.js';
import { slideDistance, slideDistanceForSpeed } from './RangeOverlay.js';

// ── Tuning ───────────────────────────────────────────────────────────────────
export const BLAST_RADIUS = 8;      // his Radius Blast's reach
const BLAST_FORCE = 3.5;            // its shove, same as the Wizard's
const BLAST_COLOR = 0x9cff57;       // alchemical green rings
const FLEE_TRIGGER_RANGE = 10;      // he flees when a party member is this close
const START_HOMUNCULI = 4;          // standing in front of him when the room opens
const SPAWN_PER_TURN = 1;           // he grows this many each turn (his alembics grow more)
const FLEE_MAX_SPEED = 1;           // launch speed of his longest flight
// His elixirs: he takes at most this much damage between his own turns. Once
// he has, a shield dome shows the rest is shrugged off.
const DAMAGE_CAP_PER_ROUND = 2;
const SHIELD_RADIUS = 2.3;
const SHIELD_COLOR = 0xffe28a;
const SHIELD_OPACITY = 0.12;
const SHIELD_LABEL_COLOR = '#ffe28a';

// Flee-point scoring (see chooseFleePoint)
const GRID_STEP = 1.5;              // spacing of the candidate points
const COVER_BONUS = 6;              // a column or wall between him and a party member
const WALL_MARGIN = 4;              // closer than this to a wall counts as boxed in…
const WALL_PENALTY = 1.5;           // …costing this much per unit closer
const TRAVEL_COST = 0.05;           // per unit flown: prefer short hops

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Paracelsus, the alchemist: the boss. He never attacks directly. Each turn he
 * blasts anyone who ended their turn close to him, grows a homunculus, then
 * flees to the safest spot he can reach if the party is closing in. Most of
 * his homunculi come from his alembics. He takes at most
 * DAMAGE_CAP_PER_ROUND damage between his turns.
 */
export default class Paracelsus extends Disc {
  constructor(scene, startX, startZ, gameController, description) {
    super(
      /* radius: */ 1.4,
      /* height: */ 0.5,
      /* color: */ 0xc9a227, // alchemist's gold
      /* startX: */ startX,
      /* startZ: */ startZ,
      /* scene: */ scene,
      /* discName: */ "Paracelsus",
      /* type: */ "NPC",
      /* kind: */ "Paracelsus",
      /* hitPoints: */ 6,
      /* skillLevel: */ 100,
      /* imagePath: */ "images/paracelsus-sm.webp",
      /* canDoReboundDamage: */ false,
      /* throwPowerMultiplier: */ 1,
      /* mass: */ 1.2,
      /* rageIsActiveForNextThrow: */ false,
      /* rageWasUsedThisThrow: */ false,
      /* attackDamage: */ 0, // he flees: bumping into the party never hurts them
      /* gameController: */ gameController,
      /* description: */ description
    );
    this._damageThisRound = 0; // damage taken since his last turn began
    this._shield = null;       // the dome while the damage cap is reached
  }

  /** His whole turn: blast anyone close, grow a homunculus, then flee or hold still. */
  async takeTurn() {
    const gc = this.gameController;
    // A new round: his elixirs are spent, he can be hurt again.
    this._damageThisRound = 0;
    this._lowerShield();

    // Only someone the blast can touch sets it off: never a hidden Rogue
    // (not a threat at all) or a Ghost Ring wearer (the blast passes through).
    if (this._threats().some(p => !p.isGhost && this._distanceTo(p) <= BLAST_RADIUS)) {
      this.castBlast();
      if (gc.gameOverState.active) return;
      await this._waitForStillness(3000);
    }

    // Grown after the blast so it's spared, and before he picks his escape so
    // he flies around it.
    growHomunculi(this, SPAWN_PER_TURN, gc.discs);

    const threats = this._threats();
    const fleeTo = threats.some(p => this._distanceTo(p) <= FLEE_TRIGGER_RANGE)
      ? this.chooseFleePoint(threats)
      : null;
    await wait(500);

    if (fleeTo) {
      this._flyTo(fleeTo); // the turn ends when he comes to rest
      return;
    }
    // Nobody close (or nowhere better to go): hold still.
    await wait(400);
    await gc._proceedToNextPlayerTurn();
  }

  /**
   * His opening guard: START_HOMUNCULI homunculi in a row in front of him
   * (towards the party), added to `discs`, the spawner's list for the room.
   */
  placeStartingHomunculi(discs) {
    const { x, z } = this.mesh.position;
    const spacing = 2.2;
    const spots = Array.from({ length: START_HOMUNCULI }, (_, i) => ({
      x: x + (i - (START_HOMUNCULI - 1) / 2) * spacing,
      z: z + this.radius + 1.3,
    }));
    growHomunculi(this, START_HOMUNCULI, discs, { spots });
  }

  /** Damage is capped per round; reaching the cap raises his shield dome. */
  takeHit(damageAmount = 1, attacker = null) {
    const allowed = Math.max(0, DAMAGE_CAP_PER_ROUND - this._damageThisRound);
    if (allowed > 0) {
      const before = this.hitPoints;
      super.takeHit(Math.min(damageAmount, allowed), attacker);
      this._damageThisRound += before - this.hitPoints;
    }
    if (this._damageThisRound >= DAMAGE_CAP_PER_ROUND && this.hitPoints > 0) {
      const absorbed = damageAmount > allowed;
      this._raiseShield();
      if (absorbed) this._flashShield();
    }
  }

  /** When he falls, his alembics shatter with him. */
  die(silent = false) {
    if (this.dead) return;
    super.die(silent);
    this._lowerShield();
    for (const alembic of this.gameController.discs.filter(d => d.kind === 'Alembic' && !d.dead)) {
      alembic.hitPoints = 0;
      alembic.lastHitPoints = 0;
      alembic.die();
    }
    this.gameController.updateDiscNames();
  }

  _raiseShield() {
    if (this._shield) return;
    // A half dome over him, resting on the floor
    const dome = new Mesh(
      new SphereGeometry(SHIELD_RADIUS, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      new MeshBasicMaterial({
        color: SHIELD_COLOR, transparent: true, opacity: SHIELD_OPACITY,
        side: DoubleSide, depthWrite: false,
      }),
    );
    dome.position.y = -this.basePositionY;
    dome.renderOrder = 2;
    this.mesh.add(dome);
    this._shield = { dome, timers: [] };
    // A beat after the hit's own "-N HP", so the two labels don't overlap
    this._shield.timers.push(setTimeout(() => {
      if (!this.dead) this.gameController.uiManager?.showFloatingLabel(this, 'Shield activated', SHIELD_LABEL_COLOR);
    }, 900));
  }

  /** A hit was shrugged off: the dome flares briefly. */
  _flashShield() {
    const shield = this._shield;
    if (!shield) return;
    shield.dome.material.opacity = SHIELD_OPACITY * 2.2;
    shield.timers.push(setTimeout(() => { shield.dome.material.opacity = SHIELD_OPACITY; }, 150));
  }

  /** Drops the dome with a dying flicker. */
  _lowerShield() {
    const shield = this._shield;
    if (!shield) return;
    this._shield = null;
    shield.timers.forEach(clearTimeout);
    const { dome } = shield;
    const steps = [1, 0, 0.8, 0, 0.6, 0, 0.35, 0, 0.15, 0];
    steps.forEach((level, i) => setTimeout(() => {
      dome.visible = level > 0;
      dome.material.opacity = SHIELD_OPACITY * level;
    }, i * 55));
    setTimeout(() => {
      dome.parent?.remove(dome);
      dome.geometry.dispose();
      dome.material.dispose();
    }, steps.length * 55);
  }

  /** Radius Blast: 1 damage and a shove to everyone within BLAST_RADIUS, friend or foe. */
  castBlast() {
    const gc = this.gameController;
    const { x, y, z } = this.mesh.position;
    gc.soundManager?.playWizardRadiusBlast(this.mesh.position);
    applyRadiusBlast(gc, this, BLAST_RADIUS, BLAST_FORCE);
    gc.blastRings?.spawn(x, y + 0.1, z, BLAST_RADIUS, BLAST_COLOR);
    gc.updateAllDiscDeadStates();
    gc.checkGameOverConditions();
    gc.updateDiscNames();
  }

  /**
   * The safest point he can fly to this turn, or null if he can't get
   * anywhere. Candidates are a grid over the floor that he can stand on and
   * reach in one straight, unobstructed flight. Each is scored by its safety
   * margin, the smallest (distance − reach) over the party, where reach is
   * how far that party member can throw. Positive means nobody can reach him
   * there next turn. Then: a bonus for each party member a column or wall
   * hides him from, a penalty for hugging walls (corners are traps), and a
   * small cost per unit flown.
   * @param {Disc[]} threats - the party members to flee from
   */
  chooseFleePoint(threats) {
    const gc = this.gameController;
    const level = gc.level;
    const { x: sx, z: sz } = this.mesh.position;
    const maxFlight = slideDistanceForSpeed(this, FLEE_MAX_SPEED);
    const obstacles = level.obstacles;
    // Anything in the way would knock him off course or slow him down.
    const blockers = gc.discs.filter(d => d !== this && d.mesh && d.type !== 'item');
    const reaches = threats.map(p => slideDistance(p) + p.radius + this.radius);

    let best = null;
    const hw = level.fieldWidth / 2, hd = level.fieldDepth / 2;
    for (let x = -hw + GRID_STEP / 2; x < hw; x += GRID_STEP) {
      for (let z = -hd + GRID_STEP / 2; z < hd; z += GRID_STEP) {
        const flight = Math.hypot(x - sx, z - sz);
        if (flight > maxFlight || flight < 1) continue;
        if (!gc.isPositionValid(x, z, this.radius, true, [this])) continue;
        // The straight flight must miss every obstacle and disc.
        if (obstacles.some(o => segmentHitsObstacle(sx, sz, x, z, o, this.radius))) continue;
        if (blockers.some(d => distToSegment(d.mesh.position.x, d.mesh.position.z, sx, sz, x, z) < d.radius + this.radius)) continue;

        let score = Infinity;
        threats.forEach((p, i) => {
          score = Math.min(score, Math.hypot(x - p.mesh.position.x, z - p.mesh.position.z) - reaches[i]);
        });
        for (const p of threats) {
          const { x: px, z: pz } = p.mesh.position;
          if (obstacles.some(o => segmentHitsObstacle(px, pz, x, z, o, 0))) score += COVER_BONUS;
        }
        const wallGap = this._distanceToWall(x, z);
        if (wallGap < WALL_MARGIN) score -= (WALL_MARGIN - wallGap) * WALL_PENALTY;
        score -= flight * TRAVEL_COST;

        if (!best || score > best.score) best = { x, z, flight, score };
      }
    }
    return best;
  }

  /** Throws himself at the speed that brings him to rest at `point`. */
  _flyTo(point) {
    const gc = this.gameController;
    const { x: sx, z: sz } = this.mesh.position;
    // Bisect for the launch speed whose slide covers exactly the flight.
    let lo = 0, hi = FLEE_MAX_SPEED;
    for (let i = 0; i < 25; i++) {
      const mid = (lo + hi) / 2;
      if (slideDistanceForSpeed(this, mid) < point.flight) lo = mid; else hi = mid;
    }
    const speed = hi;
    this.velocity.set(((point.x - sx) / point.flight) * speed, 0, ((point.z - sz) / point.flight) * speed);
    this.moving = true;
    this.hasThrown = true;
    gc.uiManager?.updateMoveStatusChip(this);
    this.resetDamageState();
    gc.thrownDisc = this;
    gc.waitingForDiscToStop = true;
  }

  /** How far (x, z) is from the room's nearest outer wall. */
  _distanceToWall(x, z) {
    const level = this.gameController.level;
    let gap = Math.min(level.fieldWidth / 2 - Math.abs(x), level.fieldDepth / 2 - Math.abs(z));
    if (level.arcWall) {
      const { cx, cz, r } = level.arcWall;
      gap = Math.min(gap, r - Math.hypot(x - cx, z - cz));
    }
    if (level.circleRadius) gap = Math.min(gap, level.circleRadius - Math.hypot(x, z));
    return gap;
  }

  /** The party members he worries about: alive and not hidden. */
  _threats() {
    return this.gameController.discs.filter(d => isMainPC(d) && !d.dead && d.hitPoints > 0 && !d.isHidden);
  }

  _distanceTo(disc) {
    return Math.hypot(disc.mesh.position.x - this.mesh.position.x, disc.mesh.position.z - this.mesh.position.z);
  }

  /** Waits until nothing is moving (e.g. after his blast), up to `maxMs`. */
  async _waitForStillness(maxMs) {
    const start = performance.now();
    while (this.gameController.discs.some(d => d.moving) && performance.now() - start < maxMs) {
      await wait(100);
    }
  }
}
