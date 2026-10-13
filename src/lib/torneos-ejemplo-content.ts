import type { Locale } from "@/lib/i18n";

/**
 * Copy of the example tournament page (torneos.arma2.com.ar/ejemplo), ES/EN.
 * Kept apart from torneos-content.ts so the Torneos home doesn't ship it.
 */
const es = {
  seo: {
    title: "Torneo de ejemplo — Arma2 Torneos",
    description:
      "Mirá un torneo de ejemplo en Arma2 Torneos: tabla, goleadores, fixture y resultados de una liga con datos ficticios. Sin registrarte.",
  },
  badge: "Datos ficticios",
  name: "Copa Primavera 2026",
  meta: "Liga · 4 equipos · 9 fechas",
  lead: "Un torneo con datos ficticios para que veas qué publica Arma2 Torneos: tabla, goleadores, fixture y resultados, siempre al día. No hace falta registrarse.",
  sectionsLabel: "Secciones del torneo",
  sections: { standings: "Tabla", scorers: "Goleadores", fixture: "Fixture", results: "Resultados" },
  standings: {
    title: "Tabla de posiciones",
    caption: "Tabla de posiciones después de la fecha 7",
    columns: [
      ["Pos", "Posición"],
      ["Equipo", "Equipo"],
      ["PJ", "Partidos jugados"],
      ["PG", "Partidos ganados"],
      ["PE", "Partidos empatados"],
      ["PP", "Partidos perdidos"],
      ["GF", "Goles a favor"],
      ["GC", "Goles en contra"],
      ["DG", "Diferencia de gol"],
      ["Pts", "Puntos"],
    ],
    pending: "Un partido de la fecha 7 se reprogramó.",
    pendingLink: "Ver fixture",
  },
  scorers: { title: "Goleadores", goals: "goles" },
  fixture: { title: "Fixture", lead: "Lo que falta jugar. Todos los partidos se juegan en", round: "Fecha", pitch: "Cancha", venue: "Sede Norte", rescheduled: "Reprogramado", before: "antes era" },
  results: { title: "Resultados", round: "Fecha", pending: "Reprogramado" },
  cta: { title: "¿Querés el tuyo?", body: "Empezás en FREE, sin tarjeta.", start: "Empezar gratis", back: "Volver a Arma2 Torneos" },
};

/** Same shape as `es`. */
const en: typeof es = {
  seo: {
    title: "Example tournament — Arma2 Tournaments",
    description:
      "See an example tournament on Arma2 Tournaments: standings, top scorers, fixtures and results of a league with made-up data. No sign-up.",
  },
  badge: "Made-up data",
  name: "Copa Primavera 2026",
  meta: "League · 4 teams · 9 rounds",
  lead: "A tournament with made-up data so you can see what Arma2 Tournaments publishes: standings, top scorers, fixtures and results, always up to date. No sign-up needed.",
  sectionsLabel: "Tournament sections",
  sections: { standings: "Standings", scorers: "Top scorers", fixture: "Fixtures", results: "Results" },
  standings: {
    title: "Standings",
    caption: "Standings after round 7",
    columns: [
      ["#", "Position"],
      ["Team", "Team"],
      ["P", "Played"],
      ["W", "Won"],
      ["D", "Drawn"],
      ["L", "Lost"],
      ["GF", "Goals for"],
      ["GA", "Goals against"],
      ["GD", "Goal difference"],
      ["Pts", "Points"],
    ],
    pending: "A round 7 match was rescheduled.",
    pendingLink: "See fixtures",
  },
  scorers: { title: "Top scorers", goals: "goals" },
  fixture: { title: "Fixtures", lead: "What's left to play. Every match is at", round: "Round", pitch: "Pitch", venue: "the North venue", rescheduled: "Rescheduled", before: "was" },
  results: { title: "Results", round: "Round", pending: "Rescheduled" },
  cta: { title: "Want your own?", body: "You start on FREE, no card needed.", start: "Start for free", back: "Back to Arma2 Tournaments" },
};

export type TorneosEjemploContent = typeof es;

export const torneosEjemploContent: Record<Locale, TorneosEjemploContent> = { es, en };
