"use client";

import { ArrowDown, ArrowRight, ArrowUpRight, Check, Circle, Monitor, Smartphone } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { getCreateTournamentTarget, TORNEOS_CONTACT_HREF } from "@/lib/torneos-links";

import styles from "./TorneosEditorial.module.css";

const editorialCopy = {
  es: {
    heroKicker: "Cargalo una vez. Usalo en todo el torneo.",
    heroTitle: ["Todo tu", "torneo.", "Un solo lugar."],
    heroBody:
      "Equipos, fixture, resultados, tabla, comunicación y contenido, trabajando sobre la misma información. Menos tareas repetidas. Más torneo.",
    start: "Empezar gratis",
    explore: "Ver cómo funciona",
    freeNote: "Gratis por torneo · Sin tarjeta",
    live: "EN JUEGO",
    round: "FECHA 07 / 12",
    next: "PRÓXIMO PARTIDO",
    stageFlow: ["RESULTADO", "TABLA", "PÁGINA PÚBLICA", "SOCIAL"],
    flowKicker: "Gestión conectada",
    flowTitle: "Hacé una vez el trabajo que hoy hacés cinco.",
    flowBody:
      "Cargás un resultado. La competencia se actualiza, los jugadores lo ven y el mismo dato queda listo para comunicar. Todo vive en una misma edición.",
    flowSteps: ["Armá", "Jugá", "Publicá"],
    flowDescriptions: [
      "Equipos, planteles, fixture y programación.",
      "Partidos, resultados, tabla, disciplina y estadísticas.",
      "Página pública, comunicados y piezas para redes.",
    ],
    connectedKicker: "El mismo dato sigue su camino",
    connectedTitle: "Todo sale de la misma edición.",
    connectedBody: "No son herramientas separadas. Cada paso alimenta al siguiente.",
    connectedSteps: ["Cargás el resultado", "Se actualiza la tabla", "El torneo queda público", "Generás la placa", "La fecha guarda sus fotos"],
    publicLabel: "arma2.com.ar/torneos/copa-primavera",
    publicTitle: "Compartí un link. El torneo se consulta solo.",
    publicBody:
      "Compartí un link y listo. Jugadores, equipos y familias ven fixture, resultados, tabla, goleadores y disciplina sin pedirte nada por WhatsApp.",
    noAccount: "Sin cuenta. Sin instalar nada. Sin perseguir al organizador.",
    socialKicker: "Social Studio",
    socialTitle: "Del resultado a la placa, sin volver a escribirlo.",
    socialBody:
      "Usá los datos que ya cargaste para crear piezas listas para publicar. Sin abrir otra herramienta y volver a copiar equipos, resultados o posiciones.",
    studioNote: "FREE incluye una opción. Premium suma más estilos y capacidad multimedia.",
    studioInput: "DATA DEL TORNEO",
    studioOutput: "LISTO PARA PUBLICAR",
    scorePoster: "RESULTADOS",
    tablePoster: "LA TABLA",
    photoPoster: "LA FECHA",
    mediaKicker: "Multimedia",
    mediaTitle: "Las fotos de cada fecha quedan con el torneo.",
    mediaBody: "Dejá de buscar el material entre WhatsApp, Drive, celulares y carpetas. Organizalo por edición y fecha, junto a la competencia a la que pertenece.",
    mediaNote: "Premium amplía la capacidad multimedia de esa edición.",
    mediaRound: "FECHA 07",
    mediaMatch: "Los Galácticos 3—1 Tiki-Taka",
    mediaCount: "CONTENIDO ASOCIADO",
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
    platforms: "Gestioná en web o app. Los jugadores consultan sin depender de vos.",
    faqKicker: "Antes de arrancar",
    finalTitle: "La próxima fecha puede estar ordenada.",
    finalBody: "Creá el torneo, cargá los equipos y compartí el link. El primer paso es gratis.",
    contact: "Hablar con nosotros",
  },
  en: {
    heroKicker: "Enter it once. Use it across the tournament.",
    heroTitle: ["Your whole", "tournament.", "One place."],
    heroBody:
      "Teams, fixtures, results, standings, communications and content, all working from the same information. Less repeated work. More tournament.",
    start: "Start for free",
    explore: "See how it works",
    freeNote: "Free per tournament · No card required",
    live: "LIVE",
    round: "ROUND 07 / 12",
    next: "NEXT MATCH",
    stageFlow: ["RESULT", "STANDINGS", "PUBLIC PAGE", "SOCIAL"],
    flowKicker: "Connected management",
    flowTitle: "Do once what currently takes five separate jobs.",
    flowBody:
      "Enter a result. The competition updates, players can see it and the same data is ready to communicate. It all lives in one edition.",
    flowSteps: ["Build", "Play", "Publish"],
    flowDescriptions: [
      "Teams, squads, fixtures and scheduling.",
      "Matches, results, standings, discipline and statistics.",
      "Public page, announcements and social content.",
    ],
    connectedKicker: "The same data keeps moving",
    connectedTitle: "Everything starts from the same edition.",
    connectedBody: "These are not separate tools. Each step feeds the next.",
    connectedSteps: ["Enter the result", "Standings update", "The tournament goes public", "Create the post", "Photos stay with the round"],
    publicLabel: "arma2.com.ar/tournaments/spring-cup",
    publicTitle: "Share one link. Let the tournament answer for itself.",
    publicBody:
      "Share one link and you’re done. Players, teams and families see fixtures, results, standings, scorers and discipline without chasing you on WhatsApp.",
    noAccount: "No account. No install. No chasing the organiser.",
    socialKicker: "Social Studio",
    socialTitle: "From result to post, without typing it twice.",
    socialBody:
      "Turn the data you already entered into content that is ready to publish. No second tool and no retyping teams, results or standings.",
    studioNote: "FREE includes one option. Premium adds more styles and media capacity.",
    studioInput: "TOURNAMENT DATA",
    studioOutput: "READY TO PUBLISH",
    scorePoster: "RESULTS",
    tablePoster: "STANDINGS",
    photoPoster: "MATCHDAY",
    mediaKicker: "Media",
    mediaTitle: "Every round's photos stay with the tournament.",
    mediaBody: "Stop hunting through WhatsApp, Drive, phones and folders. Organise the material by edition and round, next to the competition it belongs to.",
    mediaNote: "Premium expands media capacity for that edition.",
    mediaRound: "ROUND 07",
    mediaMatch: "Los Galácticos 3—1 Tiki-Taka",
    mediaCount: "ATTACHED CONTENT",
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
    platforms: "Manage on web or app. Players can follow without relying on you.",
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
      <div className={styles.stageFlow} aria-hidden="true">
        {copy.stageFlow.map((step, index) => (
          <span key={step}>{step}{index < copy.stageFlow.length - 1 ? <ArrowRight /> : null}</span>
        ))}
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
    <div className={styles.studioVisual} aria-label={content.socialStudio.description} role="img">
      <div className={styles.studioSource}>
        <span>{copy.studioInput}</span>
        <strong>Los Galácticos</strong>
        <div><b>03</b><i>—</i><b>01</b></div>
        <strong>Tiki-Taka</strong>
        <small>{copy.round}</small>
      </div>
      <div className={styles.studioBridge} aria-hidden="true">
        <span>{copy.studioOutput}</span>
        <ArrowRight />
      </div>
      <div className={styles.posterStage}>
        <div className={`${styles.poster} ${styles.posterScore}`}>
          <span>{copy.scorePoster}</span>
          <b>03—01</b>
          <small>{copy.round}</small>
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
    </div>
  );
}

