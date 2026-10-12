# Dominios y deploy: arma2.com.ar + torneos.arma2.com.ar

Este repo sirve dos sitios desde un solo proyecto de Vercel (`arma2-web`):

| Sitio | Host | Rutas internas |
| --- | --- | --- |
| Jugadores | `www.arma2.com.ar` (y `arma2.com.ar`) | `src/app/(jugadores)/…` |
| Arma2 Torneos | `torneos.arma2.com.ar` | `src/app/torneos/…` |

`src/proxy.ts` decide qué sitio servir según el host. La lógica está en
`src/lib/site-routing.ts` y la cubre `npm test`:

- `torneos.arma2.com.ar/x` → rewrite interno a `/torneos/x` (la URL no cambia).
- `torneos.arma2.com.ar/torneos/x` → 308 a `/x`, salvo
  `/torneos/opengraph-image`, que se sirve directo porque es la URL que Next
  escribe en `og:image`.
- `www.arma2.com.ar/torneos…` → 308 a `https://torneos.arma2.com.ar/…`,
  conservando la query (`?intent=premium`).
- Cualquier otro host (localhost, previews `*.vercel.app`): sin cambios.
  `/torneos` se revisa directo en los previews.

## Estado del dominio (2026-10-12)

1. **DNS:** el CNAME `torneos → arma2-web.vercel.app.` (TTL 60) ya existe en la
   zona Vercel de `arma2.com.ar`. `app` sigue en Netlify y la raíz y `www` no
   cambiaron.
2. **Asociación:** falta asociar `torneos.arma2.com.ar` al entorno
   **Production** del proyecto `arma2-web`. Hacerlo **recién** cuando el deploy
   con este ruteo por host esté en Production. Antes de eso, el subdominio
   mostraría la home de jugadores. El alta "sin environment" falla en Vercel
   (`Invalid customEnvironmentId`).
3. **No publicar Torneos** hasta que esté habilitado Torneos Production (ver
   `docs/torneos-landing-gaps.md`) y se confirme el copy comercial contra el PR
   de integración de `Armado_Equipos`.

## Checklist después de asociar el dominio

```bash
curl -sIL https://torneos.arma2.com.ar/ | grep -E "^HTTP|^location"
```
Tiene que terminar en `200`, sin bucles.

- [ ] HTTPS válido en `https://torneos.arma2.com.ar/`.
- [ ] `/` muestra el portal de Torneos (título "Arma2 Torneos — …").
- [ ] `https://torneos.arma2.com.ar/sitemap.xml` lista `https://torneos.arma2.com.ar/`.
- [ ] `https://torneos.arma2.com.ar/robots.txt` apunta a ese sitemap.
- [ ] `<link rel="canonical">` y `og:url` = `https://torneos.arma2.com.ar`.
- [ ] `og:image` (`/torneos/opengraph-image?…`) responde `200 image/png`.
- [ ] `https://www.arma2.com.ar/torneos?intent=premium` → `308` a
      `https://torneos.arma2.com.ar/?intent=premium`.
- [ ] `https://www.arma2.com.ar/` sigue mostrando el sitio de jugadores.
- [ ] Los links "Torneos ↗" del sitio de jugadores y "Arma2 para jugadores ↗"
      de Torneos llevan al otro host.

## Variables de entorno (opcionales)

| Variable | Default | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_TORNEOS_HOST` | `torneos.arma2.com.ar` | Host del portal de Torneos |
| `NEXT_PUBLIC_SITE_HOST` | `www.arma2.com.ar` | Host del sitio de jugadores |
| `NEXT_PUBLIC_TORNEOS_APP_URL` | `https://app.arma2.com.ar/torneos` | Destino de "Entrar" / "Empezar gratis" |
| `NEXT_PUBLIC_APP_STORE_URL` / `NEXT_PUBLIC_GOOGLE_PLAY_URL` | links actuales | Stores |

Los links cruzados entre sitios son absolutos solo cuando
`NEXT_PUBLIC_VERCEL_ENV === "production"`. En previews y en local apuntan a
`/torneos` y `/`, así se revisa todo en un mismo host.

## Probar en local

```bash
npm run dev
```

- Jugadores: `http://localhost:3000/`
- Torneos como en producción: `http://torneos.localhost:3000/` (los navegadores
  resuelven `*.localhost` a 127.0.0.1)
- Torneos por ruta: `http://localhost:3000/torneos`
