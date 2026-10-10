import Image from "next/image";
import { AppGridIcon, GlobeIcon } from "@/components/icons/download-icons";

export const TESTFLIGHT_URL = "https://testflight.apple.com/join/4qFmNv8s";
export const WEB_APP_URL = "https://use.themochi.app/";

/**
 * Download page "Hero Section": centered title + copy, the dark iOS / Web segmented pill, two text links and
 * the "phone in hand" mockup that fades out along the bottom. Heights: 1209 (desktop) / 1105 (tablet) / 955 (phone).
 */
export function DownloadHero() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-clip">
      <div className="flex w-full flex-col items-center overflow-clip px-5 pt-16 [mask-image:linear-gradient(#000_87%,rgba(0,0,0,0)_95%)] md:px-12 md:pt-20 md:pb-16 md:[mask-image:none] lg:px-[100px] lg:pb-0">
        <div className="flex w-full max-w-[1200px] flex-col items-center gap-10 overflow-clip md:gap-12 lg:gap-14">
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-col items-center gap-8 md:w-[594px] lg:w-full">
              <div className="flex w-full flex-col items-center gap-4 md:gap-5 lg:gap-4">
                <h1 className="w-full text-center font-display text-[32px] leading-[36.8px] font-bold tracking-[0.64px] whitespace-pre-wrap text-ink-3 md:text-[40px] md:leading-[46px] md:tracking-[0.8px] lg:text-[48px] lg:leading-[55.2px] lg:tracking-[0.96px]">
                  Download Mochi
                </h1>
                <p className="w-full text-center text-[15px] leading-[22.5px] font-normal tracking-[-0.3px] whitespace-pre-wrap text-gray-750 md:text-[16px] md:leading-[24px] md:tracking-[-0.32px] lg:w-[610px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px]">
                  Open Mochi in your browser, or download it for iOS and iPadOS. Keep your conversations moving wherever you work.
                </p>
              </div>
              <div className="flex w-full items-center justify-center gap-4">
                <div className="flex shrink-0 items-center justify-center gap-[10px] overflow-hidden rounded-[70px] bg-[rgba(0,0,0,0.85)] p-[3px] backdrop-blur-[2.5px]">
                  <a
                    href={TESTFLIGHT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-[6px] overflow-hidden rounded-[70px] bg-purple-500 px-[14px] py-3"
                  >
                    <AppGridIcon className="shrink-0" />
                    <span className="text-[14px] leading-[15.4px] font-medium whitespace-pre text-white">Download for iOS</span>
                  </a>
                  <a
                    href={WEB_APP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-[6px] overflow-hidden px-[14px] py-3 text-[rgba(255,255,255,0.75)]"
                  >
                    <span className="flex size-[19px] flex-col items-center justify-start">
                      <GlobeIcon className="shrink-0" />
                    </span>
                    <span className="text-[14px] leading-[15.4px] font-medium whitespace-pre">Open Mochi Web</span>
                  </a>
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-[10px] md:w-[594px] lg:w-[610px]">
                <p className="w-full text-center text-[14px] leading-[18.2px] font-normal whitespace-pre-wrap md:leading-[16.8px]">
                  <span className="text-gray-750">Don’t have an account yet? </span>
                  <a href="https://use.themochi.app/login" className="text-ink-3 hover:underline">
                    Start your free 7-day <br className="md:hidden" />
                    trial
                  </a>
                </p>
                <p className="w-full text-center text-[14px] leading-[18.2px] font-normal whitespace-pre-wrap md:leading-[16.8px]">
                  <span className="text-gray-750">Want to learn more first? </span>
                  <a href="/demo" className="text-ink-3 hover:underline">
                    Book a call
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-[518px] max-w-none shrink-0 aspect-[742/791] md:w-[603px] lg:w-[742px]">
            <div className="absolute bottom-[-9.99%] left-[19.27%] w-[86.52%] aspect-[642/870]">
              <Image
                src="/framer/fYkHYl4K7wXL8nlPUEBWMSIZ4.png"
                alt="Mochi on an iPhone"
                width={930}
                height={1260}
                preload
                sizes="(min-width: 1200px) 642px, (min-width: 810px) 521px, 449px"
                className="absolute inset-0 h-full! w-full object-cover"
              />
              <div className="absolute top-[1.84%] left-[12.62%] w-[45.33%] overflow-hidden rounded-[30px] aspect-[291/625] md:rounded-[35px] lg:rounded-[43px]">
                <Image
                  src="/framer/UC9KkQhIMa2xt4nXKEKpZgCfJI.png"
                  alt=""
                  width={880}
                  height={1912}
                  preload
                  sizes="(min-width: 1200px) 291px, (min-width: 810px) 236px, 203px"
                  className="absolute inset-0 h-full! w-full object-cover"
                />
              </div>
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-x-[-669px] bottom-0 h-[16.2%] bg-[linear-gradient(rgba(255,255,255,0)_0%,#fff_100%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
