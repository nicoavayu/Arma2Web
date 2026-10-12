# Rediseño cinemático arma2.com.ar + Arma2 Torneos — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Llevar los dos prototipos cinemáticos aprobados a las home reales de
arma2.com.ar y torneos.arma2.com.ar, sobre la infraestructura de la v1.

**Architecture:**
- Cada home tiene una escena fijada (hero + historia en cuatro capítulos) y una
  galería horizontal fijada, construidas con `useScroll`/`useTransform` de
  framer-motion sobre funciones puras de tiempos y datos (`motion-math`,
  `jugadores-story`, `torneos-story`).
- Las pantallas del producto son componentes HTML dentro de `DeviceFrame` y
  `LaptopFrame`. Reciben un `MotionValue` de progreso del capítulo, así el mismo
  componente sirve para la versión animada (progreso vivo) y para la estática
  de movimiento reducido (`motionValue(1)`).
- Los estilos de escena se portan del prototipo a un CSS Module por sitio. El
  resto sigue en Tailwind.

**Tech Stack:** Next.js 16.1.6, React 19, TypeScript, Tailwind v4, CSS Modules,
framer-motion 12, lucide-react, Vitest 4, sharp. Nueva dependencia de desarrollo:
`playwright-core` (chequeo visual local).

**Spec:** `docs/superpowers/specs/2026-10-12-arma2-sitios-cinematico-design.md`
(referencia visual y de tiempos: `docs/superpowers/specs/prototipos-cinematicos/`).

## Global Constraints

- **Repo:**
  - Solo `nicoavayu/Arma2Web`, branch `claude/armados-torneos-ux-redesign-cb3a43`.
  - El producto (`/Users/nicoavayu/Documents/arma2/arma2`) solo se lee con
    `git show origin/main:<path>`.
  - Del checkout principal (`/Users/nicoavayu/Downloads/PROJECTS/Arma2Web/public/`)
    solo se leen los originales de Nico.
  - No se pushea `main`.
- **Dependencias:**
  - No se agregan dependencias de runtime.
  - Dev: solo `playwright-core`.
- **Infraestructura de la v1:** no cambia el comportamiento de ruteo, URLs,
  stores, QR, 404, JSON-LD, páginas legales, i18n ni `COMMERCIAL`
  (spec §3). Toda la suite actual sigue en verde salvo los tests de componentes
  que se borran.
- **Jugadores:** ningún link a `app.arma2.com.ar`; la acción es descargar
  (`STORE_LINKS`).
- **Torneos:** todo CTA de producto sale de `src/lib/torneos-links.ts`; todo
  número comercial sale de `COMMERCIAL`; no se activan pagos.
- **Paletas:**
  - Jugadores: fondo `#05040d`; degradé `#27b8ff → #7b5cff → #ec4dff`; verde
    `#2ee59d`; ámbar `#ffb020`.
  - Torneos: fondo `#04050d`; degradé `#27b8ff → #6c4dff → #a35bff`; violeta
    `#6c4dff`.
  - Glows, degradés en texto y vidrio están permitidos (dirección nueva; las
    prohibiciones de estilo de la v1 ya no aplican).
- **Copy:**
  - Los textos en español de los prototipos y del spec §5 son los aprobados.
  - Toda afirmación nueva tiene que estar en la tabla del spec §6 o
    verificarse en el producto antes de usarse.
  - Siguen prohibidos: métricas de uso, testimonios, logos de clientes,
    "revolucionario", "potente", "todo en uno".
  - Se permite "Fútbol amateur · nivel pro" como eyebrow del hero de jugadores
    (venía del sitio viejo y a Nico le gusta).
  - Español rioplatense natural; inglés natural.
- **Nav de jugadores:** solo la pelotita; la palabra "Arma2" nunca es texto
  visible en la nav.
- **Breakpoint:** `< 900px` usa el layout de celular de los prototipos.
- **Movimiento:**
  - Solo se animan `transform` y `opacity`.
  - Con movimiento reducido, después del montaje, las escenas se reemplazan por
    su versión estática.
- **Accesibilidad:**
  - Sigue vigente el test de piso (sin `text-white/40|45`, sin `min-h-8`,
    `min-h-10` ni `h-10 w-10`).
  - Un `h1` por página; controles de 44 px.
- **Commits:** terminan con `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Viewports cortos o anchos** (1280×720, 1920×1080, 375×667): el dispositivo
   del hero entra entero y no pisa el `h1` ni los CTA. Lo cubre `scripts/visual-check.mjs`
   (Task 12).
2. **Cambio ES→EN a mitad de scroll:** los textos en inglés, más largos, no se
   desbordan de los captions ni de las pantallas. Lo cubren el chequeo de forma
   de i18n (Tasks 3 y 8) y los cuadros en inglés del visual-check (Task 12).
3. **Entrar con hash o recargar a mitad de página** (`#mercado-arqueros`,
   `#faq`, `#torneos-planes`): el destino queda en pantalla y la escena muestra
   el estado de esa posición, nunca un escenario vacío. Lo cubre el visual-check
   (Task 12).
4. **Rotar el celular o redimensionar:** se recalcula la geometría y el
   dispositivo sigue dentro del viewport. Lo cubre el visual-check (Task 12).
5. **Sin JS / primer render SSR:** el `h1`, la bajada, los CTA y el dispositivo
   del hero se ven en el HTML del servidor (nada arranca en `opacity:0`). Lo
   cubren los tests SSR (Tasks 5 y 9) y la captura sin JS del visual-check
   (Task 12).

