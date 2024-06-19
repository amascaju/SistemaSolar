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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
document.body.appendChild( renderer.domElement )

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// array d’objectes dels quals hem d’actualitzar la rotació.
const objects = [];

// emprarem una mateixa esfera per a tots.
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(radius);

// Carregar textures
const textureLoader = new THREE.TextureLoader();

const lavabasecolor = textureLoader.load("Textures/Lava/Lava_005_COLOR.jpg");
const lavanormalMap = textureLoader.load("Textures/Lava/Lava_005_NORM.jpg");
const lavaheightMap = textureLoader.load("Textures/Lava/Lava_005_DISP.png");
const lavaroughnessMap = textureLoader.load("Textures/Lava/Lava_005_ROUGH.jpg");
const lavaambientOcclusionMap = textureLoader.load("Textures/Lava/Lava_005_OCC.jpg");
const lavaemissive = textureLoader.load("Textures/Lava/Lava_005_MASK.jpg");

const lapisbasecolor = textureLoader.load("Textures/Lapislazuli/Lapis_Lazuli_001_COLOR.jpg");
const lapisnormalMap = textureLoader.load("Textures/Lapislazuli/Lapis_Lazuli_001_NORM.jpg");
const lapisheightMap = textureLoader.load("Textures/Lapislazuli/Lapis_Lazuli_001_DISP.png");
const lapisroughnessMap = textureLoader.load("Textures/Lapislazuli/Lapis_Lazuli_001_ROUGH.jpg");
const lapisambientOcclusionMap = textureLoader.load("Textures/Lapislazuli/Lapis_Lazuli_001_OCC.jpg");

// Es crea un objecte Pare
const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);


// Textures i propietats del Sol
//const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
const sunMaterial = new THREE.MeshStandardMaterial({ 
                    //color: 0xffff66, 
                    map: lavabasecolor, 
                    normalMap: lavanormalMap, 
                    displacementMap: lavaheightMap, 
                    displacementScale: 0.01, 
                    roughnessMap: lavaroughnessMap, 
                    roughness: 1, 
                    aoMap: lavaambientOcclusionMap, 
                    emissiveMap: lavaemissive 
})
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.geometry.attributes.uv2 = sunMesh.geometry.attributes.uv
sunMesh.scale.set(5, 5, 5);  // fem el sol més gran
sunMesh.castShadow = true
sunMesh.receiveShadow = true
solarSystem.add(sunMesh);
objects.push(sunMesh);

// Orbita Jupiter
const jupiterOrbit = new THREE.Object3D();
jupiterOrbit.position.x = 30;
solarSystem.add(jupiterOrbit);
objects.push(jupiterOrbit);

// Textures i propietats de la Jupiter
const jupiterMaterial = new THREE.MeshStandardMaterial({color: 0xbf6d02});
const jupiterhMesh = new THREE.Mesh(sphereGeometry, jupiterMaterial);
jupiterhMesh.scale.set(3, 3, 3);
jupiterhMesh.castShadow = true
jupiterhMesh.receiveShadow = true
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
mercuryhMesh.castShadow = true
mercuryhMesh.receiveShadow = true
mercuryOrbit.add(mercuryhMesh);
objects.push(mercuryhMesh);

// Orbita mart
const marsOrbit = new THREE.Object3D();
marsOrbit.position.x = 20;
marsOrbit.position.z = 20;
solarSystem.add(marsOrbit);
objects.push(marsOrbit);

// Textures i propietats de la mart
const marsMaterial = new THREE.MeshPhongMaterial({color: 0xed0202, emissive: 0xff0000});
const marshMesh = new THREE.Mesh(sphereGeometry, marsMaterial);
marshMesh.scale.set(1.5, 1.5, 1.5);
marshMesh.castShadow = true
marshMesh.receiveShadow = true
marsOrbit.add(marshMesh);
objects.push(marshMesh);

// Orbita Terra que orbita damunt el sol ja que el sol esta al centre y la terra a 10x del centre

const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 10;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

