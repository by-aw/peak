import { ClickAreaIcon, PhotoMicro, VoiceSendButtons } from "@/components/icons/inbox-mockup-icons";

const BAR = "bg-[linear-gradient(90deg,rgba(227,227,227,0.12)_0%,#e1e1e1_100%)]";

/**
 * Framer "Wrapper > Stack" composer at the bottom of the chat mockups (Priority Inbox "AI Tags" card,
 * Personalization "AI Reply Assistant" card): attachment buttons, a skeleton text line and the purple
 * voice + blue send buttons. 428px wide in Framer; fills its parent here.
 */
export function MockupComposer() {
  return (
    <div className="flex w-full flex-col gap-2 px-5 pt-2 pb-[15px]">
      <div className="flex w-full items-center justify-between overflow-hidden rounded-[10px] bg-white p-2">
        <div className="flex items-center">
          <span className="flex size-7 items-center justify-center overflow-hidden rounded-lg bg-white p-1.5">
            <PhotoMicro width={12} height={12} />
          </span>
          <ClickAreaIcon width={28} height={28} />
        </div>
        <div className="flex h-4 min-w-0 flex-1 items-center gap-2 pr-2 pl-2.5">
          <span className="h-4 w-px rounded-full bg-[#e0e0e0]" />
          <span className={`h-1.5 w-full max-w-[188px] rounded-2xl ${BAR}`} />
        </div>
        <VoiceSendButtons width={62} height={28} />
      </div>
    </div>
  );
}
