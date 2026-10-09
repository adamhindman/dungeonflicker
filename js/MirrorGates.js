// js/MirrorGates.js
// Mirror Gates: paired panels set flat against a solid surface (an outer wall,
// an inner wall, the face of an obstacle). A disc that slides into one comes
// straight out of its partner, at the same speed, at the same angle to the
// gate and at the same point across its width — so a shot into the left edge
// of a gate at 30° leaves the left edge of its partner at 30°. Paired gates
// share a colour: each is an arched mirror glowing in its pair's colour.
//
// Gates work on one side only (their face). Everything that slides goes
// through — party, monsters, fireballs, bombs, the knife, the Resurrection
// flask — except the Pursuer, a disc phased by the Ghost Ring, and anything
// wider than the gate (it just bounces off the wall).
//
// A level adds gates with addMirrorGate() and then calls linkMirrorGates();
// PhysicsEngine calls tryMirrorGate() for every moving disc, and Level calls
// updateMirrorGates() every frame and disposeMirrorGates() on unload.

import {
  AdditiveBlending, BufferAttribute, BufferGeometry, CanvasTexture, DoubleSide, Group, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, Points, PointsMaterial, SRGBColorSpace, Shape, ShapeGeometry,
  SphereGeometry, Sprite, SpriteMaterial,
} from 'three';

export const GATE_WIDTH = 4;
export const GATE_COLORS = {
  red: 0xe84545,
  orange: 0xf0923a,
  green: 0x5cc463,
  blue: 0x3b82f6,
  purple: 0xb43fd6,
};

const GATE_HEIGHT = 4;           // to the top of the arch
const TOUCH_SLACK = 0.02;        // a disc this close to the face counts as touching it
const BEHIND_LIMIT = -0.6;       // ignore discs this far behind the face (the far side of a thin wall)
const EXIT_GAP = 0.05;           // a disc comes out this far clear of its exit
const MIN_EXIT_SPEED = 0.12;     // a disc that crept in is pushed out at least this fast (~3 units)
const SHOW_PAIR_COLORS = false;  // false: every gate looks the same, so the pairs are a puzzle
const SHOW_SWIRL = true;         // (pairs hidden) a slowly turning black-and-violet swirl, not plain black
const PANEL_GLOW = SHOW_PAIR_COLORS ? 0.25 : SHOW_SWIRL ? 1.5 : 0; // the mirror's resting glow
const PANEL_OPACITY = 1;         // below 1, the wall shows through
const FLASH_GLOW = SHOW_PAIR_COLORS ? 2.5 : SHOW_SWIRL ? 3.5 : 0.8; // its glow just after a disc goes through
const SWIRL_RGB = [45, 12, 72];    // the deep purple in the swirl
const SWIRL_BASE = 0.3;          // the faint glow over the whole arch, as a share of the swirl's brightest
const OUTLINE_WIDTH = 0.15;      // the hover outline around a gate and its partner
const OUTLINE_COLOR = 0xd8c8ff;
const SWIRL_SPEED = 0.35;        // radians per second (each gate ±25%, either way round)
const SWIRL_ZOOM = 0.7;          // < 1 keeps the turning arch's corners inside the round pattern
const FLASH_FADE = 3;            // per second
const LAMP_RADIUS = 0.16;        // the red bead above each gate
const LAMP_RAISE = 0.4;          // above the top of the arch
const LAMP_ON = 0xb02020;        // red: a disc has been through
const LAMP_OFF = 0x1c0c0c;       // dark: none has yet
const LAMP_GLOW_SIZE = 1.1;      // the soft glow around the lamp
const LAMP_GLOW_OPACITY = 0.6;
const MOTE_COUNT = 14;           // per gate
const MOTE_LIFE = 2.6;           // seconds from appearing to vanishing into the arch (±30%)
const MOTE_SIZE = 0.18;
const MOTE_REACH = 2.5;          // how far out in front of the gate they appear
const MOTE_SPREAD = 0.6;         // how far past the arch's sides and top
const MOTE_RGB = [0.85, 0.8, 1]; // a pale, faintly violet white (the same on every gate)
const MOTE_BRIGHTNESS = 0.9;

