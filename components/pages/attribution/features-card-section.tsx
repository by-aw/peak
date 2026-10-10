import Image from "next/image";
import type { ReactNode } from "react";
import { CONTAINER, H3, LEAD, WRAPPER, line } from "@/components/shared/attribution/grid";
import { LeaderboardMockup } from "@/components/shared/attribution/leaderboard-mockup";
import { FormDetectionMockup } from "@/components/shared/attribution/form-detection-mockup";
import { FeatureText } from "./feature-text";
import { YoutubeLinksMockup } from "./youtube-links-mockup";

type Card = {
  title: string;
  description: string;
  items: string[];
  href: string;
  mockup: ReactNode;
  /** Classes for the "Image Frame" (min heights / alignment differ per card). */
  frameClassName?: string;
};

const CARDS: Card[] = [
  {
    title: "DM Link Tracking",
    description: "See which setter sent which link, who clicked, and whether they booked a call. Per-setter click rates, response times, and revenue attribution.",
    items: ["Per-setter click rate leaderboard", "Click latency (15 minutes or 3 days?)", "Pipeline connected — see calls booked from each link"],
    href: "/attribution/dm-links",
    mockup: <LeaderboardMockup />,
    frameClassName: "md:min-h-[356px]",
  },
  {
    title: "YouTube Tracking",
    description: "Connect your channel. We replace every link in your descriptions with tracked links and show you clicks, leads, and revenue per video.",
    items: ["Revenue per video, not just views", "Set and forget — new videos auto-tracked", "Match YouTube viewers to IG leads"],
    href: "/attribution/youtube-tracking",
    mockup: <YoutubeLinksMockup />,
  },
  {
    title: "Tracking Pixel",
    description: "Paste one script on any page you own. We track page views, form submissions, and scroll depth. No integrations with Typeform, Calendly, or Stripe needed.",
    items: ["Works on ClickFunnels, Kajabi, Webflow, WordPress, anything", "Auto-captures email on any form submission", "Stitches the full journey: click → page → form → call → cash"],
    href: "/attribution/tracking-pixel",
    mockup: <FormDetectionMockup />,
    frameClassName: "md:min-h-[399px] md:justify-center",
  },
  {
    title: "Lead Profiles",
    description: "Every lead gets a living profile that combines their DM conversations, web behavior, content engagement, and pipeline status into one intelligence view.",
    items: ["Full journey from first click to close", "AI-scored lead quality based on behavior", "Pre-call briefs for your closers"],
    href: "/attribution/lead-profiles",
    mockup: (
      <div className="w-full max-w-[432px]">
        <Image src="/framer/lr7KLVZNSjgaqUbLigUtWkTi6A.png" width={1284} height={1044} alt="" sizes="(min-width: 810px) 432px, calc(100vw - 72px)" className="h-auto w-full" />
      </div>
    ),
  },
];

/**
 * Framer "Features Card Section": "Everything you need to trace content to cash." and the four product
 * cards (mockup faded out at the bottom, title, description, feature list, "Learn more"), two per row on
 * desktop and stacked on tablet/phone.
 */
export function FeaturesCardSection() {
  const rows = [CARDS.slice(0, 2), CARDS.slice(2, 4)];
  return (
    <section className="flex w-full flex-col items-center overflow-hidden">
      <div className={`${WRAPPER} ${line("after:border-y")} overflow-hidden`}>
        <div className={`${CONTAINER} ${line("after:border-x after:border-b")} flex flex-col items-center overflow-hidden pb-12 md:pb-16 lg:pb-20`}>
          <div className={`${line("after:border-b")} flex w-full flex-col items-center gap-4 px-4 py-12 md:px-0 md:py-16`}>
            <div className="flex w-full flex-col items-center gap-2">
              <h3 className={`${H3} w-full max-w-[548px] whitespace-pre-wrap`}>Everything you need to trace content to cash.</h3>
              <p className={`${LEAD} w-full max-w-[492px] whitespace-pre-wrap opacity-80`}>
                From the DM link your setter sends to the YouTube video that started it all. Full pipeline attribution, automatic.
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-start">
            {rows.map((row, r) => (
              <div key={r} className={`${line("after:border-x after:border-b")} flex w-full flex-col items-start lg:flex-row`}>
                {row.map((card) => (
                  <div key={card.title} className={`${line("after:border-r after:border-b lg:after:border-b-0")} flex w-full flex-col items-start overflow-hidden lg:flex-1 lg:basis-0`}>
                    <div
                      className={`flex w-full flex-col items-center overflow-hidden px-4 pt-10 md:px-6 md:pt-12 [mask-image:linear-gradient(#000_69%,rgba(0,0,0,0)_86%)] ${card.frameClassName ?? ""}`}
                    >
                      {card.mockup}
                    </div>
                    <FeatureText title={card.title} description={card.description} items={card.items} cta={{ label: "Learn more", href: card.href }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
