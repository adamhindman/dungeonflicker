import {
  BoxGeometry, DoubleSide, Float32BufferAttribute, Mesh, MeshStandardMaterial, RepeatWrapping,
  Shape, ShapeGeometry,
} from "three";

// Boss room floorplan (north = -Z, the far wall; camera sits south): a long hall
// with two rows of columns, as though holding up the roof, and an open space
// at the far end for the boss. The far wall bows gently outward, with the door
// set in its middle.
//
//        ╭───┬door┬───╮   ← far wall: an arc, SAGITTA deeper at the middle
//        │ ⚗   boss  ⚗ │   ← the boss and his alembics
//        │             │
//        │             │
//        │    ○    ○   │   ← columns at 25% and 75% of the width
//        │             │
//        │    ○    ○   │
//        │   party     │
//        └─────────────┘
//
// The room is centred on z = 0 because the field-edge clamp assumes ±fieldDepth/2.
// The arc's collision is a radial clamp in PhysicsEngine (level.arcWall), not
// its wall meshes: rotated boxes give inflated AABBs.
const HALF_W   = 15;    // 30 units wide
const HALF_D   = 22.5;  // 45 units long
const SAGITTA  = 3;     // how far the far wall bows out at its middle
// Too big for the standard camera: pull back and aim a little south of centre,
// so the far wall sits near the top of the screen and the party, near the
// south wall, sits just above the HUD.
const CAMERA_VIEW = { distance: 44.4, targetZ: 5.8 };
// Circle through the arc's ends (±HALF_W, -(HALF_D - SAGITTA)) and its apex (0, -HALF_D)
const ARC_R    = (HALF_W * HALF_W + SAGITTA * SAGITTA) / (2 * SAGITTA);
const ARC_CZ   = -HALF_D + ARC_R;
const ARC_HALF_ANGLE = Math.asin(HALF_W / ARC_R);
const ARC_SEGMENTS_PER_SIDE = 8;

const COLUMN_XS = [-HALF_W / 2, HALF_W / 2]; // 25% and 75% of the way across
const COLUMN_ZS = [0, HALF_D * 0.53];          // the far end is left open
const COLUMN_WIDTH = 2.4;

// Where the boss starts: at the far end.
const BOSS_START = { x: 0, z: -HALF_D * 0.78 };

// Paracelsus's alembics (homunculus spawners): the two far corners. Add the
// near corners ({ x: ±12, z: HALF_D - 3.5 }) for spawners right by the party's start.
const SPAWNER_SPOTS = [{ x: -12, z: -16 }, { x: 12, z: -16 }];

// Where the party starts: near the south wall, facing the door.
const PC_SLOTS = [
  { x: -2.5, z: HALF_D - 4 }, { x: 2.5, z: HALF_D - 4 },
  { x: -2.5, z: HALF_D - 2 }, { x: 2.5, z: HALF_D - 2 },
];

