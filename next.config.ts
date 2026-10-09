import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Framer-hosted assets are mirrored into /public/framer; keep the CDN
    // allowed for anything not yet mirrored.
    remotePatterns: [{ protocol: "https", hostname: "framerusercontent.com" }],
  },
};

export default nextConfig;
