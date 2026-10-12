"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, CalendarClock, Globe, ListOrdered, Smartphone } from "lucide-react";
import { Section } from "@/components/Section";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";

/** Icons follow the order of `players.points`. */
const POINT_ICONS = [CalendarClock, ListOrdered, BarChart3] as const;

/** Icons follow the order of `players.platforms`: iPhone, Android, web. */
const PLATFORM_ICONS = [Smartphone, Smartphone, Globe] as const;

export function TorneosPlayers() {
  const { players } = useTorneosContent();

  return (
    <Section id="torneos-jugadores" className="premium-section border-t border-white/5 bg-background">
      <div className="container relative mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="premium-eyebrow mb-5 inline-block rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5"
          >
            {players.eyebrow}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="premium-section-title mb-4 text-white md:mb-5"
          >
            <span className="premium-metal block">{players.title.lineOne}</span>
            <span className="premium-gradient-text block">{players.title.highlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mb-6 text-base text-white/60 md:text-lg"
          >
            {players.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="mb-10 flex flex-wrap justify-center gap-2 md:mb-12"
          >
            {players.platforms.map((platform, i) => {
              const Icon = PLATFORM_ICONS[i] ?? Globe;

              return (
                <span
                  key={platform}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12px] font-semibold text-white/75 backdrop-blur-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {platform}
                </span>
              );
            })}
          </motion.div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {players.points.map((point, i) => {
            const Icon = POINT_ICONS[i] ?? CalendarClock;

            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.06 * i }}
                className="premium-card h-full rounded-3xl p-5 sm:p-6"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Icon className="h-5 w-5 text-accent-secondary" />
                </span>
                <h3 className="mb-1.5 text-base font-bold text-white">{point.title}</h3>
                <p className="text-[13px] leading-relaxed text-white/55 sm:text-sm">{point.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center text-[13px] text-white/45 md:mt-8"
        >
          {players.note}
        </motion.p>
      </div>
    </Section>
  );
}
