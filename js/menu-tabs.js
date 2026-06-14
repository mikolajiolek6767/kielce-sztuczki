function initMenuTabs() {
  document.querySelectorAll('.menu-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.menu-tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('tab-' + btn.dataset.tab);
      if (panel) {
        panel.classList.add('active');
        gsap.fromTo(panel, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      }
    });
  });
}
