# dungeonflicker

**[Play it live at dungeonflicker.netlify.app](https://dungeonflicker.netlify.app/)**

*This game, including the art and this README, was proudly 100% vibe coded by a combination of models.*

## Description

Dungeonflicker is a 3D disc-flinging game where tactics and physics collide. Set in a torch-lit dungeon arena, players command unique discs, each with their own attributes and abilities. The core of the game revolves around skillful aiming and power control to outmaneuver opponents, using the environment and disc-specific powers to become the last one standing.

## Gameplay

The game unfolds in a turn-based fashion. Players take control of their active disc, aiming and launching it across the arena.

*   **Objective:** The primary goal is to disable all opponent discs by reducing their hit points to zero.
*   **Turns:** Each disc gets one throw per turn. Once a disc is thrown, play passes to the next active disc after the thrown disc comes to a complete stop.
*   **Physics and Collisions:** Discs interact realistically with walls, obstacles, and each other. Collisions can cause damage, and understanding the ricochet and momentum is key to advanced play.
*   **Damage:** When a thrown disc directly strikes an opponent, it inflicts damage, reducing their hit points.
*   **Disc Abilities:** Different disc "kinds," like the Barbarian, have unique characteristics. For example, the Barbarian can enter a "Rage" mode, which enhances their combat capabilities and is visually indicated by a red spotlight.
*   **Health Tracking:** The status of all discs, including their hit points, is displayed on screen. A disc is considered "dead" or disabled when its hit points reach zero.

## UI Elements

- **Disc Health Display:** Located at the top right, shows the names of discs along with their current hit points or "Dead" status.
- **Throw Info:** Appears while dragging, showing the throw's power (as a percentage of full power) and angle. "• Precision" is added while Shift is held.
- **Aim Line:** Shows the throw direction; its length is the true throw power (full length = full power). It turns gold in precision mode.
- **Throw Radius:** While Tab is held, every living disc shows a faint ring in its own colour marking how far it can slide with a full-power flick on open floor. Hovering a disc makes its ring bright and thick.
- **Character Popup:** Hovering a disc shows its health, attack and description at the top left; your characters also show their mana or charges.
- **Outline Highlight:** The currently selected disc is highlighted with a glowing outline.

## Controls

Mastering the controls is essential for victory in Dungeonflicker:

*   **Aim and Throw:** Click and drag the currently active disc. The direction of the drag determines the throw angle, and the length of the drag dictates the power.
*   **Precision Mode:** Hold `Shift` while aiming for short, exact throws. The drag is slowed so that 150 px of mouse movement spans 0–50% power, and the throw is capped at half power. Shift can be pressed or released mid-drag without the aim jumping.
*   **Throw Radius:** Hold `Tab` to show every disc's full-power reach.
*   **Cancel:** Press `Escape` while dragging to cancel the throw, or to cancel targeting (Flame Strike, Warp Ring, moving the Hardy Shield).
*   **Abilities:** `1`–`5` use the current character's abilities (shown as buttons at the bottom of the screen).
*   **Items:** `6` Warp Ring, `7` Ghost Ring, `8` Throwing Knife, `9` move the Hardy Shield (or click the shield itself).
*   **End Turn:** `Space`. It's ignored while a thrown disc is still moving.
*   **Camera:** `W`/`S` or `↑`/`↓` pan up/down, `A`/`D` or `←`/`→` pan sideways, `Q`/`E` rotate, mouse wheel zooms, `R` recenters, `G` toggles God's Eye View. `C` opens the Camera Controls menu, which lists these keys.
*   **Animated Dead:** `,` and `.` cycle the camera between the Necromancer's minions.
*   **Clear First-Time Metrics:** Press `Shift+M` to clear stored first-time event metrics from localStorage.
*   **(Implicit) Turn Management:** The game automatically handles turn progression to the next available disc once the current thrown disc stops.

## Technical Details

- The game uses Three.js for 3D rendering and physics approximations.
- Collision detection uses bounding spheres for discs and axis-aligned box collisions for walls.
- Internal walls are added perpendicular to the long boundaries to create strategic obstacles.
- The system manages throw states, turn order, and damage calculation all integrated with the animation loop.

## Roadmap

* Multiple levels
* New PC classes and monsters
* Instructions
* End state

### Proposed Sanctuary items

Ideas for the Sanctuary shop, not yet built. Already in the game: Warp Ring, Ghost Ring, Throwing Knife, Hardy Shield.

* **Decoy** — place a dummy disc that enemies target first until it's hit.
* **Gas Grenade** — throw it to leave a poison cloud for 2–3 rounds; anything that starts its turn inside takes 1 damage.
* **Cue Ball** — a head-on hit on an enemy transfers all your momentum to it, like a billiards stop shot: you stop dead and it flies off into walls, lava or other enemies.
* **Brake Ring** — once per turn, tap while your disc is sliding to stop it on the spot.
* **Spin Shot** — a sideways component in your drag puts curve on the throw so it bends around obstacles. The most ambitious of the set; prototype last.
* **Swap Class** — change a character's class between rooms.
* **Add Party Member** — a third character (needs turn order, spawning and resurrection to handle more than two).

Enjoy playing and strategizing in Dungeonflicker!
