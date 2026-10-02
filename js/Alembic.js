import Disc from './Disc.js';
import { growHomunculi } from './Homunculus.js';

const SPAWN_MIN = 1; // homunculi grown on each of its turns
const SPAWN_MAX = 3;

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * An alembic: one of Paracelsus's breakable flasks in the boss room. It never
 * moves; on its turn it grows 1–3 homunculi beside it. Breaking it (3 HP)
 * stops the flow, and every alembic breaks when Paracelsus falls (his
 * homunculi don't). A broken
 * alembic dissolves away rather than leaving a corpse.
 */
export default class Alembic extends Disc {
    constructor(scene, startX, startZ, discName, gameController, description) {
        super(
            /* radius: */ 1.1,
            /* height: */ 0.9,
            /* color: */ 0x2e9e6b, // glassy green, until it gets its art
            /* startX: */ startX,
            /* startZ: */ startZ,
            /* scene: */ scene,
            /* discName: */ discName,
            /* type: */ "NPC",
            /* kind: */ "Alembic",
            /* hitPoints: */ 3,
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
    }

    /** Its turn: grow 1–3 homunculi, then pass. */
    async takeTurn() {
        const gc = this.gameController;
        const count = SPAWN_MIN + Math.floor(Math.random() * (SPAWN_MAX - SPAWN_MIN + 1));
        growHomunculi(this, count, gc.discs);
        await wait(600);
        await gc._proceedToNextPlayerTurn();
    }

    die(silent = false) {
        if (this.dead) return;
        super.die(silent);
        this.startDissolve(0.8); // shatters: no corpse to raise or eat
    }
}
