import * as THREE from "three";

export default class Level {
  constructor(scene) {
    this.scene = scene;
    this.fieldWidth = 30;
    this.fieldDepth = 20;
    this.wallHeight = 2;
    this.wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.4,
      metalness: 0.5,
    });
    this.walls = {};
    this.floor = null;
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
    const fieldMaterial = new THREE.MeshStandardMaterial({
      color: 0x408040,
      roughness: 0.6,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });
    this.floor = new THREE.Mesh(fieldGeometry, fieldMaterial);
    this.floor.rotation.x = -Math.PI / 2;
    this.scene.add(this.floor);

    const northGeometry = new THREE.BoxGeometry(
      this.fieldWidth,
      this.wallHeight,
      0.5,
    );
    this.walls.north = new THREE.Mesh(northGeometry, this.wallMaterial);
    this.walls.north.position.set(0, this.wallHeight / 2, -this.fieldDepth / 2);
    this.scene.add(this.walls.north);

    const southGeometry = new THREE.BoxGeometry(
      this.fieldWidth,
      this.wallHeight,
      0.5,
    );
    this.walls.south = new THREE.Mesh(southGeometry, this.wallMaterial);
    this.walls.south.position.set(0, this.wallHeight / 2, this.fieldDepth / 2);
    this.scene.add(this.walls.south);

    const eastGeometry = new THREE.BoxGeometry(
      0.5,
      this.wallHeight,
      this.fieldDepth,
    );
    this.walls.east = new THREE.Mesh(eastGeometry, this.wallMaterial);
    this.walls.east.position.set(this.fieldWidth / 2, this.wallHeight / 2, 0);
    this.scene.add(this.walls.east);

    const westGeometry = new THREE.BoxGeometry(
      0.5,
      this.wallHeight,
      this.fieldDepth,
    );
    this.walls.west = new THREE.Mesh(westGeometry, this.wallMaterial);
    this.walls.west.position.set(-this.fieldWidth / 2, this.wallHeight / 2, 0);
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
    this.scene.add(this.walls.internal2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    this.scene.add(directionalLight);
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
  }
}
