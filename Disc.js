import * as THREE from "three";

export default class Disc {
  constructor(
    radius,
    height,
    color,
    startX,
    startZ,
    scene,
    discName = "Unknown",
    type = "NPC",
    hitPoints = 3,
  ) {
    this.radius = radius;
    this.height = height;
    this.discName = discName;
    this.type = type;
    this.hitPoints = hitPoints;
    this.mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, height, 64),
      new THREE.MeshPhongMaterial({
        color: color,
        opacity: 0.9,
        transparent: true,
      }),
    );
    this.basePositionY = height / 2; // Store base position offset for height adjustments
    this.mesh.position.y = this.basePositionY;
    this.mesh.position.x = startX;
    this.mesh.position.z = startZ;
    scene.add(this.mesh);

    this.velocity = new THREE.Vector3(0, 0, 0);
    this.moving = false;
    this.hasThrown = false;
  }

  updatePosition() {
    this.mesh.position.add(this.velocity);
  }

  handleWallCollision(fieldWidth, fieldDepth, bounceDamping) {
    if (this.mesh.position.x + this.radius > fieldWidth / 2) {
      this.mesh.position.x = fieldWidth / 2 - this.radius;
      this.velocity.x = -this.velocity.x * bounceDamping;
    } else if (this.mesh.position.x - this.radius < -fieldWidth / 2) {
      this.mesh.position.x = -fieldWidth / 2 + this.radius;
      this.velocity.x = -this.velocity.x * bounceDamping;
    }

    if (this.mesh.position.z + this.radius > fieldDepth / 2) {
      this.mesh.position.z = fieldDepth / 2 - this.radius;
      this.velocity.z = -this.velocity.z * bounceDamping;
    } else if (this.mesh.position.z - this.radius < -fieldDepth / 2) {
      this.mesh.position.z = -fieldDepth / 2 + this.radius;
      this.velocity.z = -this.velocity.z * bounceDamping;
    }
  }

  // Handle collision between this disc and a box mesh (wall)
  handleCollisionWithBox(boxMesh, bounceDamping) {
    // Compute bounding box of the boxMesh in world coordinates
    boxMesh.updateMatrixWorld();
    const box = new THREE.Box3().setFromObject(boxMesh);

    // Get disc center and radius for bounding sphere collision
    const discCenter = this.mesh.position.clone();
    const discRadius = this.radius;

    // Check if disc is intersecting the box (AABB vs Sphere)
    // Find closest point on box to disc center
    const closestPoint = new THREE.Vector3(
      Math.max(box.min.x, Math.min(discCenter.x, box.max.x)),
      Math.max(box.min.y, Math.min(discCenter.y, box.max.y)),
      Math.max(box.min.z, Math.min(discCenter.z, box.max.z)),
    );

    const distance = closestPoint.distanceTo(discCenter);
    if (distance < discRadius) {
      // Collision occurred, push disc out of collision and invert velocity component

      // Compute collision normal vector from closest point to disc center
      const collisionNormal = discCenter.clone().sub(closestPoint).normalize();

      // Push disc outside the box surface by the penetration depth
      const penetrationDepth = discRadius - distance;
      this.mesh.position.add(
        collisionNormal.clone().multiplyScalar(penetrationDepth),
      );

      // Reflect velocity along collision normal with bounce damping
      const velocityDot = this.velocity.dot(collisionNormal);
      if (velocityDot < 0) {
        const reflection = collisionNormal.multiplyScalar(-2 * velocityDot);
        this.velocity.add(reflection);
        this.velocity.multiplyScalar(bounceDamping);
      }

      // Mark disc as moving
      this.moving = true;
    }
  }

  applyFriction(friction) {
    this.velocity.multiplyScalar(friction);
    if (this.velocity.length() < 0.01) {
      this.velocity.set(0, 0, 0);
      this.moving = false;
      // Death handling when stopped and no hit points
      if (this.hitPoints <= 0 && !this.dead) {
        this.die();
      }
    }
  }

  // Reduce hit points by 1
  takeHit() {
    this.hitPoints = Math.max(this.hitPoints - 1, 0);
  }

  // Handle disc death: disable further throws, set semi-transparent
  die() {
    this.dead = true;
    // Make the disc semi-transparent
    this.mesh.material.opacity = 0.4;
    this.mesh.material.transparent = true;
  }
}
