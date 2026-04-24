import * as THREE from "three";

export function loadCircular() {
  const N          = 12;
  const INNER_R    = 24;   // inradius: distance from centre to wall midpoint
  const wallThick  = 0.5;
  const wallH      = this.wallHeight;
  const DOOR_WIDTH  = this.DOOR_WIDTH;
  const DOOR_HEIGHT = this.DOOR_HEIGHT;

  this.circleRadius   = INNER_R;
  this._circularWalls = [];
  // Large fieldWidth/fieldDepth disables Disc.handleWallCollision's rectangular check.
  this.fieldWidth  = INNER_R * 4;
  this.fieldDepth  = INNER_R * 4;

  // ── Floor ──────────────────────────────────────────────────────────────────
  const tileTexture = this.textureLoader.load("images/tile-stone-1.png");
  tileTexture.wrapS = THREE.RepeatWrapping;
  tileTexture.wrapT = THREE.RepeatWrapping;
  tileTexture.repeat.set((INNER_R * 2) / 6, (INNER_R * 2) / 6);

  const floorOuterR = INNER_R / Math.cos(Math.PI / N);
  const floorPositions = [[0, 0, 0]];
  const floorUvs = [[0.5, 0.5]];
  const floorIndices = [];
  for (let i = 0; i < N; i++) {
    const theta = i * (2 * Math.PI / N) - Math.PI / N;
    const x = Math.sin(theta) * floorOuterR;
    const z = Math.cos(theta) * floorOuterR;
    floorPositions.push([x, 0, z]);
    floorUvs.push([(x / floorOuterR + 1) / 2, (z / floorOuterR + 1) / 2]);
    floorIndices.push(0, i + 1, i === N - 1 ? 1 : i + 2);
  }
  const floorGeo = new THREE.BufferGeometry();
  floorGeo.setAttribute('position', new THREE.Float32BufferAttribute(floorPositions.flat(), 3));
  floorGeo.setAttribute('uv', new THREE.Float32BufferAttribute(floorUvs.flat(), 2));
  floorGeo.setIndex(floorIndices);
  floorGeo.computeVertexNormals();

  this.floor = new THREE.Mesh(
    floorGeo,
    new THREE.MeshStandardMaterial({
      map: tileTexture,
      roughness: 0.6,
      metalness: 0.2,
      side: THREE.DoubleSide,
    })
  );
  this.floor.receiveShadow = true;
  this.scene.add(this.floor);

  // ── Wall material ──────────────────────────────────────────────────────────
  const wallTex = this.textureLoader.load("images/tile-stone-1.png");
  wallTex.wrapS = THREE.RepeatWrapping;
  wallTex.wrapT = THREE.RepeatWrapping;
  this.wallMaterial = new THREE.MeshStandardMaterial({
    map: wallTex, roughness: 0.6, metalness: 0.2,
  });

  // ── Polygon geometry ───────────────────────────────────────────────────────
  // Side length of one polygon face when inradius = INNER_R.
  const sideLen = 2 * INNER_R * Math.tan(Math.PI / N);

  // Helper: add a wall-material mesh
  const addWallMesh = (geo, x, y, z, rotY = 0) => {
    const mesh = new THREE.Mesh(geo, this.wallMaterial);
    mesh.position.set(x, y, z);
    if (rotY !== 0) mesh.rotation.y = rotY;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    return mesh;
  };

  // Door is always on the north face — opposite the camera's default position
  // (camera starts on the south/+Z side).  For a 12-sided polygon, face N/2
  // sits at theta = π, placing it at (0, ?, -INNER_R) — the north pole.
  const DOOR_FACE  = N / 2;                          // face index 6
  const doorTheta  = DOOR_FACE * (2 * Math.PI / N);  // = π
  const doorZ      = Math.cos(doorTheta) * INNER_R;  // = -INNER_R

  this.doorWall           = 'north';
  this._doorIsNS          = true;
  this._doorOpeningCenter = { x: 0, z: doorZ };
  this._doorSlabStartY    = DOOR_HEIGHT / 2;
  this._doorSlabEndY      = wallH + DOOR_HEIGHT;

  this._frameMat = this.wallMaterial.clone();
  this._frameMat.color.setHex(0x999999);
  this._frameMat.emissive = new THREE.Color(0x000000);
  this._frameMat.emissiveIntensity = 0;

  this._slabMat = this.wallMaterial.clone();
  this._slabMat.color.setHex(0x999999);
  this._slabMat.clippingPlanes = [
    new THREE.Plane(new THREE.Vector3(0, -1, 0), wallH),
  ];
  this._slabMat.clipShadows = true;

  const addFrameMesh = (geo, x, y, z) => {
    const mesh = new THREE.Mesh(geo, this._frameMat);
    mesh.position.set(x, y, z);
    this.scene.add(mesh);
    this.doorFrameMeshes.push(mesh);
    return mesh;
  };

  // ── Door face (theta = π, north) ───────────────────────────────────────────
  const frameThick = 0.7;
  const postWidth  = 0.5;
  const lintelH    = postWidth;
  const overDoorH  = wallH - DOOR_HEIGHT - lintelH;
  const segLen     = (sideLen - DOOR_WIDTH) / 2;
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
  // Place just outside the wall (north/-Z side)
  voidMesh.position.set(0, DOOR_HEIGHT / 2, doorZ - 0.4);
  this.scene.add(voidMesh);
  this.doorFrameMeshes.push(voidMesh);
  this._voidMesh = voidMesh;


  const slabGeo = new THREE.BoxGeometry(DOOR_WIDTH, DOOR_HEIGHT, wallThick);
  this.applyWallUVs(slabGeo, DOOR_WIDTH, DOOR_HEIGHT, wallThick);
  this.doorSlab = new THREE.Mesh(slabGeo, this._slabMat);
  this.doorSlab.position.set(0, DOOR_HEIGHT / 2, doorZ);
  this.scene.add(this.doorSlab);

  // Record door face for vine scatter (skip it)
  this._circularWalls.push({ theta: doorTheta, sideLen, isDoor: true });

  // ── All other polygon wall segments ────────────────────────────────────────
  for (let i = 0; i < N; i++) {
    if (i === DOOR_FACE) continue; // door face built above
    const theta = i * (2 * Math.PI / N);
    const cx    = Math.sin(theta) * INNER_R;
    const cz    = Math.cos(theta) * INNER_R;

    const geo = new THREE.BoxGeometry(sideLen, wallH, wallThick);
    this.applyWallUVs(geo, sideLen, wallH, wallThick);
    const mesh = new THREE.Mesh(geo, this.wallMaterial);
    mesh.position.set(cx, wallH / 2, cz);
    mesh.rotation.y = theta;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.walls[`poly_${i}`] = mesh;

    this._circularWalls.push({ theta, sideLen, isDoor: false });
  }

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
