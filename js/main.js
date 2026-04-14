/* ============================================================
   KAVA CULTURE — Main JavaScript
   ============================================================ */

'use strict';

/* -------------------------------------------------------
   1. NAV — Hamburger + Overlay
------------------------------------------------------- */
function initNav() {
  const hamburger = document.querySelector('.hamburger');
  const overlay   = document.querySelector('.nav-overlay');
  const backdrop  = document.querySelector('.nav-overlay-backdrop');

  if (!hamburger) return;

  function toggleNav(open) {
    hamburger.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    backdrop.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleNav(!overlay.classList.contains('open')));
  backdrop.addEventListener('click', () => toggleNav(false));

  // Dropdown toggles
  document.querySelectorAll('.nav-dropdown-label').forEach(label => {
    label.addEventListener('click', () => {
      const sub = label.nextElementSibling;
      if (sub) sub.classList.toggle('open');
      const arrow = label.querySelector('.nav-arrow');
      if (arrow) arrow.textContent = sub.classList.contains('open') ? '▲' : '▾';
    });
  });
}

/* -------------------------------------------------------
   2. HERO SLIDER
------------------------------------------------------- */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.slider-dot');
  const prev   = document.querySelector('.slider-arrow-prev');
  const next   = document.querySelector('.slider-arrow-next');

  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function advance() { goTo(current + 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(advance, 5000);
  }

  goTo(0);
  startTimer();

  prev?.addEventListener('click', () => { goTo(current - 1); startTimer(); });
  next?.addEventListener('click', () => { goTo(current + 1); startTimer(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
  });
}

/* -------------------------------------------------------
   3. TYPEWRITER ANIMATION
------------------------------------------------------- */
function initTypewriter() {
  // The data-typewriter attr lives on the .typing-word span
  const elements = document.querySelectorAll('.typing-word[data-typewriter]');

  elements.forEach((el, idx) => {
    let words;
    try { words = JSON.parse(el.dataset.typewriter); } catch(e) { return; }
    const textEl = el.querySelector('.typing-word-text');
    if (!textEl || !words.length) return;

    // Stagger start so dual blocks don't look identical
    const startDelay = idx * 800;

    let wordIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function tick() {
      const word = words[wordIdx];

      if (!deleting) {
        charIdx++;
        textEl.textContent = word.slice(0, charIdx);
        if (charIdx === word.length) {
          setTimeout(() => { deleting = true; tick(); }, 1800);
          return;
        }
      } else {
        charIdx--;
        textEl.textContent = word.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
        }
      }

      setTimeout(tick, deleting ? 45 : 95);
    }

    setTimeout(tick, startDelay);
  });
}

/* -------------------------------------------------------
   4. MARQUEE — duplicate content for seamless loop
------------------------------------------------------- */
function initMarquee() {
  document.querySelectorAll('.marquee-inner').forEach(el => {
    el.innerHTML += el.innerHTML;
  });
}

/* -------------------------------------------------------
   5. SCROLL ANIMATIONS (fade-in on scroll)
------------------------------------------------------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

/* -------------------------------------------------------
   6. US MAP — highlight active states
------------------------------------------------------- */
function initUSMap() {
  const activeStates = ['FL', 'TX', 'OH', 'SC', 'PA', 'MI'];

  activeStates.forEach(state => {
    const el = document.querySelector(`.us-map [data-state="${state}"]`);
    if (el) el.classList.add('active-state');
  });
}

/* -------------------------------------------------------
   7. LOCATION SEARCH FILTER
------------------------------------------------------- */
function initLocationSearch() {
  const input = document.querySelector('.locator-search-input');
  if (!input) return;

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase();
    document.querySelectorAll('.location-card').forEach(card => {
      const name = card.querySelector('.location-name')?.textContent.toLowerCase() || '';
      const addr = card.querySelector('.location-address')?.textContent.toLowerCase() || '';
      card.style.display = (name.includes(query) || addr.includes(query)) ? '' : 'none';
    });
  });
}

/* -------------------------------------------------------
   8. CONTACT FORM — client-side validation
------------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector('.contact-form form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit-btn');
    btn.textContent = 'Sent! ✓';
    btn.style.background = '#4CAF50';
    btn.style.borderColor = '#4CAF50';
    setTimeout(() => {
      btn.textContent = 'Submit Form';
      btn.style.background = '';
      btn.style.borderColor = '';
      form.reset();
    }, 3000);
  });
}

/* -------------------------------------------------------
   9. FRANCHISE FORM — client-side validation
------------------------------------------------------- */
function initFranchiseForm() {
  const form = document.querySelector('.franchise-form-el');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Request Received!';
    btn.style.background = '#4CAF50';
    setTimeout(() => {
      btn.textContent = 'Submit';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

/* -------------------------------------------------------
   10. FOOTER EMAIL SIGNUP
------------------------------------------------------- */
function initEmailSignup() {
  document.querySelectorAll('.footer-email-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button');
      btn.textContent = 'Subscribed!';
      btn.style.background = '#4CAF50';
      setTimeout(() => {
        btn.textContent = 'Sign Up';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  });
}

/* -------------------------------------------------------
   11. ACTIVE NAV LINK highlight
------------------------------------------------------- */
function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-overlay a').forEach(a => {
    if (a.getAttribute('href') && path.endsWith(a.getAttribute('href').replace(/^\.\.\//, '').replace(/\/$/, '') || '/')) {
      a.style.color = 'var(--teal-link)';
    }
  });
}

/* -------------------------------------------------------
   INIT ALL
------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHeroSlider();
  initTypewriter();
  initMarquee();
  initScrollAnimations();
  initUSMap();
  initLocationSearch();
  initContactForm();
  initFranchiseForm();
  initEmailSignup();
  setActiveNavLink();
});

/* CSS for scroll animations (injected once) */
const style = document.createElement('style');
style.textContent = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .animate-on-scroll.visible {
    opacity: 1;
    transform: none;
  }
`;
document.head.appendChild(style);
