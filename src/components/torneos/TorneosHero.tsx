"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Check, Trophy } from "lucide-react";
import { Section } from "@/components/Section";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { CreateTournamentCta, TorneosLinkButton } from "@/components/torneos/TorneosCta";
import { TORNEOS_HOW_ANCHOR } from "@/lib/torneos-links";

const ROW_ACCENTS = ["#fbbf24", "#27b8ff", "#a855f7"] as const;

/**
 * Tournament summary panel — product-shaped mock built in markup (same approach
 * as the homepage sections). No fabricated screenshots, logos or crests.
 */
function TournamentPanel() {
  const { hero } = useTorneosContent();
  const panel = hero.panel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="premium-card relative w-full overflow-hidden rounded-3xl p-4 sm:p-5 md:p-6"
      role="img"
      aria-label={panel.ariaLabel}
    >
      <div className="pointer-events-none absolute -right-20 -top-24 h-60 w-60 rounded-full bg-accent/20 blur-[90px]" />

      {/* Tournament header */}
      <div className="relative mb-5 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent/35 bg-accent/12">
            <Trophy className="h-5 w-5 text-accent-secondary" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white sm:text-base">{panel.tournamentName}</p>
            <p className="truncate text-[11px] font-medium text-white/45">{panel.formatLabel}</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          {panel.statusLabel}
        </span>
      </div>

      {/* Round progress */}
      <div className="relative mb-5 rounded-2xl border border-white/8 bg-white/[0.025] px-3.5 py-3">
        <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-white/60">
          <span>{panel.roundLabel}</span>
          <span className="tabular-nums text-white/40">7/12</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "58%" }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent-secondary"
          />
        </div>
      </div>

      {/* Standings */}
      <div className="relative mb-4">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">
            {panel.standingsTitle}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/30">{panel.pointsLabel}</span>
        </div>

        <div className="flex flex-col gap-2">
          {panel.rows.map((row, i) => {
            const accent = ROW_ACCENTS[i] ?? "#27b8ff";
            const isTop = i === 0;

            return (
              <motion.div
                key={row.name}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.4 + i * 0.09 }}
                className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 ${
                  isTop
                    ? "border-yellow-400/35 bg-yellow-400/[0.07] shadow-[0_0_24px_rgba(251,191,36,0.1)]"
                    : "border-white/8 bg-white/[0.025]"
                }`}
              >
                <span
                  className="w-4 shrink-0 text-center text-sm font-black tabular-nums"
                  style={{ color: accent }}
                >
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
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold text-white">{row.name}</p>
                  <p className="text-[11px] font-medium tabular-nums text-white/45">{row.played}</p>
                </div>
                <span className="shrink-0 text-base font-black tabular-nums text-white">{row.points}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Next match */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.75 }}
        className="relative flex items-center gap-3 rounded-2xl border border-primary/25 bg-primary/[0.08] px-3.5 py-3"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/12">
          <CalendarDays className="h-4 w-4 text-primary" />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary/90">{panel.nextMatchLabel}</p>
          <p className="truncate text-[13px] font-semibold text-white">{panel.nextMatchDetail}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TorneosHero() {
  const { hero } = useTorneosContent();

  return (
    <Section
      id="torneos-hero"
      className="premium-section relative isolate flex items-start overflow-hidden bg-background pt-[calc(var(--nav-height-mobile)+2rem+env(safe-area-inset-top))] pb-14 md:min-h-[92vh] md:items-center md:pt-36 md:pb-24"
    >
      {/* Photographic background (existing on-brand asset) */}
      <div className="pointer-events-none absolute inset-0 -z-30">
        <Image
          src="/BG_HERO.png"
          alt=""
          aria-hidden="true"
          fill
          quality={60}
          sizes="100vw"
          className="hero-photo-img"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div className="hero-photo-overlay pointer-events-none absolute inset-0 -z-20" />

      <div
        className="hero-grid-layer pointer-events-none absolute inset-0 -z-10 opacity-[0.16]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="container relative mx-auto max-w-[92rem]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          {/* Copy */}
          <div className="relative z-20 flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="premium-eyebrow mb-4 inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5"
            >
              {hero.eyebrow}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="premium-section-title mb-4 w-full max-w-[36rem] text-white md:mb-6"
            >
              <span className="premium-metal block">{hero.title.lineOne}</span>
              <span className="premium-gradient-text block">{hero.title.highlight}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-5 w-full max-w-xl text-[15px] leading-relaxed text-white/72 sm:text-base md:mb-6 md:text-lg"
            >
              {hero.description}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mb-7 flex flex-wrap justify-center gap-2 md:mb-8 lg:justify-start"
            >
              {hero.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-semibold text-white/75 backdrop-blur-sm sm:text-[13px]"
                >
                  <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                  {bullet}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
            >
              <CreateTournamentCta label={hero.ctaPrimary} />
              <TorneosLinkButton href={TORNEOS_HOW_ANCHOR} variant="secondary">
                {hero.ctaSecondary}
              </TorneosLinkButton>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-5 max-w-md text-[13px] leading-relaxed text-white/45"
            >
              {hero.audienceNote}
            </motion.p>
          </div>

          {/* Product panel */}
          <div className="relative w-full min-w-0">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgba(91,75,255,0.22),rgba(236,77,255,0.12)_46%,transparent_72%)] blur-2xl" />
            <TournamentPanel />
          </div>
        </div>
      </div>
    </Section>
  );
}
