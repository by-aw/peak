/** Framer code-component pill: 12/18 Inter 500, 3px 8px padding, 4px radius. */
export function Badge({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-[4px] px-2 py-[3px] font-sans text-[12px] leading-[18px] font-medium tracking-[0.01em] whitespace-nowrap ${className}`}
    >
      {label}
    </span>
  );
}

export const neutralBadge = "bg-[#F1EFE8] text-[#5F5E5A]";

/** Category slug -> pill label and colours (Framer code component maps `H` and `U`). */
export const categoryBadges: Record<string, { label: string; className: string }> = {
  "new-feature": { label: "New", className: "bg-[#E1F5EE] text-[#0F6E56]" },
  improvement: { label: "Improved", className: "bg-[#FAEEDA] text-[#633806]" },
  fix: { label: "Fixed", className: "bg-[#FAECE7] text-[#993C1D]" },
  intelligence: { label: "AI", className: "bg-[#EEEDFE] text-[#3C3489]" },
};

export const platformLabels: Record<string, string> = { ios: "iOS", web: "Web", backend: "Backend" };
