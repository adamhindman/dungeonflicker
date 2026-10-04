import Disc from './Disc.js';
import { firstTimeEvents } from './FirstTimeEvents.js';
import { tooltipManager } from './TooltipManager.js';

const BOMB_CHARGE_COST = 2;
const SNEAK_ATTACK_CHARGE_COST = 2;
const POTION_CHARGE_COST = 1;

// Sneak Attack: hide this turn; if the Rogue deals no damage for the rest of
// the turn it stays hidden (enemies target anyone else first) until the end of
// its next turn, when its own throws strike from hiding.
const SNEAK_BASE_DAMAGE = 3;          // a hit from hiding: triple the Rogue's normal hit…
                                      // …plus 1 per wall/obstacle bounce before it
const SNEAK_BOUNCE_DEBOUNCE_MS = 80;  // one wall contact can register on two colliders
const SNEAK_COLOR = 0xb388ff;
const SNEAK_LABEL_COLOR = '#c9a6ff';
// After the bomb goes off and everything it threw has stopped, wait this long
// before the next turn, so the next disc's move doesn't look like part of the blast.
const BOMB_AFTERMATH_PAUSE_MS = 500;

export class RogueController {
  constructor(gc) {
    this.gc = gc;

    this.charges = 0;
    this.throwsRemaining = 2;

    this.bomb = null;
    this.potions = [];

    this.hideState = 'none';             // 'none' | 'hiding' (this turn) | 'hidden' (until end of next turn)
    this._revealAfterThrow = false;      // hit an enemy during a strike throw: reveal once it stops
    this.isSneakAttackThrow = false;     // the Rogue throw in flight is striking from hiding
    this.sneakAttackBonusCount = 0;      // wall/obstacle bounces so far in that throw
    this._lastSneakBounceAt = 0;

    this.bombButton = null;
    this.sneakAttackButton = null;
    this.potionButton = null;
    this.endTurnButton = null;
    this._actionButtonsContainer = null;
  }

  init(actionButtonsContainer) {
    this._actionButtonsContainer = actionButtonsContainer;
    this._createBombButton();
    this._createSneakAttackButton();
    this._createPotionButton();
    this._createEndTurnButton();
    this.updateActionButtons();
    tooltipManager.register(
      this.bombButton,
      'rogue_bomb_used',
      'Spend 2 charges to place a timed bomb that explodes at the end of your turn.'
    );
    tooltipManager.register(
      this.sneakAttackButton,
      'rogue_sneak_attack_used',
      () => this._sneakTooltip()
    );
    tooltipManager.register(
      this.potionButton,
      'rogue_potion_used',
      'Spend 1 charge to throw a healing potion that restores 2 HP to the first injured ally it touches.'
    );
  }

  getDisc() {
    return this.gc.discs.find(d => d.type === 'player' && d.kind === 'Rogue' && !d.dead);
  }

  // ─── Button creation ─────────────────────────────────────────────────────────

  _createBombButton() {
    if (!this._actionButtonsContainer) return;
    let button = document.getElementById('rogue-bomb-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'rogue-bomb-button';
      button.dataset.shortcut = '1';
      this._actionButtonsContainer.appendChild(button);
    }
    button.style.display = 'none';
    button.addEventListener('click', () => this._handleBombClick());
    this.bombButton = button;
  }

  _createSneakAttackButton() {
    if (!this._actionButtonsContainer) return;
    let button = document.getElementById('rogue-sneak-attack-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'rogue-sneak-attack-button';
      button.dataset.shortcut = '2';
      this._actionButtonsContainer.appendChild(button);
    }
    button.style.display = 'none';
    button.addEventListener('click', () => this._handleSneakAttackClick());
    this.sneakAttackButton = button;
  }

  _createPotionButton() {
    if (!this._actionButtonsContainer) return;
    let button = document.getElementById('rogue-potion-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'rogue-potion-button';
      button.dataset.shortcut = '3';
      this._actionButtonsContainer.appendChild(button);
    }
    button.style.display = 'none';
    button.addEventListener('click', () => this._handlePotionClick());
    this.potionButton = button;
  }