---

### Task 1: Imágenes de marca en WebP

**Files:**
- Create: `scripts/brand-assets.mjs`, `src/lib/brand-assets.ts`,
  `src/lib/__tests__/brand-assets.test.ts`
- Create (generados): `public/brand/bg-hero.webp`, `public/brand/award-mvp.webp`,
  `public/brand/award-goalkeeper.webp`, `public/brand/award-redcard.webp`,
  `public/brand/card-nico.webp`, `public/brand/logo-arma2.webp`,
  `public/torneos/bg-stadium.webp`, `public/torneos/pc-torneos.webp`
- Move: `public/torneos/pc-torneos.png` → `docs/assets/pc-torneos-corregido.png`
  (master corregido, fuera de `public/`)

**Interfaces:**
- Produces: `BRAND: Record<BrandAssetKey, { src: string; width: number; height: number }>`
  con las claves `bgHero`, `awardMvp`, `awardGoalkeeper`, `awardRedcard`,
  `cardNico`, `logoArma2`, `bgStadium`, `pcTorneos`.

- [ ] **Step 1: Test que falla**

```ts
// src/lib/__tests__/brand-assets.test.ts
const BUDGET: Partial<Record<BrandAssetKey, number>> = {
  pcTorneos: 250_000, bgHero: 200_000, bgStadium: 200_000,
  awardMvp: 80_000, awardGoalkeeper: 80_000, awardRedcard: 80_000, cardNico: 120_000,
};
it.each(Object.entries(BRAND))("%s exists, matches its declared size and fits its budget", async (key, asset) => {
  const file = join(process.cwd(), "public", asset.src);
  const meta = await sharp(file).metadata();
  expect([meta.width, meta.height]).toEqual([asset.width, asset.height]);
  expect(meta.format).toBe("webp");
  if (BUDGET[key as BrandAssetKey]) expect(statSync(file).size).toBeLessThanOrEqual(BUDGET[key as BrandAssetKey]!);
});
```

- [ ] **Step 2:** `npx vitest run src/lib/__tests__/brand-assets.test.ts`.
  Expected: FAIL (no se encuentra `@/lib/brand-assets`).

- [ ] **Step 3: Script y assets**
  - `scripts/brand-assets.mjs <srcDir>` convierte con sharp:
    - fondos: ancho máx. 1920, calidad 72;
    - render: ancho 1400, calidad 80, alfa;
    - premios: ancho 400, calidad 82;
    - carta: alto 600;
    - wordmark: ancho 480.
  - Fuentes:
    - `git show antes-del-rediseno:public/{BG_HERO,mvp_award,goalkeeper_award,redcard_award,CardProfileCard,logo_arma2}.png`,
      extraídas al scratchpad;
    - `BG_Torneos.png` del checkout principal (solo lectura);
    - el master corregido.
  - Escribir `BRAND` con las dimensiones resultantes.
  - Agregar `"brand:assets": "node scripts/brand-assets.mjs"` a `package.json`.

- [ ] **Step 4:** el mismo comando. Expected: PASS 8/8.

- [ ] **Step 5: Commit** `feat: imágenes de marca en WebP para las escenas`.

---

### Task 2: Base de movimiento y marcos

**Files:**
- Create:
  - `src/lib/motion-math.ts` y `src/lib/__tests__/motion-math.test.ts`;
  - en `src/components/cinematic/`: `useSceneProgress.ts`, `useViewport.ts`,
    `useMounted.ts`, `DeviceFrame.tsx`, `LaptopFrame.tsx`, `BrandMark.tsx`,
    `frames.module.css` y `__tests__/frames.test.tsx`.
- Modify: `src/app/globals.css` (tokens de las paletas, `@property --brand-angle`,
  keyframes `brand-hue` y `brand-breath`, clases `.brand-mark`, `.text-grad-j` y
  `.text-grad-t`).

**Interfaces:**
- Produces:
  - `clamp(v: number, min?: number, max?: number): number`
  - `seg(p: number, a: number, b: number): number`
  - `lerp(a: number, b: number, t: number): number`
  - `easeInOutCubic(t)`, `easeOutCubic(t)` y `backOut(t)`: `(t: number) => number`
  - `useSceneProgress(ref: RefObject<HTMLElement | null>): MotionValue<number>`,
    con `offset: ["start start", "end end"]`
  - `useViewport(): { width: number; height: number; isMobile: boolean }`, con
    valores SSR por defecto 1440×900 y `isMobile = width < 900`
  - `useMounted(): boolean`
  - `DeviceFrame({ children, className, time = "21:04" })`: setea `--pw` a
    partir del ancho propio, con fuente de pantalla `calc(var(--pw) / 25.5)`.
    Renderiza isla, glare, barra de estado y `children` como capas. Va con
    `aria-hidden`.
  - `LaptopFrame({ children, className })`: tapa, pantalla 16:10 con fuente
    `calc(var(--lw) / 60)` y base. Va con `aria-hidden`.
  - `BrandMark({ className, "data-brand-mark"?: string })`: span con la máscara
    de `/logo_navbar.png` y degradé cónico animado.

- [ ] **Step 1: Tests que fallan**

