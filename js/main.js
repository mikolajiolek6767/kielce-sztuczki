// Punkt wejścia — wszystkie funkcje są globalne, załadowane przez osobne <script> tagi
gsap.registerPlugin(ScrollTrigger);

initCursor();
initNav();
initHeroParallax();

initLoader(function () {
  animateHeroEntrance();
  initScrollAnimations();
  initCounters();
  initMenuTabs();
  initLightbox();
  initFaq();
  initReservationForm();
  initDishModal();
  initWineModal();
});
