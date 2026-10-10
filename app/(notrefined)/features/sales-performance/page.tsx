import type { Metadata } from "next";
import { FeatureBackground } from "@/components/shared/feature-background";
import { CreatorCarousel } from "@/components/shared/creator-carousel";
import { FeatureFaq, type FaqEntry } from "@/components/shared/feature-faq";
import { MidCta } from "@/components/shared/mid-cta";
import { SALES_PERFORMANCE_CTA, SalesPerformanceHero } from "@/components/pages/sales-performance/hero";
import { SalesAfterCallSection, SalesCloserSection, SalesEfficiencySection } from "@/components/pages/sales-performance/sections";

const TITLE = "DM Sales Performance Dashboard | Mochi";
const DESCRIPTION =
  "See which conversations turn into booked calls, which scripts convert and how each person is performing, instead of guessing from message counts.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, images: [{ url: "/og-image.png", width: 3600, height: 1890 }] },
};

const FAQ: FaqEntry[] = [
  {
    question: "Instagram already shows me some metrics. Why do I need Mochi's data?",
    answer:
      "Instagram shows you followers and reach. Mochi shows you what actually matters for revenue: which setter books the most calls, which follow-up message converts, which leads went cold and why. Instagram can't tell you that your day-2 follow-up kills 30% of conversations — Mochi can.",
  },
  {
    question: "Do I have to manually track which message version I'm using?",
    answer:
      "Nope. You set up two versions of a message, and Mochi automatically rotates them and tracks performance. After enough sends, you'll see clear data: Message A gets 15% reply rate, Message B gets 35%. Then you kill the loser and keep testing. No spreadsheets, no manual tracking.",
  },
  {
    question: "I don't want this to feel like Big Brother. How do I position it to my team?",
    answer:
      "Totally get it. Here's how to frame it: the data protects good setters. No more arguments about \"I sent so many messages\" when there's no proof. The numbers speak for themselves. Top performers love it because their work gets recognized. Underperformers... well, they either step up or they get managed out. Either way, the team gets better.",
  },
  {
    question: "Give me the full list — what data do I get?",
    answer:
      "Here's what you can see per setter:\n\n- Messages sent (total and by day)\n- Average response time\n- Reply rates\n- Booking rates\n- Active hours\n- Leads assigned vs. leads worked\n\nAnd at the conversation level:\n\n- Which messages got replies\n- Which stage leads drop off\n- Which objections come up most\n- What day/time gets best response\n\nBasically, anything you'd want to know — you can filter and find it.",
  },
  {
    question: "Okay, I have the numbers. But what do I DO with them?",
    answer:
      "Here's the playbook:\n\n- Find what's broken: Look at where leads drop off. Is it after the opener? After the follow-up? After price is mentioned?\n- Test a fix: Create two versions of that message. Run the split test.\n- Keep the winner: Once you have clear data, roll out the winning version to everyone.\n- Repeat: Move to the next drop-off point.\n\nMost teams find one or two quick wins that boost booking rate 20-30% in the first month.",
  },
  {
    question: "I want to put this in my own spreadsheets or reporting tools. Is that possible?",
    answer:
      "Yes. You can export reports and raw data. But honestly, most teams stop using spreadsheets once they see how fast they can pull reports in Mochi. Why export to a spreadsheet when you can get the answer in 15 seconds right in the tool?\n\n",
  },
  {
    question: "My setter says they sent way more messages than the report shows. Who's right?",
    answer:
      "The system tracks everything automatically — no manual input, no EOD forms. If Mochi says they sent 47 messages, they sent 47 messages. No more \"he said, she said.\" This is actually one of the most requested features from managers: undeniable data that ends arguments.",
  },
];

export default function SalesPerformancePage() {
  return (
    <>
      <FeatureBackground />
      <div aria-hidden className="h-[68px] w-full md:h-[82px]" />
      <SalesPerformanceHero />
      <CreatorCarousel />
      <SalesCloserSection />
      <MidCta href={SALES_PERFORMANCE_CTA} />
      <SalesEfficiencySection />
      <SalesAfterCallSection />
      <FeatureFaq items={FAQ} />
    </>
  );
}
