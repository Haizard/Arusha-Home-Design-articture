import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "maramani.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.maramani.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
