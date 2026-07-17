import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getServiceSlugs } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/quote`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = getServiceSlugs().map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
