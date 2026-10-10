import type { ReactNode } from "react";

type CopyProps = { label: string; title: string; body: string };

/** Label / title / body block at the bottom of every feature card (Framer "Copy"). */
export function FeatureCardCopy({ label, title, body, className = "" }: CopyProps & { className?: string }) {
  return (
    <div className={`flex w-full flex-col gap-4 p-6 ${className}`}>
      <p className="text-[14px] leading-[18.2px] font-normal text-gray-550 md:leading-[16.8px]">{label}</p>
      <div className="flex flex-col gap-1.5">
        <p className="text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] text-ink-3 md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px] lg:text-[20px] lg:leading-[24px] lg:tracking-[-0.6px]">
          {title}
        </p>
        <p className="text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] text-[#383840] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
          {body}
        </p>
      </div>
    </div>
  );
}

type FeatureCardProps = CopyProps & {
  /** The mockup; rendered inside a masked box of `assetClassName` height (fades out at the bottom). */
  asset?: ReactNode;
  /** Height classes of the asset box, e.g. "h-[302px]". */
  assetClassName?: string;
  tone?: "gray" | "white";
  className?: string;
};

/**
 * Framer "Container" card of the feature-page template: 24px radius, 1px #f2f2f2 hairline, grey (or white)
 * background, content vertically centered (grid rows stretch the cards), optional masked mockup on top.
 */
export function FeatureCard({ asset, assetClassName = "h-[302px]", tone = "gray", className = "", ...copy }: FeatureCardProps) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center overflow-hidden rounded-[24px] shadow-[inset_0_0_0_1px_#f2f2f2] ${tone === "gray" ? "bg-gray-25" : "bg-white"} ${className}`}
    >
      {asset && (
        <div className={`relative w-full shrink-0 overflow-hidden [mask-image:linear-gradient(#000_83%,rgba(0,0,0,0)_100%)] ${assetClassName}`}>
          {asset}
        </div>
      )}
      <FeatureCardCopy {...copy} />
    </div>
  );
}

/** Small icon card (Framer "Card" inside "Card Grid"): icon, label, title, body. */
export function FeatureMiniCard({ icon, label, title, body, tone = "gray" }: CopyProps & { icon: ReactNode; tone?: "gray" | "white" }) {
  return (
    <div className={`flex w-full flex-col gap-8 overflow-hidden rounded-[24px] p-5 shadow-[inset_0_0_0_1px_#f2f2f2] ${tone === "gray" ? "bg-gray-25" : "bg-white"}`}>
      <div className="relative size-5">{icon}</div>
      <div className="flex flex-col gap-4">
        <p className="text-[14px] leading-[18.2px] font-normal text-gray-550 md:leading-[16.8px]">{label}</p>
        <div className="flex flex-col gap-2">
          <p className="text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] text-ink-3 md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px] lg:text-[20px] lg:leading-[24px] lg:tracking-[-0.6px]">
            {title}
          </p>
          <p className="text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] text-[#383840] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Positioning helper for the mockups inside a FeatureCard asset box: 428px wide centered at >= 810px,
 * 16px side margins on phones, 48px from the top by default.
 */
export function MockupFrame({ children, className = "", top = "top-12" }: { children: ReactNode; className?: string; top?: string }) {
  return (
    <div className={`absolute right-4 left-4 md:right-auto md:left-1/2 md:w-[428px] md:-translate-x-1/2 ${top} ${className}`}>{children}</div>
  );
}

/** 6px-tall skeleton bar used throughout the mockups (gradient or flat grey). */
export function Skeleton({ className = "", flat = false }: { className?: string; flat?: boolean }) {
  return (
    <div
      className={`h-1.5 shrink-0 overflow-hidden rounded-[24px] ${flat ? "bg-[#efefef]" : "bg-[linear-gradient(90deg,rgba(227,227,227,0.12)_0%,#e1e1e1_100%)]"} ${className}`}
    />
  );
}
