import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { CONTAINER, H3, WRAPPER, line } from "./grid";
import { RollingButton } from "./rolling-button";

type Props = {
  heading: ReactNode;
  description: string;
  button: { label: string; href: string };
  note: string;
  /** Width of the description box on desktop/tablet (Framer fixed-width text layer). */
  descriptionWidth?: number;
  /** Max-width classes of the heading box (e.g. `max-w-[240px] md:max-w-[312px] lg:max-w-[509px]`). */
  headingClassName?: string;
};

/**
 * Attribution template "CTA Section": the white 406px card with the faded dashboard screenshot
 * and light-blue gradient behind the heading, black rolling button and small note.
 */
export function AttributionCtaSection({ heading, description, button, note, descriptionWidth = 320, headingClassName = "" }: Props) {
  return (
    <section className="flex w-full flex-col items-center">
      <div className={`${WRAPPER} ${line("after:border-y")}`}>
        <div className={`${CONTAINER} ${line("after:border-x")} flex flex-col items-center px-4 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20`}>
          <Reveal
            y={64}
            delay={0.2}
            className="relative flex min-h-[406px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-[24px] bg-white after:pointer-events-none after:absolute after:inset-0 after:rounded-[24px] after:border after:border-black/10"
          >
            <div aria-hidden className="pointer-events-none absolute -bottom-4 left-0 top-[167px] z-[1] w-[1012px] bg-[linear-gradient(#c0ebff_0%,#fff_100%)] opacity-25" />
            <div aria-hidden className="pointer-events-none absolute top-0 z-[1] h-[406px] w-[1873px] opacity-25 left-[calc(50%-936px)] md:left-[-505px] lg:left-[-437px]">
              <Image src="/framer/8O47rK3bSx4l5YAdgm9wI5az3fg.png" width={3746} height={812} alt="" sizes="1873px" className="h-full w-full" />
            </div>
            <div className="z-[3] flex w-full flex-col items-center gap-6 px-3 md:w-[703px] md:px-0">
              <div className="flex w-full flex-col items-center gap-2">
                <h3 className={`${H3} w-full whitespace-pre-wrap ${headingClassName}`}>{heading}</h3>
                <p className="w-full text-center text-[16px] font-normal leading-[22.4px] tracking-[-0.16px] whitespace-pre-wrap text-black/50 md:w-(--w)" style={{ "--w": `${descriptionWidth}px` } as React.CSSProperties}>
                  {description}
                </p>
              </div>
              <div className="flex w-full flex-col items-center gap-4 md:w-[379px]">
                <RollingButton href={button.href} variant="black" className="w-[200px]">
                  {button.label}
                </RollingButton>
                <p className="w-full max-w-[242px] text-center text-[14px] font-normal leading-[16.8px] whitespace-pre-wrap text-gray-550 md:max-w-none">{note}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
