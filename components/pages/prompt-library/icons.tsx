/** Clipboard glyph of the Framer copy button: 14px, 1.2px grey (#808080) strokes on a 16px grid. */
export function ClipboardIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={`block ${className}`.trim()} aria-hidden>
      <rect x="4.5" y="2.5" width="7" height="2" rx="1" stroke="#808080" strokeWidth="1.2" />
      <path d="M3.5 4.5h9a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z" stroke="#808080" strokeWidth="1.2" />
    </svg>
  );
}
