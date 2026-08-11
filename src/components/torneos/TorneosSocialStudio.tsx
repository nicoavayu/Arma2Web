"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Section } from "@/components/Section";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";

const PREVIEW_GRADIENTS = [
  "linear-gradient(150deg, rgba(39,184,255,0.24), rgba(91,75,255,0.16) 52%, rgba(7,7,17,0.9))",
  "linear-gradient(150deg, rgba(168,85,247,0.24), rgba(91,75,255,0.16) 52%, rgba(7,7,17,0.9))",
  "linear-gradient(150deg, rgba(236,77,255,0.22), rgba(39,184,255,0.14) 52%, rgba(7,7,17,0.9))",
] as const;

/**
 * Abstract previews of social pieces. Deliberately abstract: no fabricated
 * exported artwork, no logos, no crests — the shapes stand in for a piece
 * generated from tournament data.
 */
function PiecePreviews() {
  const { socialStudio } = useTorneosContent();

  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
      {socialStudio.previews.map((preview, i) => (
        <motion.div
          key={preview.label}
          initial={{ opacity: 0, y: 22, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.08 * i }}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:rounded-3xl sm:p-4"
          style={{ background: PREVIEW_GRADIENTS[i] ?? PREVIEW_GRADIENTS[0] }}
        >
          {/* Grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative flex h-full flex-col justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/60 sm:text-[10px]">
                {preview.caption}
              </p>
              <p className="mt-1 text-[13px] font-black leading-tight text-white sm:text-base">{preview.label}</p>
            </div>

            {/* Abstract data rows */}
            <div className="flex flex-col gap-1.5">
              {[0.9, 0.7, 0.5].map((width, rowIndex) => (
                <span
                  key={rowIndex}
                  className="h-1.5 rounded-full bg-white/25 sm:h-2"
                  style={{ width: `${width * 100}%` }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function TorneosSocialStudio() {
  const { socialStudio } = useTorneosContent();

  return (
    <Section id="torneos-social-studio" className="premium-section border-t border-white/5 bg-[#070712]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[340px] w-[340px] rounded-full bg-fuchsia-700/10 blur-[110px] md:h-[500px] md:w-[680px]" />
      </div>

      <div className="container relative mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="premium-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-accent-secondary/30 bg-accent-secondary/10 px-4 py-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {socialStudio.eyebrow}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="premium-section-title mb-4 text-white md:mb-5"
            >
              <span className="premium-metal block">{socialStudio.title.lineOne}</span>
              <span className="premium-gradient-text block">{socialStudio.title.highlight}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mx-auto mb-7 max-w-xl text-base text-white/60 md:mb-8 md:text-lg lg:mx-0"
            >
              {socialStudio.description}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mx-auto flex max-w-xl flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start"
            >
              {socialStudio.pieces.map((piece) => (
                <li
                  key={piece}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[12px] font-semibold text-white/70"
                >
                  {piece}
                </li>
              ))}
            </motion.ul>

            {/* Prudent availability note — Social Studio pieces sit behind
                flags/entitlements, so nothing is promised as generally available. */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto mt-6 max-w-xl text-[12px] leading-relaxed text-white/40 lg:mx-0"
            >
              {socialStudio.note}
            </motion.p>
          </div>

          <div className="relative w-full min-w-0">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,rgba(236,77,255,0.18),rgba(91,75,255,0.12)_48%,transparent_74%)] blur-2xl" />
            <PiecePreviews />
          </div>
        </div>
      </div>
    </Section>
  );
}
