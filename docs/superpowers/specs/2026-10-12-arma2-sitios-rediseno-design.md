# Rediseño de arma2.com.ar y portal Arma2 Torneos — diseño

- Fecha: 2026-10-12
- Estado: borrador para revisión del usuario
- Repo: `nicoavayu/Arma2Web` (el producto `Armado_Equipos` no se modifica)

## 1. Objetivo

Con el lanzamiento de Arma2 Torneos, rediseñar los dos sitios públicos para que:

1. **arma2.com.ar** esté centrado en el jugador: explique qué hace Arma2 con su
   mecanismo real (sobre todo el armado democrático de equipos) y lleve a
   descargar la app. No informa ni gestiona torneos.
2. **Arma2 Torneos** sea un portal propio para organizadores, en su propio
   dominio, desde donde se entra al gestor de torneos.
3. Cada sitio lleve al otro sin mezclar los mensajes.
4. Nada suene genérico: cero métricas inventadas, testimonios, logos de clientes
   o adjetivos vacíos. Cada afirmación corresponde a algo que el producto hace hoy.

### Criterios de éxito

- Un jugador que entra al home entiende en el primer pantallazo qué es Arma2
  (organizar partidos y armar equipos parejos votados por el grupo) y cómo
  descargarla.
- El armado democrático se entiende sin leer un párrafo: se ve funcionando.
- Un jugador encuentra la respuesta a "no tengo grupo", "me falta arquero" o
  "tengo equipo" en una sola sección.
- Un organizador llega a Torneos desde arma2.com.ar en un click, y en el portal
  entiende la propuesta ("una carga, todo actualizado"), los planes y cómo entrar.
- Lighthouse mobile ≥ 90 en Performance, Accessibility, Best Practices y SEO en
  las dos home.

## 2. Decisiones tomadas con el usuario

| Tema | Decisión |
| --- | --- |
| Dónde vive Torneos | Subdominio propio `torneos.arma2.com.ar`, mismo repo |
| Acción principal en arma2.com.ar | Solo informar y descargar la app. Ningún login web de jugadores |
| Login web | Solo existe para Torneos (`app.arma2.com.ar/torneos`), desde el portal |
| Material visual | Capturas reales del producto, tomadas por Claude en un entorno local con datos ficticios |
| Narrativa jugadores | Por situación del jugador ("¿En qué estás?") con el armado democrático como sección estrella |
| Dirección visual | A · "Hermanos con carácter propio" |
| Resto del diseño | Delegado a Claude ("lo dejo en tus manos") |

## 3. Arquitectura y dominios

### 3.1 Estructura

Una sola app Next.js 16 (App Router) con **dos layouts raíz** mediante grupos de rutas:

```text
src/app/
  (jugadores)/
    layout.tsx            ← <html> + Navbar/Footer de jugadores + metadata arma2.com.ar
    page.tsx              ← home jugadores
    descargar/route.ts    ← redirect a la store según user agent
    privacy/ terms/ contact/ press/ delete-account/ eliminar-cuenta/
    sitemap.ts robots.ts  ← (ver 3.3)
  (torneos)/
    torneos/
      layout.tsx          ← <html> + nav/footer de Torneos + metadata del portal
      page.tsx            ← home del portal
src/proxy.ts              ← ruteo por host
```

Las páginas legales actuales pasan al grupo `(jugadores)` sin cambios de contenido.

### 3.2 Ruteo por host (`src/proxy.ts`)

La lógica vive en una función pura `resolveSiteRoute({ host, pathname })` en
`src/lib/site-routing.ts` (testeable), y `proxy.ts` solo la aplica:

| Host | Path | Resultado |
| --- | --- | --- |
| `torneos.arma2.com.ar` | `/x` | rewrite interno a `/torneos/x` |
| `torneos.arma2.com.ar` | `/torneos/x` | redirect 308 a `/x` (evita URLs duplicadas) |
| `arma2.com.ar` / `www.arma2.com.ar` | `/torneos` o `/torneos/x` | redirect 308 a `https://torneos.arma2.com.ar/x` |
| cualquier otro host (localhost, previews de Vercel) | `/torneos/x` | sin cambios: se sirve directo |
| `torneos.localhost:3000` (dev) | `/x` | igual que el host de producción, para probar el subdominio en local |

