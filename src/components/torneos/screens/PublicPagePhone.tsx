import Image from "next/image";

import { BRAND } from "@/lib/brand-assets";
import { DEMO_RESULT } from "@/lib/torneos-demo";
import { scorersRows, standingsRows } from "@/lib/torneos-story";
import { cn } from "@/lib/utils";

import { TEAM_NAMES } from "./teams";
import type { TorneosStoryCopy } from "./types";
import s from "./screens.module.css";

const TABLE = [...standingsRows()].sort((a, b) => a.rank1 - b.rank1);
const TOP_SCORERS = [...scorersRows()].sort((a, b) => a.rank1 - b.rank1).slice(0, 2);

/** The tournament's public page on a phone, already updated with the result. */
export function PublicPagePhone({ copy }: { copy: TorneosStoryCopy["publicPage"] }) {
  return (
    <div className={s.pub}>
      <div className={s.pubHero}>
        <Image src={BRAND.bgStadium.src} alt="" fill sizes="300px" />
        <small>{copy.kind}</small>
        <b className={s.disp}>Copa Primavera 2026</b>
      </div>
      <div className={s.pubBody}>
        <div className={s.pubCard}>
          <h5>{copy.lastResult}</h5>
          <div className={s.pubScore}>
            <span>{TEAM_NAMES[DEMO_RESULT.homeId]}</span>
            <b className={s.disp}>
              {DEMO_RESULT.homeGoals} – {DEMO_RESULT.awayGoals}
            </b>
            <span>{TEAM_NAMES[DEMO_RESULT.awayId]}</span>
          </div>
        </div>
        <div className={s.pubCard}>
          <h5>{copy.standings}</h5>
          {TABLE.map((row, index) => (
            <div key={row.teamId} className={cn(s.pubRow, index === 0 && s.pubRowOn)}>
              <span>{index + 1}</span>
              <span>{row.name}</span>
              <b>{row.pts1}</b>
            </div>
          ))}
        </div>
        <div className={s.pubCard}>
          <h5>{copy.scorers}</h5>
          {TOP_SCORERS.map((row, index) => (
            <div key={row.player} className={cn(s.pubRow, index === 0 && s.pubRowOn)}>
              <span>{index + 1}</span>
              <span>{row.player}</span>
              <b>{row.goals1}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
