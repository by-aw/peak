import { CONTAINER, H3, LEAD, WRAPPER, line } from "@/components/shared/attribution/grid";
import { CheckCircleIcon, MochiLogoMarkIcon, XCircleIcon } from "@/components/icons/attribution-icons";
import { COMPARISON, COMPARISON_COLUMNS, type ComparisonValue } from "./data";

const mochiLine = "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-[#d88ff8]";

function Value({ value, mobile = false }: { value: ComparisonValue; mobile?: boolean }) {
  if (value === "yes") {
    return (
      <span className="size-5 shrink-0">
        <CheckCircleIcon />
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="size-5 shrink-0">
        <XCircleIcon />
      </span>
    );
  }
  const color = value.color ?? (mobile ? "text-gray-500" : "text-gray-550");
  return (
    <p className={`text-center font-medium whitespace-pre ${color} ${value.color ? "text-[14px] leading-[16.8px]" : mobile ? "text-[14px] leading-[16.8px]" : "text-[14px] leading-[15.4px]"}`}>
      {value.text}
    </p>
  );
}

function MochiWordmark() {
  return (
    <span className="flex items-center gap-[6.67px]">
      <span className="h-[19px] w-5 shrink-0">
        <MochiLogoMarkIcon />
      </span>
      <span className="font-display text-[20.22px] leading-5 font-medium tracking-[-0.4px] whitespace-nowrap text-black">mochi</span>
    </span>
  );
}

/**
 * Framer "Comparison Section": "Not a link shortener. Not an ad tracker." and the Mochi vs Bitly vs Hyros
 * feature table (highlighted Mochi column). On phone every row becomes a stack of three pill cells.
 */
export function ComparisonSection() {
  const last = COMPARISON.length - 1;
  const cell = (i: number) => line(i < last ? "after:border-b" : "");
  return (
    <section className="flex w-full flex-col items-center">
      <div className={`${WRAPPER} ${line("after:border-b")}`}>
        <div className={`${CONTAINER} ${line("after:border-x")} flex flex-col items-center`}>
          <div className={`${line("after:border-b")} flex w-full flex-col items-center gap-4 px-4 py-12 md:px-0 md:py-16`}>
            <div className="flex w-full flex-col items-center gap-2">
              <h3 className={`${H3} w-full max-w-[492px] whitespace-pre-wrap`}>
                Not a link shortener.
                <br />
                Not an ad tracker.
              </h3>
              <p className={`${LEAD} w-full max-w-[504px] whitespace-pre-wrap opacity-80`}>
                Bitly gives you click counts. Hyros tracks your ad funnels. Neither was built for teams selling in DMs. Mochi was.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center py-10 md:py-16">
            {/* tablet / desktop table */}
            <div className="hidden w-full items-start md:flex">
              <div className="flex shrink-0 flex-col items-start">
                <div className="h-[52px] w-full" />
                {COMPARISON.map((row, i) => (
                  <div key={row.label} className={`${cell(i)} flex h-[52px] w-full items-center overflow-hidden p-4 lg:pl-6`}>
                    <p className="flex-1 text-[16px] leading-[23.2px] font-medium tracking-[-0.16px] whitespace-pre text-gray-750">{row.label}</p>
                  </div>
                ))}
              </div>
              <div className={`relative flex flex-1 basis-0 flex-col items-start rounded-[20px] bg-gray-25 ${mochiLine}`}>
                <div className="flex h-[52px] w-full items-center justify-center overflow-hidden p-4">
                  <MochiWordmark />
                </div>
                {COMPARISON.map((row, i) => (
                  <div key={row.label} className={`${cell(i)} flex h-[52px] w-full items-center justify-center overflow-clip`}>
                    <Value value={row.mochi} />
                  </div>
                ))}
              </div>
              {(["bitly", "hyros"] as const).map((key) => (
                <div key={key} className="flex flex-1 basis-0 flex-col items-start">
                  <div className="flex h-[52px] w-full items-center justify-center overflow-hidden p-4">
                    <p className="text-[16px] leading-[23.2px] font-normal tracking-[-0.16px] whitespace-pre text-[#383840]">{COMPARISON_COLUMNS[key]}</p>
                  </div>
                  {COMPARISON.map((row, i) => (
                    <div key={row.label} className={`${cell(i)} flex h-[52px] w-full items-center justify-center overflow-clip`}>
                      <Value value={row[key]} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* phone stack */}
            <div className="flex w-full flex-col items-start gap-10 px-4 md:hidden">
              {COMPARISON.map((row) => (
                <div key={row.label} className="flex w-full flex-col items-center gap-5">
                  <p className="w-full text-center text-[16px] leading-[19.2px] font-medium whitespace-pre-wrap text-[#7e7e7e]">{row.label}</p>
                  <div className="flex w-full flex-col items-start gap-3">
                    <div className={`relative flex w-full items-center justify-between overflow-hidden rounded-[16px] p-4 ${mochiLine}`}>
                      <MochiWordmark />
                      <Value value={row.mochi} mobile />
                    </div>
                    {(["bitly", "hyros"] as const).map((key) => (
                      <div key={key} className={`${line("after:border")} flex w-full items-center justify-between overflow-hidden rounded-[16px] p-4`}>
                        <p className="text-center text-[14px] leading-[16.8px] font-medium whitespace-pre text-gray-500">{COMPARISON_COLUMNS[key]}</p>
                        <Value value={row[key]} mobile />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
