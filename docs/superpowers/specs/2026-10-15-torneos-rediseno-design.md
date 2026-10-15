# Rediseño estructural del portal Arma2 Torneos (2026-10-15)

**Dirección:** Codex, con autorización de Nico (2026-10-15). La revisión concreta se hace sobre la vista previa de Vercel.
**Base:** rama `claude/torneos-rediseno`, sobre `claude/premium-disponible` (PR #13: Premium a la venta).
**Referencia:** la **estructura** de timbo.futbol: hero, video, «para vos / para tus jugadores», funciones agrupadas, pasos para empezar, FAQ y cierre. De timbo no se copia texto, branding ni orden exacto.
**Se mantienen:** el spec cinemático (2026-10-12), el scroll natural (2026-10-13) y las reglas de copy, accesibilidad y performance de esos specs.

## 1. Objetivo
Que un organizador entienda en un recorrido corto:
- qué hace Arma2 Torneos;
- cómo se adapta a su formato;
- qué ven sus jugadores;
- qué hay en FREE y qué suma Premium.

Y que haga clic en «Empezar gratis».

## 2. Reglas
- **Sólo funciones verificadas** en `nicoavayu/Armado_Equipos` (origin/main `b4fb150a`) y vigentes en Producción. Los flags de app.arma2.com.ar el 2026-10-15 son CONNECTED, BRANDING, MEDIA, SOCIAL_GENERATOR, PLAN_READ y BILLING production. La tabla de §5 es la fuente.
- **Sin** cifras de uso, testimonios ni sponsors, porque no tenemos datos reales.
- **Sin** scroll secuestrado, elementos `sticky` en `main`, escenas atadas al scroll ni bloques de una pantalla sin texto nuevo. Lo controla `npm run check:visual`.
- Las pantallas del producto se recrean en HTML con la liga de ejemplo (Copa Primavera 2026), rotuladas «Ejemplo con datos ficticios».
- Las placas de Social Studio son **exports reales** del renderizador del producto, hechos con el mismo torneo ficticio (`assets/placas/`).
- ES y EN con la misma forma (`i18n-shape`). Todo el copy vive en `torneos-content.ts`.
- Accesibilidad AA, objetivos táctiles de 44 px y `prefers-reduced-motion`.

## 3. Estructura (orden de la página)
| # | Sección (id) | Contenido | Estado |
|---|---|---|---|
| 1 | Hero (`#torneos-hero`) | Sin cambios sustanciales: título, CTA, render del gestor | Se mantiene |
| 2 | **Video** (`#torneos-video`) | «Arma2 Torneos en un minuto»: marco 16:9 con poster y `<video controls preload="none">`. Sin archivo de video la sección no se publica en Production; en las previews muestra el poster rotulado «Video en preparación» | Nueva |
| 3 | **Para quién** (`#torneos-para-quien`) | Dos bloques. **«Para vos, que organizás»:** gestor web completo, tu formato, colaboradores, resultados que actualizan todo. **«Para tus jugadores y su gente»:** página pública sin app ni cuenta, inscripción por capitán, avisos de reprogramación en la app Arma2, fotos de cada fecha para los participantes; enlace al sitio de jugadores | Nueva |
| 4 | **Formatos** (`#torneos-formatos`) | Los 5 formatos reales; opciones (ida y vuelta, tercer puesto, puntos y desempates configurables); Fútbol 5 a 11; categorías por género y edad; varias competencias por temporada. Ilustración conceptual: liga, grupos y llave | Nueva |
| 5 | Cómo funciona (`#torneos-como-funciona`, `#capitulo-*`) | Los 4 pasos animados actuales: resultado → tabla → página pública → placas | Se mantiene |
| 6 | **Página pública propia** (`#torneos-pagina-publica`) | Un link por torneo, sin app; pestañas reales (Inicio, Fixture, Resultados, Tabla, Goleadores, Equipos, Disciplina); convocatoria con «Solicitar inscripción»; logo del torneo | Nueva |
| 7 | Funciones (`#torneos-funciones`) | Las mismas 6 tarjetas, **agrupadas** en 3 grupos: Competencia (fixture, reprogramación), Equipos (inscripción, disciplina), Trabajo y comunicación (colaboradores, multimedia) | Se reorganiza |
| 8 | **Placas para redes** (`#torneos-placas`) | El resumen de la fecha: elegir → descargar → compartir. FREE: Resultados, Tabla y Próxima fecha en estilo Base con firma. Premium: las 11 placas, 4 estilos más, sin marca, y más fotos (25 → 100). Usa exports reales | Nueva |
| 9 | Planes (`#torneos-planes`) | FREE y Premium (PR #13) | Se mantiene |
| 10 | **Empezá en 4 pasos** (`#torneos-pasos`) | 1 Entrá con Google, Apple o tu email · 2 Creá la temporada y el torneo con el asistente (Información, Modalidad, Formato, Reglas, Categorías, Revisión) · 3 Sumá los equipos o abrí la inscripción · 4 Publicá el fixture y cargá resultados | Nueva |
| 11 | FAQ (`#torneos-faq`) | La actual, más «¿Qué formatos puedo armar?» | Se amplía |
| 12 | Cierre (`#torneos-empezar`) | Sin cambios | Se mantiene |

**Nav:** Cómo funciona (`#capitulo-cargas`, sigue primero), Formatos, Funciones, Planes, Preguntas.

## 4. Componentes
Todo en `src/components/torneos/`, con copy de `useTorneosContent()`.
- `TorneosVideo`: `TORNEOS_VIDEO = { src, poster }` en `src/lib/torneos-video.ts`. La visibilidad se decide con `src` y con `NEXT_PUBLIC_VERCEL_ENV`.
- `TorneosAudiencias`.
- `TorneosFormatos`: incluye la ilustración `FormatDiagram` (HTML/CSS).
- `TorneosPaginaPublica`: reusa `PublicPagePhone` y `DeviceFrame`.
- `TorneosGallery`: se reagrupa con un subtítulo por grupo y conserva los 6 `article[data-card]`.
- `TorneosPlacas`: imágenes de `public/torneos/placas/*.webp`, salidas de los exports reales, con `next/image` y `sizes`.
- `TorneosPasos`.
- **Animación:** sólo entrada al aparecer, con `usePlayWhenVisible` o CSS sobre `transform` y `opacity`. En el servidor, sin JS y con movimiento reducido se ve el estado final.

## 5. Afirmaciones verificadas (fuente: relevamiento del producto, 2026-10-15)
- **Formatos:** Liga, Eliminación directa, Fase de grupos, Grupos y playoffs, Liga y playoffs. Son los nombres que el organizador elige en el asistente, del catálogo de la base (`tournament_competition_formats`, baseline). La página pública muestra el fallback del cliente, «…y eliminatorias».
- **Tabla:** no se actualiza sola. Al oficializar el acta, se **Recalcula** y se **Publica** la revisión (`MatchOperationsPage.jsx:1059`, `CompetitionCenterPage.jsx:526`). La página pública muestra los resultados oficiales y la tabla publicada. Corregido también en PR #13 (`4842195`). Ida y vuelta; tercer puesto; agregar una fase a una competencia en curso.
- **Reglas:** puntos por partido configurables. Desempates: diferencia de gol, goles a favor, resultado entre sí, partidos ganados, fair play, partido desempate, sorteo.
- **Modalidades:** Fútbol 5, 6, 7, 8, 9 y 11. Categorías con género (Masculino, Femenino, Mixto, Abierto) y edad. Una temporada tiene varios torneos.
- **Asistente:** Información, Modalidad, Formato, Reglas, Categorías, Revisión.
- **Página pública:** `/torneos/publico/:slug`, anónima. Pestañas Inicio, Fixture, Resultados, Tabla, Goleadores, Equipos, Disciplina. Convocatoria con «Solicitar inscripción». Logo del torneo. **No** tiene fotos.
- **Social Studio:** 11 familias. FREE tiene Resultados de la fecha, Tabla de posiciones y Próxima fecha, en Base con firma. Premium suma Heritage, Street, Scoreboard y Editorial, sin marca. Formatos Feed 4:5 e Historia 9:16. Exporta con el menú de compartir del dispositivo o descarga el PNG.
- **Galería:** 25 fotos por temporada en FREE y 100 en Premium; por torneo, fecha o partido; con moderación; para la organización y los participantes.
- **Avisos de reprogramación:** sólo en la app (bandeja «Avisos»).
- **Roles:** Propietario, Administrador, Colaborador; FREE con propietario + 1, Premium con propietario + 10.
- **Login:** Google, Apple y email (`AuthHome.jsx`).
- **Premium:** se compra desde «Mi plan»; Términos de venta (PR #13).

## 6. Verificación
- `vitest run`: los tests existentes se actualizan donde cambia la estructura (nav y grupos de la galería) y se suman tests nuevos por sección: ids, afirmaciones de §5 y ausencia de cifras o testimonios.
- `eslint`, `next build` y `npm run check:visual` contra `next start` local.
- Vista previa de Vercel de la rama, más capturas a 1440, 390 y 320 en el handoff compartido.

## 7. Fuera de alcance
- Cambios de dominio o DNS.
- Merge o publicación sin GO.
- Servicios pagos.
- Capturas reales de la app logueada (fase 2, con el entorno QA local).
