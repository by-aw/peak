"use client";

import { Fragment, useSyncExternalStore } from "react";
import { Reveal } from "@/components/ui/reveal";
import { CopyIconButton } from "./copy-icon-button";
import { PROMPT_CATEGORIES, QUICK_START_TIPS, type PromptCategory } from "./data";
import { plexMono } from "./fonts";
import { INTER_FEATURES } from "./hero";

/** Query parameter Framer's CMS filter uses for the selected category (its slug). */
const PARAM = "prompt-menu";
/** Fired after `pushState`/`replaceState` (which do not notify listeners themselves). */
const NAVIGATE_EVENT = "prompt-library:navigate";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(NAVIGATE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(NAVIGATE_EVENT, onChange);
  };
}

/** Selected category slug from the URL (null = all prompts, also for an unknown slug). */
function readActive(): string | null {
  const slug = new URLSearchParams(window.location.search).get(PARAM);
  return PROMPT_CATEGORIES.some((c) => c.slug === slug) ? slug : null;
}

const readActiveOnServer = () => null;

const hairlineThin = "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border-[0.5px] after:border-gray-150";
const cardBox = `relative flex w-[264px] min-w-[264px] flex-none flex-col items-start gap-3 overflow-hidden rounded-[12px] bg-[#f7f7f7] p-4 ${hairlineThin}`;
const cardLabel = "text-[13px] leading-[1.2] font-medium tracking-[-0.26px] text-[#525252]";

/** A prompt as written in the CMS: `[bracketed]` placeholders become code chips and the whole prompt is italic. */
function PromptText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/).filter(Boolean);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <code key={i} className={`rounded-[4px] bg-gray-100 px-[0.4em] py-[0.2em] text-ink-3 ${plexMono.className}`}>
            {part}
          </code>
        ) : (
          <em key={i} className="italic">
            {part}
          </em>
        ),
      )}
    </>
  );
}

function PromptCard({ text, index }: { text: string; index: number }) {
  return (
    <div className={cardBox}>
      <div className="flex w-full flex-none items-center justify-between overflow-clip">
        <p className="w-px flex-[1_0_0] text-[13px] leading-[1.2] whitespace-pre-wrap">
          <span className={cardLabel}>{`PROMPT ${String(index + 1).padStart(2, "0")}`}</span>
        </p>
        <CopyIconButton text={text} round={index === 0} />
      </div>
      <p className={`w-full text-[14px] leading-[1.45] font-normal tracking-[-0.01em] whitespace-pre-wrap text-[#383840] md:text-[16px] ${INTER_FEATURES}`}>
        <PromptText text={text} />
      </p>
    </div>
  );
}

function ExtraCard({ label, text }: { label: string; text: string }) {
  return (
    <div className={cardBox}>
      <p className="w-full text-[13px] leading-[1.2] whitespace-pre-wrap">
        <span className={cardLabel}>{label}</span>
      </p>
      <p className="w-full text-[14px] leading-[1.6] font-normal whitespace-pre-wrap text-black">{text}</p>
    </div>
  );
}

