"use client";

import React from "react";
import { Hand, MapPin, Search, Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/Section";
import { useLanguage } from "@/components/LanguageProvider";

const KEEPER_COLORS = [
  "from-[#27b8ff] to-[#5269ff]",
  "from-[#21c7a8] to-[#27b8ff]",
  "from-[#8b5cff] to-[#d34dff]",
] as const;

function AvailabilityToggle() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const demo = t.arqueros.demo;

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-300/22 bg-[linear-gradient(145deg,rgba(22,126,111,0.16),rgba(8,11,26,0.9))] p-3">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-300/25 bg-emerald-300/10 text-emerald-200">
          <Hand className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{demo.availabilityTitle}</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-200/80">{demo.availabilityState}</p>
        </div>
      </div>
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-emerald-300/40 bg-emerald-300/20 px-0.5">
        <motion.span
          initial={reduceMotion ? false : { x: 0 }}
          whileInView={{ x: 20 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut", delay: reduceMotion ? 0 : 0.25 }}
          className="h-[18px] w-[18px] rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
        />
      </span>
    </div>
  );
}

function KeeperBoard() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const demo = t.arqueros.demo;
  const tabs = [
    { label: demo.tabs.matches, active: false },
    { label: demo.tabs.players, active: false },
    { label: demo.tabs.keepers, active: true },
  ];

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduceMotion ? 0 : 0.55 }}
      className="relative mx-auto w-full max-w-md lg:max-w-none"
      role="img"
      aria-label={demo.ariaLabel}
    >
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(39,184,255,0.18),transparent_68%)] blur-2xl" />
      <div className="premium-card overflow-hidden rounded-[1.4rem] p-3.5 [@media(max-width:360px)]:p-3 sm:p-5 lg:p-6">
        {/* Search tabs: Partidos · Jugadores · Arqueros */}
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/8 pb-3.5">
          <div className="flex items-center gap-1.5">
            {tabs.map((tab) => (
              <span
                key={tab.label}
                className={
                  tab.active
                    ? "rounded-lg border border-primary/40 bg-primary/12 px-2 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-white [@media(max-width:360px)]:px-1.5"
                    : "rounded-lg border border-transparent px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white/38 [@media(max-width:360px)]:px-1.5"
                }
              >
                {tab.label}
              </span>
            ))}
          </div>
          <span className="hidden shrink-0 items-center gap-1.5 text-[10px] font-semibold text-white/55 sm:inline-flex">
            <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {demo.nearbyLabel}
          </span>
        </div>

        <AvailabilityToggle />

        {/* Nearby goalkeepers */}
        <div className="mt-3.5 space-y-2.5">
          {demo.keepers.map((keeper, index) => (
            <motion.div
              key={keeper.name}
              initial={reduceMotion ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : index * 0.09 }}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 sm:p-3"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#0b0c1d] bg-gradient-to-br ${KEEPER_COLORS[index % KEEPER_COLORS.length]} text-[11px] font-black text-white shadow-[0_0_18px_rgba(39,184,255,0.18)]`}
              >
                {keeper.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-bold text-white">{keeper.name}</p>
                  <span className="shrink-0 rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-primary">
                    {demo.positionBadge}
                  </span>
                </div>
                <p className="mt-0.5 flex items-center gap-2 text-[11px] text-white/50">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-white/40" aria-hidden="true" />
                    {keeper.distance}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="truncate">{keeper.positions}</span>
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-primary/35 bg-primary/12 px-2.5 py-1.5 text-[11px] font-bold text-white [@media(max-width:360px)]:px-2">
                <Send className="h-3 w-3" aria-hidden="true" />
                {demo.inviteLabel}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Matches looking for a goalkeeper */}
        <div className="mt-3.5 flex items-center justify-between gap-3 rounded-2xl border border-accent/25 bg-[linear-gradient(145deg,rgba(88,62,175,0.2),rgba(10,12,30,0.9))] p-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-violet-200">
              <Search className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[9px] font-black uppercase tracking-[0.14em] text-violet-200/85">{demo.openMatch.label}</p>
              <p className="mt-0.5 text-xs font-semibold text-white/85">{demo.openMatch.detail}</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold text-white/70">
            {demo.openMatch.action}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function Arqueros() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const benefitIcons = [MapPin, Send, Hand, Search] as const;

  return (
    <Section id="mercado-arqueros" className="premium-section bg-[#070713]">
      <div className="container mx-auto max-w-[92rem]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14 xl:gap-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: reduceMotion ? 0 : 0.5 }}
            className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left"
          >
            <span className="premium-eyebrow mb-4 block">{t.arqueros.eyebrow}</span>
            <h2 className="premium-section-title mb-5 text-white md:mb-6">
              <span className="premium-metal block">{t.arqueros.title.lineOne}</span>
              <span className="premium-gradient-text block">{t.arqueros.title.highlight}</span>
            </h2>
            <p className="mx-auto mb-5 max-w-lg text-[15px] leading-relaxed text-white/68 sm:text-base md:text-lg lg:mx-0">
              {t.arqueros.description}
            </p>
            <p className="mx-auto max-w-lg border-l-2 border-primary/35 pl-3 text-left text-xs leading-relaxed text-white/48 lg:mx-0">
              {t.arqueros.positionsNote}
            </p>
          </motion.div>

          <KeeperBoard />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-14 md:gap-4 lg:grid-cols-4">
          {t.arqueros.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index];
            return (
              <motion.article
                key={benefit.title}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5"
              >
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-sm font-black uppercase tracking-[0.06em] text-white sm:text-[15px]">{benefit.title}</h3>
                <p className="text-xs leading-relaxed text-text-secondary sm:text-sm">{benefit.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