```ts
expect(seg(0.5, 0, 1)).toBe(0.5); expect(seg(-1, 0, 1)).toBe(0); expect(seg(2, 0, 1)).toBe(1);
expect(lerp(10, 20, 0.25)).toBe(12.5);
expect(easeInOutCubic(0.5)).toBe(0.5); expect(easeOutCubic(1)).toBe(1);
expect(Math.max(...[0.6, 0.7, 0.8].map(backOut))).toBeGreaterThan(1); expect(backOut(1)).toBeCloseTo(1);
// frames.test.tsx
expect(renderToStaticMarkup(<DeviceFrame><p>hola</p></DeviceFrame>)).toMatch(/aria-hidden="true"[\s\S]*hola/);
expect(renderToStaticMarkup(<LaptopFrame><p>hola</p></LaptopFrame>)).toMatch(/aria-hidden="true"[\s\S]*hola/);
```

- [ ] **Step 2:** `npx vitest run src/lib/__tests__/motion-math.test.ts src/components/cinematic`.
  Expected: FAIL (módulos inexistentes).

- [ ] **Step 3: Implementar.** Portar el CSS del teléfono (`.shell`, `.screen`,
  `.island`, `.glare`, `.sbar`) y del laptop (`.lid`, `.lscreen`, `.base`) desde
  los prototipos a `frames.module.css`. `backOut` usa c1 = 1.70158.

- [ ] **Step 4:** los mismos tests más `npm test`. Expected: PASS y suite verde.

- [ ] **Step 5: Commit** `feat: base de movimiento, marcos de dispositivo y pelotita`.

---

### Task 3: Datos y copy de la historia de jugadores

**Files:**
- Create: `src/lib/jugadores-story.ts`, `src/lib/__tests__/jugadores-story.test.ts`,
  `src/lib/__tests__/i18n-shape.test.ts`
- Modify: `src/lib/i18n.ts` (ES y EN)

**Interfaces:**
- Consumes: `balanceTeams`, `DEMO_PLAYERS` y `BalanceResult` de `balance-demo.ts`.
- Produces:
  - `STORY_HERO_END = 0.15`
  - `STORY_CHAPTERS: readonly (readonly [number, number])[] = [[.16,.37],[.37,.58],[.58,.79],[.79,1.02]]`
  - `STORY_SPLIT: BalanceResult = balanceTeams(DEMO_PLAYERS, { fixGoalkeepers: true })`
  - `CONFIRM_ORDER = ["nico","santi","juani","agus","fede","fran","emi","tomi","lucho","pipe"] as const`
    y `GUEST_ID = "pipe"`
  - `PLAYER_COLORS: Record<string, string>` con los colores de los prototipos
  - `confirmedCount(c: number): number`, que vale
    `max(1, round(lerp(1, 10, easeInOutCubic(seg(c, .12, .78)))))`
  - `VOTES = [{ playerId: "santi", value: 8 }, { playerId: "juani", value: 9 }, { playerId: "pipe", value: null }] as const`
  - `voteState(c: number): { index: 0 | 1 | 2; local: number; selected: number | null; dunno: boolean; done: number }`
    - `index = min(2, floor(c·3))` y `local = c·3 − index`
    - `selected = (local > .38 && local < .9) ? value : null`
    - `dunno = index === 2 && local > .38`
    - `done = index + (local > .38 ? 1 : 0) + 1`
  - `SURVEY_TILES = ["juani","santi","nico","agus","fede","fran"] as const` y
    `SURVEY_MVP = "juani"`
- i18n:
  - `home.hero = { eyebrow, title: string[3], lead }`
  - `home.story = { navLabel, demoNote, chapters: { step, title, titleAccent?, text }[4], screens: {...}, floats: {...} }`
  - `home.gallery = { eyebrow, title, titleAccent, cards: { id, label, title }[6] }`
  - Se actualizan `nav.links`, `home.torneosBand`, `home.download` y
    `footer.links`.
  - FAQ: "¿Mis amigos necesitan la app?" → "Para organizar, sí. Tus amigos pueden
    sumarse al partido y votar desde el link que les mandás, aunque todavía no
    tengan la app." (verificado, spec §6).

- [ ] **Step 1: Tests que fallan**

```ts
expect([STORY_SPLIT.totalA, STORY_SPLIT.totalB, STORY_SPLIT.diff]).toEqual([33.6, 33.5, 0.1]);
expect(STORY_SPLIT.teamA.map((p) => p.id).sort()).toEqual(["agus","emi","fran","juani","lucho"]);
expect(STORY_SPLIT.teamA.some((p) => p.goalkeeper) && STORY_SPLIT.teamB.some((p) => p.goalkeeper)).toBe(true);
expect([confirmedCount(0), confirmedCount(1)]).toEqual([1, 10]);
// monotonic over 0..1 in steps of .01
expect(voteState(0.2)).toMatchObject({ index: 0, selected: 8, dunno: false, done: 2 });
expect(voteState(0.9)).toMatchObject({ index: 2, selected: null, dunno: true });
// i18n-shape.test.ts
expect(shape(translations.en)).toEqual(shape(translations.es)); // claves y largos de arrays
for (const l of ["es", "en"] as const) expect(translations[l].home.hero.lead).not.toMatch(/link|enlace/i);
```

- [ ] **Step 2:** `npx vitest run src/lib/__tests__/jugadores-story.test.ts src/lib/__tests__/i18n-shape.test.ts`.
  Expected: FAIL.

- [ ] **Step 3: Implementar** `jugadores-story.ts` y el copy. El ES es literal
  del prototipo y del spec §5.2. El EN mantiene el mismo tono. Las claves
  viejas (`home.balance`, `home.chapters`, `home.after`, `home.hero.facts` y
  `home.hero.balance`) se quitan en la Task 5, cuando se borran sus componentes.

