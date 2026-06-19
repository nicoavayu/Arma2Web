"use client";

import React from "react";
import { Section } from "@/components/Section";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import {
    BarChart3,
    Percent,
    History,
    Trophy,
    Swords,
    TrendingUp,
    TrendingDown,
    Crown,
} from "lucide-react";

const BULLET_ICONS = [BarChart3, Percent, History, Trophy, Swords] as const;

const ROW_ACCENTS = ["#fbbf24", "#27b8ff", "#a855f7", "#20e39b"] as const;

/* ─────────────────────────────────────────────────────────────
   Leaderboard card – ranked teams with record and win %
───────────────────────────────────────────────────────────── */
function LeaderboardCard() {
    const { t } = useLanguage();
    const lb = t.teamRanking.leaderboard;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="premium-card relative overflow-hidden rounded-3xl p-4 [@media(max-width:430px)]:p-3.5 sm:p-6"
        >
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-primary/15 blur-[90px]" />

            {/* Header */}
            <div className="relative mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                    </span>
                    <h3 className="text-sm font-bold text-white sm:text-base">{lb.title}</h3>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    {lb.liveLabel}
                </span>
            </div>

            {/* Column hints */}
            <div className="relative mb-2 flex items-center gap-3 px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                <span className="w-5 text-center">#</span>
                <span className="flex-1">{/* team */}</span>
                <span className="hidden w-20 sm:block">{/* win% bar */}</span>
                <span className="w-14 text-right">{lb.winRateLabel}</span>
            </div>

            {/* Rows */}
            <div className="relative flex flex-col gap-2">
                {lb.rows.map((row, i) => {
                    const accent = ROW_ACCENTS[i] ?? "#27b8ff";
                    const isTop = i === 0;
                    const TrendIcon = row.trend === "down" ? TrendingDown : TrendingUp;

                    return (
                        <motion.div
                            key={row.name}
                            initial={{ opacity: 0, x: 16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                            className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 [@media(max-width:430px)]:px-2.5 ${
                                isTop
                                    ? "border-yellow-400/35 bg-yellow-400/[0.07] shadow-[0_0_24px_rgba(251,191,36,0.1)]"
                                    : "border-white/8 bg-white/[0.025]"
                            }`}
                        >
                            {/* Rank */}
                            <span
                                className="relative w-5 shrink-0 text-center text-base font-black tabular-nums"
                                style={{ color: accent }}
                            >
                                {i + 1}
                                {isTop && (
                                    <Crown className="absolute -top-3 left-1/2 h-3 w-3 -translate-x-1/2 text-yellow-400" fill="currentColor" />
                                )}
                            </span>

                            {/* Badge */}
                            <span
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-[11px] font-black text-white"
                                style={{
                                    background: `linear-gradient(135deg, ${accent}33, ${accent}11)`,
                                    borderColor: `${accent}44`,
                                }}
                            >
                                {row.initials}
                            </span>

                            {/* Name + record */}
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px] font-bold text-white sm:text-sm">{row.name}</p>
                                <p className="text-[11px] font-medium tabular-nums text-white/45">{row.record}</p>
                            </div>

                            {/* Win % bar (visual) */}
                            <div className="hidden w-20 shrink-0 items-center sm:flex">
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${row.winRate}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.9, delay: 0.25 + i * 0.08, ease: "easeOut" }}
                                        className="h-full rounded-full"
                                        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}aa)` }}
                                    />
                                </div>
                            </div>

                            {/* Win % + trend */}
                            <div className="flex w-14 shrink-0 flex-col items-end">
                                <span className="text-sm font-black tabular-nums text-white">{row.winRate}%</span>
                                <span className={`flex items-center gap-0.5 text-[10px] font-bold ${row.trend === "down" ? "text-red-400" : "text-emerald-400"}`}>
                                    <TrendIcon className="h-3 w-3" />
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <p className="relative mt-4 text-center text-[11px] text-white/35">{lb.footnote}</p>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   Head-to-head card – record between two rival teams
───────────────────────────────────────────────────────────── */
function VersusCard() {
    const { t } = useLanguage();
    const vs = t.teamRanking.versus;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="premium-card relative overflow-hidden rounded-3xl p-4 sm:p-5"
        >
            <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
                <Swords className="h-3.5 w-3.5 text-accent-secondary" />
                {vs.eyebrow}
            </div>

            <div className="flex items-center justify-between gap-3">
                {/* Team A */}
                <div className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/40 bg-primary/15 text-xs font-black text-white">
                        LG
                    </span>
                    <span className="max-w-[7rem] truncate text-center text-[11px] font-semibold text-white/70">{vs.teamA}</span>
                </div>

                {/* Score */}
                <div className="flex shrink-0 flex-col items-center">
                    <div className="flex items-center gap-2 text-3xl font-black tabular-nums text-white sm:text-4xl">
                        <span className="text-primary">{vs.scoreA}</span>
                        <span className="text-white/25">:</span>
                        <span className="text-accent-secondary">{vs.scoreB}</span>
                    </div>
                    <span className="mt-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                        {vs.draws}
                    </span>
                </div>

                {/* Team B */}
                <div className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent-secondary/40 bg-accent-secondary/15 text-xs font-black text-white">
                        DT
                    </span>
                    <span className="max-w-[7rem] truncate text-center text-[11px] font-semibold text-white/70">{vs.teamB}</span>
                </div>
            </div>

            <p className="mt-4 text-center text-[11px] text-white/35">{vs.footnote}</p>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   Main section
───────────────────────────────────────────────────────────── */
export function TeamRanking() {
    const { t } = useLanguage();
    const tr = t.teamRanking;

    return (
        <Section id="ranking" className="premium-section border-t border-white/5 bg-[#070712]">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-[360px] w-[360px] rounded-full bg-violet-700/10 blur-[110px] md:h-[520px] md:w-[680px]" />
            </div>

            <div className="container relative mx-auto">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                    {/* Copy + bullets */}
                    <div className="text-center lg:text-left">
                        <motion.span
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="premium-eyebrow mb-5 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 [@media(max-width:430px)]:px-3"
                        >
                            {tr.eyebrow}
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="premium-section-title mb-4 text-white md:mb-5"
                        >
                            <span className="premium-metal block">{tr.title.lineOne}</span>
                            <span className="premium-gradient-text block">{tr.title.highlight}</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mx-auto mb-7 max-w-xl text-base text-white/60 [@media(max-width:430px)]:text-[15px] md:mb-8 md:text-lg lg:mx-0"
                        >
                            {tr.description}
                        </motion.p>

                        <ul className="mx-auto grid max-w-xl gap-2.5 sm:grid-cols-2 lg:mx-0">
                            {tr.bullets.map((bullet, i) => {
                                const Icon = BULLET_ICONS[i] ?? BarChart3;
                                return (
                                    <motion.li
                                        key={bullet}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
                                        className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3 text-left"
                                    >
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
                                            <Icon className="h-4 w-4 text-primary" />
                                        </span>
                                        <span className="text-[13px] font-semibold text-white/85 sm:text-sm">{bullet}</span>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Visuals */}
                    <div className="flex flex-col gap-4">
                        <LeaderboardCard />
                        <VersusCard />
                    </div>
                </div>
            </div>
        </Section>
    );
}
