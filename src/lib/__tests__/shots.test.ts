import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import manifest from "../../../public/shots/manifest.json";
import { getShot, SHOT_IDS, type ShotId } from "@/lib/shots";

const shots = manifest.shots as Record<string, { file: string; width: number; height: number }>;
const phoneIds = SHOT_IDS.filter((id) => id.startsWith("jugadores/") || id === "torneos/publica-mobile");
const desktopIds = SHOT_IDS.filter((id) => !phoneIds.includes(id));

describe("shots manifest", () => {
  it.each(SHOT_IDS)("lists %s with a file on disk", (id) => {
    expect(shots[id]).toBeDefined();
    expect(existsSync(join(process.cwd(), "public/shots", shots[id].file))).toBe(true);
  });

  it.each(phoneIds)("%s has a 390×844 phone ratio", (id) => {
    expect(shots[id].height / shots[id].width).toBeCloseTo(844 / 390, 2);
  });

  it.each(desktopIds)("%s has a 1440×900 desktop ratio", (id) => {
    expect(shots[id].width / shots[id].height).toBeCloseTo(1440 / 900, 2);
  });

  it("records the product commit the shots come from", () => {
    expect(manifest.product.sha).toMatch(/^[0-9a-f]{40}$/);
  });
});

describe("getShot", () => {
  it("returns a public src, size and localized alt", () => {
    const es = getShot("jugadores/votacion", "es");
    const en = getShot("jugadores/votacion", "en");
    expect(es.src).toBe(`/shots/${shots["jugadores/votacion"].file}`);
    expect(es.width).toBeGreaterThan(0);
    expect(en.alt).not.toBe("");
    expect(en.alt).not.toBe(es.alt);
  });

  it("covers every id with non-empty alt text in both locales", () => {
    for (const id of SHOT_IDS as readonly ShotId[]) {
      expect(getShot(id, "es").alt.length).toBeGreaterThan(10);
      expect(getShot(id, "en").alt.length).toBeGreaterThan(10);
    }
  });
});
