"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getCreateTournamentTarget } from "@/lib/torneos-links";

const BASE =
  "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 active:scale-[0.98] outline-none";

const SIZES = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-6 text-base",
} as const;

const VARIANTS = {
  primary:
    "border border-primary/50 bg-gradient-to-r from-primary via-primary-glow to-accent-secondary text-white shadow-[0_0_22px_rgba(91,75,255,0.38)] hover:shadow-[0_0_30px_rgba(236,77,255,0.34)]",
  secondary:
    "border border-white/12 bg-white/[0.045] text-white backdrop-blur-md hover:border-primary/40 hover:bg-white/[0.08]",
} as const;

interface TorneosLinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  external?: boolean;
  className?: string;
}

/** Anchor styled like the site's Button, since every landing CTA is a link. */
export function TorneosLinkButton({
  href,
  children,
  variant = "primary",
  size = "lg",
  external = false,
  className,
}: TorneosLinkButtonProps) {
  const classes = cn(BASE, SIZES[size], VARIANTS[variant], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/**
 * Primary landing CTA ("Crear torneo gratis").
 * Destination resolves through `@/lib/torneos-links` — see the audit note there:
 * the authenticated Torneos destination is not defined in this repo yet.
 */
export function CreateTournamentCta({
  label,
  variant = "primary",
  size = "lg",
  className,
}: {
  label: string;
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const target = getCreateTournamentTarget();

  return (
    <TorneosLinkButton
      href={target.href}
      external={target.isExternal}
      variant={variant}
      size={size}
      className={className}
    >
      {label}
    </TorneosLinkButton>
  );
}
