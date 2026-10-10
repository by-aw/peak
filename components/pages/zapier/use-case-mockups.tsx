import Image from "next/image";
import type { ReactNode } from "react";
import {
  CheckIcon,
  CircleDashedIcon,
  CreatingTitleIcon,
  DividerIcon,
  DotsThreeVerticalIcon,
  Line94Icon,
  Line95Icon,
  Line97Icon,
  MochiBotIcon,
  MochiBotIcon2,
  MochiBotIcon3,
  SlackSmallIcon,
  Vector7094Icon,
  ZapierMarkIcon,
} from "./icons";

/* The three mockups stacked inside the "Image Wrapper" of the Use Case section (Framer "Spreadsheet", "Slack", "CRM"). */

function Tag({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-1 rounded-t-[12px] bg-white px-2 py-[7px]">
      <CircleDashedIcon className="size-[18px] shrink-0" />
      <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-[#6d6d6d]">{label}</p>
    </div>
  );
}

function Badge({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 rounded-[8px] bg-[rgba(67,196,150,0.1)] px-2 py-1.5 ${className}`.trim()}>
      <CheckIcon className="size-3 shrink-0" />
      <p className="text-[12px] leading-[12.6px] font-semibold tracking-[-0.2px] whitespace-pre text-[#43c496]">Successful</p>
    </div>
  );
}

function FlowCard({ icon, app, caption, tinted = false }: { icon: ReactNode; app: string; caption: string; tinted?: boolean }) {
  return (
    <div className={`flex w-[328px] flex-col items-start gap-3 rounded-[0_10px_10px_10px] p-3.5 shadow-[0_1px_14px_0_rgba(0,0,0,0.06)] ${tinted ? "bg-[#fefefe]" : "bg-white"}`}>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-1.5 rounded-[6px] bg-white p-1.5">
          {icon}
          <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-black">{app}</p>
        </div>
        <DotsThreeVerticalIcon className="size-[18px] shrink-0" />
      </div>
      <DividerIcon className="h-[3px] w-full" />
      <p className="w-full text-[12px] leading-3 font-normal tracking-[-0.2px] whitespace-pre-wrap text-[#6d6d6d]">{caption}</p>
    </div>
  );
}

/** Framer "Spreadsheet": the Zapier -> Google Sheet -> Notification -> Creating flow, the sheet card and the arrow. */
export function SpreadsheetMockup() {
  return (
    <div className="absolute left-[15px] h-[656px] w-[529px]">
      <div className="absolute top-0 left-0 h-[656px] w-[360px]">
        <div className="absolute top-0 left-0 flex w-full flex-col items-start px-4 pt-4">
          <Tag label="Routing" />
          <FlowCard icon={<ZapierMarkIcon className="size-4 shrink-0" />} app="Zapier" caption="Zapier routes the event data to connected apps" />
          <Badge className="absolute top-5 left-[255px] z-[1]" />
        </div>
        <Line94Icon className="absolute top-[143px] left-[175px] h-[59px] w-2.5" />
        <div className="absolute top-[204px] left-0 flex w-full flex-col items-start px-4">
          <FlowCard
            tinted
            icon={<Image src="/framer/au5ozrnYpCi5F5bLyYOsc8vdA.png" alt="" width={60} height={83} className="h-4 w-3 shrink-0 object-cover" />}
            app="Google Sheet"
            caption="Google Sheets get new row"
          />
        </div>
        <Line95Icon className="absolute top-[299px] left-[175px] h-[59px] w-2.5" />
        <div className="absolute top-[360px] left-0 flex w-full flex-col items-start px-4">
          <FlowCard tinted icon={<SlackSmallIcon className="size-4 shrink-0" />} app="Notification" caption="Slack posts an alert" />
        </div>
        <Line97Icon className="absolute top-[470px] left-[175px] h-7 w-2.5" />
        <div className="absolute top-[468px] left-0 flex w-full flex-col items-start px-4 pt-4">
          <Tag label="Creating" />
          <CreatingTitleIcon className="h-[93px] w-[328px]" />
          <Badge />
        </div>
      </div>
      <div className="absolute top-[15px] left-[238px] z-[2] flex w-[291px] flex-col items-center gap-5">
        <div className="h-[270px] w-[291px] overflow-hidden rounded-[16px] shadow-[0_0.87px_8.68px_0_rgba(0,0,0,0.03),0_2px_24px_0_rgba(0,0,0,0.06),2px_2px_24px_0_rgba(0,0,0,0.04)]">
          <Image src="/framer/8EVieT9Wjgud4LBrworbBZnYLT0.png" alt="" width={1164} height={1080} sizes="291px" className="h-full w-full rounded-[16px]" />
        </div>
        <SyncPill>Auto-synced via Zapier</SyncPill>
      </div>
      <Vector7094Icon className="absolute top-[335px] left-[350px] size-[63px]" />
    </div>
  );
}

function SyncPill({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-1 rounded-[32px] bg-[rgba(16,185,46,0.1)] px-2 py-1.5 ${className}`.trim()}>
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-[#10b92e]" />
      <p className="font-dm-mono text-[13px] leading-[13px] font-normal tracking-[-0.2px] whitespace-pre text-[#0eba2e]">{children}</p>
    </div>
  );
}

const NOTIFICATIONS: { icon: ReactNode; message: ReactNode; meta: ReactNode }[] = [
  {
    icon: <MochiBotIcon className="h-5 w-[22px] shrink-0" />,
    message: (
      <>
        Deal Won! 🎉 <span className="font-medium text-[#10b937]">@sarah_styles</span> closed for <span className="font-medium text-[#f58f29]">$299</span>
      </>
    ),
    meta: (
      <>
        Funnel: VIP Package → <span className="text-[#10b937]">Won</span>
      </>
    ),
  },
  {
    icon: <MochiBotIcon2 className="h-5 w-[22px] shrink-0" />,
    message: (
      <>
        Hot lead! <span className="font-medium text-[#f58f29]">@mike_fitness</span> just replied in DMs
      </>
    ),
    meta: "Source: Story mention • Assigned to: Alex",
  },
  {
    icon: <MochiBotIcon3 className="h-5 w-[22px] shrink-0" />,
    message: (
      <>
        <span className="font-medium text-[#f58f29]">@bella_beauty</span> messaged via Story mention
      </>
    ),
    meta: "Source: Story mention • Assigned to: Alex",
  },
];

/** Framer "Slack": three Mochi Bot notification cards. */
export function SlackMockup() {
  return (
    <div className="absolute left-[97px] flex w-[380px] flex-col items-center gap-2">
      {NOTIFICATIONS.map((n, i) => (
        <div key={i} className="flex w-full flex-col items-start gap-3 rounded-[16px] bg-white p-5">
          <div className="flex w-full flex-col items-start gap-1.5">
            <div className="flex w-full items-center gap-[13.18px]">
              <div className="flex items-center justify-center gap-1.5">
                {n.icon}
                <p className="text-[14px] leading-[14px] font-medium tracking-[-0.22px] whitespace-pre text-black">Mochi Bot</p>
              </div>
              <span aria-hidden className="size-1 shrink-0 rounded-full bg-[#d1d1d1]" />
              <p className="text-[14px] leading-[14px] font-medium tracking-[-0.22px] whitespace-pre text-black">10:24 AM</p>
            </div>
            <p className="w-full text-[14px] leading-[22px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-[#111]">{n.message}</p>
          </div>
          <p className="w-full text-[12px] leading-[18px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-[#bdbdbd]">{n.meta}</p>
        </div>
      ))}
    </div>
  );
}

const PIPELINE = [
  { stage: "New Lead", count: "12 leads", crm: "HubSpot", color: "#ff4800", width: 432 },
  { stage: "Contacted", count: "8 leads", crm: "Salesforce", color: "#559fe0", width: 291 },
  { stage: "Qualified", count: "5 leads", crm: "Pipedrive", color: "#33763c", width: 163 },
];

/** Framer "CRM": a window chrome with the "CRM Pipeline View" and three stage bars. */
export function CrmMockup() {
  return (
    <div className="absolute left-[18px] h-[397px] w-[538px] overflow-hidden rounded-[12px] bg-[#f7f7f7] shadow-[0_0_0_0.5px_#e0e0e0]">
      <div className="absolute inset-x-0 top-0 h-[34px] overflow-hidden bg-white">
        <div className="absolute top-[13px] left-2.5 flex items-center gap-0.5">
          <span className="size-2 rounded-full bg-[#f06e57]" />
          <span className="size-2 rounded-full bg-[#ffc33a]" />
          <span className="size-2 rounded-full bg-[#2fdc4d]" />
        </div>
        <p className="absolute top-[9px] left-1/2 -translate-x-1/2 text-[12px] leading-[16.8px] font-normal tracking-[-0.2px] whitespace-pre text-black">CRM Pipeline View</p>
      </div>
      <div className="absolute inset-x-0 top-[35px] bottom-0 overflow-hidden">
        <div className="absolute top-[23px] left-[29px] h-[397px] w-[480px] rounded-[16px] bg-white">
          {PIPELINE.map((p, i) => (
            <div key={p.stage} className="absolute inset-x-6 flex flex-col items-start gap-3" style={{ top: 24 + i * 81 }}>
              <div className="flex w-full items-start justify-between">
                <p className="text-[14px] leading-[19.6px] font-medium tracking-[-0.3px] whitespace-pre text-[#3c3c3c]">{p.stage}</p>
                <p className="text-[13px] leading-[18.2px] font-normal whitespace-pre text-[#3c3c3c]">{p.count}</p>
              </div>
              <div className="flex h-[25px] w-full items-center gap-3 bg-gray-25">
                <div className="flex h-[25px] items-center gap-2 overflow-hidden rounded-[6px] px-3 py-1" style={{ width: p.width, backgroundColor: p.color }}>
                  <p className="text-[12px] leading-[16.8px] font-medium tracking-[0.16px] whitespace-pre text-white">{p.crm}</p>
                </div>
              </div>
            </div>
          ))}
          <SyncPill className="absolute top-[291px] left-1/2 -translate-x-1/2">Last synced: 2 seconds ago</SyncPill>
        </div>
      </div>
    </div>
  );
}
