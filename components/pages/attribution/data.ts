import type { FaqEntry } from "@/components/shared/attribution/faq";

/** Copy of the Framer /attribution page (verbatim). */

export const FAQ: FaqEntry[] = [
  {
    question: "Does my team need to change anything?",
    answer: "No. Every link sent through Mochi is automatically wrapped into a moch.me short link. Your team pastes URLs exactly like they do now. Tracking happens invisibly behind the scenes.",
  },
  {
    question: "What if I already use Bitly?",
    answer:
      "Bitly tells you someone clicked a link. Mochi tells you which setter sent it, which lead clicked it, how long they took, what they did on your website after, and triggers a follow-up if they didn't click. You're replacing a click counter with full-lifecycle attribution.",
  },
  {
    question: "How does the Mochi Pixel work?",
    answer:
      "One line of code on your website. It tracks when a lead visits your pages, watches your training, fills a form, or completes a purchase — and connects it back to the original DM, setter, and link that started the conversation.",
  },
  {
    question: "How is this different from Hyros?",
    answer:
      "Hyros tracks which Facebook ad led to a sale. Mochi tracks which setter sent which link to which lead in a DM, what they did on your website after clicking, and whether they bought. If you sell through conversations, not landing pages, you need Mochi.",
  },
  {
    question: "Can I use links outside of DMs?",
    answer:
      "Yes. Create attribution links for stories, emails, SMS, your bio, or anywhere else. Every click is tracked back to the lead and the source. The pixel captures the web journey regardless of where the link was shared.",
  },
  {
    question: "What can I A/B test?",
    answer:
      "Everything. Test different automation messages to see which gets more replies. Test different link destinations to see which converts. Test follow-up timing. Mochi auto-promotes the winner once enough data comes in.",
  },
  {
    question: "How does the Claude integration work?",
    answer:
      "Mochi connects to Claude via MCP. Open Claude and ask questions about your links in plain English. \"Which links performed best this week?\" \"Find leads who didn't click my booking link.\" Claude queries your live Mochi data and responds instantly. No dashboards to dig through.",
  },
];

export type ComparisonValue = "yes" | "no" | { text: string; color?: string };

export type ComparisonRow = { label: string; mochi: ComparisonValue; bitly: ComparisonValue; hyros: ComparisonValue };

export const COMPARISON_COLUMNS = { bitly: "Bitly / Short.io", hyros: "Hyros" } as const;

export const COMPARISON: ComparisonRow[] = [
  { label: "Per-setter link tracking", mochi: "yes", bitly: "no", hyros: "no" },
  { label: "Auto-wrap links in DMs", mochi: "yes", bitly: "no", hyros: "no" },
  { label: "Follow-up automation on non-click", mochi: "yes", bitly: "no", hyros: "no" },
  { label: "A/B test messages + link destinations", mochi: "yes", bitly: "no", hyros: "no" },
  { label: "Website tracking pixel", mochi: "yes", bitly: "no", hyros: "yes" },
  { label: "DM to purchase attribution", mochi: "yes", bitly: "no", hyros: "no" },
  { label: "Click + geo + device analytics", mochi: "yes", bitly: "yes", hyros: "yes" },
  { label: "Custom OG previews", mochi: "yes", bitly: { text: "Paid only", color: "text-blue-500" }, hyros: "no" },
  { label: "AI assistant for link analytics (MCP)", mochi: "yes", bitly: "no", hyros: "no" },
  { label: "CRM + attribution in one platform", mochi: "yes", bitly: "no", hyros: "no" },
  { label: "Built for DM sales teams", mochi: "yes", bitly: "no", hyros: "no" },
  { label: "Price", mochi: "yes", bitly: { text: "$8-35/mo + per user" }, hyros: { text: "$99-499+/mo" } },
];
