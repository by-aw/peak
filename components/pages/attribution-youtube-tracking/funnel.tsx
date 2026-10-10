import { Reveal } from "@/components/ui/reveal";
import { DollarCircleIcon, FaceFrownIcon } from "@/components/icons/attribution-mockup-icons";

const steps = [
  { label: "Clicks", value: "50", fill: "#EFF6FF", d: "M0 166.001V18.0009C0 18.0009 23.3657 10.4233 43.5 21.2753C63.6343 32.1272 87 34.5496 87 34.5496V149.452C87 149.452 63.6343 151.875 43.5 162.727C23.3657 173.579 0 166.001 0 166.001Z" },
  { label: "Visits", value: "40", fill: "#DBEAFE", d: "M-0.398438 149.555V34.614C-0.398438 34.614 22.7406 26.0914 43.1016 37.1569C63.4626 48.2224 86.6016 49.7831 86.6016 49.7831V134.386C86.6016 134.386 62.7387 136.34 43.1016 147.012C23.4644 157.684 -0.398438 149.555 -0.398438 149.555Z" },
  { label: "Forms", value: "35", fill: "#BFDBFE", d: "M-0.398438 134.234V49.8911C-0.398438 49.8911 22.7406 43.6374 43.1016 51.7571C63.4626 59.8768 86.6016 61.0221 86.6016 61.0221V123.103C86.6016 123.103 62.7387 124.537 43.1016 132.368C23.4644 140.199 -0.398438 134.234 -0.398438 134.234Z" },
  { label: "Booked", value: "30", fill: "#93C5FD", d: "M0 122.95V61.0383C0 61.0383 23.3405 56.9327 43.4741 62.408C63.6077 67.8833 86.9482 68.8218 86.9482 68.8218V115.166C86.9482 115.166 63.7147 116.076 43.4741 121.58C23.2335 127.084 0 122.95 0 122.95Z" },
  { label: "Won", value: "15", fill: "#3B82F6", d: "M-0.5 114.517V68.4863C-0.5 68.4863 22.8234 64.591 43.1512 69.5047C63.479 74.4183 86.8023 75.0157 86.8023 75.0157V107.988C86.8023 107.988 63.4728 108.587 43.1512 113.499C22.8295 118.411 -0.5 114.517 -0.5 114.517Z" },
];

/** "Conversion funnel" mockup (Framer "Card" 432x304): five hairline-separated columns with a blue funnel shape, plus a footer row. Slides in from y=64. */
export function ConversionFunnel() {
  return (
    <Reveal
      y={64}
      delay={0.2}
      className="relative flex w-[432px] max-w-full flex-col overflow-hidden rounded-[20px] bg-white after:pointer-events-none after:absolute after:inset-0 after:rounded-[20px] after:border after:border-[#e7e7e7]"
    >
      <div className="flex w-full items-center">
        {steps.map((step) => (
          <div key={step.label} className="relative flex flex-1 basis-0 flex-col overflow-hidden after:pointer-events-none after:absolute after:inset-0 after:border-r after:border-[#e7e7e7]">
            <div className="flex flex-col gap-2.5 p-4">
              <p className="text-[14px] leading-[14px] font-normal tracking-[-0.2px] text-gray-500">{step.label}</p>
              <p className="text-[16px] leading-[16px] font-medium tracking-[-0.4px] text-black">{step.value}</p>
            </div>
            <svg viewBox="0 0 87 184" width="100%" height={184} preserveAspectRatio="none" fill="none" aria-hidden="true" className="block h-[184px] w-full">
              <path d={step.d} fill={step.fill} />
            </svg>
          </div>
        ))}
      </div>
      <div className="relative flex items-center gap-4 p-4 after:pointer-events-none after:absolute after:inset-0 after:border-t after:border-[#e7e7e7]">
        <div className="flex items-center gap-1.5">
          <span className="flex size-4 items-center justify-center">
            <DollarCircleIcon />
          </span>
          <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500">5 deposits</p>
        </div>
        <div aria-hidden className="h-3 w-px rounded-full border border-[#e7e7e7]" />
        <div className="flex items-center gap-1.5">
          <span className="flex size-4 items-center justify-center">
            <FaceFrownIcon />
          </span>
          <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500">Unqualified Leads: 20%</p>
        </div>
      </div>
    </Reveal>
  );
}
