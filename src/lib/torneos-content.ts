import type { Locale } from "@/lib/i18n";

/**
 * Copy for the Torneos portal (torneos.arma2.com.ar), ES/EN.
 *
 * COMMERCIAL MODEL (spec §6.1, approved 2026-10-12): every price, limit and
 * plan rule lives in `plans` and in the plan answers of `faq`. FREE is what the
 * product offers today. Premium can't be bought yet (payments are off), so it
 * is shown as "Próximamente" and its rules (season length, photo deletion) are
 * written as future. When payments go live, flip `premiumAvailable` and review
 * that copy against the product (docs/torneos-landing-gaps.md).
 */

/** Commercial model (spec §6.1). Copy below and the JSON-LD derive from it. */
export const COMMERCIAL = {
  /** Payments are off in Armado_Equipos: no purchase link, no Premium offer in the JSON-LD. */
  premiumAvailable: false,
  premiumPriceArs: 20000,
  seasonMonths: 6,
  photosFree: 25,
  photosPremium: 100,
  collaboratorsFree: 1,
  collaboratorsPremium: 10,
} as const;

const PRICE_ES = new Intl.NumberFormat("es-AR").format(COMMERCIAL.premiumPriceArs);
const PRICE_EN = new Intl.NumberFormat("en-US").format(COMMERCIAL.premiumPriceArs);
const C = COMMERCIAL;

