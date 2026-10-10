import Image from "next/image";
import { MockupFrame, Skeleton } from "@/components/shared/feature-card";
import { PodiumFirst, PodiumFirstLabel, PodiumSecond, PodiumThird, UserMicroIcon } from "@/components/icons/feature-icons";

/** White 16px-radius mockup card with the Framer `0 0 0 .5px #e0e0e0` + `0 1px 2px` shadow and 1px #e7e7e7 hairline. */
export const MOCKUP_CARD_SHADOW = "shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05),inset_0_0_0_1px_#e7e7e7]";
/** 1px #e7e7e7 hairline only (Framer `::after` border). */
export const HAIRLINE = "shadow-[inset_0_0_0_1px_#e7e7e7]";

const FILTERS = ["All", "🔥 Hot", "Paid", "Stage", "Setter", "Source"];
const LEADS = ["lauraK_results", "alex.j_coach", "sara.n_fitness", "user_49sk"];

/** "Lead Overview" mockup: filter pills above a leads table (428x322). */
export function LeadOverviewMockup() {
  return (
    <MockupFrame className={`flex flex-col overflow-hidden rounded-[16px] bg-gray-25 ${HAIRLINE}`}>
      <div className="flex w-full flex-col gap-[14px] p-4">
        <div className="flex w-full gap-2">
          {FILTERS.map((label, i) => (
            <div
              key={label}
              className={`flex items-center justify-center overflow-hidden bg-white p-2 ${i === 1 ? "rounded-[8px]" : "rounded-[6px]"} ${
                i === 0 ? "shadow-[0_0_0_0.5px_#3b82f6,0_1px_2px_0_rgba(0,0,0,0.05)]" : "shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]"
              }`}
            >
              <p className={`text-[13px] leading-[13.65px] font-medium tracking-[-0.2px] whitespace-pre ${i === 0 ? "text-black" : "text-gray-500"}`}>{label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={`flex w-full flex-col rounded-[16px] bg-white p-4 ${HAIRLINE}`}>
        <div className="flex w-full flex-col gap-2">
          <div className="relative h-7 w-full overflow-hidden rounded-[6px] bg-[#f5f5f5]">
            <p className="absolute top-2 left-2 text-[12px] leading-[12.6px] font-normal tracking-[-0.2px] whitespace-pre text-[#aaa]">Lead</p>
            <div className="absolute top-2 right-2 flex items-center gap-8">
              {["Status", "Setter", "Revenue"].map((h) => (
                <p key={h} className="text-[12px] leading-[12.6px] font-normal tracking-[-0.2px] whitespace-pre text-[#aaa]">
                  {h}
                </p>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className={`relative h-8 w-full overflow-hidden rounded-[6px] bg-white ${HAIRLINE}`}>
              <p className="absolute top-[10px] left-2 text-[12px] leading-[12.6px] font-normal tracking-[-0.2px] whitespace-pre text-[#aaa]">mike.t_brands</p>
              <div className="absolute top-[10px] right-2 flex items-center gap-8">
                <p className="text-[12px] leading-[12.6px] font-medium tracking-[-0.2px] whitespace-pre text-[#06b67c]">Paid</p>
                <p className="text-[12px] leading-[12.6px] font-normal tracking-[-0.2px] whitespace-pre text-[#aaa]">Alex J.</p>
                <p className="text-[12px] leading-[12.6px] font-medium tracking-[-0.2px] whitespace-pre text-[#06b67c]">$2,400</p>
              </div>
            </div>
            {LEADS.map((lead) => (
              <div key={lead} className={`relative h-8 w-full overflow-hidden rounded-[6px] bg-white ${HAIRLINE}`}>
                <p className="absolute top-[10px] left-2 text-[12px] leading-[12.6px] font-normal tracking-[-0.2px] whitespace-pre text-[#aaa]">{lead}</p>
                <div className="absolute top-[13px] right-2 flex items-center gap-8">
                  <Skeleton className="w-9" />
                  <Skeleton className="w-9" />
                  <Skeleton className="w-9" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

function FunnelRow({ label, count, pct, bar }: { label: string; count: string; pct: string; bar?: string }) {
  return (
    <div className={`flex h-[30px] w-full items-center gap-8 overflow-hidden rounded-[6px] bg-white px-2 py-[9px] ${HAIRLINE}`}>
      <p className="text-[11px] leading-[11.55px] font-normal tracking-[-0.2px] whitespace-pre text-[#aaa]">{label}</p>
      {bar ? (
        <div className="relative h-1.5 flex-1">
          <Skeleton className={`absolute inset-y-0 left-0 ${bar}`} />
        </div>
      ) : (
        <Skeleton className="flex-1" />
      )}
      <p className="text-[11px] leading-[11.55px] font-normal tracking-[-0.2px] whitespace-pre text-[#aaa]">{count}</p>
      <p className="text-[11px] leading-[11.55px] font-medium tracking-[-0.2px] whitespace-pre text-[#aaa]">{pct}</p>
    </div>
  );
}

function LostTag({ lost, leads }: { lost: string; leads: string }) {
  return (
    <div className="flex items-center gap-1.5 opacity-50">
      <p className="text-[10px] leading-[10.5px] font-medium tracking-[-0.2px] whitespace-pre text-[#e14f4f]">{lost}</p>
      <div className="flex items-center rounded-[5px] bg-[rgba(225,79,79,0.08)] px-2 py-1">
        <p className="text-[9px] leading-[9.45px] font-medium tracking-[-0.2px] whitespace-pre text-[#e04f4f]">{leads}</p>
      </div>
    </div>
  );
}

/** "Custom Funnel Builder" mockup: a funnel table with drop-off tags (428x315). */
export function FunnelBuilderMockup() {
  return (
    <MockupFrame className={`flex flex-col gap-4 overflow-hidden rounded-[16px] bg-white p-6 ${MOCKUP_CARD_SHADOW}`}>
      <div className="flex w-full flex-col gap-6">
        <FunnelRow label="Contacted" count="248" pct="100%" />
        <div className="flex w-full flex-col gap-2">
          <FunnelRow label="Replied" count="154" pct="62%" bar="w-[72%]" />
          <LostTag lost="Lost 38%" leads="-94 leads" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <FunnelRow label="Qualified" count="84" pct="34%" bar="w-1/2" />
          <LostTag lost="Lost 45%" leads="-70 leads" />
        </div>
        <div className="flex w-full flex-col gap-2">
          <FunnelRow label="Booked" count="40" pct="16%" bar="w-[34%]" />
          <LostTag lost="Lost 52%" leads="-44 leads" />
        </div>
      </div>
    </MockupFrame>
  );
}

const INSIGHTS: { label: string; value: string; count: string }[] = [
  { label: "❓ Top Question", value: "\"How long until I see results?\"", count: "82X" },
  { label: "😡 Top Complaint", value: "\"No response for days\", slow follow-up", count: "64X" },
  { label: "💡 Key Pattern", value: "Price objection → booking rate drops 3x", count: "51X" },
];

/** "Conversation Intelligence" mockup: AI insights pill above three insight rows (428 wide, 31px from the left on desktop). */
export function ConversationIntelligenceMockup() {
  return (
    <div className="absolute top-12 right-4 left-4 flex flex-col items-center gap-5 md:right-auto md:left-[calc(50%-239px)] md:w-[428px]">
      <div className="flex w-full flex-col items-center rounded-[12px] bg-[#f5f3ff] p-[14px] shadow-[0_4.19px_6.29px_-2.1px_rgba(0,0,0,0.05),inset_0_0_0_1px_#ddd6fe] md:w-auto">
        <div className="flex items-center gap-1.5">
          <span className="relative block size-4 shrink-0 overflow-hidden">
            <span className="absolute inset-0.5 block">
              <UserMicroIcon />
            </span>
          </span>
          <p className="text-[14.68px] leading-[14.68px] font-medium tracking-[-0.21px] whitespace-pre-wrap text-[#2e1065] md:whitespace-pre">AI Insights generated from Instagram analysis</p>
        </div>
      </div>
      <div className={`flex w-full flex-col gap-8 overflow-hidden rounded-[16px] bg-white p-6 ${MOCKUP_CARD_SHADOW}`}>
        {INSIGHTS.map((row) => (
          <div key={row.label} className="flex w-full flex-col gap-2">
            <p className="text-[14px] leading-[24px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">{row.label}</p>
            <div className="flex w-full items-center justify-between">
              <p className="text-[14px] leading-[14px] font-medium tracking-[-0.2px] whitespace-pre text-black">{row.value}</p>
              <div className="flex items-center rounded-full bg-gray-25 px-2 py-1">
                <p className="text-[10px] leading-[10px] font-medium tracking-[-0.2px] whitespace-pre text-black">{row.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PodiumPerson({ src, name, reply, className = "" }: { src: string; name: string; reply: string; className?: string }) {
  return (
    <div className={`flex w-full flex-col items-center gap-3 ${className}`.trim()}>
      <Image src={src} alt="" width={128} height={128} className="size-8 rounded-full object-cover" />
      <div className="flex w-full flex-col gap-2">
        <p className="text-center text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-black">{name}</p>
        <p className="text-center text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">{reply}</p>
      </div>
    </div>
  );
}

const LEADERBOARD: { rank: string; name: string; earned: string; avatar: string; shaded: boolean }[] = [
  { rank: "#4", name: "Mike Trainer", earned: "$4K earned", avatar: "/framer/yNe5c6nYGGjDSnrTjKF48hFbPq0.png", shaded: true },
  { rank: "#5", name: "Eli Muradov", earned: "$3.7K earned", avatar: "/framer/8Hj7senEeCj9G3dHeliXqDZAg.png", shaded: false },
  { rank: "#6", name: "Sophie", earned: "$3.5K earned", avatar: "/framer/3JBNMu5nBmZVPJiH1BX39OHaPs.png", shaded: true },
  { rank: "#7", name: "Ali Mamedgasanov", earned: "$2.9K earned", avatar: "/framer/7boxDpkOgRw2nJfniFJfLlt2dlY.png", shaded: false },
];

/** "Weekly Team Reports" mockup: a 3-cylinder podium with avatars and a #4-#7 leaderboard (428x538). */
export function WeeklyReportsMockup() {
  return (
    <MockupFrame className={`flex flex-col overflow-hidden rounded-[16px] bg-white ${HAIRLINE}`}>
      <div className="relative flex h-[354px] w-full items-end justify-center gap-6 overflow-hidden p-5 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#e7e7e7]">
        <div className="relative h-[314px] w-[376px] shrink-0">
          <div className="absolute inset-x-[133px] -top-4 bottom-0 scale-[0.8] md:scale-100">
            <div className="absolute inset-x-0 top-[116px]">
              <PodiumFirst />
            </div>
            <PodiumPerson src="/framer/54ld3a5oqlabzerddR3jMw1pU.png" name="You" reply="94% Reply" className="absolute inset-x-0 top-6" />
            <div className="absolute top-[130px] left-[33px]">
              <PodiumFirstLabel />
            </div>
          </div>
          <div className="absolute -top-8 bottom-4 left-0 w-[110px] scale-[0.8] md:scale-100">
            <div className="absolute inset-x-0 top-[171px]">
              <PodiumSecond />
            </div>
            <PodiumPerson src="/framer/cYBcoginxXaep3GoK4mZcfyp8.png" name="David" reply="78% Reply" className="absolute inset-x-0 top-[79px]" />
          </div>
          <div className="absolute top-[89px] right-0 flex w-[109px] scale-[0.8] flex-col gap-3 md:scale-100">
            <PodiumPerson src="/framer/GwjGgr1fKE7kCXJVWH192ctSYo.png" name="Nick" reply="61% Reply" />
            <PodiumThird />
          </div>
        </div>
      </div>
      {LEADERBOARD.map((row) => (
        <div
          key={row.rank}
          className={`relative flex h-[46px] w-[408px] max-w-none items-center gap-3 p-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#e7e7e7] ${row.shaded ? "bg-gray-25" : ""}`}
        >
          <p className="w-[18px] text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-gray-400">{row.rank}</p>
          <Image src={row.avatar} alt="" width={80} height={80} className="size-5 rounded-full object-cover" />
          <p className="flex-1 text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-black">{row.name}</p>
          <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre text-gray-500">{row.earned}</p>
        </div>
      ))}
    </MockupFrame>
  );
}
