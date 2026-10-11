import Image from "next/image";
import { interFeatures } from "@/components/shared/inter-features";
import { LineReveal } from "@/components/shared/line-reveal";
import { StackButton } from "@/components/shared/stack-button";
import { APP_URL } from "@/lib/site";
import { Appear } from "./appear";

const SUBLINE = ["Most coaches are sitting on $20K-$70K in lost revenue.", "Mochi will show you exactly where your DMs are leaking."];
const subline = `text-center text-[16px] leading-6 font-normal break-words whitespace-pre-wrap text-gray-750 ${interFeatures}`;
const VIDEO_SRC = "https://www.youtube.com/embed/jbfiBe5KgNw?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=1&mute=1";

/**
 * /dm-audit "hero": the cloud strip across the top (full width, 5.545:1 on tablet/desktop and 1.97:1 on phone), the
 * 48px (36px on phone, where it breaks after "Get Your") Clash Display title, the two-line subline whose lines blur in
 * one after the other (Framer text effect "appear", tokenization line), the autoplaying muted YouTube embed in a grey
 * 8px frame (24 / 20 / 12px radius on desktop / tablet / phone, 16:9 article of 12px radius), the "47 coaches" line, the
 * accent CTA and its caption. Padding 144/32/100 (136/16/72 on phone); the column is at most 884px wide.
 */
export function AuditHero() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-clip px-4 pt-[136px] pb-[72px] md:px-8 md:pt-36 md:pb-[100px]">
      <div aria-hidden className="absolute top-0 left-1/2 z-0 aspect-[1.9697] w-full -translate-x-1/2 overflow-clip md:aspect-[5.54545]">
        <Image src="/framer/oSwt9seLcU3Z5YLgcuCu44uCZA.png" alt="" width={2880} height={542} sizes="100vw" preload className="absolute inset-0 h-full! w-full object-fill object-top" />
      </div>
      <div className="relative flex w-full flex-col items-center gap-6 overflow-clip">
        <div className="flex w-full max-w-[884px] flex-col items-center gap-16">
          <div className="flex w-full flex-col items-center gap-6">
            <Appear kind="title" className="flex w-full flex-col justify-center">
              <h1 className="text-center font-display text-[36px] leading-9 font-semibold tracking-[0.72px] text-ink-3 md:text-[48px] md:leading-[48px] md:tracking-[0.96px]">
                Get Your <br className="md:hidden" />
                Free DM Audit
              </h1>
            </Appear>
            {/* Framer has two text variants: the two sentences on separate lines (tablet/desktop) or running on (phone). */}
            <div className="w-full max-w-[640px]">
              <LineReveal text={SUBLINE.join(" ")} className={`${subline} md:hidden`} />
              <LineReveal text={SUBLINE.join("\n")} className={`${subline} hidden md:block`} />
            </div>
          </div>
          <div className="w-full max-w-[1054px]">
            <div className="flex w-full items-center justify-center gap-2 overflow-clip rounded-xl bg-[#e4e4e7] p-2 md:rounded-[20px] lg:rounded-[24px]">
              <div className="relative aspect-[1.77847] w-full">
                <article className="relative size-full cursor-pointer overflow-hidden rounded-xl" role="presentation">
                  <iframe
                    className="absolute inset-0 size-full"
                    title="Youtube Video"
                    allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    src={VIDEO_SRC}
                    frameBorder={0}
                  />
                </article>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-10">
            <p className={`w-[357px] max-w-full text-center text-[20px] leading-8 font-semibold whitespace-pre-wrap text-black md:w-auto md:whitespace-pre ${interFeatures}`}>
              47 coaches found leaks worth $30K+ in their first week
            </p>
            <div className="flex w-full flex-col items-center gap-4">
              <Appear kind="button">
                <StackButton hover="roll" size="large" variant="accent" href={APP_URL}>Get Your Free Audit</StackButton>
              </Appear>
              <p className={`text-[14px] leading-5 font-medium whitespace-pre text-[rgba(82,82,82,0.8)] ${interFeatures}`}>No payment required • Takes 2 minutes to setup</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
