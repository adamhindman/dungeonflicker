import { Vector3 } from 'three';
import { tryMirrorGate } from './MirrorGates.js';
import { isOnIce, iceFriction } from './IcePatches.js';

const _columnPos = new Vector3(); // scratch for round columns' world positions

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
      // Immovable discs (Paracelsus's alembics) shrug off every knock.
      if (disc.immovable && disc.moving) {
        disc.velocity.set(0, 0, 0);
        disc.moving = false;
      }
      if (disc.moving) {
        const bounceDamping = this.bounceDampingFor(disc);
        disc.updatePosition();

        // Apply gravity along ramp slope (hex and donut levels).
        if (gc.level && (gc.level.hexRings || gc.level.donutRings)) {
          const slope = gc.level.getTerrainSlopeForce(disc.mesh.position.x, disc.mesh.position.z);
          disc.velocity.x += slope.fx;
          disc.velocity.z += slope.fz;
        }

        // Check door entry BEFORE the boundary-bounce so a disc heading into
        // the open doorway isn't pushed back before the transition fires.
        // While the Pursuer is here its open door is an escape, cleared room or not,
        // and so is a locked-away exit (open from the start).
        if ((gc.roundWon || gc.pursuerController?.isPresent || gc.level.lockedExit) && disc.type === "player" && disc.kind !== "Orb" && disc.kind !== "HealingOrb" && disc.kind !== "AnimatedDead" && disc.kind !== "Bomb" && disc.kind !== "RoguePotion" && disc.kind !== "Fireball") {
          if (gc.level.checkPortalCollision(disc.mesh.position.x, disc.mesh.position.z, disc.radius)) {
            await gc.startNextLevel(disc);
            return true; // signal animate() to exit early
          }
        }

        // Mirror Gates: a disc sliding into one comes out of its partner
        // (before wall collision, which would bounce it off the gate's wall).
        tryMirrorGate(gc, disc);

        // Walls, obstacles and the room's outer boundary
        if (this.collideWithRoom(disc, bounceDamping)) {
          if (gc.soundManager && disc.velocity.length() > 0.05) {
            gc.soundManager.playBounce(disc.mesh.position.clone());
          }
          this._onWallBounce(disc);
        }

        if (gc.level && gc.level.crusherConfig && !disc.isGhost) {
          for (const crusher of gc.level.crusherConfig.crushers) {
            this._handleCrusherCollision(disc, crusher);
          }
        }

        disc.applyFriction(this.frictionFor(disc));
      }
    }


    // ── Snap every disc's Y to terrain height (hex and donut levels) ──────────
    if (gc.level && (gc.level.hexRings || gc.level.donutRings)) {
      for (const disc of gc.discs) {
        if (gc.pitEruption?.isAirborne(disc)) continue; // flung from the lava pit
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

        // Ghost Ring discs pass through every other disc
        if (d1.isGhost || d2.isGhost) continue;
        // Discs flung from the lava pit fly over everything
        if (gc.pitEruption?.isAirborne(d1) || gc.pitEruption?.isAirborne(d2)) continue;
        // The Pursuer glides through everything on its own turn (it hurts whoever it touches itself)
        if (gc.pursuerController?.isGliding(d1) || gc.pursuerController?.isGliding(d2)) continue;

        // Throwing Knife: everything passes over it, except that a knife in
        // flight strikes the first enemy it touches.
        if (d1.kind === 'Knife' || d2.kind === 'Knife') {
          const knife = d1.kind === 'Knife' ? d1 : d2;
          const other = knife === d1 ? d2 : d1;
          const dx = knife.mesh.position.x - other.mesh.position.x;
          const dz = knife.mesh.position.z - other.mesh.position.z;
          if (knife.moving && other.type === 'NPC' && Math.hypot(dx, dz) < knife.radius + other.radius) {
            gc.itemManager?.onKnifeHit(knife, other);
          }
          continue;
        }

        // A potion a fallen character spilled: everything passes over it; a
        // living party member who touches it picks it up (ItemManager checks who counts).
        if (d1.kind === 'DroppedPotion' || d2.kind === 'DroppedPotion') {
          const potion = d1.kind === 'DroppedPotion' ? d1 : d2;
          const other = potion === d1 ? d2 : d1;
          const dx = potion.mesh.position.x - other.mesh.position.x;
          const dz = potion.mesh.position.z - other.mesh.position.z;
          if (Math.hypot(dx, dz) < potion.radius + other.radius) {
            gc.itemManager?.onPotionTouched(potion, other);
          }
          continue;
        }

        // Resurrection flask: passes over everything; a flask in flight that
        // touches a fallen ally brings them back (ItemManager checks who counts).
        if (d1.kind === 'ResurrectionFlask' || d2.kind === 'ResurrectionFlask') {
          const flask = d1.kind === 'ResurrectionFlask' ? d1 : d2;
          const other = flask === d1 ? d2 : d1;
          const dx = flask.mesh.position.x - other.mesh.position.x;
          const dz = flask.mesh.position.z - other.mesh.position.z;
          if (flask.moving && other.dead && Math.hypot(dx, dz) < flask.radius + other.radius) {
            gc.itemManager?.onFlaskHit(flask, other);
          }
          continue;
        }

        // Skip collision between Wizard and his own regular Orbs while they are orbiting
        if ((d1.kind === 'Wizard' && d2.kind === 'Orb' && gc.wizardController?.orbs?.includes(d2) && !d2.moving) ||
            (d2.kind === 'Wizard' && d1.kind === 'Orb' && gc.wizardController?.orbs?.includes(d1) && !d1.moving)) {
          continue;
        }

        // Skip collision between Necromancer and its animated dead while they are orbiting
        if ((d1.kind === 'Necromancer' && gc.necromancerController?.animatedDeadDiscs?.includes(d2) && !d2.moving) ||
            (d2.kind === 'Necromancer' && gc.necromancerController?.animatedDeadDiscs?.includes(d1) && !d1.moving)) {
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

        // Fireballs pass through their caster and dead discs; they deflect off other NPCs
        // (and burn Animated Dead like any other party-side disc)
        if ((d1.kind === 'Fireball' && (d2 === d1.casterDisc || d2.dead)) ||
            (d2.kind === 'Fireball' && (d1 === d2.casterDisc || d1.dead))) {
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
            necro.restoreHealth(2);
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

            // Powder kegs take no damage and deal none: a hit lights them or sets them off.
            if (d1.kind === 'PowderKeg' || d2.kind === 'PowderKeg') {
              const speed = -velocityAlongNormal;
              if (d1.kind === 'PowderKeg') gc.powderKegs?.onKegStruck(d1, d2, speed);
              if (d2.kind === 'PowderKeg') gc.powderKegs?.onKegStruck(d2, d1, speed);
            }
            // Apply damage rules — both discs must be alive (Bombs deal no disc-collision damage)
            else if (d1.hitPoints > 0 && d2.hitPoints > 0 && !d1.dead && !d2.dead && d1.kind !== 'Bomb' && d2.kind !== 'Bomb') {
              // Special Case: AnimatedDead hitting a live NPC (deals damage but is NOT consumed).
              // A fireball is left to the fireball case below, which burns it and is used up.
              if ((d1.kind === 'AnimatedDead' && !d1.dead && d2.type === 'NPC' && !d2.dead && d2.kind !== 'Fireball') ||
                  (d2.kind === 'AnimatedDead' && !d2.dead && d1.type === 'NPC' && !d1.dead && d1.kind !== 'Fireball')) {
                const animated = d1.kind === 'AnimatedDead' ? d1 : d2;
                const npc      = d1.kind === 'AnimatedDead' ? d2 : d1;

                if (gc.currentDisc === animated) {
                  npc.takeHit(animated.attackDamage, animated);
                  if (npc.hitPoints <= 0 && !gc.npcsKilledForRageCharge.has(npc.discName)) {
                    gc.necromancerController.manaEarnedThisTurn += 1;
                    gc.npcsKilledForRageCharge.add(npc.discName);
                    gc.necromancerController?.updateActionButtons();
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
                  gc.barbarianController?.updateRageButtonVisibility();
                  gc.wizardController?.updateActionButtons();
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
                    if (d1.kind === 'Barbarian') {
                      gc.barbarianController.onEnemyStruck(d2);
                    }

                    let damageToDeal = d1.attackDamage;
                    if (d1.kind === 'Barbarian') {
                      damageToDeal = gc.barbarianController.hitDamage(d1);
                    } else if (d1.kind === 'Rogue' && gc.rogueController?.isSneakAttackThrow) {
                      damageToDeal = gc.rogueController.sneakAttackDamage();
                    }
                    d2.takeHit(damageToDeal, d1);

                    // Track blob kills for evolution
                    if (d1.kind === 'Blob' && d2.hitPoints <= 0) {
                      d1.recordPotentialKill(d2);
                    }

                    if (d2.hitPoints <= 0 && !gc.npcsKilledForRageCharge.has(d2.discName)) {
                      if (d1.kind === 'Barbarian') {
                        gc.barbarianController.onKill(d1);
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
                      gc.barbarianController?.updateRageButtonVisibility();
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
                        damageToDeal = gc.barbarianController.hitDamage(d1);
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
                        gc.barbarianController?.updateRageButtonVisibility();
                        gc.wizardController?.updateActionButtons();
                        gc.necromancerController?.updateActionButtons();
                      }
                    }
                  }
                }
              }
              // Case 2: d2 is the current acting disc
              else if (gc.thrownDisc !== null && d2 === gc.currentDisc) {
                if (d2.type === "player" && d1.type === "NPC") {
                  if (d2.canDoReboundDamage || !gc.playerDamagedNPCsThisThrow.has(d1.discName)) {
                    if (d2.kind === 'Barbarian') {
                      gc.barbarianController.onEnemyStruck(d1);
                    }

                    let damageToDeal = d2.attackDamage;
                    if (d2.kind === 'Barbarian') {
                      damageToDeal = gc.barbarianController.hitDamage(d2);
                    } else if (d2.kind === 'Rogue' && gc.rogueController?.isSneakAttackThrow) {
                      damageToDeal = gc.rogueController.sneakAttackDamage();
                    }
                    d1.takeHit(damageToDeal, d2);

                    // Track blob kills for evolution
                    if (d2.kind === 'Blob' && d1.hitPoints <= 0) {
                      d2.recordPotentialKill(d1);
                    }

                    if (d1.hitPoints <= 0 && !gc.npcsKilledForRageCharge.has(d1.discName)) {
                      if (d2.kind === 'Barbarian') {
                        gc.barbarianController.onKill(d2);
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
                      gc.barbarianController?.updateRageButtonVisibility();
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
                        damageToDeal = gc.barbarianController.hitDamage(d2);
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
                        gc.barbarianController?.updateRageButtonVisibility();
                        gc.wizardController?.updateActionButtons();
                        gc.necromancerController?.updateActionButtons();
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
                    gc.barbarianController.onEnemyStruck(d1);
                    gc.barbarianController.onEnemyStruck(d2);
                    damageToDeal = gc.barbarianController.hitDamage(actor);
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
                        gc.barbarianController.onKill(actor);
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
                  gc.barbarianController?.updateRageButtonVisibility();

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

    // ── Hardy Shields: discs bounce off them ─────────────────────────────────
    gc.itemManager?.resolveShieldCollisions();

    return false; // no early exit needed
  }

  /** What `disc`'s speed is multiplied by each step, where it is now. */
  frictionFor(disc) {
    // Wizards and Necromancers have more drag and slow down faster
    const friction = disc.kind === 'Bomb'
      ? 0.888
      : (disc.kind === 'Wizard' || disc.kind === 'Necromancer') ? 0.92 : 0.96;
    // On ice, almost no friction at all.
    const onIce = isOnIce(this.gc.level, disc.mesh.position.x, disc.mesh.position.z);
    return onIce ? iceFriction(friction) : friction;
  }

  /** How bouncy walls are for `disc` (the fraction of its speed it keeps). */
  bounceDampingFor(disc) {
    return disc.kind === 'Bomb' ? 0.35 : 0.8;
  }

  /**
   * Keeps `disc` inside the room and out of its walls and obstacles, bouncing
   * it off whatever it has run into this step. Plays no sounds and has no other
   * side effects, so the aim preview (BouncePreview.js) can run it on a
   * stand-in disc. (Crushers, which hurt and fling, are handled separately.)
   * @returns {boolean} true if it bounced off anything
   */
  collideWithRoom(disc, bounceDamping) {
    const level = this.gc.level;
    let bounced = disc.handleWallCollision(level.fieldWidth, level.fieldDepth, bounceDamping);

    // Ghost Ring discs only collide with the room's outer walls.
    // Round columns (userData.colliderRadius) collide as the circle they are,
    // not as the square box around them, whose corners act as invisible walls.
    for (const wall of level.getAllWalls(!!disc.isGhost)) {
      const radius = wall.userData?.colliderRadius;
      const hit = radius
        ? this._collideWithColumn(disc, wall.getWorldPosition(_columnPos), radius, bounceDamping)
        : disc.handleCollisionWithBox(wall, bounceDamping);
      if (hit) bounced = true;
    }

    // Obstacles: pillars are exact circles; triangles and polygons collide
    // with their actual edges and corners.
    for (const obs of (disc.isGhost ? [] : (level.obstacles || []))) {
      let hit = false;
      if (obs.type === 'pillar') hit = this._collideWithColumn(disc, obs, obs.width / 2, bounceDamping);
      else if (obs.type === 'polygon') hit = this._collideWithPolygon(disc, obs.points, bounceDamping);
      else if (obs.type === 'triangle') hit = this._collideWithTriangle(disc, obs, bounceDamping);
      if (hit) bounced = true;
    }

    // Circular/bullseye/donut level: enforce circular outer boundary.
    // The polygon wall segments use rotated BoxGeometry; Box3.setFromObject
    // inflates them into larger AABBs, leaving gaps a fast disc can slip through.
    // A radial clamp is exact and replaces the per-segment AABB check.
    // A polygon room that lists its edges (the Crusher's hexagon) is clamped to
    // the polygon instead, so its corners stay reachable.
    if (level.boundaryEdges) {
      for (const { nx, nz, distance } of level.boundaryEdges) {
        const out = disc.mesh.position.x * nx + disc.mesh.position.z * nz - (distance - disc.radius);
        if (out <= 0) continue;
        disc.mesh.position.x -= nx * out;
        disc.mesh.position.z -= nz * out;
        const vDotN = disc.velocity.x * nx + disc.velocity.z * nz;
        if (vDotN > 0) {
          disc.velocity.x = (disc.velocity.x - 2 * vDotN * nx) * bounceDamping;
          disc.velocity.z = (disc.velocity.z - 2 * vDotN * nz) * bounceDamping;
          bounced = true;
        }
      }
    } else if (level.circleRadius && !level.hexRings) {
      if (this._keepInsideCircle(disc, 0, 0, level.circleRadius, bounceDamping)) bounced = true;
    }

    // Boss room: the curved far wall lies on a circle; keep discs inside it.
    // (Ghosts too: it's an outer wall.)
    if (level.arcWall) {
      const { cx, cz, r } = level.arcWall;
      if (this._keepInsideCircle(disc, cx, cz, r, bounceDamping)) bounced = true;
    }

    // Hexagonal level: enforce circular outer boundary (replaces AABB collision
    // on the large rotated wall panels, which inflate badly).
    if (level.hexRings) {
      if (this._keepInsideCircle(disc, 0, 0, level.hexRings.RA_in, bounceDamping)) bounced = true;
    }
    return bounced;
  }

  /**
   * Keeps `disc` inside the circle of radius `R` centred at (cx, cz), bouncing
   * it off the edge. Returns true if it bounced.
   */
  _keepInsideCircle(disc, cx, cz, R, bounceDamping) {
    const dx = disc.mesh.position.x - cx;
    const dz = disc.mesh.position.z - cz;
    const r  = Math.sqrt(dx * dx + dz * dz);
    const maxR = R - disc.radius;
    if (r <= maxR || r <= 0.001) return false;
    const nx = dx / r;
    const nz = dz / r;
    disc.mesh.position.x = cx + nx * maxR;
    disc.mesh.position.z = cz + nz * maxR;
    const vDotN = disc.velocity.x * nx + disc.velocity.z * nz;
    if (vDotN <= 0) return false;
    disc.velocity.x = (disc.velocity.x - 2 * vDotN * nx) * bounceDamping;
    disc.velocity.z = (disc.velocity.z - 2 * vDotN * nz) * bounceDamping;
    return true;
  }

  /**
   * Pushes `disc` out of a triangle obstacle and bounces it off. Returns true
   * if it bounced.
   *
   * Three.js CylinderGeometry(r,r,h,3) places vertices at angles
   * rotY + k*2π/3 (k=0,1,2) from the +Z axis in the XZ plane (CW winding
   * when viewed from above). Collision uses SAT against the 3 edge normals
   * plus vertex-region handling for disc centers near corners.
   */
  _collideWithTriangle(disc, obs, bounceDamping) {
    const R = obs.width / 2; // circumradius
    const discR = disc.radius;
    const rotY = obs.rotY ?? 0;
    const px = disc.mesh.position.x;
    const pz = disc.mesh.position.z;

    // Quick reject: outside circumscribed circle + discR
    const qdx = px - obs.x, qdz = pz - obs.z;
    if (qdx * qdx + qdz * qdz > (R + discR) * (R + discR)) return false;

    // Build the 3 vertices in world space
    const verts = [];
    for (let k = 0; k < 3; k++) {
      const a = rotY + k * 2 * Math.PI / 3;
      verts.push([obs.x + R * Math.sin(a), obs.z + R * Math.cos(a)]);
    }

    // For CW winding the outward normal of edge V_k→V_{k+1} is the
    // 90° CCW rotation of the edge direction: n = ((az-bz), (bx-ax)) / len.
    // Signed distance is positive when disc center is outside that half-plane.
    const sDist = [];
    const normals = [];
    for (let k = 0; k < 3; k++) {
      const [ax, az] = verts[k];
      const [bx, bz] = verts[(k + 1) % 3];
      const edgeDx = bx - ax, edgeDz = bz - az;
      const edgeLen = Math.sqrt(edgeDx * edgeDx + edgeDz * edgeDz);
      const nx = (az - bz) / edgeLen;
      const nz = (bx - ax) / edgeLen;
      normals.push([nx, nz]);
      sDist.push((px - ax) * nx + (pz - az) * nz);
    }

    // SAT separating axis test
    let maxDist = -Infinity, maxK = 0;
    for (let k = 0; k < 3; k++) {
      if (sDist[k] > discR) return false;
      if (sDist[k] > maxDist) { maxDist = sDist[k]; maxK = k; }
    }

    // Determine which region the disc center is in
    const outerEdges = sDist.reduce((acc, d, k) => { if (d > 0) acc.push(k); return acc; }, []);

    let resolveNx, resolveNz, penetration;

    if (outerEdges.length === 0) {
      // Inside triangle: push through nearest edge (the one with max signed dist)
      resolveNx = normals[maxK][0];
      resolveNz = normals[maxK][1];
      penetration = discR - maxDist;
    } else if (outerEdges.length === 1) {
      // Face region: push along that edge's outward normal
      const k = outerEdges[0];
      resolveNx = normals[k][0];
      resolveNz = normals[k][1];
      penetration = discR - sDist[k];
    } else {
      // Vertex region: disc is outside 2 adjacent edges, push from shared vertex
      const e0 = outerEdges[0], e1 = outerEdges[1];
      // Edge e goes V_e → V_{(e+1)%3}; shared vertex is (e0+1)%3 if that equals e1, else e0
      const vertIdx = (e0 + 1) % 3 === e1 ? e1 : e0;
      const [vx, vz] = verts[vertIdx];
      const dvx = px - vx, dvz = pz - vz;
      const dvDist = Math.sqrt(dvx * dvx + dvz * dvz);
      if (dvDist < 0.001 || dvDist >= discR) return false; // no actual collision at vertex
      resolveNx = dvx / dvDist;
      resolveNz = dvz / dvDist;
      penetration = discR - dvDist;
    }

    disc.mesh.position.x += resolveNx * penetration;
    disc.mesh.position.z += resolveNz * penetration;
    const vDotN = disc.velocity.x * resolveNx + disc.velocity.z * resolveNz;
    if (vDotN >= 0) return false;
    disc.velocity.x = (disc.velocity.x - 2 * vDotN * resolveNx) * bounceDamping;
    disc.velocity.z = (disc.velocity.z - 2 * vDotN * resolveNz) * bounceDamping;
    return true;
  }

  /** `disc` bounced off a wall or obstacle: feeds Sneak Attack and Wall Slam. */
  /**
   * Pushes `disc` out of a round column at `pos` (world space) of `radius` and
   * bounces it off. Returns true if it bounced (it was moving into the column).
   */
  _collideWithColumn(disc, pos, radius, bounceDamping) {
    const dx = disc.mesh.position.x - pos.x;
    const dz = disc.mesh.position.z - pos.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    const minDist = disc.radius + radius;
    if (dist >= minDist || dist < 0.001) return false;
    const nx = dx / dist;
    const nz = dz / dist;
    disc.mesh.position.x = pos.x + nx * minDist;
    disc.mesh.position.z = pos.z + nz * minDist;
    const vDotN = disc.velocity.x * nx + disc.velocity.z * nz;
    if (vDotN >= 0) return false;
    disc.velocity.x = (disc.velocity.x - 2 * vDotN * nx) * bounceDamping;
    disc.velocity.z = (disc.velocity.z - 2 * vDotN * nz) * bounceDamping;
    return true;
  }

  /**
   * Pushes `disc` out of a convex polygon obstacle (`points`: world [x, z]
   * corners in order) and bounces it off. Returns true if it bounced.
   */
  _collideWithPolygon(disc, points, bounceDamping) {
    const px = disc.mesh.position.x, pz = disc.mesh.position.z;
    // The closest point on the outline, and whether the centre is inside.
    let bestDist = Infinity, bestX = 0, bestZ = 0, crossings = 0;
    points.forEach(([ax, az], i) => {
      const [bx, bz] = points[(i + 1) % points.length];
      const ex = bx - ax, ez = bz - az;
      const t = Math.max(0, Math.min(1, ((px - ax) * ex + (pz - az) * ez) / (ex * ex + ez * ez)));
      const cx = ax + ex * t, cz = az + ez * t;
      const dist = Math.hypot(px - cx, pz - cz);
      if (dist < bestDist) { bestDist = dist; bestX = cx; bestZ = cz; }
      if ((az > pz) !== (bz > pz) && px < ax + (pz - az) * ex / ez) crossings++;
    });
    const inside = crossings % 2 === 1;
    if (!inside && bestDist >= disc.radius) return false;
    if (bestDist < 0.0001) return false;
    // Outward normal: away from the outline (or towards it, from inside).
    let nx = (px - bestX) / bestDist, nz = (pz - bestZ) / bestDist;
    if (inside) { nx = -nx; nz = -nz; }
    const push = inside ? bestDist + disc.radius : disc.radius - bestDist;
    disc.mesh.position.x += nx * push;
    disc.mesh.position.z += nz * push;
    const vDotN = disc.velocity.x * nx + disc.velocity.z * nz;
    if (vDotN >= 0) return false;
    disc.velocity.x = (disc.velocity.x - 2 * vDotN * nx) * bounceDamping;
    disc.velocity.z = (disc.velocity.z - 2 * vDotN * nz) * bounceDamping;
    return true;
  }

  _onWallBounce(disc) {
    const gc = this.gc;
    if (gc.rogueController?.isSneakAttackThrow && disc === gc.thrownDisc) {
      gc.rogueController.onSneakBounce(disc);
    }
    gc.barbarianController?.onWallBounce(disc);
  }

  _handleCrusherCollision(disc, crusher) {
    const gc = this.gc;
    if (!disc || !disc.mesh || disc.dead || disc.hitPoints <= 0) return;
    if (disc.type !== 'player' && disc.type !== 'NPC') return;
    if (disc.kind === 'Orb' || disc.kind === 'HealingOrb' || disc.kind === 'Bomb' || disc.kind === 'RoguePotion') return;
    // A retracted crusher is flush with its wall: the wall's boundary clamp
    // handles it, so it mustn't bump, hurt or fling discs that touch the wall.
    if (crusher.currentLength <= crusher.retractedLength + 0.01) return;

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
