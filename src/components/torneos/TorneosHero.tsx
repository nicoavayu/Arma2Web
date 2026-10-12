"use client";

import { ArrowDown, ArrowUpRight, BarChart3, CalendarDays, ClipboardCheck, Globe2, Sparkles } from "lucide-react";

import { BrowserFrame } from "@/components/shared/BrowserFrame";
import { PhoneFrame } from "@/components/shared/PhoneFrame";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { getCreateTournamentTarget, TORNEOS_HOW_ANCHOR } from "@/lib/torneos-links";

const BENEFIT_ICONS = [CalendarDays, ClipboardCheck, BarChart3, Globe2, Sparkles];

export function TorneosHero() {
  const copy = useTorneosContent().hero;
  const start = getCreateTournamentTarget();

  return (
    <section id="torneos-hero" className="bg-[#f5f1e9] text-[#070711]">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-4 pb-16 pt-14 md:px-6 md:pt-20 lg:grid-cols-[1.05fr_1.1fr] lg:gap-10 lg:pb-24">
        <div>
          <h1 className="text-[clamp(2.6rem,5.4vw,4.3rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.045em]">
            <span className="block">{copy.title[0]}</span>
            <span className="block text-[#5b4bff]">{copy.title[1]}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#44465a]">{copy.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={start.href}
              target={start.isExternal ? "_blank" : undefined}
              rel={start.isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#070711] px-6 text-base font-semibold text-white transition-colors hover:bg-[#5b4bff]"
            >
              {copy.start}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              href={TORNEOS_HOW_ANCHOR}
              className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-[#070711]/25 px-6 text-base font-semibold transition-colors hover:border-[#070711]"
            >
              {copy.explore}
              <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-4 text-sm text-[#44465a]">{copy.freeNote}</p>
        </div>

        <div className="relative pb-10 sm:pb-14">
          <BrowserFrame id="torneos/tabla" priority sizes="(max-width: 1024px) 92vw, 640px" />
          <PhoneFrame
            id="torneos/publica-mobile"
            className="absolute -bottom-2 right-2 w-[30%] max-w-[170px] border-[7px] sm:right-6"
            sizes="170px"
          />
        </div>
      </div>

      <div className="bg-[#070711] text-white">
        <ul className="mx-auto grid max-w-[1240px] grid-cols-2 gap-x-6 gap-y-5 px-4 py-6 md:grid-cols-5 md:px-6">
          {copy.benefits.map(([title, detail], index) => {
            const Icon = BENEFIT_ICONS[index];
            return (
              <li key={title} className="flex items-start gap-3">
                <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#8f84ff]" />
                <span>
                  <strong className="block text-sm font-semibold">{title}</strong>
                  <span className="text-xs text-white/60">{detail}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
