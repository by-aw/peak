"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Framer testimonial screenshot card (desktop/tablet collage).
 * Live behaviour: cursor grab, draggable anywhere (stays where dropped),
 * hover -> scale 1.05 + shadow 4px 4px 16px rgba(0,0,0,.1) (~200ms),
 * while dragging -> scale 1.1 and +3deg tilt.
 */
export function DraggableCard({
  inset,
  radius,
  rotate = 0,
  x = 0,
  y = 0,
  zIndex = 6,
  className = "",
  children,
}: {
  /** top right bottom left in px (Framer pins), relative to the collage container. */
  inset: [number, number, number, number];
  radius: number;
  rotate?: number;
  x?: number;
  y?: number;
  zIndex?: number;
  className?: string;
  children: ReactNode;
}) {
  const style: CSSProperties = {
    top: inset[0],
    right: inset[1],
    bottom: inset[2],
    left: inset[3],
    borderRadius: radius,
    zIndex,
  };
  return (
    <motion.div
      className={`absolute cursor-grab active:cursor-grabbing ${className}`.trim()}
      style={{ ...style, x, y, rotate }}
      drag
      dragMomentum={false}
      initial={{ scale: 1, boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)" }}
      whileHover={{ scale: 1.05, boxShadow: "4px 4px 16px 0px rgba(0,0,0,0.1)" }}
      whileDrag={{ scale: 1.1, rotate: rotate + 3, boxShadow: "4px 4px 16px 0px rgba(0,0,0,0.1)" }}
      transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export type TickerItem = { src: string; w: number; h: number; iw: number; ih: number; radius: number };

/**
 * Framer "Ticker" used by the phone variant: a row of screenshot cards scrolling left at ~30px/s,
 * gap 16px, looping seamlessly (content duplicated once).
 */
export function TestimonialTicker({ items, height, offset = 0 }: { items: TickerItem[]; height: number; offset?: number }) {
  const gap = 16;
  const loop = items.reduce((s, it) => s + it.w, 0) + gap * items.length;
  const duration = loop / 30;
  return (
    <div className="relative w-full overflow-visible" style={{ height }}>
      <motion.ul
        className="absolute top-0 left-0 m-0 flex list-none items-start p-0"
        style={{ gap, willChange: "transform" }}
        initial={{ x: offset }}
        animate={{ x: offset - loop }}
        transition={{ duration, ease: "linear", repeat: Infinity, repeatType: "loop" }}
      >
        {[0, 1].map((copy) =>
          items.map((it, i) => (
            <li
              key={`${copy}-${i}`}
              aria-hidden={copy === 1 || undefined}
              className="relative shrink-0 overflow-hidden"
              style={{ width: it.w, height: it.h, borderRadius: it.radius }}
            >
              <Image src={it.src} alt="" width={it.iw} height={it.ih} sizes="480px" className="h-full w-full object-cover" draggable={false} />
            </li>
          )),
        )}
      </motion.ul>
    </div>
  );
}
