import type { FaqEntry } from "@/components/shared/attribution/faq";
import type { LabelItem } from "@/components/shared/attribution/label";

export const LABELS: LabelItem[] = [
  { title: "Per-setter attribution.", description: "See click rates by setter. Know who's effective and who needs coaching." },
  { title: "Click latency tracking.", description: "Know if leads click in 15 minutes or 3 days. Speed correlates with intent." },
  { title: "Pipeline connected.", description: "Every click connects to a lead in your pipeline. See calls booked and deals won." },
];

export const SUMMARY =
  "The moment someone on your team sends a booking link is the most important moment in your pipeline. Everything before it is conversation. Everything after it is conversion. And right now, that moment is a black hole. You don’t know if the lead clicked, how long they took, or what happened next. Mochi turns that black hole into data — and that data tells you exactly who on your team is driving revenue and who needs help.";

export const FAQ: FaqEntry[] = [
  { question: "Do I need to create links manually?", answer: "No. Links are automatically generated when setters use the calendar icon or share any URL in the Mochi inbox. Every link is tracked from the moment it's sent." },
  { question: "Can I see which setter drives the most revenue?", answer: "Yes. Every link is attributed to the setter who sent it. You can see sends, clicks, click rate, calls booked, and revenue per setter." },
  { question: "Does it work with Calendly and Cal.com?", answer: "Yes. We wrap any URL with a moch.me tracked link. Calendly, Cal.com, iClosed, Typeform, Google Forms — anything your setters share." },
  { question: "What about custom OG images?", answer: "When creating a link in Mochi, you can set a custom title, description, and OG image. This means your links look professional when shared in Instagram DMs instead of showing a blank preview." },
];
