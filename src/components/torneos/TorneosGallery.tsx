"use client";

import Image from "next/image";

import { HorizontalGallery, type HorizontalGalleryProps } from "@/components/cinematic/HorizontalGallery";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { BRAND } from "@/lib/brand-assets";
import type { TorneosContent } from "@/lib/torneos-content";
import { cn } from "@/lib/utils";

import g from "./gallery.module.css";

type Art = TorneosContent["gallery"]["art"];

const THEME: HorizontalGalleryProps["theme"] = {
  background: "#05060f",
  glow: "radial-gradient(45% 50% at 15% 30%, rgba(108,77,255,.2), transparent 70%), radial-gradient(40% 45% at 85% 80%, rgba(39,184,255,.14), transparent 70%)",
  accent: "#27b8ff",
  gradient: "var(--grad-torneos)",
};

const GLOWS: Record<string, string> = {
  fixture: "rgba(108,77,255,.22)",
  disciplina: "rgba(255,77,94,.16)",
  multimedia: "rgba(39,184,255,.18)",
  colaboradores: "rgba(46,229,157,.14)",
  historial: "rgba(255,176,32,.14)",
};

const PHOTO_SPOTS = ["10% 30%", "80% 40%", "30% 70%", "60% 80%", "90% 20%", "45% 50%"];
const COLLABORATORS = [
  { initial: "N", color: "#27b8ff" },
  { initial: "M", color: "#ffb020" },
  { initial: "L", color: "#2ee59d" },
  { initial: "+7", color: "#ec4dff" },
];

function Illustration({ id, art }: { id: string; art: Art }) {
  const style = { background: `radial-gradient(60% 50% at 50% 40%, ${GLOWS[id]}, transparent 70%)` };
  switch (id) {
    case "fixture":
      return (
        <div className={g.art} style={style}>
          <div className={g.list}>
            <div className={g.row}>
              <span>
                <b>{art.round}</b>
                <small>{art.roundMeta}</small>
              </span>
              <span className={g.tag}>{art.league}</span>
            </div>
            {art.fixtures.map((match) => (
              <div key={match.teams} className={g.row}>
                <span>
                  {match.teams}
                  <small>{match.meta}</small>
                </span>
              </div>
            ))}
            <div className={g.row} style={{ opacity: 0.6 }}>
              <span>
                <b>{art.knockout}</b>
                <small>{art.knockoutMeta}</small>
              </span>
              <span className={g.tag}>{art.knockoutTag}</span>
            </div>
          </div>
        </div>
      );
    case "disciplina":
      return (
        <div className={g.art} style={style}>
          <div className={g.list}>
            {art.discipline.map((item) => (
              <div key={item.player} className={g.row}>
                <span className={g.who}>
                  <i className={item.card === "red" ? g.red : g.yellow} />
                  <span>
                    {item.player}
                    <small>{item.meta}</small>
                  </span>
                </span>
                {item.tag && <span className={cn(g.tag, g.tagRed)}>{item.tag}</span>}
              </div>
            ))}
          </div>
        </div>
      );
    case "multimedia":
      return (
        <div className={g.art} style={style}>
          <div className={g.stack}>
            <div className={g.photos}>
              {PHOTO_SPOTS.map((spot) => (
                <span key={spot}>
                  <Image src={BRAND.bgStadium.src} alt="" fill sizes="140px" quality={65} style={{ objectFit: "cover", objectPosition: spot }} />
                </span>
              ))}
            </div>
            <div className={g.row} style={{ width: "100%" }}>
              <span>{art.photos}</span>
              <span className={g.tag}>{art.photosTag}</span>
            </div>
          </div>
        </div>
      );
    case "colaboradores":
      return (
        <div className={g.art} style={style}>
          <div className={g.stack}>
            <div className={g.avatars}>
              {COLLABORATORS.map((person) => (
                <i key={person.initial} style={{ background: person.color }}>{person.initial}</i>
              ))}
            </div>
            <div className={g.row} style={{ width: "100%" }}>
              <span>{art.collaborators}</span>
              <span className={g.tag}>{art.collaboratorsTag}</span>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className={g.art} style={style}>
          <div className={g.list}>
            {art.versions.map((version, index) => (
              <div key={version.name} className={g.row} style={{ opacity: 1 - index * 0.25 }}>
                <span>
                  {version.name}
                  <small>{version.meta}</small>
                </span>
                {version.tag && <span className={g.tag}>{version.tag}</span>}
              </div>
            ))}
          </div>
        </div>
      );
  }
}

/** "El torneo entero, en orden.": the rest of the manager, card by card. */
export function TorneosGallery() {
  const content = useTorneosContent();
  const copy = content.gallery;
  return (
    <HorizontalGallery
      id="torneos-funciones"
      height="320svh"
      eyebrow={copy.eyebrow}
      title={
        <>
          {copy.title} <span className="text-grad-t">{copy.accent}</span>
        </>
      }
      titleClassName="disp-t text-[clamp(2.8rem,5.6vw,5.4rem)]"
      cards={copy.cards.map((card) => ({ ...card, art: <Illustration id={card.id} art={copy.art} /> }))}
      note={content.demoNote}
      theme={THEME}
    />
  );
}
