import * as THREE from 'three';
import { greaterThanEqual } from 'three/tsl';

export class World extends THREE.Mesh {
    #objectMap = new Map();
    constructor(width, height) {
        super();

        this.width = width;
        this.height = height;
        this.treeCount = 5;
        this.rockCount = 15;
        this.bushCount = 5;

        this.generate();
    }

    generate(){
        this.createTerrain();
        this.createTrees();
        this.createRocks();
        this.createBushes();
    }

    createTerrain() {
        if (this.terrain) {
            this.terrain.geometry.dispose();
            this.terrain.material.dispose();
            this.remove(this.terrain);
        }
        const terrainGeometry = new THREE.PlaneGeometry(this.width, this.height, this.width, this.height);
        const terrainMaterial = new THREE.MeshStandardMaterial({ color: 0x50a000/*, wireframe: true*/ });
        this.terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
        this.terrain.rotation.x = -Math.PI / 2;
        this.terrain.position.set(this.width / 2, 0, this.height / 2);
        this.add(this.terrain);
    }

    createTrees() {
        const treeRadius = 0.2;
        const treeHeight = 1;

        const treeGeometry = new THREE.ConeGeometry(treeRadius, treeHeight, 8);
        const treeMaterial = new THREE.MeshStandardMaterial({ color: 0x305010, flatShading: true });

        this.trees = new THREE.Group();
        this.add(this.trees);

        for (let i = 0; i < this.treeCount; i++) {
            const treeMesh = new THREE.Mesh(treeGeometry, treeMaterial);
            
            const coords = new THREE.Vector2(
                Math.floor(this.width * Math.random()),
                Math.floor(this.height * Math.random())
            )
            if(this.#objectMap.has(`${coords.x}: ${coords.y}`)) continue;

            treeMesh.position.set(coords.x + 0.5, treeHeight / 2, coords.y + 0.5);
            this.trees.add(treeMesh);

            this.#objectMap.set(`${coords.x}: ${coords.y}`,treeMesh)
            
        }
    }

    createRocks() {
        const minRockRadius = 0.1;
        const maxRockRadius = 0.3;
        const minRockHeight = 0.2;
        const maxRockHeight = 0.98;

        const rockMaterial = new THREE.MeshStandardMaterial({ color: 0xb0b0b0, flatShading: true });

        this.rocks = new THREE.Group();
        this.add(this.rocks);

        for (let i = 0; i < this.rockCount; i++) {
            const rockRadius = minRockRadius + (Math.random() * (maxRockRadius - minRockRadius));
            const rockHeight = minRockHeight + (Math.random() * (maxRockHeight - minRockHeight));
            const rockGeometry = new THREE.SphereGeometry(rockRadius, 6, 5);
            const rockMesh = new THREE.Mesh(rockGeometry, rockMaterial);

            const coords = new THREE.Vector2(
                Math.floor(this.width * Math.random()),
                Math.floor(this.height * Math.random())
            )
            if(this.#objectMap.has(`${coords.x}: ${coords.y}`)) continue;
            rockMesh.position.set(coords.x + 0.5, 0, coords.y + 0.5);

            rockMesh.scale.y = rockHeight;
            this.trees.add(rockMesh);

            this.#objectMap.set(`${coords.x}: ${coords.y}`,rockMesh);
        }
    }

    createBushes() {
        const minBushRadius = 0.05;
        const maxBushRadius = 0.2;
        // const minBushHeight = 0.2;
        // const maxBushHeight = 0.98;

        const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x80a040, flatShading: true });

        this.bushes = new THREE.Group();
        this.add(this.bushes);

        for (let i = 0; i < this.bushCount; i++) {
            const bushRadius = minBushRadius + (Math.random() * (maxBushRadius - minBushRadius));
            // const bushHeight = minBushHeight + (Math.random() * (maxBushHeight - minBushHeight));
            const bushGeometry = new THREE.SphereGeometry(bushRadius, 8, 8);
            const bushMesh = new THREE.Mesh(bushGeometry, bushMaterial);

            const coords = new THREE.Vector2(
                Math.floor(this.width * Math.random()),
                Math.floor(this.height * Math.random())
            )
            if(this.#objectMap.has(`${coords.x}: ${coords.y}`)) continue;
            bushMesh.position.set(coords.x + 0.5, bushRadius, coords.y + 0.5);
            // bushMesh.scale.y = bushHeight;
            this.bushes.add(bushMesh);

            this.#objectMap.set(`${coords.x}: ${coords.y}`,bushMesh);
        }
    }
}