  _createEndTurnButton() {
    if (!this._actionButtonsContainer) return;
    let button = document.getElementById('rogue-end-turn-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'rogue-end-turn-button';
      button.innerHTML = '<kbd>Space</kbd> End Turn';
      this._actionButtonsContainer.appendChild(button);
    }
    button.style.display = 'none';
    button.addEventListener('click', () => this._handleEndTurnClick());
    this.endTurnButton = button;
  }

  // ─── Button handlers ─────────────────────────────────────────────────────────

  async _handleEndTurnClick() {
    if (!this.gc.canEndTurnNow() || this._endingTurn) return;
    const disc = this.getDisc();
    if (!disc || disc.dead) return;
    this._endingTurn = true; // a second click during the bomb's aftermath mustn't end another turn
    try {
      await this._detonatePendingBomb();
      await this.gc._proceedToNextPlayerTurn();
    } finally {
      this._endingTurn = false;
    }
  }

  /** Sets off the bomb, if one is out, and waits for its aftermath to finish. */
  async _detonatePendingBomb() {
    if (!this.bomb || this.bomb.dead) return;
    this._explodeBomb();
    await this.gc._waitForCrusherFlingToSettle();
    await new Promise(resolve => setTimeout(resolve, BOMB_AFTERMATH_PAUSE_MS));
  }

  _handleBombClick() {
    const rogueDisc = this.getDisc();
    if (!rogueDisc || rogueDisc.dead || this.charges < BOMB_CHARGE_COST || this.bomb) return;
    const spawned = this._spawnBomb(rogueDisc);
    if (spawned) {
      this.charges -= BOMB_CHARGE_COST;
      firstTimeEvents.track('rogue_bomb_used');
      this.updateActionButtons();
      if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(rogueDisc);
    }
  }

  _handleSneakAttackClick() {
    const rogueDisc = this._rogueWhoseTurnItIs();
    if (!rogueDisc || this.charges < SNEAK_ATTACK_CHARGE_COST) return;
    if (this.hideState !== 'none') return;
    this.hideState = 'hiding';
    rogueDisc.isHidden = true;
    this.charges -= SNEAK_ATTACK_CHARGE_COST;
    firstTimeEvents.track('rogue_sneak_attack_used');
    if (this.gc.uiManager) this.gc.uiManager.showFloatingLabel(rogueDisc, 'Hidden', SNEAK_LABEL_COLOR);
    this.updateActionButtons();
    if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(rogueDisc);
  }

  _handlePotionClick() {
    const rogueDisc = this.getDisc();
    if (!rogueDisc || rogueDisc.dead || this.charges < POTION_CHARGE_COST) return;
    const spawned = this._spawnPotion(rogueDisc);
    if (spawned) {
      this.charges -= POTION_CHARGE_COST;
      firstTimeEvents.track('rogue_potion_used');
      this.updateActionButtons();
      if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(rogueDisc);
    }
  }

  // ─── Ability spawning ─────────────────────────────────────────────────────────

  _spawnBomb(rogueDisc) {
    const roguePos = rogueDisc.mesh.position;
    const distance = 2.0;
    for (let offsetDeg = 0; offsetDeg < 360; offsetDeg += 5) {
      const angle = offsetDeg * (Math.PI / 180);
      const bx = roguePos.x + distance * Math.cos(angle);
      const bz = roguePos.z + distance * Math.sin(angle);
      if (this.gc.isPositionValid(bx, bz, 0.5, true, [rogueDisc])) {
        const bomb = new Disc(
          0.5, 0.3, 0xFF6600, bx, bz,
          this.gc.scene, 'Bomb', 'player', 'Bomb',
          99, 0, null, false, 0.45, 0.05, false, false, 0,
          this.gc, this.gc.discDescriptions.Bomb
        );
        this.gc.discs.push(bomb);
        this.bomb = bomb;
        bomb.setSpotlightIntensity(true);
        this.gc.updateDiscNames();
        return true;
      }
    }
    return false;
  }

