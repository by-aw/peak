(function () {
  var p = new URLSearchParams(window.location.search);

  // Capture attribution on landing — store ALWAYS (not gated on ref)
  if (p.get('ref')) localStorage.setItem('mochi_affiliate_ref', p.get('ref'));
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'].forEach(function (k) {
    var v = p.get(k);
    if (v) localStorage.setItem('mochi_' + k, v);   // persists across funnel pages
  });

  var storedRef = localStorage.getItem('mochi_affiliate_ref') || 'direct';

  // Affiliate hidden field on native forms
  document.addEventListener('submit', function (e) {
    var hf = e.target.querySelector('input[name="affiliate_ref"]');
    if (hf) hf.value = storedRef;
  }, true);

  // Forward UTMs/fbclid onto GHL booking links so GHL captures them
  function buildQuery() {
    var qp = new URLSearchParams();
    ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'].forEach(function (k) {
      var v = localStorage.getItem('mochi_' + k);
      if (v) qp.set(k, v);
    });
    return qp.toString();
  }
  function decorate() {
    var qs = buildQuery();
    if (!qs) return;
    document.querySelectorAll('a[href*="widget/booking/5947iPBXED9I5cpEKjdr"]').forEach(function (a) {
      if (a.dataset.utmDone) return;
      a.href += (a.href.indexOf('?') === -1 ? '?' : '&') + qs;
      a.dataset.utmDone = '1';
    });
  }
  decorate();
  new MutationObserver(decorate).observe(document.documentElement, { childList: true, subtree: true });
})();
