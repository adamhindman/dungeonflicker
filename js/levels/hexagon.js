import * as THREE from "three";

export function loadHexagon() {
  const HIGH_Y     = 2;    // outer floor elevation
  const MED_Y      = 1;    // middle ring elevation (PCs spawn here, lava here)
  const LOW_Y      = -1;   // center pit elevation (2 units below flat floor)
  const THETA0     = Math.PI / 6; // flat-top hex: first vertex 30° from +Z
  const COS30      = Math.sqrt(3) / 2;

  // Outer wall dimensions
  const hexWallH   = this.wallHeight + MED_Y; // wall spans from 0 to wallHeight+MED_Y, visible above flat floor
  const wallThick  = 0.5;

  // Ring circumradii (vertex distance from center for a regular hex).
  // For a regular hexagon: side_length = circumradius, inradius = R * cos30.
  const R_A = 27;   // outer hex wall
  const R_B = 23;   // inner edge of outer floor / top of outer ramp
  const R_C = 8;    // outer edge of pit ramp / where flat floor ends
  const R_D = 6.5;  // inner edge of middle ring / top of inner ramp (−0.5 wider)
  const R_E = 5;    // inner edge of inner ramp / center pit outer edge (25% larger)

  // Inradii (apothems) — used for physics zone boundaries.
  const RA_in = R_A * COS30;
  const RB_in = R_B * COS30;
  const RC_in = R_C * COS30;
  const RD_in = R_D * COS30;
  const RE_in = R_E * COS30;

  // Expose for GameController physics and for proper cleanup in unload().
  this.hexRings     = { HIGH_Y, MED_Y, LOW_Y, RA_in, RB_in, RC_in, RD_in, RE_in };
  this._hexFloorMat = null; // set below, disposed in unload()
  // Large fieldWidth/fieldDepth disables Disc.handleWallCollision rectangular check.
  this.fieldWidth   = R_A * 4;
  this.fieldDepth   = R_A * 4;
  // circleRadius lets isPositionValid() use a circular approximation of the hex boundary.
  this.circleRadius = RA_in;
  this._circularWalls = [];

  // ── Textures ──────────────────────────────────────────────────────────────
  const tileTexture = this.textureLoader.load("images/tile-stone-1.png");
  tileTexture.wrapS = THREE.RepeatWrapping;
  tileTexture.wrapT = THREE.RepeatWrapping;

  const wallTex = this.textureLoader.load("images/tile-stone-1.png");
  wallTex.wrapS = THREE.RepeatWrapping;
  wallTex.wrapT = THREE.RepeatWrapping;
  this.wallMaterial = new THREE.MeshStandardMaterial({
    map: wallTex, roughness: 0.6, metalness: 0.2,
  });

  const floorMat = new THREE.MeshStandardMaterial({
    map: tileTexture, roughness: 0.6, metalness: 0.2, side: THREE.DoubleSide,
  });
  this._hexFloorMat = floorMat; // stored for clean disposal in unload()

  const redTileTex = this.textureLoader.load("images/tile-stone-red-1.png");
  redTileTex.wrapS = THREE.RepeatWrapping;
  redTileTex.wrapT = THREE.RepeatWrapping;
  const pitMat = new THREE.MeshStandardMaterial({
    map: redTileTex, roughness: 0.6, metalness: 0.2, side: THREE.DoubleSide,
  });
  this._hexPitMat = pitMat; // stored for clean disposal in unload()

  // ── Geometry helpers ──────────────────────────────────────────────────────

  // Returns 6 vertices of a flat-top regular hexagon (theta0 = π/6) at height y.
  const hexVerts = (R, y) => {
    const v = [];
    for (let k = 0; k < 6; k++) {
      const a = k * Math.PI / 3 + THETA0;
      v.push(new THREE.Vector3(Math.sin(a) * R, y, Math.cos(a) * R));
    }
    return v;
  };

  // Build a BufferGeometry quad (two triangles) from four THREE.Vector3 vertices
  // and add it as a floor mesh.  UV = XZ/6 for consistent tile density.
  const addFloorPanel = (v0, v1, v2, v3, mat = floorMat) => {
    const pos = new Float32Array([
      v0.x, v0.y, v0.z,  v1.x, v1.y, v1.z,
      v2.x, v2.y, v2.z,  v3.x, v3.y, v3.z,
    ]);
    const uvs = new Float32Array([
      v0.x / 6, v0.z / 6,  v1.x / 6, v1.z / 6,
      v2.x / 6, v2.z / 6,  v3.x / 6, v3.z / 6,
    ]);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('uv',       new THREE.BufferAttribute(uvs, 2));
    geo.setIndex([0, 1, 2, 0, 2, 3]);
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this._hexFloorMeshes.push(mesh);
  };

  // Build 6 trapezoidal floor panels that form a hexagonal ring section.
  // Outer vertices are at (R_out, y_out); inner at (R_in, y_in).
  // When y_out ≠ y_in the section becomes a ramp.
  const addHexRingSection = (R_out, y_out, R_in, y_in, mat = floorMat) => {
    const outerV = hexVerts(R_out, y_out);
    const innerV = hexVerts(R_in,  y_in);
    for (let k = 0; k < 6; k++) {
      const kn = (k + 1) % 6;
      addFloorPanel(outerV[k], outerV[kn], innerV[kn], innerV[k], mat);
    }
  };

  // Build a filled hexagon (6 fan-triangles from center) at height y.
  const addHexFilled = (R, y, mat = floorMat) => {
    const verts = hexVerts(R, y);
    // 7 vertices: center (index 0) + 6 ring vertices (indices 1–6).
    const positions = [0, y, 0];
    const uvs      = [0, 0];
    for (let k = 0; k < 6; k++) {
      positions.push(verts[k].x, y, verts[k].z);
      uvs.push(verts[k].x / 6, verts[k].z / 6);
    }
    const indices = [];
    for (let k = 0; k < 6; k++) {
      indices.push(0, k + 1, ((k + 1) % 6) + 1);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geo.setAttribute('uv',       new THREE.BufferAttribute(new Float32Array(uvs), 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this._hexFloorMeshes.push(mesh);
  };

  // ── Three floor sections (flat outer hex + inner ramp + center pit) ───────
  // 1. Flat outer floor (MED_Y): R_A → R_C
  addHexRingSection(R_A, MED_Y, R_C, MED_Y);
  // 2. Inner ramp (descends inward): R_C (MED_Y) → R_E (LOW_Y) — red stone
  addHexRingSection(R_C, MED_Y, R_E, LOW_Y, pitMat);
  // 3. Center pit (lowest, LOW_Y): filled hex, radius R_E — red stone
  addHexFilled(R_E, LOW_Y, pitMat);

  // ── Door setup (north face, k=2) ──────────────────────────────────────────
  //
  // For flat-top orientation (theta0 = π/6), face k sits between vertex k and k+1.
  // Face k=2 midpoint angle = (2 + 0.5) * π/3 + π/6 = 5π/6 + π/6 = π → (0, y, −RA_in).
  // That is the north direction (−Z), consistent with the other room types.
  const DOOR_FACE   = 2;
  const doorFaceAngle = (DOOR_FACE + 0.5) * Math.PI / 3 + THETA0; // = π
  const doorZ       = Math.cos(doorFaceAngle) * RA_in;             // = −RA_in
  const sideLen     = R_A;   // for a regular hex, side length = circumradius
  const DOOR_WIDTH  = this.DOOR_WIDTH;
  const DOOR_HEIGHT = this.DOOR_HEIGHT;

  this.doorWall           = 'north';
  this._doorIsNS          = true;
  this._doorOpeningCenter = { x: 0, z: doorZ };
  this._doorSlabStartY    = MED_Y + DOOR_HEIGHT / 2;
  this._doorSlabEndY      = hexWallH + DOOR_HEIGHT;

  this._frameMat = this.wallMaterial.clone();
  this._frameMat.color.setHex(0x999999);
  this._frameMat.emissive = new THREE.Color(0x000000);
  this._frameMat.emissiveIntensity = 0;

  this._slabMat = this.wallMaterial.clone();
  this._slabMat.color.setHex(0x999999);
  this._slabMat.clippingPlanes = [
    new THREE.Plane(new THREE.Vector3(0, -1, 0), hexWallH),
  ];
  this._slabMat.clipShadows = true;

  const addWallMesh = (geo, x, y, z, rotY = 0, key = null) => {
    const mesh = new THREE.Mesh(geo, this.wallMaterial);
    mesh.position.set(x, y, z);
    if (rotY !== 0) mesh.rotation.y = rotY;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    if (key) this.walls[key] = mesh;
    return mesh;
  };

  const addFrameMesh = (geo, x, y, z) => {
    const mesh = new THREE.Mesh(geo, this._frameMat);
    mesh.position.set(x, y, z);
    this.scene.add(mesh);
    this.doorFrameMeshes.push(mesh);
    return mesh;
  };

  // Flanking wall segments on either side of the door opening.
  // Full hexWallH height, centred at hexWallH/2.
  const frameThick = 0.7;
  const postWidth  = 0.5;
  const lintelH    = postWidth;
  // Height above the lintel that needs a plain-stone fill strip.
  const overDoorH  = hexWallH - MED_Y - DOOR_HEIGHT - lintelH;
  const segLen     = (sideLen - DOOR_WIDTH) / 2;
  const segOff     = segLen / 2 + DOOR_WIDTH / 2;

  for (const sign of [-1, 1]) {
    const geo = new THREE.BoxGeometry(segLen, hexWallH, wallThick);
    this.applyWallUVs(geo, segLen, hexWallH, wallThick);
    addWallMesh(geo, sign * segOff, hexWallH / 2, doorZ, 0,
      `north_${sign > 0 ? 'right' : 'left'}`);
  }

  // Door frame posts (from MED_Y to MED_Y + DOOR_HEIGHT).
  for (const sign of [-1, 1]) {
    const geo = new THREE.BoxGeometry(postWidth, DOOR_HEIGHT, frameThick);
    this.applyWallUVs(geo, postWidth, DOOR_HEIGHT, frameThick);
    addFrameMesh(geo,
      sign * (DOOR_WIDTH / 2 + postWidth / 2),
      MED_Y + DOOR_HEIGHT / 2,
      doorZ
    );
  }

  // Lintel.
  const lintelW   = DOOR_WIDTH + postWidth * 2;
  const lintelGeo = new THREE.BoxGeometry(lintelW, lintelH, frameThick);
  this.applyWallUVs(lintelGeo, lintelW, lintelH, frameThick);
  addFrameMesh(lintelGeo, 0, MED_Y + DOOR_HEIGHT + lintelH / 2, doorZ);

  // Plain stone above the lintel (if any).
  if (overDoorH > 0.01) {
    const overGeo = new THREE.BoxGeometry(DOOR_WIDTH, overDoorH, wallThick);
    this.applyWallUVs(overGeo, DOOR_WIDTH, overDoorH, wallThick);
    addWallMesh(overGeo, 0,
      MED_Y + DOOR_HEIGHT + lintelH + overDoorH / 2, doorZ, 0, 'north_above');
  }

  // Black void plane (revealed when slab rises).
  const voidGeo = new THREE.PlaneGeometry(DOOR_WIDTH, DOOR_HEIGHT);
  const voidMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
  const voidMesh = new THREE.Mesh(voidGeo, voidMat);
  voidMesh.position.set(0, MED_Y + DOOR_HEIGHT / 2, doorZ - 0.4);
  this.scene.add(voidMesh);
  this.doorFrameMeshes.push(voidMesh);
  this._voidMesh = voidMesh;


  // Stone slab (blocks opening until door opens).
  const slabGeo = new THREE.BoxGeometry(DOOR_WIDTH, DOOR_HEIGHT, wallThick);
  this.applyWallUVs(slabGeo, DOOR_WIDTH, DOOR_HEIGHT, wallThick);
  this.doorSlab = new THREE.Mesh(slabGeo, this._slabMat);
  this.doorSlab.position.set(0, MED_Y + DOOR_HEIGHT / 2, doorZ);
  this.scene.add(this.doorSlab);

  // Record door face for vine-tile scatter (will skip it).
  this._circularWalls.push({ theta: doorFaceAngle, sideLen, isDoor: true });

  // ── Other five wall faces ─────────────────────────────────────────────────
  // These large rotated panels are visual-only — their inflated AABBs would
  // create phantom collision zones inside the arena.  Boundary physics are
  // handled by a per-frame circular push in GameController instead.
  for (let k = 0; k < 6; k++) {
    if (k === DOOR_FACE) continue;
    const faceAngle = (k + 0.5) * Math.PI / 3 + THETA0;
    const cx = Math.sin(faceAngle) * RA_in;
    const cz = Math.cos(faceAngle) * RA_in;
    const geo = new THREE.BoxGeometry(sideLen, hexWallH, wallThick);
    this.applyWallUVs(geo, sideLen, hexWallH, wallThick);
    const mesh = addWallMesh(geo, cx, hexWallH / 2, cz, faceAngle); // no key — not in this.walls
    this._hexOuterWalls.push(mesh);
    this._circularWalls.push({ theta: faceAngle, sideLen, isDoor: false });
  }

  // ── 6 preset triangular columns, evenly spaced on the upper ring ─────────
  // Placed at circumradius R_COL = 17, angles offset 30° so none sits in
  // front of the door (which is at α = π).  Each triangle is rotated so its
  // most-acute vertex points toward the centre of the map.
  const R_COL   = 17;              // circumradius of column ring
  const COL_W   = 3;               // circumradius * 2 for collision / visual width
  const N_COL   = 6;
  const COL_ANG_OFFSET = Math.PI / 6; // 30° offset

  for (let i = 0; i < N_COL; i++) {
    const alpha = COL_ANG_OFFSET + i * (2 * Math.PI / N_COL);
    const x     = Math.sin(alpha) * R_COL;
    const z     = Math.cos(alpha) * R_COL;

    // Rotate so the first CylinderGeometry vertex (+Z in local space) points
    // toward the map centre: rotY = alpha + π achieves this.
    const rotY = alpha + Math.PI;

    const obs = { x, z, width: COL_W, depth: COL_W, type: 'triangle', rotY };
    this.obstacles.push(obs);

    const geo = new THREE.CylinderGeometry(COL_W / 2, COL_W / 2, this.wallHeight, 3);
    this.applyCylinderUVs(geo, COL_W / 2, this.wallHeight);
    const mesh = new THREE.Mesh(geo, this.wallMaterial);
    mesh.position.set(x, MED_Y + this.wallHeight / 2, z);
    mesh.rotation.y = rotY;
    mesh.castShadow    = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.walls[`hex_col_${i}`] = mesh;
  }

  this._initTransparency();
  this._addLighting();
}

export function getHexTerrainHeight(x, z) {
  const { MED_Y, LOW_Y, RC_in, RE_in } = this.hexRings;
  const r = Math.sqrt(x * x + z * z);

  if (r <= RE_in) {
    return LOW_Y;
  }
  if (r <= RC_in) {
    const t = (r - RE_in) / (RC_in - RE_in);
    return LOW_Y + t * (MED_Y - LOW_Y);
  }
  return MED_Y;
}

export function getHexTerrainSlopeForce(x, z) {
  const { RC_in, RE_in } = this.hexRings;
  const r = Math.sqrt(x * x + z * z);
  if (r < 0.01) return { fx: 0, fz: 0 };

  if (r > RE_in && r <= RC_in) {
    return { fx: -(x / r) * 0.007, fz: -(z / r) * 0.007 };
  }
  return { fx: 0, fz: 0 };
}

export function disposeHexagon() {
  for (const mesh of (this._hexFloorMeshes || [])) {
    this.scene.remove(mesh);
    if (mesh.geometry) mesh.geometry.dispose();
  }
  this._hexFloorMeshes = [];
  if (this._hexFloorMat) {
    if (this._hexFloorMat.map) this._hexFloorMat.map.dispose();
    this._hexFloorMat.dispose();
    this._hexFloorMat = null;
  }
  if (this._hexPitMat) {
    if (this._hexPitMat.map) this._hexPitMat.map.dispose();
    this._hexPitMat.dispose();
    this._hexPitMat = null;
  }
  for (const mesh of (this._hexOuterWalls || [])) {
    this.scene.remove(mesh);
    if (mesh.geometry) mesh.geometry.dispose();
    if (mesh.material) mesh.material.dispose();
  }
  this._hexOuterWalls = [];
  this.hexRings = null;
}
