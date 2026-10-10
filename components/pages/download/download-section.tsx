import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { FeatureHeading } from "@/components/shared/feature-heading";
import { ComputerIcon, SmartphoneIcon, TabletIcon } from "@/components/icons/download-icons";
import { Dock } from "./dock";
import { PhoneParallax } from "./phone-parallax";

const PLATFORMS: { icon: ReactNode; title: string; description: string }[] = [
  { icon: <ComputerIcon />, title: "Web App", description: "Open your Mochi workspace in your browser. No download required." },
  { icon: <ComputerIcon />, title: "Mobile browser", description: "Open your inbox in your phone’s browser. No installation required." },
  { icon: <SmartphoneIcon />, title: "iOS", description: "Get Mochi on your iPhone. Install through TestFlight and sign in to your account." },
  { icon: <TabletIcon />, title: "iPadOS", description: "Use Mochi on your iPad and manage your conversations on a bigger screen." },
];

/**
 * Download page "Download Section": heading + copy, the interactive dock, the macOS wallpaper mockup with the
 * Safari window and iPhone (tablet/desktop) or just the iPhone (phone), and the four platform cards.
 * Heights: 1581 (desktop) / 1472 (tablet) / 1560 (phone).
 */
export function DownloadSection() {
  return (
    <section className="relative z-[2] flex w-full flex-col items-center overflow-clip px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20" aria-label="Use Mochi across your devices">
      <div className="flex w-full max-w-[1200px] flex-col items-center">
        <div className="flex w-full max-w-[928px] flex-col items-center gap-10 md:gap-12 lg:max-w-[1100px] lg:gap-16">
          <Reveal y={48} delay={0.2} className="flex w-full flex-col items-center gap-2">
            <FeatureHeading align="left" className="max-w-[700px]">
              Use Mochi across your devices
            </FeatureHeading>
            <p className="w-full max-w-[476px] text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] whitespace-pre-wrap text-ink-3 opacity-80 md:text-[16px] md:leading-[24px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px]">
              Use Mochi on the web, your iPhone, or your iPad. Choose the option that works for you.
            </p>
          </Reveal>
          <Reveal y={48} delay={0.2} className="scale-[0.7] md:scale-100">
            <Dock />
          </Reveal>
          <div className="flex w-full flex-col items-center gap-6 md:gap-8">
            <div className="relative h-[500px] w-full overflow-hidden rounded-[16px] md:h-[720px]">
              <Image
                src="/framer/lnSeKvf4hmVmBM3ar75lX62X4g8.png"
                alt=""
                width={3024}
                height={1964}
                sizes="(min-width: 1200px) 1100px, (min-width: 810px) 928px, 100vw"
                className="absolute inset-0 h-full! w-full object-cover"
              />
              <div className="absolute top-[638px] left-1/2 z-[7] hidden -translate-x-1/2 md:block">
                <Dock variant="static" />
              </div>
              {/* phone: lone iPhone; tablet/desktop: Safari window + iPhone */}
              <div className="pointer-events-none absolute inset-x-4 top-[-80px] bottom-[-137px] z-[7] md:hidden">
                <PhoneParallax className="absolute inset-x-[-9px] top-[78px] bottom-[-1px]">
                  <Image src="/framer/ptuGZSs7ykoGQIc8JwBBeTfW9Y.png" alt="" width={1344} height={2560} sizes="336px" className="absolute inset-0 h-full! w-full object-contain" />
                </PhoneParallax>
              </div>
              <div className="pointer-events-none absolute top-[104px] right-[-336px] z-[7] hidden h-[717px] w-[1197px] md:block">
                <div className="absolute top-0 bottom-[26px] left-[278px] z-[1] w-[919px] overflow-hidden rounded-[17.23px] shadow-[0_41.6422px_48.1039px_0_rgba(0,0,0,0.09),0_2.87187px_20.1031px_0_rgba(0,0,0,0.25),0_2.87187px_14.3594px_0_rgba(0,0,0,0.16)] inset-ring-1 inset-ring-[rgba(0,0,0,0.08)]">
                  <div className="absolute inset-x-0 top-[38px] bottom-0 backdrop-blur-[25px]">
                    <Image src="/framer/YFtXMup4ThkILMRWJjLSgRCazds.png" alt="" width={2880} height={2048} sizes="919px" className="absolute inset-0 h-full! w-full object-cover" />
                  </div>
                  <div className="absolute inset-x-0 top-0 h-[38px] overflow-hidden rounded-t-[8px]">
                    <Image src="/framer/mPCPHD0xASPxT5oGkw6f55BL47g.png" alt="" width={1838} height={77} sizes="919px" className="absolute inset-0 h-full! w-full object-cover" />
                  </div>
                </div>
                <div className="absolute top-[93px] left-[-35px] z-0 h-[640px] w-[336px]">
                  <Image src="/framer/ptuGZSs7ykoGQIc8JwBBeTfW9Y.png" alt="" width={1344} height={2560} sizes="336px" className="absolute inset-0 h-full! w-full object-contain" />
                </div>
              </div>
            </div>
            <Reveal y={150} delay={0.2} className="flex w-full flex-col items-center gap-4 md:grid md:grid-cols-2 md:gap-5">
              {PLATFORMS.map((p, i) => (
                <div
                  key={p.title}
                  className={`flex flex-col items-start gap-4 rounded-[16px] bg-gray-25 p-5 inset-ring-1 inset-ring-gray-150 md:w-full ${i === 3 ? "w-full" : "w-[320px]"}`}
                >
                  <span className="flex size-9 items-center justify-start gap-2 rounded-[6px] bg-[#fcfcfc] p-2 inset-ring-1 inset-ring-[#e6e6e6]">
                    <span className="flex size-5 items-center justify-center">{p.icon}</span>
                  </span>
                  <div className="flex w-full flex-col items-start gap-[6px]">
                    <p className="w-full text-[15px] leading-[21.75px] font-medium tracking-[-0.15px] whitespace-pre-wrap text-ink-3 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">{p.title}</p>
                    <p className="w-full text-[14px] leading-[18.2px] font-normal whitespace-pre-wrap text-[rgba(82,82,82,0.8)] md:leading-[16.8px]">{p.description}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
