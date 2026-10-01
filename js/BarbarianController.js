import {
  CanvasTexture, DoubleSide, Group, Mesh, MeshBasicMaterial, Plane, PlaneGeometry, SRGBColorSpace, Vector3,
} from 'three';
import { firstTimeEvents } from './FirstTimeEvents.js';
import { tooltipManager } from './TooltipManager.js';

const HIT_BONUS_DAMAGE = 1;      // a normal hit deals attackDamage + this to every enemy
const RAGE_CHARGE_COST = 3;
const RAGE_FIRST_HIT_DAMAGE = 2; // the opening blow of a Rage
const RAGE_HIT_DAMAGE = 1;       // every hit after it
const WALL_SLAM_DAMAGE = 1;
// Exhausted (the turn after a Rage): no Rage, and throws at this fraction of full power.
const EXHAUSTED_POWER_SCALE = 0.5;
// Taunt: costs this much to switch on, then stays on until switched off.
// Enemies whose centre is within TAUNT_RADIUS of his must attack him.
const TAUNT_CHARGE_COST = 1;
const TAUNT_RADIUS = 10;
const TAUNT_GLOW_RGB = [255, 68, 34];
const TAUNT_GLOW_OPACITY = 1;   // overall strength (pulses between 50% and 100% of it)
const TAUNT_GLOW_OUTER = 1.15;  // the glow fades out by this multiple of the radius
const FLOOR_OFFSET = 0.05;

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
    // Taunt aura: on until switched off (or he dies)
    this.taunting = false;
    this._tauntAura = null; // { group, edge, level } — the ring on the floor around him
    this._tauntPulse = 0;

    this.endTurnButton = null;
    this.tauntButton = null;
    this._boundHandleRageButtonClick = null;
    this._actionButtonsContainer = null;
  }

  init(actionButtonsContainer) {
    this._actionButtonsContainer = actionButtonsContainer;
    const rageButton = this.gc.uiManager?.rageButtonElement;
    if (rageButton) rageButton.dataset.shortcut = '1';
    this._createTauntButton();
    this._createEndTurnButton();
    this._setupEndTurnButtonListener();
    this._setupRageButtonListener();
    this.updateEndTurnButtonVisibility();
    this.updateRageButtonVisibility();
    tooltipManager.register(
      rageButton,
      'barbarian_rage_used',
      'Spend 3 charges to Rage before you throw: a mighty throw that strikes enemies again and again, 1 damage per hit. Every kill earns another throw and 1 HP. Afterwards you are Exhausted for a turn. Earn charges by killing enemies and by taking hits.'
    );
    tooltipManager.register(
      this.tauntButton,
      'barbarian_taunt_used',
      () => this.taunting
        ? 'Stop taunting. Turning it off is free.'
        : 'Spend 1 charge to Taunt: enemies inside the red ring must attack you. It stays on until you turn it off.'
    );
  }

  _createTauntButton() {
    if (!this._actionButtonsContainer) return;
    let button = document.getElementById('barbarian-taunt-button');
    if (!button) {
      button = document.createElement('button');
      button.id = 'barbarian-taunt-button';
      button.dataset.shortcut = '2';
      button.addEventListener('click', () => this.toggleTaunt());
      this._actionButtonsContainer.appendChild(button);
    }
    button.style.display = 'none';
    this.tauntButton = button;
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
    this._updateTauntButton(currentDisc);
    if (currentDisc && currentDisc.kind === 'Barbarian') {
      this.gc.uiManager.updateCurrentTurnDiscName(currentDisc);
    }
  }

  /** Taunt button: on his turn, shown while taunting (to stop) or when he can afford it. */
  _updateTauntButton(currentDisc) {
    if (!this.tauntButton) return;
    const myTurn = !!(currentDisc && currentDisc.type === 'player' && currentDisc.kind === 'Barbarian' &&
      !currentDisc.dead && !this.gc.gameOverState?.active);
    const visible = myTurn && (this.taunting || this.rageCharges >= TAUNT_CHARGE_COST);
    this.tauntButton.style.display = visible ? 'inline-block' : 'none';
    this.tauntButton.disabled = !visible;
    this.tauntButton.innerHTML = this.taunting ? '<kbd>2</kbd> Stop Taunting' : '<kbd>2</kbd> Taunt';
  }

  /** Switches Taunt on (for TAUNT_CHARGE_COST charges) or off (free), on his turn. */
  toggleTaunt() {
    const disc = this.getDisc();
    if (!disc || this.gc.currentDisc !== disc) return;
    if (this.taunting) {
      this.taunting = false;
    } else if (this.rageCharges >= TAUNT_CHARGE_COST) {
      this.rageCharges -= TAUNT_CHARGE_COST;
      this.taunting = true;
      firstTimeEvents.track('barbarian_taunt_used');
      this.gc.soundManager?.playRage(disc.mesh.position.clone());
    } else {
      return;
    }
    this._syncTauntAura();
    this.updateRageButtonVisibility();
    this.gc.updateDiscNames();
  }

  /**
   * The Barbarian, if `enemy` is inside his Taunt and so must attack him;
   * otherwise null. A phased (Ghost Ring) Barbarian can't be attacked, so
   * his Taunt has no pull meanwhile.
   */
  taunterFor(enemy) {
    if (!this.taunting || !enemy || enemy.type !== 'NPC') return null;
    const barbarian = this.getDisc();
    if (!barbarian || barbarian.isGhost) return null;
    return enemy.mesh.position.distanceTo(barbarian.mesh.position) <= TAUNT_RADIUS ? barbarian : null;
  }

  /** Per frame: keep the Taunt ring under him, gently pulsing. */
  update(deltaTime) {
    if (this.taunting && !this.getDisc()) this.taunting = false; // he died
    this._syncTauntAura();
    const aura = this._tauntAura;
    if (!aura) return;
    const disc = this.getDisc();
    const { x, y, z } = disc.mesh.position;
    aura.group.position.set(x, y - disc.basePositionY + FLOOR_OFFSET, z);
    this._tauntPulse += deltaTime;
    aura.glow.material.opacity = TAUNT_GLOW_OPACITY * (0.75 + 0.25 * Math.sin(this._tauntPulse * 3));
  }

  /** Shows the Taunt ring while taunting, rebuilt for each room (it's clipped to the room's walls). */
  _syncTauntAura() {
    const level = this.gc.level;
    const want = this.taunting && !!this.getDisc();
    if (this._tauntAura && (!want || this._tauntAura.level !== level)) {
      this._disposeTauntAura();
    }
    if (want && !this._tauntAura && level) {
      this._tauntAura = this._makeTauntAura(level);
      this.gc.scene.add(this._tauntAura.group);
    }
  }

  _makeTauntAura(level) {
    const hw = level.fieldWidth / 2, hd = level.fieldDepth / 2;
    const clippingPlanes = [
      new Plane(new Vector3(1, 0, 0), hw),
      new Plane(new Vector3(-1, 0, 0), hw),
      new Plane(new Vector3(0, 0, 1), hd),
      new Plane(new Vector3(0, 0, -1), hd),
    ];
    const size = TAUNT_RADIUS * TAUNT_GLOW_OUTER * 2;
    const glow = new Mesh(
      new PlaneGeometry(size, size),
      new MeshBasicMaterial({
        map: this._tauntGlowTexture(), transparent: true, opacity: TAUNT_GLOW_OPACITY,
        side: DoubleSide, depthWrite: false, clippingPlanes,
      }),
    );
    const group = new Group();
    group.add(glow);
    group.rotation.x = -Math.PI / 2;
    group.renderOrder = 1;
    return { group, glow, level };
  }

  /**
   * A soft radial glow: faint in the middle, swelling towards the Taunt's
   * edge, then fading out just past it (no hard line).
   */
  _tauntGlowTexture() {
    const px = 256;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = px;
    const ctx = canvas.getContext('2d');
    const c = px / 2;
    const edge = 1 / TAUNT_GLOW_OUTER; // the Taunt radius, as a fraction of the texture radius
    const [r, g, b] = TAUNT_GLOW_RGB;
    const rgba = a => `rgba(${r}, ${g}, ${b}, ${a})`;
    const gradient = ctx.createRadialGradient(c, c, 0, c, c, c);
    gradient.addColorStop(0, rgba(0.02));
    gradient.addColorStop(edge * 0.6, rgba(0.04));
    gradient.addColorStop(edge * 0.88, rgba(0.16));
    gradient.addColorStop(edge, rgba(0.3));
    gradient.addColorStop(1, rgba(0));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, px, px);
    const texture = new CanvasTexture(canvas);
    texture.colorSpace = SRGBColorSpace;
    return texture;
  }

  _disposeTauntAura() {
    const aura = this._tauntAura;
    if (!aura) return;
    this.gc.scene.remove(aura.group);
    aura.group.traverse(o => { o.geometry?.dispose(); o.material?.map?.dispose(); o.material?.dispose(); });
    this._tauntAura = null;
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
    this.taunting = false;
    this._disposeTauntAura();
    this.rageCharges = 0;
    this.hasMoved = false;
    this._slamTargets.clear();
    this.rampaging = false;
    this.rampageThrows = 0;
  }
}
