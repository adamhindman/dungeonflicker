// js/HitboxOverlay.js
// Debug view (Shift+B): draws the shapes the physics actually collides with,
// rebuilt every frame, so a hitbox that doesn't match its model can be seen
// instead of found by bumping into it. Drawn on top of everything.
//
//   red     the room's outer boundary: the field rectangle every disc is
//           clamped to, plus a polygon room's edges, or the round clamp of a
//           circular room / the boss room's arc / the hex room's ring
//   yellow  box walls, as the axis-aligned box Box3 makes of them (a rotated
//           wall shows how far its box overshoots)
//   cyan    round columns (colliderRadius), pillar, triangle and polygon obstacles
//   ice blue the edges of ice patches (where friction nearly vanishes)
//   (pair)  Mirror Gates' faces, a colour per pair (so the pairs show), with a tick outwards
//   magenta crushers at their current length
//   green   every disc's radius
//   white   the last gate shot a monster planned (to the entry gate; from the exit to its target)
//
// Must match PhysicsEngine's collision code.

import { BufferGeometry, Box3, Float32BufferAttribute, LineBasicMaterial, LineSegments, Vector3 } from 'three';

const COLORS = {
  boundary: [1, 0.2, 0.2],
  box: [1, 0.85, 0.1],
  round: [0.2, 0.9, 1],
  crusher: [1, 0.3, 1],
  disc: [0.3, 1, 0.3],
  plan: [1, 1, 1],
  ice: [0.6, 0.85, 1],
};
const PAIR_COLORS = [      // one per Mirror Gate pair
  [1, 0.3, 0.3], [1, 0.6, 0.2], [0.4, 0.9, 0.4], [0.3, 0.6, 1], [0.8, 0.4, 1],
  [1, 1, 0.4], [0.4, 1, 1], [1, 0.5, 0.8],
];
const LINE_Y = 0.1;        // just above the floor
const CIRCLE_SEGMENTS = 48;

const _box = new Box3();
const _pos = new Vector3();

export class HitboxOverlay {
  constructor(gc) {
    this.gc = gc;
    this.visible = false;
    this._lines = null;
  }

  toggle() {
    this.visible = !this.visible;
    if (!this.visible) this._dispose();
  }

