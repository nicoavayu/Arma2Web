"use client";

import React from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  MapPin,
  Radar,
  SlidersHorizontal,
  UsersRound,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/Section";
import { useLanguage } from "@/components/LanguageProvider";

const PLAYER_COLORS = [
  "from-[#27b8ff] to-[#5269ff]",
  "from-[#8b5cff] to-[#d34dff]",
  "from-[#21c7a8] to-[#27b8ff]",
  "from-[#f15b9a] to-[#8b5cff]",
  "from-[#ff9d55] to-[#ec4dff]",
] as const;

function PlayerConstellation({ label }: { label: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-3.5 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
          <Radar className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          {label}
        </div>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-200/90">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
          7 / 10
        </span>
      </div>

      <div className="flex min-h-12 items-center">
        {PLAYER_COLORS.map((color, index) => (
          <motion.span
            key={color}
            initial={reduceMotion ? false : { opacity: 0, x: -8, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : index * 0.08 }}
            className={`relative -mr-1.5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0b0c1d] bg-gradient-to-br ${color} text-[10px] font-black text-white shadow-[0_0_18px_rgba(91,75,255,0.22)]`}
            aria-hidden="true"
          >
            {String.fromCharCode(78 + index)}
          </motion.span>
        ))}
        <span className="ml-3 text-xs leading-snug text-white/55">+2</span>
      </div>
    </div>
  );
}

function AvailabilityPanel() {
  const { t } = useLanguage();
  const demo = t.autoMatch.demo;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b0d21]/88 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{demo.availabilityEyebrow}</p>
          <p className="mt-1 text-sm font-semibold text-white">{demo.availabilityTitle}</p>
        </div>
        <SlidersHorizontal className="h-4 w-4 text-white/35" aria-hidden="true" />
      </div>

      <div className="space-y-2.5">
        <div className="grid grid-cols-[1.35rem_1fr] items-center gap-2.5">
          <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
          <div className="flex gap-1.5">
            {demo.days.map((day, index) => (
              <span
                key={day}
                className={`inline-flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 text-[10px] font-bold ${index === 0
                  ? "border-primary/45 bg-primary/15 text-white shadow-[0_0_16px_rgba(39,184,255,0.12)]"
                  : "border-white/10 bg-white/[0.035] text-white/45"
                  }`}
              >
                {day}
              </span>
            ))}
          </div>
        </div>
        {[
          { icon: Clock3, label: demo.time },
          { icon: UsersRound, label: demo.formats },
          { icon: MapPin, label: demo.distance },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="grid grid-cols-[1.35rem_1fr] items-center gap-2.5">
            <Icon className="h-4 w-4 text-white/45" aria-hidden="true" />
            <span className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-semibold text-white/78">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OpportunityPanel() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const demo = t.autoMatch.demo;

  return (
    <div className="rounded-2xl border border-accent/25 bg-[linear-gradient(145deg,rgba(88,62,175,0.22),rgba(10,12,30,0.92))] p-3.5 shadow-[0_18px_45px_rgba(0,0,0,0.24)] sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-violet-200">
          {demo.opportunityStatus}
        </span>
        <span className="text-[10px] font-bold text-white/58">{demo.confirmed}</span>
      </div>
      <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/8" aria-label={demo.confirmed}>
        <motion.div
          initial={reduceMotion ? false : { width: 0 }}
          whileInView={{ width: "70%" }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.85, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary via-primary-glow to-accent-secondary"
        />
      </div>
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="text-white/48">{demo.timeLabel}</span>
        <span className="font-semibold text-white/82">{demo.timePending}</span>
      </div>
    </div>
  );
}

function CreatedMatchPanel() {
  const { t } = useLanguage();
  const demo = t.autoMatch.demo;

  return (
    <div className="rounded-2xl border border-emerald-300/25 bg-[linear-gradient(145deg,rgba(22,126,111,0.17),rgba(8,11,26,0.94))] p-3.5 sm:p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-300/10 text-emerald-200">
          <Check className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.15em] text-emerald-200/80">{demo.createdStatus}</p>
          <p className="mt-0.5 text-sm font-bold text-white">{demo.createdTime}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-lg border border-white/8 bg-black/15 px-3 py-2 text-[11px]">
        <span className="text-white/55">{demo.createdFormat}</span>
        <span className="font-semibold text-white/76">{demo.chatActive}</span>
      </div>
    </div>
  );
}

function AutoMatchDemo() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduceMotion ? 0 : 0.55 }}
      className="relative"
      role="img"
      aria-label={t.autoMatch.demo.ariaLabel}
    >
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(91,75,255,0.2),transparent_68%)] blur-2xl" />
      <div className="premium-card overflow-hidden rounded-[1.4rem] p-3.5 [@media(max-width:360px)]:p-3 sm:p-5 lg:p-6">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/8 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/25 bg-primary/10">
              <Radar className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/72">{t.autoMatch.demo.title}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-200/85">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
            {t.autoMatch.demo.active}
          </span>
        </div>

        <div className="grid gap-3.5 lg:grid-cols-[0.86fr_1.14fr] lg:gap-4">
          <AvailabilityPanel />

          <div className="grid gap-3.5">
            <PlayerConstellation label={t.autoMatch.demo.compatiblePlayers} />
            <OpportunityPanel />
            <div className="flex items-center gap-2 px-1 text-[9px] font-black uppercase tracking-[0.13em] text-white/36" aria-hidden="true">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-emerald-300/30" />
              <ArrowRight className="h-3.5 w-3.5 text-emerald-200/65" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-emerald-300/30" />
            </div>
            <CreatedMatchPanel />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AutoMatch() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const stepIcons = [CalendarDays, UsersRound, CheckCircle2] as const;

  return (
    <Section
      id="partido-automatico"
      className="premium-section border-y border-white/[0.055] bg-[#080817]"
    >
      <div className="container mx-auto max-w-[92rem]">
        <div className="grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 xl:gap-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduceMotion ? 0 : 0.5 }}
            className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left"
          >
            <span className="premium-eyebrow mb-4 block">{t.autoMatch.eyebrow}</span>
            <h2 className="premium-section-title mb-5 text-white md:mb-6">
              <span className="premium-metal block">{t.autoMatch.title.lineOne}</span>
              <span className="premium-gradient-text block">{t.autoMatch.title.highlight}</span>
            </h2>
            <p className="mx-auto mb-5 max-w-lg text-[15px] leading-relaxed text-white/68 sm:text-base md:text-lg lg:mx-0">
              {t.autoMatch.description}
            </p>
            <p className="mx-auto max-w-lg border-l-2 border-primary/35 pl-3 text-left text-xs leading-relaxed text-white/48 lg:mx-0">
              {t.autoMatch.controlNote}
            </p>
          </motion.div>

          <AutoMatchDemo />
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3 md:mt-14 md:gap-4">
          {t.autoMatch.steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <motion.article
                key={step.title}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/34">0{index + 1}</span>
                </div>
                <h3 className="mb-2 text-sm font-black uppercase tracking-[0.06em] text-white sm:text-[15px]">{step.title}</h3>
                <p className="text-xs leading-relaxed text-text-secondary sm:text-sm">{step.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
