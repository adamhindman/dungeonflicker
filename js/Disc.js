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
    },
    animatedDead: {
      intensity: 80,
      distance: 15,
      angle: Math.PI / 10,
      penumbra: 0.3,
      color: 0x000000 // Black glow for reanimated
    },
    animateDeadTarget: {
      intensity: 15,
      distance: 10,
      angle: Math.PI / 5,
      penumbra: 1.0,
      color: 0x9933ff // Purple — marks a corpse eligible for Animate Dead
    },
    animateDeadHovered: {
      intensity: 80,
      distance: 18,
      angle: Math.PI / 4,
      penumbra: 1.2,
      color: 0xcc66ff // Bright purple — corpse currently under cursor
    },
    raiseDeadTarget: {
      intensity: 15,
      distance: 10,
      angle: Math.PI / 5,
      penumbra: 1.0,
      color: 0xffffff // White — marks a fallen ally eligible for Resurrect Ally
    },
    raiseDeadHovered: {
      intensity: 80,
      distance: 18,
      angle: Math.PI / 4,
      penumbra: 1.2,
      color: 0xffffff // Bright white — fallen ally currently under cursor
    },
    drainingLife: {
      intensity: 80,
      distance: 25,
      angle: Math.PI / 4,
      penumbra: 1.2,
      color: 0x8833CC // Purple — Necromancer Drain Life is active
    },
    carrionFeast: {
      intensity: 80,
      distance: 25,
      angle: Math.PI / 4,
      penumbra: 1.2,
      color: 0x9933ff // Purple — Necromancer Carrion Feast is active
    },
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
    this.lastHitPoints = hitPoints;
    this.maxHitPoints = hitPoints; // Store initial HP as max HP
    this.dead = false;
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
    this.healedDiscs = new Set(); // Track discs healed by this disc (e.g., Healing Orb) this throw
    this.drainLifeActive = false; // Whether Drain Life aura is active (Necromancer only)
    this.drainLifeAura = null; // Three.js Group for the Drain Life floor aura
    this.carrionFeastActive = false; // Whether Carrion Feast glow is active (Necromancer only)
    this.isDissolving = false;
    this.dissolveElapsed = 0;
    this.dissolveDuration = 0;
    this.killedByBlob = false; // Whether this disc was killed by a Blob (prevents revival)

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
    this.animatedDeadRing = null;
  }

  updatePosition() {
    this.mesh.position.add(this.velocity);
    // Update spotlight position to follow disc
    this.spotlight.position.set(
      this.mesh.position.x,
      8,
      this.mesh.position.z
    );
    // Update animated dead ring position to follow disc
    if (this.animatedDeadRing) {
      this.animatedDeadRing.position.x = this.mesh.position.x;
      this.animatedDeadRing.position.y = this.mesh.position.y + 0.06;
      this.animatedDeadRing.position.z = this.mesh.position.z;
    }
    // Update drain life aura position to follow disc
    if (this.drainLifeAura) {
      this.drainLifeAura.position.x = this.mesh.position.x;
      this.drainLifeAura.position.z = this.mesh.position.z;
    }
  }

  handleWallCollision(fieldWidth, fieldDepth, bounceDamping) {
    let hit = false;
    if (this.mesh.position.x + this.radius > fieldWidth / 2) {
      this.mesh.position.x = fieldWidth / 2 - this.radius;
      this.velocity.x = -this.velocity.x * bounceDamping;
      hit = true;
    } else if (this.mesh.position.x - this.radius < -fieldWidth / 2) {
      this.mesh.position.x = -fieldWidth / 2 + this.radius;
      this.velocity.x = -this.velocity.x * bounceDamping;
      hit = true;
    }

    if (this.mesh.position.z + this.radius > fieldDepth / 2) {
      this.mesh.position.z = fieldDepth / 2 - this.radius;
      this.velocity.z = -this.velocity.z * bounceDamping;
      hit = true;
    } else if (this.mesh.position.z - this.radius < -fieldDepth / 2) {
      this.mesh.position.z = -fieldDepth / 2 + this.radius;
      this.velocity.z = -this.velocity.z * bounceDamping;
      hit = true;
    }
    return hit;
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
      return true;
    }
    return false;
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
      // If this disc is an Orb or Fireball, it's consumed (HP set to 0) when it stops moving
      if (this.kind === 'Orb' || this.kind === 'HealingOrb' || this.kind === 'Fireball') {
        this.hitPoints = 0;
        this.lastHitPoints = 0;
      }
      // Death handling when stopped and no hit points
      if (this.hitPoints <= 0 && !this.dead) {
        this.die();
      }

      // Orbs disappear immediately when they stop and have been consumed
      if ((this.kind === 'Orb' || this.kind === 'HealingOrb') && this.gameController) {
        this.gameController.removeOrb(this);
      }
      // AnimatedDead: if dead and NOT the currently tracked thrown disc, clean up via GameController
      // (if it IS the thrownDisc, waitingForDiscToStop in the animate loop handles cleanup)
      if (this.kind === 'AnimatedDead' && this.dead && this.gameController &&
          this.gameController.thrownDisc !== this) {
        this.gameController.removeAnimatedDead(this);
      }
    }
  }

  /**
   * Revives a dead disc, restoring it to life with the given HP.
   * Used by the Necromancer's Resurrect Ally and Animate Dead spells.
   * @param {number} hp - The hit points to restore the disc to.
   */
  revive(hp) {
    if (!this.dead) return;
    this.dead = false;
    this.hitPoints = hp;
    this.lastHitPoints = hp;
    this.hasThrown = false;
    this.moving = false;
    this.velocity.set(0, 0, 0);
    this.isDissolving = false;
    this.dissolveElapsed = 0;
    this.dissolveDuration = 0;
    // Restore original disc color
    if (this.mesh.isGroup) {
      this.mesh.children.forEach(child => {
        if (child.material) {
          if (child.material.color && this.initialColor !== undefined) {
            // Don't tint texture-mapped faces; only restore color on the base cylinder.
            child.material.color.set(child.material.map ? 0xffffff : this.initialColor);
          }
          child.material.transparent = true;
          child.material.opacity = 0.9;
        }
      });
    } else {
      if (this.mesh.material) {
        if (this.mesh.material.color && this.initialColor !== undefined) {
          this.mesh.material.color.set(this.initialColor);
        }
        this.mesh.material.transparent = true;
        this.mesh.material.opacity = 0.9;
      }
    }
    this.updateSpotlightConfig('inactive');
  }

  // Reduce hit points by the specified damage amount
  takeHit(damageAmount = 1, attacker = null) {
    // Orb defense logic for Wizard (only absorbs physical hits from an attacker disc, not environmental damage)
    if (this.kind === 'Wizard' && this.gameController && attacker !== null) {
      const absorbingOrb = this.gameController.wizardController.orbs.find(orb => orb && orb.hitPoints > 0 && !orb.dead);
      if (absorbingOrb) {
        // If an NPC hit the Wizard, the orb deals its damage back to the NPC
        if (attacker && attacker.type === 'NPC') {
          attacker.takeHit(absorbingOrb.attackDamage, this);
        }

        const oldOrbHP = absorbingOrb.hitPoints;
        absorbingOrb.hitPoints = 0;
        if (oldOrbHP > 0 && this.gameController && this.gameController.uiManager) {
          this.gameController.uiManager.showFloatingText(absorbingOrb, oldOrbHP, false);
        }
        absorbingOrb.lastHitPoints = 0;
        absorbingOrb.die(); // Visually mark as dead/consumed
        this.gameController.removeOrb(absorbingOrb); // Remove from game lists and scene
        // The Wizard does not take damage as the orb absorbed it.
        return;
      }
    }

    // Original damage taking logic if not absorbed by an orb
    const oldHP = this.hitPoints;
    this.hitPoints = Math.max(this.hitPoints - damageAmount, 0);
    const actualDamage = oldHP - this.hitPoints;

    if (actualDamage > 0 && this.gameController && this.gameController.uiManager && this.kind !== 'Orb' && this.kind !== 'HealingOrb' && this.kind !== 'Fireball') {
      this.gameController.uiManager.showFloatingText(this, actualDamage, false);
    }
    this.lastHitPoints = this.hitPoints;

    // If an orb itself is reduced to 0 HP (e.g. hit directly), it should disappear
    if ((this.kind === 'Orb' || this.kind === 'HealingOrb') && this.hitPoints <= 0 && oldHP > 0) {
      this.die();
      if (this.gameController) {
        this.gameController.wizardController.removeOrb(this);
      }
    }
  }

  /**
   * Restores hit points to the disc, up to its max hit points.
   * @param {number} amount - The amount of health to restore (default 1)
   */
  restoreHealth(amount = 1) {
    if (this.dead) return;
    const oldHP = this.hitPoints;
    const nextHP = this.hitPoints + amount;
    this.hitPoints = Number.isFinite(this.maxHitPoints) ? Math.min(nextHP, this.maxHitPoints) : nextHP;
    const actualHealing = this.hitPoints - oldHP;

    if (actualHealing > 0 && this.gameController && this.gameController.uiManager) {
      this.gameController.uiManager.showFloatingText(this, actualHealing, true);
    }
    this.lastHitPoints = this.hitPoints;
  }

  // Handle disc death: disable further throws, make disc gray and opaque
  die(silent = false) {
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
          if (child.material.emissive) { // Clear any emissive glow (e.g., from AnimatedDead)
            child.material.emissive.set(0x000000);
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
      if (this.mesh.material.emissive) { // Clear any emissive glow (e.g., from AnimatedDead)
        this.mesh.material.emissive.set(0x000000);
      }
      this.mesh.material.opacity = 0.9;    // Set opacity
      this.mesh.material.transparent = false; // Set transparent to false
    }
    this.hideAnimatedDeadRing();
    this.hideDrainLifeAura();
    // Update spotlight to dead configuration when disc dies
    this.updateSpotlightConfig('dead');

    const isPC = this.type === 'player' &&
      this.kind !== 'Orb' && this.kind !== 'HealingOrb' &&
      this.kind !== 'AnimatedDead' && this.kind !== 'Bomb' && this.kind !== 'RoguePotion';
    if (!silent && isPC && this.gameController && this.gameController.soundManager) {
      this.gameController.soundManager.playDeathCry(this.mesh.position.clone());
    }
  }

  // Set spotlight parameters based on active/inactive state
  setSpotlightIntensity(isActive) {
    if (this.dead) {
      this.hideAnimatedDeadRing();
      this.updateSpotlightConfig('dead');
    } else if (this.kind === "Barbarian" && (this.rageIsActiveForNextThrow || this.rageWasUsedThisThrow)) {
      this.hideAnimatedDeadRing();
      this.updateSpotlightConfig('raging');
    } else if (this.kind === "AnimatedDead") {
      this.showAnimatedDeadRing();
      this.updateSpotlightConfig('inactive');
    } else if (this.kind === "Necromancer" && this.carrionFeastActive) {
      this.hideAnimatedDeadRing();
      this.updateSpotlightConfig('carrionFeast');
    } else if (this.kind === "Necromancer" && this.drainLifeActive) {
      this.hideAnimatedDeadRing();
      this.updateSpotlightConfig('drainingLife');
    } else if (isActive) {
      this.hideAnimatedDeadRing();
      this.updateSpotlightConfig('active');
    } else {
      this.hideAnimatedDeadRing();
      this.updateSpotlightConfig('inactive');
    }
  }

  showAnimatedDeadRing() {
    if (this.animatedDeadRing) return;
    const geometry = new THREE.TorusGeometry(this.radius, 0.3, 8, 48);
    const material = new THREE.MeshPhongMaterial({
      color: 0x8833CC,
      emissive: 0x441166,
    });
    this.animatedDeadRing = new THREE.Mesh(geometry, material);
    this.animatedDeadRing.rotation.x = Math.PI / 2;
    this.animatedDeadRing.position.set(this.mesh.position.x, this.mesh.position.y + 0.06, this.mesh.position.z);
    this.scene.add(this.animatedDeadRing);
  }

  hideAnimatedDeadRing() {
    if (!this.animatedDeadRing) return;
    this.scene.remove(this.animatedDeadRing);
    this.animatedDeadRing.geometry.dispose();
    this.animatedDeadRing.material.dispose();
    this.animatedDeadRing = null;
  }

  showDrainLifeAura(radius) {
    if (this.drainLifeAura) return;
    const group = new THREE.Group();

    // Boundary ring showing the drain radius
    const ringGeo = new THREE.TorusGeometry(radius, 0.22, 8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8833CC,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    // Semi-transparent fill showing the affected area
    const fillGeo = new THREE.CircleGeometry(radius, 48);
    const fillMat = new THREE.MeshBasicMaterial({
      color: 0x6600AA,
      transparent: true,
      opacity: 0.07,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const fill = new THREE.Mesh(fillGeo, fillMat);
    fill.rotation.x = -Math.PI / 2;
    group.add(fill);

    group.position.set(this.mesh.position.x, 0.05, this.mesh.position.z);
    this.scene.add(group);
    this.drainLifeAura = group;

    // Store ring material and animation state for throbbing effect
    this.drainLifeAuraRingMaterial = ringMat;
    this.drainLifeAuraAnimationTime = 0;
    this.drainLifeAuraAnimationDuration = 2.5; // 2.5 seconds for full throb cycle
  }

  hideDrainLifeAura() {
    if (!this.drainLifeAura) return;
    this.scene.remove(this.drainLifeAura);
    this.drainLifeAura.children.forEach(child => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
    this.drainLifeAura = null;
    this.drainLifeAuraRingMaterial = null;
    this.drainLifeAuraAnimationTime = 0;
  }

  updateDrainLifeAura(deltaTime) {
    if (!this.drainLifeAura || !this.drainLifeAuraRingMaterial) return;

    // Update animation time
    this.drainLifeAuraAnimationTime += deltaTime;
    if (this.drainLifeAuraAnimationTime >= this.drainLifeAuraAnimationDuration) {
      this.drainLifeAuraAnimationTime -= this.drainLifeAuraAnimationDuration;
    }

    // Calculate animation progress (0 to 1 and back to 0)
    const progress = this.drainLifeAuraAnimationTime / this.drainLifeAuraAnimationDuration;
    // Use sine wave for smooth throbbing: darker at 0 and 1, lighter at 0.5
    const throb = 0.5 - 0.5 * Math.cos(progress * Math.PI * 2);

    // Animate opacity from 0.3 to 0.95 for pronounced effect
    this.drainLifeAuraRingMaterial.opacity = 0.3 + throb * 0.65;
  }

  activateCarrionFeastGlow() {
    if (this.dead) return;
    this.carrionFeastActive = true;
    this.setSpotlightIntensity(true);
  }

  deactivateCarrionFeastGlow() {
    this.carrionFeastActive = false;
    this.setSpotlightIntensity(true);
  }

  startDissolve(durationSeconds = 2) {
    if (this.isDissolving) return;
    this.isDissolving = true;
    this.dissolveElapsed = 0;
    this.dissolveDuration = Math.max(0.01, durationSeconds);
  }

  updateDissolve(deltaTime) {
    if (!this.isDissolving) return false;
    this.dissolveElapsed += deltaTime;
    const t = Math.min(this.dissolveElapsed / this.dissolveDuration, 1);
    const opacity = 1 - t;

    if (this.mesh.isGroup) {
      this.mesh.children.forEach(child => {
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = opacity;
        }
      });
    } else if (this.mesh.material) {
      this.mesh.material.transparent = true;
      this.mesh.material.opacity = opacity;
    }

    if (t >= 1) {
      this.isDissolving = false;
      return true;
    }
    return false;
  }

  resetDissolve() {
    this.isDissolving = false;
    this.dissolveElapsed = 0;
    this.dissolveDuration = 0;
    if (this.mesh.isGroup) {
      this.mesh.children.forEach(child => {
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = 0.9;
        }
      });
    } else if (this.mesh.material) {
      this.mesh.material.transparent = true;
      this.mesh.material.opacity = 0.9;
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
    this.healedDiscs.clear();
  }

  // Clean up disc and its spotlight
  dispose() {
    this.hideAnimatedDeadRing();
    this.hideDrainLifeAura();
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
