# Arma2 Torneos — landing comercial (`/torneos`)

Estado: **lista para revisión visual**, sin checkout ni integraciones comerciales
dentro de `Arma2Web`.

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

No es necesario cambiar Production para revisar este PR. Tanto “Empezar gratis”
como el CTA Premium entran a Torneos; el segundo conserva el intent Premium y
el upgrade se inicia después desde la página Plan de una temporada autenticada.

Flujo comercial:

```text
Landing → Arma2 Torneos → organización → temporada → Plan → Premium → checkout
```

La landing no crea preferencias de pago, no abre Mercado Pago y no decide el
precio de una compra.

## Modelo comercial comunicado

### FREE

- Gratis por temporada y sin vencimiento.
- Equipos y planteles.
- Fixture, programación, partidos, actas y resultados.
- Tabla, goleadores, disciplina, sanciones y estadísticas básicas.
- Logo, portada, escudos, fotos y retratos, además de la página pública.
- Comunicados básicos.
- Social Studio Base: 3 familias en 4:5 y 9:16 —Resultados, Tabla y Próxima
  fecha— con firma Arma2 Torneos obligatoria.
- Hasta 25 archivos multimedia agregados entre todas las competencias de la
  temporada.
- Owner + 1 colaborador administrativo.

### Premium

- Precio lanzamiento: **$39.900 ARS**.
- Precio habitual de referencia: **$49.900 ARS**.
- Pago único por temporada.
- Acceso permanente para esa temporada, incluidas todas sus categorías y
  competencias.
- Las 11 familias Base de Social Studio y Street/Editorial para Resultados.
- Exportaciones Base con branding Arma2 opcional.
- Hasta 1.000 archivos multimedia por temporada.
- Owner + hasta 10 colaboradores administrativos.
- Más vistas y estilos para exportar desde Social Studio: Street y Editorial para
  piezas de Resultados.

No se incluyen en el packaging comercial actual estadísticas avanzadas,
personalización avanzada, Sponsors, exportaciones profesionales ni estilos aún
no implementados.

Cada temporada nueva vuelve a comenzar en FREE y elige su plan de forma
independiente.

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
  sigue pendiente.

Sponsors, estadísticas avanzadas, personalización avanzada y exportaciones
profesionales no se presentan como beneficios disponibles ni como promesas en
la landing. La personalización esencial —logo, portada, escudos, fotos y
retratos— sí está disponible en FREE y, por herencia, Premium.

## SEO e i18n

`/torneos` tiene title, description, keywords, canonical, Open Graph, Twitter
Card, JSON-LD `FAQPage` y entrada en `sitemap.ts`. El contenido visible responde
al toggle ES/EN compartido.

Como en las demás rutas institucionales sin prefijo de idioma, el metadata del
servidor se publica en español. Una metadata inglesa indexable requeriría routing
localizado (`/en/torneos`), fuera del alcance de esta landing.

## Fuera de alcance

- Backend, Supabase y Edge Functions.
- Mercado Pago, checkout, purchases, grants y entitlements.
- App móvil y repositorio `Armado_Equipos`.
- Secrets y cambios de variables en Production.
- Deploy o merge a Production.
