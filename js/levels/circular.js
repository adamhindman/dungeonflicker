import { BoxGeometry, CircleGeometry, Color, DoubleSide, Mesh, MeshBasicMaterial, MeshStandardMaterial, Plane, PlaneGeometry, RepeatWrapping, Vector3 } from "three";

// The Rotunda: a round room. Its wall is a ring of short straight segments
// (enough to read as a smooth curve, and still separate meshes so each can
// fade when it hides the board); the radial clamp in PhysicsEngine is the
// real boundary. The door can't sit in a curved wall, so it's set in the flat
// face of a stone buttress that juts into the room at the north.
export function loadCircular() {
  const SEGMENTS   = 48;
  const VINE_FACES = 24;   // the curve as fewer, wider faces, so 6-unit vine tiles fit
  const INNER_R    = 24;   // where discs bounce (the radial clamp)
  const wallThick  = 0.5;
  const wallH      = this.wallHeight;
  const DOOR_WIDTH  = this.DOOR_WIDTH;
  const DOOR_HEIGHT = this.DOOR_HEIGHT;

  // The buttress: BUTTRESS_WIDTH across, its flat face BUTTRESS_DEPTH in from the curve.
  const BUTTRESS_WIDTH = DOOR_WIDTH + 4;
  const BUTTRESS_DEPTH = 2;
  const faceZ = -INNER_R + BUTTRESS_DEPTH;        // the buttress's inner face
  const backZ = -INNER_R - wallThick / 2;         // its back, flush with the curve's outside
  const halfB = BUTTRESS_WIDTH / 2;

  this.circleRadius   = INNER_R;
  this._circularWalls = [];
  // Large fieldWidth/fieldDepth disables Disc.handleWallCollision's rectangular check.
  this.fieldWidth  = INNER_R * 4;
  this.fieldDepth  = INNER_R * 4;
  // Nothing spawns inside the buttress.
  this.solidZones = [{ minX: -halfB, maxX: halfB, minZ: backZ, maxZ: faceZ }];

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

  // ── Wall material ──────────────────────────────────────────────────────────
  const wallTex = this.textureLoader.load("images/tile-stone-1.webp");
  wallTex.wrapS = RepeatWrapping;
  wallTex.wrapT = RepeatWrapping;
  this.wallMaterial = new MeshStandardMaterial({
    map: wallTex, roughness: 0.6, metalness: 0.2,
  });

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
  const segLen = 2 * INNER_R * Math.tan(Math.PI / SEGMENTS);
  let buttressEdgeX = Infinity; // the inner end of the nearest segment kept beside the buttress
  for (let i = 0; i < SEGMENTS; i++) {
    const theta = i * (2 * Math.PI / SEGMENTS);
    const cx = Math.sin(theta) * INNER_R;
    const cz = Math.cos(theta) * INNER_R;
    if (cz < 0 && Math.abs(cx) < halfB) continue;
    if (cz < 0) buttressEdgeX = Math.min(buttressEdgeX, Math.abs(cx) - (segLen / 2) * Math.abs(Math.cos(theta)));
    addWallMesh(`poly_${i}`, segLen + 0.08, wallH, wallThick, cx, wallH / 2, cz, theta);
  }
  // The buttress reaches out a little past where those segments begin, so
  // there's no gap between it and the curve.
  const outerX = Math.max(halfB, buttressEdgeX + 0.2);
  this.solidZones[0].minX = -outerX;
  this.solidZones[0].maxX = outerX;
  // Vine faces (see Level._scatterVineTilesOnWalls), clear of the buttress
  const faceLen = 2 * INNER_R * Math.tan(Math.PI / VINE_FACES);
  for (let i = 0; i < VINE_FACES; i++) {
    const theta = i * (2 * Math.PI / VINE_FACES);
    const nearButtress = Math.cos(theta) < 0 && Math.abs(Math.sin(theta) * INNER_R) < halfB + faceLen / 2;
    this._circularWalls.push({ theta, sideLen: faceLen, isDoor: nearButtress });
  }

  // ── The buttress and its door ──────────────────────────────────────────────
  // Two solid blocks either side of the doorway (discs bounce off them like
  // any wall), a block over it, and the door's frame on the flat face.
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
  const doorZ = faceZ - wallThick / 2;
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

  const slabGeo = new BoxGeometry(DOOR_WIDTH, DOOR_HEIGHT, wallThick);
  this.applyWallUVs(slabGeo, DOOR_WIDTH, DOOR_HEIGHT, wallThick);
  this.doorSlab = new Mesh(slabGeo, this._slabMat);
  this.doorSlab.position.set(0, DOOR_HEIGHT / 2, doorZ);
  this.scene.add(this.doorSlab);

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