export function loadBoss() {
  const wallH     = this.wallHeight;
  const wallThick = 0.5;

  this.isBossRoom = true;
  this.circleRadius   = null;
  this._circularWalls = null;
  this.fieldWidth  = HALF_W * 2;
  this.fieldDepth  = HALF_D * 2;
  this.arcWall = { cx: 0, cz: ARC_CZ, r: ARC_R };
  this.pcStartSlots = PC_SLOTS;
  this.bossStart = BOSS_START;
  this.spawnerSpots = SPAWNER_SPOTS;
  this.homunculiGrown = 0; // numbers their names
  this.cameraView = CAMERA_VIEW;

  // ── Floor ──────────────────────────────────────────────────────────────────
  // Shape coordinates are (x, -z): the mesh is laid flat by rotating it -90°
  // about X. World-space UVs, 1 tile per 6 units, like the other rooms.
  const tileTexture = this.textureLoader.load("images/tile-stone-1.webp");
  tileTexture.wrapS = RepeatWrapping;
  tileTexture.wrapT = RepeatWrapping;

  const outline = new Shape();
  outline.moveTo(-HALF_W, -HALF_D);
  outline.lineTo(HALF_W, -HALF_D);
  outline.lineTo(HALF_W, HALF_D - SAGITTA);
  outline.absarc(0, -ARC_CZ, ARC_R, Math.PI / 2 - ARC_HALF_ANGLE, Math.PI / 2 + ARC_HALF_ANGLE, false);
  outline.lineTo(-HALF_W, -HALF_D);
  const floorGeo = new ShapeGeometry(outline, 48);
  const pos = floorGeo.attributes.position;
  const uvs = [];
  for (let i = 0; i < pos.count; i++) uvs.push(pos.getX(i) / 6, pos.getY(i) / 6);
  floorGeo.setAttribute('uv', new Float32BufferAttribute(uvs, 2));

  this.floor = new Mesh(floorGeo, new MeshStandardMaterial({
    map: tileTexture, roughness: 0.6, metalness: 0.2, side: DoubleSide,
  }));
  this.floor.rotation.x = -Math.PI / 2;
  this.floor.receiveShadow = true;
  this.scene.add(this.floor);

  // ── Walls ──────────────────────────────────────────────────────────────────
  const wallTex = this.textureLoader.load("images/tile-stone-1.webp");
  wallTex.wrapS = RepeatWrapping;
  wallTex.wrapT = RepeatWrapping;
  this.wallMaterial = new MeshStandardMaterial({ map: wallTex, roughness: 0.6, metalness: 0.2 });

  const addWall = (name, width, depth, x, z, rotY = 0) => {
    const geo = new BoxGeometry(width, wallH, depth);
    this.applyWallUVs(geo, width, wallH, depth);
    const mesh = new Mesh(geo, this.wallMaterial);
    mesh.position.set(x, wallH / 2, z);
    mesh.rotation.y = rotY;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.walls[name] = mesh;
  };

  const sideStartZ = -(HALF_D - SAGITTA); // where the side walls meet the arc
  addWall('south', HALF_W * 2 + wallThick, wallThick, 0, HALF_D);
  addWall('east', wallThick, HALF_D - sideStartZ, HALF_W, (HALF_D + sideStartZ) / 2);
  addWall('west', wallThick, HALF_D - sideStartZ, -HALF_W, (HALF_D + sideStartZ) / 2);

  // Far wall: the door (with its frame) at the apex, flanked by arc segments.
  // The door's own straight flanking pieces are just its post width each side.
  const doorSpan = this.DOOR_WIDTH + 1; // door + a post on each side
  this._createDoor({ length: doorSpan, z: -HALF_D });
  const doorAngle = Math.asin((doorSpan / 2) / ARC_R);
  for (const sign of [-1, 1]) {
    const step = (ARC_HALF_ANGLE - doorAngle) / ARC_SEGMENTS_PER_SIDE;
    for (let i = 0; i < ARC_SEGMENTS_PER_SIDE; i++) {
      const a0 = doorAngle + i * step;
      const mid = a0 + step / 2;
      // Each segment's chord, a little long so neighbours overlap at the joins
      const length = 2 * ARC_R * Math.sin(step / 2) + 0.15;
      const theta = sign * mid; // angle from the room's long axis
      addWall(`arc_${sign > 0 ? 'east' : 'west'}_${i}`, length, wallThick,
        ARC_R * Math.sin(theta), ARC_CZ - ARC_R * Math.cos(theta), -theta);
    }
  }

  // ── Columns ────────────────────────────────────────────────────────────────
  // Regular pillar obstacles, so collision, spawning and AI all handle them.
  this.obstacles = [];
  for (const x of COLUMN_XS) {
    for (const z of COLUMN_ZS) {
      const column = { x, z, width: COLUMN_WIDTH, depth: COLUMN_WIDTH, type: 'pillar', rotY: 0 };
      this.obstacles.push(column);
      this.createObstacleMesh(column, this.obstacles.length - 1);
    }
  }

  this._initTransparency();
  this._addLighting();
}
