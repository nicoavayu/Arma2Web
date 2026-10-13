import { pickStore, STORE_LINKS } from "@/lib/store-links";

/**
 * Target of the download QR: phones go straight to their store, everything
 * else lands on the download section, which shows both stores.
 */
export const dynamic = "force-dynamic";

export function GET(request: Request): Response {
  const store = pickStore(request.headers.get("user-agent"));
  const target = store ? STORE_LINKS[store] : new URL("/#descargar", request.url).toString();
  return Response.redirect(target, 302);
}
