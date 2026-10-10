import Image from "next/image";

type Row = { thumb: string; title: string; titleWidth: number; views: string; revenue: string; up: boolean; bar: number };

const rows: Row[] = [
  { thumb: "/framer/b84ec8lfiZasDuoAR16Vyw0VIk.jpg", title: "The exact onboarding system behind $600,000 in February", titleWidth: 158, views: "26.4k", revenue: "$14,200", up: true, bar: 412 },
  { thumb: "/framer/Q1ZAQPwkKZ974Xkvltga6Wqvs.jpg", title: "How i use Claude for my info business", titleWidth: 154, views: "52.3k", revenue: "$1,400", up: false, bar: 220 },
  { thumb: "/framer/YUPgNMFYxucsECsBOgYeROjmxbo.jpg", title: "i had to let him go...", titleWidth: 70, views: "8.2k", revenue: "$4,900", up: true, bar: 134 },
  { thumb: "/framer/nivTA89bepaleyoxpJxutXUKo.jpg", title: "what story sequences give me the highest quality buyers (in 7 steps)", titleWidth: 72, views: "11.2k", revenue: "$720", up: false, bar: 69 },
  { thumb: "/framer/urd1z721xnY0t2B6Yw7tszYgdC4.jpg", title: "i removed his limiting beliefs, now he is starting his own personal brand", titleWidth: 128, views: "7.4k", revenue: "$3,200", up: true, bar: 64 },
];

/**
 * "Video Revenue" table mockup (Framer "Card" 432x263 on tablet/desktop; 318x489 stacked rows on phone).
 * Each row has a grey bar behind it whose width follows the revenue.
 */
export function RevenueTable() {
  return (
    <div className="relative flex w-full max-w-[432px] flex-col overflow-hidden rounded-[16px] bg-white after:pointer-events-none after:absolute after:inset-0 after:rounded-[16px] after:border after:border-[#e7e7e7]">
      <div className="flex items-center gap-1 p-4">
        <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] text-black">Video Revenue</p>
      </div>
      <div className="relative flex flex-col gap-2 rounded-t-[16px] p-2.5 after:pointer-events-none after:absolute after:inset-0 after:rounded-t-[16px] after:border-t after:border-[#e7e7e7]">
        <div className="flex flex-col gap-2 md:gap-1">
          {rows.map((row) => (
            <div key={row.title} className="relative flex flex-col py-2">
              <div aria-hidden className="absolute inset-0 z-0 flex items-center">
                <div className="h-full w-full rounded-[8px] bg-[#f5f5f5] md:w-(--bar)" style={{ "--bar": `${row.bar}px` } as React.CSSProperties} />
              </div>
              <div className="relative flex flex-col gap-4 px-2.5 md:flex-row md:items-center md:justify-between md:gap-0">
                <div className="flex items-center gap-2">
                  <div className="relative aspect-video w-[57px] shrink-0 overflow-hidden rounded-[4px] md:w-[39px]">
                    <Image src={row.thumb} alt="" width={1280} height={720} sizes="57px" className="h-full w-full object-cover" />
                  </div>
                  <p
                    className="flex-1 truncate text-[14px] leading-[16.1px] font-normal tracking-[-0.2px] text-black md:w-(--tw) md:flex-none md:leading-[14.7px]"
                    style={{ "--tw": `${row.titleWidth}px` } as React.CSSProperties}
                  >
                    {row.title}
                  </p>
                </div>
                <div className="flex items-center justify-between md:gap-4">
                  <p className="text-right text-[14px] leading-[14px] font-normal tracking-[-0.2px] text-gray-500">{row.views}</p>
                  <div className="flex w-16 items-center justify-end">
                    <p className={`text-right text-[14px] leading-[14px] font-medium tracking-[-0.2px] ${row.up ? "text-[#65d17d]" : "text-[#e05d5e]"}`}>{row.revenue}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
