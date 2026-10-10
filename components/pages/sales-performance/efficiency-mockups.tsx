import Image from "next/image";
import { MockupFrame, Skeleton } from "@/components/shared/feature-card";
import { FunnelShape } from "@/components/icons/feature-icons";
import { HAIRLINE, MOCKUP_CARD_SHADOW } from "./closer-mockups";

const BOTTOM_LINE = "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#e7e7e7]";
const RIGHT_LINE = "after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-[#e7e7e7]";

/** "Setter Performance Dashboard" mockup: weekly stat header and a 4-row table (428x308, 44px from the top). */
export function SetterDashboardMockup() {
  const rows: { label: string; value?: string; bar?: string; shaded: boolean }[] = [
    { label: "Fastest Reply", value: "Alex · 8m", shaded: true },
    { label: "Most closes", bar: "w-[59px]", shaded: false },
    { label: "Revenue", bar: "w-[73px]", shaded: true },
    { label: "Top source", bar: "w-[90px]", shaded: false },
  ];
  return (
    <MockupFrame top="top-[52px] md:top-11" className={`flex h-[308px] flex-col gap-4 overflow-hidden rounded-[16px] bg-white p-6 ${MOCKUP_CARD_SHADOW}`}>
      <div className="flex items-center gap-[13px]">
        <p className="text-[12px] leading-[12px] font-medium tracking-[-0.22px] whitespace-pre text-gray-500">Weekly</p>
        <span className="size-1 rounded-full bg-gray-300" />
        <p className="text-[12px] leading-[12px] font-medium tracking-[-0.22px] whitespace-pre text-gray-500">Aug 2025</p>
      </div>
      <div className="flex w-full flex-col gap-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className={`flex h-[28.5px] w-full items-center justify-between overflow-hidden rounded-[6px] p-2 ${row.shaded ? "bg-gray-25" : "bg-white shadow-[inset_0_0_0_1px_#fafafa]"}`}
          >
            <p className="text-[12px] leading-[12.6px] font-normal tracking-[-0.2px] whitespace-pre text-[#aaa]">{row.label}</p>
            {row.value ? <p className="text-[12px] leading-[12.6px] font-normal tracking-[-0.2px] whitespace-pre text-[#aaa]">{row.value}</p> : <Skeleton className={row.bar} />}
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

/** "Reply Rate by Message Type" mockup: reply-rate header and four message-type rows (428x288). */
export function ReplyRateMockup() {
  const rows: { label: string; bar: string; rate: string; strong?: boolean; tall?: boolean }[] = [
    { label: "Voice note", bar: "w-[291px]", rate: "88%" },
    { label: "Video", bar: "w-[249px]", rate: "72%" },
    { label: "Image", bar: "w-[197px]", rate: "61%" },
    { label: "Text only", bar: "w-[102px]", rate: "27%", strong: true, tall: true },
  ];
  return (
    <MockupFrame className={`flex flex-col overflow-hidden rounded-[16px] bg-gray-25 ${HAIRLINE}`}>
      <div className="flex w-full flex-col gap-[14px] p-4">
        <div className="flex w-full flex-col gap-3">
          <p className="text-[12px] leading-[12px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500">Reply Rate</p>
          <Skeleton className="w-[130px]" />
        </div>
      </div>
      <div className={`flex w-full flex-col rounded-[16px] bg-white ${HAIRLINE}`}>
        {rows.map((row) => (
          <div key={row.label} className={`relative flex w-full items-start justify-between ${row.tall ? "h-[58px]" : "h-14"} ${BOTTOM_LINE}`}>
            <div className={`relative flex min-w-0 flex-1 flex-col gap-2.5 overflow-hidden px-4 py-[14px] ${RIGHT_LINE}`}>
              {row.strong ? (
                <p className="text-[14px] leading-[14px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-black">{row.label}</p>
              ) : (
                <p className="text-[12px] leading-[12px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-[#aaa]">{row.label}</p>
              )}
              <Skeleton className={`max-w-full ${row.bar}`} />
            </div>
            {/* Framer collapses this 66px rate column to 0px height on tablet/desktop; it is only visible on phones. */}
            <div className="flex h-full w-[66px] shrink-0 items-center justify-center overflow-hidden md:h-0">
              <p className="text-[12px] leading-[12.6px] font-normal tracking-[-0.2px] whitespace-pre text-[#aaa]">{row.rate}</p>
            </div>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

const FUNNEL_STAGES: { label: string; value: string }[] = [
  { label: "Convos", value: "50" },
  { label: "Qualified", value: "40" },
  { label: "Links sent", value: "35" },
  { label: "Booked", value: "30" },
  { label: "Attended", value: "25" },
  { label: "Closed", value: "15" },
];

/** "AI Tag Filtering" card mockup: six-stage funnel chart with a drop-off callout (428x232; 0.95x on phones). */
export function FunnelChartMockup() {
  return (
    <div className={`absolute top-8 right-2 left-2 flex scale-95 overflow-hidden rounded-[12px] bg-white md:top-[41px] md:right-auto md:left-1/2 md:w-[428px] md:-translate-x-1/2 md:scale-100 ${HAIRLINE}`}>
      <div className="flex min-w-0 flex-1 gap-4 overflow-hidden p-4">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex w-full flex-col gap-[10.64px]">
            <div className={`flex w-full flex-col overflow-hidden rounded-[11px] ${HAIRLINE}`}>
              <div className="flex w-full items-center">
                {FUNNEL_STAGES.map((stage, i) => (
                  <div key={stage.label} className={`relative flex h-[170px] min-w-0 flex-1 flex-col overflow-hidden ${RIGHT_LINE}`}>
                    <div className="flex w-full flex-col gap-[6.65px] p-[10.64px]">
                      <p className="text-[9.31px] leading-[9.31px] font-normal tracking-[-0.13px] whitespace-pre-wrap text-gray-500">{stage.label}</p>
                      <p className="text-[10.64px] leading-[10.64px] font-medium tracking-[-0.27px] whitespace-pre-wrap text-black">{stage.value}</p>
                    </div>
                    <FunnelShape index={i} />
                  </div>
                ))}
              </div>
              <div className="relative flex w-full items-center gap-[10.64px] p-[10.64px] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[#e7e7e7]">
                <p className="text-center text-[9.31px] leading-[9.31px] font-medium tracking-[-0.13px] whitespace-pre text-[#3b82f6]">⚠ Biggest drop: Contact → Qualified (40%)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TRANSCRIPT: { who: "john" | "ali"; time: string; text: string; first?: boolean }[] = [
  { who: "john", time: "00:00", text: "Hi Ali, thanks for joining! How are you today?", first: true },
  { who: "ali", time: "00:08", text: "Hey John, doing well thanks. Excited to learn more about your solution." },
  {
    who: "john",
    time: "00:15",
    text: "Great! I saw you mentioned you're managing a team of 5 and struggling with multiple tools. Could you tell me more about your current process?",
  },
  {
    who: "ali",
    time: "00:24",
    text: "Yeah, so right now we're using Calendly for booking, Slack for team chat, and trying to track everything in Airtable. It's becoming a mess because nothing's connected. We waste so much time copy-pasting information between tools...",
  },
  { who: "john", time: "00:36", text: "I hear you. That's exactly the problem we solve. Could you give me an example of how this impacts your daily operations?" },
  {
    who: "ali",
    time: "00:38",
    text: "Yeah, so right now we're using Calendly for booking, Slack for team chat, and trying to track everything in Airtable. It's becoming a mess because nothing's connected. We waste so much time copy-pasting information between tools...",
  },
];

const TAGS: { emoji: string; label: string }[] = [
  { emoji: "🔥", label: "Hot Lead" },
  { emoji: "✅", label: "Qualified" },
  { emoji: "⏳", label: "Pending" },
  { emoji: "💰", label: "High Value" },
  { emoji: "👀", label: "Re-engage" },
  { emoji: "🥶", label: "Cold" },
  { emoji: "📞", label: "Booked" },
  { emoji: "📩", label: "DM Only" },
];

/** "Funnel Analytics" card mockup: a faded call transcript behind a frosted strip of AI tags. */
export function TranscriptTagsMockup() {
  return (
    <>
      <div className={`absolute -top-16 right-4 left-4 flex flex-col gap-9 overflow-hidden rounded-[12px] bg-white p-4 opacity-20 md:right-auto md:left-1/2 md:w-[416px] md:-translate-x-1/2 ${HAIRLINE}`}>
        {TRANSCRIPT.map((m, i) => (
          <div key={i} className={`flex w-full flex-col ${m.first ? "gap-3" : "gap-5 pb-1"}`}>
            <div className="flex items-center gap-3">
              <div className="flex items-start gap-2">
                <Image
                  src={m.who === "john" ? "/framer/GwjGgr1fKE7kCXJVWH192ctSYo.png" : "/framer/DMaV2SbGWVCahBbj01QaNIAsja0.png"}
                  alt=""
                  width={56}
                  height={56}
                  className="size-3.5 rounded-full object-cover"
                />
                <p className="text-[14px] leading-[14px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500">{m.who === "john" ? "by John [C]" : "by Ali [L]"}</p>
              </div>
              <span className="size-1 rounded-full bg-gray-300" />
              <p className="text-[14px] leading-[14px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500">{m.time}</p>
            </div>
            <p className={`text-[14px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-black ${m.first ? "leading-[14px]" : "leading-[24px]"}`}>{m.text}</p>
          </div>
        ))}
        <div className="h-12 w-[416px] max-w-none bg-[linear-gradient(rgba(255,255,255,0)_0%,#fff_100%)]" />
      </div>
      <div
        className={`absolute top-[71px] right-4 left-4 flex flex-col gap-8 overflow-hidden rounded-[16px] bg-[rgba(255,255,255,0.1)] p-5 shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05),0_2px_20px_0_rgba(0,0,0,0.06)] backdrop-blur-[6px] md:top-[124px] md:right-auto md:left-1/2 md:w-[428px] md:-translate-x-1/2`}
      >
        <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
          {TAGS.map((tag) => (
            <div key={tag.label} className={`flex shrink-0 items-center gap-1 overflow-hidden rounded-full bg-gray-25 px-2 py-1.5 ${HAIRLINE}`}>
              <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500">{tag.emoji}</p>
              <div className="flex items-center px-0.5">
                <p className="text-[13px] leading-[13.65px] font-medium tracking-[-0.2px] whitespace-pre text-black">{tag.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ListHeader({ children }: { children: string }) {
  return (
    <div className={`relative flex w-full items-center gap-2 bg-gray-25 p-4 ${BOTTOM_LINE}`}>
      <p className="w-full text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-gray-500">{children}</p>
    </div>
  );
}

function DateLabel({ children }: { children: string }) {
  return (
    <div className="flex w-full items-center px-2.5 pt-2.5 pb-1.5">
      <p className="w-full text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-gray-500">{children}</p>
    </div>
  );
}

function SquareAvatar({ src }: { src: string }) {
  return <Image src={src} alt="" width={80} height={80} className="size-5 shrink-0 rounded-[6px] object-cover" />;
}

function SkeletonStack({ align = "start" }: { align?: "start" | "end" }) {
  return align === "end" ? (
    <div className="flex flex-col items-end gap-1.5">
      <Skeleton className="w-[33px]" />
      <Skeleton className="w-[53px]" flat />
    </div>
  ) : (
    <div className="flex flex-col gap-1.5">
      <Skeleton className="w-20" />
      <Skeleton className="w-[146px]" flat />
    </div>
  );
}

const AVATARS = {
  mike: "/framer/GwjGgr1fKE7kCXJVWH192ctSYo.png",
  david: "/framer/cYBcoginxXaep3GoK4mZcfyp8.png",
  ali: "/framer/7boxDpkOgRw2nJfniFJfLlt2dlY.png",
  eli: "/framer/8Hj7senEeCj9G3dHeliXqDZAg.png",
  james: "/framer/yNe5c6nYGGjDSnrTjKF48hFbPq0.png",
  sophie: "/framer/3JBNMu5nBmZVPJiH1BX39OHaPs.png",
} as const;

/** "Payment Tracking & Reminders" mockup: upcoming payments grouped by day (428x532). */
export function UpcomingPaymentsMockup() {
  const payment = (avatar: string, name: string, amount: string, kind: string) => (
    <div className="flex w-full items-center gap-2.5 rounded-[10px] p-2.5">
      <SquareAvatar src={avatar} />
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">{name}</p>
        <div className="flex w-full items-center justify-between">
          <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-black">{amount}</p>
          <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500">{kind}</p>
        </div>
      </div>
    </div>
  );
  const skeletonRow = (avatar: string) => (
    <div className="flex w-full items-center gap-2.5 rounded-[10px] p-2.5">
      <SquareAvatar src={avatar} />
      <div className="flex min-w-0 flex-1 flex-col">
        <SkeletonStack />
      </div>
    </div>
  );
  return (
    <MockupFrame className={`flex flex-col overflow-hidden rounded-[16px] bg-white ${HAIRLINE}`}>
      <ListHeader>Upcoming Payments</ListHeader>
      <div className={`relative flex w-full flex-col gap-3 px-1.5 pt-2.5 pb-1.5 ${BOTTOM_LINE}`}>
        <div className="flex w-full flex-col gap-1">
          <DateLabel>Today</DateLabel>
          {payment(AVATARS.mike, "mike_trainer", "$200", "Deposit")}
          {payment(AVATARS.david, "davidcoach", "$125", "Installment")}
        </div>
        <div className="flex w-full flex-col gap-1">
          <DateLabel>Yesterday</DateLabel>
          {skeletonRow(AVATARS.ali)}
        </div>
        <div className="flex w-full flex-col gap-1">
          <DateLabel>23 Apr</DateLabel>
          {skeletonRow(AVATARS.eli)}
          {skeletonRow(AVATARS.james)}
          {skeletonRow(AVATARS.sophie)}
        </div>
        <div className="h-10 w-[428px] max-w-none bg-[linear-gradient(rgba(255,255,255,0)_0%,#fff_100%)]" />
      </div>
    </MockupFrame>
  );
}

/** "Revenue & Commission Tracking" mockup: won deals with cash collected / commission totals (428x771, 31px from the left). */
export function WonDealsMockup() {
  const deal = (avatar: string, name: string, amount: string, earned: string) => (
    <div className="flex w-full items-center gap-2.5 rounded-[10px] p-2.5">
      <SquareAvatar src={avatar} />
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">{name}</p>
        <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-black">{amount}</p>
      </div>
      <div className="flex flex-col items-end gap-2.5">
        <p className="text-right text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre text-gray-500">Earned</p>
        <p className="text-right text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-[#059666]">{earned}</p>
      </div>
    </div>
  );
  const skeletonDeal = (avatar: string, hovered = false) => (
    <div className={`flex w-full items-center justify-between rounded-[10px] p-2.5 ${hovered ? `bg-gray-50 ${HAIRLINE}` : ""}`}>
      <div className="flex items-center gap-2.5">
        <SquareAvatar src={avatar} />
        <SkeletonStack />
      </div>
      <SkeletonStack align="end" />
    </div>
  );
  return (
    <div className={`absolute top-12 right-4 left-4 flex flex-col overflow-hidden rounded-[16px] bg-white md:right-auto md:left-[calc(50%-239px)] md:w-[428px] ${HAIRLINE}`}>
      <ListHeader>Won deals</ListHeader>
      <div className={`relative flex w-full ${BOTTOM_LINE}`}>
        <div className={`relative flex flex-1 flex-col gap-4 p-4 ${RIGHT_LINE}`}>
          <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">Cash Collected</p>
          <p className="text-[24px] leading-[24px] font-medium tracking-[-0.72px] whitespace-pre-wrap text-black">$10.3K</p>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">Commission</p>
          <p className="text-[24px] leading-[24px] font-medium tracking-[-0.72px] whitespace-pre-wrap text-black">$1.1K</p>
        </div>
      </div>
      <div className={`relative flex w-full flex-col gap-3 px-1.5 pt-2.5 pb-1.5 ${BOTTOM_LINE}`}>
        <div className="flex w-full flex-col gap-1">
          <DateLabel>Today</DateLabel>
          {deal(AVATARS.mike, "mike_trainer", "$5,000", "$300")}
        </div>
        <div className="flex w-full flex-col gap-1">
          <DateLabel>Yesterday</DateLabel>
          {skeletonDeal(AVATARS.david)}
          {skeletonDeal(AVATARS.ali, true)}
          {skeletonDeal(AVATARS.james)}
        </div>
        <div className="flex w-full flex-col gap-1">
          <DateLabel>23 Apr</DateLabel>
          {deal(AVATARS.eli, "elimuradov", "$100", "$10")}
          {deal(AVATARS.mike, "mike_trainer", "$5,000", "$300")}
          {deal(AVATARS.james, "jamescoach", "$1,500", "$150")}
          {deal(AVATARS.eli, "elimuradov", "$100", "$10")}
          {deal(AVATARS.mike, "mike_trainer", "$5,000", "$300")}
          {deal(AVATARS.james, "jamescoach", "$1,500", "$150")}
        </div>
        <div className="h-10 w-[428px] max-w-none bg-[linear-gradient(rgba(255,255,255,0)_0%,#fff_100%)]" />
      </div>
    </div>
  );
}
