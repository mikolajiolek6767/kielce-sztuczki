// ─── DISH DATA ─────────────────────────────────────────────────────────────
var DISH_DATA = {

  /* ══ ZIMNE TALERZE ══ */
  'hummus': {
    name:     'Hummus z Ajitama',
    nameEn:   'Hummus w/ Ajitama Egg & Parslee Oile',
    category: 'Zimne Talerze',
    price:    '26 zł',
    desc:     'Kremowy hummus z ciecierzycy, podany z marynowanym żółtkiem ajitama i aromatycznym olejkiem pietruszkowym. Klasyk w zaskakującym, nowoczesnym wydaniu.',
    photo:    'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6787-1024x768.jpeg',
    tags:     ['Vegan', 'Gluten Free', 'Sharing'],
    ingredients: ['Hummus z ciecierzycy', 'Żółtko ajitama', 'Olejek pietruszkowy', 'Chleb pita']
  },
  'tatar-pomidorowy': {
    name:     'Tatar Pomidorowy',
    nameEn:   'Tomatto Tartare — Friesh & Ligth',
    category: 'Zimne Talerze',
    price:    '28 zł',
    desc:     'Lekki i odświeżający tatar z dojrzałych pomidorów. Podany z chrupiącymi grzankami i ziołami. Idealna propozycja na letni wieczór.',
    photo:    'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6788-1024x768.jpeg',
    tags:     ['Vegan', 'Sharing'],
    ingredients: ['Pomidory heirloom', 'Kapary', 'Cebula dymka', 'Oliwa extra virgin', 'Bazylika']
  },
  'not-tuna': {
    name:     '„Not-Tuna" Arbuz & Burrata',
    nameEn:   '"Not-Tunna" — Watermellon, Burrata, Ruggola',
    category: 'Zimne Talerze',
    price:    '34 zł',
    desc:     'Pieczony arbuz przypominający w teksturze tuńczyka, podany z kremową burratą, rukolą i musztardowym dipem. Danie, które zaskakuje i zachwyca.',
    photo:    null,
    tags:     ['Vegan Option', 'Sharing', 'Sezonowe'],
    ingredients: ['Pieczony arbuz', 'Burrata', 'Rukola', 'Dip musztardowy', 'Sól morska']
  },
  'carpaccio-losos': {
    name:     'Carpaccio z Łososia Sashimi',
    nameEn:   'Sashimmi Salmon Carpacchio — Silky & Smooooth',
    category: 'Zimne Talerze',
    price:    '42 zł',
    desc:     'Cienko krojony łosoś norweski w stylu sashimi, skropiony cytryną i oliwą. Delikatny, elegancki, pełen smaku.',
    photo:    'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6797-1024x768.jpeg',
    tags:     ['Gluten Free', 'Sharing'],
    ingredients: ['Łosoś norweski', 'Cytryna', 'Oliwa extra virgin', 'Sól himalajska', 'Mikrozioła']
  },
  'tatar-wolowy': {
    name:     'Tatar Wołowy z Polędwicy',
    nameEn:   'Beef Tartarre — Tenderloin, Raw & Bolde',
    category: 'Zimne Talerze',
    price:    '48 zł',
    desc:     'Klasyczny tatar z najwyższej jakości polędwicy wołowej. Podany z żółtkiem, kaparami i chrupiącym tostami.',
    photo:    null,
    tags:     ['Gluten Free', 'Sharing'],
    ingredients: ['Polędwica wołowa', 'Żółtko', 'Kapary', 'Ogórek kiszony', 'Musztarda Dijon']
  },

  /* ══ CIEPŁE TALERZE ══ */
  'tagliatelle': {
    name:     'Tagliatelle Szpinakowe',
    nameEn:   'Spinach Tagliattellie — Pieczony Selleri',
    category: 'Ciepłe Talerze',
    price:    '36 zł',
    desc:     'Domowy makaron szpinakowy z pieczonym selerem. Danie łączące kremowość z wyrazistym smakiem warzyw.',
    photo:    'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6789-1024x768.jpeg',
    tags:     ['Vegetarian', 'Sharing'],
    ingredients: ['Świeży makaron szpinakowy', 'Pieczony seler', 'Masło', 'Parmezan', 'Szałwia']
  },
  'halibut': {
    name:     'Halibut z Puree z Groszku',
    nameEn:   'Hallibut Fillet — Greeen Pea Purree',
    category: 'Ciepłe Talerze',
    price:    '52 zł',
    desc:     'Soczysty filet halibuta na aksamitnym puree z zielonego groszku. Delikatna ryba w idealnym towarzystwie.',
    photo:    'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6801-1024x768.jpeg',
    tags:     ['Gluten Free', 'Sharing'],
    ingredients: ['Filet halibuta', 'Puree z groszku', 'Masło cytrynowe', 'Koper', 'Sól morska']
  },
  'krewetki': {
    name:     'Krewetki z Chorizo i Fasolą',
    nameEn:   'Shrimmp w/ Chorizo & Beanns — Spiccy',
    category: 'Ciepłe Talerze',
    price:    '46 zł',
    desc:     'Soczyste krewetki tygrysie duszone z pikantnym chorizo i białą fasolą. Intensywne, rozgrzewające, idealne do dzielenia.',
    photo:    'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6804-1024x768.jpeg',
    tags:     ['Gluten Free', 'Sharing', 'Spicy'],
    ingredients: ['Krewetki tygrysie', 'Chorizo ibérico', 'Biała fasola', 'Pomidory', 'Czosnek', 'Papryczka chili']
  },
  'satay-kurczak': {
    name:     'Satay z Kurczaka',
    nameEn:   'Chikken Sataay — Crispy Cabbagge Sidde',
    category: 'Ciepłe Talerze',
    price:    '38 zł',
    desc:     'Delikatne szaszłyki z kurczaka w aromatycznej marynacie, podane z chrupiącą kapustą i sosem orzechowym.',
    photo:    'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6810-1024x768.jpeg',
    tags:     ['Sharing', 'Gluten Free'],
    ingredients: ['Pierś kurczaka', 'Sos orzechowy', 'Chrupiąca kapusta', 'Limonka', 'Kolendra']
  },
  'kaczka': {
    name:     'Kaczka Sous-Vide',
    nameEn:   'Ducck Fillett Sous-Vidde — Onioon Moousse',
    category: 'Ciepłe Talerze',
    price:    '54 zł',
    desc:     'Pierś kaczki gotowana metodą sous-vide — krucha z jednej strony, delikatna z drugiej. Podana z musem cebulowym.',
    photo:    'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6813-1024x768.jpeg',
    tags:     ['Gluten Free', 'Sharing', 'Chef\'s Choice'],
    ingredients: ['Pierś kaczki', 'Mus cebulowy', 'Ocet balsamiczny', 'Tymianek', 'Masło klarowane']
  },
  'kluski': {
    name:     'Kluski Ziemniaczane',
    nameEn:   'Potatoe Noodless — Comffort Foood',
    category: 'Ciepłe Talerze',
    price:    '32 zł',
    desc:     'Miękkie kluski ziemniaczane w nowoczesnym wydaniu. Klasyczne danie comfort food w artystycznej odsłonie.',
    photo:    null,
    tags:     ['Vegetarian', 'Sharing'],
    ingredients: ['Ziemniaki', 'Mąka', 'Masło brown', 'Śmietana', 'Szczypiorek']
  },
  'frytki-cukinii': {
    name:     'Frytki z Cukinii',
    nameEn:   'Zucchinni Fryes — Ligth & Crisppy',
    category: 'Ciepłe Talerze',
    price:    '26 zł',
    desc:     'Chrupiące frytki z cukinii w lekkim cieście. Lekka, przyjemna przekąska idealna na sharing.',
    photo:    null,
    tags:     ['Vegan', 'Sharing'],
    ingredients: ['Cukinia', 'Ciasto tempura', 'Sos jogurtowy', 'Cytryna', 'Zioła prowansalskie']
  },
  'katsu-cielece': {
    name:     'Katsu Cielęce',
    nameEn:   'Veall Katsuu — Parmessan Foamm',
    category: 'Ciepłe Talerze',
    price:    '58 zł',
    desc:     'Delikatne cielęce katsu w panko, podane z lekką pianką parmezanową. Połączenie kuchni japońskiej z włoską elegancją.',
    photo:    'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6777-1024x768.jpeg',
    tags:     ['Sharing', 'Chef\'s Choice'],
    ingredients: ['Cielęcina', 'Bułka panko', 'Pianka parmezanowa', 'Sos tonkatsu', 'Kapusta']
  },

  /* ══ DANIA GŁÓWNE ══ */
  'policzki-wolowe': {
    name:     'Policzki Wołowe',
    nameEn:   'Beef Cheekks — Mushrooom Sauuce, Sloww Cookked',
    category: 'Dania Główne',
    price:    '68 zł',
    desc:     'Długo duszone policzki wołowe w intensywnym sosie grzybowym. Mięso idealnie miękkie, sos głęboki i aromatyczny.',
    photo:    'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6778-1024x768.jpeg',
    tags:     ['Gluten Free', 'Slow Cooked'],
    ingredients: ['Policzki wołowe', 'Sos grzybowy', 'Puree ziemniaczane', 'Czerwone wino', 'Tymianek']
  },
  'ribeye': {
    name:     'Ribeye na Kamieniu',
    nameEn:   'Ribbeye Steakk — On Hottt Stonne',
    category: 'Dania Główne',
    price:    '89 zł',
    desc:     'Soczysty antrykot podawany na rozgrzanym kamieniu wulkanicznym. Dojrzewający do perfekcji, serwowany w całej swojej prostocie.',
    photo:    null,
    tags:     ['Gluten Free', 'Signature'],
    ingredients: ['Ribeye 300g', 'Sól morska', 'Pieprz świeżo mielony', 'Masło ziołowe', 'Rzeżucha']
  },
  'kalafior-burger': {
    name:     'Burger ze Stekiem Kalafiora',
    nameEn:   'Cauliflowwer Steakk Burgerr — 100% Vegann',
    category: 'Dania Główne',
    price:    '44 zł',
    desc:     'Soczysty stek z kalafiora w bułce brioche z wegańskim majonezem i piklami. Dowód, że vegan może być wybitne.',
    photo:    null,
    tags:     ['Vegan', 'Gluten Free Option'],
    ingredients: ['Stek z kalafiora', 'Bułka brioche', 'Wegański majonez', 'Pikle', 'Roszponka']
  },

  /* ══ DESERY ══ */
  'rum-baba': {
    name:     'Rum Baba w Słoiku',
    nameEn:   'Rum Baabaa in Jarr — Englissh Creem',
    category: 'Desery',
    price:    '28 zł',
    desc:     'Klasyczne rum baba w nowoczesnym słoikowym wydaniu z aksamitnym kremem angielskim. Lekkie, wilgotne, niezapomniane.',
    photo:    'https://tymrazem.pl/wp-content/uploads/2025/06/sztuczki6764-1024x768.jpeg',
    tags:     ['Vegetarian', 'Signature Dessert'],
    ingredients: ['Baba drożdżowa', 'Rum ciemny', 'Krem angielski', 'Wanilia', 'Syrop cukrowy']
  },
  'krem-pistacjowy': {
    name:     'Krem Pistacjowy z Wiśniami',
    nameEn:   'Pisstaccio Creaam — Cherriees & Halvvah',
    category: 'Desery',
    price:    '30 zł',
    desc:     'Bogaty krem pistacjowy z wiśniami w konfiturze i nitkami chałwy. Intensywny, pełen smaku i kontrastów.',
    photo:    null,
    tags:     ['Vegetarian', 'Gluten Free'],
    ingredients: ['Pasta pistacjowa', 'Wiśnie konfitura', 'Chałwa', 'Śmietana 36%', 'Liofilizat wiśni']
  },
  'rabarbar': {
    name:     'Pieczony Rabarbar',
    nameEn:   'Bakked Rhubbarb — Nutt & Cranberrry Crumbble',
    category: 'Desery',
    price:    '26 zł',
    desc:     'Pieczony rabarbar z kruszonką orzechową i żurawiną. Idealny balans kwaśności i słodyczy w jednym.',
    photo:    null,
    tags:     ['Vegan', 'Seasonal'],
    ingredients: ['Rabarbar', 'Kruszonka orzechowa', 'Żurawina', 'Cynamon', 'Cukier muscovado']
  },

  /* ══ NAPOJE / COCKTAILE ══ */
  'espresso-tonic': {
    name:     'Espresso Tonic z Granatem',
    nameEn:   'Espressso Tonicc — Pomegranatte Twistt',
    category: 'Napoje',
    price:    '22 zł',
    desc:     'Intensywne espresso dopełnione tonikiem i sokiem z granatu. Orzeźwiające i pobudzające połączenie.',
    photo:    null,
    tags:     ['Bezalkoholowy', 'Kawa'],
    ingredients: ['Espresso double', 'Tonic Fever-Tree', 'Sok z granatu', 'Lód', 'Skórka cytryny']
  },
  'mali-boo': {
    name:     'Mali Boo',
    nameEn:   'Mallii Booo — Siggnaturre Cocktaill',
    category: 'Cocktaile',
    price:    '38 zł',
    desc:     'Autorski cocktail barmana. Świeży, owocowy, z wyraźną nutą egzotyki. Zmieniany sezonowo.',
    photo:    null,
    tags:     ['Cocktail', 'Signature'],
    ingredients: ['Wódka', 'Kokos', 'Limonka', 'Mango', 'Soda']
  },
  'rabarbaroni': {
    name:     'Rabarbaroni',
    nameEn:   'Rabarbaaroni — Negroni w/ Rhubbarb Twistt',
    category: 'Cocktaile',
    price:    '40 zł',
    desc:     'Polska interpretacja Negroni z syropem rabarbarowym. Gorzki, słodki i kwaskowaty jednocześnie.',
    photo:    null,
    tags:     ['Cocktail', 'Bitter'],
    ingredients: ['Gin', 'Campari', 'Syrop rabarbarowy', 'Vermouth', 'Skórka pomarańczowa']
  },
  'marharita': {
    name:     'Marharita',
    nameEn:   'Marhaarita — Housee Margaritaa',
    category: 'Cocktaile',
    price:    '38 zł',
    desc:     'Autorska Margarita baru Sztuczki. Klasyczna receptura z niespodziewanym, sezonowym twistem.',
    photo:    null,
    tags:     ['Cocktail', 'Classic'],
    ingredients: ['Tequila blanco', 'Triple Sec', 'Sok z limonki', 'Sól', 'Twist sezonowy']
  }
};

