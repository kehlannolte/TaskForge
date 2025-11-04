// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" }, // covers other lh*. subdomains
      { protocol: "https", hostname: "avatars.githubusercontent.com" }, // optional
    ],
  },
};

export default nextConfig;