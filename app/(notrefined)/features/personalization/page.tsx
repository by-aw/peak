import type { Metadata } from "next";
import { FeatureBackground } from "@/components/shared/feature-background";
import { FeatureFaq, type FaqEntry } from "@/components/shared/feature-faq";
import { FeatureMidCta } from "@/components/shared/feature-button";
import { PERSONALIZATION_CTA, PersonalizationHero } from "@/components/pages/personalization/hero";
import { PersonalizationCloserSection } from "@/components/pages/personalization/closer";

const TITLE = "Personalized Instagram DM Replies | Mochi";
const DESCRIPTION =
  "Give every reply the context of the whole conversation. Summaries, suggested responses and voice notes so messages feel personal instead of templated.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

const FAQ: FaqEntry[] = [
  {
    question: "Will the replies still sound like our business?",
    answer:
      "Mochi uses the conversation and your business instructions to suggest a reply. Your team can change the tone or wording before sending it, so the message fits both your business and the person you are speaking with.",
  },
  {
    question: "Do I have to let AI send messages for me?",
    answer:
      "No. With AI Reply Assistant, your team decides what gets sent. They can edit a suggestion or write their own reply. Letting AI handle conversations is a separate choice.",
  },
  {
    question: "Can someone else pick up a conversation without starting over?",
    answer:
      "Yes. Conversation Summaries bring together the important details, questions, and objections from the chat. The next team member can see what has already happened before replying.",
  },
  {
    question: "Do I need to record every voice note myself?",
    answer:
      "No. Your team can write a message based on the conversation and turn it into a voice note in your voice. You do not have to record a new message for every lead.",
  },
  {
    question: "Will this replace the way my team already talks to leads?",
    answer:
      "Your team can keep replying in their own way. Use summaries to catch up, ask for help when a reply is difficult, or add a voice note when it fits. You choose which tools support the conversation.",
  },
];

export default function PersonalizationPage() {
  return (
    <>
      <FeatureBackground />
      <div aria-hidden className="h-[68px] w-full md:h-[82px]" />
      <PersonalizationHero />
      <PersonalizationCloserSection />
      <FeatureMidCta href={PERSONALIZATION_CTA} />
      <FeatureFaq items={FAQ} />
    </>
  );
}
