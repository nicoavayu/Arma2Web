import Image from "next/image";

import { BRAND } from "@/lib/brand-assets";
import { DEMO_RESULT } from "@/lib/torneos-demo";
import { standingsRows } from "@/lib/torneos-story";
import { cn } from "@/lib/utils";

import { TEAM_NAMES } from "./teams";
import type { TorneosStoryCopy } from "./types";
import s from "./screens.module.css";

const TOP_TEAMS = [...standingsRows()].sort((a, b) => a.rank1 - b.rank1).slice(0, 3);

/** A FREE Social Studio post (4:5, Base style, signed by Arma2) made from the demo tournament data. */
export function Poster({ kind, copy, className }: { kind: "results" | "standings"; copy: TorneosStoryCopy["posters"]; className?: string }) {
  const standings = kind === "standings";
  return (
    <div className={cn(s.poster, className)}>
      <Image src={BRAND.bgStadium.src} alt="" fill sizes="300px" />
      <div className={s.posterTop}>
        <Image src="/torneos/logo-torneos.png" alt="" width={311} height={36} />
        <span className={s.tag}>{copy.round}</span>
      </div>
      <div className={s.posterBody}>
        <small>Copa Primavera 2026</small>
        <h6 className={s.disp}>{standings ? copy.standings : copy.results}</h6>
        {standings
          ? TOP_TEAMS.map((row) => (
              <div key={row.teamId} className={s.posterRow}>
                <span>
                  {row.rank1 + 1}. {TEAM_NAMES[row.teamId]}
                </span>
                <b className={s.disp}>{row.pts1}</b>
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
