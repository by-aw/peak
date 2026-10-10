import type { ReactNode } from "react";
import { CONTAINER, WRAPPER, line } from "@/components/shared/attribution/grid";
import { FeatureText } from "./feature-text";
import { ClaudeChatCard, EditLinkCard, FollowUpPreview, JourneyCard, LeadsFilteredCard, SkewedImages } from "./features-mockups";

type Feature = {
  title: string;
  tag?: string;
  description: string;
  items: string[];
  mockup: ReactNode;
  /** Classes of the "Image Frame" (padding, fixed/min height and mask differ per card). */
  frameClassName: string;
  /** Padding overrides for the text block (one Framer phone variant keeps the 24px padding). */
  textClassName?: string;
};

const mask = (a: number, b: number) => `[mask-image:linear-gradient(#000_${a}%,rgba(0,0,0,0)_${b}%)]`;

const ROWS: Feature[][] = [
  [
    {
      title: "Auto-wrap every link. Zero workflow change.",
      description: "Any URL your team sends through Mochi is automatically converted into a short moch.me link with full attribution tracking.",
      items: [
        "Custom OG image, title, and description per link",
        "Branded short links via moch.me — auto-generated or custom slugs",
        "Works with Calendly, Typeform, YouTube, Whop, and any URL",
        "Rich link previews that boost click-through in DMs",
        "A/B test different link destinations to see what converts",
      ],
      mockup: <EditLinkCard />,
      frameClassName: `px-4 pt-10 pb-6 md:min-h-[440px] md:px-6 md:pt-16 ${mask(69, 86)}`,
    },
    {
      title: "Didn't click? Auto follow up. Then A/B test what works.",
      description: "When a lead gets a link and doesn't click within your timeframe, Mochi triggers an automated follow-up.",
      items: [
        "Custom time triggers (1 hour, 6 hours, 24 hours)",
        "A/B test follow-up messages — Mochi picks the winner automatically",
        "A/B test different link destinations to optimize conversions",
        "Track recovery rate to see exactly how many cold leads come back",
        "Simulate button: AI analyzes your copy and suggests improvements",
      ],
      mockup: <FollowUpPreview />,
      frameClassName: `px-4 pt-10 pb-6 md:h-[440px] md:px-6 md:pt-12 ${mask(82, 95)}`,
    },
  ],
  [
    {
      title: "See everything. Per setter. Per lead. Per link.",
      description: "Real-time analytics that show exactly who clicked what, how fast, and from where. Broken down by setter so you can coach based on data, not gut feeling.",
      items: [
        "Click rate and time-to-click per link, per setter",
        "Geographic and device breakdowns",
        "Lead-level click timeline with exact timestamps",
        "Setter leaderboard ranked by link performance",
        "Filter your entire lead database by link activity",
      ],
      mockup: <SkewedImages />,
      frameClassName: "p-0",
    },
    {
      title: "Filter by what they did. Not what they said.",
      description: "Your lead database becomes searchable by behaviour. Find every lead who received your booking link but didn't click.",
      items: [
        "Filter: \"received link X but didn't click\" — retarget them",
        "Filter: \"clicked training but didn't reach checkout\" — follow up",
        "Filter: \"purchased\" — attribute revenue back to setter and source",
        "Cross-reference link and pixel data with funnel stage",
        "Export segments for retargeting or manual outreach",
      ],
      mockup: <LeadsFilteredCard />,
      frameClassName: `h-[376px] justify-center px-6 pt-10 pb-6 ${mask(62, 91)}`,
      textClassName: "px-6! pb-12!",
    },
  ],
  [
    {
      title: "Track beyond the DM.",
      tag: "New",
      description: "Drop the Mochi Pixel on your thank you page, checkout, or application form. Now you see not just \"did they click the link\" but \"did they actually buy.\"",
      items: [
        "One snippet on your website — tracks page visits, form fills, purchases",
        "Every event tied back to the original lead, setter, and link",
        "See which DM content actually drives revenue, not just clicks",
        "Use attribution links in stories, emails, SMS, bio — not just DMs",
        "Full web journey: landing page visited, training watched, checkout reached",
      ],
      mockup: <JourneyCard />,
      frameClassName: "h-[376px] gap-2 px-4 pt-10 pb-6 md:px-6",
    },
    {
      title: "Ask Claude about your links.",
      tag: "New",
      description: "Mochi connects directly to Claude via MCP. Instead of digging through dashboards, just ask: \"Which link had the highest click rate this week?\".",
      items: [
        "Natural language questions about link performance, click rates, setter rankings",
        "Ask for lead segments based on link behavior — Claude filters for you",
        "Get AI-generated insights: \"Your booking link click rate dropped 12% this week — here's why\"",
        "Works in Claude Desktop, Claude.ai, or any MCP-compatible client",
        "Your data stays yours — queries run against your Mochi account in real time",
      ],
      mockup: <ClaudeChatCard />,
      frameClassName: `min-h-[376px] justify-center p-4 md:p-6 ${mask(74, 87)}`,
    },
  ],
];

/**
 * Framer "Features Section" of /attribution: three rows of two feature cards (mockup frame + text block)
 * inside the grid lines; cards stack on tablet and phone.
 */
export function FeaturesSection() {
  return (
    <section className="flex w-full flex-col items-center">
      <div className={`${WRAPPER} ${line("after:border-b")}`}>
        <div className={`${CONTAINER} flex flex-col items-center`}>
          {ROWS.map((row, r) => (
            <div key={r} className={`${line("after:border-x after:border-b")} flex w-full flex-col items-start lg:flex-row`}>
              {row.map((card, c) => (
                <div key={card.title} className={`${line(c === 0 ? "after:border-r after:border-b lg:after:border-b-0" : "after:border-r")} flex w-full flex-col items-start overflow-hidden lg:flex-1 lg:basis-0`}>
                  <div className={`flex w-full flex-col items-center overflow-hidden ${card.frameClassName}`}>{card.mockup}</div>
                  <FeatureText title={card.title} tag={card.tag} description={card.description} items={card.items} className={card.textClassName} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
