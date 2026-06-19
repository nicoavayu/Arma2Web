import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { Equipos } from "@/components/Equipos";
import { TeamRanking } from "@/components/TeamRanking";
import { ImpactStats } from "@/components/ImpactStats";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <main className="premium-page-bg min-h-screen relative overflow-x-hidden">
      <Hero />
      <HowItWorks />
      <Equipos />
      <TeamRanking />
      <Features />
      <ImpactStats />
      <FAQ />
      <CTA />
    </main>
  );
}
