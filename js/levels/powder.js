import { BoxGeometry, DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry, RepeatWrapping } from "three";

// The Powder Store (north = -Z; camera sits south): a big rectangular room with
// clusters of powder kegs (see PowderKegs.js) dotted about it, laid out afresh
// each time it loads, among the usual random obstacles and lava. Kill
// everything and get out, preferably not in one piece each.
//
// The kegs themselves are placed by DiscSpawner (they're discs), from
// `kegClusters`, after the party and before the monsters.
const HALF_W = 21;   // 42 × 30: about 2/3 of the standard room, so the kegs are never far from the fight
const HALF_D = 15;
// About a third of the kegs stand alone out by the walls, out of reach of any
// chain reaction, so some survive "the big explosion" as obstacles.
const KEG_CLUSTERS = { clusters: [4, 5], kegs: [3, 5], great: [1, 2], spacing: 9, loners: 0.35 };
const CAMERA_VIEW = { distance: 38, targetZ: 0 };

export function loadPowder() {
  this.circleRadius   = null;
  this._circularWalls = null;
  this.fieldWidth  = HALF_W * 2;
  this.fieldDepth  = HALF_D * 2;
  this.cameraView  = CAMERA_VIEW;
  this.kegClusters = KEG_CLUSTERS;

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

  this.generateRandomObstacles();
  this._createDoor(); // in the middle of the north wall

  this._initTransparency();
  this._addLighting();
}
