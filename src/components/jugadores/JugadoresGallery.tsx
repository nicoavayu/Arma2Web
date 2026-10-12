"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { HorizontalGallery, HorizontalGalleryStatic, type HorizontalGalleryProps } from "@/components/cinematic/HorizontalGallery";

import { GalleryArt } from "./GalleryArt";

const THEME: HorizontalGalleryProps["theme"] = {
  background: "#06050f",
  glow: "radial-gradient(50% 50% at 20% 30%, rgba(123,92,255,.22), transparent 70%), radial-gradient(45% 45% at 85% 75%, rgba(39,184,255,.16), transparent 70%)",
  accent: "#27b8ff",
  gradient: "var(--grad-jugadores)",
};

/** Scroll progress at which the goalkeeper card is in view (target of the old #mercado-arqueros links). */
const KEEPERS_AT = 0.18;

function useGalleryProps(): HorizontalGalleryProps {
  const { t } = useLanguage();
  const copy = t.home.gallery;
  return {
    id: "funciones",
    height: "330svh",
    anchors: [
      { id: "features", at: 0 },
      { id: "mercado-arqueros", at: KEEPERS_AT },
    ],
    eyebrow: copy.eyebrow,
    title: (
      <>
        {copy.title} <span className="text-grad-j">{copy.accent}</span>
      </>
    ),
    titleClassName: "text-[clamp(2.2rem,5vw,4.6rem)] font-extrabold leading-none tracking-[-0.045em]",
    cards: copy.cards.map((card) => ({ ...card, art: <GalleryArt id={card.id} art={copy.art} /> })),
    theme: THEME,
  };
}

/** "Y si te falta algo, Arma2 lo encuentra": the vertical scroll slides the cards sideways. */
export function JugadoresGallery() {
  return <HorizontalGallery {...useGalleryProps()} />;
}

/** Reduced-motion version (also used in tests). */
export function JugadoresGalleryStatic() {
  return <HorizontalGalleryStatic {...useGalleryProps()} />;
}
