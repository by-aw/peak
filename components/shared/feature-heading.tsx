import type { ReactNode } from "react";

/**
 * Framer "Stack > Header > Heading" h2 used by the inner-page sections:
 * Clash Display 600, 32/40/48px with a 1em line-height, black with an optional grey (#686a75) accent span.
 */
export function FeatureHeading({
  children,
  className = "",
  align = "center",
}: {
  children: ReactNode;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <h2
      className={`w-full font-display text-[32px] leading-[32px] font-semibold whitespace-pre-wrap text-black md:text-[40px] md:leading-[40px] lg:text-[48px] lg:leading-[48px] ${align === "center" ? "text-center" : "text-left"} ${className}`.trim()}
    >
      {children}
    </h2>
  );
}

/** Grey accent used inside `FeatureHeading` (Framer colours one word #686a75). */
export function HeadingAccent({ children }: { children: ReactNode }) {
  return <span className="text-gray-550">{children}</span>;
}
