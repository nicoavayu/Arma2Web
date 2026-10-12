import { torneosContent } from "@/lib/torneos-content";
import { TorneosEditorial } from "@/components/torneos/TorneosEditorial";

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

export default function TorneosPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        // Static, locally-built object — no user or remote input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <TorneosEditorial />
    </main>
  );
}
