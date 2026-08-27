"use client";

import { ArrowDown, ArrowUpRight, Check, Circle, Monitor, Smartphone } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { getCreateTournamentTarget, TORNEOS_CONTACT_HREF } from "@/lib/torneos-links";

import styles from "./TorneosEditorial.module.css";

const editorialCopy = {
  es: {
    heroKicker: "La cancha cambia. El torneo también.",
    heroTitle: ["Todo tu", "torneo.", "Un solo lugar."],
    heroBody:
      "Fixture, resultados, tabla, comunicación y una página pública que todos pueden seguir. Vos organizás. Arma2 ordena el resto.",
    start: "Empezar gratis",
    explore: "Ver cómo funciona",
    freeNote: "Gratis por torneo · Sin tarjeta",
    live: "EN JUEGO",
    round: "FECHA 07 / 12",
    next: "PRÓXIMO PARTIDO",
    flowKicker: "Una carga. Todo conectado.",
    flowTitle: "Dejá de correr atrás del torneo.",
    flowBody:
      "Cargás un resultado una vez. La tabla se acomoda, las estadísticas avanzan y el torneo queda listo para compartir.",
    flowSteps: ["Armá", "Jugá", "Publicá"],
    flowDescriptions: [
      "Equipos, planteles, fixture y programación.",
      "Partidos, resultados, tabla, disciplina y estadísticas.",
      "Página pública, comunicados y seguimiento desde web o app.",
    ],
    publicLabel: "arma2.com.ar/torneos/copa-primavera",
    publicTitle: "El torneo se explica solo.",
    publicBody:
      "Compartí un link y listo. Jugadores, equipos y familias ven fixture, resultados, tabla, goleadores y disciplina sin pedirte nada por WhatsApp.",
    noAccount: "Sin cuenta. Sin instalar nada. Sin perseguir al organizador.",
    socialKicker: "Social Studio + Multimedia",
    socialTitle: "Que tu torneo también se vea grande.",
    socialBody:
      "Los datos que ya cargaste se convierten en piezas listas para contar la fecha. Y las fotos quedan con el torneo, no perdidas entre chats y carpetas.",
    studioNote: "FREE incluye una opción. Premium suma más estilos y capacidad multimedia.",
    scorePoster: "RESULTADOS",
    tablePoster: "LA TABLA",
    photoPoster: "LA FECHA",
    plansKicker: "Elegí por edición, no por suscripción.",
    plansTitle: "Empezá gratis. Hacé Premium el torneo que lo pida.",
    freeLead: "Todo lo necesario para poner la competencia en marcha.",
    premiumLead: "Más imagen, más capacidad, la misma edición para siempre.",
    included: "INCLUYE",
    premiumAdds: "PREMIUM SUMA",
    launch: "PRECIO LANZAMIENTO",
    usual: "Habitual $49.900",
    forever: "Pago único · Acceso permanente para esa edición",
    upgrade: "El upgrade se hace desde Plan, dentro del torneo.",
    upcoming: "PRÓXIMAMENTE",
    viewPremium: "Ver Premium en Torneos",
    platforms: "Gestioná en web. Resolvé en iPhone o Android. Todo con la misma cuenta.",
    faqKicker: "Antes de arrancar",
    finalTitle: "La próxima fecha puede estar ordenada.",
    finalBody: "Creá el torneo, cargá los equipos y compartí el link. El primer paso es gratis.",
    contact: "Hablar con nosotros",
  },
  en: {
    heroKicker: "The pitch changed. Tournaments should too.",
    heroTitle: ["Your whole", "tournament.", "One place."],
    heroBody:
      "Fixtures, results, standings, communications and a public page everyone can follow. You run it. Arma2 keeps it together.",
    start: "Start for free",
    explore: "See how it works",
    freeNote: "Free per tournament · No card required",
    live: "LIVE",
    round: "ROUND 07 / 12",
    next: "NEXT MATCH",
    flowKicker: "One entry. Everything connected.",
    flowTitle: "Stop chasing your own tournament.",
    flowBody:
      "Enter a result once. The standings update, the stats move and the tournament is ready to share.",
    flowSteps: ["Build", "Play", "Publish"],
    flowDescriptions: [
      "Teams, squads, fixtures and scheduling.",
      "Matches, results, standings, discipline and statistics.",
      "Public page, announcements and following from web or app.",
    ],
    publicLabel: "arma2.com.ar/tournaments/spring-cup",
    publicTitle: "The tournament explains itself.",
    publicBody:
      "Share one link and you’re done. Players, teams and families see fixtures, results, standings, scorers and discipline without chasing you on WhatsApp.",
    noAccount: "No account. No install. No chasing the organiser.",
    socialKicker: "Social Studio + Media",
    socialTitle: "Make the tournament look as big as it feels.",
    socialBody:
      "The data you already entered becomes content for the next round. And the photos stay with the tournament, not lost across chats and folders.",
    studioNote: "FREE includes one option. Premium adds more styles and media capacity.",
    scorePoster: "RESULTS",
    tablePoster: "STANDINGS",
    photoPoster: "MATCHDAY",
    plansKicker: "Choose per edition, not by subscription.",
    plansTitle: "Start free. Make Premium the tournament that needs it.",
    freeLead: "Everything you need to get the competition moving.",
    premiumLead: "More presence, more capacity, the same edition forever.",
    included: "INCLUDED",
    premiumAdds: "PREMIUM ADDS",
    launch: "LAUNCH PRICE",
    usual: "Usually $49,900",
    forever: "One payment · Permanent access for that edition",
    upgrade: "Upgrade from Plan inside your tournament.",
    upcoming: "COMING SOON",
    viewPremium: "View Premium in Tournaments",
    platforms: "Manage on web. Handle the moment on iPhone or Android. One account throughout.",
    faqKicker: "Before you start",
    finalTitle: "Your next round can already be organised.",
    finalBody: "Create the tournament, add the teams and share the link. The first step is free.",
    contact: "Talk to us",
  },
} as const;

