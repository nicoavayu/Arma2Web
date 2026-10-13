export const STORE_LINKS = {
  appStore: process.env.NEXT_PUBLIC_APP_STORE_URL || "https://apps.apple.com/ar/app/arma2/id6760599244",
  googlePlay: process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL || "https://play.google.com/store/apps/details?id=com.teambalancer.app",
} as const;

export type Store = keyof typeof STORE_LINKS;

/**
 * The store for the visitor's phone, or null when the device is unknown.
 * iPadOS 13+ reports a Mac user agent; it gets null on purpose so nobody is
 * sent to the wrong store (the page then shows both).
 */
export function pickStore(userAgent: string | null | undefined): Store | null {
  if (!userAgent) {
    return null;
  }
  if (/iPhone|iPad|iPod/.test(userAgent)) {
    return "appStore";
  }
  if (/Android/.test(userAgent)) {
    return "googlePlay";
  }
  return null;
}
