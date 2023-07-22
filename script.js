// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Function to create a colored sphere
function createColoredSphere(radius, color) {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: color });
  return new THREE.Mesh(geometry, material);
}

// Function to create a line
function createLine(start, end, color) {
  const points = [start, end];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: color });
  return new THREE.Line(geometry, material);
}

const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load('./assets/background.jpg', () => {
  scene.background = backgroundTexture;
});

// Create Sun sphere
const texture = textureLoader.load('./assets/sun.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
const sunGeometry = new THREE.SphereGeometry(8, 32, 32);
const sun = new THREE.Mesh(sunGeometry, material);
scene.add(sun);

// Create Earth sphere
const earthTexture = textureLoader.load('./assets/earth.jpg');
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Create Mars sphere
const marsTexture = textureLoader.load('./assets/mars.jpg');
const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });
const marsGeometry = new THREE.SphereGeometry(4.5, 32, 32);
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);

// Create Venus sphere
const venusTexture = textureLoader.load('./assets/venus.jpg');
const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
const venusGeometry = new THREE.SphereGeometry(4, 32, 32);
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
scene.add(venus);

// Create Mercury sphere
const mercuryTexture = textureLoader.load('./assets/mercury.jpg');
const mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture });
const mercuryGeometry = new THREE.SphereGeometry(2, 32, 32);
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
scene.add(mercury);

// Create Jupiter sphere
const jupiterTexture = textureLoader.load('./assets/jupiter.jpg');
const jupiterMaterial = new THREE.MeshBasicMaterial({ map: jupiterTexture });
const jupiterGeometry = new THREE.SphereGeometry(20, 32, 32);
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
scene.add(jupiter);

// Satellite 1 orbiting Earth (GEO)
const satellite1OrbitRadius = 6.8;
const satellite1 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 1),
  new THREE.MeshBasicMaterial({ color: '#ffff00' }) // Yellow for GEO
);
scene.add(satellite1);

// Satellite 2 orbiting Earth (LEO)
const satellite2OrbitRadius = 5.8;
const satellite2 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 1),
  new THREE.MeshBasicMaterial({ color: '#00ff00' }) // Green for LEO
);
scene.add(satellite2);

// Satellite 3 orbiting Earth vertically (MEO)
const satellite3OrbitRadius = 6.4;
const satellite3 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 1),
  new THREE.MeshBasicMaterial({ color: '#0000ff' }) // Blue for MEO
);
scene.add(satellite3);

// Satellite 4 orbiting Earth vertically (Polar Orbit)
const satellite4OrbitRadius = 7.3;
const satellite4 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 1),
  new THREE.MeshBasicMaterial({ color: '#ffffff' }) // White for Polar Orbit
);
scene.add(satellite4);

// Moon orbiting Earth
const moonOrbitRadius = 20;
const moonSize = 1;

const moonTexture = textureLoader.load('./assets/moon.jpg');
const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
const moonGeometry = new THREE.SphereGeometry(moonSize, moonOrbitRadius);
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

// Create lines from satellites to Earth
const dataTransferLine1 = createLine(
  satellite1.position,
  earth.position,
  0xffff00 //YELLOW color
);
scene.add(dataTransferLine1);

const dataTransferLine2 = createLine(
  satellite2.position,
  earth.position,
  0x00ff00 //GREEN color
);
scene.add(dataTransferLine2);

const dataTransferLine3 = createLine(
  satellite3.position,
  earth.position,
  0x0000ff //BLUE color
);
scene.add(dataTransferLine3);

const dataTransferLine4 = createLine(
  satellite4.position,
  earth.position,
  0xffffff //WHITE color
);
scene.add(dataTransferLine4);

// Camera position
camera.position.set(0, 0, 85);

// Set initial angles for planet positions
let earthAngle = 0;
let marsAngle = Math.PI / 2;
let venusAngle = Math.PI;
let mercuryAngle = Math.PI / 3;
let jupiterAngle = Math.PI / 4;

