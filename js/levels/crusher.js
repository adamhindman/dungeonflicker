import * as THREE from "three";

export function loadCrusher() {
  const OUTER_R = 22;
  const N = 6;
  const wallH = this.wallHeight;
  const wallThick = 0.5;
  const vertices = Array.from({ length: N }, (_, i) => {
    const a = -Math.PI / 2 + Math.PI / N + i * (2 * Math.PI / N);
    return new THREE.Vector2(Math.cos(a) * OUTER_R, Math.sin(a) * OUTER_R);
  });
  const edges = vertices.map((start, i) => {
    const end = vertices[(i + 1) % vertices.length];
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const dir = end.clone().sub(start).normalize();
    const inward = mid.clone().multiplyScalar(-1).normalize();
    return {
      start,
      end,
      mid,
      dir,
      inward,
      length: start.distanceTo(end),
      rotY: Math.atan2(-dir.y, dir.x),
    };
  });
  const farEdgeIndex = edges.reduce((best, edge, i) => (
    edge.mid.y < edges[best].mid.y ? i : best
  ), 0);
  const innerR = edges[farEdgeIndex].mid.length();

  this.circleRadius = innerR;
  this._circularWalls = [];
  this.fieldWidth = OUTER_R * 4;
  this.fieldDepth = OUTER_R * 4;
  this.obstacles = [];
  this._crusherMeshes = [];

  const floorTex = this.textureLoader.load("images/tile-stone-1.jpg");
  floorTex.wrapS = THREE.RepeatWrapping;
  floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set((OUTER_R * 2) / 6, (OUTER_R * 2) / 6);
  const floorMat = new THREE.MeshStandardMaterial({
    map: floorTex,
    roughness: 0.6,
    metalness: 0.2,
    side: THREE.DoubleSide,
  });

  const floorPositions = [[0, 0, 0]];
  const floorUvs = [[0.5, 0.5]];
  const floorIndices = [];
  for (const v of vertices) {
    floorPositions.push([v.x, 0, v.y]);
    floorUvs.push([(v.x / OUTER_R + 1) / 2, (v.y / OUTER_R + 1) / 2]);
  }
  for (let i = 1; i <= N; i++) {
    floorIndices.push(0, i, i === N ? 1 : i + 1);
  }
  const floorGeo = new THREE.BufferGeometry();
  floorGeo.setAttribute('position', new THREE.Float32BufferAttribute(floorPositions.flat(), 3));
  floorGeo.setAttribute('uv', new THREE.Float32BufferAttribute(floorUvs.flat(), 2));
  floorGeo.setIndex(floorIndices);
  floorGeo.computeVertexNormals();
  this.floor = new THREE.Mesh(floorGeo, floorMat);
  this.floor.receiveShadow = true;
  this.scene.add(this.floor);

  const wallTex = this.textureLoader.load("images/tile-stone-1.jpg");
  wallTex.wrapS = THREE.RepeatWrapping;
  wallTex.wrapT = THREE.RepeatWrapping;
  this.wallMaterial = new THREE.MeshStandardMaterial({
    map: wallTex,
    roughness: 0.6,
    metalness: 0.2,
  });

  this.doorWall = 'north';
  this._doorIsNS = true;
  const doorEdge = edges[farEdgeIndex];
  const doorTheta = Math.atan2(doorEdge.mid.x, doorEdge.mid.y);
  const doorX = doorEdge.mid.x;
  const doorZ = doorEdge.mid.y;
  this._doorOpeningCenter = { x: doorX, z: doorZ };
  this._doorSlabStartY = this.DOOR_HEIGHT / 2;
  this._doorSlabEndY = wallH + this.DOOR_HEIGHT;

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

  const addFrameMesh = (geo, x, y, z, rotY = 0) => {
    const mesh = new THREE.Mesh(geo, this._frameMat);
    mesh.position.set(x, y, z);
    if (rotY !== 0) mesh.rotation.y = rotY;
    this.scene.add(mesh);
    this.doorFrameMeshes.push(mesh);
    return mesh;
  };

  const frameThick = 0.7;
  const postWidth = 0.5;
  const lintelH = postWidth;
  const overDoorH = wallH - this.DOOR_HEIGHT - lintelH;
  const segLen = (doorEdge.length - this.DOOR_WIDTH) / 2;
  const segOff = segLen / 2 + this.DOOR_WIDTH / 2;

  for (const sign of [-1, 1]) {
    const geo = new THREE.BoxGeometry(segLen, wallH, wallThick);
    this.applyWallUVs(geo, segLen, wallH, wallThick);
    const x = doorEdge.mid.x + doorEdge.dir.x * sign * segOff;
    const z = doorEdge.mid.y + doorEdge.dir.y * sign * segOff;
    const mesh = addWallMesh(
      geo,
      x,
      wallH / 2,
      z,
      doorEdge.rotY,
      `north_${sign > 0 ? 'right' : 'left'}`,
    );
    this._circularWalls.push({ theta: doorTheta, sideLen: segLen, isDoor: true, mesh });
  }

  for (const sign of [-1, 1]) {
    const geo = new THREE.BoxGeometry(postWidth, this.DOOR_HEIGHT, frameThick);
    this.applyWallUVs(geo, postWidth, this.DOOR_HEIGHT, frameThick);
    const off = sign * (this.DOOR_WIDTH / 2 + postWidth / 2);
    addFrameMesh(
      geo,
      doorEdge.mid.x + doorEdge.dir.x * off,
      this.DOOR_HEIGHT / 2,
      doorEdge.mid.y + doorEdge.dir.y * off,
      doorEdge.rotY,
    );
  }

  const lintelGeo = new THREE.BoxGeometry(this.DOOR_WIDTH + postWidth * 2, lintelH, frameThick);
  this.applyWallUVs(lintelGeo, this.DOOR_WIDTH + postWidth * 2, lintelH, frameThick);
  addFrameMesh(lintelGeo, doorEdge.mid.x, this.DOOR_HEIGHT + lintelH / 2, doorEdge.mid.y, doorEdge.rotY);

  if (overDoorH > 0) {
    const overGeo = new THREE.BoxGeometry(this.DOOR_WIDTH, overDoorH, wallThick);
    this.applyWallUVs(overGeo, this.DOOR_WIDTH, overDoorH, wallThick);
    addWallMesh(
      overGeo,
      doorEdge.mid.x,
      this.DOOR_HEIGHT + lintelH + overDoorH / 2,
      doorEdge.mid.y,
      doorEdge.rotY,
      'north_above',
    );
  }

  const voidGeo = new THREE.PlaneGeometry(this.DOOR_WIDTH, this.DOOR_HEIGHT);
  const voidMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
  const voidMesh = new THREE.Mesh(voidGeo, voidMat);
  voidMesh.position.set(
    doorEdge.mid.x + doorEdge.inward.x * 0.4,
    this.DOOR_HEIGHT / 2,
    doorEdge.mid.y + doorEdge.inward.y * 0.4,
  );
  voidMesh.rotation.y = doorEdge.rotY;
  this.scene.add(voidMesh);
  this.doorFrameMeshes.push(voidMesh);
  this._voidMesh = voidMesh;

  const slabGeo = new THREE.BoxGeometry(this.DOOR_WIDTH, this.DOOR_HEIGHT, wallThick);
  this.applyWallUVs(slabGeo, this.DOOR_WIDTH, this.DOOR_HEIGHT, wallThick);
  this.doorSlab = new THREE.Mesh(slabGeo, this._slabMat);
  this.doorSlab.position.set(doorEdge.mid.x, this.DOOR_HEIGHT / 2, doorEdge.mid.y);
  this.doorSlab.rotation.y = doorEdge.rotY;
  this.scene.add(this.doorSlab);

  const crusherTex = this.textureLoader.load("images/tile-stone-red-1.jpg");
  crusherTex.wrapS = THREE.RepeatWrapping;
  crusherTex.wrapT = THREE.RepeatWrapping;
  this._crusherMat = new THREE.MeshStandardMaterial({
    map: crusherTex,
    roughness: 0.6,
    metalness: 0.2,
  });

  const crusherWidth = 4.4;
  const retractedLength = .1;
  const crusherLength = 14;
  const wallInset = wallThick / 2;
  const crushers = [];

  const makeCrusher = (id, edge) => {
    const inwardAngle = Math.atan2(edge.inward.y, edge.inward.x);
    const anchorX = edge.mid.x + edge.inward.x * wallInset;
    const anchorZ = edge.mid.y + edge.inward.y * wallInset;
    const geo = new THREE.BoxGeometry(crusherLength, wallH, crusherWidth);
    this.applyWallUVs(geo, crusherLength, wallH, crusherWidth);
    const mesh = new THREE.Mesh(geo, this._crusherMat.clone());
    mesh.rotation.y = -inwardAngle;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    const warningLight = new THREE.PointLight(0xff3300, 0, 6, 2);
    warningLight.visible = false;
    this.scene.add(warningLight);
    const warningMarker = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 12, 8),
      new THREE.MeshBasicMaterial({ color: 0xff3300 }),
    );
    warningMarker.visible = false;
    this.scene.add(warningMarker);
    const crusher = {
      id,
      mesh,
      warningLight,
      warningMarker,
      anchorX,
      anchorZ,
      angle: inwardAngle,
      retractedLength,
      extendedLength: crusherLength,
      width: crusherWidth,
      currentLength: retractedLength,
      targetLength: retractedLength,
      active: false,
      hitDiscs: new Set(),
    };
    this._setCrusherLength(crusher, retractedLength);
    this._crusherMeshes.push(mesh);
    crushers.push(crusher);
    return crusher;
  };

  for (let i = 0; i < N; i++) {
    const edge = edges[i];
    if (i !== farEdgeIndex) {
      const theta = Math.atan2(edge.mid.x, edge.mid.y);
      const geo = new THREE.BoxGeometry(edge.length, wallH, wallThick);
      this.applyWallUVs(geo, edge.length, wallH, wallThick);
      addWallMesh(geo, edge.mid.x, wallH / 2, edge.mid.y, edge.rotY, `poly_${i}`);
      this._circularWalls.push({ theta, sideLen: edge.length, isDoor: false });
      makeCrusher(`crusher_${i}`, edge);
    }
  }

  this.crusherConfig = {
    roundIndex: 0,
    crushers,
    lastCrushers: [],
    nextCrushers: [],
  };
  chooseNextCrusher.call(this);
  markNextCrushers.call(this);

  this._initTransparency();
  this._addLighting();
}

