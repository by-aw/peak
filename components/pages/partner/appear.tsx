"use client";

import { animate, inView } from "motion/react";
import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

/** Per-breakpoint override of an appear effect (Framer's variant overrides). */
type Override = { x?: number; y?: number; delay?: number };

type AppearProps = ComponentPropsWithoutRef<"div"> & {
  /** Horizontal offset in px the element travels from. */
  x?: number;
  /** Vertical offset in px the element travels from. */
  y?: number;
  /** Seconds before the spring starts. */
  delay?: number;
  /** Values for the Framer tablet breakpoint (810-1199px). */
  tablet?: Override;
  /** Values for the Framer phone breakpoint (<= 809px). */
  phone?: Override;
};

/**
 * Framer "appear" / scroll-into-view effect of the /partner page: opacity 0 -> 1 and a slide from (x, y) to 0 with
 * the spring 150 / 30 / 1, played once as soon as any part of the element enters the viewport (threshold 0). Unlike the
 * shared `Reveal`, the offset and delay can differ per Framer breakpoint (the live page slides the hero in from the left
 * on tablet/desktop but from below on phones, staggers the four "Recommend" lists by 0.1-0.3s only on tablet/desktop, ...),
 * and the start state is applied by CSS (`opacity-0`), so the server markup is correct at every breakpoint and nothing
 * flashes before hydration.
 */
export function Appear({ x = 0, y = 64, delay = 0, tablet, phone, className = "", children, ...rest }: AppearProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      return;
    }
    const isPhone = window.matchMedia("(max-width: 809.98px)").matches;
    const isTablet = !isPhone && window.matchMedia("(max-width: 1199.98px)").matches;
    const cfg = { x, y, delay, ...(isPhone ? phone : isTablet ? tablet : undefined) };
    const stop = inView(
      el,
      () => {
        stop();
        animate(
          el,
          { opacity: [0, 1], x: [cfg.x, 0], y: [cfg.y, 0] },
          { type: "spring", stiffness: 150, damping: 30, mass: 1, delay: cfg.delay },
        );
      },
      { amount: "some" },
    );
    return stop;
    // The offsets are constants of the call site; the effect only needs to run on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={`opacity-0 ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}
