// js/BouncePreview.js
// The bounce preview (Spectacles): while aiming with Caps Lock on, a dashed
// line shows the path the flung disc will take, off up to MAX_BOUNCES walls
// and obstacles, with an X where it strikes each surface. It ends where the
// disc stops, or at its next contact after the last bounce shown. Only the
// flung disc's own path is shown: if it hits another disc, its rebound is
// drawn but that's the last leg (the other disc gets knocked away, so
// anything after would be guesswork).
//
// The path is worked out by sliding a stand-in for the disc along, step by
// step, with the real physics' own wall and obstacle collision, friction and
// bounciness (PhysicsEngine.collideWithRoom etc.), so it matches the real
// throw. Where it can't be exact, it's simple instead:
//   • sloped floors (the Sunken Hex, the Caldera) are ignored: straight lines;
//   • the line stops at a Mirror Gate rather than following it through;
//   • Hardy Shields and moving crushers aren't included.

import {
  BufferAttribute, BufferGeometry, DoubleSide, Group, Line, LineDashedMaterial, Mesh, MeshBasicMaterial,
  PlaneGeometry, Vector3,
} from 'three';
import Disc from './Disc.js';
import { gateEntered } from './MirrorGates.js';

const COLOR = 0x7fe0ff;
const MAX_BOUNCES = 3;    // bounces shown (off walls and obstacles; a disc hit is always the last)
const CROSS_SIZE = 0.7;   // each arm of the X marking where the disc strikes a surface
const CROSS_THICKNESS = 0.09;
const MAX_STEPS = 3000;   // physics steps to look ahead (a slide on ice can be long)
const STOP_SPEED = 0.01;  // as Disc.applyFriction: below this, it has stopped
// Discs the flung disc slides straight over
const PASS_OVER = ['Knife', 'ResurrectionFlask', 'DroppedPotion'];

export class BouncePreview {
  constructor(gc) {
    this.gc = gc;
    const geometry = new BufferGeometry();
    // The start, a point at each bounce, and the end
    geometry.setAttribute('position', new BufferAttribute(new Float32Array((MAX_BOUNCES + 2) * 3), 3));
    this.line = new Line(geometry, new LineDashedMaterial({
      color: COLOR, dashSize: 0.45, gapSize: 0.3, transparent: true, opacity: 0.9, depthTest: false,
    }));
    this.line.renderOrder = 998; // just under the aim line
    this.line.frustumCulled = false;
    this.line.visible = false;
    gc.scene.add(this.line);

    // Where the disc strikes a surface at each bounce: a flat X on the floor
    const barGeometry = new PlaneGeometry(CROSS_SIZE, CROSS_THICKNESS);
    const crossMaterial = new MeshBasicMaterial({
      color: COLOR, transparent: true, opacity: 0.9, side: DoubleSide, depthTest: false,
    });
    this.markers = Array.from({ length: MAX_BOUNCES }, () => {
      const marker = new Group();
      for (const angle of [Math.PI / 4, -Math.PI / 4]) {
        const bar = new Mesh(barGeometry, crossMaterial);
        bar.rotation.set(-Math.PI / 2, 0, angle); // lying flat, at 45° either way
        bar.renderOrder = 998;
        marker.add(bar);
      }
      marker.visible = false;
      gc.scene.add(marker);
      return marker;
    });
  }

  /** Shows the path of `disc` flung along (dirX, dirZ) at `speed`. */
  show(disc, dirX, dirZ, speed) {
    const path = this._trace(disc, dirX, dirZ, speed);
    const y = disc.mesh.position.y + disc.height / 2;
    const positions = this.line.geometry.attributes.position;
    path.points.forEach((p, i) => positions.setXYZ(i, p.x, y, p.z));
    positions.needsUpdate = true;
    this.line.geometry.setDrawRange(0, path.points.length);
    this.line.computeLineDistances();
    this.line.visible = true;

    this.markers.forEach((marker, i) => {
      const strike = path.strikes[i];
      marker.visible = !!strike;
      if (strike) marker.position.set(strike.x, y, strike.z);
    });
  }

  hide() {
    this.line.visible = false;
    for (const marker of this.markers) marker.visible = false;
  }

