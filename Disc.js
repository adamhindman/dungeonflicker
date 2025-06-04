import * as THREE from "three";

export default class Disc {
  constructor(radius, height, color, startX, startZ, scene) {
    this.radius = radius;
    this.height = height;
    this.mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, height, 64),
      new THREE.MeshPhongMaterial({
        color: color,
        opacity: 0.9,
        transparent: true,
      }),
    );
    this.mesh.position.y = height / 2;
    this.mesh.position.x = startX;
    this.mesh.position.z = startZ;
    scene.add(this.mesh);

    this.velocity = new THREE.Vector3(0, 0, 0);
    this.moving = false;
  }

  updatePosition() {
    this.mesh.position.add(this.velocity);
  }

  handleWallCollision(fieldWidth, fieldDepth, bounceDamping) {
    const margin = 0.12; // Increased margin for earlier collision
    if (this.mesh.position.x + this.radius + margin > fieldWidth / 2) {
      this.mesh.position.x = fieldWidth / 2 - this.radius - margin;
      this.velocity.x = -this.velocity.x * bounceDamping;
    } else if (this.mesh.position.x - this.radius - margin < -fieldWidth / 2) {
      this.mesh.position.x = -fieldWidth / 2 + this.radius + margin;
      this.velocity.x = -this.velocity.x * bounceDamping;
    }

    if (this.mesh.position.z + this.radius + margin > fieldDepth / 2) {
      this.mesh.position.z = fieldDepth / 2 - this.radius - margin;
      this.velocity.z = -this.velocity.z * bounceDamping;
    } else if (this.mesh.position.z - this.radius - margin < -fieldDepth / 2) {
      this.mesh.position.z = -fieldDepth / 2 + this.radius + margin;
      this.velocity.z = -this.velocity.z * bounceDamping;
    }
  }

  applyFriction(friction) {
    this.velocity.multiplyScalar(friction);
    if (this.velocity.length() < 0.0001) {
      this.velocity.set(0, 0, 0);
      this.moving = false;
    }
  }
}
