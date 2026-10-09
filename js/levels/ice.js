import { BoxGeometry, DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry, RepeatWrapping } from "three";
import { addIcePatches } from "../IcePatches.js";

// The Ice Cave (north = -Z; camera sits south): a big rectangular room whose
// stone floor is scattered with patches of ice, laid out afresh each time it
// loads. On ice a disc barely slows down. Kill everything and get out.
//
// The walls are the standard room's, the obstacles are its usual random
// scatter, and the door is in the middle of the north wall.
const HALF_W = 32;   // 64 × 46
const HALF_D = 23;
const ICE = { count: 24, minRadius: 5, maxRadius: 9 }; // overlapping: about 70% of the floor
const CAMERA_VIEW = { distance: 52, targetZ: 0 };

export function loadIce() {
  this.circleRadius   = null;
  this._circularWalls = null;
  this.fieldWidth  = HALF_W * 2;
  this.fieldDepth  = HALF_D * 2;
  this.cameraView  = CAMERA_VIEW;
  this.noLava      = true; // not in an ice cave

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

  // ── Ice ────────────────────────────────────────────────────────────────────
  addIcePatches(this, {
    ...ICE,
    area: { minX: -HALF_W + 1, maxX: HALF_W - 1, minZ: -HALF_D + 1, maxZ: HALF_D - 1 },
  });

  this._initTransparency();
  this._addLighting();
}
