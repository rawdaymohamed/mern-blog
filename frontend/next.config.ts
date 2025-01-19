import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
};

export default nextConfig;
