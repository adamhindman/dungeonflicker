import Disc from './Disc.js';

export default class Skeleton extends Disc {
    /**
     * Creates a new Skeleton NPC disc.
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
            /* radius: */ 1.0,
            /* height: */ 0.4,
            /* color: */ color,
            /* startX: */ startX,
            /* startZ: */ startZ,
            /* scene: */ scene,
            /* discName: */ discName,
            /* type: */ "NPC",
            /* kind: */ "Skeleton", // Explicitly set kind
            /* hitPoints: */ 2,     // Default for Skeletons
            /* skillLevel: */ skillLevel,
            /* imagePath: */ "images/skeleton-nobg.png", // Default for Skeletons
            /* canDoReboundDamage: */ false,
            /* throwPowerMultiplier: */ 0.5, // Default for Skeletons
            /* mass: */ 0.8,               // Default for Skeletons
            /* rageIsActiveForNextThrow: */ false,
            /* rageWasUsedThisThrow: */ false,
            /* attackDamage: */ 1,
            /* gameController: */ gameController,
            /* description: */ description
        );
    }

    // Future Skeleton-specific methods will go here
    // e.g., rattleBones() { ... }
    // e.g., rangedAttack() { ... }
}