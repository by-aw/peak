import Image from "next/image";
import type { ReactNode } from "react";

type PreviewProps = { src: string; width: number; height: number; alt?: string; className?: string; preload?: boolean };

/** The product screenshot card (Framer "Dashboard Preview"): 12px radius (6 on phone), hairline + soft shadow. */
export function DashboardPreview({ src, width, height, alt = "", className = "", preload }: PreviewProps) {
  return (
    <div className={`w-full overflow-hidden rounded-[6px] shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_1px_3px_0_rgba(0,0,0,0.08)] md:rounded-[12px] ${className}`}>
      <Image src={src} width={width} height={height} alt={alt} sizes="(min-width: 1200px) 1100px, (min-width: 810px) calc(100vw - 96px), calc(100vw - 40px)" className="h-auto w-full" preload={preload} />
    </div>
  );
}

type Props = {
  children: ReactNode;
  /** Padding classes of the grey band. Default is the sub-page template (80/100 → 64/48 → 32/20); /attribution uses 48px on every breakpoint. */
  paddingClassName?: string;
};

/** Grey full-width band (#eaeaea) that holds the dashboard preview. Padding 80/100 → 64/48 → 32/20. */
export function DashboardSection({ children, paddingClassName = "px-5 py-8 md:px-12 md:py-16 lg:px-[100px] lg:py-20" }: Props) {
  return (
    <section className="flex w-full justify-center overflow-clip">
      <div className={`flex w-full flex-col items-center bg-[#eaeaea] ${paddingClassName}`}>
        <div className="flex w-full max-w-[1100px] flex-col items-center gap-6">{children}</div>
      </div>
    </section>
  );
}
