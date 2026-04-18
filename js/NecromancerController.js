import * as THREE from 'three';

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
    this._focusIndex = 0;
    this._targetBeams = [];
    this._beamGeo = null;
    this._beamMat = null;

    this.animateDeadButton = null;
    this.raiseDeadButton = null;
    this.focusPrevButton = null;
    this.focusNextButton = null;
    this.endTurnButton = null;
    this.targetSelectionPopup = null;
    this._actionButtonsContainer = null;
  }

  init(actionButtonsContainer) {
    this._actionButtonsContainer = actionButtonsContainer;
    this._createAnimateDeadButton();
    this._setupAnimateDeadButtonListener();
    this._createRaiseDeadButton();
    this._setupRaiseDeadButtonListener();
    this._createFocusButtons();
    this._setupFocusButtonListeners();
    this._createEndTurnButton();
    this._setupEndTurnButtonListener();
    this.updateActionButtons();
    this.updateEndTurnButtonVisibility();
  }

  getDisc() {
    return this.gc.discs.find(d => d.type === 'player' && d.kind === 'Necromancer' && !d.dead);
  }

  canCastSpells(necromancer) {
    if (!necromancer || necromancer.dead) return false;
    const deadNPCs = this.gc.discs.filter(d => d.type === 'NPC' && d.dead && !d.isAnimatedDead);
    const deadPCs = this.gc.discs.filter(d =>
      d.type === 'player' && d.dead &&
      d.kind !== 'Orb' && d.kind !== 'HealingOrb' &&
      d.kind !== 'AnimatedDead' && d.kind !== 'Necromancer'
    );
    const animatedCount = this.animatedDeadDiscs.filter(d => d.hitPoints > 0 && !d.dead).length;
    if (this.mana >= 1 && deadNPCs.length > 0 && animatedCount < 3) return true;
    if (this.mana >= 2 && deadPCs.length > 0) return true;
    return false;
  }

  // ─── Button creation ────────────────────────────────────────────────────────

  _createAnimateDeadButton() {
    if (!this._actionButtonsContainer) return;
    let button = document.getElementById('animate-dead-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'animate-dead-button';
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
      button.innerHTML = '<kbd>2</kbd> Raise Dead (2💀)';
      this._actionButtonsContainer.appendChild(button);
    }
    button.style.display = 'none';
    this.raiseDeadButton = button;
  }

  _createFocusButtons() {
    if (!this._actionButtonsContainer) return;

    let prev = document.getElementById('focus-animated-prev-button');
    if (!prev) {
      prev = document.createElement('button');
      prev.id = 'focus-animated-prev-button';
      prev.textContent = '<';
      this._actionButtonsContainer.appendChild(prev);
    }
    prev.style.display = 'none';
    this.focusPrevButton = prev;

    let next = document.getElementById('focus-animated-next-button');
    if (!next) {
      next = document.createElement('button');
      next.id = 'focus-animated-next-button';
      next.textContent = '>';
      this._actionButtonsContainer.appendChild(next);
    }
    next.style.display = 'none';
    this.focusNextButton = next;
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

  _setupFocusButtonListeners() {
    if (this.focusPrevButton) {
      this.focusPrevButton.addEventListener('click', this._focusPrev.bind(this));
    }
    if (this.focusNextButton) {
      this.focusNextButton.addEventListener('click', this._focusNext.bind(this));
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

  async _handleEndTurnButtonClick() {
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    if (currentDisc && currentDisc.kind === 'Necromancer' && !currentDisc.dead) {
      await this.gc._proceedToNextPlayerTurn();
    }
  }

  _focusPrev() {
    const liveMinions = this.animatedDeadDiscs.filter(d => d && !d.dead && d.hitPoints > 0);
    if (!liveMinions.length) return;
    this._focusIndex = (this._focusIndex - 1 + liveMinions.length) % liveMinions.length;
    if (this.gc.controls) this.gc.controls.target.copy(liveMinions[this._focusIndex].mesh.position);
  }

  _focusNext() {
    const liveMinions = this.animatedDeadDiscs.filter(d => d && !d.dead && d.hitPoints > 0);
    if (!liveMinions.length) return;
    this._focusIndex = (this._focusIndex + 1) % liveMinions.length;
    if (this.gc.controls) this.gc.controls.target.copy(liveMinions[this._focusIndex].mesh.position);
  }

  // ─── Visibility updates ─────────────────────────────────────────────────────

  updateActionButtons() {
    this._updateAnimateDeadButtonVisibility();
    this._updateRaiseDeadButtonVisibility();
    this._updateFocusButtonVisibility();
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

  _updateFocusButtonVisibility() {
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const liveMinions = this.animatedDeadDiscs.filter(d => d && !d.dead && d.hitPoints > 0);
    const shouldShow = !!(currentDisc && currentDisc.kind === 'Necromancer' && !currentDisc.dead && liveMinions.length > 1);
    if (this.focusPrevButton) {
      this.focusPrevButton.style.display = shouldShow ? 'inline-block' : 'none';
      this.focusPrevButton.disabled = !shouldShow;
    }
    if (this.focusNextButton) {
      this.focusNextButton.style.display = shouldShow ? 'inline-block' : 'none';
      this.focusNextButton.disabled = !shouldShow;
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
  }

  onGameRestart() {
    this.mana = 3;
    this.manaEarnedThisTurn = 0;
    this.hasMovedThisTurn = false;
    this.animatedDeadDiscs = [];
    this.movedThisTurn.clear();
    this.cancelTargetSelection();
    this.hideTargetSelectionPopup();
  }
}
