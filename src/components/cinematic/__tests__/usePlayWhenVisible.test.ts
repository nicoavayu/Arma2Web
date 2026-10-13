import { describe, expect, it } from "vitest";

import { replaysOnArrival } from "@/components/cinematic/usePlayWhenVisible";

describe("illustrations that play once when they come into view", () => {
  it("replays a block that starts below the fold", () => {
    expect(replaysOnArrival({ top: 900, bottom: 1400 }, 800)).toBe(true);
  });

  it("leaves a block already on screen in its final state (no flash on load)", () => {
    expect(replaysOnArrival({ top: 300, bottom: 800 }, 800)).toBe(false);
  });

  it("leaves a block the visitor already scrolled past in its final state", () => {
    expect(replaysOnArrival({ top: -900, bottom: -200 }, 800)).toBe(false);
  });
});
