import * as THREE from 'three';
import { firstTimeEvents } from './FirstTimeEvents.js';
import { tooltipManager } from './TooltipManager.js';

const DRAIN_LIFE_RADIUS = 8;
const DRAIN_LIFE_MANA_COST = 2;
const CARRION_FEAST_MANA_COST = 2;
const NECROMANCER_MAX_MANA = 6;
const ANIMATED_DEAD_MAX_COUNT = 6;

export class NecromancerController {
  constructor(gc) {
    this.gc = gc;

    this.mana = 3;
    this.manaEarnedThisTurn = 0;
    this.hasMovedThisTurn = false;
    this.animatedDeadDiscs = [];
    this.movedThisTurn = new Set(); // AnimatedDead discs that have already moved this turn
    this.selectingTarget = false;   // True while player must click a spell target in the scene
    this.targetSelectionMode = null;
    this.hoveredDisc = null;        // Corpse currently under cursor during target selection
    this._targetBeams = [];
    this._beamGeo = null;
    this._beamMat = null;
    this.drainLifeActive = false;   // Whether Drain Life aura is currently active
    this.carrionFeastActive = false; // Whether Carrion Feast is currently active
    this.carrionFeastAteThisTurn = false; // Tracks if a corpse was consumed this turn

    this.animateDeadButton = null;
    this.raiseDeadButton = null;
    this.drainLifeButton = null;
    this.carrionFeastButton = null;
    this.endTurnButton = null;
    this.targetSelectionPopup = null;
    this._actionButtonsContainer = null;
  }

  init(actionButtonsContainer) {
    this._actionButtonsContainer = actionButtonsContainer;
    this._createAnimateDeadButton();
    this._setupAnimateDeadButtonListener();
    this._createDrainLifeButton();
    this._setupDrainLifeButtonListener();
    this._createRaiseDeadButton();
    this._setupRaiseDeadButtonListener();
    this._createCarrionFeastButton();
    this._setupCarrionFeastButtonListener();
    this._createEndTurnButton();
    this._setupEndTurnButtonListener();
    this.updateActionButtons();
    this.updateEndTurnButtonVisibility();
    tooltipManager.register(
      this.animateDeadButton,
      'animate_dead_button_clicked',
      'Spend 1 mana to reanimate a fallen enemy as a minion under your control.'
    );
    tooltipManager.register(
      this.drainLifeButton,
      'drain_life_button_clicked',
      'Spend 2 mana to activate Drain Life. At turn\'s end, sap HP from all nearby enemies. If no enemies are drained, take 1 damage.'
    );
    tooltipManager.register(
      this.carrionFeastButton,
      'carrion_feast_button_clicked',
      'Spend 2 mana to activate. Feast on corpses each turn to keep it active. Each corpse devoured earns 1 HP.'
    );
  }

  getDisc() {
    return this.gc.discs.find(d => d.type === 'player' && d.kind === 'Necromancer' && !d.dead);
  }

  canCastSpells(necromancer) {
    if (!necromancer || necromancer.dead) return false;
    if (this.drainLifeActive) return true; // can deactivate for free
    if (this.carrionFeastActive) return true; // can deactivate for free
    const deadNPCs = this.gc.discs.filter(d => d.type === 'NPC' && d.dead);
    const deadPCs = this.gc.discs.filter(d =>
      d.type === 'player' && d.dead &&
      d.kind !== 'Orb' && d.kind !== 'HealingOrb' &&
      d.kind !== 'AnimatedDead' && d.kind !== 'Necromancer'
    );
    const animatedCount = this.animatedDeadDiscs.filter(d => d.hitPoints > 0 && !d.dead).length;
    if (this.mana >= 1 && deadNPCs.length > 0 && animatedCount < ANIMATED_DEAD_MAX_COUNT) return true;
    if (this.mana >= 2 && deadPCs.length > 0) return true;
    if (this.mana >= DRAIN_LIFE_MANA_COST) return true; // can activate drain life
    if (this.mana >= CARRION_FEAST_MANA_COST && !this.hasMovedThisTurn) return true; // can activate carrion feast
    return false;
  }

  // ─── Button creation ────────────────────────────────────────────────────────

  _createAnimateDeadButton() {
    if (!this._actionButtonsContainer) return;
    let button = document.getElementById('animate-dead-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'animate-dead-button';
      button.dataset.shortcut = '1';
      button.innerHTML = '<kbd>1</kbd> Animate Dead';
      this._actionButtonsContainer.appendChild(button);
    }
    button.style.display = 'none';
    this.animateDeadButton = button;
  }

