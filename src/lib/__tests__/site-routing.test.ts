import { describe, expect, it } from "vitest";

import {
  DEFAULT_SITE_HOSTS,
  getSiteHosts,
  resolveSiteRoute,
  type SiteRouteResult,
} from "@/lib/site-routing";

const next: SiteRouteResult = { kind: "next" };
const rewrite = (pathname: string): SiteRouteResult => ({ kind: "rewrite", pathname });
const redirect = (url: string): SiteRouteResult => ({ kind: "redirect", url, status: 308 });

describe("resolveSiteRoute", () => {
  it.each<[string | null, string, string, SiteRouteResult]>([
    ["torneos.arma2.com.ar", "/", "", rewrite("/torneos")],
    ["torneos.arma2.com.ar", "/sitemap.xml", "", rewrite("/torneos/sitemap.xml")],
    ["torneos.arma2.com.ar", "/robots.txt", "", rewrite("/torneos/robots.txt")],
    ["torneos.arma2.com.ar", "/opengraph-image", "", rewrite("/torneos/opengraph-image")],
    ["torneos.arma2.com.ar", "/torneos/x", "?a=1", redirect("/x?a=1")],
    ["torneos.arma2.com.ar", "/torneos", "", redirect("/")],
    ["torneos.arma2.com.ar", "/torneos/opengraph-image", "?b5d3", next],
    ["Torneos.Arma2.com.ar:443", "/", "", rewrite("/torneos")],
    ["torneos.localhost:3000", "/", "", rewrite("/torneos")],
    ["torneos.arma2.com.ar", "/torneos/gallery/match-01.png", "", next],
    ["torneos.arma2.com.ar", "/_next/static/chunk.js", "", next],
    ["torneos.arma2.com.ar", "/logo_navbar.png", "", next],
    ["www.arma2.com.ar", "/torneos", "?intent=premium", redirect("https://torneos.arma2.com.ar/?intent=premium")],
    ["arma2.com.ar", "/torneos/planes", "", redirect("https://torneos.arma2.com.ar/planes")],
    ["www.arma2.com.ar", "/", "", next],
    ["localhost:3000", "/torneos", "", next],
    ["arma2-web-git-x.vercel.app", "/torneos", "", next],
    [null, "/torneos", "", next],
  ])("host %s + %s%s", (host, pathname, search, expected) => {
    expect(resolveSiteRoute({ host, pathname, search }, DEFAULT_SITE_HOSTS)).toEqual(expected);
  });

  it("does not treat /torneos-like prefixes as the Torneos section", () => {
    expect(
      resolveSiteRoute({ host: "www.arma2.com.ar", pathname: "/torneosx", search: "" }, DEFAULT_SITE_HOSTS),
    ).toEqual(next);
  });
});

describe("getSiteHosts", () => {
  it("normalizes overrides and keeps defaults for missing values", () => {
    expect(getSiteHosts({ NEXT_PUBLIC_TORNEOS_HOST: " T.example.com " })).toEqual({
      jugadores: DEFAULT_SITE_HOSTS.jugadores,
      torneos: "t.example.com",
    });
  });

  it("falls back to defaults when env is empty", () => {
    expect(getSiteHosts({})).toEqual(DEFAULT_SITE_HOSTS);
  });
});
