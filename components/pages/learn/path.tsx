import { Timeline } from "./timeline";
import { SectionHeading } from "./section-heading";

const STEPS = [
  { label: "Rollout 1", title: "Apply", text: "Tell us about your business, your DM volume, and how your current sales process works." },
  {
    label: "Rollout 2",
    title: "DM Backend Audit",
    text: "We review your current setup, look at your numbers, and show you where Mochi could create the biggest lift. If we see a clear path to 20% more booked calls, we'll show you how we'd install Mochi.",
  },
  { label: "Rollout 3", title: "Team Onboarding", text: "Your setters start using Mochi, your leads start getting organized, and your backend starts collecting the data your team needs." },
  { label: "Rollout 4", title: "Scale", text: "We use the data to improve follow-up, setter performance, and booked-call volume so your team can push for a new record month." },
];

/**
 * Framer "Path Section": "What Happens After You Apply" over the four-step rollout card beside the progress pill (`Timeline`).
 * Section padding 48/20, 64/48 and 80/100px (120px at the bottom from 1752px); content at most 1000px wide, 32 / 48 / 64px
 * under the heading. Card: #fafafa, 16px radius, 0.5px #e7e7e7 border, 20px padding, steps 40px (56px) apart. Step label:
 * Inter 600 13/17.55px (14/18.9px) +0.26px (+0.28px) tracking, #a855f7; title: Inter 600 16/19.2px, 18/21.6px, 20/24px,
 * #1d1d20, -0.48/-0.54/-0.6px; text: Inter 400 14/20.3px (16/23.2px), #383840 at 80%.
 */
export function Path() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center gap-2">
      <div className="flex w-full flex-col items-center justify-center px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:py-20 min-[1752px]:pb-[120px]">
        <div className="flex w-full max-w-[1000px] flex-col items-center gap-8 md:gap-12 lg:gap-16">
          <SectionHeading maxWidth={762} tabletMaxWidth={602}>
            What Happens After You Apply
          </SectionHeading>
          <Timeline>
            <div className="relative flex w-px flex-1 items-center gap-2 rounded-2xl bg-[#fafafa] p-5 after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border-[0.5px] after:border-[#e7e7e7]">
              <div className="flex w-px flex-1 flex-col items-start gap-10 md:gap-14">
                {STEPS.map((s) => (
                  <div key={s.label} className="flex w-full flex-col items-start gap-3 md:gap-4">
                    <p className="w-full text-[13px] leading-[17.55px] font-semibold tracking-[0.26px] text-purple-500 md:text-[14px] md:leading-[18.9px] md:tracking-[0.28px]">{s.label}</p>
                    <div className="flex w-full flex-col items-start gap-2">
                      <p className="w-full text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] text-[#1d1d20] md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px] lg:text-[20px] lg:leading-[24px] lg:tracking-[-0.6px]">
                        {s.title}
                      </p>
                      <p className="w-full text-[14px] leading-[20.3px] tracking-[-0.14px] whitespace-pre-wrap text-[#383840] opacity-80 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Timeline>
        </div>
      </div>
    </section>
  );
}