  _createRaiseDeadButton() {
    if (!this._actionButtonsContainer) return;
    let button = document.getElementById('raise-dead-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'raise-dead-button';
      button.dataset.shortcut = '3';
      button.innerHTML = '<kbd>3</kbd> Resurrect Ally';
      this._actionButtonsContainer.appendChild(button);
    }
    button.style.display = 'none';
    this.raiseDeadButton = button;
  }

  _createDrainLifeButton() {
    if (!this._actionButtonsContainer) return;
    let button = document.getElementById('drain-life-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'drain-life-button';
      button.dataset.shortcut = '2';
      this._actionButtonsContainer.appendChild(button);
    }
    button.style.display = 'none';
    this.drainLifeButton = button;
    this._updateDrainLifeButtonLabel();
  }

  _createCarrionFeastButton() {
    if (!this._actionButtonsContainer) return;
    let button = document.getElementById('carrion-feast-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'carrion-feast-button';
      button.dataset.shortcut = '4';
      button.innerHTML = `<kbd>4</kbd> Carrion Feast`;
      this._actionButtonsContainer.appendChild(button);
    }
    button.style.display = 'none';
    this.carrionFeastButton = button;
  }

  _createEndTurnButton() {
    if (!this._actionButtonsContainer) return;
    let button = document.getElementById('necromancer-end-turn-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'necromancer-end-turn-button';
      button.innerHTML = '<kbd>Space</kbd> End Turn';
      this._actionButtonsContainer.appendChild(button);
    }
    button.style.display = 'none';
    this.endTurnButton = button;
  }

  // ─── Button listeners ───────────────────────────────────────────────────────

  _setupAnimateDeadButtonListener() {
    if (this.animateDeadButton) {
      this.animateDeadButton.addEventListener('click', this._handleAnimateDeadButtonClick.bind(this));
    }
  }

  _setupRaiseDeadButtonListener() {
    if (this.raiseDeadButton) {
      this.raiseDeadButton.addEventListener('click', this._handleRaiseDeadButtonClick.bind(this));
    }
  }

  _setupDrainLifeButtonListener() {
    if (this.drainLifeButton) {
      this.drainLifeButton.addEventListener('click', this._handleDrainLifeButtonClick.bind(this));
    }
  }

  _setupCarrionFeastButtonListener() {
    if (this.carrionFeastButton) {
      this.carrionFeastButton.addEventListener('click', this._handleCarrionFeastButtonClick.bind(this));
    }
  }

  _setupEndTurnButtonListener() {
    if (this.endTurnButton) {
      this.endTurnButton.addEventListener('click', this._handleEndTurnButtonClick.bind(this));
    }
  }

  // ─── Button handlers ────────────────────────────────────────────────────────

  _handleAnimateDeadButtonClick() {
    const necro = this.getDisc();
    if (!necro) return;
    if (this.mana < 1) return;
    firstTimeEvents.track('animate_dead_button_clicked');

    const animatedCount = this.animatedDeadDiscs.filter(d => d.hitPoints > 0 && !d.dead).length;
    if (animatedCount >= ANIMATED_DEAD_MAX_COUNT) return;

    const deadNPCs = this.gc.discs.filter(d => d.type === 'NPC' && d.dead);
    if (deadNPCs.length === 0) return;

    this.selectingTarget = true;
    this.targetSelectionMode = 'animateDead';
    deadNPCs.forEach(d => d.updateSpotlightConfig('animateDeadTarget'));
    this._spawnTargetBeams(deadNPCs);
    if (this.gc.uiManager) {
      this.gc.uiManager.updateThrowInfo('Click a dead enemy to animate it  •  Esc to cancel', true);
    }
    this.updateActionButtons();
  }

  _handleRaiseDeadButtonClick() {
    const necro = this.getDisc();
    if (!necro) return;

    const deadPCs = this.gc.discs.filter(d =>
      d.type === 'player' && d.dead &&
      d.kind !== 'Orb' && d.kind !== 'HealingOrb' &&
      d.kind !== 'AnimatedDead' && d.kind !== 'Necromancer'
    );
    if (deadPCs.length === 0) return;

    this.selectingTarget = true;
    this.targetSelectionMode = 'raiseDead';
    deadPCs.forEach(d => d.updateSpotlightConfig('raiseDeadTarget'));
    this._spawnTargetBeams(deadPCs, 0xffffff, 0.1);
    if (this.gc.uiManager) {
      this.gc.uiManager.updateThrowInfo('Click a dead ally to raise them  •  Esc to cancel', true);
    }
    this.updateActionButtons();
  }

