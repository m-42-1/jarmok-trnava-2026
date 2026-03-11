/* ============================================================
   CORE.JS – Header, Mobile Nav, Cookie, Alert, Accordions,
             Gallery Lightbox, Scroll animations
   ============================================================ */

(function () {
  'use strict';

  /* ---- Mobile Navigation ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-nav-close');

  function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger && hamburger.classList.add('open');
    hamburger && hamburger.setAttribute('aria-expanded', 'true');
    mobileClose && mobileClose.focus();
  }
  function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    hamburger && hamburger.classList.remove('open');
    hamburger && hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger && hamburger.addEventListener('click', openMobileNav);
  mobileClose && mobileClose.addEventListener('click', closeMobileNav);

  // Close on backdrop click
  mobileNav && mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeMobileNav();
  });

  // ESC key closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
  });

  // Mobile sub-menu toggles
  document.querySelectorAll('.mobile-nav__toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const item = toggle.closest('.mobile-nav__item');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.mobile-nav__item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---- Desktop Submenu Row 3 ---- */
  const row3 = document.getElementById('header-row3');
  const submenus = document.querySelectorAll('.submenu-bar');
  let activeSubItem = null;

  document.querySelectorAll('.main-nav__item[data-submenu]').forEach(item => {
    const subId = item.dataset.submenu;
    const link = item.querySelector('.main-nav__link');

    link && link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSub = document.getElementById(subId);
      if (!targetSub) return;

      if (activeSubItem === subId && row3.classList.contains('visible')) {
        // Toggle off
        row3.classList.remove('visible');
        item.classList.remove('open');
        activeSubItem = null;
      } else {
        // Show this submenu
        submenus.forEach(s => s.hidden = true);
        targetSub.hidden = false;
        row3.classList.add('visible');
        document.querySelectorAll('.main-nav__item').forEach(i => i.classList.remove('open'));
        item.classList.add('open');
        activeSubItem = subId;
      }
    });
  });

  // Click outside header closes submenu
  document.addEventListener('click', (e) => {
    const header = document.querySelector('.site-header');
    if (header && !header.contains(e.target)) {
      row3 && row3.classList.remove('visible');
      document.querySelectorAll('.main-nav__item').forEach(i => i.classList.remove('open'));
      activeSubItem = null;
    }
  });

  // Mark active nav item based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav__link, .footer-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || href === './' + currentPath)) {
      link.classList.add('active');
    }
  });

  /* ---- Alert Bar ---- */
  const alertBar = document.getElementById('alert-bar');
  const alertClose = document.getElementById('alert-close');
  const alertText = document.getElementById('alert-text');

  if (alertBar) {
    const dismissed = localStorage.getItem('alert-dismissed');
    const alertMsg = alertBar.dataset.alertText;
    const alertActive = alertBar.dataset.alertActive;

    if (alertActive && !dismissed) {
      if (alertText && alertMsg) alertText.textContent = alertMsg;
      alertBar.removeAttribute('hidden');
    }

    alertClose && alertClose.addEventListener('click', () => {
      alertBar.setAttribute('hidden', '');
      localStorage.setItem('alert-dismissed', Date.now());
    });
  }

  /* ---- Cookie Banner ---- */
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner && !localStorage.getItem('cookies-decision')) {
    cookieBanner.classList.remove('hidden');
  }

  const btnAcceptAll = document.getElementById('cookie-accept-all');
  const btnCookieClose = document.getElementById('cookie-close');
  const btnCookieSettings = document.getElementById('cookie-settings');

  function dismissCookieBanner(decision) {
    localStorage.setItem('cookies-decision', decision);
    cookieBanner && cookieBanner.classList.add('hidden');
  }
  btnAcceptAll && btnAcceptAll.addEventListener('click', () => dismissCookieBanner('all'));
  btnCookieClose && btnCookieClose.addEventListener('click', () => dismissCookieBanner('necessary'));
  btnCookieSettings && btnCookieSettings.addEventListener('click', () => {
    // In prototype: just accept and close
    dismissCookieBanner('all');
  });

  /* ---- Accordions (generic) ---- */
  document.querySelectorAll('[data-accordion]').forEach(container => {
    container.querySelectorAll('[data-accordion-trigger]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        // Close all in group
        container.querySelectorAll('[data-accordion-trigger]').forEach(t => {
          t.setAttribute('aria-expanded', 'false');
        });
        // Open clicked if was closed
        if (!isOpen) trigger.setAttribute('aria-expanded', 'true');
      });
    });
  });

  /* ---- Partner Logo Accordion ---- */
  document.querySelectorAll('.partner-logo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      const info = btn.nextElementSibling;

      // Close all
      document.querySelectorAll('.partner-logo-btn').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const bi = b.nextElementSibling;
        if (bi) bi.classList.remove('open');
      });

      // Open if was closed
      if (!isOpen && info) {
        btn.setAttribute('aria-expanded', 'true');
        info.classList.add('open');
      }
    });
  });

  /* ---- Program item expand ---- */
  document.querySelectorAll('.program-item__title').forEach(title => {
    title.addEventListener('click', () => {
      const item = title.closest('.program-item');
      item.classList.toggle('open');
    });
  });

  /* ---- Gallery Lightbox ---- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.mini-gallery__item').forEach(item => {
    item.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      const img = item.querySelector('img');
      lightboxImg.src = img.src.replace('/400/400', '/900/600');
      lightboxImg.alt = img.alt;
      lightbox.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox && lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }
  lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
  lightbox && lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ---- Scroll-based fade-in animations ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* ---- Push Notifications ---- */
  const pushBtn = document.getElementById('push-btn');
  if (pushBtn) {
    const stored = localStorage.getItem('push-subscribed');
    if (stored) {
      pushBtn.textContent = '🔔 Notifikácie zapnuté';
      pushBtn.classList.add('subscribed');
      pushBtn.disabled = true;
    }

    pushBtn.addEventListener('click', async () => {
      if (!('Notification' in window)) {
        alert('Váš prehliadač nepodporuje push notifikácie.');
        return;
      }
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          localStorage.setItem('push-subscribed', '1');
          pushBtn.textContent = '🔔 Notifikácie zapnuté';
          pushBtn.classList.add('subscribed');
          pushBtn.disabled = true;
          // Demo notification
          new Notification('Trnavský jarmok 2026', {
            body: 'Dostávate novinky zo Jarmoku! Teraz: Stredoveký sprievod o 19:30 zo Sadu Bernolaka.',
            icon: 'assets/img/icon-192.png'
          });
          // Update badge
          updatePushBadge(0);
        } else {
          alert('Notifikácie neboli povolené. Skúste nastavenia prehliadača.');
        }
      } catch (err) {
        console.warn('Push notification error:', err);
      }
    });
  }

  function updatePushBadge(count) {
    const badge = document.getElementById('push-badge');
    if (!badge) return;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  // Calculate unread flešky since last visit
  const lastVisit = parseInt(localStorage.getItem('last-visit') || '0');
  const newFlashy = document.querySelectorAll('.flash-card[data-ts]');
  let unreadCount = 0;
  newFlashy.forEach(card => {
    const ts = parseInt(card.dataset.ts || '0');
    if (ts > lastVisit) unreadCount++;
  });
  updatePushBadge(unreadCount);
  localStorage.setItem('last-visit', Date.now());

  /* ---- Countdown Timer (maintenance page) ---- */
  const countdown = document.getElementById('countdown');
  if (countdown) {
    const target = new Date('2026-09-11T10:00:00').getTime();
    function updateCountdown() {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        countdown.innerHTML = '<span style="color:var(--yellow);font-size:1.5em">Jarmok práve prebieha! 🎉</span>';
        return;
      }
      const days    = Math.floor(diff / 86400000);
      const hours   = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      countdown.innerHTML = `
        <div class="countdown__unit"><span class="countdown__value">${String(days).padStart(2,'0')}</span><span class="countdown__label">dní</span></div>
        <div class="countdown__unit"><span class="countdown__value">${String(hours).padStart(2,'0')}</span><span class="countdown__label">hodín</span></div>
        <div class="countdown__unit"><span class="countdown__value">${String(minutes).padStart(2,'0')}</span><span class="countdown__label">minút</span></div>
        <div class="countdown__unit"><span class="countdown__value">${String(seconds).padStart(2,'0')}</span><span class="countdown__label">sekúnd</span></div>
      `;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ---- Today highlights: auto-detect day ---- */
  const todaySection = document.getElementById('today-highlights');
  if (todaySection) {
    // Fair days: Sep 11-14 2026, Thu=4, Fri=5, Sat=6, Sun=0
    const fairStart = new Date('2026-09-11');
    const fairEnd   = new Date('2026-09-14');
    const now = new Date();
    const inFair = now >= fairStart && now <= fairEnd;
    const dayMap = {
      4: 'stvrtok', 5: 'piatok', 6: 'sobota', 0: 'nedela'
    };
    const currentDay = inFair ? dayMap[now.getDay()] : null;

    document.querySelectorAll('.today-highlight-set').forEach(set => {
      set.hidden = (set.dataset.day !== currentDay);
    });

    // If no match (outside fair), show fallback
    if (!currentDay) {
      const fallback = document.getElementById('today-fallback');
      fallback && (fallback.hidden = false);
      document.querySelectorAll('.today-highlight-set').forEach(s => s.hidden = true);
    }
  }

})();