- El host de Torneos sale de `NEXT_PUBLIC_TORNEOS_HOST` (por defecto
  `torneos.arma2.com.ar`). El de jugadores, de `NEXT_PUBLIC_SITE_HOST`
  (por defecto `www.arma2.com.ar`).
- El `matcher` del proxy excluye `_next`, archivos estáticos y assets.
- Los assets de `public/` se sirven igual en los dos hosts.

### 3.3 SEO por sitio

- `metadataBase`, canonical, Open Graph y Twitter Card propios en cada layout.
- `sitemap.xml` y `robots.txt` según el host: el proxy reescribe
  `torneos.arma2.com.ar/sitemap.xml` y `/robots.txt` a route handlers de Torneos
  (`/torneos/sitemap.xml`, `/torneos/robots.txt`). Los de jugadores quedan en la raíz.
- Torneos conserva el JSON-LD `FAQPage` del branch `prep` y suma
  `SoftwareApplication`. Jugadores suma `MobileApplication` con los links a las stores.
- Imagen OG nueva para Torneos (hoy reutiliza la de jugadores).

### 3.4 Destinos y cruces

- **Jugadores:** solo stores.
  - `src/lib/store-links.ts` suma `pickStore(userAgent)`: iOS → App Store,
    Android → Google Play, otro → `null`.
  - En mobile el botón principal es la store del dispositivo y la otra queda
    como link secundario. En desktop se ven las dos más **un QR** a
    `https://www.arma2.com.ar/descargar`.
  - `/descargar` es un route handler: con iOS o Android hace redirect 302 a la
    store; con cualquier otro dispositivo, a `/#descargar` (la sección final con
    los dos botones y el QR).
  - El QR se genera en build como SVG estático (dependencia de desarrollo
    `qrcode`, script en `scripts/`), sin JS en el cliente.
- **Torneos:** "Entrar", "Empezar gratis" y "Elegir Premium" usan
  `src/lib/torneos-links.ts` tal como está en el branch `prep`
  (`app.arma2.com.ar/torneos`, `?intent=premium`).
- **Cruces:**
  - Jugadores → Torneos: "Torneos ↗" en el nav, la banda para organizadores
    (§5.6) y un link en el footer.
  - Torneos → Jugadores: "Arma2 para jugadores" en el nav, el footer y el cierre.
  - Todos los cruces son links absolutos al otro host, porque usan layouts raíz
    distintos y son navegaciones completas de todas formas.

### 3.5 Base de trabajo

- Este branch (`claude/armados-torneos-ux-redesign-cb3a43`) incorpora con un
  merge el branch `claude/arma2-torneos-landing-prep-168b17` (landing de
  Torneos, contenido comercial, assets y `docs/torneos-landing-gaps.md`).
- El PR de este rediseño **reemplaza al PR #9**, que queda en hold y se cierra
  cuando este se mergee.
- Las reglas del doc de gaps siguen vigentes: la landing no hace checkout, no
  decide precios y no se publica hasta que Torneos Production esté habilitado.

## 4. Sistema visual (dirección A · "Hermanos con carácter propio")

### 4.1 Base compartida (`src/styles/tokens.css` + componentes en `src/components/shared/`)

- **Paleta Arma2 actual, sin cambios de marca:** tinta `#070711`, superficie
  `#10142a`, azul `#27b8ff`, violeta `#5b4bff`, magenta `#ec4dff`, verde cancha
  `#20e39b`, papel `#f5f1e9` (este último solo en Torneos).
- **Tipografía:** Inter (ya cargada con `next/font`). Escala fluida con `clamp()`
  y números tabulares (`font-variant-numeric: tabular-nums`) para marcadores,
  puntajes y tablas.
- **Componentes compartidos:** `Button`, `StoreButtons`, `DownloadQr`,
  `LanguageToggle`, `PhoneFrame` (marco de dispositivo en CSS para las capturas),
  `BrowserFrame` (marco de escritorio para las capturas de Torneos), `Logo`
  y `SiteSwitch` (el link al otro sitio).

### 4.2 Jugadores: "cancha de noche"

- Fondo tinta plano. Se eliminan los radial-gradient del `body`, los glows, el
  texto con degradé y las cards translúcidas con blur.
- **El color tiene función:** azul para las acciones y lo seleccionado, verde
  cancha para "parejo/confirmado", magenta solo para premios, rojo solo para
  sanciones.
