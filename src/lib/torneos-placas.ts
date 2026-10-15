/**
 * Social Studio posts shown on the portal. They are REAL exports of the product's renderer (Armado_Equipos,
 * scripts/qa/social-studio offline harness) with the made-up Copa Primavera 2026 league, converted to WebP in
 * public/torneos/placas/. Source PNGs and how they were made: arma2-torneos-rediseno/assets/placas/README.md.
 *
 * While the list is empty the section falls back to the HTML posters of the story.
 */
export interface Placa {
  src: string;
  width: number;
  height: number;
  /** Plan that can export it: FREE (Base with the Arma2 signature) or PREMIUM. */
  plan: "free" | "premium";
  /** Social Studio family and style, for the caption. */
  family: string;
  style: string;
}

const placa = (file: string, plan: Placa["plan"], family: string, style: string): Placa => ({
  src: `/torneos/placas/${file}.webp`,
  width: 560,
  height: 700,
  plan,
  family,
  style,
});

/** Back to front: three Premium styles, then the FREE post in front. All Feed 4:5, Fecha 7 of Copa Primavera 2026. */
export const TORNEOS_PLACAS: readonly Placa[] = [
  placa("premium-editorial-round_results-feed-4x5", "premium", "Resultados de la fecha", "Editorial"),
  placa("premium-heritage-round_results-feed-4x5", "premium", "Resultados de la fecha", "Heritage"),
  placa("premium-street-round_results-feed-4x5", "premium", "Resultados de la fecha", "Street"),
  placa("free-base-round_results-feed-4x5", "free", "Resultados de la fecha", "Base"),
];
