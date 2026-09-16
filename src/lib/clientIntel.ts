import { ClientIntel } from "@/data/chatTypes";

export async function collectBrowserIntel(): Promise<ClientIntel> {
  if (typeof window === "undefined") {
    return {
      ip: "103.21.244.0",
      country: "India",
      countryCode: "IN",
      city: "New Delhi",
      region: "Delhi",
      timezone: "Asia/Kolkata",
      browser: "Chrome",
      os: "Windows 11",
      deviceType: "Desktop"
    };
  }

  const nav = window.navigator as unknown as {
    userAgent?: string;
    language?: string;
    languages?: readonly string[];
    hardwareConcurrency?: number;
    deviceMemory?: number;
    maxTouchPoints?: number;
    platform?: string;
    cookieEnabled?: boolean;
    onLine?: boolean;
    connection?: {
      effectiveType?: string;
      type?: string;
      downlink?: number;
      rtt?: number;
      saveData?: boolean;
    };
    getBattery?: () => Promise<{
      level: number;
      charging: boolean;
    }>;
  };

  const userAgent = nav.userAgent || "";

  // Parse Browser & Version
  let browser = "Google Chrome";
  let browserVersion = "";
  if (userAgent.includes("Firefox/")) {
    browser = "Mozilla Firefox";
    browserVersion = userAgent.split("Firefox/")[1]?.split(" ")[0] || "";
  } else if (userAgent.includes("Edg/")) {
    browser = "Microsoft Edge";
    browserVersion = userAgent.split("Edg/")[1]?.split(" ")[0] || "";
  } else if (userAgent.includes("Chrome/")) {
    browser = "Google Chrome";
    browserVersion = userAgent.split("Chrome/")[1]?.split(" ")[0] || "";
  } else if (userAgent.includes("Safari/") && !userAgent.includes("Chrome/")) {
    browser = "Apple Safari";
    browserVersion = userAgent.split("Version/")[1]?.split(" ")[0] || "";
  } else if (userAgent.includes("OPR/") || userAgent.includes("Opera/")) {
    browser = "Opera";
    browserVersion = userAgent.split("OPR/")[1]?.split(" ")[0] || "";
  }

  // Parse Operating System
  let os = "Windows 11 / 10";
  if (userAgent.includes("Windows NT 10.0")) os = "Windows 11 / 10";
  else if (userAgent.includes("Windows NT 6.3")) os = "Windows 8.1";
  else if (userAgent.includes("Windows NT 6.1")) os = "Windows 7";
  else if (userAgent.includes("Macintosh") || userAgent.includes("Mac OS X")) os = "macOS";
  else if (userAgent.includes("Android")) os = "Android";
  else if (userAgent.includes("iPhone")) os = "iOS (iPhone)";
  else if (userAgent.includes("iPad")) os = "iPadOS";
  else if (userAgent.includes("Linux")) os = "Linux";

  // Device Type
  let deviceType: "Desktop" | "Mobile" | "Tablet" = "Desktop";
  if (/iPad|Tablet|PlayBook/i.test(userAgent)) deviceType = "Tablet";
  else if (/Mobi|Android|iPhone|iPod/i.test(userAgent)) deviceType = "Mobile";

  // Screen & Dimensions
  const screenResolution = `${window.screen?.width || 1920} x ${window.screen?.height || 1080}`;
  const windowSize = `${window.innerWidth} x ${window.innerHeight}`;
  const colorDepth = `${window.screen?.colorDepth || 24}-bit`;
  const devicePixelRatio = window.devicePixelRatio || 1;

  // Timezone & Locale
  let timezone = "UTC";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {}
  const localTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const language = nav.language || "en-US";
  const languages = nav.languages && nav.languages.length > 0 ? Array.from(nav.languages) : [language];

  // Hardware specs
  const cpuCores = nav.hardwareConcurrency || 8;
  const deviceMemoryGb = nav.deviceMemory || 8;
  const touchPoints = nav.maxTouchPoints || 0;
  const platform = nav.platform || "Win32";
  const cookiesEnabled = nav.cookieEnabled ?? true;
  const online = nav.onLine ?? true;

  // Network Telemetry
  let connectionType = "4G / Broadband";
  let downlinkSpeed = "10+ Mbps";
  let roundTripTime = "25 ms";
  if (nav.connection) {
    if (nav.connection.effectiveType) {
      connectionType = nav.connection.effectiveType.toUpperCase();
    }
    if (nav.connection.downlink) {
      downlinkSpeed = `${nav.connection.downlink} Mbps`;
    }
    if (nav.connection.rtt) {
      roundTripTime = `${nav.connection.rtt} ms`;
    }
  }

  // Navigation Context
  const referrerUrl = document.referrer ? document.referrer : "Direct Navigation";
  const currentPageUrl = window.location.href;

  // Battery status (if supported)
  let batteryStatus = "AC Power Connected (100%)";
  try {
    if (nav.getBattery) {
      const bat = await nav.getBattery();
      batteryStatus = `${bat.charging ? "⚡ Charging" : "🔋 Battery"} ${Math.round(bat.level * 100)}%`;
    }
  } catch {}

  // IP & Geolocation
  let ip = "103.21.244.15";
  let country = "India";
  let countryCode = "IN";
  let city = "New Delhi";
  let region = "Delhi";

  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data.ip) ip = data.ip;
      if (data.country_name) country = data.country_name;
      if (data.country_code) countryCode = data.country_code;
      if (data.city) city = data.city;
      if (data.region) region = data.region;
    }
  } catch {
    try {
      const res2 = await fetch("https://api.ipify.org?format=json");
      if (res2.ok) {
        const d2 = await res2.json();
        if (d2.ip) ip = d2.ip;
      }
    } catch {}
  }

  return {
    ip,
    country,
    countryCode,
    city,
    region,
    timezone,
    localTime,
    userAgent,
    browser,
    browserVersion,
    os,
    deviceType,
    screenResolution,
    windowSize,
    colorDepth,
    devicePixelRatio,
    cpuCores,
    deviceMemoryGb,
    language,
    languages,
    connectionType,
    downlinkSpeed,
    roundTripTime,
    referrerUrl,
    currentPageUrl,
    platform,
    cookiesEnabled,
    online,
    touchPoints,
    batteryStatus
  };
}
