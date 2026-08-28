"use client";

import React from "react";
import { motion } from "framer-motion";
import { FolderOpen, ImageIcon, Images, LayoutGrid } from "lucide-react";
import { Section } from "@/components/Section";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";

/** Icons follow the order of `media.points`. */
const POINT_ICONS = [Images, LayoutGrid, FolderOpen] as const;

/**
 * Gallery concept mock. Tiles are abstract on purpose — there are no real
 * tournament photos in this repo, and no public-photo capability is promised.
 */
function GalleryMock() {
  const { media } = useTorneosContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6 }}
      className="premium-card relative overflow-hidden rounded-3xl p-4 sm:p-5"
    >
      <div className="pointer-events-none absolute -left-16 -bottom-20 h-52 w-52 rounded-full bg-primary/12 blur-[90px]" />

      <div className="relative mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <Images className="h-4 w-4 text-primary" />
          </span>
          <h3 className="text-sm font-bold text-white">{media.galleryLabel}</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
          {media.galleryCaption}
        </span>
      </div>

      <div className="relative grid grid-cols-3 gap-2 sm:gap-2.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
            className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-white/8"
            style={{
              background:
                i % 2 === 0
                  ? "linear-gradient(150deg, rgba(39,184,255,0.12), rgba(7,7,17,0.85))"
                  : "linear-gradient(150deg, rgba(168,85,247,0.12), rgba(7,7,17,0.85))",
            }}
            aria-hidden="true"
          >
            <ImageIcon className="h-4 w-4 text-white/20" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function TorneosMedia() {
  const { media } = useTorneosContent();

  return (
    <Section id="torneos-multimedia" className="premium-section border-t border-white/5 bg-background">
      <div className="container relative mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="order-2 relative w-full min-w-0 lg:order-1">
            <GalleryMock />
          </div>

          <div className="order-1 text-center lg:order-2 lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="premium-eyebrow mb-5 inline-block rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5"
            >
              {media.eyebrow}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="premium-section-title mb-4 text-white md:mb-5"
            >
              <span className="premium-metal block">{media.title.lineOne}</span>
              <span className="premium-gradient-text block">{media.title.highlight}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mx-auto mb-7 max-w-xl text-base text-white/60 md:mb-8 md:text-lg lg:mx-0"
            >
              {media.description}
            </motion.p>

            <ul className="mx-auto grid max-w-xl gap-2.5 lg:mx-0">
              {media.points.map((point, i) => {
                const Icon = POINT_ICONS[i] ?? Images;

                return (
                  <motion.li
                    key={point.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.38, delay: 0.2 + i * 0.07 }}
                    className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.025] px-3.5 py-3 text-left"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-white">{point.title}</p>
                      <p className="text-[12px] leading-relaxed text-white/50">{point.description}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>

            {/* Prudent note: media limits / public photos are NOT promised. */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto mt-6 max-w-xl text-[12px] leading-relaxed text-white/40 lg:mx-0"
            >
              {media.note}
            </motion.p>
          </div>
        </div>
      </div>
    </Section>
  );
}
