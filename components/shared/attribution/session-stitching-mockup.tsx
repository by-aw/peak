import Image from "next/image";

type Card = { avatar: string; avatarSize: number; name: string; source: string; link: string; left: number; top: number };

const CARDS: Card[] = [
  { avatar: "/framer/WfGh6ISHdjwbipoqoUimgkxyqI.png", avatarSize: 128, name: "@jessica", source: "youtube", link: "https://ig.com/q0Sd-mE", left: 0, top: 1 },
  { avatar: "/framer/kvg5o2H0lAyxYKO4FGIm2dVOyM.png", avatarSize: 128, name: "Niche video", source: "DM", link: "https://fb.com/q0S", left: 32, top: 85 },
  { avatar: "/framer/MKA7INDXm9nEkdIrbzOYK7fJ4A.jpg", avatarSize: 1024, name: "@becca", source: "youtube", link: "https://ig.com/q0S", left: 64, top: 168 },
];

/** Classes for the Image Frame that holds this mockup (Framer pads it 24/24/24/128, 24/0/24/128 on tablet, 16/16/16/232 on phone). */
export const SESSION_STITCHING_FRAME = "relative pl-[232px] pr-4 md:pl-32 md:pr-0 md:items-end lg:pr-6 lg:items-center";

/**
 * "Session stitching" mockup: three stacked lead cards (12px radius on the left only) that run off the
 * right edge of the card, over a faint dotted background pattern. The 494x240 stack is centred in the
 * padded frame (right-aligned on tablet) so it overflows and gets clipped, exactly as in Framer.
 */
export function SessionStitchingMockup() {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute -bottom-[588px] -left-[460px] -right-[460px] -top-[92.5px] z-0 opacity-25 md:-top-[401px] md:opacity-50 lg:-top-[117.5px]">
        <Image src="/framer/JPQRnXHKPWDLgiFdo99dVo30.png" width={3840} height={2880} alt="" sizes="1848px" className="h-full w-full object-cover" />
      </div>
      <div className="relative z-0 flex w-full justify-center">
        <div className="relative h-[240px] w-[494px] shrink-0">
          {CARDS.map((card) => (
            <div
              key={card.name}
              className="absolute right-0 flex items-center gap-6 rounded-l-[12px] bg-white px-4 py-5 shadow-[0_0_0_-0.5px_rgba(224,224,224,0.32),0_1px_2px_0_rgba(0,0,0,0.04)] after:pointer-events-none after:absolute after:inset-0 after:rounded-l-[12px] after:border after:border-[#e7e7e7]"
              style={{ left: card.left, top: card.top }}
            >
              <div className="flex items-center gap-2">
                <Image src={card.avatar} width={card.avatarSize} height={card.avatarSize} alt="" sizes="32px" className="size-8 shrink-0 rounded-full object-cover" />
                <p className="text-[16px] leading-[16.8px] font-medium tracking-[-0.2px] whitespace-pre text-black">{card.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex items-center rounded-[8px] bg-[#f8f8f8] px-2 py-1.5 after:pointer-events-none after:absolute after:inset-0 after:rounded-[8px] after:border after:border-[#e7e7e7]">
                  <p className="text-[14px] leading-[14.7px] font-normal tracking-[-0.2px] whitespace-pre text-[#565656]">{card.source}</p>
                </div>
                <div className="relative flex items-center rounded-[8px] bg-[#eff5ff] px-2 py-1.5 after:pointer-events-none after:absolute after:inset-0 after:rounded-[8px] after:border after:border-[#e3edfe]">
                  <p className="text-[14px] leading-[14.7px] font-normal tracking-[-0.2px] whitespace-pre text-[#3843d0]">{card.link}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
