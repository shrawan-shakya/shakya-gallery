import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/collection/:slug",
        destination: "/category/:slug",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.shakyagallery.com",
          },
        ],
        destination: "https://shakyagallery.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
