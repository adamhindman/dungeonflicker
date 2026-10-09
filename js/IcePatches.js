// js/IcePatches.js
// Ice: patches of floor where friction nearly vanishes, so a disc on one
// slides much farther. A level makes its patches with addIcePatches();
// PhysicsEngine asks isOnIce() for each sliding disc and scales its friction
// with iceFriction(); Level calls disposeIcePatches() on unload.
//
// Each patch is an irregular blob (a wobbly circle), drawn as a pale, glossy
// sheet just above the floor, with faint cracks.

import { CanvasTexture, Mesh, MeshStandardMaterial, RepeatWrapping, Shape, ShapeGeometry, SRGBColorSpace, Vector2 } from 'three';

// On ice a disc loses this share of the speed it would lose on stone each
// step (so normal 0.96 friction becomes 0.99: it slides about 4× as far).
const ICE_GRIP = 0.25;
const OUTLINE_POINTS = 28;   // corners around each blob
const WOBBLE = 0.22;         // how far a blob's edge strays from a circle (share of its radius)
const ICE_HEIGHT = 0.02;     // drawn just above the floor
const CRACK_TILE = 8;        // the crack texture repeats every this many units

/** Friction for a disc on ice, from its friction on stone. */
export function iceFriction(friction) {
  return 1 - (1 - friction) * ICE_GRIP;
}

/** Is (x, z) on one of the level's ice patches? */
export function isOnIce(level, x, z) {
  for (const patch of level.icePatches || []) {
    if (Math.hypot(x - patch.x, z - patch.z) > patch.maxRadius) continue;
    if (pointInPolygon(x, z, patch.points)) return true;
  }
  return false;
}

/**
 * Scatters `count` ice patches over the floor, each `minRadius`–`maxRadius`
 * across its middle, inside `area` ({ minX, maxX, minZ, maxZ }). Patches may
 * overlap and run together into bigger sheets: they all share one material,
 * and the cracks are laid in world space, so the overlaps don't show.
 */
export function addIcePatches(level, { count, minRadius, maxRadius, area }) {
  const material = new MeshStandardMaterial({
    color: 0xaed7f3, roughness: 0.12, metalness: 0.15,     // pale icy blue
    emissive: 0x12334a, emissiveIntensity: 0.6, // a blue glow, so it reads as ice in the dim rooms
    map: crackTexture(),
  });
  level._iceMaterial = material;

  for (let i = 0; i < count; i++) {
    const radius = minRadius + Math.random() * (maxRadius - minRadius);
    const reach = radius * (1 + WOBBLE); // keeps the whole blob inside the area
    const x = area.minX + reach + Math.random() * (area.maxX - area.minX - reach * 2);
    const z = area.minZ + reach + Math.random() * (area.maxZ - area.minZ - reach * 2);
    level.icePatches.push(makePatch(level, x, z, radius, material));
  }
}

function makePatch(level, x, z, radius, material) {
  // A wobbly circle: two waves of random phase around the edge.
  const lumps = 2 + Math.floor(Math.random() * 3);
  const phase1 = Math.random() * Math.PI * 2, phase2 = Math.random() * Math.PI * 2;
  const points = [];
  for (let i = 0; i < OUTLINE_POINTS; i++) {
    const a = (i / OUTLINE_POINTS) * Math.PI * 2;
    const r = radius * (1 + WOBBLE * 0.6 * Math.sin(lumps * a + phase1) + WOBBLE * 0.4 * Math.sin((lumps + 3) * a + phase2));
    points.push([x + Math.cos(a) * r, z + Math.sin(a) * r]);
  }
  const maxRadius = Math.max(...points.map(([px, pz]) => Math.hypot(px - x, pz - z)));

  // Drawn in the shape's XY plane as (x, -z), then laid flat (see the polygon obstacle).
  const geometry = new ShapeGeometry(new Shape(points.map(([px, pz]) => new Vector2(px, -pz))), 2);
  const uv = geometry.attributes.uv; // world units: one crack tile per CRACK_TILE
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / CRACK_TILE, uv.getY(i) / CRACK_TILE);
  const mesh = new Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = ICE_HEIGHT;
  mesh.receiveShadow = true;
  level.scene.add(mesh);
  return { x, z, points, maxRadius, mesh };
}

let _crackTexture = null;
/** Pale ice with faint white cracks (drawn once, shared). */
function crackTexture() {
  if (_crackTexture) return _crackTexture;
  const px = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = px;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, px, px);
  ctx.strokeStyle = 'rgba(70, 120, 170, 0.6)'; // darker than the blue ice, so the cracks show
  for (let c = 0; c < 14; c++) {
    // A crack: a jagged line wandering from a random point.
    ctx.lineWidth = 0.5 + Math.random() * 1.2;
    ctx.beginPath();
    let cx = Math.random() * px, cy = Math.random() * px;
    let angle = Math.random() * Math.PI * 2;
    ctx.moveTo(cx, cy);
    for (let s = 0; s < 6; s++) {
      angle += (Math.random() - 0.5) * 1.2;
      cx += Math.cos(angle) * (10 + Math.random() * 20);
      cy += Math.sin(angle) * (10 + Math.random() * 20);
      ctx.lineTo(cx, cy);
    }
    ctx.stroke();
  }
  _crackTexture = new CanvasTexture(canvas);
  _crackTexture.wrapS = _crackTexture.wrapT = RepeatWrapping;
  _crackTexture.colorSpace = SRGBColorSpace;
  return _crackTexture;
}

function pointInPolygon(x, z, points) {
  let inside = false;
  points.forEach(([ax, az], i) => {
    const [bx, bz] = points[(i + 1) % points.length];
    if ((az > z) !== (bz > z) && x < ax + (z - az) * (bx - ax) / (bz - az)) inside = !inside;
  });
  return inside;
}

export function disposeIcePatches(level) {
  for (const patch of level.icePatches || []) {
    level.scene.remove(patch.mesh);
    patch.mesh.geometry.dispose();
  }
  level.icePatches = [];
  level._iceMaterial?.dispose(); // (the shared crack texture stays)
  level._iceMaterial = null;
}
