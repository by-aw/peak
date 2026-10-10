/* Icons used inside the "tracking pixel" feature mockups shared by /attribution/tracking-pixel and /attribution/lead-profiles. */
import type { SVGProps } from "react";

/** Typeform symbol (28x18, #1a1a19). */
export function TypeformIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 18" width={28} height={18} fill="none" aria-hidden="true" {...props}>
      <path
        d="M21.0961 0H14.6308C8.81426 0 8.36684 2.51059 8.36684 5.87298V12.127C8.36684 15.6239 8.81426 18 14.6531 18H21.0961C26.9126 18 27.36 15.4894 27.36 12.1494V5.87298C27.36 2.51059 26.9126 0 21.0961 0ZM0 4.5056C0 1.5467 1.1633 0 3.13197 0C5.10064 0 6.26394 1.5467 6.26394 4.5056V13.4944C6.26394 16.4533 5.10064 18 3.13197 18C1.1633 18 0 16.4533 0 13.4944V4.5056Z"
        fill="#1A1A19"
      />
    </svg>
  );
}

/** Jotform symbol (18x18, four coloured strokes). */
export function JotformIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 18 18" width={18} height={18} fill="none" aria-hidden="true" {...props}>
      <path d="M4.67086 17.0464C5.01685 17.3934 4.77898 17.9789 4.28162 17.9789H1.12447C0.49736 17.9789 0 17.5018 0 16.8946V13.8585C0 13.3814 0.605482 13.1428 0.951472 13.4681L4.67086 17.0464Z" fill="#0A1551" />
      <path d="M9.5802 17.3056C8.65035 16.3948 8.65035 14.8984 9.5802 13.9875L12.932 10.6695C13.8618 9.75862 15.3755 9.75862 16.3054 10.6695C17.2352 11.5803 17.2352 13.0767 16.3054 13.9875L12.9536 17.3056C12.0238 18.2164 10.51 18.2164 9.5802 17.3056Z" fill="#FFB21D" />
      <path d="M0.713011 8.97919C-0.216837 8.06835 -0.216837 6.57196 0.713011 5.66112L5.75149 0.694851C6.68134 -0.215992 8.19504 -0.215992 9.12489 0.694851C10.0547 1.60569 10.0547 3.10208 9.12489 4.01292L4.08641 8.97919C3.15656 9.91172 1.64286 9.91172 0.713011 8.97919Z" fill="#0099FF" />
      <path d="M5.31457 12.9701C4.38473 12.0592 4.38473 10.5628 5.31457 9.652L12.9696 2.10501C13.8994 1.19416 15.4132 1.19416 16.343 2.10501C17.2728 3.01585 17.2728 4.51224 16.343 5.42308L8.68797 12.9701C7.75813 13.8809 6.26605 13.8809 5.31457 12.9701Z" fill="#FF6100" />
    </svg>
  );
}

