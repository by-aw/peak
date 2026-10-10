import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Framer "black small" / "white small" buttons of the Updates pages: 38px tall, 10px 12px padding,
 * 10px radius, hairline shadow, 14px/18px medium label. The label is a "Stack" of two copies
 * (the second one 28px below, hidden); on hover the stack rolls up so the copy slides into place.
 */
const variants = {
  black: "bg-[linear-gradient(#1d1d20_0%,#1d1d20_100%)] text-white",
  white: "bg-[linear-gradient(#fff_0%,#fff_100%)] text-black",
} as const;

export const smallButtonShadow =
  "shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]";

type Props = Omit<ComponentProps<typeof Link>, "children" | "className"> & {
  children: string;
  variant?: keyof typeof variants;
  className?: string;
};

export function StackButton({ children, variant = "black", className = "", ...rest }: Props) {
  return (
    <Link
      className={`group relative flex items-center justify-center gap-1 overflow-hidden rounded-[10px] px-3 py-2.5 ${variants[variant]} ${smallButtonShadow} ${className}`.trim()}
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