export function setCrusherLength(crusher, length) {
  crusher.currentLength = length;
  const scaleX = length / crusher.extendedLength;
  crusher.mesh.scale.x = scaleX;
  const dx = Math.cos(crusher.angle);
  const dz = Math.sin(crusher.angle);
  crusher.mesh.position.set(
    crusher.anchorX + dx * length / 2,
    this.wallHeight / 2,
    crusher.anchorZ + dz * length / 2,
  );
  if (crusher.warningLight) {
    const lightX = crusher.anchorX + dx * (length + 0.25);
    const lightY = this.wallHeight * 0.62;
    const lightZ = crusher.anchorZ + dz * (length + 0.25);
    crusher.warningLight.position.set(lightX, lightY, lightZ);
    if (crusher.warningMarker) {
      crusher.warningMarker.position.set(lightX, lightY, lightZ);
    }
  }
}

export function chooseNextCrusher() {
  if (!this.crusherConfig) return [];
  const previous = new Set(this.crusherConfig.lastCrushers || []);
  const candidates = this.crusherConfig.crushers.filter(c => !previous.has(c));
  const pool = candidates.length ? candidates.slice() : this.crusherConfig.crushers.slice();
  const count = Math.min(pool.length, 1 + Math.floor(Math.random() * 3));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  this.crusherConfig.nextCrushers = pool.slice(0, count);
  return this.crusherConfig.nextCrushers;
}

