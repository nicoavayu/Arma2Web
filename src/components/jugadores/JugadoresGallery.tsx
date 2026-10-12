"use client";

import React from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { useSceneProgress } from "@/components/cinematic/useSceneProgress";
import type { TranslationDictionary } from "@/lib/i18n";

import { GalleryArt } from "./GalleryArt";
import { useStaticStory } from "./JugadoresStory";
import g from "./gallery.module.css";

type GalleryCopy = TranslationDictionary["home"]["gallery"];

const SECTION_ID = "funciones";
const SCENE_HEIGHT = "330svh";
/** Scroll progress at which the goalkeeper card is in view (target of the old #mercado-arqueros links). */
const KEEPERS_AT = 0.18;

function Heading({ copy }: { copy: GalleryCopy }) {
  return (
    <div className={g.head}>
      <p className={g.eyebrow}>{copy.eyebrow}</p>
      <h2 className={g.title}>
        {copy.title} <span className="text-grad-j">{copy.accent}</span>
      </h2>
    </div>
  );
}

function Cards({ copy }: { copy: GalleryCopy }) {
  return copy.cards.map((card) => (
    <article key={card.id} className={g.card} data-card={card.id}>
      <GalleryArt id={card.id} art={copy.art} />
      <div className={g.text}>
        <span className={g.label}>{card.label}</span>
        <h3 className={g.cardTitle}>{card.title}</h3>
      </div>
    </article>
  ));
}

export function JugadoresGallery() {
  return useStaticStory() ? <JugadoresGalleryStatic /> : <JugadoresGalleryScene />;
}

/** "Y si te falta algo": the vertical scroll slides the cards sideways. */
function JugadoresGalleryScene() {
  const { t } = useLanguage();
  const copy = t.home.gallery;
  const sectionRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLElement>(null);
  const progress = useSceneProgress(sectionRef);

  React.useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;
    let max = 0;
    const measure = () => {
      max = Math.max(0, track.scrollWidth - stage.clientWidth);
    };
    const apply = (p: number) => {
      track.style.transform = `translate3d(${-p * max}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const refresh = () => {
      measure();
      apply(progress.get());
    };
    refresh();
    const unsubscribe = progress.on("change", apply);
    window.addEventListener("resize", refresh);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", refresh);
    };
  }, [progress]);

  return (
    <section ref={sectionRef} id={SECTION_ID} className={g.scene} style={{ height: SCENE_HEIGHT }}>
      <span id="features" className={g.anchor} style={{ top: 0 }} />
      <span id="mercado-arqueros" className={g.anchor} style={{ top: `calc(${KEEPERS_AT} * (100% - 100svh))` }} />
      <div ref={stageRef} className={g.stage} data-scene="pinned">
        <div className={g.bg} />
        <Heading copy={copy} />
        <div ref={trackRef} className={g.track}>
          <Cards copy={copy} />
        </div>
        <div className={g.progress} aria-hidden="true">
          <i ref={barRef} />
        </div>
      </div>
    </section>
  );
}

/** Reduced motion: the same cards in a row you can swipe. */
export function JugadoresGalleryStatic() {
  const { t } = useLanguage();
  const copy = t.home.gallery;
  return (
    <section id={SECTION_ID} className={g.static}>
      <span id="features" />
      <span id="mercado-arqueros" />
      <Heading copy={copy} />
      <div className={g.track}>
        <Cards copy={copy} />
      </div>
    </section>
  );
}
