// js/GateAiming.js
// How monsters aim: a straight-line path check that sees every kind of
// obstacle, and shots through Mirror Gates.
//
// A gate shot aims at the target's "phantom": where the target would appear
// if you looked into the entry gate and saw out of its partner. A gate pair
// maps one doorway onto the other without bending the path, so a straight
// line from the shooter to the phantom enters the gate and leaves its partner
// on a straight line to the real target, and its length is the length of the
// whole trip.

import { Box3, Vector3 } from 'three';
import { fitsThroughGate } from './MirrorGates.js';

const SAMPLES_PER_UNIT = 4;  // how finely a path is checked against walls
const GATE_EDGE_MARGIN = 0.3; // aim this far inside a gate's edges
const LEG_CLEARANCE = 0.3;    // a leg's ends stop this far short of the gate's face
export const GATE_PREFERENCE = 0.7; // take a gate if its route is this much shorter than the direct one

/**
 * A path checker for the level as it stands: true if the straight line from
 * `start` to `end` passes through a wall, a box obstacle, a pillar, a
 * triangle or a polygon obstacle. Build it once per decision.
 */
export function makePathChecker(level) {
  const boxes = level.getAllWalls().map(w => { w.updateMatrixWorld(); return new Box3().setFromObject(w); });
  const obstacles = level.obstacles || [];
  const inObstacle = (x, z) => obstacles.some(obs => {
    if (obs.type === 'pillar') return Math.hypot(x - obs.x, z - obs.z) < obs.width / 2;
    if (obs.type === 'polygon') return pointInPolygon(x, z, obs.points);
    if (obs.type === 'triangle') {
      const R = obs.width / 2, rotY = obs.rotY ?? 0;
      const corners = [0, 1, 2].map(k => {
        const a = rotY + k * 2 * Math.PI / 3;
        return [obs.x + R * Math.sin(a), obs.z + R * Math.cos(a)];
      });
      return pointInPolygon(x, z, corners);
    }
    return false; // box obstacles are walls, checked as boxes
  });
  const point = new Vector3();
  return (start, end) => {
    const steps = Math.max(1, Math.ceil(start.distanceTo(end) * SAMPLES_PER_UNIT));
    for (let i = 1; i <= steps; i++) {
      point.copy(start).lerp(end, i / steps);
      if (boxes.some(box => box.containsPoint(point)) || inObstacle(point.x, point.z)) return true;
    }
    return false;
  };
}

function pointInPolygon(x, z, points) {
  let inside = false;
  points.forEach(([ax, az], i) => {
    const [bx, bz] = points[(i + 1) % points.length];
    if ((az > z) !== (bz > z) && x < ax + (z - az) * (bx - ax) / (bz - az)) inside = !inside;
  });
  return inside;
}

/**
 * The best shot through a Mirror Gate from `disc` at `targetPos`, or null if
 * none is open. Only one gate per throw. Each route must cross its entry gate
 * inside its width, and both legs (to the gate, and from its partner to the
 * target) must be clear.
 * @returns {{dir: Vector3, length: number, entry, exit, points: Vector3[]}|null}
 *   dir: aim (unit, horizontal); length: the whole trip; points: shooter,
 *   entry, exit, target (for the debug overlay)
 */
export function planGateShot(level, disc, targetPos, pathBlocked) {
  const gates = level?.mirrorGates;
  if (!gates?.length) return null;
  const P = disc.mesh.position;
  let best = null;
  for (const A of gates) {
    const B = A.partner;
    if (!B || !fitsThroughGate(disc, A)) continue;
    // The shooter must be in front of the entry gate.
    const pu = (P.x - A.x) * A.tx + (P.z - A.z) * A.tz;
    const pd = (P.x - A.x) * A.nx + (P.z - A.z) * A.nz;
    if (pd <= disc.radius) continue;
    // The target in the exit gate's frame; it must be in front of the exit.
    const tu = (targetPos.x - B.x) * B.tx + (targetPos.z - B.z) * B.tz;
    const td = (targetPos.x - B.x) * B.nx + (targetPos.z - B.z) * B.nz;
    if (td <= 0) continue;
    // Its phantom behind the entry gate (see tryMirrorGate: u → -u, depth → out).
    const phU = -tu, phD = -td;
    const phantom = new Vector3(A.x + phU * A.tx + phD * A.nx, P.y, A.z + phU * A.tz + phD * A.nz);
    // Where the aim line crosses the entry gate's face.
    const s = pd / (pd - phD);
    const crossU = pu + (phU - pu) * s;
    if (Math.abs(crossU) > A.width / 2 - GATE_EDGE_MARGIN) continue;
    const length = P.distanceTo(phantom);
    if (best && length >= best.length) continue;

    // Both legs clear?
    const entry = new Vector3(A.x + crossU * A.tx, P.y, A.z + crossU * A.tz);
    const exit = new Vector3(B.x - crossU * B.tx, P.y, B.z - crossU * B.tz);
    const entryNear = entry.clone().add(new Vector3(A.nx, 0, A.nz).multiplyScalar(disc.radius + LEG_CLEARANCE));
    const exitNear = exit.clone().add(new Vector3(B.nx, 0, B.nz).multiplyScalar(disc.radius + LEG_CLEARANCE));
    if (pathBlocked(P, entryNear) || pathBlocked(exitNear, targetPos)) continue;

    const dir = phantom.clone().sub(P);
    dir.y = 0;
    dir.normalize();
    best = { dir, length, entry: A, exit: B, points: [P.clone(), entry, exit, targetPos.clone()] };
  }
  return best;
}

/**
 * Should `disc` throw through a gate at `targetPos` rather than straight at
 * it? Yes if the direct line is blocked, or the gate route is clearly
 * shorter. Records the chosen plan on `gc.lastAIPlan` for the debug overlay.
 * @returns the gate shot (see planGateShot), or null to throw direct
 */
export function chooseGateShot(gc, disc, targetPos, pathBlocked, maxLength = Infinity) {
  gc.lastAIPlan = null;
  const shot = planGateShot(gc.level, disc, targetPos, pathBlocked);
  if (!shot || shot.length > maxLength) return null;
  const direct = disc.mesh.position.distanceTo(targetPos);
  const directBlocked = pathBlocked(disc.mesh.position, targetPos);
  if (!directBlocked && shot.length >= direct * GATE_PREFERENCE) return null;
  gc.lastAIPlan = shot;
  return shot;
}
