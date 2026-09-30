// js/ItemModels.js
// 3D display models for Sanctuary shop items.

import { Group, Mesh, MeshStandardMaterial, OctahedronGeometry, TorusGeometry } from 'three';

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
