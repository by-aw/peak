import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { EyeIcon, InfoIcon, MochiMarkIcon } from "@/components/icons/meta-ads-icons";

const BAR = "bg-[linear-gradient(90deg,#f0b051_0%,#f9edd1_50.9615%,#86adf8_100%)]";

/** One "Stack" row of the comparison cards: label, value and a 10px gradient bar that slides in from the left. */
function Stat({ label, value, width, from }: { label: string; value: string; width: string; from: number }) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full items-center justify-between">
        <p className="text-[14px] leading-[18.2px] font-normal whitespace-pre text-gray-750 md:leading-[16.8px]">{label}</p>
        <p className="text-[15px] leading-[21.75px] font-medium tracking-[-0.15px] whitespace-pre text-black md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
          {value}
        </p>
      </div>
      <div className="flex w-full flex-col overflow-clip rounded-[12px] bg-[#e5e5e5]">
        <Reveal x={from} y={0} delay={0.2} className={`h-[10px] rounded-[12px] ${width} ${BAR}`} />
      </div>
    </div>
  );
}

/**
 * Framer "Problem Section" of /meta-ads: "Why your CPL climbs the more you scale." + the Meta vs Mochi
 * funnel cards and the purple "The 2026 reality" box. 1440x1103 / 1024x1169 / 390x1132.
 */
export function MetaAdsProblem() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
      <div className="flex w-full max-w-[1100px] flex-col items-center gap-8 md:gap-12 lg:gap-16">
        <Reveal y={48} delay={0.2} className="w-full">
          <SectionHeader
            title="Why your CPL climbs the more you scale."
            titleClassName="max-w-[578px]"
            description="Your Meta pixel can see who clicks your ad. It can't see who DMs you, who qualifies, who books, or who pays. So Meta's algorithm optimizes for the only thing it knows - clickers. Not closers."
            descriptionClassName="max-w-[558px]"
          />
        </Reveal>
        <div className="flex w-full max-w-[1000px] flex-col items-center gap-5 md:gap-8">
          <div className="flex w-full flex-col gap-5 lg:flex-row lg:items-stretch">
            {/* Meta card */}
            <div className="relative flex w-full flex-col gap-6 overflow-hidden rounded-[20px] bg-gray-25 p-6 md:rounded-[32px] md:gap-10 lg:flex-1 lg:basis-0 lg:gap-[208px]">
              <div className="flex w-full flex-col gap-6 md:gap-10 lg:gap-12">
                <Image src="/framer/a1TxrvGXqZj7x4qi2G0jCjxufM8.png" alt="" width={449} height={184} className="h-[46px] w-[113px] object-contain" />
                <Stat label="Clicked your ad" value="1,000" width="w-full" from={-188} />
              </div>
              <div className="hidden lg:block">
                <Image src="/framer/ZGDkO6cYrbVzCBS23LdfCn8Gcc.png" alt="" width={412} height={68} className="h-[17px] w-[103px] object-contain" />
              </div>
              <div aria-hidden className="pointer-events-none absolute bottom-[-69px] left-[-67px] z-[1] hidden w-[310px] lg:block">
                <Image src="/framer/9kIvJjAeCYz4IYUONybCs5g8wnU.png" alt="" width={1464} height={1074} className="h-auto w-full" />
              </div>
            </div>
            {/* Mochi card */}
            <div className="relative flex w-full flex-col gap-2 overflow-hidden rounded-[20px] bg-gray-25 p-6 after:pointer-events-none after:absolute after:inset-0 after:rounded-[20px] after:border after:border-dashed after:border-[#e7e7e7] md:rounded-[32px] md:after:rounded-[32px] lg:flex-1 lg:basis-0">
              <div className="flex w-full flex-col gap-6 md:gap-10 lg:gap-12">
                <div className="relative flex flex-col self-start rounded-[12px] bg-white/48 p-[13px] after:pointer-events-none after:absolute after:inset-0 after:rounded-[12px] after:border after:border-dashed after:border-[#e7e7e7]">
                  <div className="flex items-center gap-[6.67px]">
                    <MochiMarkIcon className="h-[19px] w-5" />
                    <p className="font-display text-[20.22px] leading-[20px] font-semibold tracking-[-0.4px] whitespace-pre text-black">mochi</p>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-7 md:gap-8">
                  <Stat label="Clicked your ad" value="1,000" width="w-full" from={-188} />
                  <Stat label="DM'd you" value="80" width="w-[220px]" from={-206} />
                  <Stat label="Qualified by setter" value="25" width="w-[121px]" from={-109} />
                  <Stat label="Closed deal" value="8" width="w-[53px]" from={-47} />
                </div>
                <div className="flex w-full flex-col items-center rounded-[16px] bg-white p-4 lg:p-6">
                  <div className="flex w-full items-center gap-3">
                    <EyeIcon className="hidden h-[42px] w-[14px] shrink-0 lg:block" />
                    <p className="w-full text-[14px] leading-[18.2px] font-normal whitespace-pre-wrap text-[rgba(82,82,82,0.8)] md:leading-[21px] md:tracking-[-0.28px]">
                      Your pixel sees the top line. Mochi sees all four. Meta only learns from what it sees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Reveal y={48} delay={0.2} className="w-full">
            <div className="flex w-full flex-col items-center rounded-[16px] bg-purple-50 p-[22px] lg:p-6">
              <div className="flex w-full flex-col items-center gap-3 lg:flex-row">
                <InfoIcon className="hidden h-[21px] w-[14px] shrink-0 lg:block" />
                <div className="flex w-full flex-1 flex-col gap-2 overflow-clip">
                  <p className="text-center text-[14px] leading-[15.4px] font-medium whitespace-pre-wrap text-purple-500 lg:text-left">The 2026 reality</p>
                  <p className="text-center text-[14px] leading-[18.2px] font-normal whitespace-pre-wrap text-purple-500 md:leading-[16.8px] lg:text-left">
                    Browser-pixel setups now miss 50%+ of actual conversions after iOS 14.5, ad blockers, and in-app browser restrictions. Your media buyer is optimizing on a half-blind signal.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
