import { BoxGeometry, BufferGeometry, DoubleSide, Float32BufferAttribute, Mesh, MeshStandardMaterial, RepeatWrapping } from "three";

// The Siege floorplan (north = -Z; camera sits south): an L. The party starts
// at the top of the west arm; the monsters wait along the south arm; three
// mortars are dug in at the east end of the south arm behind a wall with two
// gaps. The gate to the next room is in the inner wall, just past the corner.
//
//    ┌───────────┐
//    │   PCs     │
//    │           └──gate─────────┬──────┐
//    │       ○                   ║   M  │   ← wall segment shields a mortar
//    │                                  │   ← gap
//    │  NPCs        NPCs         ║   M  │
//    │  ○                               │   ← gap
//    │                           ║   M  │
//    └──────────────────────────────────┘
//    (○ pillars in the elbow are cover)
//
// Every wall is axis-aligned, so the standard AABB wall collision is exact.
// The room is centred on the origin because the field-edge clamp assumes
// ±fieldWidth/2 and ±fieldDepth/2.
const WEST_X   = -25;   // the outer walls
const EAST_X   = 25;
const NORTH_Z  = -19;
const SOUTH_Z  = 19;
const INNER_X  = -1;    // the west arm's east wall (the L's inside corner is at INNER_X, INNER_Z)
const INNER_Z  = -5;    // the south arm's north wall, where the gate is
const GATE_X   = 6.5;   // the gate's centre, along the inner wall

// The mortars' wall: three segments with two gaps, across the south arm.
const MORTAR_WALL_X = 18.5;
const MORTAR_WALL_THICKNESS = 1.5;
const GAP_WIDTH = 4.5;  // a party member fits; a Warden doesn't
const SEGMENT_LENGTH = ((SOUTH_Z - INNER_Z) - 2 * GAP_WIDTH) / 3; // 5
const SEGMENTS = [0, 1, 2].map(i => {
  const z0 = INNER_Z + i * (SEGMENT_LENGTH + GAP_WIDTH);
  return { z0, z1: z0 + SEGMENT_LENGTH };
});

// Cover in the elbow, where the two arms meet: two pillars.
const ELBOW_COVER = [
  { x: -10, z: 1,  width: 2, depth: 2, type: 'pillar', rotY: 0 },
  { x: -19, z: 10, width: 2, depth: 2, type: 'pillar', rotY: 0 },
];

// Each mortar sits behind a wall segment.
const MORTAR_X = 22;
const MORTAR_SPOTS = SEGMENTS.map(({ z0, z1 }) => ({ x: MORTAR_X, z: (z0 + z1) / 2 }));

// Where the party starts: the top of the west arm.
const PC_SLOTS = [
  { x: -15, z: -14 }, { x: -11, z: -14 },
  { x: -15, z: -10 }, { x: -11, z: -10 },
];

// Monsters start along the south arm, short of the mortars' wall.
const NPC_SPAWN_AREA = { minX: -21, maxX: MORTAR_WALL_X - 4, minZ: 3, maxZ: SOUTH_Z - 3 };

// A touch bigger than the standard rooms: pull the camera back a little.
const CAMERA_VIEW = { distance: 42, targetZ: 0 };

