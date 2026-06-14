/* ─── 3D WINE BOTTLE RENDERER ─── */
var WineScene = (function () {
  var scene, camera, renderer, controls, animId, container;

  var PROFILES = {
    bordeaux: [
      [0.01, 0.00], [0.30, 0.00], [0.32, 0.025], [0.335, 0.09],
      [0.335, 1.05], [0.335, 1.20], [0.265, 1.40],
      [0.120, 1.56], [0.105, 1.62], [0.098, 1.90],
      [0.112, 1.96], [0.112, 2.02], [0.098, 2.06], [0.098, 2.12]
    ],
    champagne: [
      [0.01, 0.00], [0.35, 0.00], [0.38, 0.04], [0.395, 0.14],
      [0.395, 0.90], [0.380, 1.04], [0.295, 1.25],
      [0.148, 1.48], [0.128, 1.56], [0.120, 1.84],
      [0.136, 1.90], [0.130, 1.96], [0.118, 2.00]
    ]
  };

  var WINES = {
    gavi: {
      profile: 'bordeaux', glassColor: 0x2e5530, wineColor: 0xd4c060, foilColor: 0xd4af37,
      labelBg: '#f5f0e0', labelGold: '#c9a84c', labelText: 'GAVI DI GAVI', labelSub: 'DOCG · PIEMONT', labelYear: '2022'
    },
    bordeaux: {
      profile: 'bordeaux', glassColor: 0x1a2a18, wineColor: 0x5a0a10, foilColor: 0x2a1a10,
      labelBg: '#f0ede5', labelGold: '#8a6a30', labelText: 'SAINT-ÉMILION', labelSub: 'GRAND CRU · BORDEAUX', labelYear: '2019'
    },
    champagne: {
      profile: 'champagne', glassColor: 0x3a5a30, wineColor: 0xe8d890, foilColor: 0xd4af37,
      labelBg: '#faf8f2', labelGold: '#b8952a', labelText: 'BRUT NATURE', labelSub: 'CHAMPAGNE', labelYear: 'NV'
    }
  };

  function pts(profile) {
    return PROFILES[profile].map(function (p) { return new THREE.Vector2(p[0], p[1]); });
  }

  function makeLabel(wine) {
    var W = 512, H = 280;
    var c = document.createElement('canvas');
    c.width = W; c.height = H;
    var ctx = c.getContext('2d');
    ctx.fillStyle = wine.labelBg;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = wine.labelGold; ctx.lineWidth = 5;
    ctx.strokeRect(10, 10, W - 20, H - 20);
    ctx.lineWidth = 1.5;
    ctx.strokeRect(18, 18, W - 36, H - 36);
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, 56); ctx.lineTo(W - 40, 56); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(40, 59); ctx.lineTo(W - 40, 59); ctx.stroke();
    ctx.fillStyle = '#1a1208';
    ctx.font = 'bold 46px "Times New Roman", serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(wine.labelText, W / 2, 118);
    ctx.fillStyle = wine.labelGold;
    ctx.font = '600 22px Arial, sans-serif';
    ctx.fillText(wine.labelSub, W / 2, 168);
    ctx.fillStyle = '#2a1a08';
    ctx.font = '32px "Times New Roman", serif';
    ctx.fillText(wine.labelYear, W / 2, 220);
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, 246); ctx.lineTo(W - 40, 246); ctx.stroke();
    return new THREE.CanvasTexture(c);
  }

  function init(containerId, wineId) {
    cleanup();
    container = document.getElementById(containerId);
    if (!container || typeof THREE === 'undefined') return;

    var wine = WINES[wineId] || WINES.bordeaux;
    var w = container.clientWidth  || 380;
    var h = container.clientHeight || 520;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060606);
    scene.fog = new THREE.FogExp2(0x060606, 0.12);

    camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 50);
    camera.position.set(0, 1.05, 3.6);
    camera.lookAt(0, 1.05, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xfff5e0, 1.2));
    var key = new THREE.DirectionalLight(0xfff0d0, 6);
    key.position.set(2, 5, 3); key.castShadow = true;
    scene.add(key);
    var rim = new THREE.DirectionalLight(0xa0c0ff, 2.5);
    rim.position.set(-3, 2, -2); scene.add(rim);
    var back = new THREE.DirectionalLight(0xfff8e8, 1.5);
    back.position.set(0, 3, -4); scene.add(back);
    var fill = new THREE.PointLight(0xfff0d0, 0.8, 4);
    fill.position.set(0, -0.3, 1.5); scene.add(fill);

    buildBottle(wine);

    var table = new THREE.Mesh(
      new THREE.CircleGeometry(1.8, 48),
      new THREE.MeshStandardMaterial({ color: 0x0e0e0e, roughness: 0.5, metalness: 0.2 })
    );
    table.rotation.x = -Math.PI / 2;
    table.position.y = -0.01;
    table.receiveShadow = true;
    scene.add(table);

    var hint = document.createElement('div');
    hint.className = 'dm-3d-hint';
    hint.textContent = 'Przeciągnij aby obrócić';
    container.appendChild(hint);

    /* OrbitControls — try/catch so scene still renders if CDN script failed */
    try {
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
    } catch (e) {
      controls = null;
      addDragFallback(renderer.domElement);
    }

    animate();
    window.addEventListener('resize', onResize);
  }

  function buildBottle(wine) {
    var profile = wine.profile;
    var segs = 64;

    /* Glass */
    var bottle = new THREE.Mesh(
      new THREE.LatheGeometry(pts(profile), segs),
      new THREE.MeshPhysicalMaterial({
        color: wine.glassColor, metalness: 0.08, roughness: 0.05,
        transparent: true, opacity: 0.82,
        side: THREE.DoubleSide, depthWrite: false,
        envMapIntensity: 1.4
      })
    );
    bottle.castShadow = true;
    scene.add(bottle);

    /* Wine fill */
    var innerPts = PROFILES[profile].map(function (p) {
      return new THREE.Vector2(p[0] * 0.88, p[1] + 0.01);
    });
    var fillH = 1.3;
    var winePts = innerPts.filter(function (p) { return p.y <= fillH; });
    if (winePts[winePts.length - 1].y < fillH) {
      winePts.push(new THREE.Vector2(winePts[winePts.length - 1].x, fillH));
      winePts.push(new THREE.Vector2(0.01, fillH));
    }
    scene.add(new THREE.Mesh(
      new THREE.LatheGeometry(winePts, segs),
      new THREE.MeshStandardMaterial({ color: wine.wineColor, roughness: 0.15, metalness: 0, transparent: true, opacity: 0.82 })
    ));

    /* Label */
    var labelR   = PROFILES[profile][4][0] * 1.002;
    var labelBot = 0.25, labelTop = 0.80;
    var label = new THREE.Mesh(
      new THREE.CylinderGeometry(labelR, labelR, labelTop - labelBot, segs, 1, true),
      new THREE.MeshStandardMaterial({ map: makeLabel(wine), roughness: 0.85, metalness: 0, side: THREE.FrontSide, transparent: true, opacity: 0.97 })
    );
    label.position.y = labelBot + (labelTop - labelBot) / 2;
    scene.add(label);

    /* Foil */
    var neckR = PROFILES[profile][8][0];
    var neckY = PROFILES[profile][8][1];
    var topY  = PROFILES[profile][PROFILES[profile].length - 1][1];
    var foilH = topY - neckY + 0.02;
    var foilMat = new THREE.MeshStandardMaterial({ color: wine.foilColor, roughness: 0.45, metalness: 0.6 });
    var foil = new THREE.Mesh(new THREE.CylinderGeometry(neckR + 0.005, neckR + 0.005, foilH, segs), foilMat);
    foil.position.y = neckY + foilH / 2 - 0.01;
    scene.add(foil);
    var cap = new THREE.Mesh(new THREE.CircleGeometry(neckR + 0.005, segs), foilMat);
    cap.rotation.x = -Math.PI / 2; cap.position.y = topY + 0.001;
    scene.add(cap);

    /* Base */
    var baseR = PROFILES[profile][1][0];
    var base = new THREE.Mesh(
      new THREE.CircleGeometry(baseR * 0.95, segs),
      new THREE.MeshStandardMaterial({ color: wine.glassColor, roughness: 0.1, metalness: 0.05 })
    );
    base.rotation.x = Math.PI / 2; base.position.y = 0.001;
    scene.add(base);

    /* Punt (champagne) */
    if (profile === 'champagne') {
      var punt = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5),
        new THREE.MeshPhysicalMaterial({ color: wine.glassColor, roughness: 0.06, metalness: 0.08, transparent: true, opacity: 0.85, side: THREE.FrontSide })
      );
      punt.rotation.x = Math.PI; punt.position.y = 0.18;
      scene.add(punt);
    }
  }

  function onResize() {
    if (!container || !camera || !renderer) return;
    var w = container.clientWidth, h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  var drag = { active: false, x: 0, delta: 0 };

  function addDragFallback(el) {
    el.addEventListener('mousedown', function (e) { drag.active = true; drag.x = e.clientX; });
    el.addEventListener('mousemove', function (e) {
      if (!drag.active) return;
      drag.delta += (e.clientX - drag.x) * 0.012;
      drag.x = e.clientX;
    });
    ['mouseup', 'mouseleave'].forEach(function (ev) {
      el.addEventListener(ev, function () { drag.active = false; });
    });
    el.addEventListener('touchstart', function (e) { drag.active = true; drag.x = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchmove', function (e) {
      if (!drag.active) return;
      drag.delta += (e.touches[0].clientX - drag.x) * 0.012;
      drag.x = e.touches[0].clientX;
    }, { passive: true });
    el.addEventListener('touchend', function () { drag.active = false; });
  }

  function animate() {
    animId = requestAnimationFrame(animate);
    if (controls) {
      controls.update();
    } else if (camera) {
      var t = Date.now() * 0.00028 + drag.delta;
      camera.position.x = Math.sin(t) * 3.6;
      camera.position.z = Math.cos(t) * 3.6;
      camera.lookAt(0, 1.05, 0);
    }
    if (renderer && scene && camera) renderer.render(scene, camera);
  }

  function cleanup() {
    if (animId) cancelAnimationFrame(animId);
    animId = null;
    if (renderer) {
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode)
        renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
    if (scene) {
      scene.traverse(function (obj) {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          (Array.isArray(obj.material) ? obj.material : [obj.material]).forEach(function (m) {
            if (m.map) m.map.dispose();
            m.dispose();
          });
        }
      });
    }
    if (container) { var h = container.querySelector('.dm-3d-hint'); if (h) h.remove(); }
    window.removeEventListener('resize', onResize);
    scene = camera = renderer = controls = container = null;
  }

  return { init: init, cleanup: cleanup };
})();
