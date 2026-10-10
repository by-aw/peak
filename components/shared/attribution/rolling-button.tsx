import Link from "next/link";

const shadow = "shadow-[0_0_0_1px_rgba(18,43,105,0.08),0_1px_2px_0_rgba(18,43,105,0.08),0_2px_6px_0_rgba(18,43,105,0.04)]";

const variants = {
  black: "bg-ink-2 text-white",
  white: "bg-white text-black",
} as const;

type Props = {
  href: string;
  children: string;
  variant?: keyof typeof variants;
  /** 48px tall hero/CTA button (Framer "Desktop/Black") or 38px card button. */
  size?: "lg" | "md";
  className?: string;
};

/**
 * Framer "Rolling Text" button: on hover every letter rolls up by one line and a text-shadow copy
 * (130px below, inside an overflow-hidden line box) rolls in, staggered 20ms per letter.
 */
export function RollingButton({ href, children, variant = "black", size = "lg", className = "" }: Props) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      className={`group flex items-center justify-center overflow-hidden rounded-[10px] px-3 ${size === "lg" ? "h-12" : "h-[38px]"} ${variants[variant]} ${shadow} ${className}`}
    >
      <span className="flex h-[18.2px] overflow-hidden text-[14px] font-medium leading-[18.2px] tracking-[-0.1px]" aria-label={children}>
        {Array.from(children).map((ch, i) => (
          <span
            key={i}
            aria-hidden
            className="block whitespace-pre transition-transform duration-[400ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-[130px]"
            style={{ textShadow: "0 130px 0 currentColor", transitionDelay: `${i * 20}ms` }}
          >
            {ch}
          </span>
        ))}
      </span>
    </Link>
  );
}
