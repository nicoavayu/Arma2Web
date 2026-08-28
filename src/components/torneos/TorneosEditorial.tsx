"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Check,
  Globe2,
  Menu,
  Monitor,
  PanelsTopLeft,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/components/LanguageProvider";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { getCreateTournamentTarget, getPremiumTournamentTarget, TORNEOS_CONTACT_HREF } from "@/lib/torneos-links";

import styles from "./TorneosEditorial.module.css";

const editorialCopy = {
  es: {
    nav: {
      how: "Cómo funciona",
      management: "Gestión",
      publicPage: "Página pública",
      social: "Social Studio",
      plans: "Planes",
      faq: "FAQ",
      back: "Volver a Arma2",
      open: "Abrir menú de Torneos",
      close: "Cerrar menú de Torneos",
      language: "Idioma",
    },
    heroTitle: ["Todo el torneo.", "Mucho menos trabajo."],
    heroBody:
      "Armá equipos y fixture, cargá resultados, actualizá la tabla, compartí la página pública, creá placas y ordená las fotos de cada fecha desde un solo lugar.",
    heroBenefits: [
      ["FIXTURE", "Organizá todo el torneo"],
      ["RESULTADOS", "Cargá al instante"],
      ["TABLA", "Actualizada en vivo"],
      ["PÁGINA PÚBLICA", "Compartí con tu comunidad"],
      ["SOCIAL STUDIO", "Placas y fotos por fecha"],
    ],
    start: "Empezar gratis",
    explore: "Ver cómo funciona",
    freeNote: "Empezá gratis · Sin tarjeta",
    live: "EN JUEGO",
    round: "FECHA 07 / 12",
    next: "PRÓXIMO PARTIDO",
    stageFlow: ["RESULTADO", "TABLA", "PÁGINA PÚBLICA", "SOCIAL"],
    flowKicker: "Una sola carga, todo conectado",
    flowTitle: "Armá. Programá. Cargá. Actualizá. Publicá.",
    flowBody:
      "La misma información acompaña cada fecha: equipos, fixture, resultados, tabla, estadísticas, página pública y Social Studio. Menos trabajo repetido para vos.",
    flowSteps: ["Armá", "Programá", "Cargá", "Actualizá", "Publicá"],
    flowDescriptions: [
      "Equipos y planteles.",
      "Fixture, fechas y horarios.",
      "Resultados y novedades.",
      "Tabla y estadísticas.",
      "Página pública, comunicados y contenido.",
    ],
    publicLabel: "arma2.com.ar/torneos/copa-primavera",
    publicTitle: "Compartí el torneo. Todo en un solo link.",
    publicBody:
      "Fixture, resultados, tabla, goleadores y disciplina siempre a mano, sin responder las mismas preguntas por WhatsApp.",
    noAccount: "Sin cuenta. Sin instalar nada.",
    platformTitle: "Web completa. App opcional.",
    platformBody:
      "La web es la experiencia completa para administrar tu torneo. La app de Arma2 en el celular es una opción adicional, no un requisito. La información es la misma y los jugadores pueden seguir todo desde la página pública.",
    socialKicker: "Estudio Social · Placas para redes",
    socialTitle: "Convertí cada fecha en contenido listo para publicar.",
    socialBody:
      "Usá los resultados, la tabla y los datos del torneo para generar placas sin volver a cargar la información.",
    studioInput: "DATA DEL TORNEO",
    studioOutput: "LISTO PARA PUBLICAR",
    scorePoster: "RESULTADOS",
    tablePoster: "LA TABLA",
    photoPoster: "LA FECHA",
    mediaKicker: "Multimedia",
    mediaTitle: "Todas las fotos del torneo, ordenadas por fecha.",
    mediaBody: "Dejá de buscar el material entre WhatsApp, Drive, celulares y carpetas. Guardá las fotos junto a la fecha y al torneo al que pertenecen.",
    mediaRound: "FECHA 07",
    mediaMatch: "Los Galácticos 3—1 Tiki-Taka",
    mediaCount: "CONTENIDO ASOCIADO",
    plansKicker: "Elegí por temporada, no por suscripción.",
    plansTitle: "Empezá con FREE. Profesionalizá con PREMIUM.",
    seasonPromise: "UN SOLO PREMIUM PARA TODA TU TEMPORADA.",
    seasonPromiseDetail: "Todas las categorías y competencias de esa temporada quedan incluidas.",
    freeLead: "Todo lo necesario para organizar y publicar tu temporada.",
    freeForever: "Sin vencimiento · temporadas FREE ilimitadas",
    premiumLead: "Más capacidad, más colaboradores y más salidas visuales para toda tu temporada.",
    included: "INCLUYE",
    premiumAdds: "INCLUYE TODO LO DE FREE, MÁS",
    launch: "PRECIO LANZAMIENTO",
    usual: "Habitual $49.900",
    forever: "Pago único · Sin suscripción",
    permanentAccess: "Premium queda activo permanentemente para esa temporada.",
    upgrade: "Activás Premium desde Plan, dentro de esa temporada.",
    seasonRenewal: "Cada nueva temporada vuelve a comenzar en FREE.",
    upcoming: "PRÓXIMAMENTE",
    viewPremium: "Elegir Premium",
    faqKicker: "Antes de arrancar",
    finalTitle: "La próxima fecha puede estar ordenada.",
    finalBody: "Creá el torneo, cargá los equipos y compartí el link. Podés empezar gratis.",
    contact: "Hablar con nosotros",
  },
  en: {
    nav: {
      how: "How it works",
      management: "Management",
      publicPage: "Public page",
      social: "Social Studio",
      plans: "Plans",
      faq: "FAQ",
      back: "Back to Arma2",
      open: "Open Tournaments menu",
      close: "Close Tournaments menu",
      language: "Language",
    },
    heroTitle: ["The whole tournament.", "Much less work."],
    heroBody:
      "Build teams and fixtures, enter results, keep the table current, share the public page, create posts, and organise every matchday photo in one place.",
    heroBenefits: [
      ["FIXTURES", "Organise the whole tournament"],
      ["RESULTS", "Enter them instantly"],
      ["STANDINGS", "Updated live"],
      ["PUBLIC PAGE", "Share with your community"],
      ["SOCIAL STUDIO", "Posts and photos by round"],
    ],
    start: "Start for free",
    explore: "See how it works",
    freeNote: "Start free · No card required",
    live: "LIVE",
    round: "ROUND 07 / 12",
    next: "NEXT MATCH",
    stageFlow: ["RESULT", "STANDINGS", "PUBLIC PAGE", "SOCIAL"],
    flowKicker: "Enter it once. Keep everything connected.",
    flowTitle: "Build. Schedule. Enter. Update. Publish.",
    flowBody:
      "The same information follows every round: teams, fixtures, results, standings, stats, public page and Social Studio. Less repeated work for you.",
    flowSteps: ["Build", "Schedule", "Enter", "Update", "Publish"],
    flowDescriptions: [
      "Teams and squads.",
      "Fixtures, rounds and kick-off times.",
      "Results and match updates.",
      "Standings and statistics.",
      "Public page, announcements and content.",
    ],
    publicLabel: "arma2.com.ar/tournaments/spring-cup",
    publicTitle: "Share the tournament. Everything in one link.",
    publicBody:
      "Fixtures, results, standings, top scorers and discipline always at hand, without answering the same WhatsApp questions.",
    noAccount: "No account. No install.",
    platformTitle: "Full web experience. Optional app.",
    platformBody:
      "The web is the complete tournament management experience. The Arma2 phone app is an additional option, not a requirement. The information is the same, and players can follow everything from the public page.",
    socialKicker: "Social Studio · Social media graphics",
    socialTitle: "Turn every round into content ready to publish.",
    socialBody:
      "Use results, standings and tournament data to generate posts without entering the information again.",
    studioInput: "TOURNAMENT DATA",
    studioOutput: "READY TO PUBLISH",
    scorePoster: "RESULTS",
    tablePoster: "STANDINGS",
    photoPoster: "MATCHDAY",
    mediaKicker: "Media",
    mediaTitle: "Every tournament photo, organised by round.",
    mediaBody: "Stop hunting through WhatsApp, Drive, phones and folders. Keep the photos next to the round and tournament they belong to.",
    mediaRound: "ROUND 07",
    mediaMatch: "Los Galácticos 3—1 Tiki-Taka",
    mediaCount: "ATTACHED CONTENT",
    plansKicker: "Choose per season, not by subscription.",
    plansTitle: "Start with FREE. Go further with PREMIUM.",
    seasonPromise: "ONE PREMIUM FOR YOUR WHOLE SEASON.",
    seasonPromiseDetail: "Every category and competition in that season is included.",
    freeLead: "Everything you need to organise and publish your season.",
    freeForever: "No expiration · unlimited FREE seasons",
    premiumLead: "More capacity, more collaborators and more visual outputs for your whole season.",
    included: "INCLUDED",
    premiumAdds: "INCLUDES EVERYTHING IN FREE, PLUS",
    launch: "LAUNCH PRICE",
    usual: "Usually $49,900",
    forever: "One payment · No subscription",
    permanentAccess: "Premium stays active permanently for that season.",
    upgrade: "Activate Premium from Plan inside that season.",
    seasonRenewal: "Every new season starts again on FREE.",
    upcoming: "COMING SOON",
    viewPremium: "Choose Premium",
    faqKicker: "Before you start",
    finalTitle: "Your next round can already be organised.",
    finalBody: "Create the tournament, add the teams and share the link. You can start for free.",
    contact: "Talk to us",
  },
} as const;

function ProductLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${styles.productLockup} ${compact ? styles.productLockupCompact : ""}`} aria-label="Arma2 Torneos">
      <Image
        src="/Logo Arma2_torneo.png"
        alt="Arma2 Torneos"
        width={1536}
        height={1024}
        className={styles.productLockupAsset}
        priority
      />
    </div>
  );
}

function TorneosNav() {
  const { locale, setLocale } = useLanguage();
  const copy = editorialCopy[locale];
  const [open, setOpen] = useState(false);
  const links = [
    { label: copy.nav.how, href: "#torneos-como-funciona" },
    { label: copy.nav.management, href: "#torneos-gestion" },
    { label: copy.nav.publicPage, href: "#torneos-pagina-publica" },
    { label: copy.nav.social, href: "#torneos-social-studio" },
    { label: copy.nav.plans, href: "#torneos-planes" },
    { label: copy.nav.faq, href: "#torneos-faq" },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={styles.torneosNav}>
      <a className={styles.navBrand} href="#torneos-hero" aria-label="Arma2 Torneos">
        <ProductLockup compact />
      </a>
      <nav className={styles.navLinks} aria-label="Arma2 Torneos">
        {links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
      </nav>
      <div className={styles.navActions}>
        <div className={styles.languageSwitch} role="group" aria-label={copy.nav.language}>
          {(["es", "en"] as const).map((value) => (
            <button type="button" key={value} aria-pressed={locale === value} onClick={() => setLocale(value)}>
              {value}
            </button>
          ))}
        </div>
        <Link className={styles.backLink} href="/">{copy.nav.back}<ArrowRight aria-hidden="true" /></Link>
        <button
          type="button"
          className={styles.mobileMenuButton}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="torneos-mobile-menu"
          aria-label={open ? copy.nav.close : copy.nav.open}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open ? (
        <div className={styles.mobileMenu} id="torneos-mobile-menu">
          <nav aria-label="Arma2 Torneos mobile">
            {links.map((link, index) => (
              <a href={link.href} key={link.href} onClick={() => setOpen(false)}>
                <span>{String(index + 1).padStart(2, "0")}</span>{link.label}
              </a>
            ))}
            <Link href="/" onClick={() => setOpen(false)}>{copy.nav.back}<ArrowRight aria-hidden="true" /></Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function ProductStage() {
  const content = useTorneosContent();

  return (
    <div className={styles.deviceStage} role="img" aria-label={content.hero.panel.ariaLabel}>
      <div className={styles.deviceHalo} aria-hidden="true" />
      <Image
        src="/pc_torneos.png"
        alt="Arma2 Torneos en web y celular, con resultados, tabla, próxima fecha y Social Studio"
        width={1672}
        height={941}
        className={styles.deviceImage}
        sizes="(max-width: 960px) 110vw, 62vw"
        loading="eager"
        priority
      />
    </div>
  );
}

function PrimaryCta({ label, dark = false, intent = "free" }: { label: string; dark?: boolean; intent?: "free" | "premium" }) {
  const target = intent === "premium" ? getPremiumTournamentTarget() : getCreateTournamentTarget();

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
  const pieces = locale === "es"
    ? [
      { src: "/torneos/social-studio/base/round_results--portrait--default.png", label: "Resultados", meta: "BASE · 4:5" },
      { src: "/torneos/social-studio/base/standings--portrait--default.png", label: "Tabla", meta: "BASE · 4:5" },
      { src: "/torneos/social-studio/base/scorers--portrait--default.png", label: "Goleadores", meta: "BASE · 4:5" },
      { src: "/torneos/social-studio/base/next_fixture--portrait--default.png", label: "Próxima fecha", meta: "BASE · 4:5" },
    ]
    : [
      { src: "/torneos/social-studio/base/round_results--portrait--default.png", label: "Results", meta: "BASE · 4:5" },
      { src: "/torneos/social-studio/base/standings--portrait--default.png", label: "Standings", meta: "BASE · 4:5" },
      { src: "/torneos/social-studio/base/scorers--portrait--default.png", label: "Top scorers", meta: "BASE · 4:5" },
      { src: "/torneos/social-studio/base/next_fixture--portrait--default.png", label: "Next round", meta: "BASE · 4:5" },
    ];

  return (
    <div className={styles.studioVisual} aria-label={content.socialStudio.description} role="img">
      <div className={styles.studioGallery}>
        {pieces.map((piece, index) => (
          <figure className={styles.studioPoster} key={piece.src}>
            <Image
              src={piece.src}
              alt={`${piece.label} generado con Social Studio de Arma2 Torneos`}
              width={1080}
              height={1350}
              sizes="(max-width: 700px) 76vw, 24vw"
            />
            <figcaption>
              <span>0{index + 1}</span>
              <strong>{piece.label}</strong>
              <small>{piece.meta}</small>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function PlatformShowcase() {
  const { locale } = useLanguage();
  const surfaces = locale === "es"
    ? [
      { icon: Monitor, label: "Web", detail: "Experiencia completa", src: "/torneos/interfaces/web-admin.jpg", className: styles.platformWeb },
      { icon: Smartphone, label: "Arma2 en el celular", detail: "Opción adicional · no es requisito", src: "/torneos/interfaces/arma2-mobile.jpg", className: styles.platformMobile },
      { icon: Globe2, label: "Página pública", detail: "Lo que ve tu comunidad", src: "/torneos/interfaces/public-page.jpg", className: styles.platformPublic },
    ]
    : [
      { icon: Monitor, label: "Web", detail: "Complete experience", src: "/torneos/interfaces/web-admin.jpg", className: styles.platformWeb },
      { icon: Smartphone, label: "Arma2 mobile", detail: "Additional option · not required", src: "/torneos/interfaces/arma2-mobile.jpg", className: styles.platformMobile },
      { icon: Globe2, label: "Public page", detail: "What your community sees", src: "/torneos/interfaces/public-page.jpg", className: styles.platformPublic },
    ];

  return (
    <div className={styles.platformShowcase}>
      <div className={styles.platformSignal} aria-hidden="true">
        <span>{locale === "es" ? "UNA MISMA INFORMACIÓN" : "ONE SOURCE OF TRUTH"}</span>
        <i />
      </div>
      <div className={styles.platformSurfaceGrid}>
        {surfaces.map(({ icon: Icon, label, detail, src, className }, index) => (
          <article className={`${styles.platformPanel} ${className}`} key={label}>
            <header>
              <span>0{index + 1}</span>
              <Icon aria-hidden="true" />
              <div><strong>{label}</strong><small>{detail}</small></div>
            </header>
            <div className={styles.platformCrop}>
              <Image src={src} alt={`${label}: ${detail}`} fill sizes="(max-width: 700px) 92vw, 26vw" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function MediaGallery() {
  const content = useTorneosContent();
  const { locale } = useLanguage();
  const copy = editorialCopy[locale];
  const photoSlots = locale === "es"
    ? [
      { src: "/torneos/gallery/match-01.png", label: "Partido de la fecha 7", className: styles.galleryPhotoMain },
      { src: "/torneos/gallery/match-02.png", label: "Disputa de pelota durante el partido", className: "" },
      { src: "/torneos/gallery/team-01.png", label: "Foto del equipo", className: "" },
      { src: "/torneos/gallery/match-03.png", label: "Acción de la fecha 7", className: "" },
      { src: "/torneos/gallery/goalkeeper-01.png", label: "Arquero durante el partido", className: "" },
      { src: "/torneos/gallery/celebration-01.png", label: "Celebración del equipo", className: "" },
    ]
    : [
      { src: "/torneos/gallery/match-01.png", label: "Round 7 match", className: styles.galleryPhotoMain },
      { src: "/torneos/gallery/match-02.png", label: "Challenge for the ball", className: "" },
      { src: "/torneos/gallery/team-01.png", label: "Team photo", className: "" },
      { src: "/torneos/gallery/match-03.png", label: "Round 7 action", className: "" },
      { src: "/torneos/gallery/goalkeeper-01.png", label: "Goalkeeper during the match", className: "" },
      { src: "/torneos/gallery/celebration-01.png", label: "Team celebration", className: "" },
    ];

  return (
    <div className={styles.gallery} role="img" aria-label={content.media.description}>
      <div className={styles.galleryHeader}>
        <div><span>{copy.mediaRound}</span><strong>{content.media.galleryLabel}</strong></div>
        <small>{copy.mediaCount}</small>
      </div>
      <div className={styles.galleryGrid}>
        {photoSlots.map((slot, index) => (
          <div
            className={`${styles.galleryPhoto} ${slot.className}`}
            key={slot.src}
          >
            <Image src={slot.src} alt={slot.label} fill sizes="(max-width: 700px) 90vw, 42vw" className={styles.galleryPhotoImage} />
            <div className={styles.galleryPhotoShade} />
            <span>{String(index + 1).padStart(2, "0")}</span>
          </div>
        ))}
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
  const premiumFeatures = content.plans.premium.features;
  const benefitIcons = [CalendarDays, BarChart3, PanelsTopLeft, Globe2, Sparkles];
  const renderPlanFeature = (feature: string) => {
    const [title, detail] = feature.split(" — ");

    return (
      <span className={styles.planFeatureCopy}>
        <strong>{title}</strong>
        {detail ? <small>{detail}</small> : null}
      </span>
    );
  };

  return (
    <div className={styles.page}>
      <TorneosNav />
      <section className={styles.hero} id="torneos-hero">
        <Image
          src="/BG_Torneos.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          quality={75}
          className={styles.heroBackground}
          priority
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <ProductLockup />
            <h1 aria-label={copy.heroTitle.join(" ")}>
              <span>{copy.heroTitle[0]}</span>
              <span className={styles.heroAccent}>{copy.heroTitle[1]}</span>
            </h1>
            <p className={styles.heroBody}>{copy.heroBody}</p>
            <div className={styles.heroActions}>
              <PrimaryCta label={copy.start} />
              <a className={styles.secondaryCta} href="#torneos-gestion">
                {copy.explore} <ArrowDown aria-hidden="true" />
              </a>
            </div>
            <small className={styles.freeNote}>{copy.freeNote}</small>
          </div>
          <ProductStage />
        </div>
        <div className={styles.heroBenefits} aria-label="Funciones principales de Arma2 Torneos">
          {copy.heroBenefits.map(([title, description], index) => {
            const Icon = benefitIcons[index];
            return <div key={title}><Icon aria-hidden="true" /><span><strong>{title}</strong><small>{description}</small></span></div>;
          })}
        </div>
      </section>

      <section className={styles.flow} id="torneos-como-funciona">
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>{copy.flowKicker}</p>
          <h2>{copy.flowTitle}</h2>
          <p>{copy.flowBody}</p>
        </div>
        <div className={styles.flowRail} id="torneos-gestion">
          {copy.flowSteps.map((step, index) => (
            <article className={styles.flowStep} key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
              <p>{copy.flowDescriptions[index]}</p>
            </article>
          ))}
        </div>

        <div className={styles.publicMoment} id="torneos-pagina-publica">
          <div className={styles.publicCopy}>
            <span className={styles.marginNumber}>02</span>
            <h2>{copy.publicTitle}</h2>
            <p>{copy.publicBody}</p>
            <strong>{copy.noAccount}</strong>
          </div>
          <PublicScoreboard />
        </div>

        <div className={styles.platformMoment}>
          <div>
            <span className={styles.marginNumber}>03</span>
            <h2>{copy.platformTitle}</h2>
          </div>
          <div className={styles.platformDetail}>
            <p>{copy.platformBody}</p>
            <PlatformShowcase />
          </div>
        </div>
      </section>

      <section className={styles.studio} id="torneos-social-studio">
        <div className={styles.studioCopy}>
          <p className={styles.kicker}>{copy.socialKicker}</p>
          <h2>{copy.socialTitle}</h2>
          <p>{copy.socialBody}</p>
        </div>
        <StudioPosters />

        <div className={styles.mediaMoment} id="torneos-multimedia">
          <div className={styles.mediaCopy}>
            <p className={styles.kicker}>{copy.mediaKicker}</p>
            <h2>{copy.mediaTitle}</h2>
            <p>{copy.mediaBody}</p>
          </div>
          <MediaGallery />
        </div>
      </section>

      <section className={styles.plans} id="torneos-planes">
        <div className={styles.plansHeader}>
          <p className={styles.kicker}>{copy.plansKicker}</p>
          <h2>{copy.plansTitle}</h2>
        </div>
        <div className={styles.seasonPromise}>
          <strong>{copy.seasonPromise}</strong>
          <span>{copy.seasonPromiseDetail}</span>
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
            <div className={styles.freeForever}>{copy.freeForever}</div>
            <span className={styles.listLabel}>{copy.included}</span>
            <ul>
              {freeFeatures.map((feature) => (
                <li
                  key={feature}
                  className={feature.includes("Arma2") ? styles.signatureFeature : undefined}
                >
                  <Check aria-hidden="true" />{renderPlanFeature(feature)}
                </li>
              ))}
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
              <span>{content.plans.premium.priceDetail}</span>
            </div>
            <div className={styles.usualPrice}>{copy.usual}</div>
            <div className={styles.permanent}>
              <strong>{copy.forever}</strong>
              <span>{copy.permanentAccess}</span>
            </div>
            <span className={styles.listLabel}>{copy.premiumAdds}</span>
            <ul>
              {premiumFeatures.map((feature) => <li key={feature}><Check aria-hidden="true" />{renderPlanFeature(feature)}</li>)}
            </ul>
            <PrimaryCta label={copy.viewPremium} intent="premium" />
            <small>{copy.upgrade}</small>
          </article>
        </div>
        <p className={styles.seasonRenewal}>{copy.seasonRenewal}</p>
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
