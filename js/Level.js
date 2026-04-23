import * as THREE from "three";
import { loadRectangular } from "./levels/rectangular.js";
import { loadCircular, resetCircularState } from "./levels/circular.js";
import { loadHexagon, getHexTerrainHeight, getHexTerrainSlopeForce, disposeHexagon } from "./levels/hexagon.js";
import { loadBullseye, stepRings, updateBullseyeAnimation, disposeBullseye } from "./levels/bullseye.js";
import { loadDonut, getDonutTerrainHeight, getDonutTerrainSlopeForce, disposeDonut } from "./levels/donut.js";
import { loadCrusher, setCrusherLength, stepCrushers, updateCrusherAnimation, disposeCrusher } from "./levels/crusher.js";

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
    this.obstacleMaterial = null;
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
    this.nextShape = null;          // override: room id string; null = random fallback

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
    this.donutInnerRadius = null;   // spawn exclusion radius (= ring inner edge)
    this.donutRings = null;         // { MED_Y, PIT_Y, RING_INNER_R, PIT_R, OUTER_R }

    // Crusher level support
    this.crusherConfig = null;       // clipped-square bounds + alternating crusher state
    this._crusherMeshes = [];
    this._crusherMat = null;
    this._crusherAnim = null;
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

  _getObstacleMaterial() {
    if (!this.obstacleMaterial) {
      const tex = this.textureLoader.load("images/stacked-tile-light.png");
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      this.obstacleMaterial = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.6,
        metalness: 0.2,
      });
    }
    return this.obstacleMaterial;
  }

  getAllWalls() {
    // Return all wall meshes including internal walls.
    // For radial-boundary levels, skip polygon outer walls (poly_*) — their
    // rotated BoxGeometry produces inflated AABBs that create phantom collisions.
    // The radial clamp in PhysicsEngine is the authoritative outer boundary.
    const walls = Object.entries(this.walls)
      .filter(([key, wall]) => wall !== undefined &&
        !(this.circleRadius && key.startsWith('poly_')) &&
        !(this.crusherConfig && key.startsWith('clip_visual')))
      .map(([, wall]) => wall);
    // Include the door slab for collision while the door is closed
    if (this.doorSlab && !this.doorIsOpen) {
      walls.push(this.doorSlab);
    }
    // Include rotating column meshes for the bullseye level
    if (this._bullseyeColumnMeshes && this._bullseyeColumnMeshes.length) {
      walls.push(...this._bullseyeColumnMeshes);
    }
    if (this.crusherConfig && this._crusherMeshes && this._crusherMeshes.length) {
      walls.push(...this._crusherMeshes);
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
    for (const mesh of (this._crusherMeshes || [])) {
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
    } else if (shape === 'crusher') {
      this._loadCrusher();
    } else {
      this._loadRectangular();
    }
  }

  _loadRectangular() { return loadRectangular.call(this); }
  _loadCircular() { return loadCircular.call(this); }
  _loadHexagon() { return loadHexagon.call(this); }
  _loadBullseye() { return loadBullseye.call(this); }
  _loadDonut() { return loadDonut.call(this); }
  _loadCrusher() { return loadCrusher.call(this); }

  _setCrusherLength(crusher, length) { return setCrusherLength.call(this, crusher, length); }
  stepCrushers() { return stepCrushers.call(this); }
  getTerrainHeightAt(x, z) {
    if (this.donutRings) {
      return getDonutTerrainHeight.call(this, x, z);
    }
    if (this.hexRings) {
      return getHexTerrainHeight.call(this, x, z);
    }
    return 0;
  }

  getTerrainSlopeForce(x, z) {
    if (this.donutRings) {
      return getDonutTerrainSlopeForce.call(this, x, z);
    }
    if (this.hexRings) {
      return getHexTerrainSlopeForce.call(this, x, z);
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
   * Scatter vine-tile overlay quads on wall faces.
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
  }

  /** True while the per-round ring step animation is playing. */
  get ringsAnimating() {
    return !!(this._ringAnim && !this._ringAnim.done);
  }

  stepRings() { return stepRings.call(this); }

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
    updateCrusherAnimation.call(this, deltaTime);
    updateBullseyeAnimation.call(this, deltaTime);

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

        // For circular rooms, ensure all four corners of the obstacle's AABB
        // fit inside the circle with a margin so nothing pokes through the wall.
        if (!overlap && this.circleRadius) {
          const margin = 1.5;
          const halfW = width / 2;
          const halfD = depth / 2;
          const corners = [
            [x + halfW, z + halfD],
            [x + halfW, z - halfD],
            [x - halfW, z + halfD],
            [x - halfW, z - halfD],
          ];
          for (const [cx, cz] of corners) {
            if (Math.sqrt(cx * cx + cz * cz) > this.circleRadius - margin) {
              overlap = true;
              break;
            }
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

    const mesh = new THREE.Mesh(geometry, this._getObstacleMaterial());
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
      return Math.abs(x - cx) < this.DOOR_WIDTH / 2 + radius &&
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

    if (this.obstacleMaterial) {
      if (this.obstacleMaterial.map) this.obstacleMaterial.map.dispose();
      this.obstacleMaterial.dispose();
      this.obstacleMaterial = null;
    }

    // Vine tile overlays
    for (const mesh of (this._vineTileMeshes || [])) {
      this.scene.remove(mesh);
      if (mesh.geometry) mesh.geometry.dispose();
    }
    this._vineTileMeshes = [];
    if (this._vineMat) { this._vineMat.dispose(); this._vineMat = null; }
    if (this._vineTileTexture) { this._vineTileTexture.dispose(); this._vineTileTexture = null; }

    resetCircularState.call(this);
    disposeDonut.call(this);
    disposeHexagon.call(this);
    disposeBullseye.call(this);
    disposeCrusher.call(this);
  }
}
