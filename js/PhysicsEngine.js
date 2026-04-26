import { Vector3 } from 'three';

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
        const isBombDisc = disc.kind === 'Bomb';
        const bounceDamping = isBombDisc ? 0.35 : 0.8;
        disc.updatePosition();

        // Apply gravity along ramp slope (hex and donut levels).
        if (gc.level && (gc.level.hexRings || gc.level.donutRings)) {
          const slope = gc.level.getTerrainSlopeForce(disc.mesh.position.x, disc.mesh.position.z);
          disc.velocity.x += slope.fx;
          disc.velocity.z += slope.fz;
        }

        // Check door entry BEFORE the boundary-bounce so a disc heading into
        // the open doorway isn't pushed back before the transition fires.
        if (gc.roundWon && disc.type === "player" && disc.kind !== "Orb" && disc.kind !== "HealingOrb" && disc.kind !== "AnimatedDead" && disc.kind !== "Bomb" && disc.kind !== "RoguePotion" && disc.kind !== "Fireball") {
          if (gc.level.checkPortalCollision(disc.mesh.position.x, disc.mesh.position.z, disc.radius)) {
            await gc.startNextLevel(disc);
            return true; // signal animate() to exit early
          }
        }

        const hitBoundary = disc.handleWallCollision(
          gc.level.fieldWidth,
          gc.level.fieldDepth,
          bounceDamping,
        );
        if (hitBoundary && gc.soundManager && disc.velocity.length() > 0.05) {
          gc.soundManager.playBounce(disc.mesh.position.clone());
        }
        if (hitBoundary && gc.rogueController?.isSneakAttackThrow && disc === gc.thrownDisc) {
          gc.rogueController.sneakAttackBonusCount++;
        }

        const walls = gc.level.getAllWalls();
        walls.forEach((wall) => {
          const hitWall = disc.handleCollisionWithBox(wall, bounceDamping);
          if (hitWall && gc.soundManager && disc.velocity.length() > 0.05) {
            gc.soundManager.playBounce(disc.mesh.position.clone());
          }
          if (hitWall && gc.rogueController?.isSneakAttackThrow && disc === gc.thrownDisc) {
            gc.rogueController.sneakAttackBonusCount++;
          }
        });

        if (gc.level && gc.level.crusherConfig) {
          for (const crusher of gc.level.crusherConfig.crushers) {
            this._handleCrusherCollision(disc, crusher);
          }
        }

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
              disc.velocity.x = (disc.velocity.x - 2 * vDotN * nx) * bounceDamping;
              disc.velocity.z = (disc.velocity.z - 2 * vDotN * nz) * bounceDamping;
              if (gc.soundManager && disc.velocity.length() > 0.05) {
                gc.soundManager.playBounce(disc.mesh.position.clone());
              }
              if (gc.rogueController?.isSneakAttackThrow && disc === gc.thrownDisc) {
                gc.rogueController.sneakAttackBonusCount++;
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
              disc.velocity.x = (disc.velocity.x - 2 * vDotN * nx) * bounceDamping;
              disc.velocity.z = (disc.velocity.z - 2 * vDotN * nz) * bounceDamping;
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
              disc.velocity.x = (disc.velocity.x - 2 * vDotN * nx) * bounceDamping;
              disc.velocity.z = (disc.velocity.z - 2 * vDotN * nz) * bounceDamping;
              if (gc.soundManager && disc.velocity.length() > 0.05) {
                gc.soundManager.playBounce(disc.mesh.position.clone());
              }
            }
          }
        }

        // Apply friction (Wizards and Necromancers have more drag and slow down faster)
        const currentFriction = isBombDisc
          ? 0.888
          : (disc.kind === 'Wizard' || disc.kind === 'Necromancer') ? 0.92 : 0.96;
        disc.applyFriction(currentFriction);
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

        // Skip collision between Wizard and his own regular Orbs while they are orbiting
        if ((d1.kind === 'Wizard' && d2.kind === 'Orb' && gc.wizardController.orbs.includes(d2) && !d2.moving) ||
            (d2.kind === 'Wizard' && d1.kind === 'Orb' && gc.wizardController.orbs.includes(d1) && !d1.moving)) {
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
        const isDissolvingCorpse = (d1.dead && d1.isDissolving) || (d2.dead && d2.isDissolving);
        if (!isDissolvingCorpse &&
            ((isRegularOrb1 && d2.dead) || (isRegularOrb2 && d1.dead) || (isAnyOrb1 && isAnyOrb2))) {
          continue;
        }

        // Regular Orbs (cyan) should pass through all player discs without interaction
        if ((d1.kind === 'Orb' && d2.type === 'player') || (d2.kind === 'Orb' && d1.type === 'player')) {
          continue;
        }

        // Fireballs pass through NPCs (including their caster), AnimatedDead, and dead discs
        if ((d1.kind === 'Fireball' && (d2.type === 'NPC' || d2.kind === 'AnimatedDead' || d2.dead)) ||
            (d2.kind === 'Fireball' && (d1.type === 'NPC' || d1.kind === 'AnimatedDead' || d1.dead))) {
          continue;
        }

        // Freshly-thrown Rogue Bomb should temporarily pass through the Rogue.
        const bomb = d1.kind === 'Bomb' ? d1 : d2.kind === 'Bomb' ? d2 : null;
        const other = bomb === d1 ? d2 : bomb === d2 ? d1 : null;
        if (
          bomb &&
          other &&
          other.kind === 'Rogue' &&
          other.type === 'player' &&
          typeof bomb.ignoreRogueCollisionUntil === 'number' &&
          performance.now() < bomb.ignoreRogueCollisionUntil
        ) {
          continue;
        }

        const diff = d1.mesh.position.clone().sub(d2.mesh.position.clone());
        const dist = diff.length();
        const minDist = d1.radius + d2.radius;

        if (dist < minDist && dist > 0) {
          // Carrion Feast: Necromancer touching a corpse marks it for dissolve and heals
          const necro = d1.kind === 'Necromancer' ? d1 : d2.kind === 'Necromancer' ? d2 : null;
          const corpse = necro === d1 ? d2 : necro === d2 ? d1 : null;
          const isNecromancerCorpse = corpse && corpse.kind === 'Necromancer';
          if (necro && corpse && necro.carrionFeastActive && corpse.dead && !isNecromancerCorpse && !corpse.isDissolving) {
            necro.restoreHealth(1);
            corpse.startDissolve(2);
            if (gc.necromancerController) gc.necromancerController.carrionFeastAteThisTurn = true;
            if (gc.uiManager) gc.uiManager.updateCurrentTurnDiscName(necro);
          }

          // Blob eating corpses: Touching a dead disc eats it and counts toward evolution
          const blob = d1.kind === 'Blob' ? d1 : d2.kind === 'Blob' ? d2 : null;
          const potentialCorpse = blob === d1 ? d2 : blob === d2 ? d1 : null;
          const blobIsActing = gc.currentDisc === blob;
          if (blob && !blob.dead && blobIsActing && potentialCorpse && potentialCorpse.dead && !potentialCorpse.isDissolving) {
            blob.eatCorpse(potentialCorpse);
            continue; // Skip further collision processing for this corpse
          }

          // RoguePotion: heals the first non-full-health PC it touches, then is consumed; passes through NPCs
          if ((d1.kind === 'RoguePotion' || d2.kind === 'RoguePotion') && !d1.dead && !d2.dead) {
            const potion = d1.kind === 'RoguePotion' ? d1 : d2;
            const target = d1.kind === 'RoguePotion' ? d2 : d1;
            if (target.type === 'player' && !target.dead && target.hitPoints > 0 && target.hitPoints < target.maxHitPoints) {
              target.restoreHealth(2);
              gc.rogueController.removePotion(potion);
              gc.updateDiscNames();
              if (gc.uiManager) gc.uiManager.updateCurrentTurnDiscName(gc.currentDisc);
            }
            continue; // always pass through
          }

          // Special Case: Wizard Healing Orb hitting anything (Heal and pass through)
          if ((d1.kind === 'HealingOrb' || d2.kind === 'HealingOrb') && !d1.dead && !d2.dead) {
            const healingOrb = d1.kind === 'HealingOrb' ? d1 : d2;
            const target     = d1.kind === 'HealingOrb' ? d2 : d1;

            if (!healingOrb.healedDiscs.has(target)) {
              target.restoreHealth(2);
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
            const isBombCollision  = d1.kind === 'Bomb' || d2.kind === 'Bomb';
            const restitution      = isBombCollision ? 0.1 : 1;
            const impulseMagnitude = (-(1 + restitution) * velocityAlongNormal) / (1 / d1.mass + 1 / d2.mass);

            d1.velocity.add(normal.clone().multiplyScalar(impulseMagnitude / d1.mass));
            d2.velocity.sub(normal.clone().multiplyScalar(impulseMagnitude / d2.mass));

            d1.moving = true;
            d2.moving = true;

            if (gc.soundManager && velocityAlongNormal < -0.05) {
              const midPoint = d1.mesh.position.clone().add(d2.mesh.position).multiplyScalar(0.5);
              const hitBlob = d1.kind === 'Blob' || d2.kind === 'Blob';
              const hitWardenNpc = (d1.kind === 'Warden' && d1.type === 'NPC') ||
                                   (d2.kind === 'Warden' && d2.type === 'NPC');
              if (hitBlob) {
                gc.soundManager.playBlobHit(midPoint);
              } else if (hitWardenNpc) {
                gc.soundManager.playWardenHit(midPoint);
              } else {
                gc.soundManager.playDiscHit(midPoint);
              }
            }

            // Push overlapping discs apart to ensure momentum is felt cleanly
            const totalMass        = d1.mass + d2.mass;
            const separationOverlap = minDist - dist;
            d1.mesh.position.add(normal.clone().multiplyScalar(separationOverlap * (d2.mass / totalMass)));
            d2.mesh.position.sub(normal.clone().multiplyScalar(separationOverlap * (totalMass === 0 ? 0 : d1.mass / totalMass)));

            // Sneak Attack: count this disc-disc collision
            if (gc.rogueController?.isSneakAttackThrow && (d1 === gc.thrownDisc || d2 === gc.thrownDisc)) {
              gc.rogueController.sneakAttackBonusCount++;
            }

            // Apply damage rules — both discs must be alive (Bombs deal no disc-collision damage)
            if (d1.hitPoints > 0 && d2.hitPoints > 0 && !d1.dead && !d2.dead && d1.kind !== 'Bomb' && d2.kind !== 'Bomb') {
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
              // Special Case: Fire Elemental Fireball hitting a player
              else if (gc.thrownDisc !== null && ((d1.kind === 'Fireball' && d2.type === 'player') || (d2.kind === 'Fireball' && d1.type === 'player'))) {
                const fireball = d1.kind === 'Fireball' ? d1 : d2;
                const player   = d1.kind === 'Fireball' ? d2 : d1;
                player.takeHit(fireball.attackDamage, fireball);
                fireball.takeHit(999, player); // Fireball is consumed on impact
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
                    } else if (d1.kind === 'Rogue' && gc.rogueController?.isSneakAttackThrow) {
                      damageToDeal = gc.rogueController.sneakAttackBonusCount;
                    }
                    d2.takeHit(damageToDeal, d1);

                    // Track blob kills for evolution
                    if (d1.kind === 'Blob' && d2.hitPoints <= 0) {
                      d1.recordPotentialKill(d2);
                    }

                    if (d2.hitPoints <= 0 && !gc.npcsKilledForRageCharge.has(d2.discName)) {
                      if (d1.kind === 'Barbarian') {
                        gc.barbarianController.rageCharges++;
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
                      } else if (d1.kind === 'Rogue') {
                        gc.rogueController.charges++;
                        gc.rogueController.updateActionButtons();
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
                    } else if (d2.kind === 'Rogue' && gc.rogueController?.isSneakAttackThrow) {
                      damageToDeal = gc.rogueController.sneakAttackBonusCount;
                    }
                    d1.takeHit(damageToDeal, d2);

                    // Track blob kills for evolution
                    if (d2.kind === 'Blob' && d1.hitPoints <= 0) {
                      d2.recordPotentialKill(d1);
                    }

                    if (d1.hitPoints <= 0 && !gc.npcsKilledForRageCharge.has(d1.discName)) {
                      if (d2.kind === 'Barbarian') {
                        gc.barbarianController.rageCharges++;
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
                      } else if (d2.kind === 'Rogue') {
                        gc.rogueController.charges++;
                        gc.rogueController.updateActionButtons();
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

                      // Track blob kills for evolution
                      if (d2.kind === 'Blob' && d1.hitPoints <= 0) {
                        d2.recordPotentialKill(d1);
                      }

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

                  // Track blob kills for evolution
                  [d1, d2].forEach(npc => {
                    if (actor.kind === 'Blob' && npc.hitPoints <= 0) {
                      actor.recordPotentialKill(npc);
                    }
                  });

                  [d1, d2].forEach(npc => {
                    if (npc.hitPoints <= 0 && !gc.npcsKilledForRageCharge.has(npc.discName)) {
                      if (actor.kind === 'Barbarian') {
                        gc.barbarianController.rageCharges++;
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
                      } else if (actor.kind === 'Rogue') {
                        gc.rogueController.charges++;
                        gc.rogueController.updateActionButtons();
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

  _handleCrusherCollision(disc, crusher) {
    const gc = this.gc;
    if (!disc || !disc.mesh || disc.dead || disc.hitPoints <= 0) return;
    if (disc.type !== 'player' && disc.type !== 'NPC') return;
    if (disc.kind === 'Orb' || disc.kind === 'HealingOrb' || disc.kind === 'Bomb' || disc.kind === 'RoguePotion') return;

    const dir = new Vector3(Math.cos(crusher.angle), 0, Math.sin(crusher.angle)).normalize();
    const sideDir = new Vector3(-dir.z, 0, dir.x);
    const rel = new Vector3(
      disc.mesh.position.x - crusher.anchorX,
      0,
      disc.mesh.position.z - crusher.anchorZ,
    );
    const along = rel.dot(dir);
    const side = rel.dot(sideDir);
    const clampedAlong = Math.max(0, Math.min(along, crusher.currentLength));
    const clampedSide = Math.max(-crusher.width / 2, Math.min(side, crusher.width / 2));
    const closest = dir.clone().multiplyScalar(clampedAlong).add(sideDir.clone().multiplyScalar(clampedSide));
    const delta = rel.clone().sub(closest);
    const dist = delta.length();
    if (dist >= disc.radius) return;

    const normal = dist > 0.001 ? delta.multiplyScalar(1 / dist) : dir.clone();
    disc.mesh.position.x += normal.x * (disc.radius - dist);
    disc.mesh.position.z += normal.z * (disc.radius - dist);

    if (!crusher.hitDiscs.has(disc)) {
      crusher.hitDiscs.add(disc);
      disc.takeHit(2, null);
      if (gc.updateAllDiscDeadStates) gc.updateAllDiscDeadStates();
      if (gc.updateDiscNames) gc.updateDiscNames();
    }

    const fling = dir.clone().multiplyScalar(0.55).add(normal.multiplyScalar(0.35));
    disc.velocity.set(fling.x, 0, fling.z);
    disc.moving = true;
    if (gc.soundManager) gc.soundManager.playBounce(disc.mesh.position.clone());
  }
}
