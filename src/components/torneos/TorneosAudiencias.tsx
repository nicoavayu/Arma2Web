"use client";

import { ArrowUpRight, Check, LayoutDashboard, Smartphone } from "lucide-react";

import { SiteSwitch } from "@/components/shared/SiteSwitch";
import { SECTION_PAD, SectionHead } from "@/components/torneos/SectionHead";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { getCreateTournamentTarget } from "@/lib/torneos-links";
import { cn } from "@/lib/utils";

/** Two audiences, like the product: the organiser's web manager and what players and their people get. */
export function TorneosAudiencias() {
  const copy = useTorneosContent().audiences;
  const start = getCreateTournamentTarget();

  return (
    <section id="torneos-para-quien" aria-labelledby="torneos-para-quien-titulo" className={cn("relative bg-[#04050d] py-14 text-white md:py-24", SECTION_PAD)}>
      <div className="mx-auto max-w-[1180px]">
        <SectionHead id="torneos-para-quien-titulo" eyebrow={copy.eyebrow} title={copy.title} accent={copy.accent} />
        <div className="mt-8 grid gap-5 md:mt-12 lg:grid-cols-2">
          <article className="flex flex-col rounded-3xl border border-[#8b6dff]/45 bg-[linear-gradient(165deg,rgba(108,77,255,0.24),rgba(108,77,255,0.04))] p-6 md:p-8" data-audience="organizador">
            <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6c4dff]/30 text-[#d9d2ff]">
              <LayoutDashboard className="h-6 w-6" />
            </span>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#c9c2ff]">{copy.organizer.label}</p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] md:text-[1.75rem]">{copy.organizer.title}</h3>
            <ul className="mt-5 flex-1 space-y-3">
              {copy.organizer.points.map((point) => (
                <li key={point} className="grid grid-cols-[1.25rem_1fr] gap-2.5 text-[15px] leading-snug text-white/85">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 text-[#2ee59d]" />
                  {point}
                </li>
              ))}
            </ul>
            <a
              href={start.href}
              target={start.isExternal ? "_blank" : undefined}
              rel={start.isExternal ? "noopener noreferrer" : undefined}
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-xl bg-[linear-gradient(135deg,#7b5cff,#5a3df0)] px-6 text-base font-bold text-white shadow-[0_12px_34px_-10px_rgba(108,77,255,0.9)] transition-transform hover:-translate-y-0.5"
            >
              {copy.organizer.cta}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </article>

          <article className="flex flex-col rounded-3xl border border-white/12 bg-white/[0.045] p-6 md:p-8" data-audience="jugadores">
            <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#27b8ff]/20 text-[#9fdcff]">
              <Smartphone className="h-6 w-6" />
            </span>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#9fdcff]">{copy.players.label}</p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.02em] md:text-[1.75rem]">{copy.players.title}</h3>
            <ul className="mt-5 flex-1 space-y-3">
              {copy.players.points.map((point) => (
                <li key={point} className="grid grid-cols-[1.25rem_1fr] gap-2.5 text-[15px] leading-snug text-white/85">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 text-[#27b8ff]" />
                  {point}
                </li>
              ))}
            </ul>
            <SiteSwitch
              to="jugadores"
              label={copy.players.link}
              className="mt-7 min-h-12 self-start rounded-xl border border-white/20 bg-white/[0.04] px-6 text-base font-bold text-white hover:bg-white/10"
            />
          </article>
        </div>
      </div>
    </section>
  );
}
