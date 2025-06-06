import * as THREE from "three";

export default class Torch {
  /**
   * Creates a new Torch with stick, flame, and light
   * @param {THREE.Scene} scene - Three.js scene
   * @param {number} x - X position
   * @param {number} y - Y position
   * @param {number} z - Z position
   * @param {number} angle - Rotation angle in radians (default: 0 for vertical)
   * @param {number} intensity - Light intensity (default: 2.0)
   * @param {number} range - Light range (default: 35)
   */
  constructor(scene, x, y, z, angle = 0, intensity = 2.0, range = 35) {
    this.scene = scene;
    this.baseIntensity = intensity;
    this.angle = angle;

    // Create torch stick
    const stickGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 8);
    const stickMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
    this.stick = new THREE.Mesh(stickGeometry, stickMaterial);
    this.stick.position.set(x, y, z);
    this.stick.rotation.z = angle;
    this.stick.castShadow = true;
    this.stick.receiveShadow = true;

    // Calculate flame position at top of stick
    // If ball is appearing at bottom, try opposite direction
    const flameX = x - Math.sin(angle) * 0.75;
    const flameY = y - Math.cos(angle) * -0.75;

    // Create flame ball
    const flameGeometry = new THREE.SphereGeometry(0.15, 8, 6);
    const flameMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4400,
      transparent: true,
      opacity: 0.8,
    });
    this.flame = new THREE.Mesh(flameGeometry, flameMaterial);
    this.flame.position.set(flameX, flameY, z);

    // Create point light at flame position
    this.light = new THREE.PointLight(0xff6600, intensity, range);
    this.light.position.set(flameX, flameY, z);
    this.light.castShadow = true;
    this.light.shadow.mapSize.width = 128;
    this.light.shadow.mapSize.height = 128;
    this.light.shadow.camera.near = 0.1;
    this.light.shadow.camera.far = range;
    this.light.baseIntensity = intensity;

    // Add all components to scene
    this.scene.add(this.stick);
    this.scene.add(this.flame);
    this.scene.add(this.light);
  }

  /**
   * Update torch flickering animation
   * @param {number} time - Current time value
   * @param {number} index - Torch index for unique flicker pattern
   */
  flicker(time, index) {
    // Each torch has a slightly different flicker pattern using index offset
    const flicker =
      Math.sin(time + index * 0.7) * 0.6 +
      Math.sin(time * 3.5 + index * 1.1) * 0.4;
    this.light.intensity = this.baseIntensity + flicker * 0.8;

    // Ensure intensity doesn't go negative
    this.light.intensity = Math.max(0.3, this.light.intensity);
  }

  /**
   * Remove torch from scene
   */
  dispose() {
    this.scene.remove(this.stick);
    this.scene.remove(this.flame);
    this.scene.remove(this.light);

    // Dispose of geometries and materials to free memory
    this.stick.geometry.dispose();
    this.stick.material.dispose();
    this.flame.geometry.dispose();
    this.flame.material.dispose();
  }

  /**
   * Get the light component for external access (e.g., for torch arrays)
   */
  getLight() {
    return this.light;
  }
}
