import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { CalendarIcon, CreditCardAcceptIcon, LinkIcon, NewLeadsFrame, TagsIcon, UserCheckIcon } from "@/components/icons/meta-ads-icons";

type Trigger = { icon: ReactNode; title: string; description: string };

const TRIGGERS: Trigger[] = [
  { icon: null, title: "New leads", description: "When a new DM lands in your inbox" },
  { icon: <UserCheckIcon className="h-5 w-[22px]" />, title: "Qualified Leads", description: "When your setter marks the lead as qualified" },
  { icon: <CalendarIcon className="h-[22px] w-[21px]" />, title: "Booking scheduled", description: "When a call gets booked on your calendar" },
  { icon: <CreditCardAcceptIcon className="h-5 w-6" />, title: "Deal won", description: "When the deal closes - with the dollar amount attached" },
  {
    icon: <TagsIcon className="h-[22px] w-[18px]" />,
    title: "AI Tags",
    description:
      'You can create one and let AI filter the conversations for it, e.g. "Capital Confirmed" and the prompt would be something like "Lead has confirmed they have more than 5k available and are ready to invest".',
  },
  {
    icon: <LinkIcon className="h-[22px] w-4" />,
    title: "Link clicks",
    description: "e.g. everyone who received a Calendly booking link or a Coaching Mastermind Link and has clicked/ not clicked on the link can be exported and targeted.",
  },
];

/** Grey trigger card (Framer "Card"): icon row, title, description; 1px #f2f2f2 hairline. */
export function TriggerCard({ icon, title, description, titleClassName = "" }: Trigger & { titleClassName?: string }) {
  return (
    <div className="relative flex h-full w-full flex-col gap-[5px] overflow-hidden rounded-[24px] bg-gray-25 after:pointer-events-none after:absolute after:inset-0 after:rounded-[24px] after:border after:border-[#f2f2f2]">
      {icon === null ? (
        <NewLeadsFrame className="h-12 w-[320px]" />
      ) : (
        <div className="flex h-12 w-full items-center gap-2 px-6 pt-6">
          <span className="flex size-6 items-center justify-center">{icon}</span>
        </div>
      )}
      <div className="flex w-full flex-col p-6">
        <div className="flex w-full flex-col gap-4">
          <p
            className={`text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] whitespace-pre-wrap text-ink-3 md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px] lg:text-[20px] lg:leading-[24px] lg:tracking-[-0.6px] ${titleClassName}`}
          >
            {title}
          </p>
          <p className="text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] whitespace-pre-wrap text-[#383840] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Framer "Triggers Section" of /meta-ads: centered header + 2x3 grid of trigger cards.
 * 1440x1032 / 1024x965 / 390x1423 (phone: single column, no top padding).
 */
export function MetaAdsTriggers() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden px-5 pt-0 pb-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
      <div className="flex w-full max-w-[1100px] flex-col items-center gap-8 md:gap-12 lg:gap-16">
        <Reveal y={48} delay={0.2} className="w-full">
          <SectionHeader
            title="Every qualified lead, booked call and closed deal — sent to Meta automatically."
            titleClassName="max-w-[562px]"
            description="Every event fires automatically as your team works in Mochi. Nothing to install. Nothing for your setters to learn."
            descriptionClassName="max-w-[518px]"
          />
        </Reveal>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {TRIGGERS.map((t, i) => (
            <Reveal key={t.title} y={48} delay={0.2 + (i % 2) * 0.1} className="h-full">
              <TriggerCard {...t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
