import type { ReactNode } from "react";

/**
 * Framer section template of the /mcp page ("Questions Section", "Connector Section", "CTA Section"):
 * a 1200px container (944 tablet, 350 phone) with 1px #e7e5e5 hairlines on both sides, and two
 * full-width #e8e6e6 rules 41px below the top / above the bottom edge of the section ("Line Top" / "Line Bottom").
 * Default container padding: 48/16 phone, 64/20 tablet, 80/40 desktop.
 */
export function McpSection({
  children,
  className = "",
  wrapperClassName = "",
  innerClassName = "px-4 py-12 md:px-5 md:py-16 lg:px-10 lg:py-20",
  label,
}: {
  children: ReactNode;
  className?: string;
  /** Extra classes for the padded wrapper (e.g. the 16px tablet bottom padding of the CTA section). */
  wrapperClassName?: string;
  /** Padding of the framed container. */
  innerClassName?: string;
  label?: string;
}) {
  return (
    <section className={`relative flex w-full flex-col items-center ${className}`.trim()} aria-label={label}>
      <div className={`flex w-full flex-col items-center px-5 md:px-10 lg:px-[100px] ${wrapperClassName}`.trim()}>
        <div
          className={`relative flex w-full max-w-[1200px] flex-col items-center after:pointer-events-none after:absolute after:inset-0 after:border-x after:border-[#e7e5e5] ${innerClassName}`}
        >
          {children}
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[41px] z-[1] h-px bg-[#e8e6e6]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[41px] z-[1] h-px bg-[#e8e6e6]" />
    </section>
  );
}
