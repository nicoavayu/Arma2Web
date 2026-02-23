"use client";

import React from "react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Calendar, Users, Scale, BarChart3, Swords, Shield, UserCheck, History, TrendingUp, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
    {
        icon: <Calendar className="w-6 h-6 text-primary" />,
        title: "Creá el partido",
        description: "Definí fecha, hora y lugar. Si ya tienen la app, es automático. Si no, link por WhatsApp.",
    },
    {
        icon: <Users className="w-6 h-6 text-accent" />,
        title: "Invitá amigos",
        description: "Compartí el link y listo. Se suman con un click, sin listas de espera ni vueltas.",
    },
    {
        icon: <Scale className="w-6 h-6 text-green-400" />,
        title: "Votación balanceada",
        description: "Equipos armados por votación democrática entre jugadores. Nada de algoritmos, solo presente.",
    },
    {
        icon: <BarChart3 className="w-6 h-6 text-orange-400" />,
        title: "Jugá y rankeá",
        description: "Tu ficha de arquero suma premios y prestigio. Mantené la disciplina con tarjetas virtuales.",
    },
    {
        icon: <Swords className="w-6 h-6 text-blue-400" />,
        title: "Desafiá equipos",
        description: "Encontrá rivales de tu nivel en el mercado y mandales un desafío directo. Ellos aceptan o no.",
    },
    {
        icon: <Shield className="w-6 h-6 text-violet-400" />,
        title: "Defendé tu escudo",
        description: "Tu equipo tiene identidad. Cada partido que jugás suma a la reputación de tu escudo.",
    },
    {
        icon: <UserCheck className="w-6 h-6 text-emerald-400" />,
        title: "Mejorá tu perfil",
        description: "Tus stats, premios y tarjetas quedan en tu perfil. Los rivales pueden ver con quién se miden.",
    },
    {
        icon: <History className="w-6 h-6 text-amber-400" />,
        title: "Construí historia",
        description: "Cada partido queda registrado: resultado, figura, tarjetas. Tu trayectoria habla por vos.",
    },
];

export function HowItWorks() {
    return (
        <Section id="how-it-works" className="bg-surface/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Menos organización, <br />
                        <span className="text-primary-glow">más fútbol.</span>
                    </h2>
                    <p className="text-text-secondary text-lg">
                        Olvidate del Excel y los mensajes interminables. Armá2 simplifica todo el proceso
                        para que solo te preocupes por jugar.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.07 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full group hover:bg-surface-highlight/80 transition-all border-white/5 p-6">
                                <div className="mb-6 p-3 rounded-xl bg-white/5 w-fit border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-text-secondary leading-relaxed text-sm">
                                    {step.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
