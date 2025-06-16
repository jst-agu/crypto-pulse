import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['coin-images.coingecko.com', 'assets.coingecko.com'],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
