"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  Goal,
  ListOrdered,
  ShieldAlert,
  Swords,
  Users,
} from "lucide-react";
import { Section } from "@/components/Section";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";

/** Icons follow the order of `management.modules` in the content module. */
const MODULE_ICONS = [
  Users, // equipos y planteles
  CalendarDays, // fixture
  Swords, // partidos
  ClipboardList, // resultados
  ListOrdered, // tabla
  BarChart3, // estadísticas
  Goal, // goleadores
  ShieldAlert, // disciplina
] as const;

const STANDING_ACCENTS = ["#fbbf24", "#27b8ff", "#a855f7", "#20e39b"] as const;

/** Fixture card: a round with two loaded results and one still pending. */
function FixtureCard() {
  const { management } = useTorneosContent();
  const board = management.board;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6 }}
      className="premium-card relative overflow-hidden rounded-3xl p-4 sm:p-5"
    >
      <div className="pointer-events-none absolute -left-16 -top-20 h-52 w-52 rounded-full bg-primary/15 blur-[90px]" />

      {/* Tab bar (visual, mirrors the product's sections) */}
      <div className="relative mb-4 flex flex-wrap gap-1.5">
        {board.tabs.map((tab, i) => (
          <span
            key={tab}
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${
              i === 0
                ? "border border-primary/40 bg-primary/15 text-white"
                : "border border-white/8 bg-white/[0.03] text-white/45"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="relative mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white sm:text-base">{board.fixtureTitle}</h3>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/55">
          {board.roundLabel}
        </span>
      </div>

      <div className="relative flex flex-col gap-2">
        {board.matches.map((match, i) => {
          const pending = match.score === null;

          return (
            <motion.div
              key={`${match.home}-${match.away}`}
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className={`rounded-2xl border px-3 py-2.5 ${
                pending ? "border-primary/25 bg-primary/[0.06]" : "border-white/8 bg-white/[0.025]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="min-w-0 flex-1 truncate text-right text-[12px] font-semibold text-white sm:text-[13px]">
                  {match.home}
                </span>

                {pending ? (
                  <span className="shrink-0 rounded-lg border border-white/12 bg-black/30 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
                    {board.pendingLabel}
                  </span>
                ) : (
                  <span className="shrink-0 rounded-lg border border-white/10 bg-black/35 px-2.5 py-1 text-[13px] font-black tabular-nums text-white">
                    {match.score}
                  </span>
                )}

                <span className="min-w-0 flex-1 truncate text-[12px] font-semibold text-white sm:text-[13px]">
                  {match.away}
                </span>
              </div>

              <div className="mt-1.5 flex items-center justify-center gap-2">
                <span className="text-[10px] font-medium text-white/35">{match.time}</span>
                {pending && (
                  <span className="rounded-full border border-primary/30 bg-primary/12 px-2 py-0.5 text-[10px] font-bold text-primary">
                    {board.loadResultLabel}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/** Standings card: PJ / DG / PTS, ordered from the loaded results. */
function StandingsCard() {
  const { management } = useTorneosContent();
  const board = management.board;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="premium-card relative overflow-hidden rounded-3xl p-4 sm:p-5"
    >
      <div className="pointer-events-none absolute -right-16 -bottom-20 h-52 w-52 rounded-full bg-accent/15 blur-[90px]" />

      <h3 className="relative mb-3 text-sm font-bold text-white sm:text-base">{board.standingsTitle}</h3>

      {/* Column headers */}
      <div className="relative mb-2 flex items-center gap-3 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/30">
        <span className="w-4 text-center">#</span>
        <span className="w-8" aria-hidden="true" />
        <span className="flex-1">{board.columns.team}</span>
        <span className="w-7 text-center">{board.columns.played}</span>
        <span className="w-8 text-center">{board.columns.goalDiff}</span>
        <span className="w-8 text-right">{board.columns.points}</span>
      </div>

      <div className="relative flex flex-col gap-1.5">
        {board.standings.map((row, i) => {
          const accent = STANDING_ACCENTS[i] ?? "#27b8ff";

          return (
            <motion.div
              key={row.name}
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.38, delay: 0.06 * i }}
              className={`flex items-center gap-3 rounded-2xl border px-3 py-2 ${
                i === 0 ? "border-yellow-400/30 bg-yellow-400/[0.06]" : "border-white/8 bg-white/[0.025]"
              }`}
            >
              <span className="w-4 shrink-0 text-center text-[13px] font-black tabular-nums" style={{ color: accent }}>
                {i + 1}
              </span>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-[10px] font-black text-white"
                style={{
                  background: `linear-gradient(135deg, ${accent}33, ${accent}11)`,
                  borderColor: `${accent}44`,
                }}
              >
                {row.initials}
              </span>
              <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-white sm:text-[13px]">
                {row.name}
              </span>
              <span className="w-7 shrink-0 text-center text-[12px] font-medium tabular-nums text-white/50">
                {row.played}
              </span>
              <span className="w-8 shrink-0 text-center text-[12px] font-medium tabular-nums text-white/50">
                {row.goalDiff}
              </span>
              <span className="w-8 shrink-0 text-right text-sm font-black tabular-nums text-white">{row.points}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/** Scorers + discipline strip. */
function StatsStrip() {
  const { management } = useTorneosContent();
  const board = management.board;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="premium-card rounded-3xl p-4 sm:p-5"
      >
        <div className="mb-3 flex items-center gap-2">
          <Goal className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-bold text-white">{board.scorersTitle}</h3>
        </div>
        <div className="flex flex-col gap-2">
          {board.scorers.map((scorer, i) => (
            <div
              key={scorer.name}
              className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.025] px-3 py-2"
            >
              <span className="w-4 shrink-0 text-center text-[12px] font-black tabular-nums text-white/40">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-bold text-white">{scorer.name}</p>
                <p className="truncate text-[10px] font-medium text-white/40">{scorer.team}</p>
              </div>
              <span className="shrink-0 text-sm font-black tabular-nums text-primary">{scorer.goals}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.18 }}
        className="premium-card rounded-3xl p-4 sm:p-5"
      >
        <div className="mb-3 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-accent-secondary" />
          <h3 className="text-sm font-bold text-white">{board.disciplineTitle}</h3>
        </div>
        <div className="flex flex-col gap-2">
          {board.discipline.map((item, i) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.025] px-3 py-2.5"
            >
              <span className="flex items-center gap-2 text-[12px] font-bold text-white">
                <span
                  className="h-4 w-3 rounded-[3px]"
                  style={{
                    background: i === 0 ? "#facc15" : i === 1 ? "#ef4444" : "rgba(255,255,255,0.25)",
                  }}
                  aria-hidden="true"
                />
                {item.label}
              </span>
              <span className="text-[11px] font-medium tabular-nums text-white/45">{item.detail}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function TorneosManagement() {
  const { management } = useTorneosContent();

  return (
    <Section id="torneos-gestion" className="premium-section border-t border-white/5 bg-background">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[380px] w-[380px] rounded-full bg-violet-700/10 blur-[110px] md:h-[560px] md:w-[720px]" />
      </div>

      <div className="container relative mx-auto">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="premium-eyebrow mb-5 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5"
          >
            {management.eyebrow}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="premium-section-title mb-4 text-white md:mb-5"
          >
            <span className="premium-metal block">{management.title.lineOne}</span>
            <span className="premium-gradient-text block">{management.title.highlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base text-white/60 md:text-lg"
          >
            {management.description}
          </motion.p>
        </div>

        {/* Product-shaped mock */}
        <div
          className="mb-10 grid gap-4 lg:grid-cols-2 lg:gap-5 md:mb-14"
          role="img"
          aria-label={management.board.ariaLabel}
        >
          <FixtureCard />
          <div className="flex flex-col gap-4 lg:gap-5">
            <StandingsCard />
          </div>
          <div className="lg:col-span-2">
            <StatsStrip />
          </div>
        </div>

        {/* Module grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {management.modules.map((module, i) => {
            const Icon = MODULE_ICONS[i] ?? Users;

            return (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: 0.05 * i }}
                className="h-full rounded-2xl border border-white/8 bg-white/[0.025] p-4 transition-colors hover:border-primary/30 hover:bg-white/[0.045] sm:p-5"
              >
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <Icon className="h-[18px] w-[18px] text-primary" />
                </span>
                <h3 className="mb-1.5 text-[15px] font-bold text-white">{module.title}</h3>
                <p className="text-[13px] leading-relaxed text-white/55">{module.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
