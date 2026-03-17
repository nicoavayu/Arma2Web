export type Locale = "es" | "en";

export const DEFAULT_LOCALE: Locale = "es";
export const LOCALE_STORAGE_KEY = "arma2-locale";

export const translations = {
  es: {
    seo: {
      title: "Arma2 - Organizá partidos. Armá equipos parejos.",
      description:
        "La forma más simple de organizar tus partidos de fútbol. Creá equipos parejos, llevá estadísticas y votá al mejor jugador.",
    },
    nav: {
      links: [
        { label: "Cómo funciona", href: "/#how-it-works" },
        { label: "Features", href: "/#features" },
        { label: "FAQ", href: "/#faq" },
      ],
      homeAria: "Volver al inicio",
      languageLabel: "Cambiar idioma",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    stores: {
      appStore: {
        eyebrow: "Descargala en el",
        label: "App Store",
        ariaLabel: "Descargar Arma2 en App Store",
      },
      googlePlay: {
        eyebrow: "Disponible en",
        label: "Google Play",
        ariaLabel: "Descargar Arma2 en Google Play",
      },
    },
    hero: {
      title: {
        lineOne: "Organizá partidos.",
        highlight: "Armá equipos parejos.",
        lineThree: "Jugá.",
      },
      description:
        "Todos votan el nivel de cada jugador. El sistema calcula promedios y arma equipos balanceados. Olvidate de las discusiones y concentrate en jugar con Arma2.",
    },
    howItWorks: {
      eyebrow: "Cómo funciona",
      title: {
        lineOne: "En 30 segundos ya estás",
        highlight: "organizando el partido.",
      },
      description: "Arma2 ordena la previa y también el post partido. Menos fricción, más fútbol.",
      steps: [
        {
          title: "Creá el partido",
          description: "Definí fecha, hora y cancha. Compartís el link y el grupo se suma al toque.",
        },
        {
          title: "Voten niveles",
          description: "Todos puntúan a todos. Sin decisiones unilaterales ni discusiones eternas.",
        },
        {
          title: "Equipos parejos y a jugar",
          description: "Con la votación, Arma2 arma equipos balanceados para arrancar rápido.",
        },
      ],
      stepLabel: "Paso",
      postMatch: {
        title: "Qué pasa después del partido",
        description:
          "La app te notifica que hay una encuesta post partido. Es breve: 5 preguntas. Si todos la contestan en serio, Arma2 promedia los votos del grupo y usa ese resultado para definir premios, sanciones y perfiles cada vez más representativos.",
        chips: ["Notificación post partido", "Encuesta de 5 preguntas", "Promedio comunitario"],
        notification: {
          eyebrow: "Notificación",
          title: "Ya podés completar la encuesta del partido",
          description: "Te toma menos de 1 minuto y mejora la calidad del ranking del grupo.",
        },
        survey: {
          eyebrow: "Encuesta en curso",
          progressLabel: "Preguntas respondidas",
          progressValue: "3/5",
        },
        signals: [
          {
            title: "Premios y sanciones más justos",
            description: "El promedio de la encuesta define figuras y tarjetas con criterio colectivo.",
          },
          {
            title: "Perfiles más confiables",
            description: "Cuanto más en serio vota la comunidad, más precisos son los perfiles.",
          },
          {
            title: "Historial útil de verdad",
            description: "Cada encuesta suma contexto al historial de rendimiento y conducta.",
          },
        ],
      },
    },
    equipos: {
      eyebrow: "Nuevo · Equipos y Desafíos",
      title: {
        lineOne: "Tu equipo.",
        highlight: "El mercado.",
      },
      description:
        "Publicá tu equipo, buscá rivales y confirmá el partido en segundos. Una red activa de equipos esperando el desafío.",
      cards: {
        left: { name: "Los Galácticos", initials: "LG", status: "En el mercado" },
        right: { name: "Deportivo Tapita", initials: "DT", status: "Disponible" },
      },
      roster: [
        { name: "Nico", position: "DEL" },
        { name: "Santi", position: "MED" },
        { name: "Fran", position: "DEF" },
        { name: "Agus", position: "ARQ" },
        { name: "Lucho", position: "MED" },
      ],
      bullets: ["Armá tu equipo", "Publicalo en el mercado", "Desafiá o aceptá desafíos"],
    },
    features: {
      eyebrow: "Features",
      title: {
        start: "Todo lo que necesitás para ",
        highlight: "profesionalizar",
        end: " tu amateurismo.",
      },
      balance: {
        title: "Balance Democrático",
        description: "Los jugadores se distribuyen en equipos parejos según la evaluación del grupo.",
        badge: "Votación Democrática",
        sliderLabel: "Equilibrio",
      },
      playerProfile: {
        title: "Tu Perfil de Jugador",
        description: "Construí identidad, acumulá premios y mostrá tu reputación.",
        awards: [
          { label: "Figura", count: "3X" },
          { label: "Arquero", count: "1X" },
          { label: "Tarjeta", count: "5X" },
        ],
      },
      community: {
        title: "Comunidad",
        description: "Mantené a tu equipo informado en tiempo real sobre desafíos y resultados.",
        notifications: [
          { eyebrow: "Desafío Grupal", title: "¡Te desafiaron a jugar!" },
          { eyebrow: "Votación", title: "Armá los equipos ahora" },
          { eyebrow: "Confirmación", title: "Partido confirmado" },
        ],
      },
      survey: {
        title: "Encuesta Post-Partido",
        description: "Votación rápida al finalizar. Elegí las figuras y sancioná la falta de compromiso.",
        submit: "Confirmar Votos",
        saved: "Encuesta registrada",
        awardAlts: {
          mvp: "Figura",
          goalkeeper: "Arquero",
          card: "Sanción",
        },
      },
      awards: {
        title: "Premios y Sanciones",
        description: "Los premios quedan en tu historia. Las tarjetas también.",
        icons: [
          { label: "Premio" },
          { label: "Arquero" },
          { label: "Tarjeta" },
        ],
      },
    },
    impact: {
      eyebrow: "Estadísticas y continuidad",
      title: "Tu temporada queda registrada.",
      description:
        "Arma2 te deja ver tu evolución futbolística en el tiempo: volumen de partidos, lesiones, partidos recurrentes y balance anual completo.",
      activityBadge: "Balance de actividad",
      activityTitle: "Seguí tu ritmo semanal, mensual y anual",
      activityDescription:
        "Todo se acumula automáticamente en tu historial para que a fin de año puedas ver cómo te fue futbolísticamente con datos reales.",
      annualMetrics: [
        { label: "Semana", value: "2 partidos" },
        { label: "Mes", value: "9 partidos" },
        { label: "Año", value: "84 partidos" },
      ],
      statCards: [
        {
          title: "Actividad por período",
          description: "Seguí cuántos partidos jugaste en la semana, en el mes y en el año para medir constancia real.",
        },
        {
          title: "Registro de lesiones",
          description: "Podés cargar molestias o lesiones y dejar trazabilidad de tu estado físico durante la temporada.",
        },
        {
          title: "Templates semanales",
          description: "Guardá equipos base para partidos recurrentes y armá cada fecha en menos tiempo.",
        },
        {
          title: "Historial de cada fecha",
          description: "Queda guardado cuándo se jugó, quiénes jugaron y cómo terminó el partido.",
        },
      ],
      recurring: {
        eyebrow: "Partidos recurrentes",
        description:
          "Si jugás siempre con el mismo grupo, guardás el template del equipo y cada nueva fecha se suma al historial con fecha, jugadores y resultado.",
      },
    },
    faq: {
      title: "Preguntas Frecuentes",
      items: [
        {
          question: "¿Es gratis?",
          answer:
            "Sí, Arma2 es 100% gratuito para organizar partidos con amigos. En el futuro podríamos introducir funciones premium para ligas y torneos.",
        },
        {
          question: "¿Cómo funciona el balance de equipos?",
          answer:
            "Todos los jugadores del partido votan entre sí para evaluar el nivel de cada uno. Con esos votos se calcula un puntaje promedio por jugador y el sistema arma dos equipos lo más parejos posible.",
        },
        {
          question: "¿Puedo jugar si no tengo equipo?",
          answer:
            "Sí. El mercado de jugadores te permite postularte de forma individual para que otros capitanes vean tu ficha y te sumen a sus partidos.",
        },
        {
          question: "¿Cómo se eligen los capitanes?",
          answer:
            "Cualquiera puede crear un partido y convertirse en capitán, o un capitán existente puede delegar el rol a otro integrante del grupo.",
        },
        {
          question: "¿Qué pasa si alguien falta sin aviso?",
          answer:
            "La reputación es clave en Arma2. Si un jugador falta sin avisar, su índice de disciplina baja, queda registrado en su ficha pública y afecta su prioridad para próximos partidos.",
        },
        {
          question: "¿Es solo para fútbol 5?",
          answer:
            "Está optimizado para fútbol 5, 6, 7, 8, 9 y 11, pero el sistema de balance democrático se adapta a cualquier formato competitivo.",
        },
        {
          question: "¿Qué tipo de premios y sanciones existen?",
          answer:
            "Al terminar cada partido, la comunidad premia desempeños destacados como 'Mejor arquero' o 'MVP del partido'. También hay sanciones como la tarjeta roja al jugador más sucio. Todo eso construye tu reputación histórica.",
        },
        {
          question: "¿Puedo usarlo sin descargar la app?",
          answer:
            "Sí. Podés unirte a un partido vía link y votar a los jugadores desde el navegador. La app ofrece una experiencia más completa para gestionar tus equipos.",
        },
      ],
    },
    cta: {
      title: {
        lineOne: "Competí de verdad.",
        highlight: "Dejá historia.",
      },
      description:
        "Armá tu equipo, publicalo en el mercado y construí reputación partido a partido. Es gratis.",
      disclaimer: "No requiere tarjeta de crédito. Es gratis.",
    },
    footer: {
      description:
        "La plataforma definitiva para organizar partidos de fútbol con amigos. Equipos balanceados, estadísticas y cero complicaciones.",
      productTitle: "Producto",
      legalTitle: "Legal",
      links: {
        howItWorks: "Cómo funciona",
        features: "Features",
        faq: "FAQ",
        privacy: "Privacidad",
        terms: "Términos",
        contact: "Contacto",
      },
      rights: "Todos los derechos reservados.",
    },
  },
  en: {
    seo: {
      title: "Arma2 - Stop uneven matches. Create balanced teams.",
      description:
        "The easiest way to organize football matches with friends. Build balanced teams, track stats, and let the group decide who stood out.",
    },
    nav: {
      links: [
        { label: "How it works", href: "/#how-it-works" },
        { label: "Features", href: "/#features" },
        { label: "FAQ", href: "/#faq" },
      ],
      homeAria: "Back to top",
      languageLabel: "Change language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    stores: {
      appStore: {
        eyebrow: "Download on the",
        label: "App Store",
        ariaLabel: "Download Arma2 on the App Store",
      },
      googlePlay: {
        eyebrow: "Get it on",
        label: "Google Play",
        ariaLabel: "Download Arma2 on Google Play",
      },
    },
    hero: {
      title: {
        lineOne: "Stop uneven matches.",
        highlight: "Create balanced teams.",
        lineThree: "Just play.",
      },
      description:
        "Everyone rates each player's level. Arma2 averages the votes and builds fair teams in seconds, so you can skip the debate and get straight into the game.",
    },
    howItWorks: {
      eyebrow: "How it works",
      title: {
        lineOne: "In 30 seconds, your match is",
        highlight: "ready to go.",
      },
      description: "Arma2 handles the setup and the post-match flow. Less friction, more football.",
      steps: [
        {
          title: "Create the match",
          description: "Set the date, time, and pitch. Share the link and your group can join right away.",
        },
        {
          title: "Rate every player",
          description: "Everyone votes on everyone. No one-sided decisions and no endless debates.",
        },
        {
          title: "Get balanced teams",
          description: "Arma2 turns the group vote into fair teams so you can start playing faster.",
        },
      ],
      stepLabel: "Step",
      postMatch: {
        title: "What happens after the match",
        description:
          "The app prompts a quick post-match survey. It only takes 5 questions. When everyone answers honestly, Arma2 averages the group's votes and uses that result to assign awards, cards, and player profiles that get sharper over time.",
        chips: ["Post-match alert", "5-question survey", "Community average"],
        notification: {
          eyebrow: "Notification",
          title: "Your match survey is ready",
          description: "It takes less than a minute and makes your group's rankings much more accurate.",
        },
        survey: {
          eyebrow: "Survey live",
          progressLabel: "Questions answered",
          progressValue: "3/5",
        },
        signals: [
          {
            title: "Fairer awards and cards",
            description: "The group average decides standout performances and sanctions with real consensus.",
          },
          {
            title: "Profiles you can trust",
            description: "The more seriously the group votes, the more accurate every player profile becomes.",
          },
          {
            title: "A history that matters",
            description: "Each survey adds useful context to performance and discipline over time.",
          },
        ],
      },
    },
    equipos: {
      eyebrow: "New · Teams and Challenges",
      title: {
        lineOne: "Your squad.",
        highlight: "The marketplace.",
      },
      description:
        "List your team, find opponents, and lock in the match in seconds. An active network of squads ready for the next challenge.",
      cards: {
        left: { name: "Los Galácticos", initials: "LG", status: "On the market" },
        right: { name: "Deportivo Tapita", initials: "DT", status: "Available" },
      },
      roster: [
        { name: "Nico", position: "FWD" },
        { name: "Santi", position: "MID" },
        { name: "Fran", position: "DEF" },
        { name: "Agus", position: "GK" },
        { name: "Lucho", position: "MID" },
      ],
      bullets: ["Build your squad", "List it on the marketplace", "Challenge or accept matches"],
    },
    features: {
      eyebrow: "Features",
      title: {
        start: "Everything you need to ",
        highlight: "level up",
        end: " your pickup game.",
      },
      balance: {
        title: "Balanced Teams",
        description: "The group rates each player and Arma2 turns that into teams that actually feel fair.",
        badge: "Democratic voting",
        sliderLabel: "Balance",
      },
      playerProfile: {
        title: "Your Player Profile",
        description: "Build your identity, stack up awards, and show the reputation you've earned.",
        awards: [
          { label: "MVP", count: "3X" },
          { label: "Keeper", count: "1X" },
          { label: "Card", count: "5X" },
        ],
      },
      community: {
        title: "Community",
        description: "Keep your squad in sync in real time with match challenges, votes, and confirmations.",
        notifications: [
          { eyebrow: "Team Challenge", title: "You've been challenged to play!" },
          { eyebrow: "Voting", title: "Build the teams now" },
          { eyebrow: "Confirmation", title: "Match confirmed" },
        ],
      },
      survey: {
        title: "Post-Match Survey",
        description: "Quick voting after the final whistle. Pick the standouts and call out the no-shows.",
        submit: "Submit Votes",
        saved: "Survey saved",
        awardAlts: {
          mvp: "MVP",
          goalkeeper: "Keeper",
          card: "Card",
        },
      },
      awards: {
        title: "Awards & Penalties",
        description: "The trophies stay on your record. So do the cards.",
        icons: [
          { label: "Award" },
          { label: "Keeper" },
          { label: "Card" },
        ],
      },
    },
    impact: {
      eyebrow: "Stats & consistency",
      title: "Your season stays on record.",
      description:
        "Arma2 lets you track how your football year evolves: match volume, injuries, recurring fixtures, and your full yearly balance.",
      activityBadge: "Activity snapshot",
      activityTitle: "Track your weekly, monthly, and yearly rhythm",
      activityDescription:
        "Everything is added to your history automatically, so by the end of the year you can see how your season really played out.",
      annualMetrics: [
        { label: "Week", value: "2 matches" },
        { label: "Month", value: "9 matches" },
        { label: "Year", value: "84 matches" },
      ],
      statCards: [
        {
          title: "Activity over time",
          description: "See how many matches you played each week, month, and year to measure real consistency.",
        },
        {
          title: "Injury log",
          description: "Track injuries or physical issues and keep a clear record of your fitness during the season.",
        },
        {
          title: "Weekly templates",
          description: "Save your base squads for recurring games and set up each new fixture in less time.",
        },
        {
          title: "Matchday history",
          description: "Keep a record of when the game happened, who played, and how it ended.",
        },
      ],
      recurring: {
        eyebrow: "Recurring fixtures",
        description:
          "If you always play with the same group, save the team template and every new fixture is added to your history with date, players, and result.",
      },
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "Is it free?",
          answer:
            "Yes. Arma2 is completely free to use for organizing matches with friends. We may add premium features later for leagues and tournaments.",
        },
        {
          question: "How does team balancing work?",
          answer:
            "Every player in the match rates the others. Those votes generate an average score per player, and the system uses that to build the fairest teams possible.",
        },
        {
          question: "Can I play if I don't have a team?",
          answer:
            "Yes. The player marketplace lets you join as an individual so captains can discover your profile and bring you into their matches.",
        },
        {
          question: "How are captains chosen?",
          answer:
            "Anyone can create a match and become the captain, or an existing captain can pass that role to another member of the group.",
        },
        {
          question: "What happens if someone doesn't show up?",
          answer:
            "Reputation matters in Arma2. If a player misses a match without notice, their discipline rating drops, it stays on their public profile, and it affects priority for future games.",
        },
        {
          question: "Is it only for 5-a-side?",
          answer:
            "It's optimized for 5, 6, 7, 8, 9, and 11-a-side football, but the democratic balancing system adapts well to any competitive format.",
        },
        {
          question: "What kind of awards and sanctions are there?",
          answer:
            "After each match, the group can reward standout performances like Best Goalkeeper or Match MVP. It can also assign cards for poor discipline. That all becomes part of your long-term reputation.",
        },
        {
          question: "Can I use it without downloading the app?",
          answer:
            "Yes. You can join a match through a link and vote from the browser. The app simply gives you the full experience for managing teams and match history.",
        },
      ],
    },
    cta: {
      title: {
        lineOne: "Compete for real.",
        highlight: "Leave a legacy.",
      },
      description:
        "Build your squad, list it on the marketplace, and grow your reputation one match at a time. Free to use.",
      disclaimer: "No credit card needed. It's free.",
    },
    footer: {
      description:
        "The easiest way to organize football matches with friends. Balanced teams, stats, and zero hassle.",
      productTitle: "Product",
      legalTitle: "Legal",
      links: {
        howItWorks: "How it works",
        features: "Features",
        faq: "FAQ",
        privacy: "Privacy",
        terms: "Terms",
        contact: "Contact",
      },
      rights: "All rights reserved.",
    },
  },
} as const;

export type TranslationDictionary = (typeof translations)[Locale];

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "es" || value === "en";
}
