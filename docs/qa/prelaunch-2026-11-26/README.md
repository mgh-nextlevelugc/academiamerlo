# Correcciones previas al lanzamiento

26 de noviembre de 2026. Base: `d1f8c20`. Rama:
`fix/prelaunch-corrections-2026-11-26`.

## Resultado del código

- Sin checkout, Standard, VIP y la comunidad muestran "Próximamente".
  No hay botón activo ni enlace vacío. Se conserva el aviso de build por
  cada variable ausente; ya existía en la base.
- Copy aprobado de avance módulo a módulo, quiz previo y habilitación
  desde el día 8 aplicado a ambas fases, ambas FAQ y gracias de academia.
  Se conserva el acceso de por vida y se actualizan los textos de pago.
- Los textos de comunidad, 72 horas, soporte e invitaciones ya estaban
  implementados en las gracias. Se conservan y se completan los metadatos
  de descripción para OG y Twitter.
- Imagen propia de `/parte`: 1200x630, Archivo + Source Sans 3 locales,
  logo provisional existente, nombre desde la constante. Tarjeta grande
  de Twitter y OG con locale, tipo y nombre del sitio.
- `/parte` solo es indexable y entra en sitemap con `launch/on`.
  Las gracias siguen fuera del sitemap y con `noindex,nofollow`.
- `robots.txt` ya tenía un único bloque en el código y en producción.
  Se mantiene crawl permitido para que el robot pueda leer el noindex.
- Sin enlaces a una ruta de devoluciones inexistente en páginas públicas;
  se elimina la referencia desactualizada de documentación, sin crear ruta.
- Navegación de las páginas legales: el CTA ahora apunta a planes en
  lanzamiento y a registro en espera. Sus cláusulas no se modifican.
- README y documentación histórica del despliegue corregidos a Hostinger;
  lista de pasos para lanzar academia y comunidad por separado.
- No se cambia Meta Pixel ni se añade GTM. Las banderas no se activan en remoto.

## Verificación

- `npm run lint`: sin errores. `npm test`: 16 pruebas, incluidas las cuatro
  combinaciones, oferta ausente, sitemap, robots, invitaciones y Pixel.
- Cuatro builds de producción con `next build --webpack`, servidos por el
  servidor standalone. 64 comprobaciones: ocho rutas por dos anchos
  (375 y 1280 px) por cuatro combinaciones. Sin scroll horizontal, errores
  JavaScript ni assets locales fallidos. Datos: [results.json](results.json).
- Un quinto build sin checkouts: advertencias presentes y tres estados de
  Próximamente sin acciones de compra, a 375 y 1280 px.
  Datos: [missing-checkouts.json](missing-checkouts.json).
- Recorrido del adaptador de Tally con iframe y widget simulados: prefill,
  UTMs y ref; confirmación; mensajes de origen o formulario ajenos rechazados;
  conservación de campos al volver al hero; invitación solo tras confirmar
  y con la comunidad habilitada. No se crean registros reales.
- Formulario Tally real: carga 200, publicado y abierto. Revisada su
  definición pública completa: email, nombre, perfil, WhatsApp opcional,
  consentimiento y confirmación. Hallazgo externo: el placeholder de perfil
  debe cambiarse a "Elige una opción" en Tally. [Detalle](tally.json).
- Hotmart: las tres ofertas abren. Con Estados Unidos seleccionado, muestran
  US$174, US$497 y US$5.99 al mes. Sin compras ni datos de comprador.
  [Detalle](checkouts.json). La terminología de la comunidad en Hotmart
  todavía debe alinearse con la web.
- Imágenes sociales general y de comunidad revisadas visualmente. Ambas
  responden PNG 1200x630. El copy no contiene promesas de ritmo libre,
  financiación ni voseo. El nombre definitivo sigue pendiente.
- Búsqueda textual: eliminada la promesa de ritmo libre. Se conservan
  las referencias al YouTube de César y al medio propio del alumno. La única
  pregunta sobre financiación es la FAQ que el brief exige conservar, con
  respuesta de pago único.
- El cuerpo de `/privacidad` y `/terminos` sigue idéntico a la base. Propuestas
  para aprobación: [legal-proposals.md](legal-proposals.md).

Estas son comprobaciones locales de producción, no validaciones de un
despliegue nuevo en Hostinger. No se repitió Lighthouse ni se afirman nuevas
métricas de rendimiento. El entorno local usa Node 24.13.0; Hostinger mantiene
Node 22 y npm según la configuración recibida.

## Capturas para el PR

Las ocho capturas principales corresponden a `launch/on`, con checkouts
configurados. La academia conserva prioridad sobre la comunidad.

| Página | 375 px | 1280 px |
| --- | --- | --- |
| Inscripciones | [Móvil](screenshots/inscripciones-375.png) | [Escritorio](screenshots/inscripciones-1280.png) |
| Comunidad | [Móvil](screenshots/parte-375.png) | [Escritorio](screenshots/parte-1280.png) |
| Gracias academia | [Móvil](screenshots/gracias-375.png) | [Escritorio](screenshots/gracias-1280.png) |
| Gracias comunidad | [Móvil](screenshots/parte-gracias-375.png) | [Escritorio](screenshots/parte-gracias-1280.png) |
| Checkouts ausentes | [Móvil](screenshots/missing-checkouts-375.png) | [Escritorio](screenshots/missing-checkouts-1280.png) |

![Imagen social de la comunidad](parte-og.png)

![Imagen social general](general-og.png)

## Cierre externo pendiente

1. Guardar los tres checkouts en Hostinger y reconstruir desde el commit
   aprobado de GitHub. No activar las fases de lanzamiento antes de su día.
2. Confirmar en producción los enlaces de compra y los metadatos.
3. Corregir el placeholder de Tally y la terminología del producto en Hotmart.
4. Migue debe aprobar los cambios legales antes de publicarlos.
