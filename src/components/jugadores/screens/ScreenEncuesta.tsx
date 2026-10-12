"use client";

import type { MotionValue } from "framer-motion";
import { Check } from "lucide-react";

import { useProgressValue } from "@/components/cinematic/useProgressValue";
import { PLAYER_COLORS, SURVEY_MVP, SURVEY_TILES, playerName } from "@/lib/jugadores-story";

import type { StoryScreensCopy } from "./types";
import s from "./screens.module.css";

/** Chapter 4: post-match survey, step 3 of 8 ("¿Quién fue la figura?"); Juani gets picked. */
export function ScreenEncuesta({ progress, copy }: { progress: MotionValue<number>; copy: StoryScreensCopy["survey"] }) {
  const picked = useProgressValue(progress, (c) => c > 0.16);

  return (
    <div className={s.scr}>
      <div className={s.svHead}>
        <small className={s.xs}>{copy.step}</small>
        <div className={s.svProg}>
          {Array.from({ length: 8 }, (_, i) => (
            <i key={i} className={i < 3 ? s.svProgOn : undefined} />
          ))}
        </div>
      </div>
      <h4 className={`${s.svTitle} ${s.lg}`}>{copy.title}</h4>
      <div className={s.svGrid}>
        {SURVEY_TILES.map((id) => (
          <div key={id} className={`${s.svT} ${picked && id === SURVEY_MVP ? s.svTOn : ""}`}>
            <span className={`${s.badge} ${s.xs}`}><Check className={s.icon} /></span>
            <span className={s.av} style={{ background: PLAYER_COLORS[id] }}>{playerName(id)[0]}</span>
            <span className={s.sm} style={{ fontWeight: 600 }}>{playerName(id)}</span>
          </div>
        ))}
      </div>
      <p className={`${s.svNote} ${s.xs}`}>{copy.hint}</p>
      <div className={s.cta}>
        <span className={s.md}>{copy.next}</span>
      </div>
    </div>
  );
}
