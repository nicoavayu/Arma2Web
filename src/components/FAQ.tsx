"use client";

import React, { useState } from "react";
import { Section } from "@/components/Section";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "¿Es gratis?",
        answer:
            "Sí, Armá2 es 100% gratuito para organizar partidos con amigos. En el futuro podríamos introducir funciones premium para ligas y torneos.",
    },
    {
        question: "¿Cómo funciona el balance de equipos?",
        answer:
            "Todos los jugadores del partido votan entre sí para evaluar el nivel de cada uno. Con esos votos se calcula un puntaje promedio por jugador y el sistema arma dos equipos lo más parejos posible.",
    },
    {
        question: "¿Puedo jugar si no tengo equipo?",
        answer:
            "¡Sí! El mercado de jugadores te permite postularte de forma individual para que otros capitanes vean tu ficha y te fichen para sus partidos.",
    },
    {
        question: "¿Cómo se eligen los capitanes?",
        answer:
            "Cualquiera puede crear un partido y convertirse en capitán, o un capitán existente puede delegar el rol a otro integrante del grupo.",
    },
    {
        question: "¿Qué pasa si alguien falta sin aviso?",
        answer:
            "La reputación es clave en Armá2. Si un jugador falta sin avisar, su índice de disciplina baja, lo que queda registrado en su ficha pública y afecta su prioridad para próximos partidos.",
    },
    {
        question: "¿Es solo para fútbol 5?",
        answer:
            "Está optimizado para fútbol 5, 6, 7, 8, 9 y 11, pero el sistema de balance democrático se adapta a cualquier formato competitivo.",
    },
    {
        question: "¿Qué tipo de premios y sanciones existen?",
        answer:
            "Al terminar cada partido, la comunidad premia desempeños destacados como 'Mejor arquero' o 'MVP del partido'. También existen sanciones como la tarjeta roja de 'Jugador más sucio' para quienes no mantengan la disciplina. Todo esto construye tu reputación histórica.",
    },
    {
        question: "¿Puedo usarlo sin descargar la app?",
        answer:
            "¡Claro! Podés unirte a un partido vía link y votar a los jugadores para armar equipos parejos, todo desde el navegador. La app ofrece una experiencia más completa para gestionar tus equipos.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <Section id="faq" className="bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">
                    Preguntas Frecuentes
                </h2>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-white/5 rounded-2xl bg-surface/30 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="text-lg font-medium text-white">
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
                                        <div className="p-6 pt-0 text-text-secondary leading-relaxed border-t border-white/5">
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
