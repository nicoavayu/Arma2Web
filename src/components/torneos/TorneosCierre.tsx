"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { SiteSwitch } from "@/components/shared/SiteSwitch";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { BRAND } from "@/lib/brand-assets";
import { getSiteUrl } from "@/lib/site-urls";
import { getCreateTournamentTarget, TORNEOS_CONTACT_EMAIL } from "@/lib/torneos-links";

/** Closing call over the stadium photo. The last word of the title gets the brand gradient. */
export function TorneosCierre() {
  const copy = useTorneosContent().cierre;
  const start = getCreateTournamentTarget();
  const cut = copy.title.lastIndexOf(" ");

  return (
    <section id="torneos-empezar" className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-[#04050d] text-center text-white">
      <Image src={BRAND.bgStadium.src} alt="" fill sizes="100vw" className="object-cover object-[70%_50%]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,#04050d_0%,rgba(4,5,13,0.55)_30%,rgba(4,5,13,0.6)_70%,#04050d_100%)]" />
      <div className="relative px-5 py-24">
        <h2 className="disp-t text-[clamp(3rem,8vw,8rem)]">
          {copy.title.slice(0, cut)} <span className="text-grad-t">{copy.title.slice(cut + 1)}</span>
        </h2>
        <p className="mb-8 mt-5 text-[clamp(1rem,1.3vw,1.2rem)] text-[#d6d8f0]">{copy.body}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={start.href}
            target={start.isExternal ? "_blank" : undefined}
            rel={start.isExternal ? "noopener noreferrer" : undefined}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#7b5cff,#5a3df0)] px-6 text-base font-bold text-white shadow-[0_12px_34px_-10px_rgba(108,77,255,0.9)] transition-transform hover:-translate-y-0.5"
          >
            {copy.start}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <a
            href={getSiteUrl("torneos", "/ejemplo")}
            className="inline-flex min-h-12 items-center rounded-xl border border-white/25 bg-white/[0.05] px-6 text-base font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            {copy.example}
          </a>
        </div>
        <p className="mx-auto mt-8 max-w-md text-[15px] leading-relaxed text-[#d6d8f0]">
          {copy.help.question}{" "}
          <span className="whitespace-nowrap">
            {copy.help.action}{" "}
            <a
              href={`mailto:${TORNEOS_CONTACT_EMAIL}?subject=${encodeURIComponent(copy.help.subject)}`}
              className="font-semibold text-white underline underline-offset-4 hover:text-[#c9c2ff]"
            >
              {TORNEOS_CONTACT_EMAIL}
            </a>
          </span>
        </p>
        <SiteSwitch to="jugadores" label={copy.players} className="mt-8 min-h-11 text-sm font-semibold text-[#b8a8ff] hover:text-white" />
      </div>
    </section>
  );
}
