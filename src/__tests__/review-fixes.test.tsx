import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageProvider } from "@/components/LanguageProvider";
import { UnaCarga } from "@/components/torneos/UnaCarga";
import NotFound from "@/app/not-found";
import { COMMERCIAL, torneosContent } from "@/lib/torneos-content";
import { torneosJsonLd } from "@/lib/torneos-jsonld";

const render = (node: React.ReactNode) => renderToStaticMarkup(<LanguageProvider>{node}</LanguageProvider>);

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === "__tests__" ? [] : sourceFiles(path);
    return path.endsWith(".tsx") ? [path] : [];
  });
}

describe("not-found page", () => {
  it("is branded and links back to both sites", () => {
    const html = render(<NotFound />);
    expect(html).toContain("<h1");
    expect(html).toMatch(/href="\/"/);
    expect(html).toMatch(/href="\/torneos"/);
  });
});

describe("una carga demo", () => {
  it("does not show a results plate from another tournament", () => {
    expect(render(<UnaCarga />)).not.toContain("round_results--portrait--default");
  });
});

describe("product URLs shown in the Torneos portal", () => {
  it.each(["es", "en"] as const)("use the real app host and paths (%s)", (locale) => {
    const copy = torneosContent[locale];
    expect(copy.publica.urlLabel).toMatch(/^app\.arma2\.com\.ar\/torneos\/publico\//);
    expect(copy.unaCarga.publicUrl).toMatch(/^app\.arma2\.com\.ar\/torneos\/publico\//);
  });

  it("frames manager captures with the manager's real host", () => {
    const source = readFileSync(join(process.cwd(), "src/components/shared/BrowserFrame.tsx"), "utf8");
    expect(source).toContain('urlLabel = "app.arma2.com.ar/torneos"');
  });
});

describe("commercial model single source (spec §6.1)", () => {
  const price = (locale: "es" | "en") =>
    new Intl.NumberFormat(locale === "es" ? "es-AR" : "en-US").format(COMMERCIAL.premiumPriceArs);

  it("feeds the JSON-LD Premium offer", () => {
    const offers = torneosJsonLd().app.offers;
    expect(offers.find((offer) => offer.name === "Premium")?.price).toBe(String(COMMERCIAL.premiumPriceArs));
  });

  it.each(["es", "en"] as const)("matches every price and limit written in the copy (%s)", (locale) => {
    const copy = torneosContent[locale];
    const faq = copy.faq.items.map((item) => item.answer).join(" ");
    expect(copy.plans.premium.price).toContain(price(locale));
    expect(faq).toContain(price(locale));
    expect(faq).toContain(String(COMMERCIAL.seasonMonths));
    expect(faq).toContain(String(COMMERCIAL.photosFree));
    expect(faq).toContain(String(COMMERCIAL.photosPremium));
    expect(copy.plans.renewal).toContain(String(COMMERCIAL.seasonMonths));
    expect(copy.plans.free.features.join(" ")).toContain(String(COMMERCIAL.photosFree));
    expect(copy.plans.premium.features.join(" ")).toContain(String(COMMERCIAL.photosPremium));
  });
});

describe("Social Studio poster labels", () => {
  it.each(["es", "en"] as const)("mark the scorers post as a Premium family (%s)", (locale) => {
    const scorers = torneosContent[locale].studio.posters.find((poster) => poster.src.includes("scorers"));
    expect(scorers?.meta).toContain("Premium");
  });
});

describe("accessibility floor (spec §9)", () => {
  const files = sourceFiles(join(process.cwd(), "src/components"));

  it("keeps small text at AA contrast (no white/40 or white/45)", () => {
    const offenders = files.filter((file) => /text-white\/4[05]\b/.test(readFileSync(file, "utf8")));
    expect(offenders).toEqual([]);
  });

  it("keeps buttons and toggles at 44px (no min-h-8/min-h-10 or h-10 w-10 controls)", () => {
    const offenders = files.filter((file) => /\b(min-h-8|min-h-10|h-10 w-10)\b/.test(readFileSync(file, "utf8")));
    expect(offenders).toEqual([]);
  });
});
