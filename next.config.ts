// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ disables type checking during `next build`
  },
};

export default nextConfig;

