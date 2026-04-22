import * as THREE from 'three';
import Disc from './Disc.js';
import { firstTimeEvents } from './FirstTimeEvents.js';
import { tooltipManager } from './TooltipManager.js';

export class WizardController {
  constructor(gc) {
    this.gc = gc;

    this.mana = 3;
    this.manaEarnedThisTurn = 0;
    this.hasMovedThisTurn = false;
    this.orbs = [];
    this._radiusBlastRings = [];

    this.summonOrbsButton = null;
    this.summonHealingOrbsButton = null;
    this.radiusBlastButton = null;
    this.endTurnButton = null;
    this._actionButtonsContainer = null;
  }

  init(actionButtonsContainer) {
    this._actionButtonsContainer = actionButtonsContainer;
    this._createSummonOrbsButton();
    this._setupSummonOrbsButtonListener();
    this._createSummonHealingOrbsButton();
    this._setupSummonHealingOrbsButtonListener();
    this._createRadiusBlastButton();
    this._setupRadiusBlastButtonListener();
    this._createEndTurnButton();
    this._setupEndTurnButtonListener();
    this.updateActionButtons();
    this.updateEndTurnButtonVisibility();
    tooltipManager.register(
      this.summonOrbsButton,
      'wizard_orb_summoned',
      'Spend 1 mana to place a magic orb. Throw it into enemies to deal damage.'
    );
    tooltipManager.register(
      this.summonHealingOrbsButton,
      'wizard_healing_orb_summoned',
      'Spend 1 mana to place a healing orb. Throw it into an ally to restore 2 HP.'
    );
    tooltipManager.register(
      this.radiusBlastButton,
      'wizard_radius_blast_used',
      'Spend 2 mana to knock back and deal 1 damage to all nearby discs.'
    );
  }

  getDisc() {
    return this.gc.discs.find(d => d.type === 'player' && d.kind === 'Wizard' && !d.dead);
  }

  // ─── Button creation ────────────────────────────────────────────────────────

  _createSummonOrbsButton() {
    if (!this._actionButtonsContainer) return;
    let button = document.getElementById('summon-orbs-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'summon-orbs-button';
      button.dataset.shortcut = '1';
      button.innerHTML = '<kbd>1</kbd> Summon Orb';
      this._actionButtonsContainer.appendChild(button);
    }
    button.style.display = 'none';
    this.summonOrbsButton = button;
  }

  _createSummonHealingOrbsButton() {
    if (!this._actionButtonsContainer) return;
    let button = document.getElementById('summon-healing-orbs-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'summon-healing-orbs-button';
      button.dataset.shortcut = '2';
      button.innerHTML = '<kbd>2</kbd> Healing Orb';
      this._actionButtonsContainer.appendChild(button);
    }
    button.style.display = 'none';
    this.summonHealingOrbsButton = button;
  }

  _createRadiusBlastButton() {
    if (!this._actionButtonsContainer) return;
    let button = document.getElementById('radius-blast-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'radius-blast-button';
      button.dataset.shortcut = '3';
      button.innerHTML = '<kbd>3</kbd> Radius Blast (2 Mana)';
      this._actionButtonsContainer.appendChild(button);
    }
    button.style.display = 'none';
    this.radiusBlastButton = button;
  }

  _createEndTurnButton() {
    if (!this._actionButtonsContainer) return;
    let button = document.getElementById('wizard-end-turn-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'wizard-end-turn-button';
      button.innerHTML = '<kbd>Space</kbd> End Turn';
      this._actionButtonsContainer.appendChild(button);
    }
    button.style.display = 'none';
    this.endTurnButton = button;
  }

  // ─── Button listeners ───────────────────────────────────────────────────────

  _setupSummonOrbsButtonListener() {
    if (this.summonOrbsButton) {
      this.summonOrbsButton.addEventListener('click', this._handleSummonOrbsButtonClick.bind(this));
    }
  }

