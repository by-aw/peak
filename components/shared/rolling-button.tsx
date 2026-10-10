import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Framer "Desktop/Black" / "Desktop/White" / "Mobile/Black" / "Button/Main" buttons used by the
 * integration pages (/meta-ads, /payments, /mcp): 10px radius, hairline shadow, and the "rolling text" hover
 * where every character rolls up and its duplicate rolls in from below with a small stagger.
 *
 * - size "sm": 48px tall (46px on phone), 14px/18.2px text, 12px side padding (hero button pairs)
 * - size "sm48": the same pair at 48px on every breakpoint (/zapier hero)
 * - size "md": 48px tall, 16px/24px text, 16px side padding (the purple "Connect Mochi to Claude" of /mcp)
 * - size "lg": 48px tall, 18px/19.8px text, 20px side padding ("Book a Demo", "Check Claude MCP")
 * - variant "purple": the Framer "MCP" button, #d471ff with a 4% dark gradient overlay and a layered purple shadow
 */
export const rollingButtonShadow =
  "shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]";

const variants = {
  black: `bg-[linear-gradient(#14151a_0%,#14151a_100%)] text-white ${rollingButtonShadow}`,
  white: `bg-[linear-gradient(#fff_0%,#fff_100%)] text-black ${rollingButtonShadow}`,
  purple:
    "bg-[linear-gradient(rgba(0,0,0,0)_0%,rgba(0,0,0,0.04)_100%),linear-gradient(#d471ff_0%,#d471ff_100%)] text-[#faf5e7] shadow-[0_0_0_1px_#c44cf8,0_1px_2px_0_rgba(0,0,0,0.32),0_4px_8px_-4px_rgba(0,0,0,0.32),inset_0_-2px_0.75px_0_rgba(0,0,0,0.12),inset_0_1px_0.75px_0_rgba(255,255,255,0.5)]",
} as const;

const sizes = {
  sm: {
    link: "h-[46px] px-3 py-3.5 md:h-12 md:py-2.5",
    text: "h-[18.2px] text-[14px] leading-[18.2px] tracking-[-0.1px]",
  },
  sm48: {
    link: "h-12 px-3 py-2.5",
    text: "h-[18.2px] text-[14px] leading-[18.2px] tracking-[-0.1px]",
  },
  md: {
    link: "h-12 px-4 py-3",
    text: "h-6 text-[16px] leading-6",
  },
  lg: {
    link: "h-12 px-5 py-3.5",
    text: "h-[19.8px] text-[18px] leading-[19.8px]",
  },
} as const;

type Props = Omit<ComponentProps<typeof Link>, "children" | "className"> & {
  children: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  /** Extra classes for the text span (e.g. `font-dm` on the DM Sans pages). */
  textClassName?: string;
};

export function RollingButton({ children, variant = "black", size = "sm", className = "", textClassName = "", ...rest }: Props) {
  const chars = Array.from(children);
  const s = sizes[size];
  return (
    <Link
      className={`group relative flex items-center justify-center overflow-hidden rounded-[10px] ${s.link} ${variants[variant]} ${className}`}
      {...rest}
    >
      <span className={`flex overflow-hidden font-medium whitespace-pre ${s.text} ${textClassName}`} aria-label={children}>
        {chars.map((char, i) => (
          <span
            key={i}
            aria-hidden
            className="relative block transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 12}ms` }}
          >
            <span className="block">{char}</span>
            <span className="absolute top-full left-0 block">{char}</span>
          </span>
        ))}
      </span>
    </Link>
  );
}
