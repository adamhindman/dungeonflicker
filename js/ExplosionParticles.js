import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three';

const GRAVITY = 9.8;
const FIRE_COLORS = [0xFF6600, 0xFF3300, 0xFF9900, 0xFFCC00, 0xFF4400, 0xFFAA00];

/**
 * Fiery explosion sparks: a burst of embers that fly out, arc down and fade.
 * Used by the Rogue's grenade and the Donut room's erupting lava pit.
 */
export default class ExplosionParticles {
  constructor(scene) {
    this.scene = scene;
    this._particles = [];
  }

  /**
   * Bursts embers out from `pos`.
   * @param {{x: number, y: number, z: number}} pos
   * @param {object} [options]
   * @param {number} [options.count] - how many embers
   * @param {number} [options.scale] - multiplies their speed and size, for a bigger blast
   */
  spawn(pos, { count = 36, scale = 1 } = {}) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
      const speed = (3.5 + Math.random() * 5.5) * scale;
      const geo = new SphereGeometry((0.14 + Math.random() * 0.2) * Math.sqrt(scale), 5, 4);
      const mat = new MeshBasicMaterial({
        color: FIRE_COLORS[Math.floor(Math.random() * FIRE_COLORS.length)],
        transparent: true,
        opacity: 1.0,
      });
      const mesh = new Mesh(geo, mat);
      mesh.position.copy(pos);
      this.scene.add(mesh);
      this._particles.push({
        mesh, material: mat, geometry: geo,
        vx: Math.cos(angle) * speed * (0.6 + Math.random() * 0.8),
        vy: (2.5 + Math.random() * 5.5) * scale,
        vz: Math.sin(angle) * speed * (0.6 + Math.random() * 0.8),
        elapsed: 0,
        duration: 0.55 + Math.random() * 0.5,
      });
    }
  }

  update(deltaTime) {
    const toRemove = [];
    for (const p of this._particles) {
      p.elapsed += deltaTime;
      if (p.elapsed >= p.duration) { toRemove.push(p); continue; }
      const t = p.elapsed / p.duration;
      p.mesh.position.x += p.vx * deltaTime;
      p.mesh.position.y += (p.vy - GRAVITY * p.elapsed) * deltaTime;
      p.mesh.position.z += p.vz * deltaTime;
      p.material.opacity = 1.0 - t;
    }
    for (const p of toRemove) this._remove(p);
  }

  clear() {
    for (const p of [...this._particles]) this._remove(p);
  }

  _remove(p) {
    this.scene.remove(p.mesh);
    p.geometry.dispose();
    p.material.dispose();
    const idx = this._particles.indexOf(p);
    if (idx !== -1) this._particles.splice(idx, 1);
  }
}
