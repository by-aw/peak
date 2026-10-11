import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { APP_URL } from "@/lib/site";
import {
  CalendarCircleIcon,
  CallBookedBadgeIcon,
  ChattingIcon,
  CheckCircleSmallIcon,
  JourneyCallIcon,
  JourneyRevenueIcon,
  LinkMicroIcon,
  RevenueBadgeIcon,
  StarGlyphIcon,
  VideoReplayIcon,
} from "./icons";
import { HeroMascot } from "./hero-mascot";
import { TickerLoop } from "./ticker-loop";

const DEMO_THUMB = "/framer/rdoy5Rv8q7DmJ6B9Jk89skDPuoc.png";

/** Glass pill / sub-card tint used inside the journey cards (Framer #fafafa at 40% with a 48px backdrop blur). */
const glass = "bg-[#fafafa]/40 backdrop-blur-[48px]";

/** Framer's 1px inner border (drawn as an overlay): white on the glass cards. */
const ring = "relative after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-white";

/** The little "mochi.so/demo" page preview (71x40, inset hairline). */
function DemoThumb() {
  return (
    <div className="relative h-10 w-[71px] shrink-0 overflow-clip rounded-[4px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]">
      <Image src={DEMO_THUMB} alt="" width={284} height={160} sizes="71px" className="absolute inset-0 h-full w-full rounded-[4px]" />
    </div>
  );
}

/** Journey step icon column (28px): coloured rounded square + the 62px connector line below it. */
function StepIcon({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div className="flex h-[98px] w-7 shrink-0 flex-col items-start gap-2">
      <div className={`relative size-7 shrink-0 overflow-clip rounded-[8px] ${className}`}>{children}</div>
      <div className="flex h-[62px] w-7 shrink-0 flex-col items-center justify-center overflow-clip">
        <div className="w-px flex-1 rounded-full bg-black/10" />
      </div>
    </div>
  );
}

/** Left half of every journey card: title, big figure, grey caption (116px wide). */
function Figures({ title, value, caption }: { title: string; value: string; caption: string }) {
  return (
    <div className="flex w-[116px] shrink-0 flex-col gap-2">
      <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-black">{title}</p>
      <div className="flex flex-col gap-2">
        <p className="text-[18px] leading-[18.9px] font-medium tracking-[-0.5px] whitespace-pre-wrap text-black">{value}</p>
        <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">{caption}</p>
      </div>
    </div>
  );
}

/** One 98px journey row (tablet/desktop): icon column + the 353x87.6 translucent card. */
function JourneyRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex h-[98px] w-full shrink-0 items-center gap-3">
      {icon}
      <div className={`${ring} flex h-[87.6px] w-[353px] shrink-0 items-center justify-between rounded-[16px] bg-white/[0.48] p-3 backdrop-blur-[4px]`}>{children}</div>
    </div>
  );
}

/** Small grey quote pill at the right of the first two cards. */
function QuotePill({ width, className, children }: { width: number; className: string; children: ReactNode }) {
  return (
    <div className={`${ring} flex shrink-0 items-center justify-center gap-2 overflow-clip rounded-[10px] px-2 ${className} ${glass}`} style={{ width }}>
      <p className="flex-1 text-[10px] leading-[12.5px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-800">{children}</p>
    </div>
  );
}

/**
 * The five-step "reel -> DM reply -> link click -> booked call -> revenue" mockup of tablet/desktop
 * (Framer "Ticker" frame, which is static on these breakpoints): 392px wide column of 98px rows, 16px apart.
 */
