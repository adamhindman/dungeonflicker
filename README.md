# dungeonflicker

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
- **Throw Info:** Appears near the pointer during dragging, showing magnitude and angle of the throw.
- **Outline Highlight:** The currently selected disc is highlighted with a glowing outline.

## Controls

Mastering the controls is essential for victory in Dungeonflicker:

*   **Aim and Throw:** Click and drag the currently active disc. The direction of the drag determines the throw angle, and the length of the drag dictates the power.
*   **Cancel Throw:** Press the `Escape` key while dragging to cancel the current throw before release.
*   **Camera Pan:** Use `WASD` or `Arrow Keys` to pan the camera and get a better view of the arena.
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

Enjoy playing and strategizing in Dungeonflicker!
