import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Allow uploads up to 15 MB through Server Actions
      // (env MAX_UPLOAD_MB defaults to 10, so 15 MB gives headroom)
      bodySizeLimit: "15mb"
    }
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" }
    ]
  }
};

export default nextConfig;
