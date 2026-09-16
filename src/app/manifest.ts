import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/siteSettingsStore";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings();

  return {
    name: `${settings.siteName} — Enterprise Software Engineering`,
    short_name: settings.siteName,
    description: settings.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f9f9",
    theme_color: "#000838",
    icons: [
      {
        src: "/brand-logo-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand-logo-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
