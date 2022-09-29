import './style.css'

import * as THREE from 'three';

//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CAMERA_START_Z = 50;
const CAMERA_START_X = 0;
const CAMERA_START_Y = 0;
const OBJECT_ROT_XZ = 0.008;
const OBJECT_ROT_Y = 0.0035;
const NUM_STARS = 400;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(CAMERA_START_Z);

console.log('startPos', camera.position);
console.log('startRot', camera.rotation);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x7851a9 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);

//scene.add(lightHelper, gridHelper);

//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff });
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => 3 * THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x, y, z);
  scene.add(star);
}

Array(NUM_STARS).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// RoseCube

const roseTexture = new THREE.TextureLoader().load('rose.jpg');

const rose = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial( { map: roseTexture })
);

scene.add(rose);

rose.position.set(0, 35, 50);
rose.rotation.set(Math.PI / 4, Math.PI / 4, 0);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(15, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    normalMap: normalTexture
  })
);

scene.add(moon);

moon.position.z = -50;
moon.position.x = -70;
moon.position.y = 30;

// jeff.position.z = -5;
// jeff.position.x = 2;

function scrollCamera() {
  const t = document.body.getBoundingClientRect().top < 0 ? document.body.getBoundingClientRect().top : 0;
  console.log(t);
  moon.rotation.x += 0.008;
  //moon.rotation.y += 0.0035;
  moon.rotation.z += 0.008;

  // jeff.rotation.y += 0.01;
  // jeff.rotation.z += 0.01;

  camera.position.z = CAMERA_START_Z + t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

let defaultView = true;



function reposCamera() {
  let timeHandling = 0;
  if (defaultView) {
    let camMove = setInterval(() => {
      if (timeHandling >= 60) { // 3 second movement
        clearInterval(camMove);
        camera.rotation.x = 1.5; // correct for Math.PI inaccurary
        console.log('altRot', camera.rotation);
        console.log('altPos', camera.position);
      }
      camera.rotation.x += (Math.PI / 120);
      camera.position.y += 0.375;
      timeHandling++;
    }, 25)
  } else {
    let camMove = setInterval(() => {
      if (timeHandling >= 60) { // 3 second movement
        clearInterval(camMove);
        camera.rotation.x = 0; // correct for Math.PI inaccurary
        console.log('defRot', camera.rotation);
        console.log('defPos', camera.position);
      }
      camera.rotation.x -= (Math.PI / 120);
      camera.position.y -= 0.375;
      timeHandling++;
    }, 25)
  }
  defaultView = !defaultView;
}

document.body.onscroll = scrollCamera;

document.body.onkeydown = reposCamera;

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += OBJECT_ROT_XZ;
  torus.rotation.y += OBJECT_ROT_Y;
  torus.rotation.z += OBJECT_ROT_XZ;

  rose.rotation.z += 5 * OBJECT_ROT_XZ;
  rose.rotation.y += 5 * OBJECT_ROT_Y;

  //controls.update();

  renderer.render( scene, camera);
}

animate();