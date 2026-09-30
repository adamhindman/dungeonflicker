import { BoxGeometry, BufferGeometry, DoubleSide, Float32BufferAttribute, Mesh, MeshStandardMaterial, RepeatWrapping } from "three";

// Sanctuary floorplan (north = -Z, the far wall; camera sits south): a central
// aisle with two pairs of alcoves.
//
//              ┌─door─┐
//              │chancel│
//      ┌───────┘      └───────┐
//      │ alcove   orb   alcove │  ← row 1: resurrection orb + two shop items
//      └───────┐      ┌───────┘
//              │ neck │
//      ┌───────┘      └───────┐
//      │ alcove         alcove │  ← row 2: reserved for two more shop items
//      └───────┐      ┌───────┘
//              │ nave │  ← party starts here
//              └──────┘
//
// Every wall is axis-aligned, so the standard AABB wall collision is exact.
// The room is centred on z = 0 because the field-edge clamp assumes ±fieldDepth/2.
const HALF_ARM   = 7;    // half-width of the aisle
const ALCOVE_X   = 15;   // x of each alcove's end wall
const NORTH_Z    = -19;  // chancel end wall (door)
const SOUTH_Z    = 19;   // nave end wall
const ALCOVE_ROWS = [    // [north z, south z] of each alcove pair, door end first
  [-13, -5],
  [-1, 7],
];

export function loadSanctuary() {
  const wallH     = this.wallHeight;
  const wallThick = 0.5;

  this.isSanctuary = true;
  this.circleRadius   = null;
  this._circularWalls = null;
  // Bounding box of the cross; the outermost walls sit exactly on it.
  this.fieldWidth  = ALCOVE_X * 2;
  this.fieldDepth  = SOUTH_Z - NORTH_Z;
  // Walkable areas, used by isPositionValid() to reject the empty corners.
  this.floorRects = [{ x0: -HALF_ARM, x1: HALF_ARM, z0: NORTH_Z, z1: SOUTH_Z }]; // the aisle
  for (const [z0, z1] of ALCOVE_ROWS) {
    this.floorRects.push(
      { x0: -ALCOVE_X, x1: -HALF_ARM, z0, z1 },
      { x0: HALF_ARM,  x1: ALCOVE_X,  z0, z1 },
    );
  }
  // One shop item in the middle of each alcove, door-end row first. The
  // resurrection orb floats in the aisle, level with the first row.
  const alcoveX = (HALF_ARM + ALCOVE_X) / 2;
  const rowZ = ALCOVE_ROWS.map(([z0, z1]) => (z0 + z1) / 2);
  this.altarPosition = { x: 0, z: rowZ[0] };
  this.shopPositions = rowZ.flatMap(z => [{ x: -alcoveX, z }, { x: alcoveX, z }]);

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

  this.floor = new Mesh(
    floorGeo,
    new MeshStandardMaterial({
      map: tileTexture,
      roughness: 0.6,
      metalness: 0.2,
      side: DoubleSide,
    })
  );
  this.floor.receiveShadow = true;
  this.scene.add(this.floor);

  // ── Walls ──────────────────────────────────────────────────────────────────
  const wallTex = this.textureLoader.load("images/tile-stone-1.webp");
  wallTex.wrapS = RepeatWrapping;
  wallTex.wrapT = RepeatWrapping;
  this.wallMaterial = new MeshStandardMaterial({
    map: wallTex, roughness: 0.6, metalness: 0.2,
  });

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

  for (const sign of [-1, 1]) {
    const side = sign > 0 ? 'east' : 'west';
    const [ax0, ax1] = [Math.min(sign * HALF_ARM, sign * ALCOVE_X), Math.max(sign * HALF_ARM, sign * ALCOVE_X)];
    // Walk the aisle wall from the door to the nave, stepping out around each alcove.
    let aisleZ = NORTH_Z;
    ALCOVE_ROWS.forEach(([z0, z1], row) => {
      wallAlongZ(`aisle_${side}_${row}`, aisleZ, z0, sign * HALF_ARM);
      wallAlongX(`alcove_${side}_${row}_north`, ax0, ax1, z0);
      wallAlongZ(`alcove_${side}_${row}_end`, z0, z1, sign * ALCOVE_X);
      wallAlongX(`alcove_${side}_${row}_south`, ax0, ax1, z1);
      aisleZ = z1;
    });
    wallAlongZ(`aisle_${side}_${ALCOVE_ROWS.length}`, aisleZ, SOUTH_Z, sign * HALF_ARM);
  }
  wallAlongX('nave_south', -HALF_ARM, HALF_ARM, SOUTH_Z);

  // Door fills the chancel's end wall.
  this._createDoor({ length: HALF_ARM * 2, z: NORTH_Z });

  this._initTransparency();
  this._addLighting();
}
