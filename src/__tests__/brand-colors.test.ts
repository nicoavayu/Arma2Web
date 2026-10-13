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

describe("subtle header", () => {
  it("shows the language toggle in Arma2 violet, without the cyan pill or a ring around it", async () => {
    const { renderToStaticMarkup } = await import("react-dom/server");
    const { createElement } = await import("react");
    const { LanguageProvider } = await import("@/components/LanguageProvider");
    const { LanguageToggle } = await import("@/components/shared/LanguageToggle");
    const html = renderToStaticMarkup(createElement(LanguageProvider, null, createElement(LanguageToggle)));
    expect(html).not.toContain("#27b8ff");
    expect(html).not.toMatch(/rounded-full border/);
    expect(html).toContain("#7b5cff");
  });

  it("doesn't use a solid white download button in the players nav", () => {
    const nav = read("src/components/jugadores/JugadoresNav.tsx");
    expect(nav).not.toMatch(/rounded-lg bg-white px-4/);
  });
});
