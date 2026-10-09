// js/BossIntroDialog.js
// The popup that opens the boss fight: a title and a few paragraphs of story,
// dismissed with its button, Enter or Escape. It waits for the room's
// fade-in to finish, and blocks the board while it's up so a click meant
// for the dialog can't start a throw.

// The boss's minions keep quiet until the popup has been up this long.
const CHATTER_DELAY_MS = 1500;

const BOSS_INTROS = {
  paracelsus: {
    title: "Oh no, it's a boss fight!",
    paragraphs: [
      { text: 'The undying magus Paracelsus stands before you, withered by age and malevolence.' },
      { text: '"Prepare to be swarmed by homunculi, grown in your own likenesses in my alchemical vats! See them yonder, here and here, as fruitful as they are fragile."', quote: true },
      { text: 'He is surrounded by small, twisted creatures which resemble your selves in form, though misshapen and grotesque. Their mouths open and close like fish, their dull eyes stare without intelligence. They shamble toward you hideously.' },
      { text: 'You notice he is wearing a radiant pendant, of the sort known to project an impenetrable shield if its wearer takes too much damage in a single round. A difficult, but not insurmountable battle awaits.' },
      { text: 'You must kill fell Paracelsus and his gibbering creations before they kill you!', emphasis: true },
    ],
    button: 'To battle!',
  },
};

export class BossIntroDialog {
  constructor() {
    this._el = null;
    this._waitTimer = null;
    this._shownAt = null; // performance.now() when the popup last appeared
    this._onKeyDown = event => {
      if (event.key === 'Escape' || event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation(); // don't also end the turn, cancel aiming…
        this.close();
      }
    };
  }

  get isOpen() {
    return !!this._el;
  }

  /** True while the popup is waiting to appear or has only just appeared: minions stay quiet. */
  get holdsChatter() {
    if (this._waitTimer) return true;
    return this._shownAt !== null && performance.now() - this._shownAt < CHATTER_DELAY_MS;
  }

  /**
   * Shows the intro for `bossId` once the screen has faded in from black, and
   * `delayMs` more after that (e.g. for the room's title to come and go).
   */
  showWhenRoomVisible(bossId, delayMs = 0) {
    this.close();
    const overlay = document.getElementById('black-overlay');
    const start = performance.now();
    const check = () => {
      const fading = overlay && getComputedStyle(overlay).display !== 'none';
      if (fading && performance.now() - start < 10000) {
        this._waitTimer = setTimeout(check, 150);
      } else {
        this._waitTimer = setTimeout(() => {
          this._waitTimer = null;
          this.show(bossId);
        }, delayMs);
      }
    };
    check();
  }

  show(bossId) {
    const intro = BOSS_INTROS[bossId];
    if (!intro) return;
    this.close();

    const el = document.createElement('div');
    el.id = 'boss-intro';
    el.innerHTML = `
      <div class="boss-intro-dialog" role="dialog" aria-labelledby="boss-intro-title">
        <h1 id="boss-intro-title">${intro.title}</h1>
        ${intro.paragraphs.map(p =>
          `<p class="${p.quote ? 'boss-intro-quote' : ''}${p.emphasis ? 'boss-intro-emphasis' : ''}">${p.text}</p>`).join('')}
        <div class="boss-intro-footer"><button class="boss-intro-ok">${intro.button}</button></div>
      </div>`;
    el.querySelector('.boss-intro-ok').addEventListener('click', () => this.close());
    document.body.appendChild(el);
    this._el = el;
    this._shownAt = performance.now();
    document.addEventListener('keydown', this._onKeyDown, true);
    el.querySelector('.boss-intro-ok').focus({ preventScroll: true });
  }

  close() {
    clearTimeout(this._waitTimer);
    this._waitTimer = null;
    if (!this._el) return;
    document.removeEventListener('keydown', this._onKeyDown, true);
    this._el.remove();
    this._el = null;
  }
}
