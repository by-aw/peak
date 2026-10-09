import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Button variants ported from the Framer "Buttons" component.
 *
 * - primary      -> Framer "Desktop/Primary": dark pill, 16px text, 6px 12px padding (nav)
 * - primaryBig   -> Framer "Desktop/Big": dark 12px-radius block, 18px text, 12px 20px padding (hero / section CTAs)
 * - white        -> Framer "Desktop/White": white pill, same shadow (nav "Log In", footer CTA)
 * - ghost        -> Framer "With Icon": transparent pill nav link, 16px/400
 *
 * Shadow (all solid variants): rgba(18,43,105,.04) 0 2px 6px, rgba(18,43,105,.08) 0 1px 2px, rgba(18,43,105,.08) 0 0 0 1px
 * Hover (primary variants): background becomes linear-gradient(#000 0%, #14151a 100%).
 * Hover (white): text color #3d3d3d.
 */
export const buttonShadow =
  "shadow-[0_2px_6px_0_rgba(18,43,105,0.04),0_1px_2px_0_rgba(18,43,105,0.08),0_0_0_1px_rgba(18,43,105,0.08)]";

const variants = {
  primary:
    `inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-[16px] font-medium leading-6 tracking-[-0.32px] text-white bg-[linear-gradient(#14151a_0%,#14151a_100%)] hover:bg-[linear-gradient(#000_0%,#14151a_100%)] transition-[background] duration-200 ${buttonShadow}`,
  primaryBig:
    `inline-flex items-center justify-center whitespace-nowrap rounded-[12px] px-5 py-3 text-[18px] font-medium leading-[1.45em] tracking-[-0.36px] text-white bg-[linear-gradient(#14151a_0%,#14151a_100%)] hover:bg-[linear-gradient(#000_0%,#14151a_100%)] transition-[background] duration-200 ${buttonShadow}`,
  white:
    `inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-[16px] font-medium leading-6 tracking-[-0.32px] text-black hover:text-gray-800 bg-white transition-colors duration-200 ${buttonShadow}`,
  whiteBig:
    `inline-flex items-center justify-center whitespace-nowrap rounded-[12px] px-5 py-3 text-[18px] font-medium leading-[1.45em] tracking-[-0.36px] text-black hover:text-gray-800 bg-white transition-colors duration-200 ${buttonShadow}`,
  ghost:
    "inline-flex items-center justify-center whitespace-nowrap gap-1 rounded-full px-2.5 py-1.5 text-[16px] font-normal leading-[1.4em] tracking-[-0.32px] text-black",
} as const;

export type ButtonVariant = keyof typeof variants;

type Common = { variant?: ButtonVariant; className?: string; children: ReactNode };
type AnchorProps = Common & Omit<ComponentProps<typeof Link>, "className" | "children"> & { href: string };
type NativeProps = Common & Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

export function Button(props: AnchorProps | NativeProps) {
  const { variant = "primary", className = "", children, ...rest } = props;
  const cls = `${variants[variant]} ${className}`.trim();
  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkRest } = rest as AnchorProps;
    return (
      <Link href={href} className={cls} {...linkRest}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as NativeProps)}>
      {children}
    </button>
  );
}
