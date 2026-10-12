"use client";

import Image from "next/image";

import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";
import { getShot, type ShotId } from "@/lib/shots";

/**
 * A real product capture inside a CSS phone frame. The frame is drawn here,
 * not baked into the image, so captures can be regenerated without editing.
 */
export function PhoneFrame({
  id,
  priority = false,
  sizes = "(max-width: 768px) 70vw, 320px",
  className,
}: {
  id: ShotId;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const { locale } = useLanguage();
  const shot = getShot(id, locale);

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[2.6rem] border-[10px] border-[#0d0f1c] bg-[#0d0f1c] pt-[1.6rem] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65)] ring-1 ring-white/10",
        className,
      )}
    >
      <div aria-hidden="true" className="absolute left-1/2 top-1 z-10 h-[1.1rem] w-[30%] -translate-x-1/2 rounded-full bg-black" />
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full rounded-b-[1.9rem]"
      />
    </figure>
  );
}
