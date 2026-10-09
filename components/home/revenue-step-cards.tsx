import Image from "next/image";
import type { ReactNode } from "react";
import {
  BoltIcon,
  CalendarIcon,
  ChatIcon,
  CheckCircleIcon,
  LinkIcon,
  MoneyBagIcon,
  NewLeadIcon,
  PersonIcon,
  PhoneIcon,
  StarIcon,
} from "@/components/icons/timeline-icons";

/*
 * Building blocks of the "Turn DMs into revenue" timeline mockup.
 * Shared by the desktop horizontal track and the phone vertical ticker.
 */

export type Variant = "desktop" | "mobile";

const label = "text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] text-black";
const muted = "text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] text-gray-500";
const card =
  "flex flex-col gap-3 overflow-clip rounded-lg bg-white p-2 shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]";

function LinkBadge({ color }: { color: string }) {
  return (
    <div className={`relative size-6 shrink-0 overflow-clip rounded-lg ${color}`}>
      <LinkIcon className="absolute top-1.5 left-1.5 size-3" />
    </div>
  );
}

function Avatar({ src, size }: { src: string; size: number }) {
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className="size-5 shrink-0 rounded-full object-cover"
    />
  );
}

/** Row inside a white card: 20px icon + 14px label. */
function CardRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <div className="size-5 shrink-0">{icon}</div>
      <p className={`${label} whitespace-pre-wrap`}>{children}</p>
    </div>
  );
}

function NewLeadBody() {
  return (
    <div className="flex flex-col rounded-lg bg-gray-50">
      <div className="flex px-2 py-1.5">
        <p className="text-[14px] leading-5 font-medium tracking-[-0.2px] text-black">Replied to story</p>
      </div>
      <div className={card}>
        <CardRow icon={<ChatIcon className="size-5" />}>“START”</CardRow>
        <CardRow icon={<BoltIcon className="size-5" />}>FREE TRIAL FUNNEL</CardRow>
      </div>
    </div>
  );
}

function LinkBody({ variant }: { variant: Variant }) {
  return (
    <div className={`flex items-start gap-3 rounded-lg p-2 ${variant === "mobile" ? "bg-white" : "bg-gray-50"}`}>
      <div className="flex flex-1 flex-col justify-center gap-1">
        <p className="text-[14px] leading-5 font-medium tracking-[-0.2px] text-black">DM Revenue System</p>
        <p className="text-[12px] leading-4 font-medium text-gray-500">moch.me/apply</p>
      </div>
      <Image
        src="/framer/rdoy5Rv8q7DmJ6B9Jk89skDPuoc.png"
        alt=""
        width={284}
        height={160}
        className="h-10 w-[71px] shrink-0 rounded-[4px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
      />
    </div>
  );
}

function AssigneeBody({ src, name, variant }: { src: string; name: string; variant: Variant }) {
  return (
    <div className={`flex items-center gap-3 ${variant === "desktop" ? "px-0.5" : ""}`}>
      <Avatar src={src} size={20} />
      <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">{name}</p>
    </div>
  );
}

function BookedBody() {
  return (
    <div className={card}>
      <CardRow icon={<CalendarIcon className="size-5" />}>Jul 17, 3:00 PM (PST)</CardRow>
      <CardRow icon={<Avatar src="/framer/8DEZEWXJXLVEtQRJ81UbMXUDm9s.png" size={20} />}>harrywatts [S]</CardRow>
    </div>
  );
}

function WonBody() {
  return (
    <div className={card}>
      <CardRow icon={<CheckCircleIcon className="size-5" />}>$2,800</CardRow>
      <CardRow icon={<Avatar src="/framer/8DEZEWXJXLVEtQRJ81UbMXUDm9s.png" size={20} />}>harrywatts [S]</CardRow>
    </div>
  );
}

export type Step = { name: string; time: string; icon: ReactNode; body: (v: Variant) => ReactNode };

export const STEPS: Step[] = [
  { name: "New Lead", time: "Jul 14, 10:14 AM", icon: <NewLeadIcon className="size-6" />, body: () => <NewLeadBody /> },
  { name: "Link Sent", time: "10:15 AM", icon: <LinkBadge color="bg-gray-500" />, body: (v) => <LinkBody variant={v} /> },
  { name: "Link Clicked", time: "After 32m", icon: <LinkBadge color="bg-blue-500" />, body: (v) => <LinkBody variant={v} /> },
  {
    name: "Setter Assigned",
    time: "10:48 AM",
    icon: <PersonIcon className="size-6" />,
    body: (v) => <AssigneeBody src="/framer/KouTHLyCrzoeCTka2ukMAtbWiw.png" name="Alex Wong" variant={v} />,
  },
  {
    name: "Qualified",
    time: "Jul 15, 6:43 AM",
    icon: <StarIcon className="size-6" />,
    body: (v) => <AssigneeBody src="/framer/KouTHLyCrzoeCTka2ukMAtbWiw.png" name="Alex Wong" variant={v} />,
  },
  {
    name: "Closer Assigned",
    time: "6:44 AM",
    icon: <PersonIcon className="size-6" />,
    body: (v) => <AssigneeBody src="/framer/LCC7AFzg7aQF3aG8PNvoeAC2M.png" name="harrywatts [S]" variant={v} />,
  },
  { name: "Call Booked", time: "8:31 AM", icon: <PhoneIcon className="size-6" />, body: () => <BookedBody /> },
  { name: "Won", time: "10:04 AM", icon: <MoneyBagIcon className="size-6" />, body: () => <WonBody /> },
];

/** Desktop/tablet column: header with a trailing rule, body underneath. 337.5px wide (8 per 2812px track). */
export function DesktopStep({ step }: { step: Step }) {
  return (
    <div className="flex w-[337.5px] shrink-0 flex-col gap-3">
      <div className="flex items-center gap-2.5 overflow-clip">
        <div className="size-6 shrink-0">{step.icon}</div>
        <div className="flex shrink-0 gap-1.5 overflow-clip">
          <p className={`${label} whitespace-pre`}>{step.name}</p>
          <p className={`${muted} whitespace-pre text-right`}>{step.time}</p>
        </div>
        <div className="h-px min-w-0 flex-1 rounded-full bg-black/10" />
      </div>
      <div className="flex flex-col gap-1.5">{step.body("desktop")}</div>
    </div>
  );
}

/** Phone row: header with the time pushed right, a vertical rule under the icon, body indented. */
export function MobileStep({ step }: { step: Step }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2.5 overflow-clip">
        <div className="size-6 shrink-0">{step.icon}</div>
        <div className="flex flex-1 justify-between">
          <p className={`${label} whitespace-pre`}>{step.name}</p>
          <p className={`${muted} whitespace-pre text-right`}>{step.time}</p>
        </div>
      </div>
      <div className="flex gap-0.5">
        <div className="flex w-6 shrink-0 flex-col items-center overflow-clip">
          <div className="w-px flex-1 rounded-full bg-black/10" />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-1.5 px-2 pb-2">{step.body("mobile")}</div>
      </div>
    </div>
  );
}
