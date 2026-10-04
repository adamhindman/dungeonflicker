// js/PartyResources.js
// Each player character's spendable resource, which every class calls mana
// (the Barbarian's and Rogue's are still named "charges" in the code): which
// controller holds it, its value at game start, and what the player calls it.

const RESOURCES = {
  Wizard:      { controller: 'wizardController',      field: 'mana',        start: 3, unit: 'mana', units: 'mana' },
  Necromancer: { controller: 'necromancerController', field: 'mana',        start: 3, unit: 'mana', units: 'mana' },
  Barbarian:   { controller: 'barbarianController',   field: 'rageCharges', start: 0, unit: 'mana', units: 'mana' },
  Rogue:       { controller: 'rogueController',       field: 'charges',     start: 0, unit: 'mana', units: 'mana' },
};

/**
 * @returns {{controller: object, field: string, start: number, unit: string, units: string, max?: number}|null}
 *   the resource for a character kind (`max` only where the class caps it),
 *   or null if that character isn't in play.
 */
export function getResource(gc, kind) {
  const res = RESOURCES[kind];
  const controller = res && gc[res.controller];
  return controller ? { ...res, controller } : null;
}

/** "1 mana", "2 mana", … */
export function formatAmount(res, amount) {
  return `${amount} ${amount === 1 ? res.unit : res.units}`;
}

const NON_PC_KINDS = ['Orb', 'HealingOrb', 'AnimatedDead', 'Bomb', 'RoguePotion', 'Fireball'];

/** True for the player's actual characters (not orbs, minions, bombs, …). */
export function isMainPC(disc) {
  return !!disc && disc.type === 'player' && !NON_PC_KINDS.includes(disc.kind);
}

/**
 * Brings a fallen party member back with half their max HP (at least 1) and
 * moves them to right after `rescuer` (the character whose turn it is) in the
 * turn order, so they still act this round. Shared by the Necromancer's
 * Resurrect Ally and the Resurrection potion.
 */
export function resurrectAlly(gc, rescuer, target) {
  const reviveHP = Math.max(1, Math.floor(target.maxHitPoints / 2));
  target.revive(reviveHP);
  target.hitPoints = reviveHP;
  target.lastHitPoints = reviveHP;
  target.hasThrown = false;

  const targetIndex = gc.discs.indexOf(target);
  if (targetIndex !== -1) gc.discs.splice(targetIndex, 1);
  const rescuerIndex = gc.discs.indexOf(rescuer);
  if (rescuerIndex !== -1) {
    gc.discs.splice(rescuerIndex + 1, 0, target);
    gc.currentTurnIndex = rescuerIndex;
    gc.currentDisc = rescuer;
  }

  gc.updateDiscNames();
}
