"use client";

import { Plus } from "lucide-react";

import { useTorneosContent } from "@/components/torneos/useTorneosContent";

/** FAQ as native <details>; also feeds the FAQPage JSON-LD (torneos-jsonld.ts). */
export function TorneosFaq() {
  const copy = useTorneosContent().faq;

  return (
    <section id="torneos-faq" className="relative overflow-hidden bg-[#04050d] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_45%_at_10%_20%,rgba(108,77,255,0.16),transparent_70%)]" />
      <div className="relative grid gap-10 px-[clamp(20px,6vw,104px)] py-16 md:py-32 lg:grid-cols-[1fr_1.5fr]">
        <h2 className="disp-t text-[clamp(2.6rem,5vw,4.6rem)]">{copy.title}</h2>
        <div className="grid gap-3">
          {copy.items.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-white/10 bg-white/[0.035] px-5 transition-colors open:border-white/20 open:bg-white/[0.06]">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-semibold md:text-lg [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.08] transition-transform group-open:rotate-45">
                  <Plus aria-hidden="true" className="h-4 w-4 text-[#b8a8ff]" />
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
