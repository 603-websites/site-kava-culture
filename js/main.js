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

  // Close button inside overlay
  const closeBtn = document.createElement('button');
  closeBtn.className = 'nav-overlay-close';
  closeBtn.setAttribute('aria-label', 'Close menu');
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', () => toggleNav(false));
  overlay.insertBefore(closeBtn, overlay.firstChild);

  // Close overlay when a nav link is tapped
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleNav(false));
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
   3. SCROLL ANIMATIONS (fade-in on scroll)
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

      // Honeypot spam protection
      const honeypot = form.querySelector('input[name="website_url"]');
      if (honeypot && honeypot.value) return;

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
            btn.style.background = '#E8E8E8';
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
  const currentPath = window.location.pathname.replace(/\/(index\.html)?$/, '') || '/';
  document.querySelectorAll('.nav-overlay a, .desktop-nav a:not(.nav-cta):not(.nav-subscribe)').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href === '#' || href.includes('#')) return;
    const linkPath = new URL(href, window.location.href).pathname.replace(/\/(index\.html)?$/, '') || '/';
    if (linkPath === currentPath) {
      a.classList.add('active');
    }
  });
}

/* -------------------------------------------------------
   8. NEWSLETTER FLOATING CTA — carousel text
------------------------------------------------------- */
function initNewsletterFloat() {
  try { if (sessionStorage.getItem('spot_nl_dismissed')) return; } catch(e) {}
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

  var closeBtn = document.createElement('span');
  closeBtn.className = 'newsletter-float-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = 'cursor:pointer;font-size:18px;padding:0 8px;opacity:0.7;';
  closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    bar.style.display = 'none';
    try { sessionStorage.setItem('spot_nl_dismissed', '1'); } catch(e) {}
  });
  bar.querySelector('.newsletter-float-inner').appendChild(closeBtn);

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
   9. REVIEW CAROUSEL (Maps + Reviews combined section)
------------------------------------------------------- */
function initReviewCarousel() {
  var viewport = document.querySelector('.review-carousel-viewport');
  var track = document.querySelector('.review-carousel-track');
  var cards = document.querySelectorAll('.review-card');
  var dotsContainer = document.querySelector('.review-dots');

  var prevBtn = document.querySelector('.review-nav-prev') || document.querySelector('.review-arrow-prev');
  var nextBtn = document.querySelector('.review-nav-next') || document.querySelector('.review-arrow-next');

  if (!track || !cards.length || !viewport) return;

  var currentIndex = 0;
  var autoTimer = null;

  var isGridLayout = !!document.querySelector('.maps-reviews-grid');

  function getCardsPerView() {
    if (isGridLayout) return 1;
    var w = window.innerWidth;
    if (w <= 600) return 1;
    if (w <= 900) return 2;
    return 3;
  }

  function getMaxIndex() {
    var perView = getCardsPerView();
    return Math.max(0, cards.length - perView);
  }

  function updateTrack() {
    var perView = getCardsPerView();
    var cardWidthPercent = 100 / perView;

    for (var i = 0; i < cards.length; i++) {
      cards[i].style.flex = '0 0 ' + cardWidthPercent + '%';
    }

    var offset = -(currentIndex * cardWidthPercent);
    track.style.transform = 'translateX(' + offset + '%)';

    updateDots();
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    var maxIdx = getMaxIndex();
    var totalDots = maxIdx + 1;

    for (var i = 0; i < totalDots; i++) {
      var dot = document.createElement('button');
      dot.className = 'review-dot' + (i === currentIndex ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to review ' + (i + 1));
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
    var dots = dotsContainer.querySelectorAll('.review-dot');
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === currentIndex);
    }
  }

  function goTo(idx) {
    var maxIdx = getMaxIndex();
    currentIndex = Math.max(0, Math.min(idx, maxIdx));
    updateTrack();
  }

  function advance() {
    var maxIdx = getMaxIndex();
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

  // Arrow button events
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
  var carouselColumn = document.querySelector('.review-carousel-column');
  var wrap = carouselColumn || document.querySelector('.review-carousel-wrap');
  if (wrap) {
    wrap.addEventListener('mouseenter', stopAuto);
    wrap.addEventListener('mouseleave', startAuto);
  }

  // Keyboard navigation
  if (carouselColumn) {
    carouselColumn.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(currentIndex - 1);
        restartAuto();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(currentIndex + 1);
        restartAuto();
      }
    });
  }

  // Handle resize
  var resizeTimeout;
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

  // Pause auto-advance when tab is hidden
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      stopAuto();
    } else {
      startAuto();
    }
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
   11. GENERIC FORM HANDLER — replaces inline form scripts
