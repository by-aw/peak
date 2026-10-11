import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// AI crawlers the live site explicitly allows, each as its own group (same order as live).
const AI_BOTS = [
  "ChatGPT-User",
  "OAI-SearchBot",
  "GPTBot",
  "Claude-User",
  "Claude-SearchBot",
  "ClaudeBot",
  "Perplexity-User",
  "PerplexityBot",
  "Google-Extended",
  "DeepSeekBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/calculator", "/proposal", "/login", "/admin"],
      },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
