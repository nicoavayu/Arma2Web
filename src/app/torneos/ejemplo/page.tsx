import type { Metadata } from "next";

import { LocalizedMeta } from "@/components/shared/LocalizedMeta";
import { TorneosEjemplo } from "@/components/torneos/TorneosEjemplo";
import { torneosEjemploContent } from "@/lib/torneos-ejemplo-content";

import { alt as ogAlt, size as ogSize } from "../opengraph-image";

/** torneos.arma2.com.ar/ejemplo: the example tournament, with made-up data. */
const seo = torneosEjemploContent.es.seo;
/** The Torneos share image: a page-level openGraph would otherwise drop the inherited one. */
const shareImage = { url: "/torneos/opengraph-image", alt: ogAlt, ...ogSize };

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
    images: [shareImage],
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [shareImage] },
};

export default function TorneosEjemploPage() {
  return (
    <>
      <LocalizedMeta seo={{ es: torneosEjemploContent.es.seo, en: torneosEjemploContent.en.seo }} />
      <TorneosEjemplo />
    </>
  );
}
