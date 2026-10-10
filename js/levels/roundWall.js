import { BoxGeometry, Color, DoubleSide, Mesh, MeshBasicMaterial, Plane, PlaneGeometry, Vector3 } from "three";

// The outer wall of a round room (the Rotunda, the Caldera): a ring of short
// straight segments, enough to read as a smooth curve and still separate
// meshes so each can fade when it hides the board. The radial clamp in
// PhysicsEngine (level.circleRadius) is the real boundary, so the segments
// are only for show (their 'poly_' keys keep them out of getAllWalls).
//
// The door can't sit in a curved wall, so it's set in the flat face of a
// stone buttress that juts into the room at the north. The buttress is solid
// wall blocks either side of the doorway (discs bounce off them like any
// wall), listed in level.solidZones so nothing spawns inside it.

const SEGMENTS   = 48;
const VINE_FACES = 24;     // the curve as fewer, wider faces, so 6-unit vine tiles fit
const WALL_THICK = 0.5;
const BUTTRESS_DEPTH = 2;  // how far its flat face juts in from the curve

/**
 * Builds the round wall, the buttress and the door for a room whose wall
 * segments are centred at `radius` from the middle. Call with `this` = the
 * Level, after level.wallMaterial is set and before _initTransparency().
 */
export function buildRoundWall(radius) {
  const wallH       = this.wallHeight;
  const DOOR_WIDTH  = this.DOOR_WIDTH;
  const DOOR_HEIGHT = this.DOOR_HEIGHT;

  // The buttress: about BUTTRESS_WIDTH across (stretched to meet the curve; see below)
  const BUTTRESS_WIDTH = DOOR_WIDTH + 4;
  const faceZ = -radius + BUTTRESS_DEPTH;          // the buttress's inner face
  const backZ = -radius - WALL_THICK / 2;          // its back, flush with the curve's outside
  const halfB = BUTTRESS_WIDTH / 2;

  this._circularWalls = [];

  const addWallMesh = (key, width, height, depth, x, y, z, rotY = 0) => {
    const geo = new BoxGeometry(width, height, depth);
    this.applyWallUVs(geo, width, height, depth);
    const mesh = new Mesh(geo, this.wallMaterial);
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotY;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.walls[key] = mesh;
    return mesh;
  };

  // ── The curved wall ────────────────────────────────────────────────────────
  // Segment i faces the centre from angle theta (from +Z). Segments behind the
  // buttress are left out (it fills that stretch, and the doorway looks
  // through it). A touch of overlap hides the seams.
  const segLen = 2 * radius * Math.tan(Math.PI / SEGMENTS);
  let buttressEdgeX = Infinity; // the inner end of the nearest segment kept beside the buttress
  for (let i = 0; i < SEGMENTS; i++) {
    const theta = i * (2 * Math.PI / SEGMENTS);
    const cx = Math.sin(theta) * radius;
    const cz = Math.cos(theta) * radius;
    if (cz < 0 && Math.abs(cx) < halfB) continue;
    if (cz < 0) buttressEdgeX = Math.min(buttressEdgeX, Math.abs(cx) - (segLen / 2) * Math.abs(Math.cos(theta)));
    addWallMesh(`poly_${i}`, segLen + 0.08, wallH, WALL_THICK, cx, wallH / 2, cz, theta);
  }
  // The buttress reaches out a little past where those segments begin, so
  // there's no gap between it and the curve.
  const outerX = Math.max(halfB, buttressEdgeX + 0.2);
  this.solidZones.push({ minX: -outerX, maxX: outerX, minZ: backZ, maxZ: faceZ });

  // Vine faces (see Level._scatterVineTilesOnWalls), clear of the buttress
  const faceLen = 2 * radius * Math.tan(Math.PI / VINE_FACES);
  for (let i = 0; i < VINE_FACES; i++) {
    const theta = i * (2 * Math.PI / VINE_FACES);
    const nearButtress = Math.cos(theta) < 0 && Math.abs(Math.sin(theta) * radius) < outerX + faceLen / 2;
    this._circularWalls.push({ theta, sideLen: faceLen, isDoor: nearButtress });
  }

  // ── The buttress and its door ──────────────────────────────────────────────
  // Two solid blocks either side of the doorway, a block over it, and the
  // door's frame on the flat face.
  const blockDepth = faceZ - backZ;
  const blockZ = (faceZ + backZ) / 2;
  const sideW = outerX - DOOR_WIDTH / 2;
  for (const sign of [-1, 1]) {
    addWallMesh(`north_${sign > 0 ? 'right' : 'left'}`, sideW, wallH, blockDepth,
      sign * (DOOR_WIDTH / 2 + sideW / 2), wallH / 2, blockZ);
  }
  const frameThick = 0.7;
  const postWidth  = 0.5;
  const lintelH    = postWidth;
  const overDoorH  = wallH - DOOR_HEIGHT - lintelH;
  if (overDoorH > 0) {
    addWallMesh('north_above', DOOR_WIDTH, overDoorH, blockDepth, 0, DOOR_HEIGHT + lintelH + overDoorH / 2, blockZ);
  }

  // The door slab and frame sit in the face, the slab flush with it.
  const doorZ = faceZ - WALL_THICK / 2;
  this.doorWall           = 'north';
  this._doorIsNS          = true;
  this._doorOpeningCenter = { x: 0, z: doorZ };
  this._doorSlabStartY    = DOOR_HEIGHT / 2;
  this._doorSlabEndY      = wallH + DOOR_HEIGHT;

  this._frameMat = this.wallMaterial.clone();
  this._frameMat.color.setHex(0x999999);
  this._frameMat.emissive = new Color(0x000000);
  this._frameMat.emissiveIntensity = 0;

  this._slabMat = this.wallMaterial.clone();
  this._slabMat.color.setHex(0x999999);
  this._slabMat.clippingPlanes = [
    new Plane(new Vector3(0, -1, 0), wallH),
  ];
  this._slabMat.clipShadows = true;

  const addFrameMesh = (geo, x, y, z) => {
    const mesh = new Mesh(geo, this._frameMat);
    mesh.position.set(x, y, z);
    this.scene.add(mesh);
    this.doorFrameMeshes.push(mesh);
    return mesh;
  };
  for (const sign of [-1, 1]) {
    const geo = new BoxGeometry(postWidth, DOOR_HEIGHT, frameThick);
    this.applyWallUVs(geo, postWidth, DOOR_HEIGHT, frameThick);
    addFrameMesh(geo, sign * (DOOR_WIDTH / 2 + postWidth / 2), DOOR_HEIGHT / 2, doorZ);
  }
  const lintelW   = DOOR_WIDTH + postWidth * 2;
  const lintelGeo = new BoxGeometry(lintelW, lintelH, frameThick);
  this.applyWallUVs(lintelGeo, lintelW, lintelH, frameThick);
  addFrameMesh(lintelGeo, 0, DOOR_HEIGHT + lintelH / 2, doorZ);

  // Darkness at the far end of the passage through the buttress
  const voidMesh = new Mesh(
    new PlaneGeometry(DOOR_WIDTH, DOOR_HEIGHT),
    new MeshBasicMaterial({ color: 0x000000, side: DoubleSide }),
  );
  voidMesh.position.set(0, DOOR_HEIGHT / 2, backZ + 0.05);
  this.scene.add(voidMesh);
  this.doorFrameMeshes.push(voidMesh);
  this._voidMesh = voidMesh;

  const slabGeo = new BoxGeometry(DOOR_WIDTH, DOOR_HEIGHT, WALL_THICK);
  this.applyWallUVs(slabGeo, DOOR_WIDTH, DOOR_HEIGHT, WALL_THICK);
  this.doorSlab = new Mesh(slabGeo, this._slabMat);
  this.doorSlab.position.set(0, DOOR_HEIGHT / 2, doorZ);
  this.scene.add(this.doorSlab);
}
