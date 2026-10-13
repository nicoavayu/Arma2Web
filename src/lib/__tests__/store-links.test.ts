import { describe, expect, it } from "vitest";

import { pickStore } from "@/lib/store-links";

const UA = {
  iphone:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  ipad: "Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
  android:
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36",
  ipadosDesktop:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
  chromeDesktop:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36",
  googlebot: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
};

describe("pickStore", () => {
  it("sends iPhone to the App Store", () => {
    expect(pickStore(UA.iphone)).toBe("appStore");
  });

  it("sends iPad to the App Store", () => {
    expect(pickStore(UA.ipad)).toBe("appStore");
  });

  it("sends Android to Google Play", () => {
    expect(pickStore(UA.android)).toBe("googlePlay");
  });

  it("does not guess for iPadOS reporting a Mac user agent", () => {
    expect(pickStore(UA.ipadosDesktop)).toBeNull();
  });

  it("does not guess for desktop browsers or bots", () => {
    expect(pickStore(UA.chromeDesktop)).toBeNull();
    expect(pickStore(UA.googlebot)).toBeNull();
  });

  it("handles missing user agents", () => {
    expect(pickStore("")).toBeNull();
    expect(pickStore(null)).toBeNull();
    expect(pickStore(undefined)).toBeNull();
  });
});
