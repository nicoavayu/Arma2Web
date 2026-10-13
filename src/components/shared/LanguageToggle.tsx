"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

/** ES/EN switch shared by both sites. */
export function LanguageToggle({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className={cn(
        "inline-flex items-center rounded-full border p-0.5",
        tone === "ink" ? "border-white/15" : "border-[#070711]/20",
      )}
    >
      {(["es", "en"] as const).map((value) => {
        const active = locale === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setLocale(value)}
            aria-pressed={active}
            className={cn(
              "min-h-11 min-w-[2.4rem] rounded-full px-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors",
              active
                ? tone === "ink"
                  ? "bg-[#27b8ff] text-[#070711]"
                  : "bg-[#070711] text-white"
                : tone === "ink"
                  ? "text-white/65 hover:text-white"
                  : "text-[#070711]/60 hover:text-[#070711]",
            )}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
}
