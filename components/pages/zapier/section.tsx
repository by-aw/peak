import type { ReactNode } from "react";

/**
 * Framer section shell of the /zapier page: a full-width wrapper padded 80/100 (desktop), 64/48 (tablet),
 * 48/20 (phone) around a centred 1000px container (928 tablet, 350 phone).
 */
export function ZapierSection({
  children,
  className = "",
  wrapperClassName = "",
  containerClassName = "",
  label,
  id,
  extra,
}: {
  children: ReactNode;
  /** Section-level decoration rendered next to the wrapper (absolutely positioned backgrounds). */
  extra?: ReactNode;
  className?: string;
  /** Extra classes for the padded wrapper (e.g. a different vertical padding). */
  wrapperClassName?: string;
  /** Extra classes for the 1000px container (gap between header and content). */
  containerClassName?: string;
  label?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative flex w-full flex-col items-center ${className}`.trim()} aria-label={label}>
      <div className={`flex w-full flex-col items-center px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20 ${wrapperClassName}`.trim()}>
        <div className={`relative flex w-full max-w-[1000px] flex-col items-center ${containerClassName}`.trim()}>{children}</div>
      </div>
      {extra}
    </section>
  );
}
