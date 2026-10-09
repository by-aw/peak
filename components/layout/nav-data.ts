import type { ComponentType, SVGProps } from "react";
import {
  AttributionIcon,
  ClaudeIcon,
  MetaIcon,
  PaymentsIcon,
  PersonalizationIcon,
  PriorityInboxIcon,
  ReplyAgentIcon,
  SalesPerformanceIcon,
  TeamCollaborationIcon,
  ZapierIcon,
} from "@/components/icons/nav-icons";

export type MenuItem = {
  title: string;
  description: string;
  href: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Rendered icon box size (Framer sizes differ per icon). */
  iconClass?: string;
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
      { title: "Reply Agent", description: "AI replies in your voice.", href: "/reply-agent", icon: ReplyAgentIcon, iconClass: "h-5 w-5" },
      { title: "Priority Inbox", description: "Best leads answered first.", href: "/features/priority-inbox", icon: PriorityInboxIcon, iconClass: "h-[19px] w-[18px]" },
      { title: "Personalization", description: "Every reply fits the lead.", href: "/features/personalization", icon: PersonalizationIcon, iconClass: "h-[18px] w-[18px]" },
      { title: "Sales Performance", description: "See which DMs become calls.", href: "/features/sales-performance", icon: SalesPerformanceIcon, iconClass: "h-[18px] w-[18px]" },
      { title: "Team Collaboration", description: "Your whole team, one inbox.", href: "/features/team-collaboration", icon: TeamCollaborationIcon, iconClass: "h-[14px] w-6" },
    ],
  },
  {
    heading: "DATA HUB",
    mobileLabel: "Data Hub",
    items: [
      { title: "Attribution Tracking", description: "See which posts start DMs.", href: "/attribution", icon: AttributionIcon, iconClass: "h-[21px] w-[17px]" },
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
      { title: "Claude MCP", description: "Ask Claude about your DMs.", href: "/mcp", icon: ClaudeIcon, iconClass: "h-6 w-6" },
      { title: "Zapier", description: "Connect 6,000+ other tools.", href: "/zapier", icon: ZapierIcon, iconClass: "h-[22px] w-[22px]" },
      { title: "Meta Ads", description: "Show Meta who actually buys.", href: "/meta-ads", icon: MetaIcon, iconClass: "h-[19px] w-7" },
      { title: "Payments", description: "Match payments to leads.", href: "/payments", icon: PaymentsIcon, iconClass: "h-[18px] w-5" },
    ],
  },
];

export const navLinks = [
  { label: "Blog", href: "/updates" },
  { label: "Download", href: "/download" },
];

export const LOGIN_URL = "https://use.themochi.app";
export const SIGNUP_URL = "https://use.themochi.app/login";