- [ ] **Step 4:** los mismos tests. Expected: PASS.

- [ ] **Step 5: Commit** `feat: datos y copy de la historia de jugadores`.

---

### Task 4: Pantallas del celular (jugadores)

**Files:**
- Create: en `src/components/jugadores/screens/`: `ScreenHome.tsx`,
  `ScreenConvocatoria.tsx`, `ScreenVotacion.tsx`, `ScreenEquipos.tsx`,
  `ScreenEncuesta.tsx`, `screens.module.css` y `__tests__/screens.test.tsx`.

**Interfaces:**
- Consumes: Task 3 (datos y `home.story.screens`) y Task 2 (`seg`, easings).
- Produces:
  - `ScreenHome({ copy })`
  - `ScreenConvocatoria({ progress, copy })`, `ScreenVotacion({ progress, copy })`,
    `ScreenEquipos({ progress, copy })` y `ScreenEncuesta({ progress, copy })`,
    con `progress: MotionValue<number>` (progreso local del capítulo, 0–1).
- Detalles:
  - Los estados discretos se inicializan con `progress.get()` y se actualizan
    con `useMotionValueEvent`.
  - `ScreenEquipos` posiciona las filas con `useTransform`. Mide el ancho del
    contenedor con `ResizeObserver`: fila 2.45 em, gap 0.42 em, columna B en
    51.5 %, ancho 48.5 %, escalonado de 0.022 por fila.

- [ ] **Step 1: Test que falla.** Con `motionValue(1)`, cada pantalla renderiza su
  estado final:
  - Convocatoria: "10/10" e "Invitado".
  - Votación: "No lo conozco" y "Votaste 3 de 9".
  - Equipos: "33.6", "33.5" y "Dif 0.1".
  - Encuesta: "¿Quién fue la figura?" y "Paso 3 de 8".
- [ ] **Step 2:** `npx vitest run src/components/jugadores/screens`. Expected: FAIL.
- [ ] **Step 3: Implementar.** Portar el CSS `.scr`, `.prow`, `.vcard`, `.scale`,
  `.row`, `.bal`, `.diff`, `.sv-*`, `.tabbar`, `.quick` y `.act` del prototipo de
  jugadores al módulo.
- [ ] **Step 4:** el mismo comando. Expected: PASS.
- [ ] **Step 5: Commit** `feat: pantallas de la app recreadas para la historia`.

---

### Task 5: Escena hero + historia de jugadores

**Files:**
- Create: `src/components/jugadores/JugadoresStory.tsx`, `StoryFloats.tsx`,
  `story.module.css` y `__tests__/JugadoresStory.test.tsx`.
- Modify: `src/app/(jugadores)/page.tsx`. El JSON-LD usa `home.hero.lead`.
- Modify: `src/components/shared/StoreButtons.tsx`: nuevo `tone="glass"`.
- Delete: `Hero.tsx`, `ComoSeArman.tsx`, `BalanceDemo.tsx`, `EnQueEstas.tsx`,
  `ChapterNav.tsx`, `DespuesDelPartido.tsx` y `src/lib/use-active-section.ts`,
  más las claves de i18n viejas de la Task 3.
- Modify: `src/__tests__/review-fixes.test.tsx`: se va el test de `EnQueEstas` y
  lo reemplaza el de la galería en la Task 7.

**Interfaces:**
- Consumes: Tasks 2, 3 y 4, `BRAND` (Task 1), `StoreButtons`, `DownloadQr`.
- Produces:
  - `<JugadoresStory />` con la sección `id="como-se-arman"`, de alto `860vh`
    (`svh` donde aplique).
  - Spans ancla en el 17 % del alto: `how-it-works` y `como-funciona`.
  - Anclas por capítulo: `capitulo-convocas`, `capitulo-votan`,
    `capitulo-se-arman` y `capitulo-se-juega`.
  - La pelotita gigante lleva `data-brand-mark="hero"`.
  - Tiempos, posiciones y escalas copiados de `storyFrame`/`ch1..ch4`/`AW`/`AWM`/
    `CHIP` del prototipo. Hero desktop: `cxH = .69W`, `cyH = .54H`. Escena:
    `cxE = .6W`, `cyE = .52H`; en celular, `cxE = .5W` y `cyE = .64H`.
- Selector de capítulos: `<nav aria-label={story.navLabel}>` con cuatro
  `<a href="#capitulo-…">` y `aria-current="step"` en el activo.
- Movimiento reducido: si `useMounted() && useReducedMotion()`, se renderiza
  `<StaticStory>`. Mantiene el mismo `id` y el mismo `h1`, y muestra cada
  capítulo como fila (texto + `DeviceFrame` con su pantalla en `motionValue(1)`),
  sin fijar nada.

- [ ] **Step 1: Test que falla**

```ts
const html = render(<JugadoresStory />);
expect(html.match(/<h1/g)).toHaveLength(1);
expect(html.match(/<h2/g)).toHaveLength(4);
for (const id of ["como-se-arman","how-it-works","como-funciona","capitulo-convocas","capitulo-se-juega"]) expect(html).toContain(`id="${id}"`);
expect(html).toContain("Lo mandás por WhatsApp.");
const hero = html.slice(0, html.indexOf("</h1>"));
expect(hero).not.toMatch(/opacity:\s*0[;"]/); // Review Focus 5
```
  Y un test SSR de `<JugadoresStoryStatic />` (exportado desde el mismo archivo;
  es lo que se renderiza con movimiento reducido): ningún elemento lleva la
  clase de escena fijada, aparecen las cuatro pantallas en estado final ("10/10",
  "No lo conozco", "33.6" y "¿Quién fue la figura?") y hay un solo `h1`. El
  cambio a la versión estática queda en `useStaticStory(): boolean`
  (`useMounted() && useReducedMotion() === true`), una línea sin lógica propia.

