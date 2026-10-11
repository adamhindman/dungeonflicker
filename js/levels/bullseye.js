import { CircleGeometry, CylinderGeometry, DoubleSide, Group, Mesh, MeshStandardMaterial, RepeatWrapping, RingGeometry } from "three";
import { buildRoundWall } from "./roundWall.js";

export function loadBullseye() {
  const OUTER_R    = 22;   // where discs bounce (the radial clamp); the wall's centre
  const RING_R1    = 8;    // inner ↔ middle boundary
  const RING_R2    = 16;   // middle ↔ outer boundary
  const COL_R_MID  = 12;   // column radius on middle ring
  const COL_R_OUT  = 19;   // column radius on outer ring
  const COL_RAD    = 0.8;  // column cylinder radius
  const N_COL_MID  = 5;
  const N_COL_OUT  = 9;
  const ROT_SPEED_INNER  = 0.03;  // rad/s — very slow
  const ROT_SPEED_MIDDLE = 0.15;  // rad/s — medium
  const ROT_SPEED_OUTER  = 0.10;  // rad/s — slow-medium
  const wallH      = this.wallHeight;

  this.circleRadius          = OUTER_R;
  this.fieldWidth            = OUTER_R * 4;
  this.fieldDepth            = OUTER_R * 4;
  this.obstacles             = [];
  this._bullseyeColumnMeshes = [];

  // ── Wall material ────────────────────────────────────────────────────────
  const wallTex = this.textureLoader.load("images/tile-stone-1.webp");
  wallTex.wrapS = RepeatWrapping;
  wallTex.wrapT = RepeatWrapping;
  this.wallMaterial = new MeshStandardMaterial({
    map: wallTex, roughness: 0.6, metalness: 0.2,
  });

  // ── Floor materials – each ring gets its own texture with repeat scaled to
  //    its own bounding box so tile density is uniform across all three rings.
  //    CircleGeometry(R) and RingGeometry(inner, outer) both map their bounding
  //    square (side = 2 * outerR) to UV [0,1], so repeat = 2*outerR / tileSize.
  const makeFloorMat = (outerR) => {
    const tex = this.textureLoader.load("images/tile-stone-1.webp");
    tex.wrapS = RepeatWrapping;
    tex.wrapT = RepeatWrapping;
    tex.repeat.set((outerR * 2) / 6, (outerR * 2) / 6);
    return new MeshStandardMaterial({
      map:       tex,
      roughness: 0.6,
      metalness: 0.2,
      side:      DoubleSide,
    });
  };

  // ── Ring groups ──────────────────────────────────────────────────────────
  const innerGroup  = new Group();
  const middleGroup = new Group();
  const outerGroup  = new Group();
  this.scene.add(innerGroup, middleGroup, outerGroup);

  const innerFloor = new Mesh(
    new CircleGeometry(RING_R1, 64),
    makeFloorMat(RING_R1)     // bounding box = 2*RING_R1
  );
  innerFloor.rotation.x = -Math.PI / 2;
  innerFloor.receiveShadow = true;
  innerGroup.add(innerFloor);

  const makeMidFloorMat = (outerR) => {
    const tex = this.textureLoader.load("images/tile-stone-red-1.webp");
    tex.wrapS = RepeatWrapping;
    tex.wrapT = RepeatWrapping;
    tex.repeat.set((outerR * 2) / 6, (outerR * 2) / 6);
    return new MeshStandardMaterial({
      map:       tex,
      roughness: 0.6,
      metalness: 0.2,
      side:      DoubleSide,
    });
  };

  const midFloor = new Mesh(
    new RingGeometry(RING_R1, RING_R2, 64),
    makeMidFloorMat(RING_R2)
  );
  midFloor.rotation.x = -Math.PI / 2;
  midFloor.receiveShadow = true;
  middleGroup.add(midFloor);

  const outerFloor = new Mesh(
    new RingGeometry(RING_R2, OUTER_R, 64),
    makeFloorMat(OUTER_R)     // bounding box = 2*OUTER_R
  );
  outerFloor.rotation.x = -Math.PI / 2;
  outerFloor.receiveShadow = true;
  outerGroup.add(outerFloor);

  // No single this.floor for bullseye — ring floors live inside the groups.

  // ── Columns ──────────────────────────────────────────────────────────────
  const buildColumns = (group, count, r, colDataOut) => {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const cx    = Math.sin(angle) * r;
      const cz    = Math.cos(angle) * r;

      const geo  = new CylinderGeometry(COL_RAD, COL_RAD, wallH, 16);
      this.applyCylinderUVs(geo, COL_RAD, wallH);
      const mesh = new Mesh(geo, this._getObstacleMaterial());
      mesh.position.set(cx, wallH / 2, cz);
      mesh.userData.colliderRadius = COL_RAD; // collides as a circle, not its square box
      mesh.castShadow    = true;
      mesh.receiveShadow = true;
      group.add(mesh);

      // Track for collision detection
      this._bullseyeColumnMeshes.push(mesh);

      // Mirror position into obstacles so isPositionValid() works
      const obs = { type: 'pillar', x: cx, z: cz, width: COL_RAD * 2, depth: COL_RAD * 2 };
      this.obstacles.push(obs);
      colDataOut.push({ baseAngle: angle, r, obsRef: obs });
    }
  };

  const middleColData = [];
  buildColumns(middleGroup, N_COL_MID, COL_R_MID, middleColData);

  const outerColData = [];

  // ── Outer wall and door ──────────────────────────────────────────────────
  // Round, with the door in a buttress at the north (see roundWall.js). The
  // outer ring turns beneath the buttress; a disc it carries into it is
  // knocked free (GameController, with the turning columns).
  buildRoundWall.call(this, OUTER_R);

  // ── Store ring data for update() ─────────────────────────────────────────
  this.bullseyeRings = {
    RING_R1,
    RING_R2,
    inner:  { group: innerGroup,  rotDir: -1, speed: ROT_SPEED_INNER,  cols: [] },
    middle: { group: middleGroup, rotDir: +1, speed: ROT_SPEED_MIDDLE, cols: middleColData },
    outer:  { group: outerGroup,  rotDir: -1, speed: ROT_SPEED_OUTER,  cols: outerColData },
  };

  this._initTransparency();
  this._addLighting();
}



