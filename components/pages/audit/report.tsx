import Image from "next/image";
import { interFeatures } from "@/components/shared/inter-features";
import { interVariable } from "@/components/pages/legal/fonts";
import type { AuditFile } from "@/lib/audit";
import { KpiGrid, type AuditKpi } from "./kpi-grid";
import styles from "./rich-text.module.css";
import { interVariable450 } from "./text";
import { AuditToc } from "./toc";

/** Dates as Framer renders them (en-US, UTC): "November 25", "October 6" / "Oct 6", "October 15, 2025" / "Oct 15, 2025". */
function formatDate(iso: string, month: "long" | "short", year: boolean) {
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month, day: "numeric", ...(year ? { year: "numeric" } : {}) }).format(new Date(`${iso}T00:00:00Z`));
}

/** Template copy (not CMS fields): the pros / cons chips and the archetype names beside the CMS percentages. */
const PROS = { emoji: "😊", label: "Friendly" };
const CONS = { emoji: "⬇️", label: "Momentum Weakens" };
const ARCHETYPES = [
  { emoji: "🧭", name: "The Curious Explorer", key: "archetype1" },
  { emoji: "💸", name: "The Low-Capital Dreamer", key: "archetype2" },
  { emoji: "🧐", name: "The Pragmatic Professional", key: "archetype3" },
  { emoji: "🧑‍💻", name: "The Operator", key: "archetype4" },
] as const;

const chip = "flex shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full bg-white p-2 shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_rgba(0,0,0,0.05)]";
const chipEmoji = "font-sans text-[14px] leading-[14px] font-medium tracking-[-0.2px] whitespace-nowrap text-black";
const chipText = `text-[14px] leading-[14px] tracking-[-0.3px] whitespace-nowrap ${interVariable450}`;
const dateText = `text-[14px] leading-[20px] whitespace-pre text-gray-550 ${interVariable450}`;

