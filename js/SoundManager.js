import * as THREE from 'three';

// Dynamically discover all drain sound MP3s — adding/removing files in
// public/sounds/drain/ is enough; no code changes needed.
const DRAIN_SOUND_URLS = Object.values(
  import.meta.glob('../public/sounds/drain/*.mp3', { eager: true, query: '?url', import: 'default' })
);

const JELLY_IMPACT_URLS = Object.values(
  import.meta.glob('../public/sounds/jelly/jelly-impact-*.mp3', { eager: true, query: '?url', import: 'default' })
);

const JELLY_SQUEEZE_URLS = Object.values(
  import.meta.glob('../public/sounds/jelly/jelly-squeeze-*.mp3', { eager: true, query: '?url', import: 'default' })
);

const BREATH_FILES = [
  'magic-elements-vocal-breath-inhale-01.mp3',
  'magic-elements-vocal-breath-inhale-02.mp3',
];

const BOUNCE_FILES = [
  'object-stone-hit-on-cement-floor-soft-01.mp3',
  'object-stone-hit-on-cement-floor-soft-02.mp3',
  'object-stone-hit-on-cement-floor-soft-03.mp3',
];

const WOOD_HIT_FILES = [
  'impact-wood-trunk-hit-01.mp3',
  'impact-wood-trunk-hit-02.mp3',
  'impact-wood-trunk-hit-03.mp3',
  'impact-wood-trunk-hit-04.mp3',
  'impact-wood-trunk-hit-05.mp3',
  'impact-wood-trunk-hit-06.mp3',
  'impact-wood-trunk-hit-07.mp3',
  'impact-wood-trunk-hit-08.mp3',
  'impact-wood-trunk-hit-09.mp3',
  'impact-wood-trunk-hit-dull-01.mp3',
  'impact-wood-trunk-hit-dull-02.mp3',
  'impact-wood-trunk-hit-dull-03.mp3',
  'object-wood-impact-flat-square-wood-clap-01.mp3',
  'object-wood-impact-flat-square-wood-clap-03.mp3',
  'object-wood-impact-flat-square-wood-clap-04.mp3',
  'object-wood-impact-flat-square-wood-clap-05.mp3',
  'object-wood-impact-flat-square-wood-clap-06.mp3',
];

const WARDEN_HIT_FILES = [
  'warden-hit-01.mp3',
  'warden-hit-02.mp3',
  'warden-hit-03.mp3',
];

export class SoundManager {
  constructor(gc) {
    this.gc = gc;
    this.listener = null;
    this.woodHitBuffers = [];
    this.wardenHitBuffers = [];
    this.bounceBuffers = [];
    this.breathBuffers = [];
    this.buzzBuffer = null;
    this.rageBuffer = null;
    this.drainBuffers = [];
    this.jellyImpactBuffers = [];
    this.jellySqueezeBuffers = [];
    this.tensionBuffer = null;
    this.doorUnlockBuffer = null;
    this.stoneSlideBuffer = null;
    this.wizardRadiusBlastBuffer = null;
    this.menuOpenBuffer = null;
    this.musicBuffer = null;
    this._musicAudio = null;
    this._musicPending = false;
    this._musicLoopTimeout = null;
    this._loaded = false;
    this._onReadyCallbacks = [];
  }

  whenReady(fn) {
    if (this._loaded) { fn(); return; }
    this._onReadyCallbacks.push(fn);
  }

