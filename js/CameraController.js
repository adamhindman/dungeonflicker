import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Owns the Three.js camera, renderer, OrbitControls, and all per-frame camera
 * behaviour: panning, smooth rotation, target clamping, and wall-fade.
 *
 * GameController keeps direct references (gc.camera / gc.renderer / gc.controls)
 * pointing at the same objects owned here, so all other code that addresses
 * gc.camera etc. continues to work without change.
 */
export class CameraController {
  constructor() {
    this.camera   = null;
    this.renderer = null;
    this.controls = null;

    // Stored at init time for recenterCamera()
    this.initialCameraPosition = null;
    this.initialCameraZoom     = null;
    this.initialControlsTarget = null;

    // Camera rotation driven by Q/E keys
    this.cameraRotationDirection = 0; // -1 | 0 | 1
    this.cameraRotationSpeed     = Math.PI / 135; // radians per frame

    // WASD / arrow-key panning
    this.panningKeys = { up: false, down: false, left: false, right: false };
    this.panSpeed    = 0.5;

    // Wall-fade raycaster (pre-allocated to avoid per-frame GC pressure)
    this._wallFadeRaycaster = null;
    this._wallFadeDir       = null;
  }

  /**
   * Create and configure camera, renderer, and controls.
   * Call once from GameController.init() after the DOM is ready.
   */
  init() {
    // ── Camera ──────────────────────────────────────────────────────────────
    // AI AGENT: Do not modify the following parameters unless explicitly instructed.
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    // Position camera to get approx 60 degree downward tilt to encompass field
    const distance     = 40; // DO NOT CHANGE THE DISTANCE GOD DAMNIT
    const angleRadians = Math.PI / 3; // 60 degrees
    const y = distance * Math.sin(angleRadians);
    const z = distance * Math.cos(angleRadians);
    this.camera.position.set(0, y, z);
    this.camera.lookAt(0, 0, 0);

    // Store initial values so recenterCamera() can restore them
    this.initialCameraPosition = this.camera.position.clone();
    this.initialCameraZoom     = this.camera.zoom;
    this.initialControlsTarget = new THREE.Vector3(0, 0, 0);

    // ── Renderer ────────────────────────────────────────────────────────────
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.localClippingEnabled = true; // Required for per-material clip planes (door slab)
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Wall-fade helpers (reused each frame to avoid allocation)
    this._wallFadeRaycaster = new THREE.Raycaster();
    this._wallFadeDir       = new THREE.Vector3();

    // ── OrbitControls ────────────────────────────────────────────────────────
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    this.controls.minDistance   = 6;
    this.controls.maxDistance   = 45;
    // Prevent camera from going below ~15 degrees from horizontal
    this.controls.maxPolarAngle = (Math.PI / 2) - (25 * Math.PI / 180);
  }

  /**
   * Per-frame camera update. Call from GameController.animate() after deltaTime
   * is computed but before physics and rendering.
   * @param {number}     deltaTime
   * @param {Level|null} level  — used for target clamping and wall-fade
   */
  update(deltaTime, level) {
    if (this.controls) {
      this.controls.update();
    }

    // ── Smooth rotation from Q/E keys ────────────────────────────────────────
    if (this.cameraRotationDirection !== 0 && this.controls && this.controls.enabled) {
      const offset = new THREE.Vector3().subVectors(
        this.controls.object.position,
        this.controls.target,
      );
      const spherical = new THREE.Spherical().setFromVector3(offset);
      spherical.theta += this.cameraRotationDirection * this.cameraRotationSpeed;
      spherical.makeSafe();
      offset.setFromSpherical(spherical);
      this.controls.object.position.copy(this.controls.target).add(offset);
      this.controls.update();
    }

    // ── WASD / arrow-key panning ──────────────────────────────────────────────
    if (this.panningKeys.up || this.panningKeys.down || this.panningKeys.left || this.panningKeys.right) {
      const forward = new THREE.Vector3();
      const right   = new THREE.Vector3();

      this.camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();

      right.crossVectors(forward, new THREE.Vector3(0, 1, 0));
      right.normalize();

      const panVector = new THREE.Vector3();
      if (this.panningKeys.up)    panVector.add(forward.clone().multiplyScalar(this.panSpeed));
      if (this.panningKeys.down)  panVector.add(forward.clone().multiplyScalar(-this.panSpeed));
      if (this.panningKeys.left)  panVector.add(right.clone().multiplyScalar(-this.panSpeed));
      if (this.panningKeys.right) panVector.add(right.clone().multiplyScalar(this.panSpeed));

      this.camera.position.add(panVector);
      this.controls.target.add(panVector);
      this.controls.update();
    }

    // ── Clamp orbit target to field bounds ────────────────────────────────────
    if (level && this.controls) {
      const target         = this.controls.target;
      const halfFieldWidth = level.fieldWidth  / 2;
      const halfFieldDepth = level.fieldDepth  / 2;
      const panMargin      = 0; // The allowed panning margin
      target.x = THREE.MathUtils.clamp(target.x, -halfFieldWidth - panMargin, halfFieldWidth + panMargin);
      target.z = THREE.MathUtils.clamp(target.z, -halfFieldDepth - panMargin, halfFieldDepth + panMargin);
    }

    // ── Wall fade ────────────────────────────────────────────────────────────
    if (level) {
      this._updateWallFade(level);
    }
  }

