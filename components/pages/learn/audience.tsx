import { Reveal } from "@/components/ui/reveal";
import { AlertCircleIcon, CheckCircleIcon } from "./icons";
import { SectionHeading } from "./section-heading";

const NOT_FOR_YOU = ["You do not have a clear offer yet.", "You don’t have any DM volume", "Instagram DMs are not part of your funnel."];

const FOR_YOU = [
  "You sell coaching, consulting, courses, communities, or high-ticket offers.",
  "Instagram DMs are part of your sales process.",
  "You have appointment setters or serious DM volume.",
  "You want more qualified booked calls from the leads you already have.",
  "You want to know exactly what is happening inside your inbox in real time.",
  "Your current backend is too messy for the level you want to scale to.",
];

/** Hairline under a list row (Framer `data-border` with a 0.5px bottom edge), drawn over the row so it adds no height. */
const rowLine = "after:pointer-events-none after:absolute after:inset-0 after:border-b-[0.5px]";

/**
 * One list row: an 18px icon in a 20px box, then the text (Inter 400, white; 18/27px, 16/24px on tablet, 15/22.5px on
 * phone, -0.36/-0.32/-0.3px), inside 18px (16px on phone) of vertical padding. `line` is the colour class of its
 * bottom hairline (none on the last row of the purple card).
 */
function Row({ icon, line, children }: { icon: React.ReactNode; line?: string; children: string }) {
  return (
    <div className={`relative flex w-full flex-col items-start py-4 md:py-[18px] ${line ? `${rowLine} ${line}` : ""}`}>
      <div className="flex w-full items-center gap-2.5">
        <div className="relative aspect-square w-5 shrink-0">
          <div className="absolute top-px left-px size-[18px]">{icon}</div>
        </div>
        <p className="w-px flex-1 text-left text-[15px] leading-[22.5px] tracking-[-0.3px] whitespace-pre-wrap text-white md:text-[16px] md:leading-[24px] md:tracking-[-0.32px] lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.36px]">
          {children}
        </p>
      </div>
    </div>
  );
}

/**
 * Framer "Leak Section (old)": the #fafafa band "Mochi is built for info businesses already selling through DMs" with two
 * stacked cards, "This is not for you if:" (black, 1px #e7e7e7 border, grey alert bullets) and "This is for you if:"
 * (purple #9333ea -> #a855f7 gradient, check bullets). Cards: 24px radius, 32px padding (24px on tablet and phone), title
 * Inter 500 18/22.5px (16/20px on phone), 20px (32px on tablet) between title and list. Container at most 770px, 32px (64px from tablet) under the heading.
 */
export function Audience() {
  return (
    <section className="relative flex w-full items-center justify-center bg-[#fafafa]">
      <div className="flex w-full flex-1 items-center justify-center px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
        <div className="flex w-full max-w-[770px] flex-1 flex-col items-center gap-8 md:gap-16">
          <SectionHeading maxWidth={762} tabletMaxWidth={602}>
            Mochi is built for info businesses already selling through DMs
          </SectionHeading>
          <div className="flex w-full flex-col items-start gap-5">
            <Reveal
              y={64}
              className="relative flex w-full flex-col items-start justify-start overflow-hidden rounded-[24px] bg-black p-6 after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-[#e7e7e7] lg:p-8"
            >
              <div className="flex w-full flex-col items-start gap-5 md:gap-8 lg:gap-5">
                <p className="w-full text-[16px] leading-5 font-medium text-white md:text-[18px] md:leading-[22.5px]">This is not for you if:</p>
                <div className="flex w-full flex-col items-start">
                  {NOT_FOR_YOU.map((text) => (
                    <Row key={text} icon={<AlertCircleIcon />} line="after:border-white">
                      {text}
                    </Row>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal
              y={64}
              className="relative flex w-full flex-col items-start justify-start overflow-hidden rounded-[24px] bg-linear-to-b from-purple-600 to-purple-500 p-6 after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-[#f2f2f2] lg:p-8"
            >
              <div className="flex w-full flex-col items-start gap-5 md:gap-8 lg:gap-5">
                <p className="w-full text-[16px] leading-5 font-medium text-white md:text-[18px] md:leading-[22.5px]">This is for you if:</p>
                <div className="flex w-full flex-col items-start">
                  {FOR_YOU.map((text, i) => (
                    <Row key={text} icon={<CheckCircleIcon />} line={i < 4 ? "after:border-[#e7e7e7]" : i === 4 ? "after:border-white" : undefined}>
                      {text}
                    </Row>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