/**
 * Adds a gate to `level` (from a level loader).
 * @param {object} level
 * @param {object} spec  { pair: any id shared by exactly two gates (a colour
 *   name in GATE_COLORS also gives the pair that colour, when colours are
 *   shown), x, z: centre of the gate on the surface's face; nx, nz: the face's
 *   outward normal (unit); width?: across the face }
 */
export function addMirrorGate(level, { pair, x, z, nx, nz, width = GATE_WIDTH }) {
  const color = GATE_COLORS[pair] ?? 0xffffff;
  const gate = {
    pair, color, x, z, nx, nz, width,
    tx: nz, tz: -nx,   // along the face: the normal turned a quarter turn
    partner: null,
    flash: 0,
    group: new Group(),
    panel: null,
  };

  // Built facing local +Z, then turned so +Z is the gate's normal.
  const { group } = gate;
  group.position.set(x, 0, z);
  group.rotation.y = Math.atan2(nx, nz);

  // The mirror: an arch (straight sides, round top). Either polished and
  // faintly lit in the pair's colour, or (SHOW_PAIR_COLORS off) black, with
  // a slowly turning violet swirl if SHOW_SWIRL, and nothing to tell which
  // gates are paired; it flashes brighter on use.
  const half = width / 2;
  const archGeometry = new ShapeGeometry(archShape(half, GATE_HEIGHT), 24);
  // UVs across the arch's bounding box (ShapeGeometry's are in shape units).
  const uv = archGeometry.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) + half) / width, uv.getY(i) / GATE_HEIGHT);

  // Every gate shares one swirl pattern but shows it its own way: its own
  // starting angle, speed and direction, and some mirrored, so no two gates
  // turn in step.
  if (!SHOW_PAIR_COLORS && SHOW_SWIRL) {
    gate.swirl = swirlTexture().clone();
    gate.swirl.center.set(0.5, 0.5);
    gate.swirl.repeat.set(Math.random() < 0.5 ? -SWIRL_ZOOM : SWIRL_ZOOM, SWIRL_ZOOM);
    gate.swirl.rotation = Math.random() * Math.PI * 2;
    gate.swirlSpeed = SWIRL_SPEED * (0.75 + Math.random() * 0.5) * (Math.random() < 0.5 ? -1 : 1);
  }
  gate.panel = new Mesh(
    archGeometry,
    new MeshStandardMaterial({
      ...(SHOW_PAIR_COLORS
        ? { color: 0xb8c0cc, metalness: 0.9, roughness: 0.15, emissive: color, emissiveIntensity: PANEL_GLOW }
        : { color: 0x000000, roughness: 0.4, emissive: 0xffffff, emissiveIntensity: PANEL_GLOW,
            emissiveMap: gate.swirl ?? null }),
      side: DoubleSide,
      // Only see-through when PANEL_OPACITY < 1. A see-through panel mustn't
      // write depth, and then a wall drawn after it can paint over it.
      ...(PANEL_OPACITY < 1 ? { transparent: true, opacity: PANEL_OPACITY, depthWrite: false } : {}),
    }),
  );
  gate.panel.position.z = 0.03;
  group.add(gate.panel);

  // The hover outline: a thin band around the arch, hidden until the gate or
  // its partner is hovered.
  const band = archShape(half + OUTLINE_WIDTH, GATE_HEIGHT + OUTLINE_WIDTH);
  band.holes.push(archShape(half, GATE_HEIGHT));
  gate.outline = new Mesh(
    new ShapeGeometry(band, 24),
    new MeshBasicMaterial({ color: OUTLINE_COLOR, side: DoubleSide }),
  );
  gate.outline.position.z = 0.03;
  gate.outline.visible = false;
  group.add(gate.outline);

  // A red lamp above the arch, dark until a disc passes through the gate
  // (either way), when it lights up, so the party can tell which gates have
  // been tried. Just a glowing bead, not a light.
  gate.lamp = new Mesh(
    new SphereGeometry(LAMP_RADIUS, 12, 8),
    new MeshBasicMaterial({ color: LAMP_OFF }),
  );
  gate.lamp.position.set(0, GATE_HEIGHT + LAMP_RAISE, LAMP_RADIUS);
  group.add(gate.lamp);
  // A small soft glow around it (always facing the camera).
  gate.lampGlow = new Sprite(new SpriteMaterial({
    map: moteTexture(), color: LAMP_ON, transparent: true, opacity: LAMP_GLOW_OPACITY,
    blending: AdditiveBlending, depthWrite: false,
  }));
  gate.lampGlow.scale.setScalar(LAMP_GLOW_SIZE);
  gate.lampGlow.position.copy(gate.lamp.position);
  gate.lampGlow.visible = false;
  group.add(gate.lampGlow);

  gate.motes = makeMotes(width);
  group.add(gate.motes.points);

  level.scene.add(group);
  level.mirrorGates.push(gate);
  return gate;
}

