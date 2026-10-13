/**
 * Timeline and example data for the players' home story (hero + 4 chapters).
 * Progress values are fractions of the pinned scene; they mirror the approved
 * prototype (docs/superpowers/specs/prototipos-cinematicos/jugadores-cinematico.html).
 */
import { balanceTeams, DEMO_PLAYERS, type BalanceResult } from "@/lib/balance-demo";
import { easeInOutCubic, lerp, seg } from "@/lib/motion-math";

/** End of the hero → story transition. */
export const STORY_HERO_END = 0.15;

/** [start, end] of each chapter: convocás, votan, se arman, se juega. */
export const STORY_CHAPTERS: readonly (readonly [number, number])[] = [
  [0.16, 0.37],
  [0.37, 0.58],
  [0.58, 0.79],
  [0.79, 1.02],
];

/** Teams shown in chapter 3, computed by the site's demo balancer. */
export const STORY_SPLIT: BalanceResult = balanceTeams(DEMO_PLAYERS, { fixGoalkeepers: true });

/** Order in which the group confirms in chapter 1. */
export const CONFIRM_ORDER = ["nico", "santi", "juani", "agus", "fede", "fran", "emi", "tomi", "lucho", "pipe"] as const;

/** Joins from the WhatsApp link without the app (product: guest invite flow). */
export const GUEST_ID = "pipe";

export const PLAYER_COLORS: Record<string, string> = {
  nico: "#7b5cff",
  santi: "#27b8ff",
  juani: "#ff7a59",
  agus: "#2ee59d",
  fede: "#ffb020",
  fran: "#ec4dff",
  emi: "#5ad1ff",
  tomi: "#ff5c8a",
  lucho: "#9b8cff",
  pipe: "#45d483",
};

/** Confirmed players (1–10) for chapter-1 progress `c`. */
export function confirmedCount(c: number): number {
  return Math.max(1, Math.round(lerp(1, 10, easeInOutCubic(seg(c, 0.12, 0.78)))));
}

/** The three votes of chapter 2; the last one uses "No lo conozco". */
export const VOTES = [
  { playerId: "santi", value: 8 },
  { playerId: "juani", value: 9 },
  { playerId: "pipe", value: null },
] as const;

export interface VoteState {
  index: 0 | 1 | 2;
  /** Progress inside the current vote, 0–1. */
  local: number;
  /** Highlighted number on the 1–10 scale, if any. */
  selected: number | null;
  dunno: boolean;
  /** "Votaste {done} de 9". */
  done: number;
}

export function voteState(c: number): VoteState {
  const index = Math.min(2, Math.floor(c * 3)) as 0 | 1 | 2;
  const local = c * 3 - index;
  const chosen = local > 0.38;
  return {
    index,
    local,
    selected: chosen && local < 0.9 ? VOTES[index].value : null,
    dunno: index === 2 && chosen,
    done: index + (chosen ? 1 : 0) + 1,
  };
}

/** Candidates on the "¿Quién fue la figura?" survey step. */
export const SURVEY_TILES = ["juani", "santi", "nico", "agus", "fede", "fran"] as const;
export const SURVEY_MVP = "juani";

export function playerName(id: string): string {
  return DEMO_PLAYERS.find((player) => player.id === id)?.name ?? id;
}
