# Rediseño arma2.com.ar + portal Torneos — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rehacer arma2.com.ar como sitio de jugadores que explica el producto
real y lleva a las stores, y servir Arma2 Torneos como portal propio en
`torneos.arma2.com.ar`, todo desde este repo.

**Architecture:**
- Una app Next 16 con un layout raíz mínimo y un layout por sitio.
- `src/proxy.ts` decide qué sitio servir según el host, con lógica pura y
  testeada en `src/lib/site-routing.ts`.
- Las capturas reales del producto se toman en un entorno local aislado y se
  publican en `public/shots/` con un manifest tipado.
- Las demos interactivas (balance de equipos, "una carga") son islas cliente
  sobre funciones puras testeadas.

**Tech Stack:**
- Next.js 16.1.6 (App Router, `proxy.ts`), React 19, TypeScript, Tailwind v4 y
  CSS Modules (Torneos), framer-motion y lucide-react, que ya están en el repo.
- Dependencias de desarrollo nuevas: `vitest`, `qrcode` y `sharp`.

**Spec:** `docs/superpowers/specs/2026-10-12-arma2-sitios-rediseno-design.md`

## Global Constraints

- **Repo:**
  - Solo `nicoavayu/Arma2Web`.
  - Nunca se escribe en `/Users/nicoavayu/Documents/arma2/arma2` ni en ningún
    Supabase remoto.
  - Las capturas se toman en un clon aislado dentro del scratchpad de la sesión.
- **Dependencias:**
  - No se agregan dependencias de runtime.
  - Solo se suman, como dependencias de desarrollo, `vitest`, `qrcode` y `sharp`.
- **Sitio de jugadores:** no tiene ningún link a `app.arma2.com.ar`. Su única
  acción es descargar la app (`STORE_LINKS`).
- **Torneos:**
  - Todo CTA de producto usa `src/lib/torneos-links.ts`
    (`https://app.arma2.com.ar/torneos`, Premium con `?intent=premium`).
  - Modelo comercial (spec §6.1): FREE $0 / Premium **ARS 20.000 finales**,
    pago único por temporada; temporada de **hasta 6 meses**; fotos **25 / 100**
    por temporada, que se eliminan al terminar la temporada con aviso y descarga
    previa; colaboradores owner+1 / owner+10.
  - No existe precio de lanzamiento ni habitual, ni "acceso permanente".
  - No está implementado y los pagos siguen apagados: la landing no activa
    pagos ni promete funciones no publicadas, y el copy comercial vive solo en
    `plans` de `torneos-content.ts`.
- **Hosts por defecto:** `www.arma2.com.ar` (jugadores) y `torneos.arma2.com.ar`
  (Torneos). Se pueden pisar con `NEXT_PUBLIC_SITE_HOST` y `NEXT_PUBLIC_TORNEOS_HOST`.
- **Paleta:** tinta `#070711`, superficie `#10142a`, azul `#27b8ff`, violeta
  `#5b4bff`, magenta `#ec4dff`, verde cancha `#20e39b`, papel `#f5f1e9` (solo Torneos).
- **Estilo jugadores:** sin `radial-gradient` decorativos, glows, texto con
  degradé ni cards con blur.
- **Copy** (spec §8):
  - Cada afirmación tiene que poder señalarse en el producto.
  - Prohibido: métricas de uso, testimonios, logos de clientes, "miles de
    jugadores", "revolucionario", "potente", "experiencia única", "todo en uno",
    "llevá tu X al siguiente nivel", "nivel pro" y etiquetas decorativas sobre
    cada título.
  - Español rioplatense con voseo. El inglés, natural.
- **i18n:** toda clave nueva existe en `es` y en `en`
  (`src/lib/i18n.ts` → `translations`, `as const`).
- **Movimiento:** toda animación respeta `prefers-reduced-motion: reduce`, que
  muestra el estado final sin transición.
- **Accesibilidad:** contraste AA, foco visible, objetivos táctiles de 44 px como
  mínimo y `alt` descriptivo en cada captura.
- **Commits:** terminan con
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Redirect con query o hash:** `arma2.com.ar/torneos?intent=premium` tiene
   que llegar a `torneos.arma2.com.ar/?intent=premium` sin perder la query.
   El test está en la Task 1.
2. **Host con puerto o mayúsculas** (`Torneos.Arma2.com.ar:443`): se reconoce
   como host de Torneos. Test en la Task 1.
3. **Assets en el host de Torneos:** `/torneos/gallery/x.png`, `/_next/...` y
   `/logo_navbar.png` se sirven tal cual, sin rewrite ni redirect. Test en la Task 1.
4. **Links viejos compartidos** (`/#how-it-works`, `/#features`, `/#faq`,
   `/#mercado-arqueros`): siguen cayendo en la sección equivalente nueva.
   Verificación en la Task 10.
5. **User agent ambiguo en `/descargar`** (iPadOS con UA de Mac, bots,
   desktop): manda a `/#descargar`, nunca a una store equivocada. Test en la Task 4.

---

## Fase 1 — Base

### Task 1: Merge de la landing de Torneos, vitest y ruteo por host

**Files:**
- Merge: `claude/arma2-torneos-landing-prep-168b17` → rama actual
- Create: `vitest.config.ts`, `src/lib/site-routing.ts`, `src/proxy.ts`
- Test: `src/lib/__tests__/site-routing.test.ts`
- Modify: `package.json` (script `"test": "vitest run"`, dev dep `vitest`)

**Interfaces:**
- Produces:
  ```ts
  export interface SiteHosts { jugadores: string; torneos: string } // hostnames en minúscula, sin puerto
  export const DEFAULT_SITE_HOSTS: SiteHosts; // { jugadores: "www.arma2.com.ar", torneos: "torneos.arma2.com.ar" }
  export function getSiteHosts(env?: Record<string, string | undefined>): SiteHosts;
  export type SiteRouteResult =
    | { kind: "next" }
    | { kind: "rewrite"; pathname: string }
    | { kind: "redirect"; url: string; status: 308 }; // url absoluta o path relativo al request
  export function resolveSiteRoute(
    input: { host: string | null; pathname: string; search: string },
    hosts?: SiteHosts,
  ): SiteRouteResult;
  ```
- `src/proxy.ts` exporta `proxy(request: NextRequest): NextResponse` y `config.matcher`.

- [ ] **Step 1: Merge del branch de Torneos**

```bash
git merge --no-ff claude/arma2-torneos-landing-prep-168b17 -m "merge: landing de Torneos (base del rediseño, reemplaza PR #9)"
```
Expected: merge sin conflictos (el branch solo agrega archivos y toca `Navbar`,
`Footer`, `sitemap.ts` e `i18n.ts`). Si hay conflicto, gana la versión de `prep`.

- [ ] **Step 2: Instalar vitest y configurarlo**

`npm i -D vitest`. `vitest.config.ts`: `environment: "node"`, alias
`@` → `./src`, `esbuild.jsx: "automatic"` e `include: ["src/**/*.test.{ts,tsx}"]`.
Script `"test": "vitest run"`.

- [ ] **Step 3: Escribir los tests de `resolveSiteRoute`**

Con `hosts = DEFAULT_SITE_HOSTS`, una tabla `it.each` con
`[host, pathname, search, expected]`:

| host | pathname | search | expected |
| --- | --- | --- | --- |
| `torneos.arma2.com.ar` | `/` | `` | `{ kind: "rewrite", pathname: "/torneos" }` |
| `torneos.arma2.com.ar` | `/sitemap.xml` | `` | rewrite `/torneos/sitemap.xml` |
| `torneos.arma2.com.ar` | `/robots.txt` | `` | rewrite `/torneos/robots.txt` |
| `torneos.arma2.com.ar` | `/opengraph-image` | `` | rewrite `/torneos/opengraph-image` |
| `torneos.arma2.com.ar` | `/torneos/x` | `?a=1` | `{ kind: "redirect", url: "/x?a=1", status: 308 }` |
| `torneos.arma2.com.ar` | `/torneos` | `` | redirect `/` |
| `Torneos.Arma2.com.ar:443` | `/` | `` | rewrite `/torneos` |
| `torneos.localhost:3000` | `/` | `` | rewrite `/torneos` |
| `torneos.arma2.com.ar` | `/torneos/gallery/match-01.png` | `` | `{ kind: "next" }` |
| `torneos.arma2.com.ar` | `/_next/static/chunk.js` | `` | next |
| `torneos.arma2.com.ar` | `/logo_navbar.png` | `` | next |
| `www.arma2.com.ar` | `/torneos` | `?intent=premium` | redirect `https://torneos.arma2.com.ar/?intent=premium` |
| `arma2.com.ar` | `/torneos/planes` | `` | redirect `https://torneos.arma2.com.ar/planes` |
| `www.arma2.com.ar` | `/` | `` | next |
| `localhost:3000` | `/torneos` | `` | next |
| `arma2-web-git-x.vercel.app` | `/torneos` | `` | next |
| `null` | `/torneos` | `` | next |

Más un test de `getSiteHosts({ NEXT_PUBLIC_TORNEOS_HOST: "T.example.com" })`
que devuelve `torneos: "t.example.com"` y jugadores por defecto.

- [ ] **Step 4: Correr y ver que fallan**

Run: `npm test -- site-routing`
Expected: FAIL (`resolveSiteRoute` no existe).

- [ ] **Step 5: Implementar `src/lib/site-routing.ts`**

- **Orden de reglas:**
  1. Normalizar el host: minúsculas y sin `:puerto`.
  2. `_next/`, `/api/` o un último segmento con `.` → `next`. La excepción son
     `/robots.txt` y `/sitemap.xml` en el host de Torneos, que siguen a la regla 3.
  3. Host de Torneos (`hosts.torneos` o `torneos.localhost`): `/torneos` o
     `/torneos/…` → redirect al path sin prefijo (`|| "/"`) + `search`. El resto
     → rewrite a `"/torneos" + (pathname === "/" ? "" : pathname)`.
  4. Host de jugadores (`hosts.jugadores` o su variante sin `www.`): `/torneos…`
     → redirect a `https://${hosts.torneos}${rest || "/"}${search}`.
  5. Cualquier otro → `next`.
- `getSiteHosts` lee `NEXT_PUBLIC_SITE_HOST` y `NEXT_PUBLIC_TORNEOS_HOST`
  (trim y minúsculas) con fallback a `DEFAULT_SITE_HOSTS`.

- [ ] **Step 6: Implementar `src/proxy.ts`**

- `proxy(request)` llama a `resolveSiteRoute` con
  `{ host: request.headers.get("host"), pathname: request.nextUrl.pathname, search: request.nextUrl.search }`
  y `getSiteHosts(process.env)`.
- Según el resultado:
  - `rewrite` → `NextResponse.rewrite(new URL(pathname + search, request.url))`;
  - `redirect` → `NextResponse.redirect(new URL(url, request.url), 308)`;
  - `next` → `NextResponse.next()`.
- `config.matcher`: `["/((?!_next/static|_next/image|favicon.ico).*)"]`.

- [ ] **Step 7: Correr los tests y verificar en dev**

Run: `npm test` → PASS.
Run: `npm run dev` y después:
- `curl -sI -H "Host: www.arma2.com.ar" localhost:3000/torneos?intent=premium`
  → `308` con `location: https://torneos.arma2.com.ar/?intent=premium`;
- `curl -s -H "Host: torneos.localhost:3000" localhost:3000/ | grep -o "<title>[^<]*"`
  → el título de Torneos.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: ruteo por host para torneos.arma2.com.ar"
```

### Task 2: Layouts por sitio, SEO por host y URLs cruzadas

**Files:**
- Modify:
  - `src/app/layout.tsx`: queda mínimo, con `<html lang="es">`, Inter,
    `LanguageProvider` e íconos; sin Navbar/Footer ni metadata de jugadores.
- Create:
  - `src/app/(jugadores)/layout.tsx`: Navbar + Footer + toda la metadata actual
    de jugadores.
  - `src/app/torneos/layout.tsx`: metadata de Torneos, con
    `metadataBase: new URL("https://torneos.arma2.com.ar")`.
  - `src/app/torneos/sitemap.ts`, `src/app/torneos/robots.txt/route.ts` y
    `src/app/torneos/opengraph-image.tsx`.
  - `src/lib/site-urls.ts`.
  - Test: `src/lib/__tests__/site-urls.test.ts`.
- Move: `src/app/page.tsx`, `contact/`, `delete-account/`, `eliminar-cuenta/`,
  `press/`, `privacy/` y `terms/` pasan a `src/app/(jugadores)/` (`git mv`).
- Modify:
  - `src/app/torneos/page.tsx`: deja de definir metadata (pasa al layout) y
    conserva el JSON-LD.
  - `src/components/Navbar.tsx` y `src/components/Footer.tsx`: se saca el
    `if (pathname startsWith "/torneos") return null`.
  - `src/app/sitemap.ts`: sin la entrada `/torneos`.
  - `src/app/robots.ts`: sin cambios.

**Interfaces:**
- Consumes: `getSiteHosts()` (Task 1).
- Produces:
  ```ts
  export type Site = "jugadores" | "torneos";
  export function getSiteUrl(site: Site, path?: string, env?: Record<string, string | undefined>): string;
  ```

- [ ] **Step 1: Tests de `getSiteUrl`**

- Con `env.NEXT_PUBLIC_VERCEL_ENV === "production"`:
  - `getSiteUrl("torneos", "/", env)` → `"https://torneos.arma2.com.ar/"`;
  - `getSiteUrl("jugadores", "/#descargar", env)` → `"https://www.arma2.com.ar/#descargar"`.
- Sin esa variable (local o preview):
  - `getSiteUrl("torneos")` → `"/torneos"`;
  - `getSiteUrl("torneos", "/#torneos-planes")` → `"/torneos#torneos-planes"`;
  - `getSiteUrl("jugadores")` → `"/"`.

- [ ] **Step 2: Correr y ver que fallan**

Run: `npm test -- site-urls` → FAIL.

- [ ] **Step 3: Implementar `src/lib/site-urls.ts`**

En producción, URL absoluta con `getSiteHosts(env)`. Fuera de producción, path
relativo: `/torneos` + path sin la `/` inicial si es `/` o empieza con `#`.

- [ ] **Step 4: Separar los layouts y mover las páginas**

- `git mv` de las páginas de jugadores a `(jugadores)/`.
- La metadata actual de `layout.tsx` pasa a `(jugadores)/layout.tsx`.
- `torneos/layout.tsx` toma title, description, keywords y canonical `/` del
  `torneos/page.tsx` de `prep`. El OG lo genera `opengraph-image.tsx`.
- `torneos/sitemap.ts` devuelve
  `[{ url: "https://torneos.arma2.com.ar/", changeFrequency: "weekly", priority: 1 }]`.
