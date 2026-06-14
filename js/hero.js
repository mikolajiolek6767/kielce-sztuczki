function initHeroParallax() {
  const heroImg = document.querySelector('.hero-img');
  if (!heroImg) return;
  window.addEventListener('scroll', () => {
    heroImg.style.transform = `scale(1.1) translateY(${window.scrollY * 0.2}px)`;
  }, { passive: true });
}

function animateHeroEntrance() {
  const tl = gsap.timeline({ delay: 0.1 });
  tl.to('#hero-badge',  { opacity: 1, y: 0,  duration: 1,   ease: 'power3.out' })
    .from('#h1',        { y: 80, opacity: 0,  duration: 1,   ease: 'power3.out' }, '-=0.6')
    .from('#h2',        { y: 80, opacity: 0,  duration: 1,   ease: 'power3.out' }, '-=0.8')
    .from('#h3',        { y: 80, opacity: 0,  duration: 1,   ease: 'power3.out' }, '-=0.8')
    .to('#hero-sub',    { opacity: 1, y: 0,   duration: 0.8, ease: 'power2.out' }, '-=0.5')
    .to('#hero-desc',   { opacity: 1, y: 0,   duration: 0.8, ease: 'power2.out' }, '-=0.6')
    .to('#hero-btns',   { opacity: 1, y: 0,   duration: 0.8, ease: 'power2.out' }, '-=0.5');
}
