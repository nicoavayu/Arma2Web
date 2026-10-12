/**
 * Host-based routing between the two public sites served by this app:
 * arma2.com.ar (players) and torneos.arma2.com.ar (Torneos portal).
 *
 * Pure on purpose: `src/proxy.ts` only applies the result, so every rule is
 * covered by unit tests. Hosts that are neither site (localhost, Vercel
 * previews) pass through untouched, which keeps `/torneos` reviewable there.
 */

export interface SiteHosts {
  /** Lowercase hostname without port. */
  jugadores: string;
  /** Lowercase hostname without port. */
  torneos: string;
}

export const DEFAULT_SITE_HOSTS: SiteHosts = {
  jugadores: "www.arma2.com.ar",
  torneos: "torneos.arma2.com.ar",
};

export type SiteRouteResult =
  | { kind: "next" }
  | { kind: "rewrite"; pathname: string }
  | { kind: "redirect"; url: string; status: 308 };

const TORNEOS_PREFIX = "/torneos";
/** Lets `torneos.localhost:3000` behave like production in local dev. */
const LOCAL_TORNEOS_HOST = "torneos.localhost";
/** Metadata files that must resolve to the Torneos versions on its host. */
const TORNEOS_METADATA_FILES = new Set(["/robots.txt", "/sitemap.xml"]);

function normalizeHost(host: string | null | undefined): string {
  return (host ?? "").trim().toLowerCase().replace(/:\d+$/, "");
}

function normalizeEnvHost(value: string | undefined, fallback: string): string {
  const host = normalizeHost(value);
  return host || fallback;
}

export function getSiteHosts(env: Record<string, string | undefined> = {}): SiteHosts {
  return {
    jugadores: normalizeEnvHost(env.NEXT_PUBLIC_SITE_HOST, DEFAULT_SITE_HOSTS.jugadores),
    torneos: normalizeEnvHost(env.NEXT_PUBLIC_TORNEOS_HOST, DEFAULT_SITE_HOSTS.torneos),
  };
}

function isAssetPath(pathname: string): boolean {
  if (pathname.startsWith("/_next/") || pathname.startsWith("/api/")) {
    return true;
  }
  const lastSegment = pathname.slice(pathname.lastIndexOf("/") + 1);
  return lastSegment.includes(".");
}

/** Returns the path after `/torneos`, or null when the path is outside it. */
function stripTorneosPrefix(pathname: string): string | null {
  if (pathname === TORNEOS_PREFIX) {
    return "";
  }
  if (pathname.startsWith(`${TORNEOS_PREFIX}/`)) {
    return pathname.slice(TORNEOS_PREFIX.length);
  }
  return null;
}

function withoutWww(host: string): string {
  return host.startsWith("www.") ? host.slice(4) : host;
}

export function resolveSiteRoute(
  input: { host: string | null; pathname: string; search: string },
  hosts: SiteHosts = DEFAULT_SITE_HOSTS,
): SiteRouteResult {
  const host = normalizeHost(input.host);
  const { pathname, search } = input;
  const isTorneosHost = host === hosts.torneos || host === LOCAL_TORNEOS_HOST;

  if (isAssetPath(pathname) && !(isTorneosHost && TORNEOS_METADATA_FILES.has(pathname))) {
    return { kind: "next" };
  }

  const torneosRest = stripTorneosPrefix(pathname);

  if (isTorneosHost) {
    if (torneosRest !== null) {
      return { kind: "redirect", url: `${torneosRest || "/"}${search}`, status: 308 };
    }
    return { kind: "rewrite", pathname: pathname === "/" ? TORNEOS_PREFIX : `${TORNEOS_PREFIX}${pathname}` };
  }

  const isJugadoresHost = host !== "" && withoutWww(host) === withoutWww(hosts.jugadores);
  if (isJugadoresHost && torneosRest !== null) {
    return {
      kind: "redirect",
      url: `https://${hosts.torneos}${torneosRest || "/"}${search}`,
      status: 308,
    };
  }

  return { kind: "next" };
}
