import Disc from './Disc.js';

export default class Blob extends Disc {
    constructor(scene, startX, startZ, discName, skillLevel, gameController, color, description, startingLevel = 1) {
        super(
            /* radius: */ 1,
            /* height: */ 0.4,
            /* color: */ color,
            /* startX: */ startX,
            /* startZ: */ startZ,
            /* scene: */ scene,
            /* discName: */ discName,
            /* type: */ "NPC",
            /* kind: */ "Blob",
            /* hitPoints: */ 4,
            /* skillLevel: */ skillLevel,
            /* imagePath: */ "images/gelatinous-nobg.png",
            /* canDoReboundDamage: */ false,
            /* throwPowerMultiplier: */ 1,
            /* mass: */ 0.5,
            /* rageIsActiveForNextThrow: */ false,
            /* rageWasUsedThisThrow: */ false,
            /* attackDamage: */ 2,
            /* gameController: */ gameController,
            /* description: */ description
        );

        this.evolutionForm = 1;
        this.killCount = 0;
        this.targetDiscsThisTurn = [];
        this.initialMeshScale = this.mesh.scale.x;
        this.baseRadius = 1;

        // Apply any starting levels instantly (no animation)
        for (let i = 1; i < startingLevel; i++) {
            this.evolve(false);
        }
    }

    evolve(animate = true) {
        this.evolutionForm++;
        const targetRadius = 1 + (this.evolutionForm - 1) * 0.5;
        this.maxHitPoints = 4 + (this.evolutionForm - 1);
        this.hitPoints = Math.min(this.hitPoints + 1, this.maxHitPoints);
        this.attackDamage = 2 + (this.evolutionForm - 1);
        this.throwPowerMultiplier = Math.pow(0.8, this.evolutionForm - 1);
        this.mass = 0.5 * Math.pow(1.5, this.evolutionForm - 1);

        this.description = `A gelatinous cube that evolves with each corpse eaten. Grows stronger and slower as it absorbs its prey.\n\nThis blob has evolved to level ${this.evolutionForm}`;

        if (animate) {
            this.animateRadiusChange(targetRadius);
        } else {
            this.radius = targetRadius;
            const scale = this.initialMeshScale * (targetRadius / this.baseRadius);
            this.mesh.scale.set(scale, scale, scale);
        }
    }

    animateRadiusChange(targetRadius) {
        const startRadius = this.radius;
        const startTime = performance.now();
        const duration = 300;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeProgress = progress < 0.5
                ? 2 * progress * progress
                : -1 + 4 * progress - 2 * progress * progress;

            const newRadius = startRadius + (targetRadius - startRadius) * easeProgress;
            const radiusRatio = newRadius / this.baseRadius;
            const newMeshScale = this.initialMeshScale * radiusRatio;
            this.mesh.scale.set(newMeshScale, newMeshScale, newMeshScale);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.radius = targetRadius;
            }
        };

        requestAnimationFrame(animate);
    }

    recordPotentialKill(disc) {
        if (!this.targetDiscsThisTurn.includes(disc)) {
            this.targetDiscsThisTurn.push(disc);
        }
    }

    checkForNewKills() {
        this.targetDiscsThisTurn = [];
    }

    eatCorpse(corpse) {
        if (this.dead) return;
        if (corpse && corpse.dead && !corpse.isDissolving) {
            this.killCount++;
            if (corpse.mesh && corpse.mesh.parent) {
                corpse.mesh.parent.remove(corpse.mesh);
            }
            const index = this.gameController.discs.indexOf(corpse);
            if (index > -1) {
                this.gameController.discs.splice(index, 1);
            }
            this.evolve();
        }
    }
}
