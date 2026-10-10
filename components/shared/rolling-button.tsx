import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Framer "Desktop/Black" / "Desktop/White" / "Mobile/Black" / "Button/Main" buttons used by the
 * integration pages (/meta-ads, /payments): 10px radius, hairline shadow, and the "rolling text" hover
 * where every character rolls up and its duplicate rolls in from below with a small stagger.
 *
 * - size "sm": 48px tall (46px on phone), 14px/18.2px text, 12px side padding (hero button pairs)
 * - size "lg": 48px tall, 18px/19.8px text, 20px side padding ("Book a Demo", "Check Claude MCP")
 */
const variants = {
  black: "bg-[linear-gradient(#14151a_0%,#14151a_100%)] text-white",
  white: "bg-[linear-gradient(#fff_0%,#fff_100%)] text-black",
} as const;

const sizes = {
  sm: {
    link: "h-[46px] px-3 py-3.5 md:h-12 md:py-2.5",
    text: "h-[18.2px] text-[14px] leading-[18.2px] tracking-[-0.1px]",
  },
  lg: {
    link: "h-12 px-5 py-3.5",
    text: "h-[19.8px] text-[18px] leading-[19.8px]",
  },
} as const;

export const rollingButtonShadow =
  "shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]";

type Props = Omit<ComponentProps<typeof Link>, "children" | "className"> & {
  children: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

export function RollingButton({ children, variant = "black", size = "sm", className = "", ...rest }: Props) {
  const chars = Array.from(children);
  const s = sizes[size];
  return (
    <Link
      className={`group relative flex items-center justify-center overflow-hidden rounded-[10px] ${s.link} ${variants[variant]} ${rollingButtonShadow} ${className}`}
      {...rest}
    >
      <span className={`flex overflow-hidden font-medium whitespace-pre ${s.text}`} aria-label={children}>
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