/** An arch outline: straight sides from the floor, a round top; `height` to its peak. */
function archShape(half, height) {
  const shape = new Shape();
  shape.moveTo(-half, 0);
  shape.lineTo(half, 0);
  shape.lineTo(half, height - half);
  shape.absarc(0, height - half, half, 0, Math.PI, false);
  shape.lineTo(-half, 0);
  return shape;
}

/** The gate whose arch the ray hits first, or null. */
export function pickMirrorGate(level, raycaster) {
  const gates = level.mirrorGates || [];
  const hit = raycaster.intersectObjects(gates.map(g => g.panel), false)[0];
  return hit ? gates.find(g => g.panel === hit.object) : null;
}

/** Outlines `gate` and its partner (null: no gate is hovered). */
export function setHoveredMirrorGate(level, gate) {
  for (const g of level.mirrorGates || []) {
    g.outline.visible = !!gate && (g === gate || g === gate.partner);
  }
}

/** Pairs up the level's gates by their pair id (each id must appear exactly twice). */
export function linkMirrorGates(level) {
  for (const gate of level.mirrorGates) {
    const partners = level.mirrorGates.filter(g => g.pair === gate.pair && g !== gate);
    if (partners.length !== 1) console.warn(`[mirror gates] ${gate.pair} has ${partners.length + 1} gates`);
    gate.partner = partners[0] ?? null;
  }
}

/** Can `disc` go through `gate` at all? Not if it's wider than the gate (a grown Blob). */
export function fitsThroughGate(disc, gate) {
  return disc.radius * 2 <= gate.width;
}

/**
 * The gate `disc` is sliding into, if any (it would go through it this step).
 * No side effects: the aim preview uses it too.
 */
export function gateEntered(level, disc) {
  const gates = level?.mirrorGates;
  if (!gates?.length || disc.kind === 'Pursuer' || disc.isGhost) return null;
  const p = disc.mesh.position;
  const v = disc.velocity;
  for (const gate of gates) {
    if (!gate.partner || !fitsThroughGate(disc, gate)) continue; // too big: it's just wall
    const vn = v.x * gate.nx + v.z * gate.nz;
    if (vn >= 0) continue; // not heading into it
    const dx = p.x - gate.x, dz = p.z - gate.z;
    const d = dx * gate.nx + dz * gate.nz;          // distance in front of the face
    if (d > disc.radius + TOUCH_SLACK || d < BEHIND_LIMIT) continue;
    const u = dx * gate.tx + dz * gate.tz;          // across the face
    if (Math.abs(u) > gate.width / 2) continue;
    return gate;
  }
  return null;
}

/**
 * Sends `disc` through a gate if it is sliding into one. Call after the disc
 * moves and before wall collision.
 * @returns {object|null} the exit gate, if it went through
 */
