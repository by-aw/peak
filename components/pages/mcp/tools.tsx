import type { ReactNode } from "react";
import { ToolCard } from "./tool-card";
import { MCP_TOOLS } from "./tools-data";

/** Fira Code chip of the Technical Notes (`readOnlyHint=True`, `today`, `7d`...). Rendered in DM Mono. */
function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-block rounded-[6px] bg-[#eef0f4] px-2 py-[3px] font-dm-mono text-[12.75px] tracking-[0.1275px] whitespace-nowrap ${className}`.trim()}>
      {children}
    </span>
  );
}

const PERIODS = ["today", "yesterday", "this_week", "last_week", "this_month", "last_month", "last_7_days", "last_14_days", "last_30_days", "last_90_days"];
const INTERVALS = ["1h", "24h", "7d", "30d", "90d"];

function ParameterBlock({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-1 flex-col items-start gap-5 overflow-clip rounded-[16px] bg-white p-4">
      <div className="flex w-full flex-col items-start gap-1 overflow-clip">
        <p className="text-[13px] leading-[18.85px] font-medium tracking-[-0.13px] whitespace-pre-wrap text-gray-550">{label}</p>
        <p className="text-[14px] leading-[21px] font-semibold whitespace-pre-wrap text-ink-3">{title}</p>
      </div>
      <div className="flex w-full flex-col items-start gap-3 overflow-clip">{children}</div>
    </div>
  );
}

/** Framer "Technical Notes" card under the tool grid. */
function TechnicalNotes() {
  return (
    <div className="flex w-full flex-col items-start gap-5 overflow-clip rounded-[24px] bg-[#fcfcfc] p-5">
      <p className="text-[15px] leading-[16.5px] font-semibold whitespace-pre-wrap text-black md:text-[16px] md:leading-[17.6px] lg:text-[18px] lg:leading-[19.8px]">Technical Notes</p>
      <div className="flex w-full flex-col items-center gap-5 overflow-clip">
        <div className="flex w-full flex-col items-start gap-2 overflow-clip">
          <p className="text-[13px] leading-[18.85px] font-medium tracking-[-0.13px] whitespace-pre-wrap text-gray-550 md:text-[14px] md:leading-[20.3px] md:tracking-[-0.14px]">
            SAFETY ANNOTATION
          </p>
          <p className="font-[sans-serif] text-[15px] leading-[25.5px] font-normal text-[#1a1a1a]">
            Every one of the 32 tools is annotated <Chip className="leading-[21.675px] text-[#1a1a1a]">readOnlyHint=True, destructiveHint=False</Chip>{" "}
            <span className="font-bold">except</span> <Chip className="leading-[21.675px] text-[#cc3333]">get_conversation_detail</Chip>, which is annotated{" "}
            <Chip className="leading-[21.675px] text-[#1a1a1a]">readOnlyHint=False</Chip> because it may generate and cache an AI summary on its first call for a given
            lead. Subsequent calls serve the cached summary, and raw message transcripts are never exposed.
          </p>
        </div>
        <div className="flex w-full flex-col items-start gap-4 overflow-clip md:flex-row">
          <ParameterBlock label="PARAMETER TYPE A" title="Standard time periods">
            <div className="flex w-full flex-wrap items-center gap-2">
              {PERIODS.map((p) => (
                <Chip key={p} className="leading-[15px] text-[#1a1a1a]">
                  {p}
                </Chip>
              ))}
            </div>
            <p className="text-[13px] leading-[19.5px] font-normal whitespace-pre-wrap text-gray-550 [&_code]:font-sans">
              Also accepts a single ISO date (<code>2026-04-15</code>) or an inclusive range (<code>2026-04-01:2026-04-15</code>).
            </p>
          </ParameterBlock>
          <ParameterBlock label="PARAMETER TYPE B" title="Rolling intervals — Link Analytics">
            <div className="flex w-full flex-wrap items-center gap-1.5">
              {INTERVALS.map((p) => (
                <Chip key={p} className="leading-[15px] font-medium text-[#0d1117]">
                  {p}
                </Chip>
              ))}
            </div>
            <p className="text-[13px] leading-[19.5px] font-normal whitespace-pre-wrap text-gray-550">
              Used only by get_link_click_analytics. Rolling window ending at now — not calendar-aligned.
            </p>
          </ParameterBlock>
        </div>
      </div>
    </div>
  );
}

/**
 * Framer "Tools Section (old)" of /mcp: white section, "Every tool, one connection" heading, a 4-column grid
 * (3 on tablet, 1 on phones) of 43 expandable tool cards and the Technical Notes card.
 * 1440x2031 / 1024x2338 / 390x5387.
 */
export function McpTools() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-white px-4 py-12 md:px-10 md:py-16 lg:px-[100px] lg:py-20" aria-label="Every tool, one connection">
      <div className="relative z-[2] flex w-full max-w-[1200px] flex-col items-center gap-8 md:gap-12 lg:gap-16">
        <div className="flex w-full max-w-[408px] flex-col items-center gap-3 lg:gap-4">
          <p className="w-full text-center font-fraunces text-[28px] leading-10 font-semibold tracking-[-0.72px] whitespace-pre-wrap text-[#1a1612] lg:text-[36px]">
            Every tool, one connection
          </p>
          <p className="max-w-[248px] text-center font-dm text-[16px] leading-6 font-normal whitespace-pre-wrap text-[#37394a] md:max-w-[290px] lg:text-[18px] lg:leading-[27px]">
            Safe by default, fully annotated. Your data stays secure.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {MCP_TOOLS.map((tool, i) => (
            <div key={`${tool.name}-${i}`} className="flex items-start">
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
        <TechnicalNotes />
      </div>
    </section>
  );
}
