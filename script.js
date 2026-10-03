/* ==========================================
   SERIM PRIVACY POLICY INTERACTIVE LOGIC
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  initThemeToggle();
  initScrollSpy();
  initSearch();
  initModal();
  initDataSimulator();
});

/* 1. Scroll Reading Progress Bar */
function initProgressBar() {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

/* 2. Dark / Light Theme Toggle */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('serim-theme') || 'dark';

  if (storedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
  }

  themeBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('serim-theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (!icon) return;
  if (theme === 'light') {
    icon.innerHTML = `<path fill="currentColor" d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-5.4-5.4c0-1.81 .89-3.42 2.26-4.4C12.92 3.04 12.46 3 12 3z"/>`;
  } else {
    icon.innerHTML = `<path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>`;
  }
}

/* 3. Sticky Table of Contents Active Link Highlight */
function initScrollSpy() {
  const sections = document.querySelectorAll('.policy-section');
  const navLinks = document.querySelectorAll('.toc-item a');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/* 4. Real-time Search Filter & Text Highlight */
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const sections = document.querySelectorAll('.policy-section');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    sections.forEach((section) => {
      const text = section.textContent.toLowerCase();
      if (query === '' || text.includes(query)) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  });
}

/* 5. Contact & Privacy Inquiry Modal */
function initModal() {
  const modal = document.getElementById('contactModal');
  const openBtns = document.querySelectorAll('[data-open-modal]');
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  const form = document.getElementById('privacyForm');

  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal?.classList.add('active');
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      modal?.classList.remove('active');
    });
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.textContent = 'Sending...';

    setTimeout(() => {
      alert('Thank you! Your privacy enquiry has been recorded locally. For live support, contact support@elbensoftware.com.');
      if (btn) btn.textContent = 'Submit Enquiry';
      form.reset();
      modal?.classList.remove('active');
    }, 800);
  });
}

/* 6. Data Settings Simulator Toast */
function initDataSimulator() {
  const clearHistoryToggle = document.getElementById('simHistoryClear');
  const deviceAliasToggle = document.getElementById('simAliasRandom');
  const statusLog = document.getElementById('simStatus');

  clearHistoryToggle?.addEventListener('change', (e) => {
    if (statusLog) {
      statusLog.textContent = e.target.checked
        ? '✓ Automatic 24-Hour Transfer Log Purging ENABLED'
        : '• Standard local history persistence active';
      statusLog.style.color = e.target.checked ? 'var(--accent-emerald)' : 'var(--text-secondary)';
    }
  });

  deviceAliasToggle?.addEventListener('change', (e) => {
    if (statusLog) {
      statusLog.textContent = e.target.checked
        ? '✓ Anonymous Device Hash ENABLED (Device model hidden during local scans)'
        : '• Device Alias shown during local network pairing';
      statusLog.style.color = e.target.checked ? 'var(--accent-cyan)' : 'var(--text-secondary)';
    }
  });
}

/* Helper function for Print */
function triggerPrint() {
  window.print();
}