export function tryMirrorGate(gc, disc) {
  const gate = gateEntered(gc.level, disc);
  if (!gate) return null;
  const p = disc.mesh.position;
  const v = disc.velocity;
  const vn = v.x * gate.nx + v.z * gate.nz;
  const u = (p.x - gate.x) * gate.tx + (p.z - gate.z) * gate.tz; // across the face

  // Out of the partner: same point across the width and the same angle, as
  // if the two gates were one doorway (a half turn maps one onto the other).
  const out = gate.partner;
  const vt = v.x * gate.tx + v.z * gate.tz;
  const outSpeed = Math.max(-vn, MIN_EXIT_SPEED);
  const offset = disc.radius + EXIT_GAP;
  p.x = out.x - u * out.tx + out.nx * offset;
  p.z = out.z - u * out.tz + out.nz * offset;
  v.x = out.nx * outSpeed - vt * out.tx;
  v.z = out.nz * outSpeed - vt * out.tz;
  disc.moving = true; // (its spotlight and auras catch up on the next step)

  gate.flash = out.flash = 1;
  for (const g of [gate, out]) {
    g.lamp.material.color.setHex(LAMP_ON);
    g.lampGlow.visible = true;
  }
  gc.soundManager?.playMirrorGate();
  return out;
}

/** Drifts each gate's motes and fades its flash. Call every frame. */
export function updateMirrorGates(level, deltaTime) {
  for (const gate of level.mirrorGates || []) {
    updateMotes(gate.motes, gate.width, deltaTime);
    if (gate.swirl) gate.swirl.rotation += gate.swirlSpeed * deltaTime;
    if (gate.flash <= 0) continue;
    gate.flash = Math.max(0, gate.flash - deltaTime * FLASH_FADE);
    gate.panel.material.emissiveIntensity = PANEL_GLOW + (FLASH_GLOW - PANEL_GLOW) * gate.flash;
  }
}

// ── Swirl ───────────────────────────────────────────────────────────────────

let _swirlTexture = null;
/**
 * The swirl pattern (shared): two sets of spiral arms woven together, violet
 * on black, with a black eye in the middle. Drawn once.
 */
