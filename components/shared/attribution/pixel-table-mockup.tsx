import { GlobeTileIcon, SkeletonDomainCell, SkeletonTableRow } from "@/components/icons/pixel-mockup-icons";

type Props = {
  /** Headers of the two value columns (e.g. "Views" / "Forms"). */
  columns: [string, string];
  /** Values of the two data rows. */
  rows: [[string, string], [string, string]];
};

const cellHead = "flex h-full w-[82px] shrink-0 items-center justify-center p-4";
const cellValue = "flex h-full w-[82px] shrink-0 items-center justify-center p-4";
const value = "w-[50px] text-center text-[14px] leading-[14.7px] font-normal tracking-[-0.2px] text-ink-3";
const head = "text-center text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-[#6d6d6d]";

/**
 * Domain table mockup (Framer "Table", 423x340) used by the "Domain verification" and
 * "Scroll depth & time on page" cards: header row, one real domain row, then skeleton rows that run
 * past the right edge and get clipped by the 12px-radius frame.
 */
export function PixelTableMockup({ columns, rows }: Props) {
  return (
    <div className="relative flex w-full max-w-[423px] flex-col overflow-hidden rounded-[12px] after:pointer-events-none after:absolute after:inset-0 after:rounded-[12px] after:border after:border-[#e7e7e7]">
      <div className="relative flex h-11 w-full bg-gray-25 after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-[#e7e7e7]">
        <div className="flex h-full flex-1 items-center p-4">
          <p className="w-full text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] text-[#6d6d6d]">Domain</p>
        </div>
        <div className={cellHead}>
          <p className={head}>{columns[0]}</p>
        </div>
        <div className={cellHead}>
          <p className={head}>{columns[1]}</p>
        </div>
      </div>
      <div className="relative flex h-[74px] w-full after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-[#e7e7e7]">
        <div className="flex h-full flex-1 items-start gap-4 overflow-hidden p-4">
          <GlobeTileIcon className="size-8 shrink-0" />
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="flex items-center py-[3px]">
              <p className="flex-1 text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] text-black">coachwebsite.com/vsl</p>
            </div>
            <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] text-[#6d6d6d]">Updated 2m ago</p>
          </div>
        </div>
        <div className={cellValue}>
          <p className={value}>{rows[0][0]}</p>
        </div>
        <div className={cellValue}>
          <p className={value}>{rows[0][1]}</p>
        </div>
      </div>
      <div className="relative flex h-[74px] w-full after:pointer-events-none after:absolute after:inset-0 after:border-b after:border-[#e7e7e7]">
        <div className="h-full flex-1 overflow-hidden">
          <SkeletonDomainCell className="h-[74px] w-[260px]" preserveAspectRatio="none" />
        </div>
        <div className={cellValue}>
          <p className={value}>{rows[1][0]}</p>
        </div>
        <div className={cellValue}>
          <p className={value}>{rows[1][1]}</p>
        </div>
      </div>
      <div className="h-[74px] w-[452px] shrink-0">
        <SkeletonTableRow variant="a" className="h-[74px] w-[452px]" />
      </div>
      <div className="h-[74px] w-[452px] shrink-0">
        <SkeletonTableRow variant="b" className="h-[74px] w-[452px]" />
      </div>
    </div>
  );
}
