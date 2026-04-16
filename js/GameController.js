import * as THREE from "three";
import Level from "./Level.js";
import UIManager from "./UIManager.js";
import InputHandler from './InputHandler.js';
import { BarbarianController } from './BarbarianController.js';
import { WizardController } from './WizardController.js';
import { NecromancerController } from './NecromancerController.js';
import { CameraController } from './CameraController.js';
import { PhysicsEngine }     from './PhysicsEngine.js';
import { DiscSpawner }       from './DiscSpawner.js';
import { LavaManager }       from './LavaManager.js';
import { SoundManager }      from './SoundManager.js';

let instance = null;

export default class GameController {
  constructor() {
    if (instance) return instance;
    instance = this;

    // Core Three.js scene components
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    // Game level and discs
    this.level = null;
    this.discs = [];
    this.lavaPools = []; // For storing LavaPool instances

    // Turn-based game state
    this.currentTurnIndex = 0;
    this._currentDisc = null;

    // Turn-start beam animations (descending column of light)
    this._turnStartBeams = [];

    // Turn-start ring ripple animations (expanding shockwave rings)
    this._turnStartRings = [];

    // Input and interaction state
    this.raycaster = null;
    this.mouse = new THREE.Vector2();
    this.controlsEnabled = true;
    // this.isPointerDown and this.pointerDownPos are now managed by InputHandler
    this.pointerDisc = null; // Still needed to track which disc is under pointer

    // UI elements are now managed by UIManager
    this.uiManager = null;
    this.inputHandler = null; // For managing input events

    // FPS calculation
    this.fpsFrameCount = 0;
    this.fpsLastTime = performance.now();
    this.fpsLastUpdateTime = performance.now();
    this.fpsUpdateInterval = 1000;

    // Visual helpers
    this.throwDirectionLine = null;
    this._prevLineStart = null;
    this._prevLineEnd = null;

    // Game state flags
    this.waitingForDiscToStop = false;
    this.playerDamagedNPCsThisThrow = new Set();
    this.npcsKilledForRageCharge = new Set(); // Shared kill-tracking across all characters

    // Game Over State
    this.gameOverState = { active: false, playerWon: false };
    this.roundWon = false;

    this.thrownDisc = null;

    // Character controllers (instantiated here, initialized in init())
    this.barbarianController = new BarbarianController(this);
    this.wizardController = new WizardController(this);
    this.necromancerController = new NecromancerController(this);

    // Subsystem controllers (camera/renderer/controls live in CameraController;
    // physics, spawning, and lava generation each have their own class)
    this.cameraController = new CameraController();
    this.physics          = new PhysicsEngine(this);
    this.discSpawner      = new DiscSpawner(this);
    this.lavaManager      = new LavaManager(this);
    this.soundManager     = new SoundManager(this);

    // Disc Info Popup
    this.discInfoPopupElement = null;
    this.discInfoNameElement = null;
    this.discInfoHpElement = null;
    this.discInfoDescriptionElement = null;
    this.discInfoPopupSelectedDisc = null;

    this.discDescriptions = {
        Barbarian: "Deals 2 damage per hit, plus 1 extra per enemy hit on the same throw. Kills grant Rage, boosting base damage and adding rebound damage.",
        Wizard: "Summon orbs with Mana. Costs 1 Mana per orb. Kills with orbs or bumps earn Mana back. Clearing rooms grants Mana.",
        Necromancer: "Spend Mana to Animate Dead NPCs (1 mana) — they deal 1 damage and have 1 HP. Raise Dead allies for 2 mana, reviving them at half HP. Earn mana from kills and clearing rooms.",
        Skeleton: "Just your basic walking skeleton. Does 1 damage per hit.",
        Warden: "Hard to move, and hard to kill. Hits for 2 base damage.",
        Orb: "A volatile sphere of magical energy, summoned by the Wizard.",
        HealingOrb: "A red sphere of restorative energy. Heals 1 HP to every living disc it passes through.",
        AnimatedDead: "A reanimated corpse under the Necromancer's command. 1 HP, 1 damage."
    };

    // Event listeners for keydown, keyup, pointerdown, pointermove, pointerup
    // will be managed by InputHandler.
    // The window resize listener remains here as it directly affects camera/renderer.
    window.addEventListener("resize", () => this.onWindowResize());

    this.animate = this.animate.bind(this);
    this.animate();
  }

  get currentDisc() {
    return this._currentDisc;
  }

  set currentDisc(value) {
    // Update spotlight intensities for all discs
    this.discs.forEach(disc => {
      disc.setSpotlightIntensity(disc === value);
    });

    this._currentDisc = value;
    if (this.uiManager) {
      this.uiManager.updateCurrentTurnDiscName(this._currentDisc);
      this.uiManager.updateDiscNames(this.discs, this._currentDisc); // Update the disc list (turn order)
    }
  }

  logCurrentTurn() {
    // Stub method to avoid undefined error
  }

  recenterCamera() {
    this.cameraController.recenterCamera();
  }

  focusCameraOnDisc(discName) {
    const disc = this.discs.find(d => d.discName === discName);
    if (disc) this.cameraController.focusCameraOnDisc(disc);
  }

