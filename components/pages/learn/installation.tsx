import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { CaretDownIcon, PlusIcon, VoiceIcon } from "./icons";
import { Typewriter } from "./typewriter";
import { SectionHeading } from "./section-heading";

/** Hairline of the Framer cards (`data-border`): drawn over the padding box so it never changes the card's size. */
const cardBorder = "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-[#f2f2f2]";

/**
 * One feature card of "What Mochi fixes immediately" (Framer "Container"): #fafafa, 24px radius, clipped, a copy block
 * (24px padding, 20px on phone; title Inter 500 20/18/16px, description 16/14px grey) over a mockup ("Custom Asset").
 * Desktop: two cards per row. The right-hand card of each row (2, 3, 6) has its natural height; the left-hand ones
 * (1, 4, 5) stretch to it and give their mockup the remaining height (`flex: 1 0 0`). Tablet/phone: one per row.
 */
function FeatureCard({ title, description, stretch = false, children }: { title: string; description: string; stretch?: boolean; children: React.ReactNode }) {
  return (
    <Reveal
      y={64}
      className={`relative flex w-full flex-col items-center overflow-hidden rounded-[24px] bg-[#fafafa] ${cardBorder} ${stretch ? "lg:grow lg:basis-0 lg:self-stretch" : "lg:grow lg:basis-0"}`}
    >
      <div className="flex w-full flex-col items-start gap-4 p-5 md:p-6">
        <div className="flex w-full flex-col gap-1.5">
          <p className="w-full text-[16px] leading-[19.2px] font-medium tracking-[-0.32px] text-[#1d1d20] md:text-[18px] md:leading-[21.6px] md:tracking-[-0.36px] lg:text-[20px] lg:leading-[24px] lg:tracking-[-0.4px]">
            {title}
          </p>
          <p className="w-full text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] text-[#686a75] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
            {description}
          </p>
        </div>
      </div>
      {children}
    </Reveal>
  );
}

/** Fills its (relative) parent with a cover-fit image. */
function Cover({ src, sizes, className = "" }: { src: string; sizes: string; className?: string }) {
  return <Image src={src} alt="" fill sizes={sizes} className={`object-cover ${className}`} />;
}

/** 1. "Find the right leads": the inbox screenshot over a soft backdrop (the screenshot hangs off the right edge on phone). */
function PriorityMockup() {
  return (
    <div className="relative h-[272px] w-full overflow-hidden md:h-[350px] lg:h-px lg:grow lg:basis-0">
      <Cover src="/framer/INjSRrqStL49RbxENatUZDYZhA.png" sizes="(min-width: 1200px) 590px, 100vw" />
      <div className="absolute top-8 right-[-45px] aspect-[1.40629] w-[363px] md:right-auto md:left-1/2 md:w-[561px] md:-translate-x-1/2 lg:left-8 lg:translate-x-0">
        <Cover src="/framer/uTi1HFxxJXWFgs4poEo0YN8cXvw.png" sizes="561px" />
      </div>
    </div>
  );
}

/** 2. "Track what's working": the performance-by-setter table, fading out to the right. */
function TrackingMockup() {
  return (
    <div className="relative h-[180px] w-full overflow-hidden [mask-image:linear-gradient(270deg,#0000_0%,#00000001_0%,#000_25%)] md:h-[350px]">
      <div className="absolute inset-x-6 top-1/2 aspect-[2.20155] -translate-y-1/2">
        <Cover src="/framer/Ve6ryDqNilpKaXAPSoyuFyiKBQ.png" sizes="(min-width: 1200px) 542px, 100vw" />
      </div>
    </div>
  );
}

/** 3. "Convert with personalization": the AI suggestions composer. */
function PersonalizationMockup() {
  return (
    <div className="relative flex h-[208px] w-full items-center justify-center overflow-hidden px-5 md:h-[436px]">
      <div className="relative aspect-[1.28105] w-[216px] shrink-0 md:w-[438px]">
        <Cover src="/framer/EqsANZeGejTR37KNvWQlaq6dj9k.png" sizes="438px" />
      </div>
    </div>
  );
}

/** 4. "AI that learns and improves": the tag list over a dotted pattern, fading out at the bottom. */
function TagsMockup() {
  return (
    <div className="relative h-[190px] w-full overflow-hidden [mask-image:linear-gradient(#000_67%,#0000_100%)] md:h-[420px] lg:h-px lg:grow lg:basis-0">
      <div className="absolute inset-0 overflow-hidden opacity-[0.48]">
        <Cover src="/framer/NlKVJfYgNX8pYYcsRvfw2yKSa4M.png" sizes="590px" />
      </div>
      <div className="absolute top-1/2 left-1/2 aspect-[1.07351] w-[174px] -translate-x-1/2 -translate-y-1/2 md:w-[411px]">
        <Cover src="/framer/8tTOtExo53EELsT9fIFpMMHDoAY.png" sizes="411px" />
      </div>
    </div>
  );
}

