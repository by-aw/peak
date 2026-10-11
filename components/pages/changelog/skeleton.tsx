const bar = "bg-[rgba(23,23,24,0.08)]";

/** Loading placeholder: two date groups of three rows (a date bar, then chip, chip and headline bars). */
export function ChangelogSkeleton() {
  return (
    <div className="w-full">
      {[1, 2].map((g) => (
        <div key={g} className="mb-8 border-b border-[rgba(23,23,24,0.10)] pb-8">
          <div className={`mb-4 h-3 w-[110px] rounded-[4px] ${bar}`} />
          {[1, 2, 3].map((r) => (
            <div key={r} className={`flex items-center gap-2.5 py-8 ${r < 3 ? "border-b border-[rgba(23,23,24,0.05)]" : ""}`}>
              <div className={`h-[22px] w-[52px] shrink-0 rounded-lg ${bar}`} />
              <div className={`h-[22px] w-11 shrink-0 rounded-lg ${bar}`} />
              <div className={`h-[13px] max-w-[55%] flex-1 rounded-[4px] ${bar}`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
