/* ============================================================
   THE SPOT NASHUA — Main JavaScript
   ============================================================ */

'use strict';

/* -------------------------------------------------------
   1. NAV — Hamburger + Overlay
------------------------------------------------------- */
function initNav() {
  const hamburger = document.querySelector('.hamburger');
  const overlay   = document.querySelector('.nav-overlay');
  const backdrop  = document.querySelector('.nav-overlay-backdrop');

  if (!hamburger || !overlay || !backdrop) return;

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
      if (arrow) arrow.textContent = sub.classList.contains('open') ? '\u25B2' : '\u25BE';
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
   6. FOOTER EMAIL SIGNUP — calls backend API
------------------------------------------------------- */
function initEmailSignup() {
  const API_BASE  = 'https://websiteupgraderpro.com';
  const CLIENT_ID = 'd7a73501-80d7-4708-a92d-02a3aedc9836';

  document.querySelectorAll('.footer-email-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput?.value?.trim();

      if (!email || !btn) return;

      btn.textContent = 'Signing up...';
      btn.disabled = true;

      fetch(API_BASE + '/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: CLIENT_ID, email: email, source: 'footer' }),
      })
        .then(res => {
          if (res.ok) {
            btn.textContent = 'Subscribed!';
            btn.style.background = '#4CAF50';
            form.reset();
          } else if (res.status === 409) {
            btn.textContent = 'Already subscribed!';
            btn.style.background = '#42AFB9';
            form.reset();
          } else {
            btn.textContent = 'Try Again';
            btn.style.background = '#f44336';
          }
        })
        .catch(() => {
          btn.textContent = 'Try Again';
          btn.style.background = '#f44336';
        })
        .finally(() => {
          setTimeout(() => {
            btn.textContent = 'Sign Up';
            btn.style.background = '';
            btn.disabled = false;
          }, 3000);
        });
    });
  });
}

/* -------------------------------------------------------
   7. ACTIVE NAV LINK highlight (mobile + desktop)
------------------------------------------------------- */
function setActiveNavLink() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-overlay a, .desktop-nav a:not(.nav-cta)').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const linkPath = new URL(href, window.location.origin).pathname.replace(/\/$/, '') || '/';
    if (linkPath === currentPath) {
      a.classList.add('active');
      a.style.color = 'var(--teal-link)';
    }
  });
}

/* -------------------------------------------------------
   8. NEWSLETTER FLOATING CTA — carousel text
------------------------------------------------------- */
function initNewsletterFloat() {
  const messages = ['Subscribe to our Newsletter', 'Live Music Events'];
  let idx = 0;

  const bar = document.createElement('div');
  bar.className = 'newsletter-float';
  bar.setAttribute('role', 'button');
  bar.setAttribute('aria-label', 'Subscribe to newsletter');

  bar.innerHTML =
    '<div class="newsletter-float-inner">' +
      '<svg class="newsletter-float-icon" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>' +
      '<div class="newsletter-float-text"><span>' + messages[0] + '</span></div>' +
      '<span class="newsletter-float-arrow">\u2191</span>' +
    '</div>';

  document.body.appendChild(bar);

  bar.addEventListener('click', function() {
    const signup = document.querySelector('.footer-signup');
    if (signup) {
      signup.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = signup.querySelector('input[type="email"]');
      if (input) setTimeout(function() { input.focus(); }, 600);
    }
  });

  function cycleText() {
    const textEl = bar.querySelector('.newsletter-float-text span');
    if (!textEl) return;
    textEl.classList.add('slide-up');
    setTimeout(function() {
      idx = (idx + 1) % messages.length;
      textEl.textContent = messages[idx];
      textEl.classList.remove('slide-up');
      textEl.classList.add('slide-down');
      // Force reflow then remove slide-down to trigger transition
      void textEl.offsetWidth;
      textEl.classList.remove('slide-down');
    }, 500);
  }

  let cycleTimer = setInterval(cycleText, 3500);

  document.addEventListener('visibilitychange', function() {
    // Pause newsletter text cycling when tab is hidden
    if (document.hidden) {
      clearInterval(cycleTimer);
      cycleTimer = null;
    } else {
      if (!cycleTimer) {
        cycleTimer = setInterval(cycleText, 3500);
      }
    }
  });
}

/* -------------------------------------------------------
   9. REVIEW CAROUSEL
------------------------------------------------------- */
function initReviewCarousel() {
  const viewport = document.querySelector('.review-carousel-viewport');
  const track = document.querySelector('.review-carousel-track');
  const cards = document.querySelectorAll('.review-card');
  const prevBtn = document.querySelector('.review-arrow-prev');
  const nextBtn = document.querySelector('.review-arrow-next');
  const dotsContainer = document.querySelector('.review-dots');

  if (!track || !cards.length || !viewport) return;

  let currentIndex = 0;
  let autoTimer = null;

  function getCardsPerView() {
    const w = window.innerWidth;
    if (w <= 600) return 1;
    if (w <= 900) return 2;
    return 3;
  }

  function getMaxIndex() {
    const perView = getCardsPerView();
    return Math.max(0, cards.length - perView);
  }

  function updateTrack() {
    const perView = getCardsPerView();
    const cardWidthPercent = 100 / perView;

    for (let i = 0; i < cards.length; i++) {
      cards[i].style.flex = '0 0 ' + cardWidthPercent + '%';
    }

    const offset = -(currentIndex * cardWidthPercent);
    track.style.transform = 'translateX(' + offset + '%)';

    updateDots();
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const maxIdx = getMaxIndex();
    const perView = getCardsPerView();
    const totalDots = maxIdx + 1;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = 'review-dot' + (i === currentIndex ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to review group ' + (i + 1));
      dot.dataset.index = i;
      dot.addEventListener('click', function() {
        goTo(parseInt(this.dataset.index));
        restartAuto();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.review-dot');
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === currentIndex);
    }
  }

  function goTo(idx) {
    const maxIdx = getMaxIndex();
    currentIndex = Math.max(0, Math.min(idx, maxIdx));
    updateTrack();
  }

  function advance() {
    const maxIdx = getMaxIndex();
    if (currentIndex >= maxIdx) {
      goTo(0);
    } else {
      goTo(currentIndex + 1);
    }
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(advance, 5000);
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function restartAuto() {
    stopAuto();
    startAuto();
  }

  // Arrow events
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      goTo(currentIndex - 1);
      restartAuto();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      goTo(currentIndex + 1);
      restartAuto();
    });
  }

  // Pause on hover
  const wrap = document.querySelector('.review-carousel-wrap');
  if (wrap) {
    wrap.addEventListener('mouseenter', stopAuto);
    wrap.addEventListener('mouseleave', startAuto);
  }

  // Handle resize
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      if (currentIndex > getMaxIndex()) {
        currentIndex = getMaxIndex();
      }
      buildDots();
      updateTrack();
    }, 150);
  });

  // Init
  buildDots();
  updateTrack();
  startAuto();
}

/* -------------------------------------------------------
   10. DYNAMIC COPYRIGHT YEAR
------------------------------------------------------- */
function updateCopyrightYear() {
  document.querySelectorAll('.footer-copyright').forEach(el => {
    el.innerHTML = el.innerHTML.replace(/2024–\d{2}/, '2024–' + new Date().getFullYear().toString().slice(2));
  });
}

/* -------------------------------------------------------
   INIT ALL
------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-loaded');

  initNav();
  initHeroSlider();
  initTypewriter();
  initMarquee();
  initScrollAnimations();
  initEmailSignup();
  setActiveNavLink();
  initNewsletterFloat();
  initReviewCarousel();
  updateCopyrightYear();
});
