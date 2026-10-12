"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { Section } from "@/components/Section";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";

export function TorneosProblem() {
  const { problem } = useTorneosContent();

  return (
    <Section id="torneos-problema" className="premium-section border-t border-white/5 bg-[#070712]">
      <div className="container relative mx-auto">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="premium-eyebrow mb-5 inline-block rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5"
          >
            {problem.eyebrow}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="premium-section-title mb-4 text-white md:mb-5"
          >
            <span className="premium-metal block">{problem.title.lineOne}</span>
            <span className="premium-gradient-text block">{problem.title.highlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base text-white/60 md:text-lg"
          >
            {problem.description}
          </motion.p>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-7">
          {/* Chaos column */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="rounded-3xl border border-white/8 bg-white/[0.02] p-5 sm:p-6"
          >
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/40">
              {problem.chaosTitle}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {problem.chaos.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.06 * i }}
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-black/25 px-3.5 py-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-red-400/25 bg-red-400/10">
                    <X className="h-3.5 w-3.5 text-red-400/90" />
                  </span>
                  <span className="text-[13px] font-medium leading-snug text-white/55 line-through decoration-white/20 sm:text-sm">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Divider arrow */}
          <div className="flex items-center justify-center py-1 lg:h-full lg:py-0">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/35 bg-primary/12 shadow-[0_0_28px_rgba(39,184,255,0.22)]"
            >
              <ArrowRight className="h-5 w-5 rotate-90 text-primary lg:rotate-0" />
            </motion.span>
          </div>

          {/* Arma2 column */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="premium-card rounded-3xl p-5 sm:p-6"
          >
            <h3 className="premium-eyebrow mb-5 block">{problem.orderTitle}</h3>
            <ul className="flex flex-col gap-3">
              {problem.order.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + 0.08 * i }}
                  className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-3.5 py-3.5"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-400/10">
                    <Check className="h-3.5 w-3.5 text-emerald-300" />
                  </span>
                  <div className="min-w-0">
                    <p className="mb-1 text-sm font-bold text-white">{item.title}</p>
                    <p className="text-[13px] leading-relaxed text-white/55">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
