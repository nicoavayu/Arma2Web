import { torneosContent } from "@/lib/torneos-content";
import { LocalizedMeta } from "@/components/shared/LocalizedMeta";
import { TorneosCierre } from "@/components/torneos/TorneosCierre";
import { TorneosFaq } from "@/components/torneos/TorneosFaq";
import { TorneosHero } from "@/components/torneos/TorneosHero";
import { UnaCarga } from "@/components/torneos/UnaCarga";
import { TorneosGestion } from "@/components/torneos/TorneosGestion";
import { TorneosPublica } from "@/components/torneos/TorneosPublica";
import { TorneosStudio } from "@/components/torneos/TorneosStudio";
import { TorneosMedia } from "@/components/torneos/TorneosMedia";
import { TorneosPlanes } from "@/components/torneos/TorneosPlanes";

/**
 * Server component: ships the FAQ JSON-LD. Metadata lives in `torneos/layout.tsx`.
 * The editorial experience is client-rendered because it follows the ES/EN switch.
 */
/** FAQ structured data, generated from the same copy rendered on the page. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: torneosContent.es.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/** Offers mirror `plans` (spec §6.1). */
const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Arma2 Torneos",
  applicationCategory: "SportsApplication",
  operatingSystem: "Web",
  description: torneosContent.es.seo.description,
  offers: [
    { "@type": "Offer", name: "FREE", price: "0", priceCurrency: "ARS" },
    { "@type": "Offer", name: "Premium", price: "20000", priceCurrency: "ARS" },
  ],
};

export default function TorneosPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#070711] pt-16">
      <script
        type="application/ld+json"
        // Static, locally-built object — no user or remote input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqJsonLd, appJsonLd]) }}
      />

      <LocalizedMeta seo={{ es: torneosContent.es.seo, en: torneosContent.en.seo }} />
      <TorneosHero />
      <UnaCarga />
      <TorneosGestion />
      <TorneosPublica />
      <TorneosStudio />
      <TorneosMedia />
      <TorneosPlanes />
      <TorneosFaq />
      <TorneosCierre />
    </main>
  );
}
