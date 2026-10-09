import { BoxGeometry, BufferGeometry, DoubleSide, Float32BufferAttribute, Mesh, MeshStandardMaterial, RepeatWrapping } from "three";
import { addMirrorGate, linkMirrorGates } from "../MirrorGates.js";

// The Locked Gate (north = -Z; camera sits south): a big hall and, beyond its
// north wall, a sealed vault holding the exit door, already open. The only way
// into the vault is through one Mirror Gate; the hall has eleven around its
// walls, and which one leads to the vault is shuffled each time the room
// loads (the other ten pair up among themselves). Partners aren't shown on hover here, so the party
// has to find the right gate, under attack, before the Pursuer arrives — and
// it arrives out of one of the hall's gates, not the door. It can't follow
// anyone into the vault: it stays in the hall.
//
//               ┌──door──┐
//               │ vault  │
//               └──gate──┘
//   ┌─────G──────────G──────────G───────┐
//   G                                   G
//   │         ▪      ▄▄▄▄▄     ▪        │
//   G                                   G
//   │                                   │
//   G                PCs                G
//   └─────────G───────────────G─────────┘
//
// Every wall and block is axis-aligned (exact box collision).
const HALF_W   = 26;    // the hall's outer walls (and the field's width)
const NORTH_Z  = -23;   // the vault's north wall, with the door
const VAULT_S  = -13;   // the vault's south wall
const HALL_N   = -11;   // the hall's north wall
const SOUTH_Z  = 23;    // the hall's south wall
const VAULT_HALF_W = 8;
const FACE = 0.25;      // walls are 0.5 thick: their faces stand this far off their centre lines

// Cover in the hall: a wide block in the middle and a small one either side.
const BLOCKS = [
  { x: 0,   z: 6, width: 7, depth: 4 },
  { x: -13, z: 4, width: 3, depth: 3 },
  { x: 13,  z: 4, width: 3, depth: 3 },
];

// Where the hall's eleven gates stand, all on its outer walls, facing in (an
// odd number: one pairs with the vault's gate, the other ten with each
// other). Which pairs with which is shuffled on load.
const SIDE_ZS = [-5, 5, 15];
const HALL_GATE_SPOTS = [
  ...[-16, 0, 16].map(x => ({ x, z: HALL_N + FACE, nx: 0, nz: 1 })),    // north wall
  ...[-12, 12].map(x => ({ x, z: SOUTH_Z - FACE, nx: 0, nz: -1 })),     // south wall
  ...SIDE_ZS.map(z => ({ x: -HALF_W + FACE, z, nx: 1, nz: 0 })),        // west wall
  ...SIDE_ZS.map(z => ({ x: HALF_W - FACE, z, nx: -1, nz: 0 })),        // east wall
];
// The vault's gate: on its south wall, facing the door.
const VAULT_GATE_SPOT = { x: 0, z: VAULT_S - FACE, nx: 0, nz: -1 };

const PC_SLOTS = [{ x: -6, z: 18 }, { x: -2, z: 18 }, { x: 2, z: 18 }, { x: 6, z: 18 }];
const NPC_SPAWN_AREA = { minX: -22, maxX: 22, minZ: HALL_N + 3, maxZ: 12 };
const HALL = { minX: -HALF_W, maxX: HALF_W, minZ: HALL_N, maxZ: SOUTH_Z };
const CAMERA_VIEW = { distance: 50, targetZ: 0 };

export function loadLocked() {
  const wallH = this.wallHeight;
  const wallThick = 0.5;

  this.circleRadius   = null;
  this._circularWalls = null;
  this.fieldWidth  = HALF_W * 2;
  this.fieldDepth  = SOUTH_Z - NORTH_Z;
  this.floorRects = [
    { x0: -VAULT_HALF_W, x1: VAULT_HALF_W, z0: NORTH_Z, z1: VAULT_S }, // the vault
    { x0: -HALF_W, x1: HALF_W, z0: HALL_N, z1: SOUTH_Z },             // the hall
  ];
  this.pcStartSlots = PC_SLOTS;
  this.npcSpawnArea = NPC_SPAWN_AREA;
  this.cameraView = CAMERA_VIEW;
  // The exit stands open from the start, but only a disc that gets through
  // the door counts (clicking it does nothing). The Pursuer keeps to the hall,
  // and the Warp Ring can't jump into the vault. No hover hint at partners.
  this.lockedExit = true;
  this.pursuerBounds = HALL;
  this.warpArea = HALL;
  this.showGatePartners = false;

  // ── Floor ──────────────────────────────────────────────────────────────────
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

  // Centred on the outline, extended by half a thickness at each end so the corners close.
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
  const wallAlongX = (name, x0, x1, z) => addWall(name, x1 - x0 + wallThick, wallThick, (x0 + x1) / 2, z);
  const wallAlongZ = (name, z0, z1, x) => addWall(name, wallThick, z1 - z0 + wallThick, x, (z0 + z1) / 2);

  // The vault (its north wall is the door and the wall either side of it).
  wallAlongZ('vault_west', NORTH_Z, VAULT_S, -VAULT_HALF_W);
  wallAlongZ('vault_east', NORTH_Z, VAULT_S, VAULT_HALF_W);
  wallAlongX('vault_south', -VAULT_HALF_W, VAULT_HALF_W, VAULT_S);
  this._createDoor({ length: VAULT_HALF_W * 2, z: NORTH_Z, x: 0 });
  // The hall.
  wallAlongX('hall_north', -HALF_W, HALF_W, HALL_N);
  wallAlongZ('hall_west', HALL_N, SOUTH_Z, -HALF_W);
  wallAlongZ('hall_east', HALL_N, SOUTH_Z, HALF_W);
  wallAlongX('hall_south', -HALF_W, HALF_W, SOUTH_Z);

  // ── Cover ──────────────────────────────────────────────────────────────────
  this.obstacles = [];
  BLOCKS.forEach((block, i) => {
    const obstacle = { ...block, type: 'wall', rotY: 0 };
    this.obstacles.push(obstacle);
    this.createObstacleMesh(obstacle, i);
  });

  // ── Mirror Gates, shuffled ─────────────────────────────────────────────────
  // One hall gate (picked at random) pairs with the vault's; the rest pair up
  // in a random order.
  const spots = [...HALL_GATE_SPOTS];
  for (let i = spots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [spots[i], spots[j]] = [spots[j], spots[i]];
  }
  addMirrorGate(this, { ...VAULT_GATE_SPOT, pair: 'vault' });
  addMirrorGate(this, { ...spots[0], pair: 'vault' });
  for (let i = 1; i < spots.length; i += 2) {
    addMirrorGate(this, { ...spots[i], pair: `decoy${i}` });
    addMirrorGate(this, { ...spots[i + 1], pair: `decoy${i}` });
  }
  linkMirrorGates(this);
  // The Pursuer comes out of any hall gate but the vault's way in.
  this.pursuerEntrances = this.mirrorGates.filter(g => g.pair !== 'vault');

  this._initTransparency();
  this._addLighting();
  this.openDoor(); // open from the start
}
