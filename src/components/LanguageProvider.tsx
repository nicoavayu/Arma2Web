"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  Locale,
  TranslationDictionary,
  isLocale,
  translations,
} from "@/lib/i18n";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationDictionary;
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

function updateMeta(selector: string, content: string) {
  const meta = document.querySelector(selector);
  if (meta) {
    meta.setAttribute("content", content);
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [locale, setLocale] = React.useState<Locale>(DEFAULT_LOCALE);

  React.useEffect(() => {
    const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(savedLocale)) {
      setLocale(savedLocale);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  React.useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const { title, description } = translations[locale].seo;
    document.title = title;
    updateMeta('meta[name="description"]', description);
    updateMeta('meta[property="og:title"]', title);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[name="twitter:title"]', title);
    updateMeta('meta[name="twitter:description"]', description);
  }, [locale, pathname]);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t: translations[locale],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