function swirlTexture() {
  if (_swirlTexture) return _swirlTexture;
  const px = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = px;
  const ctx = canvas.getContext('2d');
  const image = ctx.createImageData(px, px);
  const [vr, vg, vb] = SWIRL_RGB;
  for (let y = 0; y < px; y++) {
    for (let x = 0; x < px; x++) {
      const dx = (x + 0.5) / px - 0.5, dy = (y + 0.5) / px - 0.5;
      const r = Math.hypot(dx, dy) * 2;   // 0 in the middle, 1 at the edge
      const a = Math.atan2(dy, dx);
      const arms = 0.6 * Math.sin(3 * a + 9 * r) + 0.4 * Math.sin(5 * a - 14 * r + 1.3);
      const eye = Math.min(1, Math.max(0, (r - 0.05) / 0.3)); // black in the middle
      // A faint even glow everywhere (so the arch stands out from the wall),
      // brighter along the arms, darker in the eye.
      const k = SWIRL_BASE + (1 - SWIRL_BASE) * Math.pow((arms + 1) / 2, 2.2) * eye * 0.9;
      const i = (y * px + x) * 4;
      image.data[i] = vr * k;
      image.data[i + 1] = vg * k;
      image.data[i + 2] = vb * k;
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  _swirlTexture = new CanvasTexture(canvas);
  _swirlTexture.colorSpace = SRGBColorSpace;
  return _swirlTexture;
}

// ── Motes ───────────────────────────────────────────────────────────────────
// A few faint specks drift in from the air in front of each gate and are
// drawn into the arch, speeding up as they go, fading in and out: the gate
// seems to breathe in. All in the gate's local frame (the arch at z = 0).

let _moteTexture = null;
/** A small soft dot (shared by every gate's motes and lamp glow). */
function moteTexture() {
  if (_moteTexture) return _moteTexture;
  const px = 32;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = px;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(px / 2, px / 2, 0, px / 2, px / 2, px / 2);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, px, px);
  _moteTexture = new CanvasTexture(canvas);
  return _moteTexture;
}

function makeMotes(width) {
  const positions = new Float32Array(MOTE_COUNT * 3);
  const colors = new Float32Array(MOTE_COUNT * 3);
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('color', new BufferAttribute(colors, 3));
  const points = new Points(geometry, new PointsMaterial({
    size: MOTE_SIZE, map: moteTexture(), vertexColors: true, transparent: true,
    blending: AdditiveBlending, depthWrite: false,
  }));
  const motes = {
    points,
    from: new Float32Array(MOTE_COUNT * 3),
    to: new Float32Array(MOTE_COUNT * 3),
    age: new Float32Array(MOTE_COUNT),
    life: new Float32Array(MOTE_COUNT),
  };
  for (let i = 0; i < MOTE_COUNT; i++) {
    spawnMote(motes, i, width);
    motes.age[i] = Math.random() * motes.life[i]; // start mid-flight, not all at once
  }
  updateMotes(motes, width, 0);
  return motes;
}

/** Starts mote `i` somewhere in the air in front of the gate, bound for a point on the arch. */
function spawnMote(motes, i, width) {
  const half = width / 2;
  const rand = (a, b) => a + Math.random() * (b - a);
  const x = rand(-half - MOTE_SPREAD, half + MOTE_SPREAD);
  const y = rand(0.2, GATE_HEIGHT + MOTE_SPREAD * 0.5);
  motes.from.set([x, y, rand(MOTE_REACH * 0.4, MOTE_REACH)], i * 3);
  // Into the arch: pulled in towards its middle, within its straight sides.
  motes.to.set([x * 0.4, Math.min(Math.max(y * 0.8, 0.4), GATE_HEIGHT - half), 0], i * 3);
  motes.age[i] = 0;
  motes.life[i] = rand(MOTE_LIFE * 0.7, MOTE_LIFE * 1.3);
}

function updateMotes(motes, width, deltaTime) {
  const positions = motes.points.geometry.attributes.position;
  const colors = motes.points.geometry.attributes.color;
  for (let i = 0; i < MOTE_COUNT; i++) {
    motes.age[i] += deltaTime;
    if (motes.age[i] >= motes.life[i]) spawnMote(motes, i, width);
    const t = motes.age[i] / motes.life[i];
    const pull = t * t; // slow at first, then sucked in
    for (let k = 0; k < 3; k++) {
      const j = i * 3 + k;
      positions.array[j] = motes.from[j] + (motes.to[j] - motes.from[j]) * pull;
    }
    const brightness = Math.sin(Math.PI * t) * MOTE_BRIGHTNESS; // fade in, then out
    colors.array[i * 3] = brightness * MOTE_RGB[0];
    colors.array[i * 3 + 1] = brightness * MOTE_RGB[1];
    colors.array[i * 3 + 2] = brightness * MOTE_RGB[2];
  }
  positions.needsUpdate = true;
  colors.needsUpdate = true;
}

/** Is (x, z) with this padding too close to the front of a gate to start a disc there? */
export function nearMirrorGate(level, x, z, padding) {
  return (level.mirrorGates || []).some(g =>
    Math.hypot(x - g.x, z - g.z) < g.width / 2 + padding + 1);
}

export function disposeMirrorGates(level) {
  for (const gate of level.mirrorGates || []) {
    level.scene.remove(gate.group);
    const materials = new Set();
    gate.group.traverse(o => {
      o.geometry?.dispose();
      if (o.material) materials.add(o.material);
    });
    materials.forEach(m => m.dispose());
    gate.swirl?.dispose(); // this gate's copy (the shared pattern stays)
  }
  level.mirrorGates = [];
}
