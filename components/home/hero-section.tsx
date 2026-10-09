import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ForbesLogo } from "@/components/icons/timeline-icons";
import { FounderVideo } from "./founder-video";
import { HeroClouds } from "./hero-clouds";
import { TrustedTicker, type TickerUser } from "./trusted-ticker";

const TRUSTED_BY: TickerUser[] = [
  { name: "vincevn", src: "/framer/e322m6uUbPriCAPPunJbf4gmfsA.jpg" },
  { name: "maxxInhouse", src: "/framer/qGs8PvxQeCp6CStFyyyrPtQgU.png" },
  { name: "difaino", src: "/framer/jNTlEMzncssXUFNkw3zxxikZr8U.jpeg" },
  { name: "niksetting", src: "/framer/7LJdHP5s0pYuhW9QZBL9aOLBVgk.jpg" },
  { name: "joshuakaats", src: "/framer/yAODxWyzMUWOvJg0nGNMytwx8.jpg" },
  { name: "xanderhoutman_", src: "/framer/05fiMdQ70sBzzF1DFqN2lKPYUnU.jpg" },
  { name: "fxalexg", src: "/framer/SFGTKAjP88lO2Z5v4iJfNd9mLJw.jpg" },
  { name: "alex_eubank15", src: "/framer/zOHqiJ0yml47Nkd0W65bZXfwn8.png" },
  { name: "hussein.fht", src: "/framer/2SW1JUaEtCXIdObqXxrz1M9qkQs.jpg" },
  { name: "zth.training", src: "/framer/mFSEcwU6BX2BekfWBrkb2oewquw.jpg" },
  { name: "budgetdog", src: "/framer/luQwQvwfbH3SRAcPH04bBuTd50I.jpg" },
  { name: "williamscxtt", src: "/framer/pza1VnAbobZrdHVp84eLy3txU.jpg" },
  { name: "nathannuyts", src: "/framer/XsLRxcIv9FWlcpbzHgQqnZ7A.jpg" },
  { name: "amatuska_", src: "/framer/66poX6WO6gX0bl0ORcQ3V5KL2E.jpg" },
  { name: "marshalcrews", src: "/framer/4zSmDy16IzRSRno9esnnB6zAhTQ.jpg" },
  { name: "tyson_smith", src: "/framer/XvyBh1NgD3jZmKlAeIY8g1BhJ8M.jpg" },
  { name: "ez_flipper", src: "/framer/w912QS4VpAuh4PwqKR4dRAyd4c.jpg" },
  { name: "chatwithkollar", src: "/framer/1jHzNtS2g3xCoJQVaM4KwI4C38.jpg" },
  { name: "berkyusufaydin", src: "/framer/Nwv9F6yeOC6H7iXeNfnWg8ubxg.jpg" },
  { name: "steveofallstreets", src: "/framer/fD32sIOrMYIkYlxinqYEbRCTJh4.jpg" },
  { name: "lucashedenbeck", src: "/framer/p4uYLIbQDWLHDtVEue0iXcPQMo.jpg" },
  { name: "go.detail", src: "/framer/Qs9X50JNuq0AILLbGSbJxrLJl10.jpg" },
  { name: "losilver_", src: "/framer/MU6h3fJoAPL2JrHLMcvCva8TM.jpg" },
  { name: "adrien.ninet", src: "/framer/vA1bwdDwax0gtQTCgaAilQcdt4.jpg" },
  { name: "audreyyadamsfit", src: "/framer/Ep5NOAftjnkNB3zXPC6upc0uyms.jpg" },
  { name: "ebrahim", src: "/framer/IKyceWsJspBUBQHgNqj2Vgg7Y.jpg" },
  { name: "kevinben__", src: "/framer/pCZGs0LtG8eDntDJQiErwxX6zCU.jpg" },
  { name: "ric.fit", src: "/framer/4n5ZOzl2qHdMRdWfyGk3zWw27yU.jpg" },
  { name: "lio", src: "/framer/t0RvILap1bMdeH7406RK5Py7HJg.jpg" },
];

const FORBES_URL =
  "https://www.forbes.com/sites/kolawolesamueladebayo/2026/02/13/how-ai-is-helping-creators-scale-sales-without-losing-the-personal-touch/";

const h1Class =
  "text-center font-display font-semibold tracking-[1.68px] text-ink text-[42px] leading-[46.2px] md:text-[56px] md:leading-[61.6px] lg:text-[64px] lg:leading-[70.4px]";

/** Home hero: headline, CTA, partner logos, "Trusted by" ticker and the founder video. */
export function HeroSection() {
  return (
    <section className="relative flex w-full items-center justify-center">
      <div className="flex w-full flex-1 items-center justify-center px-5 pt-14 md:px-8 md:pt-20 lg:px-[100px] lg:pt-28">
        <div className="flex w-full max-w-[1200px] flex-1 flex-col items-center gap-16">
          <div className="flex w-full flex-col items-center gap-8 md:gap-10">
            <div className="flex w-full flex-col items-center gap-5 md:gap-6">
              <Reveal y={48} delay={0.2} className="w-full">
                {/* Framer uses one h1 on phone and two stacked h1s on tablet/desktop */}
                <h1 className={`${h1Class} md:hidden`}>Stop losing money inside your DMs</h1>
                <h1 className={`${h1Class} hidden md:block`}>Stop losing money</h1>
                <h1 className={`${h1Class} hidden md:block`}>inside your DMs</h1>
              </Reveal>
              <Reveal y={48} delay={0.2} className="w-full max-w-[526px]">
                <p className="text-center text-[16px] leading-[22.4px] font-normal tracking-[-0.24px] text-gray-800 md:text-[18px] md:leading-[25.2px] lg:text-[20px] lg:leading-[28px]">
                  Organize every Instagram conversation, keep your team accountable, and turn more DMs into booked
                  calls.
                </p>
              </Reveal>
            </div>
            <Reveal y={32} delay={0.3} className="flex w-full flex-col items-center gap-6 md:w-auto">
              <Button
                variant="primaryBig"
                href="https://use.themochi.app/"
                className="w-full text-[15px]! leading-[21.75px]! tracking-[-0.3px]! md:w-auto md:text-[16px]! md:leading-[23.2px]! md:tracking-[-0.32px]! lg:text-[18px]! lg:leading-[26.1px]! lg:tracking-[-0.36px]!"
              >
                Start Free Trial
              </Button>
              <div className="flex items-center justify-center gap-10">
                <Image
                  src="/framer/JpADX97vCwReyzHtPaWQqVzpic.png"
                  alt="Meta Business Partner"
                  width={408}
                  height={160}
                  preload
                  className="h-10 w-[102px] object-contain"
                />
                <a
                  href={FORBES_URL}
                  target="_blank"
                  rel="noopener"
                  className="flex flex-col items-center justify-center gap-[9px] md:gap-[10.2128px]"
                >
                  <p className="text-[12px] leading-[10px] font-medium whitespace-pre text-ink-3 opacity-50">
                    AS SEEN IN
                  </p>
                  <ForbesLogo className="h-[21px] w-[76px] text-black" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal y={40} delay={0.35} className="relative flex w-full flex-col gap-8 md:w-[896px]">
            <div className="flex w-full items-center">
              <div className="flex shrink-0 items-center justify-center rounded-full p-2.5">
                <p className="text-[16px] leading-5 font-medium tracking-[-0.6px] whitespace-pre text-ink-3 opacity-50">
                  Trusted by
                </p>
              </div>
              <TrustedTicker users={TRUSTED_BY} />
            </div>
            <FounderVideo />
            <HeroClouds />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
