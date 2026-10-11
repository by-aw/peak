import type { FaqEntry } from "@/components/shared/feature-faq";

/** Live "Book a Demo" destination (Framer link to the /demo page). */
export const DEMO_HREF = "/demo";

/** /vsl hero headline (also the phone headline of /vsl-2, which live never updated). */
export const VSL_HEADLINE = "How I collected 600K in one month by fixing one thing in my appointment setting system";
export const VSL_PHONE_LINES = ["How I collected 600K in one month", "by fixing one thing in my appointment setting system"] as const;
/** /vsl-2 tablet/desktop headline. */
export const VSL2_HEADLINE = "How I went from $135K to $270K a month by optimizing one KPI in my setter system";

export type FeatureCardData = {
  title: string;
  body: string;
  /** Purple ROI line under the description. */
  info: string;
  /** "More Details" bullets shown when the card is open (Framer's details1..5, empty ones dropped). */
  details: string[];
};

/** "Card Features" grid of the Benefits section (same on /vsl, /vsl-2 and /thank-you-pdf, duplicates kept as on live). */
export const FEATURE_CARDS: FeatureCardData[] = [
  {
    title: "AI-Powered Setting",
    body: "So that your leads get answered instantly, 24/7, without hiring more setters.",
    info: "Replacing one setter saves $2K–$4K/month",
    details: [
      "AI Suggestions — so that your setters never stare at a blank screen. One-click responses based on what actually gets replies.",
      "AI Mode — so that lower-priority leads get qualified automatically while your setter focuses on hot prospects.",
      "Away Mode — so that leads don't go cold during lunch, sleep, or weekends. AI covers every gap.",
      "The Mochi Way — so that AI learns from YOUR data first. You control the pace: data collection → hybrid → autonomous.",
    ],
  },
  {
    title: "AI Voice Clones",
    body: "So that your leads hear the creator's actual voice in their DMs and feel a real connection, even at scale.",
    info: "One extra call/week at $5K AOV = $20K+/month",
    details: [
      "Setter types a message, Mochi converts it to a native Instagram voice note in the founder's voice. Leads can't tell the difference.",
      "So that you get the conversion power of personal voice notes without the founder spending a single minute in the inbox.",
    ],
  },
  {
    title: "Full Pipeline Dashboard",
    body: "So that you see exactly where leads drop off and know what to fix — instead of guessing from EOD forms and spreadsheets.",
    info: "A 5% booking rate gap = $50K–$90K/month unrealized",
    details: [
      "A 5% booking rate gap = $50K–$90K/month unrealized",
      "Per-setter breakdown — so that you hold setters accountable with real numbers instead of vibes.",
      "Filter by time, setter, tag, or source — so that you drill into exactly what's working.",
    ],
  },
  {
    title: "Smart Lead Intelligence",
    body: "So that your team knows who's hot, who's qualified, and who's wasting their time — without reading every conversation.",
    info: "Setters reclaim 30–40% of time spent on dead leads",
    details: [
      "AI Summaries — pain points, desires, and red flags in one click instead of scrolling 50 messages.",
      "AI Summaries — pain points, desires, and red flags in one click instead of scrolling 50 messages.",
      "AI Summaries — pain points, desires, and red flags in one click instead of scrolling 50 messages.",
    ],
  },
  {
    title: "AI Follow-Ups",
    body: "So that no qualified lead goes cold because someone forgot. Mochi references the actual conversation, not a template.",
    info: "5–10 lost leads/week at $5K = $25K–$50K walking away",
    details: [
      "Trigger-based: tag + status + time since last reply — follow-ups fire at the right moment automatically.",
      "AI reads the full conversation and writes a personalized follow-up referencing the lead's specific situation.",
    ],
  },
  {
    title: "Source Attribution & Script Testing",
    body: "So that you know exactly which post, story, reel, or outbound campaign is actually making you money.",
    info: "Stop wasting $10K+/month on content that doesn't convert",
    details: [
      "Source-level tracking — stop guessing which content drives revenue.",
      "A/B test scripts with real reply-rate data — optimize on numbers, not gut feel.",
      "Outbound tracking — reply rates and qualification per campaign.",
    ],
  },
  {
    title: "Workflow & Integrations",
    body: "So that your entire DM operation runs from one platform instead of five tabs and a spreadsheet.",
    info: "Replaces your CRM, EOD forms, setter spreadsheets, and half your Slack",
    details: [
      "Calendly integration — auto-qualify on link send, auto-update on booking. Zero manual status changes.",
      "Team chat + lead notes — communicate about specific leads without leaving Mochi.",
      "Lead distribution — your best setters get more leads, new hires get a manageable load.",
      "Setter SOP builder — stage-based workflows inside the tool instead of a Google Doc they never open.",
      "Close Friends privacy — founder's personal conversations stay hidden from setters.",
    ],
  },
];

/** FAQ of /vsl and /vsl-2 (same Framer FAQ item component as the feature pages). */
export const VSL_FAQ: FaqEntry[] = [
  {
    question: "How fast will I actually see results?",
    answer:
      "Within the first week you'll have full visibility on every conversation in your pipeline. Your setters will know exactly who to follow up with, what stage each lead is in, and what's been missed. Once they're used to it, fewer leads slip through immediately.",
  },
  {
    question: "Will this work alongside the CRM I'm already using?",
    answer:
      "Yes. We have a Zapier connection, so if you're using GHL, Airtable, or another CRM, we can set up an automation that fills out your forms or tables automatically. Mochi handles the DM layer — your existing stack stays intact.",
  },
  {
    question: "Do I need a ton of DM volume for this to be worth it?",
    answer:
      "Mochi is built for teams already running DM-based sales at scale. If you're doing organic outreach, DM ads, or driving traffic into conversations, this will immediately tighten your pipeline. If you're not actively generating DM volume yet, this probably isn't the right tool for you — we're optimized for 6-figure+ founders who already have conversations happening.",
  },
  {
    question: "What actually happens on the call?",
    answer:
      "Is someone going to hard-sell me? No pitch deck, no pressure. We look at how your setter team currently operates, where leads are leaking, and whether Mochi is actually a fit. If it's not, we'll tell you. The call takes about 30 minutes and you'll walk away with clarity on your DM pipeline either way.",
  },
  {
    question: "We're on ManyChat right now — can we switch over easily?",
    answer:
      "Yes, and most of our clients came from ManyChat. The transition is simple because they solve different problems — ManyChat automates message blasts, Mochi manages your setter team and tracks every conversation through a pipeline. You can run both during the transition if needed.",
  },
  {
    question: "What makes this different from ManyChat or GoHighLevel?",
    answer:
      "ManyChat sends messages. GHL is a general agency CRM. Neither is designed for managing a team of setters working Instagram DMs for high-ticket offers. Mochi is purpose-built for that — AI-powered conversation tracking, setter performance visibility, and smart follow-up inside the DM workflow your team already uses.",
  },
  {
    question: "What if I'm not technical at all?",
    answer:
      "You don't need to be. The onboarding team handles the full setup and your setters get trained on the interface. If you can use Instagram, you can use Mochi.",
  },
];

/** Instagram reels of the /thank-you-pdf "See how coaches use Mochi" section, in desktop order. */
export const COACH_REELS = [
  "https://www.instagram.com/reel/DWBX6gYDMJ2/",
  "https://www.instagram.com/reel/DTN8Uitj9mY/",
  "https://www.instagram.com/reel/DVGM3XzDwOM/",
  "https://www.instagram.com/reel/DVOAJC-iE_7/",
] as const;
