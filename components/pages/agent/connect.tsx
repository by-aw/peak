import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { McpSection } from "@/components/pages/mcp/section-frame";
import { MochiAppIcon } from "@/components/pages/mcp/icons";
import { CopyUrlBox } from "@/components/pages/mcp/copy-url-box";
import { ConnectButton } from "@/components/pages/mcp/connect";

function Step({ n, title, children, last = false, from }: { n: number; title: string; children: ReactNode; last?: boolean; from: number }) {
  return (
    <Reveal x={-from} y={0} delay={0} className="flex w-full items-start gap-4 md:gap-5">
      <div className="hidden w-10 flex-col items-center md:flex">
        <div className={`flex size-10 items-center justify-center rounded-[8px] ${last ? "bg-[#d471ff]" : "bg-[#f5f0e8]"}`}>
          <p className={`text-center font-dm text-[14px] leading-5 font-semibold whitespace-pre ${last ? "text-white" : "text-[#1a1612]"}`}>{n}</p>
        </div>
      </div>
      <div className={`flex min-w-0 flex-1 flex-col items-start rounded-[20px] bg-white p-4 ${last ? "gap-[3.375px]" : "gap-1"}`}>
        <p className="w-full font-fraunces text-[18px] leading-7 font-semibold whitespace-pre-wrap text-[#1a1612]">{title}</p>
        {children}
      </div>
    </Reveal>
  );
}

const stepText = "w-full font-dm text-[14px] leading-[22.75px] font-normal whitespace-pre-wrap text-[#6b5e4f]";

/**
 * Framer first "Connector Section" of /agent (`#set-up`): the /mcp connect guide with a "How it works [icon]
 * Connect. Ask. Act." title (the second half is 36px at every breakpoint and wraps under the icon on phones) and a
 * different footnote. Five numbered steps slide in from the left (64-128px) on scroll. 1440x1102 / 1024x1072 / 390x1243.
 */
export function AgentConnect() {
  return (
    <div id="set-up" className="w-full scroll-mt-24">
      <McpSection label="How it works">
        <div className="flex w-full flex-col items-center gap-8 md:gap-12 lg:gap-16">
          <Reveal y={64} delay={0} className="flex w-full flex-col items-center gap-3 md:w-[554px] md:gap-4">
            <div className="flex flex-wrap items-center justify-center gap-2 md:flex-nowrap">
              <p className="font-fraunces text-[28px] leading-[32.2px] font-semibold whitespace-pre text-[#0d0d12] md:text-[32px] md:leading-[36.8px] lg:text-[36px] lg:leading-[41.4px]">How it works</p>
              <MochiAppIcon className="size-14 shrink-0" />
              <p className="font-fraunces text-[36px] leading-[41.4px] font-semibold whitespace-pre text-[#0d0d12]">Connect. Ask. Act.</p>
            </div>
            <p className="text-center font-dm text-[16px] leading-6 font-normal whitespace-pre-wrap text-[#37394a] md:max-w-[352px] lg:max-w-[432px] lg:text-[18px] lg:leading-[27px]">
              Add https://mcp.themochi.app/mcp/ as a Claude connector — or follow docs for your agent.
            </p>
          </Reveal>
          <div className="flex w-full max-w-[672px] flex-col items-center gap-8 pb-6 md:gap-10 md:pb-0">
            <div className="flex w-full flex-col items-start gap-4">
              <Step n={1} title="Open Connectors" from={64}>
                <p className={stepText}>Go to claude.ai → click your name (bottom-left) → Settings → Customize</p>
                <div className="flex w-full flex-col items-start pt-1">
                  <p className="w-full font-dm text-[12px] leading-4 font-normal whitespace-pre-wrap text-[rgba(107,94,79,0.6)]">Requires Claude Pro, Max, Team, or Enterprise plan</p>
                </div>
              </Step>
              <Step n={2} title="Add Custom Connector" from={80}>
                <p className={stepText}>Scroll to the bottom and click &quot;Add custom connector&quot;</p>
              </Step>
              <Step n={3} title="Enter the Mochi server URL" from={96}>
                <div className="flex w-full flex-col items-start pb-2">
                  <p className={stepText}>Paste this URL and click Add</p>
                </div>
                <CopyUrlBox />
              </Step>
              <Step n={4} title="Authenticate" from={112}>
                <p className={stepText}>Claude will redirect you to Mochi. Log in with your Mochi account and grant read access.</p>
              </Step>
              <Step n={5} title="Start a conversation" last from={128}>
                <p className={stepText}>Open any new chat on claude.ai. Click the + button → Connectors → toggle Mochi on. Then ask away.</p>
              </Step>
            </div>
            <Reveal y={64} delay={0} className="flex w-full max-w-[392px] flex-col items-center gap-5">
              <ConnectButton className="w-full" />
              <p className="w-full text-center font-dm text-[14px] leading-[18.2px] font-normal whitespace-pre-wrap text-[#635e58] opacity-75">
                Claude.ai connectors today. Any agent can use MCP or the skill/docs path. Auth always required.
              </p>
            </Reveal>
          </div>
        </div>
      </McpSection>
    </div>
  );
}
