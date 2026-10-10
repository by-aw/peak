import type { ReactNode } from "react";

/**
 * Framer "Header" block used at the top of most sections of the integration pages
 * (/meta-ads, /payments): a Clash Display h3 (24/28.8 phone, 32/38.4 tablet, 40/48 desktop)
 * and an optional 80%-opacity paragraph (15/22.5, 16/24, 18/27) with an 8px gap.
 */
type Props = {
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  /** Extra classes for the h3 (max-width per page, colour overrides). */
  titleClassName?: string;
  /** Extra classes for the paragraph wrapper (max-width per page, colour overrides). */
  descriptionClassName?: string;
  className?: string;
};

export function SectionHeader({ title, description, align = "center", titleClassName = "", descriptionClassName = "", className = "" }: Props) {
  const centered = align === "center";
  return (
    <div className={`flex w-full flex-col gap-2 ${centered ? "items-center" : "items-start"} ${className}`}>
      <h3
        className={`font-display text-[24px] leading-[28.8px] font-semibold text-black md:text-[32px] md:leading-[38.4px] lg:text-[40px] lg:leading-[48px] ${centered ? "text-center" : "text-left"} ${titleClassName}`}
      >
        {title}
      </h3>
      {description !== undefined && (
        <div className={`opacity-80 ${descriptionClassName}`}>
          <p
            className={`text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] text-ink-3 md:text-[16px] md:leading-[24px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px] ${centered ? "text-center" : "text-left"}`}
          >
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
