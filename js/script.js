/* =====================================================================
   CedarBloom Wellness | site script
   1) EDIT YOUR LINKS AND CONTACT DETAILS IN THE SETTINGS BELOW (one place)
   2) The rest builds the shared header and footer and the small behaviors
   ===================================================================== */
const SITE = {
  bookUrl:   '#',                      // AdvancedMD scheduling link
  portalUrl: '#',                      // AdvancedMD patient portal link
  payUrl:    '#',                      // credit card payment page link
  email:     'cedarbloomwellness@gmail.com',   // practice email
  phone:     '+1-[856]-480-3345',
  fax:       '[Fax, if applicable]',
  address:   '238 W Chestnut Ave Ste 2, Vineland, NJ 08360',
  mapQuery:  '238 W Chestnut Ave Ste 2, Vineland, NJ 08360',
  social: { instagram: '#', facebook: '#', tiktok: '#', x: '#', youtube: '#' }
};

const PAGES = [
  ['index.html', 'Home'], ['about.html', 'About'], ['services.html', 'Services'],
  ['new-patients.html', 'New Patients'], ['insurance.html', 'Insurance & Fees'],
  ['telehealth.html', 'Telehealth'], ['faq.html', 'FAQ'], ['contact.html', 'Contact']
];

const ICONS = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.5-3.2h-3.2V7.9c0-.9.4-1.6 1.7-1.6h1.6V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.3V13h2.6v8h3.6z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.2 1.6 3.7 3.8 3.9v2.9c-1.4 0-2.7-.4-3.8-1.2v6.2c0 3.1-2.5 5.6-5.6 5.6S5.3 19 5.3 15.9s2.5-5.6 5.6-5.6c.3 0 .6 0 .9.1v3c-.3-.1-.6-.2-.9-.2-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7V3h2.9z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 4l14 16M19 4L5 20"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.2v5.6l5-2.8z" fill="currentColor" stroke="none"/></svg>'
};
const SOCIAL_NAMES = { instagram: 'Instagram', facebook: 'Facebook', tiktok: 'TikTok', x: 'X', youtube: 'YouTube' };


/* ---------- build header (crisis ticker + logo + menu) ---------- */
function tickerGroup(hidden) {
  const msg = 'CedarBloom Wellness is not a crisis service. For emergencies call <strong>911</strong>. For mental health crisis support, call or text ' +
    (hidden ? '<strong>988</strong>' : '<a href="tel:988"><strong>988</strong></a>') + '.';
  return '<div class="tick-group"' + (hidden ? ' aria-hidden="true"' : '') + '>' +
    ('<span class="tick">' + msg + '</span>').repeat(3) + '</div>';
}

function navMarkup(id, label) {
  const here = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '') || 'index';
  const links = PAGES.map(([href, text]) =>
    '<a href="' + href + '" data-label="' + text.replace('&', '&amp;') + '"' + (href.replace('.html', '') === here ? ' class="active" aria-current="page"' : '') + '>' +
    text.replace('&', '&amp;') + '</a>').join('');
  return '<div class="nav">' +
    '<a class="brand" href="index.html"><img class="logo-img" width="1000" height="771" src="assets/logo-full.png" alt="CedarBloom Wellness, Psychiatrist &amp; Mental Health Care"></a>' +
    '<button class="menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="' + id + '">&#9776;</button>' +
    '<div class="nav-right" id="' + id + '">' +
      '<div class="nav-actions"><a class="cta plum" data-link="portal">Patient Portal</a><a class="cta" data-link="book">Book an Appointment</a></div>' +
      '<nav class="links" aria-label="' + label + '">' + links + '</nav>' +
    '</div></div>';
}

function buildHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;
  el.innerHTML =
    '<div class="ticker" role="region" tabindex="0" title="Click to pause or play" aria-label="Crisis information. Press Enter to pause or play."><div class="ticker-track">' +
      tickerGroup(false) + tickerGroup(true) + '</div></div>' +
    '<header class="site" id="hdrFull">' + navMarkup('navFull', 'Main') + '</header>' +
    '<header class="mini" id="hdrMini">' + navMarkup('navMini', 'Quick') + '</header>';
  try {
    let t0 = parseInt(sessionStorage.getItem('cb-tick'), 10);
    if (!t0) { t0 = Date.now(); sessionStorage.setItem('cb-tick', t0); }
    const secs = ((Date.now() - t0) / 1000) % 50;          // 50 = ticker speed in style.css
    document.querySelector('.ticker-track').style.animationDelay = '-' + secs.toFixed(2) + 's';
  } catch (e) {}
}

/* ---------- build footer ---------- */
function buildFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  const social = Object.keys(SOCIAL_NAMES).map(k =>
    '<a data-social="' + k + '" aria-label="' + SOCIAL_NAMES[k] + '">' + ICONS[k] + '</a>').join('');
  el.innerHTML =
    '<div class="sticky-book"><a class="cta" data-link="book">Book an Appointment</a></div>' +
    '<footer><div class="wrap">' +
      '<div class="cols">' +
        '<div><div style="margin-bottom:10px;"><a href="index.html">Home</a><a href="about.html">About</a><a href="services.html">Services</a><a href="new-patients.html">New Patients</a></div>' +
        '<div><a href="insurance.html">Insurance &amp; Fees</a><a href="telehealth.html">Telehealth</a><a href="faq.html">FAQ</a><a href="contact.html">Contact</a></div></div>' +
        '<div><a data-link="portal">Patient Portal</a><a href="privacy-practices.html">Notice of Privacy Practices</a><a href="privacy-policy.html">Privacy Policy</a><a href="terms.html">Terms of Use</a><a href="accessibility.html">Accessibility</a></div>' +
      '</div>' +
      '<div class="social"><span>Follow us</span>' + social + '</div>' +
      '<p class="legal">CedarBloom Wellness does not provide emergency or crisis services. For emergencies, call 911. For mental health crisis support, call or text 988.<br>&copy; CedarBloom Wellness ' + new Date().getFullYear() + '. All Rights Reserved.</p>' +
    '</div></footer>';
}

