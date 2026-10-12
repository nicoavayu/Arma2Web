/** Served as torneos.arma2.com.ar/robots.txt through the host proxy. */
export function GET(): Response {
  return new Response(
    "User-agent: *\nAllow: /\nSitemap: https://torneos.arma2.com.ar/sitemap.xml\n",
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
