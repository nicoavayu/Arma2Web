"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

import { usePlayWhenVisible } from "@/components/cinematic/usePlayWhenVisible";
import { SECTION_PAD, SectionHead } from "@/components/torneos/SectionHead";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import type { TorneosContent } from "@/lib/torneos-content";
import { cn } from "@/lib/utils";

import { TEAM_NAMES } from "./screens/teams";

type Diagram = TorneosContent["formats"]["diagram"];

const TEAMS = Object.values(TEAM_NAMES);
const short = (name: string) => name.split(/[\s-]+/).map((word) => word[0]).join("").slice(0, 2).toUpperCase();

function useAppear(progress: MotionValue<number>, from: number) {
  const opacity = useTransform(progress, [from, Math.min(from + 0.25, 1)], [0, 1]);
  const y = useTransform(progress, [from, Math.min(from + 0.25, 1)], [14, 0]);
  return { opacity, y };
}

function Panel({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col rounded-xl border border-white/10 bg-white/[0.05] p-2 sm:rounded-2xl sm:p-3.5", className)}>
      <span className="mb-2 truncate text-[10px] font-bold uppercase tracking-[0.12em] text-[#b8a8ff] sm:mb-2.5 sm:text-[11px]">{title}</span>
      {children}
    </div>
  );
}

/** Conceptual drawing of the three shapes a competition takes: league, groups and knockout. Example teams. */
function FormatDiagram({ copy }: { copy: Diagram }) {
  const [ref, progress] = usePlayWhenVisible<HTMLDivElement>(1.8);
  const league = useAppear(progress, 0);
  const groups = useAppear(progress, 0.25);
  const knockout = useAppear(progress, 0.5);

  return (
    <div ref={ref} aria-hidden="true" className="grid grid-cols-3 gap-2 sm:gap-3">
      <motion.div style={league}>
        <Panel title={copy.league} className="h-full">
          {TEAMS.map((team, index) => (
            <div key={team} className="flex items-center gap-1.5 border-b border-white/[0.06] py-1 text-[11px] last:border-b-0 sm:gap-2 sm:py-1.5 sm:text-[13px]">
              <span className="w-3 text-white/55 sm:w-4">{index + 1}</span>
              <span className="flex-1 truncate text-white/85">{team}</span>
            </div>
          ))}
        </Panel>
      </motion.div>
      <motion.div style={groups}>
        <Panel title={copy.groups} className="h-full">
          {[copy.groupA, copy.groupB].map((group, g) => (
            <div key={group} className="mb-2 rounded-xl bg-white/[0.04] p-2 last:mb-0">
              <span className="text-[11px] font-semibold text-white/60">{group}</span>
              <div className="mt-1 flex gap-1.5">
                {TEAMS.slice(g * 2, g * 2 + 2).map((team) => (
                  <span key={team} className="rounded-md bg-white/10 px-1.5 py-0.5 text-[11px] font-bold text-white/85 sm:rounded-lg sm:px-2 sm:py-1 sm:text-[12px]">{short(team)}</span>
                ))}
              </div>
            </div>
          ))}
        </Panel>
      </motion.div>
      <motion.div style={knockout}>
        <Panel title={copy.knockout} className="h-full">
          <div className="flex flex-1 flex-col items-stretch gap-1.5 sm:flex-row sm:items-center sm:gap-2">
            <div className="flex flex-1 flex-col gap-1.5 sm:gap-2">
              {[0, 2].map((i) => (
                <div key={i} className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[11px] font-bold text-white/80 sm:rounded-lg sm:px-2 sm:py-1 sm:text-[12px]">
                  {short(TEAMS[i])} · {short(TEAMS[i + 1])}
                </div>
              ))}
            </div>
            <span className="hidden h-12 w-3 rounded-r-md border-y border-r border-white/30 sm:block" />
            <div className="rounded-md bg-[#6c4dff]/35 px-1.5 py-1 text-center text-[11px] font-extrabold text-white sm:rounded-lg sm:px-2 sm:py-1.5 sm:text-[12px]">{copy.final}</div>
          </div>
        </Panel>
      </motion.div>
    </div>
  );
}

/** Real formats and options of the product (competitionCatalog), with a conceptual diagram. */
export function TorneosFormatos() {
  const copy = useTorneosContent().formats;

  return (
    <section id="torneos-formatos" aria-labelledby="torneos-formatos-titulo" className={cn("relative overflow-hidden bg-[#05060f] py-14 text-white md:py-24", SECTION_PAD)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_85%_20%,rgba(39,184,255,0.12),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-[1180px] items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div>
          <SectionHead id="torneos-formatos-titulo" eyebrow={copy.eyebrow} title={copy.title} accent={copy.accent} lead={copy.lead} />
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.14em] text-white/60">{copy.formatsLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2" data-formats>
            {copy.formats.map((format) => (
              <li key={format} className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-sm font-semibold text-white/90">
                {format}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-6">
          <FormatDiagram copy={copy.diagram} />
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {copy.details.map((detail) => (
              <li key={detail.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <h3 className="font-extrabold text-white">{detail.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">{detail.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
