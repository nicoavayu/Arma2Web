"use client";

import React from "react";
import { motion } from "framer-motion";
import { Monitor, Smartphone, TabletSmartphone } from "lucide-react";
import { Section } from "@/components/Section";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";

/** Icons follow the order of `platforms.cards`: web, iPhone, Android. */
const CARD_ICONS = [Monitor, Smartphone, TabletSmartphone] as const;

export function TorneosPlatforms() {
  const { platforms } = useTorneosContent();

  return (
    <Section id="torneos-plataformas" className="premium-section border-t border-white/5 bg-background">
      <div className="container relative mx-auto">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="premium-eyebrow mb-5 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5"
          >
            {platforms.eyebrow}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="premium-section-title mb-4 text-white md:mb-5"
          >
            <span className="premium-metal block">{platforms.title.lineOne}</span>
            <span className="premium-gradient-text block">{platforms.title.highlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base text-white/60 md:text-lg"
          >
            {platforms.description}
          </motion.p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {platforms.cards.map((card, i) => {
            const Icon = CARD_ICONS[i] ?? Monitor;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.06 * i }}
                className="premium-card flex h-full flex-col items-center rounded-3xl p-5 text-center sm:p-6"
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <h3 className="mb-1.5 text-base font-bold text-white sm:text-lg">{card.title}</h3>
                <p className="text-[13px] leading-relaxed text-white/55 sm:text-sm">{card.description}</p>
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
          {platforms.note}
        </motion.p>
      </div>
    </Section>
  );
}