// Set initial angle for moon position
let moonAngle = 0;

// Update planet positions around the Sun
function updatePlanetPositions() {
  earth.position.x = Math.cos(earthAngle) * 70;
  earth.position.z = Math.sin(earthAngle) * 70;

  mars.position.x = Math.cos(marsAngle) * 120;
  mars.position.z = Math.sin(marsAngle) * 120;

  venus.position.x = Math.cos(venusAngle) * 50;
  venus.position.z = Math.sin(venusAngle) * 50;

  mercury.position.x = Math.cos(mercuryAngle) * 40;
  mercury.position.z = Math.sin(mercuryAngle) * 40;

  jupiter.position.x = Math.cos(jupiterAngle) * 160;
  jupiter.position.z = Math.sin(jupiterAngle) * 160;
  // Update angles for next frame
  earthAngle += 0.003;
  marsAngle += 0.002;
  venusAngle += 0.004;
  mercuryAngle += 0.007;
  jupiterAngle += 0.001;
}

// Update moon position around Earth
function updateMoonPosition() {
  moon.position.x = Math.cos(moonAngle) * moonOrbitRadius + earth.position.x;
  moon.position.z = Math.sin(moonAngle) * moonOrbitRadius + earth.position.z;

  // Update angle for next frame
  moonAngle += 0.01;
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate planets around the Sun
  earth.rotation.y += 0.005;
  mars.rotation.y += 0.003;
  venus.rotation.y += 0.002;
  mercury.rotation.y += 0.008;
  jupiter.rotation.y += 0.001;

  // Move satellites around Earth
  const satellite1Angle = Date.now() * 0.001;
  const satellite2Angle = Date.now() * -0.0015;
  const satellite3Angle = Date.now() * 0.002;
  const satellite4Angle = Date.now() * -0.0025;

  satellite1.position.x =
    Math.cos(satellite1Angle) * satellite1OrbitRadius + earth.position.x;
  satellite1.position.z =
    Math.sin(satellite1Angle) * satellite1OrbitRadius + earth.position.z;

  satellite2.position.x =
    Math.cos(satellite2Angle) * satellite2OrbitRadius + earth.position.x;
  satellite2.position.z =
    Math.sin(satellite2Angle) * satellite2OrbitRadius + earth.position.z;

  satellite3.position.x = earth.position.x;
  satellite3.position.y =
    Math.cos(satellite3Angle) * satellite3OrbitRadius + earth.position.y;
  satellite3.position.z =
    Math.sin(satellite3Angle) * satellite3OrbitRadius + earth.position.z;

  satellite4.position.x = earth.position.x;
  satellite4.position.y =
    Math.cos(satellite4Angle) * satellite4OrbitRadius + earth.position.y;
  satellite4.position.z =
    Math.sin(satellite4Angle) * satellite4OrbitRadius + earth.position.z;

  // Update data transfer lines
  dataTransferLine1.geometry.setFromPoints([
    satellite1.position,
    earth.position,
  ]);
  dataTransferLine2.geometry.setFromPoints([
    satellite2.position,
    earth.position,
  ]);
  dataTransferLine3.geometry.setFromPoints([
    satellite3.position,
    earth.position,
  ]);
  dataTransferLine4.geometry.setFromPoints([
    satellite4.position,
    earth.position,
  ]);
  // Function to create 3D text labels
  function createTextLabel(text, position, color) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '12px Arial';
    const width = context.measureText(text).width;
    canvas.width = width;
    canvas.height = 20;
    context.font = '12px Arial';
    context.fillStyle = color;
    context.fillText(text, 0, 15);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const geometry = new THREE.PlaneGeometry(width / 20, 1);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    mesh.lookAt(camera.position); // Face the camera
    return mesh;
  }

  // Update planet positions around the Sun
  updatePlanetPositions();

  // Update moon position around Earth
  updateMoonPosition();

  renderer.render(scene, camera);
}

animate();
