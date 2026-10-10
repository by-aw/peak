import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { ZapierSection } from "./section";
import { LogoStrips } from "./why-strips";

/** Framer "Container" bento card: #fafafa 24px-radius card, a 332px masked asset area and a 24px-padded text block. */
function Card({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <Reveal y={48} delay={0.2} className="flex w-full flex-col items-center overflow-hidden rounded-[24px] bg-gray-25 shadow-[inset_0_0_0_1px_#f2f2f2]">
      <div className="relative h-[332px] w-full overflow-hidden [mask-image:linear-gradient(#000_86%,rgba(0,0,0,0)_100%)]">{children}</div>
      <div className="flex w-full flex-col items-start p-6">
        <div className="flex w-full flex-col items-start gap-1.5">
          <p className="w-full text-[16px] leading-[19.2px] font-semibold tracking-[-0.48px] whitespace-pre-wrap text-ink-3 md:text-[18px] md:leading-[21.6px] md:tracking-[-0.54px] lg:text-[20px] lg:leading-6 lg:tracking-[-0.6px]">
            {title}
          </p>
          <p className="w-full text-[14px] leading-[20.3px] font-normal tracking-[-0.14px] whitespace-pre-wrap text-[#383840] md:text-[16px] md:leading-[23.2px] md:tracking-[-0.16px]">
            {description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/**
 * Framer "Why Section" of /zapier ("What automation actually removes"): a 2x2 bento (single column on phones)
 * of #fafafa cards with masked illustrations; the fourth card's three logo strips drift sideways with the scroll.
 * 1440x1267 / 1024x1198 / 390x2104.
 */
export function ZapierWhy() {
  return (
    <ZapierSection label="What automation actually removes" containerClassName="gap-8 md:gap-12 lg:gap-16">
      <Reveal y={48} delay={0.2} className="w-full">
        <SectionHeader
          title="What automation actually removes"
          description="Every lead, status change and payment moves to your other tools the moment it happens, so nobody has to re-type it."
          descriptionClassName="max-w-[558px]"
        />
      </Reveal>
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
        <Card title="Save Hours Weekly" description="Stop manual data entry. Every lead, status change, and payment syncs automatically.">
          <div className="absolute top-5 left-1/2 h-[292px] w-[226px] -translate-x-1/2 lg:top-4 lg:h-[332px] lg:w-[257px]">
            <Image src="/framer/WGE4cutFneUcElGKNLzlt3AvIj0.png" alt="" width={722} height={937} sizes="257px" className="h-full w-full object-cover" />
          </div>
          <div className="absolute top-[166px] left-1/2 h-[182px] w-[348px] -translate-x-1/2 -translate-y-1/2 lg:h-[227px] lg:w-[434px]">
            <Image src="/framer/EKk47IIAEjxS13zFQ3EpwNNADTA.png" alt="" width={1384} height={725} sizes="434px" className="h-full w-full object-cover" />
          </div>
        </Card>
        <Card title="Never Miss a Hot Lead" description="Real-time notifications mean you respond faster and close more deals.">
          <div className="absolute top-[166px] left-1/2 size-[501px] -translate-x-1/2 -translate-y-1/2 md:size-[565px] lg:size-[631px]">
            <Image src="/framer/Kn5HOyqmjjLJ59c8lcJOrYdiM.png" alt="" width={1262} height={1262} sizes="631px" className="h-full w-full object-cover" />
          </div>
        </Card>
        <Card title="Connect Your Stack" description="Mochi becomes the hub for your Instagram sales data, flowing to every tool you use.">
          <div className="absolute top-[26px] left-[42px] h-[280px] w-[412px] md:left-[146px] lg:top-[50px] lg:left-[116px] lg:h-[325px] lg:w-[478px]">
            <Image src="/framer/IhBddyJjuEzXjIdz4xJm9K9ms.png" alt="" width={1012} height={688} sizes="478px" className="h-full w-full object-cover" />
          </div>
        </Card>
        <Card title="Volume Without Admin" description="Doubling your DM volume should not mean doubling the data entry behind it.">
          <LogoStrips />
        </Card>
      </div>
    </ZapierSection>
  );
}