function Rich({ html, className = "" }: { html: string; className?: string }) {
  return <div className={`${styles.body} ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Overview / Archetypes divider: a 1px rgba(0,0,0,0.1) rule, horizontal on phone/tablet, a 65px-wide vertical column on desktop. */
function Divider({ className, inset }: { className: string; inset: string }) {
  return (
    <div aria-hidden className={`flex w-full shrink-0 items-center justify-center overflow-clip lg:w-auto lg:self-stretch lg:px-8 lg:py-0 ${inset} ${className}`}>
      <div className="h-px w-full bg-black/10 lg:h-full lg:w-px" />
    </div>
  );
}

/**
 * The Framer "Audit" CMS template ("Mochi Intelligence Report"). Framer measurements (phone / tablet / desktop):
 * - page: 58px nav allowance, then a column up to 1108px with 96px above and below; a 431px strip of the blurred
 *   screenshot (radial mask) sits behind the top-right corner
 * - hero: padding 24/16/24, 24/32/48, 24/48/48, 1px rgba(0,0,0,0.1) bottom border; 768px max column; 48px between the
 *   date line and the title block, 32px between the Clash Display title and the founder row
 * - body: the article column (48px between blocks; padding 24/16, 48/32, 48) beside the sticky "Contents" column
 *   (160px tablet / 256px desktop, 80px from the top, hidden on phone)
 * - Overview and Archetypes: title, chips, rule and body stacked on phone/tablet; on desktop the title + body column
 *   sits left of a vertical rule and the chip column (260 / 259px)
 * - Content 4-7 and Final Note: 544px columns from tablet
 * Live renders the summary, Overview and Archetypes bodies twice (one copy per breakpoint); they render once here.
 */
export function AuditReport({ entry }: { entry: AuditFile }) {
  const kpis: AuditKpi[] = [
    { label: "Total Conversations Analyzed", value: entry.totalConversations, unit: "/ 500" },
    { label: "Total Messages", value: entry.totalMessages },
    { label: "Avg Response Time", value: entry.avgResponseTime, unit: "min" },
    { label: "Messages sent", value: entry.messagesSent, unit: "min" },
    { label: "Messages recieved", value: entry.messagesReceived, unit: "/ 500" },
    { label: "Period analyzed", value: entry.periodAnalyzed },
    { label: "Key word usage", value: entry.keywordUsage, unit: "min" },
    { label: "Lead shared email", value: entry.leadSharedEmail, unit: "min" },
  ];
  const toc = [entry.sidenav1, entry.sidenav2, entry.sidenav3, entry.sidenav4, entry.sidenav5, entry.sidenav6, entry.sidenav7].map((label, i) => ({
    id: `content${i + 1}`,
    label,
  }));

  return (
    <div className={`${interVariable.variable} relative flex w-full flex-col items-center overflow-clip pt-[58px]`}>
      {/* Blurred screenshot strip behind the top-right corner */}
      <div aria-hidden className="absolute top-[58px] right-0 h-[149px] w-full max-w-[431px] overflow-clip bg-white md:h-[165px]">
        <Image
          src="/framer/YTOpJfYRjrbZo9wuq5y2BW7Ayp0.png"
          alt=""
          width={3501}
          height={762}
          sizes="1166px"
          className="absolute top-[-45px] left-[-290px] h-[253px] w-[1166px] max-w-none [mask-image:radial-gradient(38%_50%,#000_0%,transparent_76.0361%)]"
        />
      </div>

      <div className="relative flex w-full max-w-[1108px] flex-col items-start py-24">
        <header id="hero" className="flex w-full items-end px-4 shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)] pt-6 pb-6 md:px-8 md:pb-12 lg:px-12">
          <div className="flex w-full max-w-[768px] flex-col gap-12">
            <div className="flex h-5 w-full flex-wrap items-center gap-1 overflow-clip">
              <p className={dateText}>Sent:</p>
              <p className={dateText}>
                <time dateTime={entry.sentDate}>{formatDate(entry.sentDate, "long", false)}</time>
              </p>
              <p className={dateText}>{"• Period:"}</p>
              <p className={dateText}>
                <time dateTime={entry.periodFrom}>
                  <span className="md:hidden">{formatDate(entry.periodFrom, "short", false)}</span>
                  <span className="hidden md:inline">{formatDate(entry.periodFrom, "long", false)}</span>
                </time>
              </p>
              <p className={dateText}>-</p>
              <p className={dateText}>
                <time dateTime={entry.periodTo}>
                  <span className="md:hidden">{formatDate(entry.periodTo, "short", true)}</span>
                  <span className="hidden md:inline">{formatDate(entry.periodTo, "long", true)}</span>
                </time>
              </p>
            </div>
            <div className="flex w-full flex-col gap-8">
              <h1 className="w-full font-display text-[28px] leading-[42px] font-semibold tracking-[0.72px] whitespace-pre-wrap text-ink-3 md:text-[30px] md:leading-[30px] md:tracking-normal">
                {entry.title}
              </h1>
              <div className="flex w-full items-center gap-3">
                {entry.founderImage && (
                  <Image
                    src={entry.founderImage.src}
                    alt={entry.founderImage.alt}
                    width={entry.founderImage.width ?? 64}
                    height={entry.founderImage.height ?? 64}
                    sizes="32px"
                    className="size-8 shrink-0 rounded-full object-cover"
                  />
                )}
                <p className={`font-sans text-[16px] leading-6 font-normal whitespace-pre text-ink-3 ${interFeatures}`}>{entry.founderName}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex w-full items-start justify-between">
          <article className="flex min-w-0 flex-1 flex-col items-start gap-12 px-4 py-6 md:px-8 md:py-12 lg:px-12">
            <div className={`${styles.summary} md:max-w-[544px]`} dangerouslySetInnerHTML={{ __html: entry.summary }} />

            <section id="content1" className="flex w-full flex-col items-start gap-6">
              <Rich html={entry.content1} />
              <KpiGrid kpis={kpis} />
            </section>

            <section id="content2" className="flex w-full flex-col items-start gap-6 lg:flex-row lg:gap-0">
              <div className="contents lg:flex lg:min-w-0 lg:flex-1 lg:flex-col lg:gap-6">
                <Rich html={entry.content2Title} className="order-1" />
                <Rich html={entry.content2Body} className="order-4" />
              </div>
              <Divider className="order-3 lg:order-none" inset="py-2" />
              <div className="order-2 flex w-full flex-row items-start gap-6 lg:order-none lg:w-[260px] lg:shrink-0 lg:flex-col">
                <div className="flex flex-col items-start gap-4">
                  <p className="font-sans text-[12px] leading-[12px] font-semibold text-[rgba(82,82,82,0.8)]">PROS</p>
                  <div className={chip}>
                    <span className={chipEmoji}>{PROS.emoji}</span>
                    <span className={`px-0.5 text-gray-750 ${chipText}`}>{PROS.label}</span>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-4">
                  <p className="font-sans text-[12px] leading-[12px] font-semibold text-[rgba(82,82,82,0.8)]">CONS</p>
                  <div className={chip}>
                    <span className={chipEmoji}>{CONS.emoji}</span>
                    <span className={`px-0.5 text-gray-750 ${chipText}`}>{CONS.label}</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="content3" className="flex w-full flex-col items-start gap-6 lg:flex-row lg:gap-0">
              <div className="contents lg:flex lg:min-w-0 lg:flex-1 lg:flex-col lg:gap-6">
                <Rich html={entry.content3Title} className="order-1 md:max-w-[544px] lg:max-w-none" />
                <Rich html={entry.content3Body} className="order-4" />
              </div>
              <Divider className="order-2 lg:order-none" inset="px-2" />
              <div className="order-3 flex w-full flex-row flex-wrap items-start gap-6 lg:order-none lg:w-[259px] lg:shrink-0 lg:flex-col lg:flex-nowrap">
                {ARCHETYPES.map(({ emoji, name, key }) => (
                  <div key={key} className={chip}>
                    <span className={chipEmoji}>{emoji}</span>
                    <span className="flex items-center gap-2.5 px-0.5">
                      <span className={`text-gray-750 ${chipText}`}>{name}</span>
                      <span className={`text-gray-550 ${chipText}`}>{entry[key]}%</span>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section id="content4" className="w-full md:max-w-[544px]">
              <Rich html={entry.content4} />
            </section>
            <section id="content5" className="w-full md:max-w-[544px]">
              <Rich html={entry.content5} />
            </section>
            <section id="content6" className="w-full md:max-w-[544px]">
              <Rich html={entry.content6} />
            </section>
            <section id="content7" className="w-full md:max-w-[544px]">
              <Rich html={entry.content7} />
            </section>
            <section className="w-full md:max-w-[544px]">
              <Rich html={entry.finalNote} />
            </section>
          </article>

          <aside className="sticky top-20 hidden w-[160px] shrink-0 flex-col items-start gap-4 px-6 py-12 md:flex lg:w-[256px]">
            <p className="pb-3 font-sans text-[12px] leading-[12px] font-medium whitespace-pre text-gray-500">Contents</p>
            <AuditToc items={toc} />
          </aside>
        </div>
      </div>
    </div>
  );
}
