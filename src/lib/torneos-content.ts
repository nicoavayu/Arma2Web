/**
 * Copy for the Arma2 Torneos marketing landing (/torneos).
 *
 * Kept out of `src/lib/i18n.ts` on purpose: that dictionary serves the
 * institutional homepage and is already large. This module reuses the same
 * `Locale` type and the same LanguageProvider, so the navbar ES/EN toggle
 * drives this page too.
 *
 * COPY RULES:
 * - Marketing page only. Pricing is informative and checkout stays in the
 *   authenticated Torneos product.
 * - Do not promise future features as generally available.
 * - Public tournament pages are shareable without an account or the app; public
 *   PHOTOS are deliberately NOT promised here.
 */

import type { Locale } from "@/lib/i18n";

interface TitlePair {
  lineOne: string;
  highlight: string;
}

interface TitledItem {
  title: string;
  description: string;
}

export interface TorneosContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: TitlePair;
    description: string;
    audienceNote: string;
    ctaPrimary: string;
    ctaSecondary: string;
    bullets: string[];
    panel: {
      ariaLabel: string;
      tournamentName: string;
      formatLabel: string;
      roundLabel: string;
      statusLabel: string;
      standingsTitle: string;
      pointsLabel: string;
      rows: { initials: string; name: string; played: string; points: string }[];
      nextMatchLabel: string;
      nextMatchDetail: string;
    };
  };
  problem: {
    eyebrow: string;
    title: TitlePair;
    description: string;
    chaosTitle: string;
    chaos: string[];
    orderTitle: string;
    order: TitledItem[];
  };
  management: {
    eyebrow: string;
    title: TitlePair;
    description: string;
    modules: TitledItem[];
    board: {
      ariaLabel: string;
      tabs: string[];
      fixtureTitle: string;
      roundLabel: string;
      matches: { home: string; away: string; score: string | null; time: string }[];
      pendingLabel: string;
      loadResultLabel: string;
      standingsTitle: string;
      columns: { team: string; played: string; goalDiff: string; points: string };
      standings: { initials: string; name: string; played: string; goalDiff: string; points: string }[];
      scorersTitle: string;
      scorers: { name: string; team: string; goals: string }[];
      disciplineTitle: string;
      discipline: { label: string; detail: string }[];
    };
  };
  publicPage: {
    eyebrow: string;
    title: TitlePair;
    description: string;
    noAccountNote: string;
    items: TitledItem[];
    mock: {
      ariaLabel: string;
      shareLabel: string;
      copyLabel: string;
      tabs: string[];
      resultsTitle: string;
      results: { home: string; away: string; score: string }[];
      scorersTitle: string;
      scorers: { name: string; goals: string }[];
      footnote: string;
    };
  };
  players: {
    eyebrow: string;
    title: TitlePair;
    description: string;
    platforms: string[];
    points: TitledItem[];
    note: string;
  };
  socialStudio: {
    eyebrow: string;
    title: TitlePair;
    description: string;
    pieces: string[];
    previews: { label: string; caption: string }[];
    note: string;
  };
  media: {
    eyebrow: string;
    title: TitlePair;
    description: string;
    points: TitledItem[];
    galleryLabel: string;
    galleryCaption: string;
    note: string;
  };
  plans: {
    eyebrow: string;
    title: TitlePair;
    description: string;
    free: PlanCopy;
    premium: PlanCopy;
    footnote: string;
  };
  platforms: {
    eyebrow: string;
    title: TitlePair;
    description: string;
    cards: TitledItem[];
    note: string;
  };
  finalCta: {
    title: TitlePair;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    disclaimer: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { question: string; answer: string }[];
  };
}

interface PlanCopy {
  name: string;
  badge: string | null;
  tagline: string;
  description: string;
  price: string;
  priceDetail: string;
  regularPriceLabel: string | null;
  regularPrice: string | null;
  features: string[];
  upcomingLabel: string | null;
  upcoming: string[];
  cta: string;
}

