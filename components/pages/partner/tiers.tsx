import Image from "next/image";
import { interFeatures } from "@/components/shared/inter-features";
import { Appear } from "./appear";
import { TickIcon } from "./icons";
import { sectionHeading } from "./styles";

const TIERS = [
  { label: "Tier 1", range: "0–10 active clients", rate: "15%" },
  { label: "Tier 2", range: "11–30 active clients", rate: "20%" },
  { label: "Tier 3", range: "31+ active clients", rate: "25%" },
];

const BENEFITS = ["Refer businesses that are a good fit", "Track your referrals and earnings in Mochi", "Choose cash payout or Mochi account credit"];

const NOTE =
  "Tier qualification, commission rates and duration depend on your partner agreement. Client counts do not automatically activate or upgrade a tier. For active Mochi account members. Full eligibility and payout conditions are in the partner terms shown in your account.";

/**
 * Framer "Tier N Commission Card": white 28px-radius card with a #ede8f4 hairline, 16px padding (12px on tablet), around a
 * #f7f2ff 20px-radius panel (250px minimum, 24px padding, 16px on tablet) holding the tier label, the client range, the rate
 * (Inter 700, 64px, 48px on tablet) and the caption. Rises in as it enters the viewport.
 */
function TierCard({ label, range, rate }: (typeof TIERS)[number]) {
  return (
    <Appear
      y={64}
      className="relative flex w-full flex-col items-start rounded-[28px] bg-white p-4 after:pointer-events-none after:absolute after:inset-0 after:rounded-[28px] after:border after:border-solid after:border-[#ede8f4] md:w-px md:flex-1 md:p-3 lg:p-4"
    >
      <div className="relative flex min-h-[250px] w-full flex-col items-start gap-6 overflow-hidden rounded-[20px] bg-[#f7f2ff] p-6 md:p-4 lg:p-6">
        <div className="flex w-full flex-col gap-1.5">
          <p className="w-full text-[14px] leading-[16.8px] font-medium text-[#655c73]">{label}</p>
          <p className="w-full text-[14px] leading-[21px] font-medium text-black">{range}</p>
        </div>
        <div className="flex w-full flex-col gap-2">
          <p className={`w-full ${interFeatures} text-[64px] leading-[67.2px] font-bold tracking-[-3.2px] text-[#191225] md:text-[48px] md:leading-[50.4px] md:tracking-[-2.4px] lg:text-[64px] lg:leading-[67.2px] lg:tracking-[-3.2px]`}>
            {rate}
          </p>
          <p className="w-full text-[14px] leading-[21px] font-normal text-[#655c73]">Recurring commission on qualifying payments</p>
        </div>
      </div>
    </Appear>
  );
}

/**
 * Framer "Tier Section": "Build recurring income." heading (the earnings mascot sits at its right on tablet/desktop), the
 * three tier cards (a row of 288px cards on desktop, 290.7px on tablet, stacked on phone), the benefit ticks and the
 * eligibility note. Container 896px wide; padding 80/100 (64/48 tablet, 48/20 phone); heights 710 / 715 / 1349.
 */
export function PartnerTiers() {
  return (
    <section className="relative flex w-full flex-col items-center" aria-label="Commission tiers">
      <div className="flex w-full flex-col items-center px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
        <div className="flex w-full max-w-[896px] flex-col items-center gap-6 md:gap-8">
          <Appear y={48} className="relative flex w-full flex-col items-center gap-4">
            <div className="flex w-full max-w-[524px] flex-col items-center gap-2">
              <h3 className={`w-full text-center ${sectionHeading}`}>Build recurring income.</h3>
            </div>
            <div aria-hidden className="pointer-events-none absolute top-0 right-[76px] hidden size-[72px] md:block lg:right-[164px]">
              <Image src="/framer/9IvVd7hYrirXFxGgTC9U7clLEf0.png" alt="" width={1254} height={1254} sizes="72px" className="size-full object-cover" />
            </div>
          </Appear>
          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full flex-col items-start gap-4 md:flex-row md:gap-3 lg:gap-4">
              {TIERS.map((tier) => (
                <TierCard key={tier.label} {...tier} />
              ))}
            </div>
            <ul className="flex w-full list-none flex-col gap-4 py-2 lg:flex-row lg:gap-6">
              {BENEFITS.map((text) => (
                <li key={text} className="flex w-full items-start gap-3 lg:w-px lg:flex-1">
                  <span aria-hidden className="relative block size-[18px] shrink-0">
                    <TickIcon className="absolute top-1 left-[3px] text-[#6b6b6b]" />
                  </span>
                  <p className={`min-w-0 flex-1 ${interFeatures} text-[15px] leading-[21px] font-normal tracking-[-0.3px] text-black md:text-[16px] md:leading-[22.4px] md:tracking-[-0.32px]`}>
                    {text}
                  </p>
                </li>
              ))}
            </ul>
            <Appear
              y={64}
              delay={0.2}
              phone={{ delay: 0 }}
              className="flex w-full items-center justify-center rounded-[16px] bg-[#faf8fd] px-5 py-4"
            >
              <p className="w-full text-center text-[14px] leading-[21px] font-medium text-[#655c73]">{NOTE}</p>
            </Appear>
          </div>
        </div>
      </div>
    </section>
  );
}
