# Rediseño cinemático de arma2.com.ar y Arma2 Torneos — diseño

- Fecha: 2026-10-12
- Estado: borrador para revisión del usuario
- Reemplaza la capa visual de `2026-10-12-arma2-sitios-rediseno-design.md` (v1).
  La infraestructura de la v1 se conserva (ver §3).
- Referencia visual aprobada: `docs/superpowers/specs/prototipos-cinematicos/`
  (`jugadores-cinematico.html` y `torneos-cinematico.html`). Las imágenes
  apuntan a `/files/…` del companion, así que abiertos sueltos se ven sin
  imágenes; el comportamiento, los tiempos y el copy son la referencia.

## 1. Objetivo

Nico rechazó la v1: fondo negro plano, capturas chicas que "no dicen nada",
mucho texto y Torneos en crema editorial. Pidió un sitio "revolucionario" con UX
increíble en los dos sitios y eligió la dirección **cinemática tipo Apple**.
Aprobó los dos prototipos ("todo aprobado") después de esta ronda de cambios:

- El producto se ve **entero en la primera vista** del hero.
- En la nav de arma2.com.ar va **solo la pelotita**, sin "Arma2" escrito, con
  efecto de color y tamaño.
- La bajada del hero no explica mecánicas; el link de WhatsApp se cuenta en el
  capítulo 1.
- Lenguaje natural rioplatense, verificado contra el código del producto.

### Criterios de éxito

- En el primer pantallazo de cada home se ve el producto completo, el titular y
  la acción principal (descargar / empezar gratis), en desktop y en celular.
- La historia con scroll se entiende sin leer párrafos: cada capítulo muestra
  en la pantalla del dispositivo lo que dice el título.
- Ningún texto afirma algo que el producto no haga hoy (§6).
- Lighthouse mobile en las dos home: Performance ≥ 90; Accessibility, Best
  Practices y SEO = 100 (la v1 llegó a 94/100/100/100 y 93/100/100/100).
- Con `prefers-reduced-motion: reduce` todo el contenido es legible sin
  animaciones ni secciones fijadas.

## 2. Decisiones

| Tema | Decisión |
| --- | --- |
| Dirección visual | Cinemática tipo Apple: escenas fijadas con scroll, dispositivo en 3D que cuenta la historia, titulares grandes, pocas palabras |
| Color | Fondos de noche con luz violeta/azul. Jugadores: degradé `#27b8ff → #7b5cff → #ec4dff`. Torneos: `#27b8ff → #6c4dff → #a35bff` |
| Pantallas del producto | UI recreada en HTML/CSS dentro de marcos de dispositivo (no capturas). Se anima y se lee a cualquier tamaño. Datos de ejemplo, con rótulo |
| Logo jugadores | Nav: solo la pelotita (`logo_navbar.png` como máscara) con degradé cónico animado y glow; hover: escala y gira. En el hero aparece gigante detrás de los celulares y al bajar se achica hasta la nav |
| Logo Torneos | Nav: lockup oficial "ARMA2 \| TORNEOS" (`public/torneos/logo-torneos.png`), porque "Torneos" tiene que leerse |
| Tipografía | Jugadores: Inter (ya cargada). Torneos: titulares en Barlow Condensed 800 itálica mayúscula (eco del logo TORNEOS) + Inter para texto |
| Imágenes de marca | Del sitio viejo: `BG_HERO.png`, `mvp_award.png`, `goalkeeper_award.png`, `redcard_award.png`, `CardProfileCard.png`, `logo_arma2.png`. De Nico: `BG_Torneos.png` y el render `pc_torneos.png` (corregido: muestra `app.arma2.com.ar` y `/torneos/publico/copa-primavera` en lugar de "armadosfutbol.com"; copia corregida en `public/torneos/pc-torneos.png`, el original de Nico queda intacto) |
| Capturas reales de la v1 | Se eliminan del sitio (quedan en el historial de git) |
| Demos interactivas de la v1 | `BalanceDemo` y `UnaCarga` se reemplazan por los capítulos de la historia |

## 3. Qué se conserva de la v1

Sin cambios de comportamiento:

- Ruteo por host (`src/proxy.ts`, `src/lib/site-routing.ts`), `torneos.arma2.com.ar`,
  308 desde `www.arma2.com.ar/torneos…`, `torneos.localhost`.
