import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Level from "./Level.js";
import Disc from "./Disc.js";
import UIManager from "./UIManager.js";
import InputHandler from './InputHandler.js';
import Skeleton from './Skeleton.js';
import Warden from './Warden.js';

// Pre-converted hex color values for NPCs
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

    // Turn-based game state
    this.currentTurnIndex = 0;
    this._currentDisc = null;

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
    this.fpsLastTime = performance.now(); // For calculating delta time
    this.fpsLastUpdateTime = performance.now(); // For timing FPS display updates
    this.fpsUpdateInterval = 1000; // Update display every 1 second (in ms)

    // Visual helpers
    this.throwDirectionLine = null;
    this._prevLineStart = null;
    this._prevLineEnd = null;

    // Game state flags
    this.waitingForDiscToStop = false;
    this.playerDamagedNPCsThisThrow = new Set(); // Tracks NPCs damaged by player in the current throw
    // Rage charge tracking (earned by kills)
    this.currentPlayerRageCharges = 0; // How many Rage charges player currently has
    this.maxRageChargesCap = 3;      // Max number of Rage charges player can hold
    this.npcsKilledForRageCharge = new Set(); // Tracks NPCs already killed for a Rage charge this game

    // Game Over State
    this.gameOverState = { active: false, playerWon: false };
    // gameOverMessageContainer and gameOverMessageTextElement are managed by UIManager

    // Rage Button related properties
    // rageButtonElement is managed by UIManager
    this.boundHandleRageButtonClick = null;

    // Wizard Orb properties
    this.wizardOrbs = [];
    this.summonOrbsButton = null;
    this.endWizardTurnButton = null;
    this.barbarianEndTurnButton = null; // Property for Barbarian's end turn button
    this.wizardHasMovedThisTurn = false; // Track if Wizard has moved in the current turn
    this.wizardHasSummonedOrbsThisGame = false; // Track if orbs have been summoned this game

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

    this.discDescriptions = {
        Barbarian: "A fierce warrior who grows stronger with every foe vanquished.",
        Wizard: "A master of the mystical orb, wielding arcane arts to control the battlefield.",
        Skeleton: "A reanimated combatant, relentless and tireless.",
        Warden: "A heavily armored sentinel, slow but incredibly resilient.",
        Orb: "A volatile sphere of magical energy, summoned by the Wizard."
    };

    // Event listeners for keydown, keyup, pointerdown, pointermove, pointerup
    // will be managed by InputHandler.
    // The window resize listener remains here as it directly affects camera/renderer.
    window.addEventListener("resize", () => this.onWindowResize());

    this.animate = this.animate.bind(this);
    this.animate();
  }

  // Barbarian player disc identification helper
  _getBarbarianPlayerDisc() {
    return this.discs.find(d => d.type === 'player' && d.discName === 'Barbarian' && !d.dead);
  }

  // Wizard player disc identification helper (useful for consistency)
  _getWizardPlayerDisc() {
    return this.discs.find(d => d.type === 'player' && d.discName === 'Wizard' && !d.dead);
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

    // Setup renderer and add canvas to DOM
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
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

    // Load the level and walls
    this.level = new Level(this.scene);
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
    this.uiManager = new UIManager(this.restartGame.bind(this));
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

    // Initialize discs for gameplay
    this.initDiscs();

    // Create and setup Summon Orbs button
    this.createSummonOrbsButton();
    this.setupSummonOrbsButtonListener();
    // updateSummonOrbsButtonVisibility will be called by initDiscs and advanceTurn

    // Setup Rage button
    this.setupRageButtonListener();
    this.updateRageButtonVisibility(); // Initial check for Rage button visibility
    this.updateSummonOrbsButtonVisibility(); // Initial check for Summon Orbs button

    // Create and setup End Wizard Turn button
    this.createEndWizardTurnButton();
    this.setupEndWizardTurnButtonListener();
    this.updateEndWizardTurnButtonVisibility(); // Initial visibility

    this.createBarbarianEndTurnButton();
    this.setupBarbarianEndTurnButtonListener(); // Setup listener for Barbarian button
    this.updateBarbarianEndTurnButtonVisibility(); // Initial visibility for Barbarian button

    // Setup input handling
    this.updateDiscNames(); // Explicitly update the disc list after all initialization
  }

  createSummonOrbsButton() {
    if (!this.actionButtonsContainer) {
      console.error("GameController: Action buttons container not available for Summon Orbs button.");
      return;
    }

    // Check if the button already exists (e.g. from a previous game instance or manual HTML)
    let button = document.getElementById('summon-orbs-button');

    if (!button) {
      button = document.createElement('button');
      button.id = 'summon-orbs-button';
      button.textContent = 'Summon Orbs';
      // Example: Apply a class for consistent styling if you have one for game buttons
      // button.classList.add('game-ui-button');
      this.actionButtonsContainer.appendChild(button);
    }

    button.style.display = 'none'; // Initially hidden, will be shown by updateSummonOrbsButtonVisibility
    this.summonOrbsButton = button;
  }

  createEndWizardTurnButton() {
    if (!this.actionButtonsContainer) {
      console.error("GameController: Action buttons container not available for End Wizard Turn button.");
      return;
    }

    let button = document.getElementById('wizard-end-turn-button');

    if (!button) {
      button = document.createElement('button');
      button.id = 'wizard-end-turn-button';
      button.textContent = 'End Turn';
      this.actionButtonsContainer.appendChild(button);
    }

    button.style.display = 'none'; // Initially hidden
    this.endWizardTurnButton = button;
  }

  createBarbarianEndTurnButton() {
    if (!this.actionButtonsContainer) {
      console.error("GameController: Action buttons container not available for Barbarian End Turn button.");
      return;
    }

    let button = document.getElementById('barbarian-end-turn-button');

    if (!button) {
      button = document.createElement('button');
      button.id = 'barbarian-end-turn-button';
      button.textContent = 'End Turn';
      this.actionButtonsContainer.appendChild(button);
    }

    button.style.display = 'none'; // Initially hidden
    this.barbarianEndTurnButton = button;
  }

  setupEndWizardTurnButtonListener() {
    if (this.endWizardTurnButton) {
      this.endWizardTurnButton.addEventListener('click', this._handleEndWizardTurnButtonClick.bind(this));
    } else {
      console.error("GameController: End Wizard Turn button not found to attach listener.");
    }
  }

  async _handleEndWizardTurnButtonClick() {
    const discForTurn = (this.currentTurnIndex !== -1 && this.discs.length > this.currentTurnIndex) ? this.discs[this.currentTurnIndex] : null;
    if (discForTurn && discForTurn.kind === 'Wizard' && !discForTurn.dead) {
      await this._proceedToNextPlayerTurn();
    } else if (discForTurn) {
    } else {
  }
}

