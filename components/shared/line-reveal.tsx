"use client";

import { Fragment, useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

const HIDDEN = { opacity: 0.001, filter: "blur(10px)", transform: "translateY(10px)" };

/**
 * Framer text effect "appear", tokenization "line" (used on the /demo funnel form descriptions and the /dm-audit
 * hero subline): once the text is in view, its words are grouped into rendered lines and each line goes from
 * blur(10px) / opacity 0 / y 10 to rest with a spring (bounce 0, 0.8s), line n starting 0.15s * n after the first.
 * `\n` in `text` becomes a `<br>`.
 */
export function LineReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    const lines: HTMLElement[][] = [];
    let top: number | null = null;
    for (const word of el.querySelectorAll<HTMLElement>("[data-word]")) {
      if (top === null || word.offsetTop !== top) lines.push([word]);
      else lines[lines.length - 1].push(word);
      top = word.offsetTop;
    }
    const controls = lines.map((line, i) =>
      animate(line, { opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }, { type: "spring", bounce: 0, duration: 0.8, delay: i * 0.15 }),
    );
    return () => controls.forEach((c) => c.stop());
  }, [inView]);

  return (
    <p ref={ref} className={className}>
      {text.split("\n").map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line.split(" ").map((word, wi, words) => (
            <Fragment key={wi}>
              <span data-word className="inline-block" style={HIDDEN}>
                {word}
              </span>
              {wi < words.length - 1 && " "}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </p>
  );
}
