"use client";

import { ArrowUpRight } from "lucide-react";

import { SiteSwitch } from "@/components/shared/SiteSwitch";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { getSiteUrl } from "@/lib/site-urls";
import { getCreateTournamentTarget, TORNEOS_CONTACT_HREF } from "@/lib/torneos-links";

export function TorneosCierre() {
  const copy = useTorneosContent().cierre;
  const start = getCreateTournamentTarget();

  return (
    <section id="torneos-empezar" className="bg-[#070711]">
      <div className="mx-auto max-w-[1240px] px-4 py-20 md:px-6 md:py-28">
        <h2 className="max-w-4xl text-[clamp(2.4rem,6vw,4.75rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.045em] text-white">{copy.title}</h2>
        <p className="mt-5 max-w-xl text-lg text-white/70">{copy.body}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={start.href}
            target={start.isExternal ? "_blank" : undefined}
            rel={start.isExternal ? "noopener noreferrer" : undefined}
            className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#5b4bff] px-6 text-base font-semibold text-white transition-colors hover:bg-[#6d5fff]"
          >
            {copy.start}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <a href={getSiteUrl("jugadores", TORNEOS_CONTACT_HREF)} className="inline-flex min-h-12 items-center rounded-lg border border-white/20 px-6 text-base font-semibold text-white hover:border-white/50">
            {copy.contact}
          </a>
        </div>
        <SiteSwitch to="jugadores" label={copy.players} className="mt-10 text-sm font-medium text-[#27b8ff] hover:text-white" />
      </div>
    </section>
  );
}
