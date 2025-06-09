import * as THREE from "three";

export default class Disc {
  // Configurable spotlight parameters for different disc states
  static spotlightConfig = {
    active: {
      intensity: 80,
      distance: 25,
      angle: Math.PI / 4,
      penumbra: 1.2,
      color: 0xffffff
    },
    inactive: {
      intensity: 30,
      distance: 12.5,
      angle: Math.PI / 4,
      penumbra: 1.2,
      color: 0xffffff
    },
    dead: {
      intensity: 2,
      distance: 15,
      angle: Math.PI / 8,
      penumbra: 0.5,
      color: 0x888888
    },
    raging: {
      intensity: 80, // Same as active, can be adjusted
      distance: 25,  // Same as active
      angle: Math.PI / 4, // Same as active
      penumbra: 1.2, // Same as active
      color: 0xff0000 // Red color for rage
    }
  };

  /**
   * Creates a new Disc
   * @param {number} radius - Disc radius
   * @param {number} height - Disc height
   * @param {number} color - Disc color (hex)
   * @param {number} startX - Starting X position
   * @param {number} startZ - Starting Z position
   * @param {THREE.Scene} scene - Three.js scene
   * @param {string} discName - Display name for the disc
   * @param {string} type - Disc type: "player" (human controlled) or "NPC" (AI controlled)
   * @param {string} kind - The kind of disc (e.g., "Barbarian", "Skeleton")
   * @param {number} hitPoints - Starting hitPoints
   * @param {number} skillLevel - AI skill level (0-100)
   * @param {string} imagePath - Optional path to PNG image for disc top
   * @param {boolean} canDoReboundDamage - Whether disc can cause damage on rebounds
   * @param {number} throwPowerMultiplier - Multiplier for the throw power (default 1.0)
   * @param {number} mass - The mass of the disc (default 1.0)
   * @param {boolean} rageIsActiveForNextThrow - Whether Rage mode is active for the next throw (default false)
   * @param {boolean} rageWasUsedThisThrow - Whether Rage was used for the current throw (default false)
   * @param {number} attackDamage - The amount of damage this disc deals on hit (default 1)
   * @param {GameController} gameController - Reference to the GameController instance
   * @param {string} description - A short description of the disc
    */
   constructor(
     radius,
    height,
    color,
    startX,
    startZ,
    scene,
    discName = "Unknown",
    type = "NPC",
    kind = "Unknown", // Default kind
    hitPoints = 3,
    skillLevel = 100,
    imagePath = null,
    canDoReboundDamage = false,
    throwPowerMultiplier = 1.0,
    mass = 1.0, // Default mass
    rageIsActiveForNextThrow = false,
    rageWasUsedThisThrow = false,
    attackDamage = 1, // Default attack damage
    gameController = null,
    description = "A mysterious combatant.", // Default description
  ) {
    this.radius = radius;
    this.height = height;
    this.initialColor = color;
    this.discName = discName;
    this.type = type;
    this.kind = kind;
    this.hitPoints = hitPoints;
    this.maxHitPoints = hitPoints; // Store initial HP as max HP
    this.skillLevel = skillLevel;
    this.scene = scene;
    this.canDoReboundDamage = canDoReboundDamage;
    this.throwPowerMultiplier = throwPowerMultiplier;
    this.mass = mass;
    this.rageIsActiveForNextThrow = rageIsActiveForNextThrow;
    this.rageWasUsedThisThrow = rageWasUsedThisThrow;
    this.attackDamage = attackDamage;
    this.gameController = gameController;
    this.description = description;
    this.relativeOffset = new THREE.Vector3(); // Used for orbs to follow the wizard

    // Create the main disc geometry
    const discGeometry = new THREE.CylinderGeometry(radius, radius, height, 64);

    // Create material with optional texture
    let discMaterial;
    if (imagePath) {
      const textureLoader = new THREE.TextureLoader();

      // Create a group to hold both the base disc and the top texture
      this.mesh = new THREE.Group();

      // Base disc with original color
      const baseMesh = new THREE.Mesh(
        discGeometry,
        new THREE.MeshPhongMaterial({
          color: color,
          opacity: 0.9,
          transparent: true,
        })
      );
      baseMesh.castShadow = true;
      baseMesh.receiveShadow = true;
      this.mesh.add(baseMesh);

      // Load texture with error handling and Chrome compatibility
      const texture = textureLoader.load(
        imagePath,
        // onLoad
        (loadedTexture) => {
          loadedTexture.colorSpace = THREE.SRGBColorSpace;
        },
        // onProgress
        undefined,
        // onError
        (error) => {
        }
      );

      // Top plane with texture (slightly above the disc)
      const topGeometry = new THREE.PlaneGeometry(radius * 1.8, radius * 1.8);
      const topMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.1,
        opacity: 1,
      });
      const topMesh = new THREE.Mesh(topGeometry, topMaterial);
      topMesh.rotation.x = -Math.PI / 2; // Rotate to face up
      topMesh.position.y = height / 2 + 0.01; // Position slightly above disc top
      topMesh.castShadow = true;
      this.mesh.add(topMesh);
    } else {
      // Original disc without texture
      this.mesh = new THREE.Mesh(
        discGeometry,
        new THREE.MeshPhongMaterial({
          color: color,
          opacity: 0.9,
          transparent: true,
        })
      );
      this.mesh.castShadow = true;
      this.mesh.receiveShadow = true;
    }
    this.basePositionY = height / 2; // Store base position offset for height adjustments
    this.mesh.position.y = this.basePositionY;
    this.mesh.position.x = startX;
    this.mesh.position.z = startZ;
    scene.add(this.mesh);

    // Create spotlight that follows the disc using inactive config by default
    const config = Disc.spotlightConfig.inactive;
    this.spotlight = new THREE.SpotLight(
      config.color,
      config.intensity,
      config.distance,
      config.angle,
      config.penumbra
    );
    this.spotlight.position.set(startX, 8, startZ);
    this.spotlight.target = this.mesh;
    this.spotlight.castShadow = false;
    this.spotlight.shadow.mapSize.width = 256;
    this.spotlight.shadow.mapSize.height = 256;
    this.spotlight.shadow.camera.near = 0.1;
    this.spotlight.shadow.camera.far = 20;
    scene.add(this.spotlight);
    scene.add(this.spotlight.target);

    this.velocity = new THREE.Vector3(0, 0, 0);
    this.moving = false;
    this.hasThrown = false;
    this.hasCausedDamage = false;
  }

  updatePosition() {
    this.mesh.position.add(this.velocity);
    // Update spotlight position to follow disc
    this.spotlight.position.set(
      this.mesh.position.x,
      8,
      this.mesh.position.z
    );
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
      // Reset damage state when disc stops moving
      this.hasCausedDamage = false;
      // If Rage was used for this throw, revert canDoReboundDamage and the flag
      if (this.rageWasUsedThisThrow) {
        this.canDoReboundDamage = false;
        this.rageWasUsedThisThrow = false;
      }
      // If this disc is an Orb, it's consumed (HP set to 0) when it stops moving
      if (this.kind === 'Orb') {
        this.hitPoints = 0;
      }
      // Death handling when stopped and no hit points
      if (this.hitPoints <= 0 && !this.dead) {
        this.die();
      } else if (this.hitPoints <= 0 && this.dead) {
      } else if (this.hitPoints > 0) {
      }
    }
  }

  // Reduce hit points by the specified damage amount
  takeHit(damageAmount = 1) {
    // Orb defense logic for Wizard
    if (this.kind === 'Wizard' && this.gameController) {
      const absorbingOrb = this.gameController.wizardOrbs.find(orb => orb && orb.hitPoints > 0 && !orb.dead);
      if (absorbingOrb) {
        absorbingOrb.hitPoints = 0;
        absorbingOrb.die(); // Visually mark as dead/consumed
        this.gameController.removeOrb(absorbingOrb); // Remove from game lists and scene
        // The Wizard does not take damage as the orb absorbed it.
        return;
      }
    }

    // Original damage taking logic if not absorbed by an orb
    const oldHP = this.hitPoints;
    this.hitPoints = Math.max(this.hitPoints - damageAmount, 0);
  }

  // Handle disc death: disable further throws, make disc gray and opaque
  die() {
    if (this.dead) {
      return;
    }
    this.dead = true;
    // Make the disc gray and opaque
    if (this.mesh.isGroup) {
      // Handle group structure (disc with texture)
      this.mesh.children.forEach(child => {
        if (child.material) {
          if (child.material.color) { // Check if color property exists
            child.material.color.set(0x888888); // Set color to gray
          }
          child.material.opacity = 0.9;    // Set opacity to match alive discs but with gray color
          child.material.transparent = false; // Set transparent to false
        }
      });
    } else {
      // Handle single mesh structure
      if (this.mesh.material.color) { // Check if color property exists
        this.mesh.material.color.set(0x888888); // Set color to gray
      }
      this.mesh.material.opacity = 0.9;    // Set opacity
      this.mesh.material.transparent = false; // Set transparent to false
    }
    // Update spotlight to dead configuration when disc dies
    this.updateSpotlightConfig('dead');
  }

  // Set spotlight parameters based on active/inactive state
  setSpotlightIntensity(isActive) {
    if (this.dead) {
      this.updateSpotlightConfig('dead');
    } else if (this.kind === "Barbarian" && (this.rageIsActiveForNextThrow || this.rageWasUsedThisThrow)) {
      this.updateSpotlightConfig('raging');
    } else if (isActive) {
      this.updateSpotlightConfig('active');
    } else {
      this.updateSpotlightConfig('inactive');
    }
  }

  // Update spotlight with configuration for the given state
  updateSpotlightConfig(state) {
    const config = Disc.spotlightConfig[state];
    if (config) {
      this.spotlight.intensity = config.intensity;
      this.spotlight.distance = config.distance;
      this.spotlight.angle = config.angle;
      this.spotlight.penumbra = config.penumbra;
      this.spotlight.color.setHex(config.color);
    }
  }

  // Static method to update spotlight configuration
  static updateSpotlightConfig(state, newConfig) {
    if (Disc.spotlightConfig[state]) {
      Object.assign(Disc.spotlightConfig[state], newConfig);
    }
  }

  // Reset damage state for new throw
  resetDamageState() {
    this.hasCausedDamage = false;
  }

  // Clean up disc and its spotlight
  dispose() {
    if (this.scene) {
      this.scene.remove(this.mesh);
      this.scene.remove(this.spotlight);
      this.scene.remove(this.spotlight.target);

      // Handle disposal for both group and single mesh structures
      if (this.mesh.isGroup) {
        // Dispose of all children in the group
        this.mesh.children.forEach(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (child.material.map) child.material.map.dispose();
            child.material.dispose();
          }
        });
      } else {
        // Original single mesh disposal
        if (this.mesh.geometry) this.mesh.geometry.dispose();
        if (this.mesh.material) this.mesh.material.dispose();
      }
    }
  }
}
