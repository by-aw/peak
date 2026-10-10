import { BentoAsset, BentoCard, BentoCopy, FeatureSection } from "@/components/shared/feature-section";
import { FeatureMiniCard } from "@/components/shared/feature-card";
import { HeadingAccent } from "@/components/shared/feature-heading";
import { AnalyticsDownCardIcon, CalendarCardIcon, QuestionCardIcon } from "@/components/icons/feature-icons";
import { ConversationIntelligenceMockup, FunnelBuilderMockup, LeadOverviewMockup, WeeklyReportsMockup } from "./closer-mockups";
import {
  FunnelChartMockup,
  ReplyRateMockup,
  SetterDashboardMockup,
  TranscriptTagsMockup,
  UpcomingPaymentsMockup,
  WonDealsMockup,
} from "./efficiency-mockups";

/** Framer "Closer Section" of Sales Performance: "Your pipeline, measured, not remembered." + 4 bento cards (1389px tall on desktop). */
export function SalesCloserSection() {
  return (
    <FeatureSection
      label="Your pipeline, measured"
      headingClassName="text-center text-black"
      heading={
        <>
          Your pipeline, <HeadingAccent>measured</HeadingAccent>, not remembered.
        </>
      }
    >
      <BentoCard>
        <BentoAsset className="h-[302px]">
          <LeadOverviewMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="Lead Overview"
          eyebrowMuted
          title="One view for your entire pipeline"
          description="All leads in one centralized view. Filter by date, setter, source (reel/post/story/outbound), payment status, funnel stage, or AI tags. Export to CSV anytime."
        />
      </BentoCard>
      <BentoCard>
        <BentoAsset className="h-[278px]">
          <FunnelBuilderMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="Custom Funnel Builder"
          eyebrowMuted
          title="Build your own funnel, see exactly where leads drop"
          description="Create custom funnels with any data points. See precisely where the drop-off happens and discover your golden script."
        />
      </BentoCard>
      <BentoCard>
        <BentoAsset className="h-[314px]">
          <ConversationIntelligenceMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="Conversation Intelligence"
          eyebrowMuted
          title="Surface complaints, questions, and patterns automatically"
          description="AI analyzes your entire inbox and surfaces the most common complaints, questions, and suggestions from leads. Know what your audience is really saying."
        />
      </BentoCard>
      <BentoCard>
        <BentoAsset className="h-[314px]">
          <WeeklyReportsMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="Weekly Team Reports"
          eyebrowMuted
          title="Performance reports delivered to your inbox"
          description="Every week, get a breakdown: who replies fastest, who closes more deals, why one setter outperforms another. Actionable insights, zero effort."
        />
      </BentoCard>
    </FeatureSection>
  );
}

/** Framer "Card Grid": three small icon cards under the bento grid (3 / 2 / 1 columns). */
function MiniCardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

/** First Framer "Efficiency Section": "Where deals are won and lost" + 4 bento cards + 3 icon cards (1564px tall on desktop). */
export function SalesEfficiencySection() {
  return (
    <FeatureSection
      label="Where deals are won and lost"
      headingClassName="text-center text-black"
      heading={
        <>
          <HeadingAccent>Where deals</HeadingAccent> are won and lost
        </>
      }
      after={
        <MiniCardGrid>
          <FeatureMiniCard
            icon={<QuestionCardIcon />}
            label="Unqualified Reasons Breakdown"
            title="Understand why leads don't qualify"
            body="Price? Timing? Wrong fit? See the patterns so you can adjust your targeting or your qualification criteria."
          />
          <FeatureMiniCard
            icon={<AnalyticsDownCardIcon />}
            label="Lost Deal Analysis"
            title="Learn why deals fall through"
            body="Track which objections killed bookings. Coach your closers on the specific gaps in their game."
          />
          <FeatureMiniCard
            icon={<CalendarCardIcon />}
            label="Period Comparison"
            title="This month vs. last month"
            body="See if you're improving or slipping. Catch trends before they become problems. No surprises at month-end."
          />
        </MiniCardGrid>
      }
    >
      <BentoCard>
        <BentoAsset className="h-[280px] md:h-[302px]">
          <SetterDashboardMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="Setter Performance Dashboard"
          eyebrowMuted
          title="See who's actually performing"
          description="Response times, reply rates, active hours, leads worked. Numbers don't lie—identify your top performers and your bottlenecks."
        />
      </BentoCard>
      <BentoCard>
        <BentoAsset className="h-[278px]">
          <ReplyRateMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="Reply Rate by Message Type"
          eyebrowMuted
          title="Know which scripts actually work"
          description="Test two openers. One gets 15% replies, one gets 35%. Now you know which to use across your entire team."
        />
      </BentoCard>
      <BentoCard>
        <BentoAsset className="h-[296px] md:h-[314px]">
          <FunnelChartMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="AI Tag Filtering"
          eyebrowMuted
          title="Segment your leads with AI precision"
          description={'Filter your entire lead database by AI tags—prompt-based or regex. Find every lead who mentioned "budget" or "next month" instantly.'}
        />
      </BentoCard>
      <BentoCard>
        <BentoAsset className="h-[314px]">
          <TranscriptTagsMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="Funnel Analytics"
          eyebrowMuted
          title="Visualize your entire pipeline"
          description="See conversion rates at every stage. Find exactly where leads are dropping off and fix the leak."
        />
      </BentoCard>
    </FeatureSection>
  );
}

/** Second Framer "Efficiency Section" (#fafafa): "What happens after the call" + 2 white bento cards + 3 white icon cards (1061px tall on desktop). */
export function SalesAfterCallSection() {
  return (
    <FeatureSection
      label="What happens after the call"
      tone="gray"
      layout="row"
      headingClassName="text-center text-gray-550"
      heading={
        <>
          <span className="text-black">What happens </span>after the call
        </>
      }
      after={
        <MiniCardGrid>
          <FeatureMiniCard
            tone="white"
            icon={<QuestionCardIcon />}
            label="Objection Detection"
            title="AI categorizes every objection"
            body="Financial, timing, trust, authority—automatically tagged so you can train against the ones that come up most."
          />
          <FeatureMiniCard
            tone="white"
            icon={<AnalyticsDownCardIcon />}
            label="Sentiment Analysis"
            title="Know when a lead is frustrated"
            body="AI detects positive, neutral, negative, and frustrated sentiment. Catch problems before leads ghost you."
          />
          <FeatureMiniCard
            tone="white"
            icon={<CalendarCardIcon />}
            label="CSV Export & Zapier"
            title="Your data, your way"
            body="Export any lead view to CSV, or push live data to thousands of apps through the Zapier integration."
          />
        </MiniCardGrid>
      }
    >
      <BentoCard tone="white" className="lg:flex-1">
        <BentoAsset className="h-[314px]">
          <UpcomingPaymentsMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="Payment Tracking & Reminders"
          eyebrowMuted
          title="Never miss a payment again"
          description="Track all payments across your entire lead base—paid in full, deposits, installments. Get automatic reminders for upcoming payments so nothing slips through."
        />
      </BentoCard>
      <BentoCard tone="white" className="lg:flex-1">
        <BentoAsset className="h-[314px]">
          <WonDealsMockup />
        </BentoAsset>
        <BentoCopy
          eyebrow="Revenue & Commission Tracking"
          eyebrowMuted
          title="Know exactly what you've earned"
          description="Paid, pending, upcoming payments—with automatic commission calculations per team member. Full transparency."
        />
      </BentoCard>
    </FeatureSection>
  );
}
