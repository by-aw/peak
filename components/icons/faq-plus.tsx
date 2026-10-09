import type { ComponentProps } from "react";

/**
 * Framer FAQ "Icon" (plus sign, 29x29). Rotated 45deg by the parent when the item is open.
 * Fill follows `currentColor` (purple-500 closed, black open).
 */
export function FaqPlusIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 28.284 28.284" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true" {...props}>
      <path d="M 4.143 24.142 L 4.143 4.142 L 24.143 4.142 L 24.143 24.142 Z" fill="transparent" />
      <path d="M 14.142 28.284 L 0 14.142 L 14.142 0 L 28.284 14.142 Z" fill="transparent" />
      <path
        d="M 4.937 14.142 C 4.937 13.452 5.496 12.892 6.187 12.892 L 12.892 12.892 L 12.892 6.187 C 12.892 5.497 13.451 4.937 14.142 4.937 C 14.832 4.937 15.392 5.497 15.392 6.187 L 15.392 12.892 L 22.097 12.892 C 22.787 12.892 23.347 13.452 23.347 14.142 C 23.347 14.832 22.787 15.392 22.097 15.392 L 15.392 15.392 L 15.392 22.097 C 15.392 22.787 14.832 23.347 14.142 23.347 C 13.451 23.347 12.892 22.787 12.892 22.097 L 12.892 15.392 L 6.187 15.392 C 5.496 15.392 4.937 14.833 4.937 14.142 Z"
        fill="currentColor"
      />
    </svg>
  );
}
