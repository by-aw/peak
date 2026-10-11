import Image from "next/image";
import { CalendarMicroIcon, ChevronDownMicroIcon } from "./icons";
import { SectionHeading, SectionText } from "./section-intro";

type Reel = { title: string; image: string; width: number; height: number; views: string; replies: string; booked: string; revenue: string; revenuePhone: string };

const REELS: Reel[] = [
  { title: "3 DM mistakes you’re making", image: "/framer/EqrcCji6tfFc19t8RSfRHmty2A.png", width: 1320, height: 2346, views: "12,521", replies: "324", booked: "28", revenue: "$43,560", revenuePhone: "$14,560" },
  { title: "Stop pitching. Start helping.", image: "/framer/PWU7ImoGlfHa2CVfZIA4YRiy0CI.png", width: 608, height: 814, views: "9,318", replies: "119", booked: "7", revenue: "$7,340", revenuePhone: "$2,140" },
  { title: "The follow-up that closes", image: "/framer/NDg62vQoOXcGFqC0ciuFo2ye6A.png", width: 742, height: 946, views: "6,484", replies: "92", booked: "4", revenue: "$3,220", revenuePhone: "$1,220" },
];

const hairline = "after:pointer-events-none after:absolute after:inset-0";

function Thumb({ reel }: { reel: Reel }) {
  return (
    <div className="relative h-9 w-6 shrink-0 overflow-clip rounded-[6px]">
      <Image src={reel.image} alt="" width={reel.width} height={reel.height} sizes="24px" className="h-full w-full object-cover" />
    </div>
  );
}

/** "This month" dropdown chip (static): calendar glyph, label, chevron. */
function MonthPicker() {
  return (
    <div className="flex shrink-0 items-center justify-center gap-1 overflow-clip rounded-[8px] bg-white p-2 shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]">
      <div className="relative size-4 shrink-0 overflow-clip">
        <CalendarMicroIcon className="absolute top-px left-0.5 h-[13px] w-3" />
      </div>
      <div className="flex items-center justify-center gap-2.5 pl-0.5">
        <p className="text-center text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-black">This month</p>
      </div>
      <div className="relative size-4 shrink-0 overflow-clip">
        <ChevronDownMicroIcon className="absolute top-1.5 left-1 h-[5px] w-2" />
      </div>
    </div>
  );
}

const headCell = "flex items-center gap-2 px-3 py-4 text-[14px] leading-[19.6px] font-normal whitespace-pre text-[#3c3c3c]";
const cell = "flex flex-1 basis-0 items-center gap-2 px-3 py-4";
const cellText = "min-w-0 flex-1 text-[14px] leading-[19.6px] font-medium whitespace-pre-wrap text-[#3c3c3c]";

