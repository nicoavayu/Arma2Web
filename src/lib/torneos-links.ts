/**
 * CTA destinations for the Arma2 Torneos landing (/torneos).
 *
 * AUDIT RESULT (see docs/torneos-landing-gaps.md):
 * This repository is the institutional/marketing site only. It contains no
 * authenticated Arma2 surface, no auth, no Supabase client and no reference to
 * the Torneos web app. So the real destination of "Crear torneo gratis" is NOT
 * defined here yet.
 *
 * WIRING CONTRACT
 * Set NEXT_PUBLIC_TORNEOS_APP_URL (e.g. the "create tournament" entry point of
 * the authenticated Torneos web experience) and every primary CTA on the landing
 * switches to it automatically — external link, no component changes needed.
 *
 * While that variable is unset, the primary CTA falls back to the in-page
 * "empezar" section, which offers the only destinations this repo can honestly
 * promise today: the real App Store / Google Play listings. Nothing is broken
 * and no fabricated URL is shipped.
 *
 * NOT wired on purpose (out of scope for this landing): signup, checkout,
 * Mercado Pago, subscriptions, entitlements.
 */

/** Anchor of the closing section that hosts the store buttons. */
export const TORNEOS_START_ANCHOR = "#torneos-empezar";

/** Anchor used by the hero's secondary CTA ("Ver cómo funciona"). */
export const TORNEOS_HOW_ANCHOR = "#torneos-gestion";

/**
 * Authenticated Torneos entry point. `null` until the destination is defined.
 * PLACEHOLDER: provide via env, do not hardcode a guessed URL here.
 */
export const TORNEOS_APP_URL: string | null =
  process.env.NEXT_PUBLIC_TORNEOS_APP_URL?.trim() || null;

/** Where the PRO / "quiero saber más" CTA goes until commercial flows exist. */
export const TORNEOS_CONTACT_HREF = "/contact";

export interface CtaTarget {
  href: string;
  /** True when the href leaves this site and needs target/rel. */
  isExternal: boolean;
}

/**
 * Destination for "Crear torneo gratis".
 * Returns the configured app URL when present, otherwise the in-page anchor.
 */
export function getCreateTournamentTarget(): CtaTarget {
  if (TORNEOS_APP_URL) {
    return { href: TORNEOS_APP_URL, isExternal: true };
  }

  return { href: TORNEOS_START_ANCHOR, isExternal: false };
}

/** True while the landing is running without an authenticated destination. */
export function isCreateTournamentPending(): boolean {
  return TORNEOS_APP_URL === null;
}
