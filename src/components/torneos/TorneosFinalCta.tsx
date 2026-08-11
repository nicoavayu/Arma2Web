"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { CreateTournamentCta, TorneosLinkButton } from "@/components/torneos/TorneosCta";
import { TorneosStoreButtons } from "@/components/torneos/TorneosStoreButtons";
import { TORNEOS_CONTACT_HREF, isCreateTournamentPending } from "@/lib/torneos-links";

/**
 * Closing CTA. Also the fallback landing spot for the primary CTA while
 * NEXT_PUBLIC_TORNEOS_APP_URL is unset — which is why the store buttons live
 * here: they are the only real, verifiable way to start today.
 */
export function TorneosFinalCta() {
  const { finalCta } = useTorneosContent();
  const showStores = isCreateTournamentPending();

  return (
    <Section
      id="torneos-empezar"
      className="premium-section relative overflow-hidden border-t border-white/5 bg-background text-center"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(91,75,255,0.22),rgba(236,77,255,0.14)_42%,transparent_70%)] blur-3xl md:h-[520px] md:w-[920px]" />

      <div className="container relative mx-auto">
        <div className="mx-auto max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="premium-section-title mb-5 text-white md:mb-6"
          >
            <span className="premium-metal block">{finalCta.title.lineOne}</span>
            <span className="premium-gradient-text block">{finalCta.title.highlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mb-8 max-w-2xl text-base text-white/60 md:mb-10 md:text-lg"
          >
            {finalCta.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          >
            <CreateTournamentCta label={finalCta.ctaPrimary} />
            <TorneosLinkButton href={TORNEOS_CONTACT_HREF} variant="secondary">
              {finalCta.ctaSecondary}
            </TorneosLinkButton>
          </motion.div>

          {showStores && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="mt-10 border-t border-white/8 pt-8"
            >
              <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white/40">
                {finalCta.storesTitle}
              </p>
              <TorneosStoreButtons className="justify-center" />
            </motion.div>
          )}

          <p className="mt-7 text-sm text-white/35 md:mt-8">{finalCta.disclaimer}</p>
        </div>
      </div>
    </Section>
  );
}
