// js/BossIntroDialog.js
// The popup that opens the boss fight: a title and a few paragraphs of story,
// dismissed with its button, Enter or Escape. It comes up just after the
// room's title banner has faded out, and blocks the board while it's up so a
// click meant for the dialog can't start a throw.

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
    this._pending = null; // set while waiting to show (see showAfter)
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
    if (this._pending || this._waitTimer) return true;
    return this._shownAt !== null && performance.now() - this._shownAt < CHATTER_DELAY_MS;
  }

  /**
   * Shows the intro for `bossId` `delayMs` after `after` settles (e.g. the
   * room's title banner fading out). Minions stay quiet while it waits; if
   * the popup is closed meanwhile (e.g. the room is left), it never shows.
   */
  showAfter(after, bossId, delayMs = 0) {
    this.close();
    const token = {};
    this._pending = token;
    after.then(() => {
      if (this._pending !== token) return; // closed or replaced meanwhile
      this._waitTimer = setTimeout(() => {
        this._waitTimer = null;
        this._pending = null;
        this.show(bossId);
      }, delayMs);
    });
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
    this._pending = null;
    if (!this._el) return;
    document.removeEventListener('keydown', this._onKeyDown, true);
    this._el.remove();
    this._el = null;
  }
}
