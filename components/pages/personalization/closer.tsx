import Image from "next/image";
import type { ReactNode } from "react";
import { BentoAsset, BentoCard, BentoCopy, FeatureSection } from "@/components/shared/feature-section";
import { MockupComposer } from "@/components/shared/mockup-composer";
import { BubbleChatIcon, ChatBubbleWhite, SparklesMicro } from "@/components/icons/inbox-mockup-icons";

const BAR = "bg-[linear-gradient(90deg,rgba(227,227,227,0.12)_0%,#e1e1e1_100%)]";
const HAIRLINE = "shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]";
const ROW_HAIRLINE = "shadow-[inset_0_0_0_0.5px_#ededed]";

/** White 428px chat panel (Framer "Frame 2147238121") centred in the card asset, 16px from the edges on phones. */
function ChatPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`absolute top-12 right-4 left-4 flex flex-col overflow-hidden rounded-[16px] bg-white md:right-auto md:left-1/2 md:w-[428px] md:-translate-x-1/2 ${HAIRLINE} ${className}`}>
      {children}
    </div>
  );
}

function AiLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="flex size-4 items-center justify-center">
        <SparklesMicro width={14} height={14} />
      </span>
      <p className="text-[11px] leading-[18px] font-normal tracking-[-0.2px] whitespace-pre text-[#1a1a1a]">{children}</p>
    </div>
  );
}

const SUMMARY_ROWS: { label: string; bars: [number, number] }[] = [
  { label: "Pain point", bars: [227, 80] },
  { label: "Budget", bars: [136, 63] },
  { label: "Goal", bars: [227, 80] },
  { label: "Objection", bars: [172, 80] },
];