// ─── 3D TILT INTERACTION ────────────────────────────────────────────────────
var dmCard       = null;
var dmScene      = null;
var dmShine      = null;
var isDragging   = false;
var rotX = 0, rotY = 0;
var startX = 0, startY = 0;
var velX = 0, velY = 0;
var animFrameId  = null;

function initCardInteraction() {
  dmCard  = document.getElementById('dm-card');
  dmScene = document.getElementById('dm-scene');
  dmShine = document.getElementById('dm-shine');
  if (!dmCard) return;

  dmScene.addEventListener('mousemove', onMouseMove);
  dmScene.addEventListener('mouseleave', onMouseLeave);

  dmScene.addEventListener('mousedown',  onDragStart);
  window.addEventListener('mousemove',   onDragMove);
  window.addEventListener('mouseup',     onDragEnd);

  dmScene.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove',   onTouchMove,  { passive: true });
  window.addEventListener('touchend',    onDragEnd);

  requestAnimationFrame(momentumLoop);
}

function onMouseMove(e) {
  if (isDragging) return;
  var rect = dmScene.getBoundingClientRect();
  var nx   = (e.clientX - rect.left) / rect.width  - 0.5;
  var ny   = (e.clientY - rect.top)  / rect.height - 0.5;

  rotY =  nx * 25;
  rotX = -ny * 20;
  applyCardTransform();

  dmShine = document.getElementById('dm-shine');
  if (dmShine) {
    var px = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%';
    var py = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%';
    dmShine.style.setProperty('--mx', px);
    dmShine.style.setProperty('--my', py);
    dmShine.style.opacity = '1';
  }
}

