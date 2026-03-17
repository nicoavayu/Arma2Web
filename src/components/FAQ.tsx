"use client";

import React, { useState } from "react";
import { Section } from "@/components/Section";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export function FAQ() {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <Section id="faq" className="bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="mb-10 text-center text-3xl font-bold text-white md:mb-16 md:text-5xl">
                    {t.faq.title}
                </h2>

                <div className="mx-auto max-w-3xl space-y-3 md:space-y-4">
                    {t.faq.items.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-white/5 rounded-2xl bg-surface/30 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-white/5 sm:p-5 md:p-6"
                            >
                                <span className="pr-4 text-base font-medium text-white sm:text-lg">
                                    {faq.question}
                                </span>
                                <span className="text-white/50">
                                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="border-t border-white/5 p-4 pt-0 leading-relaxed text-text-secondary sm:p-5 sm:pt-0 md:p-6 md:pt-0">
                                            {faq.answer}
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
