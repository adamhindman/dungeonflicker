import { LavaPool } from './LavaPool.js';

/**
 * Generates lava pools for each level type (rect, circle, hex, donut, bullseye).
 *
 * Holds a reference to GameController (gc) so it can read level geometry and
 * write directly to gc.lavaPools and gc.scene.
 */
export class LavaManager {
  constructor(gc) {
    this.gc = gc;
  }

  /**
   * Clear any existing lava pools and generate fresh ones for the current level.
   * Adds all new pool meshes to gc.scene and populates gc.lavaPools.
   */
  generate() {
    const gc = this.gc;

    if (!gc.level || !gc.scene) {
return;
    }

    // Remove any existing lava pool meshes and clear the list before regenerating.
    for (const pool of gc.lavaPools) {
      if (pool.getMesh()) gc.scene.remove(pool.getMesh());
    }
    gc.lavaPools = [];

    // Crusher level: no random lava pools.
    if (gc.level.crusherConfig) {
      return;
    }

    // ── Hexagonal level ──────────────────────────────────────────────────────
    // Center pit pool + random pools on the flat outer ring.
    if (gc.level.hexRings) {
      const { LOW_Y, MED_Y, RC_in, RA_in } = gc.level.hexRings;

      const centerPool = new LavaPool({
        centerX:      0,
        centerZ:      0,
        baseRadius:   3.8,
        numVertices:  10,
        irregularity: 0.15,
        yPosition:    LOW_Y + 0.05,
      });
      if (centerPool.getMesh()) {
        gc.scene.add(centerPool.getMesh());
        gc.lavaPools.push(centerPool);
      }

      const POOL_INNER_R = RC_in + 3.0;
      const POOL_OUTER_R = RA_in - 4.0;
      const numPools = 2 + Math.floor(Math.random() * 3); // 2–4 pools
      const poolY    = MED_Y + 0.05;
      for (let i = 0; i < numPools; i++) {
        let placed = false;
        for (let attempt = 0; attempt < 80 && !placed; attempt++) {
          const angle  = Math.random() * Math.PI * 2;
          const r      = POOL_INNER_R + Math.random() * (POOL_OUTER_R - POOL_INNER_R);
          const x      = Math.sin(angle) * r;
          const z      = Math.cos(angle) * r;
          const radius = 1.5 + Math.random() * 1.5;

          let tooClose = false;
          for (const p of gc.lavaPools) {
            const dx = x - p.centerX;
            const dz = z - p.centerZ;
            if (Math.sqrt(dx * dx + dz * dz) < radius + p.baseRadius + 3) {
              tooClose = true;
              break;
            }
          }
          if (tooClose) continue;

          const pool = new LavaPool({
            centerX:      x,
            centerZ:      z,
            baseRadius:   radius,
            numVertices:  8 + Math.floor(Math.random() * 4),
            irregularity: 0.2 + Math.random() * 0.2,
            yPosition:    poolY,
          });
          if (pool.getMesh()) {
            gc.scene.add(pool.getMesh());
            gc.lavaPools.push(pool);
          }
          placed = true;
        }
      }
      return;
    }

    // ── Donut level ──────────────────────────────────────────────────────────
    // Center pit pool + 2–3 random pools scattered on the flat ring.
    if (gc.level.donutRings) {
      const { PIT_R, PIT_Y, RING_INNER_R, OUTER_R } = gc.level.donutRings;

      // Central pit — fill the pit floor with lava.
      const centerPool = new LavaPool({
        centerX:      0,
        centerZ:      0,
        baseRadius:   PIT_R - 0.3,
        numVertices:  12,
        irregularity: 0.08,
        yPosition:    PIT_Y + 0.05,
      });
      if (centerPool.getMesh()) {
        gc.scene.add(centerPool.getMesh());
        gc.lavaPools.push(centerPool);
      }

      // Ring pools — placed on the flat ring, clear of walls, pillars, and each other.
      const numRingPools  = 2 + Math.floor(Math.random() * 2); // 2 or 3
      const RING_POOL_MIN = RING_INNER_R + 3.5;
      const RING_POOL_MAX = OUTER_R - 5.5;
      for (let i = 0; i < numRingPools; i++) {
        let placed = false;
        for (let attempt = 0; attempt < 80 && !placed; attempt++) {
          const angle  = Math.random() * Math.PI * 2;
          const r      = RING_POOL_MIN + Math.random() * (RING_POOL_MAX - RING_POOL_MIN);
          const x      = Math.sin(angle) * r;
          const z      = Math.cos(angle) * r;
          const radius = 1.5 + Math.random() * 1.2;

          if (!this._isPositionValid(x, z, radius)) continue;

          const pool = new LavaPool({
            centerX:      x,
            centerZ:      z,
            baseRadius:   radius,
            numVertices:  8 + Math.floor(Math.random() * 4),
            irregularity: 0.2 + Math.random() * 0.2,
            yPosition:    0.05,
          });
          if (pool.getMesh()) {
            gc.scene.add(pool.getMesh());
            gc.lavaPools.push(pool);
          }
          placed = true;
        }
      }
      return;
    }

    // ── Bullseye level ───────────────────────────────────────────────────────
    // No lava pools on the bullseye level.
    if (gc.level.bullseyeRings) {
      return;
    }

    // ── Default rectangular / circular level ─────────────────────────────────
    const numLavaPoolsToGenerate = Math.floor(Math.random() * 2) + 1; // 1 or 2
    const MIN_RADIUS = 2;
    const MAX_RADIUS = 4;
    const Y_POSITION = 0.05;

    for (let i = 0; i < numLavaPoolsToGenerate; i++) {
      const placement = this._findValidPlacement(MIN_RADIUS, MAX_RADIUS);
      if (placement) {
        const lavaPool = new LavaPool({
          centerX:      placement.x,
          centerZ:      placement.z,
          baseRadius:   placement.radius,
          numVertices:  12 + Math.floor(Math.random() * 5),
          irregularity: 0.1 + Math.random() * 0.2,
          yPosition:    Y_POSITION,
        });
        if (lavaPool.getMesh()) {
          gc.scene.add(lavaPool.getMesh());
          gc.lavaPools.push(lavaPool);
        }
      } else {
      }
    }
  }