- [ ] **Step 2:** `npx vitest run src/components/jugadores/__tests__/JugadoresStory.test.tsx`.
  Expected: FAIL.
- [ ] **Step 3: Implementar.** Escena, flotantes (mensaje del grupo y avisos,
  votos, números, premios), segundo celular con el splash, pelotita gigante,
  `bg-left`, tintes por capítulo y selector. Cablear `page.tsx` en este orden:
  `JugadoresStory`, galería (Task 7), `Preguntas`, `BandaTorneos`, `Descargar`.

- [ ] **Step 4:** el test más `npm test`. Expected: PASS y suite verde.
- [ ] **Step 5: Commit** `feat: hero e historia cinemática de jugadores`.

---

### Task 6: Nav con la pelotita y footer

**Files:**
- Modify: `src/components/jugadores/JugadoresNav.tsx` y `JugadoresFooter.tsx`.
- Create: `src/components/cinematic/useHomeStoryProgress.ts` y
  `src/components/jugadores/__tests__/JugadoresNav.test.tsx`.

**Interfaces:**
- Produces: `useHomeStoryProgress(sectionId = "como-se-arman"): number | null`.
  Devuelve el progreso 0–1 de esa sección, actualizado con rAF en scroll y
  resize, o `null` si no existe.
- Nav:
  - Sólida: si el progreso es `null`, cuando `scrollY > 12`; si no, cuando el
    progreso supera 0.125.
  - Opacidad de la pelotita: 1 si es `null`; si no,
    `seg(easeInOutCubic(seg(p, 0, .12)), .9, 1)`.
  - El `BrandMark` de la nav lleva `data-brand-mark="nav"`. La escena de la
    Task 5 lee su `getBoundingClientRect()` como destino del morph.
- Footer: el texto "Arma2" se reemplaza por `BRAND.logoArma2` (alt "Arma2").

- [ ] **Step 1: Test que falla**

```ts
const html = render(<JugadoresNav />);
expect(html).toContain('data-brand-mark="nav"');
expect(html).toMatch(/aria-label="[^"]*Arma2[^"]*"/);
expect(html.replace(/\s(aria-label|alt)="[^"]*"/g, "")).not.toMatch(/>\s*Arma2\s*</);
```
- [ ] **Step 2:** `npx vitest run src/components/jugadores/__tests__/JugadoresNav.test.tsx`.
  Expected: FAIL.
- [ ] **Step 3: Implementar.** Nav transparente durante el hero y de vidrio
  después; hover de la pelotita (escala 1.3, gira 90°); menú móvil igual que en
  la v1.
- [ ] **Step 4:** el test más `npm test`. Expected: PASS.
- [ ] **Step 5: Commit** `feat: nav con la pelotita animada y footer con el wordmark`.

---

### Task 7: Galería, preguntas, banda Torneos y descarga (jugadores)

**Files:**
- Create: `src/components/jugadores/JugadoresGallery.tsx`,
  `gallery.module.css` y `__tests__/JugadoresGallery.test.tsx`.
- Modify: `Preguntas.tsx`, `BandaTorneos.tsx`, `Descargar.tsx`,
  `src/__tests__/review-fixes.test.tsx`.

**Interfaces:**
- Consumes: `home.gallery`, `home.faq`, `home.torneosBand`, `home.download`,
  `BRAND` y `SiteSwitch`.
- Produces:
  - Galería: sección `id="funciones"` de alto `330vh`, con span alias
    `id="features"`. Seis `<article>`; el de arqueros lleva
    `id="mercado-arqueros"` y `scroll-mt` para la nav.
  - Con movimiento reducido, la galería es un carrusel horizontal con
    `overflow-x: auto` y snap.
  - `Preguntas`: `id="preguntas"` con span `id="faq"`, `<details>` nativos y
    estilo nuevo.
  - `BandaTorneos`: `id="torneos"`, `BRAND.bgStadium` con parallax suave, lockup
    y `SiteSwitch` a Torneos.
  - `Descargar`: `id="descargar"`, "Tu próximo partido empieza acá.",
    `StoreButtons tone="glass"` y `DownloadQr`.

- [ ] **Step 1: Test que falla**

```ts
const html = render(<JugadoresGallery />);
expect(html.match(/<article/g)).toHaveLength(6);
expect(html).toMatch(/<article[^>]*id="mercado-arqueros"[^>]*>[\s\S]*Mercado de arqueros/);
expect(html).toContain('id="funciones"'); expect(html).toContain('id="features"');
expect(render(<Preguntas />)).toContain('id="faq"');
```
- [ ] **Step 2:** `npx vitest run src/components/jugadores`. Expected: FAIL.
- [ ] **Step 3: Implementar.** Ilustraciones de los prototipos: radar, arqueros
  con `BRAND.awardGoalkeeper`, escudos VS, ranking, `BRAND.cardNico` y
  frecuentes.
- [ ] **Step 4:** `npm test`. Expected: PASS.
- [ ] **Step 5: Commit** `feat: galería y secciones finales del sitio de jugadores`.

