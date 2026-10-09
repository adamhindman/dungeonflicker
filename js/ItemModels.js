// js/ItemModels.js
// 3D display models for Sanctuary shop items.

import {
  BoxGeometry, CircleGeometry, CylinderGeometry, DoubleSide, ExtrudeGeometry, LatheGeometry, Shape, Group, Mesh, MeshStandardMaterial,
  OctahedronGeometry, SphereGeometry, TorusGeometry, Vector2,
} from 'three';

const RING_RADIUS = 0.6;
const BAND_THICKNESS = 0.14;
const GEM_SIZE = 0.26;
const HOVER_HEIGHT = 0.3; // gap between the floor and the bottom of the band
const TILT = 12.5 * Math.PI / 180; // ring leans slightly off vertical as it spins

/**
 * A standing gold ring with a gem set on top. Every ring shares this model;
 * only the gem colour differs. The group's origin is on the floor under the
 * ring's centre, so spinning it (rotation.y) turns the ring in place.
 * @param {number} gemColor - hex colour of the gem
 */
export function makeRingModel(gemColor) {
  const band = new Mesh(
    new TorusGeometry(RING_RADIUS, BAND_THICKNESS, 16, 48),
    new MeshStandardMaterial({
      color: 0xffc53d,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0xb07800, // keeps the gold readable in the dim Sanctuary
      emissiveIntensity: 0.9,
    }),
  );

  const gem = new Mesh(
    new OctahedronGeometry(GEM_SIZE),
    new MeshStandardMaterial({
      color: gemColor,
      emissive: gemColor,
      emissiveIntensity: 0.9,
      metalness: 0.1,
      roughness: 0.1,
      flatShading: true,
    }),
  );
  gem.scale.y = 1.3;
  gem.position.y = RING_RADIUS + BAND_THICKNESS + GEM_SIZE * 0.9;

  // The torus stands upright by default (it lies in the XY plane).
  const ring = new Group();
  ring.add(band, gem);
  ring.position.y = HOVER_HEIGHT + RING_RADIUS + BAND_THICKNESS;
  ring.rotation.z = TILT;

  const model = new Group();
  model.add(ring);
  return model;
}

// Spectacles: two round brass rims with glass lenses, a little arched bridge
// between them and straight arms running back from the outer edges. They
// stand upright facing +Z, hovering and tilted like the rings.
const SPECS_RIM_RADIUS = 0.27;
const SPECS_RIM_THICKNESS = 0.035;
const SPECS_LENS_GAP = 0.16;       // between the two rims
const SPECS_ARM_LENGTH = 0.85;
const SPECS_BRASS = {
  color: 0xc9a04a,
  metalness: 0.85,
  roughness: 0.3,
  emissive: 0x6e4f14, // keeps the brass readable in the dim Sanctuary
  emissiveIntensity: 0.9,
};

/** A pair of round brass spectacles. Origin on the floor, so rotation.y spins it. */
export function makeSpectaclesModel() {
  const brass = new MeshStandardMaterial(SPECS_BRASS);
  const glass = new MeshStandardMaterial({
    color: 0xdff4ff, metalness: 0, roughness: 0.05, transparent: true, opacity: 0.25,
    side: DoubleSide, depthWrite: false, emissive: 0x5f7f8f, emissiveIntensity: 0.4,
  });
  const lensX = SPECS_RIM_RADIUS + SPECS_LENS_GAP / 2; // each lens's centre, either side of the middle

  const frame = new Group();
  for (const sign of [-1, 1]) {
    // Rim and lens (a torus and a disc both lie in the XY plane, facing +Z)
    const rim = new Mesh(new TorusGeometry(SPECS_RIM_RADIUS, SPECS_RIM_THICKNESS, 12, 40), brass);
    rim.position.x = sign * lensX;
    const lens = new Mesh(new CircleGeometry(SPECS_RIM_RADIUS, 40), glass);
    lens.position.x = sign * lensX;
    // Arm: straight back from the rim's outer edge
    const arm = new Mesh(new CylinderGeometry(SPECS_RIM_THICKNESS * 0.8, SPECS_RIM_THICKNESS * 0.8, SPECS_ARM_LENGTH, 8), brass);
    arm.rotation.x = Math.PI / 2;
    arm.position.set(sign * (lensX + SPECS_RIM_RADIUS), 0.04, -SPECS_ARM_LENGTH / 2);
    frame.add(lens, rim, arm);
  }
  // Bridge: a small arch over the gap between the rims
  const bridge = new Mesh(
    new TorusGeometry(SPECS_LENS_GAP / 2 + SPECS_RIM_THICKNESS, SPECS_RIM_THICKNESS * 0.8, 8, 16, Math.PI),
    brass,
  );
  bridge.position.y = 0.06;
  frame.add(bridge);

  // Lifted onto the pedestal and pushed forward a little, so the whole pair
  // (rims in front, arms behind) is centred over it as it spins.
  frame.position.set(0, HOVER_HEIGHT + SPECS_RIM_RADIUS + 0.25, SPECS_ARM_LENGTH * 0.35);
  frame.rotation.z = TILT;

  const model = new Group();
  model.add(frame);
  return model;
}

