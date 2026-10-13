# Arma2Web

Sitios públicos de Arma2, servidos desde un solo proyecto de Next.js (App Router, Tailwind v4):

- **Jugadores** — `www.arma2.com.ar`: qué hace la app y cómo descargarla (`src/app/(jugadores)`).
- **Arma2 Torneos** — `torneos.arma2.com.ar`: portal para organizadores (`src/app/torneos`),
  con un torneo de ejemplo navegable en `/ejemplo` (datos ficticios, `src/lib/torneos-ejemplo.ts`).

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
| `npm test` | Vitest (ruteo por host, descarga, datos de las historias, copy ES/EN, home y pasos por SSR) |
| `npm run qr` | Regenera `public/descargar-qr.svg` (QR a `/descargar`) |
| `npm run brand:assets -- <dir>` | Convierte los masters de marca a WebP (`public/brand/`, `public/torneos/`) |
| `npm run check:visual -- [url]` | Chequeos de layout con Playwright sobre un server levantado (viewports desde 320×568, inglés, anclas, rotación, sin JS, movimiento reducido, scroll sin tramos vacíos, torneo de ejemplo) |

## Cómo están armadas las home

Las dos home se leen con scroll normal: ningún bloque queda fijo ni avanza
según cuánto se scrollea.

- **Hero:** la composición aprobada (foto, celulares o render del gestor,
  aro de marca y CTA), en una sección de una pantalla.
- **Cómo funciona:** cuatro pasos con las pantallas de la app y del gestor
  recreadas en HTML (`src/components/*/screens/`), con datos de ejemplo de
  `src/lib/jugadores-story.ts` y `src/lib/torneos-story.ts`. El texto se ve
  siempre; cada ilustración se anima sola una vez cuando llega a la pantalla
  (`usePlayWhenVisible`). En el server, sin JavaScript o con "reducir
  movimiento", se muestra directamente el estado final.
- **Funciones:** grilla con todas las tarjetas a la vista (`FeatureGrid`).
- Todo lo de ejemplo lleva el rótulo "Ejemplo con datos ficticios".
- Las imágenes de marca (`src/lib/brand-assets.ts`) son WebP generados desde los
  masters del sitio anterior y de Nico. El render corregido de Torneos está en
  `docs/assets/pc-torneos-corregido.png`.
- `npm run check:visual` falla si algo vuelve a quedar fijo, si un texto espera
  una animación o si en celular aparece un tramo de una pantalla sin texto nuevo.
