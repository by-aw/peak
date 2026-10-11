import { Reveal } from "@/components/ui/reveal";
import { ToolCard } from "@/components/pages/mcp/tool-card";
import { MCP_TOOLS } from "@/components/pages/mcp/tools-data";

/**
 * Framer "Tools Section (old)" of /agent: white section, "MCP-native — 32 read-only tools" heading and the same
 * 4-column grid (3 on tablet, 1 on phones) of 43 expandable tool cards as /mcp, without the Technical Notes card.
 * The heading and the grid each fade in with a 64px slide on scroll. 1440x1534 / 1024x1898 / 390x4554.
 */
export function AgentTools() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-white px-4 py-12 md:px-10 md:py-16 lg:px-[100px] lg:py-20" aria-label="MCP-native — 32 read-only tools">
      <div className="relative z-[2] flex w-full max-w-[1200px] flex-col items-center gap-8 md:gap-12 lg:gap-16">
        <Reveal y={64} delay={0} className="flex w-full max-w-[408px] flex-col items-center gap-3 md:gap-4">
          <p className="w-full text-center font-fraunces text-[28px] leading-10 font-semibold tracking-[-0.72px] whitespace-pre-wrap text-[#1a1612] md:text-[32px] lg:text-[36px]">
            MCP-native — 32 read-only tools
          </p>
          <p className="max-w-[248px] text-center font-dm text-[16px] leading-6 font-normal whitespace-pre-wrap text-[#37394a] md:max-w-[290px] lg:text-[18px] lg:leading-[27px]">
            OAuth. No silent writes. Agents query; humans approve.
          </p>
        </Reveal>
        <Reveal y={64} delay={0} className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {MCP_TOOLS.map((tool, i) => (
            <div key={`${tool.name}-${i}`} className="flex items-start">
              <ToolCard tool={tool} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