- **Detalles de marcador como lenguaje propio:** barras de balance A/B, puntajes
  tabulares, chips de formato (F5, F7…), separadores tipo planilla.
- Las capturas reales en `PhoneFrame` son las protagonistas. Las ilustraciones
  y mockups abstractos se reemplazan.
- **Movimiento solo cuando explica algo** (la demo de balance, el paso de
  disponibilidad a partido). Todo respeta `prefers-reduced-motion`.

### 4.3 Torneos: editorial

- Secciones alternadas papel / tinta. Titulares en mayúscula pesada con
  tracking negativo, como en el branch `prep`.
- **El hero pasa a fondo papel con captura real del gestor.** La foto de estadio
  deja de ser el fondo del hero.
- Las fotos de la galería del branch `prep` (`public/torneos/gallery/*`) son
  ilustrativas. Se usan **solo dentro de la UI de multimedia**, como contenido de
  ejemplo, y nunca como si fueran de un torneo real. Si el usuario consigue
  fotos reales de un torneo, se reemplazan.

## 5. arma2.com.ar — página de jugadores

Pasa de 10 secciones (unos 12.000 px en desktop) a 7, con jerarquía clara.
**Nav:** logo · Cómo se arman los equipos · ¿En qué estás? · Preguntas · Torneos ↗ ·
ES/EN · [Descargar] (mobile: abre la store del dispositivo; desktop: baja a `#descargar`).

### 5.1 Hero

- **Etiqueta:** "App gratis de fútbol amateur · iOS y Android".
- **H1 (se mantiene la línea de marca):** "Organizá partidos. Armá equipos parejos. Jugá."
- **Bajada, que explica el mecanismo:** "Convocás a tu grupo con un link, cada
  uno califica a los que conoce y Arma2 arma dos equipos parejos con esos votos.
  Si te faltan jugadores o arquero, te los encuentra."
- **Acción:** `StoreButtons` según el dispositivo y, en desktop, el QR con
  "Escaneá para descargar".
- **Visual:** dos capturas reales en `PhoneFrame` (votación y equipos armados) y
  debajo una barra de balance A/B con los puntajes de la captura.
- **Franja de hechos** debajo del hero (solo hechos verificables, sin métricas de
  uso): "Gratis · Fútbol 5 a 11 · Equipos votados por el grupo · Encuesta y
  premios después de cada partido".

### 5.2 ★ Cómo se arman los equipos (sección estrella)

- **Título:** "Los equipos no los arma el que organiza. Los arma el grupo."
- **Pasos**, tomados del producto (`VotingView`, `teamBalancer`, `EncuestaPartido`):
  1. Cada jugador califica del 1 al 10 a los que conoce. A los que no conoce,
     les marca "No lo conozco".
  2. Con los votos de todo el grupo, Arma2 calcula un puntaje por jugador.
  3. Arma dos equipos con la suma de puntajes lo más pareja posible, respetando
     a los arqueros fijos y dejando afuera a los suplentes.
  4. Si hay cambios de último momento, en la encuesta se ajustan los equipos
     finales arrastrando jugadores.
- **Demo interactiva** (componente cliente `BalanceDemo`):
  - 10 jugadores ficticios con puntaje. El botón "Armar equipos" los reparte en
    vivo con un algoritmo de balance real (búsqueda por intercambios sobre la
    suma) y muestra la diferencia, por ejemplo "Diferencia: 0,3".
  - "Otra combinación" busca otra igual de pareja.
  - "Fijar arquero" demuestra el respeto de los arqueros fijos.
  - Con `prefers-reduced-motion` muestra el resultado sin animación.
  - Lleva la aclaración "Ejemplo con datos ficticios".
  - El algoritmo de la demo es propio del sitio, en `src/lib/balance-demo.ts`, y
    no pretende replicar al producto. Se testea que el resultado sea igual de
    parejo o más que un reparto alternado.
- **Al lado:** captura real de la pantalla de votación.

### 5.3 ¿En qué estás?

Tres capítulos **apilados, no en pestañas** (todo el contenido queda en el HTML
y es indexable). Un selector segmentado **sticky** marca en qué capítulo estás y
permite saltar entre ellos (`IntersectionObserver`, accesible por teclado,
`aria-current`). Cada capítulo tiene un título que es la situación, 3 o 4
puntos concretos y 1 o 2 capturas reales.

