import { Reveal } from "@/components/ui/reveal";
import { McpSection } from "@/components/pages/mcp/section-frame";

const BLOCKS = [
  {
    title: "Powered by Mochi Oracle",
    body: "Mochi's natural language engine understands coaching sales context. Ask questions how you'd ask a human analyst.",
    from: 64,
  },
  {
    title: "Read-only & secure",
    body: "All 32 tools are read-only. Claude can query your data but never modify it. OAuth 2.0 with PKCE authentication.",
    from: 80,
  },
  {
    title: "Real-time, not exports",
    body: "Claude pulls live data from your Mochi CRM. No CSVs, no screenshots, no stale reports.",
    from: 96,
  },
];

/**
 * Framer second "Connector Section" of /agent ("Not mochi.cards"): the /mcp promise grid (three white 16px-radius
 * blocks with a 6% hairline) with different copy. The heading and each block slide up 64/64/80/96px on scroll.
 * 1440x407 / 1024x386 / 390x636.
 */
export function AgentPromise() {
  return (
    <McpSection label="Not mochi.cards" innerClassName="px-5 py-16 lg:px-10 lg:py-20">
      <div className="flex w-full flex-col items-center gap-8 md:gap-12 lg:gap-14">
        <Reveal y={64} delay={0} className="w-full">
          <p className="w-full text-center font-fraunces text-[28px] leading-10 font-semibold tracking-[-0.72px] whitespace-pre-wrap text-[#1a1612] md:text-[36px]">Not mochi.cards</p>
        </Reveal>
        <div className="flex w-full flex-col gap-4 md:flex-row">
          {BLOCKS.map((b) => (
            <Reveal
              key={b.title}
              y={b.from}
              delay={0}
              className="relative flex w-full flex-1 flex-col items-start overflow-hidden rounded-[16px] bg-white px-5 py-6 after:pointer-events-none after:absolute after:inset-0 after:rounded-[16px] after:border after:border-[rgba(26,22,18,0.06)] md:py-8"
            >
              <div className="flex w-full flex-col items-start gap-1">
                <p className="w-full font-fraunces text-[16px] leading-6 font-semibold whitespace-pre-wrap text-[#1a1612]">{b.title}</p>
                <p className="w-full font-dm text-[14px] leading-[19.6px] font-normal whitespace-pre-wrap text-[#645e58]">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </McpSection>
  );
}
