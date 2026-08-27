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
como el CTA Premium entran a Torneos; el upgrade se inicia después desde la
página Plan de una edición autenticada.

Flujo comercial:

```text
Landing → Arma2 Torneos → torneo/edición → Plan → Premium → checkout
```

La landing no crea preferencias de pago, no abre Mercado Pago y no decide el
precio de una compra.

## Modelo comercial comunicado

### FREE

- Gratis por torneo/edición.
- Equipos y planteles.
- Fixture, programación, partidos y resultados.
- Tabla, disciplina y estadísticas básicas.
- Identidad esencial y página pública básica.
- Comunicados básicos.
- Una opción gratuita en Social Studio.

### Premium

- Precio lanzamiento: **$39.900 ARS**.
- Precio habitual de referencia: **$49.900 ARS**.
- Pago único por torneo.
- Acceso permanente para esa edición.
- Multimedia ampliada.
- Más estilos y opciones en Social Studio.
- Mayor capacidad para colaboradores y contenido multimedia.

Se muestran como **Próximamente**, no como disponibles: estadísticas avanzadas,
personalización avanzada, sponsors y exportaciones profesionales. White-label no
se promete.

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
