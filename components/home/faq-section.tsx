import { Reveal } from "@/components/ui/reveal";
import { FaqItem } from "@/components/home/faq-item";

export const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What makes Mochi different from ManyChat?",
    answer:
      "ManyChat is built for marketing automation. Mochi is built for Instagram sales teams. While both can automate conversations, Mochi helps you manage everything after the first message: inbox organization, AI-powered follow-up, setter accountability, conversation insights, revenue attribution and performance reporting. Every feature is designed to help you convert more Instagram conversations into customers.",
  },
  {
    question: "Is Mochi safe to use with Instagram?",
    answer:
      "Yes. Mochi connects through Meta’s official APIs and gives you complete control over your team’s access. Your setters never need your Instagram password, and you can control exactly which conversations, inboxes and accounts each team member can access. Your customer data stays organized, secure and under your control.",
  },
  {
    question: "Can I keep using ManyChat or my current tools?",
    answer:
      "Absolutely. Most teams start by connecting Mochi alongside their existing setup during the free trial. That means you can continue using your existing automations while new conversations start flowing into Mochi. Once you’re comfortable, you can gradually transition over. If you’re on a custom plan, our team can also help migrate your existing setup.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most teams are up and running in under five minutes. Simply connect your Instagram account, invite your team and start organizing conversations immediately. No onboarding call, developers or complicated implementation required.",
  },
  {
    question: "Who is Mochi built for?",
    answer:
      "Mochi is built for anyone who sells, nurtures or supports customers through Instagram DMs. Whether you’re booking sales calls, selling low-ticket products, closing high-ticket offers or simply building stronger customer relationships, Mochi helps you organize conversations, improve follow-up and understand what’s driving revenue. Whether you’re a solo founder or managing a team of setters, there’s a plan built for your workflow.",
  },
  {
    question: "Can Mochi replace my setters with AI?",
    answer:
      "Yes. Mochi includes fully autonomous AI conversations, but most teams start by using AI to assist their setters before switching to autonomous replies. As Mochi learns from your conversations, tone of voice and customer outcomes, the AI becomes increasingly personalized. Once enough data has been collected, many teams confidently automate parts of their conversations while keeping complete control over the customer experience.",
  },
  {
    question: "How does Mochi know which conversations generate revenue?",
    answer:
      "Mochi tracks the complete customer journey—from the first Instagram conversation to qualified lead, booked call and customer. That means you can see exactly which content, campaigns, setters and conversations are generating revenue instead of only measuring clicks or replies. Every new customer teaches Mochi more about what actually converts, helping you make smarter decisions over time.",
  },
  {
    question: "Why would I need Mochi if Instagram already has an inbox?",
    answer:
      "Instagram’s inbox is built for replying to messages. Mochi is built for managing an entire Instagram sales operation. Assign conversations to setters, prioritize qualified leads, automate follow-up, improve replies with AI, track performance and understand exactly what’s generating revenue—all from one place.",
  },
];

/** Framer "FAQ Section": centered heading + independent accordion items (first one open by default). */
export function FaqSection() {
  return (
    <section className="flex w-full flex-col items-center overflow-clip px-[20px] py-[48px] md:px-[32px] md:py-[64px] lg:px-[100px] lg:py-[80px]" aria-label="Frequently asked questions">
      <Reveal y={80} className="w-full max-w-[960px] lg:max-w-[1000px]">
        <div className="flex w-full flex-col items-center gap-[48px] lg:gap-[64px]">
          <h3 className="text-center font-display text-[32px] leading-[35.2px] font-semibold tracking-[1px] text-ink md:w-[416px] md:text-[40px] md:leading-[44px] md:tracking-[1.6px] lg:text-[48px] lg:leading-[52.8px]">
            Frequently asked questions
          </h3>
          <div className="flex w-full max-w-[896px] flex-col items-start gap-[10px]">
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