/** "Conversation Summaries" mockup: AI summary rows (pain point, budget, goal, objection). */
function SummaryMockup() {
  return (
    <ChatPanel className="-bottom-[81px]">
      <div className="flex items-center gap-4 overflow-hidden px-5 py-4">
        <Image src="/framer/Yje7q4DpnhoQKmCyy1RFlWuOS4.png" alt="" width={128} height={128} className="size-8 shrink-0 rounded-full" />
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] text-black">alimamedgasanov</p>
          <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] text-gray-500">Active now</p>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-5">
        <div className="flex flex-col gap-3">
          <AiLabel>AI Summary</AiLabel>
          <div className="flex flex-col gap-1.5">
            {SUMMARY_ROWS.map((row) => (
              <div key={row.label} className="flex overflow-hidden rounded-lg p-px">
                <div className={`flex min-w-0 flex-1 items-center gap-4 rounded-lg bg-white px-3 py-3.5 ${ROW_HAIRLINE}`}>
                  <p className="text-[10px] leading-4 font-normal whitespace-pre text-[#a2a2a2]">{row.label}</p>
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span className="h-1.5 max-w-full rounded-3xl bg-[#efefef]" style={{ width: row.bars[0] }} />
                    <span className={`h-1.5 max-w-full rounded-3xl ${BAR}`} style={{ width: row.bars[1] }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChatPanel>
  );
}

const SUGGESTION_ROWS: [number, number][] = [
  [80, 146],
  [69, 99],
  [80, 203],
];

/** "AI Reply Assistant" mockup: the lead's message, three numbered suggestions with "Send" and the composer. */
function SuggestionsMockup() {
  return (
    <ChatPanel className="-bottom-[104px]">
      <div className="flex items-center gap-4 overflow-hidden px-5 py-4">
        <Image src="/framer/54ld3a5oqlabzerddR3jMw1pU.png" alt="" width={128} height={128} className="size-8 shrink-0 rounded-full" />
        <p className="min-w-0 flex-1 text-[13px] leading-6 font-normal tracking-[-0.2px] text-black">I&apos;ve been following you for a while, is the program still open? I&apos;m ready to invest.</p>
      </div>
      <div className="flex flex-col gap-6 p-5">
        <div className="flex flex-col gap-3">
          <AiLabel>AI Suggestions</AiLabel>
          <div className="flex flex-col gap-1.5">
            {SUGGESTION_ROWS.map((bars, i) => (
              <div key={i} className="flex overflow-hidden rounded-lg p-px">
                <div className={`flex min-w-0 flex-1 items-center justify-between rounded-lg bg-white px-3 py-3.5 ${ROW_HAIRLINE}`}>
                  <div className="flex items-center gap-2">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#d9d9d9] text-[10px] leading-[13px] font-medium text-white">{i + 1}</span>
                    <div className="flex flex-col gap-1.5">
                      <span className={`h-1.5 rounded-3xl ${BAR}`} style={{ width: bars[0] }} />
                      <span className="h-1.5 rounded-3xl bg-[#efefef]" style={{ width: bars[1] }} />
                    </div>
                  </div>
                  <p className="text-[10px] leading-4 font-normal whitespace-pre text-[#a2a2a2]">Send</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MockupComposer />
    </ChatPanel>
  );
}

/** "Content Attribution" mockup: the Reel the lead replied to, their reply and the "Replied to your Reel" tip. */
function AttributionMockup() {
  return (
    <div className="absolute top-12 right-4 left-4 flex flex-col items-center gap-6 md:right-auto md:left-1/2 md:w-[428px] md:-translate-x-1/2 lg:left-[31px] lg:translate-x-0">
      <div className="flex w-full max-w-[332px] flex-col items-start rounded-[12px] bg-[#f5f3ff] p-3.5 shadow-[0_4.19px_6.29px_-2.1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-1.5">
          <span className="flex size-4 shrink-0 items-center justify-center">
            <BubbleChatIcon width={15} height={15} />
          </span>
          <p className="text-[14.68px] leading-[14.68px] font-medium tracking-[-0.21px] whitespace-pre text-[#2e1065]">&quot;5 signs you need a CRM for your DMs…&quot;</p>
        </div>
      </div>
      <div className={`flex w-full flex-col gap-6 overflow-hidden rounded-[16px] bg-white p-6 ${HAIRLINE}`}>
        <div className="flex flex-col gap-3">
          <div className={`flex flex-col items-center rounded-[6px_12px_12px_12px] bg-white px-3 py-3.5 ${HAIRLINE}`}>
            <p className="w-full text-[14px] leading-6 font-normal tracking-[-0.2px] text-black">&quot;This hit different, exactly what I needed to see 👀&quot;</p>
          </div>
          <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] text-gray-500">10:30 AM</p>
        </div>
        <div className="flex flex-col items-center gap-4 px-8 py-4">
          <span className="relative flex size-7 items-center justify-center rounded-lg bg-[#8b5cf6]">
            <ChatBubbleWhite width={14} height={12} />
          </span>
          <div className="flex w-full flex-col gap-2.5">
            <p className="text-center text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] text-black">Replied to your Reel</p>
            <p className="text-center text-[14px] leading-[14px] font-normal tracking-[-0.2px] text-gray-500">10:33 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Framer "Closer Section" of Personalization: "Show people you listened." + 4 bento cards (1329px tall on desktop). */
export function PersonalizationCloserSection() {
  return (
    <FeatureSection label="Show people you listened" heading="Show people you listened." headingClassName="text-left text-ink-3 md:text-center" cardsAlign="start">
      <BentoCard>
        <BentoAsset className="h-[314px]">
          <SummaryMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="Conversation Summaries"
          eyebrowMuted
          title="Pick up where the conversation left off."
          description="See what the person wants, the details they shared, and the questions already answered. Your team can continue the conversation without making them repeat themselves."
        />
      </BentoCard>
      <BentoCard>
        <BentoAsset className="h-[314px]">
          <SuggestionsMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="AI Reply Assistant"
          eyebrowMuted
          title="Help your team answer when they get stuck."
          description="Ask for a suggested reply based on the full conversation and your instructions. Adjust the tone, edit the message, and decide what gets sent without leaving the inbox."
        />
      </BentoCard>
      <BentoCard>
        <BentoAsset className="h-[204px] md:h-[302px]">
          <div className="absolute inset-x-1 top-[49%] aspect-[1470/487] -translate-y-1/2">
            <Image src="/framer/VhZfrdcSYbiDogw7xuTs02TUweE.png" alt="" fill sizes="(min-width: 1200px) 532px, (min-width: 810px) 920px, 100vw" className="object-cover" />
          </div>
        </BentoAsset>
        <BentoCopy
          eyebrow="Founder Voice Notes"
          eyebrowMuted
          title="Bring your voice into the conversation."
          description="Your team writes a message for the person they are speaking with and turns it into a voice note in your voice. Add a personal touch without stopping your day to record every message."
        />
      </BentoCard>
      <BentoCard>
        <BentoAsset className="h-[314px]">
          <AttributionMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="Content Attribution"
          eyebrowMuted
          title="Know what brought them into your DMs."
          description="See which Story or post started the conversation. Use it to understand what caught their attention and make your next reply relevant."
        />
      </BentoCard>
    </FeatureSection>
  );
}