function MediaGallery() {
  const content = useTorneosContent();
  const { locale } = useLanguage();
  const copy = editorialCopy[locale];

  return (
    <div className={styles.gallery} role="img" aria-label={content.media.description}>
      <div className={styles.galleryHeader}>
        <div><span>{copy.mediaRound}</span><strong>{content.media.galleryLabel}</strong></div>
        <small>{copy.mediaCount}</small>
      </div>
      <div className={styles.galleryGrid}>
        <div className={`${styles.galleryPhoto} ${styles.galleryPhotoMain}`}><span>01</span></div>
        <div className={`${styles.galleryPhoto} ${styles.galleryPhotoTeam}`}><span>02</span></div>
        <div className={`${styles.galleryPhoto} ${styles.galleryPhotoDetail}`}><span>03</span></div>
        <div className={`${styles.galleryPhoto} ${styles.galleryPhotoCrowd}`}><span>04</span></div>
      </div>
      <div className={styles.galleryFooter}>
        <span>{content.media.galleryCaption}</span>
        <strong>{copy.mediaMatch}</strong>
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

        <div className={styles.connectedMoment}>
          <div className={styles.connectedIntro}>
            <p className={styles.kicker}>{copy.connectedKicker}</p>
            <h2>{copy.connectedTitle}</h2>
            <p>{copy.connectedBody}</p>
          </div>
          <ol className={styles.connectedRail}>
            {copy.connectedSteps.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                {index < copy.connectedSteps.length - 1 ? <ArrowRight aria-hidden="true" /> : null}
              </li>
            ))}
          </ol>
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

        <div className={styles.mediaMoment} id="torneos-multimedia">
          <div className={styles.mediaCopy}>
            <p className={styles.kicker}>{copy.mediaKicker}</p>
            <h2>{copy.mediaTitle}</h2>
            <p>{copy.mediaBody}</p>
            <small>{copy.mediaNote}</small>
          </div>
          <MediaGallery />
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
