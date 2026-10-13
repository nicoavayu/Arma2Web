import type { Locale } from "@/lib/i18n";
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
 */

export interface Kickoff {
  /** YYYY-MM-DD, read as a calendar day (no time zone). */
  date: string;
  /** HH:MM, 24 h. */
  time: string;
  pitch: number;
}

export interface PlayedMatch extends MatchResult {
  round: number;
}

export interface ScheduledMatch {
  round: number;
  homeId: string;
  awayId: string;
  kickoff: Kickoff;
  /** Set when the match was rescheduled: where it was before. */
  rescheduledFrom?: Kickoff;
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

/** What's left to play, in round order. */
export const EJEMPLO_FIXTURE: ScheduledMatch[] = [
  {
    round: 7,
    homeId: "dt",
    awayId: "et",
    kickoff: { date: "2026-10-21", time: "21:00", pitch: 1 },
    rescheduledFrom: { date: "2026-10-10", time: "18:00", pitch: 1 },
  },
  { round: 8, homeId: "lg", awayId: "et", kickoff: { date: "2026-10-17", time: "18:00", pitch: 1 } },
  { round: 8, homeId: "tt", awayId: "dt", kickoff: { date: "2026-10-17", time: "19:00", pitch: 2 } },
  { round: 9, homeId: "dt", awayId: "lg", kickoff: { date: "2026-10-24", time: "18:00", pitch: 1 } },
  { round: 9, homeId: "et", awayId: "tt", kickoff: { date: "2026-10-24", time: "19:00", pitch: 2 } },
];

/** Table built from scratch out of a list of results. */
export function standingsFrom(results: readonly MatchResult[]): StandingRow[] {
  const empty = INITIAL_DEMO_STATE.standings.map(({ teamId, name }) => ({ teamId, name, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 }));
  return sortStandings(results.reduce<DemoState>((state, result) => applyResult(state, result), { standings: empty, scorers: [] }).standings);
}

export const EJEMPLO_STANDINGS = standingsFrom(EJEMPLO_RESULTS);
export const EJEMPLO_SCORERS = applyResult(INITIAL_DEMO_STATE, DEMO_RESULT).scorers;

const WEEKDAYS: Record<Locale, string[]> = {
  es: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};
const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Sáb 10/10" / "Sat Oct 10". */
export function formatDay(date: string, locale: Locale): string {
  const [year, month, day] = date.split("-").map(Number);
  const weekday = WEEKDAYS[locale][new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return locale === "es" ? `${weekday} ${day}/${month}` : `${weekday} ${MONTHS_EN[month - 1]} ${day}`;
}

function formatTime(time: string, locale: Locale): string {
  if (locale === "es") return time;
  const [hours, minutes] = time.split(":").map(Number);
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${hours < 12 ? "am" : "pm"}`;
}

/** "Mié 21/10 · 21:00" / "Wed Oct 21 · 9:00 pm". */
export function formatKickoff(kickoff: Kickoff, locale: Locale): string {
  return `${formatDay(kickoff.date, locale)} · ${formatTime(kickoff.time, locale)}`;
}
