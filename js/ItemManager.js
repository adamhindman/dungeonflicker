// js/ItemManager.js
// Items bought in the Sanctuary shop: the catalog, each character's inventory,
// the action-bar buttons for owned items, and the item behaviours.
//
// Inventories are keyed by character kind, so they carry over between rooms
// (discs are rebuilt each room). A dead character's items are set aside; the
// Necromancer's Resurrect Ally returns them, the Big Golden Orb does not.

import {
  AdditiveBlending, BackSide, Box3, CylinderGeometry, DoubleSide, Group, Mesh, MeshBasicMaterial,
  Plane, TorusGeometry, Vector3,
} from 'three';
import Disc from './Disc.js';
import { firstTimeEvents } from './FirstTimeEvents.js';
import { tooltipManager } from './TooltipManager.js';
import {
  KNIFE_BLADE_THICKNESS, KNIFE_STEEL, SHIELD_THICKNESS, makeKnifeBlade, makeKnifeHandle, makeShieldMesh,
} from './ItemModels.js';
import { getResource, formatAmount, isMainPC, resurrectAlly } from './PartyResources.js';

export const GHOST_OPACITY = 0.55;

/**
 * Every item the shop can offer. `cost` is the purchase price, `color` is the
 * item's unique colour (a ring's gem), and `model` picks its shop display.
 * A character can own each item once, except `stackable` items (potions),
 * which they can buy any number of; the inventory then holds a count.
 */
export const ITEMS = {
  warpRing: {
    name: 'Warp Ring',
    cost: 1,
    useCost: 1,
    color: 0xff1fd2, // hot magenta
    model: 'ring',
    description: 'Instantly jump to any open spot in the room. Each use costs 1 mana. ' +
      'Can be used before or after moving.',
    // Shown once when bought (see ItemHelpDialog): how to use it, step by step.
    helpIntro: 'An amethyst gem that throbs with unearthly power.',
    help: [
      'After activating, click anywhere in the room to instantly teleport there.',
      'Each jump costs 1 mana. Use it before or after your move.',
      'Have fun',
    ],
  },
  ghostRing: {
    name: 'Ghost Ring',
    cost: 3,
    color: 0x00e5ff, // electric cyan
    model: 'ring',
    description: 'Toggle on to pass through discs and obstacles, taking and dealing no damage. ' +
      'Turning it on costs 1 HP and 1 mana, and it costs the same again at the ' +
      'start of each of your turns while it stays on. Turning it off is free; it switches ' +
      'off by itself when you run out of mana.',
    helpIntro: 'In your ghost form, you pass safely through enemies, friends, and obstacles ' +
      'without taking or dealing damage.',
    help: [
      'Turning it on costs 1 hit point and 1 mana every round.',
      'Turning it off is free.',
      'Be careful not to remain a ghost too long.',
    ],
  },
  throwingKnife: {
    name: 'Throwing Knife',
    cost: 3,
    damage: 1,
    color: 0x7dff1f, // acid green
    model: 'knife',
    description: 'Ready the knife beside you, then flick it at an enemy for 1 damage. One throw per ' +
      'turn, on top of your normal move. It can\'t be destroyed and enemies pass over it; move ' +
      'over it to pick it back up. It returns to you when you leave the room.',
    helpIntro: 'A crude weapon from a gnarlier age.',
    help: [
      'Ready your knife by pressing <kbd>8</kbd>, then drag the knife to fling it.',
      'It deals 1 damage to the first enemy it hits, without bouncing.',
      'Move over the knife to pick it back up.',
    ],
  },
  hardyShield: {
    name: 'Hardy Shield',
    cost: 3,
    color: 0xff8c1a, // blaze orange
    model: 'shield',
    description: 'A steel shield that stands beside you and faces a fixed direction. Discs bounce ' +
      'off it, and it blocks blasts and explosions coming from its side. On your turn, click it ' +
      '(or press 9) to move it to one of its other two spots for free.',
    helpIntro: 'A notched and scarred slab of very heavy metal, probably from a meteor or something.',
    help: [
      'Blocks all incoming damage from a single direction, but you can\'t deal damage by ' +
        'charging in that direction either.',
      'Click the shield (or press <kbd>9</kbd>) to reposition it around yourself on your turn.',
    ],
  },
  healingPotion: {
    name: 'Healing',
    cost: 2,
    heal: 3,
    stackable: true,
    color: 0xff2e4d, // the Healing Orb's red
    model: 'healingFlask',
    description: 'A potion. Drink on your turn to restore 3 HP (up to your maximum). Drinking it doesn\'t use ' +
      'your move. Buy as many as you like; they stack.',
    helpIntro: 'A round flask of something red and faintly warm.',
    help: [
      'Press <kbd>0</kbd> (or click the Healing button) on your turn to drink one and restore 3 HP.',
      'It doesn\'t use your move, and the button shows how many you have left.',
    ],
  },
  resurrectionPotion: {
    name: 'Resurrection',
    cost: 3,
    stackable: true,
    color: 0xffc83d, // the Big Golden Orb's gold
    model: 'resurrectionFlask',
    description: 'A potion. On your turn, ready the flask beside you and flick it at a fallen ally: ' +
      'the first one it touches comes back with half their HP, just like the Necromancer\'s ' +
      'Resurrect Ally, and takes their turn right after yours. A flask that misses shatters. ' +
      'Throwing it doesn\'t use your move. Buy as many as you like; they stack.',
    helpIntro: 'A tall flask of liquid gold that hums when the dead are near.',
    help: [
      'Press <kbd>5</kbd> (or click the Resurrection button) on your turn to ready a flask beside you.',
      'Drag the flask to flick it at a fallen ally. It passes over everything else.',
      'The ally returns with half their HP and acts right after you. A miss shatters the flask.',
    ],
  },
};

/** True if segment P1–P2 crosses segment Q1–Q2 (all in the XZ plane). */
function segmentsCross(p1x, p1z, p2x, p2z, q1x, q1z, q2x, q2z) {
  const cross = (ax, az, bx, bz, cx, cz) => (bx - ax) * (cz - az) - (bz - az) * (cx - ax);
  const d1 = cross(q1x, q1z, q2x, q2z, p1x, p1z);
  const d2 = cross(q1x, q1z, q2x, q2z, p2x, p2z);
  const d3 = cross(p1x, p1z, p2x, p2z, q1x, q1z);
  const d4 = cross(p1x, p1z, p2x, p2z, q2x, q2z);
  return d1 * d2 < 0 && d3 * d4 < 0;
}

/** firstTimeEvents key for an item's first use; its tooltip shows on hover until then. */
const itemUsedEvent = itemId => `item_${itemId}_used`;

const WARP_RING_KEY = '6';
const GHOST_RING_KEY = '7';
const KNIFE_KEY = '8';
const SHIELD_KEY = '9';
const HEALING_POTION_KEY = '0';
const RESURRECTION_POTION_KEY = '5';

// Hardy Shield spots: world directions around its owner, 120° apart. 0° is
// north (−Z, away from the default camera), then south-east and south-west.
const SHIELD_SLOT_ANGLES = [0, 120, 240].map(deg => deg * Math.PI / 180);
const SHIELD_GAP = 0.35;            // between the owner's edge and the shield's inner face
const SHIELD_LENGTH_FACTOR = 1.8;   // shield length as a multiple of the owner's radius
const SHIELD_RESTITUTION = 0.8;     // same bounciness as walls
const SHIELD_GHOST_OPACITY = 0.3;
const SHIELD_GHOST_HOVER_OPACITY = 0.6;
// The owner's own summoned discs pass through their shield so they can be thrown past it.
const OWN_SUB_DISC_KINDS = {
  Wizard: ['Orb', 'HealingOrb'],
  Rogue: ['Bomb', 'RoguePotion'],
  Necromancer: ['AnimatedDead'],
};

