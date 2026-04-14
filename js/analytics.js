/**
 * The Spot — Analytics & Lead Tracking
 * Sends page views, newsletter signups, and contact form submissions
 * to the websiteupgraderpro.com dev dashboard via Supabase backend.
 */
(function () {
  var CLIENT_ID = 'd7a73501-80d7-4708-a92d-02a3aedc9836';
  var API_BASE  = 'https://websiteupgraderpro.com';

  // --- Session ID (persists for browser tab lifetime) ---
  function getSessionId() {
    var key = 'spot_sid';
    var sid = sessionStorage.getItem(key);
    if (!sid) {
      sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(key, sid);
    }
    return sid;
  }

  // --- Fire-and-forget POST helper ---
  function post(path, payload) {
    try {
      fetch(API_BASE + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(function () {});
    } catch (e) {}
  }

  // --- Page view ---
  function trackPageView() {
    post('/api/analytics/events', {
      clientId:   CLIENT_ID,
      sessionId:  getSessionId(),
      eventType:  'page_view',
      eventName:  document.title || 'Page View',
      properties: {
        path:     location.pathname,
        referrer: document.referrer || null,
        title:    document.title,
      },
      userAgent: navigator.userAgent,
    });
  }

  // --- Newsletter signup (footer form) ---
  function trackSubscribe(email, source) {
    // Save to newsletter_subscribers table
    post('/api/newsletter/subscribe', {
      clientId: CLIENT_ID,
      email:    email,
      source:   source || 'footer',
    });
    // Also log as analytics event
    post('/api/analytics/events', {
      clientId:  CLIENT_ID,
      sessionId: getSessionId(),
      eventType: 'newsletter_signup',
      eventName: 'Newsletter Signup',
      properties: { source: source || 'footer' },
    });
  }

  // --- Contact form submission ---
  function trackContactForm(formName) {
    post('/api/analytics/events', {
      clientId:  CLIENT_ID,
      sessionId: getSessionId(),
      eventType: 'form_submission',
      eventName: formName || 'Contact Form',
      properties: {
        path:     location.pathname,
        formName: formName || 'contact',
      },
    });
  }

  // --- Wire up forms ---
  function attachFormListeners() {
    // Footer newsletter form (all pages)
    var footerForms = document.querySelectorAll('.footer-email-form');
    footerForms.forEach(function (form) {
      form.addEventListener('submit', function () {
        var emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
          trackSubscribe(emailInput.value, 'footer');
        }
      });
    });

    // Contact page form
    var contactForm = document.querySelector('.contact-form form, form.contact-form, #contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function () {
        trackContactForm('contact');
      });
    }
  }

  // --- Init ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      trackPageView();
      attachFormListeners();
    });
  } else {
    trackPageView();
    attachFormListeners();
  }
})();
