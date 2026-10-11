import { interFeatures } from "@/components/shared/inter-features";
import type { LegalEntry } from "@/lib/legal";
import { Entrance } from "./entrance";
import { LegalBody, LegalIntro } from "./rich-text";
import { LegalToc } from "./toc";

/**
 * Framer "Content Section" of the Legal CMS template: a 1200px row (it fades in 32px from below on load) holding the
 * sticky table of contents (desktop only) beside the article column.
 *
 * Framer measurements (phone / tablet / desktop):
 * - wrapper padding 48/20, 64/48, 40/100 + 80 bottom
 * - article column: 40/48/48px between title block, intro, rule and body; padding 0, 0/24/48, 96/80/48
 * - body column: up to 764px (720 inside the desktop padding), centred
 * - TOC column (desktop): up to 320px, 24px side padding, 96px above; the 288px box sticks 96px from the top
 */
export function LegalDocument({ entry }: { entry: LegalEntry }) {
  return (
    <section className="relative flex w-full flex-col items-center">
      <div className="flex w-full flex-col items-center overflow-clip px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:pt-10 lg:pb-20">
        <Entrance className="flex w-full max-w-[1200px] flex-row items-start justify-center overflow-clip">
          <aside className="hidden w-px max-w-[320px] flex-[1_0_0] flex-col items-center justify-start self-stretch overflow-clip px-6 pt-24 pb-12 lg:flex">
            <div className="sticky top-24 z-[1] flex max-h-[calc(100dvh-120px)] w-[288px] flex-col items-center gap-4">
              <div className="flex w-full shrink-0 items-center gap-[10px] rounded-[10px] bg-purple-600 p-4">
                <p className={`flex-1 text-[16px] leading-[145%] font-medium tracking-[-0.01em] text-white ${interFeatures}`}>Table of contents</p>
              </div>
              <LegalToc headings={entry.headings} />
            </div>
          </aside>
          <article className="flex w-px flex-[1_0_0] flex-col items-center gap-10 overflow-hidden md:gap-12 md:px-6 md:pb-12 lg:px-20 lg:pt-24">
            <header className="flex w-full flex-col items-start gap-6">
              <h2 className={`w-full text-left font-display text-[32px] leading-[100%] font-semibold text-ink-3 md:text-[40px] lg:text-[48px] ${interFeatures}`}>{entry.title}</h2>
              <div className={`flex w-full flex-wrap items-center gap-4 text-gray-550 ${interFeatures}`}>
                <p className="text-[15px] leading-[145%] font-medium tracking-[-0.01em] whitespace-pre md:text-[16px]">
                  <time dateTime={entry.effectiveDate}>Effective Date: {entry.effectiveDateText}</time>
                </p>
                <p aria-hidden className="text-[16px] leading-6 font-semibold whitespace-pre">
                  •
                </p>
                <p className="text-[15px] leading-[145%] font-medium tracking-[-0.01em] whitespace-pre md:text-[16px]">
                  <time dateTime={entry.lastUpdated}>Last Updated: {entry.lastUpdatedText}</time>
                </p>
              </div>
            </header>
            <LegalIntro html={entry.intro} />
            <hr className="m-0 h-px w-full border-0 bg-[rgba(169,169,169,0.5)]" />
            <div className="w-full max-w-[764px]">
              <LegalBody html={entry.body} />
            </div>
          </article>
        </Entrance>
      </div>
    </section>
  );
}
