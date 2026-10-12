"use client";

import React from "react";

import { useLanguage } from "@/components/LanguageProvider";
import type { Locale } from "@/lib/i18n";

type Seo = { title: string; description: string };

function setMeta(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute("content", content);
}

/**
 * Keeps the document title and social meta in the visitor's language.
 * Each page passes its own copy, so the players site and the Torneos portal
 * never overwrite each other (both can be served at "/").
 */
export function LocalizedMeta({ seo }: { seo: Record<Locale, Seo> }) {
  const { locale } = useLanguage();

  React.useEffect(() => {
    const { title, description } = seo[locale];
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
  }, [locale, seo]);

  return null;
}
