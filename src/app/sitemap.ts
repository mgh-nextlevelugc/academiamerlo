import type { MetadataRoute } from "next";
import { SITE_PHASE, SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/privacidad`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terminos`, changeFrequency: "yearly", priority: 0.2 },
  ];

  if (SITE_PHASE === "launch") {
    entries.push({ url: `${SITE_URL}/lista`, changeFrequency: "monthly", priority: 0.5 });
  }

  return entries;
}
