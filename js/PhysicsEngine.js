import * as THREE from 'three';

/**
 * Handles all per-frame physics: disc movement, wall/obstacle/boundary
 * collision, disc-to-disc impulse resolution, and all damage-on-collision rules.
 *
 * Holds a reference to GameController (gc) so it can read/write game state
 * (discs, level, controllers, turn tracking) without duplicating it.
 */
export class PhysicsEngine {
  constructor(gc) {
    this.gc = gc;
  }

  /**
   * Run one physics frame.  Call from GameController.animate() after camera
   * update but before rendering.
   *
   * @param {number} deltaTime  seconds since last frame
   * @returns {Promise<boolean>} true if animate() should return immediately
   *                             (a level transition was triggered)
   */
  async update(deltaTime) {
    const gc = this.gc;

    // ── Per-disc movement ──────────────────────────────────────────────────
    for (const disc of [...gc.discs]) {
      if (disc.moving) {
        disc.updatePosition();

        // Apply gravity along ramp slope (hex and donut levels).
        if (gc.level && (gc.level.hexRings || gc.level.donutRings)) {
          const slope = gc.level.getTerrainSlopeForce(disc.mesh.position.x, disc.mesh.position.z);
          disc.velocity.x += slope.fx;
          disc.velocity.z += slope.fz;
        }

        // Check door entry BEFORE the boundary-bounce so a disc heading into
        // the open doorway isn't pushed back before the transition fires.
        if (gc.roundWon && disc.type === "player" && disc.kind !== "Orb" && disc.kind !== "HealingOrb" && disc.kind !== "AnimatedDead") {
          if (gc.level.checkPortalCollision(disc.mesh.position.x, disc.mesh.position.z, disc.radius)) {
            await gc.startNextLevel(disc);
            return true; // signal animate() to exit early
          }
        }

        const hitBoundary = disc.handleWallCollision(
          gc.level.fieldWidth,
          gc.level.fieldDepth,
          0.8,
        );
        if (hitBoundary && gc.soundManager && disc.velocity.length() > 0.05) {
          gc.soundManager.playBounce(disc.mesh.position.clone());
        }

        const walls = gc.level.getAllWalls();
        walls.forEach((wall) => {
          const hitWall = disc.handleCollisionWithBox(wall, 0.8);
          if (hitWall && gc.soundManager && disc.velocity.length() > 0.05) {
            gc.soundManager.playBounce(disc.mesh.position.clone());
          }
        });

        // Circular obstacle collision for pillars and triangular columns.
        // Box3.setFromObject on a 3-segment prism produces an asymmetric AABB
        // that misses from certain approach angles; a 2D circle push is exact.
        for (const obs of (gc.level.obstacles || [])) {
          if (obs.type !== 'pillar' && obs.type !== 'triangle') continue;
          const obsRadius = obs.width / 2;
          const dx = disc.mesh.position.x - obs.x;
          const dz = disc.mesh.position.z - obs.z;
          const dist = Math.sqrt(dx * dx + dz * dz);
          const minDist = disc.radius + obsRadius;
          if (dist < minDist && dist > 0.001) {
            const nx = dx / dist;
            const nz = dz / dist;
            disc.mesh.position.x = obs.x + nx * minDist;
            disc.mesh.position.z = obs.z + nz * minDist;
            const vDotN = disc.velocity.x * nx + disc.velocity.z * nz;
            if (vDotN < 0) {
              disc.velocity.x = (disc.velocity.x - 2 * vDotN * nx) * 0.8;
              disc.velocity.z = (disc.velocity.z - 2 * vDotN * nz) * 0.8;
              if (gc.soundManager && disc.velocity.length() > 0.05) {
                gc.soundManager.playBounce(disc.mesh.position.clone());
              }
            }
          }
        }

        // Circular/bullseye/donut level: enforce circular outer boundary.
        // The polygon wall segments use rotated BoxGeometry; Box3.setFromObject
        // inflates them into larger AABBs, leaving gaps a fast disc can slip through.
        // A radial clamp is exact and replaces the per-segment AABB check.
        if (gc.level && gc.level.circleRadius && !gc.level.hexRings) {
          const R = gc.level.circleRadius;
          const dx = disc.mesh.position.x;
          const dz = disc.mesh.position.z;
          const r  = Math.sqrt(dx * dx + dz * dz);
          const maxR = R - disc.radius;
          if (r > maxR && r > 0.001) {
            const nx = dx / r;
            const nz = dz / r;
            disc.mesh.position.x = nx * maxR;
            disc.mesh.position.z = nz * maxR;
            const vDotN = disc.velocity.x * nx + disc.velocity.z * nz;
            if (vDotN > 0) {
              disc.velocity.x = (disc.velocity.x - 2 * vDotN * nx) * 0.8;
              disc.velocity.z = (disc.velocity.z - 2 * vDotN * nz) * 0.8;
              if (gc.soundManager && disc.velocity.length() > 0.05) {
                gc.soundManager.playBounce(disc.mesh.position.clone());
              }
            }
          }
        }

        // Hexagonal level: enforce circular outer boundary (replaces AABB collision
        // on the large rotated wall panels, which inflate badly).
        if (gc.level && gc.level.hexRings) {
          const { RA_in } = gc.level.hexRings;
          const dx = disc.mesh.position.x;
          const dz = disc.mesh.position.z;
          const r  = Math.sqrt(dx * dx + dz * dz);
          const maxR = RA_in - disc.radius;
          if (r > maxR && r > 0.001) {
            const nx = dx / r;
            const nz = dz / r;
            disc.mesh.position.x = nx * maxR;
            disc.mesh.position.z = nz * maxR;
            const vDotN = disc.velocity.x * nx + disc.velocity.z * nz;
            if (vDotN > 0) {
              disc.velocity.x = (disc.velocity.x - 2 * vDotN * nx) * 0.8;
              disc.velocity.z = (disc.velocity.z - 2 * vDotN * nz) * 0.8;
              if (gc.soundManager && disc.velocity.length() > 0.05) {
                gc.soundManager.playBounce(disc.mesh.position.clone());
              }
            }
          }
        }

        // Apply friction (Wizards and Necromancers have more drag and slow down faster)
        const currentFriction = (disc.kind === 'Wizard' || disc.kind === 'Necromancer') ? 0.92 : 0.96;
        disc.applyFriction(currentFriction);
      }
    }

    // ── Bullseye level: rotate every disc's world position with its ring ────
    // This makes the rings act as a conveyor — discs are carried regardless of their own velocity.
    if (gc.level && gc.level.bullseyeRings) {
      const { inner, middle, outer } = gc.level.bullseyeRings;
      for (const disc of gc.discs) {
        const dx = disc.mesh.position.x;
        const dz = disc.mesh.position.z;
        const r  = Math.sqrt(dx * dx + dz * dz);
        let omega = 0;
        if (r < 8)       omega = inner.rotDir  * inner.speed;
        else if (r < 16) omega = middle.rotDir * middle.speed;
        else if (r < 22) omega = outer.rotDir  * outer.speed;
        if (omega === 0) continue;
        const dTheta = omega * deltaTime;
        const cos = Math.cos(dTheta);
        const sin = Math.sin(dTheta);
        // Use Three.js Y-rotation convention: x' = x·cos + z·sin, z' = −x·sin + z·cos
        disc.mesh.position.x =  dx * cos + dz * sin;
        disc.mesh.position.z = -dx * sin + dz * cos;
        // Keep animated-dead ring and spotlight in sync when disc isn't self-moving
        if (disc.animatedDeadRing) {
          disc.animatedDeadRing.position.x = disc.mesh.position.x;
          disc.animatedDeadRing.position.z = disc.mesh.position.z;
        }
        if (disc.spotlight) {
          disc.spotlight.position.x = disc.mesh.position.x;
          disc.spotlight.position.z = disc.mesh.position.z;
        }
        // Keep the throw-direction line anchored to the disc while the ring carries it.
        if (disc === gc.currentDisc && gc.throwDirectionLine && gc.throwDirectionLine.visible) {
          const rotateVec = (v) => {
            const vx = v.x, vz = v.z;
            v.x =  vx * cos + vz * sin;
            v.z = -vx * sin + vz * cos;
          };
          if (gc._prevLineStart) rotateVec(gc._prevLineStart);
          if (gc._prevLineEnd)   rotateVec(gc._prevLineEnd);
          const pos = gc.throwDirectionLine.geometry.attributes.position;
          if (pos) {
            pos.setXYZ(0, gc._prevLineStart.x, gc._prevLineStart.y, gc._prevLineStart.z);
            pos.setXYZ(1, gc._prevLineEnd.x,   gc._prevLineEnd.y,   gc._prevLineEnd.z);
            pos.needsUpdate = true;
          }
        }
      }
    }

    // ── Snap every disc's Y to terrain height (hex and donut levels) ──────────
    if (gc.level && (gc.level.hexRings || gc.level.donutRings)) {
      for (const disc of gc.discs) {
        const h = gc.level.getTerrainHeightAt(disc.mesh.position.x, disc.mesh.position.z);
        disc.mesh.position.y = h + disc.basePositionY;
      }
    }

    // ── Disc-to-disc collisions ──────────────────────────────────────────────
    const collisionArray = [...gc.discs];
    for (let i = 0; i < collisionArray.length; i++) {
      const d1 = collisionArray[i];
      for (let j = i + 1; j < collisionArray.length; j++) {
        const d2 = collisionArray[j];

        // Skip collision between Wizard and his own orbs while they are orbiting
        if ((d1.kind === 'Wizard' && gc.wizardController.orbs.includes(d2) && !d2.moving) ||
            (d2.kind === 'Wizard' && gc.wizardController.orbs.includes(d1) && !d1.moving)) {
          continue;
        }

        // Skip collision between Necromancer and its animated dead while they are orbiting
        if ((d1.kind === 'Necromancer' && gc.necromancerController.animatedDeadDiscs.includes(d2) && !d2.moving) ||
            (d2.kind === 'Necromancer' && gc.necromancerController.animatedDeadDiscs.includes(d1) && !d1.moving)) {
          continue;
        }

        // Skip collision if one is a regular Orb and the other is dead, OR if two Orbs are colliding.
        // Note: Healing Orbs DO NOT skip dead discs (they bounce off them)
        const isRegularOrb1 = d1.kind === 'Orb';
        const isRegularOrb2 = d2.kind === 'Orb';
        const isAnyOrb1 = isRegularOrb1 || d1.kind === 'HealingOrb';
        const isAnyOrb2 = isRegularOrb2 || d2.kind === 'HealingOrb';
        if ((isRegularOrb1 && d2.dead) || (isRegularOrb2 && d1.dead) || (isAnyOrb1 && isAnyOrb2)) {
          continue;
        }

        // Regular Orbs (cyan) should pass through all player discs without interaction
        if ((d1.kind === 'Orb' && d2.type === 'player') || (d2.kind === 'Orb' && d1.type === 'player')) {
          continue;
        }

        const diff = d1.mesh.position.clone().sub(d2.mesh.position.clone());
        const dist = diff.length();
        const minDist = d1.radius + d2.radius;

        if (dist < minDist && dist > 0) {
          // Special Case: Wizard Healing Orb hitting anything (Heal and pass through)
          if ((d1.kind === 'HealingOrb' || d2.kind === 'HealingOrb') && !d1.dead && !d2.dead) {
            const healingOrb = d1.kind === 'HealingOrb' ? d1 : d2;
            const target     = d1.kind === 'HealingOrb' ? d2 : d1;

            if (!healingOrb.healedDiscs.has(target)) {
              target.restoreHealth(1);
              healingOrb.healedDiscs.add(target);
              gc.updateDiscNames();
              if (gc.uiManager) gc.uiManager.updateCurrentTurnDiscName(gc.currentDisc);

              if (gc.currentDisc && (d1 === gc.currentDisc || d2 === gc.currentDisc)) {
                gc.currentDisc.hasCausedDamage = true;
              }
            }
            continue; // Skip physics for Healing Orb (pass through)
          }

          const normal = diff.clone().divideScalar(dist);
          normal.y = 0;
          normal.normalize();

          const relativeVelocity    = d1.velocity.clone().sub(d2.velocity);
          const velocityAlongNormal = relativeVelocity.dot(normal);

          if (velocityAlongNormal <= 0) {
            const restitution      = 1;
            const impulseMagnitude = (-(1 + restitution) * velocityAlongNormal) / (1 / d1.mass + 1 / d2.mass);

            d1.velocity.add(normal.clone().multiplyScalar(impulseMagnitude / d1.mass));
            d2.velocity.sub(normal.clone().multiplyScalar(impulseMagnitude / d2.mass));

            d1.moving = true;
            d2.moving = true;

            if (gc.soundManager && velocityAlongNormal < -0.05) {
              const midPoint = d1.mesh.position.clone().add(d2.mesh.position).multiplyScalar(0.5);
              gc.soundManager.playDiscHit(midPoint);
            }

            // Push overlapping discs apart to ensure momentum is felt cleanly
            const totalMass        = d1.mass + d2.mass;
            const separationOverlap = minDist - dist;
            d1.mesh.position.add(normal.clone().multiplyScalar(separationOverlap * (d2.mass / totalMass)));
            d2.mesh.position.sub(normal.clone().multiplyScalar(separationOverlap * (totalMass === 0 ? 0 : d1.mass / totalMass)));

            // Apply damage rules — both discs must be alive
            if (d1.hitPoints > 0 && d2.hitPoints > 0 && !d1.dead && !d2.dead) {
              // Special Case: AnimatedDead hitting a live NPC (deals damage but is NOT consumed)
              if ((d1.kind === 'AnimatedDead' && !d1.dead && d2.type === 'NPC' && !d2.dead) ||
                  (d2.kind === 'AnimatedDead' && !d2.dead && d1.type === 'NPC' && !d1.dead)) {
                const animated = d1.kind === 'AnimatedDead' ? d1 : d2;
                const npc      = d1.kind === 'AnimatedDead' ? d2 : d1;

                if (gc.currentDisc === animated) {
                  npc.takeHit(animated.attackDamage, animated);
                  if (npc.hitPoints <= 0 && !gc.npcsKilledForRageCharge.has(npc.discName)) {
                    gc.necromancerController.manaEarnedThisTurn += 1;
                    gc.npcsKilledForRageCharge.add(npc.discName);
                    gc.necromancerController.updateActionButtons();
                  }
                } else if (gc.currentDisc === npc) {
                  animated.takeHit(npc.attackDamage, npc);
                }
                // Anything else (residual motion, indirect hit) — no damage
              }
              // Special Case: Wizard Orb hitting an NPC (Volatile Collision)
              else if (gc.thrownDisc !== null && ((d1.kind === 'Orb' && d2.type === 'NPC') || (d2.kind === 'Orb' && d1.type === 'NPC'))) {
                const orb   = d1.kind === 'Orb' ? d1 : d2;
                const npc   = d1.kind === 'Orb' ? d2 : d1;
                const actor = gc.currentDisc;

                npc.takeHit(orb.attackDamage, orb);

                if (npc.hitPoints <= 0 && !gc.npcsKilledForRageCharge.has(npc.discName)) {
                  gc.wizardController.manaEarnedThisTurn += 1;
                  gc.npcsKilledForRageCharge.add(npc.discName);
                  gc.barbarianController.updateRageButtonVisibility();
                  gc.wizardController.updateActionButtons();
                }

                orb.takeHit(999, npc); // Orb is consumed upon impact with an NPC

                if (actor && (d1 === actor || d2 === actor)) {
                  actor.hasCausedDamage = true;
                }
              }
              // Case 1: d1 is the current acting disc
              else if (gc.thrownDisc !== null && d1 === gc.currentDisc) {
                if (d1.type === "player" && d2.type === "NPC") {
                  if (d1.canDoReboundDamage || !gc.playerDamagedNPCsThisThrow.has(d2.discName)) {
                    if (d1.kind === 'Barbarian' && d2.type === 'NPC') {
                      if (d2.hitPoints > 0 && !d2.dead) {
                        gc.barbarianController.uniqueNPCHitsThisThrow.add(d2.discName);
                      }
                    }

                    let damageToDeal = d1.attackDamage;
                    if (d1.kind === 'Barbarian') {
                      const bonusDamage = gc.barbarianController.uniqueNPCHitsThisThrow.size;
                      damageToDeal = d1.rageWasUsedThisThrow ? (2 + bonusDamage) : (d1.attackDamage + bonusDamage);
                    }
                    d2.takeHit(damageToDeal, d1);

                    if (d2.hitPoints <= 0 && !gc.npcsKilledForRageCharge.has(d2.discName)) {
                      if (d1.kind === 'Barbarian') {
                        if (gc.barbarianController.rageCharges < gc.barbarianController.maxRageChargesCap) {
                          gc.barbarianController.rageCharges++;
                        }
                        if (d1.rageWasUsedThisThrow) {
                          d1.restoreHealth(1);
                          gc.updateDiscNames();
                          if (gc.uiManager) gc.uiManager.updateCurrentTurnDiscName(gc.currentDisc);
                        }
                      } else if (d1.kind === 'Wizard') {
                        gc.wizardController.manaEarnedThisTurn += 2;
                      } else if (d1.kind === 'Orb') {
                        gc.wizardController.manaEarnedThisTurn += 1;
                      } else if (d1.kind === 'Necromancer') {
                        gc.necromancerController.manaEarnedThisTurn += 2;
                      }
                      gc.npcsKilledForRageCharge.add(d2.discName);
                      gc.barbarianController.updateRageButtonVisibility();
                    }
                    if (!d1.canDoReboundDamage) {
                      gc.playerDamagedNPCsThisThrow.add(d2.discName);
                    }
                  }
                } else if (!(d1.type === "NPC" && d2.type === "NPC")) {
                  if (!(d1.type === "player" && d2.type === "player")) {
                    if (!d1.hasCausedDamage || d1.canDoReboundDamage) {
                      let damageToDeal = d1.attackDamage;
                      if (d1.kind === 'Barbarian') {
                        const bonusDamage = gc.barbarianController.uniqueNPCHitsThisThrow.size;
                        damageToDeal = d1.rageWasUsedThisThrow ? (2 + bonusDamage) : (d1.attackDamage + bonusDamage);
                      }
                      d2.takeHit(damageToDeal, d1);
                      d1.hasCausedDamage = true;

                      if (d1.type === 'NPC' && d1.hitPoints <= 0 && !gc.npcsKilledForRageCharge.has(d1.discName)) {
                        if (d2.kind === 'Wizard') {
                          gc.wizardController.manaEarnedThisTurn += 1;
                        } else if (d2.kind === 'Necromancer') {
                          gc.necromancerController.manaEarnedThisTurn += 1;
                        }
                        gc.npcsKilledForRageCharge.add(d1.discName);
                        gc.barbarianController.updateRageButtonVisibility();
                        gc.wizardController.updateActionButtons();
                        gc.necromancerController.updateActionButtons();
                      }
                    }
                  }
                }
              }
              // Case 2: d2 is the current acting disc
              else if (gc.thrownDisc !== null && d2 === gc.currentDisc) {
                if (d2.type === "player" && d1.type === "NPC") {
                  if (d2.canDoReboundDamage || !gc.playerDamagedNPCsThisThrow.has(d1.discName)) {
                    if (d2.kind === 'Barbarian' && d1.type === 'NPC') {
                      if (d1.hitPoints > 0 && !d1.dead) {
                        gc.barbarianController.uniqueNPCHitsThisThrow.add(d1.discName);
                      }
                    }

                    let damageToDeal = d2.attackDamage;
                    if (d2.kind === 'Barbarian') {
                      const bonusDamage = gc.barbarianController.uniqueNPCHitsThisThrow.size;
                      damageToDeal = d2.rageWasUsedThisThrow ? (2 + bonusDamage) : (d2.attackDamage + bonusDamage);
                    }
                    d1.takeHit(damageToDeal, d2);

                    if (d1.hitPoints <= 0 && !gc.npcsKilledForRageCharge.has(d1.discName)) {
                      if (d2.kind === 'Barbarian') {
                        if (gc.barbarianController.rageCharges < gc.barbarianController.maxRageChargesCap) {
                          gc.barbarianController.rageCharges++;
                        }
                        if (d2.rageWasUsedThisThrow) {
                          d2.restoreHealth(1);
                          gc.updateDiscNames();
                          if (gc.uiManager) gc.uiManager.updateCurrentTurnDiscName(gc.currentDisc);
                        }
                      } else if (d2.kind === 'Wizard') {
                        gc.wizardController.manaEarnedThisTurn += 2;
                      } else if (d2.kind === 'Orb') {
                        gc.wizardController.manaEarnedThisTurn += 1;
                      } else if (d2.kind === 'Necromancer') {
                        gc.necromancerController.manaEarnedThisTurn += 2;
                      }
                      gc.npcsKilledForRageCharge.add(d1.discName);
                      gc.barbarianController.updateRageButtonVisibility();
                    }
                    if (!d2.canDoReboundDamage) {
                      gc.playerDamagedNPCsThisThrow.add(d1.discName);
                    }
                  }
                } else if (!(d2.type === "NPC" && d1.type === "NPC")) {
                  if (!(d2.type === "player" && d1.type === "player")) {
                    if (!d2.hasCausedDamage || d2.canDoReboundDamage) {
                      let damageToDeal = d2.attackDamage;
                      if (d2.kind === 'Barbarian') {
                        const bonusDamage = gc.barbarianController.uniqueNPCHitsThisThrow.size;
                        damageToDeal = d2.rageWasUsedThisThrow ? (2 + bonusDamage) : (d2.attackDamage + bonusDamage);
                      }
                      d1.takeHit(damageToDeal, d2);
                      d2.hasCausedDamage = true;

                      if (d2.type === 'NPC' && d2.hitPoints <= 0 && !gc.npcsKilledForRageCharge.has(d2.discName)) {
                        if (d1.kind === 'Wizard') {
                          gc.wizardController.manaEarnedThisTurn += 1;
                        } else if (d1.kind === 'Necromancer') {
                          gc.necromancerController.manaEarnedThisTurn += 1;
                        }
                        gc.npcsKilledForRageCharge.add(d2.discName);
                        gc.barbarianController.updateRageButtonVisibility();
                        gc.wizardController.updateActionButtons();
                        gc.necromancerController.updateActionButtons();
                      }
                    }
                  }
                }
              }
              // Case 3: NPC-NPC collision (Chain Reaction) when player is the actor
              else if (gc.thrownDisc !== null && d1.type === "NPC" && d2.type === "NPC" && gc.currentDisc && gc.currentDisc.type === 'player') {
                const actor = gc.currentDisc;
                if (actor.canDoReboundDamage || !gc.playerDamagedNPCsThisThrow.has(d1.discName) || !gc.playerDamagedNPCsThisThrow.has(d2.discName)) {
                  let damageToDeal = actor.attackDamage;

                  if (actor.kind === 'Barbarian') {
                    gc.barbarianController.uniqueNPCHitsThisThrow.add(d1.discName);
                    gc.barbarianController.uniqueNPCHitsThisThrow.add(d2.discName);
                    const bonusDamage = gc.barbarianController.uniqueNPCHitsThisThrow.size;
                    damageToDeal = actor.rageWasUsedThisThrow ? (2 + bonusDamage) : (actor.attackDamage + bonusDamage);
                  }

                  d1.takeHit(damageToDeal, actor);
                  d2.takeHit(damageToDeal, actor);

                  [d1, d2].forEach(npc => {
                    if (npc.hitPoints <= 0 && !gc.npcsKilledForRageCharge.has(npc.discName)) {
                      if (actor.kind === 'Barbarian') {
                        if (gc.barbarianController.rageCharges < gc.barbarianController.maxRageChargesCap) {
                          gc.barbarianController.rageCharges++;
                        }
                        if (actor.rageWasUsedThisThrow) {
                          actor.restoreHealth(1);
                          gc.updateDiscNames();
                          if (gc.uiManager) gc.uiManager.updateCurrentTurnDiscName(gc.currentDisc);
                        }
                      } else if (actor.kind === 'Wizard') {
                        gc.wizardController.manaEarnedThisTurn += 2;
                      } else if (actor.kind === 'Orb') {
                        gc.wizardController.manaEarnedThisTurn += 1;
                      } else if (actor.kind === 'Necromancer') {
                        gc.necromancerController.manaEarnedThisTurn += 2;
                      }
                      gc.npcsKilledForRageCharge.add(npc.discName);
                    }
                  });
                  gc.barbarianController.updateRageButtonVisibility();

                  if (!actor.canDoReboundDamage) {
                    gc.playerDamagedNPCsThisThrow.add(d1.discName);
                    gc.playerDamagedNPCsThisThrow.add(d2.discName);
                  }
                }
              }
            }
          }
        }
      }
    }

    return false; // no early exit needed
  }
}
