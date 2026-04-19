import * as THREE from 'three';
import { firstTimeEvents } from './FirstTimeEvents.js';
import { tooltipManager } from './TooltipManager.js';

const DRAIN_LIFE_RADIUS = 8;
const DRAIN_LIFE_MANA_COST = 2;

export class NecromancerController {
  constructor(gc) {
    this.gc = gc;

    this.mana = 3;
    this.manaEarnedThisTurn = 0;
    this.hasMovedThisTurn = false;
    this.animatedDeadDiscs = [];
    this.movedThisTurn = new Set(); // AnimatedDead discs that have already moved this turn
    this.selectingTarget = false;   // True while player must click a dead NPC in the scene
    this.hoveredDisc = null;        // Corpse currently under cursor during target selection
    this._targetBeams = [];
    this._beamGeo = null;
    this._beamMat = null;
    this.drainLifeActive = false;   // Whether Drain Life aura is currently active

    this.animateDeadButton = null;
    this.raiseDeadButton = null;
    this.drainLifeButton = null;
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
  }

  getDisc() {
    return this.gc.discs.find(d => d.type === 'player' && d.kind === 'Necromancer' && !d.dead);
  }

  canCastSpells(necromancer) {
    if (!necromancer || necromancer.dead) return false;
    if (this.drainLifeActive) return true; // can deactivate for free
    const deadNPCs = this.gc.discs.filter(d => d.type === 'NPC' && d.dead && !d.isAnimatedDead);
    const deadPCs = this.gc.discs.filter(d =>
      d.type === 'player' && d.dead &&
      d.kind !== 'Orb' && d.kind !== 'HealingOrb' &&
      d.kind !== 'AnimatedDead' && d.kind !== 'Necromancer'
    );
    const animatedCount = this.animatedDeadDiscs.filter(d => d.hitPoints > 0 && !d.dead).length;
    if (this.mana >= 1 && deadNPCs.length > 0 && animatedCount < 3) return true;
    if (this.mana >= 2 && deadPCs.length > 0) return true;
    if (this.mana >= DRAIN_LIFE_MANA_COST) return true; // can activate drain life
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
      button.innerHTML = '<kbd>1</kbd> Animate Dead (1💀)';
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
      button.innerHTML = '<kbd>3</kbd> Raise Dead (2💀)';
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

  _setupEndTurnButtonListener() {
    if (this.endTurnButton) {
      this.endTurnButton.addEventListener('click', this._handleEndTurnButtonClick.bind(this));
    }
  }

  // ─── Button handlers ────────────────────────────────────────────────────────

  _handleAnimateDeadButtonClick() {
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    if (!currentDisc || currentDisc.kind !== 'Necromancer' || currentDisc.dead) return;
    if (this.mana < 1) return;
    firstTimeEvents.track('animate_dead_button_clicked');

    const animatedCount = this.animatedDeadDiscs.filter(d => d.hitPoints > 0 && !d.dead).length;
    if (animatedCount >= 3) return;

    const deadNPCs = this.gc.discs.filter(d => d.type === 'NPC' && d.dead && !d.isAnimatedDead);
    if (deadNPCs.length === 0) return;

    this.selectingTarget = true;
    deadNPCs.forEach(d => d.updateSpotlightConfig('animateDeadTarget'));
    this._spawnTargetBeams(deadNPCs);
    if (this.gc.uiManager) {
      this.gc.uiManager.updateThrowInfo('Click a dead enemy to animate it  •  Esc to cancel', true);
    }
    this.updateActionButtons();
  }

  _handleRaiseDeadButtonClick() {
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    if (!currentDisc || currentDisc.kind !== 'Necromancer' || currentDisc.dead) return;
    if (this.mana < 2) return;

    const deadPCs = this.gc.discs.filter(d =>
      d.type === 'player' && d.dead &&
      d.kind !== 'Orb' && d.kind !== 'HealingOrb' &&
      d.kind !== 'AnimatedDead' && d.kind !== 'Necromancer'
    );
    if (deadPCs.length === 0) return;

    this._showTargetSelectionPopup(
      deadPCs,
      (target) => {
        const success = this.raiseDeadDisc(currentDisc, target);
        if (success) {
          if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(currentDisc);
          this.updateActionButtons();
          this.gc.updateDiscNames();
        }
      },
      'Choose an ally to raise:'
    );
  }

  _handleDrainLifeButtonClick() {
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    if (!currentDisc || currentDisc.kind !== 'Necromancer' || currentDisc.dead) return;

    if (this.drainLifeActive) {
      this._deactivateDrainLife(currentDisc);
    } else {
      if (this.mana < DRAIN_LIFE_MANA_COST) return;
      firstTimeEvents.track('drain_life_button_clicked');
      this._activateDrainLife(currentDisc);
    }
    this.updateActionButtons();
    if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(currentDisc);
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
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    if (currentDisc && currentDisc.kind === 'Necromancer' && !currentDisc.dead) {
      this._applyDrainLifeOnTurnEnd();
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
      necDisc.takeHit(1, null);
      if (necDisc.hitPoints <= 0 && !necDisc.dead) {
        necDisc.die();
        this._deactivateDrainLife(necDisc);
      }
    }
  }

  // ─── Visibility updates ─────────────────────────────────────────────────────

  updateActionButtons() {
    this._updateAnimateDeadButtonVisibility();
    this._updateRaiseDeadButtonVisibility();
    this._updateDrainLifeButtonVisibility();
  }

  _updateAnimateDeadButtonVisibility() {
    if (!this.animateDeadButton) return;
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const deadNPCs = this.gc.discs.filter(d => d.type === 'NPC' && d.dead && !d.isAnimatedDead);
    const animatedCount = this.animatedDeadDiscs.filter(d => d.hitPoints > 0 && !d.dead).length;
    const shouldBeVisible = !!(currentDisc &&
      currentDisc.kind === 'Necromancer' &&
      currentDisc.type === 'player' &&
      !currentDisc.dead &&
      !this.gc.gameOverState.active &&
      this.mana >= 1 &&
      deadNPCs.length > 0 &&
      animatedCount < 3 &&
      !this.selectingTarget);
    this.animateDeadButton.style.display = shouldBeVisible ? 'inline-block' : 'none';
    this.animateDeadButton.disabled = !shouldBeVisible;
  }

  _updateRaiseDeadButtonVisibility() {
    if (!this.raiseDeadButton) return;
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const deadPCs = this.gc.discs.filter(d =>
      d.type === 'player' && d.dead &&
      d.kind !== 'Orb' && d.kind !== 'HealingOrb' &&
      d.kind !== 'AnimatedDead' && d.kind !== 'Necromancer'
    );
    const shouldBeVisible = !!(currentDisc &&
      currentDisc.kind === 'Necromancer' &&
      currentDisc.type === 'player' &&
      !currentDisc.dead &&
      !this.gc.gameOverState.active &&
      this.mana >= 2 &&
      deadPCs.length > 0);
    this.raiseDeadButton.style.display = shouldBeVisible ? 'inline-block' : 'none';
    this.raiseDeadButton.disabled = !shouldBeVisible;
  }

  _updateDrainLifeButtonLabel() {
    if (!this.drainLifeButton) return;
    if (this.drainLifeActive) {
      this.drainLifeButton.innerHTML = '<kbd>2</kbd> Drain Life: ON';
    } else {
      this.drainLifeButton.innerHTML = `<kbd>2</kbd> Drain Life (${DRAIN_LIFE_MANA_COST}\u{1F480})`;
    }
  }

  _updateDrainLifeButtonVisibility() {
    if (!this.drainLifeButton) return;
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const isNecroTurn = !!(currentDisc &&
      currentDisc.kind === 'Necromancer' &&
      currentDisc.type === 'player' &&
      !currentDisc.dead &&
      !this.gc.gameOverState.active);

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

  updateEndTurnButtonVisibility() {
    if (!this.endTurnButton) return;
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const shouldBeVisible = !!(currentDisc &&
      currentDisc.type === 'player' &&
      currentDisc.kind === 'Necromancer' &&
      !currentDisc.dead &&
      !this.gc.gameOverState.active);
    this.endTurnButton.style.display = shouldBeVisible ? 'inline-block' : 'none';
    this.endTurnButton.disabled = !shouldBeVisible;
  }

  // ─── Target selection UI ────────────────────────────────────────────────────

  cancelTargetSelection() {
    if (!this.selectingTarget) return;
    this.selectingTarget = false;
    this.hoveredDisc = null;
    this.gc.discs.filter(d => d.type === 'NPC' && d.dead && !d.isAnimatedDead)
                 .forEach(d => d.updateSpotlightConfig('dead'));
    this._clearTargetBeams();
    if (this.gc.uiManager) this.gc.uiManager.updateThrowInfo('', false);
    this.updateActionButtons();
  }

  handlePointerHover(event) {
    if (!this.selectingTarget) return;

    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    this.gc.raycaster.setFromCamera(mouse, this.gc.camera);

    const eligible = this.gc.discs.filter(d => d.type === 'NPC' && d.dead && !d.isAnimatedDead);
    let hovered = null;
    for (const disc of eligible) {
      if (this.gc.raycaster.intersectObject(disc.mesh, true).length > 0) {
        hovered = disc;
        break;
      }
    }

    if (hovered === this.hoveredDisc) return;
    if (this.hoveredDisc) this.hoveredDisc.updateSpotlightConfig('animateDeadTarget');
    this.hoveredDisc = hovered;
    if (hovered) hovered.updateSpotlightConfig('animateDeadHovered');
  }

  handleTargetClick(clickedDisc) {
    if (clickedDisc && clickedDisc.type === 'NPC' && clickedDisc.dead && !clickedDisc.isAnimatedDead) {
      const necromancer = this.gc.discs.find(d => d.kind === 'Necromancer' && d.type === 'player' && !d.dead);
      if (necromancer) {
        const success = this.animateDeadDisc(necromancer, clickedDisc);
        if (success) {
          if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(necromancer);
          this.gc.updateDiscNames();
        }
      }
    }
    this.cancelTargetSelection();
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

  _spawnTargetBeams(discs) {
    this._clearTargetBeams();
    if (!discs.length) return;
    const beamH = 200;
    this._beamGeo = new THREE.CylinderGeometry(1.0, 1.0, beamH, 16, 1, true);
    this._beamMat = new THREE.MeshBasicMaterial({
      color: 0x9933ff, transparent: true, opacity: 0.13,
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
    if (activeCount >= 3) return false;

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
    if (disc.kind === 'Necromancer') {
      this.hasMovedThisTurn = true;

      const activeAnimatedCount = this.animatedDeadDiscs.filter(d => d && d.hitPoints > 0 && !d.dead).length;
      const canCast = this.canCastSpells(disc);

      if (activeAnimatedCount === 0 && !canCast) {
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
          await this.gc._proceedToNextPlayerTurn();
        }
      } else {
        await this.gc._proceedToNextPlayerTurn();
      }
    }
  }

  // ─── Turn / level / game lifecycle ──────────────────────────────────────────

  applyEarnedMana() {
    this.mana += this.manaEarnedThisTurn; // no passive gain for Necromancer
    this.manaEarnedThisTurn = 0;
  }

  onTurnEnd() {
    this.hasMovedThisTurn = false;
    this.movedThisTurn.clear();
    this.cancelTargetSelection();
  }

  onLevelStart() {
    this.hasMovedThisTurn = false;
    this.manaEarnedThisTurn = 0;
    this.animatedDeadDiscs = [];
    this.movedThisTurn.clear();
    this.cancelTargetSelection();
    this.hideTargetSelectionPopup();
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
    this.drainLifeActive = false;
  }
}