function ProductStage() {
  const content = useTorneosContent();
  const { locale } = useLanguage();
  const copy = editorialCopy[locale];
  const { panel } = content.hero;
  const { board } = content.management;

  return (
    <div className={styles.productStage} role="img" aria-label={panel.ariaLabel}>
      <div className={styles.stageHeader}>
        <div>
          <span className={styles.stageOverline}>{panel.formatLabel}</span>
          <strong>{panel.tournamentName}</strong>
        </div>
        <span className={styles.liveMark}><Circle aria-hidden="true" /> {copy.live}</span>
      </div>

      <div className={styles.stageScore}>
        <span>Los Galácticos</span>
        <strong>3</strong>
        <i>—</i>
        <strong>1</strong>
        <span>Tiki-Taka</span>
      </div>

      <div className={styles.stageData}>
        <div>
          <span>{copy.round}</span>
          {panel.rows.map((row, index) => (
            <div className={styles.standingRow} key={row.name}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <span>{row.name}</span>
              <em>{row.points}</em>
            </div>
          ))}
        </div>
        <div className={styles.nextMatch}>
          <span>{copy.next}</span>
          <strong>{board.matches[2]?.home}</strong>
          <i>vs</i>
          <strong>{board.matches[2]?.away}</strong>
          <small>{board.matches[2]?.time}</small>
        </div>
      </div>
      <div className={styles.stageStamp}>ARMA2 / TORNEOS</div>
    </div>
  );
}

function PrimaryCta({ label, dark = false }: { label: string; dark?: boolean }) {
  const target = getCreateTournamentTarget();

  return (
    <a
      href={target.href}
      target={target.isExternal ? "_blank" : undefined}
      rel={target.isExternal ? "noopener noreferrer" : undefined}
      className={`${styles.primaryCta} ${dark ? styles.primaryCtaDark : ""}`}
    >
      <span>{label}</span>
      <ArrowUpRight aria-hidden="true" />
    </a>
  );
}

