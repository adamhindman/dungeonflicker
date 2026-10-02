// js/Geometry2D.js
// Small floor-plane (x, z) geometry helpers for AI path checks.

/** Distance from point (px, pz) to the segment (ax, az)–(bx, bz). */
export function distToSegment(px, pz, ax, az, bx, bz) {
  const dx = bx - ax, dz = bz - az;
  const lenSq = dx * dx + dz * dz;
  const t = lenSq > 0 ? Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / lenSq)) : 0;
  return Math.hypot(px - (ax + t * dx), pz - (az + t * dz));
}

/**
 * Whether the segment (ax, az)–(bx, bz) passes within `pad` of an
 * axis-aligned box obstacle ({ x, z, width, depth }). Slab test against the
 * box grown by `pad` on every side.
 */
export function segmentHitsBox(ax, az, bx, bz, box, pad) {
  const minX = box.x - box.width / 2 - pad, maxX = box.x + box.width / 2 + pad;
  const minZ = box.z - box.depth / 2 - pad, maxZ = box.z + box.depth / 2 + pad;
  let t0 = 0, t1 = 1;
  for (const [start, delta, lo, hi] of [[ax, bx - ax, minX, maxX], [az, bz - az, minZ, maxZ]]) {
    if (Math.abs(delta) < 1e-9) {
      if (start < lo || start > hi) return false;
    } else {
      let ta = (lo - start) / delta, tb = (hi - start) / delta;
      if (ta > tb) [ta, tb] = [tb, ta];
      t0 = Math.max(t0, ta);
      t1 = Math.min(t1, tb);
      if (t0 > t1) return false;
    }
  }
  return true;
}

/** Whether the segment passes within `pad` of a level obstacle (round columns or boxes). */
export function segmentHitsObstacle(ax, az, bx, bz, obstacle, pad) {
  if (obstacle.type === 'pillar' || obstacle.type === 'triangle') {
    return distToSegment(obstacle.x, obstacle.z, ax, az, bx, bz) < obstacle.width / 2 + pad;
  }
  return segmentHitsBox(ax, az, bx, bz, obstacle, pad);
}
