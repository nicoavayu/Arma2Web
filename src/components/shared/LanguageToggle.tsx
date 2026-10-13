"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

/** ES/EN switch shared by both sites. */
export function LanguageToggle({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const { locale, setLocale, t } = useLanguage();

  // Subtle on purpose: plain letters, the active one on a soft violet chip; the hit area stays 44px tall.
  return (
    <div role="group" aria-label={t.nav.languageLabel} className="inline-flex items-center">
      {(["es", "en"] as const).map((value) => {
        const active = locale === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setLocale(value)}
            aria-pressed={active}
            className="group inline-flex min-h-11 min-w-9 items-center justify-center text-[11px] font-semibold uppercase tracking-[0.12em]"
          >
            <span
              className={cn(
                "rounded-md px-1.5 py-1 transition-colors",
                active
                  ? tone === "ink"
                    ? "bg-[#7b5cff]/30 text-white"
                    : "bg-[#070711] text-white"
                  : tone === "ink"
                    ? "text-white/55 group-hover:text-white"
                    : "text-[#070711]/55 group-hover:text-[#070711]",
              )}
            >
              {value}
            </span>
          </button>
        );
      })}
    </div>
  );
}
