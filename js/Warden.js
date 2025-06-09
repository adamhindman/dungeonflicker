import Disc from './Disc.js';

export default class Warden extends Disc {
    /**
     * Creates a new Warden NPC disc.
     * @param {THREE.Scene} scene - The Three.js scene.
     * @param {number} startX - Starting X position.
     * @param {number} startZ - Starting Z position.
     * @param {string} discName - Display name for the disc.
     * @param {number} skillLevel - AI skill level (0-100).
     * @param {GameController} gameController - Reference to the GameController instance.
     * @param {number} color - Disc color (hex), typically assigned from NPC_HEX_COLORS.
     * @param {string} description - A short description of the disc.
     */
    constructor(scene, startX, startZ, discName, skillLevel, gameController, color, description) {
        super(
            /* radius: */ 2.5, // Default radius, can be adjusted if Wardens should be larger/smaller
            /* height: */ 0.4, // Default height
            /* color: */ color,
            /* startX: */ startX,
            /* startZ: */ startZ,
            /* scene: */ scene,
            /* discName: */ discName,
            /* type: */ "NPC",
            /* kind: */ "Warden",  // Explicitly set kind
            /* hitPoints: */ 6,     // Default for Wardens
            /* skillLevel: */ skillLevel,
            /* imagePath: */ "images/warden-nobg.png", // Default for Wardens
            /* canDoReboundDamage: */ false,
            /* throwPowerMultiplier: */ 2, // Default for Wardens
            /* mass: */ 6,               // Default for Wardens
            /* rageIsActiveForNextThrow: */ false,
            /* rageWasUsedThisThrow: */ false,
            /* attackDamage: */ 2,
            /* gameController: */ gameController,
            /* description: */ description
        );
    }

    // Future Warden-specific methods will go here
    // e.g., tauntAbility() { ... }
    // e.g., defensiveStance() { ... }
}
