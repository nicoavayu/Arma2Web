"use client";

import { SECTION_PAD, SectionHead } from "@/components/torneos/SectionHead";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { TORNEOS_VIDEO, torneosVideoSrc } from "@/lib/torneos-video";
import { cn } from "@/lib/utils";

/**
 * The explainer (v11, 1:31), right under the hero: a native player that loads nothing until played
 * (`preload="none"`). Hidden in Production until NEXT_PUBLIC_TORNEOS_VIDEO_URL is set (see torneos-video.ts).
 */
export function TorneosVideo() {
  const copy = useTorneosContent().video;
  const src = torneosVideoSrc();
  if (!src) return null;

  return (
    <section id="torneos-video" aria-labelledby="torneos-video-titulo" className={cn("relative bg-[#04050d] py-14 text-white md:py-24", SECTION_PAD)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_50%_45%,rgba(108,77,255,0.2),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1100px]">
        <SectionHead id="torneos-video-titulo" eyebrow={copy.eyebrow} title={copy.title} accent={copy.accent} lead={copy.lead} align="center" />
        <div className="relative mx-auto mt-8 aspect-video w-full overflow-hidden rounded-[22px] border border-white/12 bg-[#0b0c18] shadow-[0_40px_120px_-40px_rgba(108,77,255,0.7)] md:mt-12 md:rounded-[28px]">
          <video className="h-full w-full object-cover" controls preload="none" playsInline poster={TORNEOS_VIDEO.poster} aria-label={copy.play}>
            <source src={src} type="video/mp4" />
          </video>
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white/90">{copy.duration}</span>
        </div>
      </div>
    </section>
  );
}
