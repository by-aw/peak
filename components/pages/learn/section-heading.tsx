import { Reveal } from "@/components/ui/reveal";

/**
 * Centred section heading of the /learn sections (Framer "Header > Heading", `h3` preset w4md0Faie): Clash Display 600
 * at 24/28.8, 32/38.4 and 40/48px, black, at most `maxWidth`px wide (762px on tablet/desktop for the long ones,
 * 602px on tablet), appearing with the Framer fade/slide-up.
 */
export function SectionHeading({ children, maxWidth = 580, tabletMaxWidth = maxWidth }: { children: React.ReactNode; maxWidth?: number; tabletMaxWidth?: number }) {
  return (
    <Reveal className="flex w-full flex-col items-center" y={48}>
      <h3
        className="w-full max-w-(--sh-w) text-center font-display text-[24px] leading-[28.8px] font-semibold whitespace-pre-wrap text-black md:max-w-(--sh-tw) md:text-[32px] md:leading-[38.4px] lg:max-w-(--sh-w) lg:text-[40px] lg:leading-[48px]"
        style={{ "--sh-w": `${maxWidth}px`, "--sh-tw": `${tabletMaxWidth}px` } as React.CSSProperties}
      >
        {children}
      </h3>
    </Reveal>
  );
}
