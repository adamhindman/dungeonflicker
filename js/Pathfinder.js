import * as THREE from "three";

export default class Pathfinder {
  /**
   * Creates a Pathfinder instance to find paths on a walkable grid.
   * @param {number[][]} grid 2D array where 0 = walkable, 1 = blocked
   * @param {number} cellSize Size of each cell in world units
   */
  constructor(grid, cellSize) {
    this.grid = grid;
    this.cellSize = cellSize;

    this.gridDepth = grid.length;
    this.gridWidth = grid[0] ? grid[0].length : 0;
  }

  /**
   * Convert world position to grid cell coordinates.
   * @param {THREE.Vector3} pos World space position
   * @returns {{x: number, z: number}} Cell coordinates in grid indices
   */
  worldPosToCell(pos) {
    const x = Math.floor(pos.x / this.cellSize + this.gridWidth / 2);
    const z = Math.floor(pos.z / this.cellSize + this.gridDepth / 2);
    return { x, z };
  }

  /**
   * Convert grid cell coordinates to world position (center of cell).
   * @param {{x: number, z: number}} cell Grid cell indices
   * @returns {THREE.Vector3} World space position at center of cell
   */
  cellToWorldPos(cell) {
    const x = (cell.x - this.gridWidth / 2 + 0.5) * this.cellSize;
    const z = (cell.z - this.gridDepth / 2 + 0.5) * this.cellSize;
    return new THREE.Vector3(x, 0, z);
  }

  /**
   * Determine whether given cell indices are within grid bounds.
   * @param {number} x
   * @param {number} z
   * @returns {boolean}
   */
  isInsideGrid(x, z) {
    return x >= 0 && x < this.gridWidth && z >= 0 && z < this.gridDepth;
  }

  /**
   * Find a path from startPos to endPos in world coordinates.
   * Returns an array of THREE.Vector3 positions representing waypoints, or null if no path.
   * Uses A* algorithm on grid.
   * @param {THREE.Vector3} startPos
   * @param {THREE.Vector3} endPos
   * @returns {THREE.Vector3[] | null}
   */
  findPath(startPos, endPos) {
    const startCell = this.worldPosToCell(startPos);
    const endCell = this.worldPosToCell(endPos);

    if (
      !this.isInsideGrid(startCell.x, startCell.z) ||
      !this.isInsideGrid(endCell.x, endCell.z)
    ) {
      return null; // start or end out of grid bounds
    }
    if (
      this.grid[startCell.z][startCell.x] === 1 ||
      this.grid[endCell.z][endCell.x] === 1
    ) {
      return null; // start or end cell blocked
    }

    // A* node representation
    class Node {
      constructor(x, z, g, h, parent = null) {
        this.x = x;
        this.z = z;
        this.g = g; // cost from start to current node
        this.h = h; // heuristic cost to end node
        this.f = g + h; // total cost
        this.parent = parent;
      }
    }

    const openSet = [];
    const closedSet = new Set();

    const heuristic = (x1, z1, x2, z2) => {
      // Use Manhattan distance as heuristic
      return Math.abs(x1 - x2) + Math.abs(z1 - z2);
    };

    openSet.push(
      new Node(
        startCell.x,
        startCell.z,
        0,
        heuristic(startCell.x, startCell.z, endCell.x, endCell.z),
      ),
    );

    // Key for storing nodes in sets/maps: "x_z"
    const nodeKey = (x, z) => `${x}_${z}`;

    while (openSet.length > 0) {
      // Sort openSet by lowest f cost
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift();
      closedSet.add(nodeKey(current.x, current.z));

      // Check if reached end cell
      if (current.x === endCell.x && current.z === endCell.z) {
        // Retrace path
        const path = [];
        let curr = current;
        while (curr) {
          path.unshift(this.cellToWorldPos({ x: curr.x, z: curr.z }));
          curr = curr.parent;
        }
        return path;
      }

      // Check neighbors (up, down, left, right)
      const neighbors = [
        { x: current.x + 1, z: current.z },
        { x: current.x - 1, z: current.z },
        { x: current.x, z: current.z + 1 },
        { x: current.x, z: current.z - 1 },
      ];
      for (const neighbor of neighbors) {
        if (!this.isInsideGrid(neighbor.x, neighbor.z)) continue;
        if (this.grid[neighbor.z][neighbor.x] === 1) continue; // blocked
        if (closedSet.has(nodeKey(neighbor.x, neighbor.z))) continue;

        const gCost = current.g + 1; // cost to neighbor
        const hCost = heuristic(neighbor.x, neighbor.z, endCell.x, endCell.z);
        const existingNodeIndex = openSet.findIndex(
          (n) => n.x === neighbor.x && n.z === neighbor.z,
        );
        if (existingNodeIndex > -1) {
          if (gCost < openSet[existingNodeIndex].g) {
            openSet[existingNodeIndex].g = gCost;
            openSet[existingNodeIndex].f = gCost + hCost;
            openSet[existingNodeIndex].parent = current;
          }
        } else {
          openSet.push(new Node(neighbor.x, neighbor.z, gCost, hCost, current));
        }
      }
    }

    // No path found
    return null;
  }
}
