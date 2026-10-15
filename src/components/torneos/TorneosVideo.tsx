"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";

import { SECTION_PAD, SectionHead } from "@/components/torneos/SectionHead";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { TORNEOS_VIDEO, torneosVideoSrc } from "@/lib/torneos-video";
import { cn } from "@/lib/utils";

/**
 * The explainer (v11, 1:31), right under the hero. Until the visitor presses play, a silent excerpt loops (the
 * Premium styles and the sponsors band, always moving); «Ver el video completo» swaps in the full video with sound.
 * With reduced motion the excerpt does not autoplay: the still of that passage shows instead. Hidden in Production
 * until NEXT_PUBLIC_TORNEOS_VIDEO_URL is set (see torneos-video.ts).
 */
export function TorneosVideo() {
  const copy = useTorneosContent().video;
  const src = torneosVideoSrc();
  const reduceMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const fullRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playing) fullRef.current?.play().catch(() => {});
  }, [playing]);

  if (!src) return null;

  return (
    <section id="torneos-video" aria-labelledby="torneos-video-titulo" className={cn("relative bg-[#04050d] py-14 text-white md:py-24", SECTION_PAD)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_50%_45%,rgba(108,77,255,0.2),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1100px]">
        <SectionHead id="torneos-video-titulo" eyebrow={copy.eyebrow} title={copy.title} accent={copy.accent} lead={copy.lead} align="center" />
        <div className="relative mx-auto mt-8 aspect-video w-full overflow-hidden rounded-[22px] border border-white/12 bg-[#0b0c18] shadow-[0_40px_120px_-40px_rgba(108,77,255,0.7)] md:mt-12 md:rounded-[28px]">
          {playing ? (
            <video ref={fullRef} className="h-full w-full object-cover" controls playsInline preload="auto" poster={TORNEOS_VIDEO.poster} aria-label={copy.play} data-video="full">
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 h-full w-full cursor-pointer"
              aria-label={`${copy.play} (${copy.duration})`}
            >
              <video
                className="h-full w-full object-cover"
                src={TORNEOS_VIDEO.loop}
                poster={TORNEOS_VIDEO.poster}
                muted
                loop
                playsInline
                autoPlay={!reduceMotion}
                preload={reduceMotion ? "none" : "auto"}
                aria-hidden="true"
                tabIndex={-1}
                data-video="loop"
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(4,5,13,0.65))]" aria-hidden="true" />
              <span className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap rounded-full bg-white px-5 py-3 text-sm font-bold text-[#24127a] shadow-[0_12px_34px_-10px_rgba(0,0,0,0.6)] transition-transform group-hover:-translate-y-0.5 md:bottom-6 md:text-base">
                <Play aria-hidden="true" className="h-4 w-4" fill="currentColor" />
                {copy.watch}
              </span>
            </button>
          )}
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white/90">{copy.duration}</span>
        </div>
      </div>
    </section>
  );
}
