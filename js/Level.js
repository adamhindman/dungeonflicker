import * as THREE from "three";

export default class Level {
  constructor(scene) {
    this.scene = scene;
    this.fieldWidth = 32 * 1.5;
    this.fieldDepth = 24 * 1.5;
    this.wallHeight = 4;
    this.walls = {};
    this.floor = null;
    this.textureLoader = new THREE.TextureLoader();
    this.wallMaterial = null;
    this.obstacles = [];
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
    return Object.values(this.walls).filter((wall) => wall !== undefined);
  }

  load() {
    const fieldGeometry = new THREE.PlaneGeometry(
      this.fieldWidth,
      this.fieldDepth,
    );
    
    // Enhanced texture loading with error handling for Chrome compatibility
    const loadTextureWithFallback = (path, onSuccess, onError) => {
      const texture = this.textureLoader.load(
        path,
        (loadedTexture) => {
          if (onSuccess) onSuccess(loadedTexture);
        },
        undefined, // onProgress
        (error) => {
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

    // Create wall texture
    const wallTileTexture = loadTextureWithFallback("images/tile-stone-1.png");
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

        if (rand < 0.4) {
          type = "block";
          // Blocks are square or near-square
          width = 4 + Math.random() * 3;
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

        // Random position within the field, with some margin from the edges
        x = (Math.random() - 0.5) * (this.fieldWidth - width - 4);
        z = (Math.random() - 0.5) * (this.fieldDepth - depth - 4);

        obstacle = { x, z, width, depth, type };

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

    // Check field boundaries
    if (
      x - padding < -this.fieldWidth / 2 ||
      x + padding > this.fieldWidth / 2 ||
      z - padding < -this.fieldDepth / 2 ||
      z + padding > this.fieldDepth / 2
    ) {
      return false;
    }

    // Check against all generated obstacles
    for (const obs of this.obstacles) {
      if (obs.type === "pillar") {
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
      }
    }
    this.walls = {};

    if (this.wallMaterial) {
      if (this.wallMaterial.map) this.wallMaterial.map.dispose();
      this.wallMaterial.dispose();
      this.wallMaterial = null;
    }
  }
}
