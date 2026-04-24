import Disc from './Disc.js';
import Skeleton from './Skeleton.js';
import Warden from './Warden.js';
import Blob from './Blob.js';

// Pre-converted hex color values for NPCs
const NPC_HEX_COLORS = [
  0xE6194B, // (230, 25, 75)
  0x3CB44B, // (60, 180, 75)
  0xFFE119, // (255, 225, 25)
  0x0082C8, // (0, 130, 200)
  0xF58230, // (245, 130, 48)
  0x911EB4, // (145, 30, 180)
  0xF032E6, // (240, 50, 230)
  0xD2F53C, // (210, 245, 60)
  0xFABECE, // (250, 190, 212)
  0x008080, // (0, 128, 128)
  0xDCBEFF, // (220, 190, 255)
  0xAA6E28, // (170, 110, 40)
  0xFFFAC8, // (255, 250, 200)
  0x800000, // (128, 0, 0)
  0xAAFFC3, // (170, 255, 195)
  0x808000, // (128, 128, 0)
  0xFFD7B4, // (255, 215, 180)
  0x000080, // (0, 0, 128)
  0x808080  // (128, 128, 128)
];

/**
 * Creates and positions all disc instances for a level.
 *
 * Holds a reference to GameController (gc) to access the scene, level geometry,
 * lava pools, disc descriptions, and the position-validity check.
 */
export class DiscSpawner {
  constructor(gc) {
    this.gc = gc;
  }

  // Challenge ratings: Skeleton=1, Warden=3, Blob level N = N+1
  _buildNpcPool(budget) {
    const maxBlobLevel = Math.max(1, budget - 2); // cost = level + 2; max affordable level
    const blobTemplates = Array.from({ length: maxBlobLevel }, (_, i) => ({
      kind: 'Blob', cost: i + 3, skillLevel: 75, startingLevel: i + 1,
    }));
    const TEMPLATES = [
      { kind: 'Skeleton', cost: 1, skillLevel: 80 },
      { kind: 'Warden',   cost: 3, skillLevel: 85 },
      ...blobTemplates,
    ];

    const result = [];
    let remaining = budget;
    const kindCounts = {};

    const affordable = () => TEMPLATES.filter(t => t.cost <= remaining);
    const shuffle    = arr => [...arr].sort(() => Math.random() - 0.5);

    const addNpc = (template) => {
      kindCounts[template.kind] = (kindCounts[template.kind] || 0) + 1;
      const n = kindCounts[template.kind];
      const name = template.kind === 'Blob'
        ? (n === 1 ? 'Gelatinous Cube' : `Gelatinous Cube ${n}`)
        : `${template.kind} ${n}`;
      result.push({ ...template, name });
      remaining -= template.cost;
    };

    // Pick two different kinds first to guarantee variety
    const shuffled = shuffle(affordable());
    if (shuffled.length === 0) return result;
    addNpc(shuffled[0]);

    const secondTemplate = shuffled.find(t => t.kind !== shuffled[0].kind && t.cost <= remaining);
    if (secondTemplate) addNpc(secondTemplate);

    // Fill remaining budget randomly
    while (remaining > 0) {
      const pool = affordable();
      if (pool.length === 0) break;
      addNpc(pool[Math.floor(Math.random() * pool.length)]);
    }

    return result;
  }

