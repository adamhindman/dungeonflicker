// js/ItemModels.js
// 3D display models for Sanctuary shop items.

import {
  BoxGeometry, CylinderGeometry, ExtrudeGeometry, Shape, Group, Mesh, MeshStandardMaterial, OctahedronGeometry, TorusGeometry,
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
// triangle about 4× as long as it is wide.
export const KNIFE_BLADE_RADIUS = 0.8;
export const KNIFE_BLADE_THICKNESS = 0.14;
const KNIFE_BLADE_NARROWING = 0.38; // sideways squeeze, baked into the geometry
export const KNIFE_STEEL = 0xdfe6ee;

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
 * The shop display: the knife's blade standing point-up, hovering just above
 * the floor. Origin is on the floor, so rotation.y spins it.
 */
export function makeKnifeModel() {
  const blade = makeKnifeBlade();
  blade.rotation.x = -Math.PI / 2; // stand the flat blade upright, tip pointing up
  // Its back edge sits 0.5 × radius below its centre.
  blade.position.y = HOVER_HEIGHT + KNIFE_BLADE_RADIUS * 0.5;

  const knife = new Group();
  knife.add(blade);
  knife.rotation.z = TILT;

  const model = new Group();
  model.add(knife);
  return model;
}
