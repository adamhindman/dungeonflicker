import { DoubleSide, Mesh, MeshBasicMaterial, RingGeometry, CircleGeometry, SphereGeometry, Vector3 } from 'three';
import Disc from './Disc.js';
import { isMainPC } from './PartyResources.js';
import { applyBlastAt } from './RadiusBlast.js';

// ── Defaults (a room's recipe can override any of these; see ROOM_ROSTERS) ────
export const MORTAR_DEFAULTS = {
  targeting: 'party',     // 'party': a random visible party member; 'random': anywhere on the floor
  damagesParty: true,     // its blasts hurt party members…
  damagesMonsters: true,  // …and monsters (mortars themselves are never hurt by them)
  onDefeat: 'capture',    // at 0 HP: 'capture' (it turns on the monsters) or 'destroy'
  requiredToClear: false, // true: the room isn't cleared until every mortar is beaten
  everyRound: false,      // false: mark on one turn, fire the next; true: fire and re-mark every turn
  damage: 2,
  radius: 7,
  force: 3.5,             // knockback at the centre, like the Wizard's Radius Blast
};
const HIT_POINTS = 3;
const COLOR = 0x4a4a52;              // iron
const CAPTURED_COLOR = 0x3a7bd5;     // the party's now
const MARK_COLOR = 0xff3b30;
const CAPTURED_MARK_COLOR = 0x4da3ff;
const SHELL_SECONDS = 0.9;
const SHELL_ARC_HEIGHT = 10;

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * A mortar: fixed in place, it marks a circle on the floor on one turn and
 * shells it on its next, damaging and shoving everything inside. Beaten (0 HP)
 * it is either destroyed or captured, after which it shells the monsters.
 */
export default class Mortar extends Disc {
  constructor(scene, startX, startZ, discName, gameController, description, config = {}) {
    super(
      /* radius: */ 1.2,
      /* height: */ 0.8,
      /* color: */ COLOR,
      /* startX: */ startX,
      /* startZ: */ startZ,
      /* scene: */ scene,
      /* discName: */ discName,
      /* type: */ "NPC",
      /* kind: */ "Mortar",
      /* hitPoints: */ HIT_POINTS,
      /* skillLevel: */ 0,
      /* imagePath: */ null,
      /* canDoReboundDamage: */ false,
      /* throwPowerMultiplier: */ 0,
      /* mass: */ 50, // collisions barely budge it
      /* rageIsActiveForNextThrow: */ false,
      /* rageWasUsedThisThrow: */ false,
      /* attackDamage: */ 0,
      /* gameController: */ gameController,
      /* description: */ description
    );
    this.immovable = true; // blasts hurt it but don't shove it
    this.config = { ...MORTAR_DEFAULTS, ...config };
    this.captured = false;
    this.mark = null; // { x, z, meshes } while a shell is due there
  }

  /**
   * The room opens with its first target already marked, as if it had gone
   * first in the turn order: its first turn shells it.
   */
  onRoomStart() {
    this._paint();
  }

  /** Its turn: shell the marked circle if there is one, otherwise mark one. */
  async takeTurn() {
    const gc = this.gameController;
    if (this.mark) {
      await this._fire();
      // The game ended, or someone it shoved slid out through the door into the next room.
      if (gc.gameOverState.active || !gc.discs.includes(this)) return;
      if (this.config.everyRound) this._paint();
    } else {
      this._paint();
    }
    await wait(400);
    if (gc.gameOverState.active || !gc.discs.includes(this)) return;
    await gc._proceedToNextPlayerTurn();
  }

  /** Captured mortars can't be hurt any more; a beaten one is captured or destroyed. */
  takeHit(damageAmount = 1, attacker = null) {
    if (this.captured) return;
    super.takeHit(damageAmount, attacker);
    if (this.hitPoints <= 0 && this.config.onDefeat === 'capture') this._capture();
  }

  die(silent = false) {
    if (this.dead) return;
    this._clearMark();
    super.die(silent);
    this.startDissolve(0.8); // removed from the room: no corpse to raise or eat
  }

  dispose() {
    this._clearMark();
    super.dispose();
  }

  _capture() {
    const gc = this.gameController;
    this.captured = true;
    this.hitPoints = this.maxHitPoints; // alive again, on the party's side
    this._clearMark(); // its shell for this round never comes
    this.initialColor = CAPTURED_COLOR;
    this.baseMesh?.material?.color.setHex(CAPTURED_COLOR);
    gc.updateDiscNames();
    gc.checkGameOverConditions(); // it may have been the last enemy
  }

  /** Marks where its next shell will land: on a target's current spot, or anywhere. */
  _paint() {
    const spot = this._chooseTarget();
    if (!spot) return; // nothing to aim at: it idles
    const gc = this.gameController;
    const { radius } = this.config;
    const color = this.captured ? CAPTURED_MARK_COLOR : MARK_COLOR;
    const y = (gc.level.getTerrainHeightAt?.(spot.x, spot.z) ?? 0) + 0.05;
    const outline = new Mesh(
      new RingGeometry(radius - 0.12, radius, 64),
      new MeshBasicMaterial({ color, transparent: true, opacity: 0.85, side: DoubleSide, depthWrite: false }),
    );
    const fill = new Mesh(
      new CircleGeometry(radius - 0.12, 64),
      new MeshBasicMaterial({ color, transparent: true, opacity: 0.12, side: DoubleSide, depthWrite: false }),
    );
    for (const mesh of [outline, fill]) {
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(spot.x, y, spot.z);
      gc.scene.add(mesh);
    }
    this.mark = { x: spot.x, z: spot.z, target: spot.target ?? null, meshes: [outline, fill] };
  }

