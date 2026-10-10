import type { FaqEntry, LabelItem } from "@/components/shared/attribution";

export const LABELS: LabelItem[] = [
  { title: "Full journey timeline.", description: "Every touchpoint from first click to close, in chronological order." },
  { title: "AI lead scoring.", description: "Scored 0-100 based on content engagement, web behavior, DM responsiveness, and pipeline progression." },
  { title: "Pre-call briefs.", description: "Your closer sees everything about a lead before picking up the phone." },
];

export const SUMMARY = [
  "Your closers shouldn’t walk into calls blind. They shouldn’t ask “so, how did you hear about us?” when you already know the lead watched 3 YouTube videos, spent 14 minutes on your VSL, filled out an application, and told your setter they’re worried about time commitment. ",
  "All of that information exists. It’s just scattered across Instagram, YouTube Analytics, your website, and your closer’s memory. Mochi puts it in one place, scores it, and generates a brief your closer can read in 30 seconds before picking up the phone. That’s the difference between a $3,000 close and a missed opportunity.",
];

export const FAQ: FaqEntry[] = [
  {
    question: "How does lead scoring work?",
    answer:
      "Every lead gets a score from 0-100 based on four weighted dimensions: content engagement (30 pts), website behavior (25 pts), DM responsiveness (25 pts), and pipeline progression (20 pts). The score updates in real time as the lead interacts with your content, responds to messages, and moves through your pipeline.",
  },
  {
    question: "Can my closers see the pre-call brief?",
    answer:
      "Yes. Before every scheduled call, the assigned closer sees an AI-generated brief in Mochi with the lead's full journey, key DM topics, detected objections, and a recommended approach. No extra setup needed — it generates automatically from existing data.",
  },
  {
    question: "What happens when an unknown visitor identifies themselves?",
    answer:
      "The moment a visitor fills out a form (captured by the pixel), sends a DM (captured via Instagram API), or is matched via email, their anonymous profile merges with their real identity. All previous anonymous activity — page visits, scroll depth, time on page — attaches to their named profile retroactively.",
  },
  {
    question: "How do you match YouTube viewers to IG leads?",
    answer:
      "Through session stitching. When someone clicks a tracked link in your YouTube description, we set a cookie. If they later visit a page with your pixel and submit a form, we capture their email and link it to the original YouTube click. If they then DM you, we match the email to their IG identity. The profile shows the complete journey.",
  },
  {
    question: "Can I sort leads by score?",
    answer: "Yes. The lead list can be sorted by score, revenue, recency, source channel, or pipeline stage. You can also filter by score ranges to focus on your hottest leads.",
  },
  {
    question: "Does the score affect anything automatically?",
    answer: "The score is used in Reply Agent suggestions (higher-scored leads get prioritized responses) and in follow-up reminders.",
  },
];
