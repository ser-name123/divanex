"use client";

import { createContext, useContext } from "react";
import { DEFAULT_NAVIGATION, type SiteNavigation } from "@/data/navigation";
import { DEFAULT_PAGE_SECTIONS, type PageSections } from "@/data/pageSections";
import {
  DEFAULT_PAGE_CONTENT,
  pageHeader,
  type PageContent,
  type PageHeaderContent,
} from "@/data/pageContent";

/**
 * Navigation and page copy, read once on the server and handed to the client
 * tree.
 *
 * The header, the footer and the closing call-to-action render on every page,
 * so these two records are fetched in the root layout rather than by each
 * page. Both are copy — a few tens of kilobytes — which costs far less in the
 * RSC payload than a fetch per section would cost in round trips.
 */
interface SiteContentValue {
  navigation: SiteNavigation;
  pages: PageContent;
  sections: PageSections;
}

const SiteContentContext = createContext<SiteContentValue>({
  navigation: DEFAULT_NAVIGATION,
  pages: DEFAULT_PAGE_CONTENT,
  sections: DEFAULT_PAGE_SECTIONS,
});

export function SiteContentProvider({
  navigation,
  pages,
  sections,
  children,
}: {
  navigation: SiteNavigation;
  pages: PageContent;
  sections: PageSections;
  children: React.ReactNode;
}) {
  return (
    <SiteContentContext.Provider value={{ navigation, pages, sections }}>
      {children}
    </SiteContentContext.Provider>
  );
}

/** Falls back to the built-in defaults, so nothing ever renders blank. */
export function useNavigation(): SiteNavigation {
  return useContext(SiteContentContext).navigation ?? DEFAULT_NAVIGATION;
}

export function usePageContent(): PageContent {
  const pages = useContext(SiteContentContext).pages;
  if (!pages) return DEFAULT_PAGE_CONTENT;
  return {
    ...DEFAULT_PAGE_CONTENT,
    ...pages,
    whyUsHeading: { ...DEFAULT_PAGE_CONTENT.whyUsHeading, ...(pages.whyUsHeading || {}) },
    comparisonHeading: { ...DEFAULT_PAGE_CONTENT.comparisonHeading, ...(pages.comparisonHeading || {}) },
    comparisonColumns: { ...DEFAULT_PAGE_CONTENT.comparisonColumns, ...(pages.comparisonColumns || {}) },
    processHeading: { ...DEFAULT_PAGE_CONTENT.processHeading, ...(pages.processHeading || {}) },
    faqHeading: { ...DEFAULT_PAGE_CONTENT.faqHeading, ...(pages.faqHeading || {}) },
    engagementHeading: { ...DEFAULT_PAGE_CONTENT.engagementHeading, ...(pages.engagementHeading || {}) },
    securityHeading: { ...DEFAULT_PAGE_CONTENT.securityHeading, ...(pages.securityHeading || {}) },
    headers: { ...DEFAULT_PAGE_CONTENT.headers, ...(pages.headers || {}) },
    ctaOverrides: { ...DEFAULT_PAGE_CONTENT.ctaOverrides, ...(pages.ctaOverrides || {}) },
    ctaBanner: { ...DEFAULT_PAGE_CONTENT.ctaBanner, ...(pages.ctaBanner || {}) },
  };
}

/** Copy for the per-page sections, keyed by section id. */
export function useSections(): PageSections {
  return useContext(SiteContentContext).sections ?? DEFAULT_PAGE_SECTIONS;
}

/** The editable header for one route. */
export function usePageHeader(route: string): PageHeaderContent {
  return pageHeader(usePageContent(), route);
}
