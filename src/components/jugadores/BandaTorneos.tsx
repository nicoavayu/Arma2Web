"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { SiteSwitch } from "@/components/shared/SiteSwitch";

/** The only paper-toned block on the players site: a doorway to Torneos. */
export function BandaTorneos() {
  const { t } = useLanguage();
  const copy = t.home.torneosBand;

  return (
    <section id="torneos" className="scroll-mt-20 bg-[#f5f1e9] text-[#070711]">
      <div className="mx-auto grid max-w-[1200px] items-end gap-8 px-4 py-16 md:px-6 md:py-20 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-[clamp(1.9rem,4vw,2.75rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.04em]">{copy.title}</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#44465a]">{copy.body}</p>
        </div>
        <div className="lg:justify-self-end">
          <SiteSwitch
            to="torneos"
            label={copy.cta}
            className="min-h-12 rounded-lg bg-[#070711] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#5b4bff]"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#44465a]">{copy.players}</p>
        </div>
      </div>
    </section>
  );
}
