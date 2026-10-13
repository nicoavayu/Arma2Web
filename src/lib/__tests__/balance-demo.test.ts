import { describe, expect, it } from "vitest";

import { alternatingSplit, balanceTeams, DEMO_PLAYERS, type DemoPlayer } from "@/lib/balance-demo";

const ids = (players: readonly DemoPlayer[]) => players.map((player) => player.id).sort();
const round1 = (value: number) => Math.round(value * 10) / 10;

describe("DEMO_PLAYERS", () => {
  it("has ten players and exactly two goalkeepers", () => {
    expect(DEMO_PLAYERS).toHaveLength(10);
    expect(DEMO_PLAYERS.filter((player) => player.goalkeeper)).toHaveLength(2);
  });
});

describe("balanceTeams", () => {
  it("splits the ten players into two teams of five without losing anyone", () => {
    const result = balanceTeams(DEMO_PLAYERS);
    expect(result.teamA).toHaveLength(5);
    expect(result.teamB).toHaveLength(5);
    expect(ids([...result.teamA, ...result.teamB])).toEqual(ids(DEMO_PLAYERS));
  });

  it("is at least as even as alternating picks from a sorted list", () => {
    expect(balanceTeams(DEMO_PLAYERS).diff).toBeLessThanOrEqual(alternatingSplit(DEMO_PLAYERS).diff);
  });

  it("keeps one fixed goalkeeper on each team", () => {
    const result = balanceTeams(DEMO_PLAYERS, { fixGoalkeepers: true });
    expect(result.teamA.filter((player) => player.goalkeeper)).toHaveLength(1);
    expect(result.teamB.filter((player) => player.goalkeeper)).toHaveLength(1);
  });

  it("is deterministic for a given seed", () => {
    expect(balanceTeams(DEMO_PLAYERS, { seed: 3 })).toEqual(balanceTeams(DEMO_PLAYERS, { seed: 3 }));
  });

  it("finds very even alternatives for other seeds", () => {
    expect(balanceTeams(DEMO_PLAYERS, { seed: 1 }).diff).toBeLessThanOrEqual(0.5);
    expect(balanceTeams(DEMO_PLAYERS, { seed: 2 }).diff).toBeLessThanOrEqual(0.5);
  });

  it("reports totals and diff rounded to one decimal", () => {
    const result = balanceTeams(DEMO_PLAYERS);
    const sum = (team: readonly DemoPlayer[]) => team.reduce((total, player) => total + player.score, 0);
    expect(result.totalA).toBe(round1(sum(result.teamA)));
    expect(result.totalB).toBe(round1(sum(result.teamB)));
    expect(result.diff).toBe(round1(Math.abs(result.totalA - result.totalB)));
  });

  it("does not mutate its input", () => {
    const input = Object.freeze(DEMO_PLAYERS.map((player) => Object.freeze({ ...player })));
    expect(() => balanceTeams(input, { seed: 5, fixGoalkeepers: true })).not.toThrow();
  });
});