  init() {
    this.listener = new THREE.AudioListener();
    this.gc.camera.add(this.listener);

    const loader = new THREE.AudioLoader();

    const load = (path) => new Promise(resolve => {
      loader.load(path, buffer => resolve(buffer), undefined, () => resolve(null));
    });

    const woodPromises   = WOOD_HIT_FILES.map(f => load(`/sounds/wood/hits/${f}`));
    const wardenPromises = WARDEN_HIT_FILES.map(f => load(`/sounds/clang/${f}`));
    const bouncePromises = BOUNCE_FILES.map(f => load(`/sounds/bounce/${f}`));
    const breathPromises = BREATH_FILES.map(f => load(`/sounds/breath/${f}`));
    const buzzPromise        = load('/sounds/buzz/character-highlight.mp3');
    const ragePromise        = load('/sounds/energy/barbarian rage.mp3');
    const tensionPromise     = load('/sounds/tension/opening sound.mp3');
    const doorUnlockPromise  = load('/sounds/doors/door-unlocking.mp3');
    const stoneSlidePromise        = load('/sounds/stone/stone-slide-1.mp3');
    const wizardRadiusBlastPromise = load('/sounds/energy/wizard radius blast.mp3');
    const wizardFlameStrikePromise = load('/sounds/fire/wizard-flame-strike.mp3');
    const menuOpenPromise          = load('/sounds/menu/menu open.mp3');

    // Gameplay sounds load together; music loads independently so a large file
    // doesn't block sfx from becoming ready.
    Promise.all([Promise.all(woodPromises), Promise.all(wardenPromises), Promise.all(bouncePromises), Promise.all(breathPromises), buzzPromise, ragePromise, tensionPromise, doorUnlockPromise, stoneSlidePromise, wizardRadiusBlastPromise, menuOpenPromise, wizardFlameStrikePromise]).then(([wood, warden, bounce, breath, buzz, rage, tension, doorUnlock, stoneSlide, wizardRadiusBlast, menuOpen, wizardFlameStrike]) => {
      this.woodHitBuffers    = wood.filter(Boolean);
      this.wardenHitBuffers  = warden.filter(Boolean);
      this.bounceBuffers     = bounce.filter(Boolean);
      this.breathBuffers     = breath.filter(Boolean);
      this.buzzBuffer        = buzz || null;
      this.rageBuffer        = rage || null;
      this.tensionBuffer     = tension || null;
      this.doorUnlockBuffer  = doorUnlock || null;
      this.stoneSlideBuffer          = stoneSlide || null;
      this.wizardRadiusBlastBuffer   = wizardRadiusBlast || null;
      this.menuOpenBuffer            = menuOpen || null;
      this.wizardFlameStrikeBuffer   = wizardFlameStrike || null;
      this._loaded = true;
      this._onReadyCallbacks.forEach(fn => fn());
      this._onReadyCallbacks = [];
    });

    // Load drain/jelly sounds independently — don't block gameplay sounds from being ready
    Promise.all(DRAIN_SOUND_URLS.map(url => load(url))).then(buffers => {
      this.drainBuffers = buffers.filter(Boolean);
    });
    Promise.all(JELLY_IMPACT_URLS.map(url => load(url))).then(buffers => {
      this.jellyImpactBuffers = buffers.filter(Boolean);
    });
    Promise.all(JELLY_SQUEEZE_URLS.map(url => load(url))).then(buffers => {
      this.jellySqueezeBuffers = buffers.filter(Boolean);
    });

    load('/sounds/atmosphere/background-loop.mp3').then(music => {
      this.musicBuffer = music || null;
    });
  }

  _play(buffers, position, volume = 1.0) {
    if (!this._loaded || buffers.length === 0) return;

    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();

    const buffer = buffers[Math.floor(Math.random() * buffers.length)];
    const obj = new THREE.Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new THREE.PositionalAudio(this.listener);
    sound.setBuffer(buffer);
    sound.setRefDistance(20);
    sound.setVolume(volume);
    obj.add(sound);

    sound.play();
    sound.onEnded = () => { this.gc.scene.remove(obj); };
  }

  playDiscHit(position) {
    this._play(this.woodHitBuffers, position, 0.8);
  }

  playWardenHit(position) {
    this._play(this.wardenHitBuffers, position, 0.5);
  }

  playBounce(position) {
    this._play(this.bounceBuffers, position, 0.35);
  }

  playBreath(position) {
    this._play(this.breathBuffers, position, 1.0);
  }

  playRage(position) {
    if (!this._loaded || !this.rageBuffer) return;
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();

    const obj = new THREE.Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new THREE.PositionalAudio(this.listener);
    sound.setBuffer(this.rageBuffer);
    sound.setRefDistance(20);
    sound.setVolume(1.0);
    obj.add(sound);

    sound.play();
    sound.onEnded = () => { this.gc.scene.remove(obj); };
  }

  playDrain(position) {
    this._play(this.drainBuffers, position, 1.0);
  }