  _setupSummonHealingOrbsButtonListener() {
    if (this.summonHealingOrbsButton) {
      this.summonHealingOrbsButton.addEventListener('click', this._handleSummonHealingOrbsButtonClick.bind(this));
    }
  }

  _setupRadiusBlastButtonListener() {
    if (this.radiusBlastButton) {
      this.radiusBlastButton.addEventListener('click', this._handleRadiusBlastButtonClick.bind(this));
    }
  }

  _setupEndTurnButtonListener() {
    if (this.endTurnButton) {
      this.endTurnButton.addEventListener('click', this._handleEndTurnButtonClick.bind(this));
    }
  }

  // ─── Button handlers ────────────────────────────────────────────────────────

  _handleSummonOrbsButtonClick() {
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    if (!currentDisc || currentDisc.kind !== 'Wizard' || currentDisc.dead) return;
    if (this.mana > 0) {
      const success = this.summonSingleOrb(currentDisc);
      if (success) {
        firstTimeEvents.track('wizard_orb_summoned');
        this.mana--;
        if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(currentDisc);
      }
    }
    this.updateActionButtons();
  }

  _handleSummonHealingOrbsButtonClick() {
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    if (!currentDisc || currentDisc.kind !== 'Wizard' || currentDisc.dead) return;
    if (this.mana > 0) {
      const success = this.summonHealingOrb(currentDisc);
      if (success) {
        firstTimeEvents.track('wizard_healing_orb_summoned');
        this.mana--;
        if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(currentDisc);
      }
    }
    this.updateActionButtons();
  }

  _handleRadiusBlastButtonClick() {
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    if (!currentDisc || currentDisc.kind !== 'Wizard' || currentDisc.dead) return;
    if (this.mana >= 2) {
      firstTimeEvents.track('wizard_radius_blast_used');
      this.castRadiusBlast(currentDisc);
    }
  }

  async _handleEndTurnButtonClick() {
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    if (currentDisc && currentDisc.kind === 'Wizard' && !currentDisc.dead) {
      await this.gc._proceedToNextPlayerTurn();
    }
  }

  // ─── Visibility updates ─────────────────────────────────────────────────────

  updateActionButtons() {
    this._updateSummonOrbsButtonVisibility();
    this._updateSummonHealingOrbsButtonVisibility();
    this._updateRadiusBlastButtonVisibility();
    if (this.gc.uiManager) this.gc.uiManager.updateMoveStatusChip(this.gc.currentDisc);
  }

  _updateSummonOrbsButtonVisibility() {
    if (!this.summonOrbsButton) return;
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const activeOrbsCount = this.orbs.filter(orb => orb && orb.hitPoints > 0 && !orb.dead).length;
    const shouldBeVisible = !!(currentDisc &&
      currentDisc.kind === 'Wizard' &&
      currentDisc.type === 'player' &&
      !currentDisc.dead &&
      !this.gc.gameOverState.active &&
      this.mana > 0 &&
      activeOrbsCount < 3);
    this.summonOrbsButton.style.display = shouldBeVisible ? 'inline-block' : 'none';
    this.summonOrbsButton.disabled = !shouldBeVisible;
  }

  _updateSummonHealingOrbsButtonVisibility() {
    if (!this.summonHealingOrbsButton) return;
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const activeOrbsCount = this.orbs.filter(orb => orb && orb.hitPoints > 0 && !orb.dead).length;
    const shouldBeVisible = !!(currentDisc &&
      currentDisc.kind === 'Wizard' &&
      currentDisc.type === 'player' &&
      !currentDisc.dead &&
      !this.gc.gameOverState.active &&
      this.mana > 0 &&
      activeOrbsCount < 3);
    this.summonHealingOrbsButton.style.display = shouldBeVisible ? 'inline-block' : 'none';
    this.summonHealingOrbsButton.disabled = !shouldBeVisible;
  }

