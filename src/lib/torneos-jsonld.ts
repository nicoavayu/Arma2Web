import { COMMERCIAL, torneosContent } from "@/lib/torneos-content";

/**
 * Structured data for the Torneos portal, built from the same copy and the
 * same commercial constants the page renders (default locale).
 */
export function torneosJsonLd() {
  const copy = torneosContent.es;

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Arma2 Torneos",
    applicationCategory: "SportsApplication",
    operatingSystem: "Web",
    description: copy.seo.description,
    offers: [
      { "@type": "Offer", name: "FREE", price: "0", priceCurrency: "ARS" },
      { "@type": "Offer", name: "Premium", price: String(COMMERCIAL.premiumPriceArs), priceCurrency: "ARS" },
    ],
  };

  return { faq, app };
}
