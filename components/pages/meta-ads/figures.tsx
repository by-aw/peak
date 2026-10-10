import Image from "next/image";

const FIGURES = [
  { value: "30–50%", label: "lower cost per lead", gradient: "bg-[linear-gradient(321deg,#c26de8_0%,#a9c1f2_49.1937%,#1150ee_100%)]" },
  { value: "Day 1", label: "instead of week 8", gradient: "bg-[linear-gradient(23deg,#bc3bf4_0%,#3b8fef_100%)]" },
  { value: "5 min", label: "to set up", gradient: "bg-[linear-gradient(321deg,#be36fa_0%,#51a1f7_100%)]" },
];

const hairline = "after:pointer-events-none after:absolute after:inset-0 after:border-[#e7e5e5]";

/**
 * Framer "Figures" strip right under the hero: three bordered stat cells (gradient Clash Display number,
 * DM Sans caption) and the tilted Mochi sticker hanging over the right edge. 1440x141 / 1024x125 / 390x306.
 */
export function MetaAdsFigures() {
  return (
    <div className={`relative flex w-full flex-col items-center px-4 md:px-10 lg:px-[100px] ${hairline} after:border-y`}>
      <div className="relative flex w-full max-w-[1200px] flex-col md:flex-row md:items-center">
        {FIGURES.map((f, i) => (
          <div
            key={f.value}
            className={`relative flex w-full flex-col items-start bg-white p-6 md:flex-1 md:basis-0 lg:p-8 ${hairline} after:border-r after:border-b after:border-l md:after:border-t md:after:border-l-0 ${
              i === 0 ? "after:border-t md:after:border-l" : ""
            }`}
          >
            <div className="flex w-full flex-col items-center gap-1 md:gap-2">
              <p className="text-center">
                <span
                  className={`inline-block bg-clip-text font-display text-[24px] leading-[27.6px] font-semibold text-transparent md:text-[40px] md:leading-[46px] ${f.gradient}`}
                >
                  {f.value}
                </span>
              </p>
              <p className="text-center font-dm text-[15px] leading-[22.5px] font-normal text-[#6b5e4f]">{f.label}</p>
            </div>
          </div>
        ))}
        <div
          aria-hidden
          className="pointer-events-none absolute top-[153.14px] left-[339px] z-[1] w-[68px] -translate-y-[48.92px] -rotate-[5deg] md:top-[62.25px] md:left-[925px] lg:top-[70.25px] lg:left-[1181px]"
        >
          <Image src="/framer/NhLBNVzSf1Ll6QmPKvN3G6PxdQ.png" alt="" width={244} height={392} className="h-auto w-full" />
        </div>
      </div>
    </div>
  );
}
