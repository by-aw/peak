import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { ZapierSection } from "./section";
import { DatabaseIcon, LockIcon, MailOpenIcon, PassportIcon, PeerToPeerIcon, TagIcon, TimeIcon, UserIcon } from "./icons";

type Block = { icon: ReactNode; title: string; fields: string[]; centered?: boolean };

const BLOCKS: Block[] = [
  { icon: <UserIcon className="h-[13px] w-3" />, title: "Lead info", fields: ["Instagram username", "Full name", "Profile picture URL"] },
  { icon: <MailOpenIcon className="size-[15px]" />, title: "Contact Details", fields: ["Phone number", "Email address"] },
  { icon: <DatabaseIcon className="size-3.5" />, title: "Sales Data", fields: ["Current status", "Previous status", "Funnel stage"] },
  { icon: <PeerToPeerIcon className="size-[17px]" />, title: "Source Tracking", fields: ["Lead source (DM / Comment / Story)", "Post ID", "Media type"], centered: true },
  { icon: <PassportIcon className="h-3.5 w-[17px]" />, title: "Team Assignments", fields: ["Setter info", "Closer info"] },
  { icon: <TagIcon className="size-3.5" />, title: "Automation Metadata", fields: ["Automation that captured the lead", "Tags", "Custom fields"] },
  { icon: <TimeIcon className="size-[15px]" />, title: "Timestamps", fields: ["Created at", "Updated at", "Event time"] },
];

/** Framer "Linear - Bottom": the 312px cloud strip fading in towards the bottom edge of the section. */
const LINEAR_BOTTOM = (
  <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[312px] overflow-hidden [mask-image:linear-gradient(181deg,rgba(0,0,0,0)_0%,#000_100%)]">
    <Image src="/framer/3fb6w8IKfGgJQqarb2yoBkkYhw.png" alt="" width={2398} height={624} sizes="100vw" className="h-full w-full object-cover" />
  </div>
);

/**
 * Framer "Sync Section" of /zapier ("Rich lead data, ready to flow"): seven white payload blocks in a
 * 2-column grid (single column on phones), each a title row with a 16px icon and a row of #fafafa field pills,
 * then the purple "Message content is never shared" box. 1440x927 / 1024x901 / 390x1359.
 */
export function ZapierSync() {
  return (
    <ZapierSection label="Rich lead data, ready to flow" className="overflow-hidden" wrapperClassName="relative z-[2]" containerClassName="gap-8 md:gap-12 lg:gap-16" extra={LINEAR_BOTTOM}>
      <Reveal y={48} delay={0.2} className="w-full">
        <SectionHeader
          title="Rich lead data, ready to flow"
          description="Every Zapier trigger carries a comprehensive payload so your destination apps always have complete context."
          descriptionClassName="max-w-[488px]"
        />
      </Reveal>
      <div className="flex w-full flex-col items-center gap-6 lg:gap-8">
        <div className="grid w-full max-w-[928px] grid-cols-1 gap-4 md:grid-cols-2">
          {BLOCKS.map((b) => (
            <Reveal key={b.title} y={48} delay={0.2} className="flex w-full flex-col items-start gap-2 rounded-[20px] bg-white px-6 py-5 shadow-[inset_0_0_0_1px_#efefef]">
              <div className="flex w-full flex-col items-start gap-4">
                <div className="flex w-full items-center gap-2">
                  <span className="flex size-4 shrink-0 items-center justify-center">{b.icon}</span>
                  <p className="flex-1 text-[16px] leading-[20.8px] font-semibold tracking-[-0.2px] whitespace-pre-wrap text-black md:text-[18px] md:leading-[23.4px]">{b.title}</p>
                </div>
                <div className={`flex w-full flex-wrap items-center justify-start gap-1.5 lg:flex-nowrap ${b.centered ? "lg:justify-center" : ""}`.trim()}>
                  {b.fields.map((f) => (
                    <span key={f} className="flex items-center justify-center rounded-[32px] bg-gray-25 px-3.5 py-1.5">
                      <p className="text-[13px] leading-[19.5px] font-normal tracking-[-0.52px] whitespace-pre text-[#262626]">{f}</p>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal y={48} delay={0.2} className="flex w-full max-w-[928px] flex-col items-center justify-center rounded-[16px] bg-[#faf5ff] p-[22px] lg:p-6">
          <div className="flex w-full flex-col items-center justify-center gap-3 lg:flex-row">
            <LockIcon className="hidden h-[21px] w-3.5 shrink-0 lg:block" />
            <p className="max-w-[306px] text-center text-[14px] leading-[18.2px] font-normal whitespace-pre-wrap text-purple-500 md:max-w-[420px] md:leading-[16.8px] lg:max-w-none lg:whitespace-pre">
              Message content is never shared—we respect Instagram&apos;s platform policies and your customers&apos; privacy.
            </p>
          </div>
        </Reveal>
      </div>
    </ZapierSection>
  );
}
