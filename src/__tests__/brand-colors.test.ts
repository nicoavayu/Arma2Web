import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("big ball mark behind the hero phones", () => {
  const globals = read("src/app/globals.css");
  const violet = globals.match(/--brand-conic-violet:\s*([^;]+);/)?.[1] ?? "";

  it("turns white to violet to deep violet, without the teal or green tones", () => {
    expect(violet).toContain("#ffffff");
    expect(violet).toContain("#7b5cff");
    expect(violet.toLowerCase()).not.toMatch(/#27b8ff|#2ee59d|#ec4dff/);
  });

  it("is what the hero's big mark paints with", () => {
    const story = read("src/components/jugadores/story.module.css");
    const rule = story.match(/\.bigMark > span \{([^}]*)\}/)?.[1] ?? "";
    expect(rule).toContain("var(--brand-conic-violet)");
  });
});