const es = {
  seo: {
    title: "Arma2 Torneos — Todo el torneo, sin hacer el mismo trabajo dos veces",
    description:
      "Fixture, resultados, tabla, disciplina, página pública y placas para redes de tu liga o torneo de fútbol amateur, desde un solo lugar. Empezá gratis.",
  },
  nav: {
    links: [
      { label: "Cómo funciona", href: "#capitulo-cargas" },
      { label: "Funciones", href: "#torneos-funciones" },
      { label: "Planes", href: "#torneos-planes" },
      { label: "Preguntas", href: "#torneos-faq" },
    ],
    home: "Arma2 Torneos, inicio",
    enter: "Entrar",
    enterAria: "Entrar al gestor de Arma2 Torneos",
    open: "Abrir menú",
    close: "Cerrar menú",
  },
  hero: {
    title: ["Todo el torneo.", "Mucho menos trabajo."],
    body: "Fixture, resultados, tabla, página pública y placas para redes en un mismo lugar. Cargás el resultado una vez y se actualiza todo.",
    start: "Empezar gratis",
    explore: "Ver cómo funciona",
    freeNote: "Empezás en FREE, sin tarjeta.",
    example: "Ver un torneo de ejemplo",
  },
  story: {
    navLabel: "Capítulos de cómo funciona",
    chapters: [
      { id: "cargas", step: "Cargás", title: "Cargás el resultado.", accent: "Una sola vez.", text: "Marcador, goles y quién los hizo. Nada más." },
      { id: "se-actualiza", step: "Se actualiza", title: "La tabla se ordena sola.", accent: "", text: "Puntos, diferencia de gol y goleadores se recalculan al instante. Nada de planillas." },
      {
        id: "se-publica",
        step: "Se publica",
        title: "Todos lo ven",
        accent: "al toque.",
        text: "La página pública del torneo se actualiza sola. Jugadores y familias la abren desde un link, sin descargar nada.",
      },
      {
        id: "se-comparte",
        step: "Se comparte",
        title: "Y la placa para redes, lista.",
        accent: "",
        text: "Social Studio arma las placas de resultado y tabla de posiciones con los datos del torneo. Las descargás y las subís.",
      },
    ],
    dashboard: {
      nav: ["Resumen", "Fixture", "Resultados", "Tabla", "Disciplina", "Página pública", "Social Studio", "Multimedia"],
      crumb: "Copa Primavera 2026 · Fecha 7",
      title: "Cargar resultado",
      live: "En curso",
      match: "Partido",
      matchMeta: "Sáb 20:00 · Cancha 2",
      standings: "Tabla de posiciones",
      team: "Equipo",
      played: "PJ",
      points: "Pts",
      scorers: "Goleadores",
      status: ["Tabla y goleadores", "Página pública", "Placa de resultado"],
      save: "Guardar resultado",
      saved: "Resultado guardado",
      toast: "Tabla, goleadores y página pública actualizados",
    },
    publicPage: {
      kind: "Torneo · Liga",
      lastResult: "Último resultado · Fecha 7",
      standings: "Tabla",
      scorers: "Goleadores",
      url: "app.arma2.com.ar/torneos/publico/copa-primavera-2026",
    },
    posters: {
      results: "Resultado",
      standings: "Tabla de posiciones",
      round: "Fecha 7",
    },
    linkChip: "Link público · se abre sin app",
  },
  gallery: {
    eyebrow: "Todo lo demás",
    title: "El torneo entero,",
    accent: "en orden.",
    cards: [
      { id: "inscripcion", label: "Inscripción por capitán", title: "Los capitanes anotan a sus equipos. Vos aprobás o pedís cambios." },
      { id: "fixture", label: "Fixture", title: "Liga, grupos o eliminatorias, con día, hora, sede y cancha." },
      { id: "reprogramacion", label: "Reprogramación", title: "Si movés un partido, los jugadores con cuenta ven el aviso en la app." },
      { id: "disciplina", label: "Disciplina", title: "Tarjetas y suspensiones al día, sin cuadernos." },
      { id: "multimedia", label: "Multimedia", title: "Las fotos de cada fecha, junto al partido." },
      { id: "colaboradores", label: "Colaboradores", title: "Sumá a quien te da una mano con la carga." },
    ],
    art: {
      round: "Fecha 8",
      roundMeta: "Sáb 17 · Sede Norte",
      league: "Liga",
      knockout: "Cuartos de final",
      knockoutMeta: "Eliminatoria",
      knockoutTag: "Playoff",
      fixtures: [
        { teams: "Los Galácticos vs El Tanque", meta: "18:00 · Cancha 1" },
        { teams: "Tiki-Taka vs Deportivo Tapita", meta: "19:00 · Cancha 2" },
      ],
      discipline: [
        { player: "Rodri", meta: "Los Galácticos · 2 amarillas", card: "yellow", tag: "" },
        { player: "Tomi", meta: "El Tanque · roja directa", card: "red", tag: "1 fecha" },
        { player: "Juani", meta: "Tiki-Taka · 1 amarilla", card: "yellow", tag: "" },
      ],
      photos: "Fotos de la temporada",
      photosTag: `Hasta ${C.photosFree} por temporada`,
      collaborators: "Colaboradores",
      collaboratorsTag: `Organizador + ${C.collaboratorsFree} colaborador`,
      registration: {
        title: "Solicitudes de inscripción",
        source: "Desde «Explorar torneos»",
        requests: [
          { team: "Tiki-Taka", meta: "Juani · 12 jugadores", tag: "Solicitud enviada" },
          { team: "El Tanque", meta: "Tomi · 10 jugadores", tag: "Cambios pedidos" },
        ],
        actions: ["Aprobar", "Pedir cambios", "Rechazar"],
      },
      reschedule: { inbox: "Avisos", title: "Partido reprogramado", before: "Antes", now: "Ahora" },
    },
  },
  plans: {
    title: "Empezá en FREE. Premium llega próximamente.",
    lead: "FREE ya tiene todo para organizar y publicar tu temporada. Premium todavía no se puede comprar: te contamos cómo va a funcionar.",
    free: {
      name: "FREE",
      tag: "Disponible hoy",
      price: "$0",
      priceDetail: "sin tarjeta",
      lead: "Todo lo necesario para organizar y publicar tu temporada.",
      features: [
        "Equipos, planteles, fixture, programación, actas y resultados",
        "Inscripción de equipos por capitán",
        "Tabla, goleadores, disciplina y estadísticas básicas",
        "Logo, portada, escudos, fotos y retratos",
        "Página pública y comunicados",
        "Placas Base de Resultados, Tabla y Próxima fecha, con firma Arma2",
        `Hasta ${C.photosFree} fotos por temporada`,
        `Organizador + ${C.collaboratorsFree} colaborador`,
      ],
    },
    premium: {
      name: "PREMIUM",
      tag: "Próximamente",
      priceLabel: "Precio de lanzamiento",
      price: `ARS ${PRICE_ES}`,
      priceDetail: "finales por temporada",
      season: [
        `Un solo pago cubre todas las categorías de la temporada, que dura hasta ${C.seasonMonths} meses desde que la activás.`,
        "Sin renovación automática. Si pasás a Premium con la temporada empezada, la fecha de cierre no cambia.",
      ],
      features: [
        "Las 11 placas del torneo, en 4:5 y 9:16",
        "Estilos Heritage, Street, Scoreboard y Editorial",
        "Placas sin marca Arma2",
        `Hasta ${C.photosPremium} fotos por temporada`,
        `Organizador + hasta ${C.collaboratorsPremium} colaboradores`,
      ],
    },
    includes: "Incluye",
    premiumAdds: "Todo lo de FREE, más",
    start: "Empezar gratis",
    choosePremium: "Elegir Premium",
    comingSoon: "Próximamente",
    comingSoonNote: "Todavía no se puede comprar. Mientras tanto, organizá tu temporada en FREE.",
    photosNotice: "Próximamente también: al cerrar cada temporada, las fotos se van a eliminar. Antes te vamos a avisar para que puedas descargarlas.",
    comparison: {
      toggle: "Ver comparación completa",
      caption: "Comparación entre FREE y Premium",
      scrollHint: "Deslizá la tabla para ver Premium →",
      plan: "Plan",
      included: "Incluido",
      rows: [
        ["Disponibilidad", "Disponible hoy", "Próximamente"],
        ["Precio", "$0", `Lanzamiento: ARS ${PRICE_ES} finales por temporada`],
        ["Modalidad", "Gratis", "Pago único por temporada, sin renovación automática"],
        ["Gestión completa del torneo", "✓", "✓"],
        ["Inscripción por capitán", "✓", "✓"],
        ["Página pública", "✓", "✓"],
        ["Tipos de placa", "3", "11"],
        ["Formatos", "4:5 y 9:16", "4:5 y 9:16"],
        ["Estilos de placa", "Base", "Base, Heritage, Street, Scoreboard y Editorial"],
        ["Firma de Arma2 en las placas", "Siempre", "Opcional: placas sin marca Arma2"],
        ["Fotos por temporada", String(C.photosFree), String(C.photosPremium)],
        ["Colaboradores", `Organizador + ${C.collaboratorsFree}`, `Organizador + ${C.collaboratorsPremium}`],
      ],
    },
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        question: "¿Necesito instalar una app?",
        answer: "No. La web es la experiencia completa para administrar el torneo; Arma2 en el celular es opcional. Para ver la página pública tampoco hace falta instalar nada.",
      },
      { question: "¿Los jugadores tienen que pagar?", answer: "No. Los jugadores y el público siguen el torneo gratis." },
      {
        question: "¿Puedo compartir el torneo públicamente?",
        answer: "Sí. Compartís un link con fixture, resultados, tabla, goleadores, equipos y la disciplina que decidas hacer pública. Nadie necesita cuenta.",
      },
      {
        question: "¿Puedo administrar varios torneos?",
        answer: "Sí. Una temporada puede tener varias categorías y competencias, y podés crear todas las temporadas FREE que necesites.",
      },
      {
        question: "¿Cómo se inscriben los equipos?",
        answer:
          "Publicás la convocatoria del torneo. Cada capitán la encuentra en «Explorar torneos», arma su equipo y su plantel, y envía la solicitud. Vos la revisás en «Solicitudes de inscripción»: la aprobás, pedís cambios (con el motivo) o la rechazás. Si pedís cambios, el capitán corrige y la vuelve a enviar.",
      },
      {
        question: "¿Qué pasa si tengo que reprogramar un partido?",
        answer:
          "Lo cambiás desde «Programación». Los jugadores con cuenta del plantel aprobado y los capitanes y delegados de los dos equipos reciben un aviso en la app con el horario de antes y el de ahora, y el partido queda marcado como reprogramado. Lo mismo si lo postergás. Los avisos llegan solo dentro de la app: no se envían emails ni notificaciones push.",
      },
      {
        question: "¿Cómo funciona Premium?",
        answer: `Premium todavía no se puede comprar: los pagos no están habilitados. Precio de lanzamiento: ARS ${PRICE_ES} finales por temporada, en un solo pago y sin renovación automática. Va a cubrir todas las categorías de la temporada, que va a durar hasta ${C.seasonMonths} meses desde que la activás. Mientras tanto, podés organizar todo en FREE.`,
      },
      {
        question: "¿Qué pasa con las fotos al terminar la temporada?",
        answer: `Hoy FREE guarda hasta ${C.photosFree} fotos por temporada. Próximamente, al cerrar cada temporada las fotos se van a eliminar: antes te vamos a avisar para que puedas descargarlas. Premium, cuando esté disponible, va a guardar hasta ${C.photosPremium}.`,
      },
    ],
  },
  cierre: {
    title: "Armá tu torneo hoy.",
    body: "Empezás en FREE, sin tarjeta.",
    start: "Empezar gratis",
    contact: "Hablar con nosotros",
    example: "Ver un torneo de ejemplo",
    players: "¿Sos jugador? Arma2 para jugadores",
  },
  footer: {
    description: "Gestión de ligas y torneos de fútbol amateur: fixture, resultados, tabla, página pública y placas para redes.",
    product: "Arma2 Torneos",
    example: "Torneo de ejemplo",
    playersTitle: "Jugadores",
    playersBlurb: "Organizá partidos y armá equipos parejos votados por el grupo.",
    legal: "Legal",
    privacy: "Privacidad",
    terms: "Términos",
    contact: "Contacto",
    rights: "Todos los derechos reservados.",
  },
  demoNote: "Ejemplo con datos ficticios",
  ejemplo: {
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
  },
};

