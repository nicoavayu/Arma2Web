import Image from "next/image";

import { BRAND } from "@/lib/brand-assets";
import { DEMO_RESULT } from "@/lib/torneos-demo";
import { scorersRows } from "@/lib/torneos-story";
import { cn } from "@/lib/utils";

import { TEAM_NAMES } from "./teams";
import type { TorneosStoryCopy } from "./types";
import s from "./screens.module.css";

const TOP_SCORERS = [...scorersRows()].sort((a, b) => a.rank1 - b.rank1).slice(0, 3);

/** A Social Studio post (4:5) made from the demo tournament data. */
export function Poster({ kind, copy, className }: { kind: "results" | "scorers"; copy: TorneosStoryCopy["posters"]; className?: string }) {
  const scorers = kind === "scorers";
  return (
    <div className={cn(s.poster, className)}>
      <Image src={BRAND.bgStadium.src} alt="" fill sizes="300px" />
      <div className={s.posterTop}>
        <Image src="/torneos/logo-torneos.png" alt="" width={1452} height={168} />
        <span className={cn(s.tag, scorers && s.tagPremium)}>{scorers ? copy.scorersTag : copy.round}</span>
      </div>
      <div className={s.posterBody}>
        <small>Copa Primavera{scorers ? ` · ${copy.round}` : " 2026"}</small>
        <h6 className={s.disp}>{scorers ? copy.scorers : copy.results}</h6>
        {scorers
          ? TOP_SCORERS.map((row) => (
              <div key={row.player} className={s.posterRow}>
                <span>
                  {row.player} · {TEAM_NAMES[row.teamId]}
                </span>
                <b className={s.disp}>{row.goals1}</b>
              </div>
            ))
          : [
              [DEMO_RESULT.homeId, DEMO_RESULT.homeGoals],
              [DEMO_RESULT.awayId, DEMO_RESULT.awayGoals],
            ].map(([team, goals]) => (
              <div key={team} className={s.posterRow}>
                <span>{TEAM_NAMES[team]}</span>
                <b className={s.disp}>{goals}</b>
              </div>
            ))}
      </div>
    </div>
  );
}
