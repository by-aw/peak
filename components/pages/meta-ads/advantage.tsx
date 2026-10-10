import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { SavingsIcon, UserCheckPinkIcon } from "@/components/icons/meta-ads-icons";
import { CountUp } from "./count-up";

function StatCard({ icon, number, label }: { icon: ReactNode; number: ReactNode; label: string }) {
  return (
    <div className="relative flex w-full flex-col gap-[5px] overflow-hidden rounded-[24px] bg-gray-25 after:pointer-events-none after:absolute after:inset-0 after:rounded-[24px] after:border after:border-[#f2f2f2]">
      <div className="flex h-12 w-full items-center gap-2 px-6 pt-6">
        <span className="flex size-6 items-center justify-center">{icon}</span>
      </div>
      <div className="flex w-full flex-col p-6">
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center gap-2">{number}</div>
          <p className="text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] whitespace-pre-wrap text-[#383840] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">{label}</p>
        </div>
      </div>
    </div>
  );
}

const NUMBER = "text-center text-[24px] leading-[28.8px] font-semibold tracking-[-0.72px] text-black md:text-[32px] md:leading-[38.4px] md:tracking-[-0.96px]";

/**
 * Framer "Advantage Section" of /meta-ads: Meta-blue (#0082fb) band with two counter cards, a dashed
 * callout and three cloud images hanging over the edges. 1440x809 / 1024x775 / 390x759.
 * Desktop/tablet bottom padding is 224px to leave room for the "Icons Container" strip that follows.
 */
export function MetaAdsAdvantage() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-clip bg-[#0082fb] px-5 py-12 md:px-[100px] md:pt-20 md:pb-[224px]">
      <div className="relative z-[2] flex w-full max-w-[695px] flex-col items-center gap-8 md:gap-12 lg:gap-16">
        <Reveal y={48} delay={0.2} className="w-full">
          <SectionHeader
            title="Day one. Not week eight."
            titleClassName="text-white"
            description="Meta normally needs 6–8 weeks of fresh conversion data to optimize a pixel. We don't wait. The day you connect Mochi, we replay every qualified lead and closed deal already sitting in your account back to your pixel."
            descriptionClassName="max-w-[658px] [&_p]:text-white"
          />
        </Reveal>
        <div className="flex w-full flex-col items-center gap-4 overflow-clip md:gap-0">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 md:pb-5">
            <Reveal y={48} delay={0.2} className="flex">
              <StatCard icon={<UserCheckPinkIcon className="size-[22px]" />} number={<CountUp to={247} className={NUMBER} />} label="Qualified leads replayed to your pixel" />
            </Reveal>
            <Reveal y={48} delay={0.3} className="flex">
              <StatCard icon={<SavingsIcon className="size-[22px]" />} number={<CountUp to={186000} prefix="$" className={NUMBER} />} label="in closed revenue attached to 42 Purchase events" />
            </Reveal>
          </div>
          <div className="relative flex w-full flex-col items-center overflow-clip rounded-[16px] px-3.5 py-[18px] after:pointer-events-none after:absolute after:inset-0 after:rounded-[16px] after:border-[3px] after:border-dashed after:border-white">
            <p className="text-center text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] whitespace-pre-wrap text-white md:max-w-[574px] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
              Your pixel walks in pre-trained. Your media buyer scales from day one instead of waiting two months for Meta to learn.
            </p>
          </div>
        </div>
      </div>
      {/* Clouds */}
      <Reveal x={-27} y={-16} delay={0.2} aria-hidden className="pointer-events-none absolute top-[-124px] left-[-120px] z-[1] w-[261px] rotate-[34deg] md:w-[403px] lg:w-[423px]">
        <Image src="/framer/Uh5nupAxUJNvNUzxue0UVu0swbQ.png" alt="" width={2104} height={1584} className="h-auto w-full" />
      </Reveal>
      <Reveal x={65} y={-16} delay={0.2} aria-hidden className="pointer-events-none absolute top-[-62px] right-[-259px] z-[1] w-[406px] -rotate-[106deg] md:w-[510px] lg:w-[459px]">
        <Image src="/framer/Q153tfPT0kBeUA0tywTwNfRfTQ.png" alt="" width={2184} height={1644} className="h-auto w-full" />
      </Reveal>
      <Reveal x={82} y={42} delay={0.2} aria-hidden className="pointer-events-none absolute bottom-[-160px] left-[752px] z-[1] hidden w-[396px] md:block lg:bottom-[-170px] lg:left-[1191px] lg:w-[359px]">
        <Image src="/framer/KP4qwKTksPCWsA4u54VyOhOsO8.png" alt="" width={1892} height={1916} className="h-auto w-full" />
      </Reveal>
    </section>
  );
}

/**
 * Framer "Icons Container": a 158px-tall strip between the Advantage and Set-up sections holding the
 * full-width dashed "event icons" illustration (100vw x 100vw/2.881) centered on it, overflowing both
 * neighbours (z-index 3). Absent on phones.
 */
export function MetaAdsIconsStrip() {
  return (
    <div aria-hidden className="pointer-events-none relative z-[3] hidden h-[158px] w-full items-center justify-center md:flex">
      <div className="relative w-full shrink-0 aspect-[2.881/1]">
        <Image src="/framer/0NnjQtJlAZlBYaNHLWxlUhdwoMs.png" alt="" fill sizes="100vw" className="object-cover" />
      </div>
    </div>
  );
}
