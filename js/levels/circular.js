import { CircleGeometry, DoubleSide, Mesh, MeshStandardMaterial, RepeatWrapping } from "three";
import { buildRoundWall } from "./roundWall.js";

// The Rotunda: a round room, its door in a buttress at the north (see
// roundWall.js), with a few random obstacles.
export function loadCircular() {
  const INNER_R   = 24;   // where discs bounce (the radial clamp)
  const wallThick = 0.5;

  this.circleRadius = INNER_R;
  // Large fieldWidth/fieldDepth disables Disc.handleWallCollision's rectangular check.
  this.fieldWidth  = INNER_R * 4;
  this.fieldDepth  = INNER_R * 4;

  // ── Floor ──────────────────────────────────────────────────────────────────
  const tileTexture = this.textureLoader.load("images/tile-stone-1.webp");
  tileTexture.wrapS = RepeatWrapping;
  tileTexture.wrapT = RepeatWrapping;
  const floorR = INNER_R + wallThick;
  tileTexture.repeat.set((floorR * 2) / 6, (floorR * 2) / 6);
  this.floor = new Mesh(
    new CircleGeometry(floorR, 96),
    new MeshStandardMaterial({ map: tileTexture, roughness: 0.6, metalness: 0.2, side: DoubleSide }),
  );
  this.floor.rotation.x = -Math.PI / 2;
  this.floor.receiveShadow = true;
  this.scene.add(this.floor);

  // ── Walls ──────────────────────────────────────────────────────────────────
  const wallTex = this.textureLoader.load("images/tile-stone-1.webp");
  wallTex.wrapS = RepeatWrapping;
  wallTex.wrapT = RepeatWrapping;
  this.wallMaterial = new MeshStandardMaterial({
    map: wallTex, roughness: 0.6, metalness: 0.2,
  });
  buildRoundWall.call(this, INNER_R);

  // ── Obstacles, transparency, vine tiles, lighting ──────────────────────────
  this.generateRandomObstacles(3 + Math.floor(Math.random() * 2));
  this._initTransparency();
  this._scatterVineTilesOnWalls();
  this._addLighting();
}

export function resetCircularState() {
  this.circleRadius = null;
  this._circularWalls = null;
}
