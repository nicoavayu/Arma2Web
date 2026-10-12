"use client";

import Image from "next/image";

import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { cn } from "@/lib/utils";

const PHOTOS = [
  "/torneos/gallery/match-01.webp",
  "/torneos/gallery/match-02.webp",
  "/torneos/gallery/team-01.webp",
  "/torneos/gallery/match-03.webp",
  "/torneos/gallery/goalkeeper-01.webp",
  "/torneos/gallery/celebration-01.webp",
];

/** Gallery UI with example photos (spec §4.3: only inside the product UI). */
export function TorneosMedia() {
  const copy = useTorneosContent().media;

  return (
    <section id="torneos-multimedia" className="scroll-mt-16 bg-[#070711] text-white">
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-[clamp(2rem,4.8vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em]">{copy.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">{copy.body}</p>
        </div>
        <figure className="rounded-xl border border-white/10 bg-[#10142a] p-4">
          <div className="flex items-baseline justify-between gap-3">
            <p>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8f84ff]">{copy.round}</span>
              <strong className="ml-2 font-semibold">{copy.galleryLabel}</strong>
            </p>
            <span className="text-xs text-white/50">{copy.match}</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {PHOTOS.map((src, index) => (
              <div key={src} className={cn("relative overflow-hidden rounded-md bg-white/5", index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square")}>
                <Image src={src} alt={copy.photos[index]} fill sizes={index === 0 ? "(max-width: 1024px) 60vw, 440px" : "(max-width: 1024px) 30vw, 220px"} className="object-cover" />
              </div>
            ))}
          </div>
          <figcaption className="mt-3 text-xs text-white/55">{copy.exampleNote}</figcaption>
        </figure>
      </div>
    </section>
  );
}