export function loadSiege() {
  const wallH     = this.wallHeight;
  const wallThick = 0.5;

  this.circleRadius   = null;
  this._circularWalls = null;
  this.fieldWidth  = EAST_X - WEST_X;
  this.fieldDepth  = SOUTH_Z - NORTH_Z;
  // Walkable areas (no overlap, so the floor pieces don't z-fight), used by
  // isPositionValid() to reject the empty north-east corner.
  this.floorRects = [
    { x0: WEST_X, x1: INNER_X, z0: NORTH_Z, z1: INNER_Z }, // top of the west arm
    { x0: WEST_X, x1: EAST_X,  z0: INNER_Z, z1: SOUTH_Z }, // the south arm
  ];
  this.mortarSpots = MORTAR_SPOTS;
  this.pcStartSlots = PC_SLOTS;
  this.npcSpawnArea = NPC_SPAWN_AREA;
  this.cameraView = CAMERA_VIEW;

  // ── Floor ──────────────────────────────────────────────────────────────────
  // One mesh built from the walkable rects, with world-space UVs so the tiles
  // line up seamlessly across the pieces (1 tile per 6 units).
  const tileTexture = this.textureLoader.load("images/tile-stone-1.webp");
  tileTexture.wrapS = RepeatWrapping;
  tileTexture.wrapT = RepeatWrapping;

  const positions = [];
  const uvs = [];
  const indices = [];
  for (const { x0, x1, z0, z1 } of this.floorRects) {
    const base = positions.length / 3;
    for (const [x, z] of [[x0, z0], [x1, z0], [x1, z1], [x0, z1]]) {
      positions.push(x, 0, z);
      uvs.push(x / 6, z / 6);
    }
    indices.push(base, base + 2, base + 1, base, base + 3, base + 2);
  }
  const floorGeo = new BufferGeometry();
  floorGeo.setAttribute('position', new Float32BufferAttribute(positions, 3));
  floorGeo.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  floorGeo.setIndex(indices);
  floorGeo.computeVertexNormals();

  this.floor = new Mesh(floorGeo, new MeshStandardMaterial({
    map: tileTexture, roughness: 0.6, metalness: 0.2, side: DoubleSide,
  }));
  this.floor.receiveShadow = true;
  this.scene.add(this.floor);

  // ── Walls ──────────────────────────────────────────────────────────────────
  const wallTex = this.textureLoader.load("images/tile-stone-1.webp");
  wallTex.wrapS = RepeatWrapping;
  wallTex.wrapT = RepeatWrapping;
  this.wallMaterial = new MeshStandardMaterial({ map: wallTex, roughness: 0.6, metalness: 0.2 });

  // Walls are centred on the outline and extended by half a thickness at each
  // end so the corners close.
  const addWall = (name, width, depth, x, z) => {
    const geo = new BoxGeometry(width, wallH, depth);
    this.applyWallUVs(geo, width, wallH, depth);
    const mesh = new Mesh(geo, this.wallMaterial);
    mesh.position.set(x, wallH / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.walls[name] = mesh;
  };
  const wallAlongX = (name, x0, x1, z) =>
    addWall(name, x1 - x0 + wallThick, wallThick, (x0 + x1) / 2, z);
  const wallAlongZ = (name, z0, z1, x) =>
    addWall(name, wallThick, z1 - z0 + wallThick, x, (z0 + z1) / 2);

  wallAlongX('north', WEST_X, INNER_X, NORTH_Z);
  wallAlongZ('west', NORTH_Z, SOUTH_Z, WEST_X);
  wallAlongX('south', WEST_X, EAST_X, SOUTH_Z);
  wallAlongZ('east', INNER_Z, SOUTH_Z, EAST_X);
  wallAlongZ('inner_east', NORTH_Z, INNER_Z, INNER_X);

  // The inner wall along the south arm, with the gate in it. The gate's own
  // piece is just the door and a post each side; plain wall fills the rest.
  const gateSpan = this.DOOR_WIDTH + 1;
  wallAlongX('inner_north_west', INNER_X, GATE_X - gateSpan / 2, INNER_Z);
  wallAlongX('inner_north_east', GATE_X + gateSpan / 2, EAST_X, INNER_Z);
  this._createDoor({ length: gateSpan, z: INNER_Z, x: GATE_X });

  // ── Obstacles: the mortars' wall, and cover in the elbow ───────────────────
  const mortarWall = SEGMENTS.map(({ z0, z1 }) => ({
    x: MORTAR_WALL_X, z: (z0 + z1) / 2,
    width: MORTAR_WALL_THICKNESS, depth: z1 - z0, type: 'wall', rotY: 0,
  }));
  this.obstacles = [];
  [...mortarWall, ...ELBOW_COVER].forEach((obstacle, i) => {
    this.obstacles.push(obstacle);
    this.createObstacleMesh(obstacle, i);
  });

  this._initTransparency();
  this._addLighting();
}
