# Academia Merlo

Periodismo en el mercado de pases con César Luis Merlo. Next.js 16 (App
Router, TypeScript), CSS plano (sin Tailwind, por decisión explícita del
brief de conversión: ver "Decisiones de arquitectura" abajo).

Portado 1:1 desde el prototipo estático `merlo-v3.4/` (waitlist.html +
inscripciones.html, CSS/JS inline + 4 hojas de override en cascada). El
contenido, copy, cifras y claims son los del prototipo; no se reescribió
nada de eso aquí.

## Arrancar

```bash
npm install
npm run dev
```

Copia `.env.example` a `.env.local` y completa lo que haga falta (ver
abajo). Con todo vacío, el sitio funciona igual: muestra la fase waitlist
y la maqueta local del formulario (sin enviar datos).

## Variables de entorno

Ver `.env.example`. Las que importan para decidir qué se ve:

- `NEXT_PUBLIC_PHASE`: `waitlist` (default) o `launch`. Waitlist: `/`
  muestra la lista de espera. Launch: `/` pasa a mostrar la venta y la
  waitlist se muda a `/lista`. `/inscripciones` existe siempre (útil para
  compartir un preview de la venta antes del switch) pero queda `noindex`
  hasta `launch`.
- `NEXT_PUBLIC_TALLY_FORM_ID`: vacío = maqueta visual del formulario
  (no envía nada). El form real de Tally (`aQ8N92`, multipágina,
  paleta verde) está en **DRAFT**: no va a cargar embebido hasta que se
  publique desde la cuenta de Tally. Cuando se publique, poner el ID aquí.
- `NEXT_PUBLIC_MOTION`: `off` (default) o `on`. Activa reveals al
  scroll y count-up con más floritura; está detrás de este flag a
  propósito, para que el equipo lo vea prendido y decida antes de
  activarlo en producción. El ticker editorial y el count-up de las
  cifras de audiencia están siempre activos, no dependen de este flag.
- `NEXT_PUBLIC_HOTMART_CHECKOUT_STANDARD` / `_VIP`: vacíos = los botones
  de plan en `/inscripciones` muestran el estado "pendiente" (demo). Con
  los links reales, se vuelven botones de verdad.
- `NEXT_PUBLIC_HOTMART_CHECKOUT_PARTE`: checkout de la suscripción mensual
  de El Parte de Merlo. Vacío = no se muestra un enlace de compra.
- `NEXT_PUBLIC_META_PIXEL_ID`: dejar vacío hasta que exista el píxel de
  Academia Merlo. Vacío o no numérico = no se carga el SDK ni se envían
  eventos. No se usa GTM.

## Hotmart: venta y páginas de gracias

Configurar estas variables en **Production y Preview** de Vercel. En esta
entrega se preparan en local; no se cambió la configuración remota:

| Variable | Valor |
| --- | --- |
| `NEXT_PUBLIC_HOTMART_CHECKOUT_STANDARD` | `https://pay.hotmart.com/K105579077Y?off=ck9jh14u` |
| `NEXT_PUBLIC_HOTMART_CHECKOUT_VIP` | `https://pay.hotmart.com/K105579077Y?off=924zdazg` |
| `NEXT_PUBLIC_HOTMART_CHECKOUT_PARTE` | `https://pay.hotmart.com/W108525490P` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Vacío hasta recibir el ID real |

Las variables `NEXT_PUBLIC_*` se incorporan durante `next build`: después
de cambiarlas hay que generar un nuevo deployment. No cambiar
`NEXT_PUBLIC_PHASE` para implementar estas rutas: la apertura de la home
sigue dependiendo del switch existente.

- `/gracias`: pasos de acceso para Standard y VIP. `noindex,nofollow`.
- `/parte`: venta del canal, US$5.99 al mes. `noindex,nofollow` en waitlist;
  canonical propio y entrada en sitemap al pasar a launch.
