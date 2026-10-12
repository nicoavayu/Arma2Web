import { describe, expect, it } from "vitest";

import {
  CONFIRM_ORDER,
  GUEST_ID,
  PLAYER_COLORS,
  STORY_CHAPTERS,
  STORY_SPLIT,
  SURVEY_MVP,
  SURVEY_TILES,
  confirmedCount,
  voteState,
} from "@/lib/jugadores-story";

describe("jugadores story data", () => {
  it("splits the example group 33.6 / 33.5 with one goalkeeper per team", () => {
    expect([STORY_SPLIT.totalA, STORY_SPLIT.totalB, STORY_SPLIT.diff]).toEqual([33.6, 33.5, 0.1]);
    expect(STORY_SPLIT.teamA.map((player) => player.id).sort()).toEqual(["agus", "emi", "fran", "juani", "lucho"]);
    expect(STORY_SPLIT.teamA.some((player) => player.goalkeeper)).toBe(true);
    expect(STORY_SPLIT.teamB.some((player) => player.goalkeeper)).toBe(true);
  });

  it("confirms players from 1 to 10, never going back", () => {
    expect([confirmedCount(0), confirmedCount(1)]).toEqual([1, 10]);
    let previous = 0;
    for (let step = 0; step <= 100; step += 1) {
      const count = confirmedCount(step / 100);
      expect(count).toBeGreaterThanOrEqual(previous);
      previous = count;
    }
  });

  it("walks through three votes, the last one being \"No lo conozco\"", () => {
    expect(voteState(0.2)).toMatchObject({ index: 0, selected: 8, dunno: false, done: 2 });
    expect(voteState(0.05)).toMatchObject({ index: 0, selected: null, done: 1 });
    expect(voteState(0.5)).toMatchObject({ index: 1, selected: 9 });
    expect(voteState(0.9)).toMatchObject({ index: 2, selected: null, dunno: true });
    expect(voteState(1)).toMatchObject({ index: 2, dunno: true, done: 4 });
  });

  it("keeps the timeline and the cast consistent", () => {
    expect(STORY_CHAPTERS).toHaveLength(4);
    STORY_CHAPTERS.forEach(([start, end], index) => {
      expect(end).toBeGreaterThan(start);
      if (index > 0) expect(start).toBe(STORY_CHAPTERS[index - 1][1]);
    });
    expect(CONFIRM_ORDER).toHaveLength(10);
    expect(CONFIRM_ORDER).toContain(GUEST_ID);
    expect(SURVEY_TILES).toContain(SURVEY_MVP);
    for (const id of CONFIRM_ORDER) expect(PLAYER_COLORS[id]).toMatch(/^#[0-9a-f]{6}$/);
  });
});