  /**
   * Where to mark: a target's spot ({ x, z, target }) or a random one ({ x, z }).
   * Each target draws only one mortar's mark at a time: a mortar aimed at the
   * party with nobody left unmarked picks a random spot instead, so a lone
   * survivor isn't shelled by every gun at once. (Captured mortars double up
   * on monsters rather than shell the floor at random.)
   */
  _chooseTarget() {
    const gc = this.gameController;
    const pick = list => list[Math.floor(Math.random() * list.length)];
    const at = disc => ({ x: disc.mesh.position.x, z: disc.mesh.position.z, target: disc });
    const marked = new Set(gc.discs
      .filter(d => d !== this && d.kind === 'Mortar' && d.mark?.target)
      .map(d => d.mark.target));
    const unmarked = list => list.filter(d => !marked.has(d));
    if (this.captured) {
      const monsters = gc.discs.filter(d => d.type === 'NPC' && !d.dead && d.hitPoints > 0 &&
        d.kind !== 'Mortar' && d.kind !== 'Pursuer' && d.kind !== 'Fireball');
      if (monsters.length === 0) return null;
      const fresh = unmarked(monsters);
      return at(pick(fresh.length ? fresh : monsters));
    }
    if (this.config.targeting === 'party') {
      const party = unmarked(gc.discs.filter(d => isMainPC(d) && !d.dead && d.hitPoints > 0 && !d.isHidden));
      if (party.length) return at(pick(party));
      // Everyone's already marked: fall through to a random spot
    }
    // Anywhere on the floor
    const level = gc.level;
    for (let attempt = 0; attempt < 50; attempt++) {
      const x = (Math.random() - 0.5) * level.fieldWidth;
      const z = (Math.random() - 0.5) * level.fieldDepth;
      if (level.isPositionValid(x, z, 0)) return { x, z };
    }
    return null;
  }

  _clearMark() {
    if (!this.mark) return;
    for (const mesh of this.mark.meshes) {
      this.gameController.scene.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
    }
    this.mark = null;
  }

  /** Launches a shell at the marked circle and blasts it. */
  async _fire() {
    const gc = this.gameController;
    const { x, z } = this.mark;
    const from = this.mesh.position.clone().setY(this.mesh.position.y + 1);
    const to = new Vector3(x, (gc.level.getTerrainHeightAt?.(x, z) ?? 0) + 0.3, z);

    // Launch
    gc.soundManager?.playMortarFire(from);
    gc.explosionParticles?.spawn(from, { count: 14, scale: 0.5 });
    await this._flyShell(from, to);
    if (!gc.discs.includes(this)) return;

    // Impact
    this._clearMark();
    gc.soundManager?.playRogueGrenadeExplode(to);
    gc.explosionParticles?.spawn(to, { count: 60, scale: 1.4 });
    gc.blastRings?.spawn(to.x, to.y, to.z, this.config.radius, this.captured ? CAPTURED_MARK_COLOR : MARK_COLOR);
    const { damage, radius, force, damagesParty, damagesMonsters } = this.config;
    applyBlastAt(gc, x, z, radius, force, {
      damage,
      shouldDamage: d => (d.type === 'player' && damagesParty) || (d.type === 'NPC' && damagesMonsters),
      skip: d => d.kind === 'Mortar', // mortar blasts never touch mortars
    });
    await gc._waitForCrusherFlingToSettle(); // let the shoved come to rest
    gc.updateAllDiscDeadStates();
    gc.updateDiscNames();
    gc.checkGameOverConditions();
  }

  /** A small dark shell arcing from `from` to `to`. Resolves when it lands. */
  _flyShell(from, to) {
    const gc = this.gameController;
    const shell = new Mesh(new SphereGeometry(0.3, 10, 8), new MeshBasicMaterial({ color: 0x1a1a1a }));
    shell.position.copy(from);
    gc.scene.add(shell);
    const peak = Math.max(from.y, to.y) + SHELL_ARC_HEIGHT;
    const control = 2 * peak - (from.y + to.y) / 2; // makes the parabola top out at `peak`
    const start = performance.now();
    return new Promise(resolve => {
      const step = () => {
        const t = Math.min((performance.now() - start) / 1000 / SHELL_SECONDS, 1);
        shell.position.set(
          from.x + (to.x - from.x) * t,
          (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * control + t * t * to.y,
          from.z + (to.z - from.z) * t,
        );
        if (t < 1) { requestAnimationFrame(step); return; }
        gc.scene.remove(shell);
        shell.geometry.dispose();
        shell.material.dispose();
        resolve();
      };
      requestAnimationFrame(step);
    });
  }
}