/** The purple Mochi blob mascot (28x24) shown in the "Automatic form detection" pill. */
export function MochiBlobIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 28 24" width={28} height={24} fill="none" aria-hidden="true" {...props}>
      <g filter="url(#pmi-blob-f0)">
        <path d="M15.4995 22.1298C11.9468 22.6808 2.07804 23.4235 2.17266 13.5309C2.30119 0.0932175 21.2759 -2.89892 25.5334 9.84712C28.6677 19.2305 19.0493 21.5608 15.4995 22.1298Z" fill="url(#pmi-blob-p0)" />
        <path
          d="M1.5146 13.5242C1.65066 -0.655622 21.6643 -3.81157 26.1574 9.63821C26.9765 12.0907 26.9819 14.145 26.4117 15.8532C25.8425 17.5581 24.7228 18.8502 23.4153 19.8224C20.8539 21.7269 17.4751 22.4732 15.6643 22.7679L15.6646 22.7698L15.5392 22.7896L15.5389 22.7877C13.7251 23.0645 10.2807 23.3942 7.25756 22.3704C5.71435 21.8477 4.25227 20.9626 3.18604 19.5156C2.11777 18.0658 1.48986 16.1098 1.5146 13.5242Z"
          stroke="url(#pmi-blob-p1)"
          strokeWidth="1.31613"
        />
      </g>
      <g filter="url(#pmi-blob-f1)">
        <ellipse cx="11.9976" cy="6.79771" rx="6.2498" ry="3.5651" transform="rotate(-18.5829 11.9976 6.79771)" fill="url(#pmi-blob-p2)" />
      </g>
      <g filter="url(#pmi-blob-f2)">
        <ellipse cx="11.7273" cy="11.0207" rx="1.48065" ry="0.785529" transform="rotate(-21.2832 11.7273 11.0207)" fill="#B555E0" />
      </g>
      <g filter="url(#pmi-blob-f3)">
        <ellipse cx="19.3216" cy="8.65529" rx="1.48065" ry="0.735865" transform="rotate(-19.6763 19.3216 8.65529)" fill="#B555E0" />
      </g>
      <path
        d="M10.6086 7.41878C11.3348 7.19615 12.153 7.76453 12.4367 8.68862C12.7203 9.61302 12.3619 10.5437 11.6356 10.7666C10.9093 10.9895 10.09 10.4204 9.80641 9.49595C9.52287 8.57153 9.88231 7.64161 10.6086 7.41878ZM18.1985 5.08814C18.9247 4.86541 19.7429 5.43387 20.0266 6.35798C20.3102 7.28243 19.9518 8.21315 19.2255 8.43599C18.4991 8.65882 17.6799 8.08975 17.3963 7.1653C17.1128 6.24091 17.4722 5.31096 18.1985 5.08814Z"
        fill="url(#pmi-blob-p3)"
      />
      <path d="M13.2969 11.8926C14.1175 12.4166 15.1772 12.6016 16.2258 12.3148C17.2744 12.0281 18.0925 11.3296 18.5323 10.4608" stroke="black" strokeWidth="1.50074" strokeLinecap="round" />
      <ellipse cx="10.0704" cy="8.71988" rx="0.625308" ry="0.75037" transform="rotate(-7.58367 10.0704 8.71988)" fill="white" />
      <ellipse cx="17.6876" cy="6.28628" rx="0.625308" ry="0.75037" transform="rotate(-7.58367 17.6876 6.28628)" fill="white" />
      <g filter="url(#pmi-blob-f4)">
        <circle cx="2.74194" cy="9.65405" r="2.74194" fill="url(#pmi-blob-p4)" />
        <circle cx="2.74194" cy="9.65405" r="3.29032" stroke="white" strokeWidth="1.09677" />
      </g>
      <defs>
        <filter id="pmi-blob-f0" x="0.859375" y="-1.68934" width="28.4739" height="26.1836" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="0.767742" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.41166 0 0 0 0 0.108371 0 0 0 0 0.545464 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="1.86452" dy="-3.72903" />
          <feGaussianBlur stdDeviation="1.04194" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.716814 0 0 0 0 0.0684685 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
        </filter>
        <filter id="pmi-blob-f1" x="3.32868" y="0.242741" width="17.3348" height="13.1102" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="1.31613" result="effect1_foregroundBlur" />
        </filter>
        <filter id="pmi-blob-f2" x="8.67515" y="8.46812" width="6.10282" height="5.10673" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="0.822581" result="effect1_foregroundBlur" />
        </filter>
        <filter id="pmi-blob-f3" x="16.2611" y="6.15562" width="6.11845" height="4.99931" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="0.822581" result="effect1_foregroundBlur" />
        </filter>
        <filter id="pmi-blob-f4" x="-4.16472" y="4.27897" width="13.8138" height="13.8197" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="1.53548" />
          <feGaussianBlur stdDeviation="1.53548" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.33 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <linearGradient id="pmi-blob-p0" x1="13.9356" y1="1.86451" x2="13.9356" y2="16.7806" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DC89FF" />
          <stop offset="1" stopColor="#D471FF" />
        </linearGradient>
        <linearGradient id="pmi-blob-p1" x1="12.3047" y1="1.87012" x2="15.4995" y2="22.1299" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="#F6FAFF" />
        </linearGradient>
        <linearGradient id="pmi-blob-p2" x1="11.9976" y1="3.23262" x2="11.9976" y2="10.3628" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0CCFF" />
          <stop offset="1" stopColor="#D87EFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="pmi-blob-p3" x1="13.876" y1="5.97837" x2="15.0469" y2="10.3783" gradientUnits="userSpaceOnUse">
          <stop stopColor="#494949" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient id="pmi-blob-p4" x1="2.74194" y1="6.91211" x2="2.74194" y2="12.396" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BBF749" />
          <stop offset="1" stopColor="#4BF4B6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const globe = (
  <>
    <path d="M23.5 16C23.5 20.1422 20.1422 23.5 16 23.5C11.8579 23.5 8.5 20.1422 8.5 16C8.5 11.8579 11.8579 8.5 16 8.5C20.1422 8.5 23.5 11.8579 23.5 16Z" stroke="#6D6D6D" strokeWidth="1.66667" strokeLinecap="square" />
    <path d="M23.5 16H8.5" stroke="#6D6D6D" strokeWidth="1.66667" strokeLinecap="square" />
    <path d="M16.0026 23.5C14.3918 23.5 13.0859 20.1422 13.0859 16C13.0859 11.8579 14.3918 8.5 16.0026 8.5C17.6134 8.5 18.9193 11.8579 18.9193 16C18.9193 20.1422 17.6134 23.5 16.0026 23.5Z" stroke="#6D6D6D" strokeWidth="1.66667" strokeLinecap="square" />
  </>
);