------------------------------------------------------- */
function initGenericForms() {
  const API_BASE = 'https://websiteupgraderpro.com';
  const CLIENT_ID = 'd7a73501-80d7-4708-a92d-02a3aedc9836';

  document.querySelectorAll('[data-form-handler]').forEach(form => {
    let config;
    try { config = JSON.parse(form.dataset.formHandler); } catch(e) { return; }
    const apiPath = config.apiPath;
    const successElId = config.successEl;
    const errorElId = config.errorEl;
    const formWrapId = config.formWrap;
    const submitBtn = form.querySelector('button[type="submit"]');
    const errorEl = errorElId ? document.getElementById(errorElId) : null;
    const successEl = successElId ? document.getElementById(successElId) : null;
    const formWrap = formWrapId ? document.getElementById(formWrapId) : null;

    if (!submitBtn) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Honeypot spam protection
      const honeypot = form.querySelector('input[name="website_url"]');
      if (honeypot && honeypot.value) return;
      if (errorEl) errorEl.style.display = 'none';

      // Collect all form inputs into payload
      const payload = { clientId: CLIENT_ID };
      const inputs = form.querySelectorAll('input, select, textarea');
      let valid = true;

      inputs.forEach(input => {
        if (!input.name) return;
        const val = input.value.trim();
        if (input.required && !val) {
          valid = false;
        }
        // Basic email validation
        if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          valid = false;
        }
        payload[input.name] = val;
      });

      if (!valid) {
        if (errorEl) {
          errorEl.textContent = 'Please fill in all required fields with valid information.';
          errorEl.style.display = 'block';
        }
        return;
      }

      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = config.loadingText || 'Sending...';

      fetch(API_BASE + apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      .then(res => {
        if (res.ok) {
          if (formWrap) formWrap.style.display = 'none';
          if (successEl) successEl.style.display = 'block';
          form.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        } else {
          throw new Error('Request failed');
        }
      })
      .catch(() => {
        if (errorEl) {
          errorEl.textContent = config.errorMessage || 'Something went wrong. Please try again.';
          errorEl.style.display = 'block';
        }
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
    });
  });
}

/* -------------------------------------------------------
   12. BOOKING ANALYTICS — track form submission event
------------------------------------------------------- */
function initBookingAnalytics() {
  var wrap = document.getElementById('booking-form-wrap');
  if (!wrap) return;
  var CLIENT_ID = 'd7a73501-80d7-4708-a92d-02a3aedc9836';
  var API_BASE = 'https://websiteupgraderpro.com';
  function getSessionId() {
    var key = 'spot_sid';
    var sid = sessionStorage.getItem(key);
    if (!sid) { sid = Math.random().toString(36).slice(2) + Date.now().toString(36); sessionStorage.setItem(key, sid); }
    return sid;
  }
  new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if (m.attributeName === 'style' && wrap.style.display === 'none') {
        try {
          fetch(API_BASE + '/api/analytics/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clientId: CLIENT_ID, sessionId: getSessionId(),
              eventType: 'form_submission', eventName: 'Booking Request',
              properties: { path: location.pathname, formName: 'booking_request' }
            }),
            keepalive: true
          }).catch(function() {});
        } catch (e) {}
      }
    });
  }).observe(wrap, { attributes: true });
}

