import { getSiteHosts } from "@/lib/site-routing";

export type Site = "jugadores" | "torneos";

/**
 * Literal reads so Next inlines the values in client bundles; a bare
 * `process.env` object is empty in the browser.
 */
const PUBLIC_ENV: Record<string, string | undefined> = {
  NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
  NEXT_PUBLIC_SITE_HOST: process.env.NEXT_PUBLIC_SITE_HOST,
  NEXT_PUBLIC_TORNEOS_HOST: process.env.NEXT_PUBLIC_TORNEOS_HOST,
};

/**
 * Link to one of the two public sites. Production links are absolute (they
 * live on different hosts). Locally and in Vercel previews both sites share
 * one host, so Torneos is reached under `/torneos`.
 */
export function getSiteUrl(
  site: Site,
  path: string = "/",
  env: Record<string, string | undefined> = PUBLIC_ENV,
): string {
  if (env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    return `https://${getSiteHosts(env)[site]}${path}`;
  }

  if (site === "jugadores") {
    return path;
  }

  if (path === "/") {
    return "/torneos";
  }
  return path.startsWith("#") || path.startsWith("/#")
    ? `/torneos${path.replace(/^\//, "")}`
    : `/torneos${path}`;
}