const KNIFE_RADIUS = 0.45;        // collision size (the blade's point reaches a little further)
const KNIFE_READY_DISTANCE = 2;   // how far from its owner a readied knife waits
const FLASK_RADIUS = 0.4;          // a readied/thrown Resurrection flask's collision size
const FLASK_READY_DISTANCE = 2;    // how far from its owner a readied flask waits

// Teleport beams: same shape as the turn-start beam (tall, open, drawn from the
// inside) plus a bright additive core. Timings in seconds.
const BEAM_HEIGHT = 200;
const SHAFT_OPACITY = 0.45;
const CORE_OPACITY = 0.85;
const VANISH_DELAY = 0.12;     // disc stays visible inside the beam for a moment
const RISE_DURATION = 0.4;     // origin beam shoots up into the sky
const DESCEND_DELAY = 0.3;     // destination beam starts falling
const DESCEND_DURATION = 0.2;
const LAND_HOLD = 0.1;         // beam holds at full brightness after landing
const LAND_FADE_DURATION = 0.45;

export class ItemManager {
  constructor(gc) {
    this.gc = gc;
    this.inventories = {};           // kind → { [itemId]: true } for each owned item
    this._setAside = {};             // kind → items of a dead character, until resurrection
    this.teleportTargetingActive = false;
    this._teleportRing = null;
    this._teleportTarget = new Vector3();
    this._teleportTargetValid = false;
    this._teleport = null;           // in-flight teleport effect state
    this._buttonStateKey = '';
    this.warpRingButton = null;
    this.ghostRingButton = null;
    this.knifeButton = null;
    this._knives = {};               // kind → { disc, landed } while the knife is out of its owner's hand
    this._knifeThrownBy = new Set(); // kinds that have thrown their knife this turn
    this._turnHeldForKnife = false;  // an automatic turn end is waiting on a readied knife
    this.shieldButton = null;
    this.healingPotionButton = null;
    this.resurrectionPotionButton = null;
    this._flasks = {};               // kind → { disc, thrown } while a Resurrection flask is out
    this._shieldSlots = {};          // kind → chosen spot (index into SHIELD_SLOT_ANGLES); kept between rooms
    this._shields = {};              // kind → { mesh, owner } while the owner is alive in this room
    this.shieldMoveActive = false;   // choosing a new spot for the current character's shield
    this._shieldMove = null;         // { kind, ghosts: [{ slot, mesh }], hovered, ignoreNextClick }
  }

  init(actionButtonsContainer) {
    this.warpRingButton = this._createButton(actionButtonsContainer, 'warp-ring-button', WARP_RING_KEY,
      'warpRing', () => this.startTeleportTargeting());
    this.ghostRingButton = this._createButton(actionButtonsContainer, 'ghost-ring-button', GHOST_RING_KEY,
      'ghostRing', () => this.toggleGhostRing());
    this.knifeButton = this._createButton(actionButtonsContainer, 'knife-button', KNIFE_KEY,
      'throwingKnife', () => this.toggleKnife());
    this.shieldButton = this._createButton(actionButtonsContainer, 'shield-button', SHIELD_KEY,
      'hardyShield', () => this.startShieldMove());
    this.healingPotionButton = this._createButton(actionButtonsContainer, 'healing-potion-button',
      HEALING_POTION_KEY, 'healingPotion', () => this.drinkHealingPotion());
    this.resurrectionPotionButton = this._createButton(actionButtonsContainer, 'resurrection-potion-button',
      RESURRECTION_POTION_KEY, 'resurrectionPotion', () => this.toggleResurrectionFlask());
  }

  /**
   * Orders the action bar as: every character's skill buttons, then the item
   * buttons, then the End Turn buttons (each character has its own, and only
   * the current character's is visible).
   */
  placeButtons(container) {
    if (!container) return;
    container.append(this.warpRingButton, this.ghostRingButton, this.knifeButton, this.shieldButton,
      this.healingPotionButton, this.resurrectionPotionButton);
    const endTurnButtons = [...container.querySelectorAll('button')].filter(b => b.id.includes('end-turn'));
    container.append(...endTurnButtons);
  }

  /**
   * Creates an item's action-bar button. It uses the same hover tooltip as
   * the characters' powers, with text that follows the item's current state
   * (set by _setButton).
   */
  _createButton(container, id, shortcut, itemId, onClick) {
    const button = document.createElement('button');
    button.id = id;
    button.dataset.shortcut = shortcut;
    button.style.display = 'none';
    button.addEventListener('click', onClick);
    tooltipManager.register(button, itemUsedEvent(itemId), () => button.dataset.tooltip || '');
    if (container) container.appendChild(button);
    return button;
  }

  /** Clears every inventory (new game). */
  reset() {
    this.inventories = {};
    this._setAside = {};
    this._shieldSlots = {};
    this.onLevelUnload();
  }

  /**
   * Cancels targeting and in-flight effects, and returns every knife to its
   * owner's hand (the level disposes the knife discs with the rest).
   * Call before the level unloads.
   */
  onLevelUnload() {
    this._flasks = {}; // the level disposes the flask discs with the rest
    this.cancelTeleportTargeting();
    if (this._teleport) {
      this._teleport.pillars.forEach(p => this._disposeMesh(p));
      this._teleport = null;
    }
    this._knives = {};
    this._knifeThrownBy.clear();
    this._turnHeldForKnife = false;
    this.cancelShieldMove();
    for (const kind of Object.keys(this._shields)) this._removeShield(kind);
  }

  getInventory(kind) {
    if (!this.inventories[kind]) this.inventories[kind] = {};
    return this.inventories[kind];
  }

  // ─── Shop support ─────────────────────────────────────────────────────────

  /** Why `buyer` can't buy `itemId` right now, or null if they can. */
  purchaseBlocker(itemId, buyer) {
    if (!isMainPC(buyer) || buyer.dead) return 'Only a living character can buy items.';
    const res = getResource(this.gc, buyer.kind);
    if (!res) return 'Only a living character can buy items.';
    if (!ITEMS[itemId].stackable && this.getInventory(buyer.kind)[itemId]) {
      return `${buyer.discName} already has a ${ITEMS[itemId].name}.`;
    }
    if (res.controller[res.field] < ITEMS[itemId].cost) return `Not enough ${res.units} yet.`;
    return null;
  }

  /**
   * Spends the buyer's own mana/charges and adds the item to their inventory
   * (a stackable item adds 1 to their count).
   */
  purchase(itemId, buyer) {
    if (this.purchaseBlocker(itemId, buyer)) return false;
    const res = getResource(this.gc, buyer.kind);
    res.controller[res.field] -= ITEMS[itemId].cost;
    const inv = this.getInventory(buyer.kind);
    inv[itemId] = ITEMS[itemId].stackable ? (inv[itemId] || 0) + 1 : true;
    this._buttonStateKey = ''; // force a button refresh
    return true;
  }

  /** How many of a stackable item `kind` holds. */
  countOf(kind, itemId) {
    return this.getInventory(kind)[itemId] || 0;
  }

  // ─── Healing Potion ───────────────────────────────────────────────────────

  _potionBlocker(disc) {
    if (disc.hitPoints >= disc.maxHitPoints) return `${disc.discName} is already at full health.`;
    return null;
  }

  /** The current character drinks a Healing Potion: +3 HP (up to max). Doesn't use their move. */
  drinkHealingPotion() {
    const disc = this.activeCharacter();
    if (!disc || this._busy() || this._potionBlocker(disc)) return;
    const inv = this.getInventory(disc.kind);
    if (!inv.healingPotion) return;
    inv.healingPotion -= 1;
    if (inv.healingPotion <= 0) delete inv.healingPotion;
    disc.restoreHealth(ITEMS.healingPotion.heal); // shows its own "+N HP"
    firstTimeEvents.track(itemUsedEvent('healingPotion'));
    this.gc.soundManager?.playPurchase();
    this.gc.updateDiscNames();
    if (this.gc.uiManager) this.gc.uiManager.updateCurrentTurnDiscName(disc);
    this._buttonStateKey = '';
  }

