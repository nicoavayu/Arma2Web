import { describe, expect, it } from "vitest";

import { DEMO_RESULT } from "@/lib/torneos-demo";
import { GOAL_TIMELINE, TORNEOS_STORY_CHAPTERS, goalsScored, scoreAt, scorersRows, standingsRows } from "@/lib/torneos-story";

describe("torneos story data", () => {
  it("scores goal by goal up to the demo result", () => {
    expect([scoreAt(0), scoreAt(1)]).toEqual([{ home: 0, away: 0 }, { home: 3, away: 1 }]);
    expect(goalsScored(0.2)).toBe(1);
    expect(scoreAt(0.5)).toEqual({ home: 2, away: 1 });
  });

  it("matches the demo result exactly", () => {
    expect(GOAL_TIMELINE.filter((goal) => goal.teamId === DEMO_RESULT.homeId)).toHaveLength(DEMO_RESULT.homeGoals);
    expect(GOAL_TIMELINE.filter((goal) => goal.teamId === DEMO_RESULT.awayId)).toHaveLength(DEMO_RESULT.awayGoals);
    expect(GOAL_TIMELINE.map((goal) => goal.player).sort()).toEqual(DEMO_RESULT.scorers.map((scorer) => scorer.player).sort());
  });

  it("moves Los Galácticos to the top with 15 points", () => {
    const lg = standingsRows().find((row) => row.teamId === "lg")!;
    expect(lg).toMatchObject({ pts0: 12, pts1: 15, pj0: 6, pj1: 7, rank0: 1, rank1: 0 });
    expect(standingsRows().find((row) => row.teamId === "dt")).toMatchObject({ rank0: 0, rank1: 1, pts1: 13 });
  });

  it("puts Nico first among the scorers with 7", () => {
    const rows = scorersRows();
    expect(rows).toHaveLength(4);
    expect(rows.find((row) => row.player === "Nico")).toMatchObject({ goals0: 5, goals1: 7, rank1: 0 });
  });

  it("keeps a continuous four-chapter timeline", () => {
    expect(TORNEOS_STORY_CHAPTERS).toHaveLength(4);
    TORNEOS_STORY_CHAPTERS.forEach(([start, end], index) => {
      expect(end).toBeGreaterThan(start);
      if (index > 0) expect(start).toBe(TORNEOS_STORY_CHAPTERS[index - 1][1]);
    });
  });
});
