import { FeatureHero } from "@/components/shared/feature-hero";
import { SmartInboxCard } from "./smart-inbox-card";

export const PRIORITY_INBOX_CTA = "https://use.themochi.app/login?landing_page=priority-inbox";

/** Priority Inbox "Hero Section": 16px eyebrow h1, support copy, CTA and the animated Smart Inbox card. */
export function PriorityInboxHero() {
  return (
    <FeatureHero
      titleVariant="eyebrow"
      title="Help your team focus on the right leads first."
      description="When your team replies in the wrong order, interested leads are left waiting and opportunities are missed. Priority Inbox organizes conversations by stage, tags, and owner, so your team can work on the right leads at the right time."
      descriptionClassName="text-gray-750"
      ctaHref={PRIORITY_INBOX_CTA}
      contentClassName="lg:w-[632px] lg:shrink-0"
      card={<SmartInboxCard />}
    />
  );
}
