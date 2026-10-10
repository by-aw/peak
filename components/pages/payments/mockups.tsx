import Image from "next/image";
import type { ReactNode } from "react";
import { ChevronDownIcon, ChevronDownSmallIcon, UnmatchedAvatarIcon, UnmatchedAvatarSmallIcon } from "@/components/icons/payments-icons";

/* ------------------------------------------------------------------------------------------------
 * Report cards (Framer "Card #1/#2/#3" of the hero and the "Desktop/1" stack of the features section)
 * ---------------------------------------------------------------------------------------------- */

export type ReportRow = { avatar: string; name: string; value: string; sub: string; sub2?: string; right: string; square?: boolean };
export type ReportCardData = { title: string; stats?: [string, string][]; rows: ReportRow[] };

export const SETTERS_CARD: ReportCardData = {
  title: "Setters",
  stats: [
    ["Commission Rate", "5%"],
    ["Total Commission", "$3K"],
  ],
  rows: [
    { avatar: "/framer/WfGh6ISHdjwbipoqoUimgkxyqI.png", name: "Jane", value: "$1,499.10", sub: "12 deals", sub2: "$20K revenue", right: "Commission" },
    { avatar: "/framer/nelubE7l2ZzJ9Tg3l0IDknQmETk.jpg", name: "Tom", value: "$988.90", sub: "8 deals", sub2: "$15.4K revenue", right: "Commission" },
    { avatar: "/framer/URh2xJvwGoPes6ttUmzIS30BZU.jpg", name: "Amy", value: "$82.31", sub: "2 deals", sub2: "$6.3K revenue", right: "Commission" },
  ],
};

export const FEES_CARD: ReportCardData = {
  title: "Processing Fees by provider",
  rows: [
    { avatar: "/framer/RW8jcm1ArnNjdbNZvofTvWJDCJE.png", name: "FanBasis", value: "$82.31", sub: "6 transactions", right: "Total fees", square: true },
    { avatar: "/framer/3WN7Xl1ipPUMW0ftGT56hgycZo.png", name: "Whop", value: "$1,499.10", sub: "4 transactions", right: "Total fees", square: true },
    { avatar: "/framer/LCA991fmJM3Cg2Mo4lTPmmkGqWQ.png", name: "Stripe", value: "$988.90", sub: "13 transactions", right: "Total fees", square: true },
  ],
};

export const CLOSERS_CARD: ReportCardData = {
  title: "Closers",
  stats: [
    ["Commission Rate", "10%"],
    ["Total Commission", "$5.7K"],
  ],
  rows: [
    { avatar: "/framer/k8PRX3jhoB8jeptWF3jXIPrzMU.jpg", name: "Bella", value: "$1,499.10", sub: "12 deals", sub2: "$20K revenue", right: "Commission" },
    { avatar: "/framer/cYBcoginxXaep3GoK4mZcfyp8.png", name: "Nick", value: "$988.90", sub: "8 deals", sub2: "$15.4K revenue", right: "Commission" },
    { avatar: "/framer/8Hj7senEeCj9G3dHeliXqDZAg.png", name: "John", value: "$82.31", sub: "2 deals", sub2: "$6.3K revenue", right: "Commission" },
  ],
};

/** Data of the small "Desktop/1" stack in the features section (Whop/Stripe/FanBasis with volumes; Bella + John). */
export const FEES_MINI: ReportCardData = {
  title: "Processing Fees by provider",
  rows: [
    { avatar: "/framer/SXRvjjK82GbGGGs4oZPWqCjqSs.png", name: "Whop", value: "$1,499.10", sub: "4 transactions", sub2: "$20K volume", right: "Total fees", square: true },
    { avatar: "/framer/nelubE7l2ZzJ9Tg3l0IDknQmETk.jpg", name: "Stripe", value: "$988.90", sub: "13 transactions", sub2: "$20K volume", right: "Total fees", square: true },
    { avatar: "/framer/U4R8Nb7s2UqfrxMslOxB1HLT7b0.png", name: "FanBasis", value: "$82.31", sub: "6 transactions", sub2: "$3K volume", right: "Total fees", square: true },
  ],
};

