// js/PartyResources.js
// Each player character's spendable resource (mana or charges): which
// controller holds it, its value at game start, and what the player calls it.

const RESOURCES = {
  Wizard:      { controller: 'wizardController',      field: 'mana',        start: 3, unit: 'mana',   units: 'mana' },
  Necromancer: { controller: 'necromancerController', field: 'mana',        start: 3, unit: 'mana',   units: 'mana' },
  Barbarian:   { controller: 'barbarianController',   field: 'rageCharges', start: 0, unit: 'charge', units: 'charges' },
  Rogue:       { controller: 'rogueController',       field: 'charges',     start: 0, unit: 'charge', units: 'charges' },
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

/** "1 mana", "2 charges", … */
export function formatAmount(res, amount) {
  return `${amount} ${amount === 1 ? res.unit : res.units}`;
}

const NON_PC_KINDS = ['Orb', 'HealingOrb', 'AnimatedDead', 'Bomb', 'RoguePotion', 'Fireball'];

/** True for the player's actual characters (not orbs, minions, bombs, …). */
export function isMainPC(disc) {
  return !!disc && disc.type === 'player' && !NON_PC_KINDS.includes(disc.kind);
}
