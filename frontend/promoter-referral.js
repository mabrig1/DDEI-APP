(function () {
  var TRACKING_ENDPOINT = 'https://academic.mabrigkorie.org/api/referrals/click';
  var STORAGE_KEY = 'mabrig-referral-code';

  function cleanCode(value) {
    return String(value || '').trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '').slice(0, 64);
  }

  function sessionId() {
    var key = 'mabrig-promoter-session';
    var value = localStorage.getItem(key);
    if (!value) {
      value = (window.crypto && window.crypto.randomUUID)
        ? window.crypto.randomUUID()
        : 'ddei-' + Date.now() + '-' + Math.random().toString(36).slice(2);
      localStorage.setItem(key, value);
    }
    return value;
  }

  function installPaymentAttribution(referralCode) {
    if (!referralCode || window.__mabrigPaymentAttributionInstalled) return;
    window.__mabrigPaymentAttributionInstalled = true;
    var originalFetch = window.fetch.bind(window);
    window.fetch = function (input, init) {
      try {
        var url = typeof input === 'string' ? input : (input && input.url) || '';
        if (url.indexOf('/api/payments/initialize') !== -1 && init && typeof init.body === 'string') {
          var payload = JSON.parse(init.body);
          if (!payload.referralCode) payload.referralCode = cleanCode(localStorage.getItem(STORAGE_KEY)) || referralCode;
          init = Object.assign({}, init, { body: JSON.stringify(payload) });
        }
      } catch (_) {
        // Never interfere with checkout if a request body is not JSON.
      }
      return originalFetch(input, init);
    };
  }

  try {
    var params = new URLSearchParams(window.location.search);
    var incoming = cleanCode(params.get('ref'));
    var stored = cleanCode(localStorage.getItem(STORAGE_KEY));
    var referralCode = incoming || stored;
    if (!referralCode) return;

    if (incoming) {
      localStorage.setItem(STORAGE_KEY, incoming);
      localStorage.setItem('mabrig-referral-product', 'DDEI');
    }

    installPaymentAttribution(referralCode);

    fetch(TRACKING_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        referralCode: referralCode,
        product: 'DDEI',
        sessionId: sessionId(),
        page: (window.location.pathname + window.location.search).slice(0, 300)
      })
    }).catch(function () {});
  } catch (error) {
    // Referral attribution must never block the training or payment experience.
  }
})();
