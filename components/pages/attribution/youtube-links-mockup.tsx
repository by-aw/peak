import Image from "next/image";
import { CheckMicroIcon, EyeSlashMicroIcon, PlayMicroIcon } from "@/components/icons/attribution-icons";

type Row = { url: string; tracked: boolean; count?: string };

const ROWS: Row[] = [
  { url: "coach.com/free-training", tracked: true, count: "28" },
  { url: "coach.com/offers", tracked: true, count: "12" },
  { url: "instagram.com/coach", tracked: false },
  { url: "linktr.ee/coach", tracked: false },
];

const badgeRing = "after:pointer-events-none after:absolute after:inset-0 after:rounded-[6px] after:border-2 after:border-white";

/**
 * "YouTube Tracking" mockup (Framer "Content", 432x308): channel header with skeleton lines and the list of
 * description links, tracked ones ticked with a play-count badge, social ones marked "Social – skip".
 */
export function YoutubeLinksMockup() {
  return (
    <div className="relative flex w-full max-w-[432px] flex-col gap-3 overflow-hidden rounded-[16px] bg-white p-3 after:pointer-events-none after:absolute after:inset-0 after:rounded-[16px] after:border after:border-[#e8e8e8]">
      <div className="relative flex w-full flex-col rounded-[12px] bg-gray-50 p-3 after:pointer-events-none after:absolute after:inset-0 after:rounded-[12px] after:border after:border-gray-150">
        <div className="flex w-full items-center gap-4">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full shadow-[inset_0_0_0_0.625px_rgba(0,0,0,0.1)]">
            <Image src="/framer/KLVHKhd2Jprks2rCy8QHT9VrOWo.png" width={88} height={88} alt="" sizes="40px" className="size-full object-cover" />
          </div>
          <div className="flex flex-1 flex-col items-start gap-2">
            <span className="h-2 w-[120px] max-w-full rounded-[24px] bg-[linear-gradient(90deg,rgba(227,227,227,0.12)_0%,#e1e1e1_100%)]" />
            <span className="h-2 w-[224px] max-w-full rounded-[24px] bg-[#efefef]" />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col px-1.5">
        {ROWS.map((row) => (
          <div key={row.url} className="flex w-full items-center justify-between gap-2 p-3">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              {row.tracked ? (
                <span className="flex size-7 shrink-0 items-center rounded-[6px] bg-[#cacaca] p-1">
                  <span className="relative size-5">
                    <CheckMicroIcon className="absolute inset-1" />
                  </span>
                </span>
              ) : (
                <span className="size-7 shrink-0 rounded-[6px] bg-white shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]" />
              )}
              <p className="min-w-0 flex-1 truncate text-[14px] leading-[14.7px] font-normal tracking-[-0.2px] text-black">{row.url}</p>
            </div>
            {row.tracked ? (
              <span className={`relative flex shrink-0 items-center gap-0.5 rounded-[6px] bg-gray-500 px-1 py-[3px] ${badgeRing}`}>
                <span className="relative size-3">
                  <PlayMicroIcon className="absolute inset-x-0.5 top-px bottom-0.5" />
                </span>
                <span className="text-center text-[12px] leading-[12px] font-semibold tracking-[-0.4px] whitespace-pre text-white">{row.count}</span>
              </span>
            ) : (
              <span className={`relative flex shrink-0 items-center gap-0.5 rounded-[6px] bg-gray-150 px-1 py-[3px] ${badgeRing}`}>
                <span className="relative size-3">
                  <EyeSlashMicroIcon className="absolute inset-x-px top-px bottom-0.5" />
                </span>
                <span className="text-center text-[12px] leading-[12px] font-medium tracking-[-0.4px] whitespace-pre text-gray-400">Social – skip</span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
