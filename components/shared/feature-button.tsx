import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/site";

/**
 * Framer "Button/Main" used on the feature pages (hero CTA + "Mid CTA" block):
 * dark 10px-radius block, 14px 20px padding, 18px/19.8px Inter 500, no letter-spacing, 48px tall.
 */
export function FeatureButton({ href, className = "", children = "Start Free Trial" }: { href: string; className?: string; children?: React.ReactNode }) {
  return (
    <Button
      variant="primaryBig"
      href={href}
      className={`rounded-[10px]! px-5! py-[14px]! leading-[19.8px]! tracking-normal! ${className}`}
    >
      {children}
    </Button>
  );
}

/** Login URL used by the feature-page CTAs: `https://use.themochi.app/login?landing_page=<slug>`. */
export function featureLoginUrl(slug: string) {
  return `${APP_URL}/login?landing_page=${slug}`;
}

/** Framer "Mid CTA": a centered "Start Free Trial" button between two sections (24px top / 72px bottom padding). */
export function FeatureMidCta({ href }: { href: string }) {
  return (
    <div className="flex w-full flex-col items-center gap-3 px-5 pt-6 pb-[72px]">
      <FeatureButton href={href} />
    </div>
  );
}
