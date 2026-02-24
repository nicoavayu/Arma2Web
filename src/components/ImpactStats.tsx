"use client";

import React from "react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import {
  CalendarRange,
  ChartNoAxesColumn,
  HeartPulse,
  FolderKanban,
  History,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const statCards = [
  {
    icon: <ChartNoAxesColumn className="h-5 w-5 text-primary" />,
    title: "Actividad por período",
    description:
      "Seguí cuántos partidos jugaste en la semana, en el mes y en el año para medir constancia real.",
  },
  {
    icon: <HeartPulse className="h-5 w-5 text-red-400" />,
    title: "Registro de lesiones",
    description:
      "Podés cargar molestias o lesiones y dejar trazabilidad de tu estado físico durante la temporada.",
  },
  {
    icon: <FolderKanban className="h-5 w-5 text-accent-secondary" />,
    title: "Templates semanales",
    description:
      "Guardá equipos base para partidos recurrentes y armá cada fecha en menos tiempo.",
  },
  {
    icon: <History className="h-5 w-5 text-blue-400" />,
    title: "Historial de cada fecha",
    description:
      "Queda guardado cuándo se jugó, quiénes jugaron y cómo terminó el partido.",
  },
] as const;

const annualMetrics = [
  { label: "Semana", value: "2 partidos" },
  { label: "Mes", value: "9 partidos" },
  { label: "Año", value: "84 partidos" },
] as const;

export function ImpactStats() {
  return (
    <Section id="impact" className="border-t border-white/5 bg-[#07071280]">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center [@media(max-width:430px)]:mb-8 md:mb-14"
        >
          <span className="mb-4 block text-sm font-medium uppercase tracking-wider text-primary">
            Estadísticas y continuidad
          </span>
          <h2 className="mb-4 text-[clamp(2rem,8vw,3rem)] font-black tracking-tight text-white md:mb-5 md:text-6xl">
            Tu temporada queda registrada.
          </h2>
          <p className="mx-auto max-w-3xl text-sm font-medium leading-relaxed text-white/55 sm:text-base md:text-xl">
            Armá2 te deja ver tu evolución futbolística en el tiempo: volumen de partidos, lesiones, partidos
            recurrentes y balance anual completo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <Card className="border-white/10 bg-surface-highlight/20 p-5 sm:p-6 md:col-span-2">
            <div className="grid gap-5 md:grid-cols-[1.1fr_1fr] md:items-center">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
                  <CalendarRange className="h-3.5 w-3.5 text-primary" />
                  Balance de actividad
                </div>
                <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">Seguí tu ritmo semanal, mensual y anual</h3>
                <p className="text-sm leading-relaxed text-text-secondary md:text-base">
                  Todo se acumula automáticamente en tu historial para que a fin de año puedas ver cómo te fue
                  futbolísticamente con datos reales.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {annualMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-white/10 bg-black/20 p-3 text-center">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-white/45">{metric.label}</p>
                    <p className="text-sm font-bold text-white">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {statCards.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 + index * 0.06 }}
            >
              <Card className="h-full border-white/10 bg-surface-highlight/20 p-5 sm:p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center md:mt-10"
        >
          <div className="flex items-center gap-2 text-primary-glow">
            <Users className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Partidos recurrentes</span>
          </div>
          <p className="max-w-2xl text-sm text-text-secondary">
            Si jugás siempre con el mismo grupo, guardás el template del equipo y cada nueva fecha se suma al
            historial con fecha, jugadores y resultado.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
