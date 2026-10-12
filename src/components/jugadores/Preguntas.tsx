"use client";

import { Plus } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";

/** FAQ as native <details>, so it works without JavaScript. */
export function Preguntas() {
  const { t } = useLanguage();
  const copy = t.home.faq;

  return (
    <section id="preguntas" className="scroll-mt-20 border-b border-white/[0.07]">
      <span id="faq" aria-hidden="true" className="block -translate-y-20" />
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[1fr_1.6fr]">
        <h2 className="text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white">{copy.title}</h2>
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {copy.items.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus aria-hidden="true" className="h-5 w-5 shrink-0 text-white/50 transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-5 pr-8 leading-relaxed text-white/70">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
