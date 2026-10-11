import { Reveal } from "@/components/ui/reveal";
import { Timeline } from "./timeline";
import { INTER_CV, sectionHeading } from "./styles";

const STEPS = [
  { title: "Lock in your spot", body: "Accept the calendar invite so our team knows you’re serious about attending and we keep the slot reserved for you." },
  { title: "Watch the pre-call video", body: "Before the call, watch the video above so you understand what Mochi installs and why 120+ info businesses are moving their DM backend to us." },
  { title: "Show up on time and prepared", body: "Bring a rough idea of your monthly DM volume, how many setters you have, and the one thing you want Mochi to fix inside your DM flow." },
  { title: "See your Mochi install plan", body: "On the call, we’ll show you what Mochi would look like inside your business and where your current backend has the biggest opportunity to book more qualified calls." },
];

/**
 * /thank-you "Path Section" ("What happens next"): heading, then the four-step card (#fafafa, 16px radius, 0.5px #e7e7e7 hairline,
 * 20px padding, steps 56px apart (40px on phone)) beside the progress `Timeline`. Each step is a purple "Step N" label (Inter 600
 * 14px, 13px on phone, 0.02em), a bold Inter title (20/24, 18/21.6 tablet, 16/19.2 phone, -0.03em) and an 80% opacity paragraph
 * (Inter 16/23.2, 14/20.3 on phone, #383840). Section padding 0/100/80 (64/48 tablet, 48/20 phone), content at most 1000px wide
 * with a 64px gap (48 tablet, 32 phone). The heading fades up (y 48) and the timeline (y 64) like on live.
 */
export function ThankYouPath() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-2">
      <div className="flex w-full flex-col items-center justify-center px-5 py-12 md:px-12 md:py-16 lg:px-[100px] lg:pt-0 lg:pb-20">
        <div className="flex w-full max-w-[1000px] flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16">
          <Reveal delay={0} viewport={{ once: true }} className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full flex-col items-center gap-2">
              <div className="w-full max-w-[762px]">
                <h3 className={sectionHeading}>What happens next</h3>
              </div>
            </div>
          </Reveal>
          <Reveal y={64} delay={0} viewport={{ once: true }} className="flex w-full max-w-[770px] flex-col">
            <Timeline>
              <div className="relative flex w-px flex-1 items-center gap-2 rounded-2xl bg-[#fafafa] p-5 after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border-[0.5px] after:border-[#e7e7e7] after:content-['']">
                <div className="flex w-px flex-1 flex-col gap-10 md:gap-14">
                  {STEPS.map((step, i) => (
                    <div key={step.title} id={i === STEPS.length - 1 ? "bar-fill" : undefined} className="flex w-full flex-col gap-3 md:gap-4">
                      <p className="w-full text-[13px] leading-[17.55px] font-semibold tracking-[0.26px] whitespace-pre-wrap text-[#a855f7] md:text-[14px] md:leading-[18.9px] md:tracking-[0.28px]">Step {i + 1}</p>
                      <div className="flex w-full flex-col gap-2">
                        <p className={`w-full text-[16px] leading-[19.2px] font-bold tracking-[-0.48px] break-words whitespace-pre-wrap text-ink-3 md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px] lg:text-[20px] lg:leading-6 lg:tracking-[-0.6px] ${INTER_CV}`}>
                          {step.title}
                        </p>
                        <p className={`w-full text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] break-words whitespace-pre-wrap text-[#383840] opacity-80 md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px] ${INTER_CV}`}>
                          {step.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Timeline>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
