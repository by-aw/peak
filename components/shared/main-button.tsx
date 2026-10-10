import Link from "next/link";
import type { ReactNode } from "react";
import { buttonShadow } from "@/components/ui/button";

/**
 * Framer "Button/Main" used by the feature pages (hero CTA + mid-page CTA): 168x48 dark block,
 * 10px radius, 14px 20px padding, 18px/19.8px medium text. Hover darkens like the other primary buttons.
 */
export function MainButton({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-[10px] bg-[linear-gradient(#14151a_0%,#14151a_100%)] px-5 py-[14px] text-[18px] leading-[19.8px] font-medium whitespace-pre text-white transition-[background] duration-200 hover:bg-[linear-gradient(#000_0%,#14151a_100%)] ${buttonShadow} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}
