import * as THREE from "three";

export function loadBullseye() {
  const OUTER_R    = 22;   // inradius of outer polygon wall
  const RING_R1    = 8;    // inner ↔ middle boundary
  const RING_R2    = 16;   // middle ↔ outer boundary
  const COL_R_MID  = 12;   // column radius on middle ring
  const COL_R_OUT  = 19;   // column radius on outer ring
  const COL_RAD    = 0.8;  // column cylinder radius
  const N_WALL     = 12;   // polygon sides for outer wall
  const N_COL_MID  = 5;
  const N_COL_OUT  = 9;
  const ROT_SPEED_INNER  = 0.03;  // rad/s — very slow
  const ROT_SPEED_MIDDLE = 0.15;  // rad/s — medium
  const ROT_SPEED_OUTER  = 0.10;  // rad/s — slow-medium
  const wallH      = this.wallHeight;
  const wallThick  = 0.5;

  this.circleRadius          = OUTER_R;
  this._circularWalls        = [];
  this.fieldWidth            = OUTER_R * 4;
  this.fieldDepth            = OUTER_R * 4;
  this.obstacles             = [];
  this._bullseyeColumnMeshes = [];

  // ── Wall material ────────────────────────────────────────────────────────
  const wallTex = this.textureLoader.load("images/tile-stone-1.png");
  wallTex.wrapS = THREE.RepeatWrapping;
  wallTex.wrapT = THREE.RepeatWrapping;
  this.wallMaterial = new THREE.MeshStandardMaterial({
    map: wallTex, roughness: 0.6, metalness: 0.2,
  });

  // ── Floor materials – each ring gets its own texture with repeat scaled to
  //    its own bounding box so tile density is uniform across all three rings.
  //    CircleGeometry(R) and RingGeometry(inner, outer) both map their bounding
  //    square (side = 2 * outerR) to UV [0,1], so repeat = 2*outerR / tileSize.
  const makeFloorMat = (outerR) => {
    const tex = this.textureLoader.load("images/tile-stone-1.png");
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set((outerR * 2) / 6, (outerR * 2) / 6);
    return new THREE.MeshStandardMaterial({
      map:       tex,
      roughness: 0.6,
      metalness: 0.2,
      side:      THREE.DoubleSide,
    });
  };

  // ── Ring groups ──────────────────────────────────────────────────────────
  const innerGroup  = new THREE.Group();
  const middleGroup = new THREE.Group();
  const outerGroup  = new THREE.Group();
  this.scene.add(innerGroup, middleGroup, outerGroup);

  const innerFloor = new THREE.Mesh(
    new THREE.CircleGeometry(RING_R1, 64),
    makeFloorMat(RING_R1)     // bounding box = 2*RING_R1
  );
  innerFloor.rotation.x = -Math.PI / 2;
  innerFloor.receiveShadow = true;
  innerGroup.add(innerFloor);

  const makeMidFloorMat = (outerR) => {
    const tex = this.textureLoader.load("images/tile-stone-red-1.png");
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set((outerR * 2) / 6, (outerR * 2) / 6);
    return new THREE.MeshStandardMaterial({
      map:       tex,
      roughness: 0.6,
      metalness: 0.2,
      side:      THREE.DoubleSide,
    });
  };

  const midFloor = new THREE.Mesh(
    new THREE.RingGeometry(RING_R1, RING_R2, 64),
    makeMidFloorMat(RING_R2)
  );
  midFloor.rotation.x = -Math.PI / 2;
  midFloor.receiveShadow = true;
  middleGroup.add(midFloor);

  const outerFloor = new THREE.Mesh(
    new THREE.RingGeometry(RING_R2, OUTER_R, 64),
    makeFloorMat(OUTER_R)     // bounding box = 2*OUTER_R
  );
  outerFloor.rotation.x = -Math.PI / 2;
  outerFloor.receiveShadow = true;
  outerGroup.add(outerFloor);

  // No single this.floor for bullseye — ring floors live inside the groups.

  // ── Columns ──────────────────────────────────────────────────────────────
  const buildColumns = (group, count, r, colDataOut) => {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const cx    = Math.sin(angle) * r;
      const cz    = Math.cos(angle) * r;

      const geo  = new THREE.CylinderGeometry(COL_RAD, COL_RAD, wallH, 16);
      this.applyCylinderUVs(geo, COL_RAD, wallH);
      const mesh = new THREE.Mesh(geo, this.wallMaterial);
      mesh.position.set(cx, wallH / 2, cz);
      mesh.castShadow    = true;
      mesh.receiveShadow = true;
      group.add(mesh);

      // Track for collision detection
      this._bullseyeColumnMeshes.push(mesh);

      // Mirror position into obstacles so isPositionValid() works
      const obs = { type: 'pillar', x: cx, z: cz, width: COL_RAD * 2, depth: COL_RAD * 2 };
      this.obstacles.push(obs);
      colDataOut.push({ baseAngle: angle, r, obsRef: obs });
    }
  };

  const middleColData = [];
  buildColumns(middleGroup, N_COL_MID, COL_R_MID, middleColData);

  const outerColData = [];

  // ── Outer polygon wall with door on the north face ───────────────────────
  const sideLen   = 2 * OUTER_R * Math.tan(Math.PI / N_WALL);
  const DOOR_FACE = N_WALL / 2;                          // face 6, theta = π
  const doorTheta = DOOR_FACE * (2 * Math.PI / N_WALL);  // = π
  const doorZ     = Math.cos(doorTheta) * OUTER_R;       // = −OUTER_R

  this.doorWall           = 'north';
  this._doorIsNS          = true;
  this._doorOpeningCenter = { x: 0, z: doorZ };
  this._doorSlabStartY    = this.DOOR_HEIGHT / 2;
  this._doorSlabEndY      = wallH + this.DOOR_HEIGHT;

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
    mesh.castShadow    = true;
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
  const overDoorH  = wallH - this.DOOR_HEIGHT - lintelH;
  const segLen     = (sideLen - this.DOOR_WIDTH) / 2;
  const segOff     = segLen / 2 + this.DOOR_WIDTH / 2;

  for (const sign of [-1, 1]) {
    const geo  = new THREE.BoxGeometry(segLen, wallH, wallThick);
    this.applyWallUVs(geo, segLen, wallH, wallThick);
    const mesh = addWallMesh(geo, sign * segOff, wallH / 2, doorZ);
    this.walls[`north_${sign > 0 ? 'right' : 'left'}`] = mesh;
  }
  for (const sign of [-1, 1]) {
    const geo = new THREE.BoxGeometry(postWidth, this.DOOR_HEIGHT, frameThick);
    this.applyWallUVs(geo, postWidth, this.DOOR_HEIGHT, frameThick);
    addFrameMesh(geo, sign * (this.DOOR_WIDTH / 2 + postWidth / 2), this.DOOR_HEIGHT / 2, doorZ);
  }
  const lintelGeo = new THREE.BoxGeometry(this.DOOR_WIDTH + postWidth * 2, lintelH, frameThick);
  this.applyWallUVs(lintelGeo, this.DOOR_WIDTH + postWidth * 2, lintelH, frameThick);
  addFrameMesh(lintelGeo, 0, this.DOOR_HEIGHT + lintelH / 2, doorZ);

  if (overDoorH > 0) {
    const overGeo = new THREE.BoxGeometry(this.DOOR_WIDTH, overDoorH, wallThick);
    this.applyWallUVs(overGeo, this.DOOR_WIDTH, overDoorH, wallThick);
    this.walls['north_above'] = addWallMesh(
      overGeo, 0, this.DOOR_HEIGHT + lintelH + overDoorH / 2, doorZ
    );
  }

  const voidGeo  = new THREE.PlaneGeometry(this.DOOR_WIDTH, this.DOOR_HEIGHT);
  const voidMat  = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
  const voidMesh = new THREE.Mesh(voidGeo, voidMat);
  voidMesh.position.set(0, this.DOOR_HEIGHT / 2, doorZ - 0.4);
  this.scene.add(voidMesh);
  this.doorFrameMeshes.push(voidMesh);
  this._voidMesh = voidMesh;


  const slabGeo = new THREE.BoxGeometry(this.DOOR_WIDTH, this.DOOR_HEIGHT, wallThick);
  this.applyWallUVs(slabGeo, this.DOOR_WIDTH, this.DOOR_HEIGHT, wallThick);
  this.doorSlab = new THREE.Mesh(slabGeo, this._slabMat);
  this.doorSlab.position.set(0, this.DOOR_HEIGHT / 2, doorZ);
  this.scene.add(this.doorSlab);

  this._circularWalls.push({ theta: doorTheta, sideLen, isDoor: true });

  for (let i = 0; i < N_WALL; i++) {
    if (i === DOOR_FACE) continue;
    const theta = i * (2 * Math.PI / N_WALL);
    const cx    = Math.sin(theta) * OUTER_R;
    const cz    = Math.cos(theta) * OUTER_R;
    const geo   = new THREE.BoxGeometry(sideLen, wallH, wallThick);
    this.applyWallUVs(geo, sideLen, wallH, wallThick);
    const mesh = new THREE.Mesh(geo, this.wallMaterial);
    mesh.position.set(cx, wallH / 2, cz);
    mesh.rotation.y    = theta;
    mesh.castShadow    = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.walls[`poly_${i}`] = mesh;
    this._circularWalls.push({ theta, sideLen, isDoor: false });
  }

  // ── Store ring data for update() ─────────────────────────────────────────
  this.bullseyeRings = {
    RING_R1,
    RING_R2,
    inner:  { group: innerGroup,  rotDir: -1, speed: ROT_SPEED_INNER,  cols: [] },
    middle: { group: middleGroup, rotDir: +1, speed: ROT_SPEED_MIDDLE, cols: middleColData },
    outer:  { group: outerGroup,  rotDir: -1, speed: ROT_SPEED_OUTER,  cols: outerColData },
  };

  this._initTransparency();
  this._addLighting();
}



