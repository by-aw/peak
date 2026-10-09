import type { ReactNode } from "react";

/**
 * Phone-style mockup frame used by every feature panel.
 * Desktop (>=1200): 440x800, top corners 56px, no fade ("Desktop N" variant).
 * Phone/tablet: 350x648 with the bottom 20% faded out ("Phone N" variant); the inner canvas is still 800px tall.
 * `fade` forces the bottom fade at every size and makes the small frame 800px tall (the CRM panel).
 */
export function PhoneFrame({ children, fade = false }: { children: ReactNode; fade?: boolean }) {
  const mask = fade
    ? "[mask-image:linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_20%)]"
    : "[mask-image:linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_20%)] lg:[mask-image:none]";
  return (
    <div
      className={`relative w-[350px] ${fade ? "h-[800px]" : "h-[648px]"} overflow-hidden rounded-t-[56px] bg-white lg:h-[800px] lg:w-[440px] ${mask}`}
    >
      <div className="relative h-[800px] w-[350px] overflow-hidden rounded-t-[56px] lg:w-[440px]">{children}</div>
      {/* 1px hairline around the frame (top / sides) */}
      <div className="pointer-events-none absolute inset-0 rounded-t-[56px] border border-b-0 border-[#e5e5e5]" />
    </div>
  );
}
