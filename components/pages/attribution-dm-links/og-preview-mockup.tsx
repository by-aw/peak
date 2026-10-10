import Image from "next/image";
import { ArrowUturnLeftIcon, PencilSquareIcon } from "@/components/icons/dm-links-icons";

const bubbleLine = "relative after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-[#e0e0e0]";

/** Chat thread with the rich moch.me link preview (Framer "OG", 452x702, clipped by the card frame). */
export function OgPreviewMockup() {
  return (
    <div className="flex w-full max-w-[452px] shrink-0 flex-col items-center justify-end gap-6">
      <div className="flex w-full flex-col items-start">
        <div className={`${bubbleLine} min-h-[86px] w-[216px] rounded-[6px_12px_12px_12px] bg-white`} />
      </div>
      <div className="flex w-full flex-col items-end">
        <div className="min-h-[38px] w-[216px] rounded-[12px_6px_12px_12px] bg-blue-500" />
      </div>
      <div className="flex w-full flex-col items-start">
        <div className={`${bubbleLine} min-h-[38px] w-[216px] rounded-[6px_12px_12px_12px] bg-white`} />
      </div>
      <div className="flex w-full flex-col items-end">
        <div className="min-h-[38px] w-[216px] rounded-[12px_6px_12px_12px] bg-[#f2f2f2]" />
      </div>
      <div className="flex w-[336px] shrink-0 flex-col items-start overflow-hidden rounded-[16px_6px_16px_16px] bg-[#fcfcfc] shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]">
        <div className="relative h-[176px] w-full overflow-hidden">
          <Image src="/framer/ucQb2k3bxdYO7aEmzGoH4Ikey4.png" width={1344} height={708} alt="" sizes="336px" className="h-full w-full object-cover" />
          <div className="absolute left-2 top-2 flex size-8 items-center justify-center rounded-[8px] bg-white p-2 shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]">
            <PencilSquareIcon className="size-3" />
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-4 p-4">
          <div className="flex flex-col items-start gap-1.5">
            <div className="h-1.5 w-[104px] rounded-[24px] bg-[linear-gradient(90deg,rgba(227,227,227,0.12)_0%,#e1e1e1_100%)]" />
            <div className="h-1.5 w-[180px] rounded-[24px] bg-[#efefef]" />
          </div>
          <p className="text-[14px] font-normal leading-[14px] tracking-[-0.2px] whitespace-pre text-black">moch.me/dec1-203</p>
        </div>
      </div>
      <div className="flex w-full flex-col items-start">
        <div className={`${bubbleLine} min-h-[38px] w-[148px] rounded-[12px_12px_12px_6px] bg-white`} />
      </div>
      <div className="flex w-full flex-col items-start gap-3">
        <div className="flex items-center gap-1.5">
          <div className="relative size-3.5">
            <ArrowUturnLeftIcon className="absolute left-0.5 top-0.5 size-[11px]" />
          </div>
          <div className="h-2 w-[149px] rounded-full bg-gray-300" />
        </div>
        <div className={`${bubbleLine} min-h-[38px] w-[216px] rounded-[6px_12px_12px_12px] bg-white`} />
      </div>
    </div>
  );
}