- `/parte/gracias`: confirmación y plazo de alta en WhatsApp. `noindex,nofollow`.
- Las dos páginas de gracias están siempre fuera del sitemap. El plazo
  máximo de alta se cambia en `PARTE_ACCESS_MAX_HOURS`, en
  `src/lib/site-config.ts` (actualmente 72 horas).

Después de desplegar y comprobar las tres ofertas, Migue o Claude debe
configurar la página externa de agradecimiento en Hotmart:

- Academia (Standard y VIP): `https://academiamerlo.com/gracias`.
- El Parte de Merlo: `https://academiamerlo.com/parte/gracias`.

Verificación externa del 16 de noviembre de 2026, sin realizar compras:
el checkout de El Parte muestra el producto correcto y **US$5.99 al mes**
al seleccionar Estados Unidos (Argentina muestra la conversión a ARS).
Los enlaces de Standard y VIP redirigen a `errorMessage=005` y muestran
`Product unavailable.`. Se conservaron los enlaces recibidos, pero hay que
habilitar/corregir esas ofertas en Hotmart y volver a comprobar producto y
precio antes de publicarlos. No se pudieron confirmar sus precios en vivo.

### Medición

Con un ID configurado, se envía `PageView` al cargar una página y al cambiar
de ruta con el router. `Purchase` se envía una sola vez por ruta de gracias
en cada carga del documento, incluso con remontajes de React, SDK lento
o navegación interna de ida y vuelta. Una recarga completa puede generar
otro evento; no se deduplican transacciones ni se confirma el pago desde
este sitio. La confirmación real del pago corresponde a Hotmart.

Antes de inicializar o invocar el Pixel en las páginas de gracias, se
eliminan todos los parámetros y el fragmento de la URL, sin interpretar
sus valores. No se envían email, teléfono, nombre, matching avanzado ni
parámetros del comprador. Las URLs de las páginas de gracias configuradas
en Hotmart deben ser las rutas limpias anteriores. Los UTMs de las demás
páginas se conservan para no romper el formulario de lista de espera.

El evento de academia identifica el producto `7636264` y omite el importe:
la URL compartida no permite saber si se compró Standard o VIP. No se
atribuye un precio ficticio. Por eso no sirve para medir ingresos/ROAS de
academia sin añadir una fuente de importe confirmado, como una integración
de Hotmart. El evento del canal identifica `8990968`, con el precio base
aprobado de 5.99 USD; no representa impuestos o conversiones locales.

La CSP permite el SDK y las conexiones de Meta. Antes de activar el ID
real, revisar también la configuración de privacidad aplicable al Pixel.

`npm run test:pixel` verifica no-op, deduplicación, navegación, carga tardía,
limpieza de URL, conservación de UTMs y separación de productos.

## Decisiones de arquitectura (para quien retome esto)

- **Una sola `globals.css`, no CSS Modules por componente.** El CSS del
  prototipo es un único sistema muy interconectado (variables globales,
  utilidades compartidas como `.wrap`/`.btn`/`.label`, selectores
  descendientes cruzando "componentes"). Partirlo en módulos habría
  significado reescribir selectores a mano sobre ~4300 líneas sin forma
  de verificar visualmente cada cambio: alto riesgo de regresión visual
  para cero beneficio real en un sitio de una sola marca. `globals.css`
  es la cascada **verbatim** del prototipo (el `<style>` inline + los 4
  overrides, en el mismo orden), menos los selectores confirmados sin
  ningún elemento que los use en ninguna de las dos páginas. Esto es una
  desviación consciente del pedido original de "CSS Modules por
  componente".
- **No se aplanó la cascada a mano.** Donde un selector SÍ se usa pero
  distintas versiones (v1→v3.4) lo pisan parcialmente entre sí, se dejó
  tal cual (aplanarlo a ojo es más riesgoso que mantenerlo, porque un
  error ahí no se nota hasta verlo renderizado). La única excepción
  explícita: `.course-facts span span` tenía un `opacity:.85` de una
  regla v2.5 vieja (pensada para texto `--paper` sobre un hero de color)
  que seguía viva y licuaba el `--muted` final a un contraste de 4.11
  contra el papel (lo encontró Lighthouse, no inspección visual). Se
  canceló con un `opacity:1` explícito, comentado en el CSS.
