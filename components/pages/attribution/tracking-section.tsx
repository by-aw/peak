import type { ReactNode } from "react";
import { CONTAINER, H3, WRAPPER, line } from "@/components/shared/attribution/grid";
import { CardLineIcon, GlobeIcon, MessageOutgoingIcon, MoneyBagIcon, TapIcon } from "@/components/icons/attribution-icons";

type Step = { icon: ReactNode; title: string; description: string; descriptionClassName?: string; pill: string };

const STEPS: Step[] = [
  { icon: <MessageOutgoingIcon className="absolute inset-px" />, title: "DM sent", description: "Setter sends link via Mochi inbox", descriptionClassName: "md:max-w-[168px]", pill: "MOCH.ME LINK" },
  { icon: <TapIcon className="absolute inset-y-px left-0.5 right-1" />, title: "Link clicked", description: "Who, when, where, what device", descriptionClassName: "md:max-w-[160px]", pill: "LINK TRACKING" },
  { icon: <GlobeIcon className="absolute inset-px" />, title: "Page visited", description: "Training watched, form filled, pages browsed", pill: "MOCHI PIXEL" },
  { icon: <MoneyBagIcon className="absolute inset-y-px left-0.5 right-px" />, title: "Purchase made", description: "Attributed back to setter, link, and source", pill: "CONVERSION" },
];

/** Grid lines per card: 4-up on desktop, 2x2 on tablet, stacked on phone. */
function cardLines(i: number) {
  const phone = i < 3 ? "after:border-b" : "";
  const tablet = i < 2 ? "md:after:border-b" : "md:after:border-b-0";
  return line(`after:border-r ${phone} ${tablet} lg:after:border-b-0`);
}

/** Framer "Tracking Section": "From DM to purchase. Every step." and the four journey step cards. */
export function TrackingSection() {
  return (
    <section className="flex w-full flex-col items-center overflow-hidden">
      <div className={`${WRAPPER} ${line("after:border-b")} overflow-hidden`}>
        <div className={`${CONTAINER} ${line("after:border-x")} flex flex-col items-center overflow-hidden pb-12 md:py-16 lg:py-20`}>
          <div className={`${line("after:border-b")} flex w-full flex-col items-center gap-4 px-4 py-12 md:px-0 md:pt-0 md:pb-16`}>
            <h3 className={`${H3} w-full max-w-[486px] whitespace-pre-wrap`}>From DM to purchase. Every step.</h3>
          </div>
          <div className={`${line("after:border-b")} grid w-full grid-cols-1 overflow-hidden md:grid-cols-2 lg:grid-cols-4`}>
            {STEPS.map((step, i) => (
              <div key={step.title} className={`${cardLines(i)} flex w-full flex-col items-start gap-4 overflow-hidden p-6 md:p-8`}>
                <div className="relative size-5 shrink-0">{step.icon}</div>
                <div className="flex w-full flex-col items-start gap-2">
                  <p className="w-full text-[14px] leading-[15.4px] font-medium whitespace-pre-wrap text-ink-3">{step.title}</p>
                  <p className={`w-full text-[14px] leading-[18.2px] font-normal whitespace-pre-wrap text-[rgba(82,82,82,0.8)] md:leading-[16.8px] ${step.descriptionClassName ?? ""}`}>{step.description}</p>
                </div>
                <div className="h-[3px] w-full">
                  <CardLineIcon />
                </div>
                <div className="relative flex items-center rounded-[64px] bg-[#fbfbfb] px-3 py-1.5 after:pointer-events-none after:absolute after:inset-0 after:rounded-[64px] after:border after:border-gray-150">
                  <p className="text-[12px] leading-[14.4px] font-medium whitespace-pre text-[#979797]">{step.pill}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