- `torneos/robots.txt/route.ts` devuelve `text/plain` con
  `User-agent: *\nAllow: /\nSitemap: https://torneos.arma2.com.ar/sitemap.xml\n`.

- [ ] **Step 5: OG de Torneos con `next/og`**

`opengraph-image.tsx`:
- `size = { width: 1200, height: 630 }`, `contentType = "image/png"`, `alt` en
  español.
- Fondo `#f5f1e9` con el titular "TODO EL TORNEO. MUCHO MENOS TRABAJO." en
  `#070711`, peso 800 y mayúsculas, más "Arma2 Torneos" y la franja violeta
  `#5b4bff`.
- Fuente Inter, cargada con `fetch` de `node_modules/next/dist/compiled/@vercel/og/`
  o la fuente por defecto de `ImageResponse` si eso falla.

- [ ] **Step 6: Verificar build y SEO por host**

Run: `npm run build` → sin errores. `npm start` y después:
- `curl -s -H "Host: torneos.localhost:3000" localhost:3000/robots.txt`
  → contiene `torneos.arma2.com.ar/sitemap.xml`;
- `curl -s -H "Host: torneos.localhost:3000" localhost:3000/ | grep -o 'og:url" content="[^"]*'`
  → `https://torneos.arma2.com.ar`;
- `curl -s localhost:3000/ | grep -o 'og:url" content="[^"]*'`
  → `https://www.arma2.com.ar`;
