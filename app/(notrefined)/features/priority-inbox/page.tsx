import type { Metadata } from "next";
import { FeatureBackground } from "@/components/shared/feature-background";
import { FeatureFaq, type FaqEntry } from "@/components/shared/feature-faq";
import { FeatureMidCta } from "@/components/shared/feature-button";
import { PRIORITY_INBOX_CTA, PriorityInboxHero } from "@/components/pages/priority-inbox/hero";
import { PriorityCloserSection, PriorityEfficiencySection } from "@/components/pages/priority-inbox/sections";

const TITLE = "Priority Inbox for Instagram DMs | Mochi";
const DESCRIPTION = "Work the leads that matter first. Mochi sorts your Instagram inbox by who is qualified and waiting instead of whoever messaged last.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

const FAQ: FaqEntry[] = [
  {
    question: "How flexible is Priority Inbox?",
    answer:
      "You choose how your team works through conversations. Combine filters such as stage, tags, and owner to focus on the people who need attention. Your business defines what matters; Mochi helps the team find those conversations.",
  },
  {
    question: "Can I use my own stages?",
    answer:
      "Yes. Mochi supports custom stages that match your sales process. Organize leads around the steps your team actually uses, from the first conversation to a customer, and use those stages to decide who needs attention next.",
  },
  {
    question: "Will my team know who is handling each lead?",
    answer:
      "Yes. Conversations can have an assigned owner, and your team can filter by that owner. This makes responsibility clear and helps people work through their own leads without having to ask who is replying.",
  },
  {
    question: "Do I have to let AI reply to my leads?",
    answer:
      "No. Your team can keep writing every reply. Priority Inbox organizes conversations, and AI Tags can help label them using your instructions. Letting AI handle replies is a separate choice.",
  },
  {
    question: "Can I keep personal conversations out of the team inbox?",
    answer:
      "Yes. You can exclude specific accounts, including friends and family, from the team’s working inbox. This helps keep personal conversations separate from the leads your team is working on.",
  },
];

export default function PriorityInboxPage() {
  return (
    <>
      <FeatureBackground />
      <div aria-hidden className="h-[68px] w-full md:h-[82px]" />
      <PriorityInboxHero />
      <PriorityCloserSection />
      <FeatureMidCta href={PRIORITY_INBOX_CTA} />
      <PriorityEfficiencySection />
      <FeatureFaq items={FAQ} />
    </>
  );
}
