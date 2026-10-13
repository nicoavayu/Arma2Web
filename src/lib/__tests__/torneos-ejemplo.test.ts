import { describe, expect, it } from "vitest";

import { applyResult, DEMO_RESULT, INITIAL_DEMO_STATE, sortStandings } from "@/lib/torneos-demo";
import {
  EJEMPLO_FIXTURE,
  EJEMPLO_RESULTS,
  EJEMPLO_SCORERS,
  EJEMPLO_STANDINGS,
  formatDay,
  formatKickoff,
  standingsFrom,
} from "@/lib/torneos-ejemplo";

const pair = (a: string, b: string) => [a, b].sort().join("-");
const allMatches = [...EJEMPLO_RESULTS, ...EJEMPLO_FIXTURE];

describe("example tournament data", () => {
  it("adds up to the story's standings before round 7", () => {
    expect(standingsFrom(EJEMPLO_RESULTS.filter((match) => match.round <= 6))).toEqual(
      sortStandings(INITIAL_DEMO_STATE.standings),
    );
  });

  it("adds up to the story's standings and scorers after round 7", () => {
    const after = applyResult(INITIAL_DEMO_STATE, DEMO_RESULT);
    expect(EJEMPLO_STANDINGS).toEqual(after.standings);
    expect(EJEMPLO_SCORERS).toEqual(after.scorers);
  });

  it("never has a team playing twice in the same round", () => {
    for (let round = 1; round <= 9; round++) {
      const teams = allMatches.filter((match) => match.round === round).flatMap((match) => [match.homeId, match.awayId]);
      expect(teams).toHaveLength(4);
      expect(new Set(teams).size).toBe(4);
    }
  });

  it("has every pair meet once per leg of three rounds", () => {
    for (const leg of [[1, 3], [4, 6], [7, 9]]) {
      const pairs = allMatches
        .filter((match) => match.round >= leg[0] && match.round <= leg[1])
        .map((match) => pair(match.homeId, match.awayId));
      expect(new Set(pairs).size).toBe(6);
    }
  });

  it("moves the rescheduled match to a later date", () => {
    const moved = EJEMPLO_FIXTURE.filter((match) => match.rescheduledFrom);
    expect(moved).toHaveLength(1);
    expect(moved[0].kickoff.date > moved[0].rescheduledFrom!.date).toBe(true);
    expect(EJEMPLO_RESULTS.some((match) => match.round === moved[0].round)).toBe(true);
  });

  it("formats kickoffs per locale without depending on the time zone", () => {
    const kickoff = { date: "2026-10-21", time: "21:00", pitch: 1 };
    expect(formatKickoff(kickoff, "es")).toBe("Mié 21/10 · 21:00");
    expect(formatKickoff(kickoff, "en")).toBe("Wed Oct 21 · 9:00 pm");
    expect(formatDay("2026-10-10", "es")).toBe("Sáb 10/10");
    expect(formatDay("2026-10-10", "en")).toBe("Sat Oct 10");
  });
});
