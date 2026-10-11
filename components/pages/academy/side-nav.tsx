import Image from "next/image";
import Link from "next/link";
import { interFeatures } from "@/components/shared/inter-features";
import type { AcademyFile } from "@/lib/academy";
import { ChevronDown } from "./icons";

/**
 * Left column of the Framer academy template ("Academy Side Nav"): four groups, 32px apart, 320px wide at every size.
 * The first two list the CMS lessons of the "dashboard" and "inbox" modules (collection order, the open lesson
 * highlighted); their headers are static copy on live ("Module 1" / "4 lessons", "Module 2" / "3 lessons").
 * "Lead Management" and "Settings" are placeholder groups drawn in Framer, not links.
 */

const PLACEHOLDER_GROUPS: { icon: string; name: string; meta: string; rows: [string, string][] }[] = [
  {
    icon: "👥",
    name: "Lead Management",
    meta: "3 lessons • 6 min",
    rows: [
      ["Lead Pipeline Overview", "2:15"],
      ["Lead Profiles & Insights", "1:45"],
      ["Status Updates & Tracking", "1:35"],
      ["Call Booking Flow", "2:00"],
    ],
  },
  {
    icon: "⚙️",
    name: "Settings",
    meta: "3 lessons • 6 min",
    rows: [
      ["Team & Permissions", "2:15"],
      ["Integrations Setup ", "1:45"],
      ["Notification Preferences", "1:35"],
    ],
  },
];

/** 44px white tile with Framer's 1px #e7e7e7 border drawn over the content. */
function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative size-11 shrink-0 overflow-hidden rounded-[8px] bg-white after:pointer-events-none after:absolute after:inset-0 after:rounded-[8px] after:border after:border-[#e7e7e7]">
      {children}
    </div>
  );
}

function EmojiTile({ emoji }: { emoji: string }) {
  return (
    <IconTile>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20px] leading-[20px] font-medium whitespace-pre text-black">{emoji}</span>
    </IconTile>
  );
}

function GroupHeader({ icon, name, meta }: { icon: React.ReactNode; name: React.ReactNode; meta: React.ReactNode }) {
  return (
    <div className="flex w-full items-center gap-3 rounded-[12px] py-3 pl-3">
      {icon}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
        {name}
        {meta}
      </div>
      <div className="flex items-center gap-4 self-stretch px-5">
        <ChevronDown />
      </div>
    </div>
  );
}

const nameText = "text-[14px] leading-[20px] font-medium tracking-[-0.2px] whitespace-pre text-black";
const metaText = "text-[12px] leading-[16px] font-medium whitespace-pre text-gray-500";

function LessonLink({ lesson, active }: { lesson: AcademyFile; active: boolean }) {
  return (
    <Link
      href={`/academy-work-in-progress/${lesson.slug}`}
      aria-current={active ? "page" : undefined}
      className={`relative flex w-full items-center gap-1 rounded-[12px] py-2 pr-4 pl-2 after:pointer-events-none after:absolute after:inset-0 after:rounded-[12px] after:border ${
        active ? "bg-purple-50 after:border-purple-500" : "after:border-transparent"
      }`}
    >
      <span className="flex min-w-0 flex-1 items-center justify-center gap-4 px-2 py-[5px]">
        <span
          className={`w-[252px] shrink-0 text-[14px] leading-[20px] font-medium whitespace-pre-wrap [word-break:break-word] ${interFeatures} ${active ? "text-purple-500" : "text-ink-3"}`}
        >
          {lesson.title}
        </span>
      </span>
      <span className="text-[12px] leading-[12px] font-semibold whitespace-pre text-[rgba(82,82,82,0.8)]">{lesson.duration}</span>
    </Link>
  );
}

function PlaceholderRow({ title, duration }: { title: string; duration: string }) {
  return (
    <div className="flex w-full items-center gap-1 rounded-[12px] py-2 pr-4 pl-2">
      <span className="flex min-w-0 flex-1 items-center justify-center gap-4 px-2 py-[5px]">
        <span className="w-[252px] shrink-0 text-[14px] leading-[20px] font-medium tracking-[-0.2px] whitespace-pre-wrap [word-break:break-word] text-black">{title}</span>
      </span>
      <span className={metaText}>{duration}</span>
    </div>
  );
}

export function AcademySideNav({ lessons, current }: { lessons: AcademyFile[]; current: string }) {
  const dashboard = lessons.filter((l) => l.module === "dashboard");
  const inbox = lessons.filter((l) => l.module === "inbox");
  return (
    <nav aria-label="Lessons" className="flex w-[320px] shrink-0 flex-col gap-8">
      <div className="flex w-full flex-col gap-3">
        <GroupHeader
          icon={
            <IconTile>
              <Image src="/framer/oBx7lZzBl2xPcM7miEJHMPszPY.png" alt="" width={44} height={44} className="absolute inset-0 size-11 object-cover" />
            </IconTile>
          }
          name={<p className={`pr-2 text-[14px] leading-[20px] font-medium whitespace-pre text-ink-3 ${interFeatures}`}>Module 1</p>}
          meta={
            <div className="flex w-full items-center gap-1 overflow-clip">
              <p className="text-[12px] leading-[12px] font-semibold whitespace-pre text-[rgba(82,82,82,0.8)]">4</p>
              <p className={metaText}>lessons</p>
            </div>
          }
        />
        <div className="flex w-full flex-col">
          {dashboard.map((l) => (
            <LessonLink key={l.slug} lesson={l} active={l.slug === current} />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-3">
        <GroupHeader icon={<EmojiTile emoji="💬" />} name={<p className={nameText}>Module 2</p>} meta={<p className={metaText}>3 lessons</p>} />
        <div className="flex w-full flex-col">
          {inbox.map((l) => (
            <LessonLink key={l.slug} lesson={l} active={l.slug === current} />
          ))}
        </div>
      </div>
      {PLACEHOLDER_GROUPS.map((g) => (
        <div key={g.name} className="flex w-full flex-col gap-3">
          <GroupHeader icon={<EmojiTile emoji={g.icon} />} name={<p className={nameText}>{g.name}</p>} meta={<p className={metaText}>{g.meta}</p>} />
          <div className="flex w-full flex-col">
            {g.rows.map(([title, duration]) => (
              <PlaceholderRow key={title} title={title} duration={duration} />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
