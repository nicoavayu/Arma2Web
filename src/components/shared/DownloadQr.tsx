"use client";

import Image from "next/image";

import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

/** Desktop-only QR to /descargar; phones already get their store button. */
export function DownloadQr({ className }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <div className={cn("hidden items-center gap-3 md:flex", className)}>
      <div className="rounded-lg bg-white p-1.5">
        <Image src="/descargar-qr.svg" alt={t.common.qrAlt} width={76} height={76} unoptimized />
      </div>
      <p className="max-w-[9rem] text-sm leading-snug text-current opacity-75">{t.common.qrCaption}</p>
    </div>
  );
}
