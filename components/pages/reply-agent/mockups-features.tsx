import { AlertIcon, BoltIcon, BookingRowGraphic, ChatBubbleIcon, DollarIcon, PhoneIcon, StarIcon } from "@/components/icons/reply-agent-icons";
import { LiveDot } from "./live-dot";
import { Connector, FloatingCard, IconBox, Skeleton, Tag, TextStack, cardRing, cardShadow } from "./mockup-primitives";

const rowTitle = "text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-black";
const rowSub = "text-[12px] leading-[12px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500";

/** "7-Stage Conversation Flow" timeline card (Opener / Nurture / CTA / Objection Handling / Follow-up / Booked). */
export function ConversationFlowMockup() {
  return (
    <FloatingCard top="90%" centerY>
      <div className={`flex w-full flex-col items-center overflow-hidden rounded-[16px] bg-white p-3 ${cardShadow}`}>
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full items-center gap-4 p-3">
            <span className="flex h-[37px] items-center">
              <IconBox color="#f97316">
                <BoltIcon />
              </IconBox>
            </span>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-[10px]">
              <p className={rowTitle}>Opener</p>
              <p className={rowSub}>First contact sent</p>
            </span>
            <Tag>Done</Tag>
          </div>
          <Connector />
          <div className="flex w-full items-center gap-4 p-3">
            <IconBox color="#3b82f6">
              <ChatBubbleIcon />
            </IconBox>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-2">
              <Skeleton w={196} color="#f0f0f0" radius={16} />
              <Skeleton w={136} tone="fade" radius={16} />
            </span>
            <Tag>Done</Tag>
          </div>
          <Connector />
          <div className="flex w-full items-center gap-4 p-3">
            <IconBox color="#d97706">
              <StarIcon />
            </IconBox>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-2">
              <Skeleton w={124} color="#f0f0f0" radius={16} />
              <Skeleton w={80} tone="fade" radius={16} />
            </span>
            <Tag>Active</Tag>
          </div>
          <Connector />
          <div className="flex w-full items-center gap-4 rounded-[12px] p-3">
            <span className="flex h-[37px] items-center opacity-[0.32]">
              <IconBox color="#6d6d6d">
                <PhoneIcon />
              </IconBox>
            </span>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-[10px] opacity-[0.32]">
              <p className={rowTitle}>Objection Handling</p>
              <p className={rowSub}>Ready if needed</p>
            </span>
            <Tag tone="muted">Queued</Tag>
          </div>
          <Connector />
          <div className="flex w-full items-center gap-4 p-3">
            <span className="flex h-[37px] items-center opacity-[0.32]">
              <IconBox color="#3b82f6">
                <PhoneIcon />
              </IconBox>
            </span>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-[10px] opacity-[0.32]">
              <p className={rowTitle}>Follow-up</p>
              <p className={rowSub}>24-hour reminder set</p>
            </span>
            <Tag tone="muted">Queued</Tag>
          </div>
          <Connector />
          <div className="flex w-full items-center gap-4 p-3">
            <span className="flex h-[37px] items-center opacity-[0.32]">
              <IconBox color="#10b981">
                <DollarIcon />
              </IconBox>
            </span>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-[10px] opacity-[0.32]">
              <p className={rowTitle}>Booked</p>
              <p className={rowSub}>Call confirmed</p>
            </span>
            <Tag tone="muted">Target</Tag>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}

const playbookRow = "flex w-full flex-col items-start justify-center gap-[10px] overflow-hidden px-4 py-[14px] shadow-[inset_0_-1px_0_0_#e7e7e7]";
const playbookLabel = "text-[14px] leading-[14px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-black";

/** "Creator DNA Training" playbook card: scanning header + voice profile / rules / scripts rows and tags. */
export function CreatorPlaybookMockup() {
  return (
    <FloatingCard top="65%" centerY>
      <div className={`flex w-full flex-col items-start overflow-hidden rounded-[16px] bg-gray-25 ${cardRing}`}>
        <div className="flex w-full items-center justify-between bg-gray-25 p-4">
          <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500">📋 Creator Playbook v3.2</p>
          <span className="flex items-center gap-[6px]">
            <LiveDot pulse />
            <span className="text-[9px] leading-[9.9px] font-normal tracking-[-0.1px] whitespace-pre text-[#44d358]">Scanning</span>
          </span>
        </div>
        <div className={`flex w-full flex-col items-start rounded-[16px] bg-white ${cardRing}`}>
          <div className={playbookRow}>
            <p className={playbookLabel}>Voice Profile</p>
            <p className="w-full truncate text-[14px] leading-[16.8px] font-normal tracking-[-0.2px] text-gray-500 md:overflow-visible md:whitespace-pre-wrap">Casual, direct, confidence-first. No corporate speak.</p>
          </div>
          <div className={playbookRow}>
            <p className={playbookLabel}>Qualification Rules</p>
            <span className="flex flex-col items-start gap-2">
              <Skeleton w={196} color="#f0f0f0" radius={16} />
              <Skeleton w={136} tone="fade" radius={16} />
            </span>
          </div>
          <div className={playbookRow}>
            <p className={playbookLabel}>Objection Scripts</p>
            <TextStack />
          </div>
          <div className={playbookRow}>
            <span className="flex items-center gap-[6px]">
              <Tag>Tone</Tag>
              <Tag>Openers</Tag>
              <Tag>CTAs</Tag>
              <Tag tone="muted">Objections...</Tag>
            </span>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}

/** "Smart Escalation" card: red confidence banner above the hand-off card with a suggested reply. */
export function SmartEscalationMockup() {
  return (
    <FloatingCard top="48px">
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex flex-col items-center rounded-[12px] bg-[rgba(210,7,10,0.1)] p-[14px] opacity-80 inset-ring-1 inset-ring-[#d2070a]">
          <span className="flex items-center gap-[6px]">
            <span className="flex size-4 items-center justify-center">
              <AlertIcon />
            </span>
            <p className="text-[14px] leading-[14px] font-medium tracking-[-0.21px] whitespace-pre text-[#d2060a]">AI Confidence Low — Human Required</p>
          </span>
        </div>
        <div className={`flex w-full flex-col items-start gap-4 overflow-hidden rounded-[16px] bg-white p-6 ${cardShadow}`}>
          <div className="flex w-full flex-col items-start justify-center gap-2">
            <p className="w-full text-[13px] leading-[22px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">Lead is pushing back on price. AI escalating to your team.</p>
            <div className="flex w-full items-center rounded-[8px] p-3 inset-ring-1 inset-ring-[#ebebeb]">
              <p className="w-full text-[12px] leading-[16.2px] font-normal whitespace-pre-wrap text-black">
                <span className="text-[#0bb07a]">Suggested reply:</span> &quot;I totally get it — let me ask, what would it mean for your business if you could close 3 extra clients this month?&quot;
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[6px]">
            <span className="flex items-center justify-center rounded-[6px] bg-[rgba(16,185,129,0.1)] px-3 py-1.5 text-[12px] leading-[15.6px] font-medium tracking-[-0.2px] whitespace-pre text-[#10b981] inset-ring-1 inset-ring-[#10b981]">
              Take over
            </span>
            <span className="flex items-center justify-center rounded-[6px] bg-white px-3 py-1.5 text-[12px] leading-[15.6px] font-normal tracking-[-0.2px] whitespace-pre text-[#787878] inset-ring-1 inset-ring-[#e0e0e0]">
              Use suggestion
            </span>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}

/** "Booking Automation" card: qualified lead -> Calendly link sent -> auto follow-up timeline. */
export function BookingAutomationMockup() {
  return (
    <FloatingCard top="50%" centerY>
      <div className={`flex w-full flex-col items-center overflow-hidden rounded-[16px] bg-white p-3 ${cardRing}`}>
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full items-start gap-4 p-3">
            <IconBox color="#f97316">
              <BoltIcon />
            </IconBox>
            <span className="flex min-w-0 flex-1 flex-col items-start gap-[10px]">
              <p className={rowTitle}>Lead qualified</p>
              <p className="text-[12px] leading-[12px] font-normal tracking-[-0.2px] whitespace-pre text-gray-500">Budget ✓ · Timeline ✓ · Decision maker ✓</p>
            </span>
          </div>
          <Connector />
          <div className="w-full">
            <BookingRowGraphic className="block h-12 w-full" preserveAspectRatio="none" />
          </div>
          <div className="flex w-full flex-col items-start gap-2 pl-12">
            <div className="flex w-full items-start gap-2 overflow-hidden rounded-[10px] px-3 py-2 inset-ring-1 inset-ring-[#f2f2f2]">
              <span className="flex min-w-0 flex-1 items-center gap-4">
                <span className="flex items-center justify-center gap-[7px]">
                  <span className="text-[14px] leading-[22px] font-normal tracking-[-0.2px] whitespace-pre text-black">📅</span>
                  <span className="flex flex-col items-start justify-center gap-1">
                    <span className="text-[12px] leading-[12px] font-normal tracking-[-0.22px] whitespace-pre text-gray-500">Strategy Call · 30 min</span>
                    <span className="text-[10px] leading-[10px] font-normal tracking-[-0.22px] whitespace-pre text-[#a9a9a9]">calendly.com/yourname</span>
                  </span>
                </span>
              </span>
              <Tag>Sent</Tag>
            </div>
          </div>
          <span aria-hidden className="flex h-4 w-12 flex-col items-center justify-end">
            <span className="block h-14 w-px rounded-full bg-gray-300" />
          </span>
          <div className="flex w-full items-start gap-4 p-3">
            <span className="relative flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-[rgba(217,119,6,0.12)]">
              <span className="text-[12px] leading-[12.6px] font-medium tracking-[-0.2px] text-white">⏳</span>
            </span>
            <span className="flex min-w-0 flex-1 flex-col items-start justify-center gap-[10px]">
              <TextStack gap={8} />
            </span>
            <Tag tone="amber">Auto follow-up</Tag>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}
