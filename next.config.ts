import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        optimizeCss: false
    },
    images: {
        unoptimized: false, // Enable image optimization
        formats: ['image/webp'], // Use WebP for better compression
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
    trailingSlash: false,
};

export default nextConfig;
