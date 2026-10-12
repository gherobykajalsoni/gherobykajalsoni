import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private or transactional areas: no value in search results.
        disallow: ["/admin", "/pos", "/api/", "/account", "/cart", "/checkout", "/login", "/verify"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
