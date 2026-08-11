"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Rocket, Building2 } from "lucide-react";
import { Section } from "@/components/Section";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { CreateTournamentCta, TorneosLinkButton } from "@/components/torneos/TorneosCta";
import { TORNEOS_CONTACT_HREF } from "@/lib/torneos-links";

/**
 * FREE / PRO section — VISUAL SHELL, PROVISIONAL CATALOG.
 *
 * On purpose there are no prices, no currency, no numeric limits and no feature
 * list: `plans.free.features` / `plans.pro.features` are empty in the content
 * module until the commercial catalog is signed off. While they are empty this
 * renders the plan description only, so a visitor never sees a placeholder.
 * Fill those arrays (ES + EN) and the checklist appears — no changes needed here.
 */
function PlanCard({
  plan,
  highlighted,
  children,
}: {
  plan: { name: string; badge: string | null; tagline: string; description: string; features: string[] };
  highlighted?: boolean;
  children: React.ReactNode;
}) {
  const Icon = highlighted ? Building2 : Rocket;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: highlighted ? 0.1 : 0 }}
      className={`premium-card relative flex h-full flex-col overflow-hidden rounded-3xl p-6 sm:p-7 ${
        highlighted ? "border-accent/35 shadow-[0_0_44px_rgba(168,85,247,0.14)]" : ""
      }`}
    >
      {highlighted && (
        <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-accent/20 blur-[90px]" />
      )}

      <div className="relative mb-5 flex items-start justify-between gap-3">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
            highlighted ? "border-accent/35 bg-accent/12" : "border-white/10 bg-white/5"
          }`}
        >
          <Icon className={`h-5 w-5 ${highlighted ? "text-accent-secondary" : "text-primary"}`} />
        </span>

        {plan.badge && (
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-accent-secondary">
            {plan.badge}
          </span>
        )}
      </div>

      <h3 className="relative mb-2 text-2xl font-black tracking-tight text-white">{plan.name}</h3>
      <p className="relative mb-3 text-[15px] font-semibold leading-snug text-white/85">{plan.tagline}</p>
      <p className="relative mb-6 text-[13px] leading-relaxed text-white/55 sm:text-sm">{plan.description}</p>

      {plan.features.length > 0 && (
        <ul className="relative mb-6 flex flex-col gap-2.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-white/70">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      <div className="relative mt-auto">{children}</div>
    </motion.div>
  );
}

export function TorneosPlans() {
  const { plans } = useTorneosContent();

  return (
    <Section id="torneos-planes" className="premium-section border-t border-white/5 bg-[#070712]">
      <div className="container relative mx-auto">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="premium-eyebrow mb-5 inline-block rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5"
          >
            {plans.eyebrow}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="premium-section-title mb-4 text-white md:mb-5"
          >
            <span className="premium-metal block">{plans.title.lineOne}</span>
            <span className="premium-gradient-text block">{plans.title.highlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base text-white/60 md:text-lg"
          >
            {plans.description}
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2 md:gap-5">
          <PlanCard plan={plans.free}>
            <CreateTournamentCta label={plans.free.cta} className="w-full" />
          </PlanCard>

          <PlanCard plan={plans.pro} highlighted>
            {/* No checkout, no Mercado Pago, no subscription flow: PRO interest
                routes to the existing contact page until pricing is defined. */}
            <TorneosLinkButton href={TORNEOS_CONTACT_HREF} variant="secondary" className="w-full">
              {plans.pro.cta}
            </TorneosLinkButton>
          </PlanCard>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-7 max-w-2xl text-center text-[12px] leading-relaxed text-white/40 md:mt-8 md:text-[13px]"
        >
          {plans.footnote}
        </motion.p>
      </div>
    </Section>
  );
}
