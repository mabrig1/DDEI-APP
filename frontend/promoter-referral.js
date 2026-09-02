(function () {
  var TRACKING_ENDPOINT = 'https://academic.mabrigkorie.org/api/referrals/click';

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

  try {
    var params = new URLSearchParams(window.location.search);
    var incoming = cleanCode(params.get('ref'));
    var stored = cleanCode(localStorage.getItem('mabrig-referral-code'));
    var referralCode = incoming || stored;
    if (!referralCode) return;

    if (incoming) {
      localStorage.setItem('mabrig-referral-code', incoming);
      localStorage.setItem('mabrig-referral-product', 'DDEI');
    }

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
    // Referral attribution must never block the training experience.
  }
})();
