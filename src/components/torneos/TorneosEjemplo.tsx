"use client";

import { ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { getSiteUrl } from "@/lib/site-urls";
import { torneosEjemploContent } from "@/lib/torneos-ejemplo-content";
import { EJEMPLO_FIXTURE, EJEMPLO_RESULTS, EJEMPLO_SCORERS, EJEMPLO_STANDINGS, formatDay, formatKickoff, ROUND_DATES } from "@/lib/torneos-ejemplo";
import { getCreateTournamentTarget } from "@/lib/torneos-links";
import { cn } from "@/lib/utils";

import { TEAM_NAMES } from "./screens/teams";

const TEAM_COLORS: Record<string, string> = { dt: "#27b8ff", lg: "#8b6dff", tt: "#2ee59d", et: "#ffb020" };
/** PG, PE, PP, GF and GC: hidden on phones so the table fits without scrolling. */
const WIDE_ONLY_COLUMNS = new Set([3, 4, 5, 6, 7]);
const PLAYED_ROUNDS = [...new Set(EJEMPLO_RESULTS.map((match) => match.round))].sort((a, b) => b - a);
const FIXTURE_ROUNDS = [...new Set(EJEMPLO_FIXTURE.map((match) => match.round))].sort((a, b) => a - b);

function Team({ id }: { id: string }) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: TEAM_COLORS[id] }} />
      <span className="truncate">{TEAM_NAMES[id]}</span>
    </span>
  );
}