const es: TorneosContent = {
  seo: {
    title: "Arma2 Torneos — Todo el torneo, sin hacer el mismo trabajo dos veces.",
    description:
      "Armá equipos y fixture, cargá resultados, compartí la página pública y ordená las fotos de tu torneo desde un solo lugar. Empezá gratis.",
  },
  hero: {
    eyebrow: "Arma2 Torneos",
    title: {
      lineOne: "Todo tu torneo.",
      highlight: "En un solo lugar.",
    },
    description:
      "Organizá todo el torneo en un solo lugar: equipos, fixture, resultados, tabla, comunicación y una página pública para tu competencia.",
    audienceNote: "Para ligas, complejos, clubes y organizadores de campeonatos amateur.",
    ctaPrimary: "Empezar gratis",
    ctaSecondary: "Ver cómo funciona",
    bullets: ["Fixture y fechas", "Tabla automática", "Estadísticas y goleadores", "Página pública"],
    panel: {
      ariaLabel:
        "Vista del torneo en Arma2: encabezado con el nombre del campeonato y la fecha en curso, tabla de posiciones con los primeros equipos y el próximo partido programado.",
      tournamentName: "Copa Primavera",
      formatLabel: "F7 · 12 equipos",
      roundLabel: "Fecha 7 de 12",
      statusLabel: "En curso",
      standingsTitle: "Tabla de posiciones",
      pointsLabel: "PTS",
      rows: [
        { initials: "LG", name: "Los Galácticos", played: "7 PJ", points: "17" },
        { initials: "DT", name: "Deportivo Tapita", played: "7 PJ", points: "15" },
        { initials: "ET", name: "El Tanque", played: "7 PJ", points: "12" },
      ],
      nextMatchLabel: "Próximo partido",
      nextMatchDetail: "Sáb 20:00 · Los Galácticos vs El Tanque",
    },
  },
  problem: {
    eyebrow: "El día a día del organizador",
    title: {
      lineOne: "Organizar un torneo",
      highlight: "no debería ser esto.",
    },
    description:
      "Los resultados llegan por WhatsApp, la tabla se rehace a mano y cada consulta de un equipo termina en un mensaje más para responder.",
    chaosTitle: "Cómo se lleva hoy",
    chaos: [
      "Resultados sueltos en WhatsApp",
      "Planillas de Excel que quedan desactualizadas",
      "Tabla rehecha a mano cada fecha",
      "Fixture en fotos de papel",
      "Goleadores anotados aparte",
      "Publicaciones armadas una por una",
    ],
    orderTitle: "Con Arma2 Torneos",
    order: [
      {
        title: "Cargás el resultado una vez",
        description: "La tabla, las estadísticas y los goleadores se actualizan a partir de ese dato.",
      },
      {
        title: "Todo en un mismo lugar",
        description:
          "Equipos, planteles, fechas, partidos y sanciones dejan de estar repartidos en cinco archivos distintos.",
      },
      {
        title: "Un link para compartir",
        description:
          "Los equipos consultan el torneo cuando quieren, sin escribirte para preguntar cómo salió la fecha.",
      },
    ],
  },
  management: {
    eyebrow: "Gestión completa",
    title: {
      lineOne: "Del plantel a la tabla,",
      highlight: "sin salir de Arma2.",
    },
    description:
      "Cada parte de la competencia en un mismo lugar, y conectada con la anterior: lo que cargás en el partido se refleja en la tabla, en las estadísticas y en la página pública.",
    modules: [
      { title: "Equipos y planteles", description: "Cargá los equipos del torneo y armá el plantel de cada uno." },
      { title: "Fixture", description: "Organizá las fechas de tu competencia y definí los cruces." },
      { title: "Partidos", description: "Cada partido con su fecha, su horario y sus equipos." },
      { title: "Resultados", description: "Cargá el resultado del partido y cerrá la fecha." },
      { title: "Tabla de posiciones", description: "Se ordena con los resultados que vas cargando." },
      { title: "Estadísticas", description: "Seguí el rendimiento de los equipos a lo largo del torneo." },
      { title: "Goleadores", description: "La tabla de goleadores del campeonato, siempre al día." },
      { title: "Disciplina", description: "Registrá amarillas, rojas y sanciones de tu competencia." },
    ],
    board: {
      ariaLabel:
        "Panel de gestión del torneo: fecha 7 con tres partidos, uno de ellos pendiente de resultado, tabla de posiciones con partidos jugados, diferencia de gol y puntos, tabla de goleadores y registro de disciplina.",
      tabs: ["Fixture", "Tabla", "Goleadores", "Disciplina"],
      fixtureTitle: "Fixture",
      roundLabel: "Fecha 7",
      matches: [
        { home: "Los Galácticos", away: "Tiki-Taka", score: "3 - 1", time: "Sáb 18:00" },
        { home: "Deportivo Tapita", away: "El Tanque", score: "2 - 2", time: "Sáb 19:30" },
        { home: "La Nuestra", away: "Ferro FC", score: null, time: "Dom 11:00" },
      ],
      pendingLabel: "Pendiente",
      loadResultLabel: "Cargar resultado",
      standingsTitle: "Tabla de posiciones",
      columns: { team: "Equipo", played: "PJ", goalDiff: "DG", points: "PTS" },
      standings: [
        { initials: "LG", name: "Los Galácticos", played: "7", goalDiff: "+9", points: "17" },
        { initials: "DT", name: "Deportivo Tapita", played: "7", goalDiff: "+6", points: "15" },
        { initials: "ET", name: "El Tanque", played: "7", goalDiff: "+2", points: "12" },
        { initials: "TT", name: "Tiki-Taka", played: "7", goalDiff: "-1", points: "10" },
      ],
      scorersTitle: "Goleadores",
      scorers: [
        { name: "M. Álvarez", team: "Los Galácticos", goals: "11" },
        { name: "J. Ferreyra", team: "El Tanque", goals: "9" },
        { name: "N. Ríos", team: "Deportivo Tapita", goals: "8" },
      ],
      disciplineTitle: "Disciplina",
      discipline: [
        { label: "Amarillas", detail: "Fecha 7 · 6" },
        { label: "Rojas", detail: "Fecha 7 · 1" },
        { label: "Suspendidos", detail: "Próxima fecha · 2" },
      ],
    },
  },
  publicPage: {
    eyebrow: "Página pública del torneo",
    title: {
      lineOne: "Compartí un solo link.",
      highlight: "Todos ven el torneo.",
    },
    description:
      "Tu competencia tiene una página pública con la información que vas cargando. La compartís una vez y los equipos, los jugadores y sus familias la consultan cuando quieren.",
    noAccountNote: "Sin crear una cuenta y sin instalar la app.",
    items: [
      { title: "Fixture", description: "Las fechas del torneo y cuándo juega cada equipo." },
      { title: "Resultados", description: "Cómo terminó cada partido de cada fecha." },
      { title: "Tabla", description: "Las posiciones actualizadas del campeonato." },
      { title: "Goleadores", description: "Quiénes convierten en el torneo." },
      { title: "Equipos", description: "Los equipos de la competencia y sus planteles." },
      { title: "Disciplina", description: "Las sanciones que hacés públicas." },
    ],
    mock: {
      ariaLabel:
        "Página pública del torneo abierta en un navegador: un link público para compartir, resultados de la última fecha y la tabla de goleadores.",
      shareLabel: "Link público del torneo",
      copyLabel: "Copiar",
      tabs: ["Fixture", "Resultados", "Tabla", "Goleadores", "Equipos"],
      resultsTitle: "Última fecha",
      results: [
        { home: "Los Galácticos", away: "Tiki-Taka", score: "3 - 1" },
        { home: "Deportivo Tapita", away: "El Tanque", score: "2 - 2" },
      ],
      scorersTitle: "Goleadores",
      scorers: [
        { name: "M. Álvarez", goals: "11" },
        { name: "J. Ferreyra", goals: "9" },
      ],
      footnote: "Cualquiera con el link puede ver el torneo.",
    },
  },
  players: {
    eyebrow: "Para los jugadores",
    title: {
      lineOne: "Tus equipos siguen el torneo",
      highlight: "desde su teléfono.",
    },
    description:
      "Los participantes pueden seguir la competencia desde Arma2 en iPhone, Android y Web Torneos, sin que tengas que reenviar la información fecha por fecha.",
    platforms: ["iPhone", "Android", "Web Torneos"],
    points: [
      { title: "Cuándo juegan", description: "Cada equipo ve su próxima fecha, el horario y el rival." },
      { title: "Cómo va el torneo", description: "Resultados y tabla después de cada fecha." },
      { title: "Estadísticas del campeonato", description: "Goleadores y rendimiento de la competencia." },
    ],
    note: "Los jugadores no pagan para seguir un torneo.",
  },
  socialStudio: {
    eyebrow: "Estudio Social · Placas para redes",
    title: {
      lineOne: "Contá tu torneo",
      highlight: "en redes.",
    },
    description:
      "Con la información que ya cargaste en el torneo, Arma2 te ayuda a generar piezas para publicar. En lugar de armar cada imagen a mano, partís de los datos de tu competencia.",
    pieces: [
      "Próxima fecha",
      "Resultados",
      "Tabla",
      "Goleadores",
      "Sancionados",
      "Equipo ideal",
      "MVP",
      "Semifinales",
      "Final",
      "Campeón",
    ],
    previews: [
      { label: "Resultados", caption: "Fecha 7" },
      { label: "Tabla", caption: "Copa Primavera" },
      { label: "Goleadores", caption: "Top del torneo" },
    ],
    note: "FREE incluye una opción para empezar. Premium suma más estilos y opciones visuales.",
  },
  media: {
    eyebrow: "Multimedia",
    title: {
      lineOne: "Las fotos del torneo,",
      highlight: "junto al torneo.",
    },
    description:
      "Sumá las fotos de tu competencia y mantenelas ordenadas en el mismo lugar donde ya están el fixture, los resultados y la tabla.",
    points: [
      { title: "Galerías del torneo", description: "Las fotos quedan asociadas a tu competencia." },
      { title: "Ordenadas por fecha", description: "Cada fecha con sus imágenes, sin carpetas sueltas." },
      { title: "En el mismo lugar", description: "Dejás de repartir el material entre chats y links." },
    ],
    galleryLabel: "Galería de la fecha",
    galleryCaption: "Fecha 7 · Copa Primavera",
    note: "Premium amplía la capacidad multimedia de esta edición.",
  },
  plans: {
    eyebrow: "Planes",
    title: {
      lineOne: "Empezá gratis.",
      highlight: "Un Premium para toda tu temporada.",
    },
    description:
      "Cada temporada elige su plan de forma independiente. FREE no vence; Premium suma capacidad y herramientas visuales para todas sus categorías y competencias.",
    free: {
      name: "FREE",
      badge: null,
      tagline: "Gratis por temporada. Sin vencimiento.",
      description: "Todo lo necesario para organizar y publicar tu temporada.",
      price: "GRATIS",
      priceDetail: "por temporada",
      regularPriceLabel: null,
      regularPrice: null,
      features: [
        "Equipos y planteles",
        "Fixture, partidos y resultados",
        "Tabla, goleadores, disciplina y estadísticas básicas",
        "Logo, portada, escudos, fotos y retratos",
        "Página pública y comunicados",
        "Placas para redes · 3 tipos Base — Resultados · Tabla · Próxima fecha · 4:5 y 9:16",
        "Hasta 25 archivos multimedia",
        "Owner + 1 colaborador",
        "Firma Arma2 en las placas",
      ],
      upcomingLabel: null,
      upcoming: [],
      cta: "Empezar gratis",
    },
    premium: {
      name: "PREMIUM",
      badge: "Precio lanzamiento",
      tagline: "Un solo Premium para toda tu temporada.",
      description:
        "Premium queda activo permanentemente para esa temporada.",
      price: "$39.900",
      priceDetail: "ARS · por temporada",
      regularPriceLabel: "Habitual",
      regularPrice: "$49.900",
      features: [
        "Todas las placas Base para redes — 11 tipos",
        "Más diseños para tus placas — Street y Editorial actualmente disponibles para Resultados",
        "Exportaciones sin marca de Arma2",
        "Multimedia ampliada — hasta 1.000 archivos",
        "Owner + hasta 10 colaboradores",
      ],
      upcomingLabel: null,
      upcoming: [],
      cta: "Elegir Premium",
    },
    footnote:
      "Cada nueva temporada vuelve a comenzar en FREE. El upgrade se hace desde Plan dentro de esa temporada.",
  },
  platforms: {
    eyebrow: "Web + App",
    title: {
      lineOne: "Administrá desde donde",
      highlight: "te resulte más cómodo.",
    },
    description:
      "Arma2 Torneos funciona en la web, en iPhone y en Android. Entrás con la misma cuenta y seguís donde lo dejaste.",
    cards: [
      { title: "Web", description: "Cómodo para cargar una fecha completa desde la computadora." },
      { title: "iPhone", description: "Resolvé desde el teléfono, en la cancha o volviendo a casa." },
      { title: "Android", description: "La misma gestión, desde tu Android." },
    ],
    note: "Cada persona de tu organización ve y edita según su rol.",
  },
  finalCta: {
    title: {
      lineOne: "Tu próximo torneo",
      highlight: "puede empezar acá.",
    },
    description: "Creá tu competencia, cargá los equipos y compartí el link con todo tu torneo.",
    ctaPrimary: "Empezar gratis",
    ctaSecondary: "Hablar con nosotros",
    disclaimer: "Entrás a Arma2 Torneos en la web. Premium se activa desde el Plan de cada edición.",
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Preguntas frecuentes",
    items: [
      {
        question: "¿Necesito instalar una app?",
        answer:
          "No. Podés administrarlo desde la web o desde Arma2 en iPhone y Android. Para consultar la página pública tampoco hace falta instalar nada.",
      },
      {
        question: "¿Los jugadores tienen que pagar?",
        answer: "No. Los participantes pueden seguir el torneo sin pagar.",
      },
      {
        question: "¿Puedo compartir el torneo públicamente?",
        answer:
          "Sí. Compartís un link con fixture, resultados, tabla, goleadores, equipos y la disciplina que decidas hacer pública. Nadie necesita cuenta ni la app.",
      },
      {
        question: "¿Funciona desde la computadora?",
        answer:
          "Sí. Podés gestionar todo el torneo desde la web, que suele ser lo más cómodo para cargar una fecha completa.",
      },
      {
        question: "¿Puedo administrar varios torneos?",
        answer:
          "Sí. Cada temporada puede incluir todas sus categorías y competencias. Además, podés crear temporadas FREE ilimitadas y elegir el plan de cada una de forma independiente.",
      },
      {
        question: "¿FREE tiene costo?",
        answer:
          "No. Incluye equipos, planteles, fixture, programación, resultados, tabla, disciplina, estadísticas básicas, página pública y comunicados básicos.",
      },
      {
        question: "¿Cómo funciona Premium?",
        answer:
          "Premium cuesta $39.900 ARS por temporada como precio de lanzamiento —el precio habitual es $49.900— y se paga una sola vez, sin suscripción. Incluye todas las categorías y competencias de esa temporada y queda activo para ella permanentemente. Cada nueva temporada vuelve a comenzar en FREE.",
      },
    ],
  },
};