  _spawnPotion(rogueDisc) {
    const roguePos = rogueDisc.mesh.position;
    const distance = 2.0;
    for (let offsetDeg = 0; offsetDeg < 360; offsetDeg += 5) {
      const angle = offsetDeg * (Math.PI / 180);
      const px = roguePos.x + distance * Math.cos(angle);
      const pz = roguePos.z + distance * Math.sin(angle);
      if (this.gc.isPositionValid(px, pz, 0.4, true, [rogueDisc])) {
        const potion = new Disc(
          0.4, 0.3, 0xFF0000, px, pz,
          this.gc.scene, 'Health Potion', 'player', 'RoguePotion',
          1, 0, null, false, 0.5, 1.0, false, false, 0,
          this.gc, this.gc.discDescriptions.RoguePotion
        );
        this.gc.discs.push(potion);
        this.potions.push(potion);
        potion.setSpotlightIntensity(true);
        this.gc.updateDiscNames();
        return true;
      }
    }
    return false;
  }

  // ─── Bomb explosion ───────────────────────────────────────────────────────────

  _explodeBomb() {
    if (!this.bomb) return;
    const EXPLODE_RADIUS = 4;
    const EXPLODE_FORCE = 2.8;
    const EXPLODE_DAMAGE = 2;
    const bombPos = this.bomb.mesh.position.clone();
    let chargesEarnedFromBombKills = 0;

    this.gc.discs.forEach(disc => {
      if (disc === this.bomb || disc.dead) return;
      if (disc.kind === 'RoguePotion') return;
      if (!disc.mesh) return;
      const dx = disc.mesh.position.x - bombPos.x;
      const dz = disc.mesh.position.z - bombPos.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (!Number.isFinite(dist)) return;
      // Use edge-distance so large discs are only affected when their body is
      // actually inside the blast radius.
      const edgeDist = Math.max(0, dist - (disc.radius || 0));
      if (edgeDist <= EXPLODE_RADIUS) {
        if (this.gc.itemManager?.shieldBlocks(disc, bombPos.x, bombPos.z)) return; // Hardy Shield
        const wasAliveNpc = disc.type === 'NPC' && disc.hitPoints > 0 && !disc.dead;
        disc.takeHit(EXPLODE_DAMAGE, this.bomb);
        if (wasAliveNpc && disc.hitPoints <= 0 && !this.gc.npcsKilledForRageCharge.has(disc.discName)) {
          this.gc.npcsKilledForRageCharge.add(disc.discName);
          chargesEarnedFromBombKills++;
        }
        if (dist > 0) {
          const force = EXPLODE_FORCE * Math.max(0, 1 - edgeDist / EXPLODE_RADIUS);
          disc.velocity.x += (dx / dist) * force;
          disc.velocity.z += (dz / dist) * force;
          if (force > 0.0001) disc.moving = true;
        }
      }
    });

    if (chargesEarnedFromBombKills > 0) {
      this.charges += chargesEarnedFromBombKills;
      this.updateActionButtons();
      if (this.gc.barbarianController) this.gc.barbarianController.updateRageButtonVisibility();
    }

    this.gc.explosionParticles.spawn(bombPos);
    this._removeBomb();

    this.gc.updateAllDiscDeadStates();
    this.gc.checkGameOverConditions();
    if (this.gc.soundManager) this.gc.soundManager.playRogueGrenadeExplode(bombPos);
    if (this.gc.uiManager && this.gc.currentDisc) {
      this.gc.uiManager.updateCurrentTurnDiscName(this.gc.currentDisc);
    }
  }

