// js/RoomTitle.js
// Each room's name, and the banner that announces it. It fades in over the
// black screen between rooms, stays while the room fades in beneath it, holds
// a moment longer, then fades away as play begins. It never takes input
// (clicks go straight through to the board).

// Display names, keyed by room id (Level.shape).
export const ROOM_TITLES = {
  rect: 'The Guardroom',
  circle: 'The Rotunda',
  hexagon: 'The Sunken Hex',
  bullseye: 'The Turning Rings',
  donut: 'The Caldera',
  crusher: 'The Crushing Hall',
  siege: 'The Siege Works',
  ice: 'The Ice Cave',
  powder: 'The Powder Store',
  locked: 'The Locked Gate',
  mirror: 'The Mirror Gates',
  sanctuary: 'The Sanctuary',
  boss: "Paracelsus's Laboratory",
};

const START_DELAY_MS = 500; // before the fade-in begins
const BEAT_MS = 700;        // "Room N" fades in first; the name follows this much later
const FADE_IN_MS = 2000;
const HOLD_MS = 700;      // on screen after the black has gone
const FADE_OUT_MS = 1100;

export class RoomTitle {
  constructor() {
    this._el = null;
    this._waitTimer = null;
    this._doneTimer = null;
    this._resolveDone = null; // settles the promise show() returned
  }

  /**
   * Shows the title of room `shape` now (over the black screen, if it's up),
   * and fades it out a moment after the room has faded in. `slow`: fade in
   * twice as slowly (the first room after the menu, whose black screen lasts
   * longer). `number`: shown as "Room N" above the title (null: none).
   * @returns {Promise} settles once the banner has gone (faded out, cleared
   *   early, or never shown), e.g. for the boss popup to follow it
   */
  show(shape, { slow = false, number = null } = {}) {
    this.clear();
    const title = ROOM_TITLES[shape];
    if (!title) return Promise.resolve();
    const done = new Promise(resolve => { this._resolveDone = resolve; });
    const fadeInMs = slow ? FADE_IN_MS * 2 : FADE_IN_MS;
    const beatMs = slow ? BEAT_MS * 2 : BEAT_MS;
    const el = document.createElement('div');
    el.id = 'room-title';
    if (number !== null) {
      const numberEl = document.createElement('div');
      numberEl.className = 'room-title-number';
      numberEl.textContent = `Room ${number}`;
      el.appendChild(numberEl);
    }
    const nameEl = document.createElement('div');
    nameEl.className = 'room-title-name';
    nameEl.textContent = title;
    el.appendChild(nameEl);
    el.style.setProperty('--room-title-delay', `${START_DELAY_MS}ms`);
    el.style.setProperty('--room-title-beat', `${beatMs}ms`);
    el.style.setProperty('--room-title-in', `${fadeInMs}ms`);
    el.style.setProperty('--room-title-out', `${FADE_OUT_MS}ms`);
    document.body.appendChild(el);
    this._el = el;
    // Fades in straight away, over the black screen, while the room is still
    // loading behind it.
    this._holdUntilRoomVisible(el, START_DELAY_MS + beatMs + fadeInMs);
    return done;
  }

  /**
   * Holds `el` until the black overlay has gone (and its fade-in, `fadeInMs`
   * from now, has finished), then a little longer, then fades it out.
   */
  _holdUntilRoomVisible(el, fadeInMs) {
    const overlay = document.getElementById('black-overlay');
    const shownAt = performance.now();
    const check = () => {
      const covered = overlay && getComputedStyle(overlay).display !== 'none';
      if (covered || performance.now() - shownAt < fadeInMs) {
        this._waitTimer = setTimeout(check, 100);
        return;
      }
      this._waitTimer = setTimeout(() => {
        this._waitTimer = null;
        el.classList.add('leaving');
        this._doneTimer = setTimeout(() => this.clear(), FADE_OUT_MS);
      }, HOLD_MS);
    };
    check();
  }

  /** Takes any banner off the screen. */
  clear() {
    clearTimeout(this._waitTimer);
    clearTimeout(this._doneTimer);
    this._waitTimer = null;
    this._doneTimer = null;
    this._el?.remove();
    this._el = null;
    this._resolveDone?.();
    this._resolveDone = null;
  }
}
