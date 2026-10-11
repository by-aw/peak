import type { ReactNode } from "react";

/**
 * Framer section "Content" stack used by every section of /track-to-ig: a Clash Display heading
 * (32/35.2 phone, 32/33.6 tablet, 40/42 desktop) over a #3d3d3d paragraph (16/22.4, 18/25.2, 20/28).
 * `align` is the text alignment (centred on tablet/desktop, left on phone for the left-aligned sections).
 */
export function SectionHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`font-display text-[32px] leading-[35.2px] font-semibold tracking-[1px] whitespace-pre-wrap text-black md:leading-[33.6px] md:tracking-[0.64px] lg:text-[40px] lg:leading-[42px] lg:tracking-[0.8px] ${className}`}
    >
      {children}
    </h2>
  );
}

export function SectionText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`text-[16px] leading-[22.4px] font-normal tracking-[-0.24px] whitespace-pre-wrap text-gray-800 md:text-[18px] md:leading-[25.2px] lg:text-[20px] lg:leading-[28px] ${className}`}
    >
      {children}
    </p>
  );
}
