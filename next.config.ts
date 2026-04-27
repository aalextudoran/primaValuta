import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/api/rates": ["./data/**/*"],
    },
  },
};

export default nextConfig;
