import * as THREE from 'three';
import Disc from './Disc.js';
import { firstTimeEvents } from './FirstTimeEvents.js';
import { tooltipManager } from './TooltipManager.js';

const BOMB_CHARGE_COST = 2;
const SNEAK_ATTACK_CHARGE_COST = 1;
const POTION_CHARGE_COST = 1;

export class RogueController {
  constructor(gc) {
    this.gc = gc;

    this.charges = 0;
    this.throwsRemaining = 2;

    this.bomb = null;
    this.potions = [];

    this.isSneakAttackThrow = false;
    this.sneakAttackPending = false;
    this.sneakAttackBonusCount = 0;

    this.bombButton = null;
    this.sneakAttackButton = null;
    this.potionButton = null;
    this.endTurnButton = null;
    this._actionButtonsContainer = null;

    this._explosionParticles = [];
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
      'Spend 1 charge to empower your next Rogue throw. Each collision during that throw increases damage.'
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
    if (this.gc.gameOverState.active) return;
    const disc = this.getDisc();
    if (!disc || disc.dead) return;
    if (this.bomb && !this.bomb.dead) this._explodeBomb();
    await this.gc._proceedToNextPlayerTurn();
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
    const rogueDisc = this.getDisc();
    if (!rogueDisc || rogueDisc.dead || this.charges < SNEAK_ATTACK_CHARGE_COST) return;
    if (this.sneakAttackPending || this.isSneakAttackThrow) return;
    this.sneakAttackPending = true;
    this.charges -= SNEAK_ATTACK_CHARGE_COST;
    firstTimeEvents.track('rogue_sneak_attack_used');
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
          0.4, 0.3, 0x44FF88, px, pz,
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
      const dx = disc.mesh.position.x - bombPos.x;
      const dz = disc.mesh.position.z - bombPos.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      const effectiveBlastRadius = EXPLODE_RADIUS + (disc.radius || 0);
      if (dist <= effectiveBlastRadius) {
        const wasAliveNpc = disc.type === 'NPC' && disc.hitPoints > 0 && !disc.dead;
        disc.takeHit(EXPLODE_DAMAGE, this.bomb);
        if (wasAliveNpc && disc.hitPoints <= 0 && !this.gc.npcsKilledForRageCharge.has(disc.discName)) {
          this.gc.npcsKilledForRageCharge.add(disc.discName);
          chargesEarnedFromBombKills++;
        }
        if (dist > 0) {
          const force = EXPLODE_FORCE * (1 - dist / EXPLODE_RADIUS);
          disc.velocity.x += (dx / dist) * force;
          disc.velocity.z += (dz / dist) * force;
          disc.moving = true;
        }
      }
    });

    if (chargesEarnedFromBombKills > 0) {
      this.charges += chargesEarnedFromBombKills;
      this.updateActionButtons();
      if (this.gc.barbarianController) this.gc.barbarianController.updateRageButtonVisibility();
    }

    this._spawnExplosionParticles(bombPos);
    this._removeBomb();

    this.gc.updateAllDiscDeadStates();
    this.gc.checkGameOverConditions();
    if (this.gc.soundManager) this.gc.soundManager.playRogueGrenadeExplode(bombPos);
    if (this.gc.uiManager && this.gc.currentDisc) {
      this.gc.uiManager.updateCurrentTurnDiscName(this.gc.currentDisc);
    }
  }

  _spawnExplosionParticles(pos) {
    const COUNT = 36;
    const colors = [0xFF6600, 0xFF3300, 0xFF9900, 0xFFCC00, 0xFF4400, 0xFFAA00];
    for (let i = 0; i < COUNT; i++) {
      const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.3;
      const speed = 3.5 + Math.random() * 5.5;
      const geo = new THREE.SphereGeometry(0.14 + Math.random() * 0.2, 5, 4);
      const mat = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 1.0,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      this.gc.scene.add(mesh);
      this._explosionParticles.push({
        mesh, material: mat, geometry: geo,
        vx: Math.cos(angle) * speed * (0.6 + Math.random() * 0.8),
        vy: 2.5 + Math.random() * 5.5,
        vz: Math.sin(angle) * speed * (0.6 + Math.random() * 0.8),
        elapsed: 0,
        duration: 0.55 + Math.random() * 0.5,
      });
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
    // Reset sneak attack state when Rogue disc stops
    if (disc.kind === 'Rogue' && this.isSneakAttackThrow) {
      this.isSneakAttackThrow = false;
      this.sneakAttackBonusCount = 0;
    }

    // If the Rogue died, end turn immediately
    if (disc.dead && disc.kind === 'Rogue') {
      if (this.bomb && !this.bomb.dead) this._explodeBomb();
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
    if (this.bomb && !this.bomb.dead) this._explodeBomb();
    await this.gc._proceedToNextPlayerTurn();
  }

  // ─── Turn lifecycle ───────────────────────────────────────────────────────────

  onNewThrow(thrownDisc) {
    if (thrownDisc.kind !== 'Rogue') return;
    if (this.sneakAttackPending) {
      this.isSneakAttackThrow = true;
      this.sneakAttackBonusCount = 0;
      this.sneakAttackPending = false;
    }
  }

  onTurnEnd() {
    this.isSneakAttackThrow = false;
    this.sneakAttackPending = false;
    this.sneakAttackBonusCount = 0;
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
    this.isSneakAttackThrow = false;
    this.sneakAttackPending = false;
    this.sneakAttackBonusCount = 0;
  }

  onGameRestart() {
    this.charges = 0;
    this.throwsRemaining = 2;
    this.bomb = null;
    this.potions = [];
    this.isSneakAttackThrow = false;
    this.sneakAttackPending = false;
    this.sneakAttackBonusCount = 0;
    this._cleanupParticles();
  }

  _cleanupParticles() {
    for (const p of this._explosionParticles) {
      this.gc.scene.remove(p.mesh);
      p.geometry.dispose();
      p.material.dispose();
    }
    this._explosionParticles = [];
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
        this.throwsRemaining > 0 &&
        this.charges >= SNEAK_ATTACK_CHARGE_COST &&
        !this.sneakAttackPending &&
        !this.isSneakAttackThrow;
      this.sneakAttackButton.style.display = isRogueTurn ? 'inline-block' : 'none';
      this.sneakAttackButton.disabled = !canSneak;
      this.sneakAttackButton.innerHTML = this.sneakAttackPending
        ? `<kbd>2</kbd> Sneak Attack (READY)`
        : `<kbd>2</kbd> Sneak Attack`;
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
    const GRAVITY = 9.8;
    const toRemove = [];
    for (const p of this._explosionParticles) {
      p.elapsed += deltaTime;
      if (p.elapsed >= p.duration) { toRemove.push(p); continue; }
      const t = p.elapsed / p.duration;
      p.mesh.position.x += p.vx * deltaTime;
      p.mesh.position.y += (p.vy - GRAVITY * p.elapsed) * deltaTime;
      p.mesh.position.z += p.vz * deltaTime;
      p.material.opacity = 1.0 - t;
    }
    for (const p of toRemove) {
      this.gc.scene.remove(p.mesh);
      p.geometry.dispose();
      p.material.dispose();
      const idx = this._explosionParticles.indexOf(p);
      if (idx !== -1) this._explosionParticles.splice(idx, 1);
    }
  }
}