  _removeBomb() {
    if (!this.bomb) return;
    const idx = this.gc.discs.indexOf(this.bomb);
    if (idx !== -1) this.gc.discs.splice(idx, 1);
    this.bomb.velocity.set(0, 0, 0);
    this.bomb.moving = false;
    this.bomb.dispose();
    this.bomb = null;
    this.gc.updateDiscNames();
  }

  // ─── Potion removal ───────────────────────────────────────────────────────────

  removePotion(potion) {
    if (!potion) return;
    const pi = this.potions.indexOf(potion);
    if (pi !== -1) this.potions.splice(pi, 1);
    const di = this.gc.discs.indexOf(potion);
    if (di !== -1) this.gc.discs.splice(di, 1);
    potion.velocity.set(0, 0, 0);
    potion.moving = false;
    potion.hitPoints = 0;
    if (!potion.dead) potion.die();
    potion.dispose();
    this.gc.updateDiscNames();
  }

  onPotionDied(potion) {
    const pi = this.potions.indexOf(potion);
    if (pi !== -1) this.potions.splice(pi, 1);
    const di = this.gc.discs.indexOf(potion);
    if (di !== -1) this.gc.discs.splice(di, 1);
    this.gc.updateDiscNames();
  }

  _hasLiveBomb() {
    return !!(this.bomb && !this.bomb.dead);
  }

  _hasLivePotion() {
    return this.potions.some(p => p && !p.dead && p.hitPoints > 0);
  }

  _hasRemainingTurnActions() {
    const rogueDisc = this.getDisc();
    const rogueAlive = !!(rogueDisc && !rogueDisc.dead);
    const canThrowRogue = rogueAlive && this.throwsRemaining > 0;
    const hasThrowableSubDisc = this._hasLiveBomb() || this._hasLivePotion();
    const canSpawnBombOrPotion = rogueAlive && this.charges >= POTION_CHARGE_COST;
    return canThrowRogue || hasThrowableSubDisc || canSpawnBombOrPotion;
  }

  // ─── Post-throw disc-stopped logic ───────────────────────────────────────────

  async onDiscStopped(disc) {
    // Sneak Attack throw over; hitting an enemy with it revealed the Rogue.
    if (disc.kind === 'Rogue' && this.isSneakAttackThrow) {
      this.isSneakAttackThrow = false;
      this.sneakAttackBonusCount = 0;
      disc.setSpotlightIntensity(disc === this.gc.currentDisc);
    }
    if (this._revealAfterThrow) this._reveal();

    // If the Rogue died, end turn immediately
    if (disc.dead && disc.kind === 'Rogue') {
      await this._detonatePendingBomb();
      await this.gc._proceedToNextPlayerTurn();
      return;
    }

    // Consumed potion: clean up then count the throw
    if (disc.kind === 'RoguePotion' && disc.hitPoints <= 0) {
      this.removePotion(disc);
    }

    // Only Rogue disc throws consume the Rogue's move count.
    if (disc.kind === 'Rogue') {
      this.throwsRemaining = Math.max(0, this.throwsRemaining - 1);
    }

    if (this._hasRemainingTurnActions()) {
      const rogueDisc = this.getDisc();
      if (rogueDisc && !rogueDisc.dead) {
        this.gc.currentDisc = rogueDisc;
        const rogueIndex = this.gc.discs.indexOf(rogueDisc);
        if (rogueIndex !== -1) this.gc.currentTurnIndex = rogueIndex;
        if (this.throwsRemaining > 0) {
          // Allow the Rogue disc itself to be thrown again while moves remain.
          rogueDisc.hasThrown = false;
        }
      }
      this.updateActionButtons();
      if (this.gc.uiManager && rogueDisc) {
        this.gc.uiManager.updateCurrentTurnDiscName(rogueDisc);
      }
      return;
    }

    // No actions left — end turn (bomb explodes first)
    await this._detonatePendingBomb();
    await this.gc._proceedToNextPlayerTurn();
  }

  // ─── Turn lifecycle ───────────────────────────────────────────────────────────