/** Tablet / desktop table: header row on grey, then one 68px row per reel. */
function WideTable() {
  return (
    <div className="hidden w-full flex-col items-start pb-2 md:flex">
      <div className={`${hairline} relative flex w-full items-center bg-gray-25 px-5 after:border-b after:border-gray-150`}>
        <div className={`${headCell} w-[288px] shrink-0`}>Reel</div>
        <div className={`${cell} font-normal`}>
          <p className="flex-1 text-[14px] leading-[19.6px] font-normal text-[#3c3c3c]">Views</p>
        </div>
        <div className={cell}>
          <p className="flex-1 text-[14px] leading-[19.6px] font-normal text-[#3c3c3c]">DM replies</p>
        </div>
        <div className={cell}>
          <p className="flex-1 text-[14px] leading-[19.6px] font-normal text-[#3c3c3c]">Booked</p>
        </div>
        <div className={`${cell} justify-end`}>
          <p className="flex-1 text-right text-[14px] leading-[19.6px] font-normal text-[#3c3c3c]">Revenue</p>
        </div>
      </div>
      <div className="flex w-full flex-col items-start rounded-[12px] bg-white">
        {REELS.map((reel, i) => (
          <div key={reel.title} className={`${hairline} relative flex w-full items-center px-5 ${i < REELS.length - 1 ? "after:border-b after:border-gray-150" : ""}`}>
            <div className="flex w-[288px] shrink-0 items-center gap-2.5 px-3 py-4">
              <Thumb reel={reel} />
              <p className="w-[230px] text-[14px] leading-[19.6px] font-medium whitespace-pre-wrap text-[#3c3c3c]">{reel.title}</p>
            </div>
            <div className={cell}>
              <p className={cellText}>{reel.views}</p>
            </div>
            <div className={cell}>
              <p className={cellText}>{reel.replies}</p>
            </div>
            <div className={cell}>
              <p className={cellText}>{reel.booked}</p>
            </div>
            <div className={`${cell} justify-end`}>
              <p className={`${cellText} text-right ${i === 0 ? "text-[#3cc861]" : ""}`}>{reel.revenue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const phoneLabel = "text-[14px] leading-[19.6px] font-medium whitespace-pre-wrap text-black";
const phoneValue = "text-[14px] leading-[19.6px] font-normal whitespace-pre-wrap text-gray-400";

/** Phone "Table (Mobile)": one grey block per reel (reel + thumbnail, then views / DM replies, then booked / revenue). */
function PhoneTable() {
  return (
    <div className="flex w-full flex-col items-start md:hidden">
      {REELS.map((reel) => (
        <div key={reel.title} className={`${hairline} relative flex w-full flex-col items-start bg-gray-25 px-5 after:border-y after:border-gray-150`}>
          <div className="flex w-full flex-col items-start gap-4 py-4">
            <p className={phoneLabel}>Reel</p>
            <div className="flex w-full items-center justify-center gap-2.5 overflow-clip">
              <Thumb reel={reel} />
              <p className="min-w-0 flex-1 text-[14px] leading-[19.6px] font-normal whitespace-pre-wrap text-gray-700">{reel.title}</p>
            </div>
          </div>
          <div className="flex w-full items-start gap-4 pt-4">
            <div className="flex min-w-0 flex-1 basis-0 flex-col items-center justify-center gap-4 overflow-clip">
              <p className={`${phoneLabel} w-full`}>Views</p>
              <p className={`${phoneValue} w-full`}>{reel.views}</p>
            </div>
            <div className="flex min-w-0 flex-1 basis-0 flex-col items-center justify-center gap-4 overflow-clip">
              <p className={`${phoneLabel} w-full text-right`}>DM replies</p>
              <p className={`${phoneValue} w-full text-right`}>{reel.replies}</p>
            </div>
          </div>
          <div className="flex w-full items-start gap-4 py-4">
            <div className="flex min-w-0 flex-1 basis-0 flex-col items-center justify-center gap-4 overflow-clip">
              <p className={`${phoneLabel} w-full`}>Booked</p>
              <p className={`${phoneValue} w-full`}>{reel.booked}</p>
            </div>
            <div className="flex min-w-0 flex-1 basis-0 flex-col items-center justify-center gap-4 overflow-clip">
              <p className={`${phoneLabel} w-full text-right`}>Revenue</p>
              <p className="w-full text-right text-[14px] leading-[19.6px] font-medium whitespace-pre-wrap text-[#3cc861]">{reel.revenuePhone}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Framer "Clarity Section": heading + copy, then the "Real attribution" table card (This month picker, one row per
 * reel with views / DM replies / booked / revenue). Desktop 1440x746, tablet 1024x672, phone 390x1257 (stacked blocks,
 * with the phone revenue figures of the live page).
 */
export function ClaritySection() {
  return (
    <section className="order-6 flex w-full items-center justify-center md:order-none">
      <div className="flex w-full flex-1 flex-col items-center justify-center px-5 py-12 md:px-8 md:py-16 lg:px-[100px] lg:py-20">
        <div className="flex w-full max-w-[1000px] flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16">
          <div className="flex w-full max-w-[678px] flex-col items-center gap-4 overflow-clip">
            <SectionHeading className="w-full text-balance text-center md:text-wrap">The clarity you have been looking for, right in front of your eyes.</SectionHeading>
            <SectionText className="w-full text-center">
              Compare every reel in one place. See the content that starts conversations, creates intent, books calls, and closes customers. Then make the next reel with evidence instead of instinct.
            </SectionText>
          </div>
          <div className="flex w-full flex-col items-center md:max-w-[920px]">
            <div
              className={`${hairline} relative flex w-full flex-col items-start gap-[18px] overflow-clip rounded-[24px] bg-white shadow-[0_1px_8px_0_rgba(0,0,0,0.06),0_0_8px_0_rgba(0,0,0,0.02)] after:rounded-[24px] after:border after:border-gray-150`}
            >
              <div className="flex w-full items-center justify-between px-5 pt-6">
                <p className="flex-1 text-[15px] leading-[21.75px] font-medium tracking-[-0.3px] whitespace-pre-wrap text-black md:text-[16px] md:leading-[23.2px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[26.1px] lg:tracking-[-0.36px]">
                  Real attribution
                </p>
                <MonthPicker />
              </div>
              <WideTable />
              <PhoneTable />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
