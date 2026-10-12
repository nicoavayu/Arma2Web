"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { BalanceDemo } from "@/components/jugadores/BalanceDemo";

/** The signature section: how the group's votes become two even teams. */
export function ComoSeArman() {
  const { t } = useLanguage();
  const copy = t.home.balance;

  return (
    <section id="como-se-arman" className="scroll-mt-20 border-b border-white/[0.07]">
      <span id="how-it-works" aria-hidden="true" className="block -translate-y-20" />
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <h2 className="text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white">{copy.title}</h2>
          <p className="mt-5 text-lg text-[#a3a8b8]">{copy.lead}</p>
          <ol className="mt-8 space-y-5">
            {copy.steps.map((step, index) => (
              <li key={step} className="grid grid-cols-[2.25rem_1fr] gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-sm font-semibold tabular-nums text-white">
                  {index + 1}
                </span>
                <p className="pt-1.5 leading-relaxed text-white/80">{step}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:pt-2">
          <BalanceDemo />
        </div>
      </div>
    </section>
  );
}
