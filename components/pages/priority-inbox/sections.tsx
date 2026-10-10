import { BentoAsset, BentoCard, BentoCopy, FeatureSection } from "@/components/shared/feature-section";
import { AiTagsMockup, FollowUpMockup, LeadFiltersMockup } from "./closer-mockups";
import { AccountsExcludedMockup, MessageRequestsMockup } from "./efficiency-mockups";

/** The Framer tablet variant caps the copy of these cards at 472px (title + description) / 454px (description only). */
const EYEBROW_BODY = "md:max-w-[472px] lg:max-w-none";
const TEXT_BODY = "md:max-w-[454px] lg:max-w-none";

/** Framer "Closer Section" of Priority Inbox: "Give your team a clear place to start." + 2 bento cards + a full-width card (1321px tall on desktop). */
export function PriorityCloserSection() {
  return (
    <FeatureSection label="Give your team a clear place to start" heading="Give your team a clear place to start." cardsAlign="start">
      <BentoCard>
        <BentoAsset className="h-[302px]" mask="bottom-14">
          <LeadFiltersMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="Lead Filters"
          bodyClassName={EYEBROW_BODY}
          title="Find the leads that need you first."
          description="Bring qualified leads, people waiting for a reply, or your own conversations into one view. Filter by stage, tags, and owner to work through the leads that matter now."
        />
      </BentoCard>
      <BentoCard>
        <BentoAsset className="h-[278px]" mask="bottom-17">
          <AiTagsMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="AI Tags"
          bodyClassName={EYEBROW_BODY}
          title="Spot what matters without reading every chat."
          description="Tell Mochi what to look for, such as buying intent or a confirmed budget. AI Tags labels conversations using your rules, so your team can find the right people faster."
        />
      </BentoCard>
      <BentoCard className="lg:col-span-2">
        <BentoAsset className="h-[366px]" mask="bottom-17">
          <FollowUpMockup />
        </BentoAsset>
        <BentoCopy
          bodyClassName={TEXT_BODY}
          title="Follow up while the conversation is still warm."
          description="See which leads need attention and when their messaging window is closing. Give your team a clear next step before a promising conversation goes quiet."
        />
      </BentoCard>
    </FeatureSection>
  );
}

/** Framer "Efficiency Section" of Priority Inbox: "Keep it personal. Keep it private." + 2 bento cards (863px tall on desktop). */
export function PriorityEfficiencySection() {
  return (
    <FeatureSection
      label="Keep it personal. Keep it private."
      heading="Keep it personal. Keep it private."
      cardsAlign="start"
      after={<div aria-hidden className="hidden lg:block" />}
    >
      <BentoCard>
        <BentoAsset className="h-[369px]">
          <MessageRequestsMockup />
        </BentoAsset>
        <BentoCopy
          bodyClassName={TEXT_BODY}
          title="Keep distractions out of the working inbox."
          description="Separate spam from sales conversations so your team can spend more time with people who are interested."
        />
      </BentoCard>
      <BentoCard>
        <BentoAsset className="h-[369px]">
          <AccountsExcludedMockup />
        </BentoAsset>
        <BentoCopy
          bodyClassName={TEXT_BODY}
          title="Keep personal conversations personal."
          description="Exclude friends, family, and other personal accounts from your team’s working inbox. Choose which conversations belong in the sales workflow."
        />
      </BentoCard>
    </FeatureSection>
  );
}
