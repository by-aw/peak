/**
 * Copy and assets for the home "Features Section" (five scroll-pinned feature blocks).
 * Text is verbatim from the Framer dump.
 */
export type FeatureCopy = {
  label: string;
  heading: string;
  /** Body copy. `accent` (purple, #a855f7) is appended after `body` inside the same paragraph. */
  body: string;
  accent?: string;
  /** Mochi mascot shown bottom-left of the pinned area (desktop/tablet only). */
  mascot: { src: string; width: number; height: number };
};

export const CTA_HREF = "https://use.themochi.app";

export const FEATURES: FeatureCopy[] = [
  {
    label: "Organized Inbox Tab",
    heading: "Know which leads need attention",
    body: "Automatically organize every conversation by priority, qualification, owner and next action. ",
    accent: "Each setter gets a clean inbox instead of a wall of random DMs.",
    mascot: { src: "/framer/nmTVje4VbI2sdvsuAY5PkEZgbE.png", width: 137, height: 100 },
  },
  {
    label: "Automations",
    heading: "Automate the first touchpoint, then optimize it",
    body: "Trigger DMs from comments, keywords, stories and ads. Then split test your scripts to see which flow creates more replies, qualified leads and booked calls.",
    mascot: { src: "/framer/5MwVNgahB39cHAnTfwyIsbl9c.png", width: 154, height: 140 },
  },
  {
    label: "AI Agent",
    heading: "Give every setter an AI copilot",
    body: "Mochi reads the conversation and suggests the next best response. Your team gets better guidance without sounding robotic, and you decide when AI assists or takes over.",
    mascot: { src: "/framer/ErAp49hBQbfKGU5tcsMSWIH6OEY.png", width: 175, height: 140 },
  },
  {
    label: "AI Voice Cloning",
    heading: "Send voice notes that sound exactly like you",
    body: "Your setters type the message. Mochi turns it into a realistic voice note in your voice, complete with natural pacing and optional background sound.",
    mascot: { src: "/framer/jpjbIT5wTZ1oS40mx4TpPOAliho.png", width: 148, height: 140 },
  },
  {
    label: "AI CRM",
    heading: "Keep every lead updated automatically",
    body: "AI tags, lead stages and conversation summaries update in the background. Your CRM stays clean without setters spending hours on admin.",
    mascot: { src: "/framer/YzhmCx5bZrvqc6vyqCqmIpJ4iuw.png", width: 160, height: 140 },
  },
];
