import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Framer-hosted assets are mirrored into /public/framer; keep the CDN
    // allowed for anything not yet mirrored.
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com" },
      // Vercel Blob (CMS uploads); next/image proxies and caches these so Blob transfer is not charged per view.
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  // Old URLs the live Framer site permanently redirects (all 308s there too).
  async redirects() {
    return [
      { source: "/affiliate", destination: "/partner", permanent: true },
      { source: "/ai-setter", destination: "/reply-agent", permanent: true },
      { source: "/features/focus", destination: "/features/priority-inbox", permanent: true },
      // Misspelling is intentional: it's the old live URL.
      { source: "/features/personlization", destination: "/features/personalization", permanent: true },
    ];
  },
};

export default nextConfig;
