export const STORE_LINKS = {
  appStore: process.env.NEXT_PUBLIC_APP_STORE_URL || "https://apps.apple.com/ar/app/arma2/id6760599244",
  googlePlay: process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL || "https://play.google.com/store/apps/details?id=com.teambalancer.app",
} as const;