function PublicScoreboard() {
  const content = useTorneosContent();
  const { locale } = useLanguage();
  const copy = editorialCopy[locale];
  const { mock } = content.publicPage;

  return (
    <div className={styles.publicBoard} role="img" aria-label={mock.ariaLabel}>
      <div className={styles.browserBar}>
        <span />
        <span />
        <span />
        <strong>{copy.publicLabel}</strong>
      </div>
      <div className={styles.publicBoardBody}>
        <div className={styles.publicBoardTitle}>
          <span>{content.hero.panel.formatLabel}</span>
          <strong>{content.hero.panel.tournamentName}</strong>
        </div>
        <div className={styles.publicScores}>
          {mock.results.map((result) => (
            <div key={`${result.home}-${result.away}`}>
              <span>{result.home}</span>
              <b>{result.score}</b>
              <span>{result.away}</span>
            </div>
          ))}
        </div>
        <div className={styles.publicNav}>
          {mock.tabs.slice(0, 4).map((tab, index) => <span data-active={index === 1} key={tab}>{tab}</span>)}
        </div>
      </div>
    </div>
  );
}

function StudioPosters() {
  const content = useTorneosContent();
  const { locale } = useLanguage();
  const copy = editorialCopy[locale];

  return (
    <div className={styles.posterStage} aria-label={content.socialStudio.description} role="img">
      <div className={`${styles.poster} ${styles.posterScore}`}>
        <span>{copy.scorePoster}</span>
        <b>03—01</b>
        <small>FECHA 07</small>
      </div>
      <div className={`${styles.poster} ${styles.posterTable}`}>
        <span>{copy.tablePoster}</span>
        <ol>
          <li><b>01</b> Los Galácticos <em>17</em></li>
          <li><b>02</b> Dep. Tapita <em>15</em></li>
          <li><b>03</b> El Tanque <em>12</em></li>
        </ol>
      </div>
      <div className={`${styles.poster} ${styles.posterPhoto}`}>
        <span>{copy.photoPoster}</span>
        <div className={styles.posterBall} />
        <b>COPA<br />PRIMAVERA</b>
        <small>07 / 12</small>
      </div>
    </div>
  );
}

