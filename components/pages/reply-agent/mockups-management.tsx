import {
  AiBadgeIcon,
  ChatOvalIcon,
  MochiAvatarIcon,
  TakeoverRow1Graphic,
  TakeoverRow2Graphic,
  TakeoverRow3Graphic,
  UserPlusIcon,
} from "@/components/icons/reply-agent-icons";
import { Avatar, FloatingCard, Skeleton, Tag, TextStack, cardRing, cardShadow } from "./mockup-primitives";

const headerTitle = "text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-black";
const headerSub = "text-[12px] leading-[12px] font-normal tracking-[-0.2px] whitespace-pre text-gray-500";
const optionRow = "flex w-full items-center gap-6 rounded-[8px] bg-gray-25 px-3 py-[14px] opacity-80 inset-ring-1 inset-ring-[#e0e0e0]";
const circle = "block size-[19px] shrink-0 rounded-full bg-[#f1f1f1]";
const chatUi = `flex w-full flex-col items-start gap-6 rounded-[16px] bg-white px-5 py-6 ${cardRing}`;

/** "Away Mode" card: toggle header, handled conversations and the "mochi ai" notification. */
export function AwayModeMockup() {
  return (
    <FloatingCard top="48px">
      <div className={`flex w-full flex-col items-start overflow-hidden rounded-[16px] ${cardShadow} ${cardRing}`}>
        <div className="flex w-full items-center justify-between overflow-hidden px-5 py-4">
          <span className="flex flex-col items-start gap-[6px]">
            <p className={headerTitle}>Away Mode</p>
            <p className={headerSub}>AI handles all conversations</p>
          </span>
          <span className="flex h-5 w-9 items-center justify-end overflow-hidden rounded-[12px] bg-purple-500 p-0.5">
            <span className="block size-4 rounded-full bg-white shadow-[0_1px_2px_0_rgba(16,24,40,0.06),0_1px_3px_0_rgba(16,24,40,0.1)]" />
          </span>
        </div>
        <div className={chatUi}>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full flex-col items-start gap-[6px]">
              {(["handled", "handled", "qualified"] as const).map((label, i) => (
                <div key={i} className={optionRow}>
                  <span className="flex min-w-0 flex-1 items-start gap-2">
                    <span className={circle} />
                    <TextStack />
                  </span>
                  <Tag>{label}</Tag>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-[382px] max-w-full items-start gap-[14px] overflow-hidden rounded-[16px] bg-white p-4 shadow-[0_6px_8px_0_rgba(0,0,0,0.03)] inset-ring-1 inset-ring-[#f7f7f7]">
            <MochiAvatarIcon className="shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-[17px]">
              <div className="flex w-full flex-col items-start justify-center gap-[11px]">
                <div className="flex w-full items-center gap-[6px]">
                  <p className="flex-1 text-[14px] leading-[14px] font-medium tracking-[-0.21px] whitespace-pre-wrap text-black">mochi ai</p>
                  <p className="text-[13px] leading-[13px] font-normal tracking-[-0.21px] whitespace-pre text-gray-500">now</p>
                </div>
                <p className="w-full text-[13px] leading-[13px] font-normal tracking-[-0.21px] whitespace-pre-wrap text-gray-500">
                  Hey! Thanks for reaching out. Our program covers fitness and mindset. Would you like to learn more? 😊
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex items-center gap-[2px] rounded-full bg-white py-[4.3px] pr-[8.6px] pl-[5.4px] inset-ring-1 inset-ring-[#e0e0e0]">
                  <UserPlusIcon />
                  <span className="px-px text-[12.5px] leading-[12.5px] font-medium tracking-[-0.21px] whitespace-pre text-gray-500">New lead</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}

const count = "text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-[#111]";

/** "Return Summary" card: post-mission debrief counters. */
export function DebriefMockup() {
  return (
    <FloatingCard top="65%" centerY>
      <div className={`flex w-full flex-col items-start overflow-hidden rounded-[16px] ${cardShadow} ${cardRing}`}>
        <div className="flex w-full items-center overflow-hidden px-5 py-4">
          <span className="flex min-w-0 flex-1 flex-col items-start gap-[6px]">
            <p className={headerTitle}>Post-Mission Debrief</p>
            <p className={headerSub}>AI handles all conversations</p>
          </span>
        </div>
        <div className={chatUi}>
          <div className="flex w-full flex-col items-start gap-[6px]">
            <div className={optionRow}>
              <span className="flex min-w-0 flex-1 items-start gap-2">
                <p className="w-full text-[14px] leading-[14px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-black">DMs handled</p>
              </span>
              <span className={count}>14</span>
            </div>
            {["3", "1", "2"].map((n) => (
              <div key={n} className={optionRow}>
                <span className="flex min-w-0 flex-1 items-start gap-2">
                  <TextStack />
                </span>
                <span className={count}>{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}

/** "Takeover" card: conversation list with assignees and the "Handover to AI" button. */
export function TakeoverMockup() {
  return (
    <FloatingCard top="48px" align="left">
      <div className={`flex w-full flex-col items-start overflow-hidden rounded-[16px] ${cardShadow} ${cardRing}`}>
        <div className="flex w-full items-center overflow-hidden px-5 py-4">
          <span className="flex min-w-0 flex-1 flex-col items-start gap-[6px]">
            <p className={headerTitle}>Per-Conversation Takeover</p>
            <p className={headerSub}>Delegate conversations to AI</p>
          </span>
        </div>
        <div className={chatUi}>
          <div className="flex w-full flex-col items-start gap-[6px]">
            <TakeoverRow1Graphic className="block h-12 w-[388px] shrink-0" />
            <TakeoverRow2Graphic className="block h-12 w-[388px] shrink-0" />
            <div className={`${optionRow} w-[388px]! shrink-0`}>
              <span className="flex min-w-0 flex-1 items-start gap-2">
                <span className={circle} />
                <TextStack />
              </span>
              <Avatar src="/framer/7boxDpkOgRw2nJfniFJfLlt2dlY.png" />
            </div>
            <TakeoverRow3Graphic className="block h-12 w-[388px] shrink-0" />
          </div>
          <div className="flex w-full items-center justify-center gap-4">
            <span className="flex min-w-0 flex-1 items-center justify-center gap-1 overflow-hidden rounded-[10px] bg-ink-2 px-5 py-[14px] shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]">
              <span className="px-1 text-center text-[18px] leading-[20px] font-medium whitespace-pre text-white">Handover to AI</span>
            </span>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}

function TagRow({ emoji, label, barH, children }: { emoji: string; label: string; barH: 4 | 5; children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center gap-[2px]">
      <span className="flex items-start gap-2">
        <span className="flex items-center justify-center gap-1 overflow-hidden rounded-full bg-gray-25 px-2 py-1.5 inset-ring-1 inset-ring-gray-150">
          <span className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500">{emoji}</span>
          <span className="px-0.5 text-[13px] leading-[13.65px] font-medium tracking-[-0.2px] whitespace-pre text-black">{label}</span>
        </span>
      </span>
      <span className={`relative flex-1 rounded-[4px] bg-gray-25 ${barH === 5 ? "h-[5px]" : "h-1 overflow-hidden"}`}>
        <span
          aria-hidden
          className="absolute left-1 h-0.5 w-5 overflow-hidden rounded-[24px] bg-[linear-gradient(90deg,rgba(168,85,247,0.6)_0%,#581c87_100%)] opacity-80 blur-[1px]"
          style={{ top: barH === 5 ? 2 : 1.5 }}
        />
      </span>
      {children}
    </div>
  );
}

/** "Tag-Triggered" card: lead-type routing rows plus a live conversation the AI is typing in. */
export function TagTriggeredMockup() {
  return (
    <FloatingCard top="67%" centerY>
      <div className="flex w-full flex-col items-start gap-2">
        <div className={`flex w-full items-center overflow-hidden rounded-[16px] bg-white ${cardRing}`}>
          <div className="flex w-full flex-col items-center gap-6 p-3 shadow-[inset_0_-1px_0_0_#efefef]">
            <TagRow emoji="👀" label="nurture" barH={5}>
              <AiBadgeIcon className="shrink-0" />
            </TagRow>
            <TagRow emoji="⏳" label="time waster" barH={4}>
              <AiBadgeIcon className="shrink-0" />
            </TagRow>
            <TagRow emoji="🔥" label="hot" barH={4}>
              <span className="flex items-center justify-center px-1.5">
                <Avatar src="/framer/GwjGgr1fKE7kCXJVWH192ctSYo.png" />
              </span>
            </TagRow>
          </div>
        </div>
        <div className={`flex w-full flex-col items-start overflow-hidden rounded-[16px] bg-white ${cardShadow} ${cardRing}`}>
          <div className="flex w-full items-center justify-center gap-4 overflow-hidden px-5 py-4 shadow-[inset_0_-1px_0_0_#e7e7e7]">
            <span className="relative flex size-8 shrink-0 items-center justify-center">
              <Avatar src="/framer/54ld3a5oqlabzerddR3jMw1pU.png" size={32} />
              <span className="absolute top-3 left-3 block size-2 rounded-full bg-[#10b981] inset-ring-2 inset-ring-white" />
            </span>
            <p className="line-clamp-2 flex-1 text-[13px] leading-[24px] font-normal tracking-[-0.2px] whitespace-pre-line text-black">
              Just checking out different solutions at the moment. Can you tell me more about how your platform compares to others in the market? Specifically interested in the team management features.
            </p>
            <span className="flex items-center justify-center gap-0.5 rounded-[8px] bg-blue-500 px-1 py-[3px] inset-ring-2 inset-ring-white">
              <span className="flex size-3 items-center justify-center overflow-hidden">
                <ChatOvalIcon />
              </span>
              <span className="text-center text-[12px] leading-[12px] font-semibold tracking-[-0.4px] whitespace-pre text-white">3</span>
            </span>
          </div>
          <div className="flex w-full flex-col items-start gap-6 p-5">
            <div className="flex w-full flex-col items-start gap-3">
              <span className="flex items-center">
                <span className="text-[11px] leading-[18px] font-normal tracking-[-0.2px] whitespace-pre text-[#1a1a1a]">AI typing</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/framer/srB0z1bIUhgLtJnMcrJNHQ4PU.gif" alt="" width={72} height={32} className="block h-4 w-9 object-cover" />
              </span>
              <div className="flex w-full items-start gap-6">
                <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-4">
                  <span className="flex w-full flex-col items-start gap-[6px]">
                    <Skeleton w={336} />
                    <Skeleton w={149} tone="fade" />
                  </span>
                  <p className="w-full text-[12px] leading-[12px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">3:47 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}
