import * as THREE from 'three';

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

export class SoundManager {
  constructor(gc) {
    this.gc = gc;
    this.listener = null;
    this.woodHitBuffers = [];
    this.bounceBuffers = [];
    this.breathBuffers = [];
    this.buzzBuffer = null;
    this.rageBuffer = null;
    this.tensionBuffer = null;
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
    const bouncePromises = BOUNCE_FILES.map(f => load(`/sounds/bounce/${f}`));
    const breathPromises = BREATH_FILES.map(f => load(`/sounds/breath/${f}`));
    const buzzPromise    = load('/sounds/buzz/character-highlight.mp3');
    const ragePromise    = load('/sounds/energy/barbarian rage.mp3');
    const tensionPromise = load('/sounds/tension/opening sound.mp3');

    // Gameplay sounds load together; music loads independently so a large file
    // doesn't block sfx from becoming ready.
    Promise.all([Promise.all(woodPromises), Promise.all(bouncePromises), Promise.all(breathPromises), buzzPromise, ragePromise, tensionPromise]).then(([wood, bounce, breath, buzz, rage, tension]) => {
      this.woodHitBuffers = wood.filter(Boolean);
      this.bounceBuffers  = bounce.filter(Boolean);
      this.breathBuffers  = breath.filter(Boolean);
      this.buzzBuffer     = buzz || null;
      this.rageBuffer     = rage || null;
      this.tensionBuffer  = tension || null;
      this._loaded = true;
      this._onReadyCallbacks.forEach(fn => fn());
      this._onReadyCallbacks = [];
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
