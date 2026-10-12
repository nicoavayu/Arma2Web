"use client";

import Image from "next/image";
import { Check } from "lucide-react";

import { BRAND } from "@/lib/brand-assets";
import type { TranslationDictionary } from "@/lib/i18n";
import { PLAYER_COLORS, STORY_SPLIT } from "@/lib/jugadores-story";
import { cn } from "@/lib/utils";

import s from "./story.module.css";

export interface FloatRefs {
  chat: HTMLDivElement | null;
  toasts: (HTMLDivElement | null)[];
  chips: (HTMLDivElement | null)[];
  nums: HTMLDivElement | null;
  awards: (HTMLDivElement | null)[];
}

export const emptyFloatRefs = (): FloatRefs => ({ chat: null, toasts: [], chips: [], nums: null, awards: [] });

export type RegisterFloat = (key: keyof FloatRefs, index: number, el: HTMLDivElement | null) => void;

const TOAST_PLAYERS = ["santi", "fede", "pipe"] as const;
/** Vote chips around the phone in chapter 2; `null` is the "No lo conozco" chip. */
export const VOTE_CHIPS = ["8", "9", "7", null, "6", "10"] as const;

/**
 * Decorative elements that pop around the phone (chat preview, confirmations,
 * votes, totals, awards). Positions and opacity are written by the scene.
 */
export function StoryFloats({ copy, register }: { copy: TranslationDictionary["home"]["story"]; register: RegisterFloat }) {
  const floats = copy.floats;
  const hidden = { opacity: 0 };

  return (
    <div aria-hidden="true">
      <div ref={(el) => register("chat", 0, el)} className={cn(s.float, s.chat, s.hideMobile)} style={hidden}>
        <div className={s.chatHead}>
          <i>LJ</i>
          <span>
            {floats.group}
            <small>{floats.sender}</small>
          </span>
        </div>
        <div className={s.bubble}>{floats.message}</div>
        <div className={s.preview}>
          <span className={s.previewLogo}>
            <Image src="/logo_navbar.png" alt="" width={22} height={27} />
          </span>
          <span>
            <b>{floats.previewTitle}</b>
            <small>{floats.previewText}</small>
          </span>
        </div>
      </div>

      {floats.toasts.map((toast, index) => {
        const id = TOAST_PLAYERS[index];
        return (
          <div key={toast} ref={(el) => register("toasts", index, el)} className={cn(s.float, s.toast, s.hideMobile)} style={hidden}>
            <span className={s.toastAv} style={{ background: PLAYER_COLORS[id] }}>{id[0].toUpperCase()}</span>
            {toast}
            <Check className={s.toastOk} />
          </div>
        );
      })}

      {VOTE_CHIPS.map((chip, index) => (
        <div
          key={index}
          ref={(el) => register("chips", index, el)}
          className={cn(s.float, s.chip, chip === null && s.chipText, s.hideMobile)}
          style={hidden}
        >
          {chip === null ? copy.screens.vote.dunno : <span className="text-grad-j">{chip}</span>}
        </div>
      ))}

      <div ref={(el) => register("nums", 0, el)} className={cn(s.float, s.nums, s.hideMobile)} style={hidden}>
        <div className={cn(s.big, s.bigA)}>
          <small>{floats.teamA}</small>
          <b>{STORY_SPLIT.totalA.toFixed(1)}</b>
        </div>
        <div className={cn(s.big, s.bigB)}>
          <small>{floats.teamB}</small>
          <b>{STORY_SPLIT.totalB.toFixed(1)}</b>
        </div>
        <div className={s.dif}>{floats.diff.replace("{diff}", STORY_SPLIT.diff.toFixed(1))}</div>
      </div>

      {[BRAND.awardMvp, BRAND.awardGoalkeeper, BRAND.awardRedcard].map((award, index) => (
        <div
          key={award.src}
          ref={(el) => register("awards", index, el)}
          className={cn(s.float, s.award, index > 0 && s.awardSmall)}
          style={hidden}
        >
          <Image src={award.src} alt="" width={award.width} height={award.height} sizes="200px" />
          <span>{floats.awards[index]}</span>
        </div>
      ))}
    </div>
  );
}