  _updateRadiusBlastButtonVisibility() {
    if (!this.radiusBlastButton) return;
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const shouldBeVisible = !!(currentDisc &&
      currentDisc.kind === 'Wizard' &&
      currentDisc.type === 'player' &&
      !currentDisc.dead &&
      !this.gc.gameOverState.active &&
      this.mana >= 2);
    this.radiusBlastButton.style.display = shouldBeVisible ? 'inline-block' : 'none';
    this.radiusBlastButton.disabled = !shouldBeVisible;
  }

  updateEndTurnButtonVisibility() {
    if (!this.endTurnButton) return;
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const shouldBeVisible = !!(currentDisc &&
      currentDisc.type === 'player' &&
      currentDisc.kind === 'Wizard' &&
      !currentDisc.dead &&
      !this.gc.gameOverState.active);
    this.endTurnButton.style.display = shouldBeVisible ? 'inline-block' : 'none';
    this.endTurnButton.disabled = !shouldBeVisible;
  }

  // ─── Spell logic ────────────────────────────────────────────────────────────

  summonSingleOrb(wizardDisc) {
    if (!wizardDisc || wizardDisc.kind !== 'Wizard' || wizardDisc.dead) return false;
    const activeOrbsCount = this.orbs.filter(orb => orb && orb.hitPoints > 0 && !orb.dead).length;
    if (activeOrbsCount >= 3) return false;

    const wizardPos = wizardDisc.mesh.position;
    const distance = 2.0;
    let summoned = false;

    for (let offsetDeg = 0; offsetDeg < 360; offsetDeg += 5) {
      const angle = offsetDeg * (Math.PI / 180);
      const orbX = wizardPos.x + distance * Math.cos(angle);
      const orbZ = wizardPos.z + distance * Math.sin(angle);

      if (this.gc.isPositionValid(orbX, orbZ, 0.35, true, [wizardDisc])) {
        const orb = new Disc(
          0.35, 0.2, 0x00FFFF, orbX, orbZ,
          this.gc.scene, `Wizard's Orb`, 'player', 'Orb',
          1, 0, null, false, 0.5, 0.5, false, false, 1,
          this.gc, this.gc.discDescriptions.Orb
        );
        orb.uniqueOrbId = `orb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        orb.relativeOffset.copy(
          new THREE.Vector3(orbX, 0, orbZ).sub(new THREE.Vector3(wizardPos.x, 0, wizardPos.z))
        );
        this.gc.discs.push(orb);
        this.orbs.push(orb);
        orb.setSpotlightIntensity(true);
        summoned = true;
        break;
      }
    }

    if (summoned) this.gc.updateDiscNames();
    return summoned;
  }

  summonHealingOrb(wizardDisc) {
    if (!wizardDisc || wizardDisc.kind !== 'Wizard' || wizardDisc.dead) return false;
    const activeOrbsCount = this.orbs.filter(orb => orb && orb.hitPoints > 0 && !orb.dead).length;
    if (activeOrbsCount >= 3) return false;

    const wizardPos = wizardDisc.mesh.position;
    const distance = 2.0;
    let summoned = false;

    for (let offsetDeg = 0; offsetDeg < 360; offsetDeg += 5) {
      const angle = offsetDeg * (Math.PI / 180);
      const orbX = wizardPos.x + distance * Math.cos(angle);
      const orbZ = wizardPos.z + distance * Math.sin(angle);

      if (this.gc.isPositionValid(orbX, orbZ, 0.35, true, [wizardDisc])) {
        const orb = new Disc(
          0.35, 0.2, 0xFF0000, orbX, orbZ,
          this.gc.scene, `Healing Orb`, 'player', 'HealingOrb',
          1, 0, null, false, 0.5, 0.5, false, false, 0,
          this.gc, this.gc.discDescriptions.HealingOrb
        );
        orb.uniqueOrbId = `orb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        orb.relativeOffset.copy(
          new THREE.Vector3(orbX, 0, orbZ).sub(new THREE.Vector3(wizardPos.x, 0, wizardPos.z))
        );
        this.gc.discs.push(orb);
        this.orbs.push(orb);
        orb.setSpotlightIntensity(true);
        summoned = true;
        break;
      }
    }

    if (summoned) this.gc.updateDiscNames();
    return summoned;
  }

