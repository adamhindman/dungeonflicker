import { PerspectiveCamera, WebGLRenderer, Vector3, Raycaster, Spherical, MathUtils, Quaternion, Matrix4 } from 'three';
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

    // God's Eye toggle state
    this.godsEyeActive     = false;
    this._savedFreeCamState = null; // { position: Vector3, target: Vector3 }

    // Active camera animation (null when idle)
    this._animation = null; // { fromPos, fromTarget, toPos, toTarget, duration, elapsed, onComplete }
  }

  /**
   * Create and configure camera, renderer, and controls.
   * Call once from GameController.init() after the DOM is ready.
   */
  init() {
    // ── Camera ──────────────────────────────────────────────────────────────
    // AI AGENT: Do not modify the following parameters unless explicitly instructed.
    this.camera = new PerspectiveCamera(
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
    this.initialControlsTarget = new Vector3(0, 0, 0);

    // ── Renderer ────────────────────────────────────────────────────────────
    this.renderer = new WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.localClippingEnabled = true; // Required for per-material clip planes (door slab)
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Wall-fade helpers (reused each frame to avoid allocation)
    this._wallFadeRaycaster = new Raycaster();
    this._wallFadeDir       = new Vector3();

    // ── OrbitControls ────────────────────────────────────────────────────────
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    this.controls.minDistance   = 6;
    this.controls.maxDistance   = 45;
    // Prevent camera from going below ~15 degrees from horizontal
    this.controls.maxPolarAngle = (Math.PI / 2) - (25 * Math.PI / 180);

    // Restore saved free-cam state from a previous session
    try {
      const raw = localStorage.getItem('dungeonflicker_camera');
      if (raw) {
        const s = JSON.parse(raw);
        this._savedFreeCamState = {
          position: new Vector3(s.px, s.py, s.pz),
          target:   new Vector3(s.tx, s.ty, s.tz),
        };
        this.camera.position.copy(this._savedFreeCamState.position);
        this.controls.target.copy(this._savedFreeCamState.target);
        this.controls.update();
      }
    } catch (_) {}

    // Detect orbit/zoom start: if in God's Eye, drop back to freeform immediately.
    this.controls.addEventListener('start', () => {
      if (this.godsEyeActive && !this._animation) {
        this._exitGodsEye();
      }
    });

    // Save state whenever the user finishes an orbit drag.
    this.controls.addEventListener('end', () => {
      if (!this.godsEyeActive && !this._animation) {
        this._saveFreeCamState();
      }
    });
  }

  /**
   * Per-frame camera update. Call from GameController.animate() after deltaTime
   * is computed but before physics and rendering.
   * @param {number}     deltaTime
   * @param {Level|null} level  — used for target clamping and wall-fade
   */
  update(deltaTime, level) {
    // ── Camera animation (God's Eye transitions, future modes) ───────────────
    // Animation takes exclusive control of the camera. Skip all movement
    // controls and wall fade for this frame then return early.
    if (this._animation) {
      this._tickAnimation(deltaTime);
      if (level) this._updateWallFade(level);
      return;
    }

    // ── Normal free-cam update ───────────────────────────────────────────────
    if (this.controls) {
      this.controls.update();
    }

    // ── Smooth rotation from Q/E keys ────────────────────────────────────────
    if (this.cameraRotationDirection !== 0 && this.controls && this.controls.enabled) {
      if (this.godsEyeActive) this._exitGodsEye();
      const offset = new Vector3().subVectors(
        this.controls.object.position,
        this.controls.target,
      );
      const spherical = new Spherical().setFromVector3(offset);
      spherical.theta += this.cameraRotationDirection * this.cameraRotationSpeed;
      spherical.makeSafe();
      offset.setFromSpherical(spherical);
      this.controls.object.position.copy(this.controls.target).add(offset);
      this.controls.update();
    }

    // ── WASD / arrow-key panning ──────────────────────────────────────────────
    if (this.panningKeys.up || this.panningKeys.down || this.panningKeys.left || this.panningKeys.right) {
      if (this.godsEyeActive) this._exitGodsEye();
      const forward = new Vector3();
      const right   = new Vector3();

      this.camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();

      right.crossVectors(forward, new Vector3(0, 1, 0));
      right.normalize();

      const panVector = new Vector3();
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
      const panMargin      = 0;
      target.x = MathUtils.clamp(target.x, -halfFieldWidth - panMargin, halfFieldWidth + panMargin);
      target.z = MathUtils.clamp(target.z, -halfFieldDepth - panMargin, halfFieldDepth + panMargin);
    }

    // ── Wall fade ────────────────────────────────────────────────────────────
    if (level) {
      this._updateWallFade(level);
    }
  }

  /** Restore camera to its initial position and zoom, then persist that as the saved free-cam state. */
  recenterCamera() {
    if (this.camera && this.controls) {
      this.camera.position.copy(this.initialCameraPosition);
      this.camera.zoom = this.initialCameraZoom;
      this.controls.target.copy(this.initialControlsTarget);
      this.camera.updateProjectionMatrix();
      this.controls.update();
      this._saveFreeCamState();
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
    if (direction !== 0 && this.godsEyeActive) this._exitGodsEye();
    this.cameraRotationDirection = direction;
    if (direction === 0 && !this.godsEyeActive && !this._animation) {
      this._saveFreeCamState();
    }
  }

  /** Called by InputHandler when panning keys change state. */
  setPanningState(key, isPressed) {
    if (key in this.panningKeys) {
      if (isPressed && this.godsEyeActive) this._exitGodsEye();
      this.panningKeys[key] = isPressed;
      if (!isPressed && !Object.values(this.panningKeys).some(Boolean) && !this.godsEyeActive && !this._animation) {
        this._saveFreeCamState();
      }
    }
  }

  /**
   * Toggle between God's Eye (top-down full-board) view and the saved free-cam position.
   * Uses animateCameraTo() for smooth transitions in both directions.
   * @param {Level|null} level
   */
  toggleGodsEye(level) {
    if (this.godsEyeActive) {
      // Exit God's Eye → restore saved free-cam position
      this.godsEyeActive = false;
      const saved = this._savedFreeCamState || {
        position: this.initialCameraPosition.clone(),
        target:   this.initialControlsTarget.clone(),
      };
      this.animateCameraTo({
        position: saved.position,
        target:   saved.target,
        duration: 1.0,
        onComplete: () => {
          // Restore polar angle constraint now that we're back at a normal angle.
          this.controls.maxPolarAngle = (Math.PI / 2) - (25 * Math.PI / 180);
        },
      });
    } else {
      // Enter God's Eye → save current position, animate to top-down
      this._saveFreeCamState();
      this.godsEyeActive = true;
      // Lift the polar angle constraint so controls.update() inside _tickAnimation
      // doesn't clamp the camera away from straight-down during the transition.
      this.controls.maxPolarAngle = Math.PI;
      const godsEyePos = level ? this._computeGodsEyePosition(level) : new Vector3(0, 45, 0);
      this.animateCameraTo({
        position: godsEyePos,
        target:   new Vector3(0, 0, 0),
        duration: 1.0,
      });
    }
  }

  /**
   * Animate the camera from its current position/target to the given destination.
   * Cancels any in-progress animation and starts from the current camera state.
   * Rotation is slerped via a quaternion derived from the destination lookAt,
   * avoiding gimbal-lock for top-down views.
   * @param {{ position: Vector3, target: Vector3, duration?: number, onComplete?: Function }} opts
   */
  animateCameraTo({ position, target, duration = 1.0, onComplete = null }) {
    this._animation = {
      fromPos:    this.camera.position.clone(),
      fromTarget: this.controls.target.clone(),
      fromQuat:   this.camera.quaternion.clone(),
      toPos:      position.clone(),
      toTarget:   target.clone(),
      toQuat:     this._computeLookAtQuat(position, target),
      duration,
      elapsed:    0,
      onComplete,
    };
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

  /** Advance the active camera animation by deltaTime seconds. */
  _tickAnimation(deltaTime) {
    const anim = this._animation;
    anim.elapsed += deltaTime;
    const rawT = Math.min(anim.elapsed / anim.duration, 1);
    const t    = this._easeInOut(rawT);

    this.camera.position.lerpVectors(anim.fromPos, anim.toPos, t);
    this.controls.target.lerpVectors(anim.fromTarget, anim.toTarget, t);
    // Sync OrbitControls' internal spherical state from the lerped position,
    // then immediately override the quaternion with the slerped value.
    // controls.update() calls camera.lookAt() which would otherwise snap the
    // rotation, so we always overwrite it afterward.
    this.controls.update();
    this.camera.quaternion.copy(anim.fromQuat).slerp(anim.toQuat, t);

    if (rawT >= 1) {
      const cb = anim.onComplete;
      this._animation = null;
      if (cb) cb();
    }
  }

  /** Cubic ease-in-out — smooth start and stop for camera transitions. */
  _easeInOut(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /**
   * Compute the camera quaternion for "sitting at `position` and looking at `target`".
   * When the view direction is nearly vertical (top-down or bottom-up) the standard
   * up=(0,1,0) is degenerate, so we use (0,0,-1) instead to fix the orientation.
   */
  _computeLookAtQuat(position, target) {
    const dir = new Vector3().subVectors(target, position).normalize();
    const up  = Math.abs(dir.y) > 0.99 ? new Vector3(0, 0, -1) : new Vector3(0, 1, 0);
    const m   = new Matrix4().lookAt(position, target, up);
    return new Quaternion().setFromRotationMatrix(m);
  }

  /**
   * Compute the camera position for God's Eye view: directly above the board
   * center at an altitude that frames the full board with a small margin.
   */
  _computeGodsEyePosition(level) {
    const halfFov  = (this.camera.fov * Math.PI / 180) / 2;
    const aspect   = this.camera.aspect;
    const halfW    = level.fieldWidth  / 2;
    const halfD    = level.fieldDepth  / 2;
    const hForDepth = halfD / Math.tan(halfFov);
    const hForWidth = halfW / (Math.tan(halfFov) * aspect);
    const h = Math.max(hForDepth, hForWidth) * 1.12; // 12% margin
    return new Vector3(0, h, 0);
  }

  /**
   * Silently exit God's Eye mode without animation — used when the player moves
   * the camera manually while in God's Eye. Restores the polar angle constraint
   * immediately (no animation, so there's no transition to protect).
   */
  _exitGodsEye() {
    this.godsEyeActive = false;
    this.controls.maxPolarAngle = (Math.PI / 2) - (25 * Math.PI / 180);
    this._saveFreeCamState();
  }

  /** Persist current camera state to memory and localStorage. */
  _saveFreeCamState() {
    if (!this.camera || !this.controls) return;
    this._savedFreeCamState = {
      position: this.camera.position.clone(),
      target:   this.controls.target.clone(),
    };
    try {
      localStorage.setItem('dungeonflicker_camera', JSON.stringify({
        px: this._savedFreeCamState.position.x,
        py: this._savedFreeCamState.position.y,
        pz: this._savedFreeCamState.position.z,
        tx: this._savedFreeCamState.target.x,
        ty: this._savedFreeCamState.target.y,
        tz: this._savedFreeCamState.target.z,
      }));
    } catch (_) {}
  }

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