export const CLOSERS_MINI: ReportCardData = { ...CLOSERS_CARD, rows: [CLOSERS_CARD.rows[0], CLOSERS_CARD.rows[2]] };

/**
 * White report card: grey 44px header, optional two stat cells, then 70px rows (avatar, name/value, sub/right).
 * `size="sm"` is the 0.558x variant of the features-section stack (7.82px text, 39px rows).
 */
export function ReportCard({ data, size = "md", className = "", rows }: { data: ReportCardData; size?: "md" | "sm"; className?: string; rows?: number }) {
  const sm = size === "sm";
  const t = sm ? "text-[7.82px] leading-[8.21px] tracking-[-0.11px]" : "text-[14px] leading-[14.7px] tracking-[-0.2px]";
  const s = sm ? "text-[7.82px] leading-[7.82px] tracking-[-0.11px]" : "text-[14px] leading-[14px] tracking-[-0.2px]";
  const list = rows ? data.rows.slice(0, rows) : data.rows;
  return (
    <div className={`flex w-full flex-col overflow-hidden bg-white ${sm ? "rounded-[6.7px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.06)]" : "rounded-[16px]"} ${className}`}>
      <div className={`flex w-full items-center overflow-hidden bg-gray-25 ${sm ? "p-[8.93px]" : "p-4"}`}>
        <p className={`${t} font-medium whitespace-pre text-[#6d6d6d]`}>{data.title}</p>
      </div>
      {data.stats && (
        <div className="flex w-full">
          {data.stats.map(([label, value]) => (
            <div key={label} className={`flex flex-1 basis-0 flex-col ${sm ? "gap-[6.7px] p-[8.93px]" : "gap-3 p-4"}`}>
              <p className={`${s} font-normal whitespace-pre text-[#6d6d6d]`}>{label}</p>
              <p className={`${sm ? "text-[8.93px] leading-[8.93px] tracking-[-0.22px]" : "text-[16px] leading-[16px] tracking-[-0.4px]"} font-medium whitespace-pre text-black`}>{value}</p>
            </div>
          ))}
        </div>
      )}
      {list.map((row) => (
        <div key={row.name} className={`flex w-full items-start overflow-hidden ${sm ? "gap-2 p-[8.93px]" : "gap-4 p-4"}`}>
          <Image
            src={row.avatar}
            alt=""
            width={64}
            height={64}
            className={`shrink-0 object-cover ${sm ? "size-[18px]" : "size-8"} ${row.square ? (sm ? "rounded-[4.47px]" : "rounded-[8px]") : "rounded-full"}`}
          />
          <div className={`flex flex-1 flex-col ${sm ? "gap-[3.35px]" : "gap-1.5"}`}>
            <div className="flex w-full items-center justify-between">
              <p className={`${t} font-medium whitespace-pre text-black`}>{row.name}</p>
              <p className={`${t} font-medium whitespace-pre text-black`}>{row.value}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className={`flex items-center ${sm ? "gap-[5px]" : "gap-2"}`}>
                <p className={`${s} font-normal whitespace-pre text-[#6d6d6d]`}>{row.sub}</p>
                {row.sub2 && (
                  <>
                    <span className={`rounded-full bg-[#d1d1d1] ${sm ? "size-0.5" : "size-1"}`} />
                    <p className={`${s} font-normal whitespace-pre text-[#6d6d6d]`}>{row.sub2}</p>
                  </>
                )}
              </div>
              <p className={`${s} font-normal whitespace-pre text-[#6d6d6d]`}>{row.right}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * "Leads Pursue" list (problem card 1 at 0.68 scale, setup Card#2 at full size)
 * ---------------------------------------------------------------------------------------------- */

type Lead = { avatar?: string; name: string; handle?: string; unmatched?: boolean; program: string; amount: string };

const LEADS_PROBLEM: Lead[] = [
  { name: "Derek Hale", unmatched: true, program: "Elite 12-Week", amount: "$2,500.00" },
  { avatar: "/framer/gor8w17Ssc9rqAWWpM2HMtRq4w.png", name: "Rachel Greene", handle: "@rgreene", program: "Elite 12-Week", amount: "$2,500.00" },
  { avatar: "/framer/gor8w17Ssc9rqAWWpM2HMtRq4w.png", name: "Monica Geller", handle: "@mgeller", program: "Ultimate Fitness", amount: "$3,000.00" },
  { avatar: "/framer/gor8w17Ssc9rqAWWpM2HMtRq4w.png", name: "Chandler Bing", handle: "@cbing", program: "30-Day Challenge", amount: "$1,500.00" },
  { avatar: "/framer/gor8w17Ssc9rqAWWpM2HMtRq4w.png", name: "Joey Tribbiani", handle: "@jtribbiani", program: "Nutrition Bootcamp", amount: "$1,800.00" },
];

const LEADS_SETUP: Lead[] = [
  { name: "Derek Hale", unmatched: true, program: "ACH", amount: "$2,500.00" },
  { avatar: "/framer/95eTcupDYD7bOM9QUPWAmUhvXxw.jpg", name: "Rachel Greene", handle: "@rgreene", program: "Stripe", amount: "$2,500.00" },
  { avatar: "/framer/Q24eVJitIpDi4rMlk8fW4We66I.jpg", name: "Monica Geller", handle: "@mgeller", program: "Whop", amount: "$3,000.00" },
  { avatar: "/framer/pfto1SYkx5Ej8IV2GQ4vnHsyE.jpg", name: "Chandler Bing", handle: "@cbing", program: "Whop", amount: "$1,500.00" },
  { avatar: "/framer/IVwGHEMAo3x76HsRFYSH2b76T8.jpg", name: "Joey Tribbiani", handle: "@jtribbiani", program: "Stripe", amount: "$1,800.00" },
];

/**
 * Framer "Leads Pursue": white list with a grey "Lead" header; the first (unmatched) row has a red
 * placeholder avatar and a "Match" dropdown button. `variant="problem"` is the 400px-wide design that
 * the problem card shows scaled to 0.68; `variant="setup"` the 357px one of the Set-up Card#2.
 */
export function LeadsList({ variant }: { variant: "problem" | "setup" }) {
  const leads = variant === "problem" ? LEADS_PROBLEM : LEADS_SETUP;
  const setup = variant === "setup";
  return (
    <div className={`flex flex-col overflow-hidden rounded-[12px] bg-white ${setup ? "w-[357px]" : "w-[400px]"}`}>
      <div className="flex w-full items-center bg-gray-25 p-4">
        <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-[#6d6d6d]">Lead</p>
      </div>
      {leads.map((lead) => (
        <div key={lead.name} className={`flex w-full items-start gap-4 overflow-hidden ${setup ? "p-3" : "p-3"}`}>
          {lead.avatar ? (
            <Image src={lead.avatar} alt="" width={64} height={64} className="size-8 shrink-0 rounded-full object-cover" />
          ) : setup ? (
            <UnmatchedAvatarIcon className="size-8 shrink-0" />
          ) : (
            <UnmatchedAvatarSmallIcon className="size-8 shrink-0" />
          )}
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="flex w-full items-center gap-1.5">
              <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-black">{lead.name}</p>
              {lead.unmatched ? (
                <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-[#e11d48]">Unmatched</p>
              ) : (
                <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-[#6d6d6d]">{lead.handle}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre text-[#6d6d6d]">{lead.program}</p>
              <span className="size-1 rounded-full bg-[#d1d1d1]" />
              <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre text-[#6d6d6d]">{lead.amount}</p>
            </div>
          </div>
          {lead.unmatched && (
            <div className="flex shrink-0 items-center gap-1 rounded-[6px] bg-white p-1.5 shadow-[0_0_0_0.5px_#b0b0b0,0_1px_2px_0_rgba(0,0,0,0.05)]">
              <p className="pl-0.5 text-center text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-black">Match</p>
              <span className="flex size-4 items-center justify-center">{setup ? <ChevronDownIcon className="h-[5px] w-2" /> : <ChevronDownSmallIcon className="h-[5px] w-2" />}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/** Centering helper: positions a mockup horizontally centered at `top` px inside a relative, clipped box. */
export function Centered({ top, children, className = "" }: { top: string; children: ReactNode; className?: string }) {
  return <div className={`absolute left-1/2 -translate-x-1/2 ${top} ${className}`}>{children}</div>;
}
