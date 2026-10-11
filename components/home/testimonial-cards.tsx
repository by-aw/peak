"use client";

import Image from "next/image";
import { animate, motion, useMotionValue, type MotionValue } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { collisionsFor } from "@/lib/collision";
import {
  HOVER_SCALE,
  IMG,
  cardHeight,
  cardStyle,
  collageBoxes,
  collageRules,
  type CollageCard as CardData,
  type CollageLayout,
} from "@/components/home/testimonial-layout";

type Offset = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  /** The last spot this card was accepted at. Only ever a clear one. */
  home: { x: number; y: number };
};

const SNAP_BACK = { type: "spring", stiffness: 400, damping: 32 } as const;

/**
 * Framer "Testimonial Section" collage (desktop/tablet): screenshot cards scattered around the
 * heading, inside a design frame that scales as one piece, so nothing drifts into anything else
 * at any width. See testimonial-layout.ts for the geometry and the rules it is held to.
 *
 * Cards stay draggable. A card dropped onto another card, the heading or off the frame springs
 * back to the last spot it was accepted at, so the layout can't be left in a colliding state.
 */
export function Collage({ layout, children }: { layout: CollageLayout; children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const offsets = useRef<Offset[]>([]);

  // Drag offsets are pixels. When the frame resizes, scale them with it so a dropped card keeps
  // its place relative to everything else (which is what keeps it clear).
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let width = frame.clientWidth;
    const observer = new ResizeObserver(() => {
      const next = frame.clientWidth;
      if (!width || next === width) return;
      const ratio = next / width;
      width = next;
      for (const o of offsets.current) {
        o.x.set(o.x.get() * ratio);
        o.y.set(o.y.get() * ratio);
        o.home.x *= ratio;
        o.home.y *= ratio;
      }
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const register = useCallback((index: number, offset: Offset) => {
    offsets.current[index] = offset;
  }, []);

  const dropIsClear = useCallback(
    (index: number) => {
      const frame = frameRef.current;
      if (!frame) return true;
      const toFrame = layout.width / frame.clientWidth;
      const boxes = collageBoxes(
        layout,
        layout.cards.map((_, i) => {
          const o = offsets.current[i];
          return o ? [o.x.get() * toFrame, o.y.get() * toFrame] : [0, 0];
        }),
      );
      return collisionsFor(index, boxes, collageRules(layout)).length === 0;
    },
    [layout],
  );

  return (
    <div
      ref={frameRef}
      className="@container relative w-full"
      style={{ aspectRatio: `${layout.width} / ${layout.height}` }}
    >
      {layout.cards.map((card, i) => (
        <CollageCard key={card.img} layout={layout} card={card} index={i} register={register} dropIsClear={dropIsClear} />
      ))}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 [&_a]:pointer-events-auto"
        // Scale the heading with the frame: tan(atan2(a, b)) is a / b as a plain number, the
        // CSS-only way to divide two lengths. 100cqw is the frame's rendered width.
        style={{ scale: `tan(atan2(100cqw, ${layout.width}px))` }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Framer testimonial screenshot card.
 * Live behaviour: cursor grab, draggable (stays where dropped if the spot is clear, else springs back),
 * hover -> scale 1.05 + shadow 4px 4px 16px rgba(0,0,0,.1) (~200ms),
 * while dragging -> scale 1.1 and +3deg tilt, lifted above the other cards.
 */
function CollageCard({
  layout,
  card,
  index,
  register,
  dropIsClear,
}: {
  layout: CollageLayout;
  card: CardData;
  index: number;
  register: (index: number, offset: Offset) => void;
  dropIsClear: (index: number) => boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Not captured in onDragStart: motion fires that a frame after the first move is applied, so
  // it would record a spot the card had already left.
  const home = useRef({ x: 0, y: 0 });
  // Grabbed again before the last release settled: that release's check no longer applies.
  const held = useRef(false);
  const [dragging, setDragging] = useState(false);
  const { src, iw, ih } = IMG[card.img];
  const style = cardStyle(layout, card);

  useEffect(() => {
    register(index, { x, y, home: home.current });
  }, [register, index, x, y]);

  const img = (
    <Image
      src={src}
      alt=""
      width={iw}
      height={ih}
      sizes="600px"
      draggable={false}
      // The box already has the screenshot's aspect ratio; cover is only a guard against
      // sub-pixel rounding, never a crop.
      className="pointer-events-none h-full w-full object-cover select-none"
      style={{ borderRadius: style.borderRadius }}
    />
  );

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
      style={{ ...style, x, y, rotate: card.rotate, zIndex: dragging ? 20 : 6 }}
      drag
      dragMomentum={false}
      onDragStart={() => {
        held.current = true;
        setDragging(true);
      }}
      onDragEnd={() => {
        held.current = false;
        setDragging(false);
      }}
      // Checked here rather than in onDragEnd: on release motion starts its own (zero-velocity)
      // inertia animation on x/y, which would cancel a snap-back started any earlier.
      onDragTransitionEnd={() => {
        console.log("[tc-debug] transitionEnd", index, held.current, x.get(), y.get(), dropIsClear(index), JSON.stringify(home.current));
        if (held.current) return;
        if (dropIsClear(index)) {
          home.current.x = x.get();
          home.current.y = y.get();
          return;
        }
        animate(x, home.current.x, SNAP_BACK);
        animate(y, home.current.y, SNAP_BACK);
        setTimeout(() => console.log("[tc-debug] after snap", index, x.get(), y.get(), x.isAnimating()), 2500);
      }}
      initial={{ scale: 1, boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)" }}
      whileHover={{ scale: HOVER_SCALE, boxShadow: "4px 4px 16px 0px rgba(0,0,0,0.1)" }}
      whileDrag={{ scale: 1.1, rotate: card.rotate + 3, boxShadow: "4px 4px 16px 0px rgba(0,0,0,0.1)" }}
      transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
    >
      {card.strip ? (
        <div className="relative h-full w-full bg-white" style={{ borderRadius: style.borderRadius }}>
          <div
            className="absolute inset-x-0 top-0 overflow-hidden"
            style={{ bottom: `${((card.strip / cardHeight(card)) * 100).toFixed(4)}%`, borderRadius: style.borderRadius }}
          >
            {img}
          </div>
        </div>
      ) : (
        <div className="h-full w-full overflow-hidden" style={{ borderRadius: style.borderRadius }}>
          {img}
        </div>
      )}
    </motion.div>
  );
}

export type TickerItem = { src: string; w: number; h: number; iw: number; ih: number; radius: number };

/**
 * Framer "Ticker" used by the phone variant: a row of screenshot cards scrolling left at ~30px/s,
 * gap 16px, looping seamlessly (content duplicated once).
 *
 * The row is as tall as its tallest card, so no card can hang into the row below.
 */
export function TestimonialTicker({ items, offset = 0 }: { items: TickerItem[]; offset?: number }) {
  const gap = 16;
  const height = Math.max(...items.map((it) => it.h));
  const loop = items.reduce((s, it) => s + it.w, 0) + gap * items.length;
  const duration = loop / 30;
  return (
    <div className="relative w-full overflow-visible" style={{ height }}>
      <motion.ul
        className="absolute top-0 left-0 m-0 flex h-full list-none items-center p-0"
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
