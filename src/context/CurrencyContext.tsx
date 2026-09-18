"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP" | "AED" | "AUD" | "CAD" | "SGD";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // Against 1.0 USD baseline
  flag: string;
  locale: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.5, flag: "🇮🇳", locale: "en-IN" },
  USD: { code: "USD", symbol: "$", name: "US Dollar", rate: 1.0, flag: "🇺🇸", locale: "en-US" },
  EUR: { code: "EUR", symbol: "€", name: "Euro", rate: 0.92, flag: "🇪🇺", locale: "de-DE" },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", rate: 0.78, flag: "🇬🇧", locale: "en-GB" },
  AED: { code: "AED", symbol: "AED ", name: "UAE Dirham", rate: 3.67, flag: "🇦🇪", locale: "en-AE" },
  AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar", rate: 1.52, flag: "🇦🇺", locale: "en-AU" },
  CAD: { code: "CAD", symbol: "C$", name: "Canadian Dollar", rate: 1.36, flag: "🇨🇦", locale: "en-CA" },
  SGD: { code: "SGD", symbol: "S$", name: "Singapore Dollar", rate: 1.34, flag: "🇸🇬", locale: "en-SG" },
};

const COUNTRY_TO_CURRENCY: Record<string, CurrencyCode> = {
  IN: "INR",
  US: "USD",
  GB: "GBP",
  UK: "GBP",
  AE: "AED",
  SA: "AED",
  QA: "AED",
  KW: "AED",
  OM: "AED",
  BH: "AED",
  AU: "AUD",
  NZ: "AUD",
  CA: "CAD",
  SG: "SGD",
  MY: "SGD",
  HK: "SGD",
  JP: "SGD",
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  BE: "EUR",
  AT: "EUR",
  PT: "EUR",
  IE: "EUR",
  FI: "EUR",
  GR: "EUR",
  PL: "EUR",
  SE: "EUR",
  CH: "EUR",
  NO: "EUR",
  DK: "EUR",
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  currencies: typeof CURRENCIES;
  currentConfig: CurrencyConfig;
  formatUSD: (amountUSD: number, customCode?: CurrencyCode) => string;
  convertPriceString: (priceStr: string, customCode?: CurrencyCode) => string;
  isAutoDetected: boolean;
  userCountry: string;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [userCountry, setUserCountry] = useState<string>("US");
  const [isAutoDetected, setIsAutoDetected] = useState(false);

  useEffect(() => {
    // 1. Instant Timezone & Locale Heuristic (Zero Delay)
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      const locale = typeof navigator !== "undefined" ? navigator.language || "" : "";

      let heuristicCurrency: CurrencyCode = "USD";
      let heuristicCountry = "US";
      let matched = false;

      if (
        tz.includes("Kolkata") ||
        tz.includes("Calcutta") ||
        tz.includes("Asia/Colombo") ||
        tz.includes("Asia/Kathmandu") ||
        locale.startsWith("hi") ||
        locale.includes("en-IN")
      ) {
        heuristicCurrency = "INR";
        heuristicCountry = "IN";
        matched = true;
      } else if (
        tz.includes("London") ||
        tz.includes("Europe/London") ||
        locale.includes("en-GB")
      ) {
        heuristicCurrency = "GBP";
        heuristicCountry = "GB";
        matched = true;
      } else if (
        tz.includes("Berlin") ||
        tz.includes("Paris") ||
        tz.includes("Rome") ||
        tz.includes("Madrid") ||
        tz.includes("Amsterdam") ||
        tz.includes("Europe/")
      ) {
        heuristicCurrency = "EUR";
        heuristicCountry = "EU";
        matched = true;
      } else if (
        tz.includes("Dubai") ||
        tz.includes("Riyadh") ||
        tz.includes("Qatar") ||
        tz.includes("Muscat") ||
        tz.includes("Kuwait") ||
        locale.startsWith("ar")
      ) {
        heuristicCurrency = "AED";
        heuristicCountry = "AE";
        matched = true;
      } else if (
        tz.includes("Sydney") ||
        tz.includes("Melbourne") ||
        tz.includes("Brisbane") ||
        tz.includes("Perth") ||
        tz.includes("Australia") ||
        locale.includes("en-AU")
      ) {
        heuristicCurrency = "AUD";
        heuristicCountry = "AU";
        matched = true;
      } else if (
        tz.includes("Toronto") ||
        tz.includes("Vancouver") ||
        tz.includes("Montreal") ||
        tz.includes("Canada") ||
        locale.includes("en-CA") ||
        locale.includes("fr-CA")
      ) {
        heuristicCurrency = "CAD";
        heuristicCountry = "CA";
        matched = true;
      } else if (
        tz.includes("Singapore") ||
        tz.includes("Asia/Singapore") ||
        locale.includes("en-SG")
      ) {
        heuristicCurrency = "SGD";
        heuristicCountry = "SG";
        matched = true;
      }

      /**
       * The browser's region, for anywhere the timezone list above does not
       * name: "en-NZ" gives NZ, "de-CH" gives CH.
       *
       * Only consulted when nothing matched. The timezone says where the
       * machine is; the locale says which language it was set up in, and the
       * two disagree often enough — an Indian visitor on en-US is ordinary —
       * that letting the region win would make the guess worse, not better.
       */
      const region = matched ? "" : new Intl.Locale(locale).region;
      if (region && COUNTRY_TO_CURRENCY[region]) {
        heuristicCurrency = COUNTRY_TO_CURRENCY[region];
        heuristicCountry = region;
      }

      setCurrencyState(heuristicCurrency);
      setUserCountry(heuristicCountry);
      setIsAutoDetected(true);
    } catch {
      // Fallback
    }

    /**
     * There used to be a second pass here that asked api.country.is for the
     * visitor's country.
     *
     * It never worked: the site's Content Security Policy does not list that
     * origin, so the browser refused every call and logged the refusal on each
     * page load. It was also the one thing on the site that handed a visitor's
     * address to a third party, for a guess the timezone above already makes.
     */
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    if (CURRENCIES[code]) {
      setCurrencyState(code);
    }
  };

  const currentConfig = useMemo(() => CURRENCIES[currency] || CURRENCIES.USD, [currency]);

  // Formatter for numeric USD values
  const formatUSD = (amountUSD: number, customCode?: CurrencyCode): string => {
    const active = customCode ? CURRENCIES[customCode] || currentConfig : currentConfig;
    const converted = Math.round(amountUSD * active.rate);

    try {
      const formatted = new Intl.NumberFormat(active.locale, {
        maximumFractionDigits: 0,
      }).format(converted);

      return `${active.symbol}${formatted}`;
    } catch {
      return `${active.symbol}${converted.toLocaleString()}`;
    }
  };

  // String price converter (e.g. "$6,500 - $11,000" -> "₹5,42,000 - ₹9,18,000")
  const convertPriceString = (priceStr: string, customCode?: CurrencyCode): string => {
    if (!priceStr || typeof priceStr !== "string") return priceStr;
    const active = customCode ? CURRENCIES[customCode] || currentConfig : currentConfig;

    if (active.code === "USD") return priceStr;

    return priceStr.replace(/\$\s?([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]+)?|\d+)(k)?(\+)?/gi, (_match, numStr, isK, isPlus) => {
      let numericVal = parseFloat(numStr.replace(/,/g, ""));
      if (isK) numericVal *= 1000;
      if (isNaN(numericVal)) return _match;

      const converted = Math.round(numericVal * active.rate);
      let formattedNum = "";

      try {
        formattedNum = new Intl.NumberFormat(active.locale, {
          maximumFractionDigits: 0,
        }).format(converted);
      } catch {
        formattedNum = converted.toLocaleString();
      }

      return `${active.symbol}${formattedNum}${isPlus ? "+" : ""}`;
    });
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currencies: CURRENCIES,
        currentConfig,
        formatUSD,
        convertPriceString,
        isAutoDetected,
        userCountry,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    return {
      currency: "USD" as CurrencyCode,
      setCurrency: () => {},
      currencies: CURRENCIES,
      currentConfig: CURRENCIES.USD,
      formatUSD: (val: number) => `$${val.toLocaleString()}`,
      convertPriceString: (str: string) => str,
      isAutoDetected: false,
      userCountry: "US",
    };
  }
  return context;
}
