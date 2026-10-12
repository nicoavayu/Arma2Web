"use client";

import { ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";
import { getSiteUrl, type Site } from "@/lib/site-urls";

/**
 * Link to the other public site. A plain <a>: each site has its own layout
 * and, in production, its own host.
 */
export function SiteSwitch({
  to,
  path = "/",
  label,
  className,
}: {
  to: Site;
  path?: string;
  /** Overrides the default "Torneos" / "Arma2 para jugadores" label. */
  label?: string;
  className?: string;
}) {
  const { t } = useLanguage();
  const copy = t.common.siteSwitch;
  const text = label ?? (to === "torneos" ? copy.toTorneos : copy.toJugadores);
  const aria = to === "torneos" ? copy.toTorneosAria : copy.toJugadoresAria;

  return (
    <a href={getSiteUrl(to, path)} aria-label={label ? undefined : aria} className={cn("inline-flex items-center gap-1", className)}>
      {text}
      <ArrowUpRight aria-hidden="true" className="h-[1em] w-[1em]" />
    </a>
  );
}
