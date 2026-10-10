/* Icons used inside the mockups of the attribution sub-pages (youtube-tracking, tracking-pixel, lead-profiles). */
import type { SVGProps } from "react";

/** heroicons-micro/currency-dollar (14px, #6d6d6d). */
export function DollarCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 14" width={14} height={14} fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0ZM7 2C6.58579 2 6.25 2.33579 6.25 2.75V3H5.375C4.06332 3 3 4.06332 3 5.375C3 6.68668 4.06332 7.75 5.375 7.75H6.25V9.5H3.75C3.33579 9.5 3 9.83579 3 10.25C3 10.6642 3.33579 11 3.75 11H6.25V11.25C6.25 11.6642 6.58579 12 7 12C7.41421 12 7.75 11.6642 7.75 11.25V11H8.625C9.93668 11 11 9.93668 11 8.625C11 7.31332 9.93668 6.25 8.625 6.25H7.75V4.5H10.25C10.6642 4.5 11 4.16421 11 3.75C11 3.33579 10.6642 3 10.25 3H7.75V2.75C7.75 2.33579 7.41421 2 7 2ZM8.625 7.75C9.10825 7.75 9.5 8.14175 9.5 8.625C9.5 9.10825 9.10825 9.5 8.625 9.5H7.75V7.75H8.625ZM6.25 6.25H5.375C4.89175 6.25 4.5 5.85825 4.5 5.375C4.5 4.89175 4.89175 4.5 5.375 4.5H6.25V6.25Z"
        fill="#6D6D6D"
      />
    </svg>
  );
}

/** heroicons-micro/face-frown (14px, #6d6d6d). */
export function FaceFrownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 14" width={14} height={14} fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0ZM10.0049 10.2441C8.34523 8.58484 5.65476 8.58484 3.99512 10.2441C3.70224 10.537 3.70228 11.0118 3.99512 11.3047C4.28801 11.5976 4.76277 11.5976 5.05566 11.3047C6.12953 10.2312 7.87047 10.2312 8.94434 11.3047C9.23723 11.5976 9.71199 11.5976 10.0049 11.3047C10.2977 11.0118 10.2978 10.537 10.0049 10.2441ZM5 4C4.44772 4 4 4.67157 4 5.5C4 6.32843 4.44772 7 5 7C5.55228 7 6 6.32843 6 5.5C6 4.67157 5.55228 4 5 4ZM9 4C8.44771 4 8 4.67157 8 5.5C8 6.32843 8.44771 7 9 7C9.55229 7 10 6.32843 10 5.5C10 4.67157 9.55229 4 9 4Z"
        fill="#6D6D6D"
      />
    </svg>
  );
}

/** Horizontal dashed divider used around the "VS" tag (178x3, #e7e7e7, dash 4/4). */
export function DashedDividerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-1 -1 178 3" width="100%" height={3} preserveAspectRatio="none" fill="none" aria-hidden="true" {...props}>
      <line y1="0.5" x2="175.5" y2="0.5" stroke="#E7E7E7" strokeDasharray="4 4" />
    </svg>
  );
}

/** Globe glyph on a #f6f6f6 rounded tile (32x32), used by the domain tables of the pixel mockups. */
export function GlobeTileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" width={32} height={32} fill="none" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="8" fill="#F6F6F6" />
      <path d="M23.5 16C23.5 20.1422 20.1422 23.5 16 23.5C11.8579 23.5 8.5 20.1422 8.5 16C8.5 11.8579 11.8579 8.5 16 8.5C20.1422 8.5 23.5 11.8579 23.5 16Z" stroke="#6D6D6D" strokeWidth="1.66667" strokeLinecap="square" />
      <path d="M23.5 16H8.5" stroke="#6D6D6D" strokeWidth="1.66667" strokeLinecap="square" />
      <path d="M16.0026 23.5C14.3918 23.5 13.0859 20.1422 13.0859 16C13.0859 11.8579 14.3918 8.5 16.0026 8.5C17.6134 8.5 18.9193 11.8579 18.9193 16C18.9193 20.1422 17.6134 23.5 16.0026 23.5Z" stroke="#6D6D6D" strokeWidth="1.66667" strokeLinecap="square" />
    </svg>
  );
}
