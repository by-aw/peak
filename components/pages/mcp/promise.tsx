import { McpSection } from "./section-frame";

const BLOCKS = [
  {
    title: "Powered by Mochi Oracle",
    body: "Mochi’s natural language engine understands DM sales context. Ask questions how you’d ask a human analyst.",
  },
  {
    title: "Read-only & secure",
    body: "Every tool is read-only. Claude can query your data but never modify it. OAuth 2.0 with PKCE authentication.",
  },
  {
    title: "Real-time, not exports",
    body: "Claude pulls live data from your Mochi CRM. No CSVs, no screenshots, no stale reports.",
  },
];

/**
 * Framer second "Connector Section" of /mcp ("The Mochi Promise"): three white 16px-radius blocks with a
 * 6% hairline. 1440x407 / 1024x386 / 390x656 (container padding 64/20 on phone and tablet).
 */
export function McpPromise() {
  return (
    <McpSection label="The Mochi Promise" innerClassName="px-5 py-16 lg:px-10 lg:py-20">
      <div className="flex w-full flex-col items-center gap-8 md:gap-12 lg:gap-14">
        <p className="w-full text-center font-fraunces text-[28px] leading-10 font-semibold tracking-[-0.72px] whitespace-pre-wrap text-[#1a1612] md:text-[36px]">The Mochi Promise</p>
        <div className="flex w-full flex-col gap-4 md:flex-row">
          {BLOCKS.map((b) => (
            <div
              key={b.title}
              className="relative flex w-full flex-1 flex-col items-start overflow-hidden rounded-[16px] bg-white px-5 py-6 after:pointer-events-none after:absolute after:inset-0 after:rounded-[16px] after:border after:border-[rgba(26,22,18,0.06)] md:py-8"
            >
              <div className="flex w-full flex-col items-start gap-1">
                <p className="w-full font-fraunces text-[16px] leading-6 font-semibold whitespace-pre-wrap text-[#1a1612]">{b.title}</p>
                <p className="w-full font-dm text-[14px] leading-[19.6px] font-normal whitespace-pre-wrap text-[#645e58]">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </McpSection>
  );
}
