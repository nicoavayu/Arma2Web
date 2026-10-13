import {
  applyResult,
  DEMO_RESULT,
  INITIAL_DEMO_STATE,
  sortStandings,
  type DemoState,
  type MatchResult,
  type StandingRow,
} from "@/lib/torneos-demo";

/**
 * The example tournament at torneos.arma2.com.ar/ejemplo: the same made-up
 * league as the home story (4 teams, three legs, 9 rounds). Rounds 1–6 add up
 * to the story's table before the result, and round 7 is the story's result.
 * What's left to play (and the date formatting) lives in torneos-ejemplo-calendar.ts.
 */

export { EJEMPLO_FIXTURE, formatDay, formatKickoff, type Kickoff, type ScheduledMatch } from "@/lib/torneos-ejemplo-calendar";

export interface PlayedMatch extends MatchResult {
  round: number;
}

const played = (round: number, homeId: string, homeGoals: number, awayGoals: number, awayId: string): PlayedMatch => ({
  round,
  homeId,
  awayId,
  homeGoals,
  awayGoals,
  scorers: [],
});

export const EJEMPLO_RESULTS: PlayedMatch[] = [
  played(1, "dt", 2, 1, "tt"),
  played(1, "lg", 2, 1, "et"),
  played(2, "dt", 3, 2, "lg"),
  played(2, "tt", 3, 1, "et"),
  played(3, "dt", 4, 1, "et"),
  played(3, "lg", 4, 1, "tt"),
  played(4, "tt", 1, 1, "dt"),
  played(4, "et", 1, 3, "lg"),
  played(5, "lg", 3, 1, "dt"),
  played(5, "et", 2, 1, "tt"),
  played(6, "et", 0, 3, "dt"),
  played(6, "tt", 2, 1, "lg"),
  { round: 7, ...DEMO_RESULT },
];

/** Saturday of each played round. */
export const ROUND_DATES: Record<number, string> = {
  1: "2026-08-29",
  2: "2026-09-05",
  3: "2026-09-12",
  4: "2026-09-19",
  5: "2026-09-26",
  6: "2026-10-03",
  7: "2026-10-10",
};

/** Table built from scratch out of a list of results. */
export function standingsFrom(results: readonly MatchResult[]): StandingRow[] {
  const empty = INITIAL_DEMO_STATE.standings.map(({ teamId, name }) => ({ teamId, name, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 }));
  return sortStandings(results.reduce<DemoState>((state, result) => applyResult(state, result), { standings: empty, scorers: [] }).standings);
}

export const EJEMPLO_STANDINGS = standingsFrom(EJEMPLO_RESULTS);
export const EJEMPLO_SCORERS = applyResult(INITIAL_DEMO_STATE, DEMO_RESULT).scorers;