export function stepRings() {
  if (!this.bullseyeRings) return null;
  const STEP = Math.PI / 6; // 30 degrees per round
  const RING_ANIM_DURATION = 2.23; // seconds — matches stone-slide-1.mp3 duration
  const { inner, middle, outer, RING_R1, RING_R2 } = this.bullseyeRings;

  this._ringAnim = {
    innerStart:  inner.group.rotation.y,
    middleStart: middle.group.rotation.y,
    outerStart:  outer.group.rotation.y,
    innerStep:   inner.rotDir  * STEP,
    middleStep:  middle.rotDir * STEP,
    outerStep:   outer.rotDir  * STEP,
    duration:    RING_ANIM_DURATION,
    elapsed:     0,
    done:        false,
  };

  return { RING_R1, RING_R2 };
}

export function updateBullseyeAnimation(deltaTime) {
  if (!this.bullseyeRings || !this._ringAnim || this._ringAnim.done) return;

  const anim = this._ringAnim;
  anim.elapsed += deltaTime;
  const raw = Math.min(anim.elapsed / anim.duration, 1.0);
  const ease = raw < 0.5 ? 2 * raw * raw : -1 + (4 - 2 * raw) * raw;

  const { inner, middle, outer } = this.bullseyeRings;
  inner.group.rotation.y = anim.innerStart + anim.innerStep * ease;
  middle.group.rotation.y = anim.middleStart + anim.middleStep * ease;
  outer.group.rotation.y = anim.outerStart + anim.outerStep * ease;

  for (const col of middle.cols) {
    const angle = col.baseAngle + middle.group.rotation.y;
    col.obsRef.x = Math.sin(angle) * col.r;
    col.obsRef.z = Math.cos(angle) * col.r;
  }
  for (const col of outer.cols) {
    const angle = col.baseAngle + outer.group.rotation.y;
    col.obsRef.x = Math.sin(angle) * col.r;
    col.obsRef.z = Math.cos(angle) * col.r;
  }

  if (raw >= 1.0) {
    anim.done = true;
  }
}

export function disposeBullseye() {
  if (this.bullseyeRings) {
    const disposeGroup = (group) => {
      group.traverse(child => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (child.material.map) child.material.map.dispose();
            child.material.dispose();
          }
        }
      });
      this.scene.remove(group);
    };
    disposeGroup(this.bullseyeRings.inner.group);
    disposeGroup(this.bullseyeRings.middle.group);
    disposeGroup(this.bullseyeRings.outer.group);
    this.bullseyeRings = null;
  }
  this._bullseyeColumnMeshes = [];
}
