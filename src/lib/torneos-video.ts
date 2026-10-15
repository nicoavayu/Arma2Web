/**
 * The explainer video under the hero ("Arma2 Torneos en un minuto").
 *
 * The video is produced in a separate track (script approved by Nico first). Until its file exists, `src` is null:
 * Production leaves the section out, and previews/local show the poster labelled "Video en preparación" so the
 * layout can be reviewed. Set NEXT_PUBLIC_TORNEOS_VIDEO_URL (an mp4 served by this site or a CDN) to publish it.
 */
export const TORNEOS_VIDEO = {
  src: process.env.NEXT_PUBLIC_TORNEOS_VIDEO_URL?.trim() || null,
  /** 16:9 still shown before playing. Until the video's own frame exists, the manager render. */
  poster: "/torneos/pc-torneos.webp",
} as const;

/** Whether the video block renders: always with a file; without one, only outside Production. */
export function showTorneosVideo(env: string | undefined = process.env.NEXT_PUBLIC_VERCEL_ENV, src: string | null = TORNEOS_VIDEO.src): boolean {
  return Boolean(src) || env !== "production";
}
