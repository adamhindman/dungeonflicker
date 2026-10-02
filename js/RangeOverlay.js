// js/RangeOverlay.js
// While Tab is held, every living disc shows a dim ring in its own colour
// marking how far it can reach with a full-power flick on open floor: the
// distance its centre slides before friction stops it, plus its radius (walls,
// bounces and ramps are ignored). The ring of the disc under the mouse is
// brighter and twice as thick.

import {
  DoubleSide, Group, Mesh, MeshBasicMaterial, Plane, Raycaster, RingGeometry, Vector3,
} from 'three';

const EDGE_WIDTH = 0.12;
const EDGE_OPACITY = 0.08;
const HOVER_EDGE_WIDTH = EDGE_WIDTH * 2;
const HOVER_EDGE_OPACITY = 0.95;
const FLOOR_OFFSET = 0.04;   // just above the floor, below the discs

// Must match PhysicsEngine: friction per frame, and when a disc counts as stopped.
const STOP_SPEED = 0.01;
const frictionFor = disc =>
  disc.kind === 'Bomb' ? 0.888 : (disc.kind === 'Wizard' || disc.kind === 'Necromancer') ? 0.92 : 0.96;

/** Fastest launch speed the disc can be thrown at (must match GameController/aiThrow). */
function maxLaunchSpeed(disc) {
  if (disc.type === 'NPC') {
    // aiThrow: min(dist / 10, 1) × skill factor, then × power ÷ mass.
    const skillFactor = 0.7 + 0.3 * (disc.skillLevel / 100);
    return (skillFactor * disc.throwPowerMultiplier) / disc.mass;
  }
  const scale = disc.gameController?._throwPowerScale(disc) ?? 1; // e.g. an Exhausted Barbarian
  return (disc.kind === 'Bomb' ? 1.8 : 1) * scale; // player throws are capped at this speed
}

/** How far the disc's centre slides from a full-power launch on flat, open floor. */
export function slideDistance(disc) {
  return slideDistanceForSpeed(disc, maxLaunchSpeed(disc));
}

/** How far the disc's centre slides on flat, open floor when launched at `speed`. */
export function slideDistanceForSpeed(disc, speed) {
  const friction = frictionFor(disc);
  let distance = 0;
  for (let i = 0; i < 2000 && speed >= STOP_SPEED; i++) {
    distance += speed;   // PhysicsEngine moves first…
    speed *= friction;   // …then applies friction
  }
  return distance;
}

export class RangeOverlay {
  constructor(gc) {
    this.gc = gc;
    this.visible = false;
    this._circles = new Map(); // disc → { group, normal, hovered, radius }
    this._raycaster = new Raycaster();
  }

  show() {
    if (this.visible) return;
    this.visible = true;
    this.update();
  }

  hide() {
    if (!this.visible) return;
    this.visible = false;
    for (const circle of this._circles.values()) this._dispose(circle.group);
    this._circles.clear();
  }

  /** Keeps a circle under every living disc while shown. Call every frame. */
  update() {
    if (!this.visible) return;
    const gc = this.gc;
    const living = new Set(gc.discs.filter(d => d.mesh && !d.dead && d.kind !== 'Fireball'));

    for (const [disc, circle] of this._circles) {
      if (!living.has(disc)) { this._dispose(circle.group); this._circles.delete(disc); }
    }
    const hoveredDisc = this._discUnderMouse(living);
    for (const disc of living) {
      // The radius can change (e.g. the Blob grows heavier as it evolves).
      const radius = slideDistance(disc) + disc.radius;
      let circle = this._circles.get(disc);
      if (!circle || Math.abs(circle.radius - radius) > 0.01) {
        if (circle) this._dispose(circle.group);
        circle = this._makeCircle(radius, disc.initialColor ?? 0xffffff);
        gc.scene.add(circle.group);
        this._circles.set(disc, circle);
      }
      const { x, y, z } = disc.mesh.position;
      circle.group.position.set(x, y - disc.basePositionY + FLOOR_OFFSET, z);
      const isHovered = disc === hoveredDisc;
      circle.normal.visible = !isHovered;
      circle.hovered.visible = isHovered;
    }
  }

  /** The living disc under the mouse pointer, if any. */
  _discUnderMouse(living) {
    const gc = this.gc;
    if (!gc.mouse || !gc.camera) return null;
    this._raycaster.setFromCamera(gc.mouse, gc.camera);
    let best = null;
    let bestDistance = Infinity;
    for (const disc of living) {
      const hit = this._raycaster.intersectObject(disc.mesh, true)[0];
      if (hit && hit.distance < bestDistance) { best = disc; bestDistance = hit.distance; }
    }
    return best;
  }

  /** Planes at the room's outer edges, so circles don't spill past the walls into the void. */
  _roomClipPlanes() {
    const level = this.gc.level;
    if (!level) return [];
    const hw = level.fieldWidth / 2, hd = level.fieldDepth / 2;
    return [
      new Plane(new Vector3(1, 0, 0), hw),    // keeps x ≥ -hw
      new Plane(new Vector3(-1, 0, 0), hw),   // keeps x ≤ hw
      new Plane(new Vector3(0, 0, 1), hd),
      new Plane(new Vector3(0, 0, -1), hd),
    ];
  }

  /** A ring in two versions: dim and thin, or bright and twice as thick for the hovered disc. */
  _makeCircle(radius, color) {
    const clippingPlanes = this._roomClipPlanes();
    const ring = (width, opacity) => new Mesh(
      new RingGeometry(radius - width, radius, 96),
      new MeshBasicMaterial({
        color, transparent: true, opacity, side: DoubleSide, depthWrite: false, clippingPlanes,
      }),
    );
    const normal = ring(EDGE_WIDTH, EDGE_OPACITY);
    const hovered = ring(HOVER_EDGE_WIDTH, HOVER_EDGE_OPACITY);
    hovered.visible = false;
    const group = new Group();
    group.add(normal, hovered);
    group.rotation.x = -Math.PI / 2;
    group.renderOrder = 1;
    return { group, normal, hovered, radius };
  }

  _dispose(group) {
    this.gc.scene.remove(group);
    group.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) o.material.dispose();
    });
  }
}
