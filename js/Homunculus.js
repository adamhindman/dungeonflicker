import Disc from './Disc.js';
import { isMainPC } from './PartyResources.js';

export const HOMUNCULUS_CAP = 16; // most homunculi alive at once
// Homunculus corpses kept on the board; older ones fade away. Every disc
// carries its own spotlight, so dozens of corpses would bog the renderer down.
const CORPSES_KEPT = 6;

/**
 * Grows up to `count` homunculi beside `parent` (Paracelsus or an alembic),
 * never more than HOMUNCULUS_CAP alive, each copying a random party member,
 * alive or dead. They're added to `discs` right after the parent, so they act
 * straight after it.
 * @param {Disc} parent
 * @param {number} count
 * @param {Disc[]} discs - the disc list to add them to (the room's, or the
 *   spawner's while it builds the room)
 * @param {object} [options]
 * @param {{x: number, z: number}[]} [options.spots] - places to try first, in order
 */
export function growHomunculi(parent, count, discs, { spots = [] } = {}) {
    const gc = parent.gameController;
    const alive = discs.filter(d => d.kind === 'Homunculus' && !d.dead).length;
    const originals = discs.filter(d => isMainPC(d) && d.imagePath);
    if (originals.length === 0) return;
    let insertAt = discs.indexOf(parent) + 1;
    for (let i = 0; i < Math.min(count, HOMUNCULUS_CAP - alive); i++) {
        const original = originals[Math.floor(Math.random() * originals.length)];
        const radius = original.radius / 2;
        const preset = spots[i];
        const spot = preset && isFreeSpot(gc, preset.x, preset.z, radius, discs)
            ? preset
            : spotBeside(parent, radius, discs);
        if (!spot) continue;
        gc.level.homunculiGrown = (gc.level.homunculiGrown ?? 0) + 1;
        const homunculus = new Homunculus(gc.scene, spot.x, spot.z,
            `Homunculus ${gc.level.homunculiGrown}`, gc, original, gc.discDescriptions.Homunculus);
        discs.splice(insertAt++, 0, homunculus);
    }
    if (discs === gc.discs) gc.updateDiscNames();
}

/** Whether a disc of `radius` fits at (x, z): on the floor and clear of other discs. */
function isFreeSpot(gc, x, z, radius, discs) {
    return gc.level.isPositionValid(x, z, radius) &&
        discs.every(d => d.dead || d.type === 'item' ||
            Math.hypot(d.mesh.position.x - x, d.mesh.position.z - z) > d.radius + radius + 0.2);
}

/** A free spot just around `parent` for a disc of `radius`, or null. */
function spotBeside(parent, radius, discs) {
    const gc = parent.gameController;
    const { x: cx, z: cz } = parent.mesh.position;
    for (let attempt = 0; attempt < 30; attempt++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = parent.radius + radius + 0.4 + Math.random() * 2;
        const x = cx + Math.cos(angle) * dist;
        const z = cz + Math.sin(angle) * dist;
        if (isFreeSpot(gc, x, z, radius, discs)) return { x, z };
    }
    return null;
}

/**
 * A homunculus: a small, imperfect copy of one of the party, grown by
 * Paracelsus. It wears that character's art on a disc half their size, with a
 * black border, and fights like a skeleton.
 */
export default class Homunculus extends Disc {
    /**
     * @param {THREE.Scene} scene
     * @param {number} startX
     * @param {number} startZ
     * @param {string} discName
     * @param {GameController} gameController
     * @param {Disc} original - the party member it copies (alive or dead)
     * @param {string} description
     */
    constructor(scene, startX, startZ, discName, gameController, original, description) {
        super(
            /* radius: */ original.radius / 2,
            /* height: */ 0.3,
            /* color: */ 0x000000, // black border
            /* startX: */ startX,
            /* startZ: */ startZ,
            /* scene: */ scene,
            /* discName: */ discName,
            /* type: */ "NPC",
            /* kind: */ "Homunculus",
            /* hitPoints: */ 2,
            /* skillLevel: */ 70,
            /* imagePath: */ original.imagePath,
            /* canDoReboundDamage: */ false,
            /* throwPowerMultiplier: */ 0.35,
            /* mass: */ 0.5,
            /* rageIsActiveForNextThrow: */ false,
            /* rageWasUsedThisThrow: */ false,
            /* attackDamage: */ 1,
            /* gameController: */ gameController,
            /* description: */ description
        );
        this.originalKind = original.kind; // which party member it copies
        this.diedAt = null;                // when it died, to find the oldest corpses
    }

    /** Dies; then only the CORPSES_KEPT most recent homunculus corpses stay, the rest fade away. */
    die(silent = false) {
        if (this.dead) return;
        super.die(silent);
        this.diedAt = performance.now();
        const corpses = this.gameController.discs
            .filter(d => d.kind === 'Homunculus' && d.dead && !d.isDissolving)
            .sort((a, b) => a.diedAt - b.diedAt);
        corpses.slice(0, Math.max(0, corpses.length - CORPSES_KEPT)).forEach(d => d.startDissolve(1));
    }
}