/* ---------- connect buttons and details to the SETTINGS above ---------- */
function isWeb(u) { return /^https?:/i.test(u); }
function wireSite() {
  const urls = { book: SITE.bookUrl, portal: SITE.portalUrl, pay: SITE.payUrl };
  document.querySelectorAll('[data-link]').forEach(a => {
    const k = a.dataset.link;
    if (k === 'email') { a.href = 'mailto:' + SITE.email; a.textContent = SITE.email; return; }
    if (k === 'phone') {
      const d = SITE.phone.replace(/[^\d+]/g, '');
      if (/\d{7,}/.test(d)) a.href = 'tel:' + d;
      a.textContent = SITE.phone; return;
    }
    if (k === 'directions') {
      a.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(SITE.mapQuery);
      a.target = '_blank'; a.rel = 'noopener'; return;
    }
    const url = urls[k];
    if (url) { a.setAttribute('href', url); if (isWeb(url)) { a.target = '_blank'; a.rel = 'noopener'; } }
    a.addEventListener('click', e => { if (a.getAttribute('href') === '#') e.preventDefault(); });
  });
  document.querySelectorAll('[data-site]').forEach(el => { const v = SITE[el.dataset.site]; if (v) el.textContent = v; });
  document.querySelectorAll('[data-social]').forEach(a => {
    const u = SITE.social[a.dataset.social] || '#';
    a.setAttribute('href', u);
    if (isWeb(u)) { a.target = '_blank'; a.rel = 'noopener'; }
    else a.addEventListener('click', e => e.preventDefault());
  });
  const frame = document.getElementById('mapFrame');
  if (frame) frame.src = 'https://maps.google.com/maps?q=' + encodeURIComponent(SITE.mapQuery) + '&output=embed';
}

/* ---------- menus + slim header (appears only after the full header has scrolled away) ---------- */
function setupHeader() {
  const full = document.getElementById('hdrFull');
  const mini = document.getElementById('hdrMini');
  const ticker = document.querySelector('.ticker');
  if (full && mini && ticker) {
    // Nothing here changes the page layout, so it can never cause a scroll loop.
    const update = () => mini.classList.toggle('show', full.getBoundingClientRect().bottom <= ticker.offsetHeight + 1);
    // Restore the scroll header without animating during page/history restoration.
    const restore = () => {
      mini.style.transition = 'none';
      update();
      requestAnimationFrame(() => requestAnimationFrame(() => mini.style.removeProperty('transition')));
    };
    window.addEventListener('pageshow', restore);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
  if (ticker) {
    const toggle = () => ticker.classList.toggle('paused');
    ticker.addEventListener('click', e => { if (!e.target.closest('a')) toggle(); });
    ticker.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  }
  document.querySelectorAll('.menu-btn').forEach(btn => {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      panel.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }));
  });
}

/* ---------- picture backgrounds: slideshow (2+ pictures) or single picture ---------- */
function setupSlides() {
  document.querySelectorAll('.bg-slides, .frame-slides').forEach(box => {
    const slides = Array.from(box.children);
    if (!slides.length) return;
    box.classList.add('ready');
    slides[0].classList.add('on');
    if (slides.length < 2) return;
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove('on');
      i = (i + 1) % slides.length;
      slides[i].classList.add('on');
    }, 6000);
  });
}

/* ---------- FAQ accordion ---------- */
function setupFaq() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  });
}

/* ---------- contact page: "Open now" badge and today's hours ---------- */
function setupHours() {
  const badge = document.getElementById('openBadge');
  if (!badge) return;
  const HOURS = { 1: [9, 19], 2: [9, 19], 3: [9, 19], 4: [9, 19], 5: [9, 19], 6: [10, 16] }; // 0 = Sunday
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const fmt = h => (h % 12 || 12) + ':00 ' + (h >= 12 ? 'PM' : 'AM');
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York', weekday: 'long', hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
  }).formatToParts(new Date());
  const get = t => parts.find(p => p.type === t).value;
  const day = DAYS.indexOf(get('weekday'));
  const mins = parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10);

  document.querySelectorAll('[data-day]').forEach(li => {
    if (li.dataset.day.split(',').includes(String(day))) li.classList.add('today');
  });

  const today = HOURS[day];
  if (today && mins >= today[0] * 60 && mins < today[1] * 60) {
    badge.textContent = 'Open now \u00B7 closes ' + fmt(today[1]);
    badge.classList.add('is-open');
    return;
  }
  let when = '';
  for (let i = 0; i < 8; i++) {
    const d = (day + i) % 7, h = HOURS[d];
    if (h && (i > 0 || mins < h[0] * 60)) {
      when = (i === 0 ? 'today' : i === 1 ? 'tomorrow' : DAYS[d]) + ' at ' + fmt(h[0]);
      break;
    }
  }
  badge.textContent = 'Closed now \u00B7 opens ' + when;
}

/* The header is built right away (this file is loaded at the top of every page),
   so the page never shows for a moment without it. The rest runs once the page is ready. */
buildHeader();
document.addEventListener('DOMContentLoaded', () => {
  buildFooter();
  wireSite();
  setupHeader();
  setupSlides();
  setupFaq();
  setupHours();
});
