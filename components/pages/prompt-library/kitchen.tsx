import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { MochiAppIcon } from "@/components/pages/mcp/icons";
import { CopyUrlButton, MCP_URL } from "./copy-url-button";
import { INTER_FEATURES } from "./hero";

const REVEAL = { delay: 0, y: 64, viewport: { once: true, amount: "some" as const } };

/** Framer's 1px #e7e7e7 border overlay (`data-border`): drawn inside the box, so it never changes the layout. */
const hairlineBase = "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border-gray-150";
const hairline = `${hairlineBase} after:border`;
const hairlineThin = `${hairlineBase} after:border-[0.5px]`;

const stepTitle = "w-full font-fraunces text-[18px] leading-7 font-semibold whitespace-pre-wrap text-[#1a1612]";
const stepText = "w-full font-dm text-[14px] leading-[22.75px] font-normal whitespace-pre-wrap text-[#6b5e4f]";

function Step({ title, children, last = false }: { title: string; children: ReactNode; last?: boolean }) {
  return (
    <div className={`relative flex w-[363px] flex-none flex-col items-start rounded-[20px] bg-white p-4 ${last ? "gap-[3.375px]" : "gap-1"} ${hairline}`}>
      <div className="flex w-full flex-none flex-col items-start">
        <p className={stepTitle}>{title}</p>
      </div>
      {children}
    </div>
  );
}

/**
 * Framer "Pick your kitchen" section: eyebrow + heading on the left, the black/white "Run via Claude" / "Run via
 * Mochi App" segmented pill on the right (inert on live too: there is no second panel), and a grey rounded card with
 * the "How to connect [Mochi] to Claude" heading and the five connection steps in a horizontally scrolling row.
 * Heights: 628 (desktop) / 622 (tablet) / 733 (phone). The section keeps 80/48 padding at every size, so on phones the
 * pill overflows to the right and is clipped by the section, as on live.
 */
export function PromptLibraryKitchen() {
  return (
    <section className="relative flex w-full flex-none items-center justify-center overflow-clip">
      <div className="flex w-px flex-[1_0_0] items-center justify-center overflow-clip px-12 py-20">
        <div className="flex w-px max-w-[1200px] flex-[1_0_0] flex-col items-center gap-12">
          <Reveal {...REVEAL} className="flex w-full flex-none items-center justify-between">
            <div className="flex w-min flex-none flex-col items-start gap-1">
              <p className={`text-[14px] leading-[18.2px] font-normal whitespace-pre text-purple-500 md:leading-[16.8px] ${INTER_FEATURES}`}>TWO WAYS TO COOK</p>
              <h4 className={`font-display text-[20px] leading-5 font-bold tracking-[-0.4px] whitespace-pre text-ink-3 md:text-[24px] md:leading-6 md:tracking-[-0.48px] lg:text-[32px] lg:leading-8 lg:tracking-[-0.64px] ${INTER_FEATURES}`}>
                Pick your kitchen
              </h4>
            </div>
            <div className={`relative flex w-min flex-none items-center justify-center gap-1 rounded-[14px] bg-[#f2f2f2] p-1 ${hairline}`}>
              <div className="pointer-events-none absolute inset-1 z-[1] flex items-center justify-start gap-1 overflow-clip rounded-[10px]">
                <div className="h-full w-[146px] flex-none rounded-[10px] bg-black" />
              </div>
              <div className="relative z-[1] flex w-min flex-none items-center justify-center overflow-clip rounded-[10px] px-4 py-3">
                <p className={`text-[15px] leading-[21.75px] font-medium tracking-[-0.15px] whitespace-pre text-white md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px] ${INTER_FEATURES}`}>Run via Claude</p>
              </div>
              <div className="relative z-[1] flex w-min flex-none items-center justify-center overflow-clip rounded-[10px] px-4 py-3">
                <p className={`text-[15px] leading-[21.75px] font-medium tracking-[-0.15px] whitespace-pre text-[rgba(82,82,82,0.8)] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px] ${INTER_FEATURES}`}>Run via Mochi App</p>
              </div>
            </div>
          </Reveal>
          <Reveal {...REVEAL} className={`relative flex w-full flex-none flex-col items-start gap-8 overflow-clip rounded-[24px] bg-[#f2f2f2] py-8 ${hairlineThin}`}>
            <Reveal {...REVEAL} className="flex w-full max-w-[554px] flex-none flex-col items-start gap-3 px-8 md:gap-2">
              <div className="flex w-full flex-none flex-wrap items-center justify-center gap-2 md:w-min md:flex-nowrap md:justify-start">
                <p className="font-fraunces text-[28px] leading-[32.2px] font-semibold whitespace-pre text-[#0d0d12]">How to connect</p>
                <MochiAppIcon className="size-14 flex-none" />
                <p className="font-fraunces text-[28px] leading-[32.2px] font-semibold whitespace-pre text-[#da7756]">
                  <span className="text-[#0d0d12]">to </span>Claude
                </p>
              </div>
              <p className="w-full max-w-[352px] font-dm text-[16px] leading-6 font-normal whitespace-pre-wrap text-[#37394a] lg:max-w-[432px] lg:text-[18px] lg:leading-[27px]">
                Add Mochi as a custom connector on claude.ai. Takes about 60 seconds.
              </p>
            </Reveal>
            <div className="flex w-full flex-none items-start gap-4 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex w-min flex-none items-start gap-4 px-8">
                <Step title="Open Connectors">
                  <p className={stepText}>Go to claude.ai → click your name (bottom-left) → Settings → Customize</p>
                  <div className="flex w-full flex-none flex-col items-start pt-1">
                    <p className="w-full font-dm text-[12px] leading-4 font-normal whitespace-pre-wrap text-[rgba(107,94,79,0.6)]">Requires Claude Pro, Max, Team, or Enterprise plan</p>
                  </div>
                </Step>
                <Step title="Add Custom Connector">
                  <p className={stepText}>Scroll to the bottom and click &quot;Add custom connector&quot;</p>
                </Step>
                <Step title="Enter the Mochi server URL">
                  <div className="flex w-full flex-none flex-col items-start pb-2">
                    <p className={stepText}>Paste this URL and click Add</p>
                  </div>
                  <div className="relative flex w-full flex-none flex-col items-center justify-center rounded-[14px] bg-purple-50 p-3 md:h-[52px]">
                    <div className="flex w-full flex-none flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
                      <p className="font-dm-mono text-[13px] leading-5 font-normal whitespace-pre text-purple-500">{MCP_URL}</p>
                      <CopyUrlButton />
                    </div>
                  </div>
                </Step>
                <Step title="Authenticate">
                  <p className={stepText}>Claude will redirect you to Mochi. Log in with your Mochi account and grant read access.</p>
                </Step>
                <Step title="Start a conversation" last>
                  <p className={stepText}>Open any new chat on claude.ai. Click the + button → Connectors → toggle Mochi on. Then ask away.</p>
                </Step>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
