import type { MetadataRoute } from "next";
import { SITE_PHASE, SITE_URL } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (SITE_PHASE === "waitlist") {
    return {
      rules: [
        { userAgent: "*", allow: "/" },
        { userAgent: "*", disallow: "/inscripciones" },
      ],
      sitemap: `${SITE_URL}/sitemap.xml`,
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
