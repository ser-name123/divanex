"use client";

import { createContext, useContext } from "react";
import { DEFAULT_SITE_CONFIG, type SiteConfig } from "@/data/siteContent";

/**
 * Site configuration, loaded once on the server and handed to the client tree.
 *
 * Navbar, Hero and Footer need this on every page, so fetching it in the root
 * layout is one read per render rather than one per component. The record is
 * small — copy, contact details and a few toggles — so carrying it in the RSC
 * payload costs far less than the round trips it removes.
 */
const SiteConfigContext = createContext<SiteConfig>(DEFAULT_SITE_CONFIG);

export function SiteConfigProvider({
  config,
  children,
}: {
  config: SiteConfig;
  children: React.ReactNode;
}) {
  return <SiteConfigContext.Provider value={config}>{children}</SiteConfigContext.Provider>;
}

/** Falls back to the built-in defaults, so a component never renders blank. */
export function useSiteConfig(): SiteConfig {
  return useContext(SiteConfigContext);
}
