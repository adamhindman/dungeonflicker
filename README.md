# dungeonflicker

*This entire game, including this README, was vibe coded with GPT-4.1.mini.*

## Introduction

Dungeonflicker is a 3D physics-based disc throwing game implemented using Three.js. Players take turns throwing discs across a bounded field littered with internal walls. The discs collide with each other and obstacles, taking damage when hit. The goal is to strategically throw discs to outmaneuver and disable opponents' discs while protecting your own.

## How to Play

- The game consists of multiple discs with varying sizes and hit points placed on a rectangular field surrounded by boundary walls and internal obstacles.
- Players take turns controlling one disc at a time (`currentDisc`).
- To throw a disc, click and drag on the disc to indicate throw direction and strength.
- The drag direction relative to the camera determines the throw direction; drag length affects throw speed up to a maximum.
- Each disc can only be thrown once per turn.
- After throwing, the system waits for the disc to come to a near stop before allowing the next disc to be thrown.
- Discs collide with walls and other discs physically; the edges of discs just touch during collisions.
- When a disc is hit directly by the throwing disc, it takes damage reducing its hit points.
- Hit points are tracked per disc, and a disc is disabled ("dead") when its hit points reach zero.
- The game displays the names and hit points status of all discs dynamically in the top-right corner of the screen for easy tracking.

## UI Elements

- **Disc Health Display:** Located at the top right, shows the names of discs along with their current hit points or "Dead" status.
- **Throw Info:** Appears near the pointer during dragging, showing magnitude and angle of the throw.
- **Outline Highlight:** The currently selected disc is highlighted with a glowing outline.

## Controls

- **Click and drag:** Aim and set power for the current disc's throw.
- **Escape key:** Cancel a throw in progress before releasing.
- Throws are disabled until the currently thrown disc completely stops moving.
- Turn automatically advances to the next non-dead disc after the current disc stops.

## Technical Details

- The game uses Three.js for 3D rendering and physics approximations.
- Collision detection uses bounding spheres for discs and axis-aligned box collisions for walls.
- Internal walls are added perpendicular to the long boundaries to create strategic obstacles.
- The system manages throw states, turn order, and damage calculation all integrated with the animation loop.

Enjoy playing and strategizing in Dungeonflicker!