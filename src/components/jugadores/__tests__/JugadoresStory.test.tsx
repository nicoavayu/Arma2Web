import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageProvider } from "@/components/LanguageProvider";
import { JugadoresStory, JugadoresStoryStatic } from "@/components/jugadores/JugadoresStory";

const render = (node: React.ReactNode) => renderToStaticMarkup(<LanguageProvider>{node}</LanguageProvider>);

describe("players hero + story scene", () => {
  const html = render(<JugadoresStory />);

  it("has one h1 and one h2 per chapter", () => {
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html.match(/<h2/g)).toHaveLength(4);
  });

  it("keeps the section anchor, its aliases and one anchor per chapter", () => {
    for (const id of ["como-se-arman", "how-it-works", "como-funciona", "capitulo-convocas", "capitulo-votan", "capitulo-se-arman", "capitulo-se-juega"]) {
      expect(html).toContain(`id="${id}"`);
    }
  });

  it("tells the WhatsApp invite in chapter 1, not in the hero lead", () => {
    expect(html).toContain("Lo mandás por WhatsApp.");
    expect(html).toContain("Quién viene, cómo quedan los equipos y quién fue la figura.");
  });

  it("labels the example data", () => {
    expect(html).toContain("Ejemplo con datos ficticios");
  });

  it("is pinned and links each chapter from the chapter selector", () => {
    expect(html).toContain('data-scene="pinned"');
    expect(html).toMatch(/<nav[^>]*aria-label="Capítulos de cómo funciona"[\s\S]*href="#capitulo-se-juega"/);
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
});

describe("players story with reduced motion", () => {
  const html = render(<JugadoresStoryStatic />);

  it("is not pinned and shows every chapter in its final state", () => {
    expect(html).not.toContain('data-scene="pinned"');
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html.match(/<h2/g)).toHaveLength(4);
    for (const text of ["10/10", "No lo conozco", "33.6", "¿Quién fue la figura?"]) expect(html).toContain(text);
    expect(html).toContain('id="como-se-arman"');
    expect(html).toContain('id="capitulo-se-juega"');
  });
});
