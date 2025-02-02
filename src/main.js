import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import { World } from './world';

const gui = new GUI();

const stats = new Stats()
document.body.appendChild(stats.dom)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls( camera, renderer.domElement );

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const world = new World(5,5);
scene.add(world);

const sun = new THREE.DirectionalLight();
sun.position.set(1,2,3);
sun.intensity = 3;
scene.add(sun);

const ambient = new THREE.AmbientLight();
ambient.intensity = 0.5;
scene.add(ambient);

camera.position.set(10,2,10);
controls.update();

function animate() {
    controls.update();
    stats.update();
	renderer.render( scene, camera );
}

window.addEventListener('resize' , () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const worldFolder = gui.addFolder('World');
worldFolder.add(world, 'width', 1,200,1).name('Width');
worldFolder.add(world, 'height', 1,200,1).name('Height');
worldFolder.addColor(world.terrain.material, 'color').name('Color');
worldFolder.add(world, 'height', 1,200,1).name('Height');
worldFolder._onChange = () => {
    world.createTerrain();
}