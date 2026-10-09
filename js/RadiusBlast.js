// js/RadiusBlast.js
// The Radius Blast spell, shared by the Wizard and Paracelsus: every living disc
// within `radius` of the caster takes 1 damage and is shoved away from it
// (harder the closer it stood), unless a Hardy Shield blocks the blast. Discs
// phased by a Ghost Ring aren't touched at all.

import { DoubleSide, Mesh, MeshBasicMaterial, TorusGeometry } from 'three';

/** Applies a Radius Blast centred on `caster`. Returns the discs it hit. */
export function applyRadiusBlast(gc, caster, radius, force) {
  const origin = caster.mesh.position;
  const hit = [];
  gc.discs.forEach(disc => {
    if (disc === caster || disc.dead || disc.isGhost) return;
    const dx = disc.mesh.position.x - origin.x;
    const dz = disc.mesh.position.z - origin.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist > 0 && dist <= radius) {
      if (gc.itemManager?.shieldBlocks(disc, origin.x, origin.z)) return; // Hardy Shield
      if (!disc.immovable) { // e.g. Paracelsus's alembics: hurt but not shoved
        const push = force * (1 - dist / radius);
        disc.velocity.x += (dx / dist) * push;
        disc.velocity.z += (dz / dist) * push;
        disc.moving = true;
      }
      disc.takeHit(1, caster);
      hit.push(disc);
    }
  });
  return hit;
}

/**
 * A blast centred on a point (x, z), e.g. a mortar shell: every living disc
 * within `radius` is shoved away from the centre (harder the closer it
 * stood) and, if `shouldDamage(disc)` says so, takes `damage`. A Hardy Shield
 * between the centre and its owner takes 1 off the damage but not the shove.
 * Ghost Ring discs, items and anything `skip(disc)` names aren't touched,
 * except that a powder keg in reach is set off.
 * Returns the discs it reached.
 */
export function applyBlastAt(gc, x, z, radius, force, { damage = 1, shouldDamage = () => true, skip = () => false } = {}) {
  const reached = [];
  gc.discs.forEach(disc => {
    if (disc.dead || disc.isGhost || skip(disc)) return;
    const dx = disc.mesh.position.x - x;
    const dz = disc.mesh.position.z - z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist > radius) return;
    // A powder keg in the blast goes off too; other items aren't touched.
    if (disc.kind === 'PowderKeg') { disc.takeHit(damage, null); return; }
    if (disc.type === 'item') return;
    if (!disc.immovable) {
      // Dead centre has no direction: shove it any way at all
      const angle = Math.random() * Math.PI * 2;
      const nx = dist > 0.001 ? dx / dist : Math.cos(angle);
      const nz = dist > 0.001 ? dz / dist : Math.sin(angle);
      const push = force * (1 - dist / radius);
      disc.velocity.x += nx * push;
      disc.velocity.z += nz * push;
      disc.moving = true;
    }
    if (shouldDamage(disc)) {
      const shielded = gc.itemManager?.shieldBlocks(disc, x, z);
      const amount = shielded ? damage - 1 : damage;
      if (amount > 0) disc.takeHit(amount, null);
    }
    reached.push(disc);
  });
  return reached;
}

const RING_DURATION = 0.45;

/** Expanding shockwave rings on the floor. Call update() every frame. */
export class BlastRings {
  constructor(scene) {
    this.scene = scene;
    this._rings = [];
  }

  /** Two rings expanding from (x, y, z) out to `maxRadius`. */
  spawn(x, y, z, maxRadius, color) {
    for (let i = 0; i < 2; i++) {
      const ring = new Mesh(
        new TorusGeometry(1, 0.03, 8, 64),
        new MeshBasicMaterial({ color, transparent: true, opacity: 0.85, side: DoubleSide }),
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.set(x, y, z);
      this.scene.add(ring);
      this._rings.push({ mesh: ring, delay: i * 0.15, elapsed: 0, maxRadius });
    }
  }

  update(deltaTime) {
    for (let i = this._rings.length - 1; i >= 0; i--) {
      const r = this._rings[i];
      r.elapsed += deltaTime;
      const activeTime = r.elapsed - r.delay;
      if (activeTime <= 0) continue;
      const t = Math.min(activeTime / RING_DURATION, 1);
      r.mesh.scale.set(r.maxRadius * t, r.maxRadius * t, 1);
      r.mesh.material.opacity = 0.85 * (1 - t);
      if (t >= 1) {
        this.scene.remove(r.mesh);
        r.mesh.geometry.dispose();
        r.mesh.material.dispose();
        this._rings.splice(i, 1);
      }
    }
  }
}
