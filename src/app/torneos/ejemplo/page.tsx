import type { Metadata } from "next";

import { LocalizedMeta } from "@/components/shared/LocalizedMeta";
import { TorneosEjemplo } from "@/components/torneos/TorneosEjemplo";
import { TorneosFooter } from "@/components/torneos/TorneosFooter";
import { TorneosNav } from "@/components/torneos/TorneosNav";
import { getSiteUrl } from "@/lib/site-urls";
import { torneosContent } from "@/lib/torneos-content";

/** torneos.arma2.com.ar/ejemplo: the example tournament, with made-up data. */
const seo = torneosContent.es.ejemplo.seo;
const home = getSiteUrl("torneos", "/");

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: "/ejemplo" },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: "https://torneos.arma2.com.ar/ejemplo",
    siteName: "Arma2 Torneos",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
};

export default function TorneosEjemploPage() {
  return (
    <>
      <TorneosNav homeHref={home} />
      <LocalizedMeta seo={{ es: torneosContent.es.ejemplo.seo, en: torneosContent.en.ejemplo.seo }} />
      <TorneosEjemplo />
      <TorneosFooter homeHref={home} />
    </>
  );
}
