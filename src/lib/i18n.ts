export type Locale = "es" | "en";

export const DEFAULT_LOCALE: Locale = "es";
export const LOCALE_STORAGE_KEY = "arma2-locale";

export const translations = {
  es: {
    seo: {
      title: "Arma2 - Organizá partidos. Armá equipos parejos.",
      description:
        "Organizá partidos de fútbol, encontrá jugadores, armá equipos parejos y registrá resultados con Arma2. Gratis para iOS y Android.",
    },
    nav: {
      links: [
        { label: "Cómo funciona", href: "/#how-it-works" },
        { label: "Funciones", href: "/#features" },
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
      eyebrow: "Fútbol amateur · Nivel pro",
      title: {
        lineOne: "Organizá partidos.",
        highlight: "Armá equipos parejos.",
        lineThree: "Jugá.",
      },
      description:
        "Creá un partido con tu grupo o activá una búsqueda. Arma2 reúne a los jugadores, arma equipos parejos y registra cada fecha.",
      benefits: ["Gratis", "Equipos balanceados", "MVP y premios", "Desafíos entre equipos"],
    },
    autoMatch: {
      eyebrow: "Partido automático",
      title: {
        lineOne: "Vos decís cuándo.",
        highlight: "Arma2 encuentra el partido.",
      },
      description:
        "Elegí los días, horarios, zona y formato que te sirven. Cuando se reúnen suficientes jugadores que buscan lo mismo, Arma2 propone el partido y los primeros en confirmar aseguran su lugar.",
      controlNote: "Sin grupo fijo. Sin perseguir gente. Sin organizar todo vos.",
      steps: [
        {
          title: "Elegí tus preferencias",
          description: "Definí los días, horarios, zona y formato que te sirven.",
        },
        {
          title: "Arma2 reúne al grupo",
          description: "Cuando hay suficientes jugadores compatibles, Arma2 propone el partido.",
        },
        {
          title: "Confirmá tu lugar",
          description: "Los primeros en confirmar aseguran su lugar y el partido queda listo.",
        },
      ],
      demo: {
        ariaLabel:
          "Demostración de Partido automático: la disponibilidad se conecta con jugadores compatibles, forma una oportunidad con siete confirmaciones y luego crea un partido con horario definido.",
        title: "Partido automático",
        active: "Búsqueda activa",
        availabilityEyebrow: "Tu búsqueda",
        availabilityTitle: "Disponibilidad",
        days: ["LU", "MA", "MI"],
        time: "20:00–23:00",
        formats: "F5 · F7",
        distance: "8 KM",
        compatiblePlayers: "Jugadores compatibles",
        opportunityStatus: "Oportunidad en formación",
        confirmed: "7 jugadores confirmados",
        timeLabel: "Horario",
        timePending: "A confirmar",
        createdStatus: "Partido creado",
        createdTime: "Lun · 21:30",
        createdFormat: "F7 · 10 jugadores",
        chatActive: "Chat activo",
      },
    },
    howItWorks: {
      eyebrow: "Cómo funciona",
      title: {
        lineOne: "En 30 segundos ya estás",
        highlight: "organizando el partido.",
      },
      description: "Arma2 ordena todo: desde la convocatoria hasta lo que pasa después del partido. Menos vueltas, más fútbol.",
      steps: [
        {
          title: "Creá el partido",
          description: "Definí fecha, hora y cancha. Compartí el link y el grupo se suma al toque.",
        },
        {
          title: "El grupo evalúa",
          description: "Cada jugador evalúa a quienes conoce. Sin decisiones unilaterales ni discusiones eternas.",
        },
        {
          title: "Equipos parejos y a jugar",
          description: "Con los votos del grupo, Arma2 arma equipos equilibrados y deja todo listo para jugar.",
        },
      ],
      stepLabel: "Paso",
      postMatch: {
        title: "Qué pasa después del partido",
        description:
          "Después del partido, cada jugador responde una encuesta breve. Los votos del grupo registran el resultado, reconocen a las figuras y señalan ausencias o conductas antideportivas.",
        chips: ["Notificación pospartido", "Encuesta breve", "Votos del grupo"],
        notification: {
          eyebrow: "Notificación",
          title: "Ya podés completar la encuesta del partido",
          description: "Te toma menos de un minuto y ayuda a registrar lo que pasó.",
        },
        survey: {
          eyebrow: "Encuesta en curso",
          progressLabel: "Preguntas respondidas",
          progressValue: "3/5",
        },
        signals: [
          {
            title: "Premios y sanciones más justos",
            description: "Los votos del grupo definen las figuras y las sanciones.",
          },
          {
            title: "Perfiles más confiables",
            description: "Cada partido suma información y hace que los perfiles reflejen mejor lo que pasa en la cancha.",
          },
          {
            title: "Historial útil de verdad",
            description: "Cada encuesta suma contexto al historial de rendimiento y conducta.",
          },
        ],
      },
    },
    equipos: {
      eyebrow: "Nuevo · Equipos y desafíos",
      title: {
        lineOne: "Armá tu equipo.",
        highlight: "Encontrá un rival.",
      },
      description:
        "Publicá tu equipo, encontrá rivales de tu zona y coordiná el desafío desde Arma2.",
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
    teamRanking: {
      eyebrow: "Rendimiento de equipos",
      title: {
        lineOne: "Ranking y rendimiento",
        highlight: "de equipos.",
      },
      description:
        "Seguí el rendimiento de tu equipo, compará resultados y revisá el historial contra cada rival.",
      bullets: [
        "Partidos jugados, ganados, empatados y perdidos",
        "Porcentaje de victorias",
        "Historial contra rivales",
        "Ranking por formato de juego",
        "Desafíos entre equipos",
      ],
      leaderboard: {
        title: "Ranking F7 · Zona Norte",
        winRateLabel: "% Vict.",
        liveLabel: "Actualizado",
        footnote: "Se actualiza después de cada desafío.",
        rows: [
          { name: "Los Galácticos", initials: "LG", record: "18-4-3", winRate: 72, trend: "up" },
          { name: "Deportivo Tapita", initials: "DT", record: "15-6-4", winRate: 60, trend: "up" },
          { name: "El Tanque", initials: "ET", record: "13-5-7", winRate: 52, trend: "down" },
          { name: "Tiki-Taka", initials: "TT", record: "11-7-7", winRate: 44, trend: "up" },
        ],
      },
      versus: {
        eyebrow: "Historial contra rivales",
        teamA: "Los Galácticos",
        teamB: "Deportivo Tapita",
        scoreA: "5",
        scoreB: "3",
        draws: "2 empates",
        footnote: "Últimos 10 partidos entre ambos.",
      },
    },
    features: {
      eyebrow: "Funciones",
      title: {
        start: "Todo lo que necesitás para ",
        highlight: "profesionalizar",
        end: " tu amateurismo.",
      },
      balance: {
        title: "Balance democrático",
        description: "Los jugadores evalúan al grupo y Arma2 usa esos votos para crear equipos parejos.",
        badge: "Votación del grupo",
        sliderLabel: "Equipos parejos",
      },
      autoMatch: {
        title: "Partido automático",
        description: "Indicá cuándo podés jugar y Arma2 encuentra jugadores compatibles para formar el partido.",
        search: "Búsqueda activa",
        opportunity: "Grupo en formación",
        ready: "Partido creado",
      },
      playerProfile: {
        title: "Tu perfil de jugador",
        description: "Cada partido construye tu perfil: nivel, premios, sanciones e historial.",
        awards: [
          { label: "Figura", count: "3X" },
          { label: "Arquero", count: "1X" },
          { label: "Tarjeta", count: "5X" },
        ],
      },
      community: {
        title: "Todo el grupo, al día",
        description: "Invitaciones, votaciones, confirmaciones y resultados en un mismo lugar.",
        notifications: [
          { eyebrow: "Desafío grupal", title: "¡Te desafiaron a jugar!" },
          { eyebrow: "Votación", title: "Armá los equipos ahora" },
          { eyebrow: "Confirmación", title: "Partido confirmado" },
        ],
      },
      survey: {
        title: "Encuesta pospartido",
        description: "Reconocé a las figuras y registrá ausencias o conductas antideportivas.",
        submit: "Confirmar Votos",
        saved: "Encuesta registrada",
        awardAlts: {
          mvp: "Figura",
          goalkeeper: "Arquero",
          card: "Sanción",
        },
      },
      awards: {
        title: "Premios y sanciones",
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
        "Seguí tu actividad, tu constancia, tus lesiones y el historial de cada temporada.",
      activityBadge: "Balance de actividad",
      activityTitle: "Seguí tu ritmo semanal, mensual y anual",
      activityDescription:
        "Cada partido se suma automáticamente a tu historial para que puedas seguir tu evolución durante todo el año.",
      annualMetrics: [
        { label: "Semana", value: "2 partidos" },
        { label: "Mes", value: "9 partidos" },
        { label: "Año", value: "84 partidos" },
      ],
      statCards: [
        {
          title: "Actividad por período",
          description: "Consultá cuántos partidos jugaste en la semana, en el mes y en el año para medir tu constancia.",
        },
        {
          title: "Registro de lesiones",
          description: "Registrá molestias o lesiones y llevá un seguimiento de tu estado físico durante la temporada.",
        },
        {
          title: "Plantillas para partidos recurrentes",
          description: "Guardá el grupo base y armá cada nueva fecha en menos tiempo.",
        },
        {
          title: "Historial de cada fecha",
          description: "Queda registrado cuándo se jugó, quiénes participaron y cómo terminó el partido.",
        },
      ],
      recurring: {
        eyebrow: "Partidos recurrentes",
        description:
          "Si jugás siempre con el mismo grupo, guardá una plantilla. Cada nueva fecha suma al historial el día, los jugadores y el resultado.",
      },
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          question: "¿Es gratis?",
          answer:
            "Sí. Arma2 es gratis para organizar partidos, encontrar jugadores y llevar el historial de tu grupo.",
        },
        {
          question: "¿Cómo funciona el balance de equipos?",
          answer:
            "Cada jugador evalúa a quienes conoce. Con los votos del grupo, Arma2 calcula un puntaje por jugador y arma dos equipos lo más parejos posible.",
        },
        {
          question: "¿Puedo jugar si no tengo equipo?",
          answer:
            "Sí. Con Partido automático indicás cuándo podés jugar, qué formato buscás y hasta dónde querés moverte. Arma2 encuentra jugadores con búsquedas compatibles y te avisa cuando aparece una oportunidad para formar el partido.",
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
            "Al terminar cada partido, el grupo reconoce desempeños destacados como 'Mejor arquero' o 'Figura del partido'. También registra sanciones por conductas antideportivas. Todo eso construye tu historial.",
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
        lineOne: "Organizá tu próximo partido.",
        highlight: "O dejá que Arma2 lo encuentre.",
      },
      description:
        "Creá un partido con tu grupo o activá una búsqueda automática. Arma2 se ocupa de reunir a los jugadores, ordenar la previa y dejar todo listo para jugar.",
      disclaimer: "Gratis para iOS y Android.",
    },
    footer: {
      description:
        "La app para organizar partidos de fútbol, encontrar jugadores, armar equipos parejos y registrar cada fecha.",
      productTitle: "Producto",
      legalTitle: "Legal",
      links: {
        howItWorks: "Cómo funciona",
        features: "Funciones",
        faq: "FAQ",
        privacy: "Privacidad",
        terms: "Términos",
        deleteAccount: "Eliminar cuenta",
        contact: "Contacto",
      },
      rights: "Todos los derechos reservados.",
    },
  },
  en: {
    seo: {
      title: "Arma2 - Organize matches. Build balanced teams.",
      description:
        "Organize football matches, find players, build balanced teams, and record results with Arma2. Free for iOS and Android.",
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
      eyebrow: "Amateur football · Pro level",
      title: {
        lineOne: "Organize matches.",
        highlight: "Build balanced teams.",
        lineThree: "Play.",
      },
      description:
        "Create a match with your group or start a search. Arma2 brings players together, builds balanced teams, and records every matchday.",
      benefits: ["Free", "Balanced teams", "MVP and awards", "Team challenges"],
    },
    autoMatch: {
      eyebrow: "Automatic match",
      title: {
        lineOne: "You choose when.",
        highlight: "Arma2 finds the match.",
      },
      description:
        "Choose the days, times, area, and format that work for you. When enough players are looking for the same thing, Arma2 suggests a match and the first to confirm secure their spot.",
      controlNote: "No fixed group. No chasing people. No organizing everything yourself.",
      steps: [
        {
          title: "Choose your preferences",
          description: "Set the days, times, area, and format that work for you.",
        },
        {
          title: "Arma2 brings the group together",
          description: "When there are enough compatible players, Arma2 suggests a match.",
        },
        {
          title: "Confirm your spot",
          description: "The first players to confirm secure their spot and the match is ready.",
        },
      ],
      demo: {
        ariaLabel:
          "Automatic match demonstration: availability connects with compatible players, forms an opportunity with seven confirmations, and then creates a match with a set time.",
        title: "Automatic match",
        active: "Search active",
        availabilityEyebrow: "Your search",
        availabilityTitle: "Availability",
        days: ["MO", "TU", "WE"],
        time: "20:00–23:00",
        formats: "5V5 · 7V7",
        distance: "8 KM",
        compatiblePlayers: "Compatible players",
        opportunityStatus: "Opportunity forming",
        confirmed: "7 players confirmed",
        timeLabel: "Time",
        timePending: "To be confirmed",
        createdStatus: "Match created",
        createdTime: "Mon · 21:30",
        createdFormat: "7V7 · 10 players",
        chatActive: "Chat active",
      },
    },
    howItWorks: {
      eyebrow: "How it works",
      title: {
        lineOne: "In 30 seconds, you're already",
        highlight: "organizing the match.",
      },
      description: "Arma2 organizes everything, from the call-up to what happens after the match. Less hassle, more football.",
      steps: [
        {
          title: "Create the match",
          description: "Set the date, time, and pitch. Share the link and the group can join right away.",
        },
        {
          title: "The group rates",
          description: "Each player rates the people they know. No one-sided decisions or endless debates.",
        },
        {
          title: "Balanced teams, ready to play",
          description: "Arma2 uses the group's votes to build balanced teams and get everything ready to play.",
        },
      ],
      stepLabel: "Step",
      postMatch: {
        title: "What happens after the match",
        description:
          "After the match, each player completes a short survey. The group's votes record the result, recognize standout players, and flag absences or unsportsmanlike conduct.",
        chips: ["Post-match notification", "Short survey", "Group votes"],
        notification: {
          eyebrow: "Notification",
          title: "You can now complete the match survey",
          description: "It takes less than a minute and helps record what happened.",
        },
        survey: {
          eyebrow: "Survey live",
          progressLabel: "Questions answered",
          progressValue: "3/5",
        },
        signals: [
          {
            title: "Fairer awards and sanctions",
            description: "The group's votes decide the standout players and sanctions.",
          },
          {
            title: "More reliable profiles",
            description: "Every match adds information and helps profiles better reflect what happens on the pitch.",
          },
          {
            title: "A history that matters",
            description: "Each survey adds useful context to performance and discipline over time.",
          },
        ],
      },
    },
    equipos: {
      eyebrow: "New · Teams and challenges",
      title: {
        lineOne: "Build your team.",
        highlight: "Find an opponent.",
      },
      description:
        "List your team, find opponents in your area, and coordinate the challenge through Arma2.",
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
    teamRanking: {
      eyebrow: "Team performance",
      title: {
        lineOne: "Team ranking",
        highlight: "and performance.",
      },
      description:
        "Track your team's performance, compare results, and review the history against each opponent.",
      bullets: [
        "Matches played, won, drawn, and lost",
        "Win percentage",
        "Head-to-head history",
        "Ranking by match format",
        "Team challenges",
      ],
      leaderboard: {
        title: "7-a-side Ranking · North Zone",
        winRateLabel: "Win %",
        liveLabel: "Updated",
        footnote: "Updated after every challenge.",
        rows: [
          { name: "Los Galácticos", initials: "LG", record: "18-4-3", winRate: 72, trend: "up" },
          { name: "Deportivo Tapita", initials: "DT", record: "15-6-4", winRate: 60, trend: "up" },
          { name: "El Tanque", initials: "ET", record: "13-5-7", winRate: 52, trend: "down" },
          { name: "Tiki-Taka", initials: "TT", record: "11-7-7", winRate: 44, trend: "up" },
        ],
      },
      versus: {
        eyebrow: "Head-to-head history",
        teamA: "Los Galácticos",
        teamB: "Deportivo Tapita",
        scoreA: "5",
        scoreB: "3",
        draws: "2 draws",
        footnote: "Last 10 matches between them.",
      },
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
        description: "Players rate the group and Arma2 uses those votes to build balanced teams.",
        badge: "Group voting",
        sliderLabel: "Balanced teams",
      },
      autoMatch: {
        title: "Automatic match",
        description: "Tell Arma2 when you can play and it finds compatible players to form the match.",
        search: "Search active",
        opportunity: "Group forming",
        ready: "Match created",
      },
      playerProfile: {
        title: "Your player profile",
        description: "Every match builds your profile: level, awards, sanctions, and history.",
        awards: [
          { label: "MVP", count: "3X" },
          { label: "Keeper", count: "1X" },
          { label: "Card", count: "5X" },
        ],
      },
      community: {
        title: "Keep the whole group up to date",
        description: "Invitations, votes, confirmations, and results all in one place.",
        notifications: [
          { eyebrow: "Team Challenge", title: "You've been challenged to play!" },
          { eyebrow: "Voting", title: "Build the teams now" },
          { eyebrow: "Confirmation", title: "Match confirmed" },
        ],
      },
      survey: {
        title: "Post-match survey",
        description: "Recognize standout players and record absences or unsportsmanlike conduct.",
        submit: "Submit Votes",
        saved: "Survey saved",
        awardAlts: {
          mvp: "MVP",
          goalkeeper: "Keeper",
          card: "Card",
        },
      },
      awards: {
        title: "Awards and sanctions",
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
        "Track your activity, consistency, injuries, and the history of every season.",
      activityBadge: "Activity snapshot",
      activityTitle: "Track your weekly, monthly, and yearly rhythm",
      activityDescription:
        "Every match is added to your history automatically so you can track your progress all year.",
      annualMetrics: [
        { label: "Week", value: "2 matches" },
        { label: "Month", value: "9 matches" },
        { label: "Year", value: "84 matches" },
      ],
      statCards: [
        {
          title: "Activity over time",
          description: "See how many matches you played during the week, month, and year to measure your consistency.",
        },
        {
          title: "Injury log",
          description: "Record physical issues or injuries and track your fitness throughout the season.",
        },
        {
          title: "Templates for recurring matches",
          description: "Save the core group and set up each new matchday in less time.",
        },
        {
          title: "Matchday history",
          description: "Keep a record of when the match was played, who took part, and how it ended.",
        },
      ],
      recurring: {
        eyebrow: "Recurring fixtures",
        description:
          "If you always play with the same group, save a template. Every new matchday adds the date, players, and result to your history.",
      },
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          question: "Is it free?",
          answer:
            "Yes. Arma2 is free for organizing matches, finding players, and keeping your group's history.",
        },
        {
          question: "How does team balancing work?",
          answer:
            "Each player rates the people they know. Arma2 uses the group's votes to calculate a score for each player and build the most balanced teams possible.",
        },
        {
          question: "Can I play if I don't have a team?",
          answer:
            "Yes. With Automatic match, you choose when you can play, which formats work, and how far you're willing to travel. Arma2 finds players with compatible searches and lets you know when there's an opportunity to form a match.",
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
            "After each match, the group recognizes standout performances like Best Goalkeeper or Player of the Match. It also records sanctions for unsportsmanlike conduct. That all becomes part of your history.",
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
        lineOne: "Organize your next match.",
        highlight: "Or let Arma2 find it.",
      },
      description:
        "Create a match with your group or start an automatic search. Arma2 brings the players together, organizes the setup, and gets everything ready to play.",
      disclaimer: "Free for iOS and Android.",
    },
    footer: {
      description:
        "The app for organizing football matches, finding players, building balanced teams, and recording every matchday.",
      productTitle: "Product",
      legalTitle: "Legal",
      links: {
        howItWorks: "How it works",
        features: "Features",
        faq: "FAQ",
        privacy: "Privacy",
        terms: "Terms",
        deleteAccount: "Delete account",
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
