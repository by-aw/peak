import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { ZapierSection } from "./section";
import { AppsLinesIcon } from "./icons";

/**
 * Framer "Apps Section" of /zapier: the "Works with your favorite apps" tag on a fan of connector lines and the
 * 752x105 row of app logos. 1440x362 / 1024x330 / 390x229.
 */
export function ZapierApps() {
  return (
    <ZapierSection label="Works with your favorite apps" className="overflow-hidden">
      <Reveal y={48} delay={0.2} className="flex w-full max-w-[752px] flex-col items-center gap-2">
        <div className="relative aspect-[4.59218] w-full max-w-[411px]">
          <div className="absolute top-0 left-1/2 z-[1] flex -translate-x-1/2 items-center justify-center gap-2 rounded-[12px] bg-[#fbfbfb] px-2.5 py-2">
            <div className="opacity-80">
              <p className="text-center text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] whitespace-pre text-ink-3 md:text-[16px] md:leading-6 md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px]">
                Works with your favorite apps
              </p>
            </div>
          </div>
          <AppsLinesIcon className="absolute inset-x-6 top-[22px] h-[68px] w-[calc(100%-48px)] md:inset-x-0 md:w-full" />
        </div>
        <Image src="/framer/7WvHwRstbbGLr5NIFhBOHs8UrQ.png" alt="" width={3008} height={416} sizes="(min-width: 810px) 752px, 100vw" className="aspect-[7.16191] w-full object-contain" />
      </Reveal>
    </ZapierSection>
  );
}