- `src/lib/site-urls.ts`, `store-links.ts` + `/descargar`, QR (`public/descargar-qr.svg`).
- Layouts por sitio, metadata, `LocalizedMeta`, sitemap, robots, OG image de
  Torneos, JSON-LD (FAQPage, MobileApplication, SoftwareApplication), 404 con marca.
- Páginas legales y sus componentes `Section`/`Button`.
- i18n ES/EN con `LanguageProvider` y `LanguageToggle`.
- `COMMERCIAL` en `src/lib/torneos-content.ts` como fuente única del modelo
  comercial, con sus tests.
- `src/lib/balance-demo.ts` y `src/lib/torneos-demo.ts` pasan a ser la fuente de
  los datos de ejemplo de las historias (§5.2 y §5.3), con tests.
- Docs de dominio y deploy (`docs/dominios-y-deploy.md`).

Se eliminan: `Hero`, `ComoSeArman`, `BalanceDemo`, `EnQueEstas`, `ChapterNav`,
`DespuesDelPartido`, `TorneosHero`, `UnaCarga`, `TorneosGestion`, `TorneosPublica`,
`TorneosStudio`, `TorneosMedia`, `PhoneFrame`, `BrowserFrame`, `src/lib/shots.ts`,
`public/shots/` y lo que quede sin uso (claves de i18n, imágenes de Social Studio
de la v1, `use-active-section.ts` si no se reutiliza).

## 4. Arquitectura del movimiento

- **Motor de scroll:** framer-motion (ya es dependencia). Cada escena fijada es
  una `<section>` alta con un hijo `sticky top-0 h-svh`. `useScroll({ target })`
  da el progreso 0–1 y `useTransform` lo mapea a transformaciones, sin re-render
  por frame. Los estados discretos (contadores, filas que aparecen, toggles) se
  derivan con `useMotionValueEvent` hacia estado chico o atributos `data-*`.
- **Tiempos:** se copian del prototipo (rangos de progreso por capítulo,
  easings `easeInOutCubic`, `easeOutCubic` y `backOut`). Ver los arrays `CH`,
  `GOALS`, `AW` y `CHIP` de los prototipos.
- **Geometría:** el dispositivo se posiciona respecto del viewport (centro en
  60–69 % del ancho en desktop, 50 % en celular) y los elementos flotantes
  respecto del centro del dispositivo, escalados según el espacio libre, como en
  el prototipo (`fs`).
- **Breakpoint:** < 900 px usa el layout de celular del prototipo (titular
  arriba, dispositivo abajo, flotantes reducidos o reubicados).
- **Movimiento reducido:** con `prefers-reduced-motion: reduce` (o
  `MotionConfig reducedMotion="user"`) las escenas no se fijan. Cada capítulo se
  renderiza estático en su estado final: título, texto y su pantalla, uno debajo
  del otro. Las animaciones infinitas (glow, radar, bob) se apagan.
- **Pantallas en HTML:** componentes chicos por pantalla (`ScreenHome`,
  `ScreenConvocatoria`, `ScreenVotacion`, `ScreenEquipos`, `ScreenEncuesta`,
  `DashboardResultado`, `PublicPagePhone`, `Poster`), con tipografía en `em`
  relativa al ancho del marco, para que escalen juntas. Marcos: `DeviceFrame`
  (celular) y `LaptopFrame`.
- **SSR:** todo el texto de los capítulos está en el HTML del servidor (SEO y
  lectores de pantalla). Las pantallas de ejemplo llevan `aria-hidden` y un
  rótulo "Ejemplo con datos ficticios" accesible por sección.

## 5. Contenido por sitio

Los textos en español de los prototipos son el copy aprobado. Se agrega la
versión en inglés con el mismo tono, en `i18n.ts` (jugadores) y
`torneos-content.ts` (Torneos).

### 5.1 Nav

- **Jugadores:** pelotita (aria-label "Arma2, inicio"), links a Cómo funciona,
  Funciones y Torneos ↗ (`SiteSwitch`), `LanguageToggle`, botón Descargar. La nav
  es transparente durante el hero y pasa a vidrio cuando la pelotita llega.
  Menú móvil como en la v1.
- **Torneos:** lockup oficial, links a Cómo funciona, Funciones, Planes y
  Preguntas, "Arma2 para jugadores ↗", `LanguageToggle`, botón "Entrar" al
  gestor (`getCreateTournamentTarget`). Menú móvil como en la v1.

### 5.2 arma2.com.ar