1. **"Tengo grupo"**: organizá sin perseguir a nadie.
   - Creá el partido (fecha, hora, cancha, formato) y compartí el link por WhatsApp.
   - Cada uno confirma. Si se llena, quedan suplentes.
   - Frecuentes: guardá el partido de siempre como plantilla y repetilo cada semana.
   - Historial de cada fecha: quién jugó, cómo salió.
2. **"Me faltan jugadores"**: Arma2 los busca.
   - Partido automático: elegís días, horarios, zona y formato. Cuando hay
     suficientes jugadores compatibles, Arma2 propone el partido y los primeros
     en confirmar entran.
   - Quiero jugar: partidos abiertos cerca tuyo, filtrados por distancia.
   - Mercado de arqueros: arqueros disponibles cerca a los que invitás directo. Y
     si atajás, activás "Disponible para atajar".
3. **"Tengo equipo"**: armá tu equipo y buscá rival.
   - Armá el plantel con posiciones y chat del equipo.
   - Publicalo en el mercado y desafiá o aceptá desafíos de equipos de tu zona.
   - Ranking por formato y zona, con PJ, PG, PE, PP y % de victorias.
   - Historial contra cada rival.

Reemplaza a `HowItWorks`, `AutoMatch`, `Arqueros`, `Equipos` y `TeamRanking`.

### 5.4 Después del partido

- **Título:** "El partido no termina con el pitazo."
- **Recorrido real de la encuesta** como línea de pasos: notificación → ¿se jugó?
  → asistencia → figura → mejor arquero → ¿fue limpio? → resultado → tarjeta roja
  (si hubo conducta antideportiva) → equipos finales.
- **Consecuencias:** premios (figura, arquero) y sanciones (tarjeta roja,
  ausencia sin aviso) quedan en el perfil.
- **Tu perfil:** captura real de la carta de jugador con premios, actividad por
  semana, mes y año, y registro de lesiones.

Reemplaza a `Features` e `ImpactStats`.

### 5.5 Preguntas frecuentes (6 a 7, respuestas concretas)

¿Es gratis? · ¿Cómo se arman los equipos? · ¿Y si no tengo grupo? · ¿Cómo
consigo arquero? · ¿Qué pasa si alguien falta sin avisar? · ¿Para qué formatos
sirve? · ¿Mis amigos necesitan la app? *(respuesta a confirmar, ver §11)*.

- Se publican con JSON-LD `FAQPage`.
- Toda respuesta que afirme una regla del producto (prioridad, disciplina) se
  verifica en el código antes de publicarse. Si no se puede verificar, se reescribe sin la regla.

### 5.6 Banda Torneos

- Fondo papel, el único bloque crema del sitio de jugadores: anticipa el portal.
- **Texto:** "¿Organizás una liga o un torneo? Arma2 Torneos: fixture,
  resultados, tabla, página pública y placas para redes desde un solo lugar."
- **Botón:** "Conocé Arma2 Torneos ↗".
- **Línea para jugadores:** "Si tu torneo ya usa Arma2 Torneos, el fixture y la
  tabla están en su página pública."

### 5.7 Descargar (`#descargar`) y footer

- Cierre con el H1 corto, `StoreButtons` y QR.
- **Footer:** Producto (Cómo se arman los equipos, ¿En qué estás?, Preguntas) ·
  Arma2 Torneos ↗ · Legal (Privacidad, Términos, Eliminar cuenta) · Contacto ·
  stores.

### 5.8 Qué se va

Se borran los componentes reemplazados (`HowItWorks`, `AutoMatch`, `Arqueros`,
`Equipos`, `TeamRanking`, `Features`, `ImpactStats`, `Screenshots`, `Section`,
`Card` si quedan sin uso) y sus claves de `i18n.ts`. También se van las
imágenes de `public/` que queden sin referencias (incluido
`Screenshot 2026-02-22 at 5.00.18 PM.png` y los SVG de plantilla de Next).

## 6. torneos.arma2.com.ar — portal

Parte de `TorneosEditorial` del branch `prep`. Se conservan **literalmente** el
modelo comercial y el copy de planes (FREE / Premium $39.900 de lanzamiento,
$49.900 de referencia, pago único por temporada, límites) porque ya están
validados contra el producto.

**Cambios:**