// Textures i propietats de la Terra
//const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
const earthMaterial = new THREE.MeshStandardMaterial({ 
  map: lapisbasecolor, 
  normalMap: lapisnormalMap, 
  displacementMap: lapisheightMap, 
  displacementScale: 0.1, 
  roughnessMap: lapisroughnessMap, 
  roughness: 1, 
  aoMap: lapisambientOcclusionMap
})
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthMesh.castShadow = true
earthMesh.receiveShadow = true
earthOrbit.add(earthMesh);
objects.push(earthMesh);

// let jack = null;
// loadModul(
//   'models/Jack/scene.gltf',
//   jack,
//   new THREE.Vector3(0,0,0),
//   new THREE.Vector3(1000,1000,1000),
//   earthOrbit
// );

// Orbita lluna 1
const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;
earthOrbit.add(moonOrbit);

// Textures i propietats de la Lluna 1
const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(.5, .5, .5);
moonMesh.castShadow = true
moonMesh.receiveShadow = true
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
moonMesh2.castShadow = true
moonMesh2.receiveShadow = true
moonOrbit2.add(moonMesh2);
objects.push(moonMesh2);

// --------------- ENTORN ------------------------
const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMap = cubeTextureLoader.load([
  'Textures/environmentMap/nit/px.png',
  'Textures/environmentMap/nit/nx.png',
  'Textures/environmentMap/nit/py.png',
  'Textures/environmentMap/nit/ny.png',
  'Textures/environmentMap/nit/pz.png',
  'Textures/environmentMap/nit/nz.png'
])

//plane
const planeGeo = new THREE.PlaneGeometry(100, 100)
const planeMat = new THREE.MeshStandardMaterial({
  color: 0xffffff
})
const plane = new THREE.Mesh(planeGeo, planeMat)
plane.position.z = -10
//plane.rotation.x = Math.PI * -0.5
plane.receiveShadow = true
scene.add(plane)

scene.background = environmentMap

// Punt de llum
const colorpl = 0xf70905;
const intensitypl = 1000;
const pointlight = new THREE.PointLight(colorpl, intensitypl);
pointlight.castShadow = true
pointlight.shadow.mapSize.width = 1024
pointlight.shadow.mapSize.height = 1024
pointlight.shadow.camera.near = 0.1
pointlight.shadow.camera.far = 50
scene.add(pointlight);

const pointLightCameraHelper = new THREE.CameraHelper(pointlight.shadow.camera)
//scene.add(pointLightCameraHelper)


// DIRECTIONAL LIGHT
const dirlight = new THREE.DirectionalLight(0xffffff,3);
dirlight.position.set(-1, 50, 50);
dirlight.castShadow = true
dirlight.shadow.mapSize.width = 1024
dirlight.shadow.mapSize.height = 1024
dirlight.shadow.camera.top = 60
dirlight.shadow.camera.right = 60
dirlight.shadow.camera.bottom = - 60
dirlight.shadow.camera.left = - 60
scene.add(dirlight);

const directionalLightCameraHelper = new THREE.CameraHelper(dirlight.shadow.camera)
//scene.add(directionalLightCameraHelper)

//spotlight
const spotLight = new THREE.SpotLight(0xf7b705, 10000, 100, Math.PI * 0.3)
spotLight.position.set(0, 0, 50)
spotLight.castShadow = true
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
scene.add(spotLight)
scene.add(spotLight.target)

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
//scene.add(spotLightCameraHelper)


// INIT HEMISPHERE LIGHT
//scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// const ambient = new THREE.AmbientLight();
// scene.add(ambient);

// Canviam la posicio i el focus de la camera
camera.position.set(40, 40, 60);
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

window.addEventListener('resize', () => {

  // Update camera
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



let time = Date.now();
//Iniciam el bucle
AnimationLoop();

// Bucle de renderització
function AnimationLoop(){
    let thisTime = Date.now();
    let deltaTime = thisTime - time;
    time = thisTime;

    objects.forEach((obj) => {
      obj.rotateZ(0.001 * deltaTime);
    });
    
    
    renderer.render(scene,camera);
    requestAnimationFrame(AnimationLoop);
}