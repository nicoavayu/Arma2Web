import { Hero } from "@/components/jugadores/Hero";
import { ComoSeArman } from "@/components/jugadores/ComoSeArman";
import { EnQueEstas } from "@/components/jugadores/EnQueEstas";
import { DespuesDelPartido } from "@/components/jugadores/DespuesDelPartido";
import { AutoMatch } from "@/components/AutoMatch";
import { Arqueros } from "@/components/Arqueros";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Equipos } from "@/components/Equipos";
import { TeamRanking } from "@/components/TeamRanking";
import { ImpactStats } from "@/components/ImpactStats";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <main className="premium-page-bg min-h-screen relative overflow-x-clip">
      <Hero />
      <ComoSeArman />
      <EnQueEstas />
      <DespuesDelPartido />
      <HowItWorks />
      <AutoMatch />
      <Arqueros />
      <Equipos />
      <TeamRanking />
      <Features />
      <ImpactStats />
      <FAQ />
      <CTA />
    </main>
  );
}
