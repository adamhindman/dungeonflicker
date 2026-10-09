import { BoxGeometry, DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry, RepeatWrapping } from "three";
import { addMirrorGate, linkMirrorGates } from "../MirrorGates.js";

// The Mirror Gates room (north = -Z; camera sits south): the standard room's
// layout scaled up by SCALE (walls stay as thick, gates as wide), with a
// diamond in the middle, an inner wall off the north and south
// walls, and a solid block in two corners. Five pairs of Mirror Gates, matched
// by colour: one pair across the outer walls, the rest linking the outer
// walls and the north-east block to the diamond's faces.
//
//   ┌───────┬──────────door──────purple──┬──────┐
//   │       │                            │block │
//   │red    │                            └─blue─┘
//   │                  green ◇ orange           │
//   │orange              blue  ◇ red            │
//   │                                      │    │
//   ├─────┐                                │green
//   │block│             purple             │    │
//   └─────┴────────────────────────────────┴────┘
//
// Every wall and block is axis-aligned (exact box collision); the diamond is a
// 'polygon' obstacle with its own exact collision.
const SCALE = 1.3;
const HALF_W = 24 * SCALE;   // 62.4 × 46.8
const HALF_D = 18 * SCALE;
const WALL_FACE = 0.25;      // the outer walls' inner faces stand this far inside the field edge
const INNER_WALL = 1;        // the inner walls' thickness
const CAMERA_VIEW = { distance: 40 * SCALE, targetZ: 0 };

const DIAMOND_R = 5.5 * SCALE;  // centre to corner
const DIAMOND = [[0, -DIAMOND_R], [DIAMOND_R, 0], [0, DIAMOND_R], [-DIAMOND_R, 0]];

// A box from its edges (in the unscaled layout).
const box = (x0, x1, z0, z1) => ({
  x: (x0 + x1) / 2 * SCALE, z: (z0 + z1) / 2 * SCALE,
  width: (x1 - x0) * SCALE, depth: (z1 - z0) * SCALE,
});
// An inner wall: a line (in the unscaled layout) INNER_WALL thick.
const innerWall = (x, z0, z1) => ({
  x: x * SCALE, z: (z0 + z1) / 2 * SCALE, width: INNER_WALL, depth: (z1 - z0) * SCALE,
});
const NE_BLOCK = box(17.5, 24, -18, -10);
const NORTH_INNER = innerWall(-15, -18, -5);
const SOUTH_INNER = innerWall(13.25, 5.5, 18);
const BLOCKS = [
  NE_BLOCK,
  box(-24, -18, 10.5, 18),   // south-west corner
  NORTH_INNER,
  SOUTH_INNER,
];

const S = Math.SQRT1_2;
const DIAMOND_MID = DIAMOND_R / 2;
const GATES = [
  // Across the room: north wall ↔ south wall.
  { pair: 'purple', x: 12.5 * SCALE, z: -HALF_D + WALL_FACE, nx: 0, nz: 1 },
  { pair: 'purple', x: 0, z: HALF_D - WALL_FACE, nx: 0, nz: -1 },
  // West wall ↔ the diamond's north-east face.
  { pair: 'orange', x: -HALF_W + WALL_FACE, z: 2 * SCALE, nx: 1, nz: 0 },
  { pair: 'orange', x: DIAMOND_MID, z: -DIAMOND_MID, nx: S, nz: -S },
  // West wall (beside the north inner wall) ↔ the diamond's south-east face.
  { pair: 'red', x: -HALF_W + WALL_FACE, z: -11.5 * SCALE, nx: 1, nz: 0 },
  { pair: 'red', x: DIAMOND_MID, z: DIAMOND_MID, nx: S, nz: S },
  // East wall (beside the south inner wall) ↔ the diamond's north-west face.
  { pair: 'green', x: HALF_W - WALL_FACE, z: 12 * SCALE, nx: -1, nz: 0 },
  { pair: 'green', x: -DIAMOND_MID, z: -DIAMOND_MID, nx: -S, nz: -S },
  // The north-east block's south face ↔ the diamond's south-west face.
  { pair: 'blue', x: NE_BLOCK.x, z: NE_BLOCK.z + NE_BLOCK.depth / 2, nx: 0, nz: 1 },
  { pair: 'blue', x: -DIAMOND_MID, z: DIAMOND_MID, nx: -S, nz: S },
];

export function loadMirror() {
  this.circleRadius   = null;
  this._circularWalls = null;
  this.fieldWidth  = HALF_W * 2;
  this.fieldDepth  = HALF_D * 2;
  this.cameraView  = CAMERA_VIEW;

  // ── Floor ──────────────────────────────────────────────────────────────────
  const tileTexture = this.textureLoader.load("images/tile-stone-1.webp");
  tileTexture.wrapS = RepeatWrapping;
  tileTexture.wrapT = RepeatWrapping;
  tileTexture.repeat.set(this.fieldWidth / 6, this.fieldDepth / 6);
  this.floor = new Mesh(
    new PlaneGeometry(this.fieldWidth, this.fieldDepth),
    new MeshStandardMaterial({ map: tileTexture, roughness: 0.6, metalness: 0.2, side: DoubleSide }),
  );
  this.floor.rotation.x = -Math.PI / 2;
  this.floor.receiveShadow = true;
  this.scene.add(this.floor);

  // ── Outer walls ────────────────────────────────────────────────────────────
  const wallTex = this.textureLoader.load("images/tile-stone-1.webp");
  wallTex.wrapS = RepeatWrapping;
  wallTex.wrapT = RepeatWrapping;
  this.wallMaterial = new MeshStandardMaterial({ map: wallTex, roughness: 0.6, metalness: 0.2 });

  const addWall = (name, width, depth, x, z) => {
    const geo = new BoxGeometry(width, this.wallHeight, depth);
    this.applyWallUVs(geo, width, this.wallHeight, depth);
    const mesh = new Mesh(geo, this.wallMaterial);
    mesh.position.set(x, this.wallHeight / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.walls[name] = mesh;
  };
  addWall('north', this.fieldWidth, 0.5, 0, -HALF_D);
  addWall('south', this.fieldWidth, 0.5, 0, HALF_D);
  addWall('east', 0.5, this.fieldDepth, HALF_W, 0);
  addWall('west', 0.5, this.fieldDepth, -HALF_W, 0);
  this._createDoor(); // in the middle of the north wall

  // ── Obstacles: the blocks, the inner walls and the diamond ────────────────
  this.obstacles = [];
  const diamond = {
    type: 'polygon', x: 0, z: 0, points: DIAMOND,
    width: DIAMOND_R * 2, depth: DIAMOND_R * 2, // circumscribed (spawn checks)
  };
  [...BLOCKS.map(b => ({ ...b, type: 'wall', rotY: 0 })), diamond].forEach((obstacle, i) => {
    this.obstacles.push(obstacle);
    this.createObstacleMesh(obstacle, i);
  });

  // ── Mirror Gates ───────────────────────────────────────────────────────────
  for (const gate of GATES) addMirrorGate(this, gate);
  linkMirrorGates(this);

  this._initTransparency();
  this._addLighting();
}
