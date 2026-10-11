import type { Metadata } from "next";
import { AgentHero } from "@/components/pages/agent/hero";
import { AgentDemo } from "@/components/pages/agent/demo";
import { AgentQuestions } from "@/components/pages/agent/questions";
import { AgentTools } from "@/components/pages/agent/tools";
import { AgentConnect } from "@/components/pages/agent/connect";
import { AgentPromise } from "@/components/pages/agent/promise";
import { AgentCta } from "@/components/pages/agent/cta";

const TITLE = "Mochi MCP - The Mochi App";
const DESCRIPTION =
  "Mochi gives your team one workspace to manage conversations, prioritize buyers, follow up faster, and see what is actually happening in your inbox.";
const PATH = "/agent";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { type: "website", url: PATH, title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

/**
 * /agent, a sibling of /mcp built from the same Framer template (hero without the live figures, one wide demo
 * video, bubbles, the 43-tool grid without Technical Notes, connect guide, three promise blocks, CTA). Like /mcp
 * the Framer page root is cream (#faf8f4) all the way down through the footer: the hidden marker below recolours
 * the route-group root (`div > main > marker`) with a `:has()` variant, so nothing shared has to change.
 */
export default function AgentPage() {
  return (
    <>
      <div aria-hidden className="hidden [div:has(>main>&)]:bg-[#faf8f4]" />
      <div aria-hidden className="h-[68px] w-full md:h-[68px] lg:h-[82px]" />
      <AgentHero />
      <AgentDemo />
      <AgentQuestions />
      <AgentTools />
      <AgentConnect />
      <AgentPromise />
      <AgentCta />
    </>
  );
}
