// js/TooltipManager.js
// Shows a hover tooltip above skill/spell buttons — only while the player
// hasn't used that ability yet (firstTimeEvents key not yet set).
//
// On the first-ever button click (while the tooltip is visible) it runs a
// completion sequence: pause 1s → crossfade to a big checkmark → pause 1s
// → animate out.

import { firstTimeEvents } from './FirstTimeEvents.js';

class TooltipManager {
  constructor() {
    this._el = null;
    this._currentKey = null;  // eventKey whose tooltip is currently showing
    this._completing = false; // true while the completion sequence is running
    this._timer1 = null;
    this._timer2 = null;
    this._timer3 = null;
    this._build();
  }

  _build() {
    const el = document.createElement('div');
    el.id = 'skill-tooltip';
    document.body.appendChild(el);
    this._el = el;
  }

  /**
   * Wire a button to show a tooltip on hover until the given firstTimeEvents
   * key has been recorded for the first time.
   *
   * @param {HTMLElement} button
   * @param {string}      eventKey  - firstTimeEvents key to gate on
   * @param {string}      text      - tooltip body text
   */
  register(button, eventKey, text) {
    if (!button) return;

    let hoverTimer = null;

    button.addEventListener('mouseenter', () => {
      if (this._completing) return;
      if (firstTimeEvents.has(eventKey)) {
        // Post-tutorial: show reminder after 1 second of hovering
        hoverTimer = setTimeout(() => {
          if (!this._completing) this._show(button, text, eventKey);
        }, 1000);
        return;
      }
      this._show(button, text, eventKey);
    });

    button.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer);
      hoverTimer = null;
      if (this._completing) return; // don't interrupt the completion sequence
      this._hide();
    });

    button.addEventListener('click', () => {
      // Only run completion if this button's tooltip is currently visible
      // and we haven't started a completion sequence yet.
      if (this._currentKey === eventKey && !this._completing) {
        const isVisible = this._el.classList.contains('visible');
        if (isVisible) this._startCompletion();
      }
    });
  }

  _show(button, text, eventKey) {
    const el = this._el;
    el.textContent = text;
    el.classList.remove('visible', 'completion', 'checkmark-in', 'exiting');
    void el.offsetWidth; // force reflow so the animation restarts cleanly

    const rect = button.getBoundingClientRect();
    el.style.left = `${rect.left + rect.width / 2}px`;
    el.style.top  = `${rect.top}px`;

    this._currentKey = eventKey;
    el.classList.add('visible');
  }

  _hide() {
    this._clearTimers();
    this._el.classList.remove('visible', 'fading-out', 'completion', 'checkmark-in', 'exiting');
    this._completing = false;
    this._currentKey = null;
  }

  // ── Completion sequence ──────────────────────────────────────────────────

  _startCompletion() {
    this._completing = true;
    const el = this._el;

    // Pause 1 s, then crossfade to checkmark.
    this._timer1 = setTimeout(() => {
      // Replace the rise animation with a fade-out animation.
      // Inline styles can't override CSS animation fill-mode values, so we
      // must swap to a new animation class rather than setting style.opacity.
      el.classList.remove('visible');
      el.classList.add('fading-out');

      this._timer2 = setTimeout(() => {
        // Swap content and trigger the checkmark-pop animation.
        el.classList.remove('fading-out');
        el.textContent = '✔';
        el.classList.add('completion');
        void el.offsetWidth; // force reflow so checkmark-in restarts cleanly
        el.classList.add('checkmark-in');

        // Pause 1 s more, then animate out.
        this._timer3 = setTimeout(() => {
          this._exit();
        }, 1000);
      }, 120); // matches tooltip-fade-out duration
    }, 1000);
  }

  _exit() {
    const el = this._el;
    el.classList.remove('checkmark-in');
    void el.offsetWidth;
    el.classList.add('exiting');

    // Clean up after the exit animation finishes.
    setTimeout(() => {
      el.classList.remove('completion', 'exiting');
      el.style.opacity = '';
      this._completing = false;
      this._currentKey = null;
    }, 300); // matches the exit animation duration
  }

  _clearTimers() {
    clearTimeout(this._timer1);
    clearTimeout(this._timer2);
    clearTimeout(this._timer3);
  }
}

export const tooltipManager = new TooltipManager();