  _handleDrainLifeButtonClick() {
    const necro = this.getDisc();
    if (!necro) return;

    if (this.drainLifeActive) {
      this._deactivateDrainLife(necro);
    } else {
      if (this.mana < DRAIN_LIFE_MANA_COST) return;
      firstTimeEvents.track('drain_life_button_clicked');
      this._activateDrainLife(necro);
    }
    this.updateActionButtons();
    if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(necro);
  }

  _handleCarrionFeastButtonClick() {
    const necro = this.getDisc();
    if (!necro) return;
    if (this.gc.roundWon) return;

    if (this.carrionFeastActive) {
      this._deactivateCarrionFeast(necro);
    } else {
      if (this.hasMovedThisTurn) return;
      if (this.mana < CARRION_FEAST_MANA_COST) return;
      firstTimeEvents.track('carrion_feast_button_clicked');
      this._activateCarrionFeast(necro);
    }
    this.updateActionButtons();
    if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(necro);
  }

  _activateCarrionFeast(necDisc) {
    this.mana -= CARRION_FEAST_MANA_COST;
    this.carrionFeastActive = true;
    this.carrionFeastAteThisTurn = false;
    necDisc.carrionFeastActive = true;
    necDisc.setSpotlightIntensity(true);
    if (this.gc.soundManager) {
      this.gc.soundManager.playDrain(necDisc.mesh.position.clone());
    }
  }

  _deactivateCarrionFeast(necDisc) {
    this.carrionFeastActive = false;
    this.carrionFeastAteThisTurn = false;
    necDisc.carrionFeastActive = false;
    necDisc.setSpotlightIntensity(true);
    if (this.gc.soundManager) {
      this.gc.soundManager.playDrain(necDisc.mesh.position.clone());
    }
  }

  cancelCarrionFeast() {
    const necDisc = this.getDisc();
    this.carrionFeastActive = false;
    this.carrionFeastAteThisTurn = false;
    if (necDisc) {
      necDisc.carrionFeastActive = false;
      necDisc.setSpotlightIntensity(this.gc.currentDisc === necDisc);
    }
    this.updateActionButtons();
    if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(this.gc.currentDisc);
  }

  _activateDrainLife(necDisc) {
    this.mana -= DRAIN_LIFE_MANA_COST;
    this.drainLifeActive = true;
    necDisc.drainLifeActive = true;
    necDisc.showDrainLifeAura(DRAIN_LIFE_RADIUS);
    necDisc.setSpotlightIntensity(true);
    if (this.gc.soundManager) {
      this.gc.soundManager.playDrain(necDisc.mesh.position.clone());
    }
  }

  _deactivateDrainLife(necDisc) {
    this.drainLifeActive = false;
    necDisc.drainLifeActive = false;
    necDisc.hideDrainLifeAura();
    necDisc.setSpotlightIntensity(true);
  }

  async _handleEndTurnButtonClick() {
    const necro = this.getDisc();
    if (necro) {
      this._applyDrainLifeOnTurnEnd();
      this._applyCarrionFeastOnTurnEnd();
      if (necro.dead && this.carrionFeastActive) {
        this._deactivateCarrionFeast(necro);
      }
      await this.gc._proceedToNextPlayerTurn();
    }
  }

  _applyDrainLifeOnTurnEnd() {
    if (!this.drainLifeActive) return;
    const necDisc = this.getDisc();
    if (!necDisc) return;

    const necPos = necDisc.mesh.position;
    let totalDrained = 0;
    this.gc.discs.forEach(d => {
      if (d.type !== 'NPC' || d.dead) return;
      const dx = d.mesh.position.x - necPos.x;
      const dz = d.mesh.position.z - necPos.z;
      if (dx * dx + dz * dz > DRAIN_LIFE_RADIUS * DRAIN_LIFE_RADIUS) return;
      const oldHP = d.hitPoints;
      d.takeHit(1, necDisc);
      const drained = oldHP - d.hitPoints;
      if (d.hitPoints <= 0 && !d.dead) {
        if (!this.gc.npcsKilledForRageCharge.has(d.discName)) {
          this.manaEarnedThisTurn += 2;
          this.gc.npcsKilledForRageCharge.add(d.discName);
        }
        d.die();
        this.gc.updateDiscNames();
      }
      if (drained > 0) {
        necDisc.restoreHealth(drained);
        totalDrained += drained;
      }
    });

    if (totalDrained > 0 && this.gc.soundManager) {
      this.gc.soundManager.playDrain(necPos.clone());
    }

    // Self-cost: only when no NPCs were drained
    if (totalDrained === 0) {
      necDisc.takeHit(2, null);
      if (necDisc.hitPoints <= 0 && !necDisc.dead) {
        necDisc.die();
        this._deactivateDrainLife(necDisc);
        if (this.carrionFeastActive) {
          this._deactivateCarrionFeast(necDisc);
        } else if (necDisc.carrionFeastActive) {
          if (necDisc.deactivateCarrionFeastGlow) {
            necDisc.deactivateCarrionFeastGlow();
          } else {
            necDisc.setSpotlightIntensity(true);
          }
        }
      }
    }
  }

