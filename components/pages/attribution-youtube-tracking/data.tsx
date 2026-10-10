import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import type { FaqEntry, FeatureCard, LabelItem } from "@/components/shared/attribution";
import { RevenueTable } from "./revenue-table";
import { ConversionFunnel } from "./funnel";
import { NicheVsViral } from "./niche-vs-viral";
import { MultiChannel } from "./multi-channel";

export const labels: LabelItem[] = [
  { title: "Revenue per video.", description: "Not views, not watch time. Actual dollars traced back to each video." },
  { title: "Set and forget.", description: "Connect once. Every new video gets tracked links automatically." },
  { title: "Lead matching.", description: "When a YouTube viewer later DMs you on Instagram, we connect the dots." },
];

export const features: FeatureCard[] = [
  {
    title: "Revenue per video",
    description:
      "See exactly how much money each video generated. Not estimated, not modeled — actual cash collected from leads who clicked a link in that video's description and went through your pipeline.",
    mockup: <RevenueTable />,
    phoneMinHeight: false,
  },
  {
    title: "Conversion funnel",
    description:
      "For each video, see the full funnel: views → link clicks → page visits → form submissions → calls booked → deals won. Know exactly where leads drop off and which videos have the strongest conversion path.",
    mockup: <ConversionFunnel />,
    mobileMockup: (
      <Reveal y={64} delay={0.2} className="w-full">
        <Image src="/framer/I9iOsQKnVTPvUA02oCMAIvS0fQg.png" alt="" width={1296} height={912} sizes="318px" className="h-auto w-full" />
      </Reveal>
    ),
    phoneMinHeight: false,
  },
  {
    title: "Niche vs. viral",
    description:
      "A 50K-view video that books 2 calls is worth less than an 8K-view video that books 7. Mochi's insight engine compares revenue-per-view across all your videos and tells you which content format to double down on.",
    mobileDescription: "A 50K-view video that books 2 calls is worth less than an 8K-view video that books 7.",
    mockup: <NicheVsViral />,
    mobileMockup: (
      <Reveal y={64} delay={0.2} className="w-full">
        <Image src="/framer/fn0Om7byH3IfsSUrzSGh6Wbw.png" alt="" width={1296} height={858} sizes="318px" className="h-auto w-full" />
      </Reveal>
    ),
    frameClassName: "py-6 md:min-h-[426px]",
    phoneMinHeight: false,
  },
  {
    title: "Clicks over time",
    description:
      "YouTube videos have a long tail. A video from 3 months ago might still be generating leads today. The sparkline chart on each video shows you click volume over time, so you know which content has evergreen value versus which ones spike and die.",
    mobileDescription: "YouTube videos have a long tail. A video from 3 months ago might still be generating leads today.",
    mockup: (
      <Image
        src="/framer/vIxIhCsEXUOSIKqhbu9gDE6tcE.png"
        alt=""
        width={2080}
        height={1476}
        sizes="(min-width: 1200px) 550px, (min-width: 810px) calc(100vw - 96px), calc(100vw - 40px)"
        className="h-auto w-full"
      />
    ),
    frameClassName: "h-[272px] px-0 py-6 md:h-auto md:px-0 md:py-6 lg:h-[426px]",
    phoneMinHeight: false,
  },
  {
    title: "Multi-channel support",
    description:
      "Connect multiple YouTube channels — your main channel, your podcast, your personal brand. See all videos in one dashboard. Each channel syncs independently and new uploads are detected automatically via webhook.",
    mockup: <MultiChannel />,
    frameClassName: "min-h-[404px] p-3! md:min-h-[288px]! md:p-6! lg:min-h-[404px]!",
    phoneMinHeight: false,
  },
];

export const summary =
  "Most creators recreate their highest-view videos without knowing if those views turned into money. A 50,000-view video that books 2 calls is worth less than an 8,000-view video that books 7. But you’d never know that from YouTube Analytics. Once you see revenue next to views, you’ll never make content the same way again. You’ll stop chasing virality and start creating the specific, targeted videos that your best customers actually watch before they buy.";

export const faq: FaqEntry[] = [
  {
    question: "Do you edit my YouTube descriptions?",
    answer:
      "Yes, with your permission via Google OAuth. During setup, we scan your descriptions, show you which links we found, and let you choose which to replace. We only touch the links you approve — everything else stays untouched.",
  },
  {
    question: "Will this affect my video SEO?",
    answer:
      "No. The moch.me links redirect instantly (301) to your original destination. YouTube's algorithm doesn't penalize redirecting links in descriptions, and your viewers won't notice any difference.",
  },
  {
    question: "Can I connect multiple YouTube channels?",
    answer: "Yes. Many coaches have a main channel plus a podcast or personal brand channel. Each connects separately and syncs independently.",
  },
  {
    question: "How do you match YouTube viewers to my IG leads?",
    answer:
      "When someone clicks a tracked link in your video description, we drop a cookie. If they later fill out a form on your landing page (captured by the pixel) or DM you on Instagram, we match via email or session ID. The lead's profile in Mochi shows the full journey.",
  },
  {
    question: "What about new videos I upload?",
    answer:
      "We detect new uploads automatically via YouTube's webhook system. Within minutes of publishing, we scan the description and replace links if they match your tracked destinations. No manual work needed.",
  },
];