function JourneyColumn() {
  return (
    <div className="flex w-[398px] flex-col items-start gap-4 lg:w-[392px]">
      <JourneyRow
        icon={
          <StepIcon className="bg-[#ec4899]">
            <VideoReplayIcon className="absolute top-[7px] left-[7px] size-[14px]" />
          </StepIcon>
        }
      >
        <Figures title="Reel viewed" value="12,521" caption="accounts reached" />
        <QuotePill width={87} className="py-[11px]">
          3 DM mistakes you’re making
        </QuotePill>
      </JourneyRow>

      <JourneyRow
        icon={
          <StepIcon className="bg-[#f59e0b]">
            <StarGlyphIcon className="absolute top-1.5 left-1.5 h-4 w-[17px]" />
          </StepIcon>
        }
      >
        <Figures title="Qualified" value="324" caption="3% qualified" />
        <QuotePill width={102} className="py-2.5">
          &quot;I&apos;m interested.&quot;
        </QuotePill>
      </JourneyRow>

      <JourneyRow
        icon={
          <StepIcon className="bg-[#a855f7]">
            <LinkMicroIcon className="absolute top-2 left-2 size-3" />
          </StepIcon>
        }
      >
        <Figures title="Link click" value="121" caption="37.3% clicked" />
        <div className={`${ring} flex w-[188px] shrink-0 items-start gap-3 rounded-[8px] p-2 ${glass}`}>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
            <p className="text-[13px] leading-[18px] font-medium tracking-[-0.2px] whitespace-pre text-black">Demo</p>
            <p className="text-[12px] leading-4 font-medium whitespace-pre text-gray-500">mochi.so/demo</p>
          </div>
          <DemoThumb />
        </div>
      </JourneyRow>

      <JourneyRow icon={<JourneyCallIcon className="h-[98px] w-7 shrink-0" />}>
        <Figures title="Booked call" value="28" caption="23.1% booked" />
        <div className="relative flex w-[127px] shrink-0 flex-col items-start rounded-[8px] bg-[#ededed]/[0.28] p-2.5 backdrop-blur-[48px] after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-[#f0f0f0]/[0.28]">
          <div className="flex w-[107px] flex-col justify-center gap-1">
            <p className="text-[13px] leading-[18px] font-medium tracking-[-0.2px] whitespace-pre text-black">May 15 · 11:00 AM</p>
            <div className="flex items-center justify-center gap-1.5 self-start">
              <span className="size-[5px] shrink-0 overflow-clip rounded-full bg-[#10b981]" />
              <p className="text-[12px] leading-4 font-medium whitespace-pre text-[#10b981]">Booked</p>
            </div>
          </div>
        </div>
      </JourneyRow>

      <JourneyRow icon={<JourneyRevenueIcon className="h-[98px] w-7 shrink-0" />}>
        <Figures title="Revenue" value="$43,560" caption="from this reel" />
        <div className="flex shrink-0 items-start rounded-full bg-[#11ba52]/10 px-2.5 py-2">
          <p className="text-[12px] leading-4 font-medium tracking-[-0.2px] whitespace-pre text-[#11ba52]">One proven path</p>
        </div>
      </JourneyRow>
    </div>
  );
}

/* ------------------------------------------------------------------ phone ticker */

/** Header row of a phone ticker item: 24px icon, title, grey figure at the right. */
function TickerHead({ icon, title, right }: { icon: ReactNode; title: string; right?: string }) {
  return (
    <div className="flex w-full items-center gap-2.5 overflow-clip">
      {icon}
      <div className="flex flex-1 items-start gap-1.5">
        <p className="min-w-0 flex-1 text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-black">{title}</p>
        {right ? <p className="text-right text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500">{right}</p> : null}
      </div>
    </div>
  );
}

/** Body row under a ticker header: 24px gutter (the connector has no height on phone) + the white card, inset 8px. */
function TickerBody({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-start gap-0.5">
      <div className="w-6 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 px-2 pb-2">{children}</div>
    </div>
  );
}

const outlinedCard =
  "flex w-full flex-col items-start gap-3 overflow-clip rounded-[8px] bg-white p-2 shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]";

function TickerFigures({ value, caption }: { value: string; caption: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1">
      <p className="w-full text-[14px] leading-5 font-medium tracking-[-0.2px] whitespace-pre-wrap text-black">{value}</p>
      <p className="w-full text-[12px] leading-4 font-medium whitespace-pre-wrap text-gray-500">{caption}</p>
    </div>
  );
}

