# Arma2 Torneos — landing comercial (/torneos)

Estado: **landing de marketing implementada**, sin integraciones comerciales.

Este documento registra lo que quedó **preparado pero no conectado**, para que la
integración posterior no tenga que redescubrir el contexto.

---

## 1. Alcance de esta entrega

Incluye:

- Página pública de marketing en `/torneos` (Next.js App Router, server component
  con metadata + secciones client).
- Copy ES + EN, atado al toggle de idioma existente del navbar.
- 11 secciones: hero, problema, gestión completa, página pública del torneo,
  jugadores, Social Studio, multimedia, FREE/PRO, web+app, CTA final, FAQ.
- SEO base: title, description, keywords, canonical, Open Graph, Twitter Card,
  JSON-LD `FAQPage`, jerarquía semántica (`h1` único → `h2` por sección → `h3`).
- Entrada en `sitemap.ts`.

No incluye (deliberadamente): Mercado Pago, checkout, precios, suscripciones,
webhooks, secrets, Supabase, auth, entitlements, cambios de backend, deploy.

---

## 2. GAP principal: destino del CTA "Crear torneo gratis"

**Auditoría:** este repositorio (`nicoavayu/Arma2Web`) es únicamente el sitio
institucional. No contiene auth, ni cliente de Supabase, ni ninguna referencia a
la experiencia autenticada de Torneos. Antes de esta entrega no existía ni una sola
mención a "torneo" en el código.

Por lo tanto **el destino real del CTA no está definido en este repo.**

### Wiring preparado

`src/lib/torneos-links.ts`

| Variable | Estado | Efecto |
| --- | --- | --- |
| `NEXT_PUBLIC_TORNEOS_APP_URL` | **sin definir** | Cuando se define, **todos** los CTA primarios de la landing pasan a apuntar a esa URL como link externo. Sin cambios de componentes. |

Mientras esa variable no exista, el CTA primario cae al ancla `#torneos-empezar`
(sección de cierre), que ofrece los únicos destinos verificables hoy: las fichas
reales de App Store y Google Play (`src/lib/store-links.ts`). No se inventó
ninguna URL.

### Para conectarlo

1. Definir la URL de entrada de "crear torneo" en la experiencia autenticada.
2. Setear `NEXT_PUBLIC_TORNEOS_APP_URL` en Vercel (Preview + Production).
3. Verificar: con la variable seteada, el bloque de botones de store en el cierre
   se oculta solo (`isCreateTournamentPending()`), porque ya hay destino real.

### Decisión pendiente: ¿"Ingresar"?

La arquitectura futura contempla `Crear torneo gratis / Ingresar`. Hoy la landing
solo tiene el CTA de creación. Si se quiere un "Ingresar" separado, hace falta la
URL de login de Torneos (otra variable de entorno análoga).

---

## 3. GAP: catálogo FREE / PRO

La sección existe visualmente y **no fija nada comercial**: sin precios, sin
moneda, sin límites, sin lista de features.

`src/lib/torneos-content.ts` → `plans.free.features` y `plans.pro.features` son
arrays **vacíos a propósito** (marcados como `PLACEHOLDER` en el tipo `PlanCopy`).

- Mientras están vacíos, cada card renderiza solo su descripción. El visitante
  **nunca ve un placeholder** tipo "TBD".
- Cuando llegue el catálogo definitivo: llenar esos arrays en `es` **y** en `en`.
  El checklist aparece automáticamente, sin tocar `TorneosPlans.tsx`.

El CTA de PRO apunta hoy a `/contact` (página que ya existe), no a un checkout.

Cuando exista pricing real, además de las features habrá que decidir: precio,
moneda, ciclo de facturación, y si el CTA de PRO pasa a checkout web.

---

## 4. GAP: copy prudente que hay que revisar al confirmar producto

Estas frases están escritas conservadoramente porque la funcionalidad todavía
depende de flags/entitlements o de definiciones comerciales. Revisar antes de
endurecer el mensaje:

| Sección | Nota actual (ES) | Qué falta confirmar |
| --- | --- | --- |
| Social Studio | "Las piezas disponibles pueden variar según el plan y la etapa de lanzamiento." | Qué piezas están GA y cuáles detrás de entitlements. |
| Multimedia | "Estamos definiendo el alcance final de multimedia en cada plan." | Límites de almacenamiento, si hay fotos públicas. |
| FREE/PRO | "Estamos terminando de definir el detalle de cada plan." | Catálogo comercial. |
| Varios torneos (FAQ) | "La capacidad de cada plan la estamos terminando de definir." | Límite de torneos/organizaciones por plan. |

**No se prometen**: fotos públicas, almacenamiento ilimitado, límites PRO
definitivos, ni disponibilidad comercial de cada pieza de Social Studio.

---

## 5. GAP: ruta pública del torneo

La sección "Página pública del torneo" muestra un mock con la etiqueta
*"Link público del torneo"* en lugar de una URL. El patrón de ruta pública lo
define el producto Torneos, no este repo, así que no se inventó una URL.

Cuando la ruta esté definida, reemplazar `publicPage.mock.shareLabel` por el
patrón real (ej. `arma2.com.ar/t/<slug>`).

---

## 6. Decisión pendiente: descubrimiento de la landing

`/torneos` **no está linkeada** desde el navbar ni desde el footer del sitio.
Solo se agregó al `sitemap.xml`.

Fue una decisión deliberada: linkearla desde componentes globales pondría a
Arma2 Torneos en la home institucional, y eso es una decisión de posicionamiento
comercial, no técnica. Cuando se quiera, alcanza con:

- `src/lib/i18n.ts` → `nav.links` (navbar, ES y EN), y/o
- `src/components/Footer.tsx` → columna "Producto".

---

## 7. i18n

El copy de la landing vive en `src/lib/torneos-content.ts`, separado de
`src/lib/i18n.ts` (que ya tiene ~860 líneas para la home institucional). Reusa el
mismo `LanguageProvider`, así que el toggle ES/EN del navbar funciona igual.

**Limitación conocida (preexistente):** `LanguageProvider` solo reescribe los
metadatos del `<head>` cuando `pathname === "/"`. Por lo tanto, en `/torneos` el
title/description del `<head>` quedan siempre en español, aunque el contenido
visible cambie a inglés. Es el mismo comportamiento que ya tienen `/press`,
`/contact`, etc. Si se quiere metadata bilingüe real, corresponde una solución
de i18n a nivel de routing (`/en/torneos`), fuera del alcance de esta entrega.

---

## 8. Arquitectura futura (no implementada)

```
arma2.com.ar/torneos                    ← esta landing
        ↓  NEXT_PUBLIC_TORNEOS_APP_URL
Crear torneo gratis / Ingresar
        ↓
experiencia autenticada de Arma2 Torneos
        ↓  (futuro)
Pasar a PRO → checkout web → Mercado Pago → entitlements de organización
```

Nada del tramo de pagos está iniciado en este repo: no hay dependencias de
Mercado Pago, ni rutas de API, ni webhooks, ni secrets.