  init() {
    // Initialize scene and rendering
    this.scene = new THREE.Scene();

    // Camera, renderer, and OrbitControls are owned by CameraController.
    // After init(), gc.camera / gc.renderer / gc.controls point at those same objects
    // so all existing code that references this.camera etc. continues to work.
    this.cameraController.init();
    this.camera   = this.cameraController.camera;
    this.renderer = this.cameraController.renderer;
    this.controls = this.cameraController.controls;

    this.soundManager.init();

    // Level progression — 1-based counter; shape sequence cycles: rect → circle → hexagon.
    this.currentLevelNumber = 1;

    // Load the level and walls
    this.level = new Level(this.scene);
    this.level.nextShape = this._shapeForLevel(this.currentLevelNumber);
    this.level.load();

    // Initialize disc array and turn index
    this.discs = [];
    this.currentTurnIndex = 0;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.controlsEnabled = true;
    // this.isPointerDown and this.pointerDownPos are now managed by InputHandler
    this.pointerDisc = null;

    // Instantiate UIManager
    this.uiManager = new UIManager(this.restartGame.bind(this), this.recenterCamera.bind(this), this.focusCameraOnDisc.bind(this));
    this.actionButtonsContainer = this.uiManager.getActionButtonsContainer();
    if (!this.actionButtonsContainer) {
      console.error("GameController: Action buttons container not found from UIManager.");
      // Depending on how critical this is, you might want to return or throw an error
    }
    // Initialize throw direction line helper for drag aim visualization
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2,
    });
    const vertices = new Float32Array(6); // 2 vertices * 3 coords each
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.setDrawRange(0, 2);
    this.throwDirectionLine = new THREE.Line(geometry, material);
    this.throwDirectionLine.visible = false;
    this.scene.add(this.throwDirectionLine);

    // Instantiate InputHandler
    this.inputHandler = new InputHandler(this.renderer.domElement, this, this.uiManager);

    // Disc Info Popup Elements
    this.discInfoPopupElement = document.getElementById('disc-info-popup');
    if (this.discInfoPopupElement) {
        this.discInfoNameElement = this.discInfoPopupElement.querySelector('.name');
        this.discInfoHpElement = this.discInfoPopupElement.querySelector('.hp');
        this.discInfoDescriptionElement = this.discInfoPopupElement.querySelector('.description');
    } else {
        console.error("Disc info popup element not found in DOM.");
    }

    // UI elements (throwInfoDiv, fpsDisplayElement, GameOverUI) are now managed by UIManager
    // Event listeners (pointerdown, pointermove, pointerup, keydown, keyup) are now managed by InputHandler

    // Generate lava pools first so disc spawning can avoid them
    this.lavaManager.generate();

    // Initialize discs for gameplay
    this.initDiscs();

    // Initialize character controllers (buttons, listeners, initial visibility)
    this.barbarianController.init(this.actionButtonsContainer);
    this.wizardController.init(this.actionButtonsContainer);
    this.necromancerController.init(this.actionButtonsContainer);

    // Generate lava pools
    this.lavaManager.generate();

    // Setup input handling
    this.updateDiscNames(); // Explicitly update the disc list after all initialization
  }

  // ─── WIZARD / NECROMANCER / BARBARIAN character logic lives in their
  //     respective controller classes (WizardController, NecromancerController,
  //     BarbarianController). GameController delegates to them below.






  // Helper method to check if a position is valid (not inside obstacles, lava, and optionally other discs)
  isPositionValid(x, z, discRadius, checkDiscs = false, excludeDiscs = []) {
    const isValidInLevel = this.level.isPositionValid(x, z, discRadius);
    if (!isValidInLevel) return false;

    // Reject positions that overlap with any lava pool (center + baseRadius + disc radius + small buffer).
    for (const pool of (this.lavaPools || [])) {
      const dx = x - pool.centerX;
      const dz = z - pool.centerZ;
      const minDist = pool.baseRadius + discRadius + 0.5;
      if (dx * dx + dz * dz < minDist * minDist) return false;
    }

    if (checkDiscs && this.discs) {
      for (const disc of this.discs) {
        if (!disc || disc.dead || disc.hitPoints <= 0) continue;
        if (excludeDiscs.includes(disc)) continue;

        const dx = x - disc.mesh.position.x;
        const dz = z - disc.mesh.position.z;
        const distanceSq = dx * dx + dz * dz;
        const minDistance = discRadius + disc.radius;
        if (distanceSq < (minDistance * minDistance)) {
          return false;
        }
      }
    }

    return true;
  }

  initDiscs(playerStats = null) {
    if (!playerStats) {
      this.barbarianController.rageCharges = 0; // Reset Rage charges for a new game
      this.npcsKilledForRageCharge.clear(); // Reset set of NPCs that granted a charge
    }

    // Disc creation and placement is handled by DiscSpawner
    const spawned = this.discSpawner.spawn(playerStats);
    this.discs.push(...spawned);

    // Immediately mark any player discs that carried over as dead (hitPoints=0 from playerStats)
    // so they appear in the Raise Dead target list without waiting for the animation loop.
    this.updateAllDiscDeadStates();

    // Initialize all spotlight intensities to inactive state
    this.discs.forEach(disc => {
      disc.setSpotlightIntensity(false);
    });

    // Set turn to first alive player disc or fallback alive disc
    // Orbs and AnimatedDead should not get a turn in the regular sequence
    this.currentTurnIndex = this.discs.findIndex(
      (d) => d.type === "player" && d.kind !== "Orb" && d.kind !== "HealingOrb" && d.kind !== "AnimatedDead" && d.hitPoints > 0 && !d.dead,
    );
    if (this.currentTurnIndex !== -1) {
      this.currentDisc = this.discs[this.currentTurnIndex];
      this.logCurrentTurn();
    } else {
      // fallback to any alive disc if no player disc found
      for (let i = 0; i < this.discs.length; i++) {
        if (this.discs[i].hitPoints > 0 && !this.discs[i].dead) {
          this.currentTurnIndex = i;
          this.currentDisc = this.discs[i];
          this.logCurrentTurn();
          break;
        }
      }
  }
  this.barbarianController.updateRageButtonVisibility();
  this.barbarianController.updateEndTurnButtonVisibility();
  this.wizardController.updateActionButtons();
  this.wizardController.updateEndTurnButtonVisibility();
  this.necromancerController.updateActionButtons();
  this.necromancerController.updateEndTurnButtonVisibility();

  // Show beam for the first player whose turn it is (delayed 2s to let the scene settle)
  if (this.currentDisc && this.currentDisc.type === 'player') {
    const discAtStart = this.currentDisc;
    setTimeout(() => {
      if (this.currentDisc === discAtStart) {
        this._spawnTurnStartBeam(discAtStart);
        this._spawnTurnStartRings(discAtStart);
        if (this.soundManager) this.soundManager.playBuzz(discAtStart.mesh.position.clone());
      }
    }, 1000);
  }
}

  handlePointerHover(event) {
    this.necromancerController.handlePointerHover(event);

    // Highlight the door frame when the round is won and the door is open
    if (this.level && this.level.doorIsOpen && this.level.doorFrameMeshes.length) {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const hits = this.raycaster.intersectObjects(this.level.doorFrameMeshes, false);
      const isHovered = hits.length > 0;
      this.level.setDoorHovered(isHovered);
      this.renderer.domElement.style.cursor = isHovered ? 'pointer' : '';
    } else if (this.level) {
      this.level.setDoorHovered(false);
    }
  }

  handlePointerDownInteraction(event, initialPointerDownPos) {
    if (this.gameOverState.active) {
      return;
    }
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // If the round is won and the door is open, clicking anywhere on the doorway loads the next room
    if (this.roundWon && this.level && this.level.doorIsOpen && this.level.doorFrameMeshes.length) {
      const hits = this.raycaster.intersectObjects(this.level.doorFrameMeshes, false);
      if (hits.length > 0) {
        this.startNextLevel(this.currentDisc);
        return;
      }
    }

    this.pointerDisc = null;

    for (const disc of this.discs) {
      const intersects = this.raycaster.intersectObject(disc.mesh, true); // true = recursive, needed for Group-based meshes
      if (intersects.length > 0) {
        this.pointerDisc = disc;
        break;
      }
    }

    // Get the disc whose actual turn it is
    const discForTurn = (this.currentTurnIndex !== -1 && this.discs.length > this.currentTurnIndex) ? this.discs[this.currentTurnIndex] : null;
    let allowAiming = false;
    let discToControl = null; // This will be set to the disc that can be aimed/controlled

    if (discForTurn && discForTurn.type === 'player' && !discForTurn.dead) {
        // It's a player's turn and the player character is alive
        if (discForTurn.kind === 'Wizard') {
            // Wizard's turn
            if (this.pointerDisc && (this.pointerDisc.kind === 'Orb' || this.pointerDisc.kind === 'HealingOrb') && this.wizardController.orbs.includes(this.pointerDisc) && !this.pointerDisc.dead) {
                // Clicked on a valid, owned orb
                discToControl = this.pointerDisc; // Orb becomes the controlled disc
                allowAiming = true;
            } else if (this.pointerDisc === discForTurn) { // Clicked on the Wizard
                discToControl = discForTurn; // Wizard is the controlled disc
                if (this.wizardController.hasMovedThisTurn) {
                    allowAiming = false; // Wizard has already moved, cannot aim/throw Wizard again
                } else {
                    allowAiming = true; // Wizard has not moved yet, allow aiming/throwing Wizard
                }
            } else {
                // Clicked elsewhere or on an invalid target on Wizard's turn.
                // Wizard remains the active context for the turn, but no aiming unless Wizard/Orb is clicked.
                discToControl = discForTurn;
                allowAiming = false;
            }
        } else if (discForTurn.kind === 'Necromancer') {
            // Necromancer's turn
            if (this.pointerDisc && this.pointerDisc.kind === 'AnimatedDead' &&
                this.necromancerController.animatedDeadDiscs.includes(this.pointerDisc) && !this.pointerDisc.dead &&
                !this.necromancerController.movedThisTurn.has(this.pointerDisc)) {
                // Clicked on a valid, owned animated dead disc that hasn't moved yet this turn
                discToControl = this.pointerDisc;
                allowAiming = true;
            } else if (this.pointerDisc === discForTurn) {
                // Clicked on the Necromancer
                discToControl = discForTurn;
                if (this.necromancerController.hasMovedThisTurn) {
                    allowAiming = false; // Necromancer already moved this turn
                } else {
                    allowAiming = true;
                }
            } else {
                // Clicked elsewhere on Necromancer's turn
                discToControl = discForTurn;
                allowAiming = false;
            }
        } else {
            // Other player character's turn (e.g., Barbarian)
            if (this.pointerDisc === discForTurn) {
                discToControl = discForTurn; // This character is the controlled disc
                if (discForTurn.hasThrown) { // Crucial check: Has this disc already been thrown this turn?
                    allowAiming = false;
                } else {
                    allowAiming = true;
                }
            } else {
                // Clicked elsewhere. Character remains active context, but no aiming.
                discToControl = discForTurn;
                allowAiming = false;
            }
        }
    } else {
        // Not a player's turn (e.g., AI's turn), or game state doesn't allow player interaction.
        // Or the disc whose turn it is, is dead.
        discToControl = discForTurn; // Keep context if available (e.g., for AI disc spotlight)
        allowAiming = false;
    }

    // Set the globally current disc for interaction purposes
    this.currentDisc = discToControl;

    if (allowAiming && this.currentDisc && this.currentDisc.mesh) { // Ensure currentDisc and its mesh exist
        this.controlsEnabled = false;
        this.controls.enabled = false;
        if (this.uiManager) {
            this.uiManager.updateThrowInfo("Magnitude: 0 Angle: 0°", true);
        }
        // Initialize throw direction line previous positions to the current disc's position
        if (this.throwDirectionLine) {
            this._prevLineStart = new THREE.Vector3(
                this.currentDisc.mesh.position.x,
                this.currentDisc.mesh.position.y + this.currentDisc.height / 2,
                this.currentDisc.mesh.position.z,
            );
            this._prevLineEnd = this._prevLineStart.clone();
        }
    } else {
        this.controlsEnabled = true;
        this.controls.enabled = true;
        if (this.uiManager) {
            this.uiManager.updateThrowInfo("", false);
        }
    }
    this._updateSpotlights(); // Update spotlights based on the new this.currentDisc or context
    // this.isPointerDown is now managed by InputHandler
  }

  handlePointerMoveInteraction(event, initialPointerDownPos) { // Renamed and signature changed
    if (this.gameOverState.active || this.controlsEnabled || !this.currentDisc) {
      if (this.throwDirectionLine) this.throwDirectionLine.visible = false;
      if (this.uiManager) this.uiManager.updateThrowInfo("", false);
      return;
    }
    // The check for isPointerDown is now handled by InputHandler before calling this method.
    // this.pointerDownPos is replaced by initialPointerDownPos passed as an argument.
    const deltaX = event.clientX - initialPointerDownPos.x; // Use passed initialPointerDownPos
    const deltaY = event.clientY - initialPointerDownPos.y; // Use passed initialPointerDownPos
    const dragLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (dragLength > 0) {
      const angleRadians = Math.atan2(-deltaY, deltaX);
      let angleDegrees = angleRadians * (180 / Math.PI);
      if (angleDegrees < 0) angleDegrees += 360;
      if (this.uiManager) {
        this.uiManager.updateThrowInfo(`Magnitude: ${dragLength.toFixed(1)} Angle: ${angleDegrees.toFixed(1)}°`, true);
      }

      if (!this.controlsEnabled && this.currentDisc && this.currentDisc.mesh && this.throwDirectionLine) {
        const normX = deltaX / dragLength;
        const normY = deltaY / dragLength;

        const forward = new THREE.Vector3();
        this.camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();

        const up = new THREE.Vector3(0, 1, 0);
        const cameraRight = new THREE.Vector3();
        cameraRight.crossVectors(forward, up).normalize();

        let direction = new THREE.Vector3();
        direction.add(cameraRight.multiplyScalar(normX));
        direction.add(forward.multiplyScalar(-normY));
        direction.normalize();
        direction.negate();

        const maxLineLength = 10;
        const lineLength = Math.min(dragLength / 10, 1) * maxLineLength;

        const startPos = this.currentDisc.mesh.position.clone();
        const endPos = startPos
          .clone()
          .add(direction.multiplyScalar(lineLength));

        const positions = this.throwDirectionLine.geometry.attributes.position;

        // Initialize previous positions if not set
        if (!this._prevLineStart) {
          this._prevLineStart = new THREE.Vector3(
            startPos.x,
            startPos.y + this.currentDisc.height / 2,
            startPos.z,
          );
        }
        if (!this._prevLineEnd) {
          this._prevLineEnd = new THREE.Vector3(
            endPos.x,
            endPos.y + this.currentDisc.height / 2,
            endPos.z,
          );
        }

        // Lerp previous positions for smooth motion
        this._prevLineStart.lerp(
          new THREE.Vector3(
            startPos.x,
            startPos.y + this.currentDisc.height / 2,
            startPos.z,
          ),
          0.2,
        );
        this._prevLineEnd.lerp(
          new THREE.Vector3(
            endPos.x,
            endPos.y + this.currentDisc.height / 2,
            endPos.z,
          ),
          0.2,
        );

        positions.setXYZ(
          0,
          this._prevLineStart.x,
          this._prevLineStart.y,
          this._prevLineStart.z,
        );
        positions.setXYZ(
          1,
          this._prevLineEnd.x,
          this._prevLineEnd.y,
          this._prevLineEnd.z,
        );
        positions.needsUpdate = true;

        this.throwDirectionLine.visible = true;
      }
    } else {
      if (this.uiManager) {
        this.uiManager.updateThrowInfo("Magnitude: 0 Angle: 0°", true);
      }
      if (this.throwDirectionLine) {
        this.throwDirectionLine.visible = false;
      }
    }
  }

  handlePointerUpInteraction(event, initialPointerDownPos) { // Renamed and signature changed
    if (this.gameOverState.active) {
      return;
    }
    // this.isPointerDown checks and setting are now handled by InputHandler

    const deltaX = event.clientX - initialPointerDownPos.x;
    const deltaY = event.clientY - initialPointerDownPos.y;
    const dragLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const clickThreshold = 2; // Pixels to differentiate a click from a drag

    const clickedDisc = this.pointerDisc; // Disc under cursor at pointerdown, set in handlePointerDownInteraction

    if (dragLength <= clickThreshold) { // It's a click/tap
      // Handle Animate Dead disc-selection mode — player clicks a corpse in the scene
      if (this.necromancerController.selectingTarget) {
        this.necromancerController.handleTargetClick(clickedDisc);
        this.necromancerController.cancelTargetSelection();
        if (this.throwDirectionLine) this.throwDirectionLine.visible = false;
        this.controls.enabled = true;
        this.controlsEnabled = true;
        this.currentDisc = null;
        return;
      }

      if (clickedDisc) {
        // Clicked on a disc
        if (this.discInfoPopupSelectedDisc === clickedDisc) {
          this._hideDiscInfoPopup();
        } else {
          this._showDiscInfoPopup(clickedDisc);
        }
        // Common cleanup for click interaction on a disc
        if (this.uiManager) this.uiManager.updateThrowInfo("", false);
        if (this.throwDirectionLine) this.throwDirectionLine.visible = false;
        this.controls.enabled = true; // Ensure OrbitControls are re-enabled
        this.controlsEnabled = true; // Reset our custom state flag (camera controls active)

        // If an aiming process was started for this.currentDisc (which might be clickedDisc or another disc like Wizard aiming an Orb)
        // we should nullify currentDisc to prevent throw, as this click overrides the throw.
        this.currentDisc = null;
        // this.pointerDisc is the disc that was clicked. We've handled it.
        // It will be reset on the next pointer down.
        return; // Click handled, do not proceed to throw logic
      } else {
        // Clicked on empty space (not on a disc)
        if (this.discInfoPopupSelectedDisc && this.discInfoPopupElement) {
            let targetElement = event.target;
            let isClickInsidePopup = false;
            while (targetElement != null) {
                if (targetElement === this.discInfoPopupElement) {
                    isClickInsidePopup = true;
                    break;
                }
                targetElement = targetElement.parentElement;
            }
            if (!isClickInsidePopup) {
                 this._hideDiscInfoPopup();
            }
        }
      }
    } else {
      // This block executes if dragLength > clickThreshold
    }

    // Standard cleanup for pointer up (hide line, clear throw info)
    // This happens whether or not a throw is processed, or if it's a drag.
    if (this.uiManager) {
      this.uiManager.updateThrowInfo("", false);
    }
    if (this.throwDirectionLine) {
      this.throwDirectionLine.visible = false;
    }

    // If this.controlsEnabled is true (our custom state flag), it means
    // handlePointerDownInteraction determined that aiming should NOT be allowed
    // (e.g., clicked on the wrong disc or aiming is not appropriate for the current context).
    // In this case, we ensure camera controls (OrbitControls) are enabled and then return,
    // skipping any throw logic.
    if (this.controlsEnabled || !this.currentDisc) {
        this.controls.enabled = true;
        this.controlsEnabled = true;
        if (this.throwDirectionLine) this.throwDirectionLine.visible = false;
        if (this.uiManager) this.uiManager.updateThrowInfo("", false);
        return;
    }

    // If we reach here, it means this.controlsEnabled was false, indicating that
    // an aiming sequence was initiated in handlePointerDownInteraction.
    // We now re-enable camera controls (OrbitControls) and reset our custom
    // controlsEnabled state flag back to true (indicating camera controls are active).
    this.controls.enabled = true;
    this.controlsEnabled = true; // Reset our custom state flag, camera controls are now primary.

    if (this.waitingForDiscToStop) {
      return;
    }

    // Perform throw action if a currentDisc is set and aiming was presumably active
    // this.currentDisc is set by handlePointerDownInteraction based on game rules
    if (this.currentDisc) {
      if (this.currentDisc.dead) {
        return;
      }

      // Prevent re-throwing a disc that's already been thrown and is still moving
      if (this.currentDisc.hasThrown && this.currentDisc.moving) {
        return;
      }

      // Only allow throwing player-type discs (Wizard, Barbarian, Orb)
      if (this.currentDisc.type !== "player") {
        return;
      }

      const deltaX = event.clientX - initialPointerDownPos.x;
      const deltaY = event.clientY - initialPointerDownPos.y;
      const screenDragLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY); // Renamed for clarity

      const cameraDistance = this.controls.getDistance();
      const effectiveWorldDrag = screenDragLength * cameraDistance;

      const WORLD_DRAG_THRESHOLD = 10; // Tune this value
      const WORLD_THROW_SENSITIVITY = .004; // Tune this value
      // const dragThreshold = 3; // Old pixel-based threshold, now replaced by WORLD_DRAG_THRESHOLD
      const minSpeed = 0.05; // This might still be relevant for disc stopping

      if (effectiveWorldDrag > WORLD_DRAG_THRESHOLD) {


        const throwForceMagnitude = effectiveWorldDrag * WORLD_THROW_SENSITIVITY;
        const normX = deltaX / screenDragLength;
        const normY = deltaY / screenDragLength;

        const forward = new THREE.Vector3();
        this.camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();

        const up = new THREE.Vector3(0, 1, 0);
        const cameraRight = new THREE.Vector3();
        cameraRight.crossVectors(forward, up).normalize();

        let direction = new THREE.Vector3();
        direction.add(cameraRight.multiplyScalar(normX));
        direction.add(forward.multiplyScalar(-normY));
        direction.normalize();
        direction.negate();

        const directionX = direction.x;
        const directionZ = direction.z;

        let actualThrowPowerMultiplier = this.currentDisc.throwPowerMultiplier;

        if (this.currentDisc.rageIsActiveForNextThrow) {
          actualThrowPowerMultiplier *= 2.5;
          this.currentDisc.rageIsActiveForNextThrow = false;
          // Orbs should not get rebound damage, even if a rage-like effect was active
          if (this.currentDisc.kind !== 'Orb') {
            this.currentDisc.canDoReboundDamage = true;
            this.currentDisc.rageWasUsedThisThrow = true; // Only set if rebound damage was possible
          } else {
            this.currentDisc.canDoReboundDamage = false;
            this.currentDisc.rageWasUsedThisThrow = false; // Orbs don't use this path for rebound reset
          }
          this.barbarianController.updateRageButtonVisibility();
        }

        const maxSpeed = 1;
        // const normLength = Math.min(adjustedLength / 10, 1); // Old logic, adjustedLength is not defined in this scope with new logic
        // const scaledLength = normLength * normLength; // Old logic
        let speed = (throwForceMagnitude * actualThrowPowerMultiplier) / this.currentDisc.mass;
        speed = Math.min(speed, maxSpeed); // Apply maxSpeed cap (maxSpeed is defined above as 1 by default)
        if (speed < minSpeed) speed = minSpeed;

        if (this.currentDisc.kind === 'Barbarian') {
          this.barbarianController.uniqueNPCHitsThisThrow.clear();
        }

        this.currentDisc.velocity.set(
          directionX * speed,
          0,
          directionZ * speed,
        );
        this.currentDisc.moving = true;
        this.currentDisc.hasThrown = true;
        this.currentDisc.resetDamageState();
        this.thrownDisc = this.currentDisc;
        this.playerDamagedNPCsThisThrow.clear();
        this.waitingForDiscToStop = true;
      }
    }
  }

  setPanningState(key, isPressed) {
    this.cameraController.setPanningState(key, isPressed);
  }

  cancelAiming() {
    // Called by InputHandler when Escape is pressed during a drag/aim operation.
    // InputHandler itself will set its internal isPointerDown to false.
    // GameController needs to reset its aiming-specific state.
    this.necromancerController.cancelTargetSelection();
    this.pointerDisc = null;
    this.currentDisc = null; // Reset currentDisc so pointerup doesn't trigger a throw
    if (this.controls) {
      this.controls.enabled = true; // Re-enable orbit controls
    }
    if (this.throwDirectionLine) {
      this.throwDirectionLine.visible = false; // Hide the aiming line
    }
    if (this.uiManager) {
      this.uiManager.updateThrowInfo("", false); // Clear the throw info text
    }
    // Ensure controlsEnabled reflects that aiming is cancelled.
    this.controlsEnabled = true;
  }

  onWindowResize() {
    this.cameraController.onWindowResize();

    if (this.level) {
      this.discs.forEach((disc) => {
        disc.mesh.position.x = this.clamp(
          disc.mesh.position.x,
          -this.level.fieldWidth / 2 + disc.radius,
          this.level.fieldWidth / 2 - disc.radius,
        );
        disc.mesh.position.z = this.clamp(
          disc.mesh.position.z,
          -this.level.fieldDepth / 2 + disc.radius,
          this.level.fieldDepth / 2 - disc.radius,
        );
      });
    }
  }

clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// --- Game Over UI is now handled by UIManager ---

// --- Game Over Logic ---
// Ensure all dead discs have their visual state updated correctly
  updateAllDiscDeadStates() {
    if (!this.discs || this.discs.length === 0) {
      return;
    }
    this.discs.forEach(disc => {
      if (disc.hitPoints <= 0 && !disc.dead) {
        disc.die();
      }
    });
  }

  checkGameOverConditions() {
    // If game is already over, or no discs, no need to check
    if (this.gameOverState.active || !this.discs || this.discs.length === 0) {
      return this.gameOverState.active;
    }

    // Ensure all disc dead states are up-to-date before checking
    this.updateAllDiscDeadStates();

    let alivePlayerDiscs = 0;
    let aliveNpcDiscs = 0;
    let playerDiscsExist = false;
    let npcDiscsExist = false;

    this.discs.forEach(disc => {
      if (disc.type === "player" && disc.kind !== "Orb" && disc.kind !== "HealingOrb" && disc.kind !== "AnimatedDead") {
        playerDiscsExist = true;
        if (!disc.dead) {
          alivePlayerDiscs++;
        }
      } else if (disc.type === "NPC") {
        npcDiscsExist = true;
        // Animated dead discs under Necromancer control don't count as alive NPCs
        if (!disc.dead && !disc.isAnimatedDead) {
          aliveNpcDiscs++;
        }
      }
    });

    // Player loses if all their discs are dead (and player discs actually existed)
    if (playerDiscsExist && alivePlayerDiscs === 0) {
      this.triggerGameOver(false); // Player loses
      return true;
    }

    // Round ends if all NPC discs are dead (and NPC discs actually existed)
    // And player must have some discs alive.
    if (npcDiscsExist && aliveNpcDiscs === 0 && alivePlayerDiscs > 0) {
      if (!this.roundWon) {
        this.roundWon = true;

        // Wizard earns 2 mana for clearing a room
        const wizard = this.wizardController.getDisc();
        if (wizard && !wizard.dead) {
            this.wizardController.mana += 2;
        }

        // Necromancer earns 2 mana for clearing a room
        const necromancer = this.necromancerController.getDisc();
        if (necromancer && !necromancer.dead) {
            this.necromancerController.mana += 2;
            if (this.uiManager) this.uiManager.updateCurrentTurnDiscName(this.currentDisc);
        }

        if (this.level) {
          this.level.openDoor();
        }
      }
    }

    return false; // Game is not over
  }

  triggerGameOver(playerWon) {
    if (this.gameOverState.active) {
      return; // Game is already over, do nothing
    }
    this.gameOverState.active = true;
    this.gameOverState.playerWon = playerWon;

    if (this.uiManager) {
      this.uiManager.showGameOver(playerWon);
    }
    // Further actions like stopping game loop, disabling controls, etc.,
    // will be handled by checks in other methods (e.g., advanceTurn, onPointerDown)
  }

  /** Returns the room shape for a given 1-based level number. */
  _shapeForLevel(n) {
    // Level sequence cycles: rectangular → circular → bullseye → donut → repeat.
    const sequence = ['rect', 'circle', 'bullseye', 'donut'];
    return sequence[(n - 1) % sequence.length];
  }

  async startNextLevel(triggeringDisc = null) {
    // 1. Save critical state before clearing
    const playerStats = this.discs
      .filter(d => d.type === "player" && d.kind !== "Orb")
      .map(d => ({
        kind: d.kind,
        hitPoints: d.hitPoints,
        maxHitPoints: d.maxHitPoints
      }));

    const previousActingIndex = this.currentTurnIndex;

    // 2. Reset game state for new level
    this.roundWon = false;
    this.gameOverState.active = false;
    this.gameOverState.playerWon = false;
    this.npcsKilledForRageCharge.clear();

    // Cleanup existing lava pools
    if (this.lavaPools && this.lavaPools.length > 0) {
      this.lavaPools.forEach(pool => {
        if (pool.getMesh()) {
          this.scene.remove(pool.getMesh());
        }
        pool.dispose();
      });
    }
    this.lavaPools = [];
    this._clearTurnStartBeams();
    this._clearTurnStartRings();

    // Unload current level
    if (this.level) {
      this.level.unload();
    }

    // Clear existing discs
    if (this.discs) {
      this.discs.forEach(disc => disc.dispose());
    }
    this.discs = [];
    this.wizardController.onLevelStart();
    this.necromancerController.onLevelStart();
    this.barbarianController.onLevelStart();

    // Reload level (generates new room/obstacles)
    if (this.level) {
      this.currentLevelNumber++;
      this.level.nextShape = this._shapeForLevel(this.currentLevelNumber);
      this.level.load();
    }

    // 3. Re-initialize world (lava first so disc spawning can avoid pools)
    this.lavaManager.generate();
    this.initDiscs(playerStats);

    // 4. Reset turn-specific state
    this.wizardController.onTurnEnd();
    this.necromancerController.onTurnEnd();
    this.waitingForDiscToStop = false;
    this.thrownDisc = null;
    this.playerDamagedNPCsThisThrow.clear();

    // 5. Determine who starts the next level
    let foundNext = false;

    // If a specific player disc triggered the portal, they start the next level
    if (triggeringDisc) {
        let targetKind = triggeringDisc.kind;
        // Healing orbs count as the Wizard's move
        if (targetKind === 'HealingOrb') targetKind = 'Wizard';

        const matchingDiscIndex = this.discs.findIndex(d =>
            d.kind === targetKind && d.type === 'player' && !d.dead
        );
        if (matchingDiscIndex !== -1) {
            this.currentTurnIndex = matchingDiscIndex;
            foundNext = true;
        }
    }

    if (!foundNext) {
        // Fallback: advance turn to the next player
        // We use previousActingIndex because initDiscs resets currentTurnIndex
        let nextIndex = (previousActingIndex + 1) % this.discs.length;
        for (let i = 0; i < this.discs.length; i++) {
            const idx = (nextIndex + i) % this.discs.length;
            const d = this.discs[idx];
            if (d && d.type === 'player' && d.kind !== 'Orb' && d.kind !== 'HealingOrb' && d.kind !== 'AnimatedDead' && !d.dead) {
                this.currentTurnIndex = idx;
                foundNext = true;
                break;
            }
        }
    }

    if (!foundNext) {
        const firstAlive = this.discs.findIndex(d => d.type === 'player' && d.kind !== 'Orb' && d.kind !== 'HealingOrb' && d.kind !== 'AnimatedDead' && !d.dead);
        this.currentTurnIndex = firstAlive !== -1 ? firstAlive : 0;
    }

    // Ensure all player discs are ready for the new level
    this.discs.forEach(d => {
      if (d.type === 'player') d.hasThrown = false;
    });

    this.currentDisc = this.discs[this.currentTurnIndex];
    this._updateSpotlights();
    this.logCurrentTurn();

    this.recenterCamera();

    if (this.uiManager) {
      this.uiManager.hideGameOver();
      this.updateDiscNames(); // Refresh UI list
      this.uiManager.updateCurrentTurnDiscName(this.currentDisc); // Refresh current turn display
      this.barbarianController.updateRageButtonVisibility();
      this.barbarianController.updateEndTurnButtonVisibility();
      this.wizardController.updateActionButtons();
      this.wizardController.updateEndTurnButtonVisibility();
      this.necromancerController.updateActionButtons();
      this.necromancerController.updateEndTurnButtonVisibility();
      this.necromancerController.cancelTargetSelection();
      this.necromancerController.hideTargetSelectionPopup();
    }
  }

  async restartGame() {
    this.cancelAiming(); // Reset any ongoing aiming/interaction states
    if (this.inputHandler) {
      this.inputHandler.reset();
    }

    // 1. Dispose of old discs
    if (this.discs && this.discs.length > 0) {
      this.discs.forEach(disc => disc.dispose());
    }
    this.discs = [];
    this.wizardController.onGameRestart();
    this.necromancerController.onGameRestart();
    this.barbarianController.onGameRestart();

    // Cleanup existing lava pools
    if (this.lavaPools && this.lavaPools.length > 0) {
      this.lavaPools.forEach(pool => {
        if (pool.getMesh()) {
          this.scene.remove(pool.getMesh());
        }
        pool.dispose();
      });
    }
    this.lavaPools = [];
    this._clearTurnStartBeams();
    this._clearTurnStartRings();

    // 2. Unload the current level
    if (this.level) {
      this.level.unload();
    }

    // 3. Reload the level
    // Assuming this.level is already instantiated, if not, it might need new Level(this.scene)
    if (this.level) {
      this.currentLevelNumber = 1;
      this.level.nextShape = this._shapeForLevel(this.currentLevelNumber);
      this.level.load();
    } else {
      return; // Cannot proceed without a level
    }

    // 4. Re-initialize world (lava first so disc spawning can avoid pools)
    this.lavaManager.generate();
    this.initDiscs(); // This will populate this.discs with new instances

    // 5. Reset core game state variables
    this.currentTurnIndex = 0;
    this._currentDisc = null; // Will be set by this.currentDisc setter
    this.waitingForDiscToStop = false;
    this.playerDamagedNPCsThisThrow.clear();
    this.npcsKilledForRageCharge.clear();
    this.gameOverState.active = false; // Reset game over state
    this.roundWon = false;

    this.panningKeys = { up: false, down: false, left: false, right: false }; // Reset panning state

    // 6. Set the current disc for the new game
    if (this.discs.length > 0) {
      // Find the first player disc to start, or default to first disc if no player discs.
      let startingDisc = this.discs.find(disc => disc.type === 'player');
      if (!startingDisc) {
        startingDisc = this.discs[0]; // Fallback to the first disc overall
      }
      this.currentTurnIndex = this.discs.indexOf(startingDisc);
      if(this.currentTurnIndex === -1) this.currentTurnIndex = 0; // Safety for fallback

      this.currentDisc = this.discs[this.currentTurnIndex]; // This uses the setter
      this.discs[this.currentTurnIndex].hasThrown = false; // Ensure the first disc can be thrown


      // If the first disc is an NPC, trigger its throw
      if (this.currentDisc.type === "NPC") {
        await this.aiThrow(this.currentDisc);
      }
    } else {
    }

    // 7. Update UI elements
    this.updateDiscNames();
    this._hideDiscInfoPopup();
    this.barbarianController.updateRageButtonVisibility();
    this.barbarianController.updateEndTurnButtonVisibility();
    this.wizardController.updateActionButtons();
    this.wizardController.updateEndTurnButtonVisibility();
    this.necromancerController.updateActionButtons();
    this.necromancerController.updateEndTurnButtonVisibility();
    this.necromancerController.cancelTargetSelection();
    this.necromancerController.hideTargetSelectionPopup();


    // 8. Reset Camera Position and Zoom, and ensure camera controls are enabled
    this.recenterCamera();
    if (this.controls) {
      this.controls.enabled = true;
    }
    this.controlsEnabled = true;
    this._prevLineStart = null;
    this._prevLineEnd = null;

  }

  async animate() {
    requestAnimationFrame(() => this.animate());

    if (this.uiManager) {
      this.uiManager.updateFloatingTexts(this.camera);
    }

    // FPS calculation
    this.fpsFrameCount++;
    const now = performance.now();
    const deltaTime = (now - this.fpsLastTime) / 1000;
    this.fpsLastTime = now;

    const elapsedSinceLastUpdate = now - this.fpsLastUpdateTime;

    if (elapsedSinceLastUpdate >= this.fpsUpdateInterval) {
      const fps = Math.round((this.fpsFrameCount * 1000) / elapsedSinceLastUpdate);
      if (this.uiManager) {
        this.uiManager.updateFPS(fps);
      }
      this.fpsFrameCount = 0;
      this.fpsLastUpdateTime = now;
    }

    // Camera panning, rotation, target clamping, and wall-fade
    this.cameraController.update(deltaTime, this.level);

    if (this.currentDisc) {
      // Reset current disc scale and position.y
      this.currentDisc.mesh.scale.set(1, 1, 1);
      this.currentDisc.mesh.position.y = this.currentDisc.basePositionY;



      // Update disc appearance for dead discs
      [...this.discs].forEach((disc) => {
        if (disc.dead) {
          // Handle both group and single mesh structures
          if (disc.mesh.isGroup) {
            disc.mesh.children.forEach(child => {
              if (child.material) {
                if (child.material.color) child.material.color.set(0x888888);
                child.material.opacity = 0.9;
                child.material.transparent = true;
              }
            });
          } else {
            disc.mesh.material.color.set(0x888888);
            disc.mesh.material.opacity = 0.9;
            disc.mesh.material.transparent = true;
          }
        } else {
          // Handle both group and single mesh structures
          if (disc.mesh.isGroup) {
            disc.mesh.children.forEach(child => {
              if (child.material) {
                // If this is an animated dead disc, ensure it keeps the Necromancer's color
                // and is never tinted by the active player highlight logic.
                if (disc.kind === 'AnimatedDead' && disc.initialColor !== undefined) {
                  const animColor = disc._animatedDeadColor !== undefined ? disc._animatedDeadColor : disc.initialColor;
                  // Textured top-face planes should stay white so the texture renders correctly.
                  child.material.color.set(child.material.map ? 0xffffff : animColor);
                } else if (child.material.color) {
                  child.material.color.set(child.material.color.getHex());
                }
                child.material.opacity = 0.9;
                child.material.transparent = true;
              }
            });
          } else {
            if (disc.kind === 'AnimatedDead' && disc.initialColor !== undefined) {
              const animColor = disc._animatedDeadColor !== undefined ? disc._animatedDeadColor : disc.initialColor;
              disc.mesh.material.color.set(animColor);
            } else {
              disc.mesh.material.color.set(disc.mesh.material.color.getHex());
            }
            disc.mesh.material.opacity = 0.9;
            disc.mesh.material.transparent = true;
          }
        }
      });
    }

    // Delegate per-frame character updates (orb following, radius blast rings, etc.)
    this.wizardController.update(deltaTime);

    // Animate descending turn-start beams and ring ripples
    this._updateTurnStartBeams(deltaTime);
    this._updateTurnStartRings(deltaTime);

    // Animated dead discs stay where they are — no Necromancer-follow behaviour

    // Per-disc movement, wall/obstacle collision, disc-to-disc collision + damage
    const physicsExited = await this.physics.update(deltaTime);
    if (physicsExited) return;


    // Update door animation (slab lift)
    if (this.level) this.level.update(deltaTime);

    // Update and animate lava pools
    if (this.lavaPools && this.lavaPools.length > 0) {
      this.lavaPools.forEach(pool => pool.update(deltaTime));
    }

    // Lava pool collision detection
    if (this.lavaPools && this.lavaPools.length > 0) {
      [...this.discs].forEach(disc => {

        // Rudimentary way to track if a disc is in lava for this frame.
        // Ideally, `isCurrentlyInLavaState` would be a property on the Disc class.
        if (typeof disc.isCurrentlyInLavaState === 'undefined') {
            disc.isCurrentlyInLavaState = false;
        }
        let foundInLavaThisFrame = false;

        for (const lavaPool of this.lavaPools) {
          if (lavaPool.isPointInside(disc.mesh.position.x, disc.mesh.position.z)) {
            foundInLavaThisFrame = true;
            if (!disc.isCurrentlyInLavaState) {
              // Disc just entered the lava
              console.log(`${disc.discName} fell into lava!`);
              disc.isCurrentlyInLavaState = true;



              // Apply lethal damage (or specific lava effect)
              // Assuming takeHit handles setting the disc to dead if HP <= 0
              // Orbs are immune to lava damage.
              if (disc.kind !== 'Orb') {
                disc.takeHit(1, null); // Damage on entry
              }

              // Reward player for lava kills
              if (disc.type === 'NPC' && disc.hitPoints <= 0 && !this.npcsKilledForRageCharge.has(disc.discName)) {
                  const actor = this.currentDisc;
                  if (actor && actor.type === 'player') {
                      if (actor.kind === 'Barbarian') {
                          if (this.barbarianController.rageCharges < this.barbarianController.maxRageChargesCap) {
                              this.barbarianController.rageCharges++;
                          }
                      } else if (actor.kind === 'Wizard' || actor.kind === 'Orb') {
                          this.wizardController.manaEarnedThisTurn++;
                      }
                      this.npcsKilledForRageCharge.add(disc.discName);
                      this.barbarianController.updateRageButtonVisibility();
                  }
              }


            }
            break; // No need to check other lava pools for this disc this frame
          }
      }

        if (!foundInLavaThisFrame && disc.isCurrentlyInLavaState) {
          // Disc was in lava but is no longer (e.g., if it somehow got out, though unlikely with current logic)
          disc.isCurrentlyInLavaState = false;
          // console.log(`${disc.discName} is no longer in lava.`);
        }
      });

      // After lava checks, update dead states and check game over conditions
      // This ensures immediate feedback if a disc dies in lava.
      this.updateAllDiscDeadStates();
      if (!this.gameOverState.active) {
        this.checkGameOverConditions();
      }
    }

    // Render the scene
    if (this.renderer) {
      this.renderer.render(this.scene, this.camera);
    }

    if (this.waitingForDiscToStop && this.thrownDisc) {
      const velocityLength = this.thrownDisc.velocity.length();
      // If the thrown disc was an orb and it's been consumed/destroyed, it might be removed from the discs array
      // and won't be processed by the movement loop, so it won't stop via friction.
      const isConsumedOrb = (this.thrownDisc.kind === 'Orb' || this.thrownDisc.kind === 'HealingOrb') && (this.thrownDisc.hitPoints <= 0 || this.thrownDisc.dead);
      // AnimatedDead is consumed (returned to dead state) when it stops or takes a fatal hit
      const isConsumedAnimatedDead = this.thrownDisc.kind === 'AnimatedDead' && (this.thrownDisc.hitPoints <= 0 || this.thrownDisc.dead);

      if ((velocityLength < 0.01 && !this.thrownDisc.moving) || isConsumedOrb || isConsumedAnimatedDead) {
        this.waitingForDiscToStop = false;
        const justMovedDisc = this.thrownDisc;
        this.thrownDisc = null; // Clear tracking

        if (justMovedDisc.kind === 'Wizard' || justMovedDisc.kind === 'Orb' || justMovedDisc.kind === 'HealingOrb') {
            await this.wizardController.onDiscStopped(justMovedDisc);
        } else if (justMovedDisc.kind === 'Necromancer' || justMovedDisc.kind === 'AnimatedDead') {
            await this.necromancerController.onDiscStopped(justMovedDisc);
        } else {
            // Barbarian, NPC, or any other disc
            await this._proceedToNextPlayerTurn();
        }
      }
    }
  }

  updateDiscNames() {
    if (this.uiManager) {
      this.uiManager.updateDiscNames(this.discs, this.currentDisc);
    }
  }

  async _proceedToNextPlayerTurn() {
    if (this.checkGameOverConditions()) {
      return;
    }
    this.wizardController.onTurnEnd();
    this.necromancerController.onTurnEnd(); // also calls cancelTargetSelection internally
    this.barbarianController.onTurnEnd();

    // If it was the Wizard's turn, or any player's turn, we find the next player.
    // If the next turn is the Wizard's, we transfer his pending orbs.
    // But we need to find who the next disc is first.

    // Deselect any currently selected disc (visually) before finding next turn.
    // The currentDisc might be an Orb, but the turn index points to the Wizard.
    // We need to reset the currentDisc to the actual disc whose turn it was.
    if (this.currentTurnIndex !== -1 && this.discs[this.currentTurnIndex]) {
        this.currentDisc = this.discs[this.currentTurnIndex];
        if (this.currentDisc.mesh.isGroup) {
            this.currentDisc.mesh.children.forEach(child => {
                if (child.material && child.material.emissive) {
                child.material.emissive.set(0x000000);
                }
            });
            } else if (this.currentDisc.mesh && this.currentDisc.mesh.material) {
            this.currentDisc.mesh.material.emissive.set(0x000000);
        }
    }


    // Find next disc index that is a player or NPC (not an Orb), has hitPoints > 0, and is not dead
    let nextAvailableDiscFound = false;
    let nextIndex = this.currentTurnIndex; // Start search from current turn index

    for (let i = 0; i < this.discs.length; i++) {
        nextIndex = (this.currentTurnIndex + 1 + i) % this.discs.length;
        const potentialDisc = this.discs[nextIndex];
        if (potentialDisc.type !== "player" && potentialDisc.type !== "NPC") continue; // Skip non-standard types
        if (potentialDisc.kind === 'Orb' || potentialDisc.kind === 'HealingOrb') continue; // Orbs do not get independent turns
        if (potentialDisc.kind === 'AnimatedDead') continue; // Animated dead do not get independent turns
        if (potentialDisc.hitPoints > 0 && !potentialDisc.dead) {
            nextAvailableDiscFound = true;
            break;
        }
    }

    if (!nextAvailableDiscFound) {
        // No valid disc found to advance to, might be game over or only orbs left.
        // This case should ideally be handled by checkGameOverConditions.
        // For safety, set currentDisc to null or a sensible default if no one can act.
        const firstAlivePlayer = this.discs.find(d => d.type === 'player' && d.kind !== 'Orb' && d.kind !== 'HealingOrb' && d.kind !== 'AnimatedDead' && !d.dead);
        if (firstAlivePlayer) {
            this.currentDisc = firstAlivePlayer;
            this.currentTurnIndex = this.discs.indexOf(firstAlivePlayer);
        } else {
            // No player can act, perhaps let an AI act if any are left, or it's truly game over.
            const firstAliveNPC = this.discs.find(d => d.type === 'NPC' && !d.dead);
            if (firstAliveNPC) {
                this.currentDisc = firstAliveNPC;
                this.currentTurnIndex = this.discs.indexOf(firstAliveNPC);
            } else {
                 // Truly no one can act.
                this.currentDisc = null;
                this.currentTurnIndex = -1;
                this.logCurrentTurn();
                this._updateSpotlights();
                this.barbarianController.updateRageButtonVisibility();
                this.wizardController.updateActionButtons();
                return; // Exit, game over should have caught this.
            }
        }
    }

    // Reset hasThrown for new currentDisc so it can be thrown
    this.discs[nextIndex].hasThrown = false;

    this.currentTurnIndex = nextIndex;
    this.currentDisc = this.discs[this.currentTurnIndex]; // Correctly assign the disc for the new turn

    // If it's now the Wizard's turn, transfer pending mana earned and grant +1 passive mana
    if (this.currentDisc && this.currentDisc.kind === 'Wizard' && !this.currentDisc.dead) {
        this.wizardController.applyEarnedMana();
    }

    // If it's now the Necromancer's turn, transfer pending mana earned
    if (this.currentDisc && this.currentDisc.kind === 'Necromancer' && !this.currentDisc.dead) {
        this.necromancerController.applyEarnedMana();
    }

    // Apply lava damage if the disc starts its turn in lava
    this._applyStartOfTurnLavaDamage(this.currentDisc);

    // If the disc died from start-of-turn lava damage and game is not over, immediately proceed to next turn.
    if (this.currentDisc && this.currentDisc.dead && !this.gameOverState.active) {
      // console.log(`${this.currentDisc.discName} died at start of turn from lava. Skipping turn.`);
      await this._proceedToNextPlayerTurn();
      return; // Important to stop further processing for the dead disc's turn
    }

    this.logCurrentTurn();
    this._updateSpotlights();
    this.barbarianController.updateRageButtonVisibility();
    this.barbarianController.updateEndTurnButtonVisibility();
    this.wizardController.updateActionButtons();
    this.wizardController.updateEndTurnButtonVisibility();
    this.necromancerController.updateActionButtons();
    this.necromancerController.updateEndTurnButtonVisibility();
    this._updateSpotlights(); // Ensure spotlights are updated after turn progression

    // Show descending beam + ring ripples for player turns
    if (this.currentDisc &&
        this.currentDisc.type === 'player' &&
        this.currentDisc.kind !== 'Orb' &&
        this.currentDisc.kind !== 'HealingOrb' &&
        this.currentDisc.kind !== 'AnimatedDead') {
      this._spawnTurnStartBeam(this.currentDisc);
      this._spawnTurnStartRings(this.currentDisc);
      if (this.soundManager) this.soundManager.playBuzz(this.currentDisc.mesh.position.clone());
    }

    // If the current disc is an NPC and is still alive, let it take its turn.
    // The currentDisc might be null if no actionable disc was found (e.g. game over handled earlier)
    // or might have died from start-of-turn lava damage (handled above).
    if (this.currentDisc && this.currentDisc.type === "NPC" && !this.currentDisc.dead) {
      await this.aiThrow(this.currentDisc);
    }
  }

  _spawnTurnStartBeam(disc) {
    if (!disc || !disc.mesh || !this.scene) return;
    const BEAM_H = 200;
    const geo = new THREE.CylinderGeometry(1.0, 1.0, BEAM_H, 16, 1, true);
    const mat = new THREE.MeshBasicMaterial({
      color: disc.initialColor,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    // Start with the bottom of the beam far above the scene; it descends into place.
    mesh.position.set(disc.mesh.position.x, BEAM_H * 1.5, disc.mesh.position.z);
    this.scene.add(mesh);
    this._turnStartBeams.push({ mesh, geo, mat, elapsed: 0 });
  }

  _updateTurnStartBeams(deltaTime) {
    const DESCEND_DUR = .25; // .55
    const FADE_DUR    = .33; // .65
    const BEAM_H      = 200;
    const MAX_OPACITY = 0.33;
    const START_Y     = BEAM_H * 1;  // bottom of beam starts above the scene
    const END_Y       = BEAM_H / 2;    // bottom of beam rests at y=0

    for (let i = this._turnStartBeams.length - 1; i >= 0; i--) {
      const b = this._turnStartBeams[i];
      b.elapsed += deltaTime;

      if (b.elapsed < DESCEND_DUR) {
        // Descent phase: slide the beam down smoothly
        const t = b.elapsed / DESCEND_DUR;
        b.mesh.position.y = START_Y + (END_Y - START_Y) * t;
        b.mat.opacity = MAX_OPACITY;
      } else {
        // Fade phase: beam is settled, opacity drops to 0
        b.mesh.position.y = END_Y;
        const t = (b.elapsed - DESCEND_DUR) / FADE_DUR;
        b.mat.opacity = MAX_OPACITY * Math.max(0, 1 - t);
      }

      if (b.elapsed >= DESCEND_DUR + FADE_DUR) {
        this.scene.remove(b.mesh);
        b.geo.dispose();
        b.mat.dispose();
        this._turnStartBeams.splice(i, 1);
      }
    }
  }

  _clearTurnStartBeams() {
    for (const b of this._turnStartBeams) {
      this.scene.remove(b.mesh);
      b.geo.dispose();
      b.mat.dispose();
    }
    this._turnStartBeams = [];
  }

  _spawnTurnStartRings(disc) {
    if (!disc || !disc.mesh || !this.scene) return;
    const RING_COUNT = 3;
    const STAGGER = 0.12; // seconds between each ring
    for (let i = 0; i < RING_COUNT; i++) {
      const geo = new THREE.RingGeometry(disc.radius * 1.1, disc.radius * 1.6, 48);
      const mat = new THREE.MeshBasicMaterial({
        color: disc.initialColor,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2; // lay flat on the arena floor
      mesh.position.set(disc.mesh.position.x, disc.mesh.position.y + 0.5, disc.mesh.position.z);
      this.scene.add(mesh);
      this._turnStartRings.push({ mesh, geo, mat, elapsed: 0, delay: i * STAGGER });
    }
  }

  _updateTurnStartRings(deltaTime) {
    const DURATION = 0.55;
    const INNER_START = 0; // relative to disc.radius — handled via scale
    const MAX_SCALE = 2.8;
    const MAX_OPACITY = 0.22;

    for (let i = this._turnStartRings.length - 1; i >= 0; i--) {
      const r = this._turnStartRings[i];
      r.elapsed += deltaTime;

      const t = Math.max(0, (r.elapsed - r.delay) / DURATION);
      if (t <= 0) continue; // still in pre-delay

      if (t >= 1) {
        this.scene.remove(r.mesh);
        r.geo.dispose();
        r.mat.dispose();
        this._turnStartRings.splice(i, 1);
        continue;
      }

      // Ease out: fast expansion early, slows near the end
      const eased = 1 - Math.pow(1 - t, 2);
      r.mesh.scale.setScalar(1 + eased * (MAX_SCALE - 1));
      // Fade in fast, then fade out
      r.mat.opacity = MAX_OPACITY * Math.sin(t * Math.PI);
    }
  }

  _clearTurnStartRings() {
    for (const r of this._turnStartRings) {
      this.scene.remove(r.mesh);
      r.geo.dispose();
      r.mat.dispose();
    }
    this._turnStartRings = [];
  }

  _showDiscInfoPopup(disc) {
    if (!this.discInfoPopupElement || !disc) {
        return;
    }

    this.discInfoNameElement.innerText = disc.discName;
    const currentHp = Number(disc.hitPoints) || 0;
    const maxHp = Number(disc.maxHitPoints) || 0;
    const filledHearts = currentHp > 0 ? '❤️'.repeat(currentHp) : '';
    const emptyHearts = maxHp > currentHp ? '🩶'.repeat(maxHp - currentHp) : '';
    this.discInfoHpElement.innerText = filledHearts + emptyHearts;
    this.discInfoDescriptionElement.innerText = disc.description || "No description available.";

    // Reset classes and apply new ones
    this.discInfoPopupElement.className = 'popup'; // Base class
    if (disc.type) this.discInfoPopupElement.classList.add(disc.type.toLowerCase());
    this.discInfoPopupElement.classList.add(disc.dead ? 'dead' : 'alive');

    this.discInfoPopupElement.classList.remove('element-hidden');
    this.discInfoPopupSelectedDisc = disc;
  }

  _hideDiscInfoPopup() {
    if (!this.discInfoPopupElement) return;
    this.discInfoPopupElement.classList.add('element-hidden');
    this.discInfoPopupSelectedDisc = null;
  }

  _updateSpotlights() {
    if (!this.discs || this.discs.length === 0) return;

    this.discs.forEach(disc => {
      // The disc is actively controlled if it's the currentDisc and not dead.
      const isActive = (disc === this.currentDisc && !disc.dead);
      disc.setSpotlightIntensity(isActive);
    });
  }

  async aiThrow(disc) {
    if (!disc || disc.dead) return;

    // Get alive player discs as targets (exclude AnimatedDead — they are player-controlled but not real targets)
    const alivePlayers = this.discs.filter(
      (d) => d.type === "player" && d.hitPoints > 0 && !d.dead,
    );
    if (alivePlayers.length === 0) return;

    // Select closest player disc as target
    let target = alivePlayers[0];
    let minDist = disc.mesh.position.distanceTo(target.mesh.position);
    for (let i = 1; i < alivePlayers.length; i++) {
      const dist = disc.mesh.position.distanceTo(alivePlayers[i].mesh.position);
      if (dist < minDist) {
        minDist = dist;
        target = alivePlayers[i];
      }
    }

    // Compute ideal direction towards target on horizontal plane
    const idealDir = target.mesh.position.clone().sub(disc.mesh.position);
    idealDir.y = 0;
    idealDir.normalize();

    // Function to check if a line segment intersects any wall
    const intersectsAnyWall = (start, end) => {
      const walls = this.level.getAllWalls();
      for (const wall of walls) {
        const box = new THREE.Box3().setFromObject(wall);

        // Calculate the closest point on box to the line segment
        const direction = end.clone().sub(start).normalize();
        const length = start.distanceTo(end);

        // Approximate by sampling points along the segment
        const steps = Math.ceil(length * 10); // sampling 10 points per unit length
        for (let i = 0; i <= steps; i++) {
          const point = start
            .clone()
            .add(direction.clone().multiplyScalar((length / steps) * i));
          if (box.containsPoint(point)) {
            return true;
          }
        }
      }
      return false;
    };

    // Calculate maximum allowed attempts to find a non-blocked throw direction
    const maxAttempts = 999;
    const maxFuzzDegrees = 15;
    const fuzzFactor = (100 - disc.skillLevel) / 100;

    // Clear Barbarian-specific unique NPC hit tracking before calculating throw trajectory
    if (disc.kind === 'Barbarian') {
      this.barbarianController.uniqueNPCHitsThisThrow.clear();
    }

    let bestDir = idealDir;
    let bestSpeed =
      Math.min(minDist / 10, 1) * (0.7 + 0.3 * (disc.skillLevel / 100));
    let fuzzAngleRad = 0;
    let foundClearPath = false;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      // Apply fuzz rotation around Y axis
      fuzzAngleRad =
        (Math.random() * 2 - 1) * fuzzFactor * maxFuzzDegrees * (Math.PI / 180);
      const quat = new THREE.Quaternion();
      quat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), fuzzAngleRad);
      const fuzzedDir = idealDir.clone().applyQuaternion(quat).normalize();

      // Evaluate end position for this direction with speed
      const endPos = disc.mesh.position
        .clone()
        .add(fuzzedDir.clone().multiplyScalar(bestSpeed * 10)); // scaled distance for testing collision

      // Check for collision with walls
      if (!intersectsAnyWall(disc.mesh.position.clone(), endPos)) {
        bestDir = fuzzedDir;
        foundClearPath = true;
        break;
      }
    }

    if (!foundClearPath) {
      // No clear path found, proceed with fuzzedDir anyway (first attempt)
      const quat = new THREE.Quaternion();
      quat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), fuzzAngleRad);
      bestDir = idealDir.clone().applyQuaternion(quat).normalize();
    }

    // Set velocity for the throw
    const finalSpeed = (bestSpeed * disc.throwPowerMultiplier) / disc.mass;
    disc.velocity.set(bestDir.x * finalSpeed, 0, bestDir.z * finalSpeed);
    disc.moving = true;
    disc.hasThrown = true;
    disc.resetDamageState();
    this.thrownDisc = disc; // Set thrownDisc for AI turns
    this.waitingForDiscToStop = true;
  }

  setCameraRotation(direction) {
    this.cameraController.setCameraRotation(direction);
  }

  _applyStartOfTurnLavaDamage(disc) {
    if (!disc || !this.lavaPools || this.lavaPools.length === 0 || disc.kind === 'Orb' || disc.kind === 'HealingOrb') {
      return; // No disc, or disc is dead, or no lava pools to check against, or it's an Orb (immune)
    }

    for (const lavaPool of this.lavaPools) {
      if (lavaPool.isPointInside(disc.mesh.position.x, disc.mesh.position.z)) {
        console.log(`${disc.discName} is starting turn in lava, takes 1 damage.`);
        disc.takeHit(1, null); // Apply 1 damage

        // Reward player for lava kills at start of turn
        if (disc.type === 'NPC' && disc.hitPoints <= 0 && !this.npcsKilledForRageCharge.has(disc.discName)) {
            const actor = this.currentDisc;
            if (actor && actor.type === 'player') {
                if (actor.kind === 'Barbarian') {
                    if (this.barbarianController.rageCharges < this.barbarianController.maxRageChargesCap) {
                        this.barbarianController.rageCharges++;
                    }
                } else if (actor.kind === 'Wizard' || actor.kind === 'Orb') {
                    this.wizardController.manaEarnedThisTurn++;
                }
                this.npcsKilledForRageCharge.add(disc.discName);
                this.barbarianController.updateRageButtonVisibility();
            }
        }

        // Update game state immediately after damage
        this.updateAllDiscDeadStates();
        if (!this.gameOverState.active) {
          this.checkGameOverConditions();
        }
        break; // Disc is in lava, no need to check other pools
      }
    }
  }

}

window.gameController = window.gameController || new GameController();
window.gameController.init();