- **Fix de bug ya documentado por el equipo**: el isologo del nav usaba
  `object-fit:cover` a 240×104 (recorta el lockup). Next usa
  `object-fit:contain` con el aspect ratio real del PNG (1654×951).
- **Tally**: se portó el adaptador completo del prototipo (mount
  on-demand al entrar en viewport, prefill de email desde el hero,
  passthrough de UTMs, `postMessage` para detectar carga/envío, nunca
  remonta un iframe donde la persona ya escribió algo) a
  `src/hooks/useTallyEmbed.ts`. La comunicación entre el form del hero y
  el slot de Tally (que están lejos en el árbol de componentes) usa un
  `CustomEvent` en `window`, igual de desacoplado que el vanilla JS
  original: no se armó un context de React solo para esto.

## Performance: Lighthouse móvil

Medido el **2026-10-04** contra el build de producción (`next build` +
`next start`) en local, `localhost` (sin latencia de red real, sirve
para validar que la arquitectura no tiene bloqueantes, no como número
final de producción; re-medir contra el dominio real antes de lanzar):

| Categoría | Score |
|---|---|
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

LCP 0.5s · CLS 0 · TBT 0ms · Speed Index 0.2s · JS total transferido en
`/`: ~151KB (gzip/br, bajo el presupuesto de 200KB/ruta).

En el camino, Lighthouse encontró y se corrigieron dos bugs reales (no
cosméticos):

1. El CSP inicial (`script-src 'self' https://tally.so`, sin
   `unsafe-inline`) bloqueaba los scripts inline que Next.js inyecta
   para hidratar, lo que producía un error de React #412 en consola.
   Se agregó `'unsafe-inline'` a `script-src` en `next.config.ts`.
2. El bug de contraste de `.course-facts span span` descripto arriba.

## QA pendiente (no se pudo hacer aquí)

- Verificación en dispositivos físicos (320/375/390/768/1440): solo se
  verificó con Playwright headless a esos anchos.
- Los 7 enlaces externos de los rails de medios (trayectoria + citado
  por) no se probaron en vivo uno por uno.
- `prefers-reduced-motion` y el flujo completo de Tally con el form
  **ya publicado** (hoy está en DRAFT, no se puede probar embebido).
- Safari real (el watermark/overflow en Safari que menciona el brief
  original ya no aplica, ese elemento se eliminó en v3.3/v3.4, pero
  vale una pasada de todas formas).

## Bloqueantes de lanzamiento (no de este deploy de staging)

- Foto de César (`cesar-merlo-uol.jpg`, crédito UOL/Arquivo pessoal):
  falta autorización escrita de César para publicarla.
- Logo: `academia-merlo-escudo.png`/`-negro.png` son PNG provisorios.
  Falta el SVG vectorizado + un chequeo de parecido con escudos reales
  de clubes (búsqueda inversa de imagen); ambos ya estaban en la lista
  de pendientes del equipo antes de este port, no son hallazgos nuevos.
  El favicon/apple-icon actual es un recorte del escudo provisorio.
- `/privacidad`, `/terminos`, `/devoluciones` son placeholders marcados
  TODO.
- Formulario de Tally en DRAFT (ver más arriba).
- Los links de Hotmart están definidos en `.env.example`; verificar las
  ofertas y configurar las variables del deployment antes de vender.
- Dominio y hosting: `academiamerlo.com` está comprado; falta decidir
  dónde se hostea y conectar el deploy (ver `NEXT_PUBLIC_SITE_URL`).

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # build de producción
npm run start    # sirve el build (para medir Lighthouse real)
npm run lint     # eslint
npx tsc --noEmit # chequeo de tipos
```