  onNewThrow(thrownDisc) {
    if (thrownDisc.kind !== 'Rogue') return;
    // Hidden since the end of a previous turn: this turn's Rogue throws strike from hiding.
    if (this.hideState === 'hidden') {
      this.isSneakAttackThrow = true;
      this.sneakAttackBonusCount = 0;
      this._lastSneakBounceAt = 0;
    }
  }

  /** Called for every turn end (anyone's); gc.currentTurnIndex is still the turn that is ending. */
  onTurnEnd() {
    const ending = this.gc.discs[this.gc.currentTurnIndex];
    if (ending && ending.kind === 'Rogue' && ending.type === 'player') {
      if (this.hideState === 'hidden') {
        this._reveal();                  // the strike turn is over
      } else if (this.hideState === 'hiding') {
        this.hideState = 'hidden';       // dealt no damage since hiding: stays hidden until its next turn ends
      }
    }
    this.isSneakAttackThrow = false;
    this.sneakAttackBonusCount = 0;
    this._revealAfterThrow = false;
    [this.bombButton, this.sneakAttackButton, this.potionButton, this.endTurnButton].forEach(btn => {
      if (btn) btn.style.display = 'none';
    });
  }

  // ─── Sneak Attack ─────────────────────────────────────────────────────────────

  /** The living Rogue disc if it is currently the Rogue's turn, else null. */
  _rogueWhoseTurnItIs() {
    const disc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    return disc && disc.type === 'player' && disc.kind === 'Rogue' && !disc.dead && !this.gc.gameOverState.active
      ? disc : null;
  }

  /**
   * Called by Disc.takeHit whenever the Rogue (disc, bomb or knife) deals
   * damage. Damage before hiding doesn't matter; damage after pressing Sneak
   * Attack on the hiding turn cancels it. While striking from hiding, it
   * reveals the Rogue (after the current throw, so one ricochet can still hit
   * several enemies).
   */
  onDamageDealt() {
    if (!this._rogueWhoseTurnItIs()) return;
    if (this.hideState === 'hiding') {
      this._reveal();
    } else if (this.hideState === 'hidden') {
      if (this.isSneakAttackThrow && this.gc.thrownDisc && this.gc.thrownDisc.kind === 'Rogue') {
        this._revealAfterThrow = true;
      } else {
        this._reveal();
      }
    }
  }

  _reveal() {
    const wasHidden = this.hideState !== 'none';
    this.hideState = 'none';
    this._revealAfterThrow = false;
    const rogueDisc = this.gc.discs.find(d => d.type === 'player' && d.kind === 'Rogue');
    if (rogueDisc) {
      rogueDisc.isHidden = false;
      if (wasHidden && !rogueDisc.dead && this.gc.uiManager) {
        this.gc.uiManager.showFloatingLabel(rogueDisc, 'Revealed', SNEAK_LABEL_COLOR);
      }
    }
    this.updateActionButtons();
  }

  /** Damage dealt to each enemy a strike-from-hiding throw hits. */
  sneakAttackDamage() {
    return SNEAK_BASE_DAMAGE + this.sneakAttackBonusCount;
  }

  /** A wall/obstacle bounce during a Sneak Attack throw: +1 damage, a floating "+N" and a brighter glow. */
  onSneakBounce(disc) {
    const now = performance.now();
    if (now - this._lastSneakBounceAt < SNEAK_BOUNCE_DEBOUNCE_MS) return;
    this._lastSneakBounceAt = now;
    this.sneakAttackBonusCount++;
    if (this.gc.uiManager) this.gc.uiManager.showFloatingLabel(disc, `+${this.sneakAttackBonusCount}`, SNEAK_LABEL_COLOR);
    if (disc.spotlight) {
      disc.spotlight.color.setHex(SNEAK_COLOR);
      disc.spotlight.intensity = 80 + 60 * this.sneakAttackBonusCount;
      disc.spotlight.distance = 25;
    }
  }