1. **Hero + historia** (una escena fijada, `id="como-se-arman"`, alias
   `#how-it-works` y `#como-funciona`):
   - Hero: eyebrow "Fútbol amateur · nivel pro"; H1 "Organizá partidos. / Armá
     equipos parejos. / Jugá."; bajada "Quién viene, cómo quedan los equipos y
     quién fue la figura. Todo en una app, gratis para iOS y Android."; tiendas
     (`StoreButtons`). A la derecha, el celular en 3D con la home
     de la app y el segundo celular con el splash; detrás, la pelotita gigante.
   - Transición: el texto se va a la izquierda, el segundo celular sale, el
     principal se endereza y la pelotita vuela a la nav.
   - Capítulos, con su pantalla y flotantes:
     1. **Convocás** — "Lo mandás por WhatsApp. Se anotan solos." / "Pasás el
        link en el grupo y cada uno confirma. El que no tiene la app también se
        suma desde el link, sin crear cuenta." Pantalla: partido "Fútbol de los
        jueves" con confirmados 1→10 (Pipe como "Invitado"). Flotantes: mensaje
        del grupo con la vista previa del link y avisos de confirmación.
     2. **Votan** — "El grupo califica. No el que organiza." / "Cada uno le
        pone del 1 al 10 a los que conoce, y al que no conoce lo saltea. Se vota
        desde la app o desde el link." Pantalla: carta de votación con la escala
        1–10 y "No lo conozco". Flotantes: votos.
     3. **Se arman** — "Equipos parejos. De verdad." / "Con los votos de todos,
        Arma2 arma los dos equipos más parejos posibles, respetando a los
        arqueros." Pantalla: la lista se reparte en dos equipos, sumas 33.6 y
        33.5, barra de balance y "Dif 0.1 · Muy parejo". Los números salen de
        `balanceTeams(DEMO_PLAYERS, { fixGoalkeepers: true })`.
     4. **Se juega** — "El partido no termina con el pitazo." / "Después del
        partido llega una encuesta corta: resultado, figura, mejor arquero y
        tarjetas. Todo queda en la carta de cada uno." Pantalla: "¿Quién fue la
        figura?" (paso 3 de 8). Flotantes: premios de figura, mejor arquero y
        tarjeta roja.
   - Selector de capítulos abajo, que además navega al capítulo.
2. **Galería "Y si te falta algo, Arma2 lo encuentra."** (`id="funciones"`,
   alias `#features`): scroll horizontal fijado con seis tarjetas: Partido
   automático (radar), Mercado de arqueros (`id="mercado-arqueros"` en la
   tarjeta), Equipos y desafíos, Ranking, Tu carta y Frecuentes.
3. **Preguntas** (`id="preguntas"`, alias `#faq`): las preguntas y respuestas de
   la v1 (siguen alimentando el JSON-LD), con el estilo nuevo.
4. **Banda Torneos** (`id="torneos"`): foto del estadio, lockup de Torneos,
   "¿Organizás un torneo?" y botón al portal.
5. **Descarga** (`id="descargar"`): "Tu próximo partido empieza acá.", tiendas y QR.
6. Footer de la v1 con el estilo nuevo.

### 5.3 Torneos

1. **Hero + historia** (`id="torneos-como-funciona"`, que es
   `TORNEOS_HOW_ANCHOR`):
   - Hero: foto del estadio de fondo; H1 "Todo el torneo. / Mucho menos
     trabajo."; bajada "Fixture, resultados, tabla, página pública y placas para
     redes en un mismo lugar. Cargás el resultado una vez y se actualiza todo.";
     "Empezar gratis" y "Ver cómo funciona"; "Empezás en FREE, sin tarjeta." El
     render corregido entra entero en la primera vista.
   - Transición: la cámara "entra" en el render y aparece la notebook en HTML.
   - Capítulos, con datos de `torneos-demo.ts` (Los Galácticos 3–1 Tiki-Taka):
     1. **Cargás** — "Cargás el resultado. Una sola vez." / "Marcador, goles y
        quién los hizo. Nada más." El marcador sube gol por gol y se guarda.
     2. **Se actualiza** — "La tabla se ordena sola." / "Puntos, diferencia de
        gol y goleadores se recalculan al instante. Nada de planillas." Los
        Galácticos pasan a primeros con 15; Nico a 7 goles.
     3. **Se publica** — "Todos lo ven al toque." / "La página pública del
        torneo se actualiza sola. Jugadores y familias la abren desde un link,
        sin descargar nada." Entra el celular con la página pública.
     4. **Se comparte** — "Y la placa para redes, lista." / "Social Studio arma
        las placas de resultados y goleadores con los datos del torneo. Las
        descargás y las subís." Salen las placas Resultado y Goleadores (Premium).
