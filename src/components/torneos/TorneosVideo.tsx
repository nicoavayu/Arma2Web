"use client";

import Image from "next/image";
import { Play } from "lucide-react";

import { SECTION_PAD, SectionHead } from "@/components/torneos/SectionHead";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { showTorneosVideo, TORNEOS_VIDEO } from "@/lib/torneos-video";
import { cn } from "@/lib/utils";

/**
 * The one-minute explainer, right under the hero. With a video file it is a native player that loads nothing until
 * played (`preload="none"`); without one it only renders outside Production, as a labelled poster.
 */
export function TorneosVideo() {
  const copy = useTorneosContent().video;
  if (!showTorneosVideo()) return null;
  const src = TORNEOS_VIDEO.src;

  return (
    <section id="torneos-video" aria-labelledby="torneos-video-titulo" className={cn("relative bg-[#04050d] py-14 text-white md:py-24", SECTION_PAD)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_50%_45%,rgba(108,77,255,0.2),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1100px]">
        <SectionHead id="torneos-video-titulo" eyebrow={copy.eyebrow} title={copy.title} accent={copy.accent} lead={copy.lead} align="center" />
        <div className="relative mx-auto mt-8 aspect-video w-full overflow-hidden rounded-[22px] border border-white/12 bg-[#0b0c18] shadow-[0_40px_120px_-40px_rgba(108,77,255,0.7)] md:mt-12 md:rounded-[28px]">
          {src ? (
            <video className="h-full w-full object-cover" controls preload="none" playsInline poster={TORNEOS_VIDEO.poster} aria-label={copy.play}>
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            <div className="relative h-full w-full">
              <Image src={TORNEOS_VIDEO.poster} alt="" fill sizes="(max-width: 1100px) 92vw, 1100px" className="object-contain p-[4%] opacity-70" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(closest-side,rgba(4,5,13,0.55),rgba(4,5,13,0.15))]">
                <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#3a22c9] md:h-20 md:w-20">
                  <Play className="ml-1 h-7 w-7 md:h-9 md:w-9" fill="currentColor" />
                </span>
                <span className="rounded-full bg-black/55 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white/90">{copy.placeholder}</span>
              </div>
            </div>
          )}
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white/90">{copy.duration}</span>
        </div>
      </div>
    </section>
  );
}