// Hardy Shield: a thin steel slab. Its long side runs along local X and its
// face points along local +Z.
export const SHIELD_THICKNESS = 0.2;
export const SHIELD_HEIGHT = 0.9;
const SHIELD_STEEL = 0xb8c0cc;

/**
 * The in-game shield, `length` long, with its bottom on the floor and a strip
 * of the item's colour along the top edge.
 */
export function makeShieldMesh(length, trimColor) {
  const slab = new Mesh(
    new BoxGeometry(length, SHIELD_HEIGHT, SHIELD_THICKNESS),
    new MeshStandardMaterial({
      color: SHIELD_STEEL,
      metalness: 0.8,
      roughness: 0.35,
      emissive: 0x4a525e, // keeps the steel readable in dark rooms
      emissiveIntensity: 1,
    }),
  );
  slab.position.y = SHIELD_HEIGHT / 2;
  const trim = new Mesh(
    new BoxGeometry(length, 0.12, SHIELD_THICKNESS * 1.3),
    new MeshStandardMaterial({ color: trimColor, emissive: trimColor, emissiveIntensity: 0.8 }),
  );
  trim.position.y = SHIELD_HEIGHT;
  const shield = new Group();
  shield.add(slab, trim);
  return shield;
}

// Shop shield size: a classic heater shield (flat top, straight sides, curving
// to a point at the bottom).
const HEATER_WIDTH = 1.0;
const HEATER_HEIGHT = 1.25;
const HEATER_THICKNESS = 0.1;

/**
 * The shop display: a small upright steel heater shield. Origin is on the
 * floor, so rotation.y spins it.
 */
export function makeShieldModel() {
  const w = HEATER_WIDTH / 2, top = HEATER_HEIGHT / 2, shoulder = 0.05;
  const outline = new Shape();
  outline.moveTo(-w, top);
  outline.lineTo(w, top);
  outline.lineTo(w, shoulder);
  outline.quadraticCurveTo(w, -top * 0.55, 0, -top);   // right side sweeps to the point
  outline.quadraticCurveTo(-w, -top * 0.55, -w, shoulder);
  outline.closePath();

  const geometry = new ExtrudeGeometry(outline, {
    depth: HEATER_THICKNESS,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 2,
    curveSegments: 16,
  });
  geometry.center();
  const slab = new Mesh(
    geometry,
    new MeshStandardMaterial({
      color: SHIELD_STEEL,
      metalness: 0.85,
      roughness: 0.3,
      emissive: 0x4a525e,
      emissiveIntensity: 1,
    }),
  );

  const shield = new Group();
  shield.add(slab);
  shield.position.y = HOVER_HEIGHT + HEATER_HEIGHT / 2;
  shield.rotation.z = TILT;

  const model = new Group();
  model.add(shield);
  return model;
}