2. **Galería "El torneo entero, en orden."** (`id="torneos-funciones"`):
   Fixture, Disciplina, Multimedia, Colaboradores e Historial.
3. **Planes** (`id="torneos-planes"`): FREE y Premium como en el prototipo, con
   todos los números tomados de `COMMERCIAL`, más el aviso de fotos. La tabla
   comparativa accesible de la v1 queda debajo, colapsable ("Ver comparación
   completa").
4. **Preguntas** (`id="torneos-faq"`): las de la v1, con el estilo nuevo.
5. **Cierre** (`id="torneos-empezar"`): "Armá tu torneo hoy." con foto del estadio.
6. Footer de la v1 con el estilo nuevo.

## 6. Afirmaciones verificadas

Verificadas en `Armado_Equipos` `origin/main` (785cb88):

| Afirmación | Fuente |
| --- | --- |
| Invitación por WhatsApp; se suman sin app ni cuenta | `features/onboarding/content.js` ("Tus amigos pueden sumarse aunque todavía no tengan Arma2"), `__tests__/publicMatchInviteFlow.test.jsx` |
| Se vota desde el link | `__tests__/publicVotingRouteIsolation.test.jsx`, FAQ aprobada en la v1 |
| Votación 1–10 con "No lo conozco"; balance con arqueros fijos | Verificado en la v1 |
| Encuesta de 8 pasos con figura, arquero, tarjetas | Verificado en la v1 (`PLAYED … ORGANIZE_TEAMS`) |
| Partido automático, mercado de arqueros, desafíos, ranking, frecuentes | Onboarding (`goalSelectorContent`) y v1 |
| Página pública en `/torneos/publico/:slug` | `src/App.js` |
| Placas, fotos, colaboradores, historial del fixture | Copy verificado de la v1 en `torneos-content.ts` |

Regla: cualquier texto nuevo que no esté en esta tabla se verifica antes de
publicarlo, o no se usa.

## 7. Accesibilidad y rendimiento

- Un solo `h1` por página; cada capítulo es un `h2`. Contraste AA (texto chico
  con alfa mínimo 0.55 sobre oscuro). Controles de al menos 44 px. Foco visible.
- El selector de capítulos es una lista de links con `aria-current`.
- Las pantallas de ejemplo son decorativas (`aria-hidden`); el texto del
  capítulo describe lo que muestran.
- Imágenes en WebP con `next/image` y `sizes`. Las del hero con `priority`.
  `pc-torneos` < 250 KB; fondos < 200 KB.
- Barlow Condensed con `next/font/google`, solo itálicas 800 y 900, subset latin.
- Animaciones solo con `transform` y `opacity`. Sin `backdrop-filter` en
  elementos que se mueven.

## 8. Pruebas

- **Unitarias:** el reparto demo da 33.6 / 33.5 con los arqueros en equipos
  distintos; la tabla demo pasa de Tapita 13 / Galácticos 12 a Galácticos 15
  primero; los goleadores, a Nico 7.
- **SSR (`renderToStaticMarkup`):**
  - cada home tiene un `h1`, cuatro `h2` de capítulo con su texto y las
    secciones con sus anclas y alias;
  - la nav de jugadores no tiene el texto "Arma2" visible (solo `aria-label`);
  - los precios y límites salen de `COMMERCIAL`;
  - la bajada del hero no menciona el link.
- **Movimiento reducido:** con reduced motion se renderizan los cuatro
  capítulos en estado final y ninguna sección queda fijada.
- **Suite existente:** routing, URLs, stores, QR, 404 y JSON-LD siguen en verde.
- **Visual:** cuadros con Playwright en 1440×900 y 390×844 en las mismas
  posiciones que se revisaron en el prototipo, y Lighthouse mobile en las dos home.

## 9. Lanzamiento

Sin cambios respecto de la v1: no se pushea `main` hasta tener Torneos Production
habilitado, el dominio asociado y el copy comercial confirmado contra el PR de
integración. El trabajo sigue en el branch `claude/armados-torneos-ux-redesign-cb3a43`
(ya en GitHub, con su preview de Vercel).
