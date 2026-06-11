/* ─── 3D WINE BOTTLE RENDERER ─── */
var WineScene = (function () {
  var scene, camera, renderer, controls, animId, container;

  // ── bottle profiles (LatheGeometry points) ────────────────────────────────

  var PROFILES = {
    bordeaux: [
      // [radius, y] — Bordeaux: tall, straight body, sharp shoulders
      [0.01, 0.00], [0.30, 0.00], [0.32, 0.025], [0.335, 0.09],
      [0.335, 1.05], [0.335, 1.20], [0.265, 1.40],
      [0.120, 1.56], [0.105, 1.62], [0.098, 1.90],
      [0.112, 1.96], [0.112, 2.02], [0.098, 2.06], [0.098, 2.12]
    ],
    champagne: [
      // Champagne: wider punt, sloped shoulders, thicker neck
      [0.01, 0.00], [0.35, 0.00], [0.38, 0.04], [0.395, 0.14],
      [0.395, 0.90], [0.380, 1.04], [0.295, 1.25],
      [0.148, 1.48], [0.128, 1.56], [0.120, 1.84],
      [0.136, 1.90], [0.130, 1.96], [0.118, 2.00]
    ]
  };

  // ── wine configs ───────────────────────────────────────────────────────────

  var WINES = {
    gavi: {
      profile:    'bordeaux',
      glassColor: 0x2e5530,   // dark green glass
      wineColor:  0xd4c060,   // pale straw white wine
      foilColor:  0xd4af37,   // gold foil
      labelBg:    '#f5f0e0',
      labelGold:  '#c9a84c',
      labelText:  'GAVI DI GAVI',
      labelSub:   'DOCG · PIEMONT',
      labelYear:  '2022',
    },
    bordeaux: {
      profile:    'bordeaux',
      glassColor: 0x1a2a18,   // very dark green
      wineColor:  0x5a0a10,   // deep bordeaux red
      foilColor:  0x2a1a10,   // dark wax
      labelBg:    '#f0ede5',
      labelGold:  '#8a6a30',
      labelText:  "SAINT-ÉMILION",
      labelSub:   'GRAND CRU · BORDEAUX',
      labelYear:  '2019',
    },
    champagne: {
      profile:    'champagne',
      glassColor: 0x3a5a30,   // medium green champagne glass
      wineColor:  0xe8d890,   // pale gold champagne
      foilColor:  0xd4af37,   // gold foil
      labelBg:    '#faf8f2',
      labelGold:  '#b8952a',
      labelText:  'BRUT NATURE',
      labelSub:   'CHAMPAGNE',
      labelYear:  'NV',
    }
  };

  // ── helpers ────────────────────────────────────────────────────────────────

  function pts(profile) {
    return PROFILES[profile].map(function (p) {
      return new THREE.Vector2(p[0], p[1]);
    });
  }

  function makeLabel(wine) {
    var W = 512, H = 280;
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var ctx = c.getContext('2d');

    // background
    ctx.fillStyle = wine.labelBg;
    ctx.fillRect(0, 0, W, H);

    // outer border
    ctx.strokeStyle = wine.labelGold;
    ctx.lineWidth = 5;
    ctx.strokeRect(10, 10, W - 20, H - 20);
    ctx.lineWidth = 1.5;
    ctx.strokeRect(18, 18, W - 36, H - 36);

    // decorative top line
    ctx.strokeStyle = wine.labelGold;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, 56); ctx.lineTo(W - 40, 56); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(40, 59); ctx.lineTo(W - 40, 59); ctx.stroke();

    // main name
    ctx.fillStyle = '#1a1208';
    ctx.font = 'bold 46px "Times New Roman", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(wine.labelText, W / 2, 118);

    // subtitle
    ctx.fillStyle = wine.labelGold;
    ctx.font = '600 22px "Arial", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText(wine.labelSub, W / 2, 168);

    // year
    ctx.fillStyle = '#2a1a08';
    ctx.font = '32px "Times New Roman", serif';
    ctx.fillText(wine.labelYear, W / 2, 220);

    // bottom line
    ctx.strokeStyle = wine.labelGold;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, 246); ctx.lineTo(W - 40, 246); ctx.stroke();

    return new THREE.CanvasTexture(c);
  }

  // ── scene lifecycle ────────────────────────────────────────────────────────

  function init(containerId, wineId) {
    cleanup();
    container = document.getElementById(containerId);
    if (!container || typeof THREE === 'undefined') return;

    var wine = WINES[wineId] || WINES.bordeaux;
    var w = container.clientWidth || 380;
    var h = container.clientHeight || 520;

    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060606);

    // subtle ground fog gives depth
    scene.fog = new THREE.FogExp2(0x060606, 0.12);

    // camera
    camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 50);
    camera.position.set(0, 1.05, 3.6);
    camera.lookAt(0, 1.05, 0);

    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;
    container.appendChild(renderer.domElement);

    // lights
    scene.add(new THREE.AmbientLight(0xfff5e0, 1.2));

    var key = new THREE.DirectionalLight(0xfff0d0, 6);
    key.position.set(2, 5, 3);
    key.castShadow = true;
    scene.add(key);

    var rim = new THREE.DirectionalLight(0xa0c0ff, 2.5);
    rim.position.set(-3, 2, -2);
    scene.add(rim);

    var back = new THREE.DirectionalLight(0xfff8e8, 1.5);
    back.position.set(0, 3, -4);
    scene.add(back);

    // small fill under bottle
    var fill = new THREE.PointLight(0xfff0d0, 0.8, 4);
    fill.position.set(0, -0.3, 1.5);
    scene.add(fill);

    // build bottle
    buildBottle(wine);

    // subtle table surface
    var tableGeo = new THREE.CircleGeometry(1.8, 48);
    var tableMat = new THREE.MeshStandardMaterial({ color: 0x0e0e0e, roughness: 0.5, metalness: 0.2 });
    var table = new THREE.Mesh(tableGeo, tableMat);
    table.rotation.x = -Math.PI / 2;
    table.position.y = -0.01;
    table.receiveShadow = true;
    scene.add(table);

    // hint label
    var hint = document.createElement('div');
    hint.className = 'dm-3d-hint';
    hint.textContent = 'Przeciągnij aby obrócić';
    container.appendChild(hint);

    // OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.6;
    controls.minPolarAngle = Math.PI * 0.12;
    controls.maxPolarAngle = Math.PI * 0.78;
    controls.target.set(0, 1.05, 0);
    controls.update();

    animate();
    window.addEventListener('resize', onResize);
  }

  function buildBottle(wine) {
    var profile = wine.profile;
    var segs = 64;

    // ── outer glass shell ────────────────────────────────────────────────────
    var bottleGeo = new THREE.LatheGeometry(pts(profile), segs);
    var glassMat = new THREE.MeshPhysicalMaterial({
      color:        wine.glassColor,
      metalness:    0.02,
      roughness:    0.04,
      transmission: 0.72,
      thickness:    0.35,
      transparent:  true,
      opacity:      0.88,
      side:         THREE.DoubleSide,
      depthWrite:   false,
    });
    var bottle = new THREE.Mesh(bottleGeo, glassMat);
    bottle.castShadow = true;
    scene.add(bottle);

    // ── inner wine fill (slightly smaller) ─────────────────────────────────
    var innerPts = PROFILES[profile].map(function (p) {
      return new THREE.Vector2(p[0] * 0.88, p[1] + 0.01);
    });
    // only fill up to ~75% height (liquid level)
    var fillHeight = 1.3;
    var winePts = innerPts.filter(function (p) { return p.y <= fillHeight; });
    if (winePts[winePts.length - 1].y < fillHeight) {
      // cap the top with a flat horizontal point
      var lastR = winePts[winePts.length - 1].x;
      winePts.push(new THREE.Vector2(lastR, fillHeight));
      winePts.push(new THREE.Vector2(0.01, fillHeight));
    }
    var wineGeo = new THREE.LatheGeometry(winePts, segs);
    var wineMat = new THREE.MeshStandardMaterial({
      color:       wine.wineColor,
      roughness:   0.15,
      metalness:   0,
      transparent: true,
      opacity:     0.82,
    });
    scene.add(new THREE.Mesh(wineGeo, wineMat));

    // ── label cylinder ──────────────────────────────────────────────────────
    var labelR   = PROFILES[profile][4][0] * 1.002; // just outside bottle body
    var labelBot = 0.25;
    var labelTop = 0.80;
    var labelGeo = new THREE.CylinderGeometry(labelR, labelR, labelTop - labelBot, segs, 1, true);
    var labelMat = new THREE.MeshStandardMaterial({
      map:          makeLabel(wine),
      roughness:    0.85,
      metalness:    0,
      side:         THREE.FrontSide,
      transparent:  true,
      opacity:      0.97,
    });
    var label = new THREE.Mesh(labelGeo, labelMat);
    label.position.y = labelBot + (labelTop - labelBot) / 2;
    scene.add(label);

    // ── foil capsule (top of neck) ──────────────────────────────────────────
    var neckR = PROFILES[profile][8][0];
    var neckY = PROFILES[profile][8][1];
    var topY  = PROFILES[profile][PROFILES[profile].length - 1][1];
    var foilH = topY - neckY + 0.02;
    var foilGeo = new THREE.CylinderGeometry(neckR + 0.005, neckR + 0.005, foilH, segs);
    var foilMat = new THREE.MeshStandardMaterial({
      color:     wine.foilColor,
      roughness: 0.45,
      metalness: 0.6,
    });
    var foil = new THREE.Mesh(foilGeo, foilMat);
    foil.position.y = neckY + foilH / 2 - 0.01;
    scene.add(foil);

    // foil top disc
    var topDiscGeo = new THREE.CircleGeometry(neckR + 0.005, segs);
    var topDisc = new THREE.Mesh(topDiscGeo, foilMat);
    topDisc.rotation.x = -Math.PI / 2;
    topDisc.position.y = topY + 0.001;
    scene.add(topDisc);

    // ── bottle bottom (flat base disc) ──────────────────────────────────────
    var baseR = PROFILES[profile][1][0];
    var baseGeo = new THREE.CircleGeometry(baseR * 0.95, segs);
    var baseMat = new THREE.MeshStandardMaterial({
      color:    wine.glassColor,
      roughness: 0.1,
      metalness: 0.05,
    });
    var base = new THREE.Mesh(baseGeo, baseMat);
    base.rotation.x = Math.PI / 2;
    base.position.y = 0.001;
    scene.add(base);

    // ── punt (indentation on bottom, visible for champagne) ─────────────────
    if (profile === 'champagne') {
      var puntGeo = new THREE.SphereGeometry(0.22, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
      var puntMat = new THREE.MeshPhysicalMaterial({
        color: wine.glassColor,
        roughness: 0.04, metalness: 0.02,
        transmission: 0.6, transparent: true, opacity: 0.9,
        side: THREE.FrontSide,
      });
      var punt = new THREE.Mesh(puntGeo, puntMat);
      punt.rotation.x = Math.PI;
      punt.position.y = 0.18;
      scene.add(punt);
    }
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
          else {
            if (obj.material.map) obj.material.map.dispose();
            obj.material.dispose();
          }
        }
      });
    }
    if (container) {
      var hint = container.querySelector('.dm-3d-hint');
      if (hint) hint.remove();
    }
    window.removeEventListener('resize', onResize);
    scene = camera = renderer = controls = animId = container = null;
  }

  return { init: init, cleanup: cleanup };
})();