  playTension(position, onEnded) {
    if (!this._loaded || !this.tensionBuffer) { if (onEnded) onEnded(); return; }
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();

    const obj = new THREE.Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new THREE.PositionalAudio(this.listener);
    sound.setBuffer(this.tensionBuffer);
    sound.setRefDistance(20);
    sound.setVolume(1.0);
    obj.add(sound);

    sound.play();
    sound.onEnded = () => { this.gc.scene.remove(obj); if (onEnded) onEnded(); };
  }

  playBuzz(position) {
    if (!this._loaded || !this.buzzBuffer) return;
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();

    const obj = new THREE.Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new THREE.PositionalAudio(this.listener);
    sound.setBuffer(this.buzzBuffer);
    sound.setRefDistance(20);
    sound.setVolume(1.0);
    obj.add(sound);

    sound.play();
    sound.onEnded = () => { this.gc.scene.remove(obj); };
  }

  playDoorUnlock(position) {
    if (!this._loaded || !this.doorUnlockBuffer) return;
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();

    const obj = new THREE.Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new THREE.PositionalAudio(this.listener);
    sound.setBuffer(this.doorUnlockBuffer);
    sound.setRefDistance(20);
    sound.setVolume(1.0);
    obj.add(sound);

    sound.play();
    sound.onEnded = () => { this.gc.scene.remove(obj); };
  }

  playStoneSlide(position) {
    if (!this._loaded || !this.stoneSlideBuffer) return;
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();

    const obj = new THREE.Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new THREE.PositionalAudio(this.listener);
    sound.setBuffer(this.stoneSlideBuffer);
    sound.setRefDistance(20);
    sound.setVolume(1.0);
    obj.add(sound);

    sound.play();
    sound.onEnded = () => { this.gc.scene.remove(obj); };
  }

  playMenuOpen() {
    if (!this._loaded || !this.menuOpenBuffer) return;
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();
    const sound = new THREE.Audio(this.listener);
    sound.setBuffer(this.menuOpenBuffer);
    sound.setVolume(1.0);
    sound.play();
  }

  playWizardRadiusBlast(position) {
    if (!this._loaded || !this.wizardRadiusBlastBuffer) return;
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();

    const obj = new THREE.Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new THREE.PositionalAudio(this.listener);
    sound.setBuffer(this.wizardRadiusBlastBuffer);
    sound.setRefDistance(20);
    sound.setVolume(1.0);
    obj.add(sound);

    sound.play();
    sound.onEnded = () => { this.gc.scene.remove(obj); };
  }

  playWizardFlameStrike(position) {
    if (!this._loaded || !this.wizardFlameStrikeBuffer) return;
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();

    const obj = new THREE.Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new THREE.PositionalAudio(this.listener);
    sound.setBuffer(this.wizardFlameStrikeBuffer);
    sound.setRefDistance(20);
    sound.setVolume(1.0);
    obj.add(sound);

    sound.play();
    sound.onEnded = () => { this.gc.scene.remove(obj); };
  }

  playBlobHit(position) {
    this._play(this.jellyImpactBuffers, position, 0.9);
  }

  playBlobEat(position) {
    this._play(this.jellySqueezeBuffers, position, 1.0);
  }

  startMusic() {
    if (!this._loaded || !this.musicBuffer) {
      this._musicPending = true;
      return;
    }

    const ctx = this.listener.context;
    if (ctx.state === 'suspended') {
      this._musicPending = true;
      ctx.resume().then(() => {
        if (this._musicPending) this._playMusicNow();
      }).catch(() => {});
      return;
    }

    this._playMusicNow();
  }

  _playMusicNow() {
    this._musicPending = false;
    if (this._musicAudio && this._musicAudio.isPlaying) return;

    if (!this._musicAudio) {
      this._musicAudio = new THREE.Audio(this.listener);
    }

    this._musicAudio.setBuffer(this.musicBuffer);
    this._musicAudio.setVolume(0.35);
    this._musicAudio.setLoop(true);
    this._musicAudio.play();
  }

  // Call this on the first user interaction so the AudioContext can resume
  // and start music if it was queued before the context was unlocked.
  notifyUserInteraction() {
    if (!this._musicPending) return;
    if (!this._loaded || !this.musicBuffer) return;
    const ctx = this.listener.context;
    ctx.resume().then(() => {
      if (this._musicPending) this._playMusicNow();
    }).catch(() => {});
  }
}
