import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Level from "./Level.js";
import Disc from "./Disc.js";

let instance = null;

export default class GameController {
  constructor() {
    if (instance) return instance;
    instance = this;

    // Core Three.js scene components
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    // Game level and discs
    this.level = null;
    this.discs = [];

    // Turn-based game state
    this.currentTurnIndex = 0;
    this._currentDisc = null;

    // Input and interaction state
    this.raycaster = null;
    this.mouse = new THREE.Vector2();
    this.controlsEnabled = true;
    this.isPointerDown = false;
    this.pointerDownPos = null;
    this.pointerDisc = null;

    // UI elements
    this.throwInfoDiv = null;
    this.fpsDisplayElement = null; // For FPS counter

    // FPS calculation
    this.fpsFrameCount = 0;
    this.fpsLastTime = performance.now(); // For calculating delta time
    this.fpsLastUpdateTime = performance.now(); // For timing FPS display updates
    this.fpsUpdateInterval = 1000; // Update display every 1 second (in ms)

    // Visual helpers
    this.throwDirectionLine = null;
    this._prevLineStart = null;
    this._prevLineEnd = null;

    // Game state flags
    this.waitingForDiscToStop = false;
    this.playerDamagedNPCsThisThrow = new Set(); // Tracks NPCs damaged by player in the current throw

    // Panning controls state
    this.panningKeys = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    this.panSpeed = 0.5;

    // Setup event listeners and start animation loop
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" || event.key === "Esc") {
        if (this.isPointerDown) {
          this.isPointerDown = false;
          this.pointerDownPos = null;
          this.pointerDisc = null;
          this.controls.enabled = true;
          if (this.throwInfoDiv) {
            this.throwInfoDiv.style.visibility = "hidden";
            this.throwInfoDiv.textContent = "";
          }
          if (this.throwDirectionLine) {
            this.throwDirectionLine.visible = false;
          }
        }
      }

      // Handle panning controls
      switch(event.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          this.panningKeys.up = true;
          break;
        case 's':
        case 'arrowdown':
          this.panningKeys.down = true;
          break;
        case 'a':
        case 'arrowleft':
          this.panningKeys.left = true;
          break;
        case 'd':
        case 'arrowright':
          this.panningKeys.right = true;
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      // Handle panning controls release
      switch(event.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          this.panningKeys.up = false;
          break;
        case 's':
        case 'arrowdown':
          this.panningKeys.down = false;
          break;
        case 'a':
        case 'arrowleft':
          this.panningKeys.left = false;
          break;
        case 'd':
        case 'arrowright':
          this.panningKeys.right = false;
          break;
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
    // Update spotlight intensities for all discs
    this.discs.forEach(disc => {
      disc.setSpotlightIntensity(disc === value);
    });

    this._currentDisc = value;
  }

  logCurrentTurn() {
    // Stub method to avoid undefined error
  }

  init() {
    // Initialize scene and rendering
    this.scene = new THREE.Scene();

    // Setup camera with 60 degree FOV, aspect ratio, near & far planes
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    // Position camera to get approx 60 degree downward tilt to encompass field
    const distance = 40; // DO NOT CHANGE THE DISTANCE GOD DAMNIT
    const angleRadians = Math.PI / 3; // 60 degrees
    const y = distance * Math.sin(angleRadians);
    const z = distance * Math.cos(angleRadians);
    this.camera.position.set(0, y, z);
    this.camera.lookAt(0, 0, 0);

    // Setup renderer and add canvas to DOM
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Setup orbit controls for camera interaction
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    // Load the level and walls
    this.level = new Level(this.scene);
    this.level.load();

    // Initialize disc array and turn index
    this.discs = [];
    this.currentTurnIndex = 0;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.controlsEnabled = true;
    this.isPointerDown = false;
    this.pointerDownPos = null;
    this.pointerDisc = null;

    // Setup throw info UI element
    this.throwInfoDiv = document.getElementById("throw-info");
    this.fpsDisplayElement = document.getElementById("fps-counter"); // Assign FPS display element

    this.addEventListeners();

    // Initialize throw direction line helper for drag aim visualization
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2,
    });
    const vertices = new Float32Array(6); // 2 vertices * 3 coords each
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.setDrawRange(0, 2);
    this.throwDirectionLine = new THREE.Line(geometry, material);
    this.throwDirectionLine.visible = false;
    this.scene.add(this.throwDirectionLine);

