import Image from "next/image";
import { McpSection } from "./section-frame";
import { ConnectButton } from "./connect";

/**
 * Framer "CTA Section" of /mcp: a #141414 24px-radius panel with "Stop exporting data. Start asking questions.",
 * the purple connect button and the Mochi-with-wrench mascot peeking from the bottom-right corner.
 * 1440x523 / 1024x507 (16px extra bottom padding) / 390x573.
 */
export function McpCta() {
  return (
    <McpSection label="Stop exporting data. Start asking questions." wrapperClassName="md:pb-4 lg:pb-0">
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[24px] bg-[#141414] px-4 pt-16 pb-32 md:px-0 md:pb-16">
        <div className="flex w-full flex-col items-center gap-8">
          <div className="flex w-full max-w-[286px] flex-col items-center gap-4 md:max-w-[400px]">
            <p className="w-full text-center font-fraunces text-[28px] leading-[36.4px] font-semibold tracking-[-0.64px] whitespace-pre-wrap text-[#faf8f4] md:text-[32px] md:leading-[41.6px]">
              Stop exporting data. Start asking questions.
            </p>
            <p className="w-full text-center font-dm text-[16px] leading-6 font-normal whitespace-pre-wrap text-[#faf8f4]">
              Connect Mochi to Claude and get instant answers about your team, pipeline, and revenue.
            </p>
          </div>
          <div className="flex w-[258px] flex-col items-start pt-2">
            <ConnectButton className="w-full" />
          </div>
        </div>
        <div aria-hidden className="pointer-events-none absolute right-[-28px] bottom-[-48px] z-[1] h-[170px] w-[180px]">
          <Image src="/framer/pY8fVkaNWuJU6bp2Onvebgj5o.png" alt="" width={568} height={536} sizes="180px" className="h-full w-full" />
        </div>
      </div>
    </McpSection>
  );
}
