import Image from "next/image";
import { line } from "@/components/shared/attribution/grid";
import { ClipboardMicroIcon, SquareStackMicroIcon, StarsIcon, TimelineLineActiveIcon, TimelineLineIcon } from "@/components/icons/attribution-icons";

const inputShadow = "shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]";
const skeletonGradient = "bg-[linear-gradient(90deg,rgba(227,227,227,0.12)_0%,#e1e1e1_100%)]";
const label = "w-full text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-black";
const value = "text-[14px] leading-[14px] font-normal tracking-[-0.2px] text-black";

/** "Edit Link" form card (Framer "Card", 502x335): skeleton lines, destination, short link and custom slug inputs. */
export function EditLinkCard() {
  return (
    <div className="flex w-full max-w-[502px] flex-col overflow-hidden rounded-[16px] bg-[#fcfcfc] shadow-[0_0_0_0.5px_#e0e0e0,0_4px_14px_0_rgba(0,0,0,0.1)]">
      <div className={`${line("after:border-b")} flex w-full items-center gap-2 bg-white p-5`}>
        <p className="text-[16px] leading-[19.2px] font-semibold tracking-[-0.2px] whitespace-pre text-black">Edit Link</p>
      </div>
      <div className="flex w-full flex-col items-start gap-5 overflow-hidden p-5">
        <div className="flex flex-col items-start gap-1.5">
          <span className={`h-1.5 w-[104px] rounded-[24px] ${skeletonGradient}`} />
          <span className="h-1.5 w-[180px] rounded-[24px] bg-[#efefef]" />
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <p className={label}>Destination</p>
          <span className="h-1.5 w-[232px] max-w-full rounded-[24px] bg-[#efefef]" />
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <p className={label}>Short Link</p>
          <div className={`flex h-9 w-full items-center overflow-hidden rounded-[8px] bg-white ${inputShadow}`}>
            <div className="flex h-full flex-1 items-center gap-2.5 px-2.5">
              <p className={`flex-1 ${value}`}>moch.me/abc123</p>
              <span className="relative size-4 shrink-0">
                <ClipboardMicroIcon className="absolute inset-x-0.5 inset-y-px" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <p className={label}>Custom Slug</p>
          <div className={`flex h-9 w-full items-center overflow-hidden rounded-[8px] bg-white ${inputShadow}`}>
            <div className={`${line("after:border-r")} flex h-full items-center bg-gray-50 px-2.5`}>
              <p className={`whitespace-pre ${value}`}>mochi.link/</p>
            </div>
            <div className="flex h-full flex-1 items-center gap-2.5 px-2.5">
              <p className={`flex-1 ${value}`}>free-training</p>
              <span className="relative size-4 shrink-0 overflow-hidden rounded-[2px]">
                <SquareStackMicroIcon className="absolute inset-0.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The A/B follow-up flow screenshot (Framer "Wrapper", 1.02345:1), clipped by its 440px frame on tablet/desktop. */
export function FollowUpPreview() {
  return (
    <div className="w-full">
      <Image src="/framer/swdbeK0d6KSzvHCfanx5TMFkI.png" width={1440} height={1407} alt="" sizes="(min-width: 1200px) 502px, (min-width: 810px) calc(100vw - 144px), calc(100vw - 72px)" className="h-auto w-full" />
    </div>
  );
}

type Skewed = { src: string; width: number; height: number; z: number; opacity?: string; inset: string; insetPhone: string; transform: string; transformPhone: string };

const SKEW = "matrix3d(1,-0.286745,0,0,0,1,0,0,0,0,1,-0.000833333,0,0,0,1)";

const SKEWED: Skewed[] = [
  {
    src: "/framer/ekj36P66WT6thssv9Qf5hxRdRZY.png",
    width: 1356,
    height: 669,
    z: 1,
    opacity: "opacity-90",
    inset: "37px 69px 136.719px 1px",
    insetPhone: "21px 48px 157.656px -7px",
    transform: SKEW,
    transformPhone: SKEW,
  },
  {
    src: "/framer/uxvwvsfKQ2SZYhANNoxqP3ViM6A.png",
    width: 1356,
    height: 669,
    z: 2,
    opacity: "opacity-90",
    inset: "61px -84.1562px 112.719px 154.156px",
    insetPhone: "45px -94.8281px 133.656px 135.828px",
    transform: "matrix3d(1,-0.286745,0,0,0,1,0,0,0.1075,0,1,-0.000833333,-129,0,0,1)",
    transformPhone: "matrix3d(1,-0.286745,0,0,0,1,0,0,0.103333,0,1,-0.000833333,-124,0,0,1)",
  },
  {
    src: "/framer/t11isymZGiPJfQ71FnwJujA5vg.png",
    width: 1356,
    height: 801,
    z: 3,
    opacity: "opacity-90",
    inset: "159.516px -107.109px -10.9062px 177.109px",
    insetPhone: "144.469px -115.047px 10.0469px 156.047px",
    transform: "matrix3d(1,-0.286745,0,0,0,1,0,0,0.1075,0.0634961,1,-0.000833333,-129,-76.1953,0,1)",
    transformPhone: "matrix3d(1,-0.286745,0,0,0,1,0,0,0.103333,0.0610352,1,-0.000833333,-124,-73.2422,0,1)",
  },
  {
    src: "/framer/DdfJ4rQi7H59t1uBbGFNz3tLUqM.png",
    width: 1356,
    height: 801,
    z: 4,
    inset: "111.609px 0px 37px 70px",
    insetPhone: "115.516px -13px 39px 54px",
    transform: SKEW,
    transformPhone: SKEW,
  },
];

/**
 * "See everything" mockup (Framer "Skewed Images"): four analytics screenshots skewed in 3D and stacked,
 * scaled 1.1, faded towards the bottom-left by the frame mask. Phone uses the narrower Framer "Mobile" layout.
 */
export function SkewedImages() {
  return (
    <div className="w-full [mask-image:linear-gradient(335deg,rgba(0,0,0,0)_16%,#000_68%)]">
      <div className="flex h-[376px] w-full items-center justify-center overflow-hidden px-6 pt-6 pb-4 md:items-end">
        <div className="relative h-[301px] w-[289px] shrink-0 scale-110 md:w-[328px]">
          {SKEWED.map((img) => (
            <div
              key={img.src}
              className={`absolute [inset:var(--inset)] [transform:var(--tf)] md:[inset:var(--inset-md)] md:[transform:var(--tf-md)] ${img.opacity ?? ""}`}
              style={
                {
                  zIndex: img.z,
                  "--inset": img.insetPhone,
                  "--tf": img.transformPhone,
                  "--inset-md": img.inset,
                  "--tf-md": img.transform,
                } as React.CSSProperties
              }
            >
              <Image src={img.src} width={img.width} height={img.height} alt="" sizes="284px" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type Lead = { avatar: string; handle: string; status: string };

const LEADS: Lead[] = [
  { avatar: "/framer/3JBNMu5nBmZVPJiH1BX39OHaPs.png", handle: "@sarah.runs", status: "No click - 3 days ago" },
  { avatar: "/framer/9GJIK5zXbtZCFJzjtLCXh2Z5mw.png", handle: "@jake.martinez", status: "No click — 5 days ago" },
  { avatar: "/framer/blhJ9OpBAIGoKrSqHfspb02EZE.png", handle: "@dean.prime", status: "No click — 1 day ago" },
  { avatar: "/framer/6745Ev918gG4rl4ajC4euOjYo4.png", handle: "@thomas.bryan", status: "No click - 2 days ago" },
  { avatar: "/framer/HzTCv76VFjStLQcsNxbdIK8YWR8.png", handle: "@james.scott", status: "No click - 4 days ago" },
];

/** "Leads - Filtered by behavior" card (Framer "Card", 502x324). */
export function LeadsFilteredCard() {
  return (
    <div className="relative flex w-full max-w-[502px] flex-col rounded-[16px] bg-white after:pointer-events-none after:absolute after:inset-0 after:rounded-[16px] after:border after:border-gray-150">
      <div className="flex w-full flex-col gap-1 p-5">
        <p className="w-full text-[16px] leading-[16.8px] font-medium tracking-[-0.2px] text-black">Leads - Filtered by behavior</p>
        <p className="w-full text-[13px] leading-[19.5px] font-normal tracking-[-0.2px] text-[#878787]">Showing 23 leads matching filters</p>
      </div>
      <div className="flex w-full flex-col gap-2 px-2 pb-3">
        {LEADS.map((lead) => (
          <div key={lead.handle} className="flex h-10 w-full items-center justify-between gap-2 overflow-hidden rounded-[10px] bg-[#f7f7f7] px-3 py-2.5">
            <div className="flex items-center gap-2">
              <span className="relative size-5 shrink-0 overflow-hidden rounded-full">
                <Image src={lead.avatar} width={80} height={80} alt="" sizes="20px" className="size-full object-cover" />
              </span>
              <p className="text-[14px] leading-[14.7px] font-normal tracking-[-0.2px] whitespace-pre text-black">{lead.handle}</p>
            </div>
            <p className="text-right text-[13px] leading-[19.5px] font-normal tracking-[-0.2px] whitespace-pre text-[rgba(169,169,169,0.8)]">{lead.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const EVENTS: [string, string][] = [
  ["Received Free Training from @jessica via DM", "Apr 8, 2:15 PM — moch.me/free-training"],
  ["Clicked link — 4 min latency", "Apr 8, 2:19 PM — Mobile, Netherlands"],
  ["Pixel: Watched 80% of training video", "Apr 8, 2:34 PM — yoursite.com/training"],
];

/**
 * "Track beyond the DM" mockup (Framer "Card", 502x494, clipped to its 376px frame): grey card with the
 * lead's tracking journey timeline and the black pixel snippet block floating over it.
 */
export function JourneyCard() {
  return (
    <div className="relative h-[494px] w-full max-w-[502px] overflow-visible rounded-[20px] bg-[#f5f5f5]">
      <div className="absolute inset-x-3 top-7 -bottom-3 md:inset-x-auto md:left-1/2 md:w-[382px] md:-translate-x-1/2">
        <div className="absolute top-[57px] left-[31px] h-[406px] w-[17px]">
          <TimelineLineIcon />
        </div>
        <div className="absolute top-[58px] left-[31px] h-[141px] w-[17px]">
          <TimelineLineActiveIcon />
        </div>
        <div className="absolute inset-x-0 top-0 flex h-16 items-center gap-3 overflow-hidden rounded-[12px] bg-white p-3.5 shadow-[0_2px_4px_0_rgba(3,7,18,0.04),0_0_0_1px_rgba(3,7,18,0.08)]">
          <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e1ecfd] p-[9px]">
            <span className="relative size-[18px]">
              <StarsIcon className="absolute top-0 left-0 size-4" />
            </span>
          </span>
          <div className="flex flex-1 flex-col items-start gap-1">
            <p className="w-full text-[14px] leading-4 font-semibold tracking-[-0.4px] text-[#0d0d12]">@jake.martinez</p>
            <p className="w-full text-[12px] leading-4 font-normal tracking-[-0.4px] text-[#666d80]">Full Tracking Journey</p>
          </div>
        </div>
        <div className="absolute inset-x-[30px] top-[94px] flex flex-col items-start gap-6">
          {EVENTS.map(([title, meta]) => (
            <div key={title} className="flex w-full items-start pl-[34px]">
              <div className="flex flex-1 flex-col items-start gap-0.5">
                <p className="w-full text-[12px] leading-4 font-medium tracking-[-0.4px] text-[#0d0d12]">{title}</p>
                <p className="w-full text-[12px] leading-4 font-normal tracking-[-0.4px] text-[#666d80]">{meta}</p>
              </div>
            </div>
          ))}
          <div className="flex w-full items-start pl-[34px]">
            <div className="flex flex-col items-start gap-1.5">
              <span className={`h-1.5 w-20 rounded-[24px] ${skeletonGradient}`} />
              <span className="h-1.5 w-[220px] max-w-full rounded-[24px] bg-[#efefef]" />
            </div>
          </div>
          <div className="flex w-full items-start pl-[34px]">
            <div className="flex flex-1 flex-col items-start gap-0.5">
              <p className="w-full text-[12px] leading-4 font-medium tracking-[-0.4px] text-[#0d0d12]">Pixel: Purchase completed — $4,997</p>
              <p className="w-full text-[12px] leading-4 font-normal tracking-[-0.4px] text-[#666d80]">Apr 8, 2:43 PM — Attributed to @jessica</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-3 top-[162px] z-[2] flex flex-col items-center gap-1.5 rounded-[12px] bg-black p-2 shadow-[0_4px_32px_0_rgba(0,0,0,0.12),0_1px_20px_0_rgba(0,0,0,0.04)] after:pointer-events-none after:absolute after:inset-0 after:rounded-[12px] after:border after:border-[#d1d1d1] md:inset-x-auto md:top-[171px] md:left-1/2 md:w-[427px] md:-translate-x-1/2 md:gap-2">
        <div className="flex w-full items-center gap-4 p-2">
          <p className="w-full font-mono text-[11px] leading-5 font-normal whitespace-pre-wrap text-white/47 md:text-[12px]">
            {"<"}
            <span className="text-white">script</span> <span className="text-white">src</span>
            {'="https://mochi.link/p.js" '}
            <span className="text-white">data id</span>
            {'="coach_abc123"></'}
            <span className="text-white">script</span>
            {">"}
          </p>
        </div>
        <div className="flex h-8 w-full items-center justify-center gap-1 overflow-hidden rounded-[8px] bg-white p-2">
          <span className="relative size-4 shrink-0 overflow-hidden rounded-[2px]">
            <SquareStackMicroIcon className="absolute inset-0.5" />
          </span>
          <span className="px-0.5 text-center text-[13px] leading-[13.65px] font-medium tracking-[-0.2px] whitespace-pre text-black">Copy Code</span>
        </div>
      </div>
    </div>
  );
}

/** "Ask Claude about your links" chat mockup (Framer "Card", 502x267). */
export function ClaudeChatCard() {
  return (
    <div className="relative flex w-full max-w-[502px] flex-col items-end gap-5 overflow-hidden rounded-[16px] p-4 after:pointer-events-none after:absolute after:inset-0 after:rounded-[16px] after:border after:border-gray-150">
      <div className="flex w-full flex-col items-end gap-3">
        <div className="flex w-[387px] max-w-full items-center rounded-[12px] bg-[#f7f7f7] p-4">
          <p className="w-full font-dm text-[14px] leading-5 font-medium tracking-[-0.5px] text-[#a2a2a2]">
            Which setter&apos;s links are getting clicked the most this week? And show me any leads who got the booking link but didn&apos;t click.
          </p>
        </div>
        <p className="text-right text-[13px] leading-[13px] font-normal tracking-[-0.2px] whitespace-pre text-gray-500">10:26 AM</p>
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        <div className="flex w-[387px] max-w-full items-center rounded-[12px] bg-[#f7f7f7] p-4">
          <p className="w-full font-dm text-[14px] leading-5 font-medium tracking-[-0.5px] text-[#a2a2a2]">
            This week, <span className="text-[#484848]">@jessica</span> leads with a 79.9% click rate across 312 sends. <span className="text-[#484848]">@marcus</span> is at 74.8% and{" "}
            <span className="text-[#484848]">@devon</span> at 70.2%.
          </p>
        </div>
        <div className="flex flex-col items-start gap-1.5">
          <span className="h-1.5 w-[227px] max-w-full rounded-[24px] bg-[#efefef]" />
          <span className={`h-1.5 w-20 rounded-[24px] ${skeletonGradient}`} />
        </div>
      </div>
    </div>
  );
}
