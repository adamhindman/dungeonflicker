import { AudioListener, AudioLoader, Audio, PositionalAudio, Object3D } from 'three';
import SOUND_FILES from 'virtual:sound-files';

// Dynamically discovered sound pools (see soundFiles() in vite.config.js) —
// adding/removing files in e.g. public/sounds/drain/ is enough; no code changes needed.
const soundsIn = (folder, prefix = '') =>
  (SOUND_FILES[folder] ?? []).filter(url => url.split('/').pop().startsWith(prefix));

const DRAIN_SOUND_URLS = soundsIn('drain');

const JELLY_IMPACT_URLS = soundsIn('jelly', 'jelly-impact-');

const JELLY_SQUEEZE_URLS = soundsIn('jelly', 'jelly-squeeze-');

const DEATH_CRY_URLS = soundsIn('cries');

// The Donut room's lava pit: a hiss when a disc is burned in it, a burst when it erupts.
const LAVA_HISS_URLS = soundsIn('fire', 'hiss');
const LAVA_BURST_URLS = soundsIn('fire', 'burst-');

// Mortars: a shot as one fires.
const MORTAR_FIRE_URLS = soundsIn('mortar', 'weapons-sci-fi');

// Homunculus voices: a pool per event, discovered from public/sounds/homunculi/<event>/.
const HOMUNCULUS_SOUND_URLS = {
  attack: soundsIn('homunculi/attack'),
  pain:   soundsIn('homunculi/pain'),
  death:  soundsIn('homunculi/death'),
  idle:   soundsIn('homunculi/idle'),
};

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
    this.rogueGrenadeExplodeBuffer = null;
    this.deathCryBuffers = [];
    this.lavaHissBuffers = [];
    this.lavaBurstBuffers = [];
    this.mortarFireBuffers = [];
    this.volcanoLoopBuffer = null;
    this._volcanoLoop = null;          // the Donut room's background rumble while it loops
    this._volcanoLoopPending = false;  // start it once the buffer loads
    this.pursuerMoveBuffer = null;
    this.homunculusBuffers = { attack: [], pain: [], death: [], idle: [] }; // filled by loadHomunculusSounds
    this._homunculusSoundsRequested = false;
    this.gameOverBuffer = null;
    this.fireballCastBuffer = null;
    this.fireballHitBuffer = null;
    this.godsEyeInBuffer = null;
    this.godsEyeOutBuffer = null;
    this.teleportBuffer = null;
    this.purchaseBuffers = [];
    this.heartbeatBuffer = null;
    this._heartbeat = null;         // { obj, sound } while the Sanctuary heartbeat loops
    this._heartbeatPending = null;  // position to start at once the buffer loads
    this.rageHeartbeatBuffer = null;
    this._rageHeartbeat = null;     // { rate, timer } while the Barbarian rages
    this.exhaustedBreathBuffer = null;
    this._exhaustedBreath = null;   // the breathing sound while it plays
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
    this.listener = new AudioListener();
    this.gc.camera.add(this.listener);

    const loader = new AudioLoader();

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
    const rogueGrenadeExplodePromise = load('/sounds/rogue/rogue-grenade-explode.mp3');
    const gameOverPromise            = load('/sounds/menu/game over.mp3');
    const fireballCastPromise        = load('/sounds/fire/fireball-cast.mp3');
    const fireballHitPromise         = load('/sounds/fire/fireball-hit.mp3');

    // Gameplay sounds load together; music loads independently so a large file
    // doesn't block sfx from becoming ready.
    Promise.all([Promise.all(woodPromises), Promise.all(wardenPromises), Promise.all(bouncePromises), Promise.all(breathPromises), buzzPromise, ragePromise, tensionPromise, doorUnlockPromise, stoneSlidePromise, wizardRadiusBlastPromise, menuOpenPromise, wizardFlameStrikePromise, rogueGrenadeExplodePromise, gameOverPromise, fireballCastPromise, fireballHitPromise]).then(([wood, warden, bounce, breath, buzz, rage, tension, doorUnlock, stoneSlide, wizardRadiusBlast, menuOpen, wizardFlameStrike, rogueGrenadeExplode, gameOver, fireballCast, fireballHit]) => {
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
      this.rogueGrenadeExplodeBuffer = rogueGrenadeExplode || null;
      this.gameOverBuffer            = gameOver || null;
      this.fireballCastBuffer        = fireballCast || null;
      this.fireballHitBuffer         = fireballHit || null;
      this._loaded = true;
      this._onReadyCallbacks.forEach(fn => fn());
      this._onReadyCallbacks = [];
    });

    // Load drain/jelly/cry sounds independently — don't block gameplay sounds from being ready
    Promise.all(DRAIN_SOUND_URLS.map(url => load(url))).then(buffers => {
      this.drainBuffers = buffers.filter(Boolean);
    });
    Promise.all(DEATH_CRY_URLS.map(url => load(url))).then(buffers => {
      this.deathCryBuffers = buffers.filter(Boolean);
    });
    Promise.all(JELLY_IMPACT_URLS.map(url => load(url))).then(buffers => {
      this.jellyImpactBuffers = buffers.filter(Boolean);
    });
    Promise.all(JELLY_SQUEEZE_URLS.map(url => load(url))).then(buffers => {
      this.jellySqueezeBuffers = buffers.filter(Boolean);
    });
    Promise.all(LAVA_HISS_URLS.map(url => load(url))).then(buffers => {
      this.lavaHissBuffers = buffers.filter(Boolean);
    });
    Promise.all(LAVA_BURST_URLS.map(url => load(url))).then(buffers => {
      this.lavaBurstBuffers = buffers.filter(Boolean);
    });
    Promise.all(MORTAR_FIRE_URLS.map(url => load(url))).then(buffers => {
      this.mortarFireBuffers = buffers.filter(Boolean);
    });
    load('/sounds/fire/volcano-loop.mp3').then(buffer => {
      this.volcanoLoopBuffer = buffer || null;
      if (this._volcanoLoopPending) this.startVolcanoLoop();
    });
    // Opus: browsers that can't decode it (some Safari versions) just go without
    load('/sounds/atmosphere/pursuer-move.opus').then(buffer => { this.pursuerMoveBuffer = buffer || null; });
    load('/sounds/energy/teleport.mp3').then(buffer => { this.teleportBuffer = buffer || null; });
    Promise.all([
      load('/sounds/menu/ui-medieval-collect-loot-light-01.mp3'),
      load('/sounds/menu/ui-medieval-collect-loot-medium-01.mp3'),
    ]).then(buffers => { this.purchaseBuffers = buffers.filter(Boolean); });
    load('/sounds/atmosphere/human-body-heartbeat-bassy-single-medium-03.mp3').then(buffer => {
      this.heartbeatBuffer = buffer || null;
      if (this._heartbeatPending) this.startHeartbeat(this._heartbeatPending);
    });

    load('/sounds/atmosphere/heartbeat-fast.mp3').then(buffer => { this.rageHeartbeatBuffer = buffer || null; });
    load('/sounds/breath/tired-breathing.mp3').then(buffer => { this.exhaustedBreathBuffer = buffer || null; });

    load('/sounds/atmosphere/background-loop.mp3').then(music => {
      this.musicBuffer = music || null;
    });

    load('/sounds/menu/zoom-in.mp3').then(buf => { this.godsEyeInBuffer = buf || null; });
    load('/sounds/menu/zoom-out.mp3').then(buf => { this.godsEyeOutBuffer = buf || null; });
  }

  _play(buffers, position, volume = 1.0) {
    if (!this._loaded || buffers.length === 0) return;

    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();

    const buffer = buffers[Math.floor(Math.random() * buffers.length)];
    const obj = new Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new PositionalAudio(this.listener);
    sound.setBuffer(buffer);
    sound.setRefDistance(20);
    sound.setVolume(volume);
    obj.add(sound);

    sound.play();
    sound.onEnded = () => { this.gc.scene.remove(obj); };
    return buffer.duration;
  }

  playDiscHit(position) {
    this._play(this.woodHitBuffers, position, 0.8);
  }

  playWardenHit(position) {
    this._play(this.wardenHitBuffers, position, 0.5);
  }

  /**
   * Loads the homunculus voices. They're only heard in the boss room, which
   * most runs never reach, so they load when that room is built rather than
   * at startup. Safe to call more than once.
   */
  loadHomunculusSounds() {
    if (this._homunculusSoundsRequested) return;
    this._homunculusSoundsRequested = true;
    const loader = new AudioLoader();
    for (const [event, urls] of Object.entries(HOMUNCULUS_SOUND_URLS)) {
      Promise.all(urls.map(url => new Promise(resolve => {
        loader.load(url, buffer => resolve(buffer), undefined, () => resolve(null));
      }))).then(buffers => {
        this.homunculusBuffers[event] = buffers.filter(Boolean);
      });
    }
  }

  /**
   * A random homunculus voice for `event`: 'attack' (it's flicked at
   * a target), 'pain' (it's hurt but lives), 'death' or 'idle' (random muttering).
   * Returns the clip's length in seconds, or undefined if nothing played.
   */
  playHomunculus(event, position) {
    return this._play(this.homunculusBuffers[event] ?? [], position, 1.0);
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

    const obj = new Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new PositionalAudio(this.listener);
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

    const obj = new Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new PositionalAudio(this.listener);
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

    const obj = new Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new PositionalAudio(this.listener);
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

    const obj = new Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new PositionalAudio(this.listener);
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

    const obj = new Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new PositionalAudio(this.listener);
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
    const sound = new Audio(this.listener);
    sound.setBuffer(this.menuOpenBuffer);
    sound.setVolume(1.0);
    sound.play();
  }

  playGodsEyeIn() {
    if (!this.godsEyeInBuffer) return;
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();
    const sound = new Audio(this.listener);
    sound.setBuffer(this.godsEyeInBuffer);
    sound.setVolume(0.25);
    sound.play();
  }

  playGodsEyeOut() {
    if (!this.godsEyeOutBuffer) return;
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();
    const sound = new Audio(this.listener);
    sound.setBuffer(this.godsEyeOutBuffer);
    sound.setVolume(0.25);
    sound.play();
  }

  /**
   * Sanctuary: loops the golden orb's heartbeat at `position` until
   * stopHeartbeat(). Starts once the sound has loaded if it hasn't yet.
   */
  startHeartbeat(position) {
    this.stopHeartbeat();
    if (!this.heartbeatBuffer) {
      this._heartbeatPending = position.clone();
      return;
    }
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();

    const obj = new Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new PositionalAudio(this.listener);
    sound.setBuffer(this.heartbeatBuffer);
    sound.setRefDistance(20);
    sound.setVolume(1.0);
    sound.setLoop(true);
    obj.add(sound);
    sound.play();
    this._heartbeat = { obj, sound };
  }

  stopHeartbeat() {
    this._heartbeatPending = null;
    if (!this._heartbeat) return;
    const { obj, sound } = this._heartbeat;
    if (sound.isPlaying) sound.stop();
    this.gc.scene.remove(obj);
    this._heartbeat = null;
  }

  /**
   * Barbarian Rage: a heartbeat repeated `rate` times per second until
   * stopRageHeartbeat(). Restarting begins again at the given rate.
   */
  startRageHeartbeat(rate = 1) {
    this.stopRageHeartbeat();
    const state = { rate, timer: null };
    const beat = () => {
      this._playBuffer(this.rageHeartbeatBuffer, 1.0);
      state.timer = setTimeout(beat, 1000 / state.rate);
    };
    this._rageHeartbeat = state;
    beat();
  }

  /** Changes the Rage heartbeat's rate (beats per second), from the next beat on. */
  setRageHeartbeatRate(rate) {
    if (this._rageHeartbeat) this._rageHeartbeat.rate = rate;
  }

  stopRageHeartbeat() {
    if (!this._rageHeartbeat) return;
    clearTimeout(this._rageHeartbeat.timer);
    this._rageHeartbeat = null;
  }

  /** Barbarian's Exhausted turn: heavy breathing, played once (cut off by stopExhaustedBreath). */
  playExhaustedBreath() {
    this.stopExhaustedBreath();
    this._exhaustedBreath = this._playBuffer(this.exhaustedBreathBuffer, 0.15);
  }

  stopExhaustedBreath() {
    if (this._exhaustedBreath?.isPlaying) this._exhaustedBreath.stop();
    this._exhaustedBreath = null;
  }

  /** Warp Ring: played once as the teleport starts; long enough to cover the landing too. */
  playTeleport() {
    this._playBuffer(this.teleportBuffer, 0.8);
  }

  /** A disc passes through a Mirror Gate (the Warp Ring's sound, quieter, for now). */
  playMirrorGate() {
    this._playBuffer(this.teleportBuffer, 0.4);
  }

  /** Sanctuary shop purchase: one of the collect-loot sounds, picked at random. */
  playPurchase() {
    const buffers = this.purchaseBuffers;
    if (buffers.length === 0) return;
    this._playBuffer(buffers[Math.floor(Math.random() * buffers.length)], 0.8);
  }

  _playBuffer(buffer, volume) {
    if (!buffer) return;
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();
    const sound = new Audio(this.listener);
    sound.setBuffer(buffer);
    sound.setVolume(volume);
    sound.play();
    return sound;
  }

  playWizardRadiusBlast(position) {
    if (!this._loaded || !this.wizardRadiusBlastBuffer) return;
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();

    const obj = new Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new PositionalAudio(this.listener);
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

    const obj = new Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new PositionalAudio(this.listener);
    sound.setBuffer(this.wizardFlameStrikeBuffer);
    sound.setRefDistance(20);
    sound.setVolume(1.0);
    obj.add(sound);

    sound.play();
    sound.onEnded = () => { this.gc.scene.remove(obj); };
  }

  playRogueGrenadeExplode(position) {
    if (!this._loaded || !this.rogueGrenadeExplodeBuffer) return;
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();

    const obj = new Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new PositionalAudio(this.listener);
    sound.setBuffer(this.rogueGrenadeExplodeBuffer);
    sound.setRefDistance(20);
    sound.setVolume(1.0);
    obj.add(sound);

    sound.play();
    sound.onEnded = () => { this.gc.scene.remove(obj); };
  }

  playDeathCry(position) {
    if (!this._loaded || this.deathCryBuffers.length === 0) {
      this._lastDeathCryPromise = Promise.resolve();
      return;
    }
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();
    const buffer = this.deathCryBuffers[Math.floor(Math.random() * this.deathCryBuffers.length)];
    const obj = new Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);
    const sound = new PositionalAudio(this.listener);
    sound.setBuffer(buffer);
    sound.setRefDistance(20);
    sound.setVolume(0.75);
    obj.add(sound);
    this._lastDeathCryPromise = new Promise(resolve => {
      sound.onEnded = () => { this.gc.scene.remove(obj); resolve(); };
    });
    sound.play();
  }

  playGameOver() {
    if (!this._loaded || !this.gameOverBuffer) return;
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();
    const sound = new Audio(this.listener);
    sound.setBuffer(this.gameOverBuffer);
    sound.setVolume(0.25);
    sound.play();
  }

  playFireballCast(position) {
    if (!this._loaded || !this.fireballCastBuffer) return;
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();

    const obj = new Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new PositionalAudio(this.listener);
    sound.setBuffer(this.fireballCastBuffer);
    sound.setRefDistance(20);
    sound.setVolume(1.0);
    obj.add(sound);

    sound.play();
    sound.onEnded = () => { this.gc.scene.remove(obj); };
  }

  playFireballHit(position) {
    if (!this._loaded || !this.fireballHitBuffer) return;
    const ctx = this.listener.context;
    if (ctx.state === 'suspended') ctx.resume();

    const obj = new Object3D();
    obj.position.copy(position);
    this.gc.scene.add(obj);

    const sound = new PositionalAudio(this.listener);
    sound.setBuffer(this.fireballHitBuffer);
    sound.setRefDistance(20);
    sound.setVolume(1.0);
    obj.add(sound);

    sound.play();
    sound.onEnded = () => { this.gc.scene.remove(obj); };
  }

  /** A disc is burned by the Donut room's lava pit: one of the hisses, at random. */
  playLavaHiss(position) {
    this._play(this.lavaHissBuffers, position, 1.0);
  }

  /** The Donut room's lava pit erupts: one of the bursts, at random. */
  playLavaBurst(position) {
    this._play(this.lavaBurstBuffers, position, 1.0);
  }

  /** A mortar fires: one of the shot sounds, at random. */
  playMortarFire(position) {
    this._play(this.mortarFireBuffers, position, 1.0);
  }

  /**
   * Donut room: loops the volcano rumble under the music until
   * stopVolcanoLoop(). Starts once the sound has loaded if it hasn't yet.
   */
  startVolcanoLoop() {
    this._volcanoLoopPending = false;
    if (this._volcanoLoop) return;
    if (!this.volcanoLoopBuffer) {
      this._volcanoLoopPending = true;
      return;
    }
    const sound = this._playBuffer(this.volcanoLoopBuffer, 0.3);
    sound.setLoop(true);
    this._volcanoLoop = sound;
  }

  stopVolcanoLoop() {
    this._volcanoLoopPending = false;
    if (this._volcanoLoop?.isPlaying) this._volcanoLoop.stop();
    this._volcanoLoop = null;
  }

  /** The Pursuer starts one of its moves. */
  playPursuerMove(position) {
    if (this.pursuerMoveBuffer) this._play([this.pursuerMoveBuffer], position, 1.0);
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
      this._musicAudio = new Audio(this.listener);
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
