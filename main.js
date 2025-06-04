import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202025);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 15, 15);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// Field parameters
const fieldWidth = 30;
const fieldDepth = 20;
const wallHeight = 2;

// Create the field (a flat rectangular plane)
const fieldGeometry = new THREE.PlaneGeometry(fieldWidth, fieldDepth);
const fieldMaterial = new THREE.MeshPhongMaterial({
  color: 0x408040,
  side: THREE.DoubleSide,
});
const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
field.rotation.x = -Math.PI / 2;
scene.add(field);

// Create walls (four rectangular boxes)
const wallMaterial = new THREE.MeshPhongMaterial({ color: 0x555555 });

let wallNorth, wallSouth, wallEast, wallWest;

function createWalls() {
  if (wallNorth) scene.remove(wallNorth);
  if (wallSouth) scene.remove(wallSouth);
  if (wallEast) scene.remove(wallEast);
  if (wallWest) scene.remove(wallWest);

  const wallNorthGeometry = new THREE.BoxGeometry(fieldWidth, wallHeight, 0.5);
  wallNorth = new THREE.Mesh(wallNorthGeometry, wallMaterial);
  wallNorth.position.set(0, wallHeight / 2, -fieldDepth / 2);
  scene.add(wallNorth);

  const wallSouthGeometry = new THREE.BoxGeometry(fieldWidth, wallHeight, 0.5);
  wallSouth = new THREE.Mesh(wallSouthGeometry, wallMaterial);
  wallSouth.position.set(0, wallHeight / 2, fieldDepth / 2);
  scene.add(wallSouth);

  const wallEastGeometry = new THREE.BoxGeometry(0.5, wallHeight, fieldDepth);
  wallEast = new THREE.Mesh(wallEastGeometry, wallMaterial);
  wallEast.position.set(fieldWidth / 2, wallHeight / 2, 0);
  scene.add(wallEast);

  const wallWestGeometry = new THREE.BoxGeometry(0.5, wallHeight, fieldDepth);
  wallWest = new THREE.Mesh(wallWestGeometry, wallMaterial);
  wallWest.position.set(-fieldWidth / 2, wallHeight / 2, 0);
  scene.add(wallWest);
}
createWalls();

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

const throwInfoDiv = document.getElementById("throw-info");
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let controlsEnabled = true;
let isPointerDown = false;
let pointerDownPos = null;
let pointerDisc = null;

class Disc {
  constructor(radius, height, color, startX, startZ) {
    this.radius = radius;
    this.height = height;
    this.mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, height, 64),
      new THREE.MeshPhongMaterial({
        color: color,
        opacity: 0.9,
        transparent: true,
      }),
    );
    this.mesh.position.y = height / 2;
    this.mesh.position.x = startX;
    this.mesh.position.z = startZ;
    scene.add(this.mesh);

    this.velocity = new THREE.Vector3(0, 0, 0);
    this.moving = false;
  }

  updatePosition() {
    this.mesh.position.add(this.velocity);
  }

  handleWallCollision(fieldWidth, fieldDepth, bounceDamping) {
    if (this.mesh.position.x + this.radius > fieldWidth / 2) {
      this.mesh.position.x = fieldWidth / 2 - this.radius;
      this.velocity.x = -this.velocity.x * bounceDamping;
    } else if (this.mesh.position.x - this.radius < -fieldWidth / 2) {
      this.mesh.position.x = -fieldWidth / 2 + this.radius;
      this.velocity.x = -this.velocity.x * bounceDamping;
    }

    if (this.mesh.position.z + this.radius > fieldDepth / 2) {
      this.mesh.position.z = fieldDepth / 2 - this.radius;
      this.velocity.z = -this.velocity.z * bounceDamping;
    } else if (this.mesh.position.z - this.radius < -fieldDepth / 2) {
      this.mesh.position.z = -fieldDepth / 2 + this.radius;
      this.velocity.z = -this.velocity.z * bounceDamping;
    }
  }

  applyFriction(friction) {
    this.velocity.multiplyScalar(friction);
    if (this.velocity.length() < 0.0001) {
      this.velocity.set(0, 0, 0);
      this.moving = false;
    }
  }
}

// Create discs
const discs = [];

const disc1 = new Disc(
  1.5, // radius of blue disc
  0.5, // height of blue disc
  0x0088ff,
  -fieldWidth / 2 + 1.5 + 1.0,
  -fieldDepth / 2 + 1.5 + 1.0,
);
const disc2 = new Disc(
  2.0,
  0.4,
  0xff0000,
  fieldWidth / 2 - 2.0 - 1.0,
  fieldDepth / 2 - 2.0 - 1.0,
);

discs.push(disc1);
discs.push(disc2);

function onPointerDown(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  pointerDisc = null;

  for (let d of discs) {
    const intersects = raycaster.intersectObject(d.mesh);
    if (intersects.length > 0) {
      pointerDisc = d;
      break;
    }
  }

  if (pointerDisc) {
    controlsEnabled = false;
    pointerDownPos = { x: event.clientX, y: event.clientY };
    throwInfoDiv.style.visibility = "visible";
    throwInfoDiv.textContent = "Magnitude: 0 Angle: 0°";
  } else {
    controlsEnabled = true;
    pointerDownPos = null;
    throwInfoDiv.style.visibility = "hidden";
    throwInfoDiv.textContent = "";
  }
  isPointerDown = true;
}

