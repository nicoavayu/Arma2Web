"use client";

import React from "react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import {
  Calendar,
  Users,
  Scale,
  BellRing,
  ListChecks,
  Trophy,
  Shield,
  History,
} from "lucide-react";
import { motion } from "framer-motion";

const quickSteps = [
  {
    icon: <Calendar className="h-6 w-6 text-primary" />,
    title: "Creá el partido",
    description: "Definí fecha, hora y cancha. Compartís el link y el grupo se suma al toque.",
  },
  {
    icon: <Users className="h-6 w-6 text-accent-secondary" />,
    title: "Voten niveles",
    description: "Todos puntúan a todos. Sin decisiones unilaterales ni discusiones eternas.",
  },
  {
    icon: <Scale className="h-6 w-6 text-emerald-400" />,
    title: "Equipos parejos y a jugar",
    description: "Con la votación, Armá2 arma equipos balanceados para arrancar rápido.",
  },
] as const;

const postMatchSignals = [
  {
    icon: <Trophy className="h-5 w-5 text-yellow-400" />,
    title: "Premios y sanciones más justos",
    description: "El promedio de la encuesta define figuras y tarjetas con criterio colectivo.",
  },
  {
    icon: <Shield className="h-5 w-5 text-red-400" />,
    title: "Perfiles más confiables",
    description: "Cuanto más en serio vota la comunidad, más precisos son los perfiles.",
  },
  {
    icon: <History className="h-5 w-5 text-blue-400" />,
    title: "Historial útil de verdad",
    description: "Cada encuesta suma contexto al historial de rendimiento y conducta.",
  },
] as const;

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-surface/30">
      <div className="container mx-auto">
        <div className="mx-auto mb-10 max-w-3xl text-center [@media(max-width:430px)]:mb-8 md:mb-14">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
            Cómo funciona
          </span>
          <h2 className="mb-4 text-[clamp(1.9rem,8vw,3.15rem)] font-bold leading-tight text-white md:mb-5">
            En 30 segundos ya estás
            <span className="block text-primary-glow">organizando el partido.</span>
          </h2>
          <p className="text-sm leading-relaxed text-text-secondary sm:text-base md:text-lg">
            Armá2 ordena la previa y también el post partido. Menos fricción, más fútbol.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {quickSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <Card className="h-full border-white/10 bg-surface-highlight/20 p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between sm:mb-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                    Paso 0{index + 1}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white sm:text-xl">{step.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-7 rounded-2xl border border-white/10 bg-gradient-to-br from-surface-highlight/35 to-surface/20 p-5 [@media(max-width:430px)]:mt-6 sm:p-6 md:mt-10 md:p-8"
        >
          <div className="grid gap-6 lg:grid-cols-[1.06fr_1fr] lg:gap-8">
            <div>
              <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl">Qué pasa después del partido</h3>
              <p className="mb-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                La app te notifica que hay una encuesta post partido. Es breve: 5 preguntas. Si todos la contestan en
                serio, Armá2 promedia los votos del grupo y usa ese resultado para definir premios, sanciones y
                perfiles cada vez más representativos.
              </p>

              <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Notificación post partido</span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Encuesta de 5 preguntas</span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Promedio comunitario</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-xl border border-primary/25 bg-primary/10 p-3.5">
                  <div className="mb-2 flex items-center gap-2 text-primary-glow">
                    <BellRing className="h-4 w-4" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em]">Notificación</span>
                  </div>
                  <p className="text-sm font-semibold text-white">Ya podés completar la encuesta del partido</p>
                  <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                    Te toma menos de 1 minuto y mejora la calidad del ranking del grupo.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-3.5">
                  <div className="mb-2 flex items-center gap-2 text-white/80">
                    <ListChecks className="h-4 w-4 text-accent-secondary" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em]">Encuesta en curso</span>
                  </div>
                  <div className="mb-2 flex items-center justify-between text-xs text-text-secondary">
                    <span>Preguntas respondidas</span>
                    <span className="font-semibold text-white">3/5</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-primary to-accent-secondary" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:gap-3.5">
              {postMatchSignals.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.12 + index * 0.08 }}
                  className="rounded-xl border border-white/10 bg-black/20 p-3.5 sm:p-4"
                >
                  <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    {item.icon}
                  </div>
                  <h4 className="mb-1 text-sm font-semibold text-white sm:text-base">{item.title}</h4>
                  <p className="text-xs leading-relaxed text-text-secondary sm:text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
