function initCursor() {
  var dot  = document.getElementById('cursor');
  var ring = document.getElementById('cursor-follower');
  if (!dot || !ring) return;

  /* ── canvas trail ── */
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9997;';
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  /* ── particle pool ── */
  var particles = [];

  function spawnParticle(x, y, vx, vy) {
    var speed = Math.sqrt(vx * vx + vy * vy);
    if (speed < 1.8) return;
    var count = Math.min(Math.floor(speed * 0.28) + 1, 4);
    for (var i = 0; i < count; i++) {
      var angle = Math.atan2(vy, vx) + (Math.random() - 0.5) * 1.1;
      var mag   = Math.random() * speed * 0.10 + 0.2;
      particles.push({
        x:     x + (Math.random() - 0.5) * 6,
        y:     y + (Math.random() - 0.5) * 6,
        vx:    Math.cos(angle) * mag,
        vy:    Math.sin(angle) * mag - 0.28,
        life:  1.0,
        decay: 0.026 + Math.random() * 0.018,
        r:     Math.random() * 3 + 1.5,
      });
    }
  }

  /* gold smoke palette */
  function smokeColor(alpha) {
    var t = Math.random();
    var r = Math.round(210 + t * 40);
    var g = Math.round(155 + t * 60);
    var b = Math.round(45  + t * 25);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  /* ── cursor tracking ── */
  var mx = -200, my = -200;
  var fx = -200, fy = -200;
  var pvx = 0, pvy = 0;
  var cvx = 0, cvy = 0;

  document.addEventListener('mousemove', function(e) {
    cvx = e.clientX - mx;
    cvy = e.clientY - my;
    mx  = e.clientX;
    my  = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    spawnParticle(mx, my, cvx, cvy);
  });

  /* ── hover & click states ── */
  document.addEventListener('mouseover', function(e) {
    if (e.target.closest('a,button,[data-dish],[data-wine],.menu-item,.wine-card,.faq-q')) {
      dot.classList.add('is-hover');
      ring.classList.add('is-hover');
    }
  });
  document.addEventListener('mouseout', function(e) {
    if (e.target.closest('a,button,[data-dish],[data-wine],.menu-item,.wine-card,.faq-q')) {
      dot.classList.remove('is-hover');
      ring.classList.remove('is-hover');
    }
  });
  document.addEventListener('mousedown', function() {
    dot.classList.add('is-click');
    ring.classList.add('is-click');
  });
  document.addEventListener('mouseup', function() {
    dot.classList.remove('is-click');
    ring.classList.remove('is-click');
  });

  /* ── main loop ── */
  (function loop() {
    requestAnimationFrame(loop);

    /* ring follow with lag + velocity stretch */
    fx  += (mx - fx)  * 0.095;
    fy  += (my - fy)  * 0.095;
    pvx += (cvx - pvx) * 0.15;
    pvy += (cvy - pvy) * 0.15;

    var speed   = Math.sqrt(pvx * pvx + pvy * pvy);
    var angle   = Math.atan2(pvy, pvx) * 180 / Math.PI;
    var stretch = Math.min(1 + speed * 0.042, 1.6);
    var squeeze = 1 / stretch;

    ring.style.left      = fx + 'px';
    ring.style.top       = fy + 'px';
    ring.style.transform = 'translate(-50%,-50%) rotate(' + angle + 'deg)'
                         + ' scaleX(' + stretch + ') scaleY(' + squeeze + ')';

    /* draw particles */
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy -= 0.018; /* float up */
      p.vx *= 0.96;
      p.life -= p.decay;

      if (p.life <= 0) { particles.splice(i, 1); continue; }

      var alpha = p.life * p.life; /* quadratic fade */
      var radius = p.r * (0.5 + p.life * 0.5);

      var grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 2.8);
      grd.addColorStop(0,    smokeColor(alpha * 0.55));
      grd.addColorStop(0.5,  smokeColor(alpha * 0.18));
      grd.addColorStop(1,    'rgba(201,140,40,0)');

      ctx.beginPath();
      ctx.arc(p.x, p.y, radius * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }
  })();
}
