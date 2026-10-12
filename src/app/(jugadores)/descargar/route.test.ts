import { describe, expect, it } from "vitest";

import { GET } from "./route";
import { STORE_LINKS } from "@/lib/store-links";

const request = (userAgent?: string) =>
  new Request("https://www.arma2.com.ar/descargar", {
    headers: userAgent ? { "user-agent": userAgent } : {},
  });

describe("GET /descargar", () => {
  it("redirects iPhone visitors to the App Store", () => {
    const response = GET(request("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)"));
    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe(STORE_LINKS.appStore);
  });

  it("redirects Android visitors to Google Play", () => {
    const response = GET(request("Mozilla/5.0 (Linux; Android 14; Pixel 8)"));
    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe(STORE_LINKS.googlePlay);
  });

  it("sends desktop visitors to the download section", () => {
    const response = GET(request("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/129.0"));
    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toMatch(/\/#descargar$/);
  });

  it("sends requests without a user agent to the download section", () => {
    const response = GET(request());
    expect(response.headers.get("location")).toMatch(/\/#descargar$/);
  });
});