  /**
   * Slides a stand-in for `disc` along until it stops, enters a Mirror Gate,
   * or makes its next contact after the last bounce shown (MAX_BOUNCES, or a
   * disc hit, whichever comes first).
   * @returns {{ points: Vector3[], strikes: Vector3[] }} the path of the
   *   disc's centre (start, each bounce, end) and where its edge strikes the
   *   surface at each bounce
   */
  _trace(disc, dirX, dirZ, speed) {
    const gc = this.gc;
    const physics = gc.physics;
    // A stand-in with the disc's size and the Disc methods the wall collision uses
    const ghost = Object.assign(Object.create(Disc.prototype), {
      mesh: { position: disc.mesh.position.clone() },
      velocity: new Vector3(dirX * speed, 0, dirZ * speed),
      radius: disc.radius,
      kind: disc.kind,
      isGhost: !!disc.isGhost,
      moving: true,
    });
    const bounceDamping = physics.bounceDampingFor(disc);
    const blockers = this._blockers(disc);
    const pos = ghost.mesh.position;
    const points = [pos.clone()];
    const strikes = [];
    let lastLeg = false; // after the last bounce shown: the next contact ends the line
    const before = new Vector3();

    for (let step = 0; step < MAX_STEPS; step++) {
      pos.add(ghost.velocity);
      if (gateEntered(gc.level, ghost)) break; // where it goes through a gate is out of scope

      before.copy(ghost.velocity);
      const hitRoom = physics.collideWithRoom(ghost, bounceDamping);
      const hitDisc = !hitRoom && this._bounceOffDisc(ghost, disc, blockers);
      if (hitRoom || hitDisc) {
        if (lastLeg) break;
        points.push(pos.clone());
        strikes.push(this._strikePoint(pos, before, ghost.velocity, ghost.radius));
        // A disc hit knocks the other disc away: past the rebound, it's guesswork.
        lastLeg = hitDisc || strikes.length >= MAX_BOUNCES;
      }

      ghost.velocity.multiplyScalar(physics.frictionFor(ghost));
      if (ghost.velocity.length() < STOP_SPEED) break;
    }
    points.push(pos.clone());
    return { points, strikes };
  }

  /**
   * Where the edge of a disc of `radius` centred at `pos` touches the surface
   * it just bounced off. A bounce flips the velocity along the surface's
   * normal, so the change in velocity (`after` − `before`) points straight
   * away from it; the strike is one radius the other way.
   */
  _strikePoint(pos, before, after, radius) {
    const nx = after.x - before.x, nz = after.z - before.z;
    const len = Math.hypot(nx, nz);
    if (len < 1e-6) return pos.clone();
    return new Vector3(pos.x - nx / len * radius, pos.y, pos.z - nz / len * radius);
  }

  /**
   * If the stand-in overlaps one of `blockers`, pushes it out and bounces it
   * off, as the real disc-to-disc collision would (the other disc at rest).
   * Returns true if it bounced.
   */
  _bounceOffDisc(ghost, disc, blockers) {
    const pos = ghost.mesh.position;
    for (const other of blockers) {
      const op = other.mesh.position;
      const dx = pos.x - op.x, dz = pos.z - op.z;
      const dist = Math.hypot(dx, dz);
      const minDist = ghost.radius + other.radius;
      if (dist >= minDist || dist < 1e-6) continue;
      const nx = dx / dist, nz = dz / dist;
      pos.x = op.x + nx * minDist;
      pos.z = op.z + nz * minDist;
      const vn = ghost.velocity.x * nx + ghost.velocity.z * nz;
      if (vn >= 0) continue; // already moving apart
      const restitution = disc.kind === 'Bomb' || other.kind === 'Bomb' ? 0.1 : 1;
      const share = (1 + restitution) * other.mass / (disc.mass + other.mass);
      ghost.velocity.x -= share * vn * nx;
      ghost.velocity.z -= share * vn * nz;
      return true;
    }
    return false;
  }

  /** The discs `disc` would bump into rather than pass through or over. */
  _blockers(disc) {
    const gc = this.gc;
    if (disc.isGhost) return []; // a Ghost Ring disc passes through everyone
    if (disc.kind === 'Knife' || disc.kind === 'ResurrectionFlask' || disc.kind === 'RoguePotion') return [];
    const ownOrbs = disc.kind === 'Wizard' ? (gc.wizardController?.orbs ?? []) : [];
    const ownDead = disc.kind === 'Necromancer' ? (gc.necromancerController?.animatedDeadDiscs ?? []) : [];
    return gc.discs.filter(d => {
      if (d === disc || !d.mesh || d.isGhost || PASS_OVER.includes(d.kind)) return false;
      if (d.dead && d.isDissolving) return false;
      if (disc.kind === 'HealingOrb') return d.dead;          // heals the living and passes on
      if (disc.kind === 'Orb' && (d.dead || d.type === 'player')) return false;
      if (disc.kind === 'Bomb' && d.kind === 'Rogue') return false; // leaves its thrower cleanly
      if (ownOrbs.includes(d) && !d.moving) return false;     // orbiting orbs and minions
      if (ownDead.includes(d) && !d.moving) return false;
      return true;
    });
  }
}
