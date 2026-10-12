import type { Metadata } from "next";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.arma2.com.ar"),
  title: "Arma2 - Organizá partidos. Armá equipos parejos.",
  description: "Organizá partidos de fútbol, encontrá jugadores, armá equipos parejos y registrá resultados con Arma2. Gratis para iOS y Android.",
  keywords: [
    "encontrar jugadores de fútbol",
    "organizar partidos",
    "fútbol 5",
    "fútbol 7",
    "jugar sin tener equipo",
    "partido automático",
    "jugadores cerca",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arma2 – Encontrá jugadores y organizá tu próximo partido",
    description: "Organizá partidos de fútbol, encontrá jugadores, armá equipos parejos y registrá resultados con Arma2. Gratis para iOS y Android.",
    url: "https://www.arma2.com.ar",
    type: "website",
    images: [
      {
        url: "https://www.arma2.com.ar/og-image.jpg?v=20260224",
        width: 1200,
        height: 630,
        alt: "Arma2 - Organizá partidos. Armá equipos parejos.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arma2 – Encontrá jugadores y organizá tu próximo partido",
    description: "Organizá partidos de fútbol, encontrá jugadores, armá equipos parejos y registrá resultados con Arma2. Gratis para iOS y Android.",
    images: ["https://www.arma2.com.ar/og-image.jpg?v=20260224"],
  },
};

export default function JugadoresLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
