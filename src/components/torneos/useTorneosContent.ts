"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { torneosContent, type TorneosContent } from "@/lib/torneos-content";

/**
 * Torneos landing copy for the locale currently selected in the navbar.
 * Reuses the site-wide LanguageProvider — no separate language state.
 */
export function useTorneosContent(): TorneosContent {
  const { locale } = useLanguage();
  return torneosContent[locale];
}
