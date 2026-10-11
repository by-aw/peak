import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRightIcon, CaretDownIcon, PlusIcon, VoiceLineIcon } from "@/components/pages/mcp/icons";
import { ChatTypewriter } from "@/components/pages/mcp/chat-typewriter";
import { CONNECTOR_URL } from "@/components/pages/mcp/connect";

const heroShadow = "shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]";
const heroShadowHover =
  "hover:shadow-[0_0_0_1px_rgba(105,70,18,0.08),0_1px_2px_0_rgba(105,45,18,0.08),0_2px_6px_0_rgba(105,37,18,0.13)]";

/**
 * Framer "Desktop" (orange, 240x50, arrow) / "Desktop/Secondary" (white, 156x49, hairline) hero buttons. Unlike /mcp
 * (which swaps to the 59px "Tab/Mobile - Primary"), /agent keeps these two variants on phones too, stretched to the
 * full width of the 350px column.
 */
function HeroButton({ href, secondary = false, children, external = false }: { href: string; secondary?: boolean; children: ReactNode; external?: boolean }) {
  const base =
    "flex w-full items-center justify-center gap-1 rounded-[10px] px-5 py-4 font-dm text-[14px] leading-[16.8px] font-medium whitespace-pre transition-[background-color,box-shadow] duration-200";
  const cls = secondary
    ? `${base} relative bg-white text-[#1a1612] after:pointer-events-none after:absolute after:inset-0 after:rounded-[10px] after:border after:border-[rgba(26,22,18,0.1)] hover:bg-[#fafafa] md:w-[156px]`
    : `${base} bg-[#da7756] text-white ${heroShadow} ${heroShadowHover} md:w-[240px]`;
  return (
    <Link href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
      {children}
      {!secondary && <ArrowRightIcon className="size-[18px] shrink-0" />}
    </Link>
  );
}

/**
 * Framer "Metrics Section" of /agent: the /mcp hero without the three live figures (pill, Fraunces headline,
 * description, two buttons and the Claude composer mockup). 1440x736 / 1024x646 / 390x732. The copy, buttons and
 * chat fade/slide in on load.
 */
export function AgentHero() {
  return (
    <section className="relative flex w-full flex-col items-start overflow-hidden" aria-label="Instagram DM sales, inside your AI agent">
      <div className="flex w-full flex-col items-start px-5 pt-12 pb-8 md:px-0 md:pt-16 md:pb-12 lg:pt-24 lg:pb-16">
        <div className="flex w-full flex-col items-center">
          <div className="flex w-full max-w-[756px] flex-col items-center gap-10 lg:gap-16">
            <div className="flex w-full flex-col items-center gap-8 lg:gap-10">
              <div className="flex w-full flex-col items-center gap-3 lg:gap-4">
                <Reveal y={32} delay={0} className="flex items-center justify-center gap-2 rounded-[179px] bg-[rgba(218,119,85,0.12)] px-2.5 py-2">
                  <div className="flex items-center gap-1 overflow-clip rounded-[179px] px-3 py-px">
                    <p className="text-center font-dm text-[13px] leading-[15.6px] font-medium whitespace-pre text-[#da7755] md:text-[14px] md:leading-[16.8px]">
                      Built for Claude, Cursor, and terminal agents
                    </p>
                    <ArrowRightIcon className="size-4 shrink-0 text-[#da7755]" />
                  </div>
                </Reveal>
                <div className="flex w-full flex-col items-center gap-4 lg:gap-5">
                  <Reveal y={32} delay={0.1} className="flex w-full justify-center">
                    <p className="text-center font-fraunces text-[40px] leading-[46px] font-semibold whitespace-pre-wrap text-black md:max-w-[572px] md:text-[48px] md:leading-[60px] lg:max-w-none lg:text-[56px] lg:leading-[70px]">
                      Instagram DM sales, inside your AI agent
                    </p>
                  </Reveal>
                  <Reveal y={32} delay={0.2} className="flex w-full justify-center">
                    <p className="text-center font-dm text-[16px] leading-6 font-normal whitespace-pre-wrap text-[#6b5e4f] md:max-w-[542px] lg:max-w-[640px] lg:text-[18px] lg:leading-[27px]">
                      Connect Mochi so agents can read live leads, pipeline, and revenue — then push humans to the right next step. Live CRM data, not a stale
                      export.
                    </p>
                  </Reveal>
                </div>
              </div>
              <Reveal y={32} delay={0.3} className="flex w-full flex-col items-center justify-center gap-3 md:flex-row">
                <HeroButton href={CONNECTOR_URL} external>
                  Connect Mochi to Claude
                </HeroButton>
                <HeroButton href="/mcp#questions" secondary>
                  See how it works
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
        </div>
      </div>
    </section>
  );
}
