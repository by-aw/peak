"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export type TickerUser = { name: string; src: string };

/** Live site: the ticker `ul` moves ~35px/s to the left (measured at two timestamps). */
const SPEED_PX_PER_S = 35;
const GAP = 16;

function Pill({ user }: { user: TickerUser }) {
  return (
    <div className="flex items-center gap-1 rounded-full p-1 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]">
      <div className="relative aspect-square size-8 shrink-0">
        <Image src={user.src} alt="" width={32} height={32} className="size-8 rounded-full object-cover" />
        <Image
          src="/framer/a81bEpgod2cmJv36jljMA05ukNU.png"
          alt=""
          width={72}
          height={76}
          className="absolute top-[15px] left-5 z-[1] h-[19px] w-[18px] object-cover"
        />
      </div>
      <div className="px-1.5">
        <p className="text-[14px] leading-[19.6px] font-medium tracking-[-0.2px] whitespace-pre text-black/60">
          {user.name}
        </p>
      </div>
    </div>
  );
}

/**
 * Infinite avatar marquee from the hero ("Trusted by …").
 * The list is rendered twice and translated by exactly one copy (+gap) per cycle via the Web
 * Animations API; the duration is derived from the measured width so the speed matches the live
 * site regardless of font metrics.
 */
export function TrustedTicker({ users }: { users: TickerUser[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const first = firstRef.current;
    if (!track || !first) return;
    let anim: Animation | undefined;
    const start = () => {
      anim?.cancel();
      const distance = first.getBoundingClientRect().width + GAP;
      if (!distance) return;
      anim = track.animate([{ transform: "translateX(0)" }, { transform: `translateX(-${distance}px)` }], {
        duration: (distance / SPEED_PX_PER_S) * 1000,
        iterations: Infinity,
        easing: "linear",
      });
    };
    start();
    const ro = new ResizeObserver(start);
    ro.observe(first);
    return () => {
      ro.disconnect();
      anim?.cancel();
    };
  }, []);

  return (
    <div className="relative flex min-w-0 flex-1 items-center overflow-clip [mask-image:linear-gradient(90deg,rgba(0,0,0,0)_0%,#000_9%)] md:[mask-image:none]">
      {/* soft white edge over the start of the ticker */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-16px] bottom-[-16px] left-[-24px] z-[3] w-[45px] bg-white blur-[3px]"
      />
      <div className="flex min-w-0 flex-1 items-center overflow-hidden [mask-image:linear-gradient(270deg,rgba(0,0,0,0)_0%,#000_5%)]">
        <div ref={trackRef} className="flex shrink-0 items-center gap-4 will-change-transform">
          <ul ref={firstRef} className="flex shrink-0 items-center gap-4">
            {users.map((u) => (
              <li key={u.name} className="shrink-0">
                <Pill user={u} />
              </li>
            ))}
          </ul>
          <ul aria-hidden className="flex shrink-0 items-center gap-4">
            {users.map((u) => (
              <li key={u.name} className="shrink-0">
                <Pill user={u} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