const en: TorneosContent = {
  seo: {
    title: "Arma2 Tournaments — Run the whole tournament without doing the same work twice",
    description:
      "Build teams and fixtures, enter results, share the public page and organise tournament photos in one place. Start free.",
  },
  hero: {
    eyebrow: "Arma2 Tournaments",
    title: {
      lineOne: "Your whole tournament.",
      highlight: "In one place.",
    },
    description:
      "Run the whole tournament in one place: teams, fixtures, results, standings, communications and a public page for your competition.",
    audienceNote: "For leagues, sports centres, clubs and amateur tournament organisers.",
    ctaPrimary: "Start for free",
    ctaSecondary: "See how it works",
    bullets: ["Fixtures and rounds", "Automatic standings", "Stats and top scorers", "Public page"],
    panel: {
      ariaLabel:
        "Tournament view in Arma2: a header with the competition name and current round, a standings table with the leading teams, and the next scheduled match.",
      tournamentName: "Spring Cup",
      formatLabel: "7-a-side · 12 teams",
      roundLabel: "Round 7 of 12",
      statusLabel: "In progress",
      standingsTitle: "Standings",
      pointsLabel: "PTS",
      rows: [
        { initials: "LG", name: "Los Galácticos", played: "7 GP", points: "17" },
        { initials: "DT", name: "Deportivo Tapita", played: "7 GP", points: "15" },
        { initials: "ET", name: "El Tanque", played: "7 GP", points: "12" },
      ],
      nextMatchLabel: "Next match",
      nextMatchDetail: "Sat 8:00 PM · Los Galácticos vs El Tanque",
    },
  },
  problem: {
    eyebrow: "An organiser's week",
    title: {
      lineOne: "Running a tournament",
      highlight: "shouldn't feel like this.",
    },
    description:
      "Results arrive over WhatsApp, the table gets rebuilt by hand, and every question from a team turns into one more message to answer.",
    chaosTitle: "How it usually works",
    chaos: [
      "Results scattered across WhatsApp",
      "Spreadsheets that fall out of date",
      "Standings rebuilt by hand every round",
      "Fixtures living in photos of paper",
      "Top scorers tracked somewhere else",
      "Social posts built one by one",
    ],
    orderTitle: "With Arma2 Tournaments",
    order: [
      {
        title: "Enter the result once",
        description: "Standings, stats and top scorers are built from that same entry.",
      },
      {
        title: "Everything in one place",
        description: "Teams, squads, rounds, matches and sanctions stop living in five separate files.",
      },
      {
        title: "One link to share",
        description: "Teams check the tournament whenever they want, instead of messaging you for the score.",
      },
    ],
  },
  management: {
    eyebrow: "Full management",
    title: {
      lineOne: "From the squad to the table,",
      highlight: "without leaving Arma2.",
    },
    description:
      "Every part of the competition in one place, connected to the next: what you enter in a match shows up in the standings, the stats and the public page.",
    modules: [
      { title: "Teams and squads", description: "Add the teams in your tournament and build each squad." },
      { title: "Fixtures", description: "Organise the rounds of your competition and set the matchups." },
      { title: "Matches", description: "Every match with its date, kick-off time and teams." },
      { title: "Results", description: "Enter the result and close out the round." },
      { title: "Standings", description: "Ordered from the results you enter." },
      { title: "Stats", description: "Follow how teams perform across the tournament." },
      { title: "Top scorers", description: "The tournament's scoring chart, always current." },
      { title: "Discipline", description: "Record yellows, reds and sanctions in your competition." },
    ],
    board: {
      ariaLabel:
        "Tournament management panel: round 7 with three matches, one still awaiting a result, a standings table with games played, goal difference and points, a top-scorer chart and a discipline summary.",
      tabs: ["Fixtures", "Standings", "Scorers", "Discipline"],
      fixtureTitle: "Fixtures",
      roundLabel: "Round 7",
      matches: [
        { home: "Los Galácticos", away: "Tiki-Taka", score: "3 - 1", time: "Sat 6:00 PM" },
        { home: "Deportivo Tapita", away: "El Tanque", score: "2 - 2", time: "Sat 7:30 PM" },
        { home: "La Nuestra", away: "Ferro FC", score: null, time: "Sun 11:00 AM" },
      ],
      pendingLabel: "Pending",
      loadResultLabel: "Enter result",
      standingsTitle: "Standings",
      columns: { team: "Team", played: "GP", goalDiff: "GD", points: "PTS" },
      standings: [
        { initials: "LG", name: "Los Galácticos", played: "7", goalDiff: "+9", points: "17" },
        { initials: "DT", name: "Deportivo Tapita", played: "7", goalDiff: "+6", points: "15" },
        { initials: "ET", name: "El Tanque", played: "7", goalDiff: "+2", points: "12" },
        { initials: "TT", name: "Tiki-Taka", played: "7", goalDiff: "-1", points: "10" },
      ],
      scorersTitle: "Top scorers",
      scorers: [
        { name: "M. Álvarez", team: "Los Galácticos", goals: "11" },
        { name: "J. Ferreyra", team: "El Tanque", goals: "9" },
        { name: "N. Ríos", team: "Deportivo Tapita", goals: "8" },
      ],
      disciplineTitle: "Discipline",
      discipline: [
        { label: "Yellows", detail: "Round 7 · 6" },
        { label: "Reds", detail: "Round 7 · 1" },
        { label: "Suspended", detail: "Next round · 2" },
      ],
    },
  },
  publicPage: {
    eyebrow: "Public tournament page",
    title: {
      lineOne: "Share one link.",
      highlight: "Everyone sees the tournament.",
    },
    description:
      "Your competition gets a public page built from what you enter. You share it once, and teams, players and their families check it whenever they want.",
    noAccountNote: "No account to create, no app to install.",
    items: [
      { title: "Fixtures", description: "The rounds of the tournament and when each team plays." },
      { title: "Results", description: "How every match of every round ended." },
      { title: "Standings", description: "The current table of the competition." },
      { title: "Top scorers", description: "Who is scoring in the tournament." },
      { title: "Teams", description: "The teams in the competition and their squads." },
      { title: "Discipline", description: "The sanctions you choose to make public." },
    ],
    mock: {
      ariaLabel:
        "Public tournament page open in a browser: a public link to share, the latest round's results and the top-scorer chart.",
      shareLabel: "Public tournament link",
      copyLabel: "Copy",
      tabs: ["Fixtures", "Results", "Standings", "Scorers", "Teams"],
      resultsTitle: "Latest round",
      results: [
        { home: "Los Galácticos", away: "Tiki-Taka", score: "3 - 1" },
        { home: "Deportivo Tapita", away: "El Tanque", score: "2 - 2" },
      ],
      scorersTitle: "Top scorers",
      scorers: [
        { name: "M. Álvarez", goals: "11" },
        { name: "J. Ferreyra", goals: "9" },
      ],
      footnote: "Anyone with the link can follow the tournament.",
    },
  },
  players: {
    eyebrow: "For the players",
    title: {
      lineOne: "Your teams follow the tournament",
      highlight: "from their phone.",
    },
    description:
      "Participants can follow the competition from Arma2 on iPhone, Android and Tournaments on the web — so you don't have to forward everything round by round.",
    platforms: ["iPhone", "Android", "Tournaments on web"],
    points: [
      { title: "When they play", description: "Each team sees its next round, kick-off time and opponent." },
      { title: "How the tournament is going", description: "Results and standings after every round." },
      { title: "Competition stats", description: "Top scorers and how the tournament is unfolding." },
    ],
    note: "Players don't pay to follow a tournament.",
  },
  socialStudio: {
    eyebrow: "Social Studio · Social media graphics",
    title: {
      lineOne: "Tell your tournament's story",
      highlight: "on social.",
    },
    description:
      "Using what you already entered in the tournament, Arma2 helps you generate pieces to post. Instead of building every image by hand, you start from your competition's own data.",
    pieces: [
      "Next round",
      "Results",
      "Standings",
      "Top scorers",
      "Sanctions",
      "Team of the week",
      "MVP",
      "Semi-finals",
      "Final",
      "Champion",
    ],
    previews: [
      { label: "Results", caption: "Round 7" },
      { label: "Standings", caption: "Spring Cup" },
      { label: "Top scorers", caption: "Tournament leaders" },
    ],
    note: "FREE includes one option to get started. Premium adds more styles and visual options.",
  },
  media: {
    eyebrow: "Media",
    title: {
      lineOne: "The tournament's photos,",
      highlight: "next to the tournament.",
    },
    description:
      "Add your competition's photos and keep them organised in the same place as the fixtures, the results and the table.",
    points: [
      { title: "Tournament galleries", description: "Photos stay attached to your competition." },
      { title: "Organised by round", description: "Each round with its images, no loose folders." },
      { title: "All in one place", description: "Stop splitting the material between chats and links." },
    ],
    galleryLabel: "Round gallery",
    galleryCaption: "Round 7 · Spring Cup",
    note: "Premium expands the media capacity for that edition.",
  },
  plans: {
    eyebrow: "Plans",
    title: {
      lineOne: "Start for free.",
      highlight: "One Premium for your whole season.",
    },
    description:
      "Each season chooses its plan independently. FREE never expires; Premium adds capacity and visual tools for every category and competition in that season.",
    free: {
      name: "FREE",
      badge: null,
      tagline: "Free per season. No expiration.",
      description: "Everything you need to organise and publish your season.",
      price: "FREE",
      priceDetail: "per season",
      regularPriceLabel: null,
      regularPrice: null,
      features: [
        "Teams and squads",
        "Fixtures, matches and results",
        "Standings, scorers, discipline and basic statistics",
        "Logo, cover, crests, photos and portraits",
        "Public page and announcements",
        "Social posts · 3 Base types — Results · Standings · Next fixture · 4:5 and 9:16",
        "Up to 25 media files",
        "Owner + 1 collaborator",
        "Arma2 signature on social posts",
      ],
      upcomingLabel: null,
      upcoming: [],
      cta: "Start for free",
    },
    premium: {
      name: "PREMIUM",
      badge: "Launch price",
      tagline: "One Premium for your whole season.",
      description: "Premium stays active permanently for that season.",
      price: "$39,900",
      priceDetail: "ARS · per season",
      regularPriceLabel: "Usually",
      regularPrice: "$49,900",
      features: [
        "Every Base social post — 11 types",
        "More designs for your posts — Street and Editorial currently available for Results",
        "Exports without Arma2 branding",
        "Expanded media — up to 1,000 files",
        "Owner + up to 10 collaborators",
      ],
      upcomingLabel: null,
      upcoming: [],
      cta: "Choose Premium",
    },
    footnote:
      "Every new season starts again on FREE. Upgrade from the Plan page inside that season.",
  },
  platforms: {
    eyebrow: "Web + app",
    title: {
      lineOne: "Manage it wherever",
      highlight: "suits you best.",
    },
    description:
      "Arma2 Tournaments works on the web, on iPhone and on Android. Same account, and you pick up where you left off.",
    cards: [
      { title: "Web", description: "Handy for entering a full round from your computer." },
      { title: "iPhone", description: "Sort things out from your phone, at the pitch or on the way home." },
      { title: "Android", description: "The same management, from your Android." },
    ],
    note: "Everyone in your organisation sees and edits according to their role.",
  },
  finalCta: {
    title: {
      lineOne: "Your next tournament",
      highlight: "can start here.",
    },
    description: "Create your competition, add the teams and share the link with everyone in it.",
    ctaPrimary: "Start for free",
    ctaSecondary: "Talk to us",
    disclaimer: "Open Arma2 Tournaments on the web. Premium is activated from each edition's Plan page.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
      {
        question: "Do I need to install an app?",
        answer:
          "No. Manage it from the web or from Arma2 on iPhone and Android. No app is needed to view the public page either.",
      },
      {
        question: "Do players have to pay?",
        answer: "No. Participants can follow the tournament without paying.",
      },
      {
        question: "Can I share the tournament publicly?",
        answer:
          "Yes. Share one link with fixtures, results, standings, top scorers, teams and any discipline information you choose to make public. Visitors need no account or app.",
      },
      {
        question: "Does it work from a computer?",
        answer:
          "Yes. You can manage the whole tournament from the web, which is usually the most comfortable way to enter a full round.",
      },
      {
        question: "Can I manage several tournaments?",
        answer:
          "Yes. Each season can include all its categories and competitions. You can also create unlimited FREE seasons and choose a plan for each one independently.",
      },
      {
        question: "Is FREE really free?",
        answer:
          "Yes. It includes teams, squads, fixtures, scheduling, results, standings, discipline, basic stats, a public page and basic announcements.",
      },
      {
        question: "How does Premium work?",
        answer:
          "Premium has a launch price of $39,900 ARS per season —usually $49,900— and is a one-time payment with no subscription. It includes every category and competition in that season and stays active for it permanently. Every new season starts again on FREE.",
      },
    ],
  },
};

export const torneosContent: Record<Locale, TorneosContent> = { es, en };
