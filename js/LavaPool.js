import { Vector2, Shape, ShapeGeometry, TextureLoader, RepeatWrapping, Color, MeshStandardMaterial, DoubleSide, Mesh } from 'three';

/**
 * Represents an irregular, blobby lava pool on the game field.
 * Uses a texture-mapped 2D shape to create a molten, organic appearance.
 */
class LavaPool {
    /**
     * Creates a new LavaPool.
     * @param {object} config - Configuration object for the lava pool.
     * @param {number} config.centerX - The X-coordinate of the center of the lava pool in world space.
     * @param {number} config.centerZ - The Z-coordinate of the center of the lava pool in world space.
     * @param {number} [config.baseRadius=5] - The average radius of the lava pool in world units.
     * @param {number} [config.numVertices=20] - The number of vertices to generate the shape.
     * @param {number} [config.irregularity=0.4] - A factor from 0 to 1 controlling shape deviation.
     * @param {number} [config.yPosition=0.05] - The Y-coordinate for the lava pool mesh.
     * @param {number} [config.scrollSpeedX] - Custom horizontal scroll speed for the lava texture.
     * @param {number} [config.scrollSpeedY] - Custom vertical scroll speed for the lava texture.
     */
    constructor({
        centerX,
        centerZ,
        baseRadius = 5,
        numVertices = 20,
        irregularity = 0.4,
        yPosition = 0.05,
        scrollSpeedX,
        scrollSpeedY
    }) {
        this.centerX = centerX;
        this.centerZ = centerZ;
        this.baseRadius = baseRadius;
        this.numVertices = Math.max(3, numVertices);
        this.irregularity = Math.max(0, Math.min(1, irregularity));
        this.yPosition = yPosition;

        // Stores {x, y} pairs for the 2D shape, relative to the pool's center (0,0).
        this.relativeVertices2D = [];
        this.mesh = null;
        this.lavaTexture = null;

        // Animation speeds (use provided values or default to random)
        this.scrollSpeedX = scrollSpeedX !== undefined ? scrollSpeedX : (Math.random() - 0.5) * 0.04 + 0.03;
        this.scrollSpeedY = scrollSpeedY !== undefined ? scrollSpeedY : (Math.random() - 0.5) * 0.04 + 0.02;

        this._generateShapeVertices();
        this._createMesh();
    }

    /**
     * Generates the 2D vertices for the blobby shape using summed sine waves.
     * @private
     */
    _generateShapeVertices() {
        this.relativeVertices2D = [];
        const twoPi = Math.PI * 2;

        const randomPhase1 = Math.random() * twoPi;
        const randomPhase2 = Math.random() * twoPi;
        const freq1 = 2 + Math.random() * 3;
        const freq2 = 4 + Math.random() * 4;

        for (let i = 0; i < this.numVertices; i++) {
            const angle = (i / this.numVertices) * twoPi;

            let radiusOffset = 0;
            radiusOffset += Math.sin(angle * freq1 + randomPhase1) * (this.baseRadius * this.irregularity * 0.6);
            radiusOffset += Math.sin(angle * freq2 + randomPhase2) * (this.baseRadius * this.irregularity * 0.4);

            const currentRadius = this.baseRadius + radiusOffset;

            const x = currentRadius * Math.cos(angle);
            const y = currentRadius * Math.sin(angle);

            this.relativeVertices2D.push({ x: x, y: y });
        }
    }

    /**
     * Creates the Three.js mesh for the lava pool with texture mapping.
     * @private
     */
    _createMesh() {
        if (this.relativeVertices2D.length < 3) {
return;
        }

        const shapePoints = this.relativeVertices2D.map(v => new Vector2(v.x, v.y));
        const shape = new Shape(shapePoints);
        const geometry = new ShapeGeometry(shape);

        // Load the lava texture
        const textureLoader = new TextureLoader();
        this.lavaTexture = textureLoader.load('images/lava-tile-1.webp');

        // Configure texture wrapping and variety
        this.lavaTexture.wrapS = RepeatWrapping;
        this.lavaTexture.wrapT = RepeatWrapping;

        // Randomize texture transform for variety between pools
        this.lavaTexture.offset.set(Math.random(), Math.random());
        this.lavaTexture.rotation = Math.random() * Math.PI * 2;

        // Scale texture repeat based on the pool's size
        const uvScale = 0.25; // Adjust this to change the "density" of the lava pattern
        this.lavaTexture.repeat.set(this.baseRadius * uvScale, this.baseRadius * uvScale);

        // Use MeshStandardMaterial with emissive properties for a "glowing" effect
        const material = new MeshStandardMaterial({
            map: this.lavaTexture,
            emissive: new Color(0xff4500),
            emissiveMap: this.lavaTexture,
            emissiveIntensity: 0.5,
            side: DoubleSide,
            transparent: true,
            opacity: 0.95
        });

        this.mesh = new Mesh(geometry, material);
        this.mesh.position.set(this.centerX, this.yPosition, this.centerZ);
        this.mesh.rotation.x = -Math.PI / 2;
        this.mesh.name = "LavaPool";
    }

    /**
     * Updates the lava texture animation.
     * @param {number} deltaTime - Time since last frame in seconds.
     */
    update(deltaTime = 0.016) {
        if (this.lavaTexture) {
            this.lavaTexture.offset.x += this.scrollSpeedX * deltaTime;
            this.lavaTexture.offset.y += this.scrollSpeedY * deltaTime;
        }
    }

    /**
     * @returns {THREE.Mesh | null}
     */
    getMesh() {
        return this.mesh;
    }

    /**
     * Ray casting algorithm to check if a point is inside the pool's irregular boundary.
     */
    isPointInside(worldX, worldZ) {
        if (!this.relativeVertices2D || this.relativeVertices2D.length < 3) {
            return false;
        }

        const localX = worldX - this.centerX;
        const localShapeY = -(worldZ - this.centerZ);

        let isInside = false;
        let j = this.relativeVertices2D.length - 1;
        for (let i = 0; i < this.relativeVertices2D.length; i++) {
            const vi = this.relativeVertices2D[i];
            const vj = this.relativeVertices2D[j];

            const intersect = ((vi.y > localShapeY) !== (vj.y > localShapeY)) &&
                (localX < (vj.x - vi.x) * (localShapeY - vi.y) / (vj.y - vi.y) + vi.x);

            if (intersect) {
                isInside = !isInside;
            }
            j = i;
        }
        return isInside;
    }

    /**
     * Cleans up GPU resources.
     */
    dispose() {
        if (this.mesh) {
            if (this.mesh.geometry) this.mesh.geometry.dispose();
            if (this.mesh.material) {
                const materials = Array.isArray(this.mesh.material) ? this.mesh.material : [this.mesh.material];
                materials.forEach(mat => {
                    if (mat.map) mat.map.dispose();
                    if (mat.emissiveMap) mat.emissiveMap.dispose();
                    mat.dispose();
                });
            }
            this.mesh = null;
            this.lavaTexture = null;
        }
        this.relativeVertices2D = [];
    }
}

export { LavaPool };
