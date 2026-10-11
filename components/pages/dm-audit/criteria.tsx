import { interFeatures } from "@/components/shared/inter-features";
import { StackButton } from "@/components/shared/stack-button";
import { APP_URL } from "@/lib/site";
import { Appear } from "./appear";
import { AuditImage } from "./audit-image";
import { CheckIcon } from "./icons";
import { CARD_SHADOW, footnote, sectionHeading } from "./steps";

const CRITERIA = ["Running an info business doing $20K+/month", "Getting at least 500 DMs per month", "Managing a setter or sales team", "You could make more sales but don't know how"];

/**
 * /dm-audit "Only Founders Who Fit This Criteria are Eligible:": the four-row checklist card (each row slides up in turn: 24px
 * padding, 36px #f3e8ff check bubble, Inter 500 18/27 #42424a) over a grey footer with the black "Yes, That's Me" CTA and its
 * note, with a second tilted mascot panel on its left (a third of the row on tablet/desktop, above the card on phone; it
 * overflows its column on desktop). Section padding 180/110 (180/32 tablet, 90/16 phone).
 */
export function AuditCriteria() {
  return (
    <section className="flex w-full flex-col items-center gap-10 bg-white px-4 py-[90px] md:px-8 md:py-[180px] lg:px-[110px]">
      <div className="flex w-full max-w-[1012px] flex-col items-center gap-20">
        <h2 className={sectionHeading}>Only Founders Who Fit This Criteria are Eligible:</h2>
        <div className="flex w-full flex-col items-start justify-center gap-20 md:flex-row md:items-center md:gap-8 lg:items-start lg:gap-20">
          <div className="flex w-full items-center justify-center md:w-px md:flex-[1_0_0]">
            <AuditImage
              rest={4}
              src="/framer/VsloHTC3iTLshgzvdsT9A2WnRNw.png"
              width={1324}
              height={1904}
              mask="[mask-image:radial-gradient(66%_75%,#000_77.8379%,#0000_96.937%)]"
              className="w-[330px] flex-none md:w-px md:flex-[1_0_0] lg:w-[330px] lg:flex-none"
              imageClassName="object-fill"
              sizes="(min-width: 1200px) 330px, (min-width: 810px) 310px, 330px"
            />
          </div>
          <div className={`flex w-full flex-col overflow-hidden rounded-2xl bg-white md:w-px md:flex-[2_0_0] ${CARD_SHADOW}`}>
            {CRITERIA.map((text, i) => (
              <Appear key={text} kind="row" index={i} className="flex w-full items-center gap-4 p-6">
                <div className="flex shrink-0 flex-col items-center justify-center gap-2.5 overflow-hidden rounded-full bg-purple-100 p-1.5">
                  <div className="relative aspect-square w-6 overflow-hidden">
                    <CheckIcon className="absolute top-[5px] left-1" />
                  </div>
                </div>
                <p className={`min-w-0 flex-1 text-[18px] leading-[27px] font-medium break-words text-gray-750 ${interFeatures}`}>{text}</p>
              </Appear>
            ))}
            <div className="flex w-full flex-col items-center gap-4 bg-[#f6f6f6] px-6 pt-6 pb-8">
              <div className="w-full">
                <StackButton hover="roll" size="large" variant="black" href={APP_URL} block>
                  Yes, That’s Me – Get My Free Audit
                </StackButton>
              </div>
              <p className={`${footnote} [text-wrap:balance]`}>No payment required • Takes 2 minutes to setup</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