/** 5. "Script + Link Tracking": pixel-tracking stats with the reply-rate card overlapping at the bottom right. */
function ScriptMockup() {
  return (
    <div className="relative h-[230px] w-full overflow-hidden md:h-[312px] lg:h-px lg:grow lg:basis-0">
      <div className="absolute top-5 left-6 aspect-[1.43846] w-[188px] md:top-[37px] md:left-[141px] md:w-[283px] lg:top-5 lg:left-6">
        <Cover src="/framer/8AShYboCRRUwnjKu8fftfZQgQZo.png" sizes="283px" />
      </div>
      <div className="absolute right-[15px] bottom-[29px] z-[2] aspect-[2.40945] w-[246px] drop-shadow-[0_1px_9px_#00000014] md:right-[137px] md:bottom-[50px] md:w-[306px] lg:right-5 lg:bottom-8">
        <Cover src="/framer/eXqRNWIge0KsPb3m3Ho9jaYckiU.png" sizes="306px" />
      </div>
    </div>
  );
}

/**
 * 6. "AI Reporting Layer": the "Mochi AI" composer (gradient frame, white 22px-radius box 120px tall) whose prompt is typed
 * out by `Typewriter`. Centred on desktop (426px), 413px at left 151px on tablet (as on live), 24px from both edges on phone.
 */
function ChatMockup() {
  return (
    <div className="relative h-[188px] w-full overflow-hidden md:h-[270px]">
      <div className="absolute inset-x-6 top-1/2 flex -translate-y-1/2 flex-col items-center gap-4 md:inset-x-auto md:left-[151px] md:w-[413px] md:max-w-[417px] lg:left-1/2 lg:w-[426px] lg:max-w-[432px] lg:-translate-x-1/2">
        <div className="relative flex w-full flex-col items-start gap-2 rounded-[24px] p-0.5">
          <Cover src="/framer/GhC1na4Yv4zJeyQac5D1brz4dY.jpg" sizes="426px" className="rounded-[24px]" />
          <div className="relative flex h-[120px] w-full flex-col items-start justify-between overflow-hidden rounded-[22px] bg-white p-[18px]">
            <div className="flex w-full items-center">
              <div className="w-px flex-1">
                <Typewriter />
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="size-4">
                <PlusIcon />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-0.5">
                  <p className="font-dm text-[12px] leading-[14.4px] tracking-[-0.36px] whitespace-pre text-[#635e58]">Mochi AI</p>
                  <div className="size-3">
                    <CaretDownIcon />
                  </div>
                </div>
                <div className="size-[18px]">
                  <VoiceIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Row of two cards (desktop) / stacked pair (tablet, phone, 16px apart); rows are 20px apart. */
function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:gap-5">{children}</div>;
}

/**
 * Framer "Installation Section", the 2nd block of /learn: a centred Clash Display heading (max 580px) over six feature
 * cards. Section padding 48/20, 64/48 and 80/100px; heading-to-grid gap 32 / 48 / 64px; content at most 1200px.
 */
export function Installation() {
  return (
    <section className="relative flex w-full items-center justify-center">
      <div className="flex w-full flex-1 items-center justify-center px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
        <div className="flex w-full max-w-[1200px] flex-1 flex-col items-center gap-8 md:gap-12 lg:gap-16">
          <SectionHeading maxWidth={580}>What Mochi fixes immediately</SectionHeading>
          <div className="flex w-full flex-col items-start gap-5">
            <Row>
              <FeatureCard
                stretch
                title="Find the right leads"
                description="Mochi sorts your inbox by priority so your setters always know who is qualified, who needs attention, and who to respond to next. No matter your volume, no lead ever gets buried."
              >
                <PriorityMockup />
              </FeatureCard>
              <FeatureCard
                title="Track what’s working"
                description="See what every setter did, how fast they responded, which scripts are converting, and where leads are dropping off, all live, directly from Instagram."
              >
                <TrackingMockup />
              </FeatureCard>
            </Row>
            <Row>
              <FeatureCard
                title="Convert with personalization"
                description="Every conversation comes with a full summary of the lead’s pain points and exactly what to say next. And your setter can send that as a voice note, in your exact voice."
              >
                <PersonalizationMockup />
              </FeatureCard>
              <FeatureCard
                stretch
                title="AI that learns and improves"
                description="Mochi learns from every conversation that converts and uses those winning scripts to tell your setters what to say next. The system gets smarter every single day."
              >
                <TagsMockup />
              </FeatureCard>
            </Row>
            <Row>
              <FeatureCard
                stretch
                title="Script + Link Tracking"
                description="Track which scripts, links, and follow-ups move leads toward the call, so your team knows what actually creates booked calls."
              >
                <ScriptMockup />
              </FeatureCard>
              <FeatureCard
                title="AI Reporting Layer"
                description="Ask your DM backend what happened, how to increase performance, and what to optimize next, so you get clear answers from your data in seconds."
              >
                <ChatMockup />
              </FeatureCard>
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
}
