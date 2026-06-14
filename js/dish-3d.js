/* ─── THREE.JS 3D DISH MODELS ─── */
var DishScene = (function () {
  var scene, camera, renderer, controls, animId, container;

  // ── helpers ──────────────────────────────────────────────────────────────

  function mat(color, rough, metal, opacity) {
    var opts = {
      color: color,
      roughness: (rough !== undefined) ? rough : 0.7,
      metalness: (metal !== undefined) ? metal : 0
    };
    if (opacity !== undefined && opacity < 1) {
      opts.transparent = true;
      opts.opacity = opacity;
    }
    return new THREE.MeshStandardMaterial(opts);
  }

  function addMesh(geo, material, x, y, z, rx, ry, rz) {
    var mesh = new THREE.Mesh(geo, material);
    mesh.position.set(x || 0, y || 0, z || 0);
    if (rx) mesh.rotation.x = rx;
    if (ry) mesh.rotation.y = ry;
    if (rz) mesh.rotation.z = rz;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    return mesh;
  }

  function plate(radius, color) {
    var c = color || 0xf0ece4;
    addMesh(new THREE.CylinderGeometry(radius, radius * 0.88, 0.08, 48), mat(c, 0.4, 0.1), 0, -0.04);
    addMesh(new THREE.TorusGeometry(radius * 0.92, 0.05, 12, 64), mat(c, 0.4, 0.1), 0, 0.04, 0, Math.PI / 2);
  }

  function cyl(rTop, rBot, h, segs) {
    return new THREE.CylinderGeometry(rTop, rBot || rTop, h, segs || 24);
  }

  // ── scene lifecycle ──────────────────────────────────────────────────────

  function init(containerId, dishId) {
    cleanup();
    container = document.getElementById(containerId);
    if (!container || typeof THREE === 'undefined') return;

    var w = container.clientWidth || 400;
    var h = container.clientHeight || 300;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060606);

    camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 2.0, 4.8);
    camera.lookAt(0, 0.2, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // lights
    scene.add(new THREE.AmbientLight(0xfff5e0, 0.55));
    var key = new THREE.DirectionalLight(0xffe8b0, 2.8);
    key.position.set(3, 6, 4);
    key.castShadow = true;
    scene.add(key);
    var rim = new THREE.DirectionalLight(0xc8a860, 0.9);
    rim.position.set(-4, 2, -3);
    scene.add(rim);
    scene.add(new THREE.DirectionalLight(0xffffff, 0.3)).position.set(0, -3, 5);

    // hint label
    var hint = document.createElement('div');
    hint.className = 'dm-3d-hint';
    hint.textContent = 'Przeciągnij aby obrócić';
    container.appendChild(hint);

    // orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.8;
    controls.minPolarAngle = Math.PI * 0.15;
    controls.maxPolarAngle = Math.PI * 0.72;

    buildDish(dishId);
    animate();
    window.addEventListener('resize', onResize);
  }

  function onResize() {
    if (!container || !camera || !renderer) return;
    var w = container.clientWidth;
    var h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function animate() {
    animId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  function cleanup() {
    if (animId) cancelAnimationFrame(animId);
    if (renderer) {
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }
    if (scene) {
      scene.traverse(function (obj) {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) { obj.material.forEach(function (m) { m.dispose(); }); }
          else { obj.material.dispose(); }
        }
      });
    }
    // remove hint label
    if (container) {
      var hint = container.querySelector('.dm-3d-hint');
      if (hint) hint.remove();
    }
    window.removeEventListener('resize', onResize);
    scene = camera = renderer = controls = animId = container = null;
  }

  // ── dish router ──────────────────────────────────────────────────────────

  function buildDish(dishId) {
    var map = {
      'hummus':          buildHummus,
      'tatar-pomidorowy':buildTatarPomidorowy,
      'not-tuna':        buildNotTuna,
      'carpaccio-losos': buildCarpaccio,
      'tatar-wolowy':    buildTatarWolowy,
      'tagliatelle':     buildTagliatelle,
      'halibut':         buildHalibut,
      'krewetki':        buildKrewetki,
      'satay-kurczak':   buildSatay,
      'kaczka':          buildKaczka,
      'kluski':          buildKluski,
      'frytki-cukinii':  buildFrytki,
      'katsu-cielece':   buildKatsu,
      'policzki-wolowe': buildPoliczki,
      'ribeye':          buildRibeye,
      'kalafior-burger': buildBurger,
      'rum-baba':        buildRumBaba,
      'krem-pistacjowy': buildKremPistacjowy,
      'rabarbar':        buildRabarbar,
      'espresso-tonic':  buildEspressoTonic,
      'mali-boo':        buildMaliBoo,
      'rabarbaroni':     buildRabarbaroni,
      'marharita':       buildMarharita
    };
    (map[dishId] || buildDefault)();
  }

  // ── dish builders ─────────────────────────────────────────────────────────

  function buildHummus() {
    // bowl
    addMesh(cyl(1.2, 0.85, 0.55, 48), mat(0xe0c898, 0.65, 0.05), 0, 0);
    // hummus filling
    addMesh(cyl(1.12, 1.12, 0.08, 48), mat(0xf0deb0, 0.82, 0), 0, 0.3);
    // centre oil pool
    addMesh(cyl(0.38, 0.38, 0.025, 32), mat(0xc89010, 0.25, 0.1), 0, 0.36);
    // chickpeas
    var cp = [[0.55, 0.38, 0.22], [-0.42, 0.38, 0.54], [0.3, 0.38, -0.6],
              [-0.58, 0.38, -0.2], [0.62, 0.38, -0.42], [-0.22, 0.38, 0.68]];
    cp.forEach(function (p) {
      addMesh(new THREE.SphereGeometry(0.09, 10, 10), mat(0xc89850, 0.7, 0), p[0], p[1], p[2]);
    });
    // paprika
    addMesh(new THREE.SphereGeometry(0.055, 8, 8), mat(0xcc2000, 0.8, 0), -0.08, 0.38, 0.12);
    // pita slice
    addMesh(new THREE.BoxGeometry(0.28, 0.055, 0.5), mat(0xe8c060, 0.9, 0), 1.05, 0.08, 0.2);
  }

  function buildTatarPomidorowy() {
    plate(1.3);
    // tomato mound (half sphere)
    addMesh(new THREE.SphereGeometry(0.68, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.52),
      mat(0xcc2000, 0.82, 0), 0, 0.02);
    // capers
    [[0.42, 0.52, 0.32], [-0.5, 0.5, -0.22], [0.22, 0.6, -0.42],
     [-0.32, 0.44, 0.52], [0.52, 0.35, -0.32]].forEach(function (p) {
      addMesh(new THREE.SphereGeometry(0.06, 8, 8), mat(0x2a4a18, 0.85, 0), p[0], p[1], p[2]);
    });
    // croutons
    addMesh(new THREE.BoxGeometry(0.36, 0.07, 0.36), mat(0xd4a038, 0.9, 0), 0.72, 0.08, 0.22);
    addMesh(new THREE.BoxGeometry(0.3, 0.07, 0.28), mat(0xd4a038, 0.9, 0), -0.65, 0.08, -0.1);
    // basil
    addMesh(new THREE.SphereGeometry(0.07, 6, 4), mat(0x2a6818, 0.9, 0), 0, 0.72, 0.1);
  }

  function buildNotTuna() {
    plate(1.45);
    // watermelon slab
    addMesh(new THREE.BoxGeometry(1.15, 0.22, 0.68), mat(0xe02848, 0.7, 0), 0, 0.15);
    // burrata
    addMesh(new THREE.SphereGeometry(0.34, 24, 24), mat(0xfaf8f0, 0.45, 0.05), 0.52, 0.42, 0.1);
    // arugula
    [[-0.28, 0.16, 0.42], [-0.52, 0.13, -0.2], [-0.1, 0.15, 0.52], [0.22, 0.13, -0.42]].forEach(function (p) {
      addMesh(new THREE.SphereGeometry(0.08, 6, 4), mat(0x184810, 0.9, 0), p[0], p[1], p[2]);
    });
    // mustard dots
    addMesh(new THREE.SphereGeometry(0.07, 8, 8), mat(0xe8b018, 0.6, 0), -0.7, 0.13, 0.32);
    addMesh(new THREE.SphereGeometry(0.05, 8, 8), mat(0xe8b018, 0.6, 0), -0.82, 0.13, -0.1);
  }

  function buildCarpaccio() {
    plate(1.5);
    // fanned salmon slices
    for (var i = 0; i < 7; i++) {
      var angle = (i / 7) * Math.PI * 1.4 - 0.7;
      var x = Math.sin(angle) * 0.38;
      var z = -Math.cos(angle) * 0.18;
      var disc = new THREE.Mesh(
        cyl(0.52, 0.52, 0.022, 32),
        mat(0xe88870, 0.58, 0)
      );
      disc.position.set(x, 0.02 + i * 0.012, z);
      disc.rotation.z = angle * 0.45;
      disc.castShadow = true;
      scene.add(disc);
    }
    // lemon slice
    addMesh(cyl(0.2, 0.2, 0.045, 16), mat(0xf0e030, 0.7, 0), -0.88, 0.05, -0.22);
    // microgreens
    [[-0.18, 0.1, 0.72], [0.12, 0.1, 0.82], [0.32, 0.1, 0.68]].forEach(function (p) {
      addMesh(new THREE.SphereGeometry(0.06, 6, 4), mat(0x286018, 0.9, 0), p[0], p[1], p[2]);
    });
  }

  function buildTatarWolowy() {
    plate(1.4);
    // beef mound
    addMesh(new THREE.SphereGeometry(0.65, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.56),
      mat(0x8a1818, 0.88, 0), 0, 0.02);
    // yolk
    addMesh(new THREE.SphereGeometry(0.19, 16, 16), mat(0xf0b800, 0.3, 0.06, 0.92), 0, 0.62, 0.1);
    // capers
    [[-0.42, 0.13, 0.52], [0.56, 0.13, 0.22], [-0.5, 0.09, -0.32], [0.3, 0.1, -0.56]].forEach(function (p) {
      addMesh(new THREE.SphereGeometry(0.055, 8, 8), mat(0x2a4818, 0.85, 0), p[0], p[1], p[2]);
    });
    // toast
    addMesh(new THREE.BoxGeometry(0.42, 0.06, 0.3), mat(0xd4a038, 0.9, 0), 0.88, 0.08, -0.1);
  }

  function buildTagliatelle() {
    plate(1.4);
    // pasta nest — stacked tori
    for (var i = 0; i < 6; i++) {
      var r = 0.52 - i * 0.055;
      var t = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.052, 8, 28),
        mat(0xd4a050 - i * 0x020200, 0.9, 0)
      );
      t.rotation.x = Math.PI / 2;
      t.position.y = 0.1 + i * 0.075;
      t.rotation.z = i * 0.35;
      scene.add(t);
    }
    // roasted celery pieces
    [[0.5, 0.42, 0.32], [-0.6, 0.32, 0.1], [-0.22, 0.52, -0.52]].forEach(function (p) {
      addMesh(new THREE.BoxGeometry(0.14, 0.06, 0.24), mat(0x8ab860, 0.9, 0), p[0], p[1], p[2]);
    });
    // parmesan shaving
    addMesh(new THREE.BoxGeometry(0.22, 0.02, 0.12), mat(0xf0e09a, 0.68, 0.05), 0.3, 0.62, -0.22);
  }

  function buildHalibut() {
    plate(1.5);
    // pea puree blobs
    [[0, 0, 0], [0.18, 0, 0.08], [-0.12, 0, -0.08]].forEach(function (p, i) {
      addMesh(new THREE.SphereGeometry(0.3 + i * 0.04, 16, 12), mat(0x428820, 0.82, 0),
        p[0] * 0.55, 0.12, p[2] * 0.55);
    });
    // halibut fillet
    addMesh(new THREE.BoxGeometry(1.02, 0.18, 0.56), mat(0xf5f0e6, 0.48, 0.05), 0.08, 0.24, 0.08);
    // golden crust
    addMesh(new THREE.BoxGeometry(1.02, 0.035, 0.56), mat(0xe8c050, 0.68, 0.1), 0.08, 0.34, 0.08);
    // dill
    addMesh(new THREE.SphereGeometry(0.06, 6, 4), mat(0x286820, 0.9, 0), 0.42, 0.38, -0.12);
  }

  function buildKrewetki() {
    plate(1.5);
    // chorizo slices
    [[-0.28, 0, -0.18], [0.32, 0, 0.1], [0, 0, 0.42], [-0.52, 0, 0.28]].forEach(function (p) {
      addMesh(cyl(0.15, 0.15, 0.065, 16), mat(0xc02818, 0.7, 0.05), p[0], 0.065, p[2]);
    });
    // white beans
    [[-0.62, 0.1, 0], [0.62, 0.1, 0.1], [0, 0.1, 0.72], [-0.2, 0.1, -0.62], [0.52, 0.1, -0.42]].forEach(function (p) {
      addMesh(new THREE.SphereGeometry(0.1, 10, 8), mat(0xf0ece0, 0.72, 0), p[0], p[1], p[2]);
    });
    // shrimp (torus arcs)
    [{ x: 0.2, z: -0.1, a: 0.2 }, { x: -0.1, z: 0.28, a: -0.5 },
     { x: 0.52, z: 0.4, a: 0.8 }, { x: -0.48, z: -0.35, a: -0.3 }].forEach(function (s) {
      var g = new THREE.TorusGeometry(0.26, 0.075, 8, 12, Math.PI * 1.1);
      var m = new THREE.Mesh(g, mat(0xe87858, 0.62, 0.05));
      m.position.set(s.x, 0.26, s.z);
      m.rotation.x = -Math.PI / 2;
      m.rotation.z = s.a;
      scene.add(m);
    });
  }

  function buildSatay() {
    plate(1.6);
    for (var i = -1; i <= 1; i++) {
      var xo = i * 0.38;
      // stick
      addMesh(cyl(0.025, 0.025, 2.4, 8), mat(0xd4b070, 0.9, 0.1), xo, 0.5);
      // meat pieces
      for (var j = 0; j < 3; j++) {
        addMesh(cyl(0.13, 0.13, 0.22, 12), mat(0x8a4820, 0.88, 0), xo, 0.2 + j * 0.32);
      }
    }
    // cabbage
    addMesh(new THREE.SphereGeometry(0.4, 12, 8), mat(0xb0d870, 0.9, 0), 1.05, 0.2, 0);
    // peanut sauce bowl
    addMesh(cyl(0.22, 0.18, 0.15, 16), mat(0xe0d0a8, 0.5, 0.1), -1.12, 0.1, 0.2);
    addMesh(cyl(0.2, 0.2, 0.04, 16), mat(0xc07828, 0.5, 0.05), -1.12, 0.19, 0.2);
  }

  function buildKaczka() {
    plate(1.4);
    // duck breast
    var dg = new THREE.SphereGeometry(0.6, 24, 12);
    dg.scale(1.22, 0.36, 0.78);
    addMesh(dg, mat(0x3a1808, 0.82, 0.05), 0, 0.16);
    // score lines
    for (var i = -2; i <= 2; i++) {
      addMesh(new THREE.BoxGeometry(0.82, 0.008, 0.022), mat(0x1a0a04, 0.9, 0), i * 0.13, 0.3, 0);
    }
    // onion mousse
    addMesh(new THREE.SphereGeometry(0.28, 16, 12), mat(0xf0ece2, 0.58, 0.05), -0.82, 0.16, 0.22);
    // balsamic drizzle arc
    addMesh(new THREE.TorusGeometry(0.22, 0.014, 6, 24, Math.PI * 1.5), mat(0x300000, 0.4, 0.1),
      0, 0.33, 0, Math.PI / 2);
  }

  function buildKluski() {
    plate(1.4);
    [[0, 0, 0], [0.52, 0, 0.1], [-0.5, 0, 0.1], [0.1, 0, 0.52], [-0.1, 0, -0.5]].forEach(function (p) {
      var g = new THREE.SphereGeometry(0.25, 16, 12);
      g.scale(1.32, 0.68, 0.92);
      addMesh(g, mat(0xecd9b5, 0.82, 0), p[0], 0.19, p[2]);
    });
    // brown butter puddle
    addMesh(cyl(0.62, 0.62, 0.02, 32), mat(0xb87820, 0.4, 0.1, 0.62), 0, 0.1);
    // chive
    addMesh(cyl(0.015, 0.015, 0.62, 6), mat(0x387818, 0.82, 0), -0.22, 0.36, 0.32);
  }

  function buildFrytki() {
    plate(1.3);
    for (var i = 0; i < 12; i++) {
      var angle = (i / 12) * Math.PI * 2;
      var r = 0.08 + (i % 3) * 0.12;
      var x = Math.cos(angle) * r;
      var z = Math.sin(angle) * r;
      var tilt = (i % 2 === 0 ? 1 : -1) * 0.14;
      var h = 0.48 + (i % 3) * 0.1;
      var m = new THREE.Mesh(
        cyl(0.04, 0.04, h, 8),
        mat(0xd4a828, 0.82, 0)
      );
      m.position.set(x, h / 2 + 0.1, z);
      m.rotation.x = tilt;
      m.rotation.z = tilt * 0.5;
      m.castShadow = true;
      scene.add(m);
    }
    // yogurt dip
    addMesh(cyl(0.2, 0.17, 0.12, 16), mat(0xf5f2ee, 0.5, 0.05), 1.02, 0.1, 0.32);
  }

  function buildKatsu() {
    plate(1.5);
    // breaded cutlet
    addMesh(new THREE.BoxGeometry(1.12, 0.14, 0.66), mat(0xe8b038, 0.92, 0.05), 0, 0.12);
    // golden crust top
    addMesh(new THREE.BoxGeometry(1.12, 0.02, 0.66), mat(0xc87018, 0.82, 0.1), 0, 0.2);
    // parmesan foam
    addMesh(new THREE.SphereGeometry(0.22, 16, 12), mat(0xfafaf5, 0.3, 0.05, 0.9), -0.72, 0.3, 0.32);
    addMesh(new THREE.SphereGeometry(0.15, 12, 10), mat(0xfafaf5, 0.3, 0.05, 0.9), -0.62, 0.42, 0.12);
    // tonkatsu sauce lines
    addMesh(new THREE.BoxGeometry(0.04, 0.008, 0.62), mat(0x402000, 0.6, 0.1), 0.2, 0.22, 0);
    addMesh(new THREE.BoxGeometry(0.04, 0.008, 0.62), mat(0x402000, 0.6, 0.1), -0.12, 0.22, 0);
    // cabbage
    addMesh(new THREE.SphereGeometry(0.14, 8, 6), mat(0xc8d888, 0.9, 0), 0.88, 0.12, -0.32);
  }

  function buildPoliczki() {
    plate(1.5);
    // mushroom sauce pool
    addMesh(cyl(0.92, 0.92, 0.04, 32), mat(0x280a00, 0.52, 0.1), 0, 0.06);
    // two beef cheek pieces
    [-0.32, 0.32].forEach(function (x) {
      var g = new THREE.SphereGeometry(0.4, 20, 12);
      g.scale(1.1, 0.56, 0.86);
      addMesh(g, mat(0x3a1508, 0.82, 0.05), x, 0.22);
    });
    // mushrooms
    [[-0.62, 0.26, 0.52], [0.62, 0.26, 0.42], [0, 0.26, 0.72]].forEach(function (p) {
      addMesh(new THREE.SphereGeometry(0.13, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5),
        mat(0x8a6038, 0.82, 0), p[0], p[1], p[2]);
    });
    // potato puree
    addMesh(new THREE.SphereGeometry(0.26, 16, 12), mat(0xf0e8be, 0.72, 0.05), -0.88, 0.2, -0.15);
  }

  function buildRibeye() {
    // volcanic stone
    addMesh(cyl(1.32, 1.22, 0.22, 8), mat(0x1a1a1a, 0.96, 0.1), 0, 0);
    // steak slab (angled)
    addMesh(new THREE.BoxGeometry(1.32, 0.24, 0.88), mat(0x8b1a0a, 0.72, 0.05), -0.1, 0.23, 0, 0, 0.28, 0);
    // fat marbling lines
    for (var i = 0; i < 3; i++) {
      addMesh(new THREE.BoxGeometry(0.022, 0.24, 0.72), mat(0xd4a078, 0.72, 0),
        -0.1 + (i - 1) * 0.3, 0.23, 0, 0, 0.28, 0);
    }
    // grill marks
    for (var g = 0; g < 4; g++) {
      addMesh(new THREE.BoxGeometry(0.92, 0.008, 0.04), mat(0x1a0800, 0.92, 0),
        -0.1, 0.36, -0.26 + g * 0.18, 0, 0.28, 0);
    }
    // herb butter
    addMesh(new THREE.SphereGeometry(0.12, 12, 8), mat(0xe8d058, 0.52, 0.1), 0.3, 0.36, 0.12);
    // watercress
    addMesh(new THREE.SphereGeometry(0.09, 6, 4), mat(0x186010, 0.9, 0), 0.72, 0.12, 0.62);
  }

  function buildBurger() {
    // bottom bun
    addMesh(new THREE.SphereGeometry(0.7, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.5),
      mat(0xd49438, 0.82, 0.05), 0, 0);
    // cauliflower patty
    var pg = new THREE.SphereGeometry(0.62, 20, 10);
    pg.scale(1.12, 0.4, 1.02);
    addMesh(pg, mat(0xe8e0c8, 0.9, 0), 0, 0.26);
    // vegan mayo smear
    addMesh(cyl(0.56, 0.56, 0.04, 24), mat(0xf5f0e0, 0.62, 0), 0, 0.46, 0.02);
    // lettuce
    addMesh(new THREE.TorusGeometry(0.6, 0.08, 8, 24), mat(0x2a8018, 0.92, 0, 0.9), 0, 0.5, 0, Math.PI / 2);
    // pickle slices
    [[-0.2, 0.53, 0.2], [0.25, 0.53, -0.15]].forEach(function (p) {
      addMesh(cyl(0.12, 0.12, 0.03, 12), mat(0x6a9030, 0.82, 0), p[0], p[1], p[2]);
    });
    // top bun
    addMesh(new THREE.SphereGeometry(0.66, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.65),
      mat(0xd49038, 0.82, 0.05), 0, 0.56);
    // sesame seeds
    [[-0.12, 0.92, 0.32], [0.22, 0.92, -0.12], [0.32, 0.9, 0.22]].forEach(function (p) {
      addMesh(new THREE.SphereGeometry(0.034, 6, 6), mat(0xf0e09a, 0.72, 0), p[0], p[1], p[2]);
    });
  }

  function buildRumBaba() {
    // jar glass
    addMesh(cyl(0.55, 0.5, 1.2, 32), mat(0x8ab8d8, 0.1, 0.12, 0.22), 0, 0.62);
    addMesh(cyl(0.5, 0.5, 0.065, 32), mat(0x8ab8d8, 0.1, 0.12, 0.5), 0, 0.032);
    // rum syrup layer
    addMesh(cyl(0.48, 0.48, 0.18, 32), mat(0xb06010, 0.3, 0.05, 0.8), 0, 0.12);
    // baba cake
    addMesh(cyl(0.42, 0.42, 0.62, 24), mat(0xd4a048, 0.82, 0.05), 0, 0.52);
    // English cream
    addMesh(cyl(0.48, 0.48, 0.16, 32), mat(0xf5f0e6, 0.4, 0.05, 0.95), 0, 1.02);
    // cream peak
    addMesh(new THREE.SphereGeometry(0.22, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.55),
      mat(0xf8f5f0, 0.4, 0.05), 0, 1.12);
    // jar lid ring
    addMesh(new THREE.TorusGeometry(0.58, 0.042, 8, 32), mat(0xa0a0a0, 0.52, 0.5), 0, 1.25, 0, Math.PI / 2);
  }

  function buildKremPistacjowy() {
    // bowl
    addMesh(cyl(0.92, 0.72, 0.42, 32), mat(0xf0f0ee, 0.42, 0.12), 0, 0.22);
    // pistachio cream
    addMesh(cyl(0.84, 0.84, 0.24, 32), mat(0x72aa48, 0.62, 0.05), 0, 0.54);
    // cherries
    [[-0.3, 0.72, 0.22], [0.1, 0.7, -0.32], [0.36, 0.73, 0.16], [-0.1, 0.72, 0.42]].forEach(function (p) {
      addMesh(new THREE.SphereGeometry(0.1, 12, 12), mat(0xaa0020, 0.62, 0.05), p[0], p[1], p[2]);
    });
    // halvah threads
    addMesh(cyl(0.018, 0.018, 0.52, 6), mat(0xe8d898, 0.82, 0), -0.15, 0.84, 0.12);
    addMesh(cyl(0.018, 0.018, 0.42, 6), mat(0xe8d898, 0.82, 0), 0.16, 0.84, -0.16);
    // pistachios
    [[-0.52, 0.66, 0.02], [0.46, 0.66, -0.22], [0.02, 0.66, 0.56]].forEach(function (p) {
      addMesh(new THREE.SphereGeometry(0.07, 8, 6), mat(0x588828, 0.72, 0), p[0], p[1], p[2]);
    });
  }

  function buildRabarbar() {
    plate(1.4);
    // rhubarb stalks
    [{ x: 0, z: 0, r: 0 }, { x: 0.22, z: 0.16, r: 0.3 },
     { x: -0.26, z: 0.1, r: -0.26 }, { x: 0.1, z: -0.3, r: 0.14 }].forEach(function (s) {
      var m = new THREE.Mesh(cyl(0.07, 0.07, 1.12, 8), mat(0xcc2030, 0.82, 0));
      m.position.set(s.x, 0.42, s.z);
      m.rotation.z = s.r;
      scene.add(m);
    });
    // nut crumble chunks
    [[-0.62, 0.16, 0.52], [0.72, 0.12, 0.22], [-0.42, 0.12, -0.62], [0.52, 0.14, -0.42]].forEach(function (p) {
      var g = new THREE.SphereGeometry(0.1, 8, 6);
      g.scale(1.32, 0.62, 1.12);
      addMesh(g, mat(0xd4a048, 0.96, 0), p[0], p[1], p[2]);
    });
    // cranberry
    addMesh(new THREE.SphereGeometry(0.07, 8, 8), mat(0xaa1020, 0.62, 0), 0.32, 0.16, -0.22);
  }

  function buildEspressoTonic() {
    // tall glass
    addMesh(cyl(0.4, 0.36, 1.82, 32), mat(0x90c8e8, 0.1, 0.22, 0.2), 0, 0.91);
    addMesh(cyl(0.36, 0.36, 0.065, 32), mat(0x90c8e8, 0.1, 0.22, 0.45), 0, 0.032);
    // ice cubes
    [[-0.1, 0.22, 0.06], [0.12, 0.36, -0.06], [-0.05, 0.5, 0.11]].forEach(function (p) {
      addMesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), mat(0xddf4ff, 0.1, 0.12, 0.72), p[0], p[1], p[2]);
    });
    // tonic layer
    addMesh(cyl(0.36, 0.34, 0.6, 32), mat(0xe8f4f8, 0.2, 0.12, 0.5), 0, 0.5);
    // pomegranate / espresso layer
    addMesh(cyl(0.36, 0.36, 0.42, 32), mat(0x500010, 0.3, 0.06, 0.86), 0, 1.01);
    // espresso crema
    addMesh(cyl(0.36, 0.36, 0.22, 32), mat(0x3a1800, 0.42, 0.06, 0.92), 0, 1.32);
    // foam top
    addMesh(cyl(0.36, 0.36, 0.065, 32), mat(0xf0d078, 0.52, 0.06, 0.82), 0, 1.44);
    // straw
    addMesh(cyl(0.03, 0.03, 2.2, 8), mat(0x080808, 0.82, 0), -0.2, 1.1);
  }

  function buildMaliBoo() {
    buildCocktailGlass(0xe0f4e0, false);
    // coconut foam
    addMesh(new THREE.SphereGeometry(0.32, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.42),
      mat(0xfafafa, 0.32, 0.05, 0.9), 0, 1.38);
    // lime wedge
    addMesh(cyl(0.12, 0.12, 0.04, 6), mat(0x50a020, 0.72, 0), 0.38, 1.55, 0.16);
    // pink straw
    addMesh(cyl(0.026, 0.026, 1.8, 8), mat(0xff6080, 0.72, 0), 0.16, 1.42);
  }

  function buildRabarbaroni() {
    // rocks glass
    addMesh(cyl(0.6, 0.5, 0.82, 32), mat(0xa0c4d8, 0.1, 0.22, 0.25), 0, 0.41);
    addMesh(cyl(0.5, 0.5, 0.055, 32), mat(0xa0c4d8, 0.22, 0.22, 0.42), 0, 0.028);
    // negroni liquid
    addMesh(cyl(0.56, 0.48, 0.64, 32), mat(0xc03008, 0.32, 0.06, 0.86), 0, 0.37);
    // ice cube
    addMesh(new THREE.BoxGeometry(0.32, 0.32, 0.32), mat(0xddf4ff, 0.1, 0.12, 0.72), -0.1, 0.52, 0.12);
    // orange peel garnish
    var op = new THREE.Mesh(
      new THREE.TorusGeometry(0.16, 0.022, 6, 16, Math.PI * 1.2),
      mat(0xe88020, 0.72, 0.06)
    );
    op.position.set(0.12, 0.84, 0.22);
    op.rotation.x = Math.PI * 0.3;
    scene.add(op);
  }

  function buildMarharita() {
    buildCocktailGlass(0xf0f8c8, true);
    // lime wedge
    addMesh(cyl(0.14, 0.14, 0.04, 6), mat(0x50a020, 0.72, 0), 0.4, 1.56, 0.22);
    // straw
    addMesh(cyl(0.026, 0.026, 1.8, 8), mat(0xfafafa, 0.32, 0.12, 0.82), 0.12, 1.42);
  }

  // shared cocktail glass shape (stem + bowl)
  function buildCocktailGlass(liquidColor, hasSaltRim) {
    // base disc
    addMesh(cyl(0.46, 0.42, 0.06, 32), mat(0xa0c4d8, 0.1, 0.22, 0.32), 0, 0.03);
    // stem
    addMesh(cyl(0.04, 0.04, 1.02, 12), mat(0xa0c4d8, 0.1, 0.22, 0.32), 0, 0.55);
    // bowl (wide inverted cone)
    addMesh(cyl(0.62, 0.06, 0.52, 32), mat(0xa0c4d8, 0.1, 0.22, 0.2), 0, 1.32);
    // liquid inside bowl
    addMesh(cyl(0.58, 0.06, 0.44, 32), mat(liquidColor, 0.32, 0.06, 0.86), 0, 1.28);
    // salt rim
    if (hasSaltRim) {
      addMesh(new THREE.TorusGeometry(0.64, 0.045, 8, 32), mat(0xfafafa, 0.92, 0), 0, 1.59, 0, Math.PI / 2);
    }
  }

  function buildDefault() {
    plate(1.3);
    addMesh(new THREE.SphereGeometry(0.5, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.5),
      mat(0xd4a058, 0.82, 0.05), 0, 0.05);
  }

  return { init: init, cleanup: cleanup };
})();
