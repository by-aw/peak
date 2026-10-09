import Image from "next/image";
import { FeatIcon, type FeatIconId } from "./sprite";

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="relative size-5 shrink-0">
        <span className="absolute top-[7px] left-[7px] size-1.5 rounded-full bg-black opacity-25" />
      </span>
      <p className="flex-1 text-[16px] leading-5 font-normal tracking-[-0.24px] text-black">{children}</p>
    </div>
  );
}

function Section({ icon, title, items }: { icon: FeatIconId; title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2.5">
        <FeatIcon id={icon} className="size-5" />
        <p className="flex-1 text-[16px] leading-5 font-medium tracking-[-0.24px] text-black">{title}</p>
      </div>
      {items.map((t) => (
        <Bullet key={t}>{t}</Bullet>
      ))}
    </div>
  );
}

function GlassTag({ icon, text, bg }: { icon: FeatIconId; text: string; bg: string }) {
  return (
    <span className="relative flex items-center rounded-full py-1.5 pr-1 pl-2 shadow-[0_0_0_0.5px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]" style={{ background: bg }}>
      <FeatIcon id={icon} className="relative z-10 size-4" />
      <span className="relative z-10 px-1.5 text-[13px] leading-[15px] font-medium tracking-[-0.35px] whitespace-nowrap text-black lg:text-[14.5px]">
        {text}
      </span>
    </span>
  );
}

/** Feature 5 — "AI CRM": the lead profile with tags, owners and the AI summary. */
export function CrmMockup() {
  return (
    <div className="relative flex h-full w-full flex-col bg-white font-runde">
      <div className="flex flex-col gap-6 px-6 pt-8 lg:px-8">
        <div className="flex items-start justify-between">
          <Image src="/framer/EMzx2Vc8wAtmgFlxbIc0GwQcABg.png" alt="" width={64} height={64} className="size-16 rounded-full" />
          <span className="flex items-center gap-2 rounded-full bg-[rgba(225,113,0,0.22)] py-2.5 pr-3 pl-2.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)]">
            <FeatIcon id="feat-Star" className="size-6" />
            <span className="text-[16px] leading-[19.2px] font-semibold tracking-[-0.24px] text-black">Qualified</span>
            <FeatIcon id="feat-IconChevronRightMedium" className="size-5" />
          </span>
        </div>
        <p className="text-[22px] leading-[34px] font-bold tracking-[-0.38px] text-black lg:text-[24px]">harrywatts</p>
      </div>
      <div className="flex flex-col gap-1 px-6 py-4 lg:px-8">
        <div className="flex flex-col gap-1.5 rounded-t-3xl rounded-b-lg bg-black/5 p-4">
          <div className="flex items-center justify-between">
            <p className="flex-1 text-[12px] leading-4 font-normal text-black opacity-50">Tags</p>
            <FeatIcon id="feat-IconPencil" className="size-4" />
          </div>
          <div className="flex items-center gap-2">
            <GlassTag icon="feat-IconTeam2" text="Has a team" bg="rgba(118,183,255,0.35)" />
            <GlassTag icon="feat-IconDollar" text="Budget Confirmed" bg="rgba(96,214,120,0.3)" />
          </div>
        </div>
        <div className="flex gap-1">
          <div className="flex flex-1 flex-col gap-1.5 rounded-[8px_8px_8px_24px] bg-black/5 p-4">
            <p className="text-[12px] leading-4 font-normal text-black opacity-50">Setter</p>
            <div className="flex h-5 items-end gap-2">
              <p className="flex-1 text-[14px] leading-4 font-medium tracking-[-0.24px] text-black lg:text-[16px] lg:leading-5">Jordan</p>
              <Image src="/framer/cETCvPg5Ht97h8wQ84LDWeNcuw.jpg" alt="" width={32} height={32} className="size-8 rounded-full object-cover" />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1.5 rounded-[8px_8px_24px_8px] bg-black/5 p-4">
            <p className="text-[12px] leading-4 font-normal text-black opacity-50">Closer</p>
            <div className="flex h-5 items-end gap-2">
              <p className="flex-1 text-[14px] leading-4 font-medium tracking-[-0.24px] text-black lg:text-[16px] lg:leading-5">Alex Romero</p>
              <Image src="/framer/BSKLI8GcqaSLkJ3ch9y05W43ivk.jpg" alt="" width={32} height={32} className="size-8 rounded-full object-cover" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-4 lg:px-8">
        <div className="flex flex-col gap-6 rounded-3xl bg-black/5 p-4">
          <div className="flex items-center gap-2.5">
            <p className="flex-1 text-[20px] leading-5 font-semibold tracking-[-0.24px] text-black">AI Summary</p>
            <FeatIcon id="feat-IconExpand45" className="size-4" />
          </div>
          <Section
            icon="feat-IconFlag1"
            title="Pain Points"
            items={[
              "Is frustrated with his current team members",
              "Hates losing money in his inbox",
              "Already tried hiring managers but didn't see any improvements",
            ]}
          />
          <Section icon="feat-IconTargetArrow" title="Desired Outcomes" items={["Wants to scale his coaching business to $50k/mo"]} />
          <Section
            icon="feat-IconBubbleDots"
            title="Key Quotes"
            items={[
              "“i have 2 setters but tbh looking for a better way to manage them”",
              "“they are leaving qualified leads waiting for hours in the inbox, we're probably losing tons of money”",
              "“Budget is $5k.”",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
