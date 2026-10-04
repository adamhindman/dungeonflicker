import { BoxGeometry, BufferGeometry, DoubleSide, Float32BufferAttribute, Mesh, MeshStandardMaterial, RepeatWrapping } from "three";

// Sanctuary floorplan (north = -Z, the far wall; camera sits south): a central
// aisle with one long alcove on each side. The shop's items stand in one line
// across the room, just in front of the resurrection orb, with the healing
// font behind them in the aisle.
//
//              ┌─door─┐
//              │chancel│
//      ┌───────┘      └───────┐
//      │          orb          │  ← resurrection orb (only when an ally is dead)
//      │ item  item  item  item │  ← the four shop items
//      │         font          │  ← the healing font
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
const ALCOVE_N_Z = -13;  // north edge of the alcoves
const ALCOVE_S_Z = 7;    // south edge of the alcoves
const ALTAR_Z    = -9;   // where the resurrection orb floats
const SHOP_Z     = -4;   // the line of shop items, between the orb and the party
const SHOP_XS    = [-9, -3, 3, 9]; // across the aisle and into both alcoves
const HEALING_Z  = 3;    // the healing font, in the aisle between the shop and the party

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
  this.floorRects = [
    { x0: -HALF_ARM, x1: HALF_ARM,  z0: NORTH_Z,    z1: SOUTH_Z },    // the aisle
    { x0: -ALCOVE_X, x1: -HALF_ARM, z0: ALCOVE_N_Z, z1: ALCOVE_S_Z }, // west alcove
    { x0: HALF_ARM,  x1: ALCOVE_X,  z0: ALCOVE_N_Z, z1: ALCOVE_S_Z }, // east alcove
  ];
  this.altarPosition = { x: 0, z: ALTAR_Z };
  this.shopPositions = SHOP_XS.map(x => ({ x, z: SHOP_Z }));
  this.healingPosition = { x: 0, z: HEALING_Z };

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
    wallAlongZ(`chancel_${side}`, NORTH_Z, ALCOVE_N_Z, sign * HALF_ARM);
    wallAlongX(`alcove_${side}_north`, ax0, ax1, ALCOVE_N_Z);
    wallAlongZ(`alcove_${side}_end`, ALCOVE_N_Z, ALCOVE_S_Z, sign * ALCOVE_X);
    wallAlongX(`alcove_${side}_south`, ax0, ax1, ALCOVE_S_Z);
    wallAlongZ(`nave_${side}`, ALCOVE_S_Z, SOUTH_Z, sign * HALF_ARM);
  }
  wallAlongX('nave_south', -HALF_ARM, HALF_ARM, SOUTH_Z);

  // Door fills the chancel's end wall.
  this._createDoor({ length: HALF_ARM * 2, z: NORTH_Z });

  this._initTransparency();
  this._addLighting();
}
