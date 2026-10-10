import { MainButton } from "./main-button";

/**
 * Framer "Mid CTA" block between two feature sections: a single "Start Free Trial" button,
 * 24px above / 72px below. The Framer block is 1200px wide and left-aligned inside the page
 * (not centered), so the button sits at x=516 on a 1440 viewport; `self-start` reproduces that.
 */
export function MidCta({ href, label = "Start Free Trial" }: { href: string; label?: string }) {
  return (
    <div className="flex w-full max-w-[1200px] flex-col items-center gap-3 self-start px-5 pt-6 pb-[72px]">
      <MainButton href={href}>{label}</MainButton>
    </div>
  );
}
