"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { InstagramGlyph } from "@/components/icons/feature-icons";

export type CarouselCreator = { name: string; src: string };

/** Creators shown on the feature pages' "Trust Section 2" ring (Framer order). */
export const FEATURE_CREATORS: CarouselCreator[] = [
  { name: "vnce", src: "/framer/HJL0Rja9qauJ2daMPeDB3YawVfw.png" },
  { name: "difaino", src: "/framer/Maau1tzRYHn1dEGpAskQtAyvJNQ.png" },
  { name: "nik setting", src: "/framer/7LJdHP5s0pYuhW9QZBL9aOLBVgk.jpg" },
  { name: "joshua kaats", src: "/framer/ENiCevUgtsoy3C7K8rIDTMgLfzc.png" },
  { name: "fxalex", src: "/framer/3WsqBhn75h8NjEqcwnNnORpnOXc.png" },
  { name: "alex eubank", src: "/framer/zOHqiJ0yml47Nkd0W65bZXfwn8.png" },
  { name: "daniel budden", src: "/framer/9nvCPQyjj4cBxceAbvGVMmXGwY.jpg" },
  { name: "ebrahim", src: "/framer/uCBQMrfxN3Jq5nzwmLmOko7evEA.png" },
  { name: "maxxinhouse", src: "/framer/w9hoSnD21kTcj0vCVIsMGwDqDp0.jpg" },
];

const START_ANGLE = 31;

/**
 * Framer 3D carousel ("Trust Section 2" on the feature pages): 18 creator cards (the 9 creators twice)
 * placed every 20deg on a ring of radius 1427px (1367px on phones) seen through a 1200/800/500px
 * perspective, slowly spinning (3.6deg/s, i.e. one turn per 100s) after a 1s pause. The ring box is
 * 400px tall, masked at the left/right edges and scaled 1.2x on desktop.
 */
export function CreatorCarousel({
  creators = FEATURE_CREATORS,
  ringClassName = "h-[200px] md:h-[327px] lg:h-[520px]",
  gapClassName = "gap-2 md:gap-12 lg:gap-0",
}: {
  creators?: CarouselCreator[];
  /** Height of the ring box per breakpoint (the integration pages use a shorter 256/356px ring). */
  ringClassName?: string;
  /** Gap between the empty 107px header and the ring per breakpoint. */
  gapClassName?: string;
}) {
  const cards = [...creators, ...creators];
  return (
    <section className="relative flex w-full items-center justify-center" aria-label="Creators using Mochi">
      <div className="flex w-full flex-1 items-center justify-center px-5 pt-12 pb-4 md:px-12 md:py-16 lg:px-0 lg:pt-20 lg:pb-0">
        <div className={`flex w-full max-w-[1360px] flex-1 flex-col items-center ${gapClassName}`}>
          <div aria-hidden className="min-h-[107px] w-full" />
          <div className={`relative flex w-full flex-col items-center justify-center ${ringClassName}`}>
            <div className="absolute top-1/2 left-0 z-[2] h-[400px] w-full -translate-y-1/2 lg:scale-[1.2]">
              <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_right,rgba(0,0,0,0)_2%,#000_9%,#000_91%,rgba(0,0,0,0)_98%)]">
                <div className="absolute inset-0 [perspective:500px] md:[perspective:800px] lg:[perspective:1200px]">
                  <div className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
                    <motion.div
                      className="absolute h-full w-full [transform-style:preserve-3d]"
                      initial={{ rotateY: START_ANGLE }}
                      animate={{ rotateY: START_ANGLE + 360 }}
                      transition={{ duration: 100, ease: "linear", repeat: Infinity, delay: 1 }}
                    >
                      {cards.map((c, i) => (
                        <div
                          key={`${c.name}-${i}`}
                          className="absolute top-1/2 left-1/2 h-[488px] w-[393px] [backface-visibility:hidden] [transform:translate(-50%,-50%)_rotateY(var(--ry))_translateZ(-1367px)] md:[transform:translate(-50%,-50%)_rotateY(var(--ry))_translateZ(-1427px)]"
                          style={{ "--ry": `${-20 * i}deg` } as React.CSSProperties}
                        >
                          <div className="flex h-full w-full flex-col items-center justify-center gap-[10px] overflow-clip rounded-[26px] bg-gray-25 p-2 shadow-[inset_0_0_0_0.5px_#e7e7e7]">
                            <div className="relative h-[412px] w-full overflow-hidden rounded-[26px]">
                              <Image src={c.src} alt="" width={512} height={512} sizes="400px" className="absolute inset-0 h-full w-full object-cover" />
                            </div>
                            <div className="flex w-full flex-col items-center px-3 pt-1 pb-3">
                              <div className="flex w-full items-center justify-between">
                                <p className="text-[23px] leading-[33.51px] font-medium text-black">{c.name}</p>
                                <InstagramGlyph />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
