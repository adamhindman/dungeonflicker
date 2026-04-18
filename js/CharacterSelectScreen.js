const CHARACTERS = [
  {
    kind: 'Barbarian',
    name: 'Barbarian',
    image: '/images/barbarian-nobg.png',
    color: '#0088ff',
    hp: 5,
    summary: 'A heavy-hitting warrior who grows stronger with each kill.',
    skills: [
      'Hits deal +1 damage per additional enemy struck in a single throw.',
      'Rage: spend a charge to power up your next throw.',
      'Earn Rage charges by killing enemies.',
    ],
  },
  {
    kind: 'Wizard',
    name: 'Wizard',
    image: '/images/wizard-nobg.png',
    color: '#00C0C0',
    hp: 3,
    summary: 'A nimble spellcaster who bends magic to their will.',
    skills: [
      'Summon Orb (1 Mana): launch a volatile magical projectile.',
      'Summon Healing Orb (1 Mana): a sphere that heals allies it touches.',
      'Radius Blast (2 Mana): detonate all orbs in a shockwave.',
      'Earn Mana from kills and clearing rooms.',
    ],
  },
  {
    kind: 'Necromancer',
    name: 'Necromancer',
    image: '/images/necromancer-nobg.png',
    color: '#6600CC',
    hp: 3,
    summary: 'A dark sorcerer who commands the dead.',
    skills: [
      'Animate Dead (1 Mana): raise a fallen enemy as a minion.',
      'Raise Dead (2 Mana): revive a fallen ally at half HP.',
      'Earn Mana from kills and clearing rooms.',
    ],
  },
];

export class CharacterSelectScreen {
  constructor() {
    this._resolve = null;
    this._selected = new Set();
    this._cards = {};
    this._startButton = null;
    this._overlay = null;
  }

  /** Returns a Promise that resolves with [kind1, kind2] after the player confirms. */
  show() {
    return new Promise(resolve => {
      this._resolve = resolve;
      this._buildUI();
    });
  }

  _buildUI() {
    const overlay = document.createElement('div');
    overlay.id = 'char-select-overlay';
    this._overlay = overlay;

    // Title
    const title = document.createElement('h1');
    title.className = 'char-select-title';
    title.textContent = 'Choose Your Party';
    overlay.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.className = 'char-select-subtitle';
    subtitle.textContent = 'Select 2 characters to adventure with';
    overlay.appendChild(subtitle);

    // Cards row
    const cardsRow = document.createElement('div');
    cardsRow.className = 'char-select-cards';
    overlay.appendChild(cardsRow);

    for (const char of CHARACTERS) {
      const card = this._buildCard(char);
      this._cards[char.kind] = { el: card, data: char };
      cardsRow.appendChild(card);
    }

    // Start button
    const startBtn = document.createElement('button');
    startBtn.id = 'char-select-start-button';
    startBtn.textContent = 'Start Game';
    startBtn.disabled = true;
    startBtn.addEventListener('click', () => this._onStartGame());
    this._startButton = startBtn;
    overlay.appendChild(startBtn);

    document.body.appendChild(overlay);
  }

  _buildCard(char) {
    const card = document.createElement('div');
    card.className = 'char-card';
    card.addEventListener('click', () => this._onCardClick(char.kind));

    // Image area
    const imgWrap = document.createElement('div');
    imgWrap.className = 'char-card-image';
    const img = document.createElement('img');
    img.src = char.image;
    img.alt = char.name;
    imgWrap.appendChild(img);
    card.appendChild(imgWrap);

    // Body
    const body = document.createElement('div');
    body.className = 'char-card-body';

    const name = document.createElement('div');
    name.className = 'char-card-name';
    name.textContent = char.name;
    name.style.color = char.color;
    body.appendChild(name);

    const hp = document.createElement('div');
    hp.className = 'char-card-hp';
    hp.textContent = `HP: ${'❤️'.repeat(char.hp)}`;
    body.appendChild(hp);

    const summary = document.createElement('div');
    summary.className = 'char-card-summary';
    summary.textContent = char.summary;
    body.appendChild(summary);

    const skillsList = document.createElement('ul');
    skillsList.className = 'char-card-skills';
    for (const skill of char.skills) {
      const li = document.createElement('li');
      li.textContent = skill;
      skillsList.appendChild(li);
    }
    body.appendChild(skillsList);

    card.appendChild(body);
    return card;
  }

  _playMenuSound() {
    if (window.gameController && window.gameController.soundManager) {
      window.gameController.soundManager.playMenuOpen();
    }
  }

  _onCardClick(kind) {
    if (this._selected.has(kind)) {
      this._selected.delete(kind);
    } else {
      if (this._selected.size >= 2) return;
      this._selected.add(kind);
    }
    this._playMenuSound();
    this._refreshCards();
  }

  _refreshCards() {
    const atMax = this._selected.size >= 2;

    for (const [kind, { el, data }] of Object.entries(this._cards)) {
      const isSelected = this._selected.has(kind);
      const isDisabled = atMax && !isSelected;

      el.classList.toggle('selected', isSelected);
      el.classList.toggle('disabled', isDisabled);

      if (isSelected) {
        el.style.borderColor = data.color;
        el.style.boxShadow = `0 0 2rem ${data.color}88`;
      } else {
        el.style.borderColor = '';
        el.style.boxShadow = '';
      }
    }

    const ready = this._selected.size === 2;
    this._startButton.disabled = !ready;
    this._startButton.classList.toggle('active', ready);
  }

  _onStartGame() {
    if (this._selected.size !== 2) return;

    // Unlock audio during the click event (user gesture required by browsers).
    if (window.gameController && window.gameController.soundManager) {
      window.gameController.soundManager.notifyUserInteraction();
    }

    this._playMenuSound();

    // Fade out the overlay, then resolve.
    this._overlay.classList.add('fading');
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      this._overlay.remove();
      this._resolve([...this._selected]);
    };
    this._overlay.addEventListener('transitionend', finish, { once: true });
    // Fallback: resolve after the transition duration + a small buffer.
    setTimeout(finish, 800);
  }
}
