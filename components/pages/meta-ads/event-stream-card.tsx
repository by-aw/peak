import type { ReactNode } from "react";
import {
  ArrowRightMicroIcon,
  ChatBubbleMicroIcon,
  CheckCircleMicroIcon,
  FaceFrownMicroIcon,
  LightningIcon,
  PhoneMicroIcon,
  StarMicroIcon,
  UserPlusMicroIcon,
} from "@/components/icons/meta-ads-icons";

const ROWS: { label: string; icon: ReactNode }[] = [
  { label: "Call Booked", icon: <PhoneMicroIcon className="h-[13px] w-[13px]" /> },
  { label: "Qualified", icon: <StarMicroIcon className="h-[13px] w-[13px]" /> },
  { label: "New Lead", icon: <UserPlusMicroIcon className="h-[17px] w-[17px]" /> },
  { label: "In Contact", icon: <ChatBubbleMicroIcon className="h-[17px] w-[17px]" /> },
  { label: "Won", icon: <CheckCircleMicroIcon className="h-[15px] w-[15px]" /> },
  { label: "No Show", icon: <FaceFrownMicroIcon className="h-[15px] w-[15px]" /> },
];

/** One "Event Stream" panel: header row + six grey event rows. `tilted` counter-rotates the icons of the 7deg card. */
function Panel({ tilted = false }: { tilted?: boolean }) {
  const upright = tilted ? "-rotate-[7deg]" : "";
  return (
    <>
      <div className="relative flex w-full flex-col gap-2 px-5 py-3.5 after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-[#f2f2f2]">
        <div className="flex w-full items-center justify-between">
          <p className="text-[14px] leading-[19.6px] font-medium whitespace-pre text-[#262626]">Event Stream</p>
          <LightningIcon className={`size-[19px] ${upright}`} />
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 px-3 py-3.5">
        <div className="flex w-full flex-col gap-1">
          {ROWS.map((row) => (
            <div
              key={row.label}
              className="relative flex w-full items-center justify-between rounded-[12px] bg-[#f7f7f7] px-4 py-3.5 after:pointer-events-none after:absolute after:inset-0 after:rounded-[12px] after:border after:border-[rgba(231,231,231,0.5)]"
            >
              <div className="flex items-center gap-2.5">
                <span className={`flex size-4 items-center justify-center ${upright}`}>{row.icon}</span>
                <p className="text-[13px] leading-[13.65px] font-medium tracking-[-0.2px] whitespace-pre text-black">{row.label}</p>
              </div>
              <ArrowRightMicroIcon className={`size-[15px] ${upright}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/**
 * Framer "Events Image" (363x395): a straight white "Event Stream" card behind and the same card
 * rotated 7deg in front, both with a soft shadow. Static on the live site.
 */
export function EventStreamCard({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-[395px] w-[363px] shrink-0 ${className}`} aria-hidden>
      <div className="absolute top-[17px] right-5 bottom-[16.4px] left-5 flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_1.5px_20px_0_rgba(0,0,0,0.12)]">
        <Panel />
      </div>
      <div className="absolute top-[17px] right-5 bottom-3.5 left-5 flex rotate-[7deg] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_1.5px_20px_0_rgba(0,0,0,0.12)]">
        <Panel tilted />
      </div>
    </div>
  );
}
