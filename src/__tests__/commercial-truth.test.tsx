import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageProvider } from "@/components/LanguageProvider";
import { TorneosFooter } from "@/components/torneos/TorneosFooter";
import { TorneosPlanes } from "@/components/torneos/TorneosPlanes";
import { TorneosStory } from "@/components/torneos/TorneosStory";
import { COMMERCIAL, torneosContent } from "@/lib/torneos-content";
import { translations as i18nContent } from "@/lib/i18n";
import { torneosJsonLd } from "@/lib/torneos-jsonld";

const render = (node: React.ReactNode) => renderToStaticMarkup(<LanguageProvider>{node}</LanguageProvider>);
const all = (locale: "es" | "en") => JSON.stringify(torneosContent[locale]);

describe("Premium is on sale (public checkout open since 2026-10-15)", () => {
  it("is flagged available in the single commercial source", () => {
    expect(COMMERCIAL.premiumAvailable).toBe(true);
  });

  it("offers Premium with a purchase CTA that enters Torneos with the Premium intent", () => {
    const html = render(<TorneosPlanes />);
    expect(html).toContain("Elegir Premium");
    expect(html).toContain("https://app.arma2.com.ar/torneos?intent=premium");
    expect(html).toContain("«Mi plan»");
    expect(html).toContain('href="https://app.arma2.com.ar/terminos-de-venta"');
  });

  it("states the approved launch price and explains the season next to it", () => {
    const html = render(<TorneosPlanes />);
    expect(html).toContain("Precio de lanzamiento");
    expect(html).toContain(new Intl.NumberFormat("es-AR").format(COMMERCIAL.premiumPriceArs));
    expect(html).toMatch(/todas las categorías/);
    expect(html).toContain(`hasta ${COMMERCIAL.seasonMonths} meses`);
    expect(html).toMatch(/sin renovación automática/i);
  });

  it.each(["es", "en"] as const)("never says Premium is coming soon or can't be bought (%s)", (locale) => {
    expect(all(locale)).not.toMatch(/próximamente|todavía no se puede comprar|coming soon|can't be bought|once available/i);
  });

  it("shows both plans as available today", () => {
    const plans = torneosContent.es.plans;
    expect(plans.free.tag).toBe("Disponible hoy");
    expect(plans.premium.tag).toBe("Disponible hoy");
    expect(plans.free.features.join(" ")).not.toContain(String(COMMERCIAL.photosPremium));
    expect(plans.free.features.join(" ")).toContain(String(COMMERCIAL.photosFree));
  });

  it("lists the Premium offer in the structured data", () => {
    const offers = torneosJsonLd().app.offers;
    expect(offers.map((offer) => offer.name)).toEqual(["FREE", "Premium"]);
  });

  it("answers the Premium question with how it is bought, per the terms of sale", () => {
    const premium = torneosContent.es.faq.items.find((item) => item.question.includes("Premium"));
    expect(premium?.answer).toContain("«Mi plan»");
    expect(premium?.answer).toContain("Mercado Pago");
    expect(premium?.answer).toContain("Precio de lanzamiento");
    expect(premium?.answer).toMatch(/no cambia la fecha de cierre/);
    expect(premium?.answer).toMatch(/10 días corridos/);
  });

  it.each(["es", "en"] as const)("describes photos at season end as the terms do: may be deleted, no promised notice (%s)", (locale) => {
    const copy = torneosContent[locale];
    const photos = copy.faq.items.find((item) => /fotos|photos/.test(item.question));
    const text = `${photos?.answer} ${copy.plans.photosNotice}`;
    expect(text).toMatch(locale === "es" ? /pueden eliminarse/ : /may be deleted/);
    expect(text).toMatch(locale === "es" ? /descargalas antes de la fecha de fin/ : /download them before the end date/);
    expect(text).not.toMatch(/te vamos a avisar|se van a eliminar|let you know|will be deleted/i);
  });

  it("links the consumer buttons and the terms of sale of the app from the footer", () => {
    const html = render(<TorneosFooter />);
    expect(html).toContain("BOTÓN DE ARREPENTIMIENTO");
    expect(html).toContain("BOTÓN DE BAJA DE SERVICIO");
    expect(html).toContain('href="https://app.arma2.com.ar/arrepentimiento"');
    expect(html).toContain('href="https://app.arma2.com.ar/baja-del-servicio"');
    expect(html).toContain('href="https://app.arma2.com.ar/terminos-de-venta"');
  });

  it.each(["es", "en"] as const)("never says the table or the public page update on their own: the product recalculates and publishes (%s)", (locale) => {
    const text = `${all(locale)} ${JSON.stringify(i18nContent[locale])}`;
    expect(text).not.toMatch(/se actualiza todo|se ordena sola|se actualiza sola|se recalculan al instante|everything updates|sorts itself|updates itself|recalculate instantly/i);
    expect(JSON.stringify(torneosContent[locale].story)).toMatch(locale === "es" ? /Recalculás y publicás/ : /Recalculate and publish/);
  });

  it.each(["es", "en"] as const)("talks about organisers and Arma2-free posts, not owners or white-label (%s)", (locale) => {
    expect(all(locale)).not.toMatch(/owner|white-label/i);
  });

  it.each(["es", "en"] as const)("keeps the story on FREE posts, without Premium-only ones (%s)", (locale) => {
    expect(JSON.stringify(torneosContent[locale].story)).not.toMatch(/premium/i);
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
