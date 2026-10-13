"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { CalendarDays, CircleDot, Globe, Image as ImageIcon, LayoutGrid, RectangleVertical, Sparkles, Table2 } from "lucide-react";

import { useProgressValue } from "@/components/cinematic/useProgressValue";
import { easeInOutCubic, lerp, seg } from "@/lib/motion-math";
import { DEMO_RESULT } from "@/lib/torneos-demo";
import { GOAL_TIMELINE, TORNEOS_STORY_CHAPTERS, goalsScored, scorersRows, standingsRows } from "@/lib/torneos-story";
import { cn } from "@/lib/utils";

import { TEAM_NAMES } from "./teams";
import type { TorneosStoryCopy } from "./types";
import s from "./screens.module.css";

const NAV_ICONS = [LayoutGrid, CalendarDays, CircleDot, Table2, RectangleVertical, Globe, Sparkles, ImageIcon] as const;
const CREST: Record<string, string> = { lg: s.lg, tt: s.tt, dt: s.dt, et: s.et };
const [CH1, CH2, CH3, CH4] = TORNEOS_STORY_CHAPTERS;
const STANDINGS = standingsRows();
const SCORERS = scorersRows();

/** Chapter-1 progress (goals typed in) and chapter-2 progress (table update) for global progress `p`. */
const typing = (p: number) => seg(p, CH1[0], CH1[1]);
const update = (p: number) => seg(p, CH2[0] + 0.03, CH2[0] + 0.13);

function StandingRow({ progress, row }: { progress: MotionValue<number>; row: (typeof STANDINGS)[number] }) {
  const transform = useTransform(progress, (p) => `translateY(${lerp(row.rank0, row.rank1, easeInOutCubic(update(p))) * 2.4}em)`);
  const state = useProgressValue(progress, (p) => {
    const t = update(p);
    return `${t > 0.5 ? row.rank1 + 1 : row.rank0 + 1}|${Math.round(lerp(row.pj0, row.pj1, seg(t, 0, 0.6)))}|${Math.round(lerp(row.pts0, row.pts1, seg(t, 0, 0.6)))}|${row.pts1 !== row.pts0 && t > 0.05 ? 1 : 0}`;
  });
  const [position, played, points, on] = state.split("|");
  return (
    <motion.div className={cn(s.row, on === "1" && s.rowOn)} style={{ transform }}>
      <span className={s.pos}>{position}</span>
      <span className={s.teamName}>
        <i className={CREST[row.teamId]}>{row.teamId.toUpperCase()}</i>
        {row.name}
      </span>
      <span className={s.played}>{played}</span>
      <b>{points}</b>
    </motion.div>
  );
}

/**
 * The Torneos manager "Cargar resultado" screen, driven by the story timeline
 * (torneos-story.ts): goals in step 1, table and scorers in step 2, status
 * lines through steps 2–4. `motionValue(1)` renders the final state.
 */
export function DashboardResultado({ progress, copy }: { progress: MotionValue<number>; copy: TorneosStoryCopy["dashboard"] }) {
  const state = useProgressValue(progress, (p) => {
    const t = update(p);
    const done = [p > CH2[0] + 0.1, p > CH3[0] + 0.04, p > CH4[0] + 0.03].map(Number).join("");
    return `${goalsScored(typing(p))}|${typing(p) > 0.8 || p >= CH2[0] ? 1 : 0}|${t > 0.6 ? 1 : 0}|${p > CH2[0] + 0.12 && p < CH3[0] + 0.06 ? 1 : 0}|${done}`;
  });
  const [goalsText, savedText, sortedText, toastText, doneText] = state.split("|");
  const goals = Number(goalsText);
  const scored = GOAL_TIMELINE.slice(0, goals);
  const home = scored.filter((goal) => goal.teamId === DEMO_RESULT.homeId).length;
  const away = scored.filter((goal) => goal.teamId === DEMO_RESULT.awayId).length;
  const saved = savedText === "1";
  const sorted = sortedText === "1";
  const scorers = sorted ? [...SCORERS].sort((a, b) => a.rank1 - b.rank1) : SCORERS;

  return (
    <div className={s.dash}>
      <aside className={s.side}>
        <Image src="/torneos/logo-torneos.png" alt="" width={311} height={36} />
        {copy.nav.map((label, index) => {
          const Icon = NAV_ICONS[index];
          return (
            <div key={label}>
              {index === 5 && <hr className={s.sep} />}
              <span className={cn(s.navItem, index === 2 && s.navOn)}>
                <Icon className={s.navIcon} />
                {label}
              </span>
            </div>
          );
        })}
      </aside>
      <div className={s.main}>
        <div className={s.head}>
          <div>
            <small>{copy.crumb}</small>
            <h3 className={s.disp}>{copy.title}</h3>
          </div>
          <span className={s.live}>{copy.live}</span>
        </div>
        <div className={s.grid}>
          <section className={cn(s.card, s.res)}>
            <h4>
              <span>{copy.match}</span>
              <span>{copy.matchMeta}</span>
            </h4>
            <div className={s.score}>
              <div className={s.team}>
                <span className={cn(s.crest, s.lg)}>LG</span>
                {TEAM_NAMES.lg}
              </div>
              <div className={cn(s.nums, s.disp)}>
                <b>{home}</b>
                <span>–</span>
                <b>{away}</b>
              </div>
              <div className={s.team}>
                <span className={cn(s.crest, s.tt)}>TT</span>
                {TEAM_NAMES.tt}
              </div>
            </div>
            <div className={s.scorers}>
              {GOAL_TIMELINE.map((goal, index) => {
                const away = goal.teamId === DEMO_RESULT.awayId;
                return (
                  <span key={index} className={cn(s.goal, index < goals && s.goalOn, away && s.goalAway)} style={{ gridColumn: away ? 2 : 1 }}>
                    {!away && <i className={s.ball} />}
                    {goal.player} <small>{goal.minute}&apos;</small>
                    {away && <i className={s.ball} />}
                  </span>
                );
              })}
            </div>
            {copy.status.map((label, index) => (
              <div key={label} className={cn(s.status, index === 0 && s.statusFirst)} data-done={doneText[index] === "1"}>
                <i />
                {label}
              </div>
            ))}
            <div className={cn(s.save, saved && s.saved)}>{saved ? `✓ ${copy.saved}` : copy.save}</div>
          </section>
          <section className={s.card}>
            <h4>
              <span>{copy.standings}</span>
            </h4>
            <div className={s.thead}>
              <span>#</span>
              <span>{copy.team}</span>
              <span>{copy.played}</span>
              <span>{copy.points}</span>
            </div>
            <div className={s.rows}>
              {STANDINGS.map((row) => (
                <StandingRow key={row.teamId} progress={progress} row={row} />
              ))}
            </div>
          </section>
          <section className={s.card}>
            <h4>
              <span>{copy.scorers}</span>
            </h4>
            {scorers.map((row) => (
              <div key={row.player} className={cn(s.scorer, row.goals1 !== row.goals0 && sorted && s.scorerOn)}>
                <span>{row.player}</span>
                <b>{sorted ? row.goals1 : row.goals0}</b>
              </div>
            ))}
          </section>
        </div>
      </div>
      <div className={cn(s.toast, toastText === "1" && s.toastOn)}>✓ {copy.toast}</div>
    </div>
  );
}
