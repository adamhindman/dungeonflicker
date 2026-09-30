// js/SanctuaryShop.js
// Two random items displayed in the Sanctuary's alcoves. The character whose
// turn it is can buy one with their own mana/charges; a bought item disappears
// for the rest of this visit.
//
// Each display is a clickable "prop" (see SanctuaryShrine): GameController
// finds it with pickAt(), shows getInfo() in the disc-info popup, and calls
// activate() on click when canActivate() is true.

import { CylinderGeometry, Group, Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three';
import { ITEMS } from './ItemManager.js';
import { makeKnifeModel, makeRingModel } from './ItemModels.js';
import { getResource, formatAmount } from './PartyResources.js';

const OFFER_COUNT = 2;
const PEDESTAL_RADIUS = 0.4;   // plain coloured disc for items without a model
const PEDESTAL_HEIGHT = 0.2;
const SPIN_SPEED = 1.5;        // radians per second
const HIT_RADIUS = 0.8;        // generous invisible hover/click target
const HIT_HEIGHT = 1.8;

export class SanctuaryShop {
  constructor(gc) {
    this.gc = gc;
    this.pedestals = []; // [{ itemId, mesh, spinner, prop }]
  }

  /** Call after the Sanctuary's discs are spawned. */
  setup() {
    this.teardown();
    const level = this.gc.level;
    if (!level || !level.isSanctuary || !level.shopPositions) return;

    // Fisher–Yates shuffle, then take the first OFFER_COUNT.
    const itemIds = Object.keys(ITEMS);
    for (let i = itemIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [itemIds[i], itemIds[j]] = [itemIds[j], itemIds[i]];
    }
    itemIds.length = Math.min(itemIds.length, OFFER_COUNT);
    itemIds.forEach((itemId, i) => {
      const pos = level.shopPositions[i];
      if (!pos) return;
      const item = ITEMS[itemId];
      const mesh = new Group();
      mesh.position.set(pos.x, 0, pos.z);

      let spinner = null;
      if (item.model === 'ring' || item.model === 'knife') {
        spinner = item.model === 'ring' ? makeRingModel(item.color) : makeKnifeModel(item.color);
        mesh.add(spinner);
      } else {
        const disc = new Mesh(
          new CylinderGeometry(PEDESTAL_RADIUS, PEDESTAL_RADIUS, PEDESTAL_HEIGHT, 32),
          // Mostly self-lit so the colour stays vivid in the dim Sanctuary lighting.
          new MeshStandardMaterial({ color: item.color, emissive: item.color, emissiveIntensity: 0.8 }),
        );
        disc.position.y = PEDESTAL_HEIGHT / 2;
        mesh.add(disc);
      }

      // Invisible (fully transparent) cylinder so the item is easy to hover and click.
      const hitArea = new Mesh(
        new CylinderGeometry(HIT_RADIUS, HIT_RADIUS, HIT_HEIGHT, 16),
        new MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
      );
      hitArea.position.y = HIT_HEIGHT / 2;
      mesh.add(hitArea);
      this.gc.scene.add(mesh);

      const pedestal = { itemId, mesh, spinner };
      pedestal.prop = {
        getInfo: () => this._getInfo(itemId),
        canActivate: () => !this.gc.itemManager.purchaseBlocker(itemId, this._buyer()),
        activate: () => this._buy(pedestal),
      };
      this.pedestals.push(pedestal);
    });
  }

  /** Removes all pedestals from the scene. Call before Level.unload(). */
  teardown() {
    this.pedestals.forEach(p => this._removeMesh(p.mesh));
    this.pedestals = [];
  }

  /** Spins item models in place. Call every frame. */
  update(deltaTime) {
    for (const p of this.pedestals) {
      if (p.spinner) p.spinner.rotation.y += SPIN_SPEED * deltaTime;
    }
  }

  /** @returns {object|null} the prop for the item display the ray hits. */
  pickAt(raycaster) {
    for (const p of this.pedestals) {
      if (raycaster.intersectObject(p.mesh, true).length > 0) return p.prop;
    }
    return null;
  }

  _buyer() {
    return this.gc.itemManager.activeCharacter();
  }

  _getInfo(itemId) {
    const item = ITEMS[itemId];
    const buyer = this._buyer();
    const res = buyer && getResource(this.gc, buyer.kind);
    const cost = res ? formatAmount(res, item.cost) : `${item.cost} mana`;

    let description = item.description;
    if (buyer && res) {
      description += `\n\n${buyer.discName} has ${formatAmount(res, res.controller[res.field])}.`;
      const blocker = this.gc.itemManager.purchaseBlocker(itemId, buyer);
      description += blocker ? ` ${blocker}` : ` Click to buy for ${buyer.discName}.`;
    }
    return { name: item.name, cost, description };
  }

  _buy(pedestal) {
    if (!this.gc.itemManager.purchase(pedestal.itemId, this._buyer())) return;
    this._removeMesh(pedestal.mesh);
    this.pedestals = this.pedestals.filter(p => p !== pedestal);
    if (this.gc.soundManager) this.gc.soundManager.playPurchase();
  }

  _removeMesh(group) {
    this.gc.scene.remove(group);
    group.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) o.material.dispose();
    });
  }
}
