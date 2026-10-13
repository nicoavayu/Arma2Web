import { statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";

import { BRAND, type BrandAssetKey } from "@/lib/brand-assets";

/** Byte budgets from the spec (§7): render < 250 KB, backgrounds < 200 KB. */
const BUDGET: Partial<Record<BrandAssetKey, number>> = {
  pcTorneos: 250_000,
  bgHero: 200_000,
  bgStadium: 200_000,
  awardMvp: 80_000,
  awardGoalkeeper: 80_000,
  awardRedcard: 80_000,
  cardNico: 120_000,
};

describe("brand assets", () => {
  it.each(Object.entries(BRAND))("%s exists, matches its declared size and fits its budget", async (key, asset) => {
    const file = join(process.cwd(), "public", asset.src);
    const meta = await sharp(file).metadata();
    expect([meta.width, meta.height]).toEqual([asset.width, asset.height]);
    expect(meta.format).toBe("webp");
    const budget = BUDGET[key as BrandAssetKey];
    if (budget) expect(statSync(file).size).toBeLessThanOrEqual(budget);
  });
});
