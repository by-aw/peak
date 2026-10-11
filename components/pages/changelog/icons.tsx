/** Entry chevron: 16x16 circle + caret, rotates 180deg when the entry is open (Framer code component default arrow). */
export function EntryChevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={`shrink-0 transition-transform duration-200 ease-[ease] ${expanded ? "rotate-180" : "rotate-0"}`}
    >
      <circle cx="8" cy="8" r="7.5" stroke="rgba(23,23,24,0.15)" />
      <path d="M5 6.5L8 9.5L11 6.5" stroke="rgba(23,23,24,0.50)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