  /** Redraws every hitbox while shown. Call every frame. */
  update() {
    if (!this.visible) return;
    const level = this.gc.level;
    this._dispose();
    if (!level) return;

    const positions = [];
    const colors = [];
    const segment = (color, x0, y0, z0, x1, y1, z1) => {
      positions.push(x0, y0, z0, x1, y1, z1);
      colors.push(...color, ...color);
    };
    const loop = (color, points, y = LINE_Y) => {
      points.forEach(([x0, z0], i) => {
        const [x1, z1] = points[(i + 1) % points.length];
        segment(color, x0, y, z0, x1, y, z1);
      });
    };
    const circle = (color, cx, cz, r, y = this._floorY(cx, cz)) => {
      const points = [];
      for (let i = 0; i < CIRCLE_SEGMENTS; i++) {
        const a = (i / CIRCLE_SEGMENTS) * Math.PI * 2;
        points.push([cx + Math.cos(a) * r, cz + Math.sin(a) * r]);
      }
      loop(color, points, y);
    };

    // Outer boundary.
    const hw = level.fieldWidth / 2, hd = level.fieldDepth / 2;
    loop(COLORS.boundary, [[-hw, -hd], [hw, -hd], [hw, hd], [-hw, hd]]);
    if (level.boundaryEdges) {
      loop(COLORS.boundary, this._polygonCorners(level.boundaryEdges));
    } else if (level.circleRadius && !level.hexRings) {
      circle(COLORS.boundary, 0, 0, level.circleRadius, LINE_Y);
    }
    if (level.arcWall) circle(COLORS.boundary, level.arcWall.cx, level.arcWall.cz, level.arcWall.r, LINE_Y);
    if (level.hexRings) circle(COLORS.boundary, 0, 0, level.hexRings.RA_in, LINE_Y);

    // Walls (and the door slab while it's shut), as PhysicsEngine sees them.
    for (const wall of level.getAllWalls(false)) {
      const radius = wall.userData?.colliderRadius;
      if (radius) {
        wall.getWorldPosition(_pos);
        circle(COLORS.round, _pos.x, _pos.z, radius);
        continue;
      }
      wall.updateMatrixWorld();
      _box.setFromObject(wall);
      if (_box.min.y > 1) continue; // above the discs (e.g. the wall over a door): never hit
      loop(COLORS.box, [[_box.min.x, _box.min.z], [_box.max.x, _box.min.z], [_box.max.x, _box.max.z], [_box.min.x, _box.max.z]]);
    }

    // Obstacles with their own collision.
    for (const obs of level.obstacles || []) {
      if (obs.type === 'pillar') {
        circle(COLORS.round, obs.x, obs.z, obs.width / 2);
      } else if (obs.type === 'triangle') {
        const R = obs.width / 2, rotY = obs.rotY ?? 0;
        const corners = [0, 1, 2].map(k => {
          const a = rotY + k * 2 * Math.PI / 3;
          return [obs.x + R * Math.sin(a), obs.z + R * Math.cos(a)];
        });
        loop(COLORS.round, corners, this._floorY(obs.x, obs.z));
      } else if (obs.type === 'polygon') {
        loop(COLORS.round, obs.points);
      }
    }

    // Ice patches: where friction nearly vanishes.
    for (const patch of level.icePatches || []) loop(COLORS.ice, patch.points);

    // Mirror Gates: the face a disc must touch, in the pair's colour, with a
    // tick pointing out of it.
    // Each pair gets its own colour here, whatever the gates look like in the game.
    const pairs = [...new Set((level.mirrorGates || []).map(g => g.pair))];
    for (const g of level.mirrorGates || []) {
      const color = PAIR_COLORS[pairs.indexOf(g.pair) % PAIR_COLORS.length];
      const hx = g.tx * g.width / 2, hz = g.tz * g.width / 2;
      segment(color, g.x - hx, LINE_Y, g.z - hz, g.x + hx, LINE_Y, g.z + hz);
      segment(color, g.x, LINE_Y, g.z, g.x + g.nx, LINE_Y, g.z + g.nz);
    }

    // Crushers: a box from the anchor out to the current length.
    for (const c of level.crusherConfig?.crushers || []) {
      const dx = Math.cos(c.angle), dz = Math.sin(c.angle);
      const sx = -dz * c.width / 2, sz = dx * c.width / 2;
      const ex = c.anchorX + dx * c.currentLength, ez = c.anchorZ + dz * c.currentLength;
      loop(COLORS.crusher, [
        [c.anchorX + sx, c.anchorZ + sz], [ex + sx, ez + sz], [ex - sx, ez - sz], [c.anchorX - sx, c.anchorZ - sz],
      ]);
    }

    // The last gate shot a monster planned: shooter → entry gate, exit gate → target.
    const plan = this.gc.lastAIPlan;
    if (plan) {
      const [from, entry, exit, to] = plan.points;
      segment(COLORS.plan, from.x, LINE_Y, from.z, entry.x, LINE_Y, entry.z);
      segment(COLORS.plan, exit.x, LINE_Y, exit.z, to.x, LINE_Y, to.z);
    }

    // Discs.
    for (const disc of this.gc.discs) {
      if (!disc?.mesh || disc.dead) continue;
      const { x, y, z } = disc.mesh.position;
      circle(COLORS.disc, x, z, disc.radius, y - (disc.basePositionY ?? 0) + LINE_Y);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    this._lines = new LineSegments(geometry, new LineBasicMaterial({
      vertexColors: true, depthTest: false, transparent: true,
    }));
    this._lines.renderOrder = 999;
    this.gc.scene.add(this._lines);
  }

  /** Floor height at (x, z): raised on the hex and donut rooms' ramps. */
  _floorY(x, z) {
    const level = this.gc.level;
    const terrain = (level?.hexRings || level?.donutRings) ? level.getTerrainHeightAt(x, z) : 0;
    return terrain + LINE_Y;
  }

  /** Corners of a convex polygon given as consecutive half-planes n·p ≤ distance. */
  _polygonCorners(edges) {
    return edges.map((a, i) => {
      const b = edges[(i + 1) % edges.length];
      const det = a.nx * b.nz - a.nz * b.nx;
      if (Math.abs(det) < 1e-6) return [a.nx * a.distance, a.nz * a.distance];
      return [
        (a.distance * b.nz - b.distance * a.nz) / det,
        (a.nx * b.distance - b.nx * a.distance) / det,
      ];
    });
  }

  _dispose() {
    if (!this._lines) return;
    this.gc.scene.remove(this._lines);
    this._lines.geometry.dispose();
    this._lines.material.dispose();
    this._lines = null;
  }
}
