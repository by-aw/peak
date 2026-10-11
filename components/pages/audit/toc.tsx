"use client";

import { useEffect, useState } from "react";

/** The TOC sticks 80px from the top (under the fixed nav); a clicked section lands at the same height. */
const OFFSET = 80;

/**
 * Framer "Sidenav" links of the Audit template (variant "Small Active" / "Small Inactive"): Inter 600 12/12 labels, 16px
 * apart, each linking to its section. Framer switches a link to "Small Active" while its section crosses the viewport
 * (scroll target, 80px offset), but the active colour (#1d1d20) never reaches the text on live, so every link stays
 * rgba(82,82,82,0.8); here the active links do turn #1d1d20. Clicking smooth-scrolls the section to 80px from the top.
 */
export function AuditToc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setActive((prev) => {
          const next = new Set(prev);
          for (const e of entries) {
            if (e.isIntersecting) next.add(e.target.id);
            else next.delete(e.target.id);
          }
          return next;
        });
      },
      { rootMargin: `-${OFFSET}px 0px 0px 0px`, threshold: 0 },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  const go = (event: React.MouseEvent, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - OFFSET, behavior: "smooth" });
  };

  return (
    <nav aria-label="Contents" className="flex w-full flex-col gap-4">
      {items.map(({ id, label }) => {
        const isActive = active.has(id);
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => go(e, id)}
            aria-current={isActive ? "location" : undefined}
            className={`block w-full pr-2 font-sans text-[12px] leading-[12px] font-semibold transition-colors duration-200 ${
              isActive ? "text-ink-3" : "text-[rgba(82,82,82,0.8)]"
            }`}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}
