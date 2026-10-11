/**
 * Prompt library content (Framer CMS "Prompt Library" collection, scraped from the live page).
 *
 * Prompts are stored as the exact plain text the Framer copy button puts on the clipboard (curly quotes included).
 * `[bracketed]` placeholders are rendered as highlighted code chips, and a prompt that contains one is set in italics
 * as a whole (that is how the CMS rich text was authored: the em wraps everything around the code chip).
 */

export interface PromptCategory {
  /** CMS slug, used as the `?prompt-menu=` query value that filters the list. */
  slug: string;
  /** Sidebar label. */
  label: string;
  /** Section heading. */
  title: string;
  /** Section intro. */
  description: string;
  /** Prompt cards, labelled "PROMPT 01", "PROMPT 02"... in order. */
  prompts: string[];
  /** Trailing note card without a copy button. */
  extra?: { label: "STACK IT" | "POWER MOVE"; text: string };
}

export const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    slug: "1.-content-ideas",
    label: "1. Content Ideas",
    title: "1. Content ideas from your DMs ⭐",
    description: "Your DMs are the best market research you'll ever have. Leads tell your setters — in their own words — what they struggle with, what they want, and why they hesitate. Turn that into content.",
    prompts: [
      "“Based on our DM conversations, what are the top 5 content ideas that would speak directly to what leads are struggling with right now?”",
      "“Based on the objections and questions leads raised in DMs this month, give me 5 reels that would pre-handle these objections before leads even reach the DMs. For each: hook, angle, and CTA.”",
      "“What questions do leads ask most often in the nurture stage? Turn each one into a story idea with a poll or question sticker.”",
      "“Pull the exact phrases leads use to describe their pain points. Write 3 reel hooks using their literal words.”",
      "“What do our leads say they actually want to achieve? Draft a carousel for each of the top 3 desired outcomes.”",
      "“Look at our audience insights and tell me: what's the ONE topic my content is missing that my DMs prove people care about?”",
    ],
    extra: { label: "STACK IT", text: "\"Now turn those 5 ideas into a 2-week content calendar with posting days and caption drafts.\"" },
  },
  {
    slug: "2.-know-your-audience",
    label: "2. Know Your Audience",
    title: "2. Know your audience (offer & positioning research)",
    description: "Mine your conversations for the language, desires, and objections that shape how you position your offer.",
    prompts: [
      "“What are the most common pain points and desired outcomes in our lead conversations? Summarize what our audience actually wants in 3 sentences.”",
      "“Based on our DM data, write the 'before state' and 'after state' of our ideal client — in their own words.”",
      "“What buying signals show up in our conversations right before someone purchases? List the exact phrases.”",
      "“Compare what our leads SAY they want vs. the objections they raise. What does that gap tell us about how to position our offer?”",
      "“Which lead sources (comments, DMs, stories, outbound) bring the most leads — and which actually convert to booked calls? Where should I focus?”",
    ],
  },
  {
    slug: "3.-objection-handling",
    label: "3. Objection Handling",
    title: "3. Objection handling & sales scripts",
    description: "Diagnose what's blocking sales, and arm your team with replies that actually move conversations forward.",
    prompts: [
      "“What are our top objections this month, ranked by frequency? Which ones are we failing to handle?”",
      "“Write me 3 ready-to-send DM reply scripts for our most common objection right now, matched to our team's casual messaging style. Base them on what's actually working in our conversations.”",
      "“For each of our top 3 objection types, give me: the exact phrases leads use, why they're really saying it, and a reply script for each.”",
      "“Which of our message patterns and scripts have the highest success rate? Which ones should we stop using?”",
      "“Leads keep raising the [timing] objection. Build me a mini objection-handling playbook my setters can keep open while they chat.”",
    ],
    extra: { label: "STACK IT", text: "\"Now format this as a one-page training doc for new setters.\"" },
  },
  {
    slug: "4.-funnel-health",
    label: "4. Funnel Health",
    title: "4. Funnel health & bottlenecks",
    description: "Find out where leads drop off, where momentum stalls, and what to fix first.",
    prompts: [
      "“What are the 3 biggest bottlenecks in our funnel right now and what should we fix first?”",
      "“Show me our funnel: how many leads at each stage, and where's the biggest drop-off?”",
      "“How many leads got qualified this week but never received a booking link? That's money on the table — list what to do about it.”",
      "“Show me the daily funnel trend for the last 2 weeks. Is our momentum up or down, and why?”",
      "“Why are we losing deals?”",
    ],
  },
  {
    slug: "5.-lead-prioritization",
    label: "5. Lead prioritization",
    title: "5. Lead prioritization & follow-up",
    description: "Surface the hot leads, the forgotten ones, and the warm conversations sitting one message away from a yes.",
    prompts: [
      "“Which leads are hottest right now? Give me a top 10 with why each one is hot.”",
      "“Show me qualified leads with increasing engagement who haven't booked a call yet. Who should we message first today?”",
      "“List leads that clicked one of our links this week but never got a follow-up.”",
      "“Give me a summary of my conversation with [@username] — pain points, objections, buying signals, and what I should send next.”",
      "“How many leads are sitting in our [Follow up] tag? Which 10 should we revive first?”",
      "“Show me how our leads are distributed across tags. Which segment is most neglected?”",
    ],
  },
  {
    slug: "6.-team-performance",
    label: "6. Team Performance",
    title: "6. Team performance & coaching",
    description: "Audit your setters and closers without reading hundreds of chat logs — and coach with data, not vibes.",
    prompts: [
      "“Compare all my setters side by side for last month. Who's the top performer and who needs support — and on what exactly?”",
      "“How did [Fabio] do last week? Booked calls, qualification rate, response time — and one specific thing to improve.”",
      "“How are my closers doing? Show rate, close rate, no-shows — anything alarming?”",
      "“What's our lead reply rate per team member? Whose messages get ignored most, and what does the top performer do differently?”",
      "“Based on our team's performance data vs. our benchmarks, write the agenda for this week's team meeting: 2 wins, 2 gaps, 1 focus.”",
    ],
  },
  {
    slug: "7.-speed-to-lead",
    label: "7. Speed-to-Lead",
    title: "7. Speed-to-lead & scheduling",
    description: "Speed kills deals — or saves them. Find your slowest hours, your busiest hours, and where to staff.",
    prompts: [
      "“What's our response time distribution? How many leads wait over an hour for a reply, and what's that costing us?”",
      "“What hours of the day are our leads most active? Compare that to when my setters are actually online — where are the coverage gaps?”",
      "“If I could only have a setter online 4 hours a day, which 4 hours should it be based on our lead activity?”",
    ],
  },
  {
    slug: "8.-links-ctas",
    label: "8. Links & CTAs",
    title: "8. Links, CTAs & resources",
    description: "Every link sent is a signal. See what's clicked, what's ignored, and what to stop using.",
    prompts: [
      "“Give me an overview of our link performance this month: sends, clicks, click rate. What's working?”",
      "“Which links get clicked the most, and which get sent a lot but never clicked? What should we stop sending?”",
      "“Deep-dive on our [booking link]: who sends it most, how fast do leads click after receiving it, and what's the click rate per setter?”",
      "“Where in the world are people clicking our [offer] link? Any surprising markets?”",
      "“How are our automations performing? Are auto-replies actually reaching new leads?”",
    ],
  },
  {
    slug: "9.-weekly-reviews",
    label: "9. Weekly Reviews",
    title: "9. Weekly reviews & reports",
    description: "Use these for Monday-morning reviews, monthly recaps, and team-wide reporting.",
    prompts: [
      "“Give me my Monday morning review: how did last week compare to the week before, who on the team needs attention, which leads should we prioritize today, and the single biggest thing to fix this week?”",
      "“Compare this month to last month across all key metrics. What's trending up, what's trending down, top 3 takeaways.”",
      "“How do we stack up against our benchmarks for booking rate and response time? Are we above or below the median?”",
      "“Write a short weekly recap I can post for my team: numbers, wins, and this week's focus. Keep it punchy.”",
    ],
    extra: { label: "POWER MOVE", text: "Ask Claude to run your weekly review automatically — \"Every Monday at 8am, run my Monday morning review and save it as a file.\"" },
  },
  {
    slug: "10.-power-workflows",
    label: "10. Power Workflows",
    title: "10. Power workflows (stack everything)",
    description: "These combine multiple data sources in one prompt — the real magic.",
    prompts: [
      "“Build my content strategy for next month: pull our audience pain points, top objections, and most-asked questions from DMs. Map each to a content idea. Output a 4-week calendar with hooks.”",
      "“Create an onboarding doc for a new setter: our funnel stages, our top-performing scripts, our most common objections with reply examples, the hours leads are most active, and our response-time targets.”",
      "“Audit my entire pipeline: funnel bottlenecks, response times, unhandled objections, neglected lead segments, and underused links. Rank the top 5 fixes by revenue impact.”",
      "“I'm planning a [launch/promo]. Based on our DM data: which leads should hear about it first, what objections should the messaging pre-handle, and which link format performs best for us?”",
    ],
  },
];

/** "Quick start tips" box under the list: a bold lead-in followed by grey body text (both exactly as authored). */
export const QUICK_START_TIPS: { lead: string; body: string }[] = [
  { lead: "Time periods just work.", body: ' Say "last week", "this month", "last 30 days", or even a date range like "June 1 to June 8".' },
  { lead: "Names just work.", body: " Use your setter's first name — \"How did Sarah do last week?\"" },
  { lead: "Stack prompts.", body: ' Every answer can feed the next: "Now turn that into a Google Doc" or "Now write the scripts for those."' },
  { lead: "Privacy: ", body: "Claude sees AI-generated summaries and aggregates of your conversations — not raw DM transcripts." },
];
