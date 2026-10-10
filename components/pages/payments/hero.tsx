import Image from "next/image";
import { RollingButton } from "@/components/shared/rolling-button";
import { MagnifyingGlassIcon } from "@/components/icons/payments-icons";
import { APP_URL } from "@/lib/site";
import { CLOSERS_CARD, FEES_CARD, ReportCard, SETTERS_CARD } from "./mockups";

export const PAYMENTS_LOGIN = `${APP_URL}/login?landing_page=payments`;

/** Red-dot caption under the hero / before-CTA buttons. */
export function IncludedLabel() {
  return (
    <div className="flex items-center justify-center gap-1">
      <span className="size-1.5 shrink-0 rounded-full bg-[#f43f5e]" />
      <p className="text-[14px] leading-[18.2px] font-normal whitespace-pre text-gray-550 md:leading-[16.8px]">Included in every Mochi plan. No extra cost.</p>
    </div>
  );
}

const USERS: { avatar?: string; name: string; handle: string; selected?: boolean; dim?: boolean; gradient?: boolean }[] = [
  { avatar: "/framer/yNe5c6nYGGjDSnrTjKF48hFbPq0.png", name: "Alex", handle: "@alexg", selected: true },
  { avatar: "/framer/rSFR7aaRicYoCzr5EshqVWTSPpE.png", name: "Ali", handle: "@alimamedgasanov" },
  { avatar: "/framer/GwjGgr1fKE7kCXJVWH192ctSYo.png", name: "Nick", handle: "@nickbaked" },
  { avatar: "/framer/WPEjXCzUcK99F7UmgP7Kw68ZtQ.png", name: "Rachel Greene", handle: "@rgreene", dim: true },
  { name: "Emma", handle: "@emmacoach", gradient: true },
];

/** Framer "Dropdown" (271x320): "Leads" picker with a search field and five user rows. */
function LeadsDropdown() {
  return (
    <div className="flex w-[271px] flex-col gap-1 overflow-hidden rounded-[12px] bg-white p-1 shadow-[0_0_0_0.5px_#e0e0e0,0_16px_32px_0_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-2 rounded-[6px] p-2 pl-7">
        <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-[#6d6d6d]">Leads</p>
      </div>
      <div className="flex items-center gap-1 overflow-hidden rounded-[8px] bg-white p-2 shadow-[0_0_0_0.5px_#3b82f6,0_1px_2px_0_rgba(0,0,0,0.05)]">
        <span className="flex size-4 items-center justify-center overflow-hidden rounded-[2px]">
          <MagnifyingGlassIcon className="size-3" />
        </span>
        <div className="flex flex-1 items-center gap-1">
          <span className="h-3 w-px rounded-full bg-black" />
          <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-[#6d6d6d]">Type user...</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        {USERS.map((u) => (
          <div key={u.name} className={`flex items-center gap-2 p-2 ${u.selected ? "rounded-[8px] bg-[#efefef]" : "rounded-[6px]"}`}>
            {u.gradient ? (
              <span className="size-4 shrink-0 rounded-full bg-[linear-gradient(#a855f7_0%,#d946ef_50%,#ec4899_100%)]" />
            ) : (
              <Image src={u.avatar!} alt="" width={40} height={40} className={`size-4 shrink-0 rounded-full object-cover ${u.dim ? "opacity-50" : ""}`} />
            )}
            <div className={`flex flex-1 flex-col gap-1 ${u.dim ? "opacity-50" : ""}`}>
              <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-black">{u.name}</p>
              <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-[#6d6d6d]">{u.handle}</p>
            </div>
            <span className={`size-4 shrink-0 rounded-full ${u.dim ? "bg-[#f6f6f6]" : "bg-white"}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Framer "Hero Section" of /payments: centered headline, copy, button pair + caption, then the big
 * dashboard screenshot with four report mockups peeking out behind it at 64% opacity (tablet/desktop).
 * 1440x1413 / 1024x1152 / 390x747.
 */
export function PaymentsHero() {
  return (
    <section className="relative flex w-full flex-col items-center px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-12 md:gap-6">
        <div className="flex w-full max-w-[688px] flex-col items-center gap-8 md:gap-10 lg:gap-12">
          <div className="flex w-full flex-col items-center gap-4 md:gap-6">
            <h1 className="w-full text-center font-display text-[32px] leading-[36.8px] font-bold tracking-[0.64px] whitespace-pre-wrap text-ink-3 md:text-[40px] md:leading-[46px] md:tracking-[0.8px] lg:text-[48px] lg:leading-[55.2px] lg:tracking-[0.96px]">
              Every payment connected to the lead who made it
            </h1>
            <p className="w-full max-w-[576px] text-center text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] whitespace-pre-wrap text-ink-3 md:text-[16px] md:leading-[24px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px]">
              Stripe, Whop, FanBasis, Ablefy, bank transfers and crypto - all under one roof, automatically matched to your leads. See which leads convert, what they buy, what it costs you, and where to focus next.
            </p>
          </div>
          <div className="flex w-full flex-col items-center gap-4 md:w-[379px]">
            <div className="flex w-full flex-col items-center gap-2.5 md:flex-row">
              <RollingButton href={PAYMENTS_LOGIN} variant="black" className="w-full md:flex-1 md:basis-0">
                Start Free Trial
              </RollingButton>
              <RollingButton href="/demo" variant="white" className="w-full md:flex-1 md:basis-0">
                Book a Call
              </RollingButton>
            </div>
            <IncludedLabel />
          </div>
        </div>
        <div className="relative flex w-full flex-col md:pt-[112px] lg:pt-[136px]">
          <div aria-hidden className="pointer-events-none absolute inset-x-[-50px] top-1.5 z-[1] hidden h-[376px] opacity-64 md:block lg:inset-x-0 lg:top-6 lg:right-[-100px]">
            <ReportCard data={FEES_CARD} className="absolute top-[-25px] left-[-16px] w-[346px] scale-[0.6] lg:top-2 lg:left-[-64px] lg:scale-100" />
            <ReportCard data={SETTERS_CARD} className="absolute top-[-20px] left-[186px] w-[346px] scale-[0.6] lg:top-8 lg:left-[272px] lg:scale-100" />
            <div className="absolute top-[-8px] left-[599px] scale-[0.6] lg:top-[18px] lg:left-[655px] lg:scale-100">
              <LeadsDropdown />
            </div>
            <ReportCard data={CLOSERS_CARD} className="absolute top-[-16px] left-[693px] w-[368px] rounded-[12px]! scale-[0.6] lg:left-[896px] lg:scale-100" />
          </div>
          <div className="relative z-[1] w-full -translate-y-5 overflow-hidden rounded-[12px] shadow-[0_4px_32px_0_rgba(0,0,0,0.16),0_-2px_8px_0_rgba(0,0,0,0.02)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[12px] after:border-4 after:border-[#270835] md:-translate-y-16">
            <Image src="/framer/JInFSo2kLyIqOiCobyuDEcfiQ.png" alt="Mochi payments dashboard" width={3000} height={1872} preload sizes="(min-width: 1200px) 1200px, 100vw" className="h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