// Throwing knife: the blade is a flat triangular prism (a 3-sided cylinder has
// a vertex pointing along +Z), squeezed sideways into a long, pointy isosceles
// triangle about 5× as long as it is wide, with a small handle behind its base.
export const KNIFE_BLADE_RADIUS = 0.8;
export const KNIFE_BLADE_THICKNESS = 0.14;
const KNIFE_BLADE_NARROWING = 0.3; // sideways squeeze, baked into the geometry
export const KNIFE_STEEL = 0xdfe6ee;
// The blade's back edge (its base) sits half a radius behind its centre.
const KNIFE_BASE_Z = -KNIFE_BLADE_RADIUS / 2;
const KNIFE_GUARD_WIDTH = 0.34;
const KNIFE_GUARD_DEPTH = 0.07;
const KNIFE_GRIP_LENGTH = 0.38;
const KNIFE_GRIP_RADIUS = 0.06;
const KNIFE_POMMEL_RADIUS = 0.08;
const KNIFE_HANDLE_LENGTH = KNIFE_GUARD_DEPTH + KNIFE_GRIP_LENGTH + KNIFE_POMMEL_RADIUS;
const KNIFE_GRIP_COLOR = 0x5a3a22; // dark leather

/** The knife's triangular blade, lying flat with its tip along +Z. */
export function makeKnifeBlade() {
  // The squeeze is applied to the geometry, not mesh.scale: the game resets the
  // scale of whichever disc is being aimed or thrown.
  const geometry = new CylinderGeometry(KNIFE_BLADE_RADIUS, KNIFE_BLADE_RADIUS, KNIFE_BLADE_THICKNESS, 3);
  geometry.scale(KNIFE_BLADE_NARROWING, 1, 1);
  const blade = new Mesh(
    geometry,
    new MeshStandardMaterial({
      color: KNIFE_STEEL,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x8a96a4, // keeps the steel readable in dark rooms
      emissiveIntensity: 1,
      flatShading: true,
    }),
  );
  return blade;
}

/**
 * The knife's handle, in the blade's own frame (so add it to the blade): a
 * steel crossguard against the blade's base, a leather grip behind it along
 * −Z, and a round pommel at the end.
 */
export function makeKnifeHandle() {
  const steel = new MeshStandardMaterial({
    color: KNIFE_STEEL, metalness: 0.9, roughness: 0.25, emissive: 0x8a96a4, emissiveIntensity: 1,
  });
  const guard = new Mesh(new BoxGeometry(KNIFE_GUARD_WIDTH, KNIFE_BLADE_THICKNESS * 1.3, KNIFE_GUARD_DEPTH), steel);
  guard.position.z = KNIFE_BASE_Z - KNIFE_GUARD_DEPTH / 2;

  const grip = new Mesh(
    new CylinderGeometry(KNIFE_GRIP_RADIUS, KNIFE_GRIP_RADIUS, KNIFE_GRIP_LENGTH, 12),
    new MeshStandardMaterial({ color: KNIFE_GRIP_COLOR, roughness: 0.85, emissive: 0x24170d, emissiveIntensity: 1 }),
  );
  grip.rotation.x = Math.PI / 2; // lie along Z
  grip.position.z = KNIFE_BASE_Z - KNIFE_GUARD_DEPTH - KNIFE_GRIP_LENGTH / 2;

  const pommel = new Mesh(new SphereGeometry(KNIFE_POMMEL_RADIUS, 12, 8), steel);
  pommel.position.z = KNIFE_BASE_Z - KNIFE_GUARD_DEPTH - KNIFE_GRIP_LENGTH;

  const handle = new Group();
  handle.add(guard, grip, pommel);
  return handle;
}

/**
 * The shop display: the knife standing point-up, hovering just above the
 * floor. Origin is on the floor, so rotation.y spins it.
 */
export function makeKnifeModel() {
  const blade = makeKnifeBlade();
  blade.add(makeKnifeHandle());
  blade.rotation.x = -Math.PI / 2; // stand the flat blade upright, tip pointing up
  // Its back edge sits 0.5 × radius below its centre, and the handle below that.
  blade.position.y = HOVER_HEIGHT + KNIFE_BLADE_RADIUS * 0.5 + KNIFE_HANDLE_LENGTH;

  const knife = new Group();
  knife.add(blade);
  knife.rotation.z = TILT;

  const model = new Group();
  model.add(knife);
  return model;
}

