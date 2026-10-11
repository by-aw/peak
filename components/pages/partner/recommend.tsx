import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { Appear } from "./appear";
import { AnalyticsIcon, HeartCircleIcon, MoneyBagIcon, ShieldCheckIcon } from "./icons";
import { cardBody, cardTitle, leadText, sectionHeading } from "./styles";

type Entry = {
  title: string;
  body: string;
  image: { src: string; width: number; height: number };
  /** Tablet/desktop shape height; on phone every shape is 196px tall. */
  shape: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Offset of the glyph inside its 48px circle (Framer positions each SVG by hand). */
  iconClass: string;
  /** Tablet/desktop appear effect: the lists rise from 64/80/96/112px, staggered by 0.1s each; on phone all rise 64px at once. */
  rise: { y: number; delay: number };
};

const ENTRIES: Entry[] = [
  {
    title: "Find the conversations that matter",
    body: "See who is qualified, who needs a reply and who is ready for the next step — instead of only answering the newest messages.",
    image: { src: "/framer/Klz9jEJmE7xwgM0pOnTtjz7vBkc.png", width: 940, height: 1060 },
    shape: "md:h-[265px]",
    Icon: HeartCircleIcon,
    iconClass: "top-[3px] left-[3px]",
    rise: { y: 64, delay: 0 },
  },
  {
    title: "Pick up where the conversation left off",
    body: "Keep the context next to the conversation so the next reply reflects what the person already told the team.",
    image: { src: "/framer/6jVo1oDToDMBlIMbkuoTl3J4M0c.png", width: 940, height: 920 },
    shape: "md:h-[230px]",
    Icon: MoneyBagIcon,
    iconClass: "top-[3px] left-[5px]",
    rise: { y: 80, delay: 0.1 },
  },
  {
    title: "See what leads to calls and customers",
    body: "Understand which sources, follow-ups and conversations move people forward, and where interested people stop.",
    image: { src: "/framer/91jxHiT19uW4D0CYkJKODZG8A.png", width: 940, height: 784 },
    shape: "md:h-[196px]",
    Icon: ShieldCheckIcon,
    iconClass: "top-[3px] left-[4px]",
    rise: { y: 96, delay: 0.2 },
  },
  {
    title: "Recommend it from experience",
    body: "Share how Mochi fits your own workflow. Help another business decide whether it fits theirs.",
    image: { src: "/framer/tmx4YkDbBPJ9cbSloNUCjTMM.png", width: 940, height: 696 },
    shape: "md:h-[174px]",
    Icon: AnalyticsIcon,
    iconClass: "top-[3px] left-[3px]",
    rise: { y: 112, delay: 0.3 },
  },
];

/**
 * One column of "Recommend a better way to handle DMs.": a text item with a dashed 1px #e7e7e7 rule on its left, and
 * under it a purple 48px-radius (24px on phone) tile with a white 48px glyph circle. On tablet/desktop the four columns are
 * as tall as the first one and the tiles hang from the bottom, which is why their heights (265 / 230 / 196 / 174) step down.
 */
function Column({ entry, first }: { entry: Entry; first: boolean }) {
  const { title, body, image, shape, Icon, iconClass, rise } = entry;
  return (
    <Appear
      y={rise.y}
      delay={rise.delay}
      phone={{ y: 64, delay: 0 }}
      className={
        first
          ? "flex w-full flex-col gap-5 md:w-px md:flex-1 md:gap-16"
          : "flex w-full flex-col justify-center gap-5 md:w-px md:flex-1 md:justify-between md:gap-0 md:self-stretch"
      }
    >
      <div className="relative flex w-full flex-col gap-3 px-3 after:pointer-events-none after:absolute after:inset-0 after:border-l after:border-dashed after:border-[#e7e7e7]">
        <p className={`w-full ${cardTitle}`}>{title}</p>
        <p className={`w-full text-gray-550 ${cardBody}`}>{body}</p>
      </div>
      <div className={`relative h-[196px] w-full overflow-hidden rounded-[24px] md:rounded-[48px] ${shape}`}>
        <Image
          src={image.src}
          alt=""
          width={image.width}
          height={image.height}
          sizes="(min-width: 1200px) calc((min(100vw - 200px, 1150px) - 60px) / 4), (min-width: 810px) calc((min(100vw - 96px, 1150px) - 60px) / 4), calc(100vw - 40px)"
          className="absolute inset-0 size-full object-fill"
        />
        <div className="absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 text-white">
          <Icon className={`absolute ${iconClass}`} />
        </div>
      </div>
    </Appear>
  );
}

/**
 * Framer "Stacked Section": left-aligned "Recommend a better way to handle DMs." heading and lead, then four columns
 * (a row of 272.5px columns on desktop, 217px on tablet; stacked 32px apart on phone). Padding 80/100 (64/48 tablet,
 * 48/20 phone); heights 982 / 849 / 1637.
 */
export function PartnerRecommend() {
  return (
    <section className="relative flex w-full flex-col items-center" aria-label="Recommend a better way to handle DMs">
      <div className="flex w-full flex-col items-center px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
        <div className="flex w-full max-w-[1150px] flex-col items-start gap-12 md:gap-16 lg:gap-20">
          <Appear y={48} className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full flex-col items-start gap-2">
              <h3 className={`w-full max-w-[250px] text-left md:max-w-[398px] ${sectionHeading}`}>Recommend a better way to handle DMs.</h3>
              <p className={`w-full max-w-[418px] text-left ${leadText}`}>
                Someone asked about buying. Another person is ready to book. Mochi helps a founder or team see who needs attention and what should happen
                next.
              </p>
            </div>
          </Appear>
          <div className="flex w-full flex-col items-end gap-8 md:flex-row md:gap-5">
            {ENTRIES.map((entry, i) => (
              <Column key={entry.title} entry={entry} first={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