  removeOrb(orbDisc) {
    if (!orbDisc) return;
    const idx = this.orbs.indexOf(orbDisc);
    if (idx > -1) this.orbs.splice(idx, 1);

    const discIdx = this.gc.discs.indexOf(orbDisc);
    if (discIdx > -1) this.gc.discs.splice(discIdx, 1);

    orbDisc.velocity.set(0, 0, 0);
    orbDisc.moving = false;
    orbDisc.dispose();
    this.updateActionButtons();
    this.gc.updateDiscNames();
  }

  castRadiusBlast(wizardDisc) {
    if (!wizardDisc || wizardDisc.dead || this.mana < 2) return;
    this.mana -= 2;
    this.gc.soundManager.playWizardRadiusBlast(wizardDisc.mesh.position);

    const BLAST_RADIUS = 8;
    const BLAST_FORCE = 3.5;
    const wizardPos = wizardDisc.mesh.position;

    this.gc.discs.forEach(disc => {
      if (disc === wizardDisc || disc.dead) return;
      const dx = disc.mesh.position.x - wizardPos.x;
      const dz = disc.mesh.position.z - wizardPos.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist > 0 && dist <= BLAST_RADIUS) {
        const force = BLAST_FORCE * (1 - dist / BLAST_RADIUS);
        disc.velocity.x += (dx / dist) * force;
        disc.velocity.z += (dz / dist) * force;
        disc.moving = true;
        disc.takeHit(1, wizardDisc);
      }
    });

    this.gc.updateAllDiscDeadStates();
    this.gc.checkGameOverConditions();

    const ringY = wizardDisc.mesh.position.y + 0.1;
    const originX = wizardDisc.mesh.position.x;
    const originZ = wizardDisc.mesh.position.z;
    const RING_DURATION = 0.45;