/* -------------------------------------------------------
   13. NEWSLETTER POPUP — slide-in from bottom after delay
------------------------------------------------------- */
function initNewsletterPopup() {
  var API_BASE = 'https://websiteupgraderpro.com';
  var CLIENT_ID = 'd7a73501-80d7-4708-a92d-02a3aedc9836';

  // Only show once per visit (sessionStorage)
  try { if (sessionStorage.getItem('spot_nl_popup_shown')) return; } catch(e) {}

  // Create overlay
  var overlay = document.createElement('div');
  overlay.className = 'nl-popup-overlay';

  // Create popup
  var popup = document.createElement('div');
  popup.className = 'nl-popup';
  popup.innerHTML =
    '<button class="nl-popup-close" aria-label="Close">&times;</button>' +
    '<h3>Stay in the Loop</h3>' +
    '<p>Subscribe to know when the next live performance drops and when new kava &amp; mocktail flavors are released.</p>' +
    '<form class="nl-popup-form">' +
      '<input type="email" placeholder="Your email address" required maxlength="255" aria-label="Email address"/>' +
      '<div style="position:absolute;left:-9999px;" aria-hidden="true"><input type="text" name="website_url" tabindex="-1" autocomplete="off"/></div>' +
      '<button type="submit">Subscribe</button>' +
    '</form>';

  document.body.appendChild(overlay);
  document.body.appendChild(popup);

  function closePopup() {
    popup.classList.remove('visible');
    overlay.classList.remove('visible');
    try { sessionStorage.setItem('spot_nl_popup_shown', '1'); } catch(e) {}
    setTimeout(function() {
      if (popup.parentNode) popup.parentNode.removeChild(popup);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 500);
  }

  // Close on X button
  popup.querySelector('.nl-popup-close').addEventListener('click', closePopup);

  // Close on overlay click
  overlay.addEventListener('click', closePopup);

  // Handle form submission
  var form = popup.querySelector('.nl-popup-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var honeypot = form.querySelector('input[name="website_url"]');
    if (honeypot && honeypot.value) return;
    var emailInput = form.querySelector('input[type="email"]');
    var email = emailInput ? emailInput.value.trim() : '';
    var btn = form.querySelector('button[type="submit"]');
    if (!email || !btn) return;

    btn.textContent = 'Subscribing...';
    btn.disabled = true;

    fetch(API_BASE + '/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId: CLIENT_ID, email: email, source: 'popup' })
    })
    .then(function(res) {
      if (res.ok || res.status === 409) {
        popup.querySelector('h3').textContent = 'You\'re In!';
        popup.querySelector('p').textContent = res.status === 409
          ? 'You\'re already subscribed. We\'ll keep you posted!'
          : 'Thanks for subscribing! We\'ll keep you posted on shows and new flavors.';
        form.style.display = 'none';
        setTimeout(closePopup, 2500);
      } else {
        btn.textContent = 'Try Again';
        btn.disabled = false;
      }
    })
    .catch(function() {
      btn.textContent = 'Try Again';
      btn.disabled = false;
    });
  });

  // Show popup after 12 seconds
  setTimeout(function() {
    popup.classList.add('visible');
    overlay.classList.add('visible');
  }, 12000);
}

/* -------------------------------------------------------
   14. NAV SUBSCRIBE BUTTON — scrolls to footer signup
------------------------------------------------------- */
function initNavSubscribe() {
  document.querySelectorAll('.nav-subscribe').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var signup = document.querySelector('.footer-signup');
      if (signup) {
        signup.scrollIntoView({ behavior: 'smooth', block: 'center' });
        var input = signup.querySelector('input[type="email"]');
        if (input) setTimeout(function() { input.focus(); }, 600);
      }
    });
  });
}

/* -------------------------------------------------------
   INIT ALL
------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-loaded');

  initNav();
  initHeroSlider();
  initScrollAnimations();
  initEmailSignup();
  setActiveNavLink();
  initNewsletterFloat();
  initNewsletterPopup();
  initNavSubscribe();
  initReviewCarousel();
  initGenericForms();
  initBookingAnalytics();
  if (typeof initDynamicCalendar === 'function') initDynamicCalendar();
  updateCopyrightYear();
});
