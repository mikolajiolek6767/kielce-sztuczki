function initLoader(onComplete) {
  const line   = document.getElementById('loader-line');
  const pct    = document.getElementById('loader-pct');
  const loader = document.getElementById('loader');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(hideLoader, 300);
    }
    line.style.width = progress + '%';
    pct.textContent  = Math.floor(progress) + '%';
  }, 80);

  function hideLoader() {
    gsap.to(loader, {
      opacity: 0, duration: 0.8, ease: 'power2.inOut',
      onComplete: () => {
        loader.style.display = 'none';
        if (onComplete) onComplete();
      }
    });
  }
}
