"use client";

import Image from "next/image";
import { Bell } from "lucide-react";

import { HorizontalGallery, type HorizontalGalleryProps } from "@/components/cinematic/HorizontalGallery";
import { useLanguage } from "@/components/LanguageProvider";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { BRAND } from "@/lib/brand-assets";
import type { Locale } from "@/lib/i18n";
import type { TorneosContent } from "@/lib/torneos-content";
import { EJEMPLO_FIXTURE, formatKickoff } from "@/lib/torneos-ejemplo";
import { cn } from "@/lib/utils";

import { TEAM_NAMES } from "./screens/teams";
import g from "./gallery.module.css";

/** The example tournament's rescheduled match, so the card matches /ejemplo. */
const MOVED = EJEMPLO_FIXTURE.find((match) => match.rescheduledFrom)!;

const THEME: HorizontalGalleryProps["theme"] = {
  background: "#05060f",
  glow: "radial-gradient(45% 50% at 15% 30%, rgba(108,77,255,.2), transparent 70%), radial-gradient(40% 45% at 85% 80%, rgba(39,184,255,.14), transparent 70%)",
  accent: "#27b8ff",
  gradient: "var(--grad-torneos)",
};

const GLOWS: Record<string, string> = {
  inscripcion: "rgba(46,229,157,.14)",
  fixture: "rgba(108,77,255,.22)",
  reprogramacion: "rgba(255,176,32,.14)",
  disciplina: "rgba(255,77,94,.16)",
  multimedia: "rgba(39,184,255,.18)",
  colaboradores: "rgba(46,229,157,.14)",
};

const PHOTO_SPOTS = ["10% 30%", "80% 40%", "30% 70%", "60% 80%", "90% 20%", "45% 50%"];
const COLLABORATORS = [
  { initial: "N", color: "#27b8ff" },
  { initial: "M", color: "#ffb020" },
  { initial: "L", color: "#2ee59d" },
  { initial: "+7", color: "#ec4dff" },
];

function Illustration({ id, content, locale }: { id: string; content: TorneosContent; locale: Locale }) {
  const art = content.gallery.art;
  const style = { background: `radial-gradient(60% 50% at 50% 40%, ${GLOWS[id]}, transparent 70%)` };
  switch (id) {
    case "inscripcion":
      return (
        <div className={g.art} style={style}>
          <div className={g.list}>
            <span className={g.inbox}>
              {art.registration.title}
              <small>{art.registration.source}</small>
            </span>
            {art.registration.requests.map((request, i) => (
              <div key={request.team} className={g.row}>
                <span>
                  {request.team}
                  <small>{request.meta}</small>
                </span>
                <span className={cn(g.tag, i > 0 && g.tagAmber)}>{request.tag}</span>
              </div>
            ))}
            <div className={g.actions}>
              {art.registration.actions.map((action, i) => (
                <span key={action} className={cn(g.action, i === 0 && g.actionPrimary)}>
                  {action}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    case "reprogramacion":
      return (
        <div className={g.art} style={style}>
          <div className={g.list}>
            <span className={g.inbox}>
              <Bell size={14} />
              {art.reschedule.inbox}
            </span>
            <div className={cn(g.row, g.notice)}>
              <span>
                <b>{art.reschedule.title}</b>
                <small>{`${TEAM_NAMES[MOVED.homeId]} vs ${TEAM_NAMES[MOVED.awayId]}`}</small>
                <small>{`${art.reschedule.before}: ${formatKickoff(MOVED.rescheduledFrom!, locale)} · ${art.reschedule.now}: ${formatKickoff(MOVED.kickoff, locale)}`}</small>
              </span>
            </div>
            <div className={cn(g.row, g.wideOnly)} style={{ opacity: 0.75 }}>
              <span>{`${TEAM_NAMES[MOVED.homeId]} vs ${TEAM_NAMES[MOVED.awayId]}`}</span>
              <span className={cn(g.tag, g.tagAmber)}>{content.ejemplo.fixture.rescheduled}</span>
            </div>
          </div>
        </div>
      );
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
      return null;
  }
}

/** "El torneo entero, en orden.": the rest of the manager, card by card. */
export function TorneosGallery() {
  const { locale } = useLanguage();
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
      cards={copy.cards.map((card) => ({ ...card, art: <Illustration id={card.id} content={content} locale={locale} /> }))}
      note={content.demoNote}
      theme={THEME}
    />
  );
}
