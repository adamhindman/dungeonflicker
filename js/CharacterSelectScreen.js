const CHARACTERS = [
  {
    kind: 'Barbarian',
    name: 'Barbarian',
    image: '/images/barbarian-nobg.webp',
    color: '#0088ff',
    hp: 5,
    summary: 'A hulking brawler who charges into the thick of the fight.',
    skills: [
      'Plows through crowds of enemies',
      'Slams foes into walls',
      'Flies into a rage to keep the carnage going',
    ],
  },
  {
    kind: 'Wizard',
    name: 'Wizard',
    image: '/images/wizard-nobg.webp',
    color: '#00C0C0',
    hp: 3,
    summary: 'A master of the arcane who blasts foes and mends friends.',
    skills: [
      'Hurls volatile orbs of magic',
      'Heals allies from afar',
      'Calls down pillars of fire',
    ],
  },
  {
    kind: 'Necromancer',
    name: 'Necromancer',
    image: '/images/necromancer-nobg.webp',
    color: '#9944EE',
    hp: 3,
    summary: 'A dark sorcerer who commands the dead.',
    skills: [
      'Raises fallen enemies',
      'Drains the life from nearby foes',
      'Death is negotiable when he\'s around',
    ],
  },
  {
    kind: 'Rogue',
    name: 'Rogue',
    image: '/images/rogue-nobg.webp',
    color: '#CC3355',
    hp: 4,
    summary: 'A quick, sneaky trickster with a bag full of surprises.',
    skills: [
      'Moves twice every turn',
      'Lobs bombs and healing potions',
      'Hides in the shadows, then strikes',
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
    if (char.kind === 'Necromancer') imgWrap.style.padding = '0.2rem';
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
