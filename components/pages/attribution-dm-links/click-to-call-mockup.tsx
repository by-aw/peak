import { CalendlyIcon, CheckmarkBadgeIcon, LinkDashIcon } from "@/components/icons/dm-links-icons";

const steps1 = [
  ["Link Sent", "3:00 PM"],
  ["Lead clicked", "3:15 PM"],
  ["Call booked", "3:18 PM"],
];

function Stat({ label, value, valueClass = "text-[#999]", hidden = false }: { label: string; value: string; valueClass?: string; hidden?: boolean }) {
  return (
    <div className={`flex flex-1 basis-0 flex-col items-start gap-1.5 ${hidden ? "opacity-0" : ""}`} aria-hidden={hidden}>
      <p className="text-[14px] font-medium leading-[14.7px] tracking-[-0.2px] whitespace-pre-wrap text-[#181925]">{label}</p>
      <p className={`text-[14px] font-normal leading-[14.7px] tracking-[-0.2px] whitespace-pre-wrap ${valueClass}`}>{value}</p>
    </div>
  );
}

/** "Daniel Smith" lead timeline card (Framer "Card" 432x334): avatar, Calendly tag and the booked-call stats. */
export function ClickToCallMockup() {
  return (
    <div className="relative flex w-full max-w-[432px] flex-col items-start gap-6 overflow-hidden rounded-[20px] bg-[#fcfcfc] p-5 after:pointer-events-none after:absolute after:inset-0 after:rounded-[20px] after:border after:border-gray-150 md:p-6">
      <div className="flex flex-col items-start gap-4">
        <div aria-hidden className="size-16 rounded-full bg-[linear-gradient(135deg,#fccb90_0%,#d57eeb_100%)]" />
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-1">
            <p className="text-[16px] font-medium leading-[16.8px] tracking-[-0.2px] whitespace-pre text-[#141417]">Daniel Smith</p>
            <CheckmarkBadgeIcon className="size-[18px]" />
          </div>
          <div className="flex items-center gap-2">
            <div aria-hidden className="size-2.5 rounded-full bg-[#00ca46]" />
            <p className="text-[12px] font-normal leading-[12.6px] tracking-[-0.2px] whitespace-pre text-[#999]">Online</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <CalendlyIcon className="size-5" />
        <LinkDashIcon className="h-[3px] w-2.5" />
        <div className="relative flex items-center justify-center rounded-[32px] px-2 py-1.5 after:pointer-events-none after:absolute after:inset-0 after:rounded-[32px] after:border after:border-[#f2f2f2]">
          <p className="text-[12px] font-normal leading-[12.6px] tracking-[-0.2px] whitespace-pre text-[#999]">Calendar link sent</p>
        </div>
      </div>
      <div className="flex w-full items-center md:gap-12">
        {steps1.map(([l, v]) => (
          <Stat key={l} label={l} value={v} />
        ))}
      </div>
      <div className="flex w-full items-center md:gap-11">
        <Stat label="Call taken" value="March 12" />
        <Stat label="Deal won" value="$3,500" valueClass="text-[#33c758]" />
        <Stat label="Call taken" value="March 12" hidden />
      </div>
    </div>
  );
}
