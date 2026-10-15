/**
 * The explainer video under the hero ("Mirá cómo funciona Arma2 Torneos", 1:31).
 *
 * v11 (v10 montage + voice approved by Nico 2026-10-15; new background music/SFX, 90.9 s): a 720p web encode of the master is served by this site
 * (`/torneos/video/arma2-torneos-v11.mp4`, ~6.8 MB, faststart). Its claims must match what is live before it goes
 * public (sponsors, Torneos in the store apps), so Production only shows it once NEXT_PUBLIC_TORNEOS_VIDEO_URL is
 * set (to that path or a CDN copy). Previews and local builds always play the bundled file for review.
 */
export const TORNEOS_VIDEO_FILE = "/torneos/video/arma2-torneos-v11.mp4";

const ENV_SRC = process.env.NEXT_PUBLIC_TORNEOS_VIDEO_URL?.trim() || null;

export const TORNEOS_VIDEO = {
  src: ENV_SRC,
  /**
   * Silent preview that loops before the visitor presses play: v11 66.85 s → 71.75 s (the Premium styles, then the
   * sponsors band), with a slow continuous zoom so nothing is ever still. ~0.4 MB, no audio track.
   */
  loop: "/torneos/video/arma2-torneos-v11-loop.mp4",
  /** Still for reduced motion and before the loop loads: a frame of that same passage (v11 at 71.2 s). */
  poster: "/torneos/video/poster-v11-sponsors.webp",
} as const;

/** The file to play: the configured URL, or the bundled file outside Production; null hides the block. */
export function torneosVideoSrc(env: string | undefined = process.env.NEXT_PUBLIC_VERCEL_ENV, src: string | null = ENV_SRC): string | null {
  if (src) return src;
  return env === "production" ? null : TORNEOS_VIDEO_FILE;
}

/** Whether the video block renders: Production needs the explicit URL; previews and local always. */
export function showTorneosVideo(env: string | undefined = process.env.NEXT_PUBLIC_VERCEL_ENV, src: string | null = ENV_SRC): boolean {
  return torneosVideoSrc(env, src) !== null;
}