function TickerQuote({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div className={`flex shrink-0 items-center justify-center gap-2 overflow-clip rounded-[6px] bg-gray-25 px-2 py-[11px] ${className}`}>
      <p className="flex-1 text-[9px] leading-[11.25px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-black opacity-[0.72]">{children}</p>
    </div>
  );
}

const glyphSquare = "relative size-6 shrink-0 overflow-clip rounded-[8px]";

/** Phone variant of the journey: the five steps as 318px-wide items of an endlessly scrolling column. */
function TickerItems() {
  return (
    <>
      <div className="flex w-full flex-col items-start gap-2">
        <TickerHead
          icon={
            <div className={`${glyphSquare} bg-[#3b82f6]`}>
              <VideoReplayIcon className="absolute top-[5px] left-[5px] size-[14px]" />
            </div>
          }
          title="Reel viewed"
          right="12,521"
        />
        <TickerBody>
          <div className="flex w-full items-start gap-3 rounded-[8px] bg-white p-2">
            <TickerFigures value="12,521" caption="accounts reached" />
            <TickerQuote className="w-[87px]">3 DM mistakes you’re making</TickerQuote>
          </div>
        </TickerBody>
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        <TickerHead
          icon={
            <div className={`${glyphSquare} bg-[#a855f7]`}>
              <ChattingIcon className="absolute top-1 left-[5px] size-[15px]" />
            </div>
          }
          title="DM reply"
          right="10:15 AM"
        />
        <TickerBody>
          <div className="flex w-full items-center gap-0 rounded-[8px] bg-white p-2">
            <TickerFigures value="324" caption="2.6% replied" />
            <TickerQuote className="w-[107px]">This is exactly what we need. How does it work?</TickerQuote>
          </div>
        </TickerBody>
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        <TickerHead
          icon={
            <div className={`${glyphSquare} bg-[#3b82f6]`}>
              <LinkMicroIcon className="absolute top-1.5 left-1.5 size-3" />
            </div>
          }
          title="Link click"
          right="After 32m"
        />
        <TickerBody>
          <div className="flex w-full items-center gap-3 rounded-[8px] bg-white p-2">
            <TickerFigures value="121" caption="37.3% clicked" />
            <div className="flex h-14 w-[150px] shrink-0 items-start gap-3 rounded-[8px] bg-gray-50 p-2">
              <div className="flex w-[51px] flex-1 flex-col items-center justify-center gap-1 self-stretch">
                <p className="w-full text-[12px] leading-4 font-medium break-words whitespace-pre-wrap text-gray-500">mochi.so/demo</p>
              </div>
              <DemoThumb />
            </div>
          </div>
        </TickerBody>
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        <TickerHead icon={<CallBookedBadgeIcon className="size-6 shrink-0" />} title="Call Booked" right="28" />
        <TickerBody>
          <div className={outlinedCard}>
            <div className="flex w-full items-center gap-2">
              <CalendarCircleIcon className="size-5 shrink-0" />
              <p className="flex-1 text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-black">May 15 · 11:00 AM</p>
            </div>
            <p className="text-[14px] leading-[14.7px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">23.1% booked</p>
          </div>
        </TickerBody>
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        <TickerHead icon={<RevenueBadgeIcon className="size-6 shrink-0" />} title="Revenue" right="One proven path" />
        <TickerBody>
          <div className={outlinedCard}>
            <div className="flex w-full items-center gap-2">
              <CheckCircleSmallIcon className="size-5 shrink-0" />
              <p className="flex-1 text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-black">$14,560</p>
            </div>
            <p className="text-[14px] leading-[14.7px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">from this reel</p>
          </div>
        </TickerBody>
      </div>
    </>
  );
}

/**
 * Framer "Steps (Mobile)": 350x600 grey card with a vertical Ticker (30px/s, upwards) of the five journey steps,
 * faded at the top and bottom by two blurred #f7f7f7 bars.
 */