  // ─── Resurrection potion ──────────────────────────────────────────────────
  // Used like the Throwing Knife: readied as a flask beside its owner, then
  // flicked (on top of their normal move). The first fallen ally it touches
  // comes back exactly as with Resurrect Ally; a flask that stops without
  // finding one shatters. Either way the potion is used up once it's thrown.

  /** Fallen party members `disc` could bring back. */
  _fallenAllies(disc) {
    return this.gc.discs.filter(d => isMainPC(d) && d.dead && d !== disc && d.mesh);
  }

  _resurrectionBlocker(disc) {
    return this._fallenAllies(disc).length === 0 ? 'No fallen allies to bring back.' : null;
  }

  /** True if `flaskDisc` is `turnDisc`'s readied Resurrection flask, ready to be flicked. */
  canThrowFlask(flaskDisc, turnDisc) {
    if (!flaskDisc || flaskDisc.kind !== 'ResurrectionFlask' || flaskDisc.owner !== turnDisc) return false;
    const flask = this._flasks[turnDisc.kind];
    return !!(flask && flask.disc === flaskDisc && !flask.thrown);
  }

  /** Readies a Resurrection flask beside the current character, or puts a readied one away (free). */
  toggleResurrectionFlask() {
    const disc = this.activeCharacter();
    if (!disc || this._busy() || !this.countOf(disc.kind, 'resurrectionPotion')) return;
    const flask = this._flasks[disc.kind];
    if (flask && !flask.thrown) {
      this._removeFlask(disc.kind);
    } else if (!flask && !this._resurrectionBlocker(disc)) {
      this._readyFlask(disc);
    }
    this._buttonStateKey = '';
  }

  /** Places a flask disc at the first open spot around its owner. */
  _readyFlask(owner) {
    const { x, z } = owner.mesh.position;
    for (let deg = 0; deg < 360; deg += 5) {
      const a = deg * Math.PI / 180;
      const fx = x + FLASK_READY_DISTANCE * Math.cos(a);
      const fz = z + FLASK_READY_DISTANCE * Math.sin(a);
      if (!this.gc.isPositionValid(fx, fz, FLASK_RADIUS, true, [owner])) continue;

      const disc = new Disc(
        FLASK_RADIUS, 0.2, ITEMS.resurrectionPotion.color, fx, fz,
        this.gc.scene, `${owner.discName}'s Resurrection`, 'item', 'ResurrectionFlask',
        1, 0, null, false, 0.5, 0.5, false, false, 0,
        this.gc, ITEMS.resurrectionPotion.description,
      );
      disc.owner = owner;
      disc.relativeOffset.set(fx - x, 0, fz - z);
      this.gc.discs.push(disc);
      disc.setSpotlightIntensity(false);
      this._flasks[owner.kind] = { disc, thrown: false };
      return true;
    }
    return false;
  }

  /** Takes a flask disc off the field (put away, used, or shattered). */
  _removeFlask(kind) {
    const flask = this._flasks[kind];
    if (!flask) return;
    delete this._flasks[kind];
    const gc = this.gc;
    const index = gc.discs.indexOf(flask.disc);
    if (index > -1) {
      gc.discs.splice(index, 1);
      if (index < gc.currentTurnIndex) gc.currentTurnIndex--;
    }
    if (gc.currentDisc === flask.disc) gc.currentDisc = flask.disc.owner;
    flask.disc.dispose();
    this._buttonStateKey = '';
  }

  /** A readied flask waits beside its owner (and goes away if they die). */
  _updateFlasks() {
    for (const [kind, flask] of Object.entries(this._flasks)) {
      const disc = flask.disc;
      if (flask.thrown || disc.moving) continue;
      if (disc.owner.dead) { this._removeFlask(kind); continue; }
      disc.mesh.position.x = disc.owner.mesh.position.x + disc.relativeOffset.x;
      disc.mesh.position.z = disc.owner.mesh.position.z + disc.relativeOffset.z;
      disc.spotlight.position.set(disc.mesh.position.x, 8, disc.mesh.position.z);
    }
  }

  /** Called by GameController when a flask is flicked: the potion is spent. */
  onFlaskThrown(disc) {
    const flask = this._flasks[disc.owner.kind];
    if (flask) flask.thrown = true;
    const inv = this.getInventory(disc.owner.kind);
    inv.resurrectionPotion = (inv.resurrectionPotion || 1) - 1;
    if (inv.resurrectionPotion <= 0) delete inv.resurrectionPotion;
    firstTimeEvents.track(itemUsedEvent('resurrectionPotion'));
    this._buttonStateKey = '';
  }

  /**
   * Called by PhysicsEngine when a flask in flight touches a disc: a fallen
   * ally comes back (exactly as with Resurrect Ally) and the flask is used up.
   */
  onFlaskHit(disc, target) {
    const gc = this.gc;
    if (disc !== gc.thrownDisc || disc.used) return;
    if (!isMainPC(target) || !target.dead || target === disc.owner) return;
    disc.used = true;
    disc.velocity.set(0, 0, 0);
    disc.moving = false;
    disc.mesh.visible = false; // poured out; removed when GameController sees it stop
    resurrectAlly(gc, disc.owner, target); // half HP, acting right after the owner; items come back
    gc.soundManager?.playTeleport();
    if (gc.uiManager) gc.uiManager.updateCurrentTurnDiscName(disc.owner);
  }

  /** Called by GameController when a thrown flask comes to rest (used, or a miss that shatters). */
  async onFlaskStopped(disc) {
    if (!disc.used) {
      // Missed: the flask shatters where it stopped.
      this.gc.explosionParticles?.spawn(disc.mesh.position.clone(), { count: 12, scale: 0.35 });
      this.gc.soundManager?.playDiscHit(disc.mesh.position.clone());
    }
    this._removeFlask(disc.owner.kind);
    if (this._turnHeldForKnife) {
      // The owner had already finished their move; the flask was the last thing left.
      this._turnHeldForKnife = false;
      await this._endTurnOf(disc.owner);
      return;
    }
    this._returnControlTo(disc.owner);
  }

  /** The count badge on a stackable item's button, in the item's colour. */
  _countBadge(itemId, count) {
    const color = `#${ITEMS[itemId].color.toString(16).padStart(6, '0')}`;
    return `<span class="item-count" style="background:${color}">${count}</span>`;
  }

  // ─── Per-frame update ─────────────────────────────────────────────────────

  update(deltaTime) {
    this._updateTeleportTargeting();
    this._updateTeleportEffect(deltaTime);
    this._dropItemsOfDead();
    this._updateKnives();
    this._updateFlasks();
    this._syncShields();
    this._updateShieldMove();
    this._updateButtons();
  }

  /**
   * A character who dies has their items set aside: the inventory empties, a
   * Ghost Ring switches off, and a knife lying on the floor goes back with the
   * rest (the shield goes via _syncShields). If they come back to life by any
   * means other than the Big Golden Orb (i.e. the Necromancer's Resurrect
   * Ally), the items are returned; the orb discards them (discardSetAside).
   */
  _dropItemsOfDead() {
    for (const disc of this.gc.discs) {
      if (!isMainPC(disc)) continue;
      const inv = this.inventories[disc.kind];
      const setAside = this._setAside[disc.kind];

      if (disc.dead && inv && Object.keys(inv).length > 0) {
        this._setAside[disc.kind] = { ...setAside, ...inv };
        this.inventories[disc.kind] = {};
        disc.isGhost = false;
        this._removeKnife(disc.kind);
        this._buttonStateKey = '';
      } else if (!disc.dead && setAside) {
        Object.assign(this.getInventory(disc.kind), setAside);
        delete this._setAside[disc.kind];
        this._buttonStateKey = '';
      }
    }
  }

