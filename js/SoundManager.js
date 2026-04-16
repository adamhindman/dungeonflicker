import * as THREE from 'three';

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
    this.buzzBuffer = null;
    this._loaded = false;
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
    const buzzPromise    = load('/sounds/buzz/abstract-synthetic-noise-buzz-01.mp3');

    Promise.all([Promise.all(woodPromises), Promise.all(bouncePromises), buzzPromise]).then(([wood, bounce, buzz]) => {
      this.woodHitBuffers = wood.filter(Boolean);
      this.bounceBuffers  = bounce.filter(Boolean);
      this.buzzBuffer     = buzz || null;
      this._loaded = true;
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
}