function onPointerMove(event) {
  if (!isPointerDown || pointerDownPos === null) return;

  const deltaX = event.clientX - pointerDownPos.x;
  const deltaY = event.clientY - pointerDownPos.y;

  const dragLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  if (dragLength > 0) {
    const angleRadians = Math.atan2(-deltaY, deltaX);
    let angleDegrees = angleRadians * (180 / Math.PI);
    if (angleDegrees < 0) angleDegrees += 360;

    throwInfoDiv.textContent = `Magnitude: ${dragLength.toFixed(1)} Angle: ${angleDegrees.toFixed(1)}°`;
  } else {
    throwInfoDiv.textContent = "Magnitude: 0 Angle: 0°";
  }
}

function onPointerUp(event) {
  if (!isPointerDown) return;
  isPointerDown = false;
  throwInfoDiv.style.visibility = "hidden";
  throwInfoDiv.textContent = "";

  if (pointerDownPos !== null && pointerDisc) {
    const deltaX = event.clientX - pointerDownPos.x;
    const deltaY = event.clientY - pointerDownPos.y;

    const dragLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (dragLength > 5) {
      const normX = deltaX / dragLength;
      const normY = deltaY / dragLength;

      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();

      const up = new THREE.Vector3(0, 1, 0);
      const cameraRight = new THREE.Vector3();
      cameraRight.crossVectors(forward, up).normalize();

      let direction = new THREE.Vector3();
      direction.add(cameraRight.clone().multiplyScalar(normX));
      direction.add(forward.clone().multiplyScalar(-normY));
      direction.normalize();
      direction.negate();

      const directionX = direction.x;
      const directionZ = direction.z;

      const maxSpeed = 0.4;
      const speed = Math.min(dragLength / 100, 1) * maxSpeed;

      pointerDisc.velocity.set(directionX * speed, 0, directionZ * speed);
      pointerDisc.moving = true;
    }
  }
  pointerDownPos = null;
  pointerDisc = null;
}

window.addEventListener("pointerdown", onPointerDown, false);
window.addEventListener("pointermove", onPointerMove, false);
window.addEventListener("pointerup", onPointerUp, false);

controls.addEventListener("start", () => {
  if (!controlsEnabled) {
    controls.enabled = false;
  } else {
    controls.enabled = true;
  }
});

controls.addEventListener("end", () => {
  controls.enabled = true;
});

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  field.rotation.x = -Math.PI / 2;
  createWalls();

  discs.forEach((disc) => {
    disc.mesh.position.x = clamp(
      disc.mesh.position.x,
      -fieldWidth / 2 + disc.radius,
      fieldWidth / 2 - disc.radius,
    );
    disc.mesh.position.z = clamp(
      disc.mesh.position.z,
      -fieldDepth / 2 + disc.radius,
      fieldDepth / 2 - disc.radius,
    );
  });
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Update and move all discs
  discs.forEach((d) => {
    if (d.moving) {
      d.updatePosition();
      d.handleWallCollision(fieldWidth, fieldDepth, 0.8);
      d.applyFriction(0.98);
    }
  });

  // Collision detection and response between discs (pairwise)
  const minDist = discs.length > 0 ? discs[0].radius * 2 : 0;
  let colliding = false;

  for (let i = 0; i < discs.length; i++) {
    for (let j = i + 1; j < discs.length; j++) {
      const d1 = discs[i];
      const d2 = discs[j];
      const diff = new THREE.Vector3().subVectors(
        d1.mesh.position,
        d2.mesh.position,
      );
      const dist = diff.length();

      if (dist < minDist && dist > 0) {
        colliding = true;
        const normal = diff.clone().divideScalar(dist);

        // Clamp collision normal to horizontal plane to preserve y altitude
        normal.y = 0;
        normal.normalize();

        const relativeVelocity = d1.velocity.clone().sub(d2.velocity);
        const velocityAlongNormal = relativeVelocity.dot(normal);

        if (velocityAlongNormal <= 0) {
          const restitution = 1;
          const impulse = (-(1 + restitution) * velocityAlongNormal) / 2;
          const impulseVector = normal.clone().multiplyScalar(impulse);

          d1.velocity.add(impulseVector);
          d2.velocity.sub(impulseVector);

          d1.moving = true;
          d2.moving = true;

          const overlap = minDist - dist;
          d1.mesh.position.add(normal.clone().multiplyScalar(overlap / 2));
          d2.mesh.position.sub(normal.clone().multiplyScalar(overlap / 2));

          // Update bounding box helper position to follow mesh (for red disc)
          if (d2.mesh === disc2.mesh) {
            boxHelper.update();
          }
        }
      }
    }
  }

  renderer.render(scene, camera);
}

animate();
