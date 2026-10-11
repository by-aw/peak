import Image from "next/image";
import type { ReactNode } from "react";
import {
  BoltIcon,
  CalendarIcon,
  ChatIcon,
  CheckCircleIcon,
  LinkIcon,
  NewLeadIcon,
  PersonIcon,
  PhoneIcon,
  StarIcon,
  MoneyBagIcon,
} from "@/components/icons/timeline-icons";
import type { Step, Variant } from "@/components/home/revenue-step-cards";

/*
 * /business "From a question to the right next step" timeline: the home page's "Turn DMs into revenue" steps
 * (components/home/revenue-step-cards.tsx) with the copy Framer swapped in for local service businesses. Same icons,
 * avatars, link preview and layout; only the text differs. Copy is verbatim from the live page, including
 * "Alex Team updatedg".
 */

const label = "text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] text-black";
const surface = "overflow-clip rounded-lg bg-white p-2 shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]";
const card = `flex flex-col gap-3 ${surface}`;

function LinkBadge({ color }: { color: string }) {
  return (
    <div className={`relative size-6 shrink-0 overflow-clip rounded-lg ${color}`}>
      <LinkIcon className="absolute top-1.5 left-1.5 size-3" />
    </div>
  );
}

function Avatar({ src }: { src: string }) {
  return <Image src={src} alt="" width={20} height={20} className="size-5 shrink-0 rounded-full object-cover" />;
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

/** The thumbnail beside the first card's rows (card only), on a pastel wash while it loads. */
function StoryThumb() {
  return (
    <div className="relative w-[37px] shrink-0 self-stretch overflow-hidden rounded-[4px] bg-[linear-gradient(180deg,#fee9fd_0%,#fee4e2_50%,#fbecca_100%)]">
      <Image src="/timeline-story.png" alt="" fill sizes="37px" className="object-cover" />
      <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function InquiryBody({ variant }: { variant: Variant }) {
  return (
    <div className="flex flex-col rounded-lg bg-gray-50">
      <div className="flex px-2 py-1.5">
        <p className="text-[14px] leading-5 font-medium tracking-[-0.2px] text-black">Sent an Instagram DM</p>
      </div>
      <div className={`flex gap-3 ${surface}`}>
        <div className="flex flex-1 flex-col gap-3">
          <CardRow icon={<ChatIcon className="size-5" />}>“Full detail?”</CardRow>
          <CardRow icon={<BoltIcon className="size-5" />}>SERVICE ENQUIRY</CardRow>
        </div>
        {variant === "card" ? <StoryThumb /> : null}
      </div>
    </div>
  );
}

function LinkBody({ variant }: { variant: Variant }) {
  return (
    <div className={`flex items-start gap-3 rounded-lg p-2 ${variant === "card" ? "bg-gray-50" : "bg-white"}`}>
      <div className="flex flex-1 flex-col justify-center gap-1">
        <p className="text-[14px] leading-5 font-medium tracking-[-0.2px] text-black">Full detailing service</p>
        <p className="text-[12px] leading-4 font-medium text-gray-500">Your booking link</p>
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

function AssigneeBody({ src, name }: { src: string; name: string }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar src={src} />
      <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">{name}</p>
    </div>
  );
}

/** "Link opened" / "Team updated": a white card with an icon row and the team row. */
function TeamCard({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className={card}>
      <CardRow icon={icon}>{children}</CardRow>
      <CardRow icon={<Avatar src="/framer/8DEZEWXJXLVEtQRJ81UbMXUDm9s.png" />}>Your team</CardRow>
    </div>
  );
}

const ALEX = "/framer/KouTHLyCrzoeCTka2ukMAtbWiw.png";

export const STEPS: Step[] = [
  { name: "New inquiry", time: "Jul 14, 10:14 AM", icon: <NewLeadIcon className="size-6" />, body: (v) => <InquiryBody variant={v} /> },
  { name: "Question answered", time: "10:15 AM", icon: <LinkBadge color="bg-gray-500" />, body: (v) => <LinkBody variant={v} /> },
  { name: "Details collected", time: "After 32m", icon: <LinkBadge color="bg-blue-500" />, body: (v) => <LinkBody variant={v} /> },
  { name: "Needs understood", time: "10:48 AM", icon: <PersonIcon className="size-6" />, body: () => <AssigneeBody src={ALEX} name="Alex Team updatedg" /> },
  { name: "Ready for next step", time: "Jul 15, 6:43 AM", icon: <StarIcon className="size-6" />, body: () => <AssigneeBody src={ALEX} name="Alex Team updatedg" /> },
  {
    name: "Link shared",
    time: "6:44 AM",
    icon: <PersonIcon className="size-6" />,
    body: () => <AssigneeBody src="/framer/LCC7AFzg7aQF3aG8PNvoeAC2M.png" name="Your team" />,
  },
  {
    name: "Link opened",
    time: "8:31 AM",
    icon: <PhoneIcon className="size-6" />,
    body: () => <TeamCard icon={<CalendarIcon className="size-5" />}>Customer opened the link</TeamCard>,
  },
  {
    name: "Team updated",
    time: "10:04 AM",
    icon: <MoneyBagIcon className="size-6" />,
    body: () => <TeamCard icon={<CheckCircleIcon className="size-5" />}>Service enquiry</TeamCard>,
  },
];
