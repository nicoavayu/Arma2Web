import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageProvider } from "@/components/LanguageProvider";
import { JugadoresFooter } from "@/components/jugadores/JugadoresFooter";
import { JugadoresNav } from "@/components/jugadores/JugadoresNav";

const render = (node: React.ReactNode) => renderToStaticMarkup(<LanguageProvider>{node}</LanguageProvider>);
/** Visible text only: drop accessible-name attributes before searching. */
const visible = (html: string) => html.replace(/\s(aria-label|alt|title)="[^"]*"/g, "");

describe("players nav", () => {
  const html = render(<JugadoresNav />);

  it("shows only the ball mark as the home link, never the word Arma2", () => {
    expect(html).toContain('data-brand-mark="nav"');
    expect(html).toMatch(/<a(?=[^>]*href="\/")(?=[^>]*aria-label="[^"]*Arma2[^"]*")[^>]*>/);
    expect(visible(html)).not.toMatch(/>\s*Arma2\s*</);
  });
});

describe("players footer", () => {
  it("uses the official wordmark instead of typing the brand", () => {
    const html = render(<JugadoresFooter />);
    expect(html).toMatch(/<img[^>]*alt="Arma2"/);
    expect(visible(html)).not.toMatch(/>\s*Arma2\s*</);
  });
});
