import { BoxGeometry, DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry, RepeatWrapping } from "three";

// The Bastion (north = -Z; camera sits south): a big open yard with a walled
// fort in its north-east corner. The room's north and east walls are the
// fort's other two sides, and the gate out is in the north wall, inside the
// fort: the party starts in the far south-west corner and has to cross the
// yard and break in past the four mortars to leave. The fort's west and south
// walls have one gap each, neither in line with the gate. Rubble out in the
// yard gives cover: walls stop blasts (see Level.wallBetween).
//
//    ┌────────────────────╥──gate─┐
//    │             ▪      ║ M   M │
//    │     ▪                      │
//    │                    ║ M   M │
//    │                    ╚═  ════│
//    │         ▪     ▐            │
//    │    ▪        NPCs      ▪    │
//    │ PCs      ════    ▪  NPCs   │
//    └────────────────────────────┘
//
// Every wall is axis-aligned, so the standard AABB wall collision is exact.
const HALF_W = 28;   // 56 × 44
const HALF_D = 22;
const ROOM_WALL = 0.5;

// The fort: the centre lines of its west and south walls, their thickness,
// and where each one's gap is (along that wall). A gap fits a party member; a
// Warden doesn't.
const FORT_WEST_X = 12;
const FORT_SOUTH_Z = -9;
const FORT_WALL = 1.5;
const GAP_WIDTH = 4.5;
const WEST_GAP_Z = -15.5;
const SOUTH_GAP_X = 17;
const GATE_X = 20;   // the gate's centre, along the north wall: the middle of the fort

// Inside the fort: one in each quarter, either side of the way to the gate.
const MORTAR_SPOTS = [
  { x: 16, z: -18 },  { x: 24, z: -18 },
  { x: 16, z: -13 },  { x: 24, z: -13 },
];

// Rubble out in the yard.
const RUBBLE = [
  { x: -17, z: -12, width: 3.5, depth: 3.5, type: 'block',  rotY: 0 },
  { x: -2,  z: -15, width: 2,   depth: 2,   type: 'pillar', rotY: 0 },
  { x: 3,   z: -3,  width: 1.5, depth: 7,   type: 'wall',   rotY: 0 },
  { x: -9,  z: -3,  width: 3.5, depth: 3.5, type: 'block',  rotY: 0 },
  { x: -19, z: 4,   width: 2,   depth: 2,   type: 'pillar', rotY: 0 },
  { x: 19,  z: 6,   width: 3.5, depth: 3.5, type: 'block',  rotY: 0 },
  { x: -5,  z: 14,  width: 7,   depth: 1.5, type: 'wall',   rotY: 0 },
  { x: 9,   z: 15,  width: 2,   depth: 2,   type: 'pillar', rotY: 0 },
];

// Where the party starts: the south-west corner.
const PC_SLOTS = [
  { x: -24, z: 18 }, { x: -20, z: 18 },
  { x: -24, z: 14 }, { x: -20, z: 14 },
];

// Monsters start across the east and middle of the yard (and some in the fort).
const NPC_SPAWN_AREA = { minX: -6, maxX: HALF_W - 3, minZ: -HALF_D + 3, maxZ: HALF_D - 3 };

// A few powder kegs (see PowderKegs.js), in pairs and threes, placed afresh
// each time by DiscSpawner. A shell landing on one sets it off.
const KEG_CLUSTERS = { clusters: [2, 2], kegs: [2, 3], spacing: 14 };

// The discs' own spotlights are spread thin over a yard this size: a touch
// more light than the standard rooms (ambient 0, directional 0.2), still dim.
const LIGHTING = { ambient: 0.025, directional: 0.3 };

// Bigger than the standard rooms: pull the camera back.
const CAMERA_VIEW = { distance: 48, targetZ: 0 };

/** The fort's west and south walls as wall obstacles: each in two pieces either side of its gap. */
function fortWalls() {
  const pieces = [];
  // The south wall runs from the west wall's outer face (taking in the
  // corner) to the room's east wall...
  const southEnds = [FORT_WEST_X - FORT_WALL / 2, HALF_W - ROOM_WALL / 2];
  for (const [a, b] of [[southEnds[0], SOUTH_GAP_X - GAP_WIDTH / 2], [SOUTH_GAP_X + GAP_WIDTH / 2, southEnds[1]]]) {
    pieces.push({ x: (a + b) / 2, z: FORT_SOUTH_Z, width: b - a, depth: FORT_WALL, type: 'wall', rotY: 0 });
  }
  // ...and the west wall runs from the room's north wall to the south wall.
  const westEnds = [-HALF_D + ROOM_WALL / 2, FORT_SOUTH_Z - FORT_WALL / 2];
  for (const [a, b] of [[westEnds[0], WEST_GAP_Z - GAP_WIDTH / 2], [WEST_GAP_Z + GAP_WIDTH / 2, westEnds[1]]]) {
    pieces.push({ x: FORT_WEST_X, z: (a + b) / 2, width: FORT_WALL, depth: b - a, type: 'wall', rotY: 0 });
  }
  return pieces;
}

export function loadBastion() {
  this.circleRadius   = null;
  this._circularWalls = null;
  this.fieldWidth  = HALF_W * 2;
  this.fieldDepth  = HALF_D * 2;
  this.mortarSpots = MORTAR_SPOTS;
  this.pcStartSlots = PC_SLOTS;
  this.npcSpawnArea = NPC_SPAWN_AREA;
  this.cameraView  = CAMERA_VIEW;
  this.noLava      = true; // keep the yard readable under the shelling
  this.kegClusters = KEG_CLUSTERS;
  this.lighting    = LIGHTING;

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

  // ── Walls ──────────────────────────────────────────────────────────────────
  const wallTex = this.textureLoader.load("images/tile-stone-1.webp");
  wallTex.wrapS = RepeatWrapping;
  wallTex.wrapT = RepeatWrapping;
  this.wallMaterial = new MeshStandardMaterial({ map: wallTex, roughness: 0.6, metalness: 0.2 });

  const wallThick = ROOM_WALL;
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
  addWall('south', this.fieldWidth, wallThick, 0, HALF_D);
  addWall('east', wallThick, this.fieldDepth, HALF_W, 0);
  addWall('west', wallThick, this.fieldDepth, -HALF_W, 0);

  // The north wall, with the gate in it. The gate's own piece is just the
  // door and a post each side; plain wall fills the rest. (Neither piece is
  // called 'north': _createDoor removes a wall by that name.)
  const gateSpan = this.DOOR_WIDTH + 1;
  const westEnd = GATE_X - gateSpan / 2, eastEnd = GATE_X + gateSpan / 2;
  addWall('north_west', westEnd + HALF_W, wallThick, (westEnd - HALF_W) / 2, -HALF_D);
  addWall('north_east', HALF_W - eastEnd, wallThick, (eastEnd + HALF_W) / 2, -HALF_D);
  this._createDoor({ length: gateSpan, z: -HALF_D, x: GATE_X });

  // ── Obstacles: the fort's two walls, and rubble in the yard ────────────────
  this.obstacles = [];
  [...fortWalls(), ...RUBBLE].forEach((obstacle, i) => {
    this.obstacles.push(obstacle);
    this.createObstacleMesh(obstacle, i);
  });

  this._initTransparency();
  this._addLighting();
}