- `curl -s localhost:3000/privacy | grep -c "<footer"` → `1`.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: layouts y SEO separados para jugadores y Torneos"
```

## Fase 0 — Capturas reales (va después de la base porque no depende de ella)

### Task 3: Capturas del producto en entorno local aislado

**Files:**
- Create:
  - `public/shots/jugadores/*.webp`, `public/shots/torneos/*.webp` y
    `public/shots/manifest.json`;
  - `src/lib/shots.ts`;
  - `scripts/optimize-shots.mjs`;
  - Test: `src/lib/__tests__/shots.test.ts`.
- Modify: `package.json` (dev dep `sharp`, script `"shots:optimize"`).
- Fuera del repo (scratchpad): clon de `Armado_Equipos`, Supabase local y script
  de seed de jugadores.

**Interfaces:**
- Produces:
  ```ts
  export const SHOT_IDS: readonly [
    "jugadores/home", "jugadores/votacion", "jugadores/equipos", "jugadores/crear-partido",
    "jugadores/frecuentes", "jugadores/partido-automatico", "jugadores/arqueros",
    "jugadores/equipo-desafio", "jugadores/ranking", "jugadores/encuesta-figura",
    "jugadores/perfil", "jugadores/estadisticas",
    "torneos/fixture", "torneos/resultado", "torneos/tabla", "torneos/disciplina",
    "torneos/publica-desktop", "torneos/publica-mobile", "torneos/social-studio",
    "torneos/multimedia", "torneos/plan",
  ];
  export type ShotId = (typeof SHOT_IDS)[number];
  export interface Shot { src: string; width: number; height: number; alt: string }
  export function getShot(id: ShotId, locale: Locale): Shot; // src = "/shots/" + file
  ```
- `manifest.json`:
  ```json
  { "product": { "repo": "Armado_Equipos", "sha": "<origin/main sha>" }, "capturedAt": "YYYY-MM-DD",
    "shots": { "<ShotId>": { "file": "jugadores/votacion.webp", "width": 1170, "height": 2532,
      "route": "/votar-equipos", "alt": { "es": "…", "en": "…" } } } }
  ```

- [ ] **Step 1: Tests de `shots.ts`**

- Cada id de `SHOT_IDS` existe en `manifest.shots`.
- Cada `file` existe en `public/shots/` (`fs.existsSync`).
- `getShot("jugadores/votacion", "en").alt` no está vacío y es distinto del `es`.
- Las capturas `jugadores/*` y `torneos/publica-mobile` tienen
  `height / width ≈ 2.164` (390×844) ± 0.01.
- El resto de `torneos/*` tiene `width / height = 1.6` (1440×900).

- [ ] **Step 2: Correr y ver que fallan**

Run: `npm test -- shots` → FAIL.

- [ ] **Step 3: Clon aislado y backend local**

```bash
SCR=<scratchpad>/armado-equipos
git clone --no-local /Users/nicoavayu/Documents/arma2/arma2 "$SCR" && git -C "$SCR" fetch origin && git -C "$SCR" checkout --detach origin/main
open -a Docker   # esperar a que `/Applications/Docker.app/Contents/Resources/bin/docker info` responda
cd "$SCR" && npm ci && npx supabase start
```
- `supabase start` levanta en `127.0.0.1:57321`. Sus anon y service keys son
  locales y no se copian a ningún archivo del repo.
- `git clone` sin `--no-local` haría hardlinks del checkout del usuario; el
  `--no-local` lo evita.

- [ ] **Step 4: Datos ficticios**

- **Torneos:** el pipeline propio del producto
  (`npm run qa:torneos:review:seed:apply` y
  `npm run qa:torneos:review:plans:apply`) con las env vars locales que piden
  `docs/qa/torneos-local-qa-runbook.md` y `docs/qa/torneos-qa-auth-runbook.md`.
- **Jugadores:** script propio en `$SCR/scratch-seed-jugadores.mjs`, que no se
  commitea. Usa el service key **local** para crear:
  - 12 usuarios de prueba con nombres inventados (Nico, Santi, Fran, Agus,
    Lucho, Emi, Fede, Tomi, Juani, Pipe, Mati, Rodri);
  - un partido F5 con votación completa y equipos armados;
  - una encuesta cerrada con figura, mejor arquero y una tarjeta roja;
  - un partido frecuente con historial;
  - una búsqueda activa de Partido automático;
  - dos arqueros con "Disponible para atajar";
  - un equipo con plantel, un desafío y ranking con historial contra un rival.

  Para el esquema, consultar `supabase/migrations` y `src/services` del clon. Si
  una entidad solo se puede crear por RPC, usar la RPC con la sesión del usuario
  de prueba.

- [ ] **Step 5: Levantar la app contra local y capturar**

```bash
QA_SUPABASE_URL=http://127.0.0.1:57321 QA_SUPABASE_ANON_KEY=<anon local> npm run qa:start:local -- --start
```
- Loguearse con los usuarios de prueba en el panel del navegador.
- Jugadores y `torneos/publica-mobile`: `resize_window` 390×844 y screenshot
  por pantalla.
- Gestor de Torneos: 1440×900.
- Guardar los PNG en `$SCR/shots-raw/<id>.png`.
- Si el entorno local no levanta después de dos intentos razonables, **parar y
  avisar al usuario** antes de pasar al plan B del spec §7.

- [ ] **Step 6: Optimizar y publicar**

- `scripts/optimize-shots.mjs <rawDir>`: `sharp` → WebP calidad 82, sin
  redimensionar.
- Escribe `public/shots/<id>.webp` y actualiza `width`, `height` y `file` en el
  manifest, conservando `alt` y `route`.
- Los `alt` (es/en) describen la pantalla concreta. Ejemplo: "Pantalla de
  votación: calificación de 1 a 10 para Santi, con la opción No lo conozco".
- Completar `product.sha` con `git -C "$SCR" rev-parse HEAD`.

- [ ] **Step 7: Correr los tests**

Run: `npm test -- shots` → PASS. Revisar a ojo que ninguna captura muestre un
email, un token o un dato real.

- [ ] **Step 8: Commit y apagar el entorno**

```bash
git add public/shots src/lib/shots.ts scripts/optimize-shots.mjs src/lib/__tests__/shots.test.ts package.json package-lock.json
git commit -m "feat: capturas reales del producto con datos ficticios"
cd "$SCR" && npx supabase stop
```

### Task 4: Descarga inteligente y componentes compartidos

**Files:**
- Modify: `src/lib/store-links.ts` (suma `pickStore`).
- Create:
  - `src/app/(jugadores)/descargar/route.ts`;
  - `scripts/generate-download-qr.mjs` y `public/descargar-qr.svg`;
  - `src/components/shared/StoreButtons.tsx`, `DownloadQr.tsx`,
    `LanguageToggle.tsx`, `SiteSwitch.tsx`, `PhoneFrame.tsx`, `BrowserFrame.tsx`.
- Test: `src/lib/__tests__/store-links.test.ts`,
  `src/app/(jugadores)/descargar/route.test.ts` y
  `src/components/shared/__tests__/StoreButtons.test.tsx`.
- Modify:
  - `package.json` (dev dep `qrcode`, script `"qr"`);
  - `src/lib/i18n.ts`: suma `common.download`, `common.qrCaption`,
    `common.siteSwitch.{toTorneos,toJugadores}` y `common.demoNote` en es/en.

**Interfaces:**
- Consumes: `getShot`/`ShotId` (Task 3), `getSiteUrl` (Task 2), `STORE_LINKS`.
- Produces:
  ```ts
  export type Store = "appStore" | "googlePlay";
  export function pickStore(userAgent: string | null | undefined): Store | null;
  // components (todos "use client" salvo DownloadQr)
  StoreButtons(props: { tone?: "ink" | "paper"; className?: string }) // ids de test: data-store="appStore" | "googlePlay"
  DownloadQr(props: { className?: string })        // oculto debajo de md
  LanguageToggle(props: { tone?: "ink" | "paper" })
  SiteSwitch(props: { to: Site; className?: string }) // <a href={getSiteUrl(to)}> con label de i18n y ↗
  PhoneFrame(props: { id: ShotId; priority?: boolean; sizes?: string; className?: string })
  BrowserFrame(props: { id: ShotId; urlLabel?: string; priority?: boolean; sizes?: string; className?: string })
  ```

- [ ] **Step 1: Tests de `pickStore`**

- UA de iPhone → `"appStore"`.
- UA de iPad (`iPad; CPU OS`) → `"appStore"`.
- UA de Android Chrome → `"googlePlay"`.
- UA de iPadOS 13+ (`Macintosh; Intel Mac OS X` sin "Mobile") → `null`.
- UA de Chrome desktop → `null`.
- `Googlebot` → `null`.
- `""`, `null` y `undefined` → `null`.

- [ ] **Step 2: Tests de `GET /descargar`**

- `GET(new Request("https://www.arma2.com.ar/descargar", { headers: { "user-agent": <iPhone> } }))`
  → status `302`, `location === STORE_LINKS.appStore`.
- Con Android → `STORE_LINKS.googlePlay`.
- Desktop o sin UA → `location` termina en `/#descargar`.

- [ ] **Step 3: Test SSR de `StoreButtons`**

`renderToStaticMarkup(<LanguageProvider><StoreButtons /></LanguageProvider>)`
contiene los dos `data-store` y los dos `href` de `STORE_LINKS`, porque sin JS
se ven las dos stores.

- [ ] **Step 4: Correr y ver que fallan**

Run: `npm test -- store-links descargar StoreButtons` → FAIL.

- [ ] **Step 5: Implementar `pickStore`, la ruta y el QR**

- `pickStore`: regex `/iPhone|iPad|iPod/` → appStore; `/Android/` → googlePlay.
- La ruta usa `export const dynamic = "force-dynamic"` y `Response.redirect(url, 302)`.
- `generate-download-qr.mjs`:
  - `QRCode.toString("https://www.arma2.com.ar/descargar", { type: "svg", margin: 1, color: { dark: "#070711", light: "#ffffff" } })`
    → `public/descargar-qr.svg`;
  - correrlo una vez y commitear el SVG.

- [ ] **Step 6: Implementar los componentes compartidos**

- **`StoreButtons`:**
  - SSR con las dos stores al mismo nivel.
  - En `useEffect`, `pickStore(navigator.userAgent)` destaca la store del
    dispositivo como botón primario (fondo blanco en `ink`, tinta en `paper`) y
    deja la otra como link secundario.
- **`PhoneFrame`:** marco CSS con radio de 2.6rem, borde de 10px `#0d0f1c`, notch
  de 26% de ancho y `next/image` con `getShot(id, locale)`.
- **`BrowserFrame`:** barra con 3 puntos y la píldora `urlLabel` (por defecto
  `torneos.arma2.com.ar`).
- **`LanguageToggle`:** se extrae tal cual del Navbar actual, sin `shadow` ni
  degradé; activo = fondo `#27b8ff` en `ink` o `#070711` en `paper`.

- [ ] **Step 7: Tests y lint**

Run: `npm test && npm run lint` → PASS.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: descarga por dispositivo, QR y componentes compartidos"
```

## Fase 2 — arma2.com.ar

Las Tasks 5 a 10 agregan sus claves bajo `translations.<locale>.home.<sección>`
(es y en) y sus componentes en `src/components/jugadores/`. El copy que el spec
fija (§5) va literal. El resto lo escribe el implementador siguiendo las reglas
de copy.

### Task 5: Navegación y footer de jugadores

**Files:**
- Move y rewrite: `src/components/Navbar.tsx` → `src/components/jugadores/JugadoresNav.tsx`,
  y `src/components/Footer.tsx` → `src/components/jugadores/JugadoresFooter.tsx`.
- Modify: `src/app/(jugadores)/layout.tsx`, y en `src/lib/i18n.ts` las claves
  `nav.links` y `footer.*`.

**Interfaces:**
- Consumes: `LanguageToggle`, `SiteSwitch`, `pickStore`/`STORE_LINKS` (Task 4).

- [ ] **Step 1: `JugadoresNav`**

- **Links:** "Cómo se arman los equipos" → `/#como-se-arman`; "¿En qué estás?"
  → `/#en-que-estas`; "Preguntas" → `/#preguntas`.
- Después, `SiteSwitch to="torneos"` ("Torneos ↗"), `LanguageToggle` y el
  botón "Descargar":
  - en mobile, `href` a la store de `pickStore` o, si da `null`, a `/#descargar`;
  - en desktop, `/#descargar`.
- **Fondo:** transparente arriba; al hacer scroll, `#070711` al 92% con borde
  inferior `white/7` y **sin** `backdrop-blur`.
- El menú mobile mantiene el comportamiento actual (bloqueo de scroll, cerrar al
  navegar) e incluye "Torneos ↗" y "Descargar".

- [ ] **Step 2: `JugadoresFooter`**

- **Columnas:** Producto (los tres anchors), Arma2 Torneos ↗ (`SiteSwitch`),
  Legal (Privacidad, Términos, Eliminar cuenta), Contacto y `StoreButtons`.
- **Copy del footer:** "La app para organizar partidos de fútbol amateur y armar
  equipos parejos votados por el grupo."
- Se eliminan los degradés decorativos.

- [ ] **Step 3: Verificar**

- `npm run dev`; en el panel del navegador a 375 y 1440 px: el nav se ve, el
  menú mobile abre y cierra, y "Torneos ↗" apunta a `/torneos` en local.
- `read_console_messages` sin errores.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: navegación y footer del sitio de jugadores"
```

### Task 6: Hero

**Files:**
- Create: `src/components/jugadores/Hero.tsx` (reemplaza a `src/components/Hero.tsx`).
- Modify: `src/lib/i18n.ts` (`home.hero`) y `src/app/(jugadores)/page.tsx`.

**Interfaces:**
- Consumes: `PhoneFrame` con `jugadores/votacion` (priority) y `jugadores/equipos`;
  `StoreButtons`, `DownloadQr`.

- [ ] **Step 1: Copy `home.hero` (es literal del spec, en natural)**

- **eyebrow:** "App gratis de fútbol amateur · iOS y Android".
- **title:** ["Organizá partidos.", "Armá equipos parejos.", "Jugá."]. La línea 2
  va en `#27b8ff`.
- **lead:** "Convocás a tu grupo con un link, cada uno califica a los que conoce
  y Arma2 arma dos equipos parejos con esos votos. Si te faltan jugadores o
  arquero, te los encuentra."
- **facts:** ["Gratis", "Fútbol 5 a 11", "Equipos votados por el grupo",
  "Encuesta y premios después de cada partido"].
- **qrCaption:** "Escaneá para descargar".

- [ ] **Step 2: Implementar `Hero`**

- **Grid:** copy a la izquierda y dos `PhoneFrame` superpuestos a la derecha
  (votación adelante). Debajo de los teléfonos, una barra de balance A/B con los
  totales que muestra la captura de equipos (verde cancha / azul) y números
  tabulares.
- **Franja de hechos** separada por `·`.
- **Mobile:** copy → botones → teléfonos.
- `h1` único de la página.

- [ ] **Step 3: Verificar**

- Panel del navegador a 375, 768 y 1440 px, sin scroll horizontal
  (`document.documentElement.scrollWidth <= innerWidth`).
- La imagen LCP es la de votación (`fetchpriority="high"` en el HTML).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: hero de jugadores con capturas reales"
```

### Task 7: Cómo se arman los equipos (balance democrático)

**Files:**
- Create:
  - `src/lib/balance-demo.ts`;
  - `src/components/jugadores/ComoSeArman.tsx` y `src/components/jugadores/BalanceDemo.tsx`.
- Test: `src/lib/__tests__/balance-demo.test.ts`.
- Modify: `src/lib/i18n.ts` (`home.balance`) y `page.tsx`.

**Interfaces:**
- Produces:
  ```ts
  export interface DemoPlayer { id: string; name: string; score: number; goalkeeper?: boolean }
  export interface BalanceResult { teamA: DemoPlayer[]; teamB: DemoPlayer[]; totalA: number; totalB: number; diff: number } // totales y diff redondeados a 1 decimal
  export const DEMO_PLAYERS: readonly DemoPlayer[]; // 10 jugadores; exactamente 2 con goalkeeper: true
  export function alternatingSplit(players: readonly DemoPlayer[]): BalanceResult;
  export function balanceTeams(players: readonly DemoPlayer[], opts?: { fixGoalkeepers?: boolean; seed?: number }): BalanceResult;
  ```

- [ ] **Step 1: Tests**

- `balanceTeams(DEMO_PLAYERS)`:
  - `teamA.length === teamB.length === 5`;
  - unión de ids = los 10 ids;
  - `diff <= alternatingSplit(DEMO_PLAYERS).diff`.
- `balanceTeams(DEMO_PLAYERS, { fixGoalkeepers: true })` deja un arquero en cada
  equipo.
- Mismo `seed` → mismo resultado. Con `seed` 1 y 2 en `DEMO_PLAYERS`, `diff <= 0.5`.
- `diff === Math.abs(totalA - totalB)` redondeado a 1 decimal.
- No muta la entrada (`Object.freeze` sobre una copia).

- [ ] **Step 2: Correr y ver que fallan**

Run: `npm test -- balance-demo` → FAIL.

- [ ] **Step 3: Implementar**

`DEMO_PLAYERS` usa los nombres de la Task 3 y puntajes de una decimal entre 4.8 y
8.9. El algoritmo:

```ts
// 1. Orden inicial: sin seed → orden por score desc; con seed → shuffle mulberry32(seed).
// 2. Reparto alternado (A,B,A,B…). Con fixGoalkeepers, los 2 arqueros van primero: uno a A, otro a B, y quedan bloqueados.
// 3. Hill-climbing: mientras exista un swap (a∈A no bloqueado, b∈B no bloqueado) que reduzca |sumA-sumB|, aplicar el mejor swap.
// 4. Devolver totales y diff redondeados a 1 decimal.
```

- [ ] **Step 4: Correr y ver que pasan**

Run: `npm test -- balance-demo` → PASS.

- [ ] **Step 5: Sección y demo**

- **`home.balance.title`:** "Los equipos no los arma el que organiza. Los arma
  el grupo."
- **Los 4 pasos literales del spec §5.2:**
  1. Cada jugador califica del 1 al 10 a los que conoce. A los que no conoce,
     les marca "No lo conozco".
  2. Con los votos de todo el grupo, Arma2 calcula un puntaje por jugador.
  3. Arma dos equipos con la suma de puntajes lo más pareja posible, respetando
     a los arqueros fijos y dejando afuera a los suplentes.
  4. Si hay cambios de último momento, en la encuesta se ajustan los equipos
     finales arrastrando jugadores.
- **`BalanceDemo`:**
  - estado inicial con la lista de 10 jugadores y puntajes;
  - "Armar equipos" → `balanceTeams` y animación de reparto en dos columnas con
    framer-motion `layout` (instantánea con reduced motion);
  - "Otra combinación" → seed incremental;
  - toggle "Fijar arqueros" con `aria-pressed`;
  - resultado: totales, barra A/B y "Diferencia: 0,3" (formato con coma en es);
  - nota `common.demoNote`: "Ejemplo con datos ficticios".
- Al costado, `PhoneFrame id="jugadores/votacion"`.
- La sección lleva `id="como-se-arman"` y un anchor alias `id="how-it-works"`.

- [ ] **Step 6: Verificar en el navegador**

- Click en "Armar equipos" → dos columnas de 5.
- "Fijar arqueros" → un ARQ por equipo.
- Navegable con Tab/Enter.
- Con `prefers-reduced-motion` (`javascript_tool` con `matchMedia` emulado, o
  CSS) no hay transición.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: sección de armado democrático con demo de balance"
```

### Task 8: ¿En qué estás? (tres capítulos)

**Files:**
- Create:
  - `src/components/jugadores/EnQueEstas.tsx` y `src/components/jugadores/ChapterNav.tsx`;
  - `src/lib/use-active-section.ts`.
- Modify: `src/lib/i18n.ts` (`home.chapters`) y `page.tsx`.

**Interfaces:**
- Produces: `useActiveSection(ids: readonly string[]): string | null`, que
  devuelve el id con mayor intersección según `IntersectionObserver` con
  `rootMargin: "-40% 0px -55% 0px"`.

- [ ] **Step 1: Copy `home.chapters`**

Tres capítulos con `{ id, label, title, points: string[], shots: ShotId[] }`:

1. **`tengo-grupo`**, "Tengo grupo" / "Organizá sin perseguir a nadie".
   - Puntos: los 4 de spec §5.3.1.
   - Shots: `jugadores/crear-partido`, `jugadores/frecuentes`.
2. **`me-faltan-jugadores`**, "Me faltan jugadores" / "Arma2 los busca".
   - Puntos: Partido automático, Quiero jugar y Mercado de arqueros, según spec §5.3.2.
   - Shots: `jugadores/partido-automatico`, `jugadores/arqueros`.
3. **`tengo-equipo`**, "Tengo equipo" / "Armá tu equipo y buscá rival".
   - Puntos: los 4 de spec §5.3.3.
   - Shots: `jugadores/equipo-desafio`, `jugadores/ranking`.

- [ ] **Step 2: Implementar**

- La sección (`id="en-que-estas"`, alias `id="features"`) tiene un título corto:
  "¿En qué estás?".
- **`ChapterNav`:** segmentado sticky debajo del nav (`top: var(--nav-height-*)`).
  Cada botón es un `<a href="#id">` con `aria-current="true"` cuando está
  activo, con el `useActiveSection` de los 3 ids.
- Los capítulos van apilados (nunca ocultos), en grid de copy + 2 `PhoneFrame`.
  En desktop, el lado de las capturas se alterna.
- Alias `id="mercado-arqueros"` sobre el punto de Mercado de arqueros.

- [ ] **Step 3: Verificar**

- Al hacer scroll, el segmento activo cambia en los tres capítulos.
- Los anchors desde el nav aterrizan sin quedar tapados por el nav sticky
  (`scroll-margin-top`).
- A 375 px el segmentado entra sin scroll horizontal.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: capítulos por situación del jugador"
```

### Task 9: Después del partido

**Files:**
- Create: `src/components/jugadores/DespuesDelPartido.tsx`.
- Modify: `src/lib/i18n.ts` (`home.after`) y `page.tsx`.

- [ ] **Step 1: Copy `home.after`**

- **title:** "El partido no termina con el pitazo."
- **steps:**
  - es: ["Notificación", "¿Se jugó?", "Asistencia", "Figura", "Mejor arquero",
    "¿Fue limpio?", "Resultado", "Tarjeta roja", "Equipos finales"];
  - en: el equivalente.
- **outcomes:**
  - premios (figura, arquero) → al perfil;
  - sanciones (tarjeta roja, ausencia sin aviso) → al perfil.
- **profile:** "Tu carta de jugador: premios, actividad por semana, mes y año, y
  registro de lesiones."

- [ ] **Step 2: Implementar**

- Línea de pasos horizontal con números tabulares (scroll-snap horizontal en
  mobile, con indicador de "deslizá").
- `PhoneFrame` de `jugadores/encuesta-figura`, `jugadores/perfil` y
  `jugadores/estadisticas`.
- Color: magenta solo en premios y rojo `#ef4444` solo en sanciones.
- `id="despues-del-partido"`.

- [ ] **Step 3: Verificar a 375 y 1440 px, y commit**

```bash
git add -A && git commit -m "feat: sección después del partido"
```

### Task 10: Preguntas, banda Torneos, descarga y limpieza

**Files:**
- Create: `src/components/jugadores/Preguntas.tsx`, `BandaTorneos.tsx` y `Descargar.tsx`.
- Modify:
  - `src/app/(jugadores)/page.tsx`: orden final y JSON-LD `FAQPage` +
    `MobileApplication`;
  - `src/lib/i18n.ts`: `home.faq`, `home.torneosBand` y `home.download`, y se
    borran las claves viejas `hero`, `autoMatch`, `arqueros`, `howItWorks`,
    `equipos`, `teamRanking`, `features`, `impact`, `faq` y `cta`;
  - `src/app/globals.css`: se borran `.hero-*`, `.premium-*` y el
    radial-gradient del `body`.
- Delete:
  - `src/components/{Hero,AutoMatch,Arqueros,HowItWorks,Features,Equipos,TeamRanking,ImpactStats,FAQ,CTA,Screenshots,Section,Card,Button}.tsx`,
    salvo los que sigan importados (`grep` antes de borrar);
  - los `public/*` sin referencias (`grep -r` en `src/`), incluidos
    `Screenshot 2026-02-22 at 5.00.18 PM.png`, `file.svg`, `globe.svg`,
    `next.svg`, `vercel.svg` y `window.svg`.

- [ ] **Step 1: Preguntas**

Las 7 preguntas del spec §5.5. Antes de escribir cada respuesta:

- **Ausencias y disciplina:** buscar en el clon de la Task 3
  (`grep -rn "disciplin\|prioridad" src/services src/utils`). Solo se afirma
  "baja tu prioridad" si existe esa regla. Si no, la respuesta se limita a: "Queda
  registrada como ausencia sin aviso en tu perfil."
- **¿Mis amigos necesitan la app?** Literal: "Para organizar y jugar, sí. Si
  invitás a alguien que todavía no la tiene, puede votar desde el link que le
  mandás."
- **Formatos:** "Fútbol 5, 6, 7, 8, 9 y 11."

Acordeón con `<details>/<summary>` (funciona sin JS), `id="preguntas"` y alias
`id="faq"`.

- [ ] **Step 2: Banda Torneos y Descargar**

- **`BandaTorneos`:**
  - fondo `#f5f1e9` y texto `#070711`;
  - copy literal del spec §5.6;
  - botón `SiteSwitch to="torneos"` ("Conocé Arma2 Torneos ↗");
  - `id="torneos"`.
- **`Descargar`:**
  - `id="descargar"`;
  - título "Organizá tu próximo partido.";
  - `StoreButtons` + `DownloadQr`.

- [ ] **Step 3: Armar la página y limpiar**

- **Orden:** Hero → ComoSeArman → EnQueEstas → DespuesDelPartido → Preguntas →
  BandaTorneos → Descargar.
- JSON-LD:
  - `FAQPage` desde `translations.es.home.faq.items`;
  - `MobileApplication` con `name: "Arma2"`, `operatingSystem: "iOS, Android"`,
    `applicationCategory: "SportsApplication"`, `offers.price: "0"` y los dos
    `STORE_LINKS` en `downloadUrl`.
- Borrar los componentes, las claves y los assets listados.

- [ ] **Step 4: Verificar**

- `npm run lint && npm test && npm run build` → PASS, sin imports rotos.
- Con `npm start`:
  - `curl -s localhost:3000/ | grep -o 'id="\(how-it-works\|features\|faq\|mercado-arqueros\|descargar\)"' | sort -u`
    → los 5 ids;
  - `curl -s localhost:3000/ | grep -c "app.arma2.com.ar"` → `0`.
- Panel del navegador: recorrido completo a 375, 768 y 1440 px, con screenshot
  de cada sección.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: home de jugadores completa; se eliminan secciones viejas"
```

## Fase 3 — Portal Torneos

### Task 11: Separar TorneosEditorial y consolidar el contenido

**Files:**
- Split: `src/components/torneos/TorneosEditorial.tsx` (744 líneas) →
  `TorneosNav.tsx`, `TorneosFooter.tsx`, `TorneosHero.tsx`, `UnaCarga.tsx`
  (placeholder de la Task 13 = el bloque `flow` actual), `TorneosPublica.tsx`,
  `TorneosStudio.tsx`, `TorneosMedia.tsx`, `TorneosPlanes.tsx`, `TorneosFaq.tsx`
  y `TorneosCierre.tsx`.
- Rename: `TorneosEditorial.module.css` → `torneos.module.css`, importado por
  cada sección.
- Modify:
  - `src/lib/torneos-content.ts` absorbe `editorialCopy` (es/en) y se le borran
    los campos que ya no usa nadie (`problem`, `players`, `platforms.*`, etc.,
    verificado con `grep`);
  - `src/app/torneos/layout.tsx` monta `TorneosNav` y `TorneosFooter`;
  - `src/app/torneos/page.tsx` arma las secciones.
- Delete: los componentes huérfanos del branch `prep`, que solo se referencian a
  sí mismos: `TorneosCta`, `TorneosFinalCta`, `TorneosManagement`,
  `TorneosPlatforms`, `TorneosPlayers`, `TorneosProblem`, `TorneosPublicPage`,
  `TorneosSocialStudio`, y las versiones viejas de `TorneosHero`, `TorneosMedia`,
  `TorneosPlans` y `TorneosFaq` antes de reemplazarlas.

**Interfaces:**
- Consumes: `LanguageToggle tone="ink"`, `SiteSwitch to="jugadores"`, `torneos-links`.

- [ ] **Step 1: Separar sin cambiar el render**

- Mover cada función de `TorneosEditorial` a su archivo.
- Cada sección lee el copy con `useTorneosContent()`.
- `TorneosNav` reemplaza su `languageSwitch` por `LanguageToggle` y "Volver a
  Arma2" por `SiteSwitch to="jugadores"` ("Arma2 para jugadores ↗").

- [ ] **Step 2: Verificar que no hay regresión**

- Screenshot de `/torneos` a 1440 y 375 px antes y después del split: mismo
  contenido y orden.
- `npm run lint && npm run build` → PASS.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "refactor: separar la landing de Torneos en secciones"
```

### Task 12: Hero de Torneos en papel

**Files:**
- Modify: `src/components/torneos/TorneosHero.tsx`, `torneos.module.css` (bloque
  `.hero*`) y `torneos-content.ts` (sin cambios de texto del hero).

**Interfaces:**
- Consumes: `BrowserFrame id="torneos/fixture" priority`,
  `PhoneFrame id="torneos/publica-mobile"`, `getCreateTournamentTarget()` y
  `TORNEOS_HOW_ANCHOR`.

- [ ] **Step 1: Implementar**

- Fondo `#f5f1e9` con texto `#070711`. Titular en mayúscula 800 con tracking
  `-0.04em` y "Mucho menos trabajo." en `#5b4bff`.
- `BrowserFrame` grande a la derecha, con el `PhoneFrame` de la página pública
  superpuesto abajo a la derecha.
- Se elimina `public/BG_Torneos.png` del hero (y del repo si queda sin uso).
- La fila de 5 beneficios del `prep` se mantiene sobre una franja tinta al pie
  del hero.

- [ ] **Step 2: Verificar**

- A 375, 768 y 1440 px.
- Contraste del texto secundario `#44465a` sobre `#f5f1e9` ≥ 4.5:1 (calcular
  con `javascript_tool`).
- LCP = imagen del `BrowserFrame`.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: hero editorial de Torneos con captura real del gestor"
```

### Task 13: "Una carga, todo actualizado"

**Files:**
- Create: `src/lib/torneos-demo.ts`.
- Rewrite: `src/components/torneos/UnaCarga.tsx`.
- Test: `src/lib/__tests__/torneos-demo.test.ts`.
- Modify: `torneos-content.ts` (`unaCarga` es/en).

**Interfaces:**
- Produces:
  ```ts
  export interface StandingRow { teamId: string; name: string; pj: number; pg: number; pe: number; pp: number; gf: number; gc: number; pts: number }
  export interface ScorerRow { player: string; teamId: string; goals: number }
  export interface MatchResult { homeId: string; awayId: string; homeGoals: number; awayGoals: number; scorers: { player: string; teamId: string }[] }
  export interface DemoState { standings: StandingRow[]; scorers: ScorerRow[] }
  export const INITIAL_DEMO_STATE: DemoState; // 4 equipos: Los Galácticos, Tiki-Taka, Deportivo Tapita, El Tanque — fecha 6 jugada
  export const DEMO_RESULT: MatchResult;      // Los Galácticos 3–1 Tiki-Taka
  export function sortStandings(rows: readonly StandingRow[]): StandingRow[]; // pts desc, dif. de gol desc, gf desc, name asc
  export function applyResult(state: DemoState, result: MatchResult): DemoState;
  ```

- [ ] **Step 1: Tests**

- Victoria local:
  - el ganador suma `pj+1`, `pg+1` y `pts+3`, con `gf+3` y `gc+1`;
  - el perdedor suma `pj+1` y `pp+1`, sin puntos.
- Empate: los dos suman `pe+1` y `pts+1`.
- Los goleadores se acumulan por `player+teamId` y quedan ordenados por `goals`
  desc.
- El orden respeta el desempate de `sortStandings`, con un caso de igualdad de
  pts que se resuelve por diferencia de gol.
- `applyResult` no muta el estado (`Object.freeze` profundo sobre el input).
- `applyResult(INITIAL_DEMO_STATE, DEMO_RESULT)` deja a "Los Galácticos" primero.

- [ ] **Step 2: Correr y ver que fallan**

Run: `npm test -- torneos-demo` → FAIL.

- [ ] **Step 3: Implementar `torneos-demo.ts`**

- [ ] **Step 4: Correr y ver que pasan**

Run: `npm test -- torneos-demo` → PASS.

- [ ] **Step 5: Sección**

- **Título:** "Cargás el resultado una vez. Todo lo demás se actualiza."
- **Layout:** a la izquierda, la tarjeta de carga del partido con el botón
  "Cargar resultado". A la derecha, cuatro paneles: Tabla, Goleadores, Página
  pública y Placa de resultados.
- **Al cargar:** cada panel resalta su cambio en secuencia (150 ms entre uno y
  otro; instantáneo con reduced motion) con `aria-live="polite"` resumiendo
  "Tabla actualizada: Los Galácticos 1.º".
- "Volver a empezar" restablece `INITIAL_DEMO_STATE`.
- La placa usa la captura Base real de Resultados del `prep`
  (`public/torneos/social-studio/base/round_results--portrait--default.png`).
  Antes de cargar se ve atenuada.
- Nota `common.demoNote`.
- `id="torneos-como-funciona"`.

- [ ] **Step 6: Verificar en el navegador y commit**

```bash
git add -A && git commit -m "feat: demo 'una carga, todo actualizado' en Torneos"
```

### Task 14: Gestión, página pública, Social Studio y multimedia

**Files:**
- Modify: `TorneosPublica.tsx`, `TorneosStudio.tsx`, `TorneosMedia.tsx`,
  `torneos.module.css` y `torneos-content.ts`.
- Create: `src/components/torneos/TorneosGestion.tsx`.

**Interfaces:**
- Consumes: `BrowserFrame` (`torneos/resultado`, `torneos/tabla`,
  `torneos/disciplina`, `torneos/publica-desktop`, `torneos/social-studio`,
  `torneos/multimedia`) y `PhoneFrame` (`torneos/publica-mobile`).

- [ ] **Step 1: Gestión** (`id="torneos-gestion"`, fondo tinta)

- Pestañas accesibles (`role="tablist"`, flechas ←/→) para Fixture, Resultados,
  Tabla y Disciplina, cada una con su captura.
- 3 puntos por pestaña, tomados de la sección `management` del copy de `prep`
  (sin inventar funciones).
- Owner + colaboradores, según el plan.

- [ ] **Step 2: Página pública** (`id="torneos-pagina-publica"`, fondo papel)

- `BrowserFrame` desktop + `PhoneFrame` mobile.
- Copy del `prep`: "Compartí el torneo. Todo en un solo link." y "Sin cuenta. Sin
  instalar nada."

- [ ] **Step 3: Social Studio y Multimedia**

- Studio conserva los 4 exports Base y los chips de estilos (Base FREE;
  Heritage, Street, Scoreboard y Editorial Premium) y suma la captura
  `torneos/social-studio`.
- Multimedia muestra la captura `torneos/multimedia` en `BrowserFrame`. Las fotos
  de `public/torneos/gallery/` solo aparecen dentro de esa UI y no se usan como
  fondo.
- Se borra del repo `public/torneos/gallery/*` lo que no se use.

- [ ] **Step 4: Verificar a 375 y 1440 px, con las pestañas por teclado, y commit**

```bash
git add -A && git commit -m "feat: secciones de producto de Torneos con capturas reales"
```

### Task 15: Planes, cierre y datos estructurados

**Files:**
- Modify: `TorneosPlanes.tsx`, `TorneosCierre.tsx`, `src/app/torneos/page.tsx`
  (JSON-LD) y `torneos-content.ts` (`plans.comparison`).

- [ ] **Step 1: Tabla comparativa**

- `<table>` con `<caption>` y `scope="col"`/`scope="row"`.
- **Filas:**
  - Precio ($0 / ARS 20.000 finales);
  - Modalidad (gratis / pago único por temporada);
  - Duración de la temporada (hasta 6 meses / hasta 6 meses);
  - Gestión completa (✓ / ✓);
  - Página pública (✓ / ✓);
  - Familias de placas (3 / 11);
  - Formatos (4:5 y 9:16 / 4:5 y 9:16);
  - Estilos (Base / Base, Heritage, Street, Scoreboard, Editorial);
  - Firma Arma2 (obligatoria / white-label);
  - Fotos por temporada (25 / 100);
  - Al terminar la temporada (las fotos se eliminan, con aviso y descarga previa / ídem);
  - Colaboradores (owner + 1 / owner + 10).
- Los íconos ✓ llevan texto accesible ("Incluido").
- En mobile, encabezado sticky y scroll horizontal dentro de la tabla, no de la
  página.
- Se mantienen las dos cards, actualizadas a spec §6.1.
- Se borran de `torneos-content.ts` y `editorialCopy` todos los textos de
  "precio lanzamiento", "Habitual $49.900", "permanentemente" y "1.000"
  (`grep -rn "49.900\|39.900\|permanen\|1.000" src/` → sin resultados).
- Se mantienen "Cada nueva temporada vuelve a comenzar en FREE." y "Activás
  Premium desde Plan, dentro de esa temporada."
- Botones: `getCreateTournamentTarget()` y `getPremiumTournamentTarget()`.

- [ ] **Step 2: Cierre y JSON-LD**

- `TorneosCierre`: el CTA final del `prep` + `SiteSwitch to="jugadores"` con
  "¿Sos jugador? Arma2 para jugadores ↗".
- `page.tsx`: `FAQPage` (existente) + `SoftwareApplication` con
  `name: "Arma2 Torneos"`, `applicationCategory: "SportsApplication"`,
  `operatingSystem: "Web"` y `offers` (`price: "0"` FREE y `price: "20000"` con
  `priceCurrency: "ARS"` Premium).

- [ ] **Step 3: Verificar**

- `curl -s -H "Host: torneos.localhost:3000" localhost:3000/ | grep -c '"@type":"SoftwareApplication"'` → `1`.
- `grep -c "20.000"` en el HTML ≥ `1` y `grep -c "39.900\|49.900"` → `0`.
- Tabla legible a 375 px.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: comparativa de planes y datos estructurados de Torneos"
```

## Fase 4 — QA y cierre

### Task 16: Verificación final, docs y PR

**Files:**
- Create: `docs/dominios-y-deploy.md`.
- Modify: `docs/torneos-landing-gaps.md` (dominio, nueva estructura y PR que
  reemplaza al #9) y `README.md` (scripts `test`, `qr`, `shots:optimize` y cómo
  probar `torneos.localhost:3000`).

- [ ] **Step 1: Suite completa**

Run: `npm run lint && npm test && npm run build` → todo PASS.

- [ ] **Step 2: Lighthouse mobile**

- Con `npm start`, correr
  `npx -y lighthouse http://localhost:3000/ --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile --screenEmulation.mobile --quiet --chrome-flags="--headless" --output=json --output-path=<scratchpad>/lh-jugadores.json`.
- Lo mismo para `http://torneos.localhost:3000/`.
- Expected: las 4 categorías ≥ 0.90 en los dos. Si alguna no llega, corregir
  antes de seguir.

- [ ] **Step 3: Recorrido visual y de teclado**

- Panel del navegador en los dos hosts a 375, 768 y 1440 px.
- Tab por toda la página: foco siempre visible, ChapterNav, demos, pestañas y
  acordeón operables.
- Sin errores de consola.
- Screenshots finales para el usuario.

- [ ] **Step 4: Docs**

`dominios-y-deploy.md`:
1. Estado: el CNAME `torneos → arma2-web.vercel.app.` ya existe en la zona
   Vercel. Falta asociar `torneos.arma2.com.ar` a Production del proyecto
   `arma2-web`, y solo cuando el deploy con el ruteo por host esté verificado.
2. Checklist post-asociación: HTTPS válido, `/` muestra el portal, las subrutas
   (`/sitemap.xml`, `/robots.txt`, anchors) responden, el canonical y `og:url`
   son `https://torneos.arma2.com.ar/`,
   `curl -sIL https://torneos.arma2.com.ar/` termina en un `200` sin bucles, y
   `https://www.arma2.com.ar/torneos` da un 308 al subdominio.
3. Env vars opcionales (`NEXT_PUBLIC_TORNEOS_HOST`, `NEXT_PUBLIC_SITE_HOST`,
   `NEXT_PUBLIC_TORNEOS_APP_URL`).
4. Cómo probar: `/torneos` en preview y `torneos.localhost:3000` en local.
5. Recordatorio: no publicar Torneos hasta que esté habilitado Torneos
   Production (ver gaps). Antes de publicar, confirmar el copy comercial contra
   el PR de integración de `Armado_Equipos` (spec §6.1).

- [ ] **Step 5: Commit, push y PR**

```bash
git add -A && git commit -m "docs: dominios, deploy y estado del rediseño"
git push -u origin claude/armados-torneos-ux-redesign-cb3a43
gh pr create --title "Rediseño de arma2.com.ar y portal Arma2 Torneos" --body "<resumen + checklist de verificación + 'Reemplaza a #9; no mergear hasta habilitar Torneos Production'>"
```
Después del PR: `ccd_pr get_status` / `bind_pr`.

- [ ] **Step 6: Candidato para asociar el dominio**

- Cuando el preview de Vercel del PR esté verificado (Steps 1–3 sobre la URL
  del preview, con `/torneos` y los redirects por host probados en local),
  avisar al usuario que hay un candidato listo para asociar
  `torneos.arma2.com.ar` a Production.
- **Claude no hace la asociación ni el merge.**
- Si el usuario confirma que ya lo asoció, correr el checklist post-asociación
  de `docs/dominios-y-deploy.md` y reportar los resultados.
