function initNav() {
  const nav        = document.getElementById('nav');
  const burger     = document.getElementById('nav-burger');
  const mobileNav  = document.getElementById('nav-mobile');
  const closeBtn   = document.getElementById('nav-mobile-close');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  function openMenu() {
    mobileNav.classList.add('open');
    burger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileNav.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}
