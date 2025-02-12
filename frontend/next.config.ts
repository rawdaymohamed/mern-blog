import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      }, {
        protocol: 'https',
        hostname: 'images.clerk.dev',
        port: '',
      },
    ],
  },
  missingSuspenseWithCSRBailout: false,
};

export default nextConfig;