  /** The Big Golden Orb's price: a character it resurrects doesn't get their items back. */
  discardSetAside(kind) {
    delete this._setAside[kind];
    delete this._shieldSlots[kind];
  }

  /** The living main character whose turn it is, or null. */
  activeCharacter() {
    const gc = this.gc;
    if (gc.gameOverState.active || gc.levelTransitionInProgress) return null;
    const disc = gc.currentTurnIndex !== -1 ? gc.discs[gc.currentTurnIndex] : null;
    return isMainPC(disc) && !disc.dead ? disc : null;
  }

  /** True while discs are in motion or an item effect is playing. */
  _busy() {
    return !!(this.gc.waitingForDiscToStop || this._teleport || this.teleportTargetingActive || this.shieldMoveActive);
  }

  _updateButtons() {
    const disc = this.activeCharacter();
    const inv = disc ? this.getInventory(disc.kind) : null;
    const busy = this._busy();

    const hasWarp = !!(inv && inv.warpRing);
    const res = disc ? getResource(this.gc, disc.kind) : null;
    const funds = res ? res.controller[res.field] : 0;
    const warpCost = res ? formatAmount(res, ITEMS.warpRing.useCost) : '';
    const warpBlocker = hasWarp && funds < ITEMS.warpRing.useCost ? `Needs ${warpCost}.` : null;

    const hasRing = !!(inv && inv.ghostRing);
    const ghost = !!(disc && disc.isGhost);
    let ringBlocker = null;
    if (hasRing && !busy) ringBlocker = ghost ? this._ghostOffBlocker(disc) : this._ghostOnBlocker(disc);

    const hasKnife = !!(inv && inv.throwingKnife);
    const knifeOut = disc ? this._knives[disc.kind] : null;
    const knifeReady = !!(knifeOut && !knifeOut.landed);
    const knifeBlocker = hasKnife && !knifeReady ? this._knifeBlocker(disc) : null;

    const hasShield = !!(inv && inv.hardyShield && this._shields[disc.kind]);

    const potions = inv ? inv.healingPotion || 0 : 0;
    const potionBlocker = potions > 0 ? this._potionBlocker(disc) : null;

    const revives = inv ? inv.resurrectionPotion || 0 : 0;
    const flaskOut = disc ? this._flasks[disc.kind] : null;
    const flaskReady = !!(flaskOut && !flaskOut.thrown);
    const reviveBlocker = revives > 0 && !flaskReady ? this._resurrectionBlocker(disc) : null;

    // Only touch the DOM when something changed.
    const key = [hasWarp, warpCost, warpBlocker, hasRing, ghost, busy, ringBlocker,
      hasKnife, knifeReady, knifeBlocker, hasShield, potions, potionBlocker,
      revives, flaskReady, reviveBlocker].join('|');
    if (key === this._buttonStateKey) return;
    this._buttonStateKey = key;

    this._setButton(this.warpRingButton, hasWarp, busy || !!warpBlocker,
      `<kbd>${WARP_RING_KEY}</kbd> Warp Ring`,
      warpBlocker || ITEMS.warpRing.description);
    this._setButton(this.ghostRingButton, hasRing, busy || !!ringBlocker,
      `<kbd>${GHOST_RING_KEY}</kbd> Ghost Ring: ${ghost ? 'On' : 'Off'}`,
      ringBlocker || (ghost
        ? 'Turn off the Ghost Ring.'
        : `Turn on the Ghost Ring (costs 1 HP and ${res ? formatAmount(res, 1) : '1 mana'}, then the same each turn).`));
    this._setButton(this.knifeButton, hasKnife, busy || !!knifeBlocker,
      `<kbd>${KNIFE_KEY}</kbd> Knife`,
      knifeBlocker || (knifeReady
        ? 'Put the knife back in your hand.'
        : 'Ready the Throwing Knife beside you, then flick it at an enemy (1 damage).'));
    this._setButton(this.shieldButton, hasShield, busy,
      `<kbd>${SHIELD_KEY}</kbd> Move Shield`,
      'Move the Hardy Shield to one of its other two spots (free). You can also click the shield itself.');
    this._setButton(this.healingPotionButton, potions > 0, busy || !!potionBlocker,
      `<kbd>${HEALING_POTION_KEY}</kbd> Healing ${this._countBadge('healingPotion', potions)}`,
      potionBlocker || `Drink a Healing potion to restore ${ITEMS.healingPotion.heal} HP (doesn't use your move). ` +
        `${potions} left.`);
    this._setButton(this.resurrectionPotionButton, revives > 0, busy || !!reviveBlocker,
      `<kbd>${RESURRECTION_POTION_KEY}</kbd> Resurrection ${this._countBadge('resurrectionPotion', revives)}`,
      reviveBlocker || (flaskReady
        ? 'Put the flask away (free).'
        : 'Ready a Resurrection flask beside you, then flick it at a fallen ally to bring them back ' +
          `with half their HP (doesn't use your move). A miss shatters it. ${revives} left.`));
  }

  _setButton(button, visible, disabled, html, title) {
    if (!button) return;
    button.style.display = visible ? 'inline-block' : 'none';
    button.disabled = !visible || disabled;
    button.innerHTML = html;
    button.dataset.tooltip = title;
  }

  // ─── Ghost Ring ───────────────────────────────────────────────────────────

  _ghostOnBlocker(disc) {
    if (disc.hitPoints <= 1) return 'Needs more than 1 HP to turn on.';
    const res = getResource(this.gc, disc.kind);
    if (!res || res.controller[res.field] < 1) return `Needs ${res ? formatAmount(res, 1) : '1 mana'} to turn on.`;
    return null;
  }

  /** Spends 1 of the disc's own mana/charges (never below 0). */
  _spendOne(disc) {
    const res = getResource(this.gc, disc.kind);
    if (res) res.controller[res.field] = Math.max(0, res.controller[res.field] - 1);
  }

  _funds(disc) {
    const res = getResource(this.gc, disc.kind);
    return res ? res.controller[res.field] : 0;
  }

  /**
   * Ghost Ring upkeep, called by GameController when a turn begins. While the
   * ring is on, the wearer pays 1 HP and 1 mana/charge (the HP loss can kill
   * them). Once they are out of mana/charges the ring switches itself off.
   */
  applyGhostUpkeep(disc) {
    if (!disc || !disc.isGhost || disc.dead) return;
    if (this._funds(disc) > 0) {
      this._spendOne(disc);
      disc.isGhost = false; // let the upkeep damage through the ghost's immunity
      disc.takeHit(1, null);
      if (disc.hitPoints > 0) {
        disc.isGhost = true;
      } else {
        this.gc.updateAllDiscDeadStates();
        if (!this.gc.gameOverState.active) this.gc.checkGameOverConditions();
      }
    }
    if (disc.isGhost && this._funds(disc) <= 0) this._forceGhostOff(disc);
    this.gc.updateDiscNames();
    this.gc._refreshActionUI();
    this._buttonStateKey = '';
  }

  /** Turning the ring off is free; the only thing that blocks it is being inside an obstacle. */
  _ghostOffBlocker(disc) {
    return this._insideObstacle(disc) ? "Can't turn off while inside an obstacle." : null;
  }

  /**
   * Switches the ring off without the player choosing to (out of mana). If the
   * disc is inside an obstacle, it is first moved to the nearest open spot.
   */
  _forceGhostOff(disc) {
    if (this._insideObstacle(disc)) {
      const spot = this._nearestClearSpot(disc);
      if (spot) this._placeDisc(disc, spot);
    }
    disc.isGhost = false;
  }