function onMouseLeave() {
  if (isDragging) return;
  velX = -rotX * 0.05;
  velY = -rotY * 0.05;
  dmShine = document.getElementById('dm-shine');
  if (dmShine) dmShine.style.opacity = '0';
}

function onDragStart(e) {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  dmScene.style.cursor = 'grabbing';
  cancelAnimationFrame(animFrameId);
}

function onDragMove(e) {
  if (!isDragging) return;
  var dx = e.clientX - startX;
  var dy = e.clientY - startY;
  velX = -dy * 0.3;
  velY =  dx * 0.3;
  rotX += velX;
  rotY += velY;
  startX = e.clientX;
  startY = e.clientY;
  applyCardTransform();
}

function onDragEnd() {
  if (!isDragging) return;
  isDragging = false;
  dmScene.style.cursor = 'grab';
  animFrameId = requestAnimationFrame(momentumLoop);
}

var lastTouchX = 0, lastTouchY = 0;
function onTouchStart(e) {
  isDragging = true;
  lastTouchX = e.touches[0].clientX;
  lastTouchY = e.touches[0].clientY;
}
function onTouchMove(e) {
  if (!isDragging) return;
  var dx = e.touches[0].clientX - lastTouchX;
  var dy = e.touches[0].clientY - lastTouchY;
  velX = -dy * 0.4;
  velY =  dx * 0.4;
  rotX += velX;
  rotY += velY;
  lastTouchX = e.touches[0].clientX;
  lastTouchY = e.touches[0].clientY;
  applyCardTransform();
}

