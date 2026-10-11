import Image from "next/image";
import type { ReactNode } from "react";
import { Appear } from "./appear";
import { cardBody, cardTitle, sectionHeading } from "./styles";

const MASK_GROUP = "/framer/00d0TkIx56AOkqkh2D1W06rUtk.png";

/**
 * Framer "Mask group" of the card image frames: a 444px square of faint concentric rings, 62px wider than the frame on
 * both sides and pinned 97px below its bottom edge (on phone: 116px above its top edge, the frame being 350px wide).
 */
function Rings() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-[-62px] top-[-116px] z-0 aspect-square md:top-auto md:bottom-[-97px]">
      <Image src={MASK_GROUP} alt="" fill sizes="(min-width: 810px) 444px, 474px" className="object-cover" />
    </div>
  );
}

/** An illustration centred in the image frame, rising into place (Framer "Share link card" / "Earnings"). */
function CentredCard({ src, ratio, width, height }: { src: string; ratio: string; width: number; height: number }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute top-1/2 left-1/2 z-[1] w-[304px] -translate-x-1/2 -translate-y-1/2 ${ratio}`}>
      <Appear y={64} className="relative size-full">
        <Image src={src} alt="" width={width} height={height} sizes="304px" className="size-full object-cover" />
      </Appear>
    </div>
  );
}

/**
 * One card of "Share what works for you.": #fafafa, 24px radius, hairline #f2f2f2. The image frame (320x282, 350x242 on phone)
 * fades out over its last 11%; the copy (24px padding, 6px between title and text) rises in 0.1s after the card enters.
 */
function HowCard({ frame, title, children }: { frame: ReactNode; title: string; children: string }) {
  return (
    <div className="relative flex w-full flex-col items-center overflow-hidden rounded-[24px] bg-[#fafafa] after:pointer-events-none after:absolute after:inset-0 after:rounded-[24px] after:border after:border-solid after:border-[#f2f2f2] lg:w-px lg:flex-1">
      <div className="relative h-[242px] w-full overflow-clip [mask-image:linear-gradient(#000_89%,#0000_100%)] md:h-[282px] md:w-[320px]">{frame}</div>
      <Appear y={64} delay={0.1} className="flex w-full flex-col items-start p-6">
        <div className="flex w-full flex-col gap-1.5">
          <p className={`w-full ${cardTitle}`}>{title}</p>
          <p className={`w-full text-[#383840] md:max-w-[502px] lg:max-w-none ${cardBody}`}>{children}</p>
        </div>
      </Appear>
    </div>
  );
}

/**
 * Framer "How it Works Section" (id "how"): heading + three cards in a row (desktop, 370px each, vertically centred)
 * or stacked (tablet: full width; phone: 16px apart). Padding 80/100 (64/48 tablet, 48/20/0 phone); heights 797 / 1551 / 1330.
 */
export function PartnerHowItWorks() {
  return (
    <section id="how" className="relative flex w-full scroll-mt-20 flex-col items-center" aria-label="How it works">
      <div className="flex w-full flex-col items-center px-5 pt-12 pb-0 md:px-12 md:py-16 lg:px-[100px] lg:py-20">
        <div className="flex w-full max-w-[1150px] flex-col items-center gap-8 md:gap-12 lg:gap-16">
          <Appear y={48} delay={0.2} tablet={{ delay: 0 }} className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full max-w-[334px] flex-col items-center gap-2">
              <h3 className={`w-full text-center ${sectionHeading}`}>Share what works for you.</h3>
            </div>
          </Appear>
          <div className="flex w-full flex-col items-center gap-4 md:gap-5 lg:flex-row">
            <HowCard
              title="Know a business that could use Mochi?"
              frame={
                <>
                  <Rings />
                  <CentredCard src="/framer/wGUp94OFQPFxt4GjRMlflLmLYgE.png" ratio="aspect-[1.98693/1]" width={608} height={306} />
                </>
              }
            >
              Think of a coach, creator or team selling through Instagram DMs. If good conversations are getting lost in their inbox, show them how you use
              Mochi.
            </HowCard>
            <HowCard
              title="Share your partner link"
              frame={
                <div aria-hidden className="pointer-events-none absolute top-0 left-[-15px] aspect-[1.0802469135802468/1] w-[350px] overflow-hidden">
                  <Appear y={64} className="relative size-full">
                    <Image
                      src="/framer/u2k3iSgNHIKQZnLy6RD0GroNCo.png"
                      alt=""
                      width={1400}
                      height={1296}
                      sizes="350px"
                      className="size-full object-cover"
                    />
                  </Appear>
                </div>
              }
            >
              Accept the partner terms in your Mochi account, then share your referral link. It connects eligible referrals to your partner account.
            </HowCard>
            <HowCard
              title="Earn as your referrals renew"
              frame={
                <>
                  <Rings />
                  <CentredCard src="/framer/HcT19hxsazdCAKAnfDANVLdQbY.png" ratio="aspect-[1.67493/1]" width={608} height={363} />
                </>
              }
            >
              Earn up to 25% commission on qualifying subscription payments, including renewals.* Your referrals can keep earning for you over time, under
              your partner agreement.
            </HowCard>
          </div>
        </div>
      </div>
    </section>
  );
}