  /**
   * True if the disc overlaps something inside the room: an obstacle, column,
   * crusher or prop. The room's outer walls don't count; a ghost can't pass
   * through them, so resting against one is normal.
   */
  _insideObstacle(disc) {
    const level = this.gc.level;
    const { x, z } = disc.mesh.position;
    const r = disc.radius - 0.05; // ignore mere touching

    for (const obs of level.obstacles || []) {
      if (obs.type === 'pillar' || obs.type === 'triangle') {
        if (Math.hypot(x - obs.x, z - obs.z) < obs.width / 2 + r) return true;
      } else if (Math.abs(x - obs.x) < obs.width / 2 + r && Math.abs(z - obs.z) < obs.depth / 2 + r) {
        return true;
      }
    }

    const boundary = new Set(level.getAllWalls(true));
    const box = new Box3();
    for (const wall of level.getAllWalls()) {
      if (boundary.has(wall)) continue;
      box.setFromObject(wall);
      const cx = Math.max(box.min.x, Math.min(x, box.max.x));
      const cz = Math.max(box.min.z, Math.min(z, box.max.z));
      if ((cx - x) ** 2 + (cz - z) ** 2 < r * r) return true;
    }
    return false;
  }

  /** Searches outward in rings for the closest spot the disc could sit. */
  _nearestClearSpot(disc) {
    const { x, z } = disc.mesh.position;
    for (let dist = 0.5; dist <= 20; dist += 0.5) {
      const steps = Math.max(8, Math.ceil(dist * 6));
      for (let i = 0; i < steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const px = x + Math.cos(a) * dist;
        const pz = z + Math.sin(a) * dist;
        if (this._isClearSpot(px, pz, disc)) return new Vector3(px, 0, pz);
      }
    }
    return null;
  }

  toggleGhostRing() {
    const disc = this.activeCharacter();
    if (!disc || this._busy() || !this.getInventory(disc.kind).ghostRing) return;
    firstTimeEvents.track(itemUsedEvent('ghostRing'));

    if (disc.isGhost) {
      if (this._ghostOffBlocker(disc)) return;
      disc.isGhost = false;
    } else {
      if (this._ghostOnBlocker(disc)) return;
      // The price of phasing; HP is taken before the disc becomes immune.
      disc.takeHit(1, null);
      this._spendOne(disc);
      disc.isGhost = true;
      this.gc.updateDiscNames();
    }
    this.gc._refreshActionUI();
    this._buttonStateKey = '';
  }

  // ─── Throwing Knife ───────────────────────────────────────────────────────
  //
  // In hand → readied (a disc waiting beside its owner, like a Wizard's orb)
  // → thrown → landed on the floor until the owner moves over it. Knives are
  // discs of type 'item', so turn order, enemy AI, the Blob, the turn list and
  // room-clear checks all ignore them.

  /** Why `disc` can't ready their knife right now, or null if they can. */
  _knifeBlocker(disc) {
    const knife = this._knives[disc.kind];
    if (knife && knife.landed) return 'Your knife is on the floor. Move over it to pick it up.';
    if (this._knifeThrownBy.has(disc.kind)) return 'You already threw your knife this turn.';
    return null;
  }

  /** True if `knifeDisc` is `turnDisc`'s readied knife, ready to be flicked. */
  canThrowKnife(knifeDisc, turnDisc) {
    if (!knifeDisc || knifeDisc.kind !== 'Knife' || knifeDisc.owner !== turnDisc) return false;
    const knife = this._knives[turnDisc.kind];
    return !!(knife && knife.disc === knifeDisc && !knife.landed);
  }

  /** Readies the knife beside its owner, or puts a readied knife away. */
  toggleKnife() {
    const disc = this.activeCharacter();
    if (!disc || this._busy() || !this.getInventory(disc.kind).throwingKnife) return;
    firstTimeEvents.track(itemUsedEvent('throwingKnife'));
    const knife = this._knives[disc.kind];
    if (knife && !knife.landed) {
      this._removeKnife(disc.kind);
    } else if (!this._knifeBlocker(disc)) {
      this._readyKnife(disc);
    }
    this._buttonStateKey = '';
  }

  /** Places a knife disc at the first open spot around its owner. */
  _readyKnife(owner) {
    const { x, z } = owner.mesh.position;
    for (let deg = 0; deg < 360; deg += 5) {
      const a = deg * Math.PI / 180;
      const kx = x + KNIFE_READY_DISTANCE * Math.cos(a);
      const kz = z + KNIFE_READY_DISTANCE * Math.sin(a);
      if (!this.gc.isPositionValid(kx, kz, KNIFE_RADIUS, true, [owner])) continue;

      const disc = new Disc(
        KNIFE_RADIUS, KNIFE_BLADE_THICKNESS, KNIFE_STEEL, kx, kz,
        this.gc.scene, `${owner.discName}'s Knife`, 'item', 'Knife',
        1, 0, null, false, 0.5, 0.5, false, false, ITEMS.throwingKnife.damage,
        this.gc, ITEMS.throwingKnife.description,
      );
      // Swap the round disc body for the triangular blade, and give it its handle.
      const blade = makeKnifeBlade();
      disc.mesh.geometry.dispose();
      disc.mesh.material.dispose();
      disc.mesh.geometry = blade.geometry;
      disc.mesh.material = blade.material;
      disc.knifeHandle = makeKnifeHandle();
      disc.mesh.add(disc.knifeHandle);
      disc.mesh.rotation.y = Math.atan2(kx - x, kz - z); // point away from the owner

      disc.owner = owner;
      disc.relativeOffset.set(kx - x, 0, kz - z);
      this.gc.discs.push(disc);
      disc.setSpotlightIntensity(false);
      this._knives[owner.kind] = { disc, landed: false };
      return true;
    }
    return false;
  }

  /** Takes a knife disc off the field; the knife is back in its owner's hand. */
  _removeKnife(kind) {
    const knife = this._knives[kind];
    if (!knife) return;
    delete this._knives[kind];
    const gc = this.gc;
    const index = gc.discs.indexOf(knife.disc);
    if (index > -1) {
      gc.discs.splice(index, 1);
      if (index < gc.currentTurnIndex) gc.currentTurnIndex--;
    }
    if (gc.currentDisc === knife.disc) gc.currentDisc = knife.disc.owner;
    this._disposeMesh(knife.disc.knifeHandle); // Disc.dispose() only frees the blade itself
    knife.disc.dispose();
    this._buttonStateKey = '';
  }

  /** Readied knives wait beside their owner; landed ones are picked up when the owner touches them. */
  _updateKnives() {
    for (const [kind, knife] of Object.entries(this._knives)) {
      const disc = knife.disc;
      const owner = disc.owner;
      const pos = disc.mesh.position;

      if (disc.moving) {
        // Point along the flight path.
        if (disc.velocity.lengthSq() > 1e-8) disc.mesh.rotation.y = Math.atan2(disc.velocity.x, disc.velocity.z);
        continue;
      }
      if (!knife.landed) {
        if (owner.dead) { this._removeKnife(kind); continue; }
        pos.x = owner.mesh.position.x + disc.relativeOffset.x;
        pos.z = owner.mesh.position.z + disc.relativeOffset.z;
        disc.spotlight.position.set(pos.x, 8, pos.z);
      } else if (!owner.dead && this.gc.thrownDisc !== disc &&
                 Math.hypot(owner.mesh.position.x - pos.x, owner.mesh.position.z - pos.z) < owner.radius + disc.radius) {
        this._removeKnife(kind);
        if (this.gc.soundManager) this.gc.soundManager.playMenuOpen();
      }
    }
  }

  /** Called by GameController when a knife is flicked. */
  onKnifeThrown(disc) {
    const knife = this._knives[disc.owner.kind];
    if (knife) knife.landed = true;
    this._knifeThrownBy.add(disc.owner.kind);
    this._buttonStateKey = '';
  }

