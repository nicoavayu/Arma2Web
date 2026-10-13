import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import * as jugadoresOg from "@/app/(jugadores)/opengraph-image";
import * as torneosOg from "@/app/torneos/opengraph-image";

describe("share images", () => {
  it.each([
    ["players", jugadoresOg],
    ["torneos", torneosOg],
  ])("%s: 1200×630 PNG with alt text", (_, og) => {
    expect(og.size).toEqual({ width: 1200, height: 630 });
    expect(og.contentType).toBe("image/png");
    expect(og.alt.length).toBeGreaterThan(10);
  });

  it("the players layout no longer points to the old og-image.jpg", () => {
    const layout = readFileSync(join(process.cwd(), "src/app/(jugadores)/layout.tsx"), "utf8");
    expect(layout).not.toContain("og-image.jpg");
  });

  it("keeps the backgrounds light", () => {
    for (const file of ["src/app/(jugadores)/_og/bg-hero.jpg", "src/app/torneos/_og/stadium.jpg"]) {
      expect(statSync(join(process.cwd(), file)).size).toBeLessThanOrEqual(150_000);
    }
  });
});
