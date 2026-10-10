import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { ZapierSection } from "./section";
import { ArrowLeftRightIcon, CheckmarkCircleIcon, CreditCardAcceptIcon, CreditCardIcon, NewLeadFrameIcon, XCircleIcon } from "./icons";

type Trigger = { icon: ReactNode | null; title: string; pill?: string; description: string };

const TRIGGERS: Trigger[] = [
  { icon: null, title: "New Lead", pill: "Most used", description: "When a new lead is created from Instagram DMs, comments, or story mentions" },
  { icon: <ArrowLeftRightIcon className="size-[18px]" />, title: "Lead Status Changed", description: "When a lead moves through your sales funnel stages" },
  { icon: <CheckmarkCircleIcon className="size-[22px]" />, title: "Lead Won", description: "When a deal is marked as won—celebrate and sync!" },
  { icon: <XCircleIcon className="size-[21px]" />, title: "Lead Lost", description: "When a deal is lost—track reasons and learn" },
  { icon: <CreditCardIcon className="h-5 w-6" />, title: "Payment Created", description: "When a new payment is recorded for a lead" },
  { icon: <CreditCardAcceptIcon className="h-5 w-6" />, title: "Payment Paid", pill: "Revenue Signal", description: "When a payment is marked as complete" },
];

/**
 * Framer "Triggers Section" of /zapier ("Six events that power your workflows"): six #fafafa cards in a
 * 3-column grid (2 on tablet, 1 on phone); the first card's icon row is the 320x48 "New Lead" avatar frame.
 * 1440x762 / 1024x903 / 390x1419.
 */
export function ZapierTriggers() {
  return (
    <ZapierSection label="Six events that power your workflows" containerClassName="gap-8 md:gap-12 lg:gap-16">
      <Reveal y={48} delay={0.2} className="w-full">
        <SectionHeader
          title="Six events that power your workflows"
          description="Every meaningful action in your Instagram sales pipeline can trigger a Zap."
          descriptionClassName="max-w-[388px]"
        />
      </Reveal>
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {TRIGGERS.map((t) => (
          <Reveal key={t.title} y={48} delay={0.2} className="flex w-full flex-col items-start gap-[5px] overflow-hidden rounded-[24px] bg-gray-25">
            {t.icon === null ? (
              <NewLeadFrameIcon className="h-12 w-[320px] max-w-full" />
            ) : (
              <div className="flex h-12 w-full items-center gap-2 px-6 pt-6">
                <span className="flex size-6 shrink-0 items-center justify-center">{t.icon}</span>
              </div>
            )}
            <div className="flex w-full flex-col items-start p-6">
              <div className="flex w-full flex-col items-start gap-4">
                <div className="flex w-full items-center gap-2">
                  <p className="text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] whitespace-pre text-ink-3 md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px] lg:text-[20px] lg:leading-6 lg:tracking-[-0.6px]">
                    {t.title}
                  </p>
                  {t.pill && (
                    <span className="flex items-center justify-center rounded-[24px] bg-[#faf5ff] px-3 py-1.5">
                      <p className="text-[13px] leading-[16.9px] font-medium tracking-[-0.2px] whitespace-pre text-purple-500">{t.pill}</p>
                    </span>
                  )}
                </div>
                <p className="w-full text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] whitespace-pre-wrap text-[#383840] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
                  {t.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </ZapierSection>
  );
}
