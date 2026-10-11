"use client";

const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];

/** The attribution query for the booking link: the page's own UTMs / fbclid, else the ones `public/js/attribution.js` stored, plus the affiliate ref. */
function attributionQuery() {
  const fromUrl = new URLSearchParams(window.location.search);
  const qp = new URLSearchParams();
  for (const key of PARAMS) {
    let value = fromUrl.get(key);
    if (!value) {
      try {
        value = localStorage.getItem(`mochi_${key}`);
      } catch {}
    }
    if (value) qp.set(key, value);
  }
  try {
    const ref = localStorage.getItem("mochi_affiliate_ref");
    if (ref) qp.set("ref", ref);
  } catch {}
  return qp.toString();
}

/**
 * Booking button of /book-dm-audit. Like the embedded page's click handler, it appends the visitor's UTMs, fbclid and
 * affiliate ref to the LeadConnector booking URL when the link is clicked (unless it already carries UTMs).
 */
export function BookLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        const a = e.currentTarget;
        const qs = attributionQuery();
        if (qs && !a.href.includes("utm_")) a.href += (a.href.includes("?") ? "&" : "?") + qs;
      }}
    >
      {children}
    </a>
  );
}
