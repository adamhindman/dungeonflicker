import * as THREE from 'three';

/**
 * Represents an irregular, blobby lava pool on the game field.
 * Creates a 2D shape and then a 3D mesh for use in a Three.js scene.
 */
class LavaPool {
    /**
     * Creates a new LavaPool.
     * @param {object} config - Configuration object for the lava pool.
     * @param {number} config.centerX - The X-coordinate of the center of the lava pool in world space.
     * @param {number} config.centerZ - The Z-coordinate of the center of the lava pool in world space.
     * @param {number} [config.baseRadius=50] - The average radius of the lava pool in world units.
     * @param {number} [config.numVertices=20] - The number of vertices to generate the shape. More vertices = smoother.
     * @param {number} [config.irregularity=0.4] - A factor from 0 (perfect circle) to 1 (highly irregular)
     *                                            controlling how much the shape deviates from a circle.
     * @param {number} [config.yPosition=0.1] - The Y-coordinate for the lava pool mesh,
     *                                          should be slightly above the ground (e.g., ground at Y=0) to prevent z-fighting.
     * @param {THREE.Color | string | number} [config.color=0xff4500] - The color of the lava (e.g., 'orangered', 0xff4500).
     */
    constructor({
        centerX,
        centerZ,
        baseRadius = 50,
        numVertices = 20,
        irregularity = 0.4,
        yPosition = 0.1,
        color = 0xff4500 // Default to a reddish-orange
    }) {
        this.centerX = centerX;
        this.centerZ = centerZ;
        this.baseRadius = baseRadius;
        this.numVertices = Math.max(3, numVertices); // Need at least 3 vertices for a shape
        this.irregularity = Math.max(0, Math.min(1, irregularity)); // Clamp irregularity between 0 and 1
        this.yPosition = yPosition;
        this.color = new THREE.Color(color);

        // Stores {x, y} pairs for the 2D shape, relative to the pool's center (0,0).
        // These x,y correspond to local X and local Y of the THREE.Shape before rotation.
        this.relativeVertices2D = [];
        this.mesh = null;

        this._generateShapeVertices();
        this._createMesh();
    }

    /**
     * Generates the 2D vertices for the blobby shape, relative to (0,0).
     * Uses a sum of sine waves for organic-looking irregularity.
     * @private
     */
    _generateShapeVertices() {
        this.relativeVertices2D = [];
        const twoPi = Math.PI * 2;

        // Random phases and frequencies for sine wave summation to make each blob unique
        const randomPhase1 = Math.random() * twoPi;
        const randomPhase2 = Math.random() * twoPi;
        // Frequencies determine how many "lobes" or "waves" the blob has
        const freq1 = 2 + Math.random() * 3; // Lower frequency component (e.g., 2-5 lobes)
        const freq2 = 4 + Math.random() * 4; // Higher frequency component (e.g., 4-8 smaller lobes)

        for (let i = 0; i < this.numVertices; i++) {
            const angle = (i / this.numVertices) * twoPi;

            let radiusOffset = 0;
            // Sum of sines for smoother, blobby variation.
            // The offset is scaled by baseRadius and the irregularity factor.
            radiusOffset += Math.sin(angle * freq1 + randomPhase1) * (this.baseRadius * this.irregularity * 0.6);
            radiusOffset += Math.sin(angle * freq2 + randomPhase2) * (this.baseRadius * this.irregularity * 0.4);

            const currentRadius = this.baseRadius + radiusOffset;

            // Generate 2D points relative to (0,0) for the shape definition
            const x = currentRadius * Math.cos(angle);
            const y = currentRadius * Math.sin(angle); // This 'y' is the second dimension in the 2D plane of the shape

            this.relativeVertices2D.push({ x: x, y: y });
        }
    }

