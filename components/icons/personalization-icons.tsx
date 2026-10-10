/* Inline SVGs of the Personalization hero composer, copied from the Framer site. */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

/** heroicons-micro/adjustments-horizontal (purple equaliser bars) in the hero composer's "voice" button. */
export function AdjustmentsIcon(props: P) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M1.94043 6.18213V9.81769" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.9707 2.54663V13.4533" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 4.3645V11.6356" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.0293 6.18213V9.81769" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.0596 5.27344V10.7268" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Thin grey text cursor ("Line 2") in front of the composer text. */
export function CursorLine(props: P) {
  return (
    <svg width="3" height="19" viewBox="-1 -1 3 19" fill="none" {...props}>
      <path d="M0.5 0.5L0.499999 16.5" stroke="#E0E0E0" strokeLinecap="round" />
    </svg>
  );
}
