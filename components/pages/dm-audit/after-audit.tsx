import Image from "next/image";
import { interFeatures } from "@/components/shared/inter-features";
import { StackButton } from "@/components/shared/stack-button";
import { APP_URL } from "@/lib/site";
import { Appear } from "./appear";
import { sectionHeading } from "./steps";

/** Option card title (Framer preset "gw09gp"): Inter 600, 24/28.8 (22/26.4 tablet, 20/24 phone), no font features. */
const optionTitle = "w-full text-left text-[20px] leading-6 font-semibold tracking-[-0.4px] text-ink-3 md:text-[22px] md:leading-[26.4px] md:tracking-[-0.44px] lg:text-[24px] lg:leading-[28.8px] lg:tracking-[-0.48px]";

/**
 * /dm-audit "What Happens After The Audit" (#fafafa band, padding 180/110, 180/32 tablet, 90/16 phone): heading + lead, then the
 * two option cards (24px radius, #fafafa, 1px hairline drawn above the content; row on tablet/desktop with a 32px gap,
 * stacked on phone), the second one "Recommended" with a purple border, shadow and pill, and a black CTA 80px under them.
 * The cards slide up in turn (second 0.1s later).
 */
export function AuditAfter() {
  return (
    <section className="flex w-full flex-col items-center gap-10 bg-[#fafafa] px-4 py-[90px] md:px-8 md:py-[180px] lg:px-[110px]">
      <div className="flex w-full max-w-[1012px] flex-col items-center gap-20">
        <div className="flex w-full max-w-[752px] flex-col items-center gap-6">
          <h2 className={`${sectionHeading} max-w-none`}>What Happens After The Audit</h2>
          <p className={`w-full text-center text-[18px] leading-[27px] font-normal break-words whitespace-pre-wrap text-ink-3 ${interFeatures}`}>
            You book a 30-minute call. We show you everything we found. Then you decide:
          </p>
        </div>
        <div className="flex w-full flex-col items-start justify-center gap-8 md:flex-row">
          <Appear kind="row" index={0} className="relative flex w-full flex-col items-center overflow-hidden rounded-3xl bg-[#fafafa] md:w-px md:flex-[1_0_0] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-[#0000001a] after:content-['']">
            <div className="relative aspect-[1.56634] w-full overflow-hidden">
              <Image src="/framer/TdVbAfA14Ftnu6cNwbFIpluxbo8.png" alt="" width={1936} height={1236} sizes="(min-width: 1200px) 490px, (min-width: 810px) 464px, 358px" className="absolute inset-0 h-full! w-full object-fill" />
            </div>
            <div className="flex w-full flex-col gap-9 p-8">
              <p className={`text-[14px] leading-5 font-medium whitespace-pre text-[#3b82f6] ${interFeatures}`}>Option 1</p>
              <p className={`${optionTitle} break-words whitespace-pre-wrap`}>Take the insights and fix it yourself. Keep everything we showed you.</p>
            </div>
          </Appear>
          <Appear
            kind="row"
            index={1}
            className="relative flex w-full flex-col items-center overflow-hidden rounded-3xl bg-[#fafafa] shadow-[0_4px_9px_#5a09a90a,0_16px_16px_#5b0aaa08,0_36px_22px_#2c005605,0_65px_26px_#2c005603,0_101px_28px_#2c005600,0_0_0_0.5px_#e0e0e0] md:w-px md:flex-[1_0_0] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-purple-500 after:content-['']"
          >
            <div className="relative aspect-[1.56634] w-full overflow-hidden">
              <Image src="/framer/qoirTsoWeVggjPiy3GcybUYAqNI.png" alt="" width={1936} height={1236} sizes="(min-width: 1200px) 490px, (min-width: 810px) 464px, 358px" className="absolute inset-0 h-full! w-full object-fill" />
            </div>
            <div className="flex w-full flex-col gap-6 p-8">
              <div className="flex w-full items-center justify-between">
                <p className={`text-[14px] leading-5 font-medium whitespace-pre text-purple-500 ${interFeatures}`}>Option 2</p>
                <div className="relative flex flex-col items-center justify-center gap-2 rounded-full bg-purple-500 px-3 py-2 after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-purple-600 after:content-['']">
                  <p className={`text-[14px] leading-[14px] font-normal tracking-[-0.3px] whitespace-pre text-white ${interFeatures}`}>Recommended</p>
                </div>
              </div>
              <p className={`${optionTitle} break-words whitespace-pre-wrap`}>We install Mochi (our intelligence platform) and handle it for you 24/7.</p>
            </div>
          </Appear>
        </div>
        <StackButton hover="roll" size="large" variant="black" href={APP_URL}>Get Your Free Audit</StackButton>
      </div>
    </section>
  );
}
