var LB_IMAGES = [
  'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6762-1024x768.jpeg',
  'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6763-1024x768.jpeg',
  'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6777-1024x768.jpeg',
  'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6778-1024x768.jpeg',
  'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6787-1024x768.jpeg',
  'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6788-1024x768.jpeg',
  'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6789-1024x768.jpeg',
  'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6797-1024x768.jpeg',
  'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6810-1024x768.jpeg',
];
var lbIndex = 0;

function openLightbox(i) {
  lbIndex = i;
  document.getElementById('lb-img').src = LB_IMAGES[i];
  document.getElementById('lb-counter').textContent = (i + 1) + ' / ' + LB_IMAGES.length;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  lbIndex = (lbIndex + dir + LB_IMAGES.length) % LB_IMAGES.length;
  var img = document.getElementById('lb-img');
  gsap.to(img, { opacity: 0, duration: 0.2, onComplete: () => {
    img.src = LB_IMAGES[lbIndex];
    document.getElementById('lb-counter').textContent = (lbIndex + 1) + ' / ' + LB_IMAGES.length;
    gsap.to(img, { opacity: 1, duration: 0.3 });
  }});
}

function initLightbox() {
  document.getElementById('lb-close-btn').addEventListener('click', closeLightbox);
  document.getElementById('lb-prev-btn').addEventListener('click', () => navigateLightbox(-1));
  document.getElementById('lb-next-btn').addEventListener('click', () => navigateLightbox(1));

  document.querySelectorAll('.masonry-item').forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}
