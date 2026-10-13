"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { ChevronLeft, Share2 } from "lucide-react";

import { useProgressValue } from "@/components/cinematic/useProgressValue";
import type { DemoPlayer } from "@/lib/balance-demo";
import { PLAYER_COLORS, STORY_SPLIT } from "@/lib/jugadores-story";
import { backOut, clamp, easeInOutCubic, easeOutCubic, lerp, seg } from "@/lib/motion-math";

import type { StoryScreensCopy } from "./types";
import s from "./screens.module.css";

/** Width of the rows box in screen em (screen 23.92em minus 1.25em padding each side). */
const BOX_EM = 21.42;
const ROW_STEP_EM = 2.45 + 0.42;

const byScore = (a: DemoPlayer, b: DemoPlayer) => b.score - a.score;
const TEAM_A = [...STORY_SPLIT.teamA].sort(byScore);
const TEAM_B = [...STORY_SPLIT.teamB].sort(byScore);
/** Everyone in one list (by score) before the split, then each to their team and slot. */
const ROWS = [...TEAM_A, ...TEAM_B]
  .sort(byScore)
  .map((player, index) => {
    const inA = TEAM_A.includes(player);
    return { player, index, team: inA ? ("A" as const) : ("B" as const), slot: (inA ? TEAM_A : TEAM_B).indexOf(player) };
  });

const splitAt = (c: number, index: number) => easeInOutCubic(seg(c, 0.14 + index * 0.022, 0.44 + index * 0.022));

function Row({ progress, row, keeperLabel }: { progress: MotionValue<number>; row: (typeof ROWS)[number]; keeperLabel: string }) {
  const transform = useTransform(progress, (c) => {
    const t = splitAt(c, row.index);
    const x = row.team === "A" ? 0 : BOX_EM * 0.515;
    return `translate3d(${lerp(0, x, t)}em, ${lerp(row.index * ROW_STEP_EM, row.slot * ROW_STEP_EM, t)}em, 0)`;
  });
  const width = useTransform(progress, (c) => `${lerp(BOX_EM, BOX_EM * 0.485, splitAt(c, row.index))}em`);
  const placed = useProgressValue(progress, (c) => splitAt(c, row.index) > 0.6);
  const { player } = row;

  return (
    <motion.div className={`${s.row} ${placed ? (row.team === "A" ? s.rowA : s.rowB) : ""}`} style={{ transform, width }}>
      <span className={`${s.av} ${s.xs}`} style={{ background: PLAYER_COLORS[player.id] }}>{player.name[0]}</span>
      <span className={`${s.nm} ${s.sm}`}>{player.name}</span>
      {player.goalkeeper && <span className={`${s.arq} ${s.xs}`}>{keeperLabel}</span>}
      <span className={`${s.score} ${s.sm}`}>{player.score.toFixed(1)}</span>
    </motion.div>
  );
}

/** Chapter 3: the list splits into two teams; totals count up to 33.6 / 33.5. */
export function ScreenEquipos({ progress, copy }: { progress: MotionValue<number>; copy: StoryScreensCopy["teams"] }) {
  const sums = useProgressValue(progress, (c) => {
    const k = easeInOutCubic(seg(c, 0.5, 0.7));
    return `${(STORY_SPLIT.totalA * k).toFixed(1)}|${(STORY_SPLIT.totalB * k).toFixed(1)}`;
  });
  const [sumA, sumB] = sums.split("|");
  const headOpacity = useTransform(progress, (c) => seg(c, 0.3, 0.48));
  const poolOpacity = useTransform(progress, (c) => 1 - seg(c, 0.08, 0.2));
  const balOpacity = useTransform(progress, (c) => clamp(seg(c, 0.68, 0.8) * 2));
  const balTransform = useTransform(progress, (c) => `translateY(${(1 - easeOutCubic(seg(c, 0.68, 0.8))) * 14}px)`);
  const diffTransform = useTransform(progress, (c) => `scale(${0.6 + 0.4 * backOut(seg(c, 0.68, 0.8))})`);
  const diff = copy.diff.replace("{diff}", STORY_SPLIT.diff.toFixed(1));

  return (
    <div className={s.scr}>
      <div className={s.topbar}>
        <span className={s.ib}><ChevronLeft className={s.icon} /></span>
        <b className={s.sm}>{copy.title}</b>
        <span className={s.ib}><Share2 className={s.icon} /></span>
      </div>
      <motion.div className={s.teamsH} style={{ opacity: headOpacity }}>
        <div className={`${s.th} ${s.thA}`}>
          <small className={s.xs}>{copy.teamA}</small>
          <b className={s.lg}>{sumA}</b>
        </div>
        <div className={`${s.th} ${s.thB}`}>
          <small className={s.xs}>{copy.teamB}</small>
          <b className={s.lg}>{sumB}</b>
        </div>
      </motion.div>
      <motion.div className={`${s.rowsLbl} ${s.xs}`} style={{ opacity: poolOpacity }}>{copy.pool}</motion.div>
      <div className={s.rows}>
        {ROWS.map((row) => (
          <Row key={row.player.id} progress={progress} row={row} keeperLabel={copy.keeper} />
        ))}
      </div>
      <motion.div className={s.bal} style={{ opacity: balOpacity, transform: balTransform }}>
        <div className={`${s.balL} ${s.xs}`}>
          <span>{copy.balance}</span>
          <span>
            {STORY_SPLIT.totalA.toFixed(1)} · {STORY_SPLIT.totalB.toFixed(1)}
          </span>
        </div>
        <div className={s.balBar}>
          <i className={s.balA} style={{ flex: STORY_SPLIT.totalA }} />
          <i className={s.balB} style={{ flex: STORY_SPLIT.totalB }} />
        </div>
        <motion.div className={`${s.diff} ${s.sm}`} style={{ transform: diffTransform }}>{diff}</motion.div>
      </motion.div>
      <div className={`${s.tBtns} ${s.sm}`}>
        <span className={s.ghost}>{copy.again}</span>
        <span className={s.primary}>{copy.confirm}</span>
      </div>
    </div>
  );
}
