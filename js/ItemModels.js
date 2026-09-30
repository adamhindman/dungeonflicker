// js/ItemModels.js
// 3D display models for Sanctuary shop items.

import {
  CylinderGeometry, Group, Mesh, MeshStandardMaterial, OctahedronGeometry, TorusGeometry,
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

// Throwing knife: the blade is a flat triangular prism (a 3-sided cylinder has
// a vertex pointing along +Z), squeezed sideways into a long point.
export const KNIFE_BLADE_RADIUS = 0.8;
export const KNIFE_BLADE_THICKNESS = 0.14;
export const KNIFE_BLADE_NARROWING = 0.5; // x scale of the blade
export const KNIFE_STEEL = 0xdfe6ee;

/** The knife's triangular blade, lying flat with its tip along +Z. */
export function makeKnifeBlade() {
  const blade = new Mesh(
    new CylinderGeometry(KNIFE_BLADE_RADIUS, KNIFE_BLADE_RADIUS, KNIFE_BLADE_THICKNESS, 3),
    new MeshStandardMaterial({
      color: KNIFE_STEEL,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x8a96a4, // keeps the steel readable in dark rooms
      emissiveIntensity: 1,
      flatShading: true,
    }),
  );
  blade.scale.x = KNIFE_BLADE_NARROWING;
  return blade;
}

/**
 * A throwing knife standing on its hilt, point up: a steel blade with a gem
 * pommel in the item's colour. Origin is on the floor, so rotation.y spins it.
 * @param {number} gemColor - hex colour of the pommel gem
 */
export function makeKnifeModel(gemColor) {
  const blade = makeKnifeBlade();
  blade.rotation.x = -Math.PI / 2; // stand the flat blade upright, tip pointing up
  // Its back edge sits 0.5 × radius below its centre, resting on the gem.
  blade.position.y = HOVER_HEIGHT + GEM_SIZE * 1.8 + KNIFE_BLADE_RADIUS * 0.5;

  const gem = new Mesh(
    new OctahedronGeometry(GEM_SIZE * 0.8),
    new MeshStandardMaterial({
      color: gemColor,
      emissive: gemColor,
      emissiveIntensity: 0.9,
      metalness: 0.1,
      roughness: 0.1,
      flatShading: true,
    }),
  );
  gem.position.y = HOVER_HEIGHT + GEM_SIZE;

  const knife = new Group();
  knife.add(blade, gem);
  knife.rotation.z = TILT;

  const model = new Group();
  model.add(knife);
  return model;
}
