# Arma2 Torneos — portal comercial (`torneos.arma2.com.ar`)

Estado (2026-10-12): **rediseño cinemático aprobado por Nico** (spec
`docs/superpowers/specs/2026-10-12-arma2-sitios-cinematico-design.md`). El PR del
rediseño **reemplaza al PR #9**. Sin checkout ni integraciones comerciales dentro
de `Arma2Web`.

- Dominio propio: `torneos.arma2.com.ar`, servido por `src/proxy.ts` (ver
  `docs/dominios-y-deploy.md`). `arma2.com.ar/torneos` redirige con 308.
- Secciones (2026-10-13, scroll natural): hero con la foto del estadio y el
  render del gestor; "Cómo funciona" en cuatro pasos (cargás el resultado → la
  tabla se ordena → la página pública se actualiza → salen las placas), cada
  ilustración animándose sola al llegar; grilla de funciones (inscripción por
  capitán, fixture, reprogramación, disciplina, multimedia, colaboradores);
  planes con comparativa plegable; preguntas y cierre; torneo de ejemplo en
  `/ejemplo`.
- El panel, la página pública y las placas están recreados en HTML con la liga
  de ejemplo de `src/lib/torneos-demo.ts`, con el rótulo "Ejemplo con datos
  ficticios". Ya no se usan capturas ni exports de Social Studio.
- **Premium, próximamente (2026-10-13):** con los pagos apagados, la tarjeta
  Premium dice "Próximamente", no tiene link de compra y muestra "Precio de
  lanzamiento: ARS 20.000 finales por temporada" (aprobado por Nico), con la
  explicación de la temporada al lado. Las reglas que todavía no rigen
  (duración de la temporada, borrado de fotos, 100 fotos) están escritas en
  futuro. Lo gobierna `COMMERCIAL.premiumAvailable` (hoy `false`), que también
  saca la oferta Premium del JSON-LD.

## Alcance

La landing pública presenta Arma2 Torneos para ligas amateurs, complejos, clubes
y organizadores. Incluye copy ES/EN, planes FREE/Premium, SEO, FAQ, acceso desde
navbar/footer y CTA hacia la experiencia web autenticada.

Este repositorio sigue siendo únicamente el sitio institucional. No contiene
auth, Supabase, Mercado Pago, purchases, grants ni entitlements.

## Destino de los CTA

El destino canónico verificado del producto es:

```text
https://app.arma2.com.ar/torneos
```

`src/lib/torneos-links.ts` usa ese destino como fallback seguro y conserva
`NEXT_PUBLIC_TORNEOS_APP_URL` como override de deployment. Si se configura la
variable en Vercel, el valor requerido es exactamente:

```text
NEXT_PUBLIC_TORNEOS_APP_URL=https://app.arma2.com.ar/torneos
```

No es necesario cambiar Production para revisar este PR. “Empezar gratis” entra
a Torneos. Mientras `COMMERCIAL.premiumAvailable` sea `false`, Premium no tiene
CTA; cuando se habiliten los pagos, el CTA vuelve a entrar con el intent Premium
y el upgrade se inicia desde la página Plan de una temporada autenticada.

Flujo comercial:

```text
Landing → Arma2 Torneos → organización → temporada → Plan → Premium → checkout
```

La landing no crea preferencias de pago, no abre Mercado Pago y no decide el
precio de una compra.

## Modelo comercial comunicado (aprobado el 2026-10-12)

Reemplaza al modelo anterior ($39.900 de lanzamiento / $49.900 habitual,
"acceso permanente" y 1.000 archivos). **Todavía no está implementado** en
`Armado_Equipos` (lo prepara un PR de integración aparte) y **los pagos siguen
apagados**. Los números viven en una sola constante, `COMMERCIAL`
(`src/lib/torneos-content.ts`). De ahí salen `plans`, las respuestas de plan de
`faq` y el JSON-LD (`src/lib/torneos-jsonld.ts`). Un test (`src/__tests__/review-fixes.test.tsx`)
falla si el copy y la constante se desalinean.

| | FREE (disponible hoy) | Premium (próximamente) |
| --- | --- | --- |
| Precio | $0 | precio de lanzamiento: ARS 20.000 finales por temporada, pago único, sin renovación automática |
| Fotos | hasta 25 por temporada | hasta 100 por temporada |
| Colaboradores | organizador + 1 | organizador + 10 |
| Social Studio | 3 familias Base con firma Arma2 | 11 familias, 5 estilos, placas sin marca Arma2 |

Reglas futuras (rama comercial del producto, todavía no publicadas), escritas en
futuro en el sitio: la temporada dura hasta 6 meses desde su activación, pasar a
Premium a mitad de temporada no cambia la fecha de cierre, y al cerrar la
temporada las fotos se eliminan con aviso previo y opción de descarga.

**Antes de publicar:** confirmar estos textos contra el PR de integración. Si
algo difiere, gana lo implementado: se cambia `COMMERCIAL` y, si cambia una
regla (no un número), el texto de `plans`/`faq`.


## Auditoría focalizada del producto local (2026-08-28)

La fuente de producto revisada fue el worktree local
`arma2-torneos-mercadopago-checkout-pro`, incluyendo el renderer vigente, la
galería QA de Social Studio, el catálogo de entitlements y la oferta comercial
por temporada.

- El renderer **Base** tiene 11 familias y salidas 4:5/9:16. FREE autoriza
  Resultados, Tabla y Próxima fecha; Premium autoriza las once.
