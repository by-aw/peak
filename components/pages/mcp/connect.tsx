import type { ReactNode } from "react";
import { RollingButton } from "@/components/shared/rolling-button";
import { McpSection } from "./section-frame";
import { MochiAppIcon } from "./icons";
import { CopyUrlBox } from "./copy-url-box";

export const CONNECTOR_URL = "https://claude.ai/customize/connectors?modal=add-custom-connector";

/** Framer "MCP" button ("Connect Mochi to Claude"): purple rolling-text button, 48px tall. */
export function ConnectButton({ className = "" }: { className?: string }) {
  return (
    <RollingButton href={CONNECTOR_URL} target="_blank" rel="noopener" variant="purple" size="md" className={className} textClassName="font-dm">
      Connect Mochi to Claude
    </RollingButton>
  );
}

function Step({ n, title, children, last = false }: { n: number; title: string; children: ReactNode; last?: boolean }) {
  return (
    <div className="flex w-full items-start gap-4 md:gap-5">
      <div className="hidden w-10 flex-col items-center md:flex">
        <div className={`flex size-10 items-center justify-center rounded-[8px] ${last ? "bg-[#d471ff]" : "bg-[#f5f0e8]"}`}>
          <p className={`text-center font-dm text-[14px] leading-5 font-semibold whitespace-pre ${last ? "text-white" : "text-[#1a1612]"}`}>{n}</p>
        </div>
      </div>
      <div className={`flex min-w-0 flex-1 flex-col items-start rounded-[20px] bg-white p-4 ${last ? "gap-[3.375px]" : "gap-1"}`}>
        <p className="w-full font-fraunces text-[18px] leading-7 font-semibold whitespace-pre-wrap text-[#1a1612]">{title}</p>
        {children}
      </div>
    </div>
  );
}

const stepText = "w-full font-dm text-[14px] leading-[22.75px] font-normal whitespace-pre-wrap text-[#6b5e4f]";

/**
 * Framer first "Connector Section" of /mcp ("How to connect [Mochi] to Claude"): five numbered steps in white
 * cards (the number column disappears on phones), the copyable server URL, and the purple connect button.
 * 1440x1120 / 1024x1066 / 390x1228.
 */
export function McpConnect() {
  return (
    <McpSection label="How to connect Mochi to Claude">
      <div className="flex w-full flex-col items-center gap-8 md:gap-12 lg:gap-16">
        <div className="flex w-full flex-col items-center gap-3 md:w-[554px] lg:gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <p className="font-fraunces text-[28px] leading-[32.2px] font-semibold whitespace-pre text-[#0d0d12] md:text-[32px] md:leading-[36.8px] lg:text-[36px] lg:leading-[41.4px]">How to connect</p>
            <MochiAppIcon className="size-14 shrink-0" />
            <p className="font-fraunces text-[28px] leading-[32.2px] font-semibold whitespace-pre text-[#da7756] md:text-[32px] md:leading-[36.8px] lg:text-[36px] lg:leading-[41.4px]">
              <span className="text-[#0d0d12]">to</span> Claude
            </p>
          </div>
          <p className="text-center font-dm text-[16px] leading-6 font-normal whitespace-pre-wrap text-[#37394a] md:max-w-[352px] lg:max-w-[432px] lg:text-[18px] lg:leading-[27px]">
            Add Mochi as a custom connector on claude.ai. Takes about 60 seconds.
          </p>
        </div>
        <div className="flex w-full max-w-[672px] flex-col items-center gap-8 pb-6 md:gap-10 md:pb-0">
          <div className="flex w-full flex-col items-start gap-4">
            <Step n={1} title="Open Connectors">
              <p className={stepText}>Go to claude.ai → click your name (bottom-left) → Settings → Customize</p>
              <div className="flex w-full flex-col items-start pt-1">
                <p className="w-full font-dm text-[12px] leading-4 font-normal whitespace-pre-wrap text-[rgba(107,94,79,0.6)]">Requires Claude Pro, Max, Team, or Enterprise plan</p>
              </div>
            </Step>
            <Step n={2} title="Add Custom Connector">
              <p className={stepText}>Scroll to the bottom and click &quot;Add custom connector&quot;</p>
            </Step>
            <Step n={3} title="Enter the Mochi server URL">
              <div className="flex w-full flex-col items-start pb-2">
                <p className={stepText}>Paste this URL and click Add</p>
              </div>
              <CopyUrlBox />
            </Step>
            <Step n={4} title="Authenticate">
              <p className={stepText}>Claude will redirect you to Mochi. Log in with your Mochi account and grant read access.</p>
            </Step>
            <Step n={5} title="Start a conversation" last>
              <p className={stepText}>Open any new chat on claude.ai. Click the + button → Connectors → toggle Mochi on. Then ask away.</p>
            </Step>
          </div>
          <div className="flex w-full max-w-[392px] flex-col items-center gap-5">
            <ConnectButton className="w-full" />
            <p className="w-full text-center font-dm text-[14px] leading-[18.2px] font-normal whitespace-pre-wrap text-[#635e58]">
              Currently available on claude.ai (web). Desktop and mobile support coming soon. You need an active Mochi account with data to connect.
            </p>
          </div>
        </div>
      </div>
    </McpSection>
  );
}
