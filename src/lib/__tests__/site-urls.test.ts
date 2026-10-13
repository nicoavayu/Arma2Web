import { describe, expect, it } from "vitest";

import { getSiteUrl } from "@/lib/site-urls";

const production = { NEXT_PUBLIC_VERCEL_ENV: "production" };

describe("getSiteUrl in production", () => {
  it("returns the absolute Torneos URL", () => {
    expect(getSiteUrl("torneos", "/", production)).toBe("https://torneos.arma2.com.ar/");
  });

  it("returns the absolute players URL with a hash", () => {
    expect(getSiteUrl("jugadores", "/#descargar", production)).toBe("https://www.arma2.com.ar/#descargar");
  });

  it("respects host overrides", () => {
    expect(
      getSiteUrl("torneos", "/", { ...production, NEXT_PUBLIC_TORNEOS_HOST: "torneos.example.com" }),
    ).toBe("https://torneos.example.com/");
  });
});

describe("getSiteUrl outside production (local and previews)", () => {
  it("links Torneos under /torneos", () => {
    expect(getSiteUrl("torneos", "/", {})).toBe("/torneos");
  });

  it("keeps hashes attached to /torneos", () => {
    expect(getSiteUrl("torneos", "/#torneos-planes", {})).toBe("/torneos#torneos-planes");
  });

  it("keeps sub paths under /torneos", () => {
    expect(getSiteUrl("torneos", "/planes", {})).toBe("/torneos/planes");
  });

  it("links players to the root", () => {
    expect(getSiteUrl("jugadores", "/", {})).toBe("/");
  });

  it("defaults the path to /", () => {
    expect(getSiteUrl("jugadores", undefined, {})).toBe("/");
  });
});