  /** Called by PhysicsEngine when a knife in flight touches an enemy: 1 damage, and the knife stops dead. */
  onKnifeHit(disc, target) {
    const gc = this.gc;
    if (disc !== gc.thrownDisc || target.dead || target.kind === 'Fireball') return;
    disc.velocity.set(0, 0, 0);
    disc.moving = false;

    const owner = disc.owner;
    target.takeHit(ITEMS.throwingKnife.damage, owner); // a ghost owner's knife does no damage
    if (gc.soundManager) gc.soundManager.playWardenHit(disc.mesh.position.clone());
    if (target.hitPoints <= 0 && !gc.npcsKilledForRageCharge.has(target.discName)) {
      this._rewardKill(owner);
      gc.npcsKilledForRageCharge.add(target.discName);
    }
    gc.updateAllDiscDeadStates();
    gc.updateDiscNames();
    gc._refreshActionUI();
  }

  /** A knife kill earns the owner the same reward as a kill with their own disc. */
  _rewardKill(owner) {
    const gc = this.gc;
    if (owner.kind === 'Barbarian' && gc.barbarianController) gc.barbarianController.onKill(owner);
    else if (owner.kind === 'Wizard' && gc.wizardController) gc.wizardController.manaEarnedThisTurn += 2;
    else if (owner.kind === 'Necromancer' && gc.necromancerController) gc.necromancerController.manaEarnedThisTurn += 2;
    else if (owner.kind === 'Rogue' && gc.rogueController) gc.rogueController.charges++;
  }

  /** Called by GameController when a thrown knife comes to rest. */
  async onKnifeStopped(disc) {
    const gc = this.gc;
    if (this._turnHeldForKnife) {
      // The owner had already finished their move; the knife was the last thing left.
      this._turnHeldForKnife = false;
      await this._endTurnOf(disc.owner);
      return;
    }
    this._returnControlTo(disc.owner);
  }

  /** Ends the owner's turn the way their End Turn button does (runs any turn-end effects). */
  _endTurnOf(owner) {
    const gc = this.gc;
    const controller = {
      Barbarian: gc.barbarianController,
      Wizard: gc.wizardController,
      Necromancer: gc.necromancerController,
      Rogue: gc.rogueController,
    }[owner.kind];
    const endTurn = controller && (controller._handleEndTurnButtonClick || controller._handleEndTurnClick);
    return endTurn ? endTurn.call(controller) : gc._proceedToNextPlayerTurn();
  }

  /**
   * Called when a turn is about to end on its own after the character's move.
   * If they still have a readied, unthrown knife or Resurrection flask, the
   * turn stays open for it (End Turn still ends it). Returns true if the turn
   * was held.
   */
  holdTurnForReadiedItem() {
    const disc = this.activeCharacter();
    const knife = disc ? this._knives[disc.kind] : null;
    const flask = disc ? this._flasks[disc.kind] : null;
    const knifeReady = !!(knife && !knife.landed);
    const flaskReady = !!(flask && !flask.thrown);
    if (!knifeReady && !flaskReady) return false;
    this._turnHeldForKnife = true;
    this._returnControlTo(disc);
    return true;
  }

  /** Makes `disc` the controlled disc again and refreshes the turn UI. */
  _returnControlTo(disc) {
    const gc = this.gc;
    gc.currentDisc = disc;
    const index = gc.discs.indexOf(disc);
    if (index !== -1) gc.currentTurnIndex = index;
    gc.logCurrentTurn();
    gc._updateSpotlights();
    gc._refreshActionUI();
    gc.barbarianController?.updateEndTurnButtonVisibility();
    gc.wizardController?.updateEndTurnButtonVisibility();
    gc.necromancerController?.updateEndTurnButtonVisibility();
    this._buttonStateKey = '';
  }

  /** Turn over: readied knives go back in hand, and everyone may throw again next turn. */
  onTurnEnd() {
    this._turnHeldForKnife = false;
    this._knifeThrownBy.clear();
    for (const [kind, knife] of Object.entries(this._knives)) {
      if (!knife.landed) this._removeKnife(kind);
    }
    for (const [kind, flask] of Object.entries(this._flasks)) {
      if (!flask.thrown) this._removeFlask(kind); // unthrown: back in the bag, not spent
    }
  }

  // ─── Hardy Shield ─────────────────────────────────────────────────────────
  //
  // A thin steel slab standing beside its owner at one of three spots 120°
  // apart. The spots are fixed world directions: the shield travels with its
  // owner but never turns with them. Other discs bounce off it as if it were
  // part of the owner's body, and it stops blasts coming from its side.

  /** Geometry of a shield at `slot` around `owner`: centre, face normal and tangent (unit XZ vectors). */
  _shieldPose(owner, slot) {
    const a = SHIELD_SLOT_ANGLES[slot];
    const nx = Math.sin(a), nz = -Math.cos(a);          // outward face direction
    const dist = owner.radius + SHIELD_GAP + SHIELD_THICKNESS / 2;
    return {
      x: owner.mesh.position.x + nx * dist,
      z: owner.mesh.position.z + nz * dist,
      nx, nz,
      tx: -nz, tz: nx,                                   // along the shield's length
      halfLength: owner.radius * SHIELD_LENGTH_FACTOR / 2,
      rotationY: Math.PI - a,                            // turns the mesh's local +Z to (nx, nz)
    };
  }

  /** Places a shield mesh (real or ghost) at `slot` around `owner`. */
  _placeShieldMesh(mesh, owner, slot) {
    const pose = this._shieldPose(owner, slot);
    const floor = this.gc.level ? this.gc.level.getTerrainHeightAt(pose.x, pose.z) : 0;
    mesh.position.set(pose.x, floor, pose.z);
    mesh.rotation.y = pose.rotationY;
  }

  /**
   * Keeps a shield beside every living character who owns one, and removes
   * shields whose owner is dead or gone. Runs every frame (and before shield
   * collisions), so shields appear on room entry and after a resurrection.
   */
  _syncShields() {
    const gc = this.gc;
    const owners = new Set();
    for (const disc of gc.discs) {
      if (!isMainPC(disc) || disc.dead || !this.getInventory(disc.kind).hardyShield) continue;
      owners.add(disc.kind);
      let shield = this._shields[disc.kind];
      if (!shield || shield.owner !== disc) {
        if (shield) this._removeShield(disc.kind);
        const mesh = makeShieldMesh(disc.radius * SHIELD_LENGTH_FACTOR, ITEMS.hardyShield.color);
        gc.scene.add(mesh);
        shield = this._shields[disc.kind] = { mesh, owner: disc };
        this._buttonStateKey = '';
      }
      this._placeShieldMesh(shield.mesh, disc, this._shieldSlots[disc.kind] ?? 0);
      // A ghostly owner's shield is ghostly too (it doesn't block anything then).
      const ghostly = !!disc.isGhost;
      shield.mesh.traverse(o => {
        if (!o.material) return;
        o.material.transparent = ghostly;
        o.material.opacity = ghostly ? GHOST_OPACITY : 1;
      });
    }
    for (const kind of Object.keys(this._shields)) {
      if (!owners.has(kind)) this._removeShield(kind);
    }
  }

  _removeShield(kind) {
    const shield = this._shields[kind];
    if (!shield) return;
    delete this._shields[kind];
    this._disposeMesh(shield.mesh);
    if (this._shieldMove && this._shieldMove.kind === kind) this.cancelShieldMove();
    this._buttonStateKey = '';
  }

