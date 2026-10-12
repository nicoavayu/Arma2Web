"use client";

import { BrowserFrame } from "@/components/shared/BrowserFrame";
import { PhoneFrame } from "@/components/shared/PhoneFrame";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";

export function TorneosPublica() {
  const copy = useTorneosContent().publica;

  return (
    <section id="torneos-pagina-publica" className="scroll-mt-16 bg-[#070711] text-white">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-[clamp(2rem,4.8vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em]">{copy.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">{copy.body}</p>
          <p className="mt-6 inline-flex rounded-lg border border-[#20e39b]/40 px-3 py-2 text-sm font-semibold text-[#20e39b]">{copy.noAccount}</p>
        </div>
        <div className="relative pb-12">
          <BrowserFrame id="torneos/publica-desktop" urlLabel={copy.urlLabel} sizes="(max-width: 1024px) 92vw, 700px" />
          <PhoneFrame id="torneos/publica-mobile" className="absolute -bottom-2 -left-2 w-[28%] max-w-[160px] border-[7px] sm:left-6" sizes="160px" />
        </div>
      </div>
    </section>
  );
}
