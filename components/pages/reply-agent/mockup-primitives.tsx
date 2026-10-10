import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/**
 * Absolutely positioned mockup card inside a masked "Custom Asset" area. Framer centres the 428px card
 * horizontally (`left: 50%; translateX(-50%)`) and places it at `top` (optionally centred on it with
 * translateY(-50%)); on phones the card spans the asset minus 16px on each side.
 */
export function FloatingCard({
  top,
  centerY = false,
  width = 428,
  align = "center",
  className = "",
  children,
}: {
  top: string;
  centerY?: boolean;
  width?: number;
  align?: "center" | "left";
  className?: string;
  children: ReactNode;
}) {
  const pos =
    align === "center"
      ? "md:left-1/2 md:-translate-x-1/2"
      : "md:left-[31px]";
  return (
    <div
      className={`absolute inset-x-4 md:inset-x-auto ${pos} ${centerY ? "-translate-y-1/2" : ""} ${className}`.trim()}
      style={{ top, "--card-w": `${width}px` } as CSSProperties}
    >
      <div className="w-full md:w-[var(--card-w)]">{children}</div>
    </div>
  );
}

/** Mockup card chrome: white, 16px radius, 1px #e7e7e7 inner ring (Framer draws borders as ::after overlays). */
export const cardRing = "inset-ring-1 inset-ring-gray-150";
export const cardShadow = "shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]";

/** 6px tall placeholder text bar. `tone` "solid" = flat grey, "fade" = left-to-right grey gradient. */
export function Skeleton({ w, tone = "solid", color = "#efefef", radius = 24 }: { w: number; tone?: "solid" | "fade"; color?: string; radius?: 16 | 24 }) {
  return (
    <span
      aria-hidden
      className={`block h-[6px] max-w-full overflow-hidden ${radius === 24 ? "rounded-[24px]" : "rounded-[16px]"}`}
      style={{
        width: w,
        background: tone === "fade" ? "linear-gradient(90deg, rgba(227,227,227,0.12) 0%, #e1e1e1 100%)" : color,
      }}
    />
  );
}

/** Two stacked skeleton bars (Framer "Text Stack": 80px fade + 146px solid, 6px apart). */
export function TextStack({ gap = 6, w1 = 80, w2 = 146, flip = false, className = "" }: { gap?: 6 | 8; w1?: number; w2?: number; flip?: boolean; className?: string }) {
  return (
    <span className={`flex flex-col items-start ${gap === 6 ? "gap-[6px]" : "gap-2"} ${className}`.trim()}>
      <Skeleton w={w1} tone={flip ? "solid" : "fade"} />
      <Skeleton w={w2} tone={flip ? "fade" : "solid"} />
    </span>
  );
}

const TAG_TONES = {
  green: "bg-[rgba(16,185,129,0.1)] text-[#10b981] inset-ring-[#10b981]",
  muted: "bg-[rgba(109,109,109,0.02)] text-gray-500 inset-ring-gray-500 opacity-[0.32]",
  amber: "bg-[rgba(248,159,5,0.1)] text-[#f89f05] inset-ring-[#f89f05]",
  purple: "bg-[rgba(139,92,246,0.1)] text-[#8b5cf6] inset-ring-[#8b5cf6]",
  red: "bg-[rgba(238,29,32,0.1)] text-[#ed1c20] inset-ring-[#ed1c20]",
  brown: "bg-[rgba(185,120,16,0.1)] text-[#b97810] inset-ring-[#b97810]",
  blue: "bg-[rgba(16,112,185,0.1)] text-[#106fb9] inset-ring-[#106fb9]",
  grey: "bg-[rgba(191,191,191,0.1)] text-[#bfbfbf] inset-ring-[#bfbfbf]",
} as const;

/** Pill status tag (Framer "Tag"): 12px/500 text, 4px 10px padding, tinted background + 1px ring of the text colour. */
export function Tag({ children, tone = "green", small = false }: { children: ReactNode; tone?: keyof typeof TAG_TONES; small?: boolean }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-medium whitespace-pre inset-ring-1 ${
        small ? "px-[10px] py-1 text-[11px] leading-[11.55px] tracking-[-0.2px]" : "px-[10px] py-1 text-[12px] leading-[12.6px] tracking-[-0.2px]"
      } ${TAG_TONES[tone]}`}
    >
      {children}
    </span>
  );
}

/** Tiny 9px "AI"/"Human" tag used by the distribution mockup (3px 8px padding, 32% opacity). */
export function MiniTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-[rgba(109,109,109,0.11)] px-2 py-[3px] text-[9px] leading-[9.45px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500 opacity-[0.32] inset-ring-1 inset-ring-gray-500">
      {children}
    </span>
  );
}

/** Round avatar image (20px by default). */
export function Avatar({ src, size = 20, className = "" }: { src: string; size?: number; className?: string }) {
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-full ${className}`.trim()} style={{ width: size, height: size }}>
      <Image src={src} alt="" width={size * 4} height={size * 4} className="h-full! w-full object-cover" />
    </span>
  );
}

/** 24px rounded icon box with a white heroicon inside. */
export function IconBox({ color, children, className = "" }: { color: string; children: ReactNode; className?: string }) {
  return (
    <span className={`flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-[8px] ${className}`.trim()} style={{ backgroundColor: color }}>
      {children}
    </span>
  );
}

/** 1px vertical connector line between timeline rows (16px tall, #d1d1d1), centred under a 24px icon that sits 12px in. */
export function Connector({ h = 16 }: { h?: number }) {
  return (
    <span aria-hidden className="flex w-12 flex-col items-center" style={{ height: h }}>
      <span className="block w-px rounded-full bg-gray-300" style={{ height: h }} />
    </span>
  );
}