  _applyCarrionFeastOnTurnEnd() {
    if (!this.carrionFeastActive) return;
    const necDisc = this.getDisc();
    if (!necDisc) return;
    if (necDisc.dead) {
      this._deactivateCarrionFeast(necDisc);
      return;
    }
    if (!this.carrionFeastAteThisTurn) {
      this._deactivateCarrionFeast(necDisc);
    }
  }

  // ─── Visibility updates ─────────────────────────────────────────────────────

  updateActionButtons() {
    this._updateAnimateDeadButtonVisibility();
    this._updateRaiseDeadButtonVisibility();
    this._updateDrainLifeButtonVisibility();
    this._updateCarrionFeastButtonVisibility();
    if (this.gc.uiManager) {
      this.gc.uiManager.updateMoveStatusChip(this.gc.currentDisc);
      if (this.gc.currentDisc && this.gc.currentDisc.kind === 'Necromancer') {
        this.gc.uiManager.updateCurrentTurnDiscName(this.gc.currentDisc);
      }
    }
  }

  _updateAnimateDeadButtonVisibility() {
    if (!this.animateDeadButton) return;
    const necro = this.getDisc();
    const currentTurnDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const deadNPCs = this.gc.discs.filter(d => d.type === 'NPC' && d.dead);
    const animatedCount = this.animatedDeadDiscs.filter(d => d.hitPoints > 0 && !d.dead).length;
    const shouldBeVisible = !!(necro &&
      necro === currentTurnDisc &&
      !this.gc.gameOverState.active &&
      this.mana >= 1 &&
      deadNPCs.length > 0 &&
      animatedCount < ANIMATED_DEAD_MAX_COUNT &&
      !this.selectingTarget);
    this.animateDeadButton.style.display = shouldBeVisible ? 'inline-block' : 'none';
    this.animateDeadButton.disabled = !shouldBeVisible;
  }

  _updateRaiseDeadButtonVisibility() {
    if (!this.raiseDeadButton) return;
    const necro = this.getDisc();
    const currentTurnDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const deadPCs = this.gc.discs.filter(d =>
      d.type === 'player' && d.dead &&
      d.kind !== 'Orb' && d.kind !== 'HealingOrb' &&
      d.kind !== 'AnimatedDead' && d.kind !== 'Necromancer'
    );
    const shouldBeVisible = !!(necro &&
      necro === currentTurnDisc &&
      !this.gc.gameOverState.active &&
      this.mana >= 2 &&
      deadPCs.length > 0 &&
      !this.selectingTarget);
    this.raiseDeadButton.style.display = shouldBeVisible ? 'inline-block' : 'none';
    this.raiseDeadButton.disabled = !shouldBeVisible;
  }

  _updateDrainLifeButtonLabel() {
    if (!this.drainLifeButton) return;
    if (this.drainLifeActive) {
      this.drainLifeButton.innerHTML = '<kbd>2</kbd> Drain Life: ON';
    } else {
      this.drainLifeButton.innerHTML = `<kbd>2</kbd> Drain Life`;
    }
  }

  _updateDrainLifeButtonVisibility() {
    if (!this.drainLifeButton) return;
    const necro = this.getDisc();
    const currentTurnDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const isNecroTurn = !!(necro &&
      necro === currentTurnDisc &&
      !this.gc.gameOverState.active &&
      !this.gc.roundWon);

    this._updateDrainLifeButtonLabel();

    if (!isNecroTurn) {
      this.drainLifeButton.style.display = 'none';
      this.drainLifeButton.disabled = true;
      return;
    }

    if (this.drainLifeActive) {
      // Always show when active so player can deactivate for free
      this.drainLifeButton.style.display = 'inline-block';
      this.drainLifeButton.disabled = false;
    } else {
      const canActivate = this.mana >= DRAIN_LIFE_MANA_COST;
      this.drainLifeButton.style.display = canActivate ? 'inline-block' : 'none';
      this.drainLifeButton.disabled = !canActivate;
    }
  }