  _sneakTooltip() {
    const cost = `${SNEAK_ATTACK_CHARGE_COST} charges`;
    if (this.hideState === 'hiding') {
      return 'Hidden. Deal no damage for the rest of this turn to stay hidden until the end of your next turn.';
    }
    if (this.hideState === 'hidden') {
      return `Striking from hiding: each enemy your Rogue hits takes ${SNEAK_BASE_DAMAGE} damage, ` +
        '+1 for every wall or obstacle bounce before it. Hitting an enemy reveals you.';
    }
    return `Spend ${cost} to hide. If you deal no damage for the rest of this turn, enemies target ` +
      `others first, and on your next turn each enemy your Rogue hits takes ${SNEAK_BASE_DAMAGE} damage, ` +
      '+1 for every wall or obstacle bounce before the hit.';
  }

  onRoundEnd() {
    const rogueDisc = this.getDisc();
    if (rogueDisc && !rogueDisc.dead) {
      this.charges++;
      this.updateActionButtons();
    }
  }

  onLevelStart() {
    this.throwsRemaining = 2;
    this.bomb = null;
    this.potions = [];
    this._resetSneak();
  }

  /** Clears all Sneak Attack state (new room or new game; discs are rebuilt, so hiding ends). */
  _resetSneak() {
    this.hideState = 'none';
    this._revealAfterThrow = false;
    this.isSneakAttackThrow = false;
    this.sneakAttackBonusCount = 0;
  }

  onGameRestart() {
    this.charges = 0;
    this.throwsRemaining = 2;
    this.bomb = null;
    this.potions = [];
    this._resetSneak();
  }

  // ─── UI ──────────────────────────────────────────────────────────────────────

  updateActionButtons() {
    const currentDisc = this.gc.currentTurnIndex !== -1 ? this.gc.discs[this.gc.currentTurnIndex] : null;
    const isRogueTurn = !!(currentDisc &&
      currentDisc.type === 'player' &&
      currentDisc.kind === 'Rogue' &&
      !currentDisc.dead &&
      !this.gc.gameOverState.active);

    if (this.bombButton) {
      const canBomb = isRogueTurn && this.charges >= BOMB_CHARGE_COST && !this.bomb;
      this.bombButton.style.display = isRogueTurn ? 'inline-block' : 'none';
      this.bombButton.disabled = !canBomb;
      this.bombButton.innerHTML = '<kbd>1</kbd> Bomb';
    }

    if (this.sneakAttackButton) {
      const canSneak = isRogueTurn &&
        this.hideState === 'none' &&
        this.charges >= SNEAK_ATTACK_CHARGE_COST;
      this.sneakAttackButton.style.display = isRogueTurn ? 'inline-block' : 'none';
      this.sneakAttackButton.disabled = !canSneak;
      this.sneakAttackButton.innerHTML = '<kbd>2</kbd> Sneak Attack';
    }

    if (this.potionButton) {
      const canPotion = isRogueTurn && this.charges >= POTION_CHARGE_COST;
      this.potionButton.style.display = isRogueTurn ? 'inline-block' : 'none';
      this.potionButton.disabled = !canPotion;
      this.potionButton.innerHTML = '<kbd>3</kbd> Potion';
    }

    if (this.endTurnButton) {
      this.endTurnButton.style.display = isRogueTurn ? 'inline-block' : 'none';
      this.endTurnButton.disabled = !isRogueTurn;
    }

    if (this.gc.uiManager && this.gc.currentDisc && this.gc.currentDisc.kind === 'Rogue') {
      this.gc.uiManager.updateCurrentTurnDiscName(this.gc.currentDisc);
    }
  }

  // ─── Per-frame update ─────────────────────────────────────────────────────────

  update(deltaTime) {
    // A dead Rogue can't stay hidden.
    if (this.hideState !== 'none' && !this.getDisc()) this._reveal();
  }
}
