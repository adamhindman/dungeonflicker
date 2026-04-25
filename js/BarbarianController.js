import { firstTimeEvents } from './FirstTimeEvents.js';
import { tooltipManager } from './TooltipManager.js';

export class BarbarianController {
  constructor(gc) {
    this.gc = gc;

    this.rageCharges = 0;
    this.hasMoved = false;
    this.uniqueNPCHitsThisThrow = new Set();

    this.endTurnButton = null;
    this._boundHandleRageButtonClick = null;
    this._actionButtonsContainer = null;
  }

  init(actionButtonsContainer) {
    this._actionButtonsContainer = actionButtonsContainer;
    this._createEndTurnButton();
    this._setupEndTurnButtonListener();
    this._setupRageButtonListener();
    this.updateEndTurnButtonVisibility();
    this.updateRageButtonVisibility();
    tooltipManager.register(
      this.gc.uiManager && this.gc.uiManager.rageButtonElement,
      'barbarian_rage_used',
      'Spend 1 charge to throw with extra force. Earn charges by hitting enemies.'
    );
  }

  getDisc() {
    return this.gc.discs.find(d => d.type === 'player' && d.kind === 'Barbarian' && !d.dead);
  }

  _createEndTurnButton() {
    if (!this._actionButtonsContainer) return;
    let button = document.getElementById('barbarian-end-turn-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'barbarian-end-turn-button';
      button.innerHTML = '<kbd>Space</kbd> End Turn';
      this._actionButtonsContainer.appendChild(button);
    }
    button.style.display = 'none';
    this.endTurnButton = button;
  }

  _setupEndTurnButtonListener() {
    if (this.endTurnButton) {
      this.endTurnButton.addEventListener('click', this._handleEndTurnButtonClick.bind(this));
    }
  }

  async _handleEndTurnButtonClick() {
    if (this.gc.gameOverState.active) return;
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    if (currentDisc && currentDisc.type === 'player' && currentDisc.kind === 'Barbarian' && !currentDisc.dead) {
      await this.gc._proceedToNextPlayerTurn();
    }
  }

  updateEndTurnButtonVisibility() {
    if (!this.endTurnButton) return;
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const shouldBeVisible = !!(currentDisc &&
      currentDisc.type === 'player' &&
      currentDisc.kind === 'Barbarian' &&
      !currentDisc.dead &&
      !this.gc.gameOverState.active);
    this.endTurnButton.style.display = shouldBeVisible ? 'inline-block' : 'none';
    this.endTurnButton.disabled = !shouldBeVisible;
  }

  _handleRageButtonClick() {
    const playerDisc = this.getDisc();
    if (playerDisc && !playerDisc.dead && this.rageCharges >= 2) {
      playerDisc.rageIsActiveForNextThrow = true;
      this.rageCharges -= 2;
      playerDisc.setSpotlightIntensity(true);
      firstTimeEvents.track('barbarian_rage_used');
      if (this.gc.soundManager) {
        this.gc.soundManager.playRage(playerDisc.mesh.position.clone());
      }
    }
    this.updateRageButtonVisibility();
  }

  _setupRageButtonListener() {
    if (!this._boundHandleRageButtonClick) {
      this._boundHandleRageButtonClick = this._handleRageButtonClick.bind(this);
    }
    if (this.gc.uiManager) {
      this.gc.uiManager.setupRageButtonListener(this._boundHandleRageButtonClick);
    }
  }

  updateRageButtonVisibility() {
    if (!this.gc.uiManager) return;
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const visible = !!(currentDisc &&
      currentDisc.type === 'player' &&
      currentDisc.kind === 'Barbarian' &&
      !currentDisc.dead &&
      !currentDisc.rageIsActiveForNextThrow &&
      this.rageCharges >= 2);
    this.gc.uiManager.updateRageButtonVisibility(visible, visible);
    if (currentDisc && currentDisc.kind === 'Barbarian') {
      this.gc.uiManager.updateCurrentTurnDiscName(currentDisc);
    }
  }

  async onDiscStopped(disc) {
    if (disc.dead) {
      await this.gc._proceedToNextPlayerTurn();
      return;
    }
    this.hasMoved = true;
    if (this.rageCharges === 0) {
      await this.gc._proceedToNextPlayerTurn();
    } else {
      disc.hasThrown = false;
      this.updateRageButtonVisibility();
      this.updateEndTurnButtonVisibility();
      if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(disc);
    }
  }

  onNewThrow() {
    this.uniqueNPCHitsThisThrow.clear();
  }

  onTurnEnd() {
    this.hasMoved = false;
  }

  onLevelStart() {
    this.hasMoved = false;
    this.uniqueNPCHitsThisThrow.clear();
  }

  onGameRestart() {
    this.rageCharges = 0;
    this.hasMoved = false;
    this.uniqueNPCHitsThisThrow.clear();
  }
}
