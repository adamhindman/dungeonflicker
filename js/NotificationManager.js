// js/NotificationManager.js
// Displays first-time event notifications in the lower-right corner, above the
// camera controls button. Multiple queued notifications are navigated via
// pagination dots; each can be dismissed individually with the OK button.

const MESSAGES = {
  level_loaded: {
    title: 'Welcome to Dungeon Flicker',
    body: 'Drag from your disc to aim, then release to throw. Knock out every enemy to open the portal.',
  },
};

export class NotificationManager {
  constructor() {
    this._queue = [];        // [{key, title, body}]
    this._currentIndex = 0;
    this._area = null;
    this._revealed = false;
    this._autoDismissTimer = null;
    this._build();
  }

  /** Called once the game has properly started to slide in the notification area. */
  reveal() {
    if (this._revealed) return;
    this._revealed = true;
    if (this._area) this._area.classList.add('revealed');
    // Auto-dismiss the current notification after 5 seconds.
    this._scheduleAutoDismiss();
  }

  _scheduleAutoDismiss() {
    clearTimeout(this._autoDismissTimer);
    if (this._queue.length === 0) return;
    this._autoDismissTimer = setTimeout(() => this._dismiss(), 5000);
  }

  _build() {
    const area = document.createElement('div');
    area.id = 'notification-area';
    document.body.appendChild(area);
    this._area = area;
  }

  /** Called by the firstTimeEvents listener. Adds a card if a message is defined. */
  push(key) {
    const msg = MESSAGES[key];
    if (!msg) return;
    this._queue.push({ key, title: msg.title, body: msg.body });
    // Show the oldest undismissed notification; new ones queue at the end.
    if (this._queue.length === 1) this._currentIndex = 0;
    this._render();
  }

  _dismiss() {
    clearTimeout(this._autoDismissTimer);
    if (this._queue.length === 0) return;
    this._queue.splice(this._currentIndex, 1);
    // Stay on the same index, clamped to the new length.
    this._currentIndex = Math.min(this._currentIndex, Math.max(0, this._queue.length - 1));
    this._render();
    // If more notifications remain, schedule auto-dismiss for the next one.
    if (this._revealed) this._scheduleAutoDismiss();
  }

  _goTo(index) {
    this._currentIndex = index;
    this._render();
  }

  _render() {
    if (!this._area) return;
    this._area.innerHTML = '';

    if (this._queue.length === 0) return;

    const item = this._queue[this._currentIndex];
    const total = this._queue.length;

    const card = document.createElement('div');
    card.className = 'notification-card';

    // ── Header row ──────────────────────────────────────────────────────────
    const header = document.createElement('div');
    header.className = 'notification-header';

    const title = document.createElement('span');
    title.className = 'notification-title';
    title.textContent = item.title;

    header.appendChild(title);
    card.appendChild(header);

    // ── Body row (text + OK button) ──────────────────────────────────────────
    const bodyRow = document.createElement('div');
    bodyRow.className = 'notification-body-row';

    const body = document.createElement('div');
    body.className = 'notification-body';
    body.textContent = item.body;

    const ok = document.createElement('button');
    ok.className = 'notification-ok';
    ok.textContent = 'ok';
    ok.setAttribute('aria-label', 'Dismiss notification');
    ok.addEventListener('click', () => this._dismiss());

    bodyRow.appendChild(body);
    bodyRow.appendChild(ok);
    card.appendChild(bodyRow);

    // ── Pagination dots (only when there is more than one notification) ──────
    if (total > 1) {
      const dotsRow = document.createElement('div');
      dotsRow.className = 'notification-dots';

      for (let i = 0; i < total; i++) {
        const dot = document.createElement('button');
        dot.className = 'notification-dot' + (i === this._currentIndex ? ' active' : '');
        dot.setAttribute('aria-label', `Go to notification ${i + 1}`);
        const idx = i; // capture for closure
        dot.addEventListener('click', () => this._goTo(idx));
        dotsRow.appendChild(dot);
      }

      card.appendChild(dotsRow);
    }

    this._area.appendChild(card);
  }
}
