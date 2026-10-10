import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { MoneyBagIcon, SpiralsIcon, TradeDownIcon } from "@/components/icons/meta-ads-icons";

const ITEMS: { icon: ReactNode; title: string; description: string }[] = [
  {
    icon: <TradeDownIcon className="h-[10px] w-[18px]" />,
    title: "Your cost per lead drops",
    description: "Meta's algorithm now hunts for people who look like the leads who actually qualified - not lookalikes of your random clickers.",
  },
  {
    icon: <SpiralsIcon className="size-[22px]" />,
    title: "Your leads get better, not just cheaper",
    description: "The more buyer data Meta sees, the more your DMs start filling with the kind of person who actually converts.",
  },
  {
    icon: <MoneyBagIcon className="h-[22px] w-[19px]" />,
    title: "Your ad spend gets predictable",
    description: "Real revenue values flow back into Meta Ads Manager. ROAS stops being a spreadsheet exercise.",
  },
];

/**
 * Framer "Change Section" of /meta-ads: left-aligned heading next to three icon rows separated by
 * hairlines, with a dashed left rule on tablet/desktop. 1440x563 / 1024x524 / 390x522.
 */
export function MetaAdsChange() {
  return (
    <section className="relative flex w-full flex-col items-center px-5 pt-0 pb-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
      <div className="flex w-full max-w-[1100px] flex-col items-start gap-8 md:flex-row md:gap-12 lg:gap-16">
        <Reveal y={48} delay={0.2} className="w-full md:w-[276px] md:shrink-0 lg:w-[439px]">
          <SectionHeader align="left" title="Lower cost. Better leads. Real ROAS." />
        </Reveal>
        <div className="relative flex w-full flex-col gap-6 md:flex-1 md:basis-0 md:pl-8 md:after:pointer-events-none md:after:absolute md:after:inset-y-0 md:after:left-0 md:after:border-l md:after:border-dashed md:after:border-[#e7e7e7]">
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`relative flex w-full items-start gap-6 overflow-hidden pb-5 md:gap-5 md:pb-8 lg:gap-[29px] ${
                i < ITEMS.length - 1 ? "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:border-b after:border-[#f2f2f2]" : ""
              }`}
            >
              <span className="flex size-6 shrink-0 items-center justify-center">{item.icon}</span>
              <div className="flex flex-1 flex-col gap-3 md:gap-4">
                <p className="text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] whitespace-pre-wrap text-black md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px] lg:text-[20px] lg:leading-[24px] lg:tracking-[-0.6px]">
                  {item.title}
                </p>
                <p className="text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] whitespace-pre-wrap text-gray-750 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
