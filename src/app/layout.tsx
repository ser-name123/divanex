import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import SecurityConsoleShield from "@/components/SecurityConsoleShield";
import ScrollToTop from "@/components/ScrollToTop";
import PageTransitionManager from "@/components/PageTransitionManager";
import WebsitePreloader from "@/components/WebsitePreloader";
import AiChatWidget from "@/components/chat/AiChatWidget";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { getSiteSettings, absoluteUrl } from "@/lib/siteSettingsStore";
import { getContent } from "@/lib/contentStore";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import { SiteContentProvider } from "@/context/SiteContentContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000838",
};

/**
 * Site-wide metadata defaults.
 *
 * Deliberately no `alternates.canonical` here. Next merges the root metadata
 * into every page, so a canonical at this level became the canonical of every
 * page that did not set its own — telling search engines that a dozen distinct
 * pages were all duplicates of the homepage. Each page declares its own via
 * buildPageMetadata() in src/lib/seo.ts.
 */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL(settings.siteUrl),
    title: {
      default: settings.defaultTitle,
      template: settings.titleTemplate,
    },
    description: settings.defaultDescription,
    keywords: settings.keywords,
    authors: [{ name: `${settings.siteName} Engineering Team`, url: settings.siteUrl }],
    creator: settings.siteName,
    publisher: settings.siteName,
    applicationName: settings.siteName,
    icons: {
      icon: [
        { url: "/brand-logo-icon.png", type: "image/png" },
        { url: "/favicon.ico" },
      ],
      shortcut: ["/brand-logo-icon.png"],
      apple: [{ url: "/brand-logo-icon.png", sizes: "180x180", type: "image/png" }],
    },
    verification: {
      ...(settings.googleSiteVerification ? { google: settings.googleSiteVerification } : {}),
      ...(settings.bingSiteVerification
        ? { other: { "msvalidate.01": settings.bingSiteVerification } }
        : {}),
    },
    robots: settings.discourageSearchEngines
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: settings.defaultTitle,
      description: settings.defaultDescription,
      url: settings.siteUrl,
      siteName: settings.siteName,
      images: [
        {
          url: absoluteUrl(settings, settings.defaultOgImage),
          width: 1200,
          height: 630,
          alt: `${settings.siteName} — ${settings.legalName}`,
        },
      ],
      locale: settings.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.defaultTitle,
      description: settings.defaultDescription,
      images: [absoluteUrl(settings, settings.defaultOgImage)],
      creator: settings.twitterHandle,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // One cached read each per render, shared with every client component below
  // through the providers. The header, footer and closing call-to-action need
  // all three on every route, so fetching them here is three reads per render
  // instead of three per section.
  const [siteConfig, navigation, pages, sections] = await Promise.all([
    getContent("site-config"),
    getContent("navigation"),
    getContent("pages"),
    getContent("sections"),
  ]);

  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/brand-logo-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/brand-logo-icon.png" />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} bg-[#f7f9f9] text-slate-900 min-h-screen antialiased selection:bg-cyan-500 selection:text-white`}
      >
        <SiteConfigProvider config={siteConfig}>
        <SiteContentProvider navigation={navigation} pages={pages} sections={sections}>
        <CurrencyProvider>
          <WebsitePreloader />
          <Suspense fallback={null}>
            <PageTransitionManager />
          </Suspense>
          <SecurityConsoleShield />
          {children}
          {/* Futuristic Floating Scroll-To-Top & Progress Indicator */}
          <ScrollToTop />
          {/* Enterprise AI Live Chat & Support Widget */}
          <AiChatWidget />
        </CurrencyProvider>
        </SiteContentProvider>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
