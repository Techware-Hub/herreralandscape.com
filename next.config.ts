import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All site imagery is optimized and served locally from
    // /public/assets/images (WebP). remotePatterns are only needed if the client
    // later hosts photos on an external CDN.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
    ];
  },
};

export default nextConfig;
