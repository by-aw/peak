import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

/**
 * /calculator hero (Framer "hero", clipped, white): the cloud strip (2880x542, width 100%, aspect 5.545) behind
 * the "See How Much More You Could Be Making with Mochi" heading. Top padding 152px on tablet/desktop (nav
 * clearance) and 120px on phone; 30px below the heading (24px gap + a 6px empty "founders" row), so the hero is
 * 278px tall on desktop and 294px on phone. This page's own desktop breakpoint is 1220px, not the site's 1200px.
 *
 * The mascot sticker is absolutely placed in the text box (percent offsets per breakpoint, tuned by hand in
 * Framer) over the 10 literal spaces before "Mochi", which `whitespace-pre-wrap` keeps open for it.
 */
export function CalculatorHero() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-clip px-4 pt-[120px] md:px-8 md:pt-[152px]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 aspect-[5.54545]">
        <Image src="/framer/oSwt9seLcU3Z5YLgcuCu44uCZA.png" alt="" fill preload sizes="100vw" className="object-cover object-top" />
      </div>
      <div className="relative flex w-full flex-col items-center gap-6">
        <div className="flex w-full max-w-[954px] flex-col items-center gap-10">
          <div className="relative flex w-full max-w-[350px] flex-col items-center gap-8 md:max-w-[700px] min-[1220px]:max-w-none">
            <div
              aria-hidden
              className="absolute top-[calc(84.7222%_-_24px)] left-[calc(45.4286%_-_23.5px)] z-[1] h-12 w-[47px] md:top-[calc(84.0278%_-_30px)] md:left-[calc(34.1429%_-_29.5px)] md:h-[60px] md:w-[59px] min-[1220px]:top-[calc(76.0417%_-_30px)] min-[1220px]:left-[calc(69.6017%_-_29.5px)]"
            >
              <Image src="/framer/3nzdPUhcUAxPI2aY8ZyhK0jHHc0.svg" alt="" width={82} height={82} loading="eager" className="size-full object-cover" />
            </div>
            <Reveal
              y={25}
              viewport={{ once: true, amount: 0 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              className="w-full max-w-none min-[1220px]:max-w-[800px]"
            >
              <h1 className="font-display text-center text-[36px] leading-9 font-semibold tracking-[0.72px] break-words whitespace-pre-wrap text-ink-3 md:text-[48px] md:leading-12 md:tracking-[0.96px]">
                See How Much More You
                <br />
                {"Could Be Making with          Mochi"}
              </h1>
            </Reveal>
          </div>
        </div>
        <div aria-hidden className="h-1.5 w-full max-w-[250px]" />
      </div>
    </section>
  );
}