- Los cuatro exports usados en la landing —Resultados, Tabla, Goleadores y
  Próxima fecha— salen del renderer Canvas vigente y pertenecen al mismo fixture
  QA. Resultados, Tabla y Próxima fecha muestran la superficie FREE; Goleadores
  muestra una de las familias adicionales de Premium.
- Los archivos anteriores de `public/torneos/social-studio/` eran exports
  legacy: mezclaban lockups y estilos, incluían estados visuales incompletos y no
  representaban el Base aprobado. El problema era de assets de landing, no de
  los cuatro outputs vigentes seleccionados.
- Premium todavía no tiene una matriz completa de themes/familias/formatos:
  Street y Editorial están disponibles para Resultados; la expansión completa
  sigue pendiente. **Superado por Social Studio V2 — ver actualización 2026-09-03.**

## Actualización Social Studio V2 (2026-09-03)

La copy de esta landing quedó preparada para el estado final de Social Studio V2,
que **ya está MERGED** en `nicoavayu/Armado_Equipos` (PR #154 — "Torneos:
integrate Social Studio V2 Premium themes", merge normal, merge commit
`032f4da8d40b61ad4379c49384c7314525ac58ae`, el `main` de Armado_Equipos en
ese momento). Ese estado incorpora los estilos Base, Heritage, Street,
Scoreboard y Editorial sobre las 11 familias de placas, formatos 4:5 y 9:16, y
exportación white-label en Premium; ya no aplica el recorte "Street y Editorial
sólo para Resultados".

- Placas de la landing: desde el rediseño cinemático se recrean en HTML
  (Resultado y Tabla de posiciones, las dos FREE) con la liga de ejemplo.
  Los estilos premium se comunican como texto en los planes.
- Mejora visual opcional (no bloqueante): exports reales de Heritage, Street,
  Scoreboard y Editorial (portrait 4:5, mismo fixture QA). Es una mejora visual
  pendiente, no un blocker funcional de la landing.

### Estado de lanzamiento

El bloqueo ya no es el diseño de la landing, ni Social Studio, ni Production
Enablement. El único blocker de lanzamiento relevante hoy es completar y
certificar la promoción real del backend/DB de Production en
`nicoavayu/Armado_Equipos` y, recién después, habilitar Torneos de forma
controlada.

- **Social Studio V2:** MERGED y certificado en `nicoavayu/Armado_Equipos`
  (PR #154).
- **Production Enablement:** MERGED y certificado mediante PR #155. Merge
  commit / `main` posterior:
  `f6dafb6b755f5d5337a7dc90066c849047cb6109`.
- **Production Backend Upgrade Path:** MERGED mediante PR #156. `main` actual
  de Armado_Equipos: `e61f089d873d00e8a2a62b9d41ecf26b6c820c53`.
- **Rehearsal local del backend:** PASS (*production backend upgrade prep
  pass*), ejecutado íntegramente fuera de `Arma2Web`.
- **Production DB Promotion:** todavía **BLOCKED** en preflight. Blockers
  vigentes: reconciliar las diferencias entre el Production real y el BEFORE
  restaurado; acreditar backup/recovery real antes de escribir; y la ausencia
  de una autorización explícita de promoción real.
- **Supabase Production:** todavía sin migrations de Torneos aplicadas.
- **Torneos Production:** todavía CLOSED.
- **Landing PR #9 (`nicoavayu/Arma2Web` #9):** en hold. No mergear ni deployar
  todavía.

Recertificaciones previas (resumen histórico): build PASS · smoke local PASS ·
Social Studio 382/382 · Auth/returnTo/Production flags 32/32 · route isolation
6/6 · DB Social Studio 45/45 · season-commercial 35/35 · grants 877/877 ·
migration guard 8/8 · lint PASS · `git diff --check` PASS · Auto-Match SHA
intacto. Toda esa promoción ocurre fuera de `Arma2Web`.

Los exports reales Premium de Heritage, Street, Scoreboard y Editorial siguen
siendo una **mejora visual opcional** y **no** un blocker funcional de la
landing ni del lanzamiento.

Sponsors, estadísticas avanzadas, personalización avanzada y exportaciones
profesionales no se presentan como beneficios disponibles ni como promesas en
la landing. La personalización esencial —logo, portada, escudos, fotos y
retratos— sí está disponible en FREE y, por herencia, Premium.

## SEO e i18n

El portal tiene metadata propia en `src/app/torneos/layout.tsx`: title,
description, keywords, canonical `https://torneos.arma2.com.ar`, Open Graph
(imagen generada en `opengraph-image.tsx`) y Twitter Card. Tiene además
`sitemap.xml` y `robots.txt` propios en su host, y JSON-LD `FAQPage` +
`SoftwareApplication` con la oferta FREE (la de Premium se suma cuando
`COMMERCIAL.premiumAvailable` pase a `true`). El contenido visible
responde al toggle ES/EN, y `LocalizedMeta` actualiza el título por idioma.

El metadata del servidor se publica en español. Una metadata inglesa indexable
requeriría routing localizado, fuera de alcance.

## Fuera de alcance

- Backend, Supabase y Edge Functions.
- Mercado Pago, checkout, purchases, grants y entitlements.
- App móvil y repositorio `Armado_Equipos`.
- Secrets y cambios de variables en Production.
- Deploy o merge a Production.
