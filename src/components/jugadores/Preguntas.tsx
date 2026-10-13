"use client";

import { Plus } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";

/** FAQ as native <details>, so it works without JavaScript. Feeds the FAQPage JSON-LD. */
export function Preguntas() {
  const { t } = useLanguage();
  const copy = t.home.faq;

  return (
    <section id="preguntas" className="relative overflow-hidden bg-[#05040d]">
      <span id="faq" aria-hidden="true" className="absolute top-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_50%_at_15%_20%,rgba(123,92,255,0.18),transparent_70%),radial-gradient(40%_45%_at_90%_90%,rgba(39,184,255,0.12),transparent_70%)]"
      />
      <div className="relative grid gap-10 px-[clamp(20px,6vw,104px)] py-16 md:py-32 lg:grid-cols-[1fr_1.5fr]">
        <h2 className="text-[clamp(2.2rem,4.6vw,4.2rem)] font-extrabold leading-[1] tracking-[-0.045em] text-white">{copy.title}</h2>
        <div className="grid gap-3">
          {copy.items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-white/10 bg-white/[0.035] px-5 transition-colors open:border-white/20 open:bg-white/[0.06]"
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-semibold text-white md:text-lg [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.08] transition-transform group-open:rotate-45">
                  <Plus aria-hidden="true" className="h-4 w-4 text-white/80" />
                </span>
              </summary>
              <p className="pb-6 pr-10 leading-relaxed text-white/75">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
