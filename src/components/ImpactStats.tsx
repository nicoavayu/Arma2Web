"use client";

import React, { useRef } from "react";
import { Section } from "@/components/Section";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Mini flow – 3 steps
───────────────────────────────────────────────────────────── */
const flowSteps = [
    {
        label: "Armá tu equipo",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22C17.16 20.74 21 16.55 21 12V7L12 2Z" fill="url(#shGrad)" />
                <defs>
                    <linearGradient id="shGrad" x1="3" y1="2" x2="21" y2="22">
                        <stop stopColor="#818cf8" /><stop offset="1" stopColor="#6366f1" />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
    {
        label: "Publicalo al mercado",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="2.5" fill="#38bdf8" />
                <path d="M8.5 8.5C9.6 7.4 11 6.75 12 6.75C13 6.75 14.4 7.4 15.5 8.5" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5.5 5.5C7.5 3.5 10 2.25 12 2.25C14 2.25 16.5 3.5 18.5 5.5" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                <line x1="12" y1="14.5" x2="12" y2="21" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="9" y1="21" x2="15" y2="21" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Jugá y dejá historia",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="url(#bGrad)" />
                <defs>
                    <linearGradient id="bGrad" x1="4" y1="2" x2="20" y2="22">
                        <stop stopColor="#fde68a" /><stop offset="1" stopColor="#f59e0b" />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
];

/* ─────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────── */
export function ImpactStats() {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <Section id="impact" className="bg-[#07071280] border-t border-white/5">
            <div ref={ref} className="container mx-auto px-4 md:px-6">

                {/* Header - Honest Messaging */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">
                        Construyendo la red competitiva
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        La comunidad empieza con vos.
                    </h2>
                    <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-medium">
                        Sumate desde el inicio. Unite a los equipos que ya están marcando el camino en Armá2.
                    </p>
                </motion.div>

                {/* Mini flow */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-0">
                    {flowSteps.map((step, i) => (
                        <React.Fragment key={step.label}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1 + i * 0.15 }}
                                className="flex flex-col items-center gap-3 text-center px-6"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 shadow-xl group hover:border-white/20 transition-all">
                                    {step.icon}
                                </div>
                                <span className="text-sm font-bold text-white/80 uppercase tracking-wide">{step.label}</span>
                            </motion.div>

                            {i < flowSteps.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    whileInView={{ opacity: 1, scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.25 + i * 0.15 }}
                                    className="hidden sm:block h-px w-12 md:w-24 bg-gradient-to-r from-white/20 to-white/5 origin-left"
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-20 flex justify-center"
                >
                    <div className="px-6 py-3 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">
                        Sé el primero en tu zona
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
