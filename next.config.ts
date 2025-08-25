import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: false ,
    eslint: {
        ignoreDuringBuilds: true, // ✅ Correct location
      }
    ,
    experimental: {

    optimizeCss: false
  },
  images: {
        unoptimized: true, // Disables all image optimizations globally
    },
assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
    trailingSlash: false,
    // Disable webpack optimization for images
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(png|jpe?g|gif|svg)$/,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: '/_next/static/images/',
                    outputPath: 'static/images/',
                    limit: false, // Disable optimization
                }
            }
        });
        return config;
    }
};

export default nextConfig;
