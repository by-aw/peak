"use client";

import { useEffect, useRef, useState } from "react";
import type { LegalHeading } from "@/lib/legal";

/** Height of Framer's sticky nav: the TOC component's `scrollOffset` (default 96). */
const OFFSET = 96;

/**
 * Port of Framer's "Table of contents" code component (variant "Headings (Blog)"), which lists every heading
 * of `#blog-content`: each row is a 1.2px marker bar (black when active) beside a 16px Inter label in a 10px-radius
 * chip (50% opacity, 75% on hover, 100% on a #fafafa chip when active). Clicking a row smooth-scrolls its heading to
 * 112px below the top of the screen (offset + 16); the active row follows the topmost heading inside the band between
 * 96px from the top and the middle of the screen (an IntersectionObserver, ignored for 800ms after a click).
 * Deviations: the list is rendered on the server (live ships "No headings found" and only fills in after
 * hydration); it scrolls inside the sticky box and keeps the active row in view (live lets it run off the bottom of
 * the screen, unreachable); and jumping back to the top of the page re-activates the first row (live keeps the last one).
 */
export function LegalToc({ headings }: { headings: LegalHeading[] }) {
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLAnchorElement | null)[]>([]);
  const locked = useRef(false);
  const unlock = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (locked.current) return;
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!hit) return;
        const index = headings.findIndex((h) => h.id === hit.target.id);
        if (index !== -1) setActive(index);
      },
      { rootMargin: `-${OFFSET}px 0px -50% 0px`, threshold: 0 },
    );
    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  // The observer only fires when a heading crosses its band, so a jump back to the top of the page (Home key, logo
  // link) would leave the last active row highlighted: with the first heading still below the band, the first row is active.
  useEffect(() => {
    const first = headings[0] && document.getElementById(headings[0].id);
    if (!first) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!locked.current && first.getBoundingClientRect().top > window.innerHeight / 2) setActive(0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [headings]);

  useEffect(() => () => clearTimeout(unlock.current), []);

  // Keep the active row inside the list's own scroll area.
  useEffect(() => {
    const list = scroller.current;
    const row = rows.current[active];
    if (!list || !row) return;
    const top = row.offsetTop;
    const bottom = top + row.offsetHeight;
    if (top < list.scrollTop) list.scrollTo({ top: Math.max(0, top - 8), behavior: "smooth" });
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTo({ top: bottom - list.clientHeight + 8, behavior: "smooth" });
  }, [active]);

  const go = (event: React.MouseEvent, id: string, index: number) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    setActive(index);
    locked.current = true;
    clearTimeout(unlock.current);
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - OFFSET - 16, behavior: "smooth" });
    unlock.current = setTimeout(() => (locked.current = false), 800);
  };

  return (
    <div
      ref={scroller}
      className="relative min-h-0 w-full overflow-y-auto overscroll-contain [scrollbar-color:#d1d1d1_transparent] [scrollbar-width:thin]"
    >
      <nav aria-label="Table of contents" className="flex w-full flex-col">
        {headings.map(({ id, text }, i) => {
          const isActive = i === active;
          return (
            <a
              key={id}
              ref={(el) => {
                rows.current[i] = el;
              }}
              href={`#${id}`}
              onClick={(e) => go(e, id, i)}
              aria-current={isActive ? "location" : undefined}
              className="group flex w-full cursor-pointer items-stretch py-1"
            >
              <span className="flex py-1">
                <span className={`w-[1.2px] rounded-[2px] ${isActive ? "bg-black" : "bg-transparent"}`} />
              </span>
              <span
                className={`ml-2 flex flex-1 items-center rounded-[10px] px-3 py-2 transition-[opacity,background-color] duration-200 ease-[ease] ${
                  isActive ? "bg-gray-25 opacity-100" : "opacity-50 group-hover:opacity-75"
                }`}
              >
                <span className="block w-full overflow-hidden font-sans text-[16px] leading-[1.3em] font-normal tracking-normal text-ellipsis text-black">{text}</span>
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
