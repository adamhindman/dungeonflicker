// js/ItemHelpDialog.js
// A small dialog shown when a character buys an item in the Sanctuary,
// explaining what the item does and how to use it (from the item's `help`
// lines in ItemManager's ITEMS). A "Don't show this again" checkbox hides the
// dialog for that item from then on; the choice is kept in localStorage.

import { ITEMS } from './ItemManager.js';

const STORAGE_KEY = 'dungeonflicker_item_help_hidden'; // JSON array of item ids

function loadHidden() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ids = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(ids) ? ids : []);
  } catch {
    return new Set(); // storage unavailable (private window, blocked site data…)
  }
}

function saveHidden(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // storage unavailable: the dialog will just show again next time
  }
}

const hexColor = n => `#${n.toString(16).padStart(6, '0')}`;

export class ItemHelpDialog {
  constructor() {
    this._el = null;
    this._itemId = null;
    this._onKeyDown = event => {
      if (event.key === 'Escape' || event.key === 'Enter') {
        event.preventDefault();
        this.close();
      }
    };
  }

  /** Shows the help for `itemId`, bought by `buyerName`, unless the player chose to hide it. */
  show(itemId, buyerName) {
    const item = ITEMS[itemId];
    if (!item || !item.help || loadHidden().has(itemId)) return;
    this.close();
    this._itemId = itemId;

    const el = document.createElement('div');
    el.id = 'item-help-dialog';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-labelledby', 'item-help-title');
    el.innerHTML = `
      <div class="item-help-header">
        <span class="item-help-swatch" style="background:${hexColor(item.color)};color:${hexColor(item.color)}"></span>
        <div>
          <div id="item-help-title" class="item-help-title">${item.name}</div>
          ${buyerName ? `<div class="item-help-subtitle">${buyerName} got a new item</div>` : ''}
        </div>
      </div>
      <ul class="item-help-lines">${item.help.map(line => `<li>${line}</li>`).join('')}</ul>
      <div class="item-help-footer">
        <label class="item-help-hide"><input type="checkbox" /> Don't show this again</label>
        <button class="item-help-ok">Got it</button>
      </div>`;
    el.querySelector('.item-help-ok').addEventListener('click', () => this.close());
    document.body.appendChild(el);
    this._el = el;
    document.addEventListener('keydown', this._onKeyDown);
    el.querySelector('.item-help-ok').focus({ preventScroll: true });
  }

  /** Closes the dialog, remembering "Don't show this again" if it was ticked. */
  close() {
    if (!this._el) return;
    if (this._el.querySelector('.item-help-hide input').checked) {
      const hidden = loadHidden();
      hidden.add(this._itemId);
      saveHidden(hidden);
    }
    document.removeEventListener('keydown', this._onKeyDown);
    this._el.remove();
    this._el = null;
    this._itemId = null;
  }
}