  // ─── Private ──────────────────────────────────────────────────────────────

  _findValidPlacement(minRadius, maxRadius) {
    const gc = this.gc;
    for (let i = 0; i < 50; i++) {
      const radius     = minRadius + Math.random() * (maxRadius - minRadius);
      const edgeBuffer = radius + 1;
      const x = (Math.random() - 0.5) * (gc.level.fieldWidth  - edgeBuffer * 2);
      const z = (Math.random() - 0.5) * (gc.level.fieldDepth  - edgeBuffer * 2);
      if (this._isPositionValid(x, z, radius)) {
        return { x, z, radius };
      }
    }
    return null;
  }

  _isPositionValid(centerX, centerZ, baseRadius) {
    const gc = this.gc;

    // 1. Check points around the pool's circumference and center against fixed obstacles/walls.
    const pointsToCheck = [
      { x: centerX,                          z: centerZ                          },
      { x: centerX + baseRadius,             z: centerZ                          },
      { x: centerX - baseRadius,             z: centerZ                          },
      { x: centerX,                          z: centerZ + baseRadius             },
      { x: centerX,                          z: centerZ - baseRadius             },
      { x: centerX + baseRadius * 0.707,     z: centerZ + baseRadius * 0.707    },
      { x: centerX - baseRadius * 0.707,     z: centerZ + baseRadius * 0.707    },
      { x: centerX + baseRadius * 0.707,     z: centerZ - baseRadius * 0.707    },
      { x: centerX - baseRadius * 0.707,     z: centerZ - baseRadius * 0.707    },
    ];

    for (const point of pointsToCheck) {
      if (!gc.isPositionValid(point.x, point.z, 0.1)) return false;
    }

    // 2. Check against existing discs.
    for (const disc of gc.discs) {
      if (disc.dead) continue;
      const distSq = (disc.mesh.position.x - centerX) ** 2 + (disc.mesh.position.z - centerZ) ** 2;
      const minSep = baseRadius + disc.radius + 0.5;
      if (distSq < minSep ** 2) return false;
    }

    // 3. Check against other already placed lava pools.
    for (const existingPool of gc.lavaPools) {
      const distSq = (existingPool.centerX - centerX) ** 2 + (existingPool.centerZ - centerZ) ** 2;
      const minSep = baseRadius + existingPool.baseRadius + 1.0;
      if (distSq < minSep ** 2) return false;
    }

    return true;
  }
}
