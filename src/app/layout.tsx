import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arma2 - Organizá partidos. Armá equipos parejos.",
  description: "La forma más simple de organizar tus partidos de fútbol. Crea equipos parejos, llevá estadísticas y votá al mejor jugador.",
  openGraph: {
    title: "Arma2 – Organizá partidos. Armá equipos parejos.",
    description: "La forma más simple de organizar tus partidos de fútbol. Creá equipos parejos, llevá estadísticas y votá al mejor jugador.",
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
    images: ["https://www.arma2.com.ar/og-image.jpg?v=20260224"],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
    shortcut: [{ url: "/favicon.ico" }],
  },
};

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${oswald.variable} antialiased bg-background text-text-primary selection:bg-primary/30 selection:text-white`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