  _updateCarrionFeastButtonLabel() {
    if (!this.carrionFeastButton) return;
    if (this.carrionFeastActive) {
      this.carrionFeastButton.innerHTML = '<kbd>4</kbd> Carrion Feast: ON';
    } else {
      this.carrionFeastButton.innerHTML = `<kbd>4</kbd> Carrion Feast (${CARRION_FEAST_MANA_COST}\u{1F480})`;
    }
  }

  _updateCarrionFeastButtonVisibility() {
    if (!this.carrionFeastButton) return;
    const necro = this.getDisc();
    const currentTurnDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const isNecroTurn = !!(necro &&
      necro === currentTurnDisc &&
      !this.gc.gameOverState.active);

    this._updateCarrionFeastButtonLabel();

    if (!isNecroTurn) {
      this.carrionFeastButton.style.display = 'none';
      this.carrionFeastButton.disabled = true;
      this.carrionFeastButton.title = '';
      return;
    }

    if (this.gc.roundWon) {
      this.carrionFeastButton.style.display = 'inline-block';
      this.carrionFeastButton.disabled = true;
      this.carrionFeastButton.innerHTML = '<kbd>4</kbd> Carrion Feast (Round Over)';
      this.carrionFeastButton.title = 'Carrion Feast cannot be used after the round is over.';
      return;
    }

    if (this.carrionFeastActive) {
      // Always show when active so player can deactivate for free
      this.carrionFeastButton.style.display = 'inline-block';
      this.carrionFeastButton.disabled = false;
      this.carrionFeastButton.title = 'Deactivate Carrion Feast.';
    } else {
      const canActivate = this.mana >= CARRION_FEAST_MANA_COST;
      this.carrionFeastButton.style.display = canActivate ? 'inline-block' : 'none';
      this.carrionFeastButton.disabled = !canActivate || this.hasMovedThisTurn;
      if (this.hasMovedThisTurn) {
        this.carrionFeastButton.innerHTML = '<kbd>4</kbd> Carrion Feast (Move Used)';
      }
      this.carrionFeastButton.title = this.hasMovedThisTurn
        ? 'Requires the Necromancer to activate it before moving.'
        : '';
    }
  }

  updateEndTurnButtonVisibility() {
    if (!this.endTurnButton) return;
    const necro = this.getDisc();
    const currentTurnDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const shouldBeVisible = !!(necro &&
      necro === currentTurnDisc &&
      !this.gc.gameOverState.active);
    this.endTurnButton.style.display = shouldBeVisible ? 'inline-block' : 'none';
    this.endTurnButton.disabled = !shouldBeVisible;
  }

  // ─── Target selection UI ────────────────────────────────────────────────────

  cancelTargetSelection() {
    if (!this.selectingTarget) return;
    this.selectingTarget = false;
    this.targetSelectionMode = null;
    this.hoveredDisc = null;
    this.gc.discs.filter(d => d.dead)
                 .forEach(d => d.updateSpotlightConfig('dead'));
    this._clearTargetBeams();
    if (this.gc.uiManager) this.gc.uiManager.updateThrowInfo('', false);
    this.updateActionButtons();
    this._updateCarrionFeastButtonVisibility();
  }

  handlePointerHover(event) {
    if (!this.selectingTarget) return;

    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    this.gc.raycaster.setFromCamera(mouse, this.gc.camera);

    const eligible = this._getTargetSelectionDiscs();
    let hovered = null;
    for (const disc of eligible) {
      if (this.gc.raycaster.intersectObject(disc.mesh, true).length > 0) {
        hovered = disc;
        break;
      }
    }

    if (hovered === this.hoveredDisc) return;
    if (this.hoveredDisc) {
      this.hoveredDisc.updateSpotlightConfig(
        this.targetSelectionMode === 'raiseDead' ? 'raiseDeadTarget' : 'animateDeadTarget'
      );
    }
    this.hoveredDisc = hovered;
    if (hovered) {
      hovered.updateSpotlightConfig(
        this.targetSelectionMode === 'raiseDead' ? 'raiseDeadHovered' : 'animateDeadHovered'
      );
    }
  }

