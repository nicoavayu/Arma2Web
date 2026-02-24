export const STORE_LINKS = {
  appStore: process.env.NEXT_PUBLIC_APP_STORE_URL || "https://apps.apple.com",
  googlePlay: process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL || "https://play.google.com/store/apps",
} as const;
