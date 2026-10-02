import { Vector3 } from 'three';

// Every 1–2 rounds (rolled afresh each time) the Donut room's lava pit erupts
// at the start of the round, flinging everything in it back onto the ring, so
// nothing can sit trapped in the pit forever.
const MIN_ROUNDS = 1;
const MAX_ROUNDS = 2;
const LAUNCH_DELAY = 0.25;    // seconds between the blast and the first disc leaving the pit
const LAUNCH_STAGGER = 0.12;  // seconds between successive discs leaving
const FLIGHT_SECONDS = 1.1;
const ARC_HEIGHT = 7;         // peak height of the flight above the higher end
const SPIN_TURNS = 2;         // whole turns each disc spins on the way
const LANDING_MARGIN = 1.5;   // keep landings this far from the pit's edge and the walls
// Kinds that never get thrown: short-lived projectiles and the Wizard's orbs.
const NOT_EJECTED = ['Orb', 'HealingOrb', 'Fireball', 'Bomb'];

/**
 * The Donut room's erupting lava pit. GameController calls onRoundStart() as
 * each round begins and update(dt) every frame.
 */
export default class PitEruption {
  constructor(gc) {
    this.gc = gc;
    this._roundsLeft = null; // rounds until the next eruption; rolled on the room's first round
    this._flights = [];
    this._onAllLanded = null; // resolves the eruption once every disc is down
  }

  /** Forgets the countdown and any discs in flight (on leaving a room). */
  reset() {
    for (const flight of this._flights) this._land(flight);
    this._flights = [];
    this._roundsLeft = null;
    const resolve = this._onAllLanded;
    this._onAllLanded = null;
    resolve?.();
  }

  /** Discs currently in the air, which physics leaves alone. */
  isAirborne(disc) {
    return this._flights.some(f => f.disc === disc);
  }

  /**
   * Called as a new round begins. In the Donut room, counts down and, when
   * due, erupts; resolves once every ejected disc has landed.
   */
  async onRoundStart() {
    const rings = this.gc.level?.donutRings;
    if (!rings) return;
    if (this._roundsLeft === null) this._roundsLeft = this._rollRounds();
    this._roundsLeft--;
    if (this._roundsLeft > 0) return;
    this._roundsLeft = this._rollRounds();
    await this._erupt(rings);
  }

  _rollRounds() {
    return MIN_ROUNDS + Math.floor(Math.random() * (MAX_ROUNDS - MIN_ROUNDS + 1));
  }

  async _erupt(rings) {
    const gc = this.gc;
    const blastPos = new Vector3(0, rings.PIT_Y + 0.5, 0);
    gc.explosionParticles.spawn(blastPos, { count: 70, scale: 1.6 });
    gc.soundManager?.playLavaBurst(blastPos);

    // Everything in the pit or on its slope, living or dead.
    const inPit = gc.discs.filter(d =>
      d.mesh && !d.isDissolving && !d.immovable && d.type !== 'item' &&
      !NOT_EJECTED.includes(d.kind) &&
      Math.hypot(d.mesh.position.x, d.mesh.position.z) < rings.RING_INNER_R);
    if (inPit.length === 0) return;

    const taken = [];
    const flights = [];
    inPit.forEach((disc, i) => {
      const to = this._landingSpot(disc, rings, taken);
      if (!to) return; // nowhere to land: it stays put this time
      taken.push({ x: to.x, z: to.z, radius: disc.radius });
      disc.velocity.set(0, 0, 0);
      disc.moving = false;
      const from = disc.mesh.position.clone();
      flights.push({
        disc, from, to,
        startY: from.y,
        endY: gc.level.getTerrainHeightAt(to.x, to.z) + disc.basePositionY,
        startRotY: disc.mesh.rotation.y,
        age: -(LAUNCH_DELAY + i * LAUNCH_STAGGER),
      });
    });
    if (flights.length === 0) return;

    await new Promise(resolve => {
      this._flights.push(...flights);
      this._onAllLanded = resolve;
    });
  }

  /** A random free spot on the ring for `disc`, clear of lava, discs and other landings. */
  _landingSpot(disc, rings, taken) {
    const gc = this.gc;
    const innerR = rings.RING_INNER_R + disc.radius + LANDING_MARGIN;
    const outerR = rings.OUTER_R - disc.radius - LANDING_MARGIN;
    for (let attempt = 0; attempt < 100; attempt++) {
      const angle = Math.random() * Math.PI * 2;
      const r = innerR + Math.random() * (outerR - innerR);
      const x = Math.sin(angle) * r;
      const z = Math.cos(angle) * r;
      if (!gc.isPositionValid(x, z, disc.radius, true, [disc])) continue;
      if (taken.some(t => Math.hypot(t.x - x, t.z - z) < t.radius + disc.radius + 0.5)) continue;
      return { x, z };
    }
    return null;
  }

  update(dt) {
    if (this._flights.length === 0) return;
    for (const flight of [...this._flights]) {
      flight.age += dt;
      if (flight.age <= 0) continue; // still waiting its turn to launch
      const t = Math.min(flight.age / FLIGHT_SECONDS, 1);
      const { disc, from, to } = flight;
      const peak = Math.max(flight.startY, flight.endY) + ARC_HEIGHT;
      // A parabola through the start, the peak and the landing height.
      const y = (1 - t) * (1 - t) * flight.startY + 2 * (1 - t) * t * (2 * peak - (flight.startY + flight.endY) / 2) + t * t * flight.endY;
      disc.mesh.position.set(from.x + (to.x - from.x) * t, y, from.z + (to.z - from.z) * t);
      disc.mesh.rotation.y = flight.startRotY + t * SPIN_TURNS * Math.PI * 2;
      disc.updatePosition(); // velocity is zero: this just brings its spotlight and rings along
      if (t >= 1) {
        this._land(flight);
        this._flights.splice(this._flights.indexOf(flight), 1);
        this.gc.soundManager?.playBounce(disc.mesh.position.clone());
      }
    }
    if (this._flights.length === 0 && this._onAllLanded) {
      const resolve = this._onAllLanded;
      this._onAllLanded = null;
      resolve();
    }
  }

  _land({ disc, to, endY, startRotY }) {
    disc.mesh.position.set(to.x, endY, to.z);
    disc.mesh.rotation.y = startRotY;
    disc.velocity.set(0, 0, 0);
    disc.moving = false;
    disc.updatePosition();
  }
}
