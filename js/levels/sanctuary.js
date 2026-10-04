import {
  BoxGeometry, BufferGeometry, CylinderGeometry, DoubleSide, Float32BufferAttribute, LatheGeometry, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, RepeatWrapping, Vector2,
} from "three";

// Sanctuary floorplan (north = -Z, the far wall; camera sits south): a central
// aisle with one long alcove on each side. The shop's items stand on stone
// pedestals along the far wall of each alcove, three a side, with the
// resurrection orb and the healing font in the aisle between them.
//
//              ┌─door─┐
//              │chancel│
//      ┌───────┘      └───────┐
//      │ ▣        orb       ▣ │  ← resurrection orb (only when an ally is dead)
//      │ ▣       font       ▣ │  ← the healing font, dead centre between the pedestals
//      │ ▣                  ▣ │  ← ▣ pedestals with the shop's items
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
const HEALING_Z  = -3;   // the healing font, dead centre between the two rows of pedestals
const FOUNTAIN_RADIUS = 2; // its base, for collision (matches the lower plinth in SanctuaryHealing)

// Shop pedestals: a row along the far wall of each alcove.
const PEDESTAL_X  = ALCOVE_X - 2.5;
const PEDESTAL_ZS = [-9, -3, 3];
// The pedestal's outline, spun around its axis: (radius, height) from the
// floor up. A broad foot, a slim column and a flat top for the item.
const PEDESTAL_PROFILE = [[0, 0], [0.75, 0], [0.75, 0.12], [0.58, 0.2], [0.44, 0.28], [0.38, 0.4],
                          [0.38, 0.8], [0.46, 0.88], [0.62, 0.96], [0.62, 1.08], [0, 1.08]];
const PEDESTAL_HEIGHT = 1.08;
const PEDESTAL_RADIUS = 0.75; // its widest (the foot): what discs bump into

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
  // The shop sets its items on top of the pedestals (y is the pedestal top).
  this.shopPositions = [-1, 1].flatMap(sign =>
    PEDESTAL_ZS.map(z => ({ x: sign * PEDESTAL_X, y: PEDESTAL_HEIGHT, z })));
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

  // ── Shop pedestals ─────────────────────────────────────────────────────────
  // Solid: discs bounce off them as the round columns they are. They stay
  // when their item is bought.
  const pedestalGeo = new LatheGeometry(PEDESTAL_PROFILE.map(([r, y]) => new Vector2(r, y)), 24);
  this.shopPositions.forEach(({ x, z }, i) => {
    const pedestal = new Mesh(i === 0 ? pedestalGeo : pedestalGeo.clone(), this._getObstacleMaterial());
    pedestal.position.set(x, 0, z);
    pedestal.userData.colliderRadius = PEDESTAL_RADIUS;
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    this.scene.add(pedestal);
    this.walls[`sanctuary_pedestal_${i}`] = pedestal;
  });

  // ── Healing fountain collider ──────────────────────────────────────────────
  // The fountain itself is drawn by SanctuaryHealing; this invisible column
  // makes it solid, so discs bounce off its base like the pedestals.
  const fountainCollider = new Mesh(
    new CylinderGeometry(FOUNTAIN_RADIUS, FOUNTAIN_RADIUS, wallH, 16),
    new MeshBasicMaterial({ visible: false }),
  );
  fountainCollider.position.set(0, wallH / 2, HEALING_Z);
  fountainCollider.userData.colliderRadius = FOUNTAIN_RADIUS;
  this.scene.add(fountainCollider);
  this.walls.sanctuary_fountain = fountainCollider;

  this._initTransparency();
  this._addLighting();
}
