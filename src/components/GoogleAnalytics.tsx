"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

/**
 * The Google tag.
 *
 * The measurement id comes from site settings rather than the source, so a
 * staging deploy can clear it and stop reporting without a code change, and a
 * new property can be pointed at without one either.
 *
 * Nothing renders for the admin console. Those pageviews are staff using a
 * tool, not visitors reading the site, and counting them quietly distorts
 * every engagement figure the property reports. That surface also runs under a
 * strict nonce policy, which would refuse the script and log an error on every
 * admin page load.
 *
 * `afterInteractive` keeps the tag off the critical path — it is measurement,
 * not content, and the mobile LCP here has no room to spare.
 */

const ID_PATTERN = /^G-[A-Z0-9]{4,}$/i;

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const id = measurementId.trim();

  // A malformed id would inject a broken URL into every page; silence beats that.
  if (!ID_PATTERN.test(id)) return null;
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <Script
        id="ga-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
      />
      <Script id="ga-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(id)});`}
      </Script>
    </>
  );
}
