import './style.css'

import * as THREE from 'three';

const CAMERA_START_Z = 50;
const OBJECT_ROT_XZ = 0.008;
const OBJECT_ROT_Y = 0.0035;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(CAMERA_START_Z);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x7851a9
});
const torus = new THREE.Mesh(geometry, material);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// RoseCube

const roseTexture = new THREE.TextureLoader().load('rose.jpg');

const rose = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({
    map: roseTexture
  })
);

scene.add(rose);

rose.position.set(0, 35, 50);
rose.rotation.set(Math.PI / 4, Math.PI / 4, 0);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(15, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);

scene.add(moon);

moon.position.z = -50;
moon.position.x = -70;
moon.position.y = 30;

function scrollCamera() {
  const t = document.body.getBoundingClientRect().top < 0 ? document.body.getBoundingClientRect().top : 0;
  console.log(t);
  moon.rotation.x += 0.008;
  moon.rotation.z += 0.008;

  camera.position.z = CAMERA_START_Z + t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = scrollCamera;


function animate() {
  requestAnimationFrame(animate);

  rose.rotation.z += 5 * OBJECT_ROT_XZ;
  rose.rotation.y += 5 * OBJECT_ROT_Y;

  renderer.render(scene, camera);
}

animate();