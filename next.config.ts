import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for Docker / Dokploy deployment
  output: "standalone",

  // Pin the file-tracing root to this project so the standalone bundle is
  // emitted at .next/standalone/server.js (avoids parent-lockfile root inference).
  outputFileTracingRoot: import.meta.dirname,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression
  compress: true,

  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,

  // Production optimizations
  experimental: {
    optimizePackageImports: ['three', 'lucide-react'],
  },

  // Output optimization
  productionBrowserSourceMaps: false,
};

export default nextConfig;
