import manifest from "../../public/shots/manifest.json";
import type { Locale } from "@/lib/i18n";

/**
 * Real product screens (fictional demo data) captured from Armado_Equipos.
 * Files and alt text live in public/shots/manifest.json.
 */
export const SHOT_IDS = [
  "jugadores/votacion",
  "jugadores/equipos",
  "jugadores/crear-partido",
  "jugadores/frecuentes",
  "jugadores/partido-automatico",
  "jugadores/arqueros",
  "jugadores/equipo-desafio",
  "jugadores/ranking",
  "jugadores/encuesta-figura",
  "jugadores/perfil",
  "jugadores/estadisticas",
  "torneos/fixture",
  "torneos/resultado",
  "torneos/tabla",
  "torneos/disciplina",
  "torneos/publica-desktop",
  "torneos/publica-mobile",
  "torneos/social-studio",
] as const;

export type ShotId = (typeof SHOT_IDS)[number];

export interface Shot {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface ManifestEntry {
  file: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
}

const entries = manifest.shots as Record<ShotId, ManifestEntry>;

export function getShot(id: ShotId, locale: Locale): Shot {
  const entry = entries[id];
  return {
    src: `/shots/${entry.file}`,
    width: entry.width,
    height: entry.height,
    alt: entry.alt[locale],
  };
}