setupBarbarianEndTurnButtonListener() {
  if (this.barbarianEndTurnButton) {
    this.barbarianEndTurnButton.addEventListener('click', this._handleBarbarianEndTurnButtonClick.bind(this));
  }
}

async _handleBarbarianEndTurnButtonClick() {
  if (this.gameOverState.active) return;

  const actualCurrentDisc = (this.currentTurnIndex !== -1 && this.discs.length > this.currentTurnIndex) ? this.discs[this.currentTurnIndex] : null;

  if (actualCurrentDisc &&
      actualCurrentDisc.type === 'player' &&
      actualCurrentDisc.kind === 'Barbarian' &&
      !actualCurrentDisc.dead) {
    await this._proceedToNextPlayerTurn();
  } else {
    console.warn("GameController: Barbarian End Turn button clicked, but it's not Barbarian's turn or Barbarian is not active.");
  }
}

updateEndWizardTurnButtonVisibility() {
    if (this.endWizardTurnButton) {
      const actualCurrentDisc = (this.currentTurnIndex !== -1 && this.discs.length > this.currentTurnIndex) ? this.discs[this.currentTurnIndex] : null;
      let shouldBeVisible = false;

      if (actualCurrentDisc &&
          actualCurrentDisc.type === 'player' &&
          actualCurrentDisc.kind === 'Wizard' &&
          !actualCurrentDisc.dead &&
          !this.gameOverState.active) {
        shouldBeVisible = true;
      }

      if (shouldBeVisible) {
        this.endWizardTurnButton.style.display = 'inline-block';
        this.endWizardTurnButton.disabled = false;
      } else {
        this.endWizardTurnButton.style.display = 'none';
        this.endWizardTurnButton.disabled = true;
      }
    }
  }

  updateBarbarianEndTurnButtonVisibility() {
    if (this.barbarianEndTurnButton) {
      const actualCurrentDisc = (this.currentTurnIndex !== -1 && this.discs.length > this.currentTurnIndex) ? this.discs[this.currentTurnIndex] : null;
      let shouldBeVisible = false;

      if (actualCurrentDisc &&
          actualCurrentDisc.type === 'player' &&
          actualCurrentDisc.kind === 'Barbarian' &&
          !actualCurrentDisc.dead &&
          !this.gameOverState.active) {
        shouldBeVisible = true;
      }

      if (shouldBeVisible) {
        this.barbarianEndTurnButton.style.display = 'inline-block';
        this.barbarianEndTurnButton.disabled = false;
      } else {
        this.barbarianEndTurnButton.style.display = 'none';
        this.barbarianEndTurnButton.disabled = true;
      }
    }
  }

  setupSummonOrbsButtonListener() {
    if (this.summonOrbsButton) {
      this.summonOrbsButton.addEventListener('click', this._handleSummonOrbsButtonClick.bind(this));
    } else {
      console.error("GameController: Summon Orbs button not found to attach listener.");
    }
  }

  _handleSummonOrbsButtonClick() {
    console.log("[DEBUG] _handleSummonOrbsButtonClick called.");
    console.log("[DEBUG] this.wizardHasSummonedOrbsThisGame:", this.wizardHasSummonedOrbsThisGame);

    if (this.wizardHasSummonedOrbsThisGame) {
      this.updateSummonOrbsButtonVisibility(); // Ensure button is hidden
      return;
    }

    // Ensure it's the Wizard's actual turn by checking against discForTurnContext
    const discForTurnContext = (this.currentTurnIndex !== -1 && this.discs.length > this.currentTurnIndex) ? this.discs[this.currentTurnIndex] : null;
    console.log("[DEBUG] discForTurnContext:", discForTurnContext ? { name: discForTurnContext.discName, kind: discForTurnContext.kind, dead: discForTurnContext.dead } : null);

    if (discForTurnContext && discForTurnContext.kind === 'Wizard' && !discForTurnContext.dead) {
      console.log("[DEBUG] Conditions met, calling this.summonOrbs().");
      this.summonOrbs(discForTurnContext); // Pass the Wizard whose turn it is
    } else if (discForTurnContext) {
      console.log("[DEBUG] Conditions NOT met for summonOrbs. discForTurnContext kind or dead status: ", discForTurnContext.kind, discForTurnContext.dead);
    } else {
      console.log("[DEBUG] Conditions NOT met for summonOrbs. No discForTurnContext.");
    }
    // summonOrbs will call updateSummonOrbsButtonVisibility.
    // If the conditions above weren't met, or if summonOrbs bails early,
    // calling it here ensures the button state is correctly updated.
    this.updateSummonOrbsButtonVisibility();
  }

  summonOrbs(wizardDisc) {
    console.log("[DEBUG] summonOrbs called with wizardDisc:", wizardDisc ? { name: wizardDisc.discName, kind: wizardDisc.kind, dead: wizardDisc.dead } : null);
    console.log("[DEBUG] summonOrbs: this.wizardHasSummonedOrbsThisGame:", this.wizardHasSummonedOrbsThisGame);

    if (this.wizardHasSummonedOrbsThisGame) {
      console.info("SummonOrbs: Orbs have already been summoned this game.");
      this.updateSummonOrbsButtonVisibility();
      return;
    }

    if (!wizardDisc || wizardDisc.kind !== 'Wizard' || wizardDisc.dead) {
      console.error("SummonOrbs: Cannot summon orbs. Invalid wizard disc.", wizardDisc ? { kind: wizardDisc.kind, dead: wizardDisc.dead } : "null wizardDisc");
      return;
    }

    // Check if there are any active orbs already. This check is secondary to wizardHasSummonedOrbsThisGame
    // but good for internal consistency if called directly.
    const activeOrbsExist = this.wizardOrbs.some(orb => orb && orb.hitPoints > 0 && !orb.dead);
    console.log("[DEBUG] summonOrbs: activeOrbsExist:", activeOrbsExist);
    if (activeOrbsExist) {
      console.info("SummonOrbs: Active orbs already exist.");
      this.updateSummonOrbsButtonVisibility(); // Ensure button state is correct
      return;
    }

    const orbRadius = 0.35;
    const orbHeight = 0.2;
    const orbColor = 0x00FFFF; // Cyan
    const orbType = "player"; // Orbs are controlled by the player
    const orbKind = "Orb";
    const orbHitPoints = 1;
    const orbMass = .5;
    const orbThrowPowerMultiplier = 0.5;
    const orbSkillLevel = 0; // Not AI controlled

    const wizardPos = wizardDisc.mesh.position;
    const distance = 2.0; // Desired distance of orbs from the Wizard
    const initialAngle = -Math.PI / 2; // Start with the first orb "in front" (negative Z relative to Wizard)

    let orbsSummonedCount = 0;
    // Removed: const baseDiscCountForNaming = this.discs.length;

    for (let i = 0; i < 3; i++) {
      const currentAngle = initialAngle + (i * (2 * Math.PI / 3)); // Apply 0, 120, 240 deg displacement
      const orbX = wizardPos.x + distance * Math.cos(currentAngle);
      const orbZ = wizardPos.z + distance * Math.sin(currentAngle);
      // Moved and changed: const discName generation now inside the if block

      if (this.isPositionValid(orbX, orbZ, orbRadius)) {
        const discName = `Wizard's Orb`; // AI AGENT: DON'T CHANGE THIS
        const orb = new Disc(
          orbRadius,
          orbHeight,
          orbColor,
          orbX,
          orbZ,
          this.scene,
          discName,
          orbType,
          orbKind,
          orbHitPoints,
          orbSkillLevel,
          null, // imagePath
          false, // canDoReboundDamage
          orbThrowPowerMultiplier,
          orbMass,
          false, // rageIsActiveForNextThrow
          /* rageWasUsedThisThrow: */ false,
          /* attackDamage: */ 1,
          /* gameController: */ this,
          /* description: */ this.discDescriptions.Orb
        );
        orb.uniqueOrbId = `orb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        // Calculate and store the initial offset from the wizard
        // Offset is calculated in the XZ plane, orb's Y position is managed by its basePositionY
        const orbOffset = new THREE.Vector3(orbX, 0, orbZ).sub(new THREE.Vector3(wizardPos.x, 0, wizardPos.z));
        orb.relativeOffset.copy(orbOffset);

        this.discs.push(orb);
        this.wizardOrbs.push(orb);
        orb.setSpotlightIntensity(true); // Make orbs' spotlights active
        orbsSummonedCount++;
      } else {
        console.warn(`SummonOrbs: Could not place orb ${i+1} at angle ${currentAngle.toFixed(2)}rad (coords: ${orbX.toFixed(2)}, ${orbZ.toFixed(2)}). Position invalid or occupied.`);
      }
    }

    if (orbsSummonedCount > 0) {
      this.wizardHasSummonedOrbsThisGame = true;
    } else {

    }

    this.updateDiscNames(); // Update UI list if it includes orbs
    this.updateSummonOrbsButtonVisibility(); // Button should now be hidden/disabled
  }

  removeOrb(orbDisc) {
    if (!orbDisc) return;

    const orbIndexInWizardOrbs = this.wizardOrbs.indexOf(orbDisc);
    if (orbIndexInWizardOrbs > -1) {
      this.wizardOrbs.splice(orbIndexInWizardOrbs, 1);
    }

    const orbIndexInDiscs = this.discs.indexOf(orbDisc);
    if (orbIndexInDiscs > -1) {
      this.discs.splice(orbIndexInDiscs, 1);
    }

    orbDisc.dispose(); // Clean up Three.js resources

    // If the removed orb was the current disc (e.g. if it was selected), deselect it.
    if (this.currentDisc === orbDisc) {
        // Attempt to set currentDisc to the wizard if available and it's the wizard's turn context
        const wizard = this.discs.find(d => d.kind === 'Wizard' && d.type === 'player' && !d.dead);
        if (wizard && this.currentDisc !== wizard) { // Check if currentDisc needs to be updated
             // This logic might need refinement based on whose turn it's supposed to be.
             // For now, if an orb is removed, and it was the selected disc,
             // we just clear currentDisc or revert to Wizard.
             // The main turn logic in advanceTurn should handle setting the correct *next* turn.
        }
        // If an orb is removed, we likely want to ensure the wizard is the active selection
        // if orbs are "part" of the wizard's turn.
        // This interaction needs to be fully defined when orb control is implemented.
    }

    this.updateSummonOrbsButtonVisibility(); // Update button in case all orbs are gone
    this.updateDiscNames();
  }

  _handleRageButtonClick() {
    const playerDisc = this.discs.find(disc => disc.type === 'player');
    if (playerDisc) {
      if (!playerDisc.dead) { // Only allow rage if player is not dead
        if (this.currentPlayerRageCharges > 0) {
          playerDisc.rageIsActiveForNextThrow = true;
          this.currentPlayerRageCharges--; // Consume a charge
          playerDisc.setSpotlightIntensity(true); // Update spotlight for rage
        } else {
        }
      } else {
      }
      this.updateRageButtonVisibility();
    } else {
    }
  }

  setupRageButtonListener() {
    // Ensure the handler is bound, GameController still owns the handler logic
    if (!this.boundHandleRageButtonClick) {
      this.boundHandleRageButtonClick = this._handleRageButtonClick.bind(this);
    }

    // Pass the bound handler to UIManager to attach it
    if (this.uiManager) {
      this.uiManager.setupRageButtonListener(this.boundHandleRageButtonClick);
    }
  }

  // Helper method to check if a position is valid (not inside obstacles)
  isPositionValid(x, z, discRadius) {
    const padding = discRadius + 0.5; // Extra padding for safety

    // Check field boundaries
    if (x - padding < -this.level.fieldWidth / 2 || x + padding > this.level.fieldWidth / 2) {
      return false;
    }
    if (z - padding < -this.level.fieldDepth / 2 || z + padding > this.level.fieldDepth / 2) {
      return false;
    }

    // Check internal wall 1: x around -fieldWidth/6, z from -fieldDepth/2 + 0.25 to -fieldDepth/2 + 13 + 0.25
    const internal1X = -this.level.fieldWidth / 6;
    const internal1ZStart = -this.level.fieldDepth / 2 + 0.25;
    const internal1ZEnd = internal1ZStart + 13;
    if (Math.abs(x - internal1X) < padding && z >= internal1ZStart - padding && z <= internal1ZEnd + padding) {
      return false;
    }

    // Check internal wall 2: x around fieldWidth/6, z from fieldDepth/2 - 13 - 0.25 to fieldDepth/2 - 0.25
    const internal2X = this.level.fieldWidth / 6;
    const internal2ZEnd = this.level.fieldDepth / 2 - 0.25;
    const internal2ZStart = internal2ZEnd - 13;
    if (Math.abs(x - internal2X) < padding && z >= internal2ZStart - padding && z <= internal2ZEnd + padding) {
      return false;
    }

    // Check obstacle 1: centered at (-10, 8) with size 6x6
    const obs1X = -10, obs1Z = 8, obsSize = 6;
    if (Math.abs(x - obs1X) < obsSize / 2 + padding && Math.abs(z - obs1Z) < obsSize / 2 + padding) {
      return false;
    }

    // Check obstacle 2: centered at (10, -8) with size 6x6
    const obs2X = 10, obs2Z = -8;
    if (Math.abs(x - obs2X) < obsSize / 2 + padding && Math.abs(z - obs2Z) < obsSize / 2 + padding) {
      return false;
    }

    return true;
  }

  initDiscs() {
    this.currentPlayerRageCharges = 0; // Reset Rage charges for a new game
    this.npcsKilledForRageCharge.clear(); // Reset set of NPCs that granted a charge
    // *** DO NOT REMOVE THESE PARAMETER COMMENTS ***
    // Create discs with explicit parameters:
    // (radius, height, color, startX, startZ, scene, discName, type, kind, hitPoints, skillLevel, imagePath, canDoReboundDamage, throwPowerMultiplier, mass, rageIsActiveForNextThrow)

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

    // Create player discs
    // Barbarian (Player 1)
    // AI AGENT: Do not modify the following parameters unless explicitly instructed.
    // Player Discs are defined before NPCs to ensure they are earlier in the discs array for turn order.
    const barbarian = new Disc(
      /* radius: */ 1.25, // don't change this
      /* height: */ 0.4,
      /* color: */ 0x0088ff, // Barbarian color
      /* startX: */ 0,
      /* startZ: */ 0,       // Barbarian position
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

    // Wizard
    // AI AGENT: Do not modify the following parameters unless explicitly instructed.
    const wizard = new Disc(
      /* radius: */ .9,
      /* height: */ 0.4,
      /* color: */ 0x00C0C0, // Muted cyan color for Wizard
      /* startX: */ 0,
      /* startZ: */ -3,      // Position Wizard behind Barbarian
      /* scene: */ this.scene,
      /* discName: */ "Wizard",
      /* type: */ "player",
      /* kind: */ "Wizard",
      /* hitPoints: */ 2,
      /* skillLevel: */ 100,
      /* imagePath: */ "images/wizard-nobg.png", // Image for Wizard disc
      /* canDoReboundDamage: */ false,
      /* throwPowerMultiplier: */ 1.0,
      /* mass: */ .8,
      /* rageIsActiveForNextThrow: */ false,
      /* rageWasUsedThisThrow: */ false,
      /* attackDamage: */ 1,
      /* gameController: */ this,
      /* description: */ this.discDescriptions.Wizard
    );

    const existingPositions = [
        { x: barbarian.mesh.position.x, z: barbarian.mesh.position.z },
        { x: wizard.mesh.position.x, z: wizard.mesh.position.z }
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
    for (const npc of npcData) {
      const position = generateRandomPosition(1.5, existingPositions);
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

    this.discs.push(barbarian, wizard, ...npcDiscs); // Add wizard to the array of discs

    // Initialize all spotlight intensities to inactive state
    this.discs.forEach(disc => {
      disc.setSpotlightIntensity(false);
    });

    // Set turn to first alive player disc or fallback alive disc
    // Orbs should not get a turn in the regular sequence
    this.currentTurnIndex = this.discs.findIndex(
      (d) => d.type === "player" && d.kind !== "Orb" && d.hitPoints > 0 && !d.dead,
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
    // this.updateSummonOrbsButtonVisibility(); // This call was inside an else block, moved to the end of method
  }
  this.updateRageButtonVisibility();
  this.updateSummonOrbsButtonVisibility();
  this.updateEndWizardTurnButtonVisibility();
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
      const intersects = this.raycaster.intersectObject(disc.mesh);
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
            if (this.pointerDisc && this.pointerDisc.kind === 'Orb' && this.wizardOrbs.includes(this.pointerDisc) && !this.pointerDisc.dead) {
                // Clicked on a valid, owned orb
                discToControl = this.pointerDisc; // Orb becomes the controlled disc
                allowAiming = true;
            } else if (this.pointerDisc === discForTurn) { // Clicked on the Wizard
                discToControl = discForTurn; // Wizard is the controlled disc
                if (this.wizardHasMovedThisTurn) {
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
        } else {
            // Other player character's turn (e.g., Barbarian)
            if (this.pointerDisc === discForTurn) {
                discToControl = discForTurn; // This character is the controlled disc
                allowAiming = true;
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
    if (this.gameOverState.active) {
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
    const clickThreshold = 5; // Pixels to differentiate a click from a drag

    const clickedDisc = this.pointerDisc; // Disc under cursor at pointerdown, set in handlePointerDownInteraction

    if (dragLength <= clickThreshold) { // It's a click/tap
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
    if (this.controlsEnabled) {
        this.controls.enabled = true; // Ensure OrbitControls are on.
        // this.controlsEnabled remains true, as set by handlePointerDownInteraction.
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
      const dragLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const dragThreshold = 2;
      const minSpeed = 0.05;

      if (dragLength > dragThreshold) {
        const sensitivity = 1;
        const adjustedLength = dragLength * sensitivity;
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
          this.updateRageButtonVisibility();
        }

        const maxSpeed = 1;
        const normLength = Math.min(adjustedLength / 10, 1);
        const scaledLength = normLength * normLength;
        let speed = (maxSpeed * scaledLength * actualThrowPowerMultiplier) / this.currentDisc.mass;
        if (speed < minSpeed) speed = minSpeed;

        this.currentDisc.velocity.set(
          directionX * speed,
          0,
          directionZ * speed,
        );
        this.currentDisc.moving = true;
        this.currentDisc.hasThrown = true;
        this.currentDisc.resetDamageState();
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
    this.pointerDisc = null; // No disc is actively being aimed anymore
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
    // GameController.controlsEnabled is used by handlePointerDownInteraction to determine
    // if a new aim can start.
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
      if (disc.type === "player") {
        playerDiscsExist = true;
        if (!disc.dead) {
          alivePlayerDiscs++;
        }
      } else if (disc.type === "NPC") {
        npcDiscsExist = true;
        if (!disc.dead) {
          aliveNpcDiscs++;
        }
      }
    });

    // Player loses if all their discs are dead (and player discs actually existed)
    if (playerDiscsExist && alivePlayerDiscs === 0) {
      this.triggerGameOver(false); // Player loses
      return true;
    }

    // Player wins if all NPC discs are dead (and NPC discs actually existed)
    // And player must have some discs alive, or no player discs existed in the first place (NPC vs NPC)
    if (npcDiscsExist && aliveNpcDiscs === 0) {
      if (!playerDiscsExist || alivePlayerDiscs > 0) {
          this.triggerGameOver(true); // Player wins (or all target NPCs are defeated)
          return true;
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

  async restartGame() {

    // 1. Dispose of old discs
    if (this.discs && this.discs.length > 0) {
      this.discs.forEach(disc => disc.dispose());
    }
    this.discs = [];
    this.wizardOrbs = []; // Reset wizard orbs

    // 2. Unload the current level
    if (this.level) {
      this.level.unload();
    }

    // 3. Reload the level
    // Assuming this.level is already instantiated, if not, it might need new Level(this.scene)
    if (this.level) {
      this.level.load();
    } else {
      return; // Cannot proceed without a level
    }

    // 4. Re-initialize discs
    this.initDiscs(); // This will populate this.discs with new instances

    // 5. Reset core game state variables
    this.currentTurnIndex = 0;
    this._currentDisc = null; // Will be set by this.currentDisc setter
    this.waitingForDiscToStop = false;
    this.playerDamagedNPCsThisThrow.clear();
    this.npcsKilledForRageCharge.clear();
    this.currentPlayerRageCharges = 0; // Reset rage charges to 0 or initial value
    this.wizardHasSummonedOrbsThisGame = false; // Reset for new game

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
    // Re-setup the rage button listener to bind to the new player disc
    this.setupRageButtonListener();
    this.updateRageButtonVisibility(); // Call after setup to reflect current charges
    this.updateEndWizardTurnButtonVisibility(); // Reset Wizard end turn button
    this.updateBarbarianEndTurnButtonVisibility(); // Reset Barbarian end turn button

    // 8. Ensure camera controls are enabled
    if (this.controls) {
      this.controls.enabled = true;
    }
    this.controlsEnabled = true;

  }

  async animate() {
    requestAnimationFrame(() => this.animate());

    // FPS calculation
    /*
    this.fpsFrameCount++;
    const now = performance.now();
    const elapsedSinceLastUpdate = now - this.fpsLastUpdateTime;

    if (elapsedSinceLastUpdate >= this.fpsUpdateInterval) {
      const fps = Math.round((this.fpsFrameCount * 1000) / elapsedSinceLastUpdate);
      if (this.uiManager) {
        this.uiManager.updateFPS(fps); // UIManager now handles the text formatting
      }
      this.fpsFrameCount = 0;
      this.fpsLastUpdateTime = now;
    }
    */

    if (this.controls) {
      this.controls.update();
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
      const panMargin = -5; // The allowed panning margin

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
      this.discs.forEach((disc) => {
        if (disc.dead) {
          // Handle both group and single mesh structures
          if (disc.mesh.isGroup) {
            disc.mesh.children.forEach(child => {
              if (child.material) {
                if (child.material.color) child.material.color.set(0x888888);
                child.material.opacity = 0.9;
                child.material.transparent = false;
              }
            });
          } else {
            disc.mesh.material.color.set(0x888888);
            disc.mesh.material.opacity = 0.9;
            disc.mesh.material.transparent = false;
          }
        } else {
          // Handle both group and single mesh structures
          if (disc.mesh.isGroup) {
            disc.mesh.children.forEach(child => {
              if (child.material) {
                if (child.material.color) child.material.color.set(child.material.color.getHex());
                child.material.opacity = 0.9;
                child.material.transparent = false;
              }
            });
          } else {
            disc.mesh.material.color.set(disc.mesh.material.color.getHex());
            disc.mesh.material.opacity = 0.9;
            disc.mesh.material.transparent = false;
          }
        }
      });
    }

    // Real-time Wizard Orb following
    const wizardDisc = this.discs.find(d => d.kind === 'Wizard' && d.type === 'player' && !d.dead);
    if (wizardDisc && this.wizardOrbs.length > 0) {
      const wizardCurrentPos = wizardDisc.mesh.position;
      this.wizardOrbs.forEach(orbRef => {
        // Ensure we're working with "live" orb objects that are part of the main this.discs array
        // especially if wizardOrbs might contain stale references after removals/re-summons.
        const liveOrb = this.discs.find(d => d.uniqueOrbId === orbRef.uniqueOrbId);

        if (liveOrb && liveOrb.mesh && liveOrb.hitPoints > 0 && !liveOrb.dead) {
          // Orbs should not follow if they are currently moving (e.g., after being thrown)
          // Orbs also should not follow if the wizard itself is not moving (optimization, though current logic handles it)
          if (!liveOrb.moving) { // Only update position if the orb itself isn't independently moving
            const targetPosition = wizardCurrentPos.clone().add(liveOrb.relativeOffset);
            targetPosition.y = liveOrb.basePositionY; // Maintain orb's own height

            liveOrb.mesh.position.copy(targetPosition);

            if (liveOrb.spotlight) {
              liveOrb.spotlight.position.set(targetPosition.x, liveOrb.spotlight.position.y, targetPosition.z);
            }

            // Optional: Clamp orb position to field boundaries if necessary,
            // though if the wizard is clamped, orbs should naturally stay within.
            // This can prevent orbs from being pushed through walls if the wizard gets too close.
            if (this.level && typeof liveOrb.radius === 'number') {
                const r = liveOrb.radius;
                liveOrb.mesh.position.x = Math.max(-this.level.fieldWidth/2 + r, Math.min(this.level.fieldWidth/2 - r, liveOrb.mesh.position.x));
                liveOrb.mesh.position.z = Math.max(-this.level.fieldDepth/2 + r, Math.min(this.level.fieldDepth/2 - r, liveOrb.mesh.position.z));
            }
          }
        }
      });
    }

    // Update and move discs
    this.discs.forEach((disc) => {
      if (disc.moving) {
        disc.updatePosition();

        disc.handleWallCollision(
          this.level.fieldWidth,
          this.level.fieldDepth,
          0.8,
        );

        const walls = this.level.getAllWalls();
        walls.forEach((wall) => {
          disc.handleCollisionWithBox(wall, 0.8);
        });

        disc.applyFriction(0.96);
      }
    });

    // Disc-to-disc collisions
    let colliding = false;
    for (let i = 0; i < this.discs.length; i++) {
      const d1 = this.discs[i];
      for (let j = i + 1; j < this.discs.length; j++) {
        const d2 = this.discs[j];

        // Skip collision between Wizard and his own orbs
        if ((d1.kind === 'Wizard' && d2.kind === 'Orb' && this.wizardOrbs.includes(d2)) ||
            (d2.kind === 'Wizard' && d1.kind === 'Orb' && this.wizardOrbs.includes(d1))) {
            continue; // Skip to the next pair
        }

        const diff = d1.mesh.position.clone().sub(d2.mesh.position.clone());
        const dist = diff.length();

        const minDist = d1.radius + d2.radius;

        if (dist < minDist && dist > 0) {
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

            // Apply damage rules
            if (d1.hitPoints > 0 && d2.hitPoints > 0 && !d1.dead && !d2.dead) { // Ensure both discs are alive and not dead
                // Case 1: d1 is the current acting disc
                if (d1 === this.currentDisc) {
                    if (d1.type === "player" && d2.type === "NPC") {
                        // Player (d1) hits NPC (d2) - Rage allows multiple hits on the same NPC
                        if (d1.canDoReboundDamage || !this.playerDamagedNPCsThisThrow.has(d2.discName)) {
                            let damageToDeal = d1.attackDamage;
                            if (d1.kind === 'Barbarian' && d1.rageWasUsedThisThrow) {
                                damageToDeal = 2;
                            }
                            d2.takeHit(damageToDeal);
                            // Check if NPC d2 was killed by this hit and grant Rage charge
                            if (d2.hitPoints <= 0 && !this.npcsKilledForRageCharge.has(d2.discName)) {
                                if (d1.kind === 'Barbarian') { // Check if the killer (d1) is Barbarian
                                    if (this.currentPlayerRageCharges < this.maxRageChargesCap) {
                                        this.currentPlayerRageCharges++;
                                    }
                                }
                                this.npcsKilledForRageCharge.add(d2.discName);
                                this.updateRageButtonVisibility(); // Update button text/visibility
                            }
                            // Only add to set if not raging (to allow multiple rage hits on the same NPC).
                            // For non-rage hits, this preserves the "one damage instance per NPC per throw" rule.
                            if (!d1.canDoReboundDamage) {
                                this.playerDamagedNPCsThisThrow.add(d2.discName);
                            }
                        }
                    } else if (!(d1.type === "NPC" && d2.type === "NPC")) {
                        // Player-Player, or NPC-Player (where d1 is the actor)
                        // Use original logic: only first collision causes damage unless canDoReboundDamage is true
                        if (!d1.hasCausedDamage || d1.canDoReboundDamage) {
                            let damageToDeal = d1.attackDamage;
                            if (d1.kind === 'Barbarian' && d1.rageWasUsedThisThrow) {
                                damageToDeal = 2;
                            }
                            d2.takeHit(damageToDeal);
                            d1.hasCausedDamage = true;
                        }
                    }
                }
                // Case 2: d2 is the current acting disc
                else if (d2 === this.currentDisc) {
                    if (d2.type === "player" && d1.type === "NPC") {
                        // Player (d2) hits NPC (d1) - Rage allows multiple hits on the same NPC
                        if (d2.canDoReboundDamage || !this.playerDamagedNPCsThisThrow.has(d1.discName)) {
                            let damageToDeal = d2.attackDamage;
                            if (d2.kind === 'Barbarian' && d2.rageWasUsedThisThrow) {
                                damageToDeal = 2;
                            }
                            d1.takeHit(damageToDeal);
                            // Check if NPC d1 was killed by this hit and grant Rage charge
                            if (d1.hitPoints <= 0 && !this.npcsKilledForRageCharge.has(d1.discName)) {
                                if (d2.kind === 'Barbarian') { // Check if the killer (d2) is Barbarian
                                    if (this.currentPlayerRageCharges < this.maxRageChargesCap) {
                                        this.currentPlayerRageCharges++;
                                    }
                                }
                                this.npcsKilledForRageCharge.add(d1.discName);
                                this.updateRageButtonVisibility(); // Update button text/visibility
                            }
                            // Only add to set if not raging.
                            if (!d2.canDoReboundDamage) {
                                this.playerDamagedNPCsThisThrow.add(d1.discName);
                            }
                        }
                    } else if (!(d2.type === "NPC" && d1.type === "NPC")) {
                        // Player-Player, or NPC-Player (where d2 is the actor)
                        // Use original logic
                        if (!d2.hasCausedDamage || d2.canDoReboundDamage) {
                            let damageToDeal = d2.attackDamage;
                            if (d2.kind === 'Barbarian' && d2.rageWasUsedThisThrow) {
                                damageToDeal = 2;
                            }
                            d1.takeHit(damageToDeal);
                            d2.hasCausedDamage = true;
                        }
                    }
                }
            }

            const overlap = minDist - dist;
            d1.mesh.position.add(normal.clone().multiplyScalar(overlap * 0.5));
            d2.mesh.position.sub(normal.clone().multiplyScalar(overlap * 0.5));
          }
        }
      }
    }

    // Animate torch flickering
    if (this.level) {
      this.level.animateTorches();
    }

    if (this.renderer) {
      this.renderer.render(this.scene, this.camera);
    }

    if (this.waitingForDiscToStop && this.currentDisc) {
      const velocityLength = this.currentDisc.velocity.length();
      if (velocityLength < 0.01 && !this.currentDisc.moving) {
        this.waitingForDiscToStop = false;
        const justMovedDisc = this.currentDisc;

        if (justMovedDisc.kind === 'Wizard') {
            // Wizard disc itself stopped moving.
            // Orb repositioning is now handled in real-time in the main animate loop.
            this.wizardHasMovedThisTurn = true;

            const activeOrbsCount = this.wizardOrbs.filter(orb => orb && orb.hitPoints > 0 && !orb.dead).length;
            const canSummonNewOrbs = !this.wizardHasSummonedOrbsThisGame; // Wizard is alive as they just moved

            if (activeOrbsCount === 0 && !canSummonNewOrbs) {
                // No orbs left to use and cannot summon new ones.
                await this._proceedToNextPlayerTurn();
            } else {
                // Wizard's turn continues, can use existing orbs or summon new ones.
                this.currentDisc = justMovedDisc; // Ensure Wizard is current focus
                // this.currentTurnIndex should still correctly point to the Wizard.
                this.logCurrentTurn(); // Log that it's still Wizard's turn
                this._updateSpotlights(); // Update spotlights for the Wizard
                this.updateRageButtonVisibility();
                this.updateSummonOrbsButtonVisibility(); // Update based on whether orbs can be summoned
                this.updateEndWizardTurnButtonVisibility(); // Ensure "End Turn" button is correctly displayed
            }
        } else if (justMovedDisc.kind === 'Orb' && justMovedDisc.hitPoints <= 0) {
            // Orb was consumed
            this.removeOrb(justMovedDisc);
            const wizardDisc = this.discs.find(d => d.kind === 'Wizard' && d.type === 'player' && !d.dead);

            if (wizardDisc) {
                this.currentDisc = wizardDisc; // Wizard regains focus
                const wizardIndex = this.discs.indexOf(wizardDisc);
                if (wizardIndex !== -1) {
                    this.currentTurnIndex = wizardIndex; // Ensure turn index remains Wizard's
                }
                this.logCurrentTurn();
                this._updateSpotlights();
                this.updateRageButtonVisibility();
                this.updateSummonOrbsButtonVisibility();
                this.updateEndWizardTurnButtonVisibility();
                this.updateBarbarianEndTurnButtonVisibility();

                this._updateSpotlights();
                // Check if turn should end now
                const activeOrbsAfterConsumption = this.wizardOrbs.filter(orb => orb && orb.hitPoints > 0 && !orb.dead).length;
                if (activeOrbsAfterConsumption === 0 && this.wizardHasMovedThisTurn) {
                    await this._proceedToNextPlayerTurn();
                }
                // Else: Wizard's turn continues (can move self, throw another (non-existent) orb, or end turn)
            } else {
                // Wizard is dead or gone, proceed to next normal turn
                await this._proceedToNextPlayerTurn();
            }
        } else {
            // Any other disc stopped (e.g., Barbarian, NPC) or an Orb that wasn't consumed (which shouldn't happen if it's the justMovedDisc and it stopped)
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

  updateRageButtonVisibility() {
    if (!this.uiManager) return;

    let visible = false;
    let enabled = false;
    const charges = this.currentPlayerRageCharges;
    const maxCharges = this.maxRageChargesCap;
    const discForTurnContext = (this.currentTurnIndex !== -1 && this.discs.length > this.currentTurnIndex) ? this.discs[this.currentTurnIndex] : null;

    // Check if the current disc is a player-controlled Barbarian who can use Rage
    if (discForTurnContext &&
        discForTurnContext.type === 'player' &&
        discForTurnContext.kind === 'Barbarian' && // Specific to Barbarian
        !discForTurnContext.dead &&
        !discForTurnContext.rageIsActiveForNextThrow && // Rage not already armed
        charges > 0) { // Must have charges to use
      visible = true;
      enabled = true; // Button is usable if visible (it's this Barbarian's turn)
    }

    this.uiManager.updateRageButtonVisibility(visible, enabled, charges, maxCharges);
  }

  async _proceedToNextPlayerTurn() {
    if (this.checkGameOverConditions()) {
      return;
    }
    this.wizardHasMovedThisTurn = false; // Reset for the new turn

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
        if (potentialDisc.kind === 'Orb') continue; // Orbs do not get independent turns
        if (potentialDisc.hitPoints > 0 && !potentialDisc.dead) {
            nextAvailableDiscFound = true;
            break;
        }
    }

    if (!nextAvailableDiscFound) {
        // No valid disc found to advance to, might be game over or only orbs left.
        // This case should ideally be handled by checkGameOverConditions.
        // For safety, set currentDisc to null or a sensible default if no one can act.
        const firstAlivePlayer = this.discs.find(d => d.type === 'player' && d.kind !== 'Orb' && !d.dead);
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
                this.updateRageButtonVisibility();
                this.updateSummonOrbsButtonVisibility();
                return; // Exit, game over should have caught this.
            }
        }
    }

    // Reset hasThrown for new currentDisc so it can be thrown
    this.discs[nextIndex].hasThrown = false;

    this.currentTurnIndex = nextIndex;
    this.currentDisc = this.discs[this.currentTurnIndex]; // Correctly assign the disc for the new turn
    this.logCurrentTurn();
    this._updateSpotlights();
    this.updateRageButtonVisibility();
    this.updateSummonOrbsButtonVisibility();
    this.updateEndWizardTurnButtonVisibility();
    this.updateBarbarianEndTurnButtonVisibility();
    this._updateSpotlights(); // Ensure spotlights are updated after turn progression

    this.logCurrentTurn();
    if (this.currentDisc.type === "NPC") {
      await this.aiThrow(this.currentDisc);
    }
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

  updateSummonOrbsButtonVisibility() {
    if (!this.summonOrbsButton) return;

    let shouldBeVisible = false;
    const discForTurnContext = (this.currentTurnIndex !== -1 && this.discs.length > this.currentTurnIndex) ? this.discs[this.currentTurnIndex] : null;

    // Primary condition: Orbs must not have been summoned yet this game.
    if (!this.wizardHasSummonedOrbsThisGame &&
        discForTurnContext &&
        discForTurnContext.kind === 'Wizard' &&
        discForTurnContext.type === 'player' &&
        !discForTurnContext.dead &&
        // Also ensure no active orbs currently exist (e.g. if summon failed partially before flag was set,
        // or if this is called before summonOrbs fully completes and sets the main flag).
        this.wizardOrbs.filter(orb => orb && orb.hitPoints > 0 && !orb.dead).length === 0 &&
        !this.gameOverState.active) {
      shouldBeVisible = true;
    }

    if (shouldBeVisible) {
      this.summonOrbsButton.style.display = 'inline-block';
      // Potentially update text or disabled state if needed in the future
      // e.g., this.summonOrbsButton.disabled = false;
      // e.g., this.summonOrbsButton.textContent = 'Summon Orbs';
    } else {
      this.summonOrbsButton.style.display = 'none';
    }
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

    // Get alive player discs as targets
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
    this.waitingForDiscToStop = true;
  }
}

window.gameController = window.gameController || new GameController();
window.gameController.init();
