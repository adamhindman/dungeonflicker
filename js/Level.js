import * as THREE from "three";

export default class Level {
  constructor(scene) {
    this.scene = scene;
    this.fieldWidth = 32 * 1.5;
    this.fieldDepth = 24 * 1.5;
    this.wallHeight = 8;
    this.walls = {};
    this.floor = null;
    this.textureLoader = new THREE.TextureLoader();
    this.wallMaterial = null;
    this.obstacles = [];
    // Legacy portal arrays kept for safety (unused with new door system)
    this.portals = [];
    this.portalLights = [];

    // Door system
    this.DOOR_WIDTH = 4;
    this.DOOR_HEIGHT = 5.2;
    this.doorWall = null;       // 'north' | 'south' | 'east' | 'west'
    this.doorSlab = null;       // The stone slab mesh that rises when opened
    this.doorFrameMeshes = [];  // Posts, lintel, black void plane
    this._frameMat = null;      // Cloned wall material for frame (slightly darker)
    this._slabMat = null;       // Cloned wall material for slab, same color as frame
    this._voidMesh = null;      // The black plane behind the slab; pulses purple when open
    this._doorHovered = false;  // True while the mouse is over the open door frame
    this._doorOutlineTime = 0;  // Accumulated time for hover-pulse animation
    this._doorLight = null;     // PointLight that glows when door is open
    this._doorLightTime = 0;    // Accumulated time for light pulse
    this.doorIsOpen = false;
    this._doorAnimating = false;
    this._doorAnimProgress = 0;
    this._doorSlabStartY = 0;
    this._doorSlabEndY = 0;
    this._doorOpeningCenter = null; // { x, z }
    this._doorIsNS = true;          // true = north/south wall, false = east/west

    // Circular room support
    this.circleRadius = null;       // set when room is circular; null = rectangular
    this._circularWalls = null;     // [{theta, sideLen, isDoor}] for vine scatter
    this.nextShape = null;          // override: 'rect' | 'circle' | 'hexagon' | null (random)

    // Hexagonal room support
    this.hexRings = null;           // set when room is hexagonal: { HIGH_Y, LOW_Y, RB_in, RC_in, RD_in, RE_in }
    this._hexFloorMeshes = [];      // custom BufferGeometry floor panels, disposed in unload()
    this._hexFloorMat = null;       // shared floor material for outer hex panels
    this._hexPitMat   = null;       // red stone material for pit ramp + floor
    this._hexOuterWalls = [];       // outer boundary wall meshes — visual only, not in getAllWalls()

    // Bullseye level support
    this.bullseyeRings = null;      // set when level is bullseye: { rotSpeed, inner, middle, outer }
    this._bullseyeColumnMeshes = []; // column meshes for collision detection (world-space)

    // Donut level support
    this.donutInnerRadius = null;   // set when level is donut: radius of the inner hole
  }

  /**
   * Adjusts UVs of a geometry to maintain consistent texture density.
   * Target is 1 tile per 6 units.
   */
  applyWallUVs(geometry, width, height, depth) {
    const uv = geometry.attributes.uv;
    const norm = geometry.attributes.normal;
    for (let i = 0; i < uv.count; i++) {
      let u = uv.getX(i);
      let v = uv.getY(i);

      const nx = Math.abs(norm.getX(i));
      const ny = Math.abs(norm.getY(i));

      if (nx > 0.5) { // +/- X faces (Sides)
        u *= depth / 6;
        v *= height / 6;
      } else if (ny > 0.5) { // +/- Y faces (Top/Bottom)
        u *= width / 6;
        v *= depth / 6;
      } else { // +/- Z faces (Front/Back)
        u *= width / 6;
        v *= height / 6;
      }
      uv.setXY(i, u, v);
    }
    uv.needsUpdate = true;
  }

  applyCylinderUVs(geometry, radius, height) {
    const uv = geometry.attributes.uv;
    const norm = geometry.attributes.normal;
    const circumference = 2 * Math.PI * radius;
    for (let i = 0; i < uv.count; i++) {
      let u = uv.getX(i);
      let v = uv.getY(i);

      const ny = Math.abs(norm.getY(i));

      if (ny < 0.5) { // Sides
        u *= circumference / 6;
        v *= height / 6;
      } else { // Caps
        u *= (radius * 2) / 6;
        v *= (radius * 2) / 6;
      }
      uv.setXY(i, u, v);
    }
    uv.needsUpdate = true;
  }

  getAllWalls() {
    // Return all wall meshes including internal walls
    const walls = Object.values(this.walls).filter((wall) => wall !== undefined);
    // Include the door slab for collision while the door is closed
    if (this.doorSlab && !this.doorIsOpen) {
      walls.push(this.doorSlab);
    }
    // Include rotating column meshes for the bullseye level
    if (this._bullseyeColumnMeshes && this._bullseyeColumnMeshes.length) {
      walls.push(...this._bullseyeColumnMeshes);
    }
    return walls;
  }