export function stepRings() {
  if (!this.bullseyeRings) return null;
  const STEP = Math.PI / 6; // 30 degrees per round
  const RING_ANIM_DURATION = 2.23; // seconds — matches stone-slide-1.mp3 duration
  const { inner, middle, outer, RING_R1, RING_R2 } = this.bullseyeRings;

  this._ringAnim = {
    innerStart:  inner.group.rotation.y,
    middleStart: middle.group.rotation.y,
    outerStart:  outer.group.rotation.y,
    innerStep:   inner.rotDir  * STEP,
    middleStep:  middle.rotDir * STEP,
    outerStep:   outer.rotDir  * STEP,
    duration:    RING_ANIM_DURATION,
    elapsed:     0,
    done:        false,
  };

  return { RING_R1, RING_R2 };
}

export function updateBullseyeAnimation(deltaTime) {
  if (!this.bullseyeRings || !this._ringAnim || this._ringAnim.done) return;

  const anim = this._ringAnim;
  anim.elapsed += deltaTime;
  const raw = Math.min(anim.elapsed / anim.duration, 1.0);
  const ease = raw < 0.5 ? 2 * raw * raw : -1 + (4 - 2 * raw) * raw;

  const { inner, middle, outer } = this.bullseyeRings;
  inner.group.rotation.y = anim.innerStart + anim.innerStep * ease;
  middle.group.rotation.y = anim.middleStart + anim.middleStep * ease;
  outer.group.rotation.y = anim.outerStart + anim.outerStep * ease;

  for (const col of middle.cols) {
    const angle = col.baseAngle + middle.group.rotation.y;
    col.obsRef.x = Math.sin(angle) * col.r;
    col.obsRef.z = Math.cos(angle) * col.r;
  }
  for (const col of outer.cols) {
    const angle = col.baseAngle + outer.group.rotation.y;
    col.obsRef.x = Math.sin(angle) * col.r;
    col.obsRef.z = Math.cos(angle) * col.r;
  }

  if (raw >= 1.0) {
    anim.done = true;
  }
}

export function disposeBullseye() {
  if (this.bullseyeRings) {
    const disposeGroup = (group) => {
      group.traverse(child => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (child.material.map) child.material.map.dispose();
            child.material.dispose();
          }
        }
      });
      this.scene.remove(group);
    };
    disposeGroup(this.bullseyeRings.inner.group);
    disposeGroup(this.bullseyeRings.middle.group);
    disposeGroup(this.bullseyeRings.outer.group);
    this.bullseyeRings = null;
  }
  this._bullseyeColumnMeshes = [];
}
