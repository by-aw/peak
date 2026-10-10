"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";

const APPS = [
  { name: "Finder", src: "/framer/yaBbqL1DHTV8u3MId5PxdQC5cbI.png" },
  { name: "Safari", src: "/framer/NISqJ6CyMikO5fcmW64vvqBynP4.png" },
  { name: "Mochi", src: "/framer/x0ymKpItUpvngwfR744vVsVpQmk.png" },
  { name: "Messages", src: "/framer/eNZC4oqE3hf7EAVMlU6VGIeLDc.png" },
  { name: "Mail", src: "/framer/jvYiXc9KpfFDBRBxgcvHFNvvjY.png" },
] as const;

const SPRING = { type: "spring", stiffness: 300, damping: 26, mass: 0.8 } as const;

/** Icon sizes of the Framer variants D-1..D-5 (index = hovered icon), measured on the live site. */
const SIZES: number[][] = [
  [110, 90, 70, 70, 70],
  [90, 110, 70, 70, 70],
  [70, 90, 110, 90, 70],
  [70, 70, 70, 110, 90],
  [70, 70, 70, 90, 110],
];

/**
 * macOS-style dock from the Download page. Framer variants: the hovered icon grows to 110px and a neighbour to
 * 90px (the Mochi icon in the middle only grows when it is hovered itself), the rest stay 70px (D-1..D-5); with
 * nothing hovered every icon is 70px (D-Default). The page loads with the Mochi icon magnified (D-3) until the
 * pointer first leaves the dock. The Mochi icon carries the "running" dot. `variant="static"` renders the flat
 * D-Default state used inside the desktop wallpaper mockup.
 */
export function Dock({ variant = "interactive" }: { variant?: "interactive" | "static" }) {
  const [active, setActive] = useState<number | null>(variant === "interactive" ? 2 : null);
  const sizeOf = (i: number) => (active === null ? 70 : SIZES[active][i]);
  const interactive = variant === "interactive";
  return (
    <div
      className="relative z-[7] flex h-[70px] items-end justify-center"
      onMouseLeave={interactive ? () => setActive(null) : undefined}
    >
      {APPS.map((app, i) => {
        const size = sizeOf(i);
        return (
          <motion.div
            key={app.name}
            className="relative z-[2] flex shrink-0 items-center justify-center overflow-hidden"
            initial={false}
            animate={{ width: size, height: size }}
            transition={SPRING}
            onMouseEnter={interactive ? () => setActive(i) : undefined}
          >
            <div className="relative h-full w-full">
              <Image src={app.src} alt="" width={256} height={256} className="h-full! w-full object-cover" sizes="110px" />
              {app.name === "Mochi" && (
                <span aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 z-[1] block size-1 -translate-x-1/2 rounded-full bg-[#9ba1a5]" />
              )}
            </div>
          </motion.div>
        );
      })}
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-1 z-[1] overflow-hidden rounded-[16px] inset-ring-1 inset-ring-[rgba(212,212,212,0.2)] ${
          interactive ? "bg-[#d6d6d6] shadow-[0_2px_8px_0_rgba(176,176,176,0.32)]" : "bg-[rgba(34,36,38,0.24)] shadow-[0_2px_8px_0_rgba(0,0,0,0.2)]"
        }`}
      />
    </div>
  );
}
