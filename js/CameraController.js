import { PerspectiveCamera, WebGLRenderer, Vector3, Raycaster, Spherical, MathUtils, Quaternion, Matrix4, Box3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const DEFAULT_CAMERA_DISTANCE = 40;    // the standard rooms' default view
const DEFAULT_MAX_DISTANCE    = 45;    // furthest the player can zoom out in them
const CAMERA_TILT = Math.PI / 3;       // 60° down from horizontal

// Q/E rotation and WASD panning, per second (the speeds they had at 60 fps).
// Panning is this fast at the default distance, faster zoomed out, slower in.
const ROTATE_SPEED = Math.PI / 135 * 60;
const PAN_SPEED    = 30;
const MAX_FRAME_DT = 0.1; // a long frame (e.g. back from another tab) doesn't fling the camera

// Turn-start glide (glideToIfNearEdge): it moves only when the disc is off
// screen or within this fraction of the screen's half-width/height of an edge.
const GLIDE_EDGE_MARGIN = 0.8;
const GLIDE_DURATION    = 0.8; // seconds

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
    this._maxDistance = DEFAULT_MAX_DISTANCE;
    this.initialCameraZoom     = null;
    this.initialControlsTarget = null;

    // Camera rotation driven by Q/E keys
    this.cameraRotationDirection = 0; // -1 | 0 | 1

    // WASD / arrow-key panning
    this.panningKeys = { up: false, down: false, left: false, right: false };

    // Wall-fade raycaster (pre-allocated to avoid per-frame GC pressure)
    this._wallFadeRaycaster = null;
    this._wallFadeDir       = null;

    // God's Eye toggle state
    this.godsEyeActive     = false;
    this._savedFreeCamState = null; // { position: Vector3, target: Vector3 }

    // Active camera animation (null when idle)
    this._animation = null; // { fromPos, fromTarget, toPos, toTarget, duration, elapsed, onComplete, cancellable? }
    this._userDragging = false; // mid orbit/pan/zoom with the mouse
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

    // Position camera to get approx 60 degree downward tilt to encompass field.
    // DEFAULT_CAMERA_DISTANCE suits every standard room; a room that doesn't fit
    // sets its own view (Level.cameraView), applied by setRoomView().
    this.setRoomView(null);
    this.camera.position.copy(this.initialCameraPosition);
    this.camera.lookAt(this.initialControlsTarget);
    this.initialCameraZoom = this.camera.zoom;

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
    this.controls.maxDistance   = this._maxDistance;
    // The scroll wheel zooms toward whatever is under the pointer, and the
    // orbit target (and right-drag panning) stays on the floor plane.
    this.controls.zoomToCursor       = true;
    this.controls.screenSpacePanning = false;
    // Prevent camera from going below ~15 degrees from horizontal
    this.controls.maxPolarAngle = (Math.PI / 2) - (25 * Math.PI / 180);

    // Every session starts at the default view. (The camera used to be restored
    // from the last session, which could open the game rotated and panned.)
    try { localStorage.removeItem('dungeonflicker_camera'); } catch (_) {}

    // Detect orbit/zoom start: if in God's Eye, drop back to freeform immediately.
    // A turn-start glide gives way to the player.
    this.controls.addEventListener('start', () => {
      this._userDragging = true;
      this.cancelGlide();
      if (this.godsEyeActive && !this._animation) {
        this._exitGodsEye();
      }
    });

    // Save state whenever the user finishes an orbit drag.
    this.controls.addEventListener('end', () => {
      this._userDragging = false;
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
   * @param {Disc|null}  focusDisc — the disc whose turn it is; whatever hides it fades
   */
  update(deltaTime, level, focusDisc = null) {
    this._focusDisc = focusDisc;
    this._level = level;
    // ── Camera animation (God's Eye transitions, future modes) ───────────────
    // Animation takes exclusive control of the camera. Skip all movement
    // controls and wall fade for this frame then return early.
    if (this._animation) {
      this._tickAnimation(Math.min(deltaTime, MAX_FRAME_DT));
      if (level) this._updateWallFade(level, Math.min(deltaTime, MAX_FRAME_DT));
      return;
    }

    // ── Normal free-cam update ───────────────────────────────────────────────
    if (this.controls) {
      this.controls.update();
    }
    const dt = Math.min(deltaTime, MAX_FRAME_DT);

    // ── Smooth rotation from Q/E keys ────────────────────────────────────────
    if (this.cameraRotationDirection !== 0 && this.controls && this.controls.enabled) {
      if (this.godsEyeActive) this._exitGodsEye();
      const offset = new Vector3().subVectors(
        this.controls.object.position,
        this.controls.target,
      );
      const spherical = new Spherical().setFromVector3(offset);
      spherical.theta += this.cameraRotationDirection * ROTATE_SPEED * dt;
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

      const distance = this.camera.position.distanceTo(this.controls.target);
      const step = PAN_SPEED * (distance / DEFAULT_CAMERA_DISTANCE) * dt;
      const panVector = new Vector3();
      if (this.panningKeys.up)    panVector.add(forward.clone().multiplyScalar(step));
      if (this.panningKeys.down)  panVector.add(forward.clone().multiplyScalar(-step));
      if (this.panningKeys.left)  panVector.add(right.clone().multiplyScalar(-step));
      if (this.panningKeys.right) panVector.add(right.clone().multiplyScalar(step));

      this.camera.position.add(panVector);
      this.controls.target.add(panVector);
      this.controls.update();
    }

    // ── Keep the orbit target inside the room ─────────────────────────────────
    // The camera moves with it, so panning into a wall stops rather than
    // swinging the view around a target that can't follow.
    if (level && this.controls) {
      const target  = this.controls.target;
      const clamped = this._clampToRoom(target, level);
      if (!clamped.equals(target)) {
        this.camera.position.add(clamped.clone().sub(target));
        target.copy(clamped);
      }
    }

    // ── Wall fade ────────────────────────────────────────────────────────────
    if (level) {
      this._updateWallFade(level, dt);
    }
  }

  /** Restore camera to its initial position and zoom, then persist that as the saved free-cam state. */
  /**
   * Sets the room's default view, the one recenterCamera() returns to: the
   * camera `distance` from a target on the floor at (0, 0, targetZ), tilted
   * 60° down. Pass null for the standard view.
   * @param {{distance?: number, targetZ?: number}|null} view
   */
  setRoomView(view) {
    const distance = view?.distance ?? DEFAULT_CAMERA_DISTANCE;
    const targetZ  = view?.targetZ ?? 0;
    this.initialCameraPosition = new Vector3(
      0, distance * Math.sin(CAMERA_TILT), targetZ + distance * Math.cos(CAMERA_TILT));
    this.initialControlsTarget = new Vector3(0, 0, targetZ);
    // Let the player zoom out a little past the room's default view
    this._maxDistance = Math.max(DEFAULT_MAX_DISTANCE, distance + 5);
    if (this.controls) this.controls.maxDistance = this._maxDistance;
  }

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

  /**
   * Glides the view (same angle and zoom) to centre on `point` if it's off
   * screen or near an edge; otherwise leaves the camera alone. Doesn't move
   * in God's Eye or while the player is moving the camera, and gives way the
   * moment they touch the controls.
   * @param {Vector3} point  on the floor, e.g. the disc whose turn it is
   */
  glideToIfNearEdge(point) {
    if (!this.camera || !this.controls || this.godsEyeActive || this._animation) return;
    if (this._userDragging || this.cameraRotationDirection !== 0 || Object.values(this.panningKeys).some(Boolean)) return;

    const ndc = point.clone().project(this.camera);
    const limit = 1 - GLIDE_EDGE_MARGIN;
    const onScreen = ndc.z < 1 && Math.abs(ndc.x) < limit && Math.abs(ndc.y) < limit;
    if (onScreen) return;

    // Aim where the target is allowed to rest, so the room clamp doesn't
    // jump the view once the glide hands back control.
    let target = new Vector3(point.x, this.controls.target.y, point.z);
    if (this._level) target = this._clampToRoom(target, this._level);
    const offset = new Vector3().subVectors(this.camera.position, this.controls.target);
    this.animateCameraTo({
      position: target.clone().add(offset),
      target,
      duration: GLIDE_DURATION,
      ease: t => (1 - Math.cos(Math.PI * t)) / 2, // gentler start and stop than the default
      onComplete: () => this._saveFreeCamState(),
    });
    this._animation.cancellable = true;
  }

  /** Set smooth rotation direction: -1 (left), 0 (stop), 1 (right). */
  setCameraRotation(direction) {
    if (direction !== 0) this.cancelGlide();
    if (direction !== 0 && this.godsEyeActive) this._exitGodsEye();
    this.cameraRotationDirection = direction;
    if (direction === 0 && !this.godsEyeActive && !this._animation) {
      this._saveFreeCamState();
    }
  }

  /** Called by InputHandler when panning keys change state. */
  setPanningState(key, isPressed) {
    if (key in this.panningKeys) {
      if (isPressed) this.cancelGlide();
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
      const view = level ? this._computeGodsEyeView(level) : { position: new Vector3(0, 45, 0), target: new Vector3() };
      this.animateCameraTo({
        position: view.position,
        target:   view.target,
        duration: 1.0,
      });
    }
  }

  /**
   * Animate the camera from its current position/target to the given destination.
   * Cancels any in-progress animation and starts from the current camera state.
   * Rotation is slerped via a quaternion derived from the destination lookAt,
   * avoiding gimbal-lock for top-down views.
   * @param {{ position: Vector3, target: Vector3, duration?: number, ease?: Function, onComplete?: Function }} opts
   */
  animateCameraTo({ position, target, duration = 1.0, ease = null, onComplete = null }) {
    this._animation = {
      ease:       ease ?? (t => this._easeInOut(t)),
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

  /**
   * `point` moved to where the orbit target may rest in `level`: inside the
   * circle in a round room (their field size is deliberately oversized),
   * inside the field otherwise. Returns a new vector; y is kept.
   */
  _clampToRoom(point, level) {
    const clamped = point.clone();
    const r = level.circleRadius;
    if (r) {
      const d = Math.hypot(clamped.x, clamped.z);
      if (d > r) { clamped.x *= r / d; clamped.z *= r / d; }
    } else {
      clamped.x = MathUtils.clamp(clamped.x, -level.fieldWidth / 2, level.fieldWidth / 2);
      clamped.z = MathUtils.clamp(clamped.z, -level.fieldDepth / 2, level.fieldDepth / 2);
    }
    return clamped;
  }

  /** Stops a turn-start glide where it is (God's Eye transitions run on). */
  cancelGlide() {
    if (this._animation?.cancellable) this._animation = null;
  }

  // ─── Private ──────────────────────────────────────────────────────────────

  /** Advance the active camera animation by deltaTime seconds. */
  _tickAnimation(deltaTime) {
    const anim = this._animation;
    anim.elapsed += deltaTime;
    const rawT = Math.min(anim.elapsed / anim.duration, 1);
    const t    = anim.ease(rawT);

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
   * The God's Eye view: directly above the middle of the room, high enough to
   * frame all of it with a small margin. The room's extent is measured from
   * its walls (round rooms' field size is deliberately oversized, and a hex's
   * corners reach past its radius).
   * @returns {{position: Vector3, target: Vector3}}
   */
  _computeGodsEyeView(level) {
    const box = new Box3();
    for (const mesh of level.getVisualWalls()) box.expandByObject(mesh);
    if (box.isEmpty()) {
      box.min.set(-level.fieldWidth / 2, 0, -level.fieldDepth / 2);
      box.max.set(level.fieldWidth / 2, 0, level.fieldDepth / 2);
    }
    const centre = box.getCenter(new Vector3()).setY(0);
    const halfW  = (box.max.x - box.min.x) / 2;
    const halfD  = (box.max.z - box.min.z) / 2;

    const halfFov   = (this.camera.fov * Math.PI / 180) / 2;
    const hForDepth = halfD / Math.tan(halfFov);
    const hForWidth = halfW / (Math.tan(halfFov) * this.camera.aspect);
    const h = Math.max(hForDepth, hForWidth) * 1.12; // 12% margin
    return { position: new Vector3(centre.x, h, centre.z), target: centre };
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

  /** Remember the current free-cam view for this session (God's Eye returns to it). */
  _saveFreeCamState() {
    if (!this.camera || !this.controls) return;
    this._savedFreeCamState = {
      position: this.camera.position.clone(),
      target:   this.controls.target.clone(),
    };
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
   *    In a round room (the Rotunda, the hex…) the boundary is the circle
   *    instead: each wall near it fades by how far the camera has moved out
   *    past it along that wall's direction from the centre.
   *
   * 2. INTERNAL OBSTACLES — ray intersection.
   *    The center-ray from camera to orbit-target DOES pass through interior
   *    obstacles (they're low enough relative to camera height), so a standard
   *    Raycaster hit-test handles those.
   *
   * 3. THE ACTIVE DISC — rays from the camera to its middle and rim; anything
   *    in the way fades, so a wall or pillar can't hide whoever's turn it is.
   */
  _updateWallFade(level, dt) {
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
    this._addFocusDiscBlockers(visualWalls, hits);
    // Boundary-proximity fade for outer walls
    const cam  = this.camera.position;
    const fw   = level.fieldWidth  / 2;  // east/west boundary
    const fd   = level.fieldDepth  / 2;  // north/south boundary
    const FADE_START   = 8;
    const FADE_END     = 3;
    const BOUNDARY_TOL = 1.5; // mesh must be within this many units of a boundary
    const ROUND_TOL    = 3;   // round rooms: within this of the circle (takes in the door's buttress)
    const FADED  = 0.6;
    const OPAQUE = 1.0;
    const SPEED  = 80;        // opacity per second
    const fadeFor = d => Math.max(0, Math.min(1, (d + FADE_START) / (FADE_START + FADE_END)));
    const radius = level.circleRadius;

    for (const mesh of visualWalls) {
      const wx = mesh.position.x;
      const wz = mesh.position.z;

      // Start from raycaster result (handles internal obstacles)
      let fadeAmount = hits.has(mesh) ? 1.0 : 0.0;

      if (radius) {
        const rho = Math.hypot(wx, wz);
        if (rho > 0 && Math.abs(rho - radius) < ROUND_TOL) {
          const d = (cam.x * wx + cam.z * wz) / rho - rho;
          fadeAmount = Math.max(fadeAmount, fadeFor(d));
        }
        this._fadeMesh(mesh, fadeAmount > 0 ? FADED : OPAQUE, SPEED * dt);
        continue;
      }

      // South, north, east, west boundaries
      if (Math.abs(wz - fd) < BOUNDARY_TOL) fadeAmount = Math.max(fadeAmount, fadeFor(cam.z - fd));
      if (Math.abs(wz + fd) < BOUNDARY_TOL) fadeAmount = Math.max(fadeAmount, fadeFor(-cam.z - fd));
      if (Math.abs(wx - fw) < BOUNDARY_TOL) fadeAmount = Math.max(fadeAmount, fadeFor(cam.x - fw));
      if (Math.abs(wx + fw) < BOUNDARY_TOL) fadeAmount = Math.max(fadeAmount, fadeFor(-cam.x - fw));

      this._fadeMesh(mesh, fadeAmount > 0 ? FADED : OPAQUE, SPEED * dt);
    }
  }

  /**
   * Adds to `hits` every wall mesh between the camera and the active disc:
   * its middle and four points on its rim, so a half-hidden disc counts.
   */
  _addFocusDiscBlockers(visualWalls, hits) {
    const disc = this._focusDisc;
    if (!disc?.mesh || disc.dead) return;
    const centre = disc.mesh.position;
    const r = (disc.radius ?? 1) * 0.9;
    const offsets = [[0, 0], [r, 0], [-r, 0], [0, r], [0, -r]];
    const point = this._focusPoint ??= new Vector3();
    for (const [dx, dz] of offsets) {
      point.set(centre.x + dx, centre.y, centre.z + dz);
      const far = this.camera.position.distanceTo(point);
      this._wallFadeDir.subVectors(point, this.camera.position).normalize();
      this._wallFadeRaycaster.set(this.camera.position, this._wallFadeDir);
      this._wallFadeRaycaster.far = far;
      for (const hit of this._wallFadeRaycaster.intersectObjects(visualWalls)) hits.add(hit.object);
    }
  }

  /** Moves `mesh`'s opacity toward `targetOpacity` by at most `maxStep`. */
  _fadeMesh(mesh, targetOpacity, maxStep) {
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const mat of materials) {
      if (mat.opacity !== undefined) {
        mat.transparent = true;
        const delta = targetOpacity - mat.opacity;
        mat.opacity += Math.sign(delta) * Math.min(Math.abs(delta), maxStep);
        mat.opacity  = Math.max(0, Math.min(1, mat.opacity));
      }
    }
  }
}