  /** Restore camera to its initial position and zoom. */
  recenterCamera() {
    if (this.camera && this.controls) {
      this.camera.position.copy(this.initialCameraPosition);
      this.camera.zoom = this.initialCameraZoom;
      this.controls.target.copy(this.initialControlsTarget);
      this.camera.updateProjectionMatrix();
      this.controls.update();
    }
  }

  /** Pan the orbit target to centre on the given disc. */
  focusCameraOnDisc(disc) {
    if (disc && this.controls) {
      this.controls.target.copy(disc.mesh.position);
    }
  }

  /** Set smooth rotation direction: -1 (left), 0 (stop), 1 (right). */
  setCameraRotation(direction) {
    this.cameraRotationDirection = direction;
  }

  /** Called by InputHandler when panning keys change state. */
  setPanningState(key, isPressed) {
    if (key in this.panningKeys) {
      this.panningKeys[key] = isPressed;
    }
  }

  /** Handle browser window resize — update camera aspect ratio and renderer size. */
  onWindowResize() {
    if (this.renderer) this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (this.camera) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }
  }

  // ─── Private ──────────────────────────────────────────────────────────────

  /**
   * Each frame: fade wall meshes that are between the camera and the play area.
   *
   * Two techniques are combined:
   *
   * 1. OUTER WALLS — boundary proximity.
   *    A single center-ray can't detect outer walls: the camera at y≈35 looking
   *    at y=0 passes ~31 units above an 8-unit wall by the time it crosses the
   *    field boundary. Instead, for each mesh near a field boundary we compute
   *    how far the camera has moved toward (or past) that boundary on the XZ
   *    plane, and derive a fade fraction directly from that distance.
   *    FADE_START units before the wall the fade begins; it reaches full fade
   *    FADE_END units past the wall.
   *
   * 2. INTERNAL OBSTACLES — ray intersection.
   *    The center-ray from camera to orbit-target DOES pass through interior
   *    obstacles (they're low enough relative to camera height), so a standard
   *    Raycaster hit-test handles those.
   */
  _updateWallFade(level) {
    if (!level || !this.camera || !this.controls) return;

    const visualWalls = level.getVisualWalls();
    if (!visualWalls.length) return;

    // Raycaster for internal obstacles
    this._wallFadeDir
      .subVectors(this.controls.target, this.camera.position)
      .normalize();
    this._wallFadeRaycaster.set(this.camera.position, this._wallFadeDir);
    this._wallFadeRaycaster.far = this.camera.position.distanceTo(this.controls.target);
    const hits = new Set(
      this._wallFadeRaycaster.intersectObjects(visualWalls).map(h => h.object)
    );

    // Boundary-proximity fade for outer walls
    const cam  = this.camera.position;
    const fw   = level.fieldWidth  / 2;  // east/west boundary
    const fd   = level.fieldDepth  / 2;  // north/south boundary
    const FADE_START   = 8;
    const FADE_END     = 3;
    const BOUNDARY_TOL = 1.5; // mesh must be within this many units of a boundary
    const FADED  = 0.6;
    const OPAQUE = 1.0;
    const SPEED  = 80;

    for (const mesh of visualWalls) {
      const wx = mesh.position.x;
      const wz = mesh.position.z;

      // Start from raycaster result (handles internal obstacles)
      let fadeAmount = hits.has(mesh) ? 1.0 : 0.0;

      // South boundary  (wz ≈ +fd)
      if (Math.abs(wz - fd) < BOUNDARY_TOL) {
        const d = cam.z - fd;
        fadeAmount = Math.max(fadeAmount,
          Math.max(0, Math.min(1, (d + FADE_START) / (FADE_START + FADE_END))));
      }
      // North boundary  (wz ≈ -fd)
      if (Math.abs(wz + fd) < BOUNDARY_TOL) {
        const d = -cam.z - fd;
        fadeAmount = Math.max(fadeAmount,
          Math.max(0, Math.min(1, (d + FADE_START) / (FADE_START + FADE_END))));
      }
      // East boundary  (wx ≈ +fw)
      if (Math.abs(wx - fw) < BOUNDARY_TOL) {
        const d = cam.x - fw;
        fadeAmount = Math.max(fadeAmount,
          Math.max(0, Math.min(1, (d + FADE_START) / (FADE_START + FADE_END))));
      }
      // West boundary  (wx ≈ -fw)
      if (Math.abs(wx + fw) < BOUNDARY_TOL) {
        const d = -cam.x - fw;
        fadeAmount = Math.max(fadeAmount,
          Math.max(0, Math.min(1, (d + FADE_START) / (FADE_START + FADE_END))));
      }

      const targetOpacity = fadeAmount > 0 ? FADED : OPAQUE;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const mat of materials) {
        if (mat.opacity !== undefined) {
          mat.transparent = true;
          const delta = targetOpacity - mat.opacity;
          mat.opacity += Math.sign(delta) * Math.min(Math.abs(delta), SPEED * (1 / 60));
          mat.opacity  = Math.max(0, Math.min(1, mat.opacity));
        }
      }
    }
  }
}