export function getNextCrushers() {
  if (!this.crusherConfig) return [];
  if (!this.crusherConfig.nextCrushers || this.crusherConfig.nextCrushers.length === 0) {
    chooseNextCrusher.call(this);
  }
  return this.crusherConfig.nextCrushers || [];
}

export function markNextCrushers() {
  if (!this.crusherConfig) return;
  const nextCrushers = getNextCrushers.call(this);
  for (const crusher of this.crusherConfig.crushers) {
    if (nextCrushers.includes(crusher)) {
      if (crusher.warningLight) {
        crusher.warningLight.visible = true;
        crusher.warningLight.intensity = 35;
      }
      if (crusher.warningMarker) crusher.warningMarker.visible = true;
    } else {
      if (crusher.warningLight) {
        crusher.warningLight.visible = false;
        crusher.warningLight.intensity = 0;
      }
      if (crusher.warningMarker) crusher.warningMarker.visible = false;
    }
  }
}

export function stepCrushers() {
  if (!this.crusherConfig || this._crusherAnim) return null;
  const activeCrushers = getNextCrushers.call(this);
  if (!activeCrushers.length) return null;
  const activeSet = new Set(activeCrushers);

  this.crusherConfig.roundIndex++;
  this.crusherConfig.lastCrushers = activeCrushers.slice();

  for (const c of this.crusherConfig.crushers) {
    c.active = activeSet.has(c);
    c.targetLength = c.retractedLength;
    c.hitDiscs.clear();
  }

  this._crusherAnim = {
    duration: 0.7,
    elapsed: 0,
    done: false,
    impactReady: false,
    entries: this.crusherConfig.crushers.map(c => ({
      crusher: c,
      start: c.currentLength,
      peak: c.active ? c.extendedLength : c.retractedLength,
      end: c.retractedLength,
    })),
  };

  chooseNextCrusher.call(this);
  markNextCrushers.call(this);
  return { activeCrusher: activeCrushers[0], activeCrushers };
}

