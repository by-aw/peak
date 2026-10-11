import Image from "next/image";
import type { ReactNode } from "react";
import {
  FlowGlyphIcon,
  InstagramGlyphIcon,
  Link02Icon,
  LinkMicroIcon,
  LiveCheckIcon,
  RadarGlyphIcon,
  ReadyBoltIcon,
} from "./icons";
import { SectionHeading, SectionText } from "./section-intro";

const glyphSquare = "relative size-6 shrink-0 overflow-clip rounded-[8px]";
const white = "shadow-[0_0_0_0.5px_#e0e0e0,0_1px_2px_0_rgba(0,0,0,0.05)]";

/** Header row of a timeline step: 24px coloured icon, title, grey timestamp at the right. */
function Head({ icon, title, time, align = "items-center" }: { icon: ReactNode; title: string; time: string; align?: string }) {
  return (
    <div className="flex w-full items-center gap-2.5">
      {icon}
      <div className={`flex flex-1 justify-between ${align}`}>
        <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-black">{title}</p>
        <p className="text-right text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre text-gray-500">{time}</p>
      </div>
    </div>
  );
}

/** Body row under a header: 24px connector column with its 1px line, then the content. */
function Body({ children, hideLine = false, className = "" }: { children: ReactNode; hideLine?: boolean; className?: string }) {
  return (
    <div className={`flex w-full items-stretch gap-0.5 ${className}`}>
      <div className="flex w-6 shrink-0 flex-col items-center justify-center overflow-clip">
        <div className={`w-px flex-1 rounded-full bg-black/10 ${hideLine ? "opacity-0" : ""}`} />
      </div>
      {children}
    </div>
  );
}

