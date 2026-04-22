import * as THREE from "three";

export function loadRectangular() {
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