  handleTargetClick(clickedDisc) {
    const necromancer = this.gc.discs.find(d => d.kind === 'Necromancer' && d.type === 'player' && !d.dead);
    if (clickedDisc && necromancer) {
      if (this.targetSelectionMode === 'animateDead' && clickedDisc.type === 'NPC' && clickedDisc.dead) {
        const success = this.animateDeadDisc(necromancer, clickedDisc);
        if (success) {
          if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(necromancer);
          this.gc.updateDiscNames();
        }
      } else if (this.targetSelectionMode === 'raiseDead' && this._isRaiseDeadTarget(clickedDisc)) {
        const success = this.raiseDeadDisc(necromancer, clickedDisc);
        if (success) {
          if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(necromancer);
          this.updateActionButtons();
          this.gc.updateDiscNames();
        }
      }
    }
    this.cancelTargetSelection();
  }

  _getTargetSelectionDiscs() {
    if (this.targetSelectionMode === 'raiseDead') {
      return this.gc.discs.filter(d => this._isRaiseDeadTarget(d));
    }
    if (this.targetSelectionMode === 'animateDead') {
      return this.gc.discs.filter(d => d.type === 'NPC' && d.dead);
    }
    return [];
  }

  _isRaiseDeadTarget(disc) {
    return !!(disc &&
      disc.type === 'player' &&
      disc.dead &&
      disc.kind !== 'Orb' &&
      disc.kind !== 'HealingOrb' &&
      disc.kind !== 'AnimatedDead' &&
      disc.kind !== 'Necromancer');
  }

  _showTargetSelectionPopup(targets, onSelect, title) {
    this.hideTargetSelectionPopup();

    const popup = document.createElement('div');
    popup.id = 'target-selection-popup';
    popup.style.cssText = 'margin-top:8px;padding:8px;background:rgba(0,0,0,0.75);border:1px solid #8833CC;border-radius:6px;';

    const titleEl = document.createElement('div');
    titleEl.textContent = title;
    titleEl.style.cssText = 'color:#CC88FF;font-size:0.8em;margin-bottom:6px;font-weight:bold;';
    popup.appendChild(titleEl);

    targets.forEach(disc => {
      const btn = document.createElement('button');
      btn.textContent = disc.discName;
      btn.style.cssText = 'display:block;width:100%;margin-bottom:4px;padding:4px 8px;font-size:0.75em;cursor:pointer;';
      btn.addEventListener('click', () => {
        this.hideTargetSelectionPopup();
        onSelect(disc);
      });
      popup.appendChild(btn);
    });

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = 'display:block;width:100%;padding:4px 8px;font-size:0.75em;cursor:pointer;margin-top:4px;opacity:0.7;';
    cancelBtn.addEventListener('click', () => this.hideTargetSelectionPopup());
    popup.appendChild(cancelBtn);

    this._actionButtonsContainer.appendChild(popup);
    this.targetSelectionPopup = popup;
  }

  hideTargetSelectionPopup() {
    if (this.targetSelectionPopup) {
      this.targetSelectionPopup.remove();
      this.targetSelectionPopup = null;
    }
  }

