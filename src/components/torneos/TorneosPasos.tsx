"use client";

import { ArrowUpRight } from "lucide-react";

import { SECTION_PAD, SectionHead } from "@/components/torneos/SectionHead";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { getCreateTournamentTarget, TORNEOS_CONTACT_EMAIL } from "@/lib/torneos-links";
import { cn } from "@/lib/utils";

/** "Tu torneo, andando en cuatro pasos": the real path from login to the first round, with the CTA. */
export function TorneosPasos() {
  const content = useTorneosContent();
  const copy = content.pasos;
  const start = getCreateTournamentTarget();

  return (
    <section id="torneos-pasos" aria-labelledby="torneos-pasos-titulo" className={cn("relative bg-[#04050d] py-14 text-white md:py-24", SECTION_PAD)}>
      <div className="mx-auto max-w-[1180px]">
        <SectionHead id="torneos-pasos-titulo" eyebrow={copy.eyebrow} title={copy.title} accent={copy.accent} align="center" />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {copy.steps.map((step, index) => (
            <li key={step.title} className="relative rounded-3xl border border-white/10 bg-white/[0.045] p-5 md:p-6" data-paso>
              <span className="disp-t text-5xl text-grad-t md:text-6xl">{index + 1}</span>
              <h3 className="mt-3 text-xl font-extrabold tracking-[-0.01em]">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/75">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col items-center gap-3 text-center md:mt-10">
          <a
            href={start.href}
            target={start.isExternal ? "_blank" : undefined}
            rel={start.isExternal ? "noopener noreferrer" : undefined}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#7b5cff,#5a3df0)] px-7 text-base font-bold text-white shadow-[0_12px_34px_-10px_rgba(108,77,255,0.9)] transition-transform hover:-translate-y-0.5"
          >
            {copy.cta}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <p className="text-sm text-white/65">
            {copy.help}{" "}
            <a href={`mailto:${TORNEOS_CONTACT_EMAIL}`} className="font-semibold text-[#c9c2ff] underline underline-offset-4 hover:text-white">
              {TORNEOS_CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
