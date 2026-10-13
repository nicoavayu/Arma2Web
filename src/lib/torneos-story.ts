/**
 * Timeline and example data for the Torneos "Cómo funciona" (4 steps). Built
 * on the demo league in torneos-demo.ts (Los Galácticos 3–1 Tiki-Taka). The
 * manager screen plays this timeline on its own, from TORNEOS_HERO_END to 1,
 * once it comes into view.
 */
import { applyResult, DEMO_RESULT, INITIAL_DEMO_STATE, sortStandings } from "@/lib/torneos-demo";

/** Where the manager screen's animation starts (before it, nothing is typed yet). */
export const TORNEOS_HERO_END = 0.16;

/** [start, end] of each chapter: cargás, se actualiza, se publica, se comparte. */
export const TORNEOS_STORY_CHAPTERS: readonly (readonly [number, number])[] = [
  [0.17, 0.38],
  [0.38, 0.58],
  [0.58, 0.79],
  [0.79, 1.02],
];

/** Goals of the demo match in the order they are typed in, with chapter-1 progress `at`. */
export const GOAL_TIMELINE = [
  { player: "Nico", teamId: "lg", minute: 12, at: 0.16 },
  { player: "Rodri", teamId: "lg", minute: 30, at: 0.32 },
  { player: "Juani", teamId: "tt", minute: 38, at: 0.46 },
  { player: "Nico", teamId: "lg", minute: 41, at: 0.6 },
] as const;

export function goalsScored(c: number): number {
  return GOAL_TIMELINE.filter((goal) => c >= goal.at).length;
}

export function scoreAt(c: number): { home: number; away: number } {
  const scored = GOAL_TIMELINE.slice(0, goalsScored(c));
  return {
    home: scored.filter((goal) => goal.teamId === DEMO_RESULT.homeId).length,
    away: scored.filter((goal) => goal.teamId === DEMO_RESULT.awayId).length,
  };
}

const BEFORE = { standings: sortStandings(INITIAL_DEMO_STATE.standings), scorers: INITIAL_DEMO_STATE.scorers };
const AFTER = applyResult(INITIAL_DEMO_STATE, DEMO_RESULT);
const byGoals = (a: { goals: number; player: string }, b: { goals: number; player: string }) =>
  b.goals - a.goals || a.player.localeCompare(b.player, "es");
const SCORERS_BEFORE = [...BEFORE.scorers].sort(byGoals);

export interface StandingTransition {
  teamId: string;
  name: string;
  pj0: number;
  pj1: number;
  pts0: number;
  pts1: number;
  /** Position (0-based) before and after the result. */
  rank0: number;
  rank1: number;
}

/** Each team before and after the result, in the order of the initial table. */
export function standingsRows(): StandingTransition[] {
  return BEFORE.standings.map((row, rank0) => {
    const rank1 = AFTER.standings.findIndex((after) => after.teamId === row.teamId);
    const after = AFTER.standings[rank1];
    return { teamId: row.teamId, name: row.name, pj0: row.pj, pj1: after.pj, pts0: row.pts, pts1: after.pts, rank0, rank1 };
  });
}

export interface ScorerTransition {
  player: string;
  teamId: string;
  goals0: number;
  goals1: number;
  rank0: number;
  rank1: number;
}

/** Top scorers before and after the result, in the order they were before. */
export function scorersRows(limit = 4): ScorerTransition[] {
  return SCORERS_BEFORE.slice(0, limit).map((row, rank0) => {
    const rank1 = AFTER.scorers.findIndex((after) => after.player === row.player && after.teamId === row.teamId);
    return { player: row.player, teamId: row.teamId, goals0: row.goals, goals1: AFTER.scorers[rank1].goals, rank0, rank1 };
  });
}