  /**
   * Returns all MeshStandardMaterial wall meshes eligible for camera-occlusion
   * fading. Excludes the void plane (MeshBasicMaterial) whose colour is driven
   * separately by the glow system.
   */
  getVisualWalls() {
    const meshes = [];
    for (const wall of Object.values(this.walls)) {
      if (wall && wall.material instanceof THREE.MeshStandardMaterial) {
        meshes.push(wall);
      }
    }
    for (const mesh of this.doorFrameMeshes) {
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        meshes.push(mesh);
      }
    }
    if (this.doorSlab) meshes.push(this.doorSlab);
    // Hex outer boundary walls — visual only (not in getAllWalls)
    for (const mesh of (this._hexOuterWalls || [])) {
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        meshes.push(mesh);
      }
    }
    // Bullseye columns can occlude the camera view
    for (const mesh of (this._bullseyeColumnMeshes || [])) {
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        meshes.push(mesh);
      }
    }
    return meshes;
  }

  /**
   * Gives every visual wall mesh its own cloned material so the camera-
   * occlusion system can set opacity independently per mesh.
   * Called once after all geometry is built.
   */
  _initTransparency() {
    for (const mesh of this.getVisualWalls()) {
      const clone = mesh.material.clone();
      clone.transparent = true;
      clone.opacity = 1.0;
      mesh.material = clone;
    }
  }

  load() {
    // Consume the shape override, or pick randomly (40% circular, 60% rectangular).
    const shape = this.nextShape || (Math.random() < 0.4 ? 'circle' : 'rect');
    this.nextShape = null;
    if (shape === 'circle') {
      this._loadCircular();
    } else if (shape === 'hexagon') {
      this._loadHexagon();
    } else if (shape === 'bullseye') {
      this._loadBullseye();
    } else if (shape === 'donut') {
      this._loadDonut();
    } else {
      this._loadRectangular();
    }
  }

  _loadRectangular() {
    this.circleRadius   = null;
    this._circularWalls = null;
    this.fieldWidth  = 32 * 1.5; // 48
    this.fieldDepth  = 24 * 1.5; // 36

    const fieldGeometry = new THREE.PlaneGeometry(
      this.fieldWidth,
      this.fieldDepth,
    );

    // Load tile texture and set repeating
    const tileTexture = this.textureLoader.load("images/tile-stone-1.png");
    tileTexture.wrapS = THREE.RepeatWrapping;
    tileTexture.wrapT = THREE.RepeatWrapping;

    // Set how many times texture repeats across field
    // don't change this!
    tileTexture.repeat.set(this.fieldWidth / 6, this.fieldDepth / 6);

    const fieldMaterial = new THREE.MeshStandardMaterial({
      map: tileTexture,
      roughness: 0.6,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });

    // Create wall texture
    const wallTileTexture = this.textureLoader.load("images/tile-stone-1.png");
    wallTileTexture.wrapS = THREE.RepeatWrapping;
    wallTileTexture.wrapT = THREE.RepeatWrapping;

    this.wallMaterial = new THREE.MeshStandardMaterial({
      map: wallTileTexture,
      roughness: 0.6,
      metalness: 0.2,
    });

    this.floor = new THREE.Mesh(fieldGeometry, fieldMaterial);
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.receiveShadow = true;
    this.scene.add(this.floor);

    const northGeometry = new THREE.BoxGeometry(
      this.fieldWidth,
      this.wallHeight,
      0.5,
    );
    this.applyWallUVs(northGeometry, this.fieldWidth, this.wallHeight, 0.5);
    this.walls.north = new THREE.Mesh(northGeometry, this.wallMaterial);
    this.walls.north.position.set(0, this.wallHeight / 2, -this.fieldDepth / 2);
    this.walls.north.castShadow = true;
    this.walls.north.receiveShadow = true;
    this.scene.add(this.walls.north);

    const southGeometry = new THREE.BoxGeometry(
      this.fieldWidth,
      this.wallHeight,
      0.5,
    );
    this.applyWallUVs(southGeometry, this.fieldWidth, this.wallHeight, 0.5);
    this.walls.south = new THREE.Mesh(southGeometry, this.wallMaterial);
    this.walls.south.position.set(0, this.wallHeight / 2, this.fieldDepth / 2);
    this.walls.south.castShadow = true;
    this.walls.south.receiveShadow = true;
    this.scene.add(this.walls.south);

    const eastGeometry = new THREE.BoxGeometry(
      0.5,
      this.wallHeight,
      this.fieldDepth,
    );
    this.applyWallUVs(eastGeometry, 0.5, this.wallHeight, this.fieldDepth);
    this.walls.east = new THREE.Mesh(eastGeometry, this.wallMaterial);
    this.walls.east.position.set(this.fieldWidth / 2, this.wallHeight / 2, 0);
    this.walls.east.castShadow = true;
    this.walls.east.receiveShadow = true;
    this.scene.add(this.walls.east);

    const westGeometry = new THREE.BoxGeometry(
      0.5,
      this.wallHeight,
      this.fieldDepth,
    );
    this.applyWallUVs(westGeometry, 0.5, this.wallHeight, this.fieldDepth);
    this.walls.west = new THREE.Mesh(westGeometry, this.wallMaterial);
    this.walls.west.position.set(-this.fieldWidth / 2, this.wallHeight / 2, 0);
    this.walls.west.castShadow = true;
    this.walls.west.receiveShadow = true;
    this.scene.add(this.walls.west);

    this.generateRandomObstacles();

    // Build door in one randomly chosen wall
    this._createDoor();

    // Clone materials per-mesh for independent per-wall opacity control
    this._initTransparency();

    // Scatter vine-tile overlays on wall and obstacle faces
    this._scatterVineTilesOnWalls();

    this._addLighting();
  }

  /**
   * Builds a 12-sided polygon arena.  One face (south, theta=0) is reserved
   * for the door.  fieldWidth/fieldDepth are set large so the Disc rectangular
   * boundary check never fires; all boundary collision comes from the polygon
   * wall AABB meshes.
   */
  _loadCircular() {
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

    this.floor = new THREE.Mesh(
      new THREE.CircleGeometry(INNER_R, 48),
      new THREE.MeshStandardMaterial({
        map: tileTexture,
        roughness: 0.6,
        metalness: 0.2,
        side: THREE.DoubleSide,
      })
    );
    this.floor.rotation.x = -Math.PI / 2;
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
    this.generateRandomObstacles();
    this._initTransparency();
    this._scatterVineTilesOnWalls();
    this._addLighting();
  }

  /**
   * Builds the concentric-hexagon level.
   *
   * Topology from center outward (each ring lower than the one outside it):
   *   Center pit (LOW_Y=0) → inner ramp → middle ring (MED_Y=1, lava + PCs) → outer ramp → outer floor (HIGH_Y=2, NPCs)
   *
   * Outer walls are a regular 6-sided polygon (flat-top orientation, theta0 = π/6).
   * Door is always on face k=2, which points north (−Z direction).
   */
  _loadHexagon() {
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

  /**
   * Builds the bullseye level: three concentric rotating rings (inner, middle, outer).
   *
   * Ring layout (radii):
   *   Inner:  0 – 8   (PCs spawn here, rotates CW)
   *   Middle: 8 – 16  (NPCs, 5 columns, rotates CCW)
   *   Outer:  16 – 22 (NPCs, 9 columns, rotates CW)
   *   Boundary wall: 12-sided polygon at inradius = 22, with a door on the north face.
   *
   * Each ring floor lives in its own THREE.Group.  Columns on the middle and outer
   * rings are children of their respective groups so they rotate with the floor.
   * The column world-positions are mirrored into this.obstacles each frame so
   * isPositionValid() and disc collision detection stay accurate.
   */
  _loadBullseye() {
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

    const midFloor = new THREE.Mesh(
      new THREE.RingGeometry(RING_R1, RING_R2, 64),
      makeFloorMat(RING_R2)     // bounding box = 2*RING_R2
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
    buildColumns(outerGroup, N_COL_OUT, COL_R_OUT, outerColData);

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
      inner:  { group: innerGroup,  rotDir: -1, speed: ROT_SPEED_INNER,  cols: [] },
      middle: { group: middleGroup, rotDir: +1, speed: ROT_SPEED_MIDDLE, cols: middleColData },
      outer:  { group: outerGroup,  rotDir: -1, speed: ROT_SPEED_OUTER,  cols: outerColData },
    };

    this._initTransparency();
    this._addLighting();
  }

  /**
   * Builds the donut level: a ring-shaped arena with an outer 12-sided polygon
   * wall and an inner 10-sided polygon wall enclosing a central void.
   *
   * Layout (radii):
   *   Inner hole:  0 – 9   (lava pools generated by GameController)
   *   Ring floor:  9 – 22  (PCs and NPCs spawn here)
   *   Outer wall:  inradius = 22, 12 sides, door on north face
   *   Inner wall:  inradius = 9, 10 sides, all solid
   */
  _loadDonut() {
    const OUTER_R      = 22;
    const INNER_HOLE_R = 9;
    const N_OUTER      = 12;
    const N_INNER      = 10;
    const wallThick    = 0.5;
    const wallH        = this.wallHeight;
    const DOOR_WIDTH   = this.DOOR_WIDTH;
    const DOOR_HEIGHT  = this.DOOR_HEIGHT;

    this.circleRadius     = OUTER_R;
    this.donutInnerRadius = INNER_HOLE_R;
    this._circularWalls   = [];
    this.fieldWidth       = OUTER_R * 4;
    this.fieldDepth       = OUTER_R * 4;
    this.obstacles        = [];

    // ── Wall material ────────────────────────────────────────────────────────
    const wallTex = this.textureLoader.load("images/tile-stone-1.png");
    wallTex.wrapS = THREE.RepeatWrapping;
    wallTex.wrapT = THREE.RepeatWrapping;
    this.wallMaterial = new THREE.MeshStandardMaterial({
      map: wallTex, roughness: 0.6, metalness: 0.2,
    });

    // ── Ring floor ───────────────────────────────────────────────────────────
    const tileTexture = this.textureLoader.load("images/tile-stone-1.png");
    tileTexture.wrapS = THREE.RepeatWrapping;
    tileTexture.wrapT = THREE.RepeatWrapping;
    tileTexture.repeat.set((OUTER_R * 2) / 6, (OUTER_R * 2) / 6);

    this.floor = new THREE.Mesh(
      new THREE.RingGeometry(INNER_HOLE_R, OUTER_R, 64),
      new THREE.MeshStandardMaterial({
        map: tileTexture, roughness: 0.6, metalness: 0.2, side: THREE.DoubleSide,
      })
    );
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.receiveShadow = true;
    this.scene.add(this.floor);

    // ── Shared helpers ───────────────────────────────────────────────────────
    const addWallMesh = (geo, x, y, z, rotY = 0) => {
      const mesh = new THREE.Mesh(geo, this.wallMaterial);
      mesh.position.set(x, y, z);
      if (rotY !== 0) mesh.rotation.y = rotY;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      return mesh;
    };

    // ── Outer polygon wall (12 sides) with door on north face ────────────────
    const outerSideLen = 2 * OUTER_R * Math.tan(Math.PI / N_OUTER);
    const DOOR_FACE    = N_OUTER / 2;                           // face 6, theta = π
    const doorTheta    = DOOR_FACE * (2 * Math.PI / N_OUTER);  // = π
    const doorZ        = Math.cos(doorTheta) * OUTER_R;        // = -OUTER_R

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
      this.walls['north_above'] = addWallMesh(
        overGeo, 0, DOOR_HEIGHT + lintelH + overDoorH / 2, doorZ
      );
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

    for (let i = 0; i < N_OUTER; i++) {
      if (i === DOOR_FACE) continue;
      const theta = i * (2 * Math.PI / N_OUTER);
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
      this.walls[`poly_${i}`] = mesh;
      this._circularWalls.push({ theta, sideLen: outerSideLen, isDoor: false });
    }

    // ── Inner polygon wall (10 sides, all solid) ─────────────────────────────
    const innerSideLen = 2 * INNER_HOLE_R * Math.tan(Math.PI / N_INNER);

    for (let i = 0; i < N_INNER; i++) {
      const theta = i * (2 * Math.PI / N_INNER);
      const cx    = Math.sin(theta) * INNER_HOLE_R;
      const cz    = Math.cos(theta) * INNER_HOLE_R;
      const geo   = new THREE.BoxGeometry(innerSideLen, wallH, wallThick);
      this.applyWallUVs(geo, innerSideLen, wallH, wallThick);
      const mesh = new THREE.Mesh(geo, this.wallMaterial);
      mesh.position.set(cx, wallH / 2, cz);
      mesh.rotation.y    = theta;
      mesh.castShadow    = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      this.walls[`inner_poly_${i}`] = mesh;
    }

    this._initTransparency();
    this._addLighting();
  }

  /**
   * Returns the floor height at world position (x, z) for the hexagonal level.
   * Uses Euclidean radius as a circular approximation of the hex zones.
   * Returns 0 if not a hexagonal level.
   */
  getTerrainHeightAt(x, z) {
    if (!this.hexRings) return 0;
    const { MED_Y, LOW_Y, RC_in, RE_in } = this.hexRings;
    const r = Math.sqrt(x * x + z * z);

    if (r <= RE_in) {
      // Center pit — lowest.
      return LOW_Y;
    }
    if (r <= RC_in) {
      // Inner ramp — descends from MED_Y (at RC_in) to LOW_Y (at RE_in) going inward.
      const t = (r - RE_in) / (RC_in - RE_in);
      return LOW_Y + t * (MED_Y - LOW_Y);
    }
    // Flat outer floor.
    return MED_Y;
  }

  /**
   * Returns the per-frame velocity delta {fx, fz} a disc experiences due to
   * gravity acting along the slope at (x, z).  Zero on flat zones.
   * Force is 0.004 units/frame on the outer ramp, 0.007 on the steeper inner ramp.
   */
  getTerrainSlopeForce(x, z) {
    if (!this.hexRings) return { fx: 0, fz: 0 };
    const { RC_in, RE_in } = this.hexRings;
    const r = Math.sqrt(x * x + z * z);
    if (r < 0.01) return { fx: 0, fz: 0 };

    if (r > RE_in && r <= RC_in) {
      // Inner ramp: downhill is inward (toward center pit).
      const fx = -(x / r) * 0.007;
      const fz = -(z / r) * 0.007;
      return { fx, fz };
    }
    return { fx: 0, fz: 0 };
  }

  /** Shared lighting setup used by both room shapes. */
  _addLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;
    directionalLight.shadow.camera.left  = -40;
    directionalLight.shadow.camera.right =  40;
    directionalLight.shadow.camera.top   =  40;
    directionalLight.shadow.camera.bottom = -40;
    directionalLight.shadow.camera.near  = 0.1;
    directionalLight.shadow.camera.far   = 100;
    this.scene.add(directionalLight);
  }

  /**
   * Picks a random wall and replaces it with two wall segments flanking a door
   * opening. A stone slab fills the opening until openDoor() is called.
   * Frame posts and lintel surround three sides of the slab.
   * A black void plane sits just behind the slab, visible once it rises.
   *
   * TODO: When supporting irregular walls, filter to walls large enough for
   *       the door before choosing randomly.
   */
  _createDoor() {
    // Always place the door on the north wall — opposite the camera's default
    // position (which is on the south/+Z side looking toward the origin).
    this.doorWall = 'north';

    const DOOR_WIDTH  = this.DOOR_WIDTH;
    const DOOR_HEIGHT = this.DOOR_HEIGHT;
    const wallH       = this.wallHeight;
    const wallThick   = 0.5;
    const frameThick  = 0.7;   // Slightly proud of wall face
    const postWidth   = 0.5;
    // Lintel is the same thickness as the side posts. The gap above it is
    // filled with a plain wall segment so the frame reads as a uniform border.
    const lintelH     = postWidth;
    const overDoorH   = wallH - DOOR_HEIGHT - lintelH; // plain stone above frame

    const isNS = this.doorWall === 'north' || this.doorWall === 'south';
    this._doorIsNS = isNS;

    // World-space centre of the wall where the door sits
    const wallPos = {
      x: this.doorWall === 'east'  ?  this.fieldWidth  / 2
       : this.doorWall === 'west'  ? -this.fieldWidth  / 2
       : 0,
      z: this.doorWall === 'north' ? -this.fieldDepth / 2
       : this.doorWall === 'south' ?  this.fieldDepth / 2
       : 0,
    };

    // Remove the original full-length wall mesh
    const original = this.walls[this.doorWall];
    if (original) {
      this.scene.remove(original);
      original.geometry.dispose();
      delete this.walls[this.doorWall];
    }

    // Frame material: slightly darker than the wall to read as a carved frame.
    // Emissive channel will be activated when the door opens.
    this._frameMat = this.wallMaterial.clone();
    this._frameMat.color.setHex(0x999999);
    this._frameMat.emissive = new THREE.Color(0x000000);
    this._frameMat.emissiveIntensity = 0;

    // Slab material: same color as the frame, with a horizontal clip plane at
    // the top of the frame so it disappears cleanly as it rises.
    this._slabMat = this.wallMaterial.clone();
    this._slabMat.color.setHex(0x999999);
    this._slabMat.clippingPlanes = [
      new THREE.Plane(new THREE.Vector3(0, -1, 0), wallH),
    ];
    this._slabMat.clipShadows = true;

    // Helper: build + add a wall-material mesh to the scene
    const addWallMesh = (geo, x, y, z) => {
      const mesh = new THREE.Mesh(geo, this.wallMaterial);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      return mesh;
    };

    // Helper: build + add a frame-material mesh to doorFrameMeshes
    const addFrameMesh = (geo, x, y, z) => {
      const mesh = new THREE.Mesh(geo, this._frameMat);
      mesh.position.set(x, y, z);
      this.scene.add(mesh);
      this.doorFrameMeshes.push(mesh);
      return mesh;
    };

    const totalLen     = isNS ? this.fieldWidth : this.fieldDepth;
    const segLen       = (totalLen - DOOR_WIDTH) / 2;
    const segOffset    = segLen / 2 + DOOR_WIDTH / 2;

    if (isNS) {
      // ── Two horizontal wall segments ──────────────────────────────────────
      for (const sign of [-1, 1]) {
        const geo = new THREE.BoxGeometry(segLen, wallH, wallThick);
        this.applyWallUVs(geo, segLen, wallH, wallThick);
        const mesh = addWallMesh(geo, sign * segOffset, wallH / 2, wallPos.z);
        this.walls[`${this.doorWall}_${sign > 0 ? 'right' : 'left'}`] = mesh;
      }

      // ── Frame: left and right posts ────────────────────────────────────────
      for (const sign of [-1, 1]) {
        const geo = new THREE.BoxGeometry(postWidth, DOOR_HEIGHT, frameThick);
        this.applyWallUVs(geo, postWidth, DOOR_HEIGHT, frameThick);
        addFrameMesh(geo, sign * (DOOR_WIDTH / 2 + postWidth / 2), DOOR_HEIGHT / 2, wallPos.z);
      }

      // ── Frame: lintel (top beam, same thickness as side posts) ───────────────
      const lintelW = DOOR_WIDTH + postWidth * 2;
      const lintelGeo = new THREE.BoxGeometry(lintelW, lintelH, frameThick);
      this.applyWallUVs(lintelGeo, lintelW, lintelH, frameThick);
      addFrameMesh(lintelGeo, 0, DOOR_HEIGHT + lintelH / 2, wallPos.z);

      // ── Plain stone wall above the frame ──────────────────────────────────
      if (overDoorH > 0) {
        const overGeo = new THREE.BoxGeometry(DOOR_WIDTH, overDoorH, wallThick);
        this.applyWallUVs(overGeo, DOOR_WIDTH, overDoorH, wallThick);
        const overMesh = addWallMesh(overGeo, 0, DOOR_HEIGHT + lintelH + overDoorH / 2, wallPos.z);
        this.walls[`${this.doorWall}_above`] = overMesh;
      }

      // ── Black void (revealed when slab rises; turns purple when door opens) ─
      const voidGeo = new THREE.PlaneGeometry(DOOR_WIDTH, DOOR_HEIGHT);
      const voidMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
      const voidMesh = new THREE.Mesh(voidGeo, voidMat);
      // Place slightly outside the wall so it sits behind the slab
      const voidSign = this.doorWall === 'north' ? -1 : 1;
      voidMesh.position.set(0, DOOR_HEIGHT / 2, wallPos.z + voidSign * 0.4);
      this.scene.add(voidMesh);
      this.doorFrameMeshes.push(voidMesh);
      this._voidMesh = voidMesh;
  

      // ── Stone slab (blocks the opening until door opens) ───────────────────
      const slabGeo = new THREE.BoxGeometry(DOOR_WIDTH, DOOR_HEIGHT, wallThick);
      this.applyWallUVs(slabGeo, DOOR_WIDTH, DOOR_HEIGHT, wallThick);
      this.doorSlab = new THREE.Mesh(slabGeo, this._slabMat);
      this.doorSlab.position.set(0, DOOR_HEIGHT / 2, wallPos.z);
      this.scene.add(this.doorSlab);

    } else {
      // ── East / West wall: two segments along Z ─────────────────────────────
      for (const sign of [-1, 1]) {
        const geo = new THREE.BoxGeometry(wallThick, wallH, segLen);
        this.applyWallUVs(geo, wallThick, wallH, segLen);
        const mesh = addWallMesh(geo, wallPos.x, wallH / 2, sign * segOffset);
        this.walls[`${this.doorWall}_${sign > 0 ? 'pos' : 'neg'}`] = mesh;
      }

      // ── Frame: left and right posts (along Z) ─────────────────────────────
      for (const sign of [-1, 1]) {
        const geo = new THREE.BoxGeometry(frameThick, DOOR_HEIGHT, postWidth);
        this.applyWallUVs(geo, frameThick, DOOR_HEIGHT, postWidth);
        addFrameMesh(geo, wallPos.x, DOOR_HEIGHT / 2, sign * (DOOR_WIDTH / 2 + postWidth / 2));
      }

      // ── Frame: lintel (same thickness as side posts) ──────────────────────
      const lintelD = DOOR_WIDTH + postWidth * 2;
      const lintelGeo = new THREE.BoxGeometry(frameThick, lintelH, lintelD);
      this.applyWallUVs(lintelGeo, frameThick, lintelH, lintelD);
      addFrameMesh(lintelGeo, wallPos.x, DOOR_HEIGHT + lintelH / 2, 0);

      // ── Plain stone wall above the frame ──────────────────────────────────
      if (overDoorH > 0) {
        const overGeo = new THREE.BoxGeometry(wallThick, overDoorH, DOOR_WIDTH);
        this.applyWallUVs(overGeo, wallThick, overDoorH, DOOR_WIDTH);
        const overMesh = addWallMesh(overGeo, wallPos.x, DOOR_HEIGHT + lintelH + overDoorH / 2, 0);
        this.walls[`${this.doorWall}_above`] = overMesh;
      }

      // ── Black void (turns purple when door opens) ─────────────────────────
      const voidGeo = new THREE.PlaneGeometry(DOOR_WIDTH, DOOR_HEIGHT);
      const voidMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
      const voidMesh = new THREE.Mesh(voidGeo, voidMat);
      voidMesh.rotation.y = Math.PI / 2;
      const voidSign = this.doorWall === 'east' ? 1 : -1;
      voidMesh.position.set(wallPos.x + voidSign * 0.4, DOOR_HEIGHT / 2, 0);
      this.scene.add(voidMesh);
      this.doorFrameMeshes.push(voidMesh);
      this._voidMesh = voidMesh;
  

      // ── Stone slab ─────────────────────────────────────────────────────────
      const slabGeo = new THREE.BoxGeometry(wallThick, DOOR_HEIGHT, DOOR_WIDTH);
      this.applyWallUVs(slabGeo, wallThick, DOOR_HEIGHT, DOOR_WIDTH);
      this.doorSlab = new THREE.Mesh(slabGeo, this._slabMat);
      this.doorSlab.position.set(wallPos.x, DOOR_HEIGHT / 2, 0);
      this.scene.add(this.doorSlab);
    }

    this._doorOpeningCenter = { x: wallPos.x, z: wallPos.z };
    this._doorSlabStartY = DOOR_HEIGHT / 2;
    // Rise above the wall so it disappears into the architecture
    this._doorSlabEndY = wallH + DOOR_HEIGHT;
  }

  /**
   * Scatter vine-tile overlay quads on wall and obstacle faces.
   * Each quad is a TILE×TILE PlaneGeometry placed on a TILE-aligned grid,
   * offset slightly in front of the surface to prevent z-fighting.
   * All quads share one material; the geometry per quad is small and cheap.
   */
  _scatterVineTilesOnWalls() {
    // Hexagonal level: no vine overlays (terrain height variety is the visual interest).
    if (this.hexRings) return;

    const TILE   = 6;    // tile size in world units (matches repeating texture)
    const CHANCE = 0.25; // probability each grid position gets a vine tile
    const OFFSET = 0.27; // distance in front of the wall face

    this._vineTileMeshes = [];
    this._vineTileTexture = this.textureLoader.load("images/tile-stone-vines-1.png");
    this._vineMat = new THREE.MeshStandardMaterial({
      map: this._vineTileTexture,
      roughness: 0.6,
      metalness: 0.2,
    });

    const addTile = (x, y, z, rotY) => {
      const geo  = new THREE.PlaneGeometry(TILE, TILE);
      const mesh = new THREE.Mesh(geo, this._vineMat);
      mesh.position.set(x, y, z);
      mesh.rotation.y = rotY;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      this._vineTileMeshes.push(mesh);
    };

    // Returns true if a tile centered at (localH from wall center, centerY)
    // falls inside the door opening on the named wall.
    const isInDoorOpening = (wallName, localH, centerY) => {
      if (!wallName || this.doorWall !== wallName) return false;
      // Expand by TILE/2 so any tile whose edge overlaps the opening is excluded.
      return Math.abs(localH) < this.DOOR_WIDTH / 2 + TILE / 2 &&
             centerY < this.DOOR_HEIGHT + TILE / 2;
    };

    // Walk a TILE-aligned grid on one face and maybe place a vine tile.
    // spanH / spanV are the face extents; lh is centred (0 = face midpoint).
    const scatterFace = (spanH, spanV, wallName, placeFn) => {
      const cols = Math.floor(spanH / TILE);
      const rows = Math.floor(spanV / TILE);
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const lh = (c + 0.5) * TILE - spanH / 2;
          const cy = (r + 0.5) * TILE;
          if (isInDoorOpening(wallName, lh, cy)) continue;
          if (Math.random() > CHANCE) continue;
          placeFn(lh, cy);
        }
      }
    };

    const W = this.fieldWidth;
    const D = this.fieldDepth;
    const H = this.wallHeight;

    if (this._circularWalls) {
      // Circular room: scatter on each polygon face inner surface.
      // For face at angle theta (from +Z, clockwise):
      //   radial outward  = (sin θ, 0,  cos θ)
      //   tangential      = (cos θ, 0, −sin θ)   (right when facing inward)
      //   inward normal rotY = theta + π
      const R = this.circleRadius;
      for (const { theta, sideLen: faceLen, isDoor } of this._circularWalls) {
        if (isDoor) continue;
        scatterFace(faceLen, H, null, (lh, cy) => {
          const fx = Math.sin(theta) * (R - OFFSET) + Math.cos(theta) * lh;
          const fz = Math.cos(theta) * (R - OFFSET) - Math.sin(theta) * lh;
          addTile(fx, cy, fz, theta + Math.PI);
        });
      }
    } else {
      // Rectangular room: scatter on the four axis-aligned inner wall faces.
      // North (z = -D/2): inner face faces +Z → rotY = 0
      scatterFace(W, H, 'north', (lh, cy) => addTile(lh,              cy, -D / 2 + OFFSET,  0));
      // South (z = +D/2): inner face faces -Z → rotY = Math.PI
      scatterFace(W, H, 'south', (lh, cy) => addTile(lh,              cy,  D / 2 - OFFSET,  Math.PI));
      // East  (x = +W/2): inner face faces -X → rotY = -Math.PI/2
      scatterFace(D, H, 'east',  (lh, cy) => addTile( W / 2 - OFFSET, cy,  lh,             -Math.PI / 2));
      // West  (x = -W/2): inner face faces +X → rotY = +Math.PI/2
      scatterFace(D, H, 'west',  (lh, cy) => addTile(-W / 2 + OFFSET, cy,  lh,              Math.PI / 2));
    }

    // Obstacle faces — all four vertical sides of non-pillar obstacles
    for (const obs of this.obstacles) {
      if (obs.type === 'pillar') continue;
      const { x: ox, z: oz, width: ow, depth: od } = obs;

      // South face (+Z normal), rotY = 0
      scatterFace(ow, H, null, (lh, cy) => addTile(ox + lh, cy, oz + od / 2 + OFFSET,  0));
      // North face (-Z normal), rotY = Math.PI
      scatterFace(ow, H, null, (lh, cy) => addTile(ox + lh, cy, oz - od / 2 - OFFSET,  Math.PI));
      // East face  (+X normal), rotY = +Math.PI/2
      scatterFace(od, H, null, (lh, cy) => addTile(ox + ow / 2 + OFFSET, cy, oz + lh,  Math.PI / 2));
      // West face  (-X normal), rotY = -Math.PI/2
      scatterFace(od, H, null, (lh, cy) => addTile(ox - ow / 2 - OFFSET, cy, oz + lh, -Math.PI / 2));
    }
  }

  /**
   * Triggers the slab-lift animation and activates doorway glow effects.
   * Call this when the room is cleared.
   */
  openDoor() {
    if (this.doorIsOpen || this._doorAnimating || !this.doorSlab) return;
    this._doorAnimating = true;
    this._doorAnimProgress = 0;

    // Activate emissive glow on the door frame
    if (this._frameMat) {
      this._frameMat.emissive.setHex(0xff6600);
      this._frameMat.emissiveIntensity = 0.6;
    }

    // Place a pulsing point light just inside the doorway
    const cx = this._doorOpeningCenter ? this._doorOpeningCenter.x : 0;
    const cz = this._doorOpeningCenter ? this._doorOpeningCenter.z : 0;
    const INSET = 2.0; // units into the room
    let lx = cx, lz = cz;
    if (this._doorIsNS) {
      lz += (this.doorWall === 'north') ? INSET : -INSET;
    } else {
      lx += (this.doorWall === 'east') ? -INSET : INSET;
    }

    this._doorLight = new THREE.PointLight(0xff6600, 60, 12, 2);
    this._doorLight.position.set(lx, this.DOOR_HEIGHT * 0.5, lz);
    this.scene.add(this._doorLight);
    this._doorLightTime = 0;
  }

  /**
   * Advance the door-open animation and pulse the glow effects.
   * Called each frame by GameController.
   */
  update(deltaTime) {
    // ── Bullseye ring rotation ────────────────────────────────────────────────
    if (this.bullseyeRings) {
      const { inner, middle, outer } = this.bullseyeRings;
      inner.group.rotation.y  += inner.rotDir  * inner.speed  * deltaTime;
      middle.group.rotation.y += middle.rotDir * middle.speed * deltaTime;
      outer.group.rotation.y  += outer.rotDir  * outer.speed  * deltaTime;

      // Sync obstacle world positions so isPositionValid() and disc collision stay accurate.
      for (const col of middle.cols) {
        const angle    = col.baseAngle + middle.group.rotation.y;
        col.obsRef.x   = Math.sin(angle) * col.r;
        col.obsRef.z   = Math.cos(angle) * col.r;
      }
      for (const col of outer.cols) {
        const angle    = col.baseAngle + outer.group.rotation.y;
        col.obsRef.x   = Math.sin(angle) * col.r;
        col.obsRef.z   = Math.cos(angle) * col.r;
      }
    }

    // ── Slab lift animation ──────────────────────────────────────────────────
    if (this._doorAnimating && this.doorSlab) {
      const ANIM_DURATION = 0.8; // seconds
      this._doorAnimProgress += deltaTime / ANIM_DURATION;

      if (this._doorAnimProgress >= 1.0) {
        this._doorAnimProgress = 1.0;
        this._doorAnimating = false;
        this.doorIsOpen = true;
      }

      // Ease in-out (quadratic)
      const t = this._doorAnimProgress;
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      this.doorSlab.position.y =
        this._doorSlabStartY + (this._doorSlabEndY - this._doorSlabStartY) * ease;
    }

    // ── Glow pulse (runs whenever the light exists, including during animation) ──
    if (this._doorLight) {
      this._doorLightTime += deltaTime;
      // Slow, uneven pulse — two overlapping sine waves for an organic flicker
      const pulse = 0.65
        + 0.25 * Math.sin(this._doorLightTime * 2.3)
        + 0.10 * Math.sin(this._doorLightTime * 5.7);
      this._doorLight.intensity = 60 * pulse;

      if (this._frameMat) {
        this._frameMat.emissiveIntensity = 0.55 * pulse;
      }

      // Pulse the void plane from deep purple to bright purple in sync
      if (this._voidMesh) {
        this._voidMesh.material.color.setRGB(
          pulse * 1.0,
          pulse * 0.35,
          0,
        );
      }
    }

    // Pulse the frame emissive when hovered
    if (this._doorHovered && this._frameMat) {
      this._doorOutlineTime = (this._doorOutlineTime || 0) + deltaTime;
      this._frameMat.emissive.setHex(0x00ffee);
      this._frameMat.emissiveIntensity =
        0.6 + 0.4 * Math.sin(this._doorOutlineTime * 5.0);
    }
  }

  /**
   * Generates a random set of obstacles (blocks and walls) for the level.
   * Obstacles are arranged to avoid the player starting area and each other.
   */
  generateRandomObstacles() {
    this.obstacles = [];
    // Number of obstacles can vary between 4 and 7
    const numObstacles = 4 + Math.floor(Math.random() * 4);

    for (let i = 0; i < numObstacles; i++) {
      let valid = false;
      let attempts = 0;
      let obstacle = null;

      while (!valid && attempts < 50) {
        const rand = Math.random();
        let type, width, depth, x, z;

        if (rand < 0.35) {
          type = "block";
          // Blocks are square or near-square
          width = 4 + Math.random() * 3;
          depth = width;
        } else if (rand < 0.55) {
          type = "triangle";
          // Equilateral triangular prism — width is the circumradius * 2
          width = 3 + Math.random() * 3;
          depth = width;
        } else if (rand < 0.75) {
          type = "pillar";
          // Pillars are small and round
          width = 2;
          depth = 2;
        } else {
          type = "wall";
          // Walls are long and thin
          const horizontal = Math.random() > 0.5;
          width = horizontal ? 7 + Math.random() * 7 : 1.5;
          depth = horizontal ? 1.5 : 7 + Math.random() * 7;
        }

        // Random position within the field, with some margin from the edges.
        // For circular rooms circleRadius gives the effective bound; for
        // rectangular rooms fieldWidth/fieldDepth are the true dimensions.
        const rangeW = this.circleRadius ? this.circleRadius * 2 : this.fieldWidth;
        const rangeD = this.circleRadius ? this.circleRadius * 2 : this.fieldDepth;
        x = (Math.random() - 0.5) * (rangeW - width - 4);
        z = (Math.random() - 0.5) * (rangeD - depth - 4);

        const rotY = type === "triangle" ? Math.random() * Math.PI * 2 : 0;
        obstacle = { x, z, width, depth, type, rotY };

        // Ensure it doesn't overlap with player start area (roughly around (0,0) and (0,-3))
        const playerBuffer = 8;
        const distToStart = Math.sqrt(x * x + z * z);
        const distToWizard = Math.sqrt(x * x + (z + 3) * (z + 3));

        if (distToStart < playerBuffer || distToWizard < playerBuffer) {
          attempts++;
          continue;
        }

        // Check overlap with existing obstacles (AABB overlap test with padding)
        let overlap = false;
        for (const existing of this.obstacles) {
          const dx = Math.abs(x - existing.x);
          const dz = Math.abs(z - existing.z);

          // Different separation based on types.
          // Pillars can be closer to things than walls can.
          let separation = 3.5;
          if (type === "pillar" && existing.type === "pillar") separation = 2.5;

          const minX = (width + existing.width) / 2 + separation;
          const minZ = (depth + existing.depth) / 2 + separation;
          if (dx < minX && dz < minZ) {
            overlap = true;
            break;
          }
        }

        if (!overlap) {
          valid = true;
        }
        attempts++;
      }

      if (valid && obstacle) {
        this.obstacles.push(obstacle);
        this.createObstacleMesh(obstacle, i);
      }
    }
  }

  createObstacleMesh(obstacle, index) {
    let geometry;
    if (obstacle.type === "pillar") {
      // Pillars are cylindrical
      geometry = new THREE.CylinderGeometry(
        obstacle.width / 2, // top radius
        obstacle.width / 2, // bottom radius
        this.wallHeight,
        16 // radial segments
      );
      this.applyCylinderUVs(geometry, obstacle.width / 2, this.wallHeight);
    } else if (obstacle.type === "triangle") {
      // Equilateral triangular prism — 3-segment cylinder, randomly rotated
      geometry = new THREE.CylinderGeometry(
        obstacle.width / 2,
        obstacle.width / 2,
        this.wallHeight,
        3 // three sides = equilateral triangle cross-section
      );
      this.applyCylinderUVs(geometry, obstacle.width / 2, this.wallHeight);
    } else {
      geometry = new THREE.BoxGeometry(
        obstacle.width,
        this.wallHeight,
        obstacle.depth,
      );
      this.applyWallUVs(geometry, obstacle.width, this.wallHeight, obstacle.depth);
    }

    const mesh = new THREE.Mesh(geometry, this.wallMaterial);
    mesh.position.set(obstacle.x, this.wallHeight / 2, obstacle.z);
    if (obstacle.type === "triangle") {
      mesh.rotation.y = obstacle.rotY ?? 0;
    }
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.walls[`obstacle_${index}`] = mesh;
  }

  /**
   * Checks if a circular object (like a disc) at (x, z) with radius 'radius'
   * is in a valid position (not colliding with walls or obstacles).
   */
  isPositionValid(x, z, radius = 0) {
    const padding = radius + 0.2;

    // Check field boundaries (shape-aware)
    if (this.circleRadius) {
      if (Math.sqrt(x * x + z * z) + padding > this.circleRadius) return false;
      if (this.donutInnerRadius && Math.sqrt(x * x + z * z) < this.donutInnerRadius + padding) return false;
    } else {
      if (
        x - padding < -this.fieldWidth / 2 ||
        x + padding > this.fieldWidth / 2 ||
        z - padding < -this.fieldDepth / 2 ||
        z + padding > this.fieldDepth / 2
      ) return false;
    }

    // Check against all generated obstacles
    for (const obs of this.obstacles) {
      if (obs.type === "pillar" || obs.type === "triangle") {
        // Circular check — exact for pillars; conservative (circumscribed) for triangles
        const dx = x - obs.x;
        const dz = z - obs.z;
        const distSq = dx * dx + dz * dz;
        const minDist = obs.width / 2 + padding;
        if (distSq < minDist * minDist) {
          return false;
        }
      } else {
        const dx = Math.abs(x - obs.x);
        const dz = Math.abs(z - obs.z);
        // AABB check for blocks and walls
        if (dx < obs.width / 2 + padding && dz < obs.depth / 2 + padding) {
          return false;
        }
      }
    }

    return true;
  }

  /** Show or hide the door-frame hover highlight (call from GameController on hover). */
  setDoorHovered(hovered) {
    this._doorHovered = hovered && this.doorIsOpen;
    if (!this._doorHovered) {
      this._doorOutlineTime = 0;
      // Restore the normal door-open emissive state driven by the glow pulse
      if (this._frameMat) {
        this._frameMat.emissive.setHex(0x000000);
        this._frameMat.emissiveIntensity = 0;
      }
    }
  }

  /**
   * Returns true when the disc (x, z, radius) has entered the door opening
   * after the door is open. Used by GameController to trigger level transition.
   */
  checkPortalCollision(x, z, radius) {
    if (!this.doorIsOpen || !this._doorOpeningCenter) return false;

    const cx = this._doorOpeningCenter.x;
    const cz = this._doorOpeningCenter.z;
    // How close the disc centre must be (perpendicularly) to the wall plane
    // to count as having entered. Radius + 1 handles the moment just before
    // handleWallCollision would push it back.
    const wallReach = radius + 1.0;

    if (this._doorIsNS) {
      // Door spans X; disc must be centred in the opening and near the wall Z
      return Math.abs(x - cx) < this.DOOR_WIDTH / 2 &&
             Math.abs(z - cz) < wallReach;
    } else {
      // Door spans Z; disc must be centred in the opening and near the wall X
      return Math.abs(z - cz) < this.DOOR_WIDTH / 2 &&
             Math.abs(x - cx) < wallReach;
    }
  }

  unload() {
    this.obstacles = [];
    if (this.floor) {
      this.scene.remove(this.floor);
      if (this.floor.geometry) this.floor.geometry.dispose();
      if (this.floor.material) {
        if (this.floor.material.map) this.floor.material.map.dispose();
        this.floor.material.dispose();
      }
      this.floor = null;
    }

    for (const key in this.walls) {
      const wall = this.walls[key];
      if (wall) {
        this.scene.remove(wall);
        if (wall.geometry) wall.geometry.dispose();
        // Each wall has its own cloned material from _initTransparency
        if (wall.material) wall.material.dispose();
      }
    }
    this.walls = {};

    // Clean up door slab (tracked separately, not in walls dict)
    if (this.doorSlab) {
      this.scene.remove(this.doorSlab);
      if (this.doorSlab.geometry) this.doorSlab.geometry.dispose();
      if (this.doorSlab.material) this.doorSlab.material.dispose();
      this.doorSlab = null;
    }

    // Clean up door frame meshes (posts, lintel, void plane).
    // Each StandardMaterial mesh has its own clone; the void plane has its own
    // MeshBasicMaterial. All are safe to dispose individually.
    for (const mesh of this.doorFrameMeshes) {
      this.scene.remove(mesh);
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) mesh.material.dispose();
    }
    this.doorFrameMeshes = [];

    // Dispose template materials (no longer assigned to any mesh after
    // _initTransparency cloned them, but still occupy GPU memory)
    if (this._frameMat) {
      this._frameMat.dispose();
      this._frameMat = null;
    }
    if (this._slabMat) {
      this._slabMat.dispose();
      this._slabMat = null;
    }

    this._voidMesh = null;

    this._doorHovered = false;
    this._doorOutlineTime = 0;

    // Remove the door glow light
    if (this._doorLight) {
      this.scene.remove(this._doorLight);
      this._doorLight = null;
    }
    this._doorLightTime = 0;

    // Reset door state for next level
    this.doorWall = null;
    this.doorIsOpen = false;
    this._doorAnimating = false;
    this._doorAnimProgress = 0;
    this._doorOpeningCenter = null;

    // Legacy portal cleanup (arrays are always empty with new door system)
    for (const portal of this.portals) {
      this.scene.remove(portal);
      if (portal.geometry) portal.geometry.dispose();
      if (portal.material) portal.material.dispose();
    }
    this.portals = [];

    for (const light of this.portalLights) {
      this.scene.remove(light);
    }
    this.portalLights = [];

    if (this.wallMaterial) {
      if (this.wallMaterial.map) this.wallMaterial.map.dispose();
      this.wallMaterial.dispose();
      this.wallMaterial = null;
    }

    // Vine tile overlays
    for (const mesh of (this._vineTileMeshes || [])) {
      this.scene.remove(mesh);
      if (mesh.geometry) mesh.geometry.dispose();
    }
    this._vineTileMeshes = [];
    if (this._vineMat) { this._vineMat.dispose(); this._vineMat = null; }
    if (this._vineTileTexture) { this._vineTileTexture.dispose(); this._vineTileTexture = null; }

    // Circular/donut room state
    this.circleRadius     = null;
    this._circularWalls   = null;
    this.donutInnerRadius = null;

    // Hexagonal room state — all floor panels share one material; dispose geometry
    // per-mesh and the shared material (+ its texture) only once.
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
      // material is a clone from _initTransparency — dispose it
      if (mesh.material) mesh.material.dispose();
    }
    this._hexOuterWalls = [];
    this.hexRings = null;

    // Bullseye level state — dispose the three ring groups (floor meshes + columns).
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
}
