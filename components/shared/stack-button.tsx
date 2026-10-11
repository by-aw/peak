import Link from "next/link";
import type { ComponentProps } from "react";
import { interFeatures } from "./inter-features";

const SHADOW = "shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]";

/**
 * Fills of the colour variants. `stack` buttons carry the label colour on the shell (the copies inherit it) and paint a bare
 * gradient; `roll` buttons paint a 180deg gradient and set the (white) label colour on each copy.
 */
const STACK_FILLS = {
  black: "bg-[linear-gradient(#1d1d20_0%,#1d1d20_100%)] text-white",
  white: "bg-[linear-gradient(#fff_0%,#fff_100%)] text-black",
} as const;
const ROLL_FILLS = {
  black: "bg-[linear-gradient(180deg,#1d1d20_0%,#1d1d20_100%)]",
  accent: "bg-[linear-gradient(180deg,#a855f7_0%,#a855f7_100%)]",
} as const;

const ROLL_SIZES = {
  /** Framer "button" variants "black large" / "accent large": 14px 24px padding, Inter 500 18/20 with the Inter cv features. */
  large: { pad: "px-6 py-3.5", stack: "h-5", shift: "group-hover:-translate-y-[30px]", text: `text-[18px] leading-5 ${interFeatures}` },
  /** Variant "black small": 10px 12px padding, Inter 500 14/18. */
  small: { pad: "px-3 py-2.5", stack: "h-[18px]", shift: "group-hover:-translate-y-[28px]", text: "text-[14px] leading-[18px]" },
} as const;

type Props = Omit<ComponentProps<typeof Link>, "children" | "className"> & {
  /** The label (rendered twice for the hover roll). */
  children: string;
  /** Fill the container's width. */
  block?: boolean;
  className?: string;
} & (
    | { hover?: "stack"; variant?: keyof typeof STACK_FILLS; size?: "small" }
    | { hover: "roll"; variant?: keyof typeof ROLL_FILLS; size?: keyof typeof ROLL_SIZES }
  );

/**
 * Framer "button" component (fQAcn66NC, `framer-wm8ch`): #1d1d20 / white / #a855f7 pill, 10px radius, hairline ring shadow,
 * label as a "Stack 1" of two copies 10px apart (the second one hidden) that moves up one line on hover while the first copy
 * fades out and the second fades in. Variants: "black small" / "white small" (38px tall: 10px 12px padding, 14/18 label,
 * used by the Updates posts, /features/offer and the /demo-jia "you're a bit early" screen) and "black large" / "accent large"
 * (14px 24px padding, 18/20 label with the Inter cv features: the /demo WhatsApp button and the /dm-audit CTAs).
 *
 * The two ports of the hover animation are kept as they were built, so every page renders as before:
 * - `hover="stack"` (default; Updates, /features/offer): each copy slides up 28px by itself over 300ms (cubic-bezier 0.2/0/0/1),
 *   only the second one fades (in).
 * - `hover="roll"` (/demo, /dm-audit): the pair slides as one over 400ms on a spring-like curve (cubic-bezier 0.3/1.3/0.5/1,
 *   Framer's spring bounce 0.2), the first copy fading out while the second fades in. This is the closer match to live (where
 *   the first copy fades out too and the slide settles with a small spring overshoot); moving the `stack` callers to `roll`
 *   would let the `stack` branch go.
 *
 * Renders a `next/link` anchor, so external links pass `target` / `rel` like on a plain anchor.
 */
export function StackButton({ children, block = false, className = "", hover = "stack", variant = "black", size = "small", ...rest }: Props) {
  if (hover === "roll") {
    const s = ROLL_SIZES[size];
    return (
      <Link
        className={`group relative flex items-center justify-center overflow-hidden rounded-[10px] ${s.pad} ${ROLL_FILLS[variant as keyof typeof ROLL_FILLS]} ${SHADOW} ${block ? "w-full" : ""} ${className}`.trim()}
        {...rest}
      >
        <span className={`relative flex ${s.stack} flex-col items-center`}>
          <span className={`flex flex-col items-center gap-2.5 transition-transform duration-[400ms] ease-[cubic-bezier(0.3,1.3,0.5,1)] ${s.shift}`}>
            <span className={`font-medium whitespace-pre text-white transition-opacity duration-[400ms] group-hover:opacity-0 ${s.text}`}>{children}</span>
            <span aria-hidden className={`font-medium whitespace-pre text-white opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 ${s.text}`}>
              {children}
            </span>
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      className={`group relative flex items-center justify-center gap-1 overflow-hidden rounded-[10px] px-3 py-2.5 ${STACK_FILLS[variant as keyof typeof STACK_FILLS]} ${SHADOW} ${block ? "w-full" : ""} ${className}`.trim()}
      {...rest}
    >
      <span className="relative flex h-[18px] flex-col items-center gap-2.5 overflow-visible">
        <span className="block text-center text-[14px] leading-[18px] font-medium whitespace-pre transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:-translate-y-[28px]">
          {children}
        </span>
        <span
          aria-hidden
          className="block text-center text-[14px] leading-[18px] font-medium whitespace-pre opacity-0 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:-translate-y-[28px] group-hover:opacity-100"
        >
          {children}
        </span>
      </span>
    </Link>
  );
}
