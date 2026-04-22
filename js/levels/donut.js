import * as THREE from "three";

export function loadDonut() {
  // All polygon rings share vertex angles at multiples of 2π/N so every edge aligns.
  const N          = 12;     // sides on every polygon ring
  const OUTER_R    = 24.2;   // wall panel center radius (≈ polygon apothem for outer walls)
  const HOLE_APO   = 11.0;   // flat ring inner hole apothem (floor ends / pit begins)
  const PIT_APO    = 6.0;    // pit base apothem
  const MED_Y      = 0;      // ring floor elevation
  const PIT_Y      = -2.5;   // pit floor elevation
  const wallThick  = 0.5;
  const wallH      = this.wallHeight;
  const DOOR_WIDTH  = this.DOOR_WIDTH;
  const DOOR_HEIGHT = this.DOOR_HEIGHT;

  // Circumradii: center-to-vertex distance for each polygon ring
  const cosN       = Math.cos(Math.PI / N);
  const OUTER_CIRC = (OUTER_R - wallThick / 2) / cosN; // outer ring vertex radius
  const HOLE_CIRC  = HOLE_APO / cosN;                   // inner hole vertex radius
  const PIT_CIRC   = PIT_APO  / cosN;                   // pit base vertex radius

  // Alias to match callers that use the old constant name
  const RING_INNER_R = HOLE_APO;
  const PIT_R        = PIT_APO;

  this.circleRadius     = OUTER_R;
  this.donutInnerRadius = HOLE_APO;
  this.donutRings       = { MED_Y, PIT_Y, RING_INNER_R, PIT_R, OUTER_R };
  this._circularWalls   = [];
  this.fieldWidth       = OUTER_R * 4;
  this.fieldDepth       = OUTER_R * 4;
  this.obstacles        = [];

  // ── Textures ──────────────────────────────────────────────────────────────
  const wallTex = this.textureLoader.load("images/tile-stone-1.png");
  wallTex.wrapS = THREE.RepeatWrapping;
  wallTex.wrapT = THREE.RepeatWrapping;
  this.wallMaterial = new THREE.MeshStandardMaterial({
    map: wallTex, roughness: 0.6, metalness: 0.2,
  });

  const tileTexture = this.textureLoader.load("images/tile-stone-1.png");
  tileTexture.wrapS = THREE.RepeatWrapping;
  tileTexture.wrapT = THREE.RepeatWrapping;
  const floorMat = new THREE.MeshStandardMaterial({
    map: tileTexture, roughness: 0.6, metalness: 0.2, side: THREE.DoubleSide,
  });
  this._hexFloorMat = floorMat;

  const redTileTex = this.textureLoader.load("images/tile-stone-red-1.png");
  redTileTex.wrapS = THREE.RepeatWrapping;
  redTileTex.wrapT = THREE.RepeatWrapping;
  const pitMat = new THREE.MeshStandardMaterial({
    map: redTileTex, roughness: 0.6, metalness: 0.2, side: THREE.DoubleSide,
  });
  this._hexPitMat = pitMat;

  // ── Floor geometry helpers ────────────────────────────────────────────────
  // All helpers push finished meshes into this._hexFloorMeshes for cleanup.

  const addFloorQuad = (v0, v1, v2, v3, mat) => {
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

  const addFloorTri = (v0, v1, v2, mat) => {
    const pos = new Float32Array([
      v0.x, v0.y, v0.z,  v1.x, v1.y, v1.z,  v2.x, v2.y, v2.z,
    ]);
    const uvs = new Float32Array([
      v0.x / 6, v0.z / 6,  v1.x / 6, v1.z / 6,  v2.x / 6, v2.z / 6,
    ]);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('uv',       new THREE.BufferAttribute(uvs, 2));
    geo.setIndex([0, 1, 2]);
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, mat);
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this._hexFloorMeshes.push(mesh);
  };

  // ── Floor construction ────────────────────────────────────────────────────
  // One pass: for each of the N polygon faces, build three panels that share
  // vertices at the same angles, so every edge meets perfectly.
  for (let i = 0; i < N; i++) {
    // Offset by half a face so each floor face is centred on wall face i.
    // Vertices fall at the wall inner-face corners: (i±0.5)·2π/N.
    const a0 = (i - 0.5) * (Math.PI * 2 / N);
    const a1 = (i + 0.5) * (Math.PI * 2 / N);

    // Pre-compute the four polygon vertex positions used across all three panels.
    const outerX0 = Math.sin(a0) * OUTER_CIRC,  outerZ0 = Math.cos(a0) * OUTER_CIRC;
    const outerX1 = Math.sin(a1) * OUTER_CIRC,  outerZ1 = Math.cos(a1) * OUTER_CIRC;
    const holeX0  = Math.sin(a0) * HOLE_CIRC,   holeZ0  = Math.cos(a0) * HOLE_CIRC;
    const holeX1  = Math.sin(a1) * HOLE_CIRC,   holeZ1  = Math.cos(a1) * HOLE_CIRC;
    const pitX0   = Math.sin(a0) * PIT_CIRC,    pitZ0   = Math.cos(a0) * PIT_CIRC;
    const pitX1   = Math.sin(a1) * PIT_CIRC,    pitZ1   = Math.cos(a1) * PIT_CIRC;

    // 1. Flat ring (grey stone): outer wall edge → inner hole, all at MED_Y
    addFloorQuad(
      new THREE.Vector3(outerX0, MED_Y, outerZ0),
      new THREE.Vector3(outerX1, MED_Y, outerZ1),
      new THREE.Vector3(holeX1,  MED_Y, holeZ1),
      new THREE.Vector3(holeX0,  MED_Y, holeZ0),
      floorMat,
    );

    // 2. Pit slope (red stone): inner hole at MED_Y → pit base at PIT_Y
    addFloorQuad(
      new THREE.Vector3(holeX0, MED_Y, holeZ0),
      new THREE.Vector3(holeX1, MED_Y, holeZ1),
      new THREE.Vector3(pitX1,  PIT_Y, pitZ1),
      new THREE.Vector3(pitX0,  PIT_Y, pitZ0),
      pitMat,
    );

    // 3. Pit floor (red stone): fan triangle to centre
    addFloorTri(
      new THREE.Vector3(0,     PIT_Y, 0),
      new THREE.Vector3(pitX0, PIT_Y, pitZ0),
      new THREE.Vector3(pitX1, PIT_Y, pitZ1),
      pitMat,
    );
  }

  // ── Outer polygon wall (12 sides) with door on north face ─────────────────
  const outerSideLen = 2 * OUTER_R * Math.tan(Math.PI / N);
  const DOOR_FACE    = N / 2;
  const doorTheta    = DOOR_FACE * (2 * Math.PI / N); // = π
  const doorZ        = Math.cos(doorTheta) * OUTER_R;       // = -OUTER_R

  this.doorWall           = 'north';
  this._doorIsNS          = true;
  this._doorOpeningCenter = { x: 0, z: doorZ };
  this._doorSlabStartY    = DOOR_HEIGHT / 2;
  this._doorSlabEndY      = wallH + DOOR_HEIGHT;

  this._frameMat = this.wallMaterial.clone();
  this._frameMat.color.setHex(0x999999);
  this._frameMat.emissive          = new THREE.Color(0x000000);
  this._frameMat.emissiveIntensity = 0;

  this._slabMat = this.wallMaterial.clone();
  this._slabMat.color.setHex(0x999999);
  this._slabMat.clippingPlanes = [
    new THREE.Plane(new THREE.Vector3(0, -1, 0), wallH),
  ];
  this._slabMat.clipShadows = true;

  const addWallMesh = (geo, x, y, z, rotY = 0) => {
    const mesh = new THREE.Mesh(geo, this.wallMaterial);
    mesh.position.set(x, y, z);
    if (rotY !== 0) mesh.rotation.y = rotY;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    return mesh;
  };

  const addFrameMesh = (geo, x, y, z) => {
    const mesh = new THREE.Mesh(geo, this._frameMat);
    mesh.position.set(x, y, z);
    this.scene.add(mesh);
    this.doorFrameMeshes.push(mesh);
    return mesh;
  };

  const frameThick = 0.7;
  const postWidth  = 0.5;
  const lintelH    = postWidth;
  const overDoorH  = wallH - DOOR_HEIGHT - lintelH;
  const segLen     = (outerSideLen - DOOR_WIDTH) / 2;
  const segOff     = segLen / 2 + DOOR_WIDTH / 2;

  for (const sign of [-1, 1]) {
    const geo = new THREE.BoxGeometry(segLen, wallH, wallThick);
    this.applyWallUVs(geo, segLen, wallH, wallThick);
    const mesh = addWallMesh(geo, sign * segOff, wallH / 2, doorZ);
    this.walls[`north_${sign > 0 ? 'right' : 'left'}`] = mesh;
  }
  for (const sign of [-1, 1]) {
    const geo = new THREE.BoxGeometry(postWidth, DOOR_HEIGHT, frameThick);
    this.applyWallUVs(geo, postWidth, DOOR_HEIGHT, frameThick);
    addFrameMesh(geo, sign * (DOOR_WIDTH / 2 + postWidth / 2), DOOR_HEIGHT / 2, doorZ);
  }
  const lintelW   = DOOR_WIDTH + postWidth * 2;
  const lintelGeo = new THREE.BoxGeometry(lintelW, lintelH, frameThick);
  this.applyWallUVs(lintelGeo, lintelW, lintelH, frameThick);
  addFrameMesh(lintelGeo, 0, DOOR_HEIGHT + lintelH / 2, doorZ);

  if (overDoorH > 0) {
    const overGeo = new THREE.BoxGeometry(DOOR_WIDTH, overDoorH, wallThick);
    this.applyWallUVs(overGeo, DOOR_WIDTH, overDoorH, wallThick);
    this.walls['north_above'] = addWallMesh(overGeo, 0, DOOR_HEIGHT + lintelH + overDoorH / 2, doorZ);
  }

  const voidGeo = new THREE.PlaneGeometry(DOOR_WIDTH, DOOR_HEIGHT);
  const voidMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
  const voidMesh = new THREE.Mesh(voidGeo, voidMat);
  voidMesh.position.set(0, DOOR_HEIGHT / 2, doorZ - 0.4);
  this.scene.add(voidMesh);
  this.doorFrameMeshes.push(voidMesh);
  this._voidMesh = voidMesh;

  const slabGeo = new THREE.BoxGeometry(DOOR_WIDTH, DOOR_HEIGHT, wallThick);
  this.applyWallUVs(slabGeo, DOOR_WIDTH, DOOR_HEIGHT, wallThick);
  this.doorSlab = new THREE.Mesh(slabGeo, this._slabMat);
  this.doorSlab.position.set(0, DOOR_HEIGHT / 2, doorZ);
  this.scene.add(this.doorSlab);

  this._circularWalls.push({ theta: doorTheta, sideLen: outerSideLen, isDoor: true });

  for (let i = 0; i < N; i++) {
    if (i === DOOR_FACE) continue;
    const theta = i * (2 * Math.PI / N);
    const cx    = Math.sin(theta) * OUTER_R;
    const cz    = Math.cos(theta) * OUTER_R;
    const geo   = new THREE.BoxGeometry(outerSideLen, wallH, wallThick);
    this.applyWallUVs(geo, outerSideLen, wallH, wallThick);
    const mesh = new THREE.Mesh(geo, this.wallMaterial);
    mesh.position.set(cx, wallH / 2, cz);
    mesh.rotation.y    = theta;
    mesh.castShadow    = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this._hexOuterWalls.push(mesh);
    this._circularWalls.push({ theta, sideLen: outerSideLen, isDoor: false });
  }

  // ── Pillars around the ring ────────────────────────────────────────────────
  // 4 round pillars at r=17, offset 45° so none sits near the door (θ=π).
  // Pillar angles: 45°, 135°, 225°, 315° — all 45° away from the door.
  const R_COL = 17;
  const N_COL = 4;
  const COL_R = 1.2;
  for (let i = 0; i < N_COL; i++) {
    const alpha = Math.PI / 4 + i * (2 * Math.PI / N_COL);
    const x = Math.sin(alpha) * R_COL;
    const z = Math.cos(alpha) * R_COL;
    this.obstacles.push({ x, z, width: COL_R * 2, depth: COL_R * 2, type: 'pillar' });
    const geo = new THREE.CylinderGeometry(COL_R, COL_R, wallH, 12);
    this.applyCylinderUVs(geo, COL_R, wallH);
    const mesh = new THREE.Mesh(geo, this.wallMaterial);
    mesh.position.set(x, MED_Y + wallH / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.walls[`donut_col_${i}`] = mesh;
  }

  this._initTransparency();
  this._addLighting();
}

export function getDonutTerrainHeight(x, z) {
  const { MED_Y, PIT_Y, RING_INNER_R, PIT_R } = this.donutRings;
  const r = Math.sqrt(x * x + z * z);
  if (r <= PIT_R) return PIT_Y;
  if (r <= RING_INNER_R) {
    const t = (r - PIT_R) / (RING_INNER_R - PIT_R);
    return PIT_Y + t * (MED_Y - PIT_Y);
  }
  return MED_Y;
}

export function getDonutTerrainSlopeForce(x, z) {
  const { RING_INNER_R, PIT_R } = this.donutRings;
  const r = Math.sqrt(x * x + z * z);
  if (r < 0.01) return { fx: 0, fz: 0 };
  if (r > PIT_R && r <= RING_INNER_R) {
    return { fx: -(x / r) * 0.007, fz: -(z / r) * 0.007 };
  }
  return { fx: 0, fz: 0 };
}

export function disposeDonut() {
  this.donutInnerRadius = null;
  this.donutRings = null;
}
