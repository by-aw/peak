import type { Metadata } from "next";
import { McpHero } from "@/components/pages/mcp/hero";
import { McpDemo } from "@/components/pages/mcp/demo";
import { McpQuestions } from "@/components/pages/mcp/questions";
import { McpTools } from "@/components/pages/mcp/tools";
import { McpConnect } from "@/components/pages/mcp/connect";
import { McpPromise } from "@/components/pages/mcp/promise";
import { McpCta } from "@/components/pages/mcp/cta";

const TITLE = "Mochi MCP for Claude | Mochi";
const DESCRIPTION = "Connect your real Instagram DM data to Claude and ask questions about your inbox, leads and team inside the AI you already use.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, images: [{ url: "/og/mcp.png", width: 3600, height: 1890 }] },
};

/**
 * /mcp. The Framer page root is cream (#faf8f4) rather than white, all the way down through the footer:
 * the hidden marker below recolours the route-group root (`div > main > marker`) with a `:has()` variant,
 * so nothing shared has to change.
 */
export default function McpPage() {
  return (
    <>
      <div aria-hidden className="hidden [div:has(>main>&)]:bg-[#faf8f4]" />
      <div aria-hidden className="h-[68px] w-full md:h-[68px] lg:h-[82px]" />
      <McpHero />
      <McpDemo />
      <McpQuestions />
      <McpTools />
      <McpConnect />
      <McpPromise />
      <McpCta />
    </>
  );
}