/** Framer "Live Section": copy + "< 5 min setup" pill next to the timeline card (Instagram connected -> tracking live). */
export function LiveSection() {
  return (
    <section className="order-4 flex w-full items-center justify-center md:order-none">
      <div className="flex w-full flex-1 items-center justify-center px-5 py-12 md:px-8 md:py-16 lg:p-[100px]">
        <div className="relative flex w-full max-w-[1000px] flex-1 flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
          <div className="flex w-full flex-col items-start gap-5 md:flex-1 md:basis-0 md:gap-4 lg:w-[482px] lg:flex-none">
            <SectionHeading className="w-full text-balance md:text-wrap">Live in under 5 minutes. See what’s making you money.</SectionHeading>
            <SectionText className="w-full max-w-[440px]">Mochi connects every conversation, leads, and sale back to the Reel, Story, or source that started it, automatically.</SectionText>
            <div className="relative flex items-center justify-center gap-2 rounded-full bg-[#11ba52]/10 px-2.5 py-2 after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:border after:border-[#11ba52]/[0.56]">
              <p className="text-[14px] leading-[19.6px] font-medium tracking-[-0.2px] whitespace-pre text-[#11ba52]">&lt; 5 min setup</p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center overflow-clip rounded-[32px] bg-[#f7f7f7] p-6 md:max-w-[428px] md:flex-1 md:basis-0 md:p-7">
            <div className="flex w-full flex-col items-start gap-4 md:gap-6">
              {/* Channel connected */}
              <div className="flex w-full flex-col items-start gap-2">
                <Head
                  icon={
                    <div className={`${glyphSquare} bg-[#3b82f6]`}>
                      <InstagramGlyphIcon className="absolute top-[5px] left-[5px] size-[14px]" />
                    </div>
                  }
                  title="Channel connected"
                  time="Jul 14, 10:14 AM"
                />
                <Body className="h-5">
                  <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-1.5 px-0.5">
                    <div className="flex w-full items-center gap-3">
                      <Image src="/framer/KouTHLyCrzoeCTka2ukMAtbWiw.png" alt="" width={20} height={20} className="size-5 shrink-0 rounded-full object-cover" />
                      <p className="min-w-0 flex-1 text-[14px] leading-[14px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">Profile verified</p>
                    </div>
                  </div>
                </Body>
              </div>

              {/* Smart links generated */}
              <div className="flex w-full flex-col items-start gap-2">
                <Head
                  icon={
                    <div className={`${glyphSquare} bg-[#3b82f6]`}>
                      <LinkMicroIcon className="absolute top-1.5 left-1.5 size-3" />
                    </div>
                  }
                  title="Smart links generated"
                  time="10:15 AM"
                />
                <Body className="h-[108px]">
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 px-2 pb-2">
                    <div className="flex w-full flex-col items-start overflow-clip rounded-[8px] bg-[#ebebeb]">
                      <div className="flex w-full items-start gap-3 px-2 py-1.5">
                        <p className="w-full text-[14px] leading-5 font-medium tracking-[-0.2px] whitespace-pre-wrap text-black">Reel</p>
                      </div>
                      <div className={`flex w-full flex-col items-start gap-3 overflow-clip rounded-[8px] bg-white p-2 ${white}`}>
                        <div className="flex w-full items-center gap-2">
                          <div className="relative size-5 shrink-0 overflow-clip rounded-full bg-gray-500">
                            <FlowGlyphIcon className="absolute top-[5px] left-[5px] size-2.5" />
                          </div>
                          <p className="min-w-0 flex-1 text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-black">Every reel is ready to attribute</p>
                        </div>
                        <div className="flex w-full items-center gap-2">
                          <ReadyBoltIcon className="size-5 shrink-0" />
                          <p className="min-w-0 flex-1 text-[14px] leading-[14.7px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">Ready</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Body>
              </div>

              {/* Integrations connected */}
              <div className="flex w-full flex-col items-start gap-2">
                <Head
                  icon={
                    <div className={`${glyphSquare} bg-[#3b82f6]`}>
                      <LinkMicroIcon className="absolute top-1.5 left-1.5 size-3" />
                    </div>
                  }
                  title="Integrations connected"
                  time="10:16 AM"
                  align="items-start"
                />
                <Body className="h-16">
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 px-2 pb-2">
                    <div className="flex w-full items-start gap-3 rounded-[8px] bg-white p-2">
                      <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
                        <p className="max-w-[157px] text-[14px] leading-5 font-medium tracking-[-0.2px] whitespace-pre-wrap text-gray-500">Calendar, forms, and payments synced</p>
                      </div>
                      <div className="relative size-[18px] shrink-0">
                        <Link02Icon className="absolute top-px left-px size-[15px]" />
                      </div>
                    </div>
                  </div>
                </Body>
              </div>

              {/* Tracking live */}
              <div className="flex w-full flex-col items-start gap-2">
                <Head
                  icon={
                    <div className={`${glyphSquare} bg-[#10b981]`}>
                      <RadarGlyphIcon className="absolute top-1 left-[5px] size-[15px]" />
                    </div>
                  }
                  title="Tracking live"
                  time="10:17 AM"
                  align="items-start"
                />
                <Body hideLine>
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 px-2 pb-2">
                    <div className={`flex w-full flex-col items-start gap-3 overflow-clip rounded-[8px] bg-white p-2 ${white}`}>
                      <div className="flex w-full items-center gap-2">
                        <LiveCheckIcon className="size-5 shrink-0" />
                        <p className="min-w-0 flex-1 text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] whitespace-pre-wrap text-black">Live</p>
                      </div>
                      <div className="flex w-full items-center gap-2">
                        <p className="min-w-0 flex-1 text-[14px] leading-[14.7px] font-normal tracking-[-0.2px] whitespace-pre-wrap text-gray-500">All events firing</p>
                      </div>
                    </div>
                  </div>
                </Body>
              </div>
            </div>
          </div>

          <div aria-hidden className="pointer-events-none absolute right-[-92px] bottom-[-82px] z-[1] hidden h-[141px] w-[132px] lg:block">
            <Image src="/framer/kcVVuVeMbh7EFtpsjEdB7TKzuCo.png" alt="" width={736} height={784} sizes="132px" className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
