import { BentoAsset, BentoCard, BentoCopy, FeatureSection, SectionIntro } from "@/components/shared/feature-section";
import { GhostModeMockup, MobileNotificationMockup, TeamChatMockup } from "./mockups";

const INTRO = "Route new conversations, keep internal discussion with the lead, and give every person the context they need to take the next step.";

/**
 * Framer "Closer Section" of Team Collaboration: "Everything your team needs around every lead" + intro,
 * four bento cards (two copy-only) and a full-width notifications card (2028px tall on desktop).
 * The Framer phone variant renders the intro paragraph twice; reproduced with a phone-only duplicate.
 */
export function TeamCloserSection() {
  return (
    <FeatureSection
      label="Everything your team needs around every lead"
      headingClassName="text-left text-black"
      heading="Everything your team needs around every lead"
      description={
        <>
          <SectionIntro>{INTRO}</SectionIntro>
          <SectionIntro className="md:hidden">{INTRO}</SectionIntro>
        </>
      }
    >
      <BentoCard>
        <BentoAsset className="h-[302px]">
          <TeamChatMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="Team Inbox"
          eyebrowMuted
          title="Discuss each lead in one place"
          description="Every lead has a private team thread inside Mochi. Tag a teammate, ask a question, or leave context next to the conversation, so nobody has to send screenshots or search through another tool."
        />
      </BentoCard>
      <BentoCard>
        <BentoCopy
          eyebrow="Lead Routing"
          eyebrowMuted
          title="Decide who receives new leads"
          description="Choose what percentage of new leads goes to each team member. Adjust the split when someone is unavailable or when you want your strongest performer to handle more opportunities."
        />
      </BentoCard>
      <BentoCard>
        <BentoCopy
          eyebrow="Conversation Summaries"
          eyebrowMuted
          title="Give the whole team the lead context"
          description="Mochi summarizes each lead’s goals, pain points, objections, and important details. When the conversation moves to another person or platform, the next person can see what was said and continue from the right place."
        />
      </BentoCard>
      <BentoCard>
        <BentoAsset className="h-[338px]">
          <GhostModeMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="Ghost Mode"
          eyebrowMuted
          title="Review conversations without marking them read"
          description="Managers can open any conversation and see exactly what is happening while it stays unread for the assigned team member. You can coach the work without making someone think the lead has already been handled."
        />
      </BentoCard>
      <BentoCard className="lg:col-span-2">
        <BentoAsset className="h-[338px]">
          <MobileNotificationMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="Mobile Notifications"
          eyebrowMuted
          title="Bring important messages straight to your phone"
          description="When a teammate tags you or a lead needs attention, Mochi sends a push notification to the iOS app. Tap it to open the right conversation and respond without searching through the inbox."
        />
      </BentoCard>
    </FeatureSection>
  );
}
