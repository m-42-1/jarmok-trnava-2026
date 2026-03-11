/* ============================================================
   PROGRAM.JS – Day filter, Category multi-select, Search, Timeline
   ============================================================ */

(function () {
  'use strict';

  const state = {
    day: 'all',
    categories: new Set(['trojicka', 'stredovek', 'veselica', 'rozpravka']),
    search: ''
  };

  // Elements
  const dayTabs     = document.querySelectorAll('.filter-tab[data-day]');
  const catPills    = document.querySelectorAll('.filter-pill[data-cat]');
  const searchInput = document.getElementById('program-search');
  const clearBtn    = document.getElementById('search-clear');
  const counter     = document.getElementById('filter-counter');
  const items       = document.querySelectorAll('.program-item');
  const dayHeadings = document.querySelectorAll('.program-day');

  if (!items.length) return;

  /* ---- Apply filters ---- */
  function applyFilters() {
    let visible = 0;

    items.forEach(item => {
      const dayMatch = state.day === 'all' || item.dataset.day === state.day;
      // If no categories selected → show all; otherwise match set
      const catMatch = state.categories.size === 0 || state.categories.has(item.dataset.category);
      const searchMatch = state.search === '' ||
        item.textContent.toLowerCase().includes(state.search.toLowerCase());

      const show = dayMatch && catMatch && searchMatch;
      item.hidden = !show;
      if (show) visible++;
    });

    // Hide day headings if all their items are hidden
    dayHeadings.forEach(dayEl => {
      if (!dayEl.querySelector('.program-item')) return;
      const visibleInDay = dayEl.querySelectorAll('.program-item:not([hidden])').length;
      dayEl.style.display = visibleInDay === 0 ? 'none' : '';
    });

    // Update counter
    if (counter) {
      counter.textContent = `Zobrazuje sa ${visible} podujat${visible === 1 ? 'ie' : (visible >= 2 && visible <= 4 ? 'ia' : 'í')}`;
    }
  }

  /* ---- Day tabs ---- */
  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dayTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.day = tab.dataset.day;
      applyFilters();
    });
  });

  /* ---- Category pills – multi-select toggle ---- */
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cat = pill.dataset.cat;
      if (state.categories.has(cat)) {
        // Prevent deactivating the last category (keep at least 1)
        if (state.categories.size > 1) {
          state.categories.delete(cat);
          pill.classList.remove('active');
        }
      } else {
        state.categories.add(cat);
        pill.classList.add('active');
      }
      applyFilters();
    });
  });

  /* ---- Search ---- */
  let searchTimeout;
  searchInput && searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      state.search = searchInput.value.trim();
      const clearBtn_ = document.getElementById('search-clear');
      if (clearBtn_) clearBtn_.classList.toggle('visible', state.search.length > 0);
      applyFilters();
    }, 200);
  });

  clearBtn && clearBtn.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    state.search = '';
    clearBtn.classList.remove('visible');
    searchInput && searchInput.focus();
    applyFilters();
  });

  // Initial count
  applyFilters();

})();