1. **Layout propio:**
   - Nav: logo Torneos · Cómo funciona · Gestión · Página pública · Social
     Studio · Planes · Preguntas · "Arma2 para jugadores" · ES/EN · [Entrar].
   - Footer propio con legales compartidos.
2. **Hero en papel** con captura real del gestor en `BrowserFrame` y la vista
   mobile de la página pública superpuesta. Se mantiene "Todo el torneo. Mucho
   menos trabajo." y los CTA.
3. **"Una carga, todo actualizado"** reemplaza al bloque estático "Armá.
   Programá. Cargá. Actualizá. Publicá.":
   - Demo interactiva: cargás un resultado (3–1) y se actualizan en cadena la
     tabla, los goleadores, la página pública y la placa de Resultados.
   - Es el argumento central del producto y hoy solo se dice con palabras.
4. **Gestión, Página pública y Social Studio** con capturas reales nuevas
   (fixture, carga de resultado, tabla, disciplina, página pública desktop y
   mobile).
   - Social Studio sigue con los exports Base reales.
   - Los estilos Premium siguen como chips de texto hasta tener exports reales.
5. **Multimedia:** la galería es UI de producto con fotos de ejemplo (§4.3).
6. **Planes:**
   - Las dos cards actuales más una **tabla comparativa** FREE vs Premium,
     accesible (`<table>`) y con encabezado sticky en mobile.
   - Se mantienen los textos "Cada temporada vuelve a FREE" y "Se activa desde
     Plan dentro de la temporada".
7. **Cierre:** CTA final más "¿Sos jugador? Arma2 para jugadores ↗".

Las secciones `TorneosProblem`, `TorneosPlayers` y similares del branch `prep`
que no estén en `TorneosEditorial` se revisan: se integran si suman o se borran.

## 7. Capturas reales del producto

**Objetivo:** capturas fieles de la app y del gestor, con datos ficticios, sin
tocar producción ni el checkout local del usuario.

1. **Clon aislado:** `git worktree` o clone de `Armado_Equipos@origin/main` en el
   scratchpad de la sesión. El checkout del usuario
   (`/Users/nicoavayu/Documents/arma2/arma2`) no se toca.
2. **Backend local:** Docker Desktop más `supabase start` con las migraciones del
   repo. El front se levanta con el arranque protegido
   `npm run qa:start:local -- --start` y `QA_SUPABASE_URL` en loopback (el guard
   rechaza destinos remotos).
3. **Datos de demo ficticios**, sembrados con un script en el clon (no se commitea
   al producto). Se reutilizan los fixtures existentes de Torneos
   (`docs/qa/torneos-demo-dataset.md`) cuando aplican:
   - un grupo de 10–14 jugadores con nombres inventados;
   - un partido con votación completa y equipos armados;
   - una encuesta cerrada con premios y una sanción;
   - una búsqueda de Partido automático;
   - arqueros disponibles;
   - un equipo con plantel, desafíos, ranking e historial;
   - un torneo con fixture, resultados, tabla y página pública.
4. **Login** con usuarios de prueba creados en el Supabase local.
5. **Captura** con el panel del navegador:
   - jugadores a 390×844 (DPR 3);
   - gestor de Torneos a 1440×900 (DPR 2);
   - página pública también a 390×844.
   - Si el resultado lo justifica, el simulador de iOS para el marco nativo.
6. **Salida:**
   - WebP/AVIF optimizados en `public/shots/jugadores/` y `public/shots/torneos/`;
   - `public/shots/manifest.json` con pantalla, ruta, fecha y SHA del producto,
     para poder regenerarlas.
   - Los marcos de dispositivo los pone el CSS, no la imagen.

**Lista mínima.**
- Jugadores: home, votación, equipos armados, crear partido / compartir, frecuentes,
  partido automático, quiero jugar / arqueros, equipo + desafío, ranking,
  encuesta (paso figura), carta de perfil, estadísticas.
- Torneos: fixture, carga de resultado, tabla, disciplina, página pública
  (desktop + mobile), Social Studio, multimedia, Plan.

**Si el entorno local no levanta**, se usa el plan B: reconstruir las pantallas
en código, copiando la UI real de los componentes del producto. Se avisa al
usuario antes de cambiar de plan.

## 8. Reglas de copy (anti-genérico)

1. Cada afirmación corresponde a una pantalla o regla del producto que se puede
   señalar. Si no se puede señalar, no va.
