import type { Metadata } from "next";
import { FeatureBackground } from "@/components/shared/feature-background";
import { FeatureFaq, type FaqEntry } from "@/components/shared/feature-faq";
import { HeadingAccent } from "@/components/shared/feature-heading";
import { ReplyAgentHero } from "@/components/pages/reply-agent/hero";
import { MidCta } from "@/components/pages/reply-agent/mid-cta";
import { FeatureGrid } from "@/components/pages/reply-agent/feature-grid";
import {
  BookingAutomationMockup,
  ConversationFlowMockup,
  CreatorPlaybookMockup,
  SmartEscalationMockup,
} from "@/components/pages/reply-agent/mockups-features";
import {
  AbTestMockup,
  DistributionMockup,
  ObjectionHandlingMockup,
  PlaybookConfigMockup,
} from "@/components/pages/reply-agent/mockups-operations";
import { AwayModeMockup, DebriefMockup, TagTriggeredMockup, TakeoverMockup } from "@/components/pages/reply-agent/mockups-management";

const TITLE = "Reply Agent: AI That Answers Instagram DMs | Mochi";
const DESCRIPTION =
  "AI that replies to your Instagram DMs in your voice, using the full conversation and the instructions you approve. Turn it on for every conversation or only the ones you choose, and take over any time.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

const FAQ: FaqEntry[] = [
  {
    question: "Is Reply Agent the same as AI Reply Assistant?",
    answer:
      "No. Reply Assistant writes a suggestion and waits for your team to send it. Reply Agent handles the conversation itself. You choose which conversations, and you can step in whenever you want.",
  },
  {
    question: "Can I start small instead of turning it on everywhere?",
    answer:
      "Yes. Route a percentage of new DMs to AI, compare it against your team, and scale up when you are happy with the results. You can also hand over single conversations one at a time.",
  },
  {
    question: "What happens when AI is not sure what to say?",
    answer:
      "It stops. The conversation gets flagged and your team is told exactly what to say next, so a person handles the moments that need judgment.",
  },
  {
    question: "Can I see everything it said?",
    answer:
      "Yes. Open any conversation and read every message that went out. Come back from Away Mode and you get a summary of which leads it spoke to and where they are.",
  },
  {
    question: "Will it follow up if a lead goes quiet?",
    answer: "Yes. Follow-ups are built from the lead profile and what they already told you, so they are not generic check-ins.",
  },
];

export default function ReplyAgentPage() {
  return (
    <>
      <FeatureBackground />
      <div aria-hidden className="h-[68px] w-full md:h-[82px]" />
      <ReplyAgentHero />
      <FeatureGrid
        label="AI that sells like you"
        heading={
          <>
            AI that <HeadingAccent>sells</HeadingAccent> like you.
          </>
        }
        cards={[
          {
            asset: <ConversationFlowMockup />,
            assetHeight: [302, 302, 302],
            label: "7-Stage Conversation Flow",
            title: "AI understands the sales process",
            description: "Opener → Nurture → CTA → Objection Handling → Follow-up → Booked. AI knows where each lead is and what to do next.",
          },
          {
            asset: <CreatorPlaybookMockup />,
            assetHeight: [302, 302, 302],
            label: "Creator DNA Training",
            title: "AI learns your entire selling style",
            description: "Voice profile, sales playbook, audience language, objection responses—AI absorbs it all and sells like you would.",
          },
          {
            asset: <SmartEscalationMockup />,
            assetHeight: [314, 314, 314],
            label: "Smart Escalation",
            title: "AI knows when to hand off",
            description: "Confidence below threshold? AI stops, flags the conversation, and tells your team exactly what to say next.",
          },
          {
            asset: <BookingAutomationMockup />,
            assetHeight: [320, 338, 338],
            label: "Booking Automation",
            title: "AI sends Calendly links at the right moment",
            description: "When a lead is qualified and ready, AI sends your booking link. No human needed for the straightforward ones.",
          },
        ]}
      />
      <MidCta />
      <FeatureGrid
        label="Configure. Deploy. Scale"
        heading={
          <>
            Configure. Deploy. <HeadingAccent>Scale</HeadingAccent>
          </>
        }
        cards={[
          {
            asset: <DistributionMockup />,
            assetHeight: [280, 302, 302],
            label: "Percentage-Based Distribution",
            title: "Give AI a slice of your leads",
            description: "Route 5% of new DMs to AI. Compare performance against humans. Scale up when AI outperforms your team.",
          },
          {
            asset: <PlaybookConfigMockup />,
            assetHeight: [280, 302, 302],
            label: "Playbook Config",
            title: "Tell AI exactly how to sell",
            description: "Define your qualification criteria, objection scripts, offer stack, and hard rules. AI follows your methodology precisely.",
          },
          {
            asset: <AbTestMockup />,
            assetHeight: [338, 338, 338],
            label: "A/B Testing Built In",
            title: "Test AI responses automatically",
            description: "Run experiments on different openers or objection handlers. Mochi tracks which variants actually convert.",
          },
          {
            asset: <ObjectionHandlingMockup />,
            assetHeight: [288, 338, 338],
            label: "Objection Handling",
            title: "AI handles the common pushbacks",
            description: "Price objection? Timing issue? AI responds with your playbook responses. Only escalates the tricky ones.",
          },
        ]}
      />
      <FeatureGrid
        label="Your AI. Your rules."
        heading={
          <>
            Your AI. <HeadingAccent>Your rules.</HeadingAccent>
          </>
        }
        cards={[
          {
            asset: <AwayModeMockup />,
            assetHeight: [302, 302, 302],
            label: "Away Mode",
            title: "AI covers while you sleep",
            description: "Traveling? Sick day? Weekend? AI handles conversations until you're back—then gives you a summary of everything it did.",
          },
          {
            asset: <DebriefMockup />,
            assetHeight: [302, 302, 302],
            label: "Return Summary",
            title: "Know what AI did while you were gone",
            description: "Come back from away mode and see: which leads AI talked to, where they are in the funnel, what to do next.",
          },
          {
            asset: <TakeoverMockup />,
            assetHeight: [338, 338, 338],
            label: "Takeover",
            title: "One click, AI takes over",
            description: "Click a button on any conversation. AI qualifies, nurtures, and books while you supervise. Take back control anytime.",
          },
          {
            asset: <TagTriggeredMockup />,
            assetHeight: [338, 338, 338],
            label: "Tag-Triggered",
            title: "AI handles specific lead types",
            description: 'AI talks to "nurture" or "time waster" leads. Humans handle the hot ones. You decide where AI adds value.',
          },
        ]}
      />
      <FeatureFaq items={FAQ} />
    </>
  );
}
