import { FeatureFaqItem, type FaqEntry } from "@/components/shared/feature-faq";
import { interFeatures } from "@/components/shared/inter-features";
import { Appear } from "./appear";
import { sectionHeading } from "./styles";

const FAQ: FaqEntry[] = [
  {
    question: "How are my referrals tracked?",
    answer:
      "Share your personal partner link so eligible referrals can be connected to your account. Mochi records the referrals and qualifying customer payments attributed to you.",
  },
  {
    question: "How much commission do I earn?",
    answer:
      "The three commission tiers are Tier 1: 15% for 0–10 active clients; Tier 2: 20% for 11–30; and Tier 3: 25% for 31+. Tier qualification, your applicable rate and commission duration depend on your partner agreement; client counts do not automatically activate or upgrade a tier. Commission applies to qualifying customer payments, including subscription renewals. A signup or free trial alone does not earn commission.",
  },
  {
    question: "Who can join the partner program?",
    answer:
      "The program is only for people who are part of an active Mochi account. You must be at least 18 and accept the partner terms. An active Mochi subscription is required to receive payouts or use commission as account credit.",
  },
  {
    question: "How do payouts work?",
    answer:
      "Cash payouts are reviewed and processed by the Mochi team, not sent automatically. Your account must be in good standing and your Mochi subscription must be active. Full payout eligibility and conditions are in the partner terms shown in your account.",
  },
  {
    question: "Can I use commission for my own Mochi subscription?",
    answer:
      "Yes. You can choose to apply available commission to eligible charges for your own active Mochi subscription instead of receiving a cash payout. Once converted to account credit, that commission cannot also be paid as cash.",
  },
  {
    question: "What happens if a referred payment is refunded?",
    answer:
      "Commission depends on a valid qualifying customer payment. If a payment is refunded, reversed or becomes ineligible, the related commission may be adjusted or reversed.",
  },
  {
    question: "How do I get started?",
    answer:
      "Open the Partner tab in your Mochi account and read and accept the current partner terms. Then share your referral link with businesses that could use Mochi. Clearly disclose that you may earn commission when you recommend it.",
  },
];

/**
 * The /partner FAQ answers are 14px/20.3px on phone (the feature-page items render 15px/21.75px there; tablet and desktop are
 * 16/23.2 in both). `FeatureFaqItem` has no size prop, so the phone size is set from here on the answer paragraphs (the only
 * `font-normal` paragraphs in the items).
 */
const PHONE_ANSWER = "max-md:[&_p.font-normal]:text-[14px] max-md:[&_p.font-normal]:leading-[20.3px] max-md:[&_p.font-normal]:tracking-[-0.14px]";

/**
 * Framer "FAQ Section": the same accordion items as the feature pages (`FeatureFaqItem`) under a 24/32/40px heading (the
 * feature pages use 32/40/48 and a cloud strip; /partner has neither). Padding 80/100 (64/48 tablet, 48/20 phone); the
 * heading and the list each rise 48px when they enter the viewport. Heights 754 / 665 / 661.
 */
export function PartnerFaq() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-clip" aria-label="Frequently asked questions">
      <div className="flex w-full flex-col items-center overflow-clip px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
        <div className="relative z-[1] flex w-full max-w-[1000px] flex-col items-center gap-10 overflow-clip md:gap-16">
          <Appear y={48} className="flex w-full max-w-[468px] flex-col items-center gap-4">
            <div className="flex w-full flex-col items-center gap-2">
              <h3 className={`w-full max-w-[292px] text-center md:max-w-none ${sectionHeading}`}>
                Frequently Asked <span className="text-gray-550">Questions</span>
              </h3>
            </div>
          </Appear>
          <Appear y={48} className={`flex w-full max-w-[700px] flex-col items-center gap-2 overflow-clip ${interFeatures} ${PHONE_ANSWER}`}>
            {FAQ.map((item) => (
              <FeatureFaqItem key={item.question} {...item} />
            ))}
          </Appear>
        </div>
      </div>
    </section>
  );
}