    // Initialize discs for gameplay
    this.initDiscs();

    // Setup "Rage!" button listener
    const rageButton = document.getElementById('rage-button');
    if (rageButton) {
      // Find the player disc instance - ensure this runs after discs are initialized
      const playerDisc = this.discs.find(disc => disc.type === 'player');

      if (playerDisc) {
        rageButton.addEventListener('click', () => {
          if (!playerDisc.dead) { // Only allow rage if player is not dead
            playerDisc.rageIsActiveForNextThrow = true;
            console.log("Rage armed for Barbarian!");
            // TODO: Optionally disable button or change text here
            // For example: rageButton.disabled = true;
            // rageButton.textContent = "Rage Armed!";
          } else {
            console.log("Cannot use Rage: Barbarian is dead.");
          }
          this.updateRageButtonVisibility();
        });
      } else {
        console.warn("Rage Button: Player disc not found to assign Rage ability.");
      }
    } else {
      console.warn("Rage Button: Element with ID 'rage-button' not found.");
    }
    this.updateRageButtonVisibility(); // Initial check for Rage button visibility
  }

  // Helper method to check if a position is valid (not inside obstacles)
  isPositionValid(x, z, discRadius) {
    const padding = discRadius + 0.5; // Extra padding for safety

    // Check field boundaries
    if (x - padding < -this.level.fieldWidth / 2 || x + padding > this.level.fieldWidth / 2) {
      return false;
    }
    if (z - padding < -this.level.fieldDepth / 2 || z + padding > this.level.fieldDepth / 2) {
      return false;
    }

    // Check internal wall 1: x around -fieldWidth/6, z from -fieldDepth/2 + 0.25 to -fieldDepth/2 + 13 + 0.25
    const internal1X = -this.level.fieldWidth / 6;
    const internal1ZStart = -this.level.fieldDepth / 2 + 0.25;
    const internal1ZEnd = internal1ZStart + 13;
    if (Math.abs(x - internal1X) < padding && z >= internal1ZStart - padding && z <= internal1ZEnd + padding) {
      return false;
    }

    // Check internal wall 2: x around fieldWidth/6, z from fieldDepth/2 - 13 - 0.25 to fieldDepth/2 - 0.25
    const internal2X = this.level.fieldWidth / 6;
    const internal2ZEnd = this.level.fieldDepth / 2 - 0.25;
    const internal2ZStart = internal2ZEnd - 13;
    if (Math.abs(x - internal2X) < padding && z >= internal2ZStart - padding && z <= internal2ZEnd + padding) {
      return false;
    }

    // Check obstacle 1: centered at (-10, 8) with size 6x6
    const obs1X = -10, obs1Z = 8, obsSize = 6;
    if (Math.abs(x - obs1X) < obsSize / 2 + padding && Math.abs(z - obs1Z) < obsSize / 2 + padding) {
      return false;
    }

    // Check obstacle 2: centered at (10, -8) with size 6x6
    const obs2X = 10, obs2Z = -8;
    if (Math.abs(x - obs2X) < obsSize / 2 + padding && Math.abs(z - obs2Z) < obsSize / 2 + padding) {
      return false;
    }

    return true;
  }

  initDiscs() {
    // *** DO NOT REMOVE THESE PARAMETER COMMENTS ***
    // Create discs with explicit parameters:
    // (radius, height, color, startX, startZ, scene, discName, type, kind, hitPoints, skillLevel, imagePath, canDoReboundDamage, throwPowerMultiplier, mass, rageIsActiveForNextThrow)

    // Helper function to generate random positions for NPC discs
    const generateRandomPosition = (discRadius, existingPositions, minDistance = 4) => {
      const maxAttempts = 100;
      let attempts = 0;

      while (attempts < maxAttempts) {
        // Generate random position within field bounds, accounting for disc radius
        const x = (Math.random() - 0.5) * (this.level.fieldWidth - discRadius * 4);
        const z = (Math.random() - 0.5) * (this.level.fieldDepth - discRadius * 4);

        // Check if position conflicts with obstacles
        if (this.isPositionValid(x, z, discRadius)) {
          // Check distance from existing discs
          let validDistance = true;
          for (const pos of existingPositions) {
            const distance = Math.sqrt((x - pos.x) ** 2 + (z - pos.z) ** 2);
            if (distance < minDistance) {
              validDistance = false;
              break;
            }
          }

          if (validDistance) {
            return { x, z };
          }
        }

        attempts++;
      }

      // Fallback to original positions if random generation fails
      console.warn("Could not find valid random position, using fallback");
      return null;
    };

    // Create player disc at center position
    const disc1 = new Disc(
      /* radius: */ 2.0,
      /* height: */ 0.6,
      /* color: */ 0x0088ff,
      /* startX: */ 0,
      /* startZ: */ 0,
      /* scene: */ this.scene,
      /* discName: */ "player",
      /* type: */ "player",
      /* kind: */ "Barbarian",
      /* hitPoints: */ 5,
      /* skillLevel: */ 100,
      /* imagePath: */ "images/barbarian-nobg.png",
      /* canDoReboundDamage: */ false,
      /* throwPowerMultiplier: */ 1.3,
      /* mass: */ 1.5,
      /* rageIsActiveForNextThrow: */ false
    );

    const existingPositions = [{ x: 0, z: 0 }];

    // Generate random positions for NPC discs
    const npcData = [
      { name: "skeleton1", color: 0xff0000, skillLevel: 80, kind: "Skeleton" },
      { name: "skeleton2", color: 0xffff00, skillLevel: 80, kind: "Skeleton" },
      { name: "skeleton3", color: 0xff8800, skillLevel: 80, kind: "Skeleton" },
      { name: "skeleton4", color: 0x8800ff, skillLevel: 80, kind: "Skeleton" }
    ];

    const npcDiscs = [];
    for (const npc of npcData) {
      const position = generateRandomPosition(1.5, existingPositions);
      const finalX = position ? position.x : (Math.random() - 0.5) * this.level.fieldWidth * 0.7;
      const finalZ = position ? position.z : (Math.random() - 0.5) * this.level.fieldDepth * 0.7;

      const disc = new Disc(
        /* radius: */ 1.5,
        /* height: */ 0.6,
        /* color: */ npc.color,
        /* startX: */ finalX,
        /* startZ: */ finalZ,
        /* scene: */ this.scene,
        /* discName: */ npc.name,
        /* type: */ "NPC",
        /* kind: */ npc.kind,
        /* hitPoints: */ 2,
        /* skillLevel: */ npc.skillLevel,
        /* imagePath: */ "images/skeleton-nobg.png",
        /* canDoReboundDamage: */ false,
        /* throwPowerMultiplier: */ .7, // don't fucking change this value
        /* mass: */ 0.7,
        /* rageIsActiveForNextThrow: */ false
      );

      npcDiscs.push(disc);
      existingPositions.push({ x: finalX, z: finalZ });
    }

    this.discs.push(disc1, ...npcDiscs);

    // Initialize all spotlight intensities to inactive state
    this.discs.forEach(disc => {
      disc.setSpotlightIntensity(false);
    });

    // Set turn to first alive player disc or fallback alive disc
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

    for (const disc of this.discs) {
      const intersects = this.raycaster.intersectObject(disc.mesh);
      if (intersects.length > 0) {
        this.pointerDisc = disc;
        break;
      }
    }

    // Only allow interaction if pointerDisc matches currentDisc AND it's a player disc
    if (
      this.pointerDisc &&
      this.pointerDisc === this.currentDisc &&
      this.currentDisc.type === "player"
    ) {
      this.controlsEnabled = false;
      this.controls.enabled = false;
      this.pointerDownPos = { x: event.clientX, y: event.clientY };
      if (this.throwInfoDiv) {
        this.throwInfoDiv.style.visibility = "visible";
        this.throwInfoDiv.textContent = "Magnitude: 0 Angle: 0°";
      }

      // Initialize throw direction line previous positions to disc position
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
      if (this.throwInfoDiv) {
        this.throwInfoDiv.style.visibility = "hidden";
        this.throwInfoDiv.textContent = "";
      }

      // Provide feedback if player tries to interact with NPC disc
      if (this.pointerDisc && this.pointerDisc.type === "NPC") {
        console.log("Cannot control NPC disc - AI controlled");
      }
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
      if (this.throwInfoDiv) {
        this.throwInfoDiv.textContent = `Magnitude: ${dragLength.toFixed(1)} Angle: ${angleDegrees.toFixed(1)}°`;
      }

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
        direction.add(cameraRight.multiplyScalar(normX));
        direction.add(forward.multiplyScalar(-normY));
        direction.normalize();
        direction.negate();

        const maxLineLength = 10;
        const lineLength = Math.min(dragLength / 10, 1) * maxLineLength;

        const startPos = this.pointerDisc.mesh.position.clone();
        const endPos = startPos
          .clone()
          .add(direction.multiplyScalar(lineLength));

        const positions = this.throwDirectionLine.geometry.attributes.position;

        // Initialize previous positions if not set
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

        // Lerp previous positions for smooth motion
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
      if (this.throwInfoDiv) {
        this.throwInfoDiv.textContent = "Magnitude: 0 Angle: 0°";
      }
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

    if (this.waitingForDiscToStop) {
      this.pointerDownPos = null;
      this.pointerDisc = null;
      return;
    }

    if (this.pointerDownPos !== null && this.pointerDisc) {
      if (this.pointerDisc.dead) {
        this.pointerDownPos = null;
        this.pointerDisc = null;
        return;
      }

      if (this.currentDisc && this.currentDisc.hasThrown) {
        this.pointerDownPos = null;
        this.pointerDisc = null;
        return;
      }

      // Additional safety check: only allow throwing player discs
      if (this.pointerDisc.type !== "player") {
        console.log("Cannot throw NPC disc - player discs only");
        this.pointerDownPos = null;
        this.pointerDisc = null;
        return;
      }

      const deltaX = event.clientX - this.pointerDownPos.x;
      const deltaY = event.clientY - this.pointerDownPos.y;
      const dragLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const dragThreshold = 2;
      const minSpeed = 0.05;
      if (dragLength > dragThreshold) {
        const sensitivity = 1;
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
        direction.add(cameraRight.multiplyScalar(normX));
        direction.add(forward.multiplyScalar(-normY));
        direction.normalize();
        direction.negate();

        const directionX = direction.x;
        const directionZ = direction.z;

        let actualThrowPowerMultiplier = this.pointerDisc.throwPowerMultiplier; // Start with the base multiplier

        if (this.pointerDisc.rageIsActiveForNextThrow) {
          console.log("RAGE MODE ACTIVE! Applying 5x power multiplier for this throw.");
          actualThrowPowerMultiplier *= 5;
          this.pointerDisc.rageIsActiveForNextThrow = false; // Consume Rage
          this.pointerDisc.canDoReboundDamage = true; // Enable rebound damage for this throw
          this.pointerDisc.rageWasUsedThisThrow = true; // Set flag for later reset
          console.log(`RAGE: ${this.pointerDisc.discName} can now do rebound damage for this throw.`);
          this.updateRageButtonVisibility(); // Update button state after Rage is consumed

          // Optional: Reset Rage button state (e.g., re-enable, change text)
          // const rageButton = document.getElementById('rage-button');
          // if (rageButton) {
          //   rageButton.disabled = false;
          //   rageButton.textContent = "Rage!";
          // }
        }

        const maxSpeed = 1;
        const normLength = Math.min(adjustedLength / 10, 1);
        const scaledLength = normLength * normLength;
        // Use the (potentially rage-boosted) actualThrowPowerMultiplier
        let speed = (maxSpeed * scaledLength * actualThrowPowerMultiplier) / this.pointerDisc.mass;
        if (speed < minSpeed) speed = minSpeed;

        this.pointerDisc.velocity.set(
          directionX * speed,
          0,
          directionZ * speed,
        );
        this.pointerDisc.moving = true;
        this.pointerDisc.hasThrown = true;
        this.pointerDisc.resetDamageState();
        this.playerDamagedNPCsThisThrow.clear(); // Clear the set for the new throw
        this.waitingForDiscToStop = true;
      }
    }
    this.pointerDownPos = null;
  }

  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    if (this.level) {
      // this.level.rotation.x = -Math.PI / 2; // Problematic: Level instance doesn't have rotation
    }
    // this.createWalls(); // Problematic: Level class does not have createWalls method, and walls shouldn't be recreated on resize

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
    console.log("Animate function called..."); // Safari debug

    // FPS calculation
    this.fpsFrameCount++;
    const now = performance.now();
    const elapsedSinceLastUpdate = now - this.fpsLastUpdateTime;

    if (elapsedSinceLastUpdate >= this.fpsUpdateInterval) {
      console.log(`FPS Debug: Frames = ${this.fpsFrameCount}, Elapsed = ${elapsedSinceLastUpdate.toFixed(2)}ms, Raw FPS = ${(this.fpsFrameCount * 1000 / elapsedSinceLastUpdate).toFixed(2)}`);
      const fps = Math.round((this.fpsFrameCount * 1000) / elapsedSinceLastUpdate);
      if (this.fpsDisplayElement) {
        this.fpsDisplayElement.textContent = `FPS: ${fps}`;
      }
      this.fpsFrameCount = 0;
      this.fpsLastUpdateTime = now;
    }

    if (this.controls) {
      this.controls.update();
    }

    // Handle camera panning with WASD and arrow keys
    if (this.panningKeys.up || this.panningKeys.down || this.panningKeys.left || this.panningKeys.right) {
      // Get the camera's forward and right vectors
      const forward = new THREE.Vector3();
      const right = new THREE.Vector3();

      this.camera.getWorldDirection(forward);
      forward.y = 0; // Keep panning horizontal
      forward.normalize();

      right.crossVectors(forward, new THREE.Vector3(0, 1, 0));
      right.normalize();

      // Calculate panning movement
      const panVector = new THREE.Vector3();

      if (this.panningKeys.up) {
        panVector.add(forward.clone().multiplyScalar(this.panSpeed));
      }
      if (this.panningKeys.down) {
        panVector.add(forward.clone().multiplyScalar(-this.panSpeed));
      }
      if (this.panningKeys.left) {
        panVector.add(right.clone().multiplyScalar(-this.panSpeed));
      }
      if (this.panningKeys.right) {
        panVector.add(right.clone().multiplyScalar(this.panSpeed));
      }

      // Apply panning to both camera and controls target
      this.camera.position.add(panVector);
      this.controls.target.add(panVector);
      this.controls.update();
    }

    if (this.currentDisc) {
      // Reset current disc scale and position.y
      this.currentDisc.mesh.scale.set(1, 1, 1);
      this.currentDisc.mesh.position.y = this.currentDisc.basePositionY;



      // Update disc appearance for dead discs
      this.discs.forEach((disc) => {
        if (disc.dead) {
          // Handle both group and single mesh structures
          if (disc.mesh.isGroup) {
            disc.mesh.children.forEach(child => {
              if (child.material) {
                if (child.material.color) child.material.color.set(0x888888);
                child.material.opacity = 0.4;
                child.material.transparent = true;
              }
            });
          } else {
            disc.mesh.material.color.set(0x888888);
            disc.mesh.material.opacity = 0.4;
            disc.mesh.material.transparent = true;
          }
        } else {
          // Handle both group and single mesh structures
          if (disc.mesh.isGroup) {
            disc.mesh.children.forEach(child => {
              if (child.material) {
                if (child.material.color) child.material.color.set(child.material.color.getHex());
                child.material.opacity = 0.9;
                child.material.transparent = false;
              }
            });
          } else {
            disc.mesh.material.color.set(disc.mesh.material.color.getHex());
            disc.mesh.material.opacity = 0.9;
            disc.mesh.material.transparent = false;
          }
        }
      });
    }

    // Update and move discs
    this.discs.forEach((disc) => {
      if (disc.moving) {
        disc.updatePosition();

        disc.handleWallCollision(
          this.level.fieldWidth,
          this.level.fieldDepth,
          0.8,
        );

        const walls = this.level.getAllWalls();
        walls.forEach((wall) => {
          disc.handleCollisionWithBox(wall, 0.8);
        });

        disc.applyFriction(0.96);
      }
    });

    // Disc-to-disc collisions
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
          normal.y = 0;
          normal.normalize();

          const relativeVelocity = d1.velocity.clone().sub(d2.velocity);
          const velocityAlongNormal = relativeVelocity.dot(normal);

          if (velocityAlongNormal <= 0) {
            const restitution = 1; // Coefficient of restitution
            // Calculate impulse magnitude considering individual masses
            const impulseMagnitude = (-(1 + restitution) * velocityAlongNormal) / (1 / d1.mass + 1 / d2.mass);

            // Apply impulse to each disc according to its mass
            // The 'normal' vector points from d2 towards d1
            d1.velocity.add(normal.clone().multiplyScalar(impulseMagnitude / d1.mass));
            d2.velocity.sub(normal.clone().multiplyScalar(impulseMagnitude / d2.mass));

            d1.moving = true;
            d2.moving = true;

            // Apply damage rules
            if (d1.hitPoints > 0 && d2.hitPoints > 0 && !d1.dead && !d2.dead) { // Ensure both discs are alive and not dead
                // Case 1: d1 is the current acting disc
                if (d1 === this.currentDisc) {
                    if (d1.type === "player" && d2.type === "NPC") {
                        // Player (d1) hits NPC (d2) - Rage allows multiple hits on the same NPC
                        if (d1.canDoReboundDamage || !this.playerDamagedNPCsThisThrow.has(d2.discName)) {
                            d2.takeHit();
                            // Only add to set if not raging (to allow multiple rage hits on the same NPC).
                            // For non-rage hits, this preserves the "one damage instance per NPC per throw" rule.
                            if (!d1.canDoReboundDamage) {
                                this.playerDamagedNPCsThisThrow.add(d2.discName);
                            }
                        }
                    } else if (!(d1.type === "NPC" && d2.type === "NPC")) {
                        // Player-Player, or NPC-Player (where d1 is the actor)
                        // Use original logic: only first collision causes damage unless canDoReboundDamage is true
                        if (!d1.hasCausedDamage || d1.canDoReboundDamage) {
                            d2.takeHit();
                            d1.hasCausedDamage = true;
                        }
                    }
                }
                // Case 2: d2 is the current acting disc
                else if (d2 === this.currentDisc) {
                    if (d2.type === "player" && d1.type === "NPC") {
                        // Player (d2) hits NPC (d1) - Rage allows multiple hits on the same NPC
                        if (d2.canDoReboundDamage || !this.playerDamagedNPCsThisThrow.has(d1.discName)) {
                            d1.takeHit();
                            // Only add to set if not raging.
                            if (!d2.canDoReboundDamage) {
                                this.playerDamagedNPCsThisThrow.add(d1.discName);
                            }
                        }
                    } else if (!(d2.type === "NPC" && d1.type === "NPC")) {
                        // Player-Player, or NPC-Player (where d2 is the actor)
                        // Use original logic
                        if (!d2.hasCausedDamage || d2.canDoReboundDamage) {
                            d1.takeHit();
                            d2.hasCausedDamage = true;
                        }
                    }
                }
            }

            const overlap = minDist - dist;
            d1.mesh.position.add(normal.clone().multiplyScalar(overlap * 0.5));
            d2.mesh.position.sub(normal.clone().multiplyScalar(overlap * 0.5));
          }
        }
      }
    }

    // Animate torch flickering
    if (this.level) {
      this.level.animateTorches();
    }

    if (this.renderer) {
      this.renderer.render(this.scene, this.camera);
    }

    this.updateDiscNames();

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

    discNamesList.innerHTML = "";

    this.discs.forEach((disc) => {
      const li = document.createElement("li");

      const colorCircle = document.createElement("span");
      colorCircle.style.display = "inline-block";
      colorCircle.style.width = "12px";
      colorCircle.style.height = "12px";
      colorCircle.style.marginRight = "8px";
      colorCircle.style.borderRadius = "50%";
      colorCircle.style.verticalAlign = "middle";
      // Handle both group and single mesh structures for color
      let colorHex;
      if (disc.mesh.isGroup) {
        // Find the base mesh (first child) for color
        const baseMesh = disc.mesh.children.find(child => child.material && child.material.color);
        colorHex = baseMesh ? baseMesh.material.color.getHexString() : "ffffff";
      } else {
        colorHex = disc.mesh.material.color.getHexString();
      }
      colorCircle.style.backgroundColor = "#" + colorHex;
      if (disc.hitPoints <= 0 || disc.dead) {
        colorCircle.style.backgroundColor = "gray";
      }
      li.appendChild(colorCircle);

      const hitPointsText =
        disc.hitPoints <= 0 ? "(Dead)" : `(HP: ${disc.hitPoints})`;

      if (disc === this.currentDisc) {
        li.style.fontWeight = "bold";
      } else {
        li.style.opacity = "0.5";
      }

      if (disc.hitPoints <= 0 || disc.dead) {
        li.style.color = "gray";
        li.style.opacity = "0.5";
      }

      li.appendChild(
        document.createTextNode(disc.discName + " " + hitPointsText),
      );
      discNamesList.appendChild(li);
    });
  }

  updateRageButtonVisibility() {
    const rageButton = document.getElementById('rage-button');
    if (!rageButton) {
      console.warn("Rage Button: Element with ID 'rage-button' not found for visibility update.");
      return;
    }

    const playerDisc = this.discs.find(d => d.type === 'player'); // Assuming there's only one player disc

    if (!playerDisc) {
      console.warn("Rage Button: Player disc not found for visibility update.");
      rageButton.style.display = 'none'; // Hide if no player disc
      return;
    }

    // Hide if player is dead OR Rage is already armed for the next throw
    if (playerDisc.dead || playerDisc.rageIsActiveForNextThrow) {
      rageButton.style.display = 'none';
    } else {
      rageButton.style.display = 'block'; // Or 'inline-block' or '' depending on original style
    }
  }

  async advanceTurn() {
    this.updateRageButtonVisibility(); // Update on turn change

    if (this.currentDisc) {
      // Handle both group and single mesh structures for emissive
      if (this.currentDisc.mesh.isGroup) {
        this.currentDisc.mesh.children.forEach(child => {
          if (child.material && child.material.emissive) {
            child.material.emissive.set(0x000000);
          }
        });
      } else if (this.currentDisc.mesh && this.currentDisc.mesh.material) {
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

      // Player vs AI control enforcement:
      // - Player discs (type "player"): controlled by user input/mouse interaction
      // - NPC discs (type "NPC"): controlled automatically by AI
      if (this.currentDisc.type === "NPC") {
        await this.aiThrow(this.currentDisc);
      }
    }
  }

  async aiThrow(disc) {
    if (!disc || disc.dead) return;

    // Get alive player discs as targets
    const alivePlayers = this.discs.filter(
      (d) => d.type === "player" && d.hitPoints > 0 && !d.dead,
    );
    if (alivePlayers.length === 0) return;

    // Select closest player disc as target
    let target = alivePlayers[0];
    let minDist = disc.mesh.position.distanceTo(target.mesh.position);
    for (let i = 1; i < alivePlayers.length; i++) {
      const dist = disc.mesh.position.distanceTo(alivePlayers[i].mesh.position);
      if (dist < minDist) {
        minDist = dist;
        target = alivePlayers[i];
      }
    }

    // Compute ideal direction towards target on horizontal plane
    const idealDir = target.mesh.position.clone().sub(disc.mesh.position);
    idealDir.y = 0;
    idealDir.normalize();

    // Function to check if a line segment intersects any wall
    const intersectsAnyWall = (start, end) => {
      const walls = this.level.getAllWalls();
      for (const wall of walls) {
        const box = new THREE.Box3().setFromObject(wall);

        // Calculate the closest point on box to the line segment
        const direction = end.clone().sub(start).normalize();
        const length = start.distanceTo(end);

        // Approximate by sampling points along the segment
        const steps = Math.ceil(length * 10); // sampling 10 points per unit length
        for (let i = 0; i <= steps; i++) {
          const point = start
            .clone()
            .add(direction.clone().multiplyScalar((length / steps) * i));
          if (box.containsPoint(point)) {
            return true;
          }
        }
      }
      return false;
    };

    // Calculate maximum allowed attempts to find a non-blocked throw direction
    const maxAttempts = 999;
    const maxFuzzDegrees = 15;
    const fuzzFactor = (100 - disc.skillLevel) / 100;

    let bestDir = idealDir;
    let bestSpeed =
      Math.min(minDist / 10, 1) * (0.7 + 0.3 * (disc.skillLevel / 100));
    let fuzzAngleRad = 0;
    let foundClearPath = false;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      // Apply fuzz rotation around Y axis
      fuzzAngleRad =
        (Math.random() * 2 - 1) * fuzzFactor * maxFuzzDegrees * (Math.PI / 180);
      const quat = new THREE.Quaternion();
      quat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), fuzzAngleRad);
      const fuzzedDir = idealDir.clone().applyQuaternion(quat).normalize();

      // Evaluate end position for this direction with speed
      const endPos = disc.mesh.position
        .clone()
        .add(fuzzedDir.clone().multiplyScalar(bestSpeed * 10)); // scaled distance for testing collision

      // Check for collision with walls
      if (!intersectsAnyWall(disc.mesh.position.clone(), endPos)) {
        bestDir = fuzzedDir;
        foundClearPath = true;
        break;
      }
    }

    if (!foundClearPath) {
      // No clear path found, proceed with fuzzedDir anyway (first attempt)
      const quat = new THREE.Quaternion();
      quat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), fuzzAngleRad);
      bestDir = idealDir.clone().applyQuaternion(quat).normalize();
    }

    // Set velocity for the throw
    const finalSpeed = (bestSpeed * disc.throwPowerMultiplier) / disc.mass;
    disc.velocity.set(bestDir.x * finalSpeed, 0, bestDir.z * finalSpeed);
    disc.moving = true;
    disc.hasThrown = true;
    disc.resetDamageState();
    this.waitingForDiscToStop = true;
  }
}

window.gameController = window.gameController || new GameController();
window.gameController.init();
