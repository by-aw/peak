"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { AblefyRowIcon, FanBasisRowIcon, GrabCursorIcon, MochiPillIcon } from "@/components/icons/payments-icons";
import { CLOSERS_MINI, FEES_MINI, ReportCard, SETTERS_CARD } from "./mockups";

/** 18px tick used by the check lists of the features / AI sections (Framer "tick-02"). */
export function TickIcon() {
  return (
    <span className="flex size-[18px] shrink-0 items-center justify-center">
      <svg viewBox="0 0 12 10" className="h-[10px] w-3" fill="none" aria-hidden>
        <path d="M11.45.16c.23.21.24.57.02.8L3.6 9.2a.56.56 0 0 1-.82 0L.16 6.5a.56.56 0 0 1 .8-.8l2.22 2.3L10.65.17a.56.56 0 0 1 .8 0Z" fill="#686a75" />
      </svg>
    </span>
  );
}

export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-1">
      <TickIcon />
      <p className="text-[14px] leading-[18.2px] font-normal whitespace-pre text-gray-550 md:leading-[16.8px]">{children}</p>
    </div>
  );
}

/* ---------------------------------- card 1: provider graph --------------------------------- */

const DASH = { stroke: "#a855f7", strokeWidth: 0.8, fill: "transparent", pathLength: 100, strokeDasharray: "24 100" } as const;

/** A #f3e8ff hairline with a purple dash travelling along it (Framer "SVG Shimmer" lines). */
function ShimmerPath({ d, viewBox, className, delay = 0, width = 0.8 }: { d: string; viewBox: string; className: string; delay?: number; width?: number }) {
  return (
    <svg viewBox={viewBox} className={className} preserveAspectRatio="none" aria-hidden>
      <path d={d} stroke="#f3e8ff" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" fill="transparent" />
      <motion.path
        d={d}
        {...DASH}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ strokeDashoffset: 124 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2.4, ease: "linear", repeat: Infinity, delay }}
      />
    </svg>
  );
}

