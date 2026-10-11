import Link from "next/link";

/**
 * Framer "Group 94" logo used on the funnel pages (/demo, /demo-jia, /spot-confirmed): an 88x20 box with the
 * 21x18 mochi blob at (0, 1) and the Clash Display 600 20.22px "mochi" wordmark at x 27 (61px wide, Framer's
 * 3.01px line height, vertically centred in the 20px row). Not the site nav logo (components/icons/mochi-logo.tsx),
 * which follows the newer Figma design.
 */
export function FunnelLogo({ href, className = "" }: { href?: string; className?: string }) {
  const content = (
    <>
      <MochiBlob className="absolute top-px left-0 h-[18px] w-[21px]" />
      <span className="absolute top-0 left-[27px] flex h-5 w-[61px] items-center">
        <span className="font-display text-[20.22px] leading-[3.01px] font-semibold tracking-[-0.02em] whitespace-nowrap text-black">mochi</span>
      </span>
    </>
  );
  const cls = `relative block h-5 w-[88px] shrink-0 ${className}`;
  return href ? (
    <Link href={href} className={cls} aria-label="Mochi home">
      {content}
    </Link>
  ) : (
    <div className={cls} aria-label="Mochi">
      {content}
    </div>
  );
}

/** The 21x18 mochi blob from Framer's "Group 94" (filters and gradients as exported from Figma). */
function MochiBlob({ className }: { className?: string }) {
  return (
    <svg className={className} width="21" height="18" viewBox="0 0 21 18" fill="none" aria-hidden>
      <g filter="url(#fl-blob-0)">
        <path
          d="M11.6051 16.5766C8.94393 16.9893 1.55163 17.5456 1.62251 10.1355C1.71879 0.0697849 15.9321 -2.17152 19.1212 7.37609C21.469 14.4048 14.2642 16.1504 11.6051 16.5766Z"
          fill="url(#fl-blob-p0)"
        />
        <path
          d="M1.12941 10.1306C1.23115 -0.491182 16.2234 -2.8553 19.5888 7.21973C20.2024 9.05672 20.2062 10.5954 19.7791 11.8748C19.3528 13.1518 18.5144 14.1193 17.5351 14.8476C15.6165 16.2742 13.0856 16.8345 11.729 17.0553L11.7292 17.0563L11.6356 17.071L11.6355 17.07C10.277 17.2774 7.69575 17.5235 5.43077 16.7563C4.27493 16.3648 3.17942 15.7022 2.38084 14.6184C1.58077 13.5324 1.11089 12.0673 1.12941 10.1306Z"
          stroke="url(#fl-blob-p1)"
          strokeWidth="0.985866"
        />
      </g>
      <g filter="url(#fl-blob-1)">
        <ellipse cx="8.98523" cy="5.09101" rx="4.6815" ry="2.67049" transform="rotate(-18.5829 8.98523 5.09101)" fill="url(#fl-blob-p2)" />
      </g>
      <g filter="url(#fl-blob-2)">
        <ellipse cx="8.78854" cy="8.25593" rx="1.1091" ry="0.588412" transform="rotate(-21.2832 8.78854 8.25593)" fill="#B555E0" />
      </g>
      <g filter="url(#fl-blob-3)">
        <ellipse cx="14.4731" cy="6.48262" rx="1.1091" ry="0.55121" transform="rotate(-19.6763 14.4731 6.48262)" fill="#B555E0" />
      </g>
      <path
        d="M7.94357 5.55858C8.48765 5.39166 9.10111 5.81765 9.31355 6.51012C9.5258 7.20249 9.25683 7.89901 8.71284 8.0659C8.16878 8.23273 7.55528 7.80678 7.34285 7.11436C7.13043 6.42195 7.39959 5.72558 7.94357 5.55858ZM13.632 3.81211C14.1761 3.64519 14.7895 4.07118 15.002 4.76366C15.2144 5.45613 14.9453 6.15251 14.4012 6.31943C13.8572 6.4861 13.2446 6.0601 13.0322 5.36776C12.8199 4.67549 13.0882 3.97921 13.632 3.81211Z"
        fill="url(#fl-blob-p3)"
      />
      <path
        d="M9.96289 8.9071C10.5776 9.29965 11.3714 9.43821 12.1569 9.22341C12.9423 9.0086 13.5551 8.48537 13.8846 7.83464"
        stroke="black"
        strokeWidth="1.12415"
        strokeLinecap="round"
      />
      <ellipse cx="7.54141" cy="6.53135" rx="0.468396" ry="0.562075" transform="rotate(-7.58367 7.54141 6.53135)" fill="white" />
      <ellipse cx="13.2543" cy="4.70714" rx="0.468396" ry="0.562075" transform="rotate(-7.58367 13.2543 4.70714)" fill="white" />
      <g filter="url(#fl-blob-4)">
        <circle cx="2.05389" cy="7.23052" r="2.05389" fill="url(#fl-blob-p4)" />
        <circle cx="2.05389" cy="7.23052" r="2.46466" stroke="white" strokeWidth="0.821555" />
      </g>
      <defs>
        <filter id="fl-blob-0" x="0.63623" y="-1.26542" width="21.3307" height="19.613" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="0.575088" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.41166 0 0 0 0 0.108371 0 0 0 0 0.545464 0 0 0 0.12 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="1.39664" dy="-2.79329" />
          <feGaussianBlur stdDeviation="0.780477" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.716814 0 0 0 0 0.0684685 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
        </filter>
        <filter id="fl-blob-1" x="2.49458" y="0.180612" width="12.9815" height="9.82078" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="0.985866" />
        </filter>
        <filter id="fl-blob-2" x="6.50058" y="6.34335" width="4.57599" height="3.82514" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="0.616166" />
        </filter>
        <filter id="fl-blob-3" x="12.1798" y="4.61081" width="4.58674" height="3.7436" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="0.616166" />
        </filter>
        <filter id="fl-blob-4" x="-3.12213" y="3.20493" width="10.3517" height="10.3516" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="1.15018" />
          <feGaussianBlur stdDeviation="1.15018" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.33 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <linearGradient id="fl-blob-p0" x1="10.4337" y1="1.3966" x2="10.4337" y2="12.5697" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DC89FF" />
          <stop offset="1" stopColor="#D471FF" />
        </linearGradient>
        <linearGradient id="fl-blob-p1" x1="9.21205" y1="1.4008" x2="11.6051" y2="16.5767" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="#F6FAFF" />
        </linearGradient>
        <linearGradient id="fl-blob-p2" x1="8.98523" y1="2.42052" x2="8.98523" y2="7.7615" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0CCFF" />
          <stop offset="1" stopColor="#D87EFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fl-blob-p3" x1="10.393" y1="4.47865" x2="11.2702" y2="7.7752" gradientUnits="userSpaceOnUse">
          <stop stopColor="#494949" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient id="fl-blob-p4" x1="2.05389" y1="5.17664" x2="2.05389" y2="9.28441" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BBF749" />
          <stop offset="1" stopColor="#4BF4B6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Chevron of Framer's form select (`framer-form-select-wrapper::before`): 16px, #999, 1.5px round stroke. */
export function SelectChevron({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M 3.5 6 L 8 10.5 L 12.5 6" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
