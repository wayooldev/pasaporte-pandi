import type { MetadataRoute } from "next";
import { brandConfig } from "@/config/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/sign-in", "/sign-in/", "/sign-up", "/sign-up/"],
      },
    ],
    sitemap: `${brandConfig.siteUrl}/sitemap.xml`,
    host: brandConfig.siteUrl,
  };
}