---

### Task 8: Datos y copy de la historia de Torneos

**Files:**
- Create: `src/lib/torneos-story.ts` y `src/lib/__tests__/torneos-story.test.ts`.
- Modify: `src/lib/torneos-content.ts` (ES y EN),
  `src/lib/__tests__/i18n-shape.test.ts` (agrega Torneos) y
  `src/__tests__/review-fixes.test.tsx`.

**Interfaces:**
- Consumes: `INITIAL_DEMO_STATE`, `DEMO_RESULT`, `applyResult` y `sortStandings`
  de `torneos-demo.ts`.
- Produces:
  - `TORNEOS_STORY_CHAPTERS = [[.17,.38],[.38,.58],[.58,.79],[.79,1.02]] as const`
    y `TORNEOS_HERO_END = .16`.
  - `GOAL_TIMELINE`:
    `[{ player: "Nico", teamId: "lg", minute: 12, at: .16 }, { player: "Rodri", teamId: "lg", minute: 30, at: .32 }, { player: "Juani", teamId: "tt", minute: 38, at: .46 }, { player: "Nico", teamId: "lg", minute: 41, at: .6 }] as const`
  - `goalsScored(c: number): number` y
    `scoreAt(c: number): { home: number; away: number }`.
  - `standingsRows(): { teamId: string; name: string; pj0: number; pj1: number; pts0: number; pts1: number; rank0: number; rank1: number }[]`
    en el orden de `INITIAL_DEMO_STATE`.
  - `scorersRows(limit = 4): { player: string; goals0: number; goals1: number; rank0: number; rank1: number }[]`.
- Copy:
  - Reemplazar `hero`, `unaCarga`, `gestion`, `publica`, `studio` y `media` por:
    - `hero = { title: string[2], body, start, explore, freeNote }`
    - `story = { navLabel, demoNote, chapters: { step, title, titleAccent?, text }[4], dashboard: {...}, publicPage: {...}, posters: {...}, linkChip }`
    - `gallery = { eyebrow, title, titleAccent, cards: { id, label, title }[5] }`
  - `nav.links`: Cómo funciona `#torneos-como-funciona`, Funciones
    `#torneos-funciones`, Planes `#torneos-planes`, Preguntas `#torneos-faq`.
  - `cierre.title`: "Armá tu torneo hoy."
  - `plans` y `faq` sin cambios.
  - Se borran el tipo `GestionTab` y el import de `ShotId`.
- `review-fixes`:
  - El test de URLs pasa a `story.publicPage.url`, que matchea
    `^app\.arma2\.com\.ar\/torneos\/publico\/`.
  - Se borran los tests de `UnaCarga` y `BrowserFrame`.
  - El test de "placa Premium" pasa a `story.posters.scorersTag === premiumTag`.

- [ ] **Step 1: Tests que fallan**

```ts
expect([scoreAt(0), scoreAt(1)]).toEqual([{ home: 0, away: 0 }, { home: 3, away: 1 }]);
expect(GOAL_TIMELINE.filter((g) => g.teamId === DEMO_RESULT.homeId)).toHaveLength(DEMO_RESULT.homeGoals);
expect([...GOAL_TIMELINE].map((g) => g.player).sort()).toEqual(DEMO_RESULT.scorers.map((s) => s.player).sort());
const lg = standingsRows().find((r) => r.teamId === "lg")!;
expect(lg).toMatchObject({ pts0: 12, pts1: 15, pj0: 6, pj1: 7, rank0: 1, rank1: 0 });
expect(standingsRows().find((r) => r.teamId === "dt")).toMatchObject({ rank0: 0, rank1: 1 });
expect(scorersRows()[0]).toMatchObject({ player: "Nico", goals1: 7, rank1: 0 });
```
- [ ] **Step 2:** `npx vitest run src/lib/__tests__/torneos-story.test.ts src/lib/__tests__/i18n-shape.test.ts`.
  Expected: FAIL.
- [ ] **Step 3: Implementar.** El copy ES es literal del prototipo y del spec
  §5.3. Las tarjetas de la galería usan el copy verificado de la v1 (fixture
  con liga, grupos o eliminatorias; disciplina; fotos `COMMERCIAL.photosFree` /
  `photosPremium`; colaboradores owner + `collaboratorsFree` /
  `collaboratorsPremium`; historial de versiones del fixture).
- [ ] **Step 4:** `npm test`. Expected: PASS. Los componentes de Torneos que
  todavía leen las claves viejas se borran en la Task 9; si `tsc` se queja
  antes, se borran en este mismo commit.
- [ ] **Step 5: Commit** `feat: datos y copy de la historia de Torneos`.

---

### Task 9: Escena hero + historia de Torneos

**Files:**
- Create: en `src/components/torneos/`: `TorneosStory.tsx`, `story.module.css`,
  `screens/DashboardResultado.tsx`, `screens/PublicPagePhone.tsx`,
  `screens/Poster.tsx` y `__tests__/TorneosStory.test.tsx`.
- Modify:
  - `src/app/torneos/layout.tsx`: `Barlow_Condensed({ subsets: ["latin"], weight: ["800","900"], style: ["italic"], variable: "--font-torneos" })`
    aplicado a un wrapper.
  - `src/app/torneos/page.tsx`: `main` sin `pt-16`, fondo `#04050d`.
- Delete: `TorneosHero.tsx`, `UnaCarga.tsx`, `TorneosGestion.tsx`,
  `TorneosPublica.tsx`, `TorneosStudio.tsx` y `TorneosMedia.tsx`.