  /**
   * Bounces discs off every shield. Called by PhysicsEngine after disc-to-disc
   * collisions. A shield acts as part of its owner's body: the impulse is shared
   * with the owner by mass, so a shield hit nudges its owner, and a moving
   * owner shoves discs with their shield. Shield contact never deals damage.
   */
  resolveShieldCollisions() {
    this._syncShields();
    const gc = this.gc;
    for (const shield of Object.values(this._shields)) {
      const owner = shield.owner;
      if (owner.isGhost) continue;
      const pose = this._shieldPose(owner, this._shieldSlots[owner.kind] ?? 0);
      const ownSubKinds = OWN_SUB_DISC_KINDS[owner.kind] || [];

      for (const disc of gc.discs) {
        if (disc === owner || disc.isGhost || !disc.mesh) continue;
        if (ownSubKinds.includes(disc.kind)) continue;
        if (disc.kind === 'Knife' && (disc.owner === owner || !disc.moving)) continue;

        // Circle vs. rectangle, in the shield's own (tangent, normal) frame.
        const dx = disc.mesh.position.x - pose.x;
        const dz = disc.mesh.position.z - pose.z;
        const u = dx * pose.tx + dz * pose.tz;
        const v = dx * pose.nx + dz * pose.nz;
        const cu = Math.max(-pose.halfLength, Math.min(u, pose.halfLength));
        const cv = Math.max(-SHIELD_THICKNESS / 2, Math.min(v, SHIELD_THICKNESS / 2));
        let du = u - cu, dv = v - cv;
        let dist = Math.hypot(du, dv);
        if (dist >= disc.radius) continue;

        let penetration;
        if (dist < 1e-6) {
          // Centre inside the slab: push out through the nearer face.
          du = 0; dv = v >= 0 ? 1 : -1; dist = 1;
          penetration = disc.radius + SHIELD_THICKNESS / 2 - Math.abs(v);
        } else {
          penetration = disc.radius - dist;
        }
        // Contact normal in world space, pointing from the shield to the disc.
        const nx = (du * pose.tx + dv * pose.nx) / dist;
        const nz = (du * pose.tz + dv * pose.nz) / dist;
        disc.mesh.position.x += nx * penetration;
        disc.mesh.position.z += nz * penetration;

        const relVn = (disc.velocity.x - owner.velocity.x) * nx + (disc.velocity.z - owner.velocity.z) * nz;
        if (relVn >= 0) continue; // already separating
        const impulse = -(1 + SHIELD_RESTITUTION) * relVn / (1 / disc.mass + 1 / owner.mass);
        disc.velocity.x += nx * impulse / disc.mass;
        disc.velocity.z += nz * impulse / disc.mass;
        owner.velocity.x -= nx * impulse / owner.mass;
        owner.velocity.z -= nz * impulse / owner.mass;
        disc.moving = true;
        owner.moving = true;
        if (gc.soundManager && relVn < -0.05) gc.soundManager.playWardenHit(disc.mesh.position.clone());
      }
    }
  }

  /**
   * True if `disc`'s own Hardy Shield stands between it and an area attack
   * centred at (sx, sz), i.e. the line from the blast to the disc crosses the shield.
   */
  shieldBlocks(disc, sx, sz) {
    const shield = disc && this._shields[disc.kind];
    if (!shield || shield.owner !== disc || disc.isGhost) return false;
    const pose = this._shieldPose(disc, this._shieldSlots[disc.kind] ?? 0);
    const ax = pose.x - pose.tx * pose.halfLength, az = pose.z - pose.tz * pose.halfLength;
    const bx = pose.x + pose.tx * pose.halfLength, bz = pose.z + pose.tz * pose.halfLength;
    const px = disc.mesh.position.x, pz = disc.mesh.position.z;
    return segmentsCross(sx, sz, px, pz, ax, az, bx, bz);
  }

  /** @returns {object|null} the current character's shield if the ray hits it. */
  pickShield(raycaster) {
    const disc = this.activeCharacter();
    const shield = disc && this._shields[disc.kind];
    if (!shield || disc.isGhost) return null;
    return raycaster.intersectObject(shield.mesh, true).length > 0 ? shield : null;
  }

  /**
   * Shows see-through shields at the other two spots; clicking one moves the
   * shield there (free). Clicking anywhere else, or Esc, cancels.
   * @param {boolean} fromClick - started by clicking the shield, so the same
   *   click's release must not count as choosing a spot
   */
  startShieldMove(fromClick = false) {
    const disc = this.activeCharacter();
    const shield = disc && this._shields[disc.kind];
    if (!shield || this._busy()) return;
    firstTimeEvents.track(itemUsedEvent('hardyShield'));

    const current = this._shieldSlots[disc.kind] ?? 0;
    const ghosts = [];
    for (let slot = 0; slot < SHIELD_SLOT_ANGLES.length; slot++) {
      if (slot === current) continue;
      const mesh = makeShieldMesh(disc.radius * SHIELD_LENGTH_FACTOR, ITEMS.hardyShield.color);
      mesh.traverse(o => {
        if (!o.material) return;
        o.material.transparent = true;
        o.material.opacity = SHIELD_GHOST_OPACITY;
        o.material.depthWrite = false;
      });
      this._placeShieldMesh(mesh, disc, slot);
      this.gc.scene.add(mesh);
      ghosts.push({ slot, mesh });
    }
    this.shieldMoveActive = true;
    this._shieldMove = { kind: disc.kind, owner: disc, ghosts, hovered: null, ignoreNextClick: fromClick };
    this.gc.controlsEnabled = false;
    if (this.gc.controls) this.gc.controls.enabled = false;
    if (this.gc.uiManager) this.gc.uiManager.updateThrowInfo('Click a new spot for the shield  •  Esc to cancel', true);
    this._buttonStateKey = '';
  }

  cancelShieldMove() {
    if (!this.shieldMoveActive) return;
    this._shieldMove.ghosts.forEach(g => this._disposeMesh(g.mesh));
    this._shieldMove = null;
    this.shieldMoveActive = false;
    if (this.gc.renderer) this.gc.renderer.domElement.style.cursor = '';
    this.gc.controlsEnabled = true;
    if (this.gc.controls) this.gc.controls.enabled = true;
    if (this.gc.uiManager) this.gc.uiManager.updateThrowInfo('', false);
    this._buttonStateKey = '';
  }

  /** Called on a click while choosing: moves the shield to the hovered spot, else cancels. */
  confirmShieldMove() {
    const move = this._shieldMove;
    if (!move) return;
    if (move.ignoreNextClick) { move.ignoreNextClick = false; return; }
    if (move.hovered !== null) {
      this._shieldSlots[move.kind] = move.hovered;
      if (this.gc.soundManager) this.gc.soundManager.playWardenHit(move.owner.mesh.position.clone());
    }
    this.cancelShieldMove();
  }

  /** Keeps the spot previews beside the owner and highlights the one under the cursor. */
  _updateShieldMove() {
    const move = this._shieldMove;
    if (!move) return;
    if (move.owner.dead || this.activeCharacter() !== move.owner) { this.cancelShieldMove(); return; }
    const gc = this.gc;
    gc.raycaster.setFromCamera(gc.mouse, gc.camera);
    move.hovered = null;
    for (const g of move.ghosts) {
      this._placeShieldMesh(g.mesh, move.owner, g.slot);
      if (move.hovered === null && gc.raycaster.intersectObject(g.mesh, true).length > 0) move.hovered = g.slot;
    }
    for (const g of move.ghosts) {
      const opacity = g.slot === move.hovered ? SHIELD_GHOST_HOVER_OPACITY : SHIELD_GHOST_OPACITY;
      g.mesh.traverse(o => { if (o.material) o.material.opacity = opacity; });
    }
    gc.renderer.domElement.style.cursor = move.hovered !== null ? 'pointer' : '';
  }

  // ─── Warp Ring ────────────────────────────────────────────────────────────

  _canAffordWarp(disc) {
    const res = getResource(this.gc, disc.kind);
    return !!res && res.controller[res.field] >= ITEMS.warpRing.useCost;
  }

