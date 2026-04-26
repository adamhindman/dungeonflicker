import Disc from './Disc.js';

export default class FireElemental extends Disc {
    constructor(scene, startX, startZ, discName, skillLevel, gameController, color, description) {
        super(
            /* radius: */ 1.0,
            /* height: */ 0.4,
            /* color: */ color,
            /* startX: */ startX,
            /* startZ: */ startZ,
            /* scene: */ scene,
            /* discName: */ discName,
            /* type: */ "NPC",
            /* kind: */ "FireElemental",
            /* hitPoints: */ 3,
            /* skillLevel: */ skillLevel,
            /* imagePath: */ "images/fire-elemental-nobg.png",
            /* canDoReboundDamage: */ false,
            /* throwPowerMultiplier: */ 1.0,
            /* mass: */ 1.2,
            /* rageIsActiveForNextThrow: */ false,
            /* rageWasUsedThisThrow: */ false,
            /* attackDamage: */ 2,
            /* gameController: */ gameController,
            /* description: */ description
        );
    }
}
