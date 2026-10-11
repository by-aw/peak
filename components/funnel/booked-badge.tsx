const variants = {
  /** /vsl and /vsl-2: Framer text style "RV7Fvj0Yp": Inter 400 14px / 18.2px (16.8px from tablet up), #686a75, with Framer's Inter alternates. */
  vsl: "text-[14px] leading-[18.2px] font-normal text-gray-550 md:leading-[16.8px] whitespace-nowrap [font-feature-settings:'blwf','cv03','cv04','cv09','cv11']",
  /** /features/offer: plain Inter 400 14px / 14px, -0.2px tracking, #6d6d6d, in a fixed 240px wide text box (the 231px text is left-aligned in it). */
  offer: "w-[240px] text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500",
} as const;

/**
 * Framer "Label" under the "Book a Demo" button on /vsl, /vsl-2 and /features/offer: a 6px rose (#f43f5e) dot and
 * "27 founders booked a call this week", 4px apart, centred. The dot is static (no animation on live). The badge is
 * as wide as its content (249.4px on /vsl, 250px on /features/offer) and the text never wraps, so centre it with
 * the parent (`items-center`).
 *
 * `variant` picks the text style: "vsl" (default, /vsl and /vsl-2) or "offer" (/features/offer, slightly tighter and
 * greyer, in a fixed 240px box).
 */
export function BookedBadge({
  children = "27 founders booked a call this week",
  variant = "vsl",
  className = "",
}: {
  children?: string;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <div className={`flex w-max items-center justify-center gap-1 ${className}`.trim()}>
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-rose-500" />
      <p className={`font-sans ${variants[variant]}`}>{children}</p>
    </div>
  );
}
