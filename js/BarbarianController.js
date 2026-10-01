import { firstTimeEvents } from './FirstTimeEvents.js';
import { tooltipManager } from './TooltipManager.js';

const HIT_BONUS_DAMAGE = 1;      // a normal hit deals attackDamage + this to every enemy
const RAGE_CHARGE_COST = 3;
const RAGE_FIRST_HIT_DAMAGE = 2; // the opening blow of a Rage
const RAGE_HIT_DAMAGE = 1;       // every hit after it
const WALL_SLAM_DAMAGE = 1;
// Exhausted (the turn after a Rage): no Rage, and throws at this fraction of full power.
const EXHAUSTED_POWER_SCALE = 0.5;

export class BarbarianController {
  constructor(gc) {
    this.gc = gc;

    this.rageCharges = 0;
    this.hasMoved = false;
    // Rampage: once a raged throw is made, Rage stays on for the rest of the
    // turn and every kill banks one more throw.
    this.rampaging = false;
    this.rampageThrows = 0;
    this._rageFirstHitPending = false; // set when a Rage starts; its first hit hits harder
    // Wall Slam: enemies the Barbarian has knocked this throw that haven't
    // hit a wall yet.
    this._slamTargets = new Set();

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
      'Spend 3 charges to Rage before you throw: a mighty throw that strikes enemies again and again, 1 damage per hit. Every kill earns another throw and 1 HP. Afterwards you are Exhausted for a turn. Earn charges by killing enemies and by taking hits.'
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
    if (!this.gc.canEndTurnNow()) return;
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
    if (playerDisc && !playerDisc.dead && !playerDisc.exhausted && !this.hasMoved && this.rageCharges >= RAGE_CHARGE_COST) {
      playerDisc.rageIsActiveForNextThrow = true;
      this.rageCharges -= RAGE_CHARGE_COST;
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
      !currentDisc.exhausted &&
      !this.hasMoved &&
      this.rageCharges >= RAGE_CHARGE_COST);
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
    this._slamTargets.clear();
    if (this.rampaging && this.rampageThrows > 0 && !this.gc.roundWon) {
      // Rampage: a banked kill buys another raged throw.
      this.rampageThrows--;
      disc.hasThrown = false;
      disc.rageIsActiveForNextThrow = true;
      disc.setSpotlightIntensity(true);
      this.updateRageButtonVisibility();
      this.updateEndTurnButtonVisibility();
      this.gc.updateDiscNames();
      if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(disc);
    } else {
      await this.gc._proceedToNextPlayerTurn();
    }
  }

  /** Called as the Barbarian is thrown (after Rage has been applied to the throw). */
  onNewThrow(disc) {
    this._slamTargets.clear();
    if (disc.rageWasUsedThisThrow && !this.rampaging) {
      this.rampaging = true;
      this._rageFirstHitPending = true;
    }
  }

  /**
   * Damage of one Barbarian hit: a flat attackDamage + HIT_BONUS_DAMAGE to
   * every enemy (it no longer grows with each enemy in the throw), but while raging the Rage's first hit deals RAGE_FIRST_HIT_DAMAGE and
   * every later one a flat RAGE_HIT_DAMAGE (Rampage's extra throws are
   * strong enough).
   */
  hitDamage(barbarian) {
    if (barbarian.rageWasUsedThisThrow) {
      if (this._rageFirstHitPending) {
        this._rageFirstHitPending = false;
        return RAGE_FIRST_HIT_DAMAGE;
      }
      return RAGE_HIT_DAMAGE;
    }
    return barbarian.attackDamage + HIT_BONUS_DAMAGE;
  }

  /** The Barbarian takes damage: any hit, however hard, earns 1 Rage charge. */
  onHitTaken() {
    this.rageCharges++;
    this.updateRageButtonVisibility();
  }

  /** Scale on `disc`'s maximum throw power: lower while the Barbarian is Exhausted. */
  throwPowerScale(disc) {
    return disc.kind === 'Barbarian' && disc.exhausted ? EXHAUSTED_POWER_SCALE : 1;
  }

  /**
   * The Barbarian killed an enemy: 1 Rage charge, or while Rampaging,
   * 1 HP and one more throw instead (Rage burns charges, it never refunds them).
   */
  onKill(barbarian) {
    if (!this.rampaging) {
      this.rageCharges++;
    } else {
      this.rampageThrows++;
      barbarian.restoreHealth(1);
      this.gc.updateDiscNames();
      if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(this.gc.currentDisc);
    }
  }

  /** The Barbarian's throw struck `npc`: arm a Wall Slam on it. */
  onEnemyStruck(npc) {
    if (npc.type === 'NPC' && !npc.dead) this._slamTargets.add(npc);
  }

  /** `disc` bounced off a wall or obstacle; slam it if the Barbarian knocked it there. */
  onWallBounce(disc) {
    if (!this._slamTargets.delete(disc) || disc.dead || disc.hitPoints <= 0) return;
    const barbarian = this.gc.currentDisc;
    if (!barbarian || barbarian.kind !== 'Barbarian') return;
    disc.takeHit(WALL_SLAM_DAMAGE, barbarian);
    if (disc.hitPoints <= 0 && !this.gc.npcsKilledForRageCharge.has(disc.discName)) {
      this.gc.npcsKilledForRageCharge.add(disc.discName);
      this.onKill(barbarian);
    }
    this.gc.updateDiscNames();
    this.updateRageButtonVisibility();
  }

  onTurnEnd() {
    this.hasMoved = false;
    this._slamTargets.clear();
    const disc = this.getDisc();
    const endingOwnTurn = this.gc.discs[this.gc.currentTurnIndex]?.kind === 'Barbarian';
    if (this.rampaging) {
      // Rage was spent on this turn's throws; any banked throws are lost,
      // and he is Exhausted for his next turn.
      // (Rage armed but never thrown carries over to the next turn.)
      if (disc) {
        disc.rageIsActiveForNextThrow = false;
        disc.exhausted = true;
        disc.setSpotlightIntensity(false);
      }
    } else if (endingOwnTurn && disc?.exhausted) {
      disc.exhausted = false; // he has sat out his Exhausted turn
      disc.setSpotlightIntensity(false);
    }
    this.rampaging = false;
    this.rampageThrows = 0;
  }

  onLevelStart() {
    this.hasMoved = false;
    this._slamTargets.clear();
  }

  onGameRestart() {
    const disc = this.gc.discs.find(d => d.type === 'player' && d.kind === 'Barbarian');
    if (disc) disc.exhausted = false;
    this.rageCharges = 0;
    this.hasMoved = false;
    this._slamTargets.clear();
    this.rampaging = false;
    this.rampageThrows = 0;
  }
}
