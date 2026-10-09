(function () {
  var BACKEND_URL = "https://mochi-customer-support-production.up.railway.app/api/track-touch";

  function getCookie(name) {
    var m = document.cookie.match("(^|;)\\s*" + name + "=([^;]+)");
    return m ? decodeURIComponent(m[2]) : null;
  }

  var sent = false;

  function posthogDistinctId() {
    try {
      return window.posthog && typeof window.posthog.get_distinct_id === "function"
        ? String(window.posthog.get_distinct_id() || "").slice(0, 200)
        : "";
    } catch { return ""; }
  }

  function tryTrack(finalAttempt) {
    if (sent) return true;
    var fbp = getCookie("_fbp");
    if (!fbp) return false;
    var posthogId = posthogDistinctId();
    if (!posthogId && !finalAttempt) return false;

    var p = new URLSearchParams(location.search);
    var payload = {
      fbp: fbp,
      url: location.href.slice(0, 2048),
      utm_source: p.get("utm_source") || "",
      utm_medium: p.get("utm_medium") || "",
      utm_campaign: p.get("utm_campaign") || "",
      utm_content: p.get("utm_content") || "",
      utm_term: p.get("utm_term") || "",
      fbclid: p.get("fbclid") || "",
      referrer: (document.referrer || "").slice(0, 2048),
      posthog_distinct_id: posthogId,
    };

    sent = true;
    fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "omit",
      keepalive: true,
    }).catch(function () { /* silent */ });

    return true;
  }

  if (!tryTrack(false)) {
    var n = 0;
    var id = setInterval(function () {
      n += 1;
      if (tryTrack(n > 10) || n > 10) clearInterval(id);
    }, 200);
  }
})();
