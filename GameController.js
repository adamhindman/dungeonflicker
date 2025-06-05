import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Level from "./Level.js";
import Disc from "./Disc.js";

let instance = null;

export default class GameController {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.level = null;
    this.discs = [];
    this.currentTurnIndex = 0;
    this._currentDisc = null;

    this.raycaster = null;
    this.mouse = null;

    this.controlsEnabled = true;
    this.isPointerDown = false;
    this.pointerDownPos = null;
    this.pointerDisc = null;

    this.throwInfoDiv = null;

    // Add keydown listener for Escape to cancel drag
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" || event.key === "Esc") {
        if (this.isPointerDown) {
          this.isPointerDown = false;
          this.pointerDownPos = null;
          this.pointerDisc = null;
          this.controls.enabled = true;
          this.throwInfoDiv.style.visibility = "hidden";
          this.throwInfoDiv.textContent = "";
          if (this.throwDirectionLine) {
            this.throwDirectionLine.visible = false;
          }
        }
      }
    });

    window.addEventListener("resize", () => this.onWindowResize());
    this.animate = this.animate.bind(this);
    this.animate();
  }

  get currentDisc() {
    return this._currentDisc;
  }

  set currentDisc(value) {
    // Remove previous edge helper highlight if present
    if (this._currentDisc && this._currentDisc.edgeHelper) {
      this.scene.remove(this._currentDisc.edgeHelper);
      this._currentDisc.edgeHelper.geometry.dispose();
      this._currentDisc.edgeHelper.material.dispose();
      this._currentDisc.edgeHelper = null;
    }

    this._currentDisc = value;

    // Add edge highlight to new current disc
    if (this._currentDisc && this._currentDisc.mesh) {
      const edges = new THREE.EdgesGeometry(this._currentDisc.mesh.geometry);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 4,
      });
      const edgeLines = new THREE.LineSegments(edges, lineMaterial);

      edgeLines.position.copy(this._currentDisc.mesh.position);
      edgeLines.rotation.copy(this._currentDisc.mesh.rotation);
      edgeLines.scale.copy(this._currentDisc.mesh.scale);

      this.scene.add(edgeLines);
      this._currentDisc.edgeHelper = edgeLines;
    }
  }

  logCurrentTurn() {
    if (this.currentDisc) {
      // Implement logging if needed
      // console.log(`Current turn: ${this.currentDisc.discName}`);
    }
  }

  init() {
    this.scene = new THREE.Scene();

    // Setup camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(0, 20, 20);

    // Setup renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Setup controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    this.level = new Level(this.scene);
    this.level.load();

    this.discs = [];

    this.currentTurnIndex = 0;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.controlsEnabled = true;
    this.isPointerDown = false;
    this.pointerDownPos = null;
    this.pointerDisc = null;

    this.throwInfoDiv = document.getElementById("throw-info");

    // Add pointer event listeners
    this.addEventListeners();

    // Initialize throw direction line helper
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2,
    });
    const vertices = new Float32Array(6); // 2 points * 3 coords
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.setDrawRange(0, 2);
    this.throwDirectionLine = new THREE.Line(geometry, material);
    this.throwDirectionLine.visible = false;
    this.scene.add(this.throwDirectionLine);

    this.initDiscs();
  }

  initDiscs() {
    // Example discs with labeled parameters for easy tweaking
    const disc1 = new Disc(
      /* radius: */ 1.5,
      /* height: */ 0.6,
      /* color: */ 0x0088ff,
      /* startX: */ -this.level.fieldWidth / 2 + 1.5 + 1.0,
      /* startZ: */ -this.level.fieldDepth / 2 + 1.5 + 1.0,
      /* scene: */ this.scene,
      /* discName: */ "blue",
      /* type: */ "player",
      /* hitPoints: */ 3,
    );
    const disc2 = new Disc(
      /* radius: */ 1.5,
      /* height: */ 0.6,
      /* color: */ 0xff0000,
      /* startX: */ this.level.fieldWidth / 2 - 2.0 - 1.0,
      /* startZ: */ this.level.fieldDepth / 2 - 2.0 - 1.0,
      /* scene: */ this.scene,
      /* discName: */ "red",
      /* type: */ "NPC",
      /* hitPoints: */ 3,
    );
    const disc3 = new Disc(
      /* radius: */ 1.5,
      /* height: */ 0.6,
      /* color: */ 0xffff00,
      /* startX: */ 0,
      /* startZ: */ 0,
      /* scene: */ this.scene,
      /* discName: */ "yellow",
      /* type: */ "NPC",
      /* hitPoints: */ 3,
    );

    this.discs.push(disc1, disc2, disc3);

    // Initialize turn with first 'player' disc
    this.currentTurnIndex = this.discs.findIndex(
      (d) => d.type === "player" && d.hitPoints > 0 && !d.dead,
    );
    if (this.currentTurnIndex !== -1) {
      this.currentDisc = this.discs[this.currentTurnIndex];
      this.logCurrentTurn();
    } else {
      // fallback to any alive disc if no player disc found
      for (let i = 0; i < this.discs.length; i++) {
        if (this.discs[i].hitPoints > 0 && !this.discs[i].dead) {
          this.currentTurnIndex = i;
          this.currentDisc = this.discs[i];
          this.logCurrentTurn();
          break;
        }
      }
    }
  }

  addEventListeners() {
    window.addEventListener("pointerdown", (event) =>
      this.onPointerDown(event),
    );
    window.addEventListener("pointermove", (event) =>
      this.onPointerMove(event),
    );
    window.addEventListener("pointerup", (event) => this.onPointerUp(event));
  }

  onPointerDown(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);

    this.pointerDisc = null;

    for (const d of this.discs) {
      const intersects = this.raycaster.intersectObject(d.mesh);
      if (intersects.length > 0) {
        this.pointerDisc = d;
        break;
      }
    }

    // Log which disc was under mouse and current disc
    if (this.pointerDisc) {
      // logging removed
    } else {
      // logging removed
    }

    // Only allow interaction if pointerDisc matches currentDisc
    if (this.pointerDisc && this.pointerDisc === this.currentDisc) {
      this.controlsEnabled = false;
      this.controls.enabled = false;
      this.pointerDownPos = { x: event.clientX, y: event.clientY };
      this.throwInfoDiv.style.visibility = "visible";
      this.throwInfoDiv.textContent = "Magnitude: 0 Angle: 0°";

      // Initialize throw direction line previous positions to disc position to prevent jump
      if (this.throwDirectionLine && this.pointerDisc) {
        this._prevLineStart = new THREE.Vector3(
          this.pointerDisc.mesh.position.x,
          this.pointerDisc.mesh.position.y + this.pointerDisc.height / 2,
          this.pointerDisc.mesh.position.z,
        );
        this._prevLineEnd = new THREE.Vector3(
          this.pointerDisc.mesh.position.x,
          this.pointerDisc.mesh.position.y + this.pointerDisc.height / 2,
          this.pointerDisc.mesh.position.z,
        );
      }
    } else {
      this.controlsEnabled = true;
      this.controls.enabled = true;
      this.pointerDownPos = null;
      this.throwInfoDiv.style.visibility = "hidden";
      this.throwInfoDiv.textContent = "";
    }
    this.isPointerDown = true;
  }

  onPointerMove(event) {
    if (!this.isPointerDown || !this.pointerDownPos) return;

    const deltaX = event.clientX - this.pointerDownPos.x;
    const deltaY = event.clientY - this.pointerDownPos.y;

    const dragLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (dragLength > 0) {
      const angleRadians = Math.atan2(-deltaY, deltaX);
      let angleDegrees = angleRadians * (180 / Math.PI);
      if (angleDegrees < 0) angleDegrees += 360;

      this.throwInfoDiv.textContent = `Magnitude: ${dragLength.toFixed(1)} Angle: ${angleDegrees.toFixed(1)}°`;

      // Update throw direction line
      if (this.pointerDisc && this.throwDirectionLine) {
        const normX = deltaX / dragLength;
        const normY = deltaY / dragLength;

        const forward = new THREE.Vector3();
        this.camera.getWorldDirection(forward);
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

        const maxLineLength = 8;
        const lineLength = Math.min(dragLength / 10, 1) * maxLineLength;

        const startPos = this.pointerDisc.mesh.position.clone();
        const endPos = startPos
          .clone()
          .add(direction.multiplyScalar(lineLength));

        const positions = this.throwDirectionLine.geometry.attributes.position;

        // Initialize previous positions if not present
        if (!this._prevLineStart) {
          this._prevLineStart = new THREE.Vector3(
            startPos.x,
            startPos.y + this.pointerDisc.height / 2,
            startPos.z,
          );
        }
        if (!this._prevLineEnd) {
          this._prevLineEnd = new THREE.Vector3(
            endPos.x,
            endPos.y + this.pointerDisc.height / 2,
            endPos.z,
          );
        }

        // Lerp previous positions towards current positions for smooth movement
        this._prevLineStart.lerp(
          new THREE.Vector3(
            startPos.x,
            startPos.y + this.pointerDisc.height / 2,
            startPos.z,
          ),
          0.2,
        );
        this._prevLineEnd.lerp(
          new THREE.Vector3(
            endPos.x,
            endPos.y + this.pointerDisc.height / 2,
            endPos.z,
          ),
          0.2,
        );

        positions.setXYZ(
          0,
          this._prevLineStart.x,
          this._prevLineStart.y,
          this._prevLineStart.z,
        );
        positions.setXYZ(
          1,
          this._prevLineEnd.x,
          this._prevLineEnd.y,
          this._prevLineEnd.z,
        );
        positions.needsUpdate = true;

        this.throwDirectionLine.visible = true;
      }
    } else {
      this.throwInfoDiv.textContent = "Magnitude: 0 Angle: 0°";
      if (this.throwDirectionLine) {
        this.throwDirectionLine.visible = false;
      }
    }
  }

  onPointerUp(event) {
    if (!this.isPointerDown) return;
    this.isPointerDown = false;
    this.controls.enabled = true;
    if (this.throwInfoDiv) {
      this.throwInfoDiv.style.visibility = "hidden";
      this.throwInfoDiv.textContent = "";
    }
    if (this.throwDirectionLine) {
      this.throwDirectionLine.visible = false;
    }

    // Block throw input while waiting for disc to stop
    if (this.waitingForDiscToStop) {
      this.pointerDownPos = null;
      this.pointerDisc = null;
      return;
    }

    if (this.pointerDownPos !== null && this.pointerDisc) {
      if (this.pointerDisc.dead) {
        // Do not throw the disc if it is dead
        this.pointerDownPos = null;
        this.pointerDisc = null;
        return;
      }

      // Prevent throwing if current disc has already thrown
      if (this.currentDisc && this.currentDisc.hasThrown) {
        this.pointerDownPos = null;
        this.pointerDisc = null;
        return;
      }

      const deltaX = event.clientX - this.pointerDownPos.x;
      const deltaY = event.clientY - this.pointerDownPos.y;

      const dragLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const dragThreshold = 2; // Lower threshold to allow shorter drags
      const minSpeed = 0.05; // Minimum throw speed

      if (dragLength > dragThreshold) {
        const sensitivity = 1; // Sensitivity factor, less than 1 for finer control
        const adjustedLength = dragLength * sensitivity;
        const normX = deltaX / dragLength;
        const normY = deltaY / dragLength;

        const forward = new THREE.Vector3();
        this.camera.getWorldDirection(forward);
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

        const maxSpeed = 1;
        const normLength = Math.min(adjustedLength / 10, 1);
        const scaledLength = normLength * normLength;
        let speed = maxSpeed * scaledLength;
        if (speed < minSpeed) speed = minSpeed;

        this.pointerDisc.velocity.set(
          directionX * speed,
          0,
          directionZ * speed,
        );
        this.pointerDisc.moving = true;
        this.pointerDisc.hasThrown = true;
        this.waitingForDiscToStop = true;
      }
    }
    this.pointerDownPos = null;
  }

  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.level.rotation.x = -Math.PI / 2;
    this.createWalls();

    this.discs.forEach((disc) => {
      disc.mesh.position.x = this.clamp(
        disc.mesh.position.x,
        -this.level.fieldWidth / 2 + disc.radius,
        this.level.fieldWidth / 2 - disc.radius,
      );
      disc.mesh.position.z = this.clamp(
        disc.mesh.position.z,
        -this.level.fieldDepth / 2 + disc.radius,
        this.level.fieldDepth / 2 - disc.radius,
      );
    });
  }

  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  createWalls() {
    this.level.createWalls();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.controls) {
      this.controls.update();
    }

    if (this.currentDisc) {
      // Remove pulsing height animation, reset scale and position.y to default
      this.currentDisc.mesh.scale.set(1, 1, 1);
      this.currentDisc.mesh.position.y = this.currentDisc.basePositionY;

      if (this.currentDisc.edgeHelper) {
        this.currentDisc.edgeHelper.position.copy(
          this.currentDisc.mesh.position,
        );
        this.currentDisc.edgeHelper.rotation.copy(
          this.currentDisc.mesh.rotation,
        );
        this.currentDisc.edgeHelper.scale.copy(this.currentDisc.mesh.scale);
      }

      // Set dead disc appearance (gray and semi-transparent)
      this.discs.forEach((disc) => {
        if (disc.dead) {
          disc.mesh.material.color.set(0x888888); // gray color
          disc.mesh.material.opacity = 0.4;
          disc.mesh.material.transparent = true;
        } else {
          disc.mesh.material.color.set(disc.mesh.material.color.getHex());
          disc.mesh.material.opacity = 0.9;
          disc.mesh.material.transparent = false;
        }
      });
    }

    // Update and move all discs
    this.discs.forEach((d) => {
      if (d.moving) {
        d.updatePosition();

        // Handle collisions with outer walls
        d.handleWallCollision(
          this.level.fieldWidth,
          this.level.fieldDepth,
          0.8,
        );

        // Handle collisions with all walls including internal
        const walls = this.level.getAllWalls();
        walls.forEach((wall) => {
          d.handleCollisionWithBox(wall, 0.8);
        });

        d.applyFriction(0.98);
      }
    });

    // Collision detection and response between discs (pairwise)
    const minDist = this.discs.length > 0 ? this.discs[0].radius * 2 : 0;
    let colliding = false;

    for (let i = 0; i < this.discs.length; i++) {
      const d1 = this.discs[i];

      for (let j = i + 1; j < this.discs.length; j++) {
        const d2 = this.discs[j];
        const diff = d1.mesh.position.clone().sub(d2.mesh.position.clone());
        const dist = diff.length();

        const minDist = d1.radius + d2.radius;

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

            // Only allow damage if one disc is currentDisc and the other is hit disc
            if (d1 === this.currentDisc && d2.hitPoints > 0) {
              d2.takeHit();
            } else if (d2 === this.currentDisc && d1.hitPoints > 0) {
              d1.takeHit();
            }

            const overlap = minDist - dist;
            d1.mesh.position.add(normal.clone().multiplyScalar(overlap * 0.5));
            d2.mesh.position.sub(normal.clone().multiplyScalar(overlap * 0.5));
          }
        }
      }
    }

    if (this.renderer) {
      this.renderer.render(this.scene, this.camera);
    }

    // Update disc names display
    this.updateDiscNames();

    // Check if we are waiting for disc to stop moving and act accordingly
    if (this.waitingForDiscToStop && this.currentDisc) {
      const velocityLength = this.currentDisc.velocity.length();
      if (velocityLength < 0.01 && !this.currentDisc.moving) {
        this.waitingForDiscToStop = false;
        this.advanceTurn();
      }
    }
  }

  updateDiscNames() {
    const discNamesList = document.getElementById("disc-names-list");
    if (!discNamesList) return;

    // Clear current list
    discNamesList.innerHTML = "";

    // Add all discs with their name and hit points status
    this.discs.forEach((disc) => {
      const li = document.createElement("li");
      const hitPointsText =
        disc.hitPoints <= 0 ? "(Dead)" : `(HP: ${disc.hitPoints})`;
      if (disc === this.currentDisc) {
        li.style.fontWeight = "bold";
      } else {
        li.style.opacity = "0.5";
      }
      li.textContent = `${disc.discName} ${hitPointsText}`;
      if (disc.hitPoints <= 0 || disc.dead) {
        li.style.color = "gray";
        li.style.opacity = "0.5";
      }
      discNamesList.appendChild(li);
    });
  }

  advanceTurn() {
    if (this.currentDisc) {
      // Remove highlight from current disc before advancing
      if (this.currentDisc.mesh && this.currentDisc.mesh.material) {
        this.currentDisc.mesh.material.emissive.set(0x000000);
      }
      // Find next disc index with hitPoints > 0 and not dead
      let nextIndex = (this.currentTurnIndex + 1) % this.discs.length;
      let attempts = 0;
      while (
        (this.discs[nextIndex].hitPoints <= 0 || this.discs[nextIndex].dead) &&
        attempts < this.discs.length
      ) {
        nextIndex = (nextIndex + 1) % this.discs.length;
        attempts++;
      }

      // Reset hasThrown for new currentDisc so it can be thrown
      this.discs[nextIndex].hasThrown = false;

      this.currentTurnIndex = nextIndex;
      this.currentDisc = this.discs[nextIndex];
      this.logCurrentTurn();
    }
  }
}

window.gameController = window.gameController || new GameController();
window.gameController.init();