    for (let i = 0; i < 2; i++) {
      const geometry = new THREE.TorusGeometry(1, 0.03, 8, 64);
      const material = new THREE.MeshBasicMaterial({
        color: 0x88CCFF, transparent: true, opacity: 0.85, side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(originX, ringY, originZ);
      this.gc.scene.add(ring);
      this._radiusBlastRings.push({ mesh: ring, delay: i * 0.15, elapsed: 0, duration: RING_DURATION, maxRadius: BLAST_RADIUS });
    }

    if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(wizardDisc);
    this.updateActionButtons();
  }

  // ─── Per-frame update (called from animate loop) ────────────────────────────

  update(deltaTime) {
    this._updateOrbFollowing();
    this._updateRadiusBlastRings(deltaTime);
  }

  _updateOrbFollowing() {
    const wizardDisc = this.gc.discs.find(d => d.kind === 'Wizard' && d.type === 'player' && !d.dead);
    if (!wizardDisc || this.orbs.length === 0) return;

    const wizardCurrentPos = wizardDisc.mesh.position;
    [...this.orbs].forEach(orbRef => {
      const liveOrb = this.gc.discs.find(d => d.uniqueOrbId === orbRef.uniqueOrbId);
      if (liveOrb && liveOrb.mesh && liveOrb.hitPoints > 0 && !liveOrb.dead && !liveOrb.moving) {
        const targetPosition = wizardCurrentPos.clone().add(liveOrb.relativeOffset);
        targetPosition.y = liveOrb.basePositionY;
        liveOrb.mesh.position.copy(targetPosition);

        if (liveOrb.spotlight) {
          liveOrb.spotlight.position.set(targetPosition.x, liveOrb.spotlight.position.y, targetPosition.z);
        }

        if (this.gc.level && typeof liveOrb.radius === 'number') {
          const r = liveOrb.radius;
          liveOrb.mesh.position.x = Math.max(-this.gc.level.fieldWidth / 2 + r, Math.min(this.gc.level.fieldWidth / 2 - r, liveOrb.mesh.position.x));
          liveOrb.mesh.position.z = Math.max(-this.gc.level.fieldDepth / 2 + r, Math.min(this.gc.level.fieldDepth / 2 - r, liveOrb.mesh.position.z));
        }
      }
    });
  }

  _updateRadiusBlastRings(deltaTime) {
    for (let i = this._radiusBlastRings.length - 1; i >= 0; i--) {
      const r = this._radiusBlastRings[i];
      r.elapsed += deltaTime;
      const activeTime = r.elapsed - r.delay;
      if (activeTime <= 0) continue;

      const t = Math.min(activeTime / r.duration, 1);
      const currentRadius = r.maxRadius * t;
      r.mesh.scale.set(currentRadius, currentRadius, 1);
      r.mesh.material.opacity = 0.85 * (1 - t);

      if (t >= 1) {
        this.gc.scene.remove(r.mesh);
        r.mesh.geometry.dispose();
        r.mesh.material.dispose();
        this._radiusBlastRings.splice(i, 1);
      }
    }
  }

  // ─── Post-throw disc-stopped logic ──────────────────────────────────────────

  async onDiscStopped(disc) {
    if (disc.kind === 'Wizard') {
      this.hasMovedThisTurn = true;
      const activeOrbsCount = this.orbs.filter(orb => orb && orb.hitPoints > 0 && !orb.dead).length;
      const canSummonNewOrbs = this.mana > 0 && activeOrbsCount < 3;

      if (activeOrbsCount === 0 && !canSummonNewOrbs) {
        await this.gc._proceedToNextPlayerTurn();
      } else {
        this.gc.currentDisc = disc;
        this.gc.logCurrentTurn();
        this.gc._updateSpotlights();
        this.gc.barbarianController.updateRageButtonVisibility();
        this.updateActionButtons();
        this.updateEndTurnButtonVisibility();
      }
    } else if (disc.kind === 'Orb' || disc.kind === 'HealingOrb') {
      this.removeOrb(disc);
      const wizardDisc = this.gc.discs.find(d => d.kind === 'Wizard' && d.type === 'player' && !d.dead);

      if (wizardDisc) {
        this.gc.currentDisc = wizardDisc;
        const wizardIndex = this.gc.discs.indexOf(wizardDisc);
        if (wizardIndex !== -1) this.gc.currentTurnIndex = wizardIndex;
        this.gc.logCurrentTurn();
        this.gc._updateSpotlights();
        this.gc.barbarianController.updateRageButtonVisibility();
        this.updateActionButtons();
        this.updateEndTurnButtonVisibility();
        this.gc.barbarianController.updateEndTurnButtonVisibility();

        const activeOrbsAfter = this.orbs.filter(orb => orb && orb.hitPoints > 0 && !orb.dead).length;
        const canSummonAfter = this.mana > 0 && activeOrbsAfter < 3;
        if (activeOrbsAfter === 0 && this.hasMovedThisTurn && !canSummonAfter) {
          await this.gc._proceedToNextPlayerTurn();
        }
      } else {
        await this.gc._proceedToNextPlayerTurn();
      }
    }
  }

  // ─── Turn / level / game lifecycle ──────────────────────────────────────────

  applyEarnedMana() {
    this.mana += this.manaEarnedThisTurn + 1; // +1 passive per turn
    this.manaEarnedThisTurn = 0;
  }

  onTurnEnd() {
    this.hasMovedThisTurn = false;
  }

  onLevelStart() {
    this.hasMovedThisTurn = false;
    this.manaEarnedThisTurn = 0;
    this.orbs = [];
  }

  onGameRestart() {
    this.mana = 3;
    this.manaEarnedThisTurn = 0;
    this.hasMovedThisTurn = false;
    this.orbs = [];
  }
}
