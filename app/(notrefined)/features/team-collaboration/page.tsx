import type { Metadata } from "next";
import { FeatureBackground } from "@/components/shared/feature-background";
import { FeatureFaq, type FaqEntry } from "@/components/shared/feature-faq";
import { MidCta } from "@/components/shared/mid-cta";
import { TEAM_COLLABORATION_CTA, TeamCollaborationHero } from "@/components/pages/team-collaboration/hero";
import { TeamCloserSection } from "@/components/pages/team-collaboration/closer";

const TITLE = "Team Collaboration for Instagram DM Teams | Mochi";
const DESCRIPTION =
  "One inbox your whole team can work. Route new leads, discuss each conversation in a private thread and hand over without losing context.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

const FAQ: FaqEntry[] = [
  {
    question: "Can I control how new leads are shared across the team?",
    answer: "Yes. Choose the percentage of new leads each person receives and change the split whenever availability or performance changes.",
  },
  {
    question: "Where can my team discuss a specific lead?",
    answer: "Each lead has a private Team Inbox thread. Tag teammates, ask questions, and keep internal notes next to the conversation without messaging the lead.",
  },
  {
    question: "What happens when another person takes over a lead?",
    answer:
      "The next person can see the conversation and Mochi’s summary of the lead’s goals, pain points, objections, and important details, so they can continue without starting over.",
  },
  {
    question: "What does Ghost Mode do?",
    answer:
      "Ghost Mode lets a manager open and review a conversation without changing its unread status for the assigned team member. The manager can see what is happening while the owner still knows the lead needs attention.",
  },
  {
    question: "How does my team know when they need to respond?",
    answer: "Mochi can send a push notification to the iOS app when a teammate tags you or a conversation needs attention. Tapping the alert opens the relevant conversation.",
  },
];

export default function TeamCollaborationPage() {
  return (
    <>
      <FeatureBackground />
      <div aria-hidden className="h-[68px] w-full md:h-[82px]" />
      <TeamCollaborationHero />
      <TeamCloserSection />
      <MidCta href={TEAM_COLLABORATION_CTA} />
      <FeatureFaq items={FAQ} />
    </>
  );
}
