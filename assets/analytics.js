/* GA4: prioriza os recursos da página antes de carregar a biblioteca externa. */
(function () {
  'use strict';
  if (window.__gbrAnalyticsInitialized) return;
  window.__gbrAnalyticsInitialized = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-96Y2H2W1LH');
  function loadAnalytics() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-96Y2H2W1LH';
    document.head.appendChild(script);
  }
  function scheduleAnalytics() {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadAnalytics, { timeout: 1500 });
    } else {
      window.setTimeout(loadAnalytics, 0);
    }
  }
  if (document.readyState === 'complete') scheduleAnalytics();
  else window.addEventListener('load', scheduleAnalytics, { once: true });
}());
