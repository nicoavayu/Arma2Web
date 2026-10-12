import { Hero } from "@/components/jugadores/Hero";
import { ComoSeArman } from "@/components/jugadores/ComoSeArman";
import { EnQueEstas } from "@/components/jugadores/EnQueEstas";
import { DespuesDelPartido } from "@/components/jugadores/DespuesDelPartido";
import { Preguntas } from "@/components/jugadores/Preguntas";
import { BandaTorneos } from "@/components/jugadores/BandaTorneos";
import { Descargar } from "@/components/jugadores/Descargar";
import { LocalizedMeta } from "@/components/shared/LocalizedMeta";
import { translations } from "@/lib/i18n";
import { STORE_LINKS } from "@/lib/store-links";

/** Structured data built from the same copy the page renders (default locale). */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: translations.es.home.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "Arma2",
  operatingSystem: "iOS, Android",
  applicationCategory: "SportsApplication",
  description: translations.es.home.hero.lead,
  offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
  downloadUrl: [STORE_LINKS.appStore, STORE_LINKS.googlePlay],
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <script
        type="application/ld+json"
        // Static, locally-built objects — no user or remote input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqJsonLd, appJsonLd]) }}
      />
      <LocalizedMeta seo={{ es: translations.es.seo, en: translations.en.seo }} />
      <Hero />
      <ComoSeArman />
      <EnQueEstas />
      <DespuesDelPartido />
      <Preguntas />
      <BandaTorneos />
      <Descargar />
    </main>
  );
}
