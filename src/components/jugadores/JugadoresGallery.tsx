"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { FeatureGrid, type FeatureGridProps } from "@/components/cinematic/FeatureGrid";

import { GalleryArt } from "./GalleryArt";

const THEME: FeatureGridProps["theme"] = {
  background: "#06050f",
  glow: "radial-gradient(50% 50% at 20% 30%, rgba(123,92,255,.22), transparent 70%), radial-gradient(45% 45% at 85% 75%, rgba(236,77,255,.12), transparent 70%)",
  accent: "#b8a8ff",
};

/** "Y si te falta algo, Arma2 lo encuentra": every feature at once. */
export function JugadoresGallery() {
  const { t } = useLanguage();
  const copy = t.home.gallery;
  return (
    <FeatureGrid
      id="funciones"
      anchors={[{ id: "features" }, { id: "mercado-arqueros", card: "mercado-arqueros" }]}
      eyebrow={copy.eyebrow}
      title={
        <>
          {copy.title} <span className="text-grad-j">{copy.accent}</span>
        </>
      }
      titleClassName="text-[clamp(2.2rem,5vw,4.6rem)] font-extrabold leading-none tracking-[-0.045em]"
      cards={copy.cards.map((card) => ({ ...card, art: <GalleryArt id={card.id} art={copy.art} /> }))}
      note={t.common.demoNote}
      theme={THEME}
    />
  );
}