export function updateCrusherAnimation(deltaTime) {
  if (!this._crusherAnim || this._crusherAnim.done) return;

  const anim = this._crusherAnim;
  anim.elapsed += deltaTime;
  const raw = Math.min(anim.elapsed / anim.duration, 1.0);
  const extendFraction = 0.3;
  const extending = raw < extendFraction;
  const phase = extending
    ? raw / extendFraction
    : (raw - extendFraction) / (1 - extendFraction);
  const ease = phase < 0.5 ? 2 * phase * phase : -1 + (4 - 2 * phase) * phase;
  for (const entry of anim.entries) {
    const start = extending ? entry.start : entry.peak;
    const end = extending ? entry.peak : entry.end;
    const length = start + (end - start) * ease;
    this._setCrusherLength(entry.crusher, length);
  }
  if (raw >= extendFraction) {
    anim.impactReady = true;
  }
  if (raw >= 1.0) {
    anim.done = true;
    for (const entry of anim.entries) {
      entry.crusher.active = false;
      entry.crusher.targetLength = entry.crusher.retractedLength;
      this._setCrusherLength(entry.crusher, entry.crusher.retractedLength);
    }
    this._crusherAnim = null;
  }
}

export function disposeCrusher() {
  if (this.crusherConfig) {
    for (const crusher of this.crusherConfig.crushers || []) {
      if (crusher.warningLight) {
        this.scene.remove(crusher.warningLight);
        crusher.warningLight.dispose();
      }
      if (crusher.warningMarker) {
        this.scene.remove(crusher.warningMarker);
        if (crusher.warningMarker.geometry) crusher.warningMarker.geometry.dispose();
        if (crusher.warningMarker.material) crusher.warningMarker.material.dispose();
      }
    }
  }
  for (const mesh of (this._crusherMeshes || [])) {
    this.scene.remove(mesh);
    if (mesh.geometry) mesh.geometry.dispose();
    if (mesh.material) mesh.material.dispose();
  }
  this._crusherMeshes = [];
  if (this._crusherMat) {
    if (this._crusherMat.map) this._crusherMat.map.dispose();
    this._crusherMat.dispose();
    this._crusherMat = null;
  }
  this.crusherConfig = null;
  this._crusherAnim = null;
}