function momentumLoop() {
  if (isDragging) return;
  velX *= 0.92;
  velY *= 0.92;
  rotX += velX;
  rotY += velY;
  if (Math.abs(velX) > 0.01 || Math.abs(velY) > 0.01) {
    applyCardTransform();
    animFrameId = requestAnimationFrame(momentumLoop);
  }
}

function applyCardTransform() {
  if (!dmCard) return;
  dmCard.style.transform = 'rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg)';
}

// ─── MODAL OPEN / CLOSE ─────────────────────────────────────────────────────
function openDishModal(dishId) {
  var dish = DISH_DATA[dishId];
  if (!dish) return;

  var modal = document.getElementById('dish-modal');

  document.getElementById('dm-category').textContent = dish.category;
  document.getElementById('dm-name-pl').textContent  = dish.name;
  document.getElementById('dm-name-en').textContent  = dish.nameEn;
  document.getElementById('dm-desc-pl').textContent  = dish.desc;
  document.getElementById('dm-price').textContent    = dish.price;

  var tagsEl = document.getElementById('dm-tags');
  tagsEl.innerHTML = dish.tags.map(function(t) {
    return '<span class="dm-tag">' + t + '</span>';
  }).join('');

  var ingEl = document.getElementById('dm-ingredients');
  ingEl.innerHTML = dish.ingredients.map(function(i) {
    return '<div class="dm-ingredient">' + i + '</div>';
  }).join('');

  var front = document.getElementById('dm-card-front-inner');
  if (dish.photo) {
    front.innerHTML = '<img src="' + dish.photo + '" alt="' + dish.name + '" />'
      + '<div class="dm-shine" id="dm-shine"></div>'
      + '<div class="dm-hint">Przeciągnij aby obrócić</div>';
  } else {
    front.innerHTML = '<div class="dm-no-photo">'
      + '<div class="dm-no-photo-icon">📷</div>'
      + '<div class="dm-no-photo-text">Brak zdjęcia</div>'
      + '</div>'
      + '<div class="dm-hint">Przeciągnij aby obrócić</div>';
  }

  rotX = 0; rotY = 0; velX = 0; velY = 0;
  applyCardTransform();

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  dmShine = document.getElementById('dm-shine');
  gsap.fromTo('#dm-card',    { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' });
  gsap.fromTo('.dm-text > *',{ opacity: 0, x: 30 },      { opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out', delay: 0.15 });
}

function closeDishModal() {
  var modal = document.getElementById('dish-modal');
  gsap.to('#dish-modal', { opacity: 0, duration: 0.3, onComplete: function() {
    modal.classList.remove('open');
    modal.style.opacity = '';
    document.body.style.overflow = '';
    rotX = 0; rotY = 0;
    applyCardTransform();
  }});
}

function initDishModal() {
  document.getElementById('dm-close-btn').addEventListener('click', closeDishModal);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeDishModal();
  });

  document.getElementById('dish-modal').addEventListener('click', function(e) {
    if (e.target === this) closeDishModal();
  });

  document.querySelectorAll('[data-dish]').forEach(function(el) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function() {
      openDishModal(this.dataset.dish);
    });
  });

  initCardInteraction();
}
