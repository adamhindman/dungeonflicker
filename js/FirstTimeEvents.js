// js/FirstTimeEvents.js
// Tracks "first time" player milestones and persists them to localStorage.

const STORAGE_KEY = 'dungeonflicker_first_time_events';

class FirstTimeEvents {
  constructor() {
    this._tracked = this._load();
    this._listeners = []; // Functions called with (key) whenever a new event is first recorded.
    // TODO: remove this debug log
    this._logState('initial load');
  }

  /** Subscribe to new first-time events. `fn` is called with the event key. */
  addListener(fn) {
    this._listeners.push(fn);
  }

  _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._tracked));
    } catch {
      // localStorage unavailable — silently ignore
    }
  }

  // TODO: remove this debug helper
  _logState(reason) {
    const keys = Object.keys(this._tracked);
    console.log(
      `[FirstTimeEvents] (${reason}) — ${keys.length} event(s) recorded:`,
      keys.length ? { ...this._tracked } : '(none)'
    );
  }

  /**
   * Records the event if it has never been recorded before.
   * Returns true the first time the event fires; false on all subsequent calls.
   */
  track(key) {
    if (this._tracked[key]) return false;
    this._tracked[key] = Date.now();
    this._save();
    // TODO: remove this debug log
    this._logState(`new event: ${key}`);
    this._listeners.forEach(fn => fn(key));
    return true;
  }

  /** Returns true if the event has already been recorded. */
  has(key) {
    return !!this._tracked[key];
  }

  /** Returns the full tracked-events object (read-only snapshot). */
  getAll() {
    return { ...this._tracked };
  }

  /** Clears all tracked first-time events from memory and localStorage. */
  clear() {
    this._tracked = {};
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    // TODO: remove this debug log
    this._logState('after clear');
  }
}

export const firstTimeEvents = new FirstTimeEvents();
