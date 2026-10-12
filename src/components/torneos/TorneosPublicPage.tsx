"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, Copy, Goal, Link2, ListOrdered, ShieldAlert, Trophy, Users } from "lucide-react";
import { Section } from "@/components/Section";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";

/** Icons follow the order of `publicPage.items`. */
const ITEM_ICONS = [CalendarDays, Trophy, ListOrdered, Goal, Users, ShieldAlert] as const;

/**
 * Browser-framed mock of the public tournament page.
 * The share row deliberately shows a LABEL, not a URL: the public route shape
 * is owned by the Torneos product, not by this marketing repo, so no URL is
 * invented here. Swap `shareLabel` for the real pattern once it is defined.
 */
function PublicPageMock() {
  const { publicPage } = useTorneosContent();
  const mock = publicPage.mock;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6 }}
      className="premium-card relative overflow-hidden rounded-3xl p-3 sm:p-4"
      role="img"
      aria-label={mock.ariaLabel}
    >
      <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-primary/15 blur-[90px]" />

      {/* Browser chrome */}
      <div className="relative mb-3 flex items-center gap-2 px-1">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </div>

      {/* Share row */}
      <div className="relative mb-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 p-2 pl-3">
        <Link2 className="h-4 w-4 shrink-0 text-primary" />
        <span className="min-w-0 flex-1 truncate text-[12px] font-medium text-white/60">{mock.shareLabel}</span>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/12 px-2.5 py-1.5 text-[11px] font-bold text-primary">
          <Copy className="h-3 w-3" />
          {mock.copyLabel}
        </span>
      </div>

      {/* Public nav */}
      <div className="relative mb-4 flex flex-wrap gap-1.5 border-b border-white/8 pb-3">
        {mock.tabs.map((tab, i) => (
          <span
            key={tab}
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
              i === 1 ? "bg-white/10 text-white" : "text-white/40"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="relative grid gap-3 sm:grid-cols-[1.25fr_1fr]">
        {/* Results */}
        <div>
          <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">{mock.resultsTitle}</h4>
          <div className="flex flex-col gap-2">
            {mock.results.map((result) => (
              <div
                key={`${result.home}-${result.away}`}
                className="flex items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.025] px-3 py-2.5"
              >
                <span className="min-w-0 flex-1 truncate text-right text-[12px] font-semibold text-white">
                  {result.home}
                </span>
                <span className="shrink-0 rounded-lg border border-white/10 bg-black/35 px-2 py-0.5 text-[12px] font-black tabular-nums text-white">
                  {result.score}
                </span>
                <span className="min-w-0 flex-1 truncate text-[12px] font-semibold text-white">{result.away}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scorers */}
        <div>
          <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">{mock.scorersTitle}</h4>
          <div className="flex flex-col gap-2">
            {mock.scorers.map((scorer, i) => (
              <div
                key={scorer.name}
                className="flex items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.025] px-3 py-2.5"
              >
                <span className="w-3 shrink-0 text-center text-[11px] font-black tabular-nums text-white/35">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-[12px] font-semibold text-white">{scorer.name}</span>
                <span className="shrink-0 text-[13px] font-black tabular-nums text-primary">{scorer.goals}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="relative mt-4 text-center text-[11px] text-white/35">{mock.footnote}</p>
    </motion.div>
  );
}

export function TorneosPublicPage() {
  const { publicPage } = useTorneosContent();

  return (
    <Section id="torneos-pagina-publica" className="premium-section border-t border-white/5 bg-[#070712]">
      <div className="container relative mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="premium-eyebrow mb-5 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5"
            >
              {publicPage.eyebrow}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="premium-section-title mb-4 text-white md:mb-5"
            >
              <span className="premium-metal block">{publicPage.title.lineOne}</span>
              <span className="premium-gradient-text block">{publicPage.title.highlight}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mx-auto mb-4 max-w-xl text-base text-white/60 md:text-lg lg:mx-0"
            >
              {publicPage.description}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.22 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-3.5 py-1.5 text-[12px] font-semibold text-emerald-200/90 md:mb-8"
            >
              {publicPage.noAccountNote}
            </motion.p>

            <ul className="mx-auto grid max-w-xl gap-2.5 sm:grid-cols-2 lg:mx-0">
              {publicPage.items.map((item, i) => {
                const Icon = ITEM_ICONS[i] ?? CalendarDays;

                return (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.38, delay: 0.24 + i * 0.06 }}
                    className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.025] px-3.5 py-3 text-left"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-white">{item.title}</p>
                      <p className="text-[12px] leading-relaxed text-white/50">{item.description}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          <div className="relative w-full min-w-0">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgba(39,184,255,0.18),rgba(236,77,255,0.1)_48%,transparent_74%)] blur-2xl" />
            <PublicPageMock />
          </div>
        </div>
      </div>
    </Section>
  );
}
