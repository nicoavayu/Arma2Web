"use client";

import React from "react";
import { LayoutGroup, MotionConfig, motion, useReducedMotion } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { balanceTeams, DEMO_PLAYERS, type BalanceResult, type DemoPlayer } from "@/lib/balance-demo";
import { cn } from "@/lib/utils";

function PlayerChip({ player, keeperLabel, format }: { player: DemoPlayer; keeperLabel: string; format: (n: number) => string }) {
  return (
    <motion.li
      layout
      layoutId={player.id}
      className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
    >
      <span className="flex items-center gap-2 font-medium text-white">
        {player.name}
        {player.goalkeeper && (
          <span className="rounded border border-[#f59e0b]/60 px-1 text-[10px] font-bold tracking-wide text-[#f59e0b]">{keeperLabel}</span>
        )}
      </span>
      <span className="tabular-nums text-white/60">{format(player.score)}</span>
    </motion.li>
  );
}

export function BalanceDemo() {
  const { t, locale } = useLanguage();
  const copy = t.home.balance.demo;
  const reduceMotion = useReducedMotion();
  const [result, setResult] = React.useState<BalanceResult | null>(null);
  const [seed, setSeed] = React.useState<number | undefined>(undefined);
  const [fixKeepers, setFixKeepers] = React.useState(false);
  // The clicked button unmounts (build ⇄ again/reset); keep keyboard focus on its replacement.
  const buildRef = React.useRef<HTMLButtonElement>(null);
  const againRef = React.useRef<HTMLButtonElement>(null);
  const moveFocus = React.useRef(false);

  React.useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    (result ? againRef : buildRef).current?.focus();
  }, [result]);

  const format = React.useMemo(() => {
    const formatter = new Intl.NumberFormat(locale === "es" ? "es-AR" : "en-GB", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return (value: number) => formatter.format(value);
  }, [locale]);

  const build = (nextSeed: number | undefined, nextFix: boolean) => {
    setSeed(nextSeed);
    setResult(balanceTeams(DEMO_PLAYERS, { seed: nextSeed, fixGoalkeepers: nextFix }));
  };

  const toggleKeepers = () => {
    const next = !fixKeepers;
    setFixKeepers(next);
    if (result) build(seed, next);
  };

  const total = result ? result.totalA + result.totalB : 1;

  return (
    <MotionConfig reducedMotion="user">
    <div className="rounded-2xl border border-white/10 bg-[#0d1022] p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-white">{copy.title}</h3>
        <button
          type="button"
          onClick={toggleKeepers}
          aria-pressed={fixKeepers}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-colors",
            fixKeepers ? "border-[#f59e0b]/70 bg-[#f59e0b]/10 text-[#f59e0b]" : "border-white/15 text-white/70 hover:text-white",
          )}
        >
          <span aria-hidden="true" className={cn("h-2 w-2 rounded-full", fixKeepers ? "bg-[#f59e0b]" : "bg-white/30")} />
          {copy.fixKeepers}
        </button>
      </div>

      <LayoutGroup>
        <motion.div layout transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }} className="mt-5">
          {result ? (
            <div className="grid grid-cols-2 gap-3">
              {([
                [copy.teamA, result.teamA, result.totalA],
                [copy.teamB, result.teamB, result.totalB],
              ] as const).map(([label, team, teamTotal]) => (
                <div key={label}>
                  <p className="mb-2 flex items-baseline justify-between text-xs font-semibold uppercase tracking-[0.1em] text-white/50">
                    {label}
                    <span className="text-base font-bold normal-case tracking-normal tabular-nums text-white">{format(teamTotal)}</span>
                  </p>
                  <ul className="space-y-1.5">
                    {team.map((player) => (
                      <PlayerChip key={player.id} player={player} keeperLabel={copy.keeper} format={format} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/50">{copy.pool}</p>
              <ul className="grid grid-cols-2 gap-1.5">
                {DEMO_PLAYERS.map((player) => (
                  <PlayerChip key={player.id} player={player} keeperLabel={copy.keeper} format={format} />
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </LayoutGroup>

      <div className="mt-5" aria-live="polite">
        {result && (
          <div>
            <div className="flex h-1.5 overflow-hidden rounded-full" aria-hidden="true">
              <span className="bg-[#27b8ff]" style={{ flex: result.totalA / total }} />
              <span className="w-0.5 bg-[#0d1022]" />
              <span className="bg-[#20e39b]" style={{ flex: result.totalB / total }} />
            </div>
            <p className="mt-2 text-sm text-white/70">
              {copy.diff}: <strong className="font-semibold tabular-nums text-[#20e39b]">{format(result.diff)}</strong>
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {result ? (
          <>
            <button
              type="button"
              ref={againRef}
              onClick={() => build((seed ?? 0) + 1, fixKeepers)}
              className="inline-flex min-h-11 items-center rounded-lg bg-[#27b8ff] px-4 text-sm font-semibold text-[#070711] transition-colors hover:bg-[#27b8ff]/90"
            >
              {copy.again}
            </button>
            <button
              type="button"
              onClick={() => {
                moveFocus.current = true;
                setResult(null);
                setSeed(undefined);
              }}
              className="inline-flex min-h-11 items-center rounded-lg border border-white/15 px-4 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {copy.reset}
            </button>
          </>
        ) : (
          <button
            type="button"
            ref={buildRef}
            onClick={() => {
              moveFocus.current = true;
              build(undefined, fixKeepers);
            }}
            className="inline-flex min-h-11 items-center rounded-lg bg-[#27b8ff] px-5 text-sm font-semibold text-[#070711] transition-colors hover:bg-[#27b8ff]/90"
          >
            {copy.build}
          </button>
        )}
        <span className="text-xs text-white/55">{t.common.demoNote}</span>
      </div>
    </div>
    </MotionConfig>
  );
}
