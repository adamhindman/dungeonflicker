// js/LevelStats.js
// Per-room tallies kept in this browser's localStorage, for tuning the order
// of the rooms: how often each room was started, beaten (left through its
// gate) and ended in a total party kill (the "game over" screen).
//
// Stored under STORAGE_KEY as { [room id (Level.shape)]: { played, beaten, wiped } }.
// To read them, in the browser console: levelStats()  (or levelStats(true) to clear them)

const STORAGE_KEY = 'dungeonflicker.levelStats';

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {}; // storage blocked, or the entry's unreadable
  }
}

function bump(room, field) {
  if (!room) return;
  const stats = load();
  const entry = stats[room] ??= { played: 0, beaten: 0, wiped: 0 };
  entry[field] = (entry[field] ?? 0) + 1;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // storage blocked or full: the tally just isn't kept
  }
}

/** Room `room` was started (entered, restarted, or begun from the menu). */
export const recordPlayed = room => bump(room, 'played');
/** The party left room `room` through its gate. */
export const recordBeaten = room => bump(room, 'beaten');
/** The whole party died in room `room`. */
export const recordWiped = room => bump(room, 'wiped');

/** All the tallies so far. */
export const getLevelStats = load;

/** Forgets every tally. */
export function clearLevelStats() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // nothing to clear
  }
}

// Console access: levelStats() shows a table; levelStats(true) clears it.
window.levelStats = (clear = false) => {
  if (clear) { clearLevelStats(); return 'Cleared.'; }
  console.table(load());
  return load();
};
