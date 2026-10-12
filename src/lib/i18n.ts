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
        { label: "Cómo se arman los equipos", href: "/#como-se-arman" },
        { label: "¿En qué estás?", href: "/#en-que-estas" },
        { label: "Preguntas", href: "/#preguntas" },
      ],
      homeAria: "Volver al inicio",
      languageLabel: "Cambiar idioma",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
    },
    home: {
      hero: {
        eyebrow: "App gratis de fútbol amateur · iOS y Android",
        title: ["Organizá partidos.", "Armá equipos parejos.", "Jugá."],
        lead: "Convocás a tu grupo con un link, cada uno califica a los que conoce y Arma2 arma dos equipos parejos con esos votos. Si te faltan jugadores o arquero, te los encuentra.",
        facts: ["Gratis", "Fútbol 5 a 11", "Equipos votados por el grupo", "Encuesta y premios después de cada partido"],
        balance: {
          teamA: "Equipo A",
          teamB: "Equipo B",
          diff: "Dif.",
          verdict: "Muy parejo",
          caption: "Así quedaron los equipos de la captura, con los votos del grupo.",
        },
      },
      balance: {
        title: "Los equipos no los arma el que organiza. Los arma el grupo.",
        lead: "Nadie elige a dedo y nadie queda último en el pan y queso. Así funciona:",
        steps: [
          "Cada jugador califica del 1 al 10 a los que conoce. A los que no conoce, les marca \"No lo conozco\".",
          "Con los votos de todo el grupo, Arma2 calcula un puntaje por jugador.",
          "Arma dos equipos con la suma de puntajes lo más pareja posible, respetando a los arqueros fijos y dejando afuera a los suplentes.",
          "Si hay cambios de último momento, en la encuesta se ajustan los equipos finales arrastrando jugadores.",
        ],
        demo: {
          title: "Probalo con un grupo de ejemplo",
          pool: "Puntaje de cada jugador según los votos",
          build: "Armar equipos",
          again: "Otra combinación",
          fixKeepers: "Fijar arqueros",
          reset: "Volver a empezar",
          teamA: "Equipo A",
          teamB: "Equipo B",
          diff: "Diferencia",
          keeper: "ARQ",
        },
      },
      chapters: {
        title: "¿En qué estás?",
        lead: "Arma2 sirve distinto según tu situación. Elegí la tuya.",
        navLabel: "Situaciones",
        items: [
          {
            id: "tengo-grupo",
            label: "Tengo grupo",
            title: "Organizá sin perseguir a nadie.",
            points: [
              "Creás el partido en pocos pasos: nombre, formato de F5 a F11, día y hora, cancha y precio por persona.",
              "Lo compartís por WhatsApp y cada uno confirma su lugar. Si se llena, quedan suplentes.",
              "Frecuentes: guardás el partido de siempre como plantilla y armás la próxima fecha con un toque.",
              "Historial de cada fecha: quién jugó y cómo salió.",
            ],
            shots: ["jugadores/crear-partido", "jugadores/frecuentes"],
          },
          {
            id: "me-faltan-jugadores",
            label: "Me faltan jugadores",
            title: "Arma2 los busca por vos.",
            points: [
              "Partido automático: elegís días, horario, formatos y hasta qué distancia te movés. Cuando hay suficientes jugadores compatibles, Arma2 propone el partido y los primeros en confirmar entran.",
              "Quiero jugar: partidos abiertos con cupos cerca tuyo, filtrados por distancia.",
              "Mercado de arqueros: arqueros disponibles cerca, con su puntaje y a cuántos kilómetros están, para invitarlos directo. Y si atajás, activás «Disponible para atajar».",
            ],
            shots: ["jugadores/partido-automatico", "jugadores/arqueros"],
          },
          {
            id: "tengo-equipo",
            label: "Tengo equipo",
            title: "Armá tu equipo y buscá rival.",
            points: [
              "Armás el plantel con posiciones, números y capitán, y tienen su propio chat.",
              "Publicás un desafío con día, cancha y formato, o aceptás el de otro equipo de tu zona.",
              "Ranking por formato y zona: ganados, empatados, perdidos y porcentaje de victorias.",
              "Historial contra cada rival.",
            ],
            shots: ["jugadores/equipo-desafio", "jugadores/ranking"],
          },
        ],
      },
      after: {
        title: "El partido no termina con el pitazo.",
        lead: "Después de cada partido, Arma2 manda una encuesta corta. Con las respuestas del grupo quedan registrados el resultado, los premios y las sanciones.",
        stepsLabel: "La encuesta, paso a paso",
        steps: [
          "Llega la notificación",
          "¿Se jugó el partido?",
          "¿Asistieron todos?",
          "¿Quién fue el mejor jugador?",
          "¿Y el mejor arquero?",
          "¿Fue un partido limpio?",
          "¿Cómo salió?",
          "Tarjeta roja, si hubo conducta antideportiva",
          "Equipos finales, como se jugó",
        ],
        swipeHint: "Deslizá para ver todos los pasos",
        outcomes: [
          { kind: "award", title: "Premios", text: "La figura y el mejor arquero, votados por el grupo, quedan en el perfil de cada uno." },
          { kind: "sanction", title: "Sanciones", text: "Las tarjetas rojas y las ausencias sin aviso también quedan registradas en el perfil." },
        ],
        profileTitle: "Tu carta de jugador",
        profile: "Puntaje, posiciones, partidos jugados y premios. En estadísticas, tu actividad por semana, mes y año, y el registro de lesiones.",
        captions: ["Encuesta · paso 3 de 7", "Carta de jugador", "Estadísticas del año"],
      },
      faq: {
        title: "Preguntas frecuentes",
        items: [
          { question: "¿Es gratis?", answer: "Sí. Bajar Arma2 y usarla para organizar partidos, votar los equipos y jugar no cuesta nada." },
          { question: "¿Cómo se arman los equipos?", answer: "Cada jugador califica del 1 al 10 a los que conoce y marca \"No lo conozco\" al resto. Con los votos de todo el grupo, Arma2 calcula un puntaje por jugador y arma dos equipos con la suma más pareja posible, respetando a los arqueros fijos." },
          { question: "¿Y si no tengo grupo?", answer: "Activás Partido automático con los días, el horario, los formatos y la distancia que te sirven. Cuando hay suficientes jugadores compatibles, Arma2 propone el partido. También podés sumarte a partidos abiertos con cupos cerca tuyo." },
          { question: "¿Cómo consigo arquero?", answer: "En la pestaña Arqueros ves los que están disponibles cerca, con su puntaje y la distancia, y los invitás directo. Si vos atajás, activás «Disponible para atajar» en tu perfil." },
          { question: "¿Qué pasa si alguien falta sin avisar?", answer: "Si en la encuesta el grupo confirma la ausencia, baja su puntaje y la ausencia queda en su carta de jugador. El puntaje se recupera de a poco, volviendo a jugar." },
          { question: "¿Para qué formatos sirve?", answer: "Fútbol 5, 6, 7, 8, 9 y 11, masculino, femenino o mixto." },
          { question: "¿Mis amigos necesitan la app?", answer: "Para organizar y jugar, sí. Si invitás a alguien que todavía no la tiene, puede votar desde el link que le mandás." },
        ],
      },
      torneosBand: {
        title: "¿Organizás una liga o un torneo?",
        body: "Arma2 Torneos: fixture, resultados, tabla, página pública y placas para redes desde un solo lugar.",
        cta: "Conocé Arma2 Torneos",
        players: "Si tu torneo ya usa Arma2 Torneos, el fixture y la tabla están en su página pública.",
      },
      download: {
        title: "Organizá tu próximo partido.",
        lead: "Gratis en iPhone y Android.",
      },
    },
    common: {
      download: "Descargar",
      qrCaption: "Escaneá para descargar",
      qrAlt: "Código QR para descargar Arma2",
      demoNote: "Ejemplo con datos ficticios",
      siteSwitch: {
        toTorneos: "Torneos",
        toTorneosAria: "Ir a Arma2 Torneos, el sitio para organizadores",
        toJugadores: "Arma2 para jugadores",
        toJugadoresAria: "Ir a Arma2, el sitio para jugadores",
      },
      storeOther: "También en",
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
    footer: {
      description: "La app para organizar partidos de fútbol amateur y armar equipos parejos votados por el grupo.",
      productTitle: "Arma2",
      torneosTitle: "Organizadores",
      torneosBlurb: "Fixture, resultados, tabla y página pública para ligas y torneos.",
      legalTitle: "Legal",
      links: {
        balance: "Cómo se arman los equipos",
        chapters: "¿En qué estás?",
        faq: "Preguntas",
        torneos: "Arma2 Torneos",
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
        { label: "How teams are built", href: "/#como-se-arman" },
        { label: "Where are you at?", href: "/#en-que-estas" },
        { label: "Questions", href: "/#preguntas" },
      ],
      homeAria: "Back to home",
      languageLabel: "Change language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    home: {
      hero: {
        eyebrow: "Free amateur football app · iOS and Android",
        title: ["Organise matches.", "Build even teams.", "Play."],
        lead: "Invite your group with a link, everyone rates the people they know and Arma2 builds two even teams from those votes. Short of players or a keeper? It finds them for you.",
        facts: ["Free", "5- to 11-a-side", "Teams voted by the group", "Post-match survey and awards"],
        balance: {
          teamA: "Team A",
          teamB: "Team B",
          diff: "Diff.",
          verdict: "Very even",
          caption: "The teams from the screenshot, built from the group's votes.",
        },
      },
      balance: {
        title: "Teams aren't picked by whoever organises. The group builds them.",
        lead: "No hand-picking, and nobody is left for last. Here's how it works:",
        steps: [
          "Every player rates the people they know from 1 to 10. Anyone they don't know gets \"I don't know him\".",
          "With everyone's votes, Arma2 works out a score for each player.",
          "It builds two teams whose total scores are as even as possible, keeping fixed goalkeepers and leaving substitutes out.",
          "If something changes at the last minute, the final teams are adjusted in the survey by dragging players.",
        ],
        demo: {
          title: "Try it with an example group",
          pool: "Each player's score from the votes",
          build: "Build teams",
          again: "Another split",
          fixKeepers: "Fix goalkeepers",
          reset: "Start over",
          teamA: "Team A",
          teamB: "Team B",
          diff: "Difference",
          keeper: "GK",
        },
      },
      chapters: {
        title: "Where are you at?",
        lead: "Arma2 works differently depending on your situation. Pick yours.",
        navLabel: "Situations",
        items: [
          {
            id: "tengo-grupo",
            label: "I have a group",
            title: "Organise without chasing anyone.",
            points: [
              "Create the match in a few steps: name, format from 5- to 11-a-side, day and time, pitch and price per person.",
              "Share it on WhatsApp and everyone confirms their spot. Once it's full, extra players become substitutes.",
              "Recurring matches: save your usual game as a template and set up the next date in one tap.",
              "History of every matchday: who played and how it went.",
            ],
            shots: ["jugadores/crear-partido", "jugadores/frecuentes"],
          },
          {
            id: "me-faltan-jugadores",
            label: "I'm short of players",
            title: "Arma2 finds them for you.",
            points: [
              "Automatic Match: pick days, time range, formats and how far you'll travel. When enough compatible players turn up, Arma2 proposes the match and the first to confirm get in.",
              "I want to play: open matches with free spots near you, filtered by distance.",
              "Goalkeeper market: nearby available keepers with their rating and distance, ready to invite. If you play in goal, switch on \"Available to keep goal\".",
            ],
            shots: ["jugadores/partido-automatico", "jugadores/arqueros"],
          },
          {
            id: "tengo-equipo",
            label: "I have a team",
            title: "Build your team and find an opponent.",
            points: [
              "Set up the squad with positions, shirt numbers and a captain, plus a team chat.",
              "Post a challenge with day, pitch and format, or accept one from another team nearby.",
              "Rankings by format and area: wins, draws, losses and win percentage.",
              "Head-to-head record against every opponent.",
            ],
            shots: ["jugadores/equipo-desafio", "jugadores/ranking"],
          },
        ],
      },
      after: {
        title: "The match doesn't end at the final whistle.",
        lead: "After every match Arma2 sends a short survey. The group's answers record the result, the awards and the sanctions.",
        stepsLabel: "The survey, step by step",
        steps: [
          "The notification arrives",
          "Was the match played?",
          "Did everyone show up?",
          "Who was the best player?",
          "And the best goalkeeper?",
          "Was it a clean match?",
          "How did it end?",
          "Red card, if anyone was out of line",
          "Final teams, as they actually played",
        ],
        swipeHint: "Swipe to see every step",
        outcomes: [
          { kind: "award", title: "Awards", text: "Man of the match and best goalkeeper, voted by the group, go on each player's profile." },
          { kind: "sanction", title: "Sanctions", text: "Red cards and no-shows without notice are recorded on the profile too." },
        ],
        profileTitle: "Your player card",
        profile: "Rating, positions, matches played and awards. In stats, your activity by week, month and year, plus an injury log.",
        captions: ["Survey · step 3 of 7", "Player card", "Yearly stats"],
      },
      faq: {
        title: "Frequently asked questions",
        items: [
          { question: "Is it free?", answer: "Yes. Downloading Arma2 and using it to organise matches, vote on teams and play costs nothing." },
          { question: "How are the teams built?", answer: "Every player rates the people they know from 1 to 10 and marks the rest as \"I don't know him\". With the whole group's votes, Arma2 works out a score per player and builds two teams with the most even totals possible, keeping fixed goalkeepers." },
          { question: "What if I don't have a group?", answer: "Turn on Automatic Match with the days, time, formats and distance that suit you. When enough compatible players turn up, Arma2 proposes the match. You can also join open matches with free spots near you." },
          { question: "How do I find a goalkeeper?", answer: "The Goalkeepers tab shows available keepers nearby with their rating and distance, and you invite them directly. If you play in goal, switch on \"Available to keep goal\" in your profile." },
          { question: "What happens if someone doesn't show up?", answer: "If the group confirms the no-show in the survey, the player's score drops and the absence goes on their player card. The score recovers gradually as they play again." },
          { question: "Which formats does it support?", answer: "5-, 6-, 7-, 8-, 9- and 11-a-side; men's, women's or mixed." },
          { question: "Do my friends need the app?", answer: "To organise and play, yes. If you invite someone who doesn't have it yet, they can vote from the link you send them." },
        ],
      },
      torneosBand: {
        title: "Running a league or a tournament?",
        body: "Arma2 Tournaments: fixtures, results, standings, a public page and social posts in one place.",
        cta: "Discover Arma2 Tournaments",
        players: "If your tournament already uses Arma2 Tournaments, fixtures and standings are on its public page.",
      },
      download: {
        title: "Organise your next match.",
        lead: "Free on iPhone and Android.",
      },
    },
    common: {
      download: "Download",
      qrCaption: "Scan to download",
      qrAlt: "QR code to download Arma2",
      demoNote: "Example with made-up data",
      siteSwitch: {
        toTorneos: "Tournaments",
        toTorneosAria: "Go to Arma2 Tournaments, the site for organisers",
        toJugadores: "Arma2 for players",
        toJugadoresAria: "Go to Arma2, the site for players",
      },
      storeOther: "Also on",
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
    footer: {
      description: "The app for organising amateur football matches and building even teams voted by the group.",
      productTitle: "Arma2",
      torneosTitle: "Organisers",
      torneosBlurb: "Fixtures, results, standings and a public page for leagues and tournaments.",
      legalTitle: "Legal",
      links: {
        balance: "How teams are built",
        chapters: "Where are you at?",
        faq: "Questions",
        torneos: "Arma2 Tournaments",
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
