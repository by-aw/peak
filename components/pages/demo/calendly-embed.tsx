"use client";

import { useState } from "react";

/**
 * Framer Forms "Super Calendly" (react-calendly InlineWidget) shown after the form when the lead qualifies:
 * the Calendly event in an iframe 145.75vh tall, prefilled with the lead's name and email, landing-page
 * details and GDPR banner hidden. Calendly's three bouncing dots show until the iframe loads.
 */
export function CalendlyEmbed({ url, name, email }: { url: string; name: string; email: string }) {
  const [loaded, setLoaded] = useState(false);
  const [base, query] = url.split("?");
  // Same parameter order as react-calendly on live.
  const params = [
    `embed_domain=${window.location.host}`,
    "embed_type=Inline",
    ...(query ? query.split("&") : []),
    "hide_landing_page_details=1",
    "hide_gdpr_banner=1",
    name && `name=${encodeURIComponent(name)}`,
    email && `email=${encodeURIComponent(email)}`,
  ].filter(Boolean);
  return (
    <div className="relative h-[145.75vh] w-full min-w-[320px]">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center gap-[5px]" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-[18px] animate-[calendly-bounce_1.4s_ease-in-out_infinite_both] rounded-full bg-[#333]"
              style={{ animationDelay: `${(i - 2) * 0.16}s` }}
            />
          ))}
          <style>{`@keyframes calendly-bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}`}</style>
        </div>
      )}
      <iframe
        src={`${base}?${params.join("&")}`}
        title="Calendly Scheduling Page"
        onLoad={() => setLoaded(true)}
        className="relative block h-full w-full border-0"
      />
    </div>
  );
}