type TorneosCopy = typeof es;

/** Same shape as `es`. */
const en: TorneosCopy = {
  seo: {
    title: "Arma2 Tournaments — Run the whole tournament without doing the same work twice",
    description:
      "Fixtures, results, standings, discipline, a public page and social posts for your amateur football league or tournament, in one place. Start for free.",
  },
  nav: {
    links: [
      { label: "How it works", href: "#capitulo-cargas" },
      { label: "Features", href: "#torneos-funciones" },
      { label: "Plans", href: "#torneos-planes" },
      { label: "Questions", href: "#torneos-faq" },
    ],
    home: "Arma2 Tournaments, home",
    enter: "Log in",
    enterAria: "Log in to the Arma2 Tournaments manager",
    open: "Open menu",
    close: "Close menu",
  },
  hero: {
    title: ["The whole tournament.", "Much less work."],
    body: "Fixtures, results, standings, a public page and social posts in one place. Enter the result once and everything updates.",
    start: "Start for free",
    explore: "See how it works",
    freeNote: "You start on FREE, no card needed.",
    example: "See an example tournament",
  },
  story: {
    navLabel: "How it works, chapter by chapter",
    chapters: [
      { id: "cargas", step: "Enter", title: "Enter the result.", accent: "Just once.", text: "Score, goals and who scored them. That's it." },
      { id: "se-actualiza", step: "Updates", title: "The table sorts itself.", accent: "", text: "Points, goal difference and top scorers recalculate instantly. No spreadsheets." },
      {
        id: "se-publica",
        step: "Goes public",
        title: "Everyone sees it",
        accent: "right away.",
        text: "The tournament's public page updates itself. Players and families open it from a link, no download needed.",
      },
      {
        id: "se-comparte",
        step: "Gets shared",
        title: "And the social post is ready.",
        accent: "",
        text: "Social Studio builds results and standings posts from the tournament data. Download them and post them.",
      },
    ],
    dashboard: {
      nav: ["Overview", "Fixtures", "Results", "Standings", "Discipline", "Public page", "Social Studio", "Media"],
      crumb: "Copa Primavera 2026 · Round 7",
      title: "Enter result",
      live: "Live",
      match: "Match",
      matchMeta: "Sat 8:00 pm · Pitch 2",
      standings: "Standings",
      team: "Team",
      played: "P",
      points: "Pts",
      scorers: "Top scorers",
      status: ["Standings and top scorers", "Public page", "Results post"],
      save: "Save result",
      saved: "Result saved",
      toast: "Standings, top scorers and public page updated",
    },
    publicPage: {
      kind: "Tournament · League",
      lastResult: "Latest result · Round 7",
      standings: "Standings",
      scorers: "Top scorers",
      url: "app.arma2.com.ar/torneos/publico/copa-primavera-2026",
    },
    posters: {
      results: "Result",
      standings: "Standings",
      round: "Round 7",
    },
    linkChip: "Public link · opens without the app",
  },
  gallery: {
    eyebrow: "Everything else",
    title: "The whole tournament,",
    accent: "in order.",
    cards: [
      { id: "inscripcion", label: "Registration by captains", title: "Captains sign up their teams. You approve or ask for changes." },
      { id: "fixture", label: "Fixtures", title: "League, groups or knockout, with day, time, venue and pitch." },
      { id: "reprogramacion", label: "Rescheduling", title: "Move a match and players with an account see the notice in the app." },
      { id: "disciplina", label: "Discipline", title: "Cards and suspensions up to date, no notebooks." },
      { id: "multimedia", label: "Media", title: "Every round's photos, next to the match." },
      { id: "colaboradores", label: "Collaborators", title: "Bring in whoever helps you enter results." },
    ],
    art: {
      round: "Round 8",
      roundMeta: "Sat 17 · North venue",
      league: "League",
      knockout: "Quarter-finals",
      knockoutMeta: "Knockout",
      knockoutTag: "Playoff",
      fixtures: [
        { teams: "Los Galácticos vs El Tanque", meta: "6:00 pm · Pitch 1" },
        { teams: "Tiki-Taka vs Deportivo Tapita", meta: "7:00 pm · Pitch 2" },
      ],
      discipline: [
        { player: "Rodri", meta: "Los Galácticos · 2 yellows", card: "yellow", tag: "" },
        { player: "Tomi", meta: "El Tanque · straight red", card: "red", tag: "1 round" },
        { player: "Juani", meta: "Tiki-Taka · 1 yellow", card: "yellow", tag: "" },
      ],
      photos: "Season photos",
      photosTag: `Up to ${C.photosFree} per season`,
      collaborators: "Collaborators",
      collaboratorsTag: `Organiser + ${C.collaboratorsFree} collaborator`,
      registration: {
        title: "Registration requests",
        source: "From “Explore tournaments”",
        requests: [
          { team: "Tiki-Taka", meta: "Juani · 12 players", tag: "Request sent" },
          { team: "El Tanque", meta: "Tomi · 10 players", tag: "Changes requested" },
        ],
        actions: ["Approve", "Ask for changes", "Reject"],
      },
      reschedule: { inbox: "Notices", title: "Match rescheduled", before: "Before", now: "Now" },
    },
  },
  plans: {
    title: "Start on FREE. Premium is coming soon.",
    lead: "FREE already has everything to run and publish your season. Premium can't be bought yet: here's how it will work.",
    free: {
      name: "FREE",
      tag: "Available today",
      price: "$0",
      priceDetail: "no card needed",
      lead: "Everything you need to run and publish your season.",
      features: [
        "Teams, squads, fixtures, scheduling, match reports and results",
        "Team registration by captains",
        "Standings, top scorers, discipline and basic stats",
        "Logo, cover, crests, photos and portraits",
        "Public page and announcements",
        "Base posts for Results, Standings and Next round, signed by Arma2",
        `Up to ${C.photosFree} photos per season`,
        `Organiser + ${C.collaboratorsFree} collaborator`,
      ],
    },
    premium: {
      name: "PREMIUM",
      tag: "Coming soon",
      priceLabel: "Launch price",
      price: `ARS ${PRICE_EN}`,
      priceDetail: "final price per season",
      season: [
        `One payment covers every category in the season, which lasts up to ${C.seasonMonths} months from when you activate it.`,
        "No automatic renewal. If you move to Premium mid-season, the closing date stays the same.",
      ],
      features: [
        "All 11 tournament posts, in 4:5 and 9:16",
        "Heritage, Street, Scoreboard and Editorial styles",
        "Posts without Arma2 branding",
        `Up to ${C.photosPremium} photos per season`,
        `Organiser + up to ${C.collaboratorsPremium} collaborators`,
      ],
    },
    includes: "Includes",
    premiumAdds: "Everything in FREE, plus",
    start: "Start for free",
    choosePremium: "Choose Premium",
    comingSoon: "Coming soon",
    comingSoonNote: "It can't be bought yet. In the meantime, run your season on FREE.",
    photosNotice: "Also coming: when each season closes, its photos will be deleted. We'll let you know beforehand so you can download them.",
    comparison: {
      toggle: "See full comparison",
      caption: "FREE and Premium compared",
      scrollHint: "Swipe the table to see Premium →",
      plan: "Plan",
      included: "Included",
      rows: [
        ["Availability", "Available today", "Coming soon"],
        ["Price", "$0", `Launch: ARS ${PRICE_EN} final per season`],
        ["Billing", "Free", "One-off payment per season, no automatic renewal"],
        ["Full tournament management", "✓", "✓"],
        ["Registration by captains", "✓", "✓"],
        ["Public page", "✓", "✓"],
        ["Post types", "3", "11"],
        ["Formats", "4:5 and 9:16", "4:5 and 9:16"],
        ["Post styles", "Base", "Base, Heritage, Street, Scoreboard and Editorial"],
        ["Arma2 signature on posts", "Always", "Optional: posts without Arma2 branding"],
        ["Photos per season", String(C.photosFree), String(C.photosPremium)],
        ["Collaborators", `Organiser + ${C.collaboratorsFree}`, `Organiser + ${C.collaboratorsPremium}`],
      ],
    },
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "Do I need to install an app?",
        answer: "No. The web is the full experience for running the tournament; Arma2 on your phone is optional. Viewing the public page needs no install either.",
      },
      { question: "Do players have to pay?", answer: "No. Players and fans follow the tournament for free." },
      {
        question: "Can I share the tournament publicly?",
        answer: "Yes. You share a link with fixtures, results, standings, top scorers, teams and whatever discipline you choose to make public. Nobody needs an account.",
      },
      {
        question: "Can I run several tournaments?",
        answer: "Yes. A season can hold several categories and competitions, and you can create as many FREE seasons as you need.",
      },
      {
        question: "How do teams sign up?",
        answer:
          "You publish the tournament's call for teams. Each captain finds it in “Explore tournaments”, builds the team and squad, and sends the request. You review it in “Registration requests”: approve it, ask for changes (with a reason) or reject it. If you ask for changes, the captain fixes it and sends it again.",
      },
      {
        question: "What if I need to reschedule a match?",
        answer:
          "Change it from “Scheduling”. Players with an account on the approved squads, plus the captains and delegates of both teams, get an in-app notice with the old and the new time, and the match is marked as rescheduled. The same goes if you postpone it. Notices are in-app only: no emails or push notifications.",
      },
      {
        question: "How does Premium work?",
        answer: `Premium can't be bought yet: payments aren't enabled. Launch price: ARS ${PRICE_EN} (final) per season, in a single payment with no automatic renewal. It will cover every category in the season, which will last up to ${C.seasonMonths} months from when you activate it. In the meantime, you can run everything on FREE.`,
      },
      {
        question: "What happens to photos when the season ends?",
        answer: `Today FREE keeps up to ${C.photosFree} photos per season. Coming soon: when each season closes, its photos will be deleted, and we'll let you know beforehand so you can download them. Premium, once available, will keep up to ${C.photosPremium}.`,
      },
    ],
  },
  cierre: {
    title: "Set up your tournament today.",
    body: "You start on FREE, no card needed.",
    start: "Start for free",
    contact: "Talk to us",
    example: "See an example tournament",
    players: "Are you a player? Arma2 for players",
  },
  footer: {
    description: "League and tournament management for amateur football: fixtures, results, standings, a public page and social posts.",
    product: "Arma2 Tournaments",
    example: "Example tournament",
    playersTitle: "Players",
    playersBlurb: "Organise matches and build even teams voted by the group.",
    legal: "Legal",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    rights: "All rights reserved.",
  },
  demoNote: "Example with made-up data",
  ejemplo: {
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
  },
};

export type TorneosContent = TorneosCopy;

export const torneosContent: Record<Locale, TorneosContent> = { es, en };
