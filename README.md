# Arma2Web

Sitios públicos de Arma2, servidos desde un solo proyecto de Next.js (App Router, Tailwind v4):

- **Jugadores** — `www.arma2.com.ar`: qué hace la app y cómo descargarla (`src/app/(jugadores)`).
- **Arma2 Torneos** — `torneos.arma2.com.ar`: portal para organizadores (`src/app/torneos`).

`src/proxy.ts` elige el sitio según el host. Dominios, deploy y verificación:
[`docs/dominios-y-deploy.md`](docs/dominios-y-deploy.md). Estado comercial de Torneos:
[`docs/torneos-landing-gaps.md`](docs/torneos-landing-gaps.md).

## Desarrollo

```bash
npm install
npm run dev
```

- Jugadores: http://localhost:3000/
- Torneos como en producción: http://torneos.localhost:3000/

## Scripts

| Script | Qué hace |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run lint` | ESLint |
| `npm test` | Vitest (ruteo por host, descarga, datos de las historias, copy ES/EN, escenas por SSR) |
| `npm run qr` | Regenera `public/descargar-qr.svg` (QR a `/descargar`) |
| `npm run brand:assets -- <dir>` | Convierte los masters de marca a WebP (`public/brand/`, `public/torneos/`) |
| `npm run check:visual -- [url]` | Chequeos de layout con Playwright sobre un server levantado (viewports, inglés, anclas, rotación, sin JS) |

## Cómo están armadas las home

Las dos home son escenas cinemáticas: una sección fijada con el hero y una
historia de cuatro capítulos, y una galería horizontal fijada. Referencia
visual aprobada: `docs/superpowers/specs/prototipos-cinematicos/`.

- Las pantallas de la app y del gestor están recreadas en HTML
  (`src/components/*/screens/`) con datos de ejemplo de `src/lib/jugadores-story.ts`
  y `src/lib/torneos-story.ts`. Llevan el rótulo "Ejemplo con datos ficticios".
- El movimiento sale del progreso de scroll (framer-motion `useScroll`). Con
  "reducir movimiento" activado, cada escena se muestra estática.
- Las imágenes de marca (`src/lib/brand-assets.ts`) son WebP generados desde los
  masters del sitio anterior y de Nico. El render corregido de Torneos está en
  `docs/assets/pc-torneos-corregido.png`.
