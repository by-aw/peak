import Image from "next/image";
import type { ReactNode } from "react";
import { MockupFrame, Skeleton } from "@/components/shared/feature-card";
import { FaintDivider, MochiFaceIcon, PinIcon16, PinIcon32, StarMicroIcon, UsersMicroIcon } from "@/components/icons/feature-icons";

const CARD = "shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05),inset_0_0_0_1px_#e7e7e7]";
const BUBBLE = "shadow-[inset_0_0_0_1px_#e0e0e0]";
const HAIRLINE = "shadow-[inset_0_0_0_1px_#e7e7e7]";
const BOTTOM_LINE = "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#e7e7e7]";

/** Chat header shared by the "Team Chat" and "Ghost Mode" mockups: avatar, title, pin and members icons. */
function ChatHeader({ title }: { title: string }) {
  return (
    <div className={`relative flex w-full items-center gap-2 overflow-hidden bg-white px-6 py-4 ${BOTTOM_LINE}`}>
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <Image
          src="/framer/5sU1EyQxyIQjxMZY4lWYab8BPU0.png"
          alt=""
          width={1828}
          height={1836}
          className="size-8 shrink-0 rounded-full object-cover shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"
        />
        <p className="text-[16px] leading-[16px] font-medium tracking-[-0.4px] whitespace-pre-wrap text-black">{title}</p>
      </div>
      <PinIcon32 />
      <div className="flex size-8 items-center justify-center overflow-hidden rounded-[10px] p-2">
        <span className="relative block size-4 shrink-0 overflow-hidden">
          <UsersMicroIcon />
        </span>
      </div>
    </div>
  );
}