  _spawnTargetBeams(discs, color = 0x9933ff, opacity = 0.13) {
    this._clearTargetBeams();
    if (!discs.length) return;
    const beamH = 200;
    this._beamGeo = new THREE.CylinderGeometry(1.0, 1.0, beamH, 16, 1, true);
    this._beamMat = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity,
      side: THREE.BackSide, depthWrite: false,
    });
    discs.forEach(d => {
      const beam = new THREE.Mesh(this._beamGeo, this._beamMat);
      beam.position.set(d.mesh.position.x, beamH / 2, d.mesh.position.z);
      this.gc.scene.add(beam);
      this._targetBeams.push(beam);
    });
  }

  _clearTargetBeams() {
    this._targetBeams.forEach(b => this.gc.scene.remove(b));
    this._targetBeams = [];
    if (this._beamGeo) { this._beamGeo.dispose(); this._beamGeo = null; }
    if (this._beamMat) { this._beamMat.dispose(); this._beamMat = null; }
  }

  // ─── Spell logic ────────────────────────────────────────────────────────────

  animateDeadDisc(necromancerDisc, targetDisc) {
    if (!necromancerDisc || necromancerDisc.dead) return false;
    if (!targetDisc || !targetDisc.dead) return false;
    if (this.mana < 1) return false;

    const activeCount = this.animatedDeadDiscs.filter(d => d.hitPoints > 0 && !d.dead).length;
    if (activeCount >= ANIMATED_DEAD_MAX_COUNT) return false;

    this.mana--;

    targetDisc._originalKind = targetDisc.kind;
    targetDisc._originalType = targetDisc.type;
    targetDisc._originalAttackDamage = targetDisc.attackDamage;
    targetDisc._originalMaxHitPoints = targetDisc.maxHitPoints;

    targetDisc.revive(1);
    targetDisc.attackDamage = 1;
    targetDisc.maxHitPoints = 1;
    targetDisc.type = 'player';
    targetDisc.kind = 'AnimatedDead';
    targetDisc.isAnimatedDead = true;
    targetDisc._animatedDeadColor = necromancerDisc.initialColor;
    targetDisc.mesh.position.y = targetDisc.basePositionY;

    this.animatedDeadDiscs.push(targetDisc);
    targetDisc.setSpotlightIntensity(false);

    if (this.gc.soundManager) {
      this.gc.soundManager.playBreath(targetDisc.mesh.position.clone());
    }

    return true;
  }

  raiseDeadDisc(necromancerDisc, targetDisc) {
    if (!necromancerDisc || necromancerDisc.dead) return false;
    if (!targetDisc || !targetDisc.dead) return false;
    if (this.mana < 2) return false;

    this.mana -= 2;

    const reviveHP = Math.max(1, Math.floor(targetDisc.maxHitPoints / 2));
    targetDisc.revive(reviveHP);
    targetDisc.hitPoints = reviveHP;
    targetDisc.lastHitPoints = reviveHP;
    targetDisc.hasThrown = false;

    // Move resurrected disc to immediately after the Necromancer in turn order
    const discIndex = this.gc.discs.indexOf(targetDisc);
    if (discIndex !== -1) this.gc.discs.splice(discIndex, 1);
    const necroIndex = this.gc.discs.indexOf(necromancerDisc);
    if (necroIndex !== -1) {
      this.gc.discs.splice(necroIndex + 1, 0, targetDisc);
      this.gc.currentTurnIndex = necroIndex;
      this.gc.currentDisc = necromancerDisc;
    }

    this.gc.updateDiscNames();
    return true;
  }

  applyDrainLifeToNPC(npcDisc) {
    if (!this.drainLifeActive) return;
    if (!npcDisc || npcDisc.dead) return;
    const necDisc = this.getDisc();
    if (!necDisc || necDisc.dead) return;

    const necPos = necDisc.mesh.position;
    const npcPos = npcDisc.mesh.position;
    const dx = npcPos.x - necPos.x;
    const dz = npcPos.z - necPos.z;
    if (dx * dx + dz * dz > DRAIN_LIFE_RADIUS * DRAIN_LIFE_RADIUS) return;

    const oldHP = npcDisc.hitPoints;
    npcDisc.takeHit(1, necDisc);
    const actualDamage = oldHP - npcDisc.hitPoints;

    if (npcDisc.hitPoints <= 0 && !npcDisc.dead) {
      if (!this.gc.npcsKilledForRageCharge.has(npcDisc.discName)) {
        this.manaEarnedThisTurn += 2;
        this.gc.npcsKilledForRageCharge.add(npcDisc.discName);
      }
      npcDisc.die();
      this.gc.updateDiscNames();
    }

    if (actualDamage > 0) {
      necDisc.restoreHealth(actualDamage);
    }
  }

  removeAnimatedDead(disc) {
    if (!disc) return;
    const idx = this.animatedDeadDiscs.indexOf(disc);
    if (idx === -1) return;

    this.animatedDeadDiscs.splice(idx, 1);

    disc.kind = disc._originalKind || 'Skeleton';
    disc.type = disc._originalType || 'NPC';
    disc.attackDamage = disc._originalAttackDamage !== undefined ? disc._originalAttackDamage : 1;
    disc.maxHitPoints = disc._originalMaxHitPoints !== undefined ? disc._originalMaxHitPoints : disc.maxHitPoints;
    disc.isAnimatedDead = false;
    delete disc._originalKind;
    delete disc._originalType;
    delete disc._originalAttackDamage;
    delete disc._originalMaxHitPoints;
    delete disc._animatedDeadColor;

    if (!disc.dead) {
      disc.hitPoints = 0;
      disc.lastHitPoints = 0;
      disc.die();
    }

    this.updateActionButtons();
    this.gc.updateDiscNames();
  }

  // ─── Post-throw disc-stopped logic ──────────────────────────────────────────

  async onDiscStopped(disc) {
    if (disc.dead) {
      await this.gc._proceedToNextPlayerTurn();
      return;
    }
    if (disc.kind === 'Necromancer') {
      this.hasMovedThisTurn = true;

      const activeAnimatedCount = this.animatedDeadDiscs.filter(d => d && d.hitPoints > 0 && !d.dead).length;
      const canCast = this.canCastSpells(disc);

      if (activeAnimatedCount === 0 && !canCast) {
        this._applyDrainLifeOnTurnEnd();
        this._applyCarrionFeastOnTurnEnd();
        await this.gc._proceedToNextPlayerTurn();
      } else {
        this.gc.currentDisc = disc;
        this.gc.logCurrentTurn();
        this.gc._updateSpotlights();
        this.gc.barbarianController.updateRageButtonVisibility();
        this.updateActionButtons();
        this.updateEndTurnButtonVisibility();
      }
    } else if (disc.kind === 'AnimatedDead') {
      this.movedThisTurn.add(disc);
      if (disc.hitPoints <= 0) this.removeAnimatedDead(disc);

      const necromancerDisc = this.gc.discs.find(d => d.kind === 'Necromancer' && d.type === 'player' && !d.dead);

      if (necromancerDisc) {
        this.gc.currentDisc = necromancerDisc;
        const necroIndex = this.gc.discs.indexOf(necromancerDisc);
        if (necroIndex !== -1) this.gc.currentTurnIndex = necroIndex;
        this.gc.logCurrentTurn();
        this.gc._updateSpotlights();
        this.gc.barbarianController.updateRageButtonVisibility();
        this.updateActionButtons();
        this.updateEndTurnButtonVisibility();
        this.gc.barbarianController.updateEndTurnButtonVisibility();

        const unmovedAnimated = this.animatedDeadDiscs.filter(d => d && d.hitPoints > 0 && !d.dead && !this.movedThisTurn.has(d)).length;
        const canStillCast = this.canCastSpells(necromancerDisc);
        if (unmovedAnimated === 0 && this.hasMovedThisTurn && !canStillCast) {
          this._applyDrainLifeOnTurnEnd();
          this._applyCarrionFeastOnTurnEnd();
          await this.gc._proceedToNextPlayerTurn();
        }
      } else {
        await this.gc._proceedToNextPlayerTurn();
      }
    }
  }

  // ─── Turn / level / game lifecycle ──────────────────────────────────────────

  applyEarnedMana() {
    this.mana = Math.min(this.mana + this.manaEarnedThisTurn, NECROMANCER_MAX_MANA); // no passive gain for Necromancer
    this.manaEarnedThisTurn = 0;
  }

  onTurnEnd() {
    this.hasMovedThisTurn = false;
    this.movedThisTurn.clear();
    this.carrionFeastAteThisTurn = false;
    this.cancelTargetSelection();
  }

  onLevelStart() {
    this.hasMovedThisTurn = false;
    this.manaEarnedThisTurn = 0;
    this.animatedDeadDiscs = [];
    this.movedThisTurn.clear();
    this.cancelTargetSelection();
    this.hideTargetSelectionPopup();
    this.carrionFeastActive = false;
    this.carrionFeastAteThisTurn = false;
    const necDisc = this.getDisc();
    if (necDisc) {
      necDisc.carrionFeastActive = false;
      if (necDisc.deactivateCarrionFeastGlow) {
        necDisc.deactivateCarrionFeastGlow();
      } else {
        necDisc.setSpotlightIntensity(true);
      }
    }
    // Drain Life resets each level (disc is re-spawned, aura cleaned up by dispose)
    this.drainLifeActive = false;
  }

  onGameRestart() {
    this.mana = 3;
    this.manaEarnedThisTurn = 0;
    this.hasMovedThisTurn = false;
    this.animatedDeadDiscs = [];
    this.movedThisTurn.clear();
    this.cancelTargetSelection();
    this.hideTargetSelectionPopup();
    this.carrionFeastActive = false;
    this.carrionFeastAteThisTurn = false;
    const necDisc = this.getDisc();
    if (necDisc) {
      necDisc.carrionFeastActive = false;
      if (necDisc.deactivateCarrionFeastGlow) {
        necDisc.deactivateCarrionFeastGlow();
      } else {
        necDisc.setSpotlightIntensity(true);
      }
    }
    this.drainLifeActive = false;
  }
}
