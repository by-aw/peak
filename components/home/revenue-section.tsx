import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { RevenueDesktop } from "./revenue-desktop";

/** Phone variant ("Mobile Revenue Content"): three stacked image + copy blocks, in the live site's visual order. */
const mobileStacks = [
  {
    label: "Ask Mochi",
    heading: "See exactly where revenue is leaking",
    body: "Connect Mochi AI to Claude via MCP to chat with conversations, automations, and sales data. Uncover bottlenecks and discover opportunities.",
    src: "/framer/olRuGYZTBVZ1rFwyr27XIL8yjk.png",
  },
  {
    label: "Funnel Dashboard",
    heading: "See exactly where revenue is leaking",
    body: "Mochi connects every conversation, setter action, funnel stage and lead source in one live view. See what needs fixing before another opportunity goes cold.",
    src: "/framer/YwSNElC51gjQxQOgPMKOjiz2eZY.png",
  },
  {
    label: "Performance Reports",
    heading: "Know if the work is actually getting done",
    body: "Mochi connects every conversation, setter action, funnel stage and lead source in one live view. See what needs fixing before another opportunity goes cold.",
    src: "/framer/34VS7d4XslKaGfuVt0q8TfyM.webp",
  },
];

/**
 * Framer "Revenue Section" of the home page.
 * - phone: stacked mockup images with label / heading / paragraph (no CTA)
 * - tablet / desktop: tabbed product mockup with header and CTA (see RevenueDesktop)
 */
export function RevenueSection() {
  return (
    <section className="flex w-full items-center justify-center overflow-clip">
      <div className="flex w-full flex-1 items-center justify-center px-5 py-12 md:px-8 md:py-16 lg:px-[100px] lg:py-20">
        <div className="flex w-full max-w-[1000px] flex-1 flex-col items-center gap-8 md:gap-12">
          {/* phone */}
          <div className="flex w-full flex-col items-center gap-14 overflow-clip md:hidden">
            {mobileStacks.map((s) => (
              <Reveal key={s.label} y={80} className="flex w-full flex-col items-center overflow-clip">
                <div className="w-full overflow-clip [mask-image:linear-gradient(#000_74%,rgba(0,0,0,0)_91%)]">
                  <Image src={s.src} alt="" width={1336} height={1248} sizes="350px" className="h-auto w-full" />
                </div>
                <div className="flex w-full flex-col gap-[14px]">
                  <p className="text-[15px] font-normal leading-[21.75px] tracking-[-0.3px] text-gray-800 whitespace-pre-wrap">{s.label}</p>
                  <h3 className="font-display text-[32px] font-semibold leading-[35.2px] tracking-[1px] text-ink whitespace-pre-wrap">
                    {s.heading}
                  </h3>
                  <p className="text-[16px] font-normal leading-[22.4px] tracking-[-0.24px] text-gray-800 whitespace-pre-wrap">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {/* tablet / desktop */}
          <div className="hidden w-full md:block">
            <RevenueDesktop />
          </div>
        </div>
      </div>
    </section>
  );
}
