import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-e0dfe07f302b47a3adfaa7cbcdf4645e.r2.dev',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
