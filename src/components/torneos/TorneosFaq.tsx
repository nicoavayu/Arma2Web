"use client";

import { Plus } from "lucide-react";

import { useTorneosContent } from "@/components/torneos/useTorneosContent";

export function TorneosFaq() {
  const copy = useTorneosContent().faq;

  return (
    <section id="torneos-faq" className="scroll-mt-16 bg-[#070711] text-white">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[1fr_1.6fr]">
        <h2 className="text-[clamp(2rem,4.6vw,3.25rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em]">{copy.title}</h2>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {copy.items.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-semibold [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus aria-hidden="true" className="h-5 w-5 shrink-0 text-[#8f84ff] transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-5 pr-8 leading-relaxed text-white/70">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
