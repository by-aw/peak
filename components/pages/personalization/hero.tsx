import Image from "next/image";
import { FeatureHero } from "@/components/shared/feature-hero";
import { ClickAreaIcon, EyeSlashMicro, InstagramGlyph, PhotoMicro, PlayMicro, SendButtonIcon } from "@/components/icons/inbox-mockup-icons";
import { AdjustmentsIcon, CursorLine } from "@/components/icons/personalization-icons";

export const PERSONALIZATION_CTA = "https://use.themochi.app/login?landing_page=personalization";

const WAVEFORM = [2, 8, 14, 4, 16, 14, 10, 10, 10, 14, 10, 16, 10, 4, 2];

/**
 * Framer "Card" of the Personalization hero: purple gradient backdrop (592x541 desktop, 928x589 tablet,
 * 350x550 phone) holding a white chat mockup: user header, a skeleton inbound message, the blue reply +
 * voice note, a typing indicator, the "Convert this message to creator's voice" tooltip and the composer
 * (whose attachment buttons and cursor are hidden in the Framer phone variant).
 */
export function PersonalChatCard() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[24px] p-5 md:h-[589px] md:p-6 lg:h-auto lg:flex-1">
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <Image src="/framer/9w5uA4oj4VZzkY1gUmV7dNkb4BM.webp" alt="" fill preload sizes="(min-width: 1200px) 592px, (min-width: 810px) 928px, 100vw" className="object-cover" />
      </div>
      <div className="relative z-[1] flex w-full flex-col overflow-hidden rounded-[16px] bg-white">
        <div className="flex items-center gap-4 overflow-hidden bg-white px-5 py-4">
          <Image src="/framer/54ld3a5oqlabzerddR3jMw1pU.png" alt="" width={128} height={128} className="size-8 shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-1 flex-col gap-1 md:gap-2.5">
            <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] text-black">alimamedgasanov</p>
            <div className="flex items-center gap-2">
              <InstagramGlyph width={14} height={14} />
              <p className="text-[14px] leading-[14.7px] font-medium tracking-[-0.2px] text-gray-500">alimamedgasanov</p>
            </div>
          </div>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg p-2">
            <EyeSlashMicro width={14} height={12} />
          </span>
        </div>
        <div className="relative flex flex-col gap-[22px] overflow-hidden bg-gray-25 p-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5 rounded-[6px_12px_12px_12px] bg-white px-3 py-3.5">
              <span className="h-1.5 w-[180px] max-w-full rounded-3xl bg-[#efefef]" />
              <span className="h-1.5 w-[112px] max-w-full rounded-3xl bg-[linear-gradient(90deg,rgba(227,227,227,0.12)_0%,#e1e1e1_100%)]" />
            </div>
            <p className="text-[12px] leading-[12px] font-normal tracking-[-0.2px] text-gray-500">10:30 AM</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex w-full flex-col items-end gap-1.5">
              <div className="w-full rounded-[12px_12px_6px_12px] bg-[#3b82f6] px-3 py-3.5">
                <p className="text-[14px] leading-6 font-normal tracking-[-0.2px] text-white">Hey! Thanks for reaching out. Our program covers fitness and mindset. Would you like to learn more? 😊</p>
              </div>
              <div className="flex h-[38px] items-center gap-2 rounded-[12px_6px_12px_12px] bg-[#3b82f6] px-3">
                <span className="flex items-center gap-1.5">
                  <span className="flex size-4 items-center justify-center">
                    <PlayMicro width={10} height={12} />
                  </span>
                  <span className="flex h-4 items-center gap-1">
                    {WAVEFORM.map((h, i) => (
                      <span key={i} className="w-0.5 rounded-px bg-white" style={{ height: h }} />
                    ))}
                  </span>
                </span>
                <p className="text-right text-[13px] leading-6 font-normal tracking-[-0.2px] whitespace-pre text-white">0:24</p>
              </div>
            </div>
            <p className="w-full max-w-[380px] text-right text-[12px] leading-[12px] font-normal tracking-[-0.2px] text-gray-500">10:32 AM</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex w-fit rounded-[6px_12px_12px_12px] bg-white px-2 py-1">
              <Image src="/framer/srB0z1bIUhgLtJnMcrJNHQ4PU.gif" alt="" width={72} height={32} unoptimized className="h-8 w-[72px] object-cover" />
            </div>
            <p className="text-[12px] leading-[12px] font-normal tracking-[-0.2px] text-gray-500">10:33 AM</p>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-[58px] left-[45px] z-[1] flex w-[220px] flex-col items-center md:right-[45px] md:left-auto">
          <p className="flex h-7 w-full items-center justify-center rounded-[10px] bg-black text-center text-[11px] leading-[14px] font-medium whitespace-pre text-white">
            Convert this message to creator&apos;s voice
          </p>
          <span aria-hidden className="-mt-px size-0 border-x-[5px] border-t-[4px] border-x-transparent border-t-black" />
        </div>
        <div className="flex flex-col gap-2 px-4 py-2">
          <div className="flex h-[42px] w-full items-center justify-between overflow-hidden rounded-lg bg-gray-25 p-2 md:px-3">
            <div className="flex min-w-0 items-center gap-2">
              <div className="hidden shrink-0 items-center gap-1 md:flex">
                <span className="flex size-7 items-center justify-center overflow-hidden rounded-lg bg-white p-1.5">
                  <PhotoMicro width={12} height={12} />
                </span>
                <ClickAreaIcon width={28} height={28} />
              </div>
              <div className="flex min-w-0 items-center gap-2.5 pr-2 pl-0.5">
                <CursorLine width={3} height={19} className="hidden shrink-0 md:block" />
                <p className="truncate text-[11.5px] leading-[11.5px] font-normal tracking-[-0.2px] whitespace-pre text-[#505050]">Our next step would be to get on a call</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="flex size-7 items-center justify-center overflow-clip rounded-lg bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05),0_0_0_0.5px_rgba(224,224,224,0.99)]">
                <AdjustmentsIcon width={16} height={16} />
              </span>
              <SendButtonIcon width={30} height={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Personalization "Hero Section": display headline, support copy, CTA and the chat card. */
export function PersonalizationHero() {
  return (
    <FeatureHero
      title="Help your team make every reply feel personal."
      description="A lead tells you what they need. Then someone else picks up the chat, asks the same questions, or sends a generic follow-up. Mochi gives your team the conversation history and help with the next reply, so leads feel heard without waiting for you."
      ctaHref={PERSONALIZATION_CTA}
      contentClassName="lg:w-[608px] lg:shrink-0"
      card={<PersonalChatCard />}
    />
  );
}
