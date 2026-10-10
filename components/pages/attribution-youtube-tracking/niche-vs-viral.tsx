import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { DashedDividerIcon } from "@/components/icons/attribution-mockup-icons";

function VideoCard({ thumb, title, titleWidth, booked, price }: { thumb: string; title: string; titleWidth?: number; booked: string; price: string }) {
  return (
    <div className="relative flex w-full flex-col gap-2 overflow-hidden rounded-[14px] bg-white p-4 after:pointer-events-none after:absolute after:inset-0 after:rounded-[14px] after:border after:border-[#e7e7e7]">
      <div className="flex items-center gap-3">
        <div className="relative aspect-video w-[78px] shrink-0 overflow-hidden rounded-[6px]">
          <Image src={thumb} alt="" width={1280} height={720} sizes="78px" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 basis-0 flex-col justify-center gap-1">
          <div className="flex items-center justify-between">
            <p className="truncate text-[14px] leading-[24px] font-normal tracking-[-0.2px] text-gray-500" style={titleWidth ? { width: titleWidth } : undefined}>
              {title}
            </p>
            <div className="flex items-center rounded-full bg-gray-25 px-2 py-1">
              <p className="text-[12px] leading-[12px] font-medium tracking-[-0.2px] whitespace-pre text-[#636363]">{booked}</p>
            </div>
          </div>
          <p className="text-[16px] leading-[16px] font-medium tracking-[-0.2px] text-black">{price}</p>
        </div>
      </div>
    </div>
  );
}

/** "Niche vs. viral" mockup (Framer "Card Wrapper" 432x285): two video cards around a dashed "VS" divider and an insight bar. Slides in from y=64. */
export function NicheVsViral() {
  return (
    <Reveal
      y={64}
      delay={0.2}
      className="relative flex w-[432px] max-w-full flex-col items-center gap-4 rounded-[16px] bg-white p-3 after:pointer-events-none after:absolute after:inset-0 after:rounded-[16px] after:border after:border-[#e7e7e7]"
    >
      <VideoCard thumb="/framer/Q1ZAQPwkKZ974Xkvltga6Wqvs.jpg" title="How i use Claude for my info business" titleWidth={162} booked="7 booked" price="$597" />
      <div className="flex w-full items-center justify-center gap-3">
        <div className="h-[3px] flex-1 basis-0">
          <DashedDividerIcon className="h-[3px] w-full" />
        </div>
        <div className="flex items-center rounded-full bg-[#242424] px-2 py-0.5">
          <p className="text-[12px] leading-[13.8px] font-semibold tracking-[-0.4px] text-white">VS</p>
        </div>
        <div className="h-[3px] flex-1 basis-0">
          <DashedDividerIcon className="h-[3px] w-full" />
        </div>
      </div>
      <VideoCard thumb="/framer/YUPgNMFYxucsECsBOgYeROjmxbo.jpg" title="i had to let him go..." booked="2 booked" price="$27" />
      <div className="relative flex w-full flex-col items-center rounded-[12px] bg-gray-25 p-3.5 after:pointer-events-none after:absolute after:inset-0 after:rounded-[12px] after:border after:border-[#ddd6fe]">
        <div className="flex w-full items-center gap-1.5">
          <p className="text-[13px] leading-[15.6px] font-normal tracking-[-0.21px] text-[#3a3a3a]">💡 Your niche content generates 22x more revenue per view.</p>
        </div>
      </div>
    </Reveal>
  );
}