function CategorySection({ category }: { category: PromptCategory }) {
  return (
    <div className="flex w-full flex-none items-center justify-start gap-[10px]">
      <div className="relative flex w-px flex-[1_0_0] flex-col items-start gap-6 pb-6 after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-gray-150 md:gap-10 md:pb-8">
        <div className="flex w-full flex-none flex-col items-start gap-12">
          <div className="flex w-full flex-none flex-col items-start gap-4 md:gap-[18px]">
            <h4
              className={`w-full max-w-[564px] font-display text-[20px] leading-5 font-bold tracking-[-0.4px] whitespace-pre-wrap text-ink-3 md:text-[24px] md:leading-6 md:tracking-[-0.48px] lg:text-[32px] lg:leading-8 lg:tracking-[-0.64px] ${INTER_FEATURES}`}
            >
              {category.title}
            </h4>
            <p
              className={`w-full max-w-[620px] text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] whitespace-pre-wrap text-[rgba(82,82,82,0.8)] md:text-[16px] md:leading-6 md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px] ${INTER_FEATURES}`}
            >
              {category.description}
            </p>
          </div>
        </div>
        {/* Framer equalises the card heights with a script; `items-stretch` gives the same result. */}
        <div className="flex w-full flex-none items-start gap-5 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-min flex-none items-stretch gap-5">
            {category.prompts.map((prompt, i) => (
              <PromptCard key={i} text={prompt} index={i} />
            ))}
            {category.extra ? <ExtraCard label={category.extra.label} text={category.extra.text} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryTab({ label, active, full = false, onSelect }: { label: string; active: boolean; full?: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`flex flex-none cursor-pointer items-start gap-[10px] rounded-[12px] p-[14px] text-left text-[15px] leading-[18px] whitespace-pre ${full ? "w-full" : "w-min"} ${INTER_FEATURES} ${
        active ? "bg-purple-600 font-medium text-white" : "bg-transparent font-normal text-black hover:text-[rgba(0,0,0,0.8)]"
      }`}
    >
      {label}
    </button>
  );
}

function QuickStartTips() {
  return (
    <div className={`relative flex w-full flex-none flex-col items-start overflow-clip rounded-2xl bg-[#f7f7f7] p-5 md:p-6 ${hairlineThin}`}>
      <div className="flex w-full max-w-[632px] flex-none flex-col items-start gap-5">
        <h5 className={`w-full font-display text-[18px] leading-[21.6px] font-semibold tracking-normal whitespace-pre-wrap text-ink-3 md:text-[20px] md:leading-6 lg:text-[24px] lg:leading-[28.8px] ${INTER_FEATURES}`}>
          Quick start tips
        </h5>
        <div className="flex w-full flex-none flex-col items-start gap-4">
          {QUICK_START_TIPS.map((tip, i) => (
            <div key={tip.lead} className="flex w-full flex-none items-start gap-[14px]">
              <div className="flex aspect-square w-9 flex-none flex-col items-center justify-center overflow-hidden rounded-[10px] bg-white">
                <p className="text-[14px] leading-[21px] font-medium whitespace-pre text-black">{i + 1}</p>
              </div>
              <p className="w-px flex-[1_0_0] text-[16px] leading-6 font-medium tracking-[0px] whitespace-pre-wrap text-[#525252]">
                <span className="text-black">{tip.lead}</span>
                {tip.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Framer "Library" section: a sticky category menu (tablet and desktop only, 193/220px wide) next to the CMS list of
 * categories, each with its intro and a horizontally scrolling row of 264px prompt cards, then the "Quick start
 * tips" box. Choosing a category filters the list to it (and writes it to `?prompt-menu=<slug>`, which also works as
 * a deep link and with the back button); "All Prompts" clears the filter. Like Framer, going to or from "All
 * Prompts" pushes a history entry while switching between categories replaces it.
 */
export function PromptLibraryList() {
  const active = useSyncExternalStore(subscribe, readActive, readActiveOnServer);

  const select = (slug: string | null) => {
    if (slug === active) return;
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set(PARAM, slug);
    else url.searchParams.delete(PARAM);
    const target = `${url.pathname}${url.search}${url.hash}`;
    if (active === null || slug === null) window.history.pushState(null, "", target);
    else window.history.replaceState(null, "", target);
    window.dispatchEvent(new Event(NAVIGATE_EVENT));
  };

  const visible = active ? PROMPT_CATEGORIES.filter((c) => c.slug === active) : PROMPT_CATEGORIES;

  return (
    <section className="relative flex w-full flex-none items-center justify-center overflow-clip">
      <div className="flex w-px flex-[1_0_0] items-center justify-center overflow-clip px-5 py-12 md:px-12 md:py-16">
        <Reveal delay={0} y={64} viewport={{ once: true, amount: "some" }} className="flex w-px max-w-[1200px] flex-[1_0_0] items-start gap-12 md:gap-8 lg:gap-12">
          <div className="hidden w-px max-w-[193px] flex-[1_0_0] flex-col items-start self-stretch overflow-clip md:flex lg:max-w-[220px]">
            <div className="sticky top-[120px] z-[1] flex w-full flex-none flex-col items-start gap-[14px]">
              <div className="flex w-full flex-none flex-col items-center overflow-clip px-[14px]">
                <p className="w-full text-[12px] leading-[14.4px] font-medium whitespace-pre-wrap text-[#666] select-none">LIBRARY</p>
              </div>
              <div className="flex w-full flex-none flex-col flex-wrap items-start gap-2">
                <CategoryTab label="All Prompts" active={active === null} full onSelect={() => select(null)} />
                {PROMPT_CATEGORIES.map((c) => (
                  <CategoryTab key={c.slug} label={c.label} active={active === c.slug} onSelect={() => select(c.slug)} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-px flex-[1_0_0] flex-col items-start gap-10 overflow-clip md:gap-12 lg:gap-14">
            <div className="flex w-full flex-none flex-col items-start gap-10 md:gap-16">
              {visible.map((c) => (
                <Fragment key={c.slug}>
                  <CategorySection category={c} />
                </Fragment>
              ))}
            </div>
            <QuickStartTips />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