function Card({ id, title, className, children }: { id: string; title: string; className?: string; children: React.ReactNode }) {
  return (
    // Clears the fixed nav plus the sticky label bar (inline: the global section[id] rule would win over a utility).
    <section id={id} aria-labelledby={`${id}-titulo`} className={cn("rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:p-7", className)} style={{ scrollMarginTop: 140 }}>
      <h2 id={`${id}-titulo`} className="disp-t text-[clamp(1.9rem,3.4vw,2.6rem)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * The example tournament (torneos.arma2.com.ar/ejemplo): a read-only page with
 * made-up data. No forms and no requests; the only way out is a link.
 */
export function TorneosEjemplo() {
  const { locale } = useLanguage();
  const content = useTorneosContent();
  const copy = torneosEjemploContent[locale];
  const start = getCreateTournamentTarget();
  const sections = [
    ["tabla", copy.sections.standings],
    ["goleadores", copy.sections.scorers],
    ["fixture", copy.sections.fixture],
    ["resultados", copy.sections.results],
  ] as const;

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#04050d] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_70%_at_30%_0%,rgba(108,77,255,0.28),transparent_70%)]" />

      <header className="relative px-[clamp(16px,6vw,104px)] pt-24 md:pt-32">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold text-[#b8a8ff]">{content.demoNote}</p>
          <h1 className="disp-t mt-2 text-[clamp(2.4rem,6vw,4.6rem)]">{copy.name}</h1>
          <p className="mt-2 text-white/65">{copy.meta}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">{copy.lead}</p>
        </div>
      </header>

      <div className="sticky top-16 z-40 mt-6 border-y border-white/[0.07] bg-[#06071a] md:top-[4.5rem]">
        <div className="mx-auto flex max-w-5xl items-center gap-2 py-1.5 pl-[clamp(16px,6vw,104px)] lg:px-0">
          <p className="shrink-0 rounded-full bg-[#ffb020]/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#ffd27a]">{copy.badge}</p>
          {/* Only the section links scroll sideways on narrow phones; the label stays put. */}
          <nav aria-label={copy.sectionsLabel} className="flex min-w-0 gap-1 overflow-x-auto pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {sections.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="inline-flex min-h-11 shrink-0 items-center rounded-full px-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-5xl gap-4 px-[clamp(16px,6vw,104px)] py-8 md:gap-5 md:py-10 lg:grid-cols-[1.55fr_1fr] lg:px-0">
        <Card id="tabla" title={copy.standings.title}>
          <table className="mt-4 w-full border-collapse text-sm">
            <caption className="sr-only">{copy.standings.caption}</caption>
            <thead>
              <tr className="text-xs uppercase tracking-[0.06em] text-white/55">
                {copy.standings.columns.map(([abbr, full], i) => (
                  <th
                    key={abbr}
                    scope="col"
                    className={cn("px-1.5 py-2 font-semibold", i === 1 ? "w-full text-left" : "text-right", i === 0 && "text-left", WIDE_ONLY_COLUMNS.has(i) && "hidden sm:table-cell")}
                  >
                    <span aria-hidden="true">{abbr}</span>
                    <span className="sr-only">{full}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EJEMPLO_STANDINGS.map((row, i) => {
                const diff = row.gf - row.gc;
                const cells = [row.pj, row.pg, row.pe, row.pp, row.gf, row.gc, `${diff > 0 ? "+" : ""}${diff}`];
                return (
                  <tr key={row.teamId} className="border-t border-white/[0.07]">
                    <td className="px-1.5 py-3 text-white/60">{i + 1}</td>
                    <th scope="row" className="max-w-0 px-1.5 py-3 text-left font-semibold">
                      <Team id={row.teamId} />
                    </th>
                    {cells.map((value, j) => (
                      <td key={j} className={cn("px-1.5 py-3 text-right tabular-nums text-white/75", WIDE_ONLY_COLUMNS.has(j + 2) && "hidden sm:table-cell")}>
                        {value}
                      </td>
                    ))}
                    <td className="px-1.5 py-3 text-right text-base font-bold tabular-nums">{row.pts}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-4 text-sm text-white/60">
            {copy.standings.pending}{" "}
            <a href="#fixture" className="font-semibold text-[#c9c2ff] underline underline-offset-4 hover:text-white">
              {copy.standings.pendingLink}
            </a>
          </p>
        </Card>

        <Card id="goleadores" title={copy.scorers.title}>
          <ol className="mt-4 space-y-1">
            {EJEMPLO_SCORERS.slice(0, 5).map((row, i) => (
              <li key={`${row.teamId}-${row.player}`} className="grid grid-cols-[1.5rem_1fr_auto] items-center gap-2 border-t border-white/[0.07] py-2.5 first:border-t-0">
                <span className="text-sm text-white/55">{i + 1}</span>
                <span className="min-w-0">
                  <span className="block font-semibold">{row.player}</span>
                  <span className="block text-sm text-white/60">
                    <Team id={row.teamId} />
                  </span>
                </span>
                <span className="text-right">
                  <b className="disp-t text-2xl">{row.goals}</b> <span className="text-xs text-white/55">{copy.scorers.goals}</span>
                </span>
              </li>
            ))}
          </ol>
        </Card>

        <Card id="fixture" title={copy.fixture.title} className="lg:col-span-2">
          <p className="mt-1 text-white/65">{`${copy.fixture.lead} ${copy.fixture.venue}.`}</p>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {FIXTURE_ROUNDS.map((round) => (
              <div key={round}>
                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-white/55">{`${copy.fixture.round} ${round}`}</h3>
                <ul className="mt-2 space-y-2">
                  {EJEMPLO_FIXTURE.filter((match) => match.round === round).map((match) => (
                    <li key={`${match.homeId}-${match.awayId}`} className="rounded-2xl bg-white/[0.04] px-4 py-3">
                      <p className="grid gap-1 font-semibold">
                        <Team id={match.homeId} />
                        <Team id={match.awayId} />
                      </p>
                      <p className="mt-2 text-sm text-white/65">{`${formatKickoff(match.kickoff, locale)} · ${copy.fixture.pitch} ${match.kickoff.pitch}`}</p>
                      {match.rescheduledFrom && (
                        <p className="mt-2 inline-flex rounded-lg bg-[#ffb020]/15 px-2.5 py-1 text-xs font-semibold text-[#ffd27a]">
                          {`${copy.fixture.rescheduled} · ${copy.fixture.before} ${formatKickoff(match.rescheduledFrom, locale)}`}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        <Card id="resultados" title={copy.results.title} className="lg:col-span-2">
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PLAYED_ROUNDS.map((round) => (
              <div key={round} className="rounded-2xl bg-white/[0.04] p-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-white/55">{`${copy.results.round} ${round} · ${formatDay(ROUND_DATES[round], locale)}`}</h3>
                <ul className="mt-2 divide-y divide-white/[0.07]">
                  {EJEMPLO_RESULTS.filter((match) => match.round === round).map((match) => (
                    <li key={`${match.homeId}-${match.awayId}`} className="space-y-1 py-2 text-sm">
                      {(
                        [
                          [match.homeId, match.homeGoals, match.awayGoals],
                          [match.awayId, match.awayGoals, match.homeGoals],
                        ] as const
                      ).map(([team, goals, against]) => (
                        <p key={team} className={cn("flex items-center justify-between gap-3", goals < against ? "text-white/60" : "font-semibold")}>
                          <Team id={team} />
                          <b className="tabular-nums">{goals}</b>
                        </p>
                      ))}
                    </li>
                  ))}
                  {EJEMPLO_FIXTURE.filter((match) => match.round === round && match.rescheduledFrom).map((match) => (
                    <li key={`${match.homeId}-${match.awayId}`} className="space-y-1 py-2 text-sm text-white/60">
                      <Team id={match.homeId} />
                      <p className="flex items-center justify-between gap-3">
                        <Team id={match.awayId} />
                        <a href="#fixture" className="shrink-0 rounded-lg bg-[#ffb020]/15 px-2 py-0.5 text-xs font-semibold text-[#ffd27a] hover:text-white">
                          {copy.results.pending}
                        </a>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <section className="border-t border-white/[0.07] px-5 py-16 text-center md:py-20">
        <h2 className="disp-t text-[clamp(2.2rem,5vw,3.6rem)]">{copy.cta.title}</h2>
        <p className="mt-3 text-white/70">{copy.cta.body}</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={start.href}
            target={start.isExternal ? "_blank" : undefined}
            rel={start.isExternal ? "noopener noreferrer" : undefined}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#7b5cff,#5a3df0)] px-6 text-base font-bold text-white shadow-[0_12px_34px_-10px_rgba(108,77,255,0.9)] transition-transform hover:-translate-y-0.5"
          >
            {copy.cta.start}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <a href={getSiteUrl("torneos", "/")} className="inline-flex min-h-12 items-center rounded-xl border border-white/25 bg-white/[0.05] px-6 text-base font-bold text-white transition-transform hover:-translate-y-0.5">
            {copy.cta.back}
          </a>
        </div>
      </section>
    </main>
  );
}
