export type FilterOption<T extends string> = { label: string; slug: T };

export const typeOptions: FilterOption<"all" | "new-feature" | "improvement" | "fix" | "intelligence">[] = [
  { label: "All", slug: "all" },
  { label: "New", slug: "new-feature" },
  { label: "Improved", slug: "improvement" },
  { label: "Fixed", slug: "fix" },
  { label: "AI", slug: "intelligence" },
];

export const platformOptions: FilterOption<"all" | "web" | "ios" | "backend">[] = [
  { label: "All", slug: "all" },
  { label: "Web", slug: "web" },
  { label: "iOS", slug: "ios" },
  { label: "Backend", slug: "backend" },
];

/**
 * "Filter by type:" / "Filter by platform:" row. Tablet/desktop: label and buttons in one wrapping row, 8px
 * gaps, 4px 8px buttons. Phone: label stacked over the buttons (6px), 4px 12px buttons. The active button is
 * ink for "All" and purple for the rest, the others grey 6% with 50% ink text.
 */
export function FilterRow<T extends string>({
  label,
  options,
  active,
  onChange,
}: {
  label: string;
  options: FilterOption<T>[];
  active: T;
  onChange: (slug: T) => void;
}) {
  return (
    <div className="flex flex-col flex-nowrap items-center justify-center gap-1.5 md:flex-row md:flex-wrap md:gap-2">
      <span className="shrink-0 font-sans text-[12px] leading-[normal] font-normal whitespace-nowrap text-[rgba(23,23,24,0.7)]">{label}</span>
      <div className="flex flex-wrap justify-center gap-2">
        {options.map((o) => {
          const isActive = active === o.slug;
          const activeColor = o.slug === "all" ? "bg-[#171718]" : "bg-[#A855F7]";
          return (
            <button
              key={o.slug}
              type="button"
              onClick={() => onChange(o.slug)}
              aria-pressed={isActive}
              className={`cursor-pointer rounded-[4px] border-none px-3 py-1 font-sans text-[12px] leading-[18px] font-medium outline-none transition-all duration-200 ease-[cubic-bezier(0.34,1.2,0.64,1)] md:px-2 ${
                isActive ? `${activeColor} text-white` : "bg-[rgba(23,23,24,0.06)] text-[rgba(23,23,24,0.5)]"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
