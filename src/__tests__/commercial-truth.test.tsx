import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageProvider } from "@/components/LanguageProvider";
import { TorneosPlanes } from "@/components/torneos/TorneosPlanes";
import { TorneosStory } from "@/components/torneos/TorneosStory";
import { COMMERCIAL, torneosContent } from "@/lib/torneos-content";
import { torneosJsonLd } from "@/lib/torneos-jsonld";

const render = (node: React.ReactNode) => renderToStaticMarkup(<LanguageProvider>{node}</LanguageProvider>);
const all = (locale: "es" | "en") => JSON.stringify(torneosContent[locale]);

describe("Premium is not on sale yet (payments are off)", () => {
  it("is flagged unavailable in the single commercial source", () => {
    expect(COMMERCIAL.premiumAvailable).toBe(false);
  });

  it("shows Premium as coming soon, with no purchase link", () => {
    const html = render(<TorneosPlanes />);
    expect(html).toContain("Próximamente");
    expect(html).not.toContain("intent=premium");
    expect(html).not.toContain("Elegir Premium");
  });

  it("states the approved launch price and explains the season next to it", () => {
    const html = render(<TorneosPlanes />);
    expect(html).toContain("Precio de lanzamiento");
    expect(html).toContain(new Intl.NumberFormat("es-AR").format(COMMERCIAL.premiumPriceArs));
    expect(html).toMatch(/todas las categorías/);
    expect(html).toContain(`hasta ${COMMERCIAL.seasonMonths} meses`);
    expect(html).toMatch(/sin renovación automática/i);
  });

  it("keeps future conditions apart from what FREE offers today", () => {
    const plans = torneosContent.es.plans;
    expect(plans.free.tag).toBe("Disponible hoy");
    expect(plans.free.features.join(" ")).not.toContain(String(COMMERCIAL.photosPremium));
    expect(plans.free.features.join(" ")).toContain(String(COMMERCIAL.photosFree));
    expect(plans.premium.tag).toBe("Próximamente");
  });

  it("leaves the Premium offer out of the structured data until it can be bought", () => {
    const offers = torneosJsonLd().app.offers;
    expect(offers.map((offer) => offer.name)).toEqual(["FREE"]);
  });

  it.each(["es", "en"] as const)("talks about organisers and Arma2-free posts, not owners or white-label (%s)", (locale) => {
    expect(all(locale)).not.toMatch(/owner|white-label/i);
  });

  it.each(["es", "en"] as const)("doesn't show Premium-only posts in the story while Premium is off (%s)", (locale) => {
    expect(JSON.stringify(torneosContent[locale].story)).not.toMatch(/premium/i);
  });

  it("answers the Premium question as not purchasable yet", () => {
    const premium = torneosContent.es.faq.items.find((item) => item.question.includes("Premium"));
    expect(premium?.answer).toMatch(/todavía no se puede comprar/);
    expect(premium?.answer).toContain("Precio de lanzamiento");
  });

  it("separates today's photo limit from the future deletion rule", () => {
    const photos = torneosContent.es.faq.items.find((item) => item.question.includes("fotos"));
    expect(photos?.answer).toMatch(/^Hoy/);
    expect(photos?.answer).toMatch(/Próximamente/);
  });

  it("shares FREE posts (results and standings) in the story", () => {
    const html = render(<TorneosStory />);
    expect(html).toContain(torneosContent.es.story.posters.standings);
  });

  it("explains captain registration with the product's own steps", () => {
    const faq = torneosContent.es.faq.items.find((item) => item.question.includes("inscriben"));
    expect(faq?.answer).toContain("«Explorar torneos»");
    expect(faq?.answer).toContain("«Solicitudes de inscripción»");
    expect(faq?.answer).toMatch(/aprobás.*pedís cambios.*rechazás/);
  });

  it.each(["es", "en"] as const)("says rescheduling notices are in-app only (%s)", (locale) => {
    const faq = torneosContent[locale].faq.items[torneosContent.es.faq.items.findIndex((item) => item.question.includes("reprogramar"))];
    expect(faq.answer).toMatch(locale === "es" ? /solo dentro de la app: no se envían emails ni notificaciones push/ : /in-app only: no emails or push notifications/);
  });
});