function Meta({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-3">{children}</div>;
}

function Dot() {
  return <span className="size-1 shrink-0 rounded-full bg-gray-300" />;
}

/** "Team Inbox" mockup: pinned announcement and a short team thread (428x464). */
export function TeamChatMockup() {
  return (
    <MockupFrame className={`flex flex-col overflow-hidden rounded-[16px] bg-white ${CARD}`}>
      <ChatHeader title="Team Chat" />
      <div className={`relative flex w-full items-center gap-2 overflow-hidden bg-white px-6 py-2.5 ${BOTTOM_LINE}`}>
        <div className="flex shrink-0 items-center gap-1.5 overflow-hidden p-2">
          <PinIcon16 />
          <p className="text-[14px] leading-[14px] font-semibold whitespace-pre text-gray-400">1/3</p>
        </div>
        <div className="min-w-0 flex-1 overflow-clip">
          <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-nowrap text-black">
            morning guys big push this week — want at least 15 booked calls by friday. who’s on follow-ups today?
          </p>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-center gap-8 p-6 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#efefef]">
        <div className="flex w-full flex-col gap-8">
          <div className="flex w-full flex-col gap-3">
            <Meta>
              <div className="flex items-start gap-2">
                <Image src="/framer/Vw3nG4eOn5AtoW2BAQN1kBY70Mw.jpg" alt="" width={400} height={400} className="size-3.5 rounded-full object-cover" />
                <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500">Mia [S]</p>
              </div>
            </Meta>
            <div className="flex w-full flex-col overflow-hidden">
              <div className={`flex w-full flex-col rounded-[6px_12px_12px_12px] bg-white px-3 py-[14px] ${BUBBLE}`}>
                <p className="w-full text-[14px] leading-[24px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-black">yeah if they get the full pitch too early they ghost.</p>
              </div>
            </div>
            <p className="w-full text-[12px] leading-[12px] font-medium whitespace-pre-wrap text-gray-500">11:48 AM</p>
          </div>
          <div className="flex w-full flex-col gap-5">
            <Meta>
              <div className="flex items-start gap-2">
                <Image src="/framer/yxlxhmuLqqhMsFLtwW2GrTPuao.png" alt="" width={64} height={64} className="size-[15px] rounded-full object-cover" />
                <p className="text-[14px] leading-[14px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500">Jacob</p>
              </div>
              <Dot />
              <p className="text-[14px] leading-[14px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500">10:30 AM</p>
            </Meta>
            <div className="flex w-full flex-col gap-1.5">
              <Skeleton className="w-[104px]" />
              <Skeleton className="w-[180px]" flat />
            </div>
          </div>
          <div className="flex w-full flex-col gap-[26px]">
            <Meta>
              <div className="flex items-start gap-2">
                <Image src="/framer/yNe5c6nYGGjDSnrTjKF48hFbPq0.png" alt="" width={400} height={400} className="size-[15px] rounded-full object-cover" />
                <p className="text-[15.37px] leading-[15.37px] font-medium tracking-[-0.22px] whitespace-pre text-gray-500">by Alex [S]</p>
              </div>
              <Dot />
              <p className="text-[15.37px] leading-[15.37px] font-medium tracking-[-0.22px] whitespace-pre text-gray-500">10:35 AM</p>
            </Meta>
            <p className="w-full text-[15.37px] leading-[26.36px] font-normal tracking-[-0.22px] whitespace-pre-wrap text-black">good catch. i’ll add that context here so the next person sees it.</p>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/** "Ghost Mode" mockup: a manager reviewing a still-unread lead (428x421). */
export function GhostModeMockup() {
  return (
    <MockupFrame className={`flex h-[421px] flex-col overflow-hidden rounded-[16px] bg-white ${CARD}`}>
      <ChatHeader title="Ghost Mode" />
      <div className="flex w-full flex-col items-center gap-6 p-6">
        <div className="flex w-full flex-col gap-8">
          <div className="flex w-full flex-col items-end gap-3">
            <div className="flex w-full flex-col items-end gap-1.5">
              <div className={`flex w-full items-center justify-between overflow-hidden rounded-[12px] bg-white p-3 shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05),inset_0_0_0_1px_#e0e0e0]`}>
                <div className="flex items-center gap-1.5">
                  <Image src="/framer/pWG4UpV20dKgvSVDqr4dWU9z4E.png" alt="" width={96} height={96} className="size-6 rounded-full object-cover" />
                  <p className="text-[14px] leading-[20px] font-medium tracking-[-0.2px] whitespace-pre text-black">David Scott</p>
                </div>
                <div className={`flex items-center gap-0.5 rounded-full bg-white py-1 pr-2 pl-[5px] ${BUBBLE}`}>
                  <StarMicroIcon />
                  <div className="flex items-center px-px">
                    <p className="text-[16px] leading-[19.2px] font-normal whitespace-pre text-black">Still unread</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-end pl-8">
                <div className="flex w-full flex-col rounded-[12px_6px_12px_12px] bg-[#3b82f6] px-3 py-[14px]">
                  <p className="w-full text-[16px] leading-[19.2px] font-normal whitespace-pre-wrap text-black">Manager is reviewing this conversation</p>
                </div>
              </div>
            </div>
            <p className="w-full text-right text-[12px] leading-[12px] font-medium whitespace-pre-wrap text-gray-500">10:26 AM</p>
          </div>
        </div>
        <div className="flex w-full items-center gap-3 overflow-hidden">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <Meta>
              <div className="flex items-start gap-2">
                <Image src="/framer/xLqDlSg1i5ew6WzK0HZn7Tnz10E.jpg" alt="" width={400} height={400} className="size-3.5 rounded-full object-cover" />
                <p className="text-[16px] leading-[19.2px] font-normal whitespace-pre text-black">Alex [S]</p>
              </div>
            </Meta>
            <div className="flex w-full flex-col gap-1.5">
              <div className="flex w-full flex-col overflow-hidden pr-8">
                <div className={`flex w-full flex-col rounded-[6px_12px_12px_6px] bg-white px-3 py-2 ${BUBBLE}`}>
                  <p className="w-full text-[16px] leading-[19.2px] font-normal whitespace-pre-wrap text-black">Lead still appears unread for Alex</p>
                </div>
              </div>
              <div className="flex w-full flex-col overflow-hidden pl-8">
                <div className={`flex h-7 w-full items-center rounded-[6px_12px_12px_12px] bg-white px-3 ${BUBBLE}`}>
                  <p className="text-[16px] leading-[19.2px] font-normal whitespace-pre text-black">The owner can see it still needs a reply.</p>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center px-8">
              <p className="w-full text-[12px] leading-[12px] font-medium whitespace-pre-wrap text-gray-500">11:48 AM</p>
            </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

/** "Mobile Notifications" mockup: a Mochi Team push notification (428x143, 98px from the top of the full-width card). */
export function MobileNotificationMockup() {
  return (
    <MockupFrame top="top-[98px]" className={`flex flex-col overflow-hidden rounded-[16px] bg-gray-25 ${HAIRLINE}`}>
      <div className={`flex w-full flex-col rounded-[16px] bg-white p-6 ${HAIRLINE}`}>
        <div className="flex w-full flex-col gap-8 bg-white">
          <div className="flex w-full flex-col gap-3">
            <div className="flex w-full items-center gap-[13px]">
              <div className="flex items-center gap-1.5">
                <MochiFaceIcon />
                <p className="text-[14px] leading-[14px] font-medium tracking-[-0.22px] whitespace-pre text-gray-500">Mochi Team</p>
              </div>
              <Dot />
              <p className="text-[14px] leading-[14px] font-medium tracking-[-0.22px] whitespace-pre text-gray-500">Now</p>
            </div>
            <FaintDivider />
            <div className="flex w-full flex-col gap-1">
              <p className="text-[14px] leading-[22px] font-medium tracking-[-0.2px] whitespace-pre text-black">@Alex mentioned you</p>
              <p className="w-full text-[13px] leading-[22px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-[#777070]">“mike.t_brands is ready — take this one”</p>
            </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}
