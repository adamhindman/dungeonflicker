import * as THREE from "three";
import Torch from "./Torch.js";

export default class Level {
  constructor(scene) {
    this.scene = scene;
    this.fieldWidth = 32 * 1.5;
    this.fieldDepth = 24 * 1.5;
    this.wallHeight = 4;
    this.walls = {};
    this.floor = null;
    this.textureLoader = new THREE.TextureLoader();
    this.torches = [];
    this.wallMaterial = null; // Will be created after texture loads
  }

  getAllWalls() {
    // Return all wall meshes including internal walls
    return Object.values(this.walls).filter((wall) => wall !== undefined);
  }

  load() {
    const fieldGeometry = new THREE.PlaneGeometry(
      this.fieldWidth,
      this.fieldDepth,
    );
    
    // Enhanced texture loading with error handling for Chrome compatibility
    const loadTextureWithFallback = (path, onSuccess, onError) => {
      console.log(`Attempting to load texture: ${path}`);
      const texture = this.textureLoader.load(
        path,
        (loadedTexture) => {
          console.log(`Successfully loaded texture: ${path}`);
          if (onSuccess) onSuccess(loadedTexture);
        },
        undefined, // onProgress
        (error) => {
          console.error(`Failed to load texture: ${path}`, error);
          console.log(`Browser: ${navigator.userAgent}`);
          if (onError) onError(error);
        }
      );
      return texture;
    };

    // Load tile texture and set repeating
    const tileTexture = loadTextureWithFallback("images/tile-stone-1.png");
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

    // Create wall texture with different repeat settings
    const wallTileTexture = loadTextureWithFallback("images/tile-stone-1.png");
    wallTileTexture.wrapS = THREE.RepeatWrapping;
    wallTileTexture.wrapT = THREE.RepeatWrapping;
    wallTileTexture.repeat.set(2, 1); // Adjust repeat for wall proportions

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
    this.walls.west = new THREE.Mesh(westGeometry, this.wallMaterial);
    this.walls.west.position.set(-this.fieldWidth / 2, this.wallHeight / 2, 0);
    this.walls.west.castShadow = true;
    this.walls.west.receiveShadow = true;
    this.scene.add(this.walls.west);

    // Add two internal walls perpendicular to long walls (north and south)
    // Wall length: 1 unit thickness, 2 units height, 5 units long
    const internalWallLength = 13;
    const internalWallThickness = 1;

    // Internal wall along north long wall, perpendicular to it, offset on x by halfWidth
    const internalWall1Geometry = new THREE.BoxGeometry(
      internalWallThickness,
      this.wallHeight,
      internalWallLength,
    );
    this.walls.internal1 = new THREE.Mesh(
      internalWall1Geometry,
      this.wallMaterial,
    );
    this.walls.internal1.position.set(
      -this.fieldWidth / 6,
      this.wallHeight / 2,
      -this.fieldDepth / 2 + internalWallLength / 2 + 0.25,
    );
    this.walls.internal1.castShadow = true;
    this.walls.internal1.receiveShadow = true;
    this.scene.add(this.walls.internal1);

    // Internal wall along south long wall, perpendicular to it, offset on x by halfWidth
    const internalWall2Geometry = new THREE.BoxGeometry(
      internalWallThickness,
      this.wallHeight,
      internalWallLength,
    );
    this.walls.internal2 = new THREE.Mesh(
      internalWall2Geometry,
      this.wallMaterial,
    );
    this.walls.internal2.position.set(
      this.fieldWidth / 6,
      this.wallHeight / 2,
      this.fieldDepth / 2 - internalWallLength / 2 - 0.25,
    );
    this.walls.internal2.castShadow = true;
    this.walls.internal2.receiveShadow = true;
    this.scene.add(this.walls.internal2);

    // Add a square block
    const blockSize = 6;
    const blockGeometry = new THREE.BoxGeometry(
      blockSize,
      this.wallHeight,
      blockSize,
    );
    this.walls.obstacle1 = new THREE.Mesh(blockGeometry, this.wallMaterial);

    const obstacle1X = -10;
    const obstacle1Z = 8;

    this.walls.obstacle1.position.set(
      obstacle1X,
      this.wallHeight / 2,
      obstacle1Z,
    );
    this.walls.obstacle1.castShadow = true;
    this.walls.obstacle1.receiveShadow = true;
    this.scene.add(this.walls.obstacle1);

    // Add a second obstacle on the opposite side of the level
    const obstacle2Geometry = new THREE.BoxGeometry(
      blockSize,
      this.wallHeight,
      blockSize,
    );
    this.walls.obstacle2 = new THREE.Mesh(obstacle2Geometry, this.wallMaterial);

    const obstacle2X = 10; // Opposite X from obstacle1 (-10)
    const obstacle2Z = -8; // Opposite Z from obstacle1 (8)

    this.walls.obstacle2.position.set(
      obstacle2X,
      this.wallHeight / 2,
      obstacle2Z,
    );
    this.walls.obstacle2.castShadow = true;
    this.walls.obstacle2.receiveShadow = true;
    this.scene.add(this.walls.obstacle2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 512; // Performance: Reduced from 1024
    directionalLight.shadow.mapSize.height = 512; // Performance: Reduced from 1024
    directionalLight.shadow.camera.left = -40;
    directionalLight.shadow.camera.right = 40;
    directionalLight.shadow.camera.top = 40;
    directionalLight.shadow.camera.bottom = -40;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 100;
    this.scene.add(directionalLight);

    // Create torches using the Torch class
    const torchPositions = [
      // Corner torches
      { x: -this.fieldWidth / 2 + 2, y: this.wallHeight * 0.6, z: -this.fieldDepth / 2 + 0.5, angle: Math.PI / 12, intensity: 2.0, range: 35 },
      { x: this.fieldWidth / 2 - 2, y: this.wallHeight * 0.6, z: -this.fieldDepth / 2 + 0.5, angle: -Math.PI / 12, intensity: 2.0, range: 35 },
      { x: -this.fieldWidth / 2 + 2, y: this.wallHeight * 0.6, z: this.fieldDepth / 2 - 0.5, angle: Math.PI / 12, intensity: 2.0, range: 35 },
      { x: this.fieldWidth / 2 - 2, y: this.wallHeight * 0.6, z: this.fieldDepth / 2 - 0.5, angle: -Math.PI / 12, intensity: 2.0, range: 35 },
      // Internal wall torches
      { x: -this.fieldWidth / 6 - 0.8, y: this.wallHeight * 0.6, z: -this.fieldDepth / 2 + internalWallLength / 2 + 0.25, angle: Math.PI / 8, intensity: 1.5, range: 35 },
      { x: this.fieldWidth / 6 + 0.8, y: this.wallHeight * 0.6, z: this.fieldDepth / 2 - internalWallLength / 2 - 0.25, angle: -Math.PI / 8, intensity: 1.5, range: 35 },
      // Obstacle torches
      { x: obstacle1X - blockSize / 2 - 0.25, y: this.wallHeight * 0.6, z: obstacle1Z, angle: Math.PI / 10, intensity: 1.8, range: 35 },
      { x: obstacle2X + blockSize / 2 + 0.25, y: this.wallHeight * 0.6, z: obstacle2Z, angle: -Math.PI / 10, intensity: 1.8, range: 35 }
    ];

    // Create all torches
    torchPositions.forEach(pos => {
      const torch = new Torch(this.scene, pos.x, pos.y, pos.z, pos.angle, pos.intensity, pos.range);
      this.torches.push(torch);
    });
  }

  animateTorches() {
    const time = Date.now() * 0.003; // Slower flickering
    this.torches.forEach((torch, index) => {
      torch.flicker(time, index);
    });
  }

  unload() {
    if (this.floor) {
      this.scene.remove(this.floor);
      this.floor.geometry.dispose();
      this.floor.material.dispose();
      this.floor = null;
    }
    for (const key in this.walls) {
      this.scene.remove(this.walls[key]);
      this.walls[key].geometry.dispose();
      this.walls[key].material.dispose();
    }
    this.walls = {};
    // Dispose of all torches
    this.torches.forEach(torch => torch.dispose());
    this.torches = [];
  }
}
