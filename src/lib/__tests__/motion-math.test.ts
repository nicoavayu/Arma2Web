import { describe, expect, it } from "vitest";

import { backOut, clamp, easeInOutCubic, easeOutCubic, lerp, seg } from "@/lib/motion-math";

describe("motion math", () => {
  it("clamps and segments progress", () => {
    expect(clamp(2)).toBe(1);
    expect(clamp(-1)).toBe(0);
    expect(clamp(5, 0, 10)).toBe(5);
    expect(seg(0.5, 0, 1)).toBe(0.5);
    expect(seg(-1, 0, 1)).toBe(0);
    expect(seg(2, 0, 1)).toBe(1);
    expect(seg(0.3, 0.2, 0.4)).toBeCloseTo(0.5);
  });

  it("interpolates", () => {
    expect(lerp(10, 20, 0.25)).toBe(12.5);
  });

  it("eases like the prototype", () => {
    expect(easeInOutCubic(0)).toBe(0);
    expect(easeInOutCubic(0.5)).toBe(0.5);
    expect(easeInOutCubic(1)).toBe(1);
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
    expect(Math.max(...[0.6, 0.7, 0.8].map(backOut))).toBeGreaterThan(1);
    expect(backOut(1)).toBeCloseTo(1);
  });
});
