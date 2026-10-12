"use client";

import type { MotionValue } from "framer-motion";
import { Check, ChevronLeft, Share2 } from "lucide-react";

import { useProgressValue } from "@/components/cinematic/useProgressValue";
import { CONFIRM_ORDER, GUEST_ID, PLAYER_COLORS, confirmedCount, playerName } from "@/lib/jugadores-story";
import { DEMO_PLAYERS } from "@/lib/balance-demo";

import type { StoryScreensCopy } from "./types";
import s from "./screens.module.css";

const KEEPERS = new Set(DEMO_PLAYERS.filter((player) => player.goalkeeper).map((player) => player.id));

/** Chapter 1: the match fills up from 1 to 10 confirmed; Pipe joins as a guest from the link. */
export function ScreenConvocatoria({ progress, copy }: { progress: MotionValue<number>; copy: StoryScreensCopy["match"] }) {
  const count = useProgressValue(progress, confirmedCount);

  return (
    <div className={s.scr}>
      <div className={s.topbar}>
        <span className={s.ib}><ChevronLeft className={s.icon} /></span>
        <b className={s.sm}>{copy.title}</b>
        <span className={s.ib}><Share2 className={s.icon} /></span>
      </div>
      <div className={`${s.match} ${s.gc}`}>
        <b className={s.lg}>{copy.name}</b>
        <div className={`${s.chips} ${s.sm}`}>
          {copy.chips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
      </div>
      <div className={s.conf}>
        <span className={s.sm}>{copy.confirmed}</span>
        <b className={s.md}>{count}/10</b>
      </div>
      <div className={s.bar}>
        <i className={s.barFill} style={{ width: `${count * 10}%` }} />
      </div>
      <div className={s.plist}>
        {CONFIRM_ORDER.map((id, index) => (
          <div key={id} className={`${s.prow} ${index < count ? s.prowOn : ""}`}>
            <span className={`${s.av} ${s.xs}`} style={{ background: PLAYER_COLORS[id] }}>{playerName(id)[0]}</span>
            <span className={`${s.nm} ${s.sm}`}>{playerName(id)}</span>
            {KEEPERS.has(id) && <span className={`${s.arq} ${s.xs}`}>{copy.keeper}</span>}
            {id === GUEST_ID && <span className={`${s.guest} ${s.xs}`}>{copy.guest}</span>}
            <span className={s.ok}><Check className={s.icon} /></span>
          </div>
        ))}
      </div>
      <div className={s.cta}>
        <Share2 className={s.icon} />
        <span className={s.md}>{copy.share}</span>
      </div>
    </div>
  );
}
