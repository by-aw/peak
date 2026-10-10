import Image from "next/image";
import { FeatureHero } from "@/components/shared/feature-hero";

export const TEAM_COLLABORATION_CTA = "https://use.themochi.app/login?landing_page=team-collaboration";

/**
 * Framer "Card" of the Team Collaboration hero: a blue gradient backdrop (592x432 desktop, 928x589 tablet,
 * 350x452 phone) with the team inbox screenshot bleeding off the bottom-right corner (48px/40px inset, 32px on phones).
 */
export function TeamInboxCard() {
  return (
    <div className="relative h-[452px] w-full overflow-hidden rounded-[24px] p-5 md:h-[589px] md:p-6 lg:h-auto lg:w-[592px] lg:self-stretch">
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <Image src="/framer/5BG1u65jusqf5LWrbgYuy8iLDm4.png" alt="" fill preload sizes="(min-width: 1200px) 592px, (min-width: 810px) 928px, 100vw" className="object-cover" />
      </div>
      <div className="absolute inset-x-0 top-0 flex items-start justify-end pt-8 pl-8 md:pt-12 md:pl-10">
        <div className="relative aspect-[0.54067/1] min-w-0 flex-1 overflow-clip rounded-l-[9px] md:rounded-l-[12px]">
          <Image src="/framer/DJQ9TvzJoYzulrlecDOshpX9M.png" alt="" width={870} height={1608} preload sizes="(min-width: 1200px) 552px, (min-width: 810px) 888px, 100vw" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}

/** Team Collaboration "Hero Section": h2 headline, support copy, CTA and the team inbox card. */
export function TeamCollaborationHero() {
  return (
    <FeatureHero
      as="h2"
      title="Keep your team aligned without the chaos"
      description="When several people work from the same Instagram account, context gets split across screenshots, chats, and different tools. Mochi gives your team one place to route new leads, discuss each conversation, and see what was said before. Managers can check the work without taking a lead out of someone’s queue, so the right person always knows what to do next."
      descriptionClassName="text-gray-750"
      ctaHref={TEAM_COLLABORATION_CTA}
      contentClassName="lg:w-[608px] lg:shrink-0"
      card={<TeamInboxCard />}
    />
  );
}
