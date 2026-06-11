function initReservationForm() {
  const form    = document.getElementById('res-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    gsap.to(form, {
      opacity: 0, y: -20, duration: 0.4,
      onComplete: () => {
        form.style.display    = 'none';
        success.style.display = 'block';
        gsap.fromTo(success,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }
    });
  });
}