**Interfaces:**
- Consumes: Tasks 2 y 8, `BRAND.bgStadium`, `BRAND.pcTorneos` y `torneos-links`.
- Produces:
  - `<TorneosStory />` con la sección `id="torneos-como-funciona"` de alto `820vh`.
  - `DashboardResultado({ progress1, progress2, progress3, progress4, copy })`:
    marcador gol por gol, filas de la tabla con `translateY` y conteo de
    puntos y PJ, goleadores reordenados, tres líneas de estado y toast.
  - `PublicPagePhone({ copy })`, con los datos de `standingsRows()` y
    `scorersRows()` ya aplicados.
  - `Poster({ kind: "results" | "scorers", copy })`.
- Geometría del prototipo:
  - laptop: `lcx = .64W`, `lcy = .52H`; en celular, `.5W` / `.6H`;
  - render del hero: ancho `min(50vw, 740px, (100vh − 470px)·1.78)`;
  - teléfono en `lcx + LW·.46`;
  - placas: `tx = lcx + LW·.04` y `tx2 = tx + P·.98`.
- "Ver cómo funciona" hace scroll al 20 % de la escena.
- Movimiento reducido: `<TorneosStoryStatic />`, exportado y testeado por SSR
  igual que en jugadores (hero, render y los cuatro capítulos en estado final,
  sin escena fijada).

- [ ] **Step 1: Test que falla**

```ts
const html = render(<TorneosStory />);
expect(html.match(/<h1/g)).toHaveLength(1);
expect(html.match(/<h2/g)).toHaveLength(4);
expect(html).toContain('id="torneos-como-funciona"');
expect(html.slice(0, html.indexOf("</h1>"))).not.toMatch(/opacity:\s*0[;"]/);
const final = render(<DashboardResultado {...allProgress(1)} copy={torneosContent.es.story.dashboard} />);
expect(final).toMatch(/>3<[\s\S]*>1</); expect(final).toContain("Resultado guardado");
expect(render(<PublicPagePhone copy={torneosContent.es.story.publicPage} />)).toMatch(/Los Galácticos[\s\S]*15/);
expect(render(<Poster kind="scorers" copy={torneosContent.es.story.posters} />)).toContain(torneosContent.es.story.posters.scorersTag);
```
- [ ] **Step 2:** `npx vitest run src/components/torneos`. Expected: FAIL.
- [ ] **Step 3: Implementar,** portando el CSS y los tiempos de
  `torneos-cinematico.html`.
- [ ] **Step 4:** `npm test`. Expected: PASS.
- [ ] **Step 5: Commit** `feat: hero e historia cinemática de Torneos`.

---

### Task 10: Galería, planes, preguntas, cierre, nav y footer de Torneos

**Files:**
- Create: `src/components/torneos/TorneosGallery.tsx` y
  `__tests__/TorneosPlanes.test.tsx`.
- Modify: `TorneosPlanes.tsx`, `TorneosFaq.tsx`, `TorneosCierre.tsx`,
  `TorneosNav.tsx` y `TorneosFooter.tsx`.

**Interfaces:**
- Consumes: `torneosContent.gallery`, `plans`, `faq` y `cierre`, `COMMERCIAL`,
  `torneos-links`.
- Produces:
  - Galería `id="torneos-funciones"` (cinco tarjetas, scroll horizontal fijado
    de `320vh`; estática con movimiento reducido).
  - Planes `id="torneos-planes"`: fondo oscuro, Premium con borde violeta, tabla
    comparativa de la v1 dentro de `<details>` ("Ver comparación completa" /
    "See full comparison").
  - FAQ `id="torneos-faq"`.
  - Cierre `id="torneos-empezar"` con el estadio.
  - Nav transparente sobre el hero y de vidrio después; footer con el estilo nuevo.

- [ ] **Step 1: Test que falla**

```ts
const html = render(<TorneosPlanes />);
expect(html).toContain(new Intl.NumberFormat("es-AR").format(COMMERCIAL.premiumPriceArs));
expect(html).toContain("<details"); expect(html).toContain("<caption");
expect(html).toContain('id="torneos-planes"');
expect(render(<TorneosGallery />).match(/<article/g)).toHaveLength(5);
```
- [ ] **Step 2:** `npx vitest run src/components/torneos`. Expected: FAIL.
- [ ] **Step 3: Implementar.**
- [ ] **Step 4:** `npm test`. Expected: PASS, incluido el piso de accesibilidad.
- [ ] **Step 5: Commit** `feat: galería, planes y cierre de Torneos con el estilo nuevo`.

---

### Task 11: Imágenes para compartir y metadata

**Files:**
- Create: `src/app/(jugadores)/opengraph-image.tsx` y
  `src/app/(jugadores)/_og/bg-hero.jpg` (JPEG ≤ 150 KB, porque `next/og` no
  lee WebP).
- Modify:
  - `src/app/torneos/opengraph-image.tsx`: oscuro, con `src/app/torneos/_og/stadium.jpg`
    ≤ 150 KB, titular en Inter ExtraBold.
  - `src/app/(jugadores)/layout.tsx`: se quitan las URLs fijas de `og-image.jpg`
    y se agrega `export const viewport = { themeColor: "#05040d" }`.
  - `src/app/torneos/layout.tsx`: `viewport.themeColor = "#04050d"`.
- Test: `src/__tests__/og-images.test.ts`.

