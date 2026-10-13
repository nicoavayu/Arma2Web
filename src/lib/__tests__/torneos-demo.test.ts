import { describe, expect, it } from "vitest";

import {
  applyResult,
  DEMO_RESULT,
  INITIAL_DEMO_STATE,
  sortStandings,
  type DemoState,
  type MatchResult,
  type StandingRow,
} from "@/lib/torneos-demo";

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object") {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}

const row = (state: DemoState, teamId: string) => state.standings.find((entry) => entry.teamId === teamId)!;

const twoTeams: DemoState = {
  standings: [
    { teamId: "a", name: "Alfa", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 },
    { teamId: "b", name: "Beta", pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0 },
  ],
  scorers: [],
};

describe("applyResult", () => {
  it("credits a home win to both teams", () => {
    const result: MatchResult = { homeId: "a", awayId: "b", homeGoals: 3, awayGoals: 1, scorers: [] };
    const next = applyResult(twoTeams, result);
    expect(row(next, "a")).toMatchObject({ pj: 1, pg: 1, pe: 0, pp: 0, gf: 3, gc: 1, pts: 3 });
    expect(row(next, "b")).toMatchObject({ pj: 1, pg: 0, pe: 0, pp: 1, gf: 1, gc: 3, pts: 0 });
  });

  it("gives one point each for a draw", () => {
    const next = applyResult(twoTeams, { homeId: "a", awayId: "b", homeGoals: 2, awayGoals: 2, scorers: [] });
    expect(row(next, "a")).toMatchObject({ pe: 1, pts: 1 });
    expect(row(next, "b")).toMatchObject({ pe: 1, pts: 1 });
  });

  it("accumulates scorers by player and team, most goals first", () => {
    const next = applyResult(
      { ...twoTeams, scorers: [{ player: "Rodri", teamId: "a", goals: 1 }] },
      {
        homeId: "a",
        awayId: "b",
        homeGoals: 3,
        awayGoals: 1,
        scorers: [
          { player: "Nico", teamId: "a" },
          { player: "Nico", teamId: "a" },
          { player: "Rodri", teamId: "a" },
          { player: "Pipe", teamId: "b" },
        ],
      },
    );
    expect(next.scorers.map((scorer) => [scorer.player, scorer.goals])).toEqual([
      ["Nico", 2],
      ["Rodri", 2],
      ["Pipe", 1],
    ]);
  });

  it("does not mutate the previous state", () => {
    const frozen = deepFreeze(structuredClone(INITIAL_DEMO_STATE));
    expect(() => applyResult(frozen, DEMO_RESULT)).not.toThrow();
  });

  it("puts Los Galácticos first after the demo result", () => {
    const next = applyResult(INITIAL_DEMO_STATE, DEMO_RESULT);
    expect(next.standings[0].name).toBe("Los Galácticos");
  });

  it("keeps the demo result consistent with its scorers", () => {
    const home = DEMO_RESULT.scorers.filter((scorer) => scorer.teamId === DEMO_RESULT.homeId).length;
    const away = DEMO_RESULT.scorers.filter((scorer) => scorer.teamId === DEMO_RESULT.awayId).length;
    expect([home, away]).toEqual([DEMO_RESULT.homeGoals, DEMO_RESULT.awayGoals]);
  });
});

describe("sortStandings", () => {
  const base = { pj: 3, pg: 0, pe: 0, pp: 0, gc: 0 } as const;

  it("orders by points, then goal difference, then goals for, then name", () => {
    const rows: StandingRow[] = [
      { ...base, teamId: "c", name: "Charlie", gf: 5, gc: 4, pts: 6 },
      { ...base, teamId: "b", name: "Bravo", gf: 6, gc: 2, pts: 6 },
      { ...base, teamId: "a", name: "Alfa", gf: 3, gc: 1, pts: 6 },
      { ...base, teamId: "d", name: "Delta", gf: 9, gc: 0, pts: 7 },
      { ...base, teamId: "e", name: "Eco", gf: 3, gc: 1, pts: 6 },
    ];
    expect(sortStandings(rows).map((entry) => entry.teamId)).toEqual(["d", "b", "a", "e", "c"]);
  });
});