// ── Potion flasks ──────────────────────────────────────────────────────────
// Each flask is a glass shell spun from a profile (radius, height) around the
// vertical axis, glowing liquid inside it up to a fill line, and a cork.
// Profiles run from the bottom centre to the lip; heights are from the
// flask's base.
const HEALING_FLASK = {
  // Round-bellied: a ball with a narrow neck.
  profile: [[0, 0.04], [0.2, 0.07], [0.33, 0.17], [0.4, 0.31], [0.41, 0.45], [0.37, 0.6],
            [0.26, 0.74], [0.14, 0.84], [0.12, 0.9], [0.12, 1.1], [0.15, 1.13], [0.15, 1.18]],
  fillHeight: 0.62,
  liquidColor: 0xff2e4d, // the Healing Orb's red
};
const RESURRECTION_FLASK = {
  // Tall and conical: a wide flat base tapering to a long neck.
  profile: [[0, 0.03], [0.36, 0.03], [0.39, 0.07], [0.3, 0.38], [0.19, 0.7], [0.11, 0.82],
            [0.11, 1.14], [0.14, 1.17], [0.14, 1.22]],
  fillHeight: 0.46,
  liquidColor: 0xffc83d, // the Big Golden Orb's gold
};
const LIQUID_INSET = 0.85;     // liquid radius as a share of the glass's
const CORK_COLOR = 0x8a5a2b;

/** Radius of `profile` at height `y`, interpolated between its points. */
function profileRadiusAt(profile, y) {
  for (let i = 1; i < profile.length; i++) {
    const [r0, y0] = profile[i - 1];
    const [r1, y1] = profile[i];
    if (y >= y0 && y <= y1) return y1 === y0 ? r1 : r0 + (r1 - r0) * (y - y0) / (y1 - y0);
  }
  return profile[profile.length - 1][0];
}

/**
 * A potion flask built from one of the specs above, hovering and tilted like
 * the other shop items. Origin is on the floor, so rotation.y spins it.
 */
function makeFlaskModel({ profile, fillHeight, liquidColor }) {
  const glass = new Mesh(
    new LatheGeometry(profile.map(([r, y]) => new Vector2(r, y)), 32),
    new MeshStandardMaterial({
      color: 0xd8eef5,
      metalness: 0,
      roughness: 0.05,
      transparent: true,
      opacity: 0.3,
      side: DoubleSide,
      depthWrite: false, // so the liquid shows through
      emissive: 0x6f8a94, // keeps the glass's outline readable in the dim Sanctuary
      emissiveIntensity: 0.4,
    }),
  );

  // The liquid: the glass's profile up to the fill line, a little narrower,
  // closed off flat at the top.
  const below = profile.filter(([, y]) => y < fillHeight);
  const liquidProfile = [...below, [profileRadiusAt(profile, fillHeight), fillHeight], [0, fillHeight]]
    .map(([r, y]) => new Vector2(r * LIQUID_INSET, y + 0.01));
  const liquid = new Mesh(
    new LatheGeometry(liquidProfile, 32),
    new MeshStandardMaterial({
      color: liquidColor,
      emissive: liquidColor,
      emissiveIntensity: 0.8,
      metalness: 0.1,
      roughness: 0.2,
    }),
  );

  // A cork filling the top of the neck and standing a little proud of it.
  const [lipRadius, lipHeight] = profile[profile.length - 1];
  const cork = new Mesh(
    new CylinderGeometry(lipRadius * 0.95, lipRadius * 0.8, 0.18, 16),
    new MeshStandardMaterial({ color: CORK_COLOR, roughness: 0.9, emissive: 0x2e1d0e, emissiveIntensity: 1 }),
  );
  cork.position.y = lipHeight;

  const flask = new Group();
  flask.add(liquid, glass, cork); // liquid first: drawn before the see-through glass
  flask.position.y = HOVER_HEIGHT;
  flask.rotation.z = TILT;

  const model = new Group();
  model.add(flask);
  return model;
}

/** A round-bellied flask of red healing potion. */
export function makeHealingFlaskModel() {
  return makeFlaskModel(HEALING_FLASK);
}

/** A tall conical flask of golden resurrection potion. */
export function makeResurrectionFlaskModel() {
  return makeFlaskModel(RESURRECTION_FLASK);
}