**Interfaces:**
- Imagen de jugadores:
  - `alt = "Arma2 — Organizá partidos. Armá equipos parejos. Jugá."`,
    `size = 1200×630`;
  - pelotita con degradé (SVG del logo como data URL) y el titular con
    "Armá equipos parejos." en degradé.

- [ ] **Step 1: Test que falla.** Ambos módulos exportan `alt`,
  `size = { width: 1200, height: 630 }` y `contentType = "image/png"`.
  El layout de jugadores ya no contiene `og-image.jpg`.
- [ ] **Step 2:** `npx vitest run src/__tests__/og-images.test.ts`. Expected: FAIL.
- [ ] **Step 3: Implementar.** Verificar con `npm run build` y
  `curl -sI localhost:3000/opengraph-image`: `200 image/png`. Ojo: la ruta
  `/torneos/opengraph-image` ya tiene passthrough en `site-routing`; la de
  jugadores no lleva prefijo.
- [ ] **Step 4:** `npm test`. Expected: PASS.
- [ ] **Step 5: Commit** `feat: imágenes para compartir con el estilo nuevo`.

---

### Task 12: Limpieza, docs y verificación

**Files:**
- Delete:
  - `src/lib/shots.ts` y su test, `public/shots/`, `scripts/optimize-shots.mjs` y
    el script `shots:optimize`;
  - `src/components/shared/PhoneFrame.tsx` y `BrowserFrame.tsx`;
  - `public/torneos/social-studio/` y `public/torneos/gallery/` si quedaron sin uso;
  - las claves de i18n sin uso.
- Create: `scripts/visual-check.mjs`. Agregar `playwright-core` a devDependencies
  y el script `"check:visual": "node scripts/visual-check.mjs"`.
- Modify: `README.md`, `docs/torneos-landing-gaps.md` y `docs/dominios-y-deploy.md`
  (sección "Probar en local": `npm run check:visual`).

**Interfaces:**
- `scripts/visual-check.mjs [baseUrl=http://localhost:3000]`:
  - Usa `CHROMIUM_PATH` o, si no está, el primer
    `~/Library/Caches/ms-playwright/chromium_headless_shell-*/…/chrome-headless-shell`.
  - Sale con código ≠ 0 si falla alguna aserción.
- Aserciones (Review Focus 1–5):
  1. En 1440×900, 1280×720, 1920×1080, 390×844 y 375×667, en `/` y `/torneos`:
     el rect del dispositivo del hero queda dentro del viewport y no intersecta
     los rects del `h1` ni de los CTA.
  2. Con `localStorage["arma2-locale"]="en"`: ningún caption ni texto de
     pantalla con `scrollWidth > clientWidth`, en 1440×900 y 390×844, en los
     cuatro capítulos.
  3. `/#mercado-arqueros`, `/#faq` y `/torneos#torneos-planes`: el destino
     intersecta el viewport. Recargar a mitad de la historia: el dispositivo
     queda con opacidad > 0.
  4. Pasar de 390×844 a 844×390 y volver: el dispositivo sigue dentro del viewport.
  5. Con `javaScriptEnabled: false`, en `/` y `/torneos`: el `h1` y el
     dispositivo del hero son visibles.
- Además, guarda cuadros en el scratchpad en las posiciones revisadas del
  prototipo, para la revisión visual.

- [ ] **Step 1: Escribir `visual-check.mjs`.** Con el servidor de desarrollo
  levantado (`preview_start arma2-dev`), correrlo antes de terminar la limpieza
  para ver que detecta problemas: toda aserción que falle se corrige en el
  código, no en el chequeo.
- [ ] **Step 2: Limpieza** y docs.
- [ ] **Step 3: Verificación completa:**
  - `npm test`: todo verde;
  - `npm run lint`: limpio;
  - `npm run build`: OK;
  - `npm run start` + `npm run check:visual`: 0 fallas;
  - Lighthouse mobile en `/` y `/torneos` (Chromium de Playwright): Performance
    ≥ 90; Accessibility, Best Practices y SEO = 100;
  - recorrida con Tab en cada home: foco visible en todos los elementos.
- [ ] **Step 4: Commit** `chore: limpieza de la v1, chequeo visual y docs`.

---

## Self-review

- **Cobertura del spec:**

  | Spec | Tasks |
  | --- | --- |
  | §2 decisiones | 1, 2, 6 y 9 |
  | §3 qué se conserva | Global Constraints y 12 |
  | §4 arquitectura | 2, 4, 5 y 9 |
  | §5.1 navs | 6 y 10 |
  | §5.2 jugadores | 3 a 7 |
  | §5.3 Torneos | 8 a 10 |
  | §6 afirmaciones | Constraints, 3 y 8 |
  | §7 accesibilidad y rendimiento | 1, 5, 9 y 12 |
  | §8 pruebas | en cada task |
  | §9 lanzamiento | Constraints |

  Agregados con la aprobación de Nico: imágenes para compartir nuevas y
  `themeColor` (Task 11), selector de capítulos navegable (Task 5), FAQ de
  invitados actualizada y verificada (Task 3), tabla comparativa plegable
  (Task 10).
- **Consistencia de tipos:**
  - `MotionValue<number>` como `progress` en Tasks 4, 5 y 9.
  - `STORY_SPLIT` (Task 3) y `standingsRows`/`scorersRows` (Task 8) solo se
    consumen en pantallas.
  - `data-brand-mark` está en Tasks 2, 5 y 6.
