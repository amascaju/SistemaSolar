import * as THREE from "three";
import GUI from 'lil-gui'; 
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import './style.css';

const gui = new GUI();

const scene = new THREE.Scene();

const fov = 60;
const aspect = window.innerWidth/window.innerHeight;  
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
// camera.position.set(0,3,5)
// camera.lookAt(new THREE.Vector3(0,0,0))



const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild( renderer.domElement )

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// array d’objectes dels quals hem d’actualitzar la rotació.
const objects = [];

// emprarem una mateixa esfera per a tots.
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

// Es crea un objecte Pare
const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);


// Textures i propietats del Sol
const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);  // fem el sol més gran
solarSystem.add(sunMesh);
objects.push(sunMesh);

// Orbita Jupiter
const jupiterOrbit = new THREE.Object3D();
jupiterOrbit.position.x = 30;
solarSystem.add(jupiterOrbit);
objects.push(jupiterOrbit);

// Textures i propietats de la Jupiter
const jupiterMaterial = new THREE.MeshPhongMaterial({color: 0xbf6d02, emissive: 0xfc9105});
const jupiterhMesh = new THREE.Mesh(sphereGeometry, jupiterMaterial);
jupiterhMesh.scale.set(3, 3, 3);
jupiterOrbit.add(jupiterhMesh);
objects.push(jupiterhMesh);

// Orbita mercury
const mercuryOrbit = new THREE.Object3D();
mercuryOrbit.position.x = 6;
solarSystem.add(mercuryOrbit);
objects.push(mercuryOrbit);

// Textures i propietats de la mercury
const mercuryMaterial = new THREE.MeshPhongMaterial({color: 0x575757, emissive: 0x919191});
const mercuryhMesh = new THREE.Mesh(sphereGeometry, mercuryMaterial);
mercuryhMesh.scale.set(.5, .5, .5);
mercuryOrbit.add(mercuryhMesh);
objects.push(mercuryhMesh);

// Orbita mercury
const marsOrbit = new THREE.Object3D();
marsOrbit.position.x = 20;
marsOrbit.position.z = 20;
solarSystem.add(marsOrbit);
objects.push(marsOrbit);

// Textures i propietats de la mercury
const marsMaterial = new THREE.MeshPhongMaterial({color: 0xed0202, emissive: 0xff0000});
const marshMesh = new THREE.Mesh(sphereGeometry, marsMaterial);
marshMesh.scale.set(1.5, 1.5, 1.5);
marsOrbit.add(marshMesh);
objects.push(marshMesh);

// Orbita Terra que orbita damunt el sol ja que el sol esta al centre y la terra a 10x del centre

const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 10;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

// Textures i propietats de la Terra
// const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
// const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
// earthOrbit.add(earthMesh);
// objects.push(earthMesh);

let jack = null;
loadModul(
  'models/Jack/scene.gltf',
  jack,
  new THREE.Vector3(0,0,0),
  new THREE.Vector3(1000,1000,1000),
  earthOrbit
);

// Orbita lluna 1
const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;
earthOrbit.add(moonOrbit);

// Textures i propietats de la Lluna 1
const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(.5, .5, .5);
moonOrbit.add(moonMesh);
objects.push(moonMesh);

// Orbita lluna 2
const moonOrbit2 = new THREE.Object3D();
moonOrbit2.position.x = 2;
moonOrbit2.position.z = 2;
earthOrbit.add(moonOrbit2);

// Textures i propietats de la Lluna 2
const moonMaterial2 = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
const moonMesh2 = new THREE.Mesh(sphereGeometry, moonMaterial2);
moonMesh2.scale.set(.6, .6, .6);
moonOrbit2.add(moonMesh2);
objects.push(moonMesh2);

// Punt de llum
const color = 0xFFFFFF;
const intensity = 1000;
const light = new THREE.PointLight(color, intensity);
scene.add(light);

// const ambient = new THREE.AmbientLight();
// scene.add(ambient);

// Canviam la posicio i el focus de la camera
camera.position.set(25, 25, 25);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

// Afegir AxesHelper i GridHelper a cada objecte
// Afegir interficie d'usuari lil-gui: pren un objecte i un nom de propietat en aquest objecte i, en funció del tipus de propietat, fa automàticament una interfície d'usuari per manipular aquesta propietat.
// AxesHelper: Dibuixa 3 línies que representen els eixos X, Y i Z locals
// GridHelper: Fa una quadrícula 2D al pla X, Z. Per defecte, la quadrícula és de 10 x 10 unitats.
class AxisGridHelper {
  constructor(node, units = 10) {
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 2;  // after the grid
    node.add(axes);
 
    const grid = new THREE.GridHelper(units, units);
    grid.material.depthTest = false;
    grid.renderOrder = 1;
    node.add(grid);
 
    this.grid = grid;
    this.axes = axes;
    this.visible = false;
  }
  get visible() {
    return this._visible;
  }
  set visible(v) {
    this._visible = v;
    this.grid.visible = v;
    this.axes.visible = v;
  }
}

function makeAxisGrid(node, label, units) {
  const helper = new AxisGridHelper(node, units);
  gui.add(helper, 'visible').name(label);
}
 
makeAxisGrid(solarSystem, 'solarSystem', 25);
makeAxisGrid(sunMesh, 'sunMesh');
makeAxisGrid(earthOrbit, 'earthOrbit');
//makeAxisGrid(earthMesh, 'earthMesh');
makeAxisGrid(moonOrbit, 'moonOrbit');
makeAxisGrid(moonMesh, 'moonMesh');

function loadModul(path, varObject, position, scale, addToObject){

  const loader = new GLTFLoader();

    loader.load(
        // Ruta al model
        path,
        // FUNCIONS DE CALLBACK
        function (gltf){
            // Si es carrega correctament s'afageix a l'escena.
            varObject = gltf.scene;
            varObject.position.set(position.x,position.y,position.z);
            varObject.scale.set(scale.x, scale.y, scale.z);
            addToObject.add(varObject);
        },
        // Mira el procés de carrega del model dins la web.
        function (xhr){
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // Treu els errors en cas de que en tengui.
        function (error){
            console.log("Error: " + error);
        }

    );
}


let time = Date.now();
//Iniciam el bucle
AnimationLoop();

// Bucle de renderització
function AnimationLoop(){
    let thisTime = Date.now();
    let deltaTime = thisTime - time;
    time = thisTime;

    objects.forEach((obj) => {
      obj.rotateY(0.001 * deltaTime);
    });
    
    
    renderer.render(scene,camera);
    requestAnimationFrame(AnimationLoop);
}