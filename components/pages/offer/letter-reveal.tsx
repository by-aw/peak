"use client";

import { Fragment, useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

const HIDDEN = { opacity: 0.001, filter: "blur(10px)", transform: "translateY(10px)" };

/** Framer splits a word into per-letter boxes; words longer than this may break between letters (`white-space: unset`). */
const LONG_WORD = 12;

/**
 * Framer text effect "appear" on the /features/offer description: the text is split into per-letter inline-blocks
 * (grouped per word in a `white-space: nowrap` box, like Framer's SSR) that start at opacity 0.001 / blur(10px) /
 * y 10. Tokenization is "line": once the paragraph is in view, the letters are grouped into rendered lines and each
 * line goes to rest with a spring (bounce 0, 0.8s), line n starting 0.15s * n after the first. `lines` holds one
 * entry per forced line break (the phone copy has one after "system is.").
 */
export function LetterReveal({ lines, className }: { lines: string[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    const letters = [...el.querySelectorAll<HTMLElement>("[data-letter]")];
    const rows: HTMLElement[][] = [];
    let top: number | null = null;
    for (const letter of letters) {
      if (top === null || letter.offsetTop !== top) rows.push([letter]);
      else rows[rows.length - 1].push(letter);
      top = letter.offsetTop;
    }
    const rest = () => {
      for (const l of letters) {
        l.style.opacity = "1";
        l.style.filter = "";
        l.style.transform = "";
      }
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rest();
      return;
    }
    const controls = rows.map((row, i) =>
      animate(row, { opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }, { type: "spring", bounce: 0, duration: 0.8, delay: i * 0.15 }),
    );
    // Once settled, drop the no-op filter / transform so the letters stop being composited layers (a frame later:
    // motion writes the last keyframe right after `finished` resolves).
    let frame = 0;
    Promise.all(controls.map((c) => c.finished)).then(() => {
      frame = requestAnimationFrame(() => requestAnimationFrame(rest));
    }, () => {});
    return () => {
      cancelAnimationFrame(frame);
      controls.forEach((c) => c.stop());
    };
  }, [inView]);

  return (
    <p ref={ref} className={className}>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line.split(" ").map((word, wi, words) => (
            <Fragment key={wi}>
              <span className={word.length > LONG_WORD ? "whitespace-[unset]" : "whitespace-nowrap"}>
                {Array.from(word).map((char, ci) => (
                  <span key={ci} data-letter className="inline-block" style={HIDDEN}>
                    {char}
                  </span>
                ))}
              </span>
              {wi < words.length - 1 && " "}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </p>
  );
}
