import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Level from './Level.js';
import Disc from './Disc.js';

export default class GameController {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x202025);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 15, 15);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    this.level = new Level(this.scene);
    this.level.load();

    this.discs = [];
    this.initDiscs();

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.controlsEnabled = true;
    this.isPointerDown = false;
    this.pointerDownPos = null;
    this.pointerDisc = null;

    this.throwInfoDiv = document.getElementById('throw-info');

    this.addEventListeners();

    window.addEventListener('resize', () => this.onWindowResize());
    this.animate = this.animate.bind(this);
    this.animate();
  }

  initDiscs() {
    const disc1 = new Disc(1.5, 0.5, 0x0088ff, -this.level.fieldWidth / 2 + 1.5 + 1.0, -this.level.fieldDepth / 2 + 1.5 + 1.0, this.scene);
    const disc2 = new Disc(2.0, 0.4, 0xff0000, this.level.fieldWidth / 2 - 2.0 - 1.0, this.level.fieldDepth / 2 - 2.0 - 1.0, this.scene);
    const disc3 = new Disc(1.0, 0.3, 0xffff00, 0, 0, this.scene);

    this.discs.push(disc1, disc2, disc3);
  }

  addEventListeners() {
    window.addEventListener('pointerdown', (event) => this.onPointerDown(event));
    window.addEventListener('pointermove', (event) => this.onPointerMove(event));
    window.addEventListener('pointerup', (event) => this.onPointerUp(event));

    this.controls.addEventListener('start', () => {
      if (!this.controlsEnabled) {
        this.controls.enabled = false;
      } else {
        this.controls.enabled = true;
      }
    });

    this.controls.addEventListener('end', () => {
      this.controls.enabled = true;
    });
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

    if (this.pointerDisc) {
      this.controlsEnabled = false;
      this.pointerDownPos = { x: event.clientX, y: event.clientY };
      this.throwInfoDiv.style.visibility = 'visible';
      this.throwInfoDiv.textContent = 'Magnitude: 0 Angle: 0°';
    } else {
      this.controlsEnabled = true;
      this.pointerDownPos = null;
      this.throwInfoDiv.style.visibility = 'hidden';
      this.throwInfoDiv.textContent = '';
    }
    this.isPointerDown = true;
  }

  onPointerMove(event) {
    if (!this.isPointerDown || this.pointerDownPos === null) return;

    const deltaX = event.clientX - this.pointerDownPos.x;
    const deltaY = event.clientY - this.pointerDownPos.y;

    const dragLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (dragLength > 0) {
      const angleRadians = Math.atan2(-deltaY, deltaX);
      let angleDegrees = angleRadians * (180 / Math.PI);
      if (angleDegrees < 0) angleDegrees += 360;

      this.throwInfoDiv.textContent = `Magnitude: ${dragLength.toFixed(1)} Angle: ${angleDegrees.toFixed(1)}°`;
    } else {
      this.throwInfoDiv.textContent = 'Magnitude: 0 Angle: 0°';
    }
  }

  onPointerUp(event) {
    if (!this.isPointerDown) return;
    this.isPointerDown = false;
    this.throwInfoDiv.style.visibility = 'hidden';
    this.throwInfoDiv.textContent = '';

    if (this.pointerDownPos !== null && this.pointerDisc) {
      const deltaX = event.clientX - this.pointerDownPos.x;
      const deltaY = event.clientY - this.pointerDownPos.y;

      const dragLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (dragLength > 5) {
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
        const speed = Math.min(dragLength / 10, 1) * maxSpeed;

        this.pointerDisc.velocity.set(directionX * speed, 0, directionZ * speed);
        this.pointerDisc.moving = true;
      }
    }
    this.pointerDownPos = null;
    this.pointerDisc = null;
  }

  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.field.rotation.x = -Math.PI / 2;
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
    this.controls.update();

    const substeps = 5;
    const deltaMoveFactor = 1 / substeps;

    for (let step = 0; step < substeps; step++) {
      // Update and move all discs
      this.discs.forEach((d) => {
        if (d.moving) {
          // Scale velocity for substep
          const substepVelocity = d.velocity.clone().multiplyScalar(deltaMoveFactor);
          d.mesh.position.add(substepVelocity);

          // Clamp position after movement to avoid overshoot
          d.mesh.position.x = this.clamp(
            d.mesh.position.x,
            -this.level.fieldWidth / 2 + d.radius,
            this.level.fieldWidth / 2 - d.radius,
          );
          d.mesh.position.z = this.clamp(
            d.mesh.position.z,
            -this.level.fieldDepth / 2 + d.radius,
            this.level.fieldDepth / 2 - d.radius,
          );

          d.handleWallCollision(this.level.fieldWidth, this.level.fieldDepth, 0.8);

          // Cap velocity magnitude to prevent tunneling
          const maxVelocity = 0.6;
          if (d.velocity.length() > maxVelocity) {
            d.velocity.setLength(maxVelocity);
          }

          d.applyFriction(0.98);
        }
      });

      // Collision detection and response between discs (pairwise)
      const minDist = this.discs.length > 0 ? this.discs[0].radius * 2 : 0;
      let colliding = false;

      for (let i = 0; i < this.discs.length; i++) {
        for (let j = i + 1; j < this.discs.length; j++) {
          const d1 = this.discs[i];
          const d2 = this.discs[j];
          const diff = new THREE.Vector3().subVectors(d1.mesh.position, d2.mesh.position);
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
            }
          }
        }
      }
    }

    this.renderer.render(this.scene, this.camera);
  }
}

new GameController();
