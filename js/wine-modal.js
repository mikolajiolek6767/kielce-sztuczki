var WINE_DATA = {
  'gavi': {
    type:   'Białe · Włochy',
    name:   'Gavi di Gavi DOCG',
    origin: 'Piemont, Villa Sparina',
    desc:   'Świeże, mineralne białe wino z nutami cytrusów i białych kwiatów. Doskonałe do owoców morza i delikatnych dań z ryb.',
    price:  'od 180 zł / but.',
    photo:  'https://www.fontanafredda.it/wp-content/uploads/2021/01/Gavi.png'
  },
  'bordeaux': {
    type:   'Czerwone · Francja',
    name:   'Saint-Émilion Grand Cru',
    origin: 'Bordeaux, Château de Pressac',
    desc:   'Eleganckie, strukturalne wino z Bordeaux. Taniny jak jedwab, nuty dębowe i czerwonych owoców, długie wykończenie.',
    price:  'od 320 zł / but.',
    photo:  'https://dco67j8qsiydp.cloudfront.net/optimized/images/products/2022/09/2019_Chateau_De_Pressac_Saint_Emilion_Grand_Cru_Classe_Bordeaux_Bottleshot/29c5949395165279a3e6edaf0a4da871.png'
  },
  'champagne': {
    type:   'Musujące · Francja',
    name:   'Champagne Brut Nature',
    origin: 'Champagne, Brigandat',
    desc:   'Prestiżowy szampan ze świeżymi nutami zielonego jabłka, brioche i białych kwiatów. Zero dosage — czysty, nieocukrzony.',
    price:  'od 480 zł / but.',
    photo:  'https://champagnebrigandat.fr/wp-content/uploads/2021/06/CuveeBrutNature.png'
  }
};

// ─── OPEN / CLOSE ────────────────────────────────────────────────────────────
function openWineModal(wineId) {
  var wine = WINE_DATA[wineId];
  if (!wine) return;

  document.getElementById('wm-type').textContent   = wine.type;
  document.getElementById('wm-name').textContent   = wine.name;
  document.getElementById('wm-origin').textContent = wine.origin;
  document.getElementById('wm-desc').textContent   = wine.desc;
  document.getElementById('wm-price').textContent  = wine.price;

  var modal = document.getElementById('wine-modal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  gsap.fromTo('.wm-info > *',
    { opacity: 0, x: 32 },
    { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out', delay: 0.15 }
  );

  // init Three.js bottle scene after container finishes CSS transition
  setTimeout(function () {
    if (typeof WineScene !== 'undefined') {
      WineScene.init('wm-3d-container', wineId);
    }
  }, 120);
}

function closeWineModal() {
  var modal = document.getElementById('wine-modal');
  gsap.to('#wine-modal', {
    opacity: 0, duration: 0.3, onComplete: function () {
      modal.classList.remove('open');
      modal.style.opacity = '';
      document.body.style.overflow = '';
      if (typeof WineScene !== 'undefined') WineScene.cleanup();
    }
  });
}

// ─── INIT ────────────────────────────────────────────────────────────────────
function initWineModal() {
  document.getElementById('wm-close-btn').addEventListener('click', closeWineModal);
  document.getElementById('wine-modal').addEventListener('click', function (e) {
    if (e.target === this) closeWineModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.getElementById('wine-modal').classList.contains('open')) {
      closeWineModal();
    }
  });

  document.querySelectorAll('[data-wine]').forEach(function (el) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function () {
      openWineModal(this.dataset.wine);
    });
  });
}
