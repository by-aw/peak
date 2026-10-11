"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/** Framer "Image Parallax" code component setting: the image moves ±15% of the frame height over the scroll. */
const PARALLAX_AMOUNT = 30;

/**
 * Hero artwork of the prompt library: the Framer "Image Parallax" code component. A rounded (36px) frame clips an
 * image layer that is 30% taller than the frame (15% overhang on each side) and slides vertically with scroll, from
 * -15% of the frame height while the frame is still below the viewport to +15% once it has left through the top.
 */
export function HeroImage({ src, className = "" }: { src: string; className?: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frameEl = frame.current;
    const layerEl = layer.current;
    if (!frameEl || !layerEl) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const height = frameEl.offsetHeight;
      if (!height || !frameEl.offsetWidth) return;
      const top = frameEl.getBoundingClientRect().top;
      const viewport = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewport - top) / (viewport + height)));
      layerEl.style.transform = `translate3d(0, ${(progress - 0.5) * (PARALLAX_AMOUNT / 100) * height}px, 0)`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={frame} className={`relative size-full overflow-hidden rounded-[36px] ${className}`.trim()}>
      <div
        ref={layer}
        className="pointer-events-none absolute inset-x-0 -top-[15%] -bottom-[15%] h-[130%] select-none will-change-transform [backface-visibility:hidden]"
      >
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="(min-width: 810px) 472px, 334px"
          className="rounded-[36px] object-cover object-center"
        />
      </div>
    </div>
  );
}
