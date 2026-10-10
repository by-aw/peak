import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { H3, line } from "@/components/shared/attribution/grid";

type Props = {
  heading: ReactNode;
  description?: string;
  /** Fixed width of the heading text layer on desktop/tablet (phone: full width). */
  headingWidth: number;
  descriptionWidth?: number;
  /** Framer left-aligns the first problem paragraph while every other one is centred. */
  descriptionAlign?: "center" | "left";
  /** Padding of the header band (e.g. `pb-16` or `py-16`); phone always adds px-4. */
  className?: string;
};

/**
 * Section header band of the /attribution page (Framer "Header" > "Header"): centred h3 (+ 80% opacity
 * description) that fades/slides in (y 48), with a 1px grid line underneath.
 */
export function SectionHeader({ heading, description, headingWidth, descriptionWidth, descriptionAlign = "center", className = "" }: Props) {
  return (
    <div className={`${line("after:border-b")} flex w-full flex-col items-center gap-4 ${className}`}>
      <Reveal y={48} delay={0.2} className="flex w-full flex-col items-center gap-2">
        <h3 className={`${H3} w-full whitespace-pre-wrap`} style={{ maxWidth: headingWidth }}>
          {heading}
        </h3>
        {description ? (
          <p
            className={`w-full text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] whitespace-pre-wrap text-ink-3 opacity-80 md:text-[16px] md:leading-[24px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px] ${descriptionAlign === "center" ? "text-center" : "text-left"}`}
            style={{ maxWidth: descriptionWidth }}
          >
            {description}
          </p>
        ) : null}
      </Reveal>
    </div>
  );
}
