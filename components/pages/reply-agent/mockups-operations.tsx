import Image from "next/image";
import { DistributionStackGraphic } from "@/components/icons/reply-agent-icons";
import { AbTestCard } from "./ab-test-card";
import { LiveDot } from "./live-dot";
import { Avatar, FloatingCard, MiniTag, Skeleton, Tag, TextStack, cardRing, cardShadow } from "./mockup-primitives";

const pct = "text-[10px] leading-[13.5px] font-normal tracking-[-0.2px] whitespace-pre text-[#b5b5b5]";

/** "Percentage-Based Distribution" card: AI share slider + AI / Human lead rows. */
export function DistributionMockup() {
  return (
    <FloatingCard top="77%" centerY>
      <div className={`flex w-full items-center overflow-hidden rounded-[16px] bg-white p-6 ${cardShadow}`}>
        <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex flex-col items-start">
              <p className="text-[10px] leading-[13.5px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-[#565656] opacity-40">AI receives:</p>
              <p className="font-display text-[28px] leading-[33.6px] font-bold tracking-[-0.2px] whitespace-pre-wrap text-black">5%</p>
            </div>
            <div className="flex w-full flex-col items-start gap-3">
              <div className="relative h-[17px] w-full">
                <span className="absolute inset-x-0 top-[5px] bottom-1 overflow-hidden rounded-[24px] bg-gray-25 inset-ring-1 inset-ring-[#f9f9f9]" />
                <span className="absolute top-[0.5px] left-[29px] size-[15px] overflow-hidden rounded-full shadow-[0_0_6px_2px_rgba(181,85,224,0.4)]">
                  <Image src="/framer/UzjUmssjjygosCZDMkEDcf1TTns.png" alt="" width={68} height={68} className="h-full! w-full rounded-full" />
                </span>
              </div>
              <div className="flex w-full items-center justify-between px-2">
                <span className={pct}>0%</span>
                <span className={pct}>25%</span>
                <span className={pct}>50%</span>
                <span className={pct}>75%</span>
                <span className={pct}>100%</span>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex w-full items-center justify-between overflow-hidden rounded-[8px] bg-[rgba(250,250,250,0.1)] px-2 py-[10px] inset-ring-1 inset-ring-gray-25">
              <DistributionStackGraphic className="block h-5 w-[174px]" />
              <MiniTag>AI</MiniTag>
            </div>
            {["/framer/7boxDpkOgRw2nJfniFJfLlt2dlY.png", "/framer/qYjv2DvP3UufGND9s05u17qv24.png", "/framer/3JBNMu5nBmZVPJiH1BX39OHaPs.png"].map((src) => (
              <div key={src} className="flex w-full items-center justify-between overflow-hidden rounded-[8px] bg-[rgba(250,250,250,0.1)] px-2 py-[10px] inset-ring-1 inset-ring-gray-25">
                <span className="flex items-center gap-[6px]">
                  <Avatar src={src} />
                  <TextStack />
                </span>
                <MiniTag>Human</MiniTag>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}

const cfgLabel = "text-[14px] leading-[18px] font-medium tracking-[-0.2px] whitespace-pre";
const cfgValue = "text-[12px] leading-[18px] font-normal tracking-[-0.2px] whitespace-pre text-black";

/** "Playbook Config" card: window chrome, qualification / objections / hard rules and a strip of rule tags. */
export function PlaybookConfigMockup() {
  return (
    <FloatingCard top="85%" centerY width={420}>
      <div className={`flex w-full flex-col items-start gap-[2px] overflow-hidden rounded-[16px] bg-white ${cardRing}`}>
        <div className="flex w-full items-center justify-between overflow-hidden bg-white px-5 py-4 shadow-[inset_0_-1px_0_0_#f7f7f7]">
          <span className="flex items-center gap-1">
            <span className="block size-[6px] rounded-full bg-[#e57c71]" />
            <span className="block size-[6px] rounded-full bg-[#efc336]" />
            <span className="block size-[6px] rounded-full bg-[#78da86]" />
          </span>
          <span className="flex items-center gap-[6px]">
            <LiveDot color="#78da86" />
            <span className="text-[9px] leading-[9.9px] font-normal tracking-[-0.1px] whitespace-pre text-[#78da86]">Live</span>
          </span>
        </div>
        <div className="flex w-full flex-col items-start gap-6 overflow-hidden bg-white p-5">
          <div className="flex w-full flex-col items-start gap-3">
            <p className={`${cfgLabel} text-gray-750`}>Qualification</p>
            <div className="flex w-full items-center justify-between">
              <TextStack w1={69} w2={142} />
              <span className="flex flex-col items-end gap-[6px]">
                <span className={cfgValue}>$2,000</span>
                <span className={cfgValue}>true</span>
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-3">
            <p className={`${cfgLabel} text-ink-3`}>Objections</p>
            <div className="flex w-full items-center justify-between">
              <TextStack w1={69} w2={142} />
              <span className="flex flex-col items-end gap-[6px]">
                <span className={cfgValue}>ROI reframe</span>
                <span className={cfgValue}>future pace</span>
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-3">
            <p className="text-[11px] leading-[18px] font-normal tracking-[-0.2px] whitespace-pre text-[#797979]">Hard rules</p>
            <div className="flex w-full items-center justify-between">
              <TextStack w1={69} w2={142} />
              <span className="flex flex-col items-end gap-[6px]">
                <span className="text-[9px] leading-[18px] font-normal tracking-[-0.2px] whitespace-pre text-black">On</span>
                <Skeleton w={79} />
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start px-5 py-4">
          <div className="flex items-start gap-2">
            <Tag small>Min. budget $2k</Tag>
            <Tag small tone="purple">Opener v3.2</Tag>
            <Tag small tone="red">No cursing</Tag>
            <Tag small tone="brown">CTA Stage 3</Tag>
            <Tag small tone="blue">Offer stack ×3</Tag>
            <Tag small tone="grey">+2 rules</Tag>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}

/** "A/B Testing Built In": the animated chat card, statically centred (no mask offset) with a bottom fade. */
export function AbTestMockup() {
  return (
    <div className="absolute inset-x-[17.5px] top-[17px] flex h-[304px] items-center justify-center [mask-image:linear-gradient(0deg,rgba(0,0,0,0)_0%,#000_17%)] md:inset-x-0 md:top-0 md:h-full">
      <div className="w-full md:w-[428px]">
        <AbTestCard />
      </div>
    </div>
  );
}

const objRow = "flex w-full items-center gap-2 rounded-[8px] px-[10px] py-[9px] inset-ring-1 inset-ring-[#f0f0f0]";
const objTag = "inline-flex items-center justify-center rounded-[6px] px-2 py-0.5 text-[12px] leading-[18px] font-normal tracking-[-0.2px] whitespace-pre inset-ring-1";

/** "Objection Handling" card: Price / Timing / Trust objection rows. */
export function ObjectionHandlingMockup() {
  return (
    <FloatingCard top="45%" centerY>
      <div className={`flex w-full flex-col items-start gap-5 overflow-hidden rounded-[16px] bg-white p-6 ${cardRing}`}>
        <div className={objRow}>
          <span className={`${objTag} bg-[rgba(249,109,112,0.1)] text-[#f96d70] inset-ring-[#f86c6f]`}>Price</span>
          <span className="flex min-w-0 flex-1 items-center gap-2">
            <span className="text-[12px] leading-[12px] font-medium tracking-[-0.2px] whitespace-pre text-[#2f2f2f] opacity-80">ROI reframe script applied</span>
          </span>
        </div>
        <div className={objRow}>
          <span className={`${objTag} bg-[rgba(246,201,66,0.1)] text-[#f6c942] inset-ring-[#f6c942]`}>Timing</span>
          <span className="flex min-w-0 flex-1 flex-col items-start justify-center gap-[10px]">
            <TextStack />
          </span>
        </div>
        <div className={`${objRow} p-[10px]`}>
          <span className={`${objTag} bg-[rgba(169,109,249,0.1)] text-[#a96cf8] inset-ring-[#a96cf8]`}>Trust</span>
          <span className="flex min-w-0 flex-1 flex-col items-start justify-center gap-[10px]">
            <TextStack />
          </span>
        </div>
      </div>
    </FloatingCard>
  );
}
