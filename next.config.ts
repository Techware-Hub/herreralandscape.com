import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder imagery is served locally from /public/images as SVG so the
    // site builds with no network access and no missing images. When the client
    // supplies real photos, drop them into /public/images (same paths) or add an
    // external CDN host below.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
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
