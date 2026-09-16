import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/lib/siteSettingsStore";

/**
 * The social card, generated per request from the settings record.
 *
 * The previous card pointed at /brand-logo-icon.png, which is 710x898 —
 * a portrait logo declared to the platforms as 1200x630. Twitter, LinkedIn and
 * Slack all letterbox or centre-crop that, so shares showed a sliver of the
 * logo on a grey field. Generating the image means it is always the right
 * shape, and it picks up whatever the admin sets as the site name and
 * description without anyone having to open a design tool.
 */

export const alt = "Divanex — Enterprise SaaS, AI Agents & Cloud Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const settings = await getSiteSettings();

  // The real logo mark, inlined. ImageResponse cannot fetch /public over HTTP
  // while the card is being prerendered, so the bytes are read off disk and
  // embedded rather than referenced by URL.
  const markData = await fs.readFile(
    path.join(process.cwd(), "public", "brand-logo-icon-192.png")
  );
  const mark = `data:image/png;base64,${markData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #000838 0%, #0a1130 55%, #123f3d 100%)",
          color: "#f7f9f9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mark} width={52} height={52} alt="" />
          </div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {settings.siteName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "62px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
            }}
          >
            {settings.defaultTitle.split("|")[0].trim()}
          </div>
          <div
            style={{
              fontSize: "27px",
              lineHeight: 1.4,
              color: "#a3a8b1",
              maxWidth: "940px",
            }}
          >
            {settings.defaultDescription.slice(0, 150)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "24px",
            color: "#35b5ac",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: "44px",
              height: "4px",
              borderRadius: "999px",
              background: "#35b5ac",
            }}
          />
          {settings.siteUrl.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size
  );
}
