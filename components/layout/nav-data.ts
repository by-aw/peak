import type { ComponentType, SVGProps } from "react";
import { ClaudeIcon, MetaIcon, ZapierIcon } from "@/components/icons/nav-icons";

export type MenuItem = {
  title: string;
  description: string;
  href: string;
  /**
   * Icon in the 48px tile: an SVG from /public drawn at its own size (mochi-web-v2 Figma, node 546:2244), or one of
   * the Framer brand icons sized by `className`.
   */
  icon?: { src: string; size: number } | { Svg: ComponentType<SVGProps<SVGSVGElement>>; className: string };
};

export type MenuSection = {
  /** Uppercase heading shown in the desktop mega menu. */
  heading: string;
  /** Accordion label in the phone menu. */
  mobileLabel: string;
  items: MenuItem[];
  /** Secondary grey list rendered under the items (Data Hub only). */
  subItems?: MenuItem[];
};

/** "Features" dropdown contents, copied verbatim from the Framer mega menu. */
export const menuSections: MenuSection[] = [
  {
    heading: "PRODUCT FEATURES",
    mobileLabel: "Features",
    items: [
      { title: "Reply Agent", description: "AI replies in your voice.", href: "/reply-agent", icon: { src: "/icon-arrow-share-left.svg", size: 20 } },
      { title: "Priority Inbox", description: "Best leads answered first.", href: "/features/priority-inbox", icon: { src: "/icon-inbox-empty.svg", size: 20 } },
      { title: "Personalization", description: "Every reply fits the lead.", href: "/features/personalization", icon: { src: "/icon-user-heart.svg", size: 20 } },
      { title: "Sales Performance", description: "See which DMs become calls.", href: "/features/sales-performance", icon: { src: "/icon-chart-4.svg", size: 20 } },
      { title: "Team Collaboration", description: "Your whole team, one inbox.", href: "/features/team-collaboration", icon: { src: "/icon-team.svg", size: 20 } },
    ],
  },
  {
    heading: "DATA HUB",
    mobileLabel: "Data Hub",
    items: [
      { title: "Attribution Tracking", description: "See which posts start DMs.", href: "/attribution", icon: { src: "/icon-tag.svg", size: 20 } },
    ],
    subItems: [
      { title: "DM Links", description: "Know who clicked and bought.", href: "/attribution/dm-links" },
      { title: "YouTube Tracking", description: "See which videos start DMs.", href: "/attribution/youtube-tracking" },
      { title: "Pixel Tracking", description: "Link your site to your DMs.", href: "/attribution/tracking-pixel" },
      { title: "Lead Profiles", description: "Everything about one lead.", href: "/attribution/lead-profiles" },
    ],
  },
  {
    heading: "INTEGRATIONS",
    mobileLabel: "Connectors",
    items: [
      { title: "Claude MCP", description: "Ask Claude about your DMs.", href: "/mcp", icon: { Svg: ClaudeIcon, className: "h-6 w-6" } },
      { title: "Zapier", description: "Connect 6,000+ other tools.", href: "/zapier", icon: { Svg: ZapierIcon, className: "h-[22px] w-[22px]" } },
      { title: "Meta Ads", description: "Show Meta who actually buys.", href: "/meta-ads", icon: { Svg: MetaIcon, className: "h-[19px] w-7" } },
      { title: "Payments", description: "Match payments to leads.", href: "/payments", icon: { src: "/icon-currency-dollar.svg", size: 24 } },
    ],
  },
];

export const navLinks = [
  { label: "Blog", href: "/updates" },
  { label: "Download", href: "/download" },
];

export const LOGIN_URL = "https://use.themochi.app";
export const SIGNUP_URL = "https://use.themochi.app/login";
