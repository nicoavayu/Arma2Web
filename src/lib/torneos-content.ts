import type { Locale } from "@/lib/i18n";
import type { ShotId } from "@/lib/shots";

/**
 * Copy for the Torneos portal (torneos.arma2.com.ar), ES/EN.
 *
 * COMMERCIAL MODEL (spec §6.1, approved 2026-10-12): every price, limit and
 * plan rule lives in `plans` and in the plan answers of `faq`. It is not yet
 * implemented in Armado_Equipos and payments are off: confirm these texts
 * against the integration PR before publishing (docs/torneos-landing-gaps.md).
 */

const es = {
  seo: {
    title: "Arma2 Torneos — Todo el torneo, sin hacer el mismo trabajo dos veces",
    description:
      "Fixture, resultados, tabla, disciplina, página pública y placas para redes de tu liga o torneo de fútbol amateur, desde un solo lugar. Empezá gratis.",
  },
  nav: {
    links: [
      { label: "Cómo funciona", href: "#torneos-como-funciona" },
      { label: "Gestión", href: "#torneos-gestion" },
      { label: "Página pública", href: "#torneos-pagina-publica" },
      { label: "Social Studio", href: "#torneos-social-studio" },
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
    body: "Armá equipos y fixture, cargá resultados, actualizá la tabla, compartí la página pública, creá placas y ordená las fotos de cada fecha desde un solo lugar.",
    start: "Empezar gratis",
    explore: "Ver cómo funciona",
    freeNote: "Empezás en FREE, sin tarjeta.",
    benefits: [
      ["Fixture", "Fechas, cruces y programación"],
      ["Resultados", "Acta y resultado oficial"],
      ["Tabla", "Se recalcula sola"],
      ["Página pública", "Un link para todos"],
      ["Social Studio", "Placas listas para redes"],
    ],
  },
  unaCarga: {
    title: "Cargás el resultado una vez. Todo lo demás se actualiza.",
    body: "La tabla, los goleadores, la página pública y la placa de resultados salen del mismo dato. No hay que copiar nada en otra planilla ni rearmar la imagen.",
    matchLabel: "Fecha 7 · Copa Primavera",
    load: "Cargar resultado",
    loaded: "Resultado cargado",
    reset: "Volver a empezar",
    panels: { table: "Tabla", scorers: "Goleadores", publicPage: "Página pública", plate: "Placa de resultados" },
    columns: { team: "Equipo", played: "PJ", points: "Pts" },
    publicUrl: "torneos.arma2.com.ar/copa-primavera",
    publicPending: "Esperando el resultado",
    updated: "Actualizada",
    live: "Tabla actualizada: {team} queda 1.º con {points} puntos.",
  },
  gestion: {
    title: "Todo lo que pasa en el torneo, en un solo gestor.",
    body: "Lo que ves acá son pantallas reales del gestor, con un torneo de ejemplo.",
    tabs: [
      {
        id: "fixture",
        label: "Fixture",
        shot: "torneos/fixture",
        points: [
          "Generás el fixture con fechas, cruces y fases: liga, grupos o eliminatorias.",
          "Programás día, hora, sede y cancha de cada partido.",
          "Cada versión publicada queda registrada en el historial de cambios.",
        ],
      },
      {
        id: "resultados",
        label: "Resultados",
        shot: "torneos/resultado",
        points: [
          "Cada partido tiene sus convocatorias, el acta y el resultado oficial.",
          "El acta registra lo que pasó; la revisión cierra el resultado oficial.",
          "Postergaciones e incidencias quedan en el historial del partido.",
        ],
      },
      {
        id: "tabla",
        label: "Tabla",
        shot: "torneos/tabla",
        points: [
          "La tabla se recalcula con cada resultado oficial: PJ, G, E, P, goles y diferencia.",
          "Tabla general y por fase o grupo.",
          "Estadísticas y clasificación del torneo.",
        ],
      },
      {
        id: "disciplina",
        label: "Disciplina",
        shot: "torneos/disciplina",
        points: [
          "Tarjetas y suspensiones por acumulación o por roja directa, con las fechas a cumplir.",
          "Puntos disciplinarios por jugador.",
          "Vos decidís qué parte de la disciplina se ve en la página pública.",
        ],
      },
    ],
    tabsLabel: "Secciones del gestor",
    team: "Owner y colaboradores con permisos según su rol.",
  },
  publica: {
    title: "Compartí el torneo. Todo en un solo link.",
    body: "Fixture, resultados, tabla, goleadores, equipos y disciplina siempre a mano, sin responder las mismas preguntas por WhatsApp.",
    noAccount: "Sin cuenta. Sin instalar nada.",
    urlLabel: "torneos.arma2.com.ar/copa-primavera-2026",
  },
  studio: {
    title: "Convertí cada fecha en contenido listo para publicar.",
    body: "Cargás los datos del torneo una vez y generás las placas para redes con los datos oficiales, sin rearmar cada imagen a mano.",
    posters: [
      { label: "Resultados", meta: "Base · 4:5", src: "/torneos/social-studio/base/round_results--portrait--default.webp" },
      { label: "Tabla", meta: "Base · 4:5", src: "/torneos/social-studio/base/standings--portrait--default.webp" },
      { label: "Goleadores", meta: "Base · 4:5", src: "/torneos/social-studio/base/scorers--portrait--default.webp" },
      { label: "Próxima fecha", meta: "Base · 4:5", src: "/torneos/social-studio/base/next_fixture--portrait--default.webp" },
    ],
    postersLabel: "Placas generadas con Social Studio",
    stylesLabel: "Estilos de placa",
    styles: ["Base", "Heritage", "Street", "Scoreboard", "Editorial"],
    freeTag: "FREE",
    premiumTag: "Premium",
    note: "11 tipos de placa en 4:5 y 9:16. FREE incluye Resultados, Tabla y Próxima fecha en estilo Base, con la firma de Arma2.",
  },
  media: {
    title: "Las fotos de cada fecha, ordenadas junto al partido.",
    body: "Dejá de buscar el material entre WhatsApp, Drive y celulares. Las fotos se guardan junto a la fecha y al torneo al que pertenecen.",
    round: "Fecha 7",
    galleryLabel: "Galería de la fecha",
    match: "Los Galácticos 3–1 Tiki-Taka",
    photos: ["Partido de la fecha 7", "Disputa de pelota", "Foto del equipo", "Acción de la fecha 7", "Arquero durante el partido", "Festejo del equipo"],
    exampleNote: "Fotos de ejemplo.",
  },
  plans: {
    title: "Empezá con FREE. Pasá a Premium cuando lo necesites.",
    lead: "El plan se elige por temporada, no por suscripción. Un solo Premium cubre todas las categorías y competencias de esa temporada.",
    free: {
      name: "FREE",
      price: "$0",
      priceDetail: "por temporada",
      lead: "Todo lo necesario para organizar y publicar tu temporada.",
      features: [
        "Equipos, planteles, fixture, programación, actas y resultados",
        "Tabla, goleadores, disciplina y estadísticas básicas",
        "Logo, portada, escudos, fotos y retratos",
        "Página pública y comunicados",
        "Placas Base de Resultados, Tabla y Próxima fecha, con firma Arma2",
        "Hasta 25 fotos por temporada",
        "Owner + 1 colaborador",
      ],
    },
    premium: {
      name: "PREMIUM",
      price: "ARS 20.000",
      priceDetail: "finales · pago único por temporada",
      lead: "Más placas, más estilos, más fotos y más colaboradores para toda la temporada.",
      features: [
        "Las 11 placas del torneo, en 4:5 y 9:16",
        "Estilos Heritage, Street, Scoreboard y Editorial",
        "Placas white-label, sin la firma de Arma2",
        "Hasta 100 fotos por temporada",
        "Owner + hasta 10 colaboradores",
      ],
    },
    includes: "Incluye",
    premiumAdds: "Todo lo de FREE, más",
    start: "Empezar gratis",
    choosePremium: "Elegir Premium",
    upgrade: "Activás Premium desde Plan, dentro de la temporada.",
    renewal: "Cada temporada dura hasta 6 meses. La siguiente vuelve a comenzar en FREE.",
    photosNotice: "Las fotos se eliminan al terminar la temporada. Antes te avisamos para que puedas descargarlas.",
    comparison: {
      caption: "Comparación entre FREE y Premium",
      scrollHint: "Deslizá la tabla para ver Premium →",
      plan: "Plan",
      included: "Incluido",
      rows: [
        ["Precio", "$0", "ARS 20.000 finales"],
        ["Modalidad", "Gratis", "Pago único por temporada"],
        ["Duración de la temporada", "Hasta 6 meses", "Hasta 6 meses"],
        ["Gestión completa del torneo", "✓", "✓"],
        ["Página pública", "✓", "✓"],
        ["Tipos de placa", "3", "11"],
        ["Formatos", "4:5 y 9:16", "4:5 y 9:16"],
        ["Estilos de placa", "Base", "Base, Heritage, Street, Scoreboard y Editorial"],
        ["Firma de Arma2 en las placas", "Obligatoria", "Opcional (white-label)"],
        ["Fotos por temporada", "25", "100"],
        ["Fotos al terminar la temporada", "Se eliminan, con aviso y descarga previa", "Se eliminan, con aviso y descarga previa"],
        ["Colaboradores", "Owner + 1", "Owner + 10"],
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
        question: "¿Cómo funciona Premium?",
        answer: "Premium cuesta ARS 20.000 finales y se paga una sola vez por temporada, sin suscripción. Cubre todas las categorías y competencias de esa temporada, que dura hasta 6 meses. La temporada siguiente vuelve a comenzar en FREE.",
      },
      {
        question: "¿Qué pasa con las fotos al terminar la temporada?",
        answer: "Se eliminan. Antes de que termine la temporada te avisamos para que puedas descargarlas. FREE guarda hasta 25 fotos por temporada y Premium hasta 100.",
      },
    ],
  },
  cierre: {
    title: "La próxima fecha puede estar ordenada.",
    body: "Creá el torneo, cargá los equipos y compartí el link. Empezás gratis.",
    start: "Empezar gratis",
    contact: "Hablar con nosotros",
    players: "¿Sos jugador? Arma2 para jugadores",
  },
  footer: {
    description: "Gestión de ligas y torneos de fútbol amateur: fixture, resultados, tabla, página pública y placas para redes.",
    product: "Arma2 Torneos",
    playersTitle: "Jugadores",
    playersBlurb: "Organizá partidos y armá equipos parejos votados por el grupo.",
    legal: "Legal",
    privacy: "Privacidad",
    terms: "Términos",
    contact: "Contacto",
    rights: "Todos los derechos reservados.",
  },
  demoNote: "Ejemplo con datos ficticios",
};

type TorneosCopy = typeof es;

/** Same shape as `es`; ShotId fields keep their literal type. */
const en: TorneosCopy = {
  seo: {
    title: "Arma2 Tournaments — Run the whole tournament without doing the same work twice",
    description:
      "Fixtures, results, standings, discipline, a public page and social posts for your amateur football league or tournament, in one place. Start for free.",
  },
  nav: {
    links: [
      { label: "How it works", href: "#torneos-como-funciona" },
      { label: "Management", href: "#torneos-gestion" },
      { label: "Public page", href: "#torneos-pagina-publica" },
      { label: "Social Studio", href: "#torneos-social-studio" },
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
    body: "Build teams and fixtures, enter results, keep the table current, share the public page, create social posts and organise every matchday's photos in one place.",
    start: "Start for free",
    explore: "See how it works",
    freeNote: "You start on FREE, no card needed.",
    benefits: [
      ["Fixtures", "Rounds, matchups and scheduling"],
      ["Results", "Match report and official result"],
      ["Standings", "Recalculated automatically"],
      ["Public page", "One link for everyone"],
      ["Social Studio", "Posts ready to publish"],
    ],
  },
  unaCarga: {
    title: "Enter the result once. Everything else updates.",
    body: "The standings, top scorers, public page and results post all come from the same data. Nothing to copy into another spreadsheet, no image to rebuild.",
    matchLabel: "Round 7 · Copa Primavera",
    load: "Enter result",
    loaded: "Result entered",
    reset: "Start over",
    panels: { table: "Standings", scorers: "Top scorers", publicPage: "Public page", plate: "Results post" },
    columns: { team: "Team", played: "P", points: "Pts" },
    publicUrl: "torneos.arma2.com.ar/copa-primavera",
    publicPending: "Waiting for the result",
    updated: "Updated",
    live: "Standings updated: {team} moves to 1st with {points} points.",
  },
  gestion: {
    title: "Everything that happens in the tournament, in one manager.",
    body: "These are real manager screens, with an example tournament.",
    tabs: [
      {
        id: "fixture",
        label: "Fixtures",
        shot: "torneos/fixture",
        points: [
          "Generate fixtures with rounds, matchups and phases: league, groups or knockout.",
          "Schedule day, time, venue and pitch for every match.",
          "Every published version is kept in the change history.",
        ],
      },
      {
        id: "resultados",
        label: "Results",
        shot: "torneos/resultado",
        points: [
          "Each match has its squad calls, the match report and the official result.",
          "The report records what happened; the review closes the official result.",
          "Postponements and incidents stay in the match history.",
        ],
      },
      {
        id: "tabla",
        label: "Standings",
        shot: "torneos/tabla",
        points: [
          "Standings recalculate with every official result: played, won, drawn, lost, goals and difference.",
          "Overall table and per phase or group.",
          "Tournament statistics and rankings.",
        ],
      },
      {
        id: "disciplina",
        label: "Discipline",
        shot: "torneos/disciplina",
        points: [
          "Cards and suspensions for accumulation or straight reds, with the matches to serve.",
          "Disciplinary points per player.",
          "You decide which discipline details show on the public page.",
        ],
      },
    ],
    tabsLabel: "Manager sections",
    team: "Owner and collaborators with role-based permissions.",
  },
  publica: {
    title: "Share the tournament. All in one link.",
    body: "Fixtures, results, standings, top scorers, teams and discipline always at hand — no more answering the same questions on WhatsApp.",
    noAccount: "No account. Nothing to install.",
    urlLabel: "torneos.arma2.com.ar/copa-primavera-2026",
  },
  studio: {
    title: "Turn every round into content ready to post.",
    body: "Enter the tournament data once and generate social posts from the official data, without rebuilding each image by hand.",
    posters: [
      { label: "Results", meta: "Base · 4:5", src: "/torneos/social-studio/base/round_results--portrait--default.webp" },
      { label: "Standings", meta: "Base · 4:5", src: "/torneos/social-studio/base/standings--portrait--default.webp" },
      { label: "Top scorers", meta: "Base · 4:5", src: "/torneos/social-studio/base/scorers--portrait--default.webp" },
      { label: "Next round", meta: "Base · 4:5", src: "/torneos/social-studio/base/next_fixture--portrait--default.webp" },
    ],
    postersLabel: "Posts generated with Social Studio",
    stylesLabel: "Post styles",
    styles: ["Base", "Heritage", "Street", "Scoreboard", "Editorial"],
    freeTag: "FREE",
    premiumTag: "Premium",
    note: "11 post types in 4:5 and 9:16. FREE includes Results, Standings and Next round in the Base style, signed by Arma2.",
  },
  media: {
    title: "Every round's photos, filed next to the match.",
    body: "Stop hunting for photos across WhatsApp, Drive and phones. They are stored with the round and tournament they belong to.",
    round: "Round 7",
    galleryLabel: "Round gallery",
    match: "Los Galácticos 3–1 Tiki-Taka",
    photos: ["Round 7 match", "Challenge for the ball", "Team photo", "Round 7 action", "Goalkeeper during the match", "Team celebration"],
    exampleNote: "Example photos.",
  },
  plans: {
    title: "Start on FREE. Move to Premium when you need it.",
    lead: "Plans are chosen per season, not as a subscription. One Premium covers every category and competition in that season.",
    free: {
      name: "FREE",
      price: "$0",
      priceDetail: "per season",
      lead: "Everything you need to run and publish your season.",
      features: [
        "Teams, squads, fixtures, scheduling, match reports and results",
        "Standings, top scorers, discipline and basic stats",
        "Logo, cover, crests, photos and portraits",
        "Public page and announcements",
        "Base posts for Results, Standings and Next round, signed by Arma2",
        "Up to 25 photos per season",
        "Owner + 1 collaborator",
      ],
    },
    premium: {
      name: "PREMIUM",
      price: "ARS 20,000",
      priceDetail: "final price · one-off payment per season",
      lead: "More posts, more styles, more photos and more collaborators for the whole season.",
      features: [
        "All 11 tournament posts, in 4:5 and 9:16",
        "Heritage, Street, Scoreboard and Editorial styles",
        "White-label posts, without the Arma2 signature",
        "Up to 100 photos per season",
        "Owner + up to 10 collaborators",
      ],
    },
    includes: "Includes",
    premiumAdds: "Everything in FREE, plus",
    start: "Start for free",
    choosePremium: "Choose Premium",
    upgrade: "You activate Premium from Plan, inside the season.",
    renewal: "Each season lasts up to 6 months. The next one starts again on FREE.",
    photosNotice: "Photos are deleted when the season ends. We let you know beforehand so you can download them.",
    comparison: {
      caption: "FREE and Premium compared",
      scrollHint: "Swipe the table to see Premium →",
      plan: "Plan",
      included: "Included",
      rows: [
        ["Price", "$0", "ARS 20,000 final"],
        ["Billing", "Free", "One-off payment per season"],
        ["Season length", "Up to 6 months", "Up to 6 months"],
        ["Full tournament management", "✓", "✓"],
        ["Public page", "✓", "✓"],
        ["Post types", "3", "11"],
        ["Formats", "4:5 and 9:16", "4:5 and 9:16"],
        ["Post styles", "Base", "Base, Heritage, Street, Scoreboard and Editorial"],
        ["Arma2 signature on posts", "Required", "Optional (white-label)"],
        ["Photos per season", "25", "100"],
        ["Photos when the season ends", "Deleted, with notice and download first", "Deleted, with notice and download first"],
        ["Collaborators", "Owner + 1", "Owner + 10"],
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
        question: "How does Premium work?",
        answer: "Premium costs ARS 20,000 (final price), paid once per season with no subscription. It covers every category and competition in that season, which lasts up to 6 months. The next season starts again on FREE.",
      },
      {
        question: "What happens to photos when the season ends?",
        answer: "They are deleted. Before the season ends we let you know so you can download them. FREE keeps up to 25 photos per season and Premium up to 100.",
      },
    ],
  },
  cierre: {
    title: "Your next round can be organised.",
    body: "Create the tournament, add the teams and share the link. You start for free.",
    start: "Start for free",
    contact: "Talk to us",
    players: "Are you a player? Arma2 for players",
  },
  footer: {
    description: "League and tournament management for amateur football: fixtures, results, standings, a public page and social posts.",
    product: "Arma2 Tournaments",
    playersTitle: "Players",
    playersBlurb: "Organise matches and build even teams voted by the group.",
    legal: "Legal",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    rights: "All rights reserved.",
  },
  demoNote: "Example with made-up data",
};

export type TorneosContent = TorneosCopy;
export type GestionTab = TorneosCopy["gestion"]["tabs"][number] & { shot: ShotId };

export const torneosContent: Record<Locale, TorneosContent> = { es, en };
