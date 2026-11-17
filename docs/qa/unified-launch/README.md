# QA del lanzamiento unificado

Fecha: 17 de noviembre de 2026. Base: `333ed7b`. Comprobaciones locales
contra builds de producción, sin usar el navegador personal del usuario.

## Resultado

- `npm run build`, `npm run lint` y `npm test` pasan. 15 pruebas automatizadas,
  incluidas las 8 existentes de Pixel y las cuatro combinaciones de banderas.
- Cuatro builds independientes: `launch/on`, `launch/off`, `waitlist/on`,
  `waitlist/off`. 96 comprobaciones: 8 rutas por 3 anchos por 4 estados.
- Rutas: `/`, `/lista`, `/inscripciones`, `/parte`, `/gracias`,
  `/parte/gracias`, `/privacidad`, `/terminos`.
- Anchos: 375, 768 y 1280 px. Sin overflow horizontal, un H1 por página,
  sin errores de consola ni hidratación. [Resultados](results.json).
- Con `off`, el HTML completo de cada ruta no contiene la URL de compra de la
  comunidad. Se muestra Próximamente en la tarjeta y en `/parte`.
- Con `on`, el CTA de `/parte` termina a 487 px desde el borde superior en
  375 x 812: visible sin scroll. La academia conserva el mayor peso visual.
- Las gracias mantienen `noindex, nofollow` y no aparecen en el sitemap.
- Sin SDK ni solicitudes a Meta con ID vacío. La lógica de eventos no cambia;
  solo su nombre de producto ahora referencia la identidad centralizada.
- Tally se simuló en el navegador, sin enviar datos. No hay invitación antes
  del envío ni con origen, ventana o formId incorrectos. Un FormSubmitted
  válido muestra la oferta solo con PARTE_LIVE=on. Se preservan UTM y ref.
- Axe: 0 infracciones de las reglas WCAG A/AA automatizadas en las tres
  páginas de comercio y la sección de precios, en los tres anchos.
  [Resultados](accessibility.json). No reemplaza una auditoría manual completa.
- Foco visible comprobado en compra; se corrigió el enlace de navegación
  oculto a 768 px por la cascada anterior. Las nuevas vistas no añaden
  animaciones; se probaron también con `prefers-reduced-motion: reduce`.

## Lighthouse móvil

Lighthouse 12.8.2, Chrome headless en perfiles temporales, simulación móvil
con RTT 150 ms y CPU x4. Una pasada por ruta y versión, ejecutadas en serie
sobre `next build` + `next start`, con Meta y Tally bloqueados. La home es
la venta en ambas versiones; la final usa `launch/on`. Los valores pueden
variar entre ejecuciones y no representan la red del hosting productivo.

| Versión | Ruta | Performance | Accesibilidad | LCP | CLS | TBT | JS transferido |
| --- | --- | --- | --- | --- | --- | --- | --- |
| before | `/` | 90 | 100 | 3.54 s | 0 | 82.0 ms | 153.2 KiB |
| before | `/parte` | 96 | 100 | 2.71 s | 0 | 42.0 ms | 154.4 KiB |
| after | `/` | 95 | 100 | 2.86 s | 0 | 31.5 ms | 157.6 KiB |
| after | `/parte` | 98 | 100 | 2.41 s | 0 | 11.5 ms | 158.8 KiB |

[Datos de medición](performance.json). No se observa regresión en esta
comparación. El JS aumenta unos 4.4 KiB y sigue por debajo de 200 KB.
El LCP de la home sigue por encima del objetivo anterior de 2.5 s; ya
ocurría en la base. El hero aprobado no se modificó en esta entrega.

## Galería antes y después

Las capturas de precios son de la sección completa. Solo durante esa
captura se ocultan el CTA flotante móvil y el enlace de salto, para evitar
que queden superpuestos al ampliar el área capturada. El producto mantiene
ambos controles. El resto son capturas completas de página.

### Tres niveles