  /**
   * Build and place all player and NPC discs for the current level.
   * @param {object[]|null} playerStats  — carry-over HP from the previous level;
   *                                       null on a fresh game start.
   * @returns {Disc[]}  ordered array: [Barbarian, Wizard, Necromancer, ...NPCs]
   */
  spawn(playerStats = null) {
    const gc = this.gc;

    // *** DO NOT REMOVE THESE PARAMETER COMMENTS ***
    // Create discs with explicit parameters:
    // (radius, height, color, startX, startZ, scene, discName, type, kind, hitPoints, skillLevel, imagePath, canDoReboundDamage, throwPowerMultiplier, mass, rageIsActiveForNextThrow)

    const isHexLevel      = !!(gc.level && gc.level.hexRings);
    const isBullseyeLevel = !!(gc.level && gc.level.bullseyeRings);
    const isDonutLevel    = !!(gc.level && gc.level.donutRings);

    // ── Position-generation helpers ─────────────────────────────────────────

    const generateRandomPosition = (discRadius, existingPositions, minDistance = 4) => {
      const maxAttempts = 100;
      let attempts = 0;
      while (attempts < maxAttempts) {
        const x = (Math.random() - 0.5) * (gc.level.fieldWidth  - discRadius * 4);
        const z = (Math.random() - 0.5) * (gc.level.fieldDepth  - discRadius * 4);
        if (gc.isPositionValid(x, z, discRadius)) {
          let validDistance = true;
          for (const pos of existingPositions) {
            if (Math.sqrt((x - pos.x) ** 2 + (z - pos.z) ** 2) < minDistance) {
              validDistance = false;
              break;
            }
          }
          if (validDistance) return { x, z };
        }
        attempts++;
      }
      return null;
    };

    // For the hexagonal level, place NPCs on the elevated outer ring instead of
    // anywhere in the field.
    const generateOuterRingPosition = (discRadius, existingPositions, minDistance = 4) => {
      const { RC_in, RA_in } = gc.level.hexRings;
      const innerR = RC_in + 1.5;   // clear of the inner ramp edge
      const outerR = RA_in - 2.5;   // clear of the outer walls
      for (let attempt = 0; attempt < 100; attempt++) {
        const angle = Math.random() * Math.PI * 2;
        const r     = innerR + Math.random() * (outerR - innerR);
        const x     = Math.sin(angle) * r;
        const z     = Math.cos(angle) * r;
        if (!gc.isPositionValid(x, z, discRadius)) continue;
        let tooClose = false;
        for (const pos of existingPositions) {
          if (Math.sqrt((x - pos.x) ** 2 + (z - pos.z) ** 2) < minDistance) {
            tooClose = true;
            break;
          }
        }
        if (!tooClose) return { x, z };
      }
      return null;
    };

    // Donut level: place discs on the flat ring (r RING_INNER_R → OUTER_R with margin).
    const generateDonutRingPosition = (discRadius, existingPositions, minDistance = 4) => {
      const { RING_INNER_R, OUTER_R } = gc.level.donutRings;
      const innerR = RING_INNER_R + 1.5;
      const outerR = OUTER_R - 2.5;
      for (let attempt = 0; attempt < 100; attempt++) {
        const angle = Math.random() * Math.PI * 2;
        const r     = innerR + Math.random() * (outerR - innerR);
        const x     = Math.sin(angle) * r;
        const z     = Math.cos(angle) * r;
        if (!gc.isPositionValid(x, z, discRadius)) continue;
        let tooClose = false;
        for (const pos of existingPositions) {
          if (Math.sqrt((x - pos.x) ** 2 + (z - pos.z) ** 2) < minDistance) {
            tooClose = true;
            break;
          }
        }
        if (!tooClose) return { x, z };
      }
      return null;
    };

    // Bullseye level: place NPCs on a specific concentric ring.
    // innerR / outerR are the ring boundaries; a small margin keeps them clear of
    // ring edges and column obstacles.
    const generateBullseyeRingPos = (innerR, outerR, discRadius, existingPositions, minDistance = 4) => {
      for (let attempt = 0; attempt < 100; attempt++) {
        const angle = Math.random() * Math.PI * 2;
        const r     = innerR + 1.5 + Math.random() * (outerR - innerR - 3);
        const x     = Math.sin(angle) * r;
        const z     = Math.cos(angle) * r;
        if (!gc.isPositionValid(x, z, discRadius)) continue;
        let tooClose = false;
        for (const pos of existingPositions) {
          if (Math.sqrt((x - pos.x) ** 2 + (z - pos.z) ** 2) < minDistance) {
            tooClose = true;
            break;
          }
        }
        if (!tooClose) return { x, z };
      }
      return null;
    };

    // ── PC start positions ───────────────────────────────────────────────────
    // Bullseye: near the inner-ring edge (r ≈ 6.5), 120° apart.
    // Hex / Donut: random positions on the outer ring (same pool as NPCs).
    const BULLSEYE_PC_R = 6.5;
    const ringPCPositions = [];
    const _ringPCPos = (radius) => {
      const pos = isHexLevel   ? generateOuterRingPosition(radius, ringPCPositions, 5)
                : isDonutLevel ? generateDonutRingPosition(radius, ringPCPositions, 5)
                : null;
      if (pos) ringPCPositions.push(pos);
      return pos;
    };

    const _barbPos  = _ringPCPos(1.25);
    const _wizPos   = _ringPCPos(0.9);
    const _necroPos = _ringPCPos(1.0);

    const barbStartX  = isBullseyeLevel ? Math.sin(0)                * BULLSEYE_PC_R
                      : _barbPos  ? _barbPos.x  : 0;
    const barbStartZ  = isBullseyeLevel ? Math.cos(0)                * BULLSEYE_PC_R
                      : _barbPos  ? _barbPos.z  : 0;
    const wizStartX   = isBullseyeLevel ? Math.sin( 2 * Math.PI / 3) * BULLSEYE_PC_R
                      : _wizPos   ? _wizPos.x   : 0;
    const wizStartZ   = isBullseyeLevel ? Math.cos( 2 * Math.PI / 3) * BULLSEYE_PC_R
                      : _wizPos   ? _wizPos.z   : -3;
    const necroStartX = isBullseyeLevel ? Math.sin(-2 * Math.PI / 3) * BULLSEYE_PC_R
                      : _necroPos ? _necroPos.x : -3;
    const necroStartZ = isBullseyeLevel ? Math.cos(-2 * Math.PI / 3) * BULLSEYE_PC_R
                      : _necroPos ? _necroPos.z : -3;

    // ── Player discs ─────────────────────────────────────────────────────────
    // AI AGENT: Do not modify the following parameters unless explicitly instructed.
    // Player Discs are defined before NPCs to ensure they are earlier in the discs array for turn order.

    const selectedKinds = new Set(gc.selectedPlayerKinds || ['Barbarian', 'Wizard', 'Necromancer']);

    let barbarian = null;
    if (selectedKinds.has('Barbarian'))
    barbarian = new Disc(
      /* radius: */ 1.25, // don't change this
      /* height: */ 0.4,
      /* color: */ 0x0088ff,
      /* startX: */ barbStartX,
      /* startZ: */ barbStartZ,
      /* scene: */ gc.scene,
      /* discName: */ "Barbarian",
      /* type: */ "player",
      /* kind: */ "Barbarian",
      /* hitPoints: */ 5,
      /* skillLevel: */ 100,
      /* imagePath: */ "images/barbarian-nobg.png",
      /* canDoReboundDamage: */ false,
      /* throwPowerMultiplier: */ 1.3,
      /* mass: */ 1.5,
      /* rageIsActiveForNextThrow: */ false,
      /* rageWasUsedThisThrow: */ false,
      /* attackDamage: */ 1,
      /* gameController: */ gc,
      /* description: */ gc.discDescriptions.Barbarian
    );
    const barbStats = playerStats?.find(s => s.kind === "Barbarian");
    if (barbarian && barbStats) {
      barbarian.hitPoints    = barbStats.hitPoints;
      barbarian.maxHitPoints = barbStats.maxHitPoints;
    }

    // AI AGENT: Do not modify the following parameters unless explicitly instructed.
    let wizard = null;
    if (selectedKinds.has('Wizard'))
    wizard = new Disc(
      /* radius: */ .9,
      /* height: */ 0.4,
      /* color: */ 0x00C0C0,
      /* startX: */ wizStartX,
      /* startZ: */ wizStartZ,
      /* scene: */ gc.scene,
      /* discName: */ "Wizard",
      /* type: */ "player",
      /* kind: */ "Wizard",
      /* hitPoints: */ 3,
      /* skillLevel: */ 100,
      /* imagePath: */ "images/wizard-nobg.png",
      /* canDoReboundDamage: */ false,
      /* throwPowerMultiplier: */ 0.7,
      /* mass: */ .8,
      /* rageIsActiveForNextThrow: */ false,
      /* rageWasUsedThisThrow: */ false,
      /* attackDamage: */ 1,
      /* gameController: */ gc,
      /* description: */ gc.discDescriptions.Wizard
    );
    const wizStats = playerStats?.find(s => s.kind === "Wizard");
    if (wizard && wizStats) {
      wizard.hitPoints    = wizStats.hitPoints;
      wizard.maxHitPoints = wizStats.maxHitPoints;
    }

    // AI AGENT: Do not modify the following parameters unless explicitly instructed.
    let necromancer = null;
    if (selectedKinds.has('Necromancer'))
    necromancer = new Disc(
      /* radius: */ .9,
      /* height: */ 0.4,
      /* color: */ 0x6600CC,
      /* startX: */ necroStartX,
      /* startZ: */ necroStartZ,
      /* scene: */ gc.scene,
      /* discName: */ "Necromancer",
      /* type: */ "player",
      /* kind: */ "Necromancer",
      /* hitPoints: */ 3,
      /* skillLevel: */ 100,
      /* imagePath: */ "images/necromancer-nobg.png",
      /* canDoReboundDamage: */ false,
      /* throwPowerMultiplier: */ 0.7,
      /* mass: */ .8,
      /* rageIsActiveForNextThrow: */ false,
      /* rageWasUsedThisThrow: */ false,
      /* attackDamage: */ 1,
      /* gameController: */ gc,
      /* description: */ gc.discDescriptions.Necromancer
    );
    const necroStats = playerStats?.find(s => s.kind === "Necromancer");
    if (necromancer && necroStats) {
      necromancer.hitPoints    = necroStats.hitPoints;
      necromancer.maxHitPoints = necroStats.maxHitPoints;
    }

    const existingPositions = [barbarian, wizard, necromancer]
      .filter(Boolean)
      .map(d => ({ x: d.mesh.position.x, z: d.mesh.position.z }));

    // ── NPC discs ────────────────────────────────────────────────────────────
    // Budget: 10 points on level 1, +2 per room cleared
    const budget = 9 + (gc.currentLevelNumber - 1) * 2;
    const baseNpcDefinitions = this._buildNpcPool(budget);

    // Always add 3-5 free skeletons on top of the budget composition
    const bonusSkeletonCount = 3 + Math.floor(Math.random() * 3);
    const existingSkeletonCount = baseNpcDefinitions.filter(d => d.kind === 'Skeleton').length;
    for (let i = 0; i < bonusSkeletonCount; i++) {
      baseNpcDefinitions.push({ kind: 'Skeleton', cost: 1, skillLevel: 80, name: `Skeleton ${existingSkeletonCount + i + 1}` });
    }

    const npcData = baseNpcDefinitions.map((def, index) => ({
      ...def,
      color: NPC_HEX_COLORS[index % NPC_HEX_COLORS.length],
    }));

    const npcDiscs = [];
    // AI AGENT: Do not modify the following parameters unless explicitly instructed.
    let npcIdx = 0;
    for (const npc of npcData) {
      let position;
      if (isBullseyeLevel) {
        // First 4 NPCs on the middle ring (r 8–16), remaining on the outer ring (r 16–22).
        position = npcIdx < 4
          ? generateBullseyeRingPos(8, 16, 1.5, existingPositions)
          : generateBullseyeRingPos(16, 22, 1.5, existingPositions);
      } else if (isHexLevel) {
        position = generateOuterRingPosition(1.5, existingPositions);
      } else if (isDonutLevel) {
        position = generateDonutRingPosition(1.5, existingPositions);
      } else {
        position = generateRandomPosition(1.5, existingPositions);
      }
      npcIdx++;

      const finalX = position ? position.x : (Math.random() - 0.5) * gc.level.fieldWidth  * 0.7;
      const finalZ = position ? position.z : (Math.random() - 0.5) * gc.level.fieldDepth  * 0.7;

      // Common arguments for NPC constructors:
      // scene, startX, startZ, discName, skillLevel, gameController, color
      const commonArgs = [gc.scene, finalX, finalZ, npc.name, npc.skillLevel, gc, npc.color];

      let disc;
      if (npc.kind === "Skeleton") {
        disc = new Skeleton(...commonArgs, gc.discDescriptions.Skeleton);
      } else if (npc.kind === "Warden") {
        disc = new Warden(...commonArgs, gc.discDescriptions.Warden);
      } else if (npc.kind === "Blob") {
        disc = new Blob(...commonArgs, gc.discDescriptions.Blob, npc.startingLevel ?? 1);
      }
      // Future: Add else if for other NPC kinds here

      if (disc) {
        npcDiscs.push(disc);
      }
      existingPositions.push({ x: finalX, z: finalZ });
    }

    return [barbarian, wizard, necromancer].filter(Boolean).concat(npcDiscs);
  }
}
