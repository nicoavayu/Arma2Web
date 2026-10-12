"use client";

import Image from "next/image";

import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";
import { getShot, type ShotId } from "@/lib/shots";

/** A real desktop capture inside a minimal browser window. */
export function BrowserFrame({
  id,
  urlLabel = "app.arma2.com.ar/torneos",
  priority = false,
  sizes = "(max-width: 1024px) 92vw, 720px",
  className,
}: {
  id: ShotId;
  urlLabel?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const { locale } = useLanguage();
  const shot = getShot(id, locale);

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-black/10 bg-[#0d0f1c] shadow-[0_30px_70px_-25px_rgba(7,7,17,0.55)]",
        className,
      )}
    >
      <div aria-hidden="true" className="flex items-center gap-3 border-b border-white/10 bg-[#15172a] px-3 py-2">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        </span>
        <span className="truncate rounded-md bg-white/10 px-3 py-0.5 text-[11px] text-white/70">{urlLabel}</span>
      </div>
      <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={sizes} priority={priority} className="block h-auto w-full" />
    </figure>
  );
}