    /**
     * Creates the Three.js mesh for the lava pool.
     * The mesh is a flat shape positioned on the XZ plane.
     * @private
     */
    _createMesh() {
        if (this.relativeVertices2D.length < 3) {
            console.warn('LavaPool: Not enough vertices to create a shape.');
            return;
        }

        // The THREE.Shape is defined in its own 2D XY plane.
        // Vertices are relative to the shape's origin (0,0).
        const shapePoints = this.relativeVertices2D.map(v => new THREE.Vector2(v.x, v.y));
        const shape = new THREE.Shape(shapePoints);
        const geometry = new THREE.ShapeGeometry(shape);

        // Using MeshBasicMaterial for a simple, unlit lava color.
        // For more advanced effects (like glowing or reacting to light), MeshStandardMaterial could be used.
        const material = new THREE.MeshBasicMaterial({
            color: this.color,
            side: THREE.DoubleSide, // Render both sides, important if camera can go below ground level
        });

        this.mesh = new THREE.Mesh(geometry, material);

        // Position the mesh at its world center coordinates.
        this.mesh.position.set(this.centerX, this.yPosition, this.centerZ);

        // Rotate the mesh to lay flat on the XZ plane (assuming a Y-up coordinate system).
        // The shape was defined in the XY plane (local to the shape).
        // We rotate it -90 degrees around its local X-axis.
        // After this rotation:
        // - Shape's local X-axis aligns with world X-axis.
        // - Shape's local Y-axis aligns with world -Z-axis (negative Z).
        this.mesh.rotation.x = -Math.PI / 2;

        this.mesh.name = "LavaPool"; // Useful for debugging or selecting in the scene
    }

    /**
     * Returns the Three.js mesh object for this lava pool.
     * The caller is responsible for adding this mesh to the Three.js scene.
     * @returns {THREE.Mesh | null} The mesh object, or null if it wasn't created.
     */
    getMesh() {
        return this.mesh;
    }

    /**
     * Checks if a given point (worldX, worldZ) is inside the 2D footprint of the lava pool.
     * Uses the ray casting algorithm.
     * @param {number} worldX - The X-coordinate of the point to check in world space.
     * @param {number} worldZ - The Z-coordinate of the point to check in world space.
     * @returns {boolean} True if the point is inside the polygon, false otherwise.
     */
    isPointInside(worldX, worldZ) {
        if (!this.relativeVertices2D || this.relativeVertices2D.length < 3) {
            return false;
        }

        // Transform the world point into the local 2D coordinate system of the shape.
        // The shape's vertices (this.relativeVertices2D) are defined relative to its center (0,0)
        // in a 2D plane that, after mesh transformations, aligns as:
        // - Shape's local X maps to world X (relative to centerX).
        // - Shape's local Y maps to world -Z (relative to centerZ).
        const localX = worldX - this.centerX;
        const localShapeY = -(worldZ - this.centerZ); // Invert Z transformation

        let isInside = false;
        let j = this.relativeVertices2D.length - 1; // Index of the last vertex
        for (let i = 0; i < this.relativeVertices2D.length; i++) {
            const vi = this.relativeVertices2D[i]; // Current vertex (localShapeX_i, localShapeY_i)
            const vj = this.relativeVertices2D[j]; // Previous vertex

            // Ray casting formula component:
            // Check if the ray (horizontal, from point to +infinity) crosses the edge (vi, vj)
            const intersect = ((vi.y > localShapeY) !== (vj.y > localShapeY)) &&
                (localX < (vj.x - vi.x) * (localShapeY - vi.y) / (vj.y - vi.y) + vi.x);

            if (intersect) {
                isInside = !isInside; // Flip a coin for each intersection
            }
            j = i; // Move to the next edge
        }
        return isInside;
    }

    /**
     * Disposes of the Three.js geometry and material associated with this lava pool.
     * This should be called when the lava pool is removed from the game to free up GPU resources.
     * The caller is also responsible for removing the mesh from the scene.
     */
    dispose() {
        if (this.mesh) {
            if (this.mesh.geometry) {
                this.mesh.geometry.dispose();
            }
            if (this.mesh.material) {
                // If material is an array (e.g. multi-material object)
                if (Array.isArray(this.mesh.material)) {
                    this.mesh.material.forEach(mat => mat.dispose());
                } else {
                    this.mesh.material.dispose();
                }
            }
            // Note: The mesh itself is not "disposed", but its components are.
            // If it's in a scene, it should be removed via scene.remove(this.mesh).
            this.mesh = null;
        }
        this.relativeVertices2D = []; // Clear vertices array
    }
}

// Export the class for use in other modules.
// If your project doesn't use ES6 modules (e.g., if THREE is a global variable from a <script> tag),
// you might need to adjust this (e.g., `window.LavaPool = LavaPool;`).
export { LavaPool };
