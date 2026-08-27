/**
 * CTA destinations for the Arma2 Torneos landing (/torneos).
 *
 * This repository remains the institutional/marketing site only. Authentication,
 * tournament creation, Plan and checkout all live in the Arma2 product.
 *
 * WIRING CONTRACT
 * NEXT_PUBLIC_TORNEOS_APP_URL remains the deployment-level override. The verified
 * canonical product entry point is the safe default, so Preview deployments and
 * local builds never send Torneos CTAs to the mobile stores.
 *
 * NOT wired on purpose (out of scope for this landing): signup, checkout,
 * Mercado Pago, purchases and entitlements.
 */

/** Anchor used by the hero's secondary CTA ("Ver cómo funciona"). */
export const TORNEOS_HOW_ANCHOR = "#torneos-gestion";

/** Verified canonical entry point of the authenticated Torneos web product. */
const CANONICAL_TORNEOS_APP_URL = "https://app.arma2.com.ar/torneos";

/**
 * Authenticated Torneos entry point. Vercel can override it without a code
 * change if the product entry route ever moves.
 */
export const TORNEOS_APP_URL =
  process.env.NEXT_PUBLIC_TORNEOS_APP_URL?.trim() || CANONICAL_TORNEOS_APP_URL;

/** Existing contact route used only by the secondary "Hablar con nosotros" CTA. */
export const TORNEOS_CONTACT_HREF = "/contact";

export interface CtaTarget {
  href: string;
  /** True when the href leaves this site and needs target/rel. */
  isExternal: boolean;
}

/**
 * Destination for "Crear torneo gratis".
 * Always leaves the marketing site for the authenticated Torneos product.
 */
export function getCreateTournamentTarget(): CtaTarget {
  return { href: TORNEOS_APP_URL, isExternal: true };
}