/** Grey 32px tile with a globe outline (Framer "Frame 164"). */
export function GlobeTileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" width={32} height={32} fill="none" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="8" fill="#F6F6F6" />
      {globe}
    </svg>
  );
}

const skeletonStop = (
  <>
    <stop stopColor="#E3E3E3" stopOpacity="0.12" />
    <stop offset="1" stopColor="#E1E1E1" />
  </>
);

/** Left cell of a skeleton table row: globe tile + two grey bars (260x74). */
export function SkeletonDomainCell(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 260 74" width={260} height={74} fill="none" aria-hidden="true" {...props}>
      <g transform="translate(16 21)">
        <rect width="32" height="32" rx="8" fill="#F6F6F6" />
        {globe}
      </g>
      <rect x="64" y="28" width="69" height="6" rx="3" fill="url(#pmi-sk-cell)" />
      <rect x="64" y="40" width="142" height="6" rx="3" fill="#F0F0F0" />
      <defs>
        <linearGradient id="pmi-sk-cell" x1="64" y1="31" x2="133" y2="31" gradientUnits="userSpaceOnUse">
          {skeletonStop}
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Full skeleton table row (452x74) with a bottom hairline; `variant` picks the bar widths of the two Framer rows. */
export function SkeletonTableRow({ variant = "a", ...props }: SVGProps<SVGSVGElement> & { variant?: "a" | "b" }) {
  const [w1, w2] = variant === "a" ? [84, 121] : [44, 99];
  const id = `pmi-sk-row-${variant}`;
  return (
    <svg viewBox="0 0 452 74" width={452} height={74} fill="none" aria-hidden="true" {...props}>
      <rect x="0" y="73" width="452" height="1" fill="#E7E7E7" />
      <g transform="translate(16 21)">
        <rect width="32" height="32" rx="8" fill="#F6F6F6" />
        {globe}
      </g>
      <rect x="64" y="28" width={w1} height="6" rx="3" fill={`url(#${id}-1)`} />
      <rect x="64" y="40" width={w2} height="6" rx="3" fill="#F0F0F0" />
      <rect x="276" y="34" width="59" height="6" rx="3" fill={`url(#${id}-2)`} />
      <rect x="372" y="34" width="59" height="6" rx="3" fill={`url(#${id}-3)`} />
      <defs>
        <linearGradient id={`${id}-1`} x1="64" y1="31" x2={64 + w1} y2="31" gradientUnits="userSpaceOnUse">
          {skeletonStop}
        </linearGradient>
        <linearGradient id={`${id}-2`} x1="276" y1="37" x2="335" y2="37" gradientUnits="userSpaceOnUse">
          {skeletonStop}
        </linearGradient>
        <linearGradient id={`${id}-3`} x1="372" y1="37" x2="431" y2="37" gradientUnits="userSpaceOnUse">
          {skeletonStop}
        </linearGradient>
      </defs>
    </svg>
  );
}