export function TorneosEditorial() {
  const content = useTorneosContent();
  const { locale } = useLanguage();
  const copy = editorialCopy[locale];
  const freeFeatures = content.plans.free.features;
  const premiumFeatures = content.plans.premium.features.slice(1);

  return (
    <div className={styles.page}>
      <section className={styles.hero} id="torneos-hero">
        <div className={styles.heroGlow} />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>{copy.heroKicker}</p>
            <h1>
              <span>{copy.heroTitle[0]}</span>
              <span>{copy.heroTitle[1]}</span>
              <span className={styles.heroAccent}>{copy.heroTitle[2]}</span>
            </h1>
            <p className={styles.heroBody}>{copy.heroBody}</p>
            <div className={styles.heroActions}>
              <PrimaryCta label={copy.start} />
              <a className={styles.textLink} href="#torneos-gestion">
                {copy.explore} <ArrowDown aria-hidden="true" />
              </a>
            </div>
            <small className={styles.freeNote}>{copy.freeNote}</small>
          </div>
          <ProductStage />
        </div>
        <div className={styles.scoreTicker} aria-hidden="true">
          <span>FIXTURE</span><b>•</b><span>RESULTADOS</span><b>•</b><span>TABLA</span><b>•</b><span>DISCIPLINA</span><b>•</b><span>GOLEADORES</span>
        </div>
      </section>

      <section className={styles.flow} id="torneos-gestion">
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>{copy.flowKicker}</p>
          <h2>{copy.flowTitle}</h2>
          <p>{copy.flowBody}</p>
        </div>
        <div className={styles.flowRail}>
          {copy.flowSteps.map((step, index) => (
            <article className={styles.flowStep} key={step}>
              <span>0{index + 1}</span>
              <h3>{step}</h3>
              <p>{copy.flowDescriptions[index]}</p>
            </article>
          ))}
        </div>

        <div className={styles.publicMoment}>
          <div className={styles.publicCopy}>
            <span className={styles.marginNumber}>02</span>
            <h2>{copy.publicTitle}</h2>
            <p>{copy.publicBody}</p>
            <strong>{copy.noAccount}</strong>
            <div className={styles.platformLine}>
              <Monitor aria-hidden="true" /> <Smartphone aria-hidden="true" />
              <span>{copy.platforms}</span>
            </div>
          </div>
          <PublicScoreboard />
        </div>
      </section>

      <section className={styles.studio} id="torneos-social-studio">
        <div className={styles.studioCopy}>
          <p className={styles.kicker}>{copy.socialKicker}</p>
          <h2>{copy.socialTitle}</h2>
          <p>{copy.socialBody}</p>
          <small>{copy.studioNote}</small>
        </div>
        <StudioPosters />
        <div className={styles.studioMarquee} aria-hidden="true">
          {content.socialStudio.pieces.map((piece) => <span key={piece}>{piece}</span>)}
        </div>
      </section>

      <section className={styles.plans} id="torneos-planes">
        <div className={styles.plansHeader}>
          <p className={styles.kicker}>{copy.plansKicker}</p>
          <h2>{copy.plansTitle}</h2>
        </div>
        <div className={styles.planSplit}>
          <article className={styles.freePlan}>
            <div className={styles.planName}>
              <span>01</span>
              <h3>FREE</h3>
            </div>
            <p>{copy.freeLead}</p>
            <div className={styles.priceLine}>
              <strong>{content.plans.free.price}</strong>
              <span>{content.plans.free.priceDetail}</span>
            </div>
            <span className={styles.listLabel}>{copy.included}</span>
            <ul>
              {freeFeatures.map((feature) => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}
            </ul>
            <PrimaryCta label={copy.start} dark />
          </article>

          <article className={styles.premiumPlan}>
            <div className={styles.planName}>
              <span>02</span>
              <h3>PREMIUM</h3>
            </div>
            <p>{copy.premiumLead}</p>
            <span className={styles.launchLabel}>{copy.launch}</span>
            <div className={styles.priceLine}>
              <strong>{content.plans.premium.price}</strong>
              <span>ARS</span>
            </div>
            <div className={styles.usualPrice}>{copy.usual}</div>
            <div className={styles.permanent}>{copy.forever}</div>
            <span className={styles.listLabel}>{copy.premiumAdds}</span>
            <ul>
              {premiumFeatures.map((feature) => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}
            </ul>
            <div className={styles.upcoming}>
              <span>{copy.upcoming}</span>
              <p>{content.plans.premium.upcoming.join(" · ")}</p>
            </div>
            <PrimaryCta label={copy.viewPremium} />
            <small>{copy.upgrade}</small>
          </article>
        </div>
      </section>

      <section className={styles.faq} id="torneos-faq">
        <div>
          <p className={styles.kicker}>{copy.faqKicker}</p>
          <h2>{content.faq.title}</h2>
        </div>
        <div className={styles.faqList}>
          {content.faq.items.map((item, index) => (
            <details key={item.question} open={index === 0 ? true : undefined}>
              <summary><span>0{index + 1}</span>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.finalCta} id="torneos-empezar">
        <span className={styles.finalWatermark}>ARMA2</span>
        <div>
          <p className={styles.kicker}>ARMA2 TORNEOS</p>
          <h2>{copy.finalTitle}</h2>
          <p>{copy.finalBody}</p>
          <div className={styles.finalActions}>
            <PrimaryCta label={copy.start} />
            <a href={TORNEOS_CONTACT_HREF} className={styles.finalContact}>{copy.contact}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
