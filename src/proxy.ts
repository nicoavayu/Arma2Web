import { NextResponse, type NextRequest } from "next/server";

import { getSiteHosts, resolveSiteRoute } from "@/lib/site-routing";

/**
 * Serves torneos.arma2.com.ar from the `/torneos` routes and sends
 * arma2.com.ar/torneos to the Torneos host. Rules live in `site-routing.ts`.
 */
export function proxy(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;
  const result = resolveSiteRoute(
    { host: request.headers.get("host"), pathname, search },
    getSiteHosts(process.env),
  );

  switch (result.kind) {
    case "rewrite":
      return NextResponse.rewrite(new URL(`${result.pathname}${search}`, request.url));
    case "redirect":
      return NextResponse.redirect(new URL(result.url, request.url), result.status);
    default:
      return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
