/* ============================================================
   Shared header + footer injection
   Include BEFORE core.js at bottom of <body>
   ============================================================ */
(function() {

const HEADER_HTML = `
<a href="#main-content" class="skip-link">Preskočiť na obsah</a>

<div id="alert-bar" class="alert-bar"
     data-alert-text="⚠ Upozornenie: V dôsledku búrky je program na Trojičnom námestí dočasne prerušený."
     hidden role="alert">
  <span class="alert-bar__text" id="alert-text"></span>
  <button class="alert-bar__close" id="alert-close" aria-label="Zatvoriť upozornenie">✕</button>
</div>

<header class="site-header" role="banner">
  <div class="header-row1">
    <div class="container">
      <a href="index.html" class="site-logo" aria-label="Trnavský jarmok – domov">
        <img src="assets/img/logo-jarmok-cele.png" alt="Trnavský jarmok" class="site-logo__img" style="height:48px;width:auto;display:block;">
      </a>
      <div class="header-date"><span aria-hidden="true">📅</span> 11.–14. septembra 2026</div>
      <div class="header-right">
        <div class="lang-switcher">
          <a href="index.html" lang="sk" aria-current="page">SK</a>
          <span aria-hidden="true">|</span>
          <a href="index-en.html" lang="en">EN</a>
        </div>
        <button class="hamburger" id="hamburger" aria-label="Otvoriť menu" aria-expanded="false" aria-controls="mobile-nav">
          <span class="hamburger__line"></span>
          <span class="hamburger__line"></span>
          <span class="hamburger__line"></span>
        </button>
      </div>
    </div>
  </div>
  <nav class="header-row2" aria-label="Hlavná navigácia">
    <div class="container">
      <ul class="main-nav" role="list">
        <li class="main-nav__item"><a href="novinky.html" class="main-nav__link">Novinky</a></li>
        <li class="main-nav__item" data-submenu="sub-podujatia">
          <a href="podujatia.html" class="main-nav__link" aria-haspopup="true">Podujatia <span class="main-nav__chevron" aria-hidden="true">▾</span></a>
        </li>
        <li class="main-nav__item"><a href="mapa.html" class="main-nav__link">Mapa</a></li>
        <li class="main-nav__item">
          <a href="prakticke-info.html" class="main-nav__link">Praktické info</a>
        </li>
        <li class="main-nav__item"><a href="partneri.html" class="main-nav__link">Partneri</a></li>
        <li class="main-nav__item"><a href="predajcovia.html" class="main-nav__link">Zóna predajcov</a></li>
        <li class="main-nav__item" style="margin-left:auto"><a href="program.html" class="main-nav__link main-nav__link--btn">Program</a></li>
      </ul>
    </div>
  </nav>
  <div class="header-row3" id="header-row3" aria-label="Podmenu">
    <div class="container">
      <ul id="sub-podujatia" class="submenu-bar" role="list" hidden>
        <li class="submenu-bar__item"><a href="podujatia-stredovek.html" class="submenu-bar__link">🏰 Stredovek pod hradbami</a></li>
        <li class="submenu-bar__item"><span class="submenu-bar__sep">|</span></li>
        <li class="submenu-bar__item"><a href="podujatia-veselica.html" class="submenu-bar__link">🎻 Ľudová veselica</a></li>
        <li class="submenu-bar__item"><span class="submenu-bar__sep">|</span></li>
        <li class="submenu-bar__item"><a href="podujatia-kolotoc.html" class="submenu-bar__link">🎡 Kolotoče</a></li>
        <li class="submenu-bar__item"><span class="submenu-bar__sep">|</span></li>
        <li class="submenu-bar__item"><a href="podujatia-rozpravka.html" class="submenu-bar__link">🧚 Rozprávkový svet</a></li>
        <li class="submenu-bar__item"><span class="submenu-bar__sep">|</span></li>
        <li class="submenu-bar__item"><a href="podujatia-trojicka.html" class="submenu-bar__link">🎤 Koncerty na Trojičke</a></li>
        <li class="submenu-bar__item"><span class="submenu-bar__sep">|</span></li>
        <li class="submenu-bar__item"><a href="podujatia-remesla.html" class="submenu-bar__link">🔨 Zaži remeslá</a></li>
      </ul>
    </div>
  </div>
</header>

<nav id="mobile-nav" class="mobile-nav" aria-label="Mobilná navigácia" aria-modal="true" role="dialog">
  <div class="mobile-nav__header">
    <a href="index.html" class="site-logo" aria-label="Trnavský jarmok – domov">
      <img src="assets/img/logo-jarmok-cele.png" alt="Trnavský jarmok" style="height:44px;width:auto;display:block;filter:brightness(10);">
    </a>
    <button class="mobile-nav__close" id="mobile-nav-close" aria-label="Zatvoriť menu">✕</button>
  </div>
  <ul class="mobile-nav__menu" role="list">
    <li class="mobile-nav__item"><a href="novinky.html" class="mobile-nav__link">Novinky</a></li>
    <li class="mobile-nav__item"><a href="program.html" class="mobile-nav__link mobile-nav__link--btn">Program</a></li>
    <li class="mobile-nav__item">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <a href="podujatia.html" class="mobile-nav__link" style="flex:1">Podujatia</a>
        <button class="mobile-nav__toggle" aria-label="Rozbaliť">▾</button>
      </div>
      <ul class="mobile-nav__sub" role="list">
        <li><a href="podujatia-stredovek.html" class="mobile-nav__sub-link">🏰 Stredovek pod hradbami</a></li>
        <li><a href="podujatia-veselica.html" class="mobile-nav__sub-link">🎻 Ľudová veselica</a></li>
        <li><a href="podujatia-kolotoc.html" class="mobile-nav__sub-link">🎡 Kolotoče</a></li>
        <li><a href="podujatia-rozpravka.html" class="mobile-nav__sub-link">🧚 Rozprávkový svet</a></li>
        <li><a href="podujatia-trojicka.html" class="mobile-nav__sub-link">🎤 Koncerty na Trojičke</a></li>
        <li><a href="podujatia-remesla.html" class="mobile-nav__sub-link">🔨 Zaži remeslá</a></li>
      </ul>
    </li>
    <li class="mobile-nav__item"><a href="mapa.html" class="mobile-nav__link">Mapa</a></li>
    <li class="mobile-nav__item"><a href="prakticke-info.html" class="mobile-nav__link">Praktické info</a></li>
    <li class="mobile-nav__item"><a href="partneri.html" class="mobile-nav__link">Partneri</a></li>
    <li class="mobile-nav__item"><a href="predajcovia.html" class="mobile-nav__link">Zóna predajcov</a></li>
  </ul>
  <div class="mobile-nav__footer">
    <div class="mobile-nav__date">📅 11.–14. septembra 2026, Trnava</div>
    <div class="mobile-nav__lang">
      <a href="index.html" lang="sk" aria-current="page">SK</a>
      <a href="index-en.html" lang="en">EN</a>
    </div>
  </div>
</nav>
`;

const FOOTER_HTML = `
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="footer-logo" aria-label="Trnavský jarmok – domov">
          <img src="assets/img/logo-jarmok-cele.png" alt="Trnavský jarmok" style="height:52px;width:auto;display:block;filter:brightness(10);">
        </a>
        <p class="footer-tagline">Tradičný mestský jarmok v Trnave.<br>11. – 14. septembra 2026.</p>
        <p class="footer-org">Organizátor: Mesto Trnava<br>Hlavná 1, 917 01 Trnava</p>
        <div class="footer-social">
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Instagram">📷</a>
          <a href="#" aria-label="YouTube">▶</a>
        </div>
      </div>
      <div>
        <h3 class="footer-col__title">Navigácia</h3>
        <nav class="footer-nav">
          <a href="novinky.html">Novinky</a>
          <a href="program.html">Program</a>
          <a href="podujatia.html">Jarmočné podujatia</a>
          <a href="mapa.html">Mapa</a>
          <a href="prakticke-info.html">Praktické info</a>
          <a href="partneri.html">Partneri</a>
          <a href="predajcovia.html">Zóna predajcov</a>
          <a href="press.html">Pre médiá</a>
        </nav>
      </div>
      <div>
        <h3 class="footer-col__title">Kontakt</h3>
        <address class="footer-contact" style="font-style:normal">
          <div class="footer-contact__item"><span class="footer-contact__icon">📧</span><a href="mailto:jarmok@trnava.sk">jarmok@trnava.sk</a></div>
          <div class="footer-contact__item"><span class="footer-contact__icon">📞</span><a href="tel:+421336001111">+421 33 600 1111</a></div>
          <div class="footer-contact__item"><span class="footer-contact__icon">📍</span><span>Hlavná 1, 917 01 Trnava</span></div>
        </address>
      </div>
      <div>
        <h3 class="footer-col__title">Partneri</h3>
        <div class="footer-partners-strip">
          <span class="footer-partner-logo">Trnava Region</span>
          <span class="footer-partner-logo">Trnavská voda</span>
          <span class="footer-partner-logo">Nadácia SPP</span>
          <span class="footer-partner-logo">Rádio EXPRES</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-bottom__copy">© 2026 Mesto Trnava. Všetky práva vyhradené.</span>
      <div class="footer-bottom__links">
        <a href="#">Ochrana súkromia</a>
        <a href="#">Cookies</a>
        <a href="press.html">Pre médiá</a>
      </div>
    </div>
  </div>
</footer>

<div id="cookie-banner" class="cookie-banner hidden" role="dialog" aria-label="Nastavenia cookies">
  <p class="cookie-banner__text">Táto stránka používa cookies. <a href="#">Zistiť viac</a></p>
  <div class="cookie-banner__actions">
    <button id="cookie-accept-all" class="btn btn--yellow btn--sm">Prijať všetky</button>
    <button id="cookie-settings" class="btn btn--ghost-white btn--sm">Nastavenia</button>
    <button id="cookie-close" class="btn btn--ghost-white btn--sm" aria-label="Zatvoriť">✕</button>
  </div>
</div>

<div id="lightbox" class="lightbox" hidden role="dialog" aria-label="Fotografia">
  <img id="lightbox-img" class="lightbox__img" src="" alt="">
  <button id="lightbox-close" class="lightbox__close" aria-label="Zatvoriť">✕</button>
</div>
`;

// Inject header at top and footer at bottom (scripts run after DOM is parsed when placed at bottom of body)
document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

})();
