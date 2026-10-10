import Image from "next/image";
import { FeatureHero } from "@/components/shared/feature-hero";
import { Skeleton } from "@/components/shared/feature-card";
import { DashedDivider } from "@/components/icons/feature-icons";

export const SALES_PERFORMANCE_CTA = "https://use.themochi.app/login?landing_page=sales-performance";

const BARS: { month: string; height: number }[] = [
  { month: "Jan", height: 22 },
  { month: "Feb", height: 33 },
  { month: "Mar", height: 47 },
  { month: "Apr", height: 38 },
  { month: "May", height: 53 },
  { month: "Jun", height: 61 },
  { month: "Jul", height: 68 },
  { month: "Aug", height: 83 },
];

const SETTERS: { rank: string; name: string; avatar?: string; initial?: string; bar: string }[] = [
  { rank: "1", name: "Alex Johnson", avatar: "/framer/bnWFTVqsHRDZvXiqyM8wJ2jHk.png", bar: "w-[78px]" },
  { rank: "2", name: "Jordan Davis", initial: "J", bar: "w-[65px]" },
  { rank: "3", name: "Riley Lee", avatar: "/framer/qYjv2DvP3UufGND9s05u17qv24.png", bar: "w-[52px]" },
];

/**
 * Framer "Card" of the Sales Performance hero: a purple gradient backdrop (592x561 on desktop, 928x589 on
 * tablet, 350x513 on phone) holding the white "Command Center" dashboard mockup (544x473, 1px #e7e7e7 hairline).
 */
export function CommandCenterCard() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[24px] p-5 md:h-[589px] md:p-6 lg:h-auto lg:w-[592px] lg:self-stretch">
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <Image src="/framer/9w5uA4oj4VZzkY1gUmV7dNkb4BM.webp" alt="" fill preload sizes="(min-width: 1200px) 592px, (min-width: 810px) 928px, 100vw" className="object-cover" />
      </div>
      <div className="relative z-[1] flex w-full max-w-[544px] flex-col overflow-hidden rounded-[16px] bg-white shadow-[inset_0_0_0_1px_#e7e7e7]">
        <div className="relative flex w-full items-center justify-between bg-white px-5 py-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#f7f7f7]">
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-[#e57c71]" />
            <span className="size-1.5 rounded-full bg-[#efc336]" />
            <span className="size-1.5 rounded-full bg-[#78da86]" />
          </div>
          <p className="text-[12px] leading-[13.2px] font-medium tracking-[-0.1px] whitespace-pre text-black">Command Center</p>
          <div className="flex items-center gap-1.5">
            <span className="size-1 rounded-full bg-[#78da86] shadow-[0_0_8px_2px_rgba(117,215,132,0.6)]" />
            <p className="text-[9px] leading-[9.9px] font-normal tracking-[-0.1px] whitespace-pre text-[#78da86]">Live</p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-6 overflow-hidden bg-white p-5">
          <div className="flex w-full flex-col gap-3">
            <p className="text-[11px] leading-[18px] font-normal tracking-[-0.2px] whitespace-pre text-[#797979]">Total Revenue</p>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="w-[69px]" />
                <Skeleton className="w-[142px]" flat />
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <Skeleton className="w-11" />
                <Skeleton className="w-[79px]" flat />
              </div>
            </div>
          </div>
          <div className="flex w-full items-end gap-1.5">
            {BARS.map((bar) => (
              <div key={bar.month} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
                <div className="w-full rounded-t-[6px] bg-[#3b82f6]" style={{ height: bar.height }} />
                <p className="w-[42px] max-w-full text-center text-[10px] leading-[10px] font-normal whitespace-pre-wrap text-[#040404]">{bar.month}</p>
              </div>
            ))}
          </div>
          <DashedDivider />
          <div className="flex w-full flex-col gap-3">
            <div className="flex w-full items-center justify-between">
              <p className="text-[11px] leading-[18px] font-normal tracking-[-0.2px] whitespace-pre text-[#797979]">Setter Performance</p>
              <p className="text-[9px] leading-[18px] font-normal tracking-[-0.2px] whitespace-pre text-[#797979]">This week</p>
            </div>
            <div className="flex w-full flex-col gap-4 rounded-[16px] bg-gray-25 p-4">
              {SETTERS.map((setter) => (
                <div key={setter.rank} className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <p className="text-[9px] leading-[18px] font-normal tracking-[-0.2px] whitespace-pre text-black">{setter.rank}</p>
                    <div className="flex items-center gap-1.5">
                      {setter.avatar ? (
                        <Image src={setter.avatar} alt="" width={96} height={96} className="size-6 rounded-full object-cover" />
                      ) : (
                        <div className="flex size-6 items-center justify-center rounded-full bg-[#d1faec]">
                          <p className="text-center text-[12px] leading-[12.6px] font-medium tracking-[-0.2px] whitespace-pre text-[#022c1e]">{setter.initial}</p>
                        </div>
                      )}
                      <p className="text-[9px] leading-[18px] font-normal tracking-[-0.2px] whitespace-pre text-black">{setter.name}</p>
                    </div>
                  </div>
                  <Skeleton className={setter.bar} flat />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Sales Performance "Hero Section": headline, purple "problem" callout, support copy, CTA and the Command Center card. */
export function SalesPerformanceHero() {
  return (
    <FeatureHero
      title="Know which message actually books the call."
      highlight={
        <div className="relative flex w-full items-start gap-2 overflow-hidden bg-purple-100 p-5 after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:w-0.5 after:bg-purple-900">
          <div className="flex-1 opacity-80">
            <p className="text-left text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] whitespace-pre-wrap text-ink-3 md:text-[16px] md:leading-[24px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px]">
              See how conversations move from new lead to booked call, which openers and follow-ups convert, and how each person is performing. Coach from what actually happened instead of end-of-day reports.
            </p>
          </div>
        </div>
      }
      description="Most teams run on a daily call count and a gut feeling about who is working hard. That tells you nothing about which opener started the conversation, which follow-up recovered it, or which objection ended it."
      descriptionClassName="text-gray-750"
      ctaHref={SALES_PERFORMANCE_CTA}
      contentClassName="lg:w-[608px] lg:shrink-0"
      card={<CommandCenterCard />}
    />
  );
}
