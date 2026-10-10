import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

/**
 * "Multi-channel support" mockup: two 248px pillars (thumbnail + grey box) around a wide thumbnail card.
 * Pillars (240px tall on tablet, 356 on desktop) slide in horizontally (x ±80), the centre card from y=48. Phone stacks the three in a column.
 */
export function MultiChannel() {
  return (
    <div className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-4">
      <Reveal x={-80} delay={0.2} className="flex w-full flex-row items-end gap-3 md:h-[240px] md:w-[248px] md:shrink-0 md:flex-col md:gap-4 lg:h-[356px]">
        <div className="relative h-[224px] flex-1 basis-0 overflow-hidden rounded-[16px] md:h-auto md:min-h-0 md:w-full md:flex-1 lg:rounded-[20px]">
          <Image src="/framer/nivTA89bepaleyoxpJxutXUKo.jpg" alt="" width={1280} height={720} sizes="250px" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="size-16 shrink-0 rounded-[16px] bg-[#f5f5f5] md:size-28 lg:rounded-[20px]" />
      </Reveal>
      <Reveal y={48} delay={0.2} className="relative h-[218px] w-full overflow-hidden rounded-[16px] md:h-[240px] md:flex-1 md:basis-0 lg:h-[356px] lg:rounded-[20px]">
        <Image src="/framer/urd1z721xnY0t2B6Yw7tszYgdC4.jpg" alt="" width={1280} height={720} sizes="(min-width: 1200px) 524px, (min-width: 810px) 352px, 326px" className="h-full w-full object-cover" />
      </Reveal>
      <Reveal x={80} delay={0.2} className="flex w-full flex-row items-start gap-3 md:h-[240px] md:w-[248px] md:shrink-0 md:flex-col md:gap-4 lg:h-[356px]">
        <div className="size-16 shrink-0 rounded-[16px] bg-[#f5f5f5] md:size-28 lg:rounded-[20px]" />
        <div className="relative h-[224px] flex-1 basis-0 overflow-hidden rounded-[16px] md:h-auto md:min-h-0 md:w-full md:flex-1 lg:rounded-[20px]">
          <Image src="/framer/QdUQQQgb0kVN9jPXHdbILeUR5K4.png" alt="" width={992} height={912} sizes="250px" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </Reveal>
    </div>
  );
}
