function initializeXRApp() {
  const { devicePixelRatio, innerHeight, innerWidth } = window;

  // Create a new WebGL renderer and set the size + pixel ratio.
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);

  // Enable XR functionality on the renderer.
  // renderer.xr.enabled = true;

  // Add it to the DOM.
  document.body.appendChild( renderer.domElement );

  // Create the AR button element, configure our XR session, and append it to the DOM.

  // Pass the renderer to the createScene-funtion.
  createScene(renderer);

  // Display a welcome message to the user.
}

function createScene(renderer) {
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.02,
    20,
  )

  const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.z = -3;

  scene.add(box);

  const renderLoop = (timestamp, frame) => {
    // Rotate box
    box.rotation.y += 0.01;
    box.rotation.x += 0.01;
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderLoop);
  }
  renderLoop()
}

// initializeXRApp()
