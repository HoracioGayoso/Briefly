import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "x-vercel-toolbar",
            value: "disabled",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