| Ancho | Antes | Después | Próximamente / comunidad apagada |
| --- | --- | --- | --- |
| 375 px | [Ver](before/pricing-375.png) | [Ver](after/pricing-375.png) | [Ver](coming-soon/pricing-375.png) |
| 768 px | [Ver](before/pricing-768.png) | [Ver](after/pricing-768.png) | [Ver](coming-soon/pricing-768.png) |
| 1280 px | [Ver](before/pricing-1280.png) | [Ver](after/pricing-1280.png) | [Ver](coming-soon/pricing-1280.png) |

### Página de la comunidad

| Ancho | Antes | Después | Próximamente / comunidad apagada |
| --- | --- | --- | --- |
| 375 px | [Ver](before/parte-375.png) | [Ver](after/parte-375.png) | [Ver](coming-soon/parte-375.png) |
| 768 px | [Ver](before/parte-768.png) | [Ver](after/parte-768.png) | [Ver](coming-soon/parte-768.png) |
| 1280 px | [Ver](before/parte-1280.png) | [Ver](after/parte-1280.png) | [Ver](coming-soon/parte-1280.png) |

### Gracias de academia

| Ancho | Antes | Después | Próximamente / comunidad apagada |
| --- | --- | --- | --- |
| 375 px | [Ver](before/gracias-375.png) | [Ver](after/gracias-375.png) | [Ver](coming-soon/gracias-375.png) |
| 768 px | [Ver](before/gracias-768.png) | [Ver](after/gracias-768.png) | [Ver](coming-soon/gracias-768.png) |
| 1280 px | [Ver](before/gracias-1280.png) | [Ver](after/gracias-1280.png) | [Ver](coming-soon/gracias-1280.png) |

### Gracias de comunidad

| Ancho | Antes | Después | Próximamente / comunidad apagada |
| --- | --- | --- | --- |
| 375 px | [Ver](before/parte-gracias-375.png) | [Ver](after/parte-gracias-375.png) | [Ver](coming-soon/parte-gracias-375.png) |
| 768 px | [Ver](before/parte-gracias-768.png) | [Ver](after/parte-gracias-768.png) | [Ver](coming-soon/parte-gracias-768.png) |
| 1280 px | [Ver](before/parte-gracias-1280.png) | [Ver](after/parte-gracias-1280.png) | [Ver](coming-soon/parte-gracias-1280.png) |

Invitación posterior a Tally: [375 px](after/waitlist-submitted-375.png),
[768 px](after/waitlist-submitted-768.png), [1280 px](after/waitlist-submitted-1280.png).

## Repetir las pruebas de estado

```sh
npm test
npm run lint
NEXT_PUBLIC_PHASE=launch NEXT_PUBLIC_PARTE_LIVE=off npm run build
npm run start
```

Repetir el build para cada pareja de banderas. No usar `next dev` para
comparar rendimiento. El test de advertencias ejecuta la configuración de
build con los tres checkouts vacíos y verifica que se nombren las variables.
Los tests de render usan los componentes reales con entorno aislado; los
adaptadores de imagen y Link se simplifican para render estático.

## Preparación del despliegue

Cargar en Vercel Production y Preview antes de construir: PHASE,
PARTE_LIVE y los tres checkouts de [.env.example](../../../.env.example).
Mantener META_PIXEL_ID vacío. Primero `launch/off`; luego `launch/on` cuando
el equipo habilite la comunidad. La rama y el PR no cambian esas variables.

El nombre y el logo definitivos están pendientes. El logo actual usa una
copia separada del escudo AM, reemplazable en `public/parte-logo.png` sin
modificar el logo de academia. Se conservan todas las rutas de Hotmart.

Verificación externa del 17 de noviembre de 2026, sin datos de compradores:
Standard y VIP redirigen a `errorMessage=005`, "Product unavailable.".
El checkout de la comunidad abre. Es necesario habilitar/corregir las
ofertas de academia en Hotmart antes de publicar ventas. Se conservaron
los tres enlaces del brief; el sitio no puede activar esas ofertas.
