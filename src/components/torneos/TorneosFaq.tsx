"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Section } from "@/components/Section";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";

/** Same interaction pattern as the homepage FAQ, with the Torneos dictionary. */
export function TorneosFaq() {
  const { faq } = useTorneosContent();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <Section id="torneos-faq" className="premium-section border-t border-white/5 bg-[#070712]">
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mb-10 text-center md:mb-14">
          <span className="premium-eyebrow mb-5 inline-block rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5">
            {faq.eyebrow}
          </span>
          <h2 className="premium-section-title text-white">
            <span className="premium-metal">{faq.title}</span>
          </h2>
        </div>

        <div className="mx-auto max-w-3xl space-y-3 md:space-y-4">
          {faq.items.map((item, index) => (
            <div key={item.question} className="overflow-hidden rounded-2xl border border-white/5 bg-surface/30">
              <button
                id={`torneos-faq-trigger-${index}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`torneos-faq-panel-${index}`}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-white/5 sm:p-5 md:p-6"
              >
                <span className="pr-4 text-base font-medium text-white sm:text-lg">{item.question}</span>
                <span className="text-white/50" aria-hidden="true">
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`torneos-faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`torneos-faq-trigger-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.3 }}
                  >
                    <div className="border-t border-white/5 p-4 pt-0 leading-relaxed text-text-secondary sm:p-5 sm:pt-0 md:p-6 md:pt-0">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