2. Prohibido:
   - métricas de uso, testimonios, logos de clientes y "miles de jugadores";
   - "revolucionario", "potente", "experiencia única", "todo en uno", "llevá tu
     X al siguiente nivel", "nivel pro";
   - etiquetas decorativas encima de cada título.
3. Se explica el mecanismo antes que el beneficio ("cada uno califica del 1 al
   10" en vez de "equipos justos e inteligentes").
4. Español rioplatense con voseo. El inglés se traduce natural, no literal.
5. Los datos de las demos se marcan como ejemplo cuando pueden confundirse con
   datos reales.
6. Los textos viven en `src/lib/i18n.ts` (jugadores) y
   `src/lib/torneos-content.ts` (Torneos), como hoy.

## 9. Accesibilidad, performance y SEO

- **Accesibilidad:**
  - Contraste AA en ambos fondos (tinta y papel).
  - Foco visible.
  - Selector de capítulos y demos operables por teclado.
  - `alt` descriptivo en cada captura.
  - `prefers-reduced-motion` respetado.
  - Áreas táctiles de 44 px como mínimo.
- **Performance:**
  - Capturas con `next/image`, `priority` solo en la imagen LCP del hero y
    `sizes` correctos.
  - Sin fondos PNG de varios MB en el hero de Torneos.
  - Componentes de demo cargados como islas cliente. El resto, server components
    donde el toggle ES/EN lo permita.
- **Idioma:**
  - Se mantiene el toggle ES/EN en el cliente con metadata en español, como hoy.
  - Las rutas `/en` localizadas quedan fuera de alcance.

## 10. Testing y verificación

- **Unit tests** (se agrega `vitest` como dependencia de desarrollo, solo para
  lógica pura):
  - `resolveSiteRoute`: todas las filas de la tabla de §3.2;
  - `pickStore(userAgent)`: iOS, iPadOS, Android y desktop;
  - el algoritmo de `balance-demo`: equipos de igual tamaño, arqueros fijos
    respetados y diferencia ≤ a la del reparto alternado.
- `npm run lint` y `npm run build` sin errores.
- **Verificación visual en el panel del navegador:**
  - `localhost:3000` y `torneos.localhost:3000`;
  - anchos 375, 768 y 1440;
  - reduced motion;
  - navegación por teclado del selector y las demos;
  - redirects 308 de `/torneos` según el host;
  - `/descargar` con user agents simulados.
- Lighthouse mobile de las dos home (objetivo en §1).

## 11. Fases de entrega

0. **Capturas reales** (§7).
1. **Base:**
   - merge del branch `prep`;
   - grupos de rutas con layouts raíz;
   - `proxy.ts` y `site-routing.ts`;
   - tokens y componentes compartidos;
   - `/descargar` y QR;
   - sitemaps y robots por host.
2. **arma2.com.ar** (§5).
3. **Portal Torneos** (§6).
4. **QA y cierre:**
   - verificación (§10);
   - `docs/dominios-y-deploy.md` con los pasos de Vercel y DNS;
   - actualización de `docs/torneos-landing-gaps.md`;
   - PR que reemplaza al #9.

## 12. Fuera de alcance, riesgos y pendientes del usuario

**Fuera de alcance:**
- el repo `Armado_Equipos`, auth, checkout y precios;
- rutas localizadas `/en`;
- blog o press nuevos;
- deploy y merge a producción.

**Riesgos:**
- El stack local del producto puede no levantar (migraciones pesadas, Docker).
  Mitigación: el plan B de §7.
- Los layouts raíz múltiples hacen recarga completa al cruzar entre sitios. Es
  aceptable porque son dominios distintos.
- Torneos no se puede publicar en su subdominio hasta que el usuario configure
  el dominio en Vercel.

**Pendientes del usuario** (no bloquean la implementación):
1. Agregar `torneos.arma2.com.ar` al proyecto de Vercel y el CNAME en el DNS
   (los pasos quedan en `docs/dominios-y-deploy.md`).
2. Confirmar la respuesta a "¿Mis amigos necesitan la app?". Hoy un invitado
   puede votar desde el link sin tener la app, pero la indicación es no promover
   el uso web. **Propuesta:** "Para organizar y jugar, sí. Si invitás a alguien
   que todavía no la tiene, puede votar desde el link que le mandás."
3. Opcional: fotos reales de algún torneo para reemplazar las ilustrativas.
