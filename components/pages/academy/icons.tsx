/** Heroicons glyphs exactly as the Framer academy template draws them (sizes and fills from the live SVG symbols). */

export function ChevronDown() {
  return (
    <span aria-hidden className="relative size-4 shrink-0 overflow-hidden">
      <svg viewBox="0 0 8 5" className="absolute top-[6px] left-[4px] h-[5px] w-[8px]" fill="none">
        <path
          d="M6.71973 0.219727C7.01262 -0.0731658 7.48738 -0.0731658 7.78027 0.219727C8.07317 0.51262 8.07317 0.98738 7.78027 1.28027L4.53027 4.53027C4.23738 4.82317 3.76262 4.82317 3.46973 4.53027L0.219727 1.28027C-0.0731666 0.98738 -0.0731666 0.51262 0.219727 0.219727C0.51262 -0.0731666 0.98738 -0.0731666 1.28027 0.219727L4 2.93945L6.71973 0.219727Z"
          fill="#6D6D6D"
        />
      </svg>
    </span>
  );
}

export function ChevronLeft() {
  return (
    <span aria-hidden className="relative size-4 shrink-0 overflow-hidden">
      <svg viewBox="0 0 5 8" className="absolute top-[4px] left-[5px] h-[8px] w-[5px]" fill="none">
        <path
          d="M3.46973 0.219727C3.76262 -0.0731666 4.23738 -0.0731666 4.53027 0.219727C4.82317 0.51262 4.82317 0.98738 4.53027 1.28027L1.81055 4L4.53027 6.71973C4.82317 7.01262 4.82317 7.48738 4.53027 7.78027C4.23738 8.07317 3.76262 8.07317 3.46973 7.78027L0.219727 4.53027C-0.0731665 4.23738 -0.0731665 3.76262 0.219727 3.46973L3.46973 0.219727Z"
          fill="#6D6D6D"
        />
      </svg>
    </span>
  );
}

export function ChevronRight() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0" fill="none">
      <path
        d="M7.28027 4.21973C6.98738 3.92683 6.51262 3.92683 6.21973 4.21973C5.92683 4.51262 5.92683 4.98738 6.21973 5.28027L8.93945 8L6.21973 10.7197C5.92683 11.0126 5.92683 11.4874 6.21973 11.7803C6.51262 12.0732 6.98738 12.0732 7.28027 11.7803L10.5303 8.53027C10.8232 8.23738 10.8232 7.76262 10.5303 7.46973L7.28027 4.21973Z"
        fill="white"
      />
    </svg>
  );
}

export function Clock() {
  return (
    <span aria-hidden className="relative size-4 shrink-0 overflow-hidden">
      <svg viewBox="0 0 14 14" className="absolute top-px left-px size-[13.2px]" fill="none">
        <path
          d="M6.6 2C6.93137 2 7.2 2.26863 7.2 2.6V6H9.6C9.93137 6 10.2 6.26863 10.2 6.6C10.2 6.93137 9.93137 7.2 9.6 7.2H6.6C6.26863 7.2 6 6.93137 6 6.6V2.6C6 2.26863 6.26863 2 6.6 2Z"
          fill="#B0B0B0"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 6.6C0 2.95492 2.95492 0 6.6 0C10.2451 0 13.2 2.95492 13.2 6.6C13.2 10.2451 10.2451 13.2 6.6 13.2C2.95492 13.2 0 10.2451 0 6.6ZM6.6 1.2C3.61766 1.2 1.2 3.61766 1.2 6.6C1.2 9.58234 3.61766 12 6.6 12C9.58234 12 12 9.58234 12 6.6C12 3.61766 9.58234 1.2 6.6 1.2Z"
          fill="#B0B0B0"
        />
      </svg>
    </span>
  );
}

export function Play() {
  return (
    <span aria-hidden className="absolute top-1/2 left-[52%] size-12 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
      <svg viewBox="0 0 30 36" className="absolute top-[6px] left-[9px] h-[36px] w-[30px]" fill="none">
        <path
          d="M0 3.60645C0 0.772571 3.12326 -0.95076 5.52051 0.560547L27.9453 14.6982C30.1852 16.1106 30.1853 19.3768 27.9453 20.7891L5.52051 34.9258C3.12327 36.4371 2.50175e-05 34.7147 0 31.8809V3.60645Z"
          fill="black"
        />
      </svg>
    </span>
  );
}
