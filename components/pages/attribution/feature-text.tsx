import { RollingButton } from "@/components/shared/attribution/rolling-button";

type Props = {
  title: string;
  /** Small purple "New" pill next to the title (Framer "Tag"). */
  tag?: string;
  description: string;
  items: string[];
  /** Optional white "Learn more" button under the list (Features Card section). */
  cta?: { label: string; href: string };
  /** Extra classes on the outer text block (padding overrides). */
  className?: string;
};

/**
 * Text block of the /attribution product cards (Framer "Text"): title (+ optional pill), grey description,
 * dashed divider, dotted feature list and an optional white rolling button.
 * Padding 24/24/48 (phone 24/16/40); 18px title on tablet/desktop, 16px on phone.
 */
export function FeatureText({ title, tag, description, items, cta, className = "" }: Props) {
  return (
    <div className={`flex w-full flex-col items-start px-4 pt-6 pb-10 md:px-6 md:pb-12 ${cta ? "gap-6" : "gap-4"} ${className}`}>
      <div className="flex w-full flex-col items-start gap-4 overflow-clip">
        <div className="flex w-full flex-col items-start gap-2 md:gap-1.5">
          {tag ? (
            <div className="flex items-center gap-1.5">
              <p className="text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] whitespace-pre-wrap text-ink-3 md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px]">{title}</p>
              <span className="relative flex items-center rounded-[24px] bg-[#faf5ff] px-2 py-1 after:pointer-events-none after:absolute after:inset-0 after:rounded-[24px] after:border after:border-[#e9d5ff]">
                <span className="text-[13px] leading-[16.9px] font-medium tracking-[-0.2px] whitespace-pre text-[#a855f7]">{tag}</span>
              </span>
            </div>
          ) : (
            <p className="w-full text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] whitespace-pre-wrap text-ink-3 md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px]">{title}</p>
          )}
          <p className="w-full text-[15px] leading-[21px] font-normal tracking-[-0.15px] whitespace-pre-wrap text-gray-550">{description}</p>
        </div>
        <div aria-hidden className="relative h-0.5 w-full overflow-hidden after:pointer-events-none after:absolute after:inset-0 after:border after:border-dashed after:border-[#f2f2f2]" />
        <ul className="flex w-full flex-col items-start gap-3">
          {items.map((item) => (
            <li key={item} className="flex w-full items-center gap-2">
              <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-[rgba(17,0,0,0.2)]" />
              <p className="flex-1 text-[14px] leading-[18.2px] font-normal whitespace-pre-wrap text-gray-550 md:leading-[16.8px]">{item}</p>
            </li>
          ))}
        </ul>
      </div>
      {cta ? (
        <RollingButton href={cta.href} variant="white" size="md" className="w-full">
          {cta.label}
        </RollingButton>
      ) : null}
    </div>
  );
}
