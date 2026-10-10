import type { ComponentProps } from "react";
import { RollingButton } from "./rolling-button";

/**
 * Framer "Button/Main" used by the feature pages (hero CTA + mid-page CTA): 168x48 dark block,
 * 10px radius, 14px 20px padding, 18px/19.8px medium text. On hover the live site does not darken the
 * button; its label does the Framer "rolling text" effect (each character rolls up and its duplicate
 * rolls in from below), so this is the shared `RollingButton` in its black / large configuration.
 */
export function MainButton({ href, children, className = "" }: { href: string; children: string; className?: string } & Pick<ComponentProps<"a">, "target" | "rel">) {
  return (
    <RollingButton href={href} variant="black" size="lg" className={className}>
      {children}
    </RollingButton>
  );
}
