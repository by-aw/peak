import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { APP_URL } from "@/lib/site";
import { ArrowRightIcon, CaretDownIcon, PlusIcon, VoiceLineIcon } from "./icons";
import { ChatTypewriter } from "./chat-typewriter";
import { MetricsFigures } from "./metrics-figures";

const LOGIN = `${APP_URL}/login?landing_page=mcp`;

const heroShadow = "shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]";
const heroShadowHover =
  "hover:shadow-[0_0_0_1px_rgba(105,70,18,0.08),0_1px_2px_0_rgba(105,45,18,0.08),0_2px_6px_0_rgba(105,37,18,0.13)]";

/**
 * Framer "Desktop" (orange, 240x50, arrow) / "Desktop/Secondary" (white, 156x49, hairline) hero buttons;
 * on phones both become "Tab/Mobile - Primary" (orange, full width, 59px tall, 16px text, arrow).
 */
function HeroButton({ href, secondary = false, children, external = false }: { href: string; secondary?: boolean; children: ReactNode; external?: boolean }) {
  const base =
    "flex h-[59px] w-full items-center justify-center gap-1 rounded-[10px] p-5 font-dm text-[16px] leading-[19.2px] font-medium whitespace-pre transition-[background-color,box-shadow] duration-200 md:h-auto md:px-5 md:py-4 md:text-[14px] md:leading-[16.8px]";
  const cls = secondary
    ? `${base} relative bg-[#da7756] text-white ${heroShadow} ${heroShadowHover} md:w-[156px] md:bg-white md:text-[#1a1612] md:shadow-none md:after:pointer-events-none md:after:absolute md:after:inset-0 md:after:rounded-[10px] md:after:border md:after:border-[rgba(26,22,18,0.1)] md:hover:bg-[#fafafa] md:hover:shadow-none`
    : `${base} bg-[#da7756] text-white md:w-[240px] ${heroShadow} ${heroShadowHover}`;
  return (
    <Link href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
      {children}
      <ArrowRightIcon className={`size-[18px] shrink-0 ${secondary ? "md:hidden" : ""}`} />
    </Link>
  );
}

/**
 * Framer "Metrics Section" of /mcp: pill, Fraunces headline, Claude composer mockup and the three live figures.
 * 1440x956 / 1024x806 / 390x1146. The copy, buttons and chat fade/slide in on load.
 */
export function McpHero() {
  return (
    <section className="relative flex w-full flex-col items-start overflow-hidden" aria-label="Your sales data, inside Claude">
      <div className="flex w-full flex-col items-start px-5 pt-12 pb-8 md:px-0 md:pt-16 md:pb-12 lg:pt-24 lg:pb-16">
        <div className="flex w-full flex-col items-center gap-12 md:gap-16 lg:gap-20">
          <div className="flex w-full max-w-[756px] flex-col items-center gap-10 lg:gap-16">
            <div className="flex w-full flex-col items-center gap-8 lg:gap-10">
              <div className="flex w-full flex-col items-center gap-3 lg:gap-4">
                <Reveal y={32} delay={0} className="flex items-center justify-center gap-2 rounded-[179px] bg-[rgba(218,119,85,0.12)] px-2.5 py-2">
                  <div className="flex items-center gap-1 overflow-clip rounded-[179px] px-3 py-px">
                    <p className="text-center font-dm text-[13px] leading-[15.6px] font-medium whitespace-pre text-[#da7755] md:text-[14px] md:leading-[16.8px]">
                      Available in Claude and ChatGPT
                    </p>
                    <ArrowRightIcon className="size-4 shrink-0 text-[#da7755]" />
                  </div>
                </Reveal>
                <div className="flex w-full flex-col items-center gap-4 lg:gap-5">
                  <Reveal y={32} delay={0.1} className="flex w-full justify-center">
                    <p className="text-center font-fraunces text-[40px] leading-[46px] font-semibold whitespace-pre-wrap text-black md:max-w-[572px] md:text-[48px] md:leading-[60px] lg:max-w-none lg:text-[56px] lg:leading-[70px]">
                      Your sales data,&nbsp;inside Claude
                    </p>
                  </Reveal>
                  <Reveal y={32} delay={0.2} className="flex w-full justify-center">
                    <p className="text-center font-dm text-[16px] leading-6 font-normal whitespace-pre-wrap text-[#6b5e4f] md:max-w-[542px] lg:max-w-[640px] lg:text-[18px] lg:leading-[27px]">
                      Connect Mochi to Claude and ask questions about your team, leads, pipeline, and revenue in plain English. Real-time data, not stale
                      exports.
                    </p>
                  </Reveal>
                </div>
              </div>
              <Reveal y={32} delay={0.3} className="flex w-full flex-col items-center justify-center gap-3 md:flex-row">
                <HeroButton href={LOGIN} external>
                  Start Free Trial
                </HeroButton>
                <HeroButton href="/demo" secondary>
                  Book a Call
                </HeroButton>
              </Reveal>
            </div>
            <Reveal y={32} delay={0.4} className="flex w-full max-w-[568px] flex-col items-center gap-4">
              <div className="relative flex w-full flex-col rounded-[24px] p-0.5">
                <Image src="/framer/GhC1na4Yv4zJeyQac5D1brz4dY.jpg" alt="" fill sizes="568px" className="rounded-[24px] object-cover" />
                <div className="relative flex h-[120px] w-full flex-col justify-between overflow-hidden rounded-[22px] bg-white p-[18px]">
                  <div className="flex h-4 w-full items-center">
                    <ChatTypewriter />
                  </div>
                  <div className="flex h-[18px] w-full items-center justify-between">
                    <PlusIcon className="size-4 shrink-0" />
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-0.5">
                        <p className="text-center font-dm text-[12px] leading-[14.4px] font-normal tracking-[-0.36px] whitespace-pre text-[#635e58]">Sonnet 4.6</p>
                        <CaretDownIcon className="size-3 shrink-0" />
                      </div>
                      <VoiceLineIcon className="size-[18px] shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="max-w-[230px] text-center font-dm text-[13px] leading-[16.9px] font-normal whitespace-pre-wrap text-[#635e58] md:max-w-none">
                Claude is AI and can make mistakes. Please double-check responses.
              </p>
            </Reveal>
          </div>
          <div className="relative flex w-full flex-col items-center px-4 after:pointer-events-none after:absolute after:inset-0 after:border-y after:border-[#e7e5e5] md:px-10 lg:px-[100px]">
            <div className="relative flex w-full max-w-[1200px] flex-col md:flex-row">
              <MetricsFigures />
              <div aria-hidden className="pointer-events-none absolute top-[121px] right-[-45px] z-[1] h-[103px] w-[68px] -rotate-[5deg] md:top-2 lg:top-[19px]">
                <Image src="/framer/NhLBNVzSf1Ll6QmPKvN3G6PxdQ.png" alt="" width={244} height={392} sizes="68px" className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
