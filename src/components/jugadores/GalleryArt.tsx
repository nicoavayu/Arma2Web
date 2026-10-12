import Image from "next/image";

import { BRAND } from "@/lib/brand-assets";
import type { TranslationDictionary } from "@/lib/i18n";
import { PLAYER_COLORS } from "@/lib/jugadores-story";
import { cn } from "@/lib/utils";

import g from "./gallery.module.css";

type Art = TranslationDictionary["home"]["gallery"]["art"];

const RADAR_DOTS = [
  { id: "santi", left: "24%", top: "28%", delay: "0.1s" },
  { id: "juani", left: "74%", top: "22%", delay: "0.7s" },
  { id: "agus", left: "82%", top: "58%", delay: "1.3s" },
  { id: "fran", left: "62%", top: "80%", delay: "0.4s" },
  { id: "emi", left: "30%", top: "74%", delay: "1s" },
  { id: "tomi", left: "14%", top: "52%", delay: "1.6s" },
  { id: "lucho", left: "46%", top: "16%", delay: "2s" },
];

const KEEPERS = [
  { id: "santi", name: "Santi", km: "1,2 km" },
  { id: "fede", name: "Fede", km: "2,8 km" },
  { id: "emi", name: "Emi", km: "4,5 km" },
];

const RANKING = [
  { name: "Los Galácticos", pct: 72, color: "#ffb020" },
  { name: "Deportivo Tapita", pct: 60, color: "#27b8ff" },
  { name: "El Tanque", pct: 52, color: "#7b5cff" },
  { name: "Tiki-Taka", pct: 44, color: "#2ee59d" },
];

/** Decorative illustration for each gallery card (example data). */
export function GalleryArt({ id, art }: { id: string; art: Art }) {
  switch (id) {
    case "partido-automatico":
      return (
        <div className={g.art} style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(39,184,255,.22), transparent 70%)" }}>
          <div className={g.radar}>
            <i className={g.ring} />
            <i className={g.ring} />
            <i className={g.ring} />
            <i className={g.sweep} />
            <b className={g.me}>{art.you}</b>
            {RADAR_DOTS.map((dot) => (
              <span
                key={dot.id}
                className={g.dot}
                style={{ left: dot.left, top: dot.top, animationDelay: dot.delay, background: PLAYER_COLORS[dot.id], boxShadow: `0 0 20px ${PLAYER_COLORS[dot.id]}` }}
              >
                {dot.id[0].toUpperCase()}
              </span>
            ))}
          </div>
          <span className={cn(g.chip, g.chipTop)}>
            {art.compatible} <b>7/10</b>
          </span>
          <span className={cn(g.chip, g.chipBottom, g.chipOk)}>{art.created}</span>
        </div>
      );
    case "mercado-arqueros":
      return (
        <div className={g.art} style={{ background: "radial-gradient(60% 55% at 50% 30%, rgba(39,120,255,.25), transparent 70%)" }}>
          <div className={g.keepers}>
            <Image src={BRAND.awardGoalkeeper.src} alt="" width={BRAND.awardGoalkeeper.width} height={BRAND.awardGoalkeeper.height} sizes="120px" />
            {KEEPERS.map((keeper) => (
              <div key={keeper.id} className={g.keeper}>
                <span className={g.av} style={{ background: PLAYER_COLORS[keeper.id] }}>{keeper.name[0]}</span>
                <span className={g.keeperName}>
                  {keeper.name}
                  <small>
                    {keeper.km} · {art.available}
                  </small>
                </span>
                <span className={g.invite}>{art.invite}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case "equipos-desafios":
      return (
        <div className={g.art}>
          <div className={g.vsWrap}>
            <i className={g.glowA} />
            <i className={g.glowB} />
            <div className={g.vs}>
              <div className={cn(g.shield, g.shieldA)}>
                LG<small>GALÁCTICOS</small>
              </div>
              <b>VS</b>
              <div className={cn(g.shield, g.shieldB)}>
                DT<small>TAPITA</small>
              </div>
            </div>
            <span className={cn(g.chip, g.chipOk, g.chipInline)}>{art.accepted}</span>
          </div>
        </div>
      );
    case "ranking":
      return (
        <div className={g.art} style={{ background: "radial-gradient(60% 50% at 50% 40%, rgba(255,176,32,.14), transparent 70%)" }}>
          <div className={g.ranking}>
            <span className={cn(g.chip, g.chipInline)} style={{ justifySelf: "start", marginBottom: 4 }}>{art.ranking}</span>
            {RANKING.map((team, index) => (
              <div key={team.name} className={cn(g.rankRow, index === 0 && g.rankFirst)}>
                <span className={g.rankPos}>{index + 1}</span>
                <span>{team.name}</span>
                <span className={g.bar}>
                  <i style={{ width: `${team.pct}%`, background: team.color }} />
                </span>
                <b>{team.pct}%</b>
              </div>
            ))}
          </div>
        </div>
      );
    case "tu-carta":
      return (
        <div className={cn(g.art, g.cardArt)} style={{ background: "radial-gradient(55% 55% at 50% 45%, rgba(39,120,255,.3), transparent 70%)" }}>
          <Image src={BRAND.cardNico.src} alt="" width={BRAND.cardNico.width} height={BRAND.cardNico.height} sizes="200px" />
        </div>
      );
    default:
      return (
        <div className={g.art} style={{ background: "radial-gradient(60% 55% at 50% 45%, rgba(123,92,255,.25), transparent 70%)" }}>
          <div className={g.recurring}>
            {art.recurring.map((match, index) => (
              <div key={match.name} className={g.match} style={{ opacity: index ? 0.75 : 1 }}>
                <b>{match.name}</b>
                <small>{match.meta}</small>
                <div className={g.matchButtons}>
                  <span className={g.primary}>{art.create}</span>
                  <span className={g.ghost}>{art.history}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }
}
