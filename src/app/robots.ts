import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/siteSettingsStore";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();

  // Staging and pre-launch: keep the whole site out of every index.
  if (settings.discourageSearchEngines) {
    return {
      rules: { userAgent: "*", disallow: "/" },
      host: settings.siteUrl,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The console is authenticated, but there is no reason to advertise it
      // or the API surface to crawlers.
      disallow: ["/admin", "/admin/", "/api/", ...settings.robotsDisallow],
    },
    sitemap: `${settings.siteUrl}/sitemap.xml`,
    host: settings.siteUrl,
  };
}
