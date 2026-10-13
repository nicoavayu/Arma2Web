import { describe, expect, it } from "vitest";

import { translations } from "@/lib/i18n";
import { torneosContent } from "@/lib/torneos-content";

/** Keys and array lengths, so a missing or extra translation fails loudly. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, item]) => [key, shape(item)]));
  }
  return typeof value;
}

describe("players site copy", () => {
  it("has the same shape in Spanish and English", () => {
    expect(shape(translations.en)).toEqual(shape(translations.es));
  });

  it.each(["es", "en"] as const)("does not explain the invite link in the hero lead (%s)", (locale) => {
    expect(translations[locale].home.hero.lead).not.toMatch(/link|enlace/i);
  });

  it.each(["es", "en"] as const)("tells the story in four chapters (%s)", (locale) => {
    expect(translations[locale].home.story.chapters).toHaveLength(4);
  });
});

describe("torneos portal copy", () => {
  it("has the same shape in Spanish and English", () => {
    expect(shape(torneosContent.en)).toEqual(shape(torneosContent.es));
  });

  it.each(["es", "en"] as const)("tells the story in four chapters and shows five features (%s)", (locale) => {
    expect(torneosContent[locale].story.chapters).toHaveLength(4);
    expect(torneosContent[locale].gallery.cards).toHaveLength(5);
  });

  it.each(["es", "en"] as const)("shows the real public page URL (%s)", (locale) => {
    expect(torneosContent[locale].story.publicPage.url).toMatch(/^app\.arma2\.com\.ar\/torneos\/publico\//);
  });
});
