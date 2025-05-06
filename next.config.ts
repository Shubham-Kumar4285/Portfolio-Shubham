import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: false ,
    eslint: {
        ignoreDuringBuilds: true, // ✅ Correct location
      }
};

export default nextConfig;
