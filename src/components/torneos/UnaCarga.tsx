"use client";

import React from "react";
import Image from "next/image";
import { MotionConfig, motion } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";

import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { applyResult, DEMO_RESULT, INITIAL_DEMO_STATE, type DemoState } from "@/lib/torneos-demo";
import { cn } from "@/lib/utils";

const STEP_MS = 150;

function Panel({
  title,
  updated,
  updatedLabel,
  delay,
  children,
}: {
  title: string;
  updated: boolean;
  updatedLabel: string;
  delay: number;
  children: React.ReactNode;
}) {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (!updated) {
      setShow(false);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setShow(true), reduce ? 0 : delay);
    return () => window.clearTimeout(timer);
  }, [updated, delay]);

  return (
    <div
      className={cn(
        "rounded-xl border bg-[#0d1022] p-4 transition-colors duration-300",
        show ? "border-[#20e39b]/60" : "border-white/10",
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {show && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#20e39b]/15 px-2 py-0.5 text-[11px] font-semibold text-[#20e39b]">
            <Check aria-hidden="true" className="h-3 w-3" />
            {updatedLabel}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export function UnaCarga() {
  const content = useTorneosContent();
  const copy = content.unaCarga;
  const [state, setState] = React.useState<DemoState>(INITIAL_DEMO_STATE);
  const loaded = state !== INITIAL_DEMO_STATE;
  const home = state.standings.find((row) => row.teamId === DEMO_RESULT.homeId)!;
  const away = state.standings.find((row) => row.teamId === DEMO_RESULT.awayId)!;
  const leader = state.standings[0];

  return (
    <section id="torneos-como-funciona" className="scroll-mt-16 bg-[#070711] text-white">
      <div className="mx-auto max-w-[1240px] px-4 py-20 md:px-6 md:py-28">
        <div className="max-w-3xl">
          <h2 className="text-[clamp(2rem,4.8vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em]">{copy.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">{copy.body}</p>
        </div>

        <MotionConfig reducedMotion="user">
          <div className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.6fr]">
            <div className="flex flex-col rounded-xl border border-white/10 bg-[#10142a] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8f84ff]">{copy.matchLabel}</p>
              <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                <span className="text-sm font-semibold">{home.name}</span>
                <span className="text-4xl font-extrabold tabular-nums">
                  {loaded ? `${DEMO_RESULT.homeGoals} – ${DEMO_RESULT.awayGoals}` : "– : –"}
                </span>
                <span className="text-sm font-semibold">{away.name}</span>
              </div>
              <ul className="mt-5 space-y-1 text-sm text-white/60">
                {DEMO_RESULT.scorers.map((scorer, index) => (
                  <li key={`${scorer.player}-${index}`} className={cn("flex", scorer.teamId === DEMO_RESULT.awayId && "justify-end")}>
                    ⚽ {scorer.player}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                {loaded ? (
                  <>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#20e39b]">
                      <Check aria-hidden="true" className="h-4 w-4" />
                      {copy.loaded}
                    </span>
                    <button
                      type="button"
                      onClick={() => setState(INITIAL_DEMO_STATE)}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-white/15 px-3 text-sm font-medium text-white/80 hover:text-white"
                    >
                      <RotateCcw aria-hidden="true" className="h-4 w-4" />
                      {copy.reset}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setState(applyResult(INITIAL_DEMO_STATE, DEMO_RESULT))}
                    className="inline-flex min-h-11 items-center rounded-lg bg-[#5b4bff] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#6d5fff]"
                  >
                    {copy.load}
                  </button>
                )}
              </div>
              <p className="mt-3 text-xs text-white/45">{content.demoNote}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Panel title={copy.panels.table} updated={loaded} updatedLabel={copy.updated} delay={0}>
                <table className="w-full text-sm tabular-nums">
                  <thead>
                    <tr className="text-left text-xs text-white/45">
                      <th className="pb-1.5 font-medium">#</th>
                      <th className="pb-1.5 font-medium">{copy.columns.team}</th>
                      <th className="pb-1.5 text-right font-medium">{copy.columns.played}</th>
                      <th className="pb-1.5 text-right font-medium">{copy.columns.points}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.standings.map((row, index) => (
                      <motion.tr key={row.teamId} layout className={cn(loaded && row.teamId === DEMO_RESULT.homeId && "text-[#20e39b]")}>
                        <td className="py-1 text-white/50">{index + 1}</td>
                        <td className="py-1">{row.name}</td>
                        <td className="py-1 text-right">{row.pj}</td>
                        <td className="py-1 text-right font-semibold">{row.pts}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </Panel>

              <Panel title={copy.panels.scorers} updated={loaded} updatedLabel={copy.updated} delay={STEP_MS}>
                <ol className="space-y-1 text-sm tabular-nums">
                  {state.scorers.slice(0, 4).map((scorer) => (
                    <motion.li key={`${scorer.teamId}-${scorer.player}`} layout className="flex justify-between">
                      <span>{scorer.player}</span>
                      <span className="font-semibold">{scorer.goals}</span>
                    </motion.li>
                  ))}
                </ol>
              </Panel>

              <Panel title={copy.panels.publicPage} updated={loaded} updatedLabel={copy.updated} delay={STEP_MS * 2}>
                <p className="truncate rounded-md bg-white/[0.06] px-2 py-1 text-[11px] text-white/60">{copy.publicUrl}</p>
                <p className="mt-3 text-sm">
                  {loaded ? (
                    <>
                      <strong className="font-semibold">{home.name} {DEMO_RESULT.homeGoals}–{DEMO_RESULT.awayGoals} {away.name}</strong>
                      <span className="mt-1 block text-white/60">1.º {leader.name} · {leader.pts} pts</span>
                    </>
                  ) : (
                    <span className="text-white/50">{copy.publicPending}</span>
                  )}
                </p>
              </Panel>

              <Panel title={copy.panels.plate} updated={loaded} updatedLabel={copy.updated} delay={STEP_MS * 3}>
                <Image
                  src="/torneos/social-studio/base/round_results--portrait--default.png"
                  alt={copy.panels.plate}
                  width={1080}
                  height={1350}
                  sizes="200px"
                  className={cn("mx-auto h-36 w-auto rounded-md transition-opacity duration-500", loaded ? "opacity-100" : "opacity-25")}
                />
              </Panel>
            </div>
          </div>
        </MotionConfig>

        <p className="sr-only" aria-live="polite">
          {loaded ? copy.live.replace("{team}", leader.name).replace("{points}", String(leader.pts)) : ""}
        </p>
      </div>
    </section>
  );
}
