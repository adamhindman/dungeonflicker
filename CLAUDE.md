# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server (hot reload)
npm run build    # Build to dist/
npm run preview  # Preview the production build locally
```

No test suite exists. Verify changes by running the dev server and playing the game.

## Architecture

The entry point is `main.js`, which just does `new GameController()`. Everything flows from there.

### Core Classes

- **`js/GameController.js`** — The central singleton. Owns the Three.js scene, animation loop, turn management, NPC AI, and high-level game logic. Delegates camera, physics, disc spawning, and lava generation to subsystem classes. It is a singleton (enforced via `let instance`).

- **`js/CameraController.js`** — Owns the Three.js camera, renderer, OrbitControls, wall-fade effect, panning, and rotation. Initialized via `init()`; `gc.camera`, `gc.renderer`, and `gc.controls` are aliased to these after init so all existing code continues to work.

- **`js/PhysicsEngine.js`** — Per-frame disc movement, wall/obstacle/boundary collision, and all disc-to-disc collision + damage resolution. `async update(deltaTime)` returns `true` when a portal triggers a level transition (so `animate()` can early-exit).

- **`js/DiscSpawner.js`** — Constructs and positions all player and NPC disc instances for a level. `spawn(playerStats)` returns `[barbarian, wizard, necromancer, ...npcDiscs]`.

- **`js/LavaManager.js`** — Generates lava pools for every level type (rect, circle, hex, donut, bullseye). `generate()` clears `gc.lavaPools`, creates new `LavaPool` instances, and adds meshes to `gc.scene`.

- **`js/Disc.js`** — Base class for all disc entities. Manages mesh creation (cylinder base + optional texture plane as a `THREE.Group`), spotlight state machine (`active`/`inactive`/`dead`/`raging`/`animatedDead`), physics properties (`velocity`, `mass`, `moving`), and `takeHit()`. When a disc has an `imagePath`, its mesh is a `THREE.Group` with `baseMesh` (cylinder) and `topMesh` (PlaneGeometry with texture). When no `imagePath`, it's a plain `THREE.Mesh`.

- **`js/Skeleton.js`**, **`js/Warden.js`** — Thin subclasses of `Disc` that set default stats for NPC types. New NPC types follow this pattern.

- **`js/Level.js`** — Builds Three.js geometry for the arena (floor, walls, obstacles, portals). Reads from `LevelConfiguration.js`.

- **`js/LevelConfiguration.js`** — Data-only config array defining field dimensions, internal walls, obstacles, and lava pools per level.

- **`js/LavaPool.js`** — Irregular polygon lava pool mesh with animated scrolling texture. Damage is applied in `GameController`'s animation loop by checking disc position against pool vertices.

- **`js/BarbarianController.js`**, **`js/WizardController.js`**, **`js/NecromancerController.js`** — Character-specific logic for each player class. Own action buttons, special abilities (rage, mana/orbs, animate dead), and per-turn state. Instantiated by `GameController` and initialized with the action buttons container in `init()`.

- **`js/UIManager.js`** — All DOM manipulation: HP lists, powers area, action buttons, game-over screen, disc info popup, FPS counter.

- **`js/InputHandler.js`** — Pointer and keyboard event handling (drag-to-throw, Escape cancel, WASD/arrow camera pan).

- **`js/Pathfinder.js`** — A\* pathfinding on a grid. Currently unused — available for future NPC AI work.

### Key Patterns

**Disc mesh structure matters for color operations.** When a disc has a texture (`imagePath`), its mesh is a Group. The `topMesh` child has `material.map` set. Always check `child.material.map ? 0xffffff : disc.initialColor` before setting `material.color` — setting it to anything other than white tints the texture.

**`this.currentDisc` is the authoritative attacker.** During collision handling, use `this.currentDisc === someDisc` to determine who was thrown this turn. Do not use `disc.moving` — residual velocity from bounces keeps `moving = true` even when a disc is effectively stationary.

**Turn flow:** `GameController.currentTurnIndex` cycles through `this.discs`. After a throw, the game waits for `waitingForDiscToStop` to clear, then advances via `advanceTurn()`. Player classes (Barbarian, Wizard, Necromancer) have special multi-action turns with dedicated action buttons managed in `GameController`.

**Disc kinds** (the `kind` property) drive most special-case logic:
- Player-controlled: `Barbarian`, `Wizard`, `Necromancer`
- NPC: `Skeleton`, `Warden` (and any future subclasses of Disc)
- Special/summoned: `Orb`, `HealingOrb`, `AnimatedDead`

When filtering for "real" player discs (e.g., for win conditions), exclude `Orb`, `HealingOrb`, and `AnimatedDead`.

**Spotlight states** are configured in `Disc.spotlightConfig` (static). Call `disc.updateSpotlightConfig(state)` to switch states. The `animatedDead` state uses a purple (`0x8833CC`) spotlight.

### Assets

Static assets live in `public/` and are served at the root. Disc images are in `public/images/` as `*-nobg.png` files referenced by `imagePath` in each Disc subclass constructor.

### Forbidden Actions

- Never attempt to write or run tests. All tests will be administered by the user.
- Never write Python, Ruby, or Bash scripts to manipulate files. Use the dedicated Edit, Write, Read, Glob, and Grep tools instead.
