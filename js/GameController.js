import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Level from "./Level.js";
import Disc from "./Disc.js";
import UIManager from "./UIManager.js";
import InputHandler from './InputHandler.js';
import Skeleton from './Skeleton.js';
import Warden from './Warden.js';
import { BarbarianController } from './BarbarianController.js';
import { WizardController } from './WizardController.js';
import { NecromancerController } from './NecromancerController.js';

// Pre-converted hex color values for NPCs
import { LavaPool } from './LavaPool.js';

const NPC_HEX_COLORS = [
  0xE6194B, // (230, 25, 75)
  0x3CB44B, // (60, 180, 75)
  0xFFE119, // (255, 225, 25)
  0x0082C8, // (0, 130, 200)
  0xF58230, // (245, 130, 48)
  0x911EB4, // (145, 30, 180)
  0xF032E6, // (240, 50, 230)
  0xD2F53C, // (210, 245, 60)
  0xFABECE, // (250, 190, 212)
  0x008080, // (0, 128, 128)
  0xDCBEFF, // (220, 190, 255)
  0xAA6E28, // (170, 110, 40)
  0xFFFAC8, // (255, 250, 200)
  0x800000, // (128, 0, 0)
  0xAAFFC3, // (170, 255, 195)
  0x808000, // (128, 128, 0)
  0xFFD7B4, // (255, 215, 180)
  0x000080, // (0, 0, 128)
  0x808080  // (128, 128, 128)
];

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

    // Disc Info Popup
    this.discInfoPopupElement = null;
    this.discInfoNameElement = null;
    this.discInfoHpElement = null;
    this.discInfoDescriptionElement = null;
    this.discInfoPopupSelectedDisc = null;

    // Panning controls state
    this.panningKeys = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    this.panSpeed = 0.5;
    this.cameraRotationDirection = 0; // -1 for left, 1 for right, 0 for stop
    this.cameraRotationSpeed = Math.PI / 135; // Radians per frame. Adjust for desired speed.

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
    if (this.camera && this.controls) {
      this.camera.position.copy(this.initialCameraPosition);
      this.camera.zoom = this.initialCameraZoom;
      this.controls.target.copy(this.initialControlsTarget);
      this.camera.updateProjectionMatrix();
      this.controls.update();
    }
  }

  focusCameraOnDisc(discName) {
    const disc = this.discs.find(d => d.discName === discName);
    if (disc && this.controls) {
      this.controls.target.copy(disc.mesh.position);
    }
  }

  init() {
    // Initialize scene and rendering
    this.scene = new THREE.Scene();

    // Setup camera with 60 degree FOV, aspect ratio, near & far planes
    // AI AGENT: Do not modify the following parameters unless explicitly instructed.
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    // Position camera to get approx 60 degree downward tilt to encompass field
    const distance = 40; // DO NOT CHANGE THE DISTANCE GOD DAMNIT
    const angleRadians = Math.PI / 3; // 60 degrees
    const y = distance * Math.sin(angleRadians);
    const z = distance * Math.cos(angleRadians);
    this.camera.position.set(0, y, z);
    this.camera.lookAt(0, 0, 0);

    // Store initial camera settings for reset
    this.initialCameraPosition = this.camera.position.clone();
    this.initialCameraZoom = this.camera.zoom;
    this.initialControlsTarget = new THREE.Vector3(0, 0, 0);

    // Setup renderer and add canvas to DOM
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.localClippingEnabled = true; // Required for per-material clip planes (door slab)
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Camera-occlusion wall fading (reused each frame to avoid allocation)
    this._wallFadeRaycaster = new THREE.Raycaster();
    this._wallFadeDir = new THREE.Vector3();
    document.body.appendChild(this.renderer.domElement);

    // Setup orbit controls for camera interaction
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    // Set min and max zoom distances
    this.controls.minDistance = 6;
    this.controls.maxDistance = 45;
    // Prevent camera from going below ~15 degrees from horizontal
    this.controls.maxPolarAngle = (Math.PI / 2) - (25 * Math.PI / 180);
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
    this._generateLavaPools();

    // Initialize discs for gameplay
    this.initDiscs();

    // Initialize character controllers (buttons, listeners, initial visibility)
    this.barbarianController.init(this.actionButtonsContainer);
    this.wizardController.init(this.actionButtonsContainer);
    this.necromancerController.init(this.actionButtonsContainer);

    // Generate lava pools
    this._generateLavaPools();

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
    // *** DO NOT REMOVE THESE PARAMETER COMMENTS ***
    // Create discs with explicit parameters:
    // (radius, height, color, startX, startZ, scene, discName, type, kind, hitPoints, skillLevel, imagePath, canDoReboundDamage, throwPowerMultiplier, mass, rageIsActiveForNextThrow)

    const isHexLevel      = !!(this.level && this.level.hexRings);
    const isBullseyeLevel = !!(this.level && this.level.bullseyeRings);

    // Helper function to generate random positions for NPC discs
    const generateRandomPosition = (discRadius, existingPositions, minDistance = 4) => {
      const maxAttempts = 100;
      let attempts = 0;

      while (attempts < maxAttempts) {
        // Generate random position within field bounds, accounting for disc radius
        const x = (Math.random() - 0.5) * (this.level.fieldWidth - discRadius * 4);
        const z = (Math.random() - 0.5) * (this.level.fieldDepth - discRadius * 4);

        // Check if position conflicts with obstacles
        if (this.isPositionValid(x, z, discRadius)) {
          // Check distance from existing discs
          let validDistance = true;
          for (const pos of existingPositions) {
            const distance = Math.sqrt((x - pos.x) ** 2 + (z - pos.z) ** 2);
            if (distance < minDistance) {
              validDistance = false;
              break;
            }
          }

          if (validDistance) {
            return { x, z };
          }
        }

        attempts++;
      }

      // Fallback to original positions if random generation fails
      return null;
    };

    // For the hexagonal level, place NPCs on the elevated outer ring instead of
    // anywhere in the field.
    const generateOuterRingPosition = (discRadius, existingPositions, minDistance = 4) => {
      const { RC_in, RA_in } = this.level.hexRings;
      const innerR = RC_in + 1.5;   // clear of the inner ramp edge
      const outerR = RA_in - 2.5;   // clear of the outer walls
      const MAX_ATTEMPTS = 100;
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const angle = Math.random() * Math.PI * 2;
        const r = innerR + Math.random() * (outerR - innerR);
        const x = Math.sin(angle) * r;
        const z = Math.cos(angle) * r;
        if (!this.isPositionValid(x, z, discRadius)) continue;
        let tooClose = false;
        for (const pos of existingPositions) {
          if (Math.sqrt((x - pos.x) ** 2 + (z - pos.z) ** 2) < minDistance) {
            tooClose = true;
            break;
          }
        }
        if (!tooClose) return { x, z };
      }
      return null;
    };

    // Bullseye level: place NPCs on a specific concentric ring.
    // innerR / outerR are the ring boundaries; a small margin keeps them clear of
    // ring edges and column obstacles.
    const generateBullseyeRingPos = (innerR, outerR, discRadius, existingPositions, minDistance = 4) => {
      for (let attempt = 0; attempt < 100; attempt++) {
        const angle = Math.random() * Math.PI * 2;
        const r     = innerR + 1.5 + Math.random() * (outerR - innerR - 3);
        const x     = Math.sin(angle) * r;
        const z     = Math.cos(angle) * r;
        if (!this.isPositionValid(x, z, discRadius)) continue;
        let tooClose = false;
        for (const pos of existingPositions) {
          if (Math.sqrt((x - pos.x) ** 2 + (z - pos.z) ** 2) < minDistance) {
            tooClose = true;
            break;
          }
        }
        if (!tooClose) return { x, z };
      }
      return null;
    };

    // PC start positions.
    // Bullseye: near the inner-ring edge (r ≈ 6.5), 120° apart.
    // Hex: random positions anywhere on the upper ring (same pool as NPCs).
    const BULLSEYE_PC_R = 6.5;
    const hexPCPositions = [];
    const _hexPCPos = (radius) => {
      const pos = isHexLevel
        ? generateOuterRingPosition(radius, hexPCPositions, 5)
        : null;
      if (pos) hexPCPositions.push(pos);
      return pos;
    };

    const _barbPos  = isHexLevel ? _hexPCPos(1.25) : null;
    const _wizPos   = isHexLevel ? _hexPCPos(0.9)  : null;
    const _necroPos = isHexLevel ? _hexPCPos(1.0)  : null;

    const barbStartX  = isBullseyeLevel ? Math.sin(0)                * BULLSEYE_PC_R
                      : isHexLevel && _barbPos  ? _barbPos.x  : 0;
    const barbStartZ  = isBullseyeLevel ? Math.cos(0)                * BULLSEYE_PC_R
                      : isHexLevel && _barbPos  ? _barbPos.z  : 0;
    const wizStartX   = isBullseyeLevel ? Math.sin( 2 * Math.PI / 3) * BULLSEYE_PC_R
                      : isHexLevel && _wizPos   ? _wizPos.x   : 0;
    const wizStartZ   = isBullseyeLevel ? Math.cos( 2 * Math.PI / 3) * BULLSEYE_PC_R
                      : isHexLevel && _wizPos   ? _wizPos.z   : -3;
    const necroStartX = isBullseyeLevel ? Math.sin(-2 * Math.PI / 3) * BULLSEYE_PC_R
                      : isHexLevel && _necroPos ? _necroPos.x : -3;
    const necroStartZ = isBullseyeLevel ? Math.cos(-2 * Math.PI / 3) * BULLSEYE_PC_R
                      : isHexLevel && _necroPos ? _necroPos.z : -3;

    // Create player discs
    // Barbarian (Player 1)
    // AI AGENT: Do not modify the following parameters unless explicitly instructed.
    // Player Discs are defined before NPCs to ensure they are earlier in the discs array for turn order.
    const barbarian = new Disc(
      /* radius: */ 1.25, // don't change this
      /* height: */ 0.4,
      /* color: */ 0x0088ff, // Barbarian color
      /* startX: */ barbStartX,
      /* startZ: */ barbStartZ,
      /* scene: */ this.scene,
      /* discName: */ "Barbarian", // Updated name
      /* type: */ "player",
      /* kind: */ "Barbarian",
      /* hitPoints: */ 5,
      /* skillLevel: */ 100,
      /* imagePath: */ "images/barbarian-nobg.png",
      /* canDoReboundDamage: */ false,
      /* throwPowerMultiplier: */ 1.3,
      /* mass: */ 1.5,
      /* rageIsActiveForNextThrow: */ false,
      /* rageWasUsedThisThrow: */ false,
      /* attackDamage: */ 1,
      /* gameController: */ this,
      /* description: */ this.discDescriptions.Barbarian
    );

    const barbStats = playerStats?.find(s => s.kind === "Barbarian");
    if (barbStats) {
      barbarian.hitPoints = barbStats.hitPoints;
      barbarian.maxHitPoints = barbStats.maxHitPoints;
    }

    // Wizard
    // AI AGENT: Do not modify the following parameters unless explicitly instructed.
    const wizard = new Disc(
      /* radius: */ .9,
      /* height: */ 0.4,
      /* color: */ 0x00C0C0, // Muted cyan color for Wizard
      /* startX: */ wizStartX,
      /* startZ: */ wizStartZ,
      /* scene: */ this.scene,
      /* discName: */ "Wizard",
      /* type: */ "player",
      /* kind: */ "Wizard",
      /* hitPoints: */ 3,
      /* skillLevel: */ 100,
      /* imagePath: */ "images/wizard-nobg.png", // Image for Wizard disc
      /* canDoReboundDamage: */ false,
      /* throwPowerMultiplier: */ 0.7,
      /* mass: */ .8,
      /* rageIsActiveForNextThrow: */ false,
      /* rageWasUsedThisThrow: */ false,
      /* attackDamage: */ 1,
      /* gameController: */ this,
      /* description: */ this.discDescriptions.Wizard
    );

    const wizStats = playerStats?.find(s => s.kind === "Wizard");
    if (wizStats) {
      wizard.hitPoints = wizStats.hitPoints;
      wizard.maxHitPoints = wizStats.maxHitPoints;
    }

    // Necromancer
    // AI AGENT: Do not modify the following parameters unless explicitly instructed.
    const necromancer = new Disc(
      /* radius: */ .9,
      /* height: */ 0.4,
      /* color: */ 0x6600CC, // Dark purple for Necromancer
      /* startX: */ necroStartX,
      /* startZ: */ necroStartZ,
      /* scene: */ this.scene,
      /* discName: */ "Necromancer",
      /* type: */ "player",
      /* kind: */ "Necromancer",
      /* hitPoints: */ 3,
      /* skillLevel: */ 100,
      /* imagePath: */ "images/necromancer-nobg.png",
      /* canDoReboundDamage: */ false,
      /* throwPowerMultiplier: */ 0.7,
      /* mass: */ .8,
      /* rageIsActiveForNextThrow: */ false,
      /* rageWasUsedThisThrow: */ false,
      /* attackDamage: */ 1,
      /* gameController: */ this,
      /* description: */ this.discDescriptions.Necromancer
    );

    const necroStats = playerStats?.find(s => s.kind === "Necromancer");
    if (necroStats) {
      necromancer.hitPoints = necroStats.hitPoints;
      necromancer.maxHitPoints = necroStats.maxHitPoints;
    }

    const existingPositions = [
        { x: barbarian.mesh.position.x, z: barbarian.mesh.position.z },
        { x: wizard.mesh.position.x, z: wizard.mesh.position.z },
        { x: necromancer.mesh.position.x, z: necromancer.mesh.position.z }
    ];

    // Generate random positions for NPC discs
    // Base definitions for NPCs (name, skillLevel, kind)
    const baseNpcDefinitions = [
      { name: "Skeleton 1", skillLevel: 80, kind: "Skeleton" },
      { name: "Skeleton 2", skillLevel: 80, kind: "Skeleton" },
      { name: "Skeleton 3", skillLevel: 80, kind: "Skeleton" },
      { name: "Skeleton 4", skillLevel: 80, kind: "Skeleton" },
      { name: "Skeleton 5", skillLevel: 80, kind: "Skeleton" },
      { name: "Skeleton 6", skillLevel: 80, kind: "Skeleton" },
      // Wardens
      { name: "Warden 1", skillLevel: 85, kind: "Warden" },
      { name: "Warden 2", skillLevel: 85, kind: "Warden" }
    ];

    // Assign colors from NPC_HEX_COLORS to each NPC definition
    const npcData = baseNpcDefinitions.map((def, index) => ({
      ...def,
      color: NPC_HEX_COLORS[index % NPC_HEX_COLORS.length] // Cycle through colors
    }));

    const npcDiscs = [];
    // Skeletons (NPCs)
    // AI AGENT: Do not modify the following parameters unless explicitly instructed.
    let npcIdx = 0;
    for (const npc of npcData) {
      let position;
      if (isBullseyeLevel) {
        // First 4 NPCs on the middle ring (r 8–16), remaining on the outer ring (r 16–22).
        position = npcIdx < 4
          ? generateBullseyeRingPos(8, 16, 1.5, existingPositions)
          : generateBullseyeRingPos(16, 22, 1.5, existingPositions);
      } else if (isHexLevel) {
        position = generateOuterRingPosition(1.5, existingPositions);
      } else {
        position = generateRandomPosition(1.5, existingPositions);
      }
      npcIdx++;
      const finalX = position ? position.x : (Math.random() - 0.5) * this.level.fieldWidth * 0.7;
      const finalZ = position ? position.z : (Math.random() - 0.5) * this.level.fieldDepth * 0.7;

      let disc;
      // Common arguments for NPC constructors:
      // scene, startX, startZ, discName, skillLevel, gameController, color
      const commonArgs = [
        this.scene,
        finalX,
        finalZ,
        npc.name,
        npc.skillLevel,
        this, // gameController reference
        npc.color
      ];

      if (npc.kind === "Skeleton") {
        disc = new Skeleton(...commonArgs, this.discDescriptions.Skeleton);
      } else if (npc.kind === "Warden") {
        disc = new Warden(...commonArgs, this.discDescriptions.Warden);
      }
      // Future: Add else if for other NPC kinds here

      if (disc) { // Check if disc was successfully created
        npcDiscs.push(disc);
      }
      existingPositions.push({ x: finalX, z: finalZ });
    }

    this.discs.push(barbarian, wizard, necromancer, ...npcDiscs); // Add all player discs

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

  // Show beam for the first player whose turn it is
  if (this.currentDisc && this.currentDisc.type === 'player') {
    this._spawnTurnStartBeam(this.currentDisc);
  }
}

  handlePointerHover(event) {
    this.necromancerController.handlePointerHover(event);
  }

  handlePointerDownInteraction(event, initialPointerDownPos) {
    if (this.gameOverState.active) {
      return;
    }
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);

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
    if (this.panningKeys.hasOwnProperty(key)) {
      this.panningKeys[key] = isPressed;
    }
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
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    if (this.level) {
      // this.level.rotation.x = -Math.PI / 2; // Problematic: Level instance doesn't have rotation
    }
    // this.createWalls(); // Problematic: Level class does not have createWalls method, and walls shouldn't be recreated on resize

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
  this.renderer.setSize(window.innerWidth, window.innerHeight);
}

clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Each frame: fade wall meshes that are between the camera and the play area.
 *
 * Two techniques are combined:
 *
 * 1. OUTER WALLS — boundary proximity.
 *    A single center-ray can't detect outer walls: the camera at y≈35 looking
 *    at y=0 passes ~31 units above an 8-unit wall by the time it crosses the
 *    field boundary. Instead, for each mesh near a field boundary we compute
 *    how far the camera has moved toward (or past) that boundary on the XZ
 *    plane, and derive a fade fraction directly from that distance.
 *    FADE_START units before the wall the fade begins; it reaches full fade
 *    FADE_END units past the wall.
 *
 * 2. INTERNAL OBSTACLES — ray intersection.
 *    The center-ray from camera to orbit-target DOES pass through interior
 *    obstacles (they're low enough relative to camera height), so a standard
 *    Raycaster hit-test handles those.
 */
_updateWallFade(deltaTime) {
  if (!this.level || !this.camera || !this.controls) return;

  const visualWalls = this.level.getVisualWalls();
  if (!visualWalls.length) return;

  // ── Raycaster for internal obstacles ──────────────────────────────────────
  this._wallFadeDir
    .subVectors(this.controls.target, this.camera.position)
    .normalize();
  this._wallFadeRaycaster.set(this.camera.position, this._wallFadeDir);
  this._wallFadeRaycaster.far =
    this.camera.position.distanceTo(this.controls.target);
  const hits = new Set(
    this._wallFadeRaycaster.intersectObjects(visualWalls).map(h => h.object)
  );

  // ── Boundary-proximity fade for outer walls ────────────────────────────────
  const cam  = this.camera.position;
  const fw   = this.level.fieldWidth  / 2;  // 24 — east/west boundary
  const fd   = this.level.fieldDepth  / 2;  // 18 — north/south boundary
  // Fade begins FADE_START units before the wall (inside the field) and
  // reaches full opacity-reduction FADE_END units past the wall.
  const FADE_START    = 8;
  const FADE_END      = 3;
  const BOUNDARY_TOL  = 1.5; // mesh must be within this many units of a boundary
  const FADED  = 0.6;
  const OPAQUE = 1.0;
  const SPEED  = 80;

  for (const mesh of visualWalls) {
    const wx = mesh.position.x;
    const wz = mesh.position.z;

    // Start from raycaster result (handles internal obstacles)
    let fadeAmount = hits.has(mesh) ? 1.0 : 0.0;

    // South boundary  (wz ≈ +fd)
    if (Math.abs(wz - fd) < BOUNDARY_TOL) {
      const d = cam.z - fd; // positive = camera is past the wall
      fadeAmount = Math.max(fadeAmount,
        Math.max(0, Math.min(1, (d + FADE_START) / (FADE_START + FADE_END))));
    }
    // North boundary  (wz ≈ -fd)
    if (Math.abs(wz + fd) < BOUNDARY_TOL) {
      const d = -cam.z - fd;
      fadeAmount = Math.max(fadeAmount,
        Math.max(0, Math.min(1, (d + FADE_START) / (FADE_START + FADE_END))));
    }
    // East boundary  (wx ≈ +fw)
    if (Math.abs(wx - fw) < BOUNDARY_TOL) {
      const d = cam.x - fw;
      fadeAmount = Math.max(fadeAmount,
        Math.max(0, Math.min(1, (d + FADE_START) / (FADE_START + FADE_END))));
    }
    // West boundary  (wx ≈ -fw)
    if (Math.abs(wx + fw) < BOUNDARY_TOL) {
      const d = -cam.x - fw;
      fadeAmount = Math.max(fadeAmount,
        Math.max(0, Math.min(1, (d + FADE_START) / (FADE_START + FADE_END))));
    }

    const targetOpacity = OPAQUE - fadeAmount * (OPAQUE - FADED);
    mesh.material.opacity +=
      (targetOpacity - mesh.material.opacity) * Math.min(deltaTime * SPEED, 1);
  }
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
    this._generateLavaPools();
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
    this._generateLavaPools();
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

    // Fade walls that sit between the camera and the scene centre
    this._updateWallFade(deltaTime);
    const elapsedSinceLastUpdate = now - this.fpsLastUpdateTime;

    if (elapsedSinceLastUpdate >= this.fpsUpdateInterval) {
      const fps = Math.round((this.fpsFrameCount * 1000) / elapsedSinceLastUpdate);
      if (this.uiManager) {
        this.uiManager.updateFPS(fps); // UIManager now handles the text formatting
      }
      this.fpsFrameCount = 0;
      this.fpsLastUpdateTime = now;
    }

    if (this.controls) {
      this.controls.update();
    }

    // Smooth camera rotation based on cameraRotationDirection
    if (this.cameraRotationDirection !== 0 && this.controls && this.controls.enabled) {
        const offset = new THREE.Vector3().subVectors(this.controls.object.position, this.controls.target);
        const spherical = new THREE.Spherical().setFromVector3(offset);

        spherical.theta += this.cameraRotationDirection * this.cameraRotationSpeed;
        spherical.makeSafe(); // Clamps phi to valid range and ensures radius is positive

        offset.setFromSpherical(spherical);
        this.controls.object.position.copy(this.controls.target).add(offset);
        this.controls.update(); // Crucial to apply the change to OrbitControls
    }

    // Handle camera panning with WASD and arrow keys
    if (this.panningKeys.up || this.panningKeys.down || this.panningKeys.left || this.panningKeys.right) {
      // Get the camera's forward and right vectors
      const forward = new THREE.Vector3();
      const right = new THREE.Vector3();

      this.camera.getWorldDirection(forward);
      forward.y = 0; // Keep panning horizontal
      forward.normalize();

      right.crossVectors(forward, new THREE.Vector3(0, 1, 0));
      right.normalize();

      // Calculate panning movement
      const panVector = new THREE.Vector3();

      if (this.panningKeys.up) {
        panVector.add(forward.clone().multiplyScalar(this.panSpeed));
      }
      if (this.panningKeys.down) {
        panVector.add(forward.clone().multiplyScalar(-this.panSpeed));
      }
      if (this.panningKeys.left) {
        panVector.add(right.clone().multiplyScalar(-this.panSpeed));
      }
      if (this.panningKeys.right) {
        panVector.add(right.clone().multiplyScalar(this.panSpeed));
      }

      // Apply panning to both camera and controls target
      this.camera.position.add(panVector);
      this.controls.target.add(panVector);
      this.controls.update();
    }

    // Clamp camera target to field bounds + margin
    if (this.level && this.controls) {
      const target = this.controls.target;
      const halfFieldWidth = this.level.fieldWidth / 2;
      const halfFieldDepth = this.level.fieldDepth / 2;
      const panMargin = 0; // The allowed panning margin

      // Clamp the target's x coordinate
      target.x = THREE.MathUtils.clamp(target.x, -halfFieldWidth - panMargin, halfFieldWidth + panMargin);
      // Clamp the target's z coordinate
      target.z = THREE.MathUtils.clamp(target.z, -halfFieldDepth - panMargin, halfFieldDepth + panMargin);
      // The OrbitControls.update() at the beginning of the next animate() call
      // will use this clamped target to reposition the camera.
    }

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

    // Animate descending turn-start beams
    this._updateTurnStartBeams(deltaTime);

    // Animated dead discs stay where they are — no Necromancer-follow behaviour

    // Update and move discs
    for (const disc of [...this.discs]) {
      if (disc.moving) {
        disc.updatePosition();

        // Hexagonal level: apply gravity component along ramp slope to velocity.
        // Discs on ramps are accelerated toward the pit; flat zones have no effect.
        if (this.level && this.level.hexRings) {
          const slope = this.level.getTerrainSlopeForce(disc.mesh.position.x, disc.mesh.position.z);
          disc.velocity.x += slope.fx;
          disc.velocity.z += slope.fz;
        }

        // Check door entry BEFORE the boundary-bounce so a disc heading into
        // the open doorway isn't pushed back before the transition fires.
        if (this.roundWon && disc.type === "player" && disc.kind !== "Orb" && disc.kind !== "HealingOrb" && disc.kind !== "AnimatedDead") {
          if (this.level.checkPortalCollision(disc.mesh.position.x, disc.mesh.position.z, disc.radius)) {
            await this.startNextLevel(disc);
            return;
          }
        }

        disc.handleWallCollision(
          this.level.fieldWidth,
          this.level.fieldDepth,
          0.8,
        );

        const walls = this.level.getAllWalls();
        walls.forEach((wall) => {
          disc.handleCollisionWithBox(wall, 0.8);
        });

        // Circular obstacle collision for pillars and triangular columns.
        // Box3.setFromObject on a 3-segment prism produces an asymmetric AABB
        // that misses from certain approach angles; a 2D circle push is exact.
        for (const obs of (this.level.obstacles || [])) {
          if (obs.type !== 'pillar' && obs.type !== 'triangle') continue;
          const obsRadius = obs.width / 2;
          const dx = disc.mesh.position.x - obs.x;
          const dz = disc.mesh.position.z - obs.z;
          const dist = Math.sqrt(dx * dx + dz * dz);
          const minDist = disc.radius + obsRadius;
          if (dist < minDist && dist > 0.001) {
            const nx = dx / dist;
            const nz = dz / dist;
            // Push disc out of overlap
            disc.mesh.position.x = obs.x + nx * minDist;
            disc.mesh.position.z = obs.z + nz * minDist;
            // Reflect velocity component along normal
            const vDotN = disc.velocity.x * nx + disc.velocity.z * nz;
            if (vDotN < 0) {
              disc.velocity.x = (disc.velocity.x - 2 * vDotN * nx) * 0.8;
              disc.velocity.z = (disc.velocity.z - 2 * vDotN * nz) * 0.8;
            }
          }
        }

        // Hexagonal level: enforce circular outer boundary (replaces AABB collision
        // on the large rotated wall panels, which inflate badly).
        if (this.level && this.level.hexRings) {
          const { RA_in } = this.level.hexRings;
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
            }
          }
        }

        // Apply friction (Wizards and Necromancers have more drag and slow down faster)
        const currentFriction = (disc.kind === 'Wizard' || disc.kind === 'Necromancer') ? 0.92 : 0.96;
        disc.applyFriction(currentFriction);
      }
    }

    // Bullseye level: rotate every disc's world position with the ring it is standing on.
    // This makes the rings act as a conveyor — discs are carried regardless of their own velocity.
    if (this.level && this.level.bullseyeRings) {
      const { inner, middle, outer } = this.level.bullseyeRings;
      for (const disc of this.discs) {
        const dx = disc.mesh.position.x;
        const dz = disc.mesh.position.z;
        const r  = Math.sqrt(dx * dx + dz * dz);
        let omega = 0;
        if (r < 8)       omega = inner.rotDir  * inner.speed;   // inner ring
        else if (r < 16) omega = middle.rotDir * middle.speed;  // middle ring
        else if (r < 22) omega = outer.rotDir  * outer.speed;   // outer ring
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
        if (disc === this.currentDisc && this.throwDirectionLine && this.throwDirectionLine.visible) {
          const rotateVec = (v) => {
            const vx = v.x, vz = v.z;
            v.x =  vx * cos + vz * sin;
            v.z = -vx * sin + vz * cos;
          };
          if (this._prevLineStart) rotateVec(this._prevLineStart);
          if (this._prevLineEnd)   rotateVec(this._prevLineEnd);
          const pos = this.throwDirectionLine.geometry.attributes.position;
          if (pos) {
            pos.setXYZ(0, this._prevLineStart.x, this._prevLineStart.y, this._prevLineStart.z);
            pos.setXYZ(1, this._prevLineEnd.x,   this._prevLineEnd.y,   this._prevLineEnd.z);
            pos.needsUpdate = true;
          }
        }
      }
    }

    // Hexagonal level: snap every disc's Y to the terrain height directly below it.
    // This keeps all discs riding the surface regardless of whether they're moving.
    if (this.level && this.level.hexRings) {
      for (const disc of this.discs) {
        const h = this.level.getTerrainHeightAt(disc.mesh.position.x, disc.mesh.position.z);
        disc.mesh.position.y = h + disc.basePositionY;
      }
    }

    // Disc-to-disc collisions
    let colliding = false;
    const collisionArray = [...this.discs];
    for (let i = 0; i < collisionArray.length; i++) {
      const d1 = collisionArray[i];
      for (let j = i + 1; j < collisionArray.length; j++) {
        const d2 = collisionArray[j];

        // Skip collision between Wizard and his own orbs while they are orbiting
        if ((d1.kind === 'Wizard' && this.wizardController.orbs.includes(d2) && !d2.moving) ||
            (d2.kind === 'Wizard' && this.wizardController.orbs.includes(d1) && !d1.moving)) {
            continue; // Skip to the next pair
        }

        // Skip collision between Necromancer and its animated dead while they are orbiting
        if ((d1.kind === 'Necromancer' && this.necromancerController.animatedDeadDiscs.includes(d2) && !d2.moving) ||
            (d2.kind === 'Necromancer' && this.necromancerController.animatedDeadDiscs.includes(d1) && !d1.moving)) {
            continue;
        }

        // Skip collision if one is a regular Orb and the other is dead, OR if two Orbs are colliding
        // Note: Healing Orbs DO NOT skip dead discs (they bounce off them)
        const isRegularOrb1 = d1.kind === 'Orb';
        const isRegularOrb2 = d2.kind === 'Orb';
        const isAnyOrb1 = isRegularOrb1 || d1.kind === 'HealingOrb';
        const isAnyOrb2 = isRegularOrb2 || d2.kind === 'HealingOrb';
        if ((isRegularOrb1 && d2.dead) || (isRegularOrb2 && d1.dead) || (isAnyOrb1 && isAnyOrb2)) {
            continue;
        }

        // Regular Orbs (cyan) should pass through all player discs (Wizard, Barbarian, etc.) without interaction
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
              const target = d1.kind === 'HealingOrb' ? d2 : d1;

              // Heal the target if not already healed this throw
              if (!healingOrb.healedDiscs.has(target)) {
                  target.restoreHealth(1);
                  healingOrb.healedDiscs.add(target);
                  this.updateDiscNames();
                  if (this.uiManager) this.uiManager.updateCurrentTurnDiscName(this.currentDisc);

                  // Mark actor as having caused damage/action if it was one of the colliding discs
                  if (this.currentDisc && (d1 === this.currentDisc || d2 === this.currentDisc)) {
                      this.currentDisc.hasCausedDamage = true;
                  }
              }
              continue; // Skip physics for Healing Orb (pass through)
          }

          colliding = true;
          const normal = diff.clone().divideScalar(dist);
          normal.y = 0;
          normal.normalize();

          const relativeVelocity = d1.velocity.clone().sub(d2.velocity);
          const velocityAlongNormal = relativeVelocity.dot(normal);

          if (velocityAlongNormal <= 0) {
            const restitution = 1; // Coefficient of restitution
            // Calculate impulse magnitude considering individual masses
            const impulseMagnitude = (-(1 + restitution) * velocityAlongNormal) / (1 / d1.mass + 1 / d2.mass);

            // Apply impulse to each disc according to its mass
            // The 'normal' vector points from d2 towards d1
            d1.velocity.add(normal.clone().multiplyScalar(impulseMagnitude / d1.mass));
            d2.velocity.sub(normal.clone().multiplyScalar(impulseMagnitude / d2.mass));

            d1.moving = true;
            d2.moving = true;

            // Push overlapping discs apart to ensure momentum is felt cleanly
            const totalMass = d1.mass + d2.mass;
            const separationOverlap = minDist - dist;
            d1.mesh.position.add(normal.clone().multiplyScalar(separationOverlap * (d2.mass / totalMass)));
            d2.mesh.position.sub(normal.clone().multiplyScalar(separationOverlap * (totalMass === 0 ? 0 : d1.mass / totalMass)));

            // Apply damage rules
            if (d1.hitPoints > 0 && d2.hitPoints > 0 && !d1.dead && !d2.dead) { // Ensure both discs are alive and not dead
                // Special Case: AnimatedDead hitting a live NPC (deals damage but is NOT consumed)
                if ((d1.kind === 'AnimatedDead' && !d1.dead && d2.type === 'NPC' && !d2.dead) ||
                    (d2.kind === 'AnimatedDead' && !d2.dead && d1.type === 'NPC' && !d1.dead)) {
                    const animated = d1.kind === 'AnimatedDead' ? d1 : d2;
                    const npc = d1.kind === 'AnimatedDead' ? d2 : d1;

                    if (this.currentDisc === animated) {
                        // Animated dead was thrown by the Necromancer — deal damage to NPC
                        npc.takeHit(animated.attackDamage, animated);

                        if (npc.hitPoints <= 0 && !this.npcsKilledForRageCharge.has(npc.discName)) {
                            this.necromancerController.manaEarnedThisTurn += 1;
                            this.npcsKilledForRageCharge.add(npc.discName);
                            this.necromancerController.updateActionButtons();
                        }
                    } else if (this.currentDisc === npc) {
                        // NPC was directly thrown into the animated dead — deal damage
                        animated.takeHit(npc.attackDamage, npc);
                    }
                    // Anything else (residual motion, indirect hit) — no damage
                }
                // Special Case: Wizard Orb hitting an NPC (Volatile Collision)
                else if (this.thrownDisc !== null && ((d1.kind === 'Orb' && d2.type === 'NPC') || (d2.kind === 'Orb' && d1.type === 'NPC'))) {
                    const orb = d1.kind === 'Orb' ? d1 : d2;
                    const npc = d1.kind === 'Orb' ? d2 : d1;
                    const actor = this.currentDisc;

                    // Orb deals damage to NPC
                    npc.takeHit(orb.attackDamage, orb);

                    // Track kills for rewards (Wizard/Orb reward)
                    if (npc.hitPoints <= 0 && !this.npcsKilledForRageCharge.has(npc.discName)) {
                        // Killing an NPC with an orb earns 1 mana back
                        this.wizardController.manaEarnedThisTurn += 1;
                        this.npcsKilledForRageCharge.add(npc.discName);
                        this.barbarianController.updateRageButtonVisibility();
                        this.wizardController.updateActionButtons();
                    }

                    // Orb is consumed upon impact with an NPC
                    orb.takeHit(999, npc);

                    // Mark actor as having caused damage if it was one of the colliding discs
                    if (actor && (d1 === actor || d2 === actor)) {
                        actor.hasCausedDamage = true;
                    }
                }
                // Case 1: d1 is the current acting disc
                else if (this.thrownDisc !== null && d1 === this.currentDisc) {
                    if (d1.type === "player" && d2.type === "NPC") {
                        // Player (d1) hits NPC (d2) - Rage allows multiple hits on the same NPC
                        if (d1.canDoReboundDamage || !this.playerDamagedNPCsThisThrow.has(d2.discName)) {
                            // Barbarian unique NPC hit tracking
                            if (d1.kind === 'Barbarian' && d2.type === 'NPC') { // d1 is Barbarian, d2 is NPC
                                if (d2.hitPoints > 0 && !d2.dead) { // Ensure NPC is targetable for bonus
                                    this.barbarianController.uniqueNPCHitsThisThrow.add(d2.discName);
                                }
                            }

                            let damageToDeal = d1.attackDamage;
                            if (d1.kind === 'Barbarian') {
                                const bonusDamage = this.barbarianController.uniqueNPCHitsThisThrow.size;
                                if (d1.rageWasUsedThisThrow) {
                                    damageToDeal = 2 + bonusDamage;
                                } else {
                                    damageToDeal = d1.attackDamage + bonusDamage;
                                }
                            }
                            // If d1 is not Barbarian but is raging, current game logic handles it via attackDamage or specific class abilities.
                            d2.takeHit(damageToDeal, d1);
                            // Check if NPC d2 was killed by this hit and grant Rage charge
                            if (d2.hitPoints <= 0 && !this.npcsKilledForRageCharge.has(d2.discName)) {
                                if (d1.kind === 'Barbarian') { // Check if the killer (d1) is Barbarian
                                    if (this.barbarianController.rageCharges < this.barbarianController.maxRageChargesCap) {
                                        this.barbarianController.rageCharges++;
                                    }
                                    // Life-leech during rage
                                    if (d1.rageWasUsedThisThrow) {
                                        d1.restoreHealth(1);
                                        this.updateDiscNames();
                                        if (this.uiManager) this.uiManager.updateCurrentTurnDiscName(this.currentDisc);
                                    }
                                } else if (d1.kind === 'Wizard') {
                                    // Killing an NPC by bumping into them earns 2 mana back
                                    this.wizardController.manaEarnedThisTurn += 2;
                                } else if (d1.kind === 'Orb') {
                                    // Killing an NPC with an orb earns 1 mana back
                                    this.wizardController.manaEarnedThisTurn += 1;
                                } else if (d1.kind === 'Necromancer') {
                                    this.necromancerController.manaEarnedThisTurn += 2;
                                }
                                this.npcsKilledForRageCharge.add(d2.discName);
                                this.barbarianController.updateRageButtonVisibility(); // Update button text/visibility
                            }
                            // Only add to set if not raging (to allow multiple rage hits on the same NPC).
                            if (!d1.canDoReboundDamage) {
                                this.playerDamagedNPCsThisThrow.add(d2.discName);
                            }
                        }
                    } else if (!(d1.type === "NPC" && d2.type === "NPC")) {
                        // Player-Player, or NPC-Player (where d1 is the actor)
                        if (!(d1.type === "player" && d2.type === "player")) {
                            if (!d1.hasCausedDamage || d1.canDoReboundDamage) {
                                let damageToDeal = d1.attackDamage;
                                if (d1.kind === 'Barbarian') { // If d1 (acting disc) is a Barbarian
                                    const bonusDamage = this.barbarianController.uniqueNPCHitsThisThrow.size;
                                    if (d1.rageWasUsedThisThrow) {
                                        damageToDeal = 2 + bonusDamage;
                                    } else {
                                        damageToDeal = d1.attackDamage + bonusDamage;
                                    }
                                }
                                d2.takeHit(damageToDeal, d1);
                                d1.hasCausedDamage = true;

                                // If d2 is a Wizard/Necromancer, their counter-attack might have killed the NPC attacker (d1)
                                if (d1.type === 'NPC' && d1.hitPoints <= 0 && !this.npcsKilledForRageCharge.has(d1.discName)) {
                                    if (d2.kind === 'Wizard') {
                                        this.wizardController.manaEarnedThisTurn += 1;
                                    } else if (d2.kind === 'Necromancer') {
                                        this.necromancerController.manaEarnedThisTurn += 1;
                                    }
                                    this.npcsKilledForRageCharge.add(d1.discName);
                                    this.barbarianController.updateRageButtonVisibility();
                                    this.wizardController.updateActionButtons();
                                    this.necromancerController.updateActionButtons();
                                }
                            }
                        }
                    }
                }
                // Case 2: d2 is the current acting disc
                else if (this.thrownDisc !== null && d2 === this.currentDisc) {
                    if (d2.type === "player" && d1.type === "NPC") {
                        if (d2.canDoReboundDamage || !this.playerDamagedNPCsThisThrow.has(d1.discName)) {
                            if (d2.kind === 'Barbarian' && d1.type === 'NPC') {
                                if (d1.hitPoints > 0 && !d1.dead) {
                                    this.barbarianController.uniqueNPCHitsThisThrow.add(d1.discName);
                                }
                            }

                            let damageToDeal = d2.attackDamage;
                            if (d2.kind === 'Barbarian') {
                                const bonusDamage = this.barbarianController.uniqueNPCHitsThisThrow.size;
                                if (d2.rageWasUsedThisThrow) {
                                    damageToDeal = 2 + bonusDamage;
                                } else {
                                    damageToDeal = d2.attackDamage + bonusDamage;
                                }
                            }
                            d1.takeHit(damageToDeal, d2);
                            if (d1.hitPoints <= 0 && !this.npcsKilledForRageCharge.has(d1.discName)) {
                                if (d2.kind === 'Barbarian') {
                                    if (this.barbarianController.rageCharges < this.barbarianController.maxRageChargesCap) {
                                        this.barbarianController.rageCharges++;
                                    }
                                    if (d2.rageWasUsedThisThrow) {
                                        d2.restoreHealth(1);
                                        this.updateDiscNames();
                                        if (this.uiManager) this.uiManager.updateCurrentTurnDiscName(this.currentDisc);
                                    }
                                } else if (d2.kind === 'Wizard') {
                                    this.wizardController.manaEarnedThisTurn += 2;
                                } else if (d2.kind === 'Orb') {
                                    this.wizardController.manaEarnedThisTurn += 1;
                                } else if (d2.kind === 'Necromancer') {
                                    this.necromancerController.manaEarnedThisTurn += 2;
                                }
                                this.npcsKilledForRageCharge.add(d1.discName);
                                this.barbarianController.updateRageButtonVisibility();
                            }
                            if (!d2.canDoReboundDamage) {
                                this.playerDamagedNPCsThisThrow.add(d1.discName);
                            }
                        }
                    } else if (!(d2.type === "NPC" && d1.type === "NPC")) {
                        if (!(d2.type === "player" && d1.type === "player")) {
                            if (!d2.hasCausedDamage || d2.canDoReboundDamage) {
                                let damageToDeal = d2.attackDamage;
                                if (d2.kind === 'Barbarian') {
                                    const bonusDamage = this.barbarianController.uniqueNPCHitsThisThrow.size;
                                    if (d2.rageWasUsedThisThrow) {
                                        damageToDeal = 2 + bonusDamage;
                                    } else {
                                        damageToDeal = d2.attackDamage + bonusDamage;
                                    }
                                }
                                d1.takeHit(damageToDeal, d2);
                                d2.hasCausedDamage = true;

                                if (d2.type === 'NPC' && d2.hitPoints <= 0 && !this.npcsKilledForRageCharge.has(d2.discName)) {
                                    if (d1.kind === 'Wizard') {
                                        this.wizardController.manaEarnedThisTurn += 1;
                                    } else if (d1.kind === 'Necromancer') {
                                        this.necromancerController.manaEarnedThisTurn += 1;
                                    }
                                    this.npcsKilledForRageCharge.add(d2.discName);
                                    this.barbarianController.updateRageButtonVisibility();
                                    this.wizardController.updateActionButtons();
                                    this.necromancerController.updateActionButtons();
                                }
                            }
                        }
                    }
                }
                // Case 3: NPC-NPC collision (Chain Reaction) when player is the actor
                else if (this.thrownDisc !== null && d1.type === "NPC" && d2.type === "NPC" && this.currentDisc && this.currentDisc.type === 'player') {
                    const actor = this.currentDisc;
                    if (actor.canDoReboundDamage || !this.playerDamagedNPCsThisThrow.has(d1.discName) || !this.playerDamagedNPCsThisThrow.has(d2.discName)) {

                        let damageToDeal = actor.attackDamage;

                        if (actor.kind === 'Barbarian') {
                            this.barbarianController.uniqueNPCHitsThisThrow.add(d1.discName);
                            this.barbarianController.uniqueNPCHitsThisThrow.add(d2.discName);

                            const bonusDamage = this.barbarianController.uniqueNPCHitsThisThrow.size;
                            damageToDeal = actor.rageWasUsedThisThrow ? (2 + bonusDamage) : (actor.attackDamage + bonusDamage);
                        }

                        d1.takeHit(damageToDeal, actor);
                        d2.takeHit(damageToDeal, actor);

                        [d1, d2].forEach(npc => {
                            if (npc.hitPoints <= 0 && !this.npcsKilledForRageCharge.has(npc.discName)) {
                                if (actor.kind === 'Barbarian') {
                                    if (this.barbarianController.rageCharges < this.barbarianController.maxRageChargesCap) {
                                        this.barbarianController.rageCharges++;
                                    }
                                    if (actor.rageWasUsedThisThrow) {
                                        actor.restoreHealth(1);
                                        this.updateDiscNames();
                                        if (this.uiManager) this.uiManager.updateCurrentTurnDiscName(this.currentDisc);
                                    }
                                } else if (actor.kind === 'Wizard') {
                                    this.wizardController.manaEarnedThisTurn += 2;
                                } else if (actor.kind === 'Orb') {
                                    this.wizardController.manaEarnedThisTurn += 1;
                                } else if (actor.kind === 'Necromancer') {
                                    this.necromancerController.manaEarnedThisTurn += 2;
                                }
                                this.npcsKilledForRageCharge.add(npc.discName);
                            }
                        });
                        this.barbarianController.updateRageButtonVisibility();

                        if (!actor.canDoReboundDamage) {
                            this.playerDamagedNPCsThisThrow.add(d1.discName);
                            this.playerDamagedNPCsThisThrow.add(d2.discName);
                        }
                    }
                }
            }
          }
        }
      }
    }

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

    // Show descending beam for player turns
    if (this.currentDisc &&
        this.currentDisc.type === 'player' &&
        this.currentDisc.kind !== 'Orb' &&
        this.currentDisc.kind !== 'HealingOrb' &&
        this.currentDisc.kind !== 'AnimatedDead') {
      this._spawnTurnStartBeam(this.currentDisc);
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
    this.cameraRotationDirection = direction;
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

  _generateLavaPools() {
    if (!this.level || !this.scene) {
        console.error("Level or scene not initialized. Cannot generate lava pools.");
        return;
    }
    // Remove any existing lava pool meshes and clear the list before regenerating.
    for (const pool of this.lavaPools) {
      if (pool.getMesh()) this.scene.remove(pool.getMesh());
    }
    this.lavaPools = [];
    // Hexagonal level: center pit pool + random pools on the flat outer ring.
    if (this.level.hexRings) {
      const { LOW_Y, MED_Y, RC_in, RA_in } = this.level.hexRings;

      // Center pit — fills the floor.
      const centerPool = new LavaPool({
        centerX:      0,
        centerZ:      0,
        baseRadius:   3.8,
        numVertices:  10,
        irregularity: 0.15,
        yPosition:    LOW_Y + 0.05,
      });
      if (centerPool.getMesh()) {
        this.scene.add(centerPool.getMesh());
        this.lavaPools.push(centerPool);
      }

      // Random pools on the flat ring (RC_in..RA_in).
      const POOL_INNER_R = RC_in + 3.0;
      const POOL_OUTER_R = RA_in - 4.0;
      const numPools = 2 + Math.floor(Math.random() * 3); // 2–4 pools
      const poolY    = MED_Y + 0.05;
      for (let i = 0; i < numPools; i++) {
        let placed = false;
        for (let attempt = 0; attempt < 80 && !placed; attempt++) {
          const angle = Math.random() * Math.PI * 2;
          const r     = POOL_INNER_R + Math.random() * (POOL_OUTER_R - POOL_INNER_R);
          const x     = Math.sin(angle) * r;
          const z     = Math.cos(angle) * r;
          const radius = 1.5 + Math.random() * 1.5;

          // Check separation from existing pools.
          let tooClose = false;
          for (const p of this.lavaPools) {
            const dx = x - p.centerX;
            const dz = z - p.centerZ;
            if (Math.sqrt(dx * dx + dz * dz) < radius + p.baseRadius + 3) {
              tooClose = true;
              break;
            }
          }
          if (tooClose) continue;

          const pool = new LavaPool({
            centerX:      x,
            centerZ:      z,
            baseRadius:   radius,
            numVertices:  8 + Math.floor(Math.random() * 4),
            irregularity: 0.2 + Math.random() * 0.2,
            yPosition:    poolY,
          });
          if (pool.getMesh()) {
            this.scene.add(pool.getMesh());
            this.lavaPools.push(pool);
          }
          placed = true;
        }
      }
      return;
    }

    // Donut level: fill the central void with lava and scatter pools on the ring.
    if (this.level.donutInnerRadius) {
      const INNER_R = this.level.donutInnerRadius;
      const OUTER_R = this.level.circleRadius;

      // Central void fill — large lava pool covering the hole.
      const centerPool = new LavaPool({
        centerX: 0, centerZ: 0,
        baseRadius:   INNER_R - 0.5,
        numVertices:  16,
        irregularity: 0.08,
        yPosition:    0.05,
      });
      if (centerPool.getMesh()) {
        this.scene.add(centerPool.getMesh());
        this.lavaPools.push(centerPool);
      }

      // A few small pools scattered on the ring.
      const numPools = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < numPools; i++) {
        let placed = false;
        for (let attempt = 0; attempt < 80 && !placed; attempt++) {
          const angle  = Math.random() * Math.PI * 2;
          const r      = (INNER_R + 2.5) + Math.random() * (OUTER_R - INNER_R - 5);
          const x      = Math.sin(angle) * r;
          const z      = Math.cos(angle) * r;
          const radius = 1.5 + Math.random() * 1.5;
          let tooClose = false;
          for (const p of this.lavaPools) {
            const dx = x - p.centerX;
            const dz = z - p.centerZ;
            if (Math.sqrt(dx * dx + dz * dz) < radius + p.baseRadius + 3) { tooClose = true; break; }
          }
          if (tooClose) continue;
          const pool = new LavaPool({
            centerX: x, centerZ: z, baseRadius: radius,
            numVertices:  8 + Math.floor(Math.random() * 4),
            irregularity: 0.2 + Math.random() * 0.2,
            yPosition:    0.05,
          });
          if (pool.getMesh()) { this.scene.add(pool.getMesh()); this.lavaPools.push(pool); }
          placed = true;
        }
      }
      return;
    }

    // Bullseye level: place a single fixed lava pool at the centre of the inner ring.
    if (this.level.bullseyeRings) {
      const lavaPool = new LavaPool({
        centerX:     0,
        centerZ:     0,
        baseRadius:  3.5,
        numVertices: 12,
        irregularity: 0.15,
        yPosition:   0.05,
      });
      if (lavaPool.getMesh()) {
        this.scene.add(lavaPool.getMesh());
        this.lavaPools.push(lavaPool);
      }
      return;
    }

    // Determine the number of lava pools for this level (randomly 1 or 2 for now)
    const numLavaPoolsToGenerate = Math.floor(Math.random() * 2) + 1; // Results in 1 or 2
    const MIN_RADIUS = 2;
    const MAX_RADIUS = 4;
    const Y_POSITION = 0.05; // Slightly above ground to prevent z-fighting

    for (let i = 0; i < numLavaPoolsToGenerate; i++) {
        const placement = this._findValidLavaPoolPlacement(MIN_RADIUS, MAX_RADIUS);
        if (placement) {
            const lavaPool = new LavaPool({
                centerX: placement.x,
                centerZ: placement.z,
                baseRadius: placement.radius,
                numVertices: 12 + Math.floor(Math.random() * 5), // Fewer vertices (12-16) for less complexity
                irregularity: 0.1 + Math.random() * 0.2, // Lower irregularity (0.1-0.3) for more roundness
                yPosition: Y_POSITION,
                // color: 0xff4500 // Default color in LavaPool, or specify here
            });
            if (lavaPool.getMesh()) {
                this.scene.add(lavaPool.getMesh());
                this.lavaPools.push(lavaPool);
            }
        } else {
            console.warn(`Could not find a valid placement for lava pool ${i + 1} after several attempts.`);
        }
    }
  }

  _findValidLavaPoolPlacement(minRadius, maxRadius) {
    const MAX_ATTEMPTS = 50;
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const radius = minRadius + Math.random() * (maxRadius - minRadius);
        // Ensure pools are not too close to the absolute edges
        const edgeBuffer = radius + 1; // Pool radius + some extra space
        const x = (Math.random() - 0.5) * (this.level.fieldWidth - edgeBuffer * 2);
        const z = (Math.random() - 0.5) * (this.level.fieldDepth - edgeBuffer * 2);

        if (this._isLavaPoolPositionValid(x, z, radius)) {
            return { x, z, radius };
        }
    }
    return null; // Failed to find a spot
  }

  _isLavaPoolPositionValid(centerX, centerZ, baseRadius) {
    // 1. Check points around the pool's circumference and center against fixed obstacles/walls
    // using a very small radius for the point check itself.
    const pointsToCheck = [
        { x: centerX, z: centerZ },
        { x: centerX + baseRadius, z: centerZ },
        { x: centerX - baseRadius, z: centerZ },
        { x: centerX, z: centerZ + baseRadius },
        { x: centerX, z: centerZ - baseRadius },
        // Add corner points for better coverage if needed
        { x: centerX + baseRadius * 0.707, z: centerZ + baseRadius * 0.707 },
        { x: centerX - baseRadius * 0.707, z: centerZ + baseRadius * 0.707 },
        { x: centerX + baseRadius * 0.707, z: centerZ - baseRadius * 0.707 },
        { x: centerX - baseRadius * 0.707, z: centerZ - baseRadius * 0.707 },
    ];

    for (const point of pointsToCheck) {
        // Use a tiny radius (0.1) for isPositionValid, as we're checking a point, not a disc of baseRadius.
        if (!this.isPositionValid(point.x, point.z, 0.1)) {
            // console.log(`Lava pool point invalid: ${point.x}, ${point.z}`);
            return false; // Point is inside a wall or obstacle
        }
    }

    // 2. Check against existing discs
    // Discs are initialized before lava pools, so this.discs is populated.
    for (const disc of this.discs) {
        if (disc.dead) continue; // Ignore dead discs for placement
        const distSq = (disc.mesh.position.x - centerX) ** 2 + (disc.mesh.position.z - centerZ) ** 2;
        // Check if the disc's bounding circle overlaps with the lava pool's bounding circle
        const minSeparationDist = baseRadius + disc.radius + 0.5; // Added small buffer
        if (distSq < minSeparationDist ** 2) {
            // console.log(`Lava pool too close to disc: ${disc.discName}`);
            return false; // Too close to a disc
        }
    }

    // 3. Check against other already placed lava pools
    for (const existingPool of this.lavaPools) {
        const distSq = (existingPool.centerX - centerX) ** 2 + (existingPool.centerZ - centerZ) ** 2;
        // Check if this pool's bounding circle overlaps with an existing pool's bounding circle
        const minSeparationDist = baseRadius + existingPool.baseRadius + 1.0; // Added buffer
        if (distSq < minSeparationDist ** 2) {
            // console.log(`Lava pool too close to another lava pool`);
            return false; // Too close to another lava pool
        }
    }

    return true; // Position is valid
  }
}

window.gameController = window.gameController || new GameController();
window.gameController.init();
