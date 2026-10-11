import { interFeatures } from "@/components/shared/inter-features";
import { StackButton } from "@/components/shared/stack-button";
import { APP_URL } from "@/lib/site";
import { Appear } from "./appear";
import { AuditImage } from "./audit-image";

const STEPS = [
  { title: "Connect your Instagram", body: "Secure, read-only access. We never post, never message, never touch your account." },
  { title: "Get Your First Insight", body: "Our intelligence reads 500+ conversations, tracks patterns, and calculates revenue impact." },
  { title: "Full Audit Ready", body: "We walk through every finding and show you exactly how to fix each issue." },
];

/** Framer card shadow (white cards of the steps and criteria lists). */
export const CARD_SHADOW =
  "shadow-[0_4px_9px_#0000000a,0_16px_16px_#00000008,0_36px_22px_#00000005,0_65px_26px_#00000003,0_101px_28px_#0000,0_0_0_0.5px_#e0e0e0]";

/** Section heading (Framer preset "4o8swl"): Clash Display 600 48/48 (36/36 on phone), 0.02em tracking, balanced, at most 600px wide. */
export const sectionHeading =
  "w-full max-w-[600px] text-center font-display text-[36px] leading-9 font-semibold tracking-[0.72px] text-ink-3 [text-wrap:balance] md:text-[48px] md:leading-[48px] md:tracking-[0.96px]";

/** Footnote under a card's CTA (Framer preset "1m3flsp"): Inter 500 16/16, #42424a, centred. */
export const footnote = "w-full text-center text-[16px] leading-4 font-medium tracking-[-0.2px] text-gray-750 [font-feature-settings:'blwf','cv03','cv04','cv09']";

/**
 * /dm-audit "It's Pretty Simple to Get Your Audit": the three-step card (white, 16px radius, at most 512px wide; each row
 * slides up in turn, 24px padding, a 40px #f3e8ff number bubble and a title + copy; 48px under the last copy) over a grey
 * footer holding the black CTA and a note, and the tilted mascot panel next to it (at most 408px wide, fades in with a
 * tween while half of it is on screen). Side by side from tablet up (gap 32 on tablet, 80 on desktop), stacked on phone.
 * Section padding 180/110/80 (180/32/80, 180/16/80 on phone).
 */
export function AuditSteps() {
  return (
    <section className="flex w-full flex-col items-center gap-10 bg-white px-4 pt-[180px] pb-20 md:px-8 lg:px-[110px]">
      <div className="flex w-full max-w-[1012px] flex-col items-center gap-20">
        <h2 className={sectionHeading}>It’s Pretty Simple to Get Your Audit</h2>
        <div className="flex w-full flex-col items-center gap-20 md:flex-row md:justify-start md:gap-8 lg:gap-20">
          <div className={`flex w-full flex-col overflow-hidden rounded-2xl bg-white md:w-px md:max-w-[512px] md:flex-[2_0_0] lg:flex-[1_0_0] ${CARD_SHADOW}`}>
            {STEPS.map((step, i) => (
              <Appear key={step.title} kind="row" index={i} className={`flex w-full items-start gap-8 p-6 ${i === STEPS.length - 1 ? "pb-12" : ""}`}>
                <div className="flex aspect-square w-10 shrink-0 flex-col items-center justify-center overflow-hidden rounded-full bg-purple-100 p-2.5">
                  <h4 className={`text-[20px] leading-7 font-semibold tracking-[-0.8px] whitespace-pre text-purple-600 ${interFeatures}`}>{i + 1}</h4>
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-4 pt-2">
                  <h4 className={`text-[20px] leading-7 font-semibold tracking-[-0.8px] text-ink-3 ${interFeatures}`}>{step.title}</h4>
                  <p className={`text-[18px] leading-[27px] font-normal break-words whitespace-pre-wrap text-ink-3 ${interFeatures}`}>{step.body}</p>
                </div>
              </Appear>
            ))}
            <div className="flex w-full flex-col items-center gap-6 bg-[#f6f6f6] p-6">
              <div className="w-full">
                <StackButton hover="roll" size="large" variant="black" href={APP_URL} block>
                  Get Your Free Audit
                </StackButton>
              </div>
              <p className={`${footnote} break-words whitespace-pre-wrap`}>You keep all the insights whether you work with us or not.</p>
            </div>
          </div>
          <div className="flex w-full items-center justify-center md:w-px md:max-w-[408px] md:flex-[1_0_0]">
            <AuditImage
              rest={-3}
              src="/framer/JYZKRK2uJpO5EcFgCyn8DsD5Cs.png"
              width={1777}
              height={2560}
              mask="[mask-image:radial-gradient(66%_75%,#000_77.1172%,#0000_95.8559%)]"
              className="w-[330px] flex-none md:w-full lg:w-[330px]"
              imageClassName="object-cover"
              sizes="(min-width: 1200px) 330px, (min-width: 810px) 408px, 330px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