function PhoneSteps() {
  return (
    <Reveal y={48} delay={0.25} className="relative z-[3] flex h-[600px] w-full flex-col items-start gap-2.5 overflow-hidden rounded-[24px] bg-[#f7f7f7] p-4 md:hidden">
      <div aria-hidden className="pointer-events-none absolute -right-5 -bottom-10 -left-5 z-[2] h-[120px] overflow-clip bg-[#f7f7f7] blur-[17px]" />
      <div aria-hidden className="pointer-events-none absolute -top-10 -right-5 -left-5 z-[2] h-[100px] overflow-clip bg-[#f7f7f7] blur-[17px]" />
      <div className="relative w-full flex-none">
        <TickerLoop>
          <TickerItems />
        </TickerLoop>
      </div>
    </Reveal>
  );
}

/**
 * Framer "Hero Section" of /track-to-ig: headline, copy and CTA (left on desktop, centred on tablet) next to the
 * attributed-journey mockup (static 5-row card on tablet/desktop, scrolling ticker on phone) and the money mascot.
 * Desktop 1440x666 (112px/100px padding, 64px gap), tablet 1024x1017 (80px/32px, 48px gap), phone 390x1003 (56px/20px, 32px gap).
 */
export function HeroSection() {
  return (
    <section className="relative flex w-full items-center justify-center">
      <div className="flex w-full flex-1 items-center justify-center px-5 pt-14 md:px-8 md:pt-20 lg:px-[100px] lg:pt-28">
        <div className="relative flex w-full max-w-[1200px] flex-1 flex-col items-center gap-8 md:gap-12 lg:flex-row lg:justify-start lg:gap-16">
          <div className="flex w-full flex-col items-start gap-8 md:items-center md:gap-10 lg:flex-1 lg:items-start">
            <div className="flex w-full flex-col items-center gap-5 md:gap-6 lg:max-w-[621px] lg:items-start">
              <Reveal y={48} delay={0.2} className="w-full">
                <h1 className="text-center font-display text-[42px] leading-[46.2px] font-semibold tracking-[1.68px] whitespace-pre-wrap text-ink md:hidden">
                  Stop losing money inside your DMs
                </h1>
                <h1 className="hidden text-center font-display text-[44px] leading-[46.2px] font-semibold tracking-[-0.264px] whitespace-pre-wrap text-ink md:block lg:text-left lg:text-[56px] lg:leading-[58.8px] lg:tracking-[-0.336px]">
                  Imagine you could track exactly which IG reel your customers are coming from.
                </h1>
              </Reveal>
              <Reveal y={48} delay={0.2} className="w-full max-w-[306px] md:max-w-[358px]">
                <p className="text-center text-[16px] leading-[22.4px] font-normal tracking-[-0.24px] whitespace-pre-wrap text-gray-800 md:text-[18px] md:leading-[25.2px] lg:text-left lg:text-[20px] lg:leading-[28px]">
                  You’d be able to know how to ideate, write and format your next one.
                </p>
              </Reveal>
            </div>
            <Reveal y={32} delay={0.3} className="flex w-full flex-col items-start gap-4 md:w-auto md:items-center lg:items-start">
              <Button variant="primaryBig" href={APP_URL} className="w-full md:w-auto">
                Start Free Trial
              </Button>
              <div className="flex w-full items-center justify-center gap-1 lg:justify-start">
                <span className="size-1.5 shrink-0 overflow-hidden rounded-full bg-[#2ebf33]" />
                <p className="text-[14px] leading-[18.2px] font-normal whitespace-pre text-gray-550 lg:leading-[16.8px]">
                  See your first attributed journey in under 5 minutes
                </p>
              </div>
            </Reveal>
          </div>

          {/* Tablet / desktop: static journey column (grey card on tablet) */}
          <Reveal y={48} delay={0.25} className="hidden w-[446px] shrink-0 flex-col items-center justify-center rounded-[24px] bg-gray-25 p-6 md:flex lg:w-[392px] lg:rounded-none lg:bg-transparent lg:p-0">
            <JourneyColumn />
          </Reveal>

          {/* Phone: scrolling ticker */}
          <PhoneSteps />

          <HeroMascot />
        </div>
      </div>
    </section>
  );
}