  startTeleportTargeting() {
    const disc = this.activeCharacter();
    if (!disc || this._busy() || !this.getInventory(disc.kind).warpRing || !this._canAffordWarp(disc)) return;
    firstTimeEvents.track(itemUsedEvent('warpRing'));

    this.teleportTargetingActive = true;
    this._teleportDisc = disc;
    const geo = new TorusGeometry(disc.radius, 0.08, 8, 48);
    const mat = new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, side: DoubleSide });
    this._teleportRing = new Mesh(geo, mat);
    this._teleportRing.rotation.x = Math.PI / 2;
    this._teleportRing.position.set(disc.mesh.position.x, 0.1, disc.mesh.position.z);
    this.gc.scene.add(this._teleportRing);

    this.gc.controlsEnabled = false;
    if (this.gc.controls) this.gc.controls.enabled = false;
    if (this.gc.uiManager) this.gc.uiManager.updateThrowInfo('Click an open spot to teleport  •  Esc to cancel', true);
    this._buttonStateKey = '';
  }

  cancelTeleportTargeting() {
    if (!this.teleportTargetingActive) return;
    this.teleportTargetingActive = false;
    this._teleportDisc = null;
    this._disposeMesh(this._teleportRing);
    this._teleportRing = null;
    this.gc.controlsEnabled = true;
    if (this.gc.controls) this.gc.controls.enabled = true;
    if (this.gc.uiManager) this.gc.uiManager.updateThrowInfo('', false);
    this._buttonStateKey = '';
  }

  /** Called on a click while targeting: teleports if the spot is valid. */
  confirmTeleport() {
    if (!this.teleportTargetingActive) return;
    if (!this._teleportTargetValid) return; // keep targeting until a valid spot is clicked
    const disc = this._teleportDisc;
    const target = this._teleportTarget.clone();
    this.cancelTeleportTargeting();
    if (!this._canAffordWarp(disc)) return;

    const res = getResource(this.gc, disc.kind);
    res.controller[res.field] -= ITEMS.warpRing.useCost;
    this.gc._refreshActionUI(); // mana/charge display and skill buttons
    this._startTeleportEffect(disc, target);
  }

  _updateTeleportTargeting() {
    if (!this.teleportTargetingActive || !this._teleportRing) return;
    const gc = this.gc;
    gc.raycaster.setFromCamera(gc.mouse, gc.camera);
    const hit = new Vector3();
    if (!gc.raycaster.ray.intersectPlane(new Plane(new Vector3(0, 1, 0), 0), hit)) return;

    this._teleportTarget.set(hit.x, 0, hit.z);
    this._teleportTargetValid = this._isClearSpot(hit.x, hit.z, this._teleportDisc);
    this._teleportRing.position.set(hit.x, gc.level.getTerrainHeightAt(hit.x, hit.z) + 0.1, hit.z);
    this._teleportRing.material.color.setHex(this._teleportTargetValid ? 0xffffff : 0xff4444);
  }

  /** A white light beam (wide faint shaft + bright core) with its bottom at y = 0. */
  _makeBeam(x, z, radius) {
    const shaft = new Mesh(
      new CylinderGeometry(radius * 1.3, radius * 1.3, BEAM_HEIGHT, 32, 1, true),
      new MeshBasicMaterial({
        color: 0xffffff, transparent: true, opacity: SHAFT_OPACITY,
        side: BackSide, depthWrite: false, blending: AdditiveBlending,
      }),
    );
    const core = new Mesh(
      new CylinderGeometry(radius * 0.45, radius * 0.45, BEAM_HEIGHT, 16, 1, true),
      new MeshBasicMaterial({
        color: 0xffffff, transparent: true, opacity: CORE_OPACITY,
        side: DoubleSide, depthWrite: false, blending: AdditiveBlending,
      }),
    );
    const beam = new Group();
    beam.add(shaft, core);
    beam.position.set(x, BEAM_HEIGHT / 2, z);
    this.gc.scene.add(beam);
    return beam;
  }

  /** Sets a beam's brightness, 0–1. */
  _setBeamStrength(beam, strength) {
    const [shaft, core] = beam.children;
    shaft.material.opacity = SHAFT_OPACITY * strength;
    core.material.opacity = CORE_OPACITY * strength;
  }

  _startTeleportEffect(disc, target) {
    const from = disc.mesh.position;
    const rising = this._makeBeam(from.x, from.z, disc.radius);
    const falling = this._makeBeam(target.x, target.z, disc.radius);
    falling.visible = false;

    disc.velocity.set(0, 0, 0);
    disc.moving = false;
    this.gc._spawnTurnStartRings(disc); // ripple in the disc's colour where it leaves
    if (this.gc.soundManager) this.gc.soundManager.playTeleport();

    this._teleport = { disc, target, rising, falling, pillars: [rising, falling], elapsed: 0, landed: false };
  }

  _updateTeleportEffect(deltaTime) {
    const t = this._teleport;
    if (!t) return;
    t.elapsed += deltaTime;
    const restY = BEAM_HEIGHT / 2;

    // Origin beam: the disc vanishes inside it, then it shoots up into the sky and fades.
    if (t.elapsed >= VANISH_DELAY && t.disc.mesh.visible && !t.landed) {
      t.disc.mesh.visible = false;
      t.disc.spotlight.visible = false;
    }
    if (t.rising) {
      const p = Math.min(Math.max(t.elapsed - VANISH_DELAY, 0) / RISE_DURATION, 1);
      t.rising.position.y = restY + p * p * BEAM_HEIGHT;
      this._setBeamStrength(t.rising, 1 - p);
      if (p >= 1) { this._disposeMesh(t.rising); t.rising = null; }
    }

    // Destination beam: drops from the sky, the disc appears, then it fades.
    const d = t.elapsed - DESCEND_DELAY;
    if (d >= 0 && t.falling) {
      t.falling.visible = true;
      const p = Math.min(d / DESCEND_DURATION, 1);
      t.falling.position.y = restY + BEAM_HEIGHT * (1 - p);
      if (p >= 1 && !t.landed) {
        t.landed = true;
        this._placeDisc(t.disc, t.target);
        this.gc._spawnTurnStartRings(t.disc);      }
      if (t.landed) {
        const f = Math.min(Math.max(d - DESCEND_DURATION - LAND_HOLD, 0) / LAND_FADE_DURATION, 1);
        this._setBeamStrength(t.falling, 1 - f);
        if (f >= 1) { this._disposeMesh(t.falling); t.falling = null; }
      }
    }

    if (!t.rising && !t.falling) {
      this._teleport = null;
      this._buttonStateKey = '';
    }
  }

  _placeDisc(disc, target) {
    const level = this.gc.level;
    const y = (level ? level.getTerrainHeightAt(target.x, target.z) : 0) + disc.basePositionY;
    disc.mesh.position.set(target.x, y, target.z);
    disc.velocity.set(0, 0, 0);
    disc.updatePosition(); // moves the spotlight and any attached rings with the disc
    disc.mesh.visible = true;
    disc.spotlight.visible = true;
    this.gc._updateSpotlights();
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  /**
   * True if a disc of `disc`'s size could be placed at (x, z) without
   * overlapping obstacles, walls, lava or other living discs.
   */
  _isClearSpot(x, z, disc) {
    const gc = this.gc;
    const r = disc.radius;
    if (!gc.isPositionValid(x, z, r, true, [disc])) return false;

    // Walls, columns, crushers and props are only in getAllWalls().
    const box = new Box3();
    for (const wall of gc.level.getAllWalls()) {
      box.setFromObject(wall);
      const cx = Math.max(box.min.x, Math.min(x, box.max.x));
      const cz = Math.max(box.min.z, Math.min(z, box.max.z));
      if ((cx - x) ** 2 + (cz - z) ** 2 < r * r) return false;
    }
    return true;
  }

  /** Removes a mesh or group from the scene and frees its GPU resources. */
  _disposeMesh(object) {
    if (!object) return;
    this.gc.scene.remove(object);
    object.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) o.material.dispose();
    });
  }
}
