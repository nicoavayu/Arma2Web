import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageProvider } from "@/components/LanguageProvider";
import { JugadoresStory } from "@/components/jugadores/JugadoresStory";

const render = (node: React.ReactNode) => renderToStaticMarkup(<LanguageProvider>{node}</LanguageProvider>);

describe("players hero + how it works", () => {
  const html = render(<JugadoresStory />);

  it("has one h1, a section title and one h3 per step", () => {
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html.match(/<h2/g)).toHaveLength(1);
    expect(html.match(/<h3/g)).toHaveLength(4);
  });

  it("keeps the section anchor, its aliases and one anchor per step", () => {
    for (const id of ["como-se-arman", "how-it-works", "como-funciona", "capitulo-convocas", "capitulo-votan", "capitulo-se-arman", "capitulo-se-juega"]) {
      expect(html).toContain(`id="${id}"`);
    }
  });

  it("tells the WhatsApp invite in step 1, not in the hero lead", () => {
    expect(html).toContain("Lo mandás por WhatsApp.");
    expect(html).toContain("Quién viene, cómo quedan los equipos y quién fue la figura.");
  });

  it("labels the example data", () => {
    expect(html).toContain("Ejemplo con datos ficticios");
  });

  it("scrolls normally: no pinned or sticky scene", () => {
    expect(html).not.toContain("data-scene");
    expect(html).not.toMatch(/position:\s*sticky/);
  });

  it("shows every step's screen in its final state on the server (no JS needed)", () => {
    for (const text of ["10/10", "No lo conozco", "33.6", "¿Quién fue la figura?"]) expect(html).toContain(text);
  });

  it("paints the hero visible on the server (no hidden h1, lead or CTAs)", () => {
    const start = html.lastIndexOf("<div", html.indexOf("data-hero-copy"));
    const end = html.indexOf('data-store="googlePlay"');
    const hero = html.slice(start, end);
    expect(hero).toContain("<h1");
    expect(hero).toContain("Quién viene");
    expect(hero).toContain('data-store="appStore"');
    expect(hero).not.toMatch(/opacity:\s*0[;"]/);
    expect(hero).not.toMatch(/visibility:\s*hidden/);
  });

  it("keeps step text visible on the server, never waiting for an animation", () => {
    const steps = html.slice(html.indexOf('id="capitulo-convocas"'));
    expect(steps).not.toMatch(/<h3[^>]*style="[^"]*opacity:\s*0/);
    expect(steps).not.toMatch(/<p[^>]*style="[^"]*opacity:\s*0/);
  });
});
