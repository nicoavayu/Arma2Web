"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

import { useProgressValue } from "@/components/cinematic/useProgressValue";
import { VOTES, playerName, voteState } from "@/lib/jugadores-story";
import { easeInOutCubic, seg } from "@/lib/motion-math";

import type { StoryScreensCopy } from "./types";
import s from "./screens.module.css";

const CARD_GRADIENTS = [
  "linear-gradient(160deg,#8b5cff,#4f2fd9)",
  "linear-gradient(160deg,#ff8a5c,#d9367a)",
  "linear-gradient(160deg,#36d1c4,#2563eb)",
];

/** Pose of vote card `j` for chapter-2 progress `c` (current card exits left, next one rises). */
function cardPose(c: number, j: number) {
  const { index, local } = voteState(c);
  if (j === index) {
    const out = j < 2 ? easeInOutCubic(seg(local, 0.84, 1)) : 0;
    return { opacity: 1 - out * 0.6, transform: `translateX(${-out * 135}%) rotate(${-out * 16}deg) scale(1)`, zIndex: 3 };
  }
  if (j === index + 1) {
    const pre = easeInOutCubic(seg(local, 0.8, 1));
    return { opacity: pre, transform: `scale(${0.92 + 0.08 * pre})`, zIndex: 2 };
  }
  return { opacity: 0, transform: "scale(0.92)", zIndex: 1 };
}

function VoteCard({ progress, j }: { progress: MotionValue<number>; j: number }) {
  const opacity = useTransform(progress, (c) => cardPose(c, j).opacity);
  const transform = useTransform(progress, (c) => cardPose(c, j).transform);
  const zIndex = useTransform(progress, (c) => cardPose(c, j).zIndex);
  const name = playerName(VOTES[j].playerId);
  return (
    <motion.div className={s.vcard} style={{ opacity, transform, zIndex, background: CARD_GRADIENTS[j] }}>
      <div className={`${s.vn} ${s.sm}`}>{name}</div>
      <div className={s.vi}>
        <b>{name[0]}</b>
      </div>
    </motion.div>
  );
}

/** Chapter 2: three votes on the 1–10 scale; the third player gets "No lo conozco". */
export function ScreenVotacion({ progress, copy }: { progress: MotionValue<number>; copy: StoryScreensCopy["vote"] }) {
  const key = useProgressValue(progress, (c) => {
    const state = voteState(c);
    return `${state.index}|${state.selected ?? ""}|${state.dunno ? 1 : 0}|${state.done}`;
  });
  const [index, selected, dunno, done] = key.split("|");

  return (
    <div className={s.scr}>
      <div className={s.vHead}>
        <small className={s.xs}>{copy.step.replace("{n}", String(Number(index) + 2))}</small>
        <h4 className={s.lg}>
          {copy.title[0]}
          <br />
          {copy.title[1]}
        </h4>
      </div>
      <div className={s.vCards}>
        {VOTES.map((vote, j) => (
          <VoteCard key={vote.playerId} progress={progress} j={j} />
        ))}
      </div>
      <div className={`${s.scale} ${s.sm}`}>
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className={String(i + 1) === selected ? s.scaleOn : undefined}>{i + 1}</span>
        ))}
      </div>
      <div className={`${s.scaleL} ${s.xs}`}>
        <span>{copy.low}</span>
        <span>{copy.high}</span>
      </div>
      <div className={`${s.dunno} ${s.sm} ${dunno === "1" ? s.dunnoOn : ""}`}>{copy.dunno}</div>
      <div className={s.vprog}>
        <span className={s.xs}>{copy.done.replace("{n}", done)}</span>
        <div className={s.bar}>
          <i className={s.barFill} style={{ width: `${(Number(done) / 9) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
