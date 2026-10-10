import { BufferAttribute, BufferGeometry, CylinderGeometry, DoubleSide, Mesh, MeshStandardMaterial, RepeatWrapping, Vector3 } from "three";
import { buildRoundWall } from "./roundWall.js";

// The Caldera: a round room around a sunken lava pit (which erupts; see
// PitEruption.js). Its outer wall and door buttress are the Rotunda's (see
// roundWall.js); the floor is three round bands: the flat stone ring, the red
// slope down into the pit, and the pit floor.
export function loadDonut() {
  const N          = 64;     // segments in each round floor band (all at the same angles, so the edges meet)
  const OUTER_R    = 24.2;   // wall segment centre radius (where discs bounce)
  const HOLE_APO   = 11.0;   // flat ring's inner edge (floor ends / pit begins)
  const PIT_APO    = 6.0;    // pit base radius
  const MED_Y      = 0;      // ring floor elevation
  const PIT_Y      = -2.5;   // pit floor elevation
  const wallThick  = 0.5;
  const wallH      = this.wallHeight;

  // Band radii (the floor runs on under the wall)
  const OUTER_CIRC = OUTER_R + wallThick / 2;
  const HOLE_CIRC  = HOLE_APO;
  const PIT_CIRC   = PIT_APO;

  // Alias to match callers that use the old constant name
  const RING_INNER_R = HOLE_APO;
  const PIT_R        = PIT_APO;

  this.circleRadius     = OUTER_R;
  this.donutInnerRadius = HOLE_APO;
  this.donutRings       = { MED_Y, PIT_Y, RING_INNER_R, PIT_R, OUTER_R };
  this.fieldWidth       = OUTER_R * 4;
  this.fieldDepth       = OUTER_R * 4;
  this.obstacles        = [];

  // ── Textures ──────────────────────────────────────────────────────────────
  const wallTex = this.textureLoader.load("images/tile-stone-1.webp");
  wallTex.wrapS = RepeatWrapping;
  wallTex.wrapT = RepeatWrapping;
  this.wallMaterial = new MeshStandardMaterial({
    map: wallTex, roughness: 0.6, metalness: 0.2,
  });

  const tileTexture = this.textureLoader.load("images/tile-stone-1.webp");
  tileTexture.wrapS = RepeatWrapping;
  tileTexture.wrapT = RepeatWrapping;
  const floorMat = new MeshStandardMaterial({
    map: tileTexture, roughness: 0.6, metalness: 0.2, side: DoubleSide,
  });
  this._hexFloorMat = floorMat;

  const redTileTex = this.textureLoader.load("images/tile-stone-red-1.webp");
  redTileTex.wrapS = RepeatWrapping;
  redTileTex.wrapT = RepeatWrapping;
  const pitMat = new MeshStandardMaterial({
    map: redTileTex, roughness: 0.6, metalness: 0.2, side: DoubleSide,
  });
  this._hexPitMat = pitMat;

  // ── Floor geometry helpers ────────────────────────────────────────────────
  // All helpers push finished meshes into this._hexFloorMeshes for cleanup.

  const addFloorQuad = (v0, v1, v2, v3, mat) => {
    const pos = new Float32Array([
      v0.x, v0.y, v0.z,  v1.x, v1.y, v1.z,
      v2.x, v2.y, v2.z,  v3.x, v3.y, v3.z,
    ]);
    const uvs = new Float32Array([
      v0.x / 6, v0.z / 6,  v1.x / 6, v1.z / 6,
      v2.x / 6, v2.z / 6,  v3.x / 6, v3.z / 6,
    ]);
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(pos, 3));
    geo.setAttribute('uv',       new BufferAttribute(uvs, 2));
    geo.setIndex([0, 1, 2, 0, 2, 3]);
    geo.computeVertexNormals();
    const mesh = new Mesh(geo, mat);
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this._hexFloorMeshes.push(mesh);
  };

  const addFloorTri = (v0, v1, v2, mat) => {
    const pos = new Float32Array([
      v0.x, v0.y, v0.z,  v1.x, v1.y, v1.z,  v2.x, v2.y, v2.z,
    ]);
    const uvs = new Float32Array([
      v0.x / 6, v0.z / 6,  v1.x / 6, v1.z / 6,  v2.x / 6, v2.z / 6,
    ]);
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(pos, 3));
    geo.setAttribute('uv',       new BufferAttribute(uvs, 2));
    geo.setIndex([0, 1, 2]);
    geo.computeVertexNormals();
    const mesh = new Mesh(geo, mat);
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this._hexFloorMeshes.push(mesh);
  };

  // ── Floor construction ────────────────────────────────────────────────────
  // One pass: for each of the N segments round the room, build three panels
  // that share vertices at the same angles, so every edge meets perfectly.
  for (let i = 0; i < N; i++) {
    const a0 = (i - 0.5) * (Math.PI * 2 / N);
    const a1 = (i + 0.5) * (Math.PI * 2 / N);

    // The vertex positions shared across all three panels.
    const outerX0 = Math.sin(a0) * OUTER_CIRC,  outerZ0 = Math.cos(a0) * OUTER_CIRC;
    const outerX1 = Math.sin(a1) * OUTER_CIRC,  outerZ1 = Math.cos(a1) * OUTER_CIRC;
    const holeX0  = Math.sin(a0) * HOLE_CIRC,   holeZ0  = Math.cos(a0) * HOLE_CIRC;
    const holeX1  = Math.sin(a1) * HOLE_CIRC,   holeZ1  = Math.cos(a1) * HOLE_CIRC;
    const pitX0   = Math.sin(a0) * PIT_CIRC,    pitZ0   = Math.cos(a0) * PIT_CIRC;
    const pitX1   = Math.sin(a1) * PIT_CIRC,    pitZ1   = Math.cos(a1) * PIT_CIRC;

    // 1. Flat ring (grey stone): outer wall edge → inner hole, all at MED_Y
    addFloorQuad(
      new Vector3(outerX0, MED_Y, outerZ0),
      new Vector3(outerX1, MED_Y, outerZ1),
      new Vector3(holeX1,  MED_Y, holeZ1),
      new Vector3(holeX0,  MED_Y, holeZ0),
      floorMat,
    );

    // 2. Pit slope (red stone): inner hole at MED_Y → pit base at PIT_Y
    addFloorQuad(
      new Vector3(holeX0, MED_Y, holeZ0),
      new Vector3(holeX1, MED_Y, holeZ1),
      new Vector3(pitX1,  PIT_Y, pitZ1),
      new Vector3(pitX0,  PIT_Y, pitZ0),
      pitMat,
    );

    // 3. Pit floor (red stone): fan triangle to centre
    addFloorTri(
      new Vector3(0,     PIT_Y, 0),
      new Vector3(pitX0, PIT_Y, pitZ0),
      new Vector3(pitX1, PIT_Y, pitZ1),
      pitMat,
    );
  }

  // ── Outer wall and door ────────────────────────────────────────────────────
  buildRoundWall.call(this, OUTER_R);

  // ── Pillars around the ring ────────────────────────────────────────────────
  // 4 round pillars at r=17, offset 45° so none sits near the door (θ=π).
  // Pillar angles: 45°, 135°, 225°, 315° — all 45° away from the door.
  const R_COL = 17;
  const N_COL = 4;
  const COL_R = 1.2;
  for (let i = 0; i < N_COL; i++) {
    const alpha = Math.PI / 4 + i * (2 * Math.PI / N_COL);
    const x = Math.sin(alpha) * R_COL;
    const z = Math.cos(alpha) * R_COL;
    this.obstacles.push({ x, z, width: COL_R * 2, depth: COL_R * 2, type: 'pillar' });
    const geo = new CylinderGeometry(COL_R, COL_R, wallH, 12);
    this.applyCylinderUVs(geo, COL_R, wallH);
    const mesh = new Mesh(geo, this._getObstacleMaterial());
    mesh.position.set(x, MED_Y + wallH / 2, z);
    mesh.userData.colliderRadius = COL_R; // collides as a circle, not its square box
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this.walls[`donut_col_${i}`] = mesh;
  }

  this._initTransparency();
  this._addLighting();
}

export function getDonutTerrainHeight(x, z) {
  const { MED_Y, PIT_Y, RING_INNER_R, PIT_R } = this.donutRings;
  const r = Math.sqrt(x * x + z * z);
  if (r <= PIT_R) return PIT_Y;
  if (r <= RING_INNER_R) {
    const t = (r - PIT_R) / (RING_INNER_R - PIT_R);
    return PIT_Y + t * (MED_Y - PIT_Y);
  }
  return MED_Y;
}

export function getDonutTerrainSlopeForce(x, z) {
  const { RING_INNER_R, PIT_R } = this.donutRings;
  const r = Math.sqrt(x * x + z * z);
  if (r < 0.01) return { fx: 0, fz: 0 };
  if (r > PIT_R && r <= RING_INNER_R) {
    return { fx: -(x / r) * 0.007, fz: -(z / r) * 0.007 };
  }
  return { fx: 0, fz: 0 };
}

export function disposeDonut() {
  this.donutInnerRadius = null;
  this.donutRings = null;
}