function ProviderPill({ icon, label, className = "" }: { icon: ReactNode; label: string; className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 rounded-[12px] bg-white px-3.5 py-2.5 ${className}`}>
      {icon}
      <p className="text-[15px] leading-[18px] font-medium tracking-[-0.2px] whitespace-pre text-black">{label}</p>
    </div>
  );
}

const avatar = (src: string) => <Image src={src} alt="" width={48} height={48} className="size-6 rounded-full object-cover" />;

/** Framer "SVG Shimmer" (369x346): provider pills feeding Ablefy -> Mochi -> a Stripe payment toast. */
function ProviderGraph() {
  return (
    <div className="relative h-[346px] w-[369px] shrink-0 scale-[0.85] md:scale-100">
      <div className="absolute inset-x-0 top-0 flex h-11 items-center">
        <ProviderPill icon={avatar("/framer/YvzCDUDYVF5lIVitk2XGTP0Xti8.jpeg")} label="Stripe" />
        <ShimmerPath d="M0 .4h23" viewBox="0 0 23 1" className="z-[1] h-[3px] w-[25px]" width={1} />
        <ProviderPill icon={avatar("/framer/GaNJ0Uno2oBWMLZtbEUsS4Wq9U4.jpeg")} label="Whop" />
        <ShimmerPath d="M0 .4h23" viewBox="0 0 23 1" className="z-[1] h-[3px] w-[25px]" width={1} delay={0.4} />
        <ProviderPill icon={avatar("/framer/TnybGzHTzcPlUTsxS9M9fWs.png")} label="FanBasis" />
      </div>
      <ShimmerPath d="M.4 0v109h82" viewBox="0 0 83 110" className="absolute top-[46px] left-11 z-[1] h-[109px] w-[82px]" />
      <ShimmerPath d="M.5 0v84.5" viewBox="0 0 1 85" className="absolute top-[46px] left-[176.5px] z-[1] h-[84px] w-[3px]" width={1} delay={0.6} />
      <ShimmerPath d="M81 0v109H0" viewBox="0 0 82 110" className="absolute top-[46px] left-[231px] z-[1] h-[109px] w-[82px]" delay={1.2} />
      <ShimmerPath d="M.5 0v84.5" viewBox="0 0 1 85" className="absolute top-[173px] left-[176.5px] z-[1] h-[84px] w-[3px]" width={1} delay={1.8} />
      <ProviderPill icon={avatar("/framer/cXKLpQFwYqeJV2oACXV6KP7Ae3Y.png")} label="ablefy" className="absolute top-16 left-1/2 z-[2] -translate-x-1/2" />
      <div className="absolute top-[129px] left-1/2 z-[2] flex -translate-x-1/2 items-center gap-1.5 rounded-[12px] bg-[#faf0ff] px-3.5 py-2.5">
        <MochiPillIcon className="h-[25px] w-[29px]" />
        <p className="text-[15px] leading-[18px] font-medium tracking-[-0.2px] whitespace-pre text-black">Mochi</p>
      </div>
      <div className="absolute top-[258px] left-1/2 z-[2] flex w-[276px] -translate-x-1/2 overflow-hidden rounded-[8px] bg-white">
        <div className="flex flex-1 items-center gap-2 px-3 py-[9px]">
          <Image src="/framer/ZJBTB8W7xhsCBOBneok9wjTVg.jpg" alt="" width={56} height={56} className="size-7 rounded-full object-cover" />
          <div className="flex flex-col gap-1">
            <p className="text-[15px] leading-[15.75px] font-medium tracking-[-0.2px] whitespace-pre text-black">Rachel Greene</p>
            <p className="text-[11px] leading-[11px] font-normal tracking-[-0.2px] whitespace-pre text-[#6d6d6d]">Elite 12-Week</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 px-3 py-[9px]">
          <p className="text-right text-[15px] leading-[15.75px] font-semibold tracking-[-0.2px] whitespace-pre text-[#30bd26]">+$20,312.00</p>
          <p className="text-right text-[11px] leading-[11px] font-normal tracking-[-0.2px] whitespace-pre text-[#6d6d6d]">Apr 11</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- card 2: match table ------------------------------------ */

type MatchRow = { avatar: string; name: string; program: string; amount: string; date: string; provider: "FanBasis" | "Ablefy" | "Stripe" | "Whop" };

const MATCHES: MatchRow[] = [
  { avatar: "/framer/M7HLye6KGtwItjFpbV80bqB0p5U.jpg", name: "Emily Waltham", program: "Wedding Planning 101", amount: "$2,800.00", date: "Feb 14", provider: "FanBasis" },
  { avatar: "/framer/bg0jlj2njPNNPoW0pXI0JSZvzq4.jpg", name: "Chandler Bing", program: "30-Day Challenge", amount: "$2,200.00", date: "Aug 22", provider: "FanBasis" },
  { avatar: "/framer/NUDiLc4YLSlrx6kWpnp1b4UUGo.png", name: "Gunther", program: "Barista Skills", amount: "$3,102.00", date: "Nov 1", provider: "Ablefy" },
  { avatar: "/framer/GcLd3k0GaTljvFpzSIS80HnDo4.jpg", name: "Mike Hannigan", program: "Guitar for Beginners", amount: "$1,300.00", date: "Dec 19", provider: "Stripe" },
  { avatar: "/framer/GcLd3k0GaTljvFpzSIS80HnDo4.jpg", name: "Mike Hannigan", program: "Guitar for Beginners", amount: "$6,200.00", date: "Jan 19", provider: "Ablefy" },
  { avatar: "/framer/s7cfnpkVGDnGmRTCSTtHuph9I.jpg", name: "Gunther", program: "Barista Skills", amount: "$500.00", date: "Jan 31", provider: "Whop" },
];

function ProviderIcon({ provider }: { provider: MatchRow["provider"] }) {
  if (provider === "FanBasis") return <FanBasisRowIcon className="size-5 shrink-0" />;
  if (provider === "Ablefy") return <AblefyRowIcon className="size-5 shrink-0" />;
  if (provider === "Stripe") return <Image src="/framer/LCA991fmJM3Cg2Mo4lTPmmkGqWQ.png" alt="" width={32} height={32} className="size-5 shrink-0 rounded-[5px]" />;
  return <Image src="/framer/cXKLpQFwYqeJV2oACXV6KP7Ae3Y.png" alt="" width={24} height={24} className="size-5 shrink-0 rounded-[5px]" />;
}

const TH = "text-[11px] leading-[11.55px] font-medium tracking-[-0.11px] whitespace-pre text-[#6d6d6d]";

/** Framer "Table" (501x280): Lead / Deal Value / Provider rows. */
function MatchTable() {
  return (
    <div className="w-[507px] rounded-[14px] p-[3px]">
      <div className="flex w-full flex-col overflow-hidden rounded-[12px] bg-white">
        <div className="flex h-10 w-full">
          <div className="w-[192px] px-5 py-3.5">
            <p className={TH}>Lead</p>
          </div>
          <div className="w-[128px] px-5 py-3.5">
            <p className={TH}>Deal Value</p>
          </div>
          <div className="flex-1 px-5 py-3.5">
            <p className={TH}>Provider</p>
          </div>
        </div>
        {MATCHES.map((row, i) => (
          <div key={`${row.name}-${row.date}`} className={`flex h-10 w-full ${i % 2 === 0 ? "bg-[#f5f5f5]" : "bg-white"}`}>
            <div className="flex w-[192px] items-center gap-2 px-5 py-3.5">
              <Image src={row.avatar} alt="" width={40} height={40} className="size-5 shrink-0 rounded-full object-cover" />
              <div className="flex flex-col gap-[3px]">
                <p className="text-[11px] leading-[11.55px] font-medium tracking-[-0.1px] whitespace-pre text-black">{row.name}</p>
                <p className="text-[9px] leading-[9px] font-normal tracking-[-0.1px] whitespace-pre text-[#6d6d6d]">{row.program}</p>
              </div>
            </div>
            <div className="flex w-[128px] flex-col justify-center gap-1 px-5">
              <p className="text-[11px] leading-[11.55px] font-normal tracking-[-0.1px] whitespace-pre text-black">{row.amount}</p>
              <p className="text-[9px] leading-[9px] font-normal tracking-[-0.1px] whitespace-pre text-[#6d6d6d]">{row.date}</p>
            </div>
            <div className="flex flex-1 items-center gap-2.5 px-5 py-3.5">
              <ProviderIcon provider={row.provider} />
              <p className="text-[11px] leading-[11.55px] font-medium tracking-[-0.2px] whitespace-pre text-black">{row.provider}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- card 3: report stack ----------------------------------- */

/** Framer "Desktop/1" (298x447): two small report cards, a shadow slot and a dragged third card with the grab cursor. */
function ReportStack() {
  return (
    <div className="relative flex w-[298px] flex-col items-center gap-2">
      <ReportCard data={SETTERS_CARD} size="sm" rows={2} />
      <ReportCard data={FEES_MINI} size="sm" />
      <div className="h-[143px] w-full rounded-[6.7px] bg-[#fdfdfd]" />
      <div className="absolute top-[261px] left-[-4px] w-[305px] -rotate-3 overflow-hidden rounded-[6.7px] shadow-[0_4px_40px_0_rgba(0,0,0,0.08),0_1px_24px_0_rgba(0,0,0,0.06)]">
        <ReportCard data={CLOSERS_MINI} size="sm" />
      </div>
      <div aria-hidden className="absolute top-[396px] left-[171px] z-[5] flex size-[29px] -rotate-6 items-center justify-center">
        <GrabCursorIcon className="h-[17px] w-[18px] rotate-6" />
      </div>
    </div>
  );
}

/* --------------------------------------- section ------------------------------------------- */

type Feature = { title: string; paragraphs: string[]; phoneParagraphs?: string[]; checks?: string[]; mockup: ReactNode; sticky: string; left: string; right: string; mockupWrap: string };

const FEATURES: Feature[] = [
  {
    title: "Every provider, one feed, zero guesswork",
    paragraphs: [
      "Connect Stripe, Whop, FanBasis and Ablefy in minutes. Every charge, subscription, installment, refund, and dispute flows into one unified feed - instantly connected to your leads, your team, and your products. Add wire transfers, crypto, and cash payments manually so nothing is missing.",
    ],
    checks: ["Stripe, Whop, FanBasis, Ablefy auto-synced", "Payments auto-matched to your leads", "Manual entries for wire, crypto, cash", "Refunds and disputes flagged instantly"],
    mockup: <ProviderGraph />,
    sticky: "md:top-24 lg:top-[140px]",
    left: "lg:w-[598px]",
    right: "lg:w-[502px]",
    mockupWrap: "flex h-[346px] w-full items-center justify-center md:h-auto md:pb-12 lg:h-full lg:pb-0",
  },
  {
    title: "Payments auto-match to your leads",
    paragraphs: [
      "When a payment comes in, Mochi automatically matches it to the right lead by email and IG handle. The setter is pre-filled. The commission calculates instantly. Most of the time, you don't have to do anything.",
      "For edge cases - a lead who paid from a different email, a wire transfer with no email, a cash payment at an event - you can manually match with one click. Select the lead, confirm, done.",
      "Once matched, that payment is connected to everything Mochi knows: the DM history, the setter who nurtured them, the content that brought them in. That's how you stop guessing which leads are worth your time.",
    ],
    phoneParagraphs: [
      "When a payment comes in, Mochi automatically matches it to the right lead by email and IG handle. The setter is pre-filled. The commission calculates instantly. Most of the time, you don't have to do anything.",
      "For edge cases — a lead who paid from a different email, a wire transfer with no email, a cash payment at an event — you can manually match with one click. Select the lead, confirm, done.",
      "Once matched, that payment is connected to everything Mochi knows: the DM history, the setter who nurtured them, the content that brought them in. That's how you stop guessing which leads are worth your time.",
    ],
    mockup: (
      <Reveal x={120} y={0} delay={0.2} className="w-full scale-90 md:w-auto md:scale-100">
        <MatchTable />
      </Reveal>
    ),
    sticky: "md:top-[120px] lg:top-[180px]",
    left: "lg:w-[598px]",
    right: "lg:w-[502px]",
    mockupWrap:
      "relative flex h-[286px] w-full items-center overflow-hidden [mask-image:linear-gradient(270deg,rgba(0,0,0,0)_0%,#000_36%)] md:h-auto md:justify-center md:overflow-visible md:pb-12 md:[mask-image:linear-gradient(#000_59%,rgba(0,0,0,0)_94%)] lg:block lg:h-full lg:pb-0 lg:pl-[70px] lg:pt-[146px] lg:[mask-image:linear-gradient(270deg,rgba(0,0,0,0)_0%,#000_26%)]",
  },
  {
    title: "See where every dollar goes",
    paragraphs: [
      "Processing fees by provider. Setter, closer and manager commissions automatically calculated.",
      "Compare fee rates across Stripe, Whop, Ablefy and FanBasis side by side.",
      "Refunds and disputes - visible and more importantly actionable: DM the client to understand pain points and solve it going forward.",
      "The result: Real business numbers that actually show you what you get to keep from your revenue.",
    ],
    phoneParagraphs: [
      "Processing fees by provider. Setter commissions at 5%. Closer commissions at 10%. Refunds and disputes. One stacked bar that shows you: out of $70K gross, here's the $53K you actually keep.",
      "Compare fee rates across Stripe, Whop, and FanBasis side by side. See that FanBasis charges 7.5% as Merchant of Record vs Stripe's 2.9%. For a coach doing $50K/mo, that difference is $2,300 per month.",
    ],
    mockup: <ReportStack />,
    sticky: "md:top-[120px] lg:top-[180px]",
    left: "lg:w-[550px]",
    right: "lg:w-[550px]",
    mockupWrap: "flex w-full items-center justify-center overflow-hidden px-6 pb-6 md:px-12 md:pb-12 lg:h-full lg:py-[58px]",
  },
];

/**
 * Framer "Features Section" of /payments: "Payments that tell you where the money came from" and three
 * sticky stacking cards (copy left, mockup right; stacked on tablet/phone). 1440x2112 / 1024x2552 / 390x2453.
 */
export function PaymentsFeatures() {
  return (
    <section className="relative flex w-full justify-center px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
      <div className="flex w-full max-w-[1100px] flex-col items-center gap-8 md:gap-12 lg:gap-16">
        <Reveal y={48} delay={0.2} className="w-full">
          <SectionHeader title="Payments that tell you where the money came from" titleClassName="max-w-[640px] text-left md:text-center" className="items-start md:items-center" />
        </Reveal>
        <div className="flex w-full flex-col items-center gap-6 md:gap-8">
          {FEATURES.map((f, i) => (
            <Reveal
              key={f.title}
              y={i === 0 ? 64 : 120}
              delay={0.2}
              className={`z-[1] flex w-full flex-col overflow-clip rounded-[24px] bg-gray-25 md:sticky md:rounded-[32px] lg:flex-row lg:items-center ${f.sticky}`}
            >
              <div className={`flex w-full flex-col justify-center p-6 md:p-12 lg:min-h-[576px] lg:px-12 lg:py-[58px] ${f.left}`}>
                <div className="flex w-full flex-col gap-6">
                  <div className="flex w-full flex-col gap-3">
                    <p className="text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] whitespace-pre-wrap text-black md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px] lg:text-[20px] lg:leading-[24px] lg:tracking-[-0.6px]">{f.title}</p>
                    {(f.phoneParagraphs ? [f.phoneParagraphs, f.paragraphs] : [f.paragraphs]).map((paras, k, arr) => (
                      <p
                        key={k}
                        className={`whitespace-pre-wrap text-gray-750 ${arr.length === 2 ? (k === 0 ? "md:hidden" : "hidden md:block") : ""} ${
                          f.paragraphs.length > 1
                            ? "text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] md:text-[16px] md:leading-[24px] md:tracking-[-0.64px]"
                            : "text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]"
                        }`}
                      >
                        {paras.join("\n\n")}
                      </p>
                    ))}
                  </div>
                  {f.checks && (
                    <>
                      <div className="h-0.5 w-full overflow-hidden bg-[#efefef]" />
                      <div className="flex flex-col gap-4">
                        {f.checks.map((c) => (
                          <CheckItem key={c}>{c}</CheckItem>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className={`w-full lg:self-stretch ${f.right}`}>
                <div className={f.mockupWrap}>{f.mockup}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
