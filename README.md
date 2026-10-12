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
| `npm test` | Vitest (ruteo por host, descarga, demos, manifest de capturas) |
| `npm run qr` | Regenera `public/descargar-qr.svg` (QR a `/descargar`) |
| `npm run shots:optimize -- <dir>` | Convierte capturas `<grupo>__<nombre>.png` a WebP y actualiza `public/shots/manifest.json` |

## Capturas del producto

`public/shots/` contiene pantallas reales de `Armado_Equipos`, tomadas en un entorno
local aislado con datos ficticios. El manifest registra la ruta, el texto alternativo
(ES/EN) y el commit del producto de cada una.
