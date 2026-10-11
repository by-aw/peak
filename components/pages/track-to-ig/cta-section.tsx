import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { APP_URL } from "@/lib/site";

const TESTFLIGHT_URL = "https://testflight.apple.com/join/4qFmNv8s";

/**
 * Closing CTA of /track-to-ig (Framer "CTA" of the page's own "Footer + CTA": a different variant from the site-wide
 * one). Tablet/desktop: "Stop guessing what to post next." with the dashboard mockup and mascots (1440x769 / 1024x743).
 * Phone: "Get up and running in 5 minutes" under the phone mockup, with "Open Web" and the TestFlight badge (390x544).
 */
export function CtaSection() {
  return (
    <section className="order-7 relative flex w-full justify-center overflow-clip md:order-none">
      <div className="flex w-full flex-col items-center bg-gray-25 px-5 pt-12 md:px-[100px] md:pt-20">
        {/* Phone */}
        <div className="flex w-full max-w-[1000px] flex-col items-center gap-10 md:hidden">
          <div className="relative z-[3] flex h-[314px] w-full flex-col items-center gap-6 px-8">
            <Image src="/framer/xj7iYweK42GTxKaSOTrokJbLOI.png" width={1024} height={1803} sizes="286px" alt="" className="pointer-events-none h-auto w-[286px] max-w-none" />
            <div className="absolute top-[-34px] left-[268px] z-[1] h-[94px] w-[88px]">
              <Image src="/framer/UMkDevsaFa2BKgVMx84x8jEAs4.png" width={360} height={384} sizes="88px" alt="" className="h-full w-full" />
            </div>
          </div>
          <div className="z-[3] flex w-full flex-col items-start gap-6">
            <h2 className="w-full text-center font-display text-[32px] leading-[35.2px] font-semibold tracking-[1px] whitespace-pre-wrap text-ink">Get up and running in 5 minutes</h2>
            <div className="flex w-full items-center gap-3">
              <Button variant="whiteBig" href={APP_URL} className="flex-1">
                Open Web
              </Button>
              <a href={TESTFLIGHT_URL} target="_blank" rel="noopener" className="block h-12 w-auto shrink-0 aspect-[2.98204]">
                <Image src="/framer/sCkXVPy71wvVQ6qwFqu5BxrzCY.png" width={498} height={167} sizes="144px" alt="Join the Mochi beta on TestFlight" className="h-full w-full object-cover" />
              </a>
            </div>
          </div>
        </div>

        {/* Tablet / desktop */}
        <div className="hidden w-full max-w-[1000px] flex-col items-center gap-16 md:flex">
          <div className="z-[3] flex w-full flex-col items-center gap-8">
            <div className="flex w-full flex-col items-center gap-5 overflow-clip">
              <h2 className="w-full max-w-[520px] text-center font-display text-[40px] leading-[44px] font-semibold tracking-[1.6px] whitespace-pre-wrap text-ink lg:text-[48px] lg:leading-[52.8px]">
                Stop guessing what to post next.
              </h2>
              <Reveal y={48} delay={0.2} viewport={{ once: true, amount: "some" }} className="w-full max-w-[424px]">
                <p className="text-center text-[18px] leading-[25.2px] font-normal tracking-[-0.24px] whitespace-pre-wrap text-gray-800 lg:text-[20px] lg:leading-[28px]">
                  See which reel actually creates customers and build the next one from what works.
                </p>
              </Reveal>
            </div>
            <div className="flex items-start gap-3">
              <Button variant="primaryBig" href={APP_URL}>
                Start Free Trial
              </Button>
            </div>
          </div>

          <div className="flex w-full flex-col items-center">
            <div className="flex w-full flex-col">
              <div className="relative flex h-[360px] w-full items-start">
                <div className="relative flex-1 basis-0">
                  <Image
                    src="/framer/JZQgs74iAOjGK2NRf1pxMgImGGQ.png"
                    width={2048}
                    height={1057}
                    sizes="(min-width: 1200px) 1000px, calc(100vw - 200px)"
                    alt=""
                    className="h-auto w-full"
                  />
                </div>
                <div className="absolute top-[-75px] right-[-81px] z-[1] h-[197px] w-[184px]">
                  <Image src="/framer/kcVVuVeMbh7EFtpsjEdB7TKzuCo.png" width={736} height={784} sizes="184px" alt="" className="h-full w-full" />
                </div>
                <div className="absolute top-[264px] left-[-4px] z-[1] h-[133px] w-[133px]">
                  <Image src="/framer/v9gv6IP9LwGJjgEvg2dcxZMNuU.png" width={1254} height={1254} sizes="133px" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="absolute top-[213.609px] right-0 z-[1] h-[160px] w-[285px]">
                  <Image src="/framer/lp15KmkigzmT1BUO4xDanHvhfFo.png" width={1672} height={941} sizes="285px" alt="" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="relative h-px w-full bg-black/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
