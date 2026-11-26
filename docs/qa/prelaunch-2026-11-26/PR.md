Los planes sin checkout parecían comprables y el texto de avance no reflejaba la habilitación por módulos de Hotmart. Ahora muestran "Próximamente" sin acción cuando falta la URL, conservan los avisos de build y usan el copy aprobado de progresión y pago único.

La comunidad conserva su lugar debajo de Standard y VIP. Tiene imagen social propia de 1200x630, tarjeta grande de Twitter y metadatos completos. Solo entra en el índice y sitemap con `launch/on`; las gracias siempre llevan noindex. La navegación de los legales apunta a planes en lanzamiento y a registro en espera. El contenido legal publicado y el código de Pixel no se modifican.

## Validación

- Build y lint correctos; 16 pruebas pasan, incluidas las cuatro combinaciones.
- Cuatro builds con servidor standalone: 64 comprobaciones de rutas/tamaños (375 y 1280 px), sin errores JavaScript ni scroll horizontal.
- Quinto build sin URLs: tres estados Próximamente, sin botones activos, comprobados en móvil y escritorio.
- Tally: carga real y definición pública revisadas; prefill, UTMs, avance y confirmación probados con iframe simulado, sin crear registros ficticios.
- Hotmart abre las tres ofertas; con Estados Unidos muestra US$174, US$497 y US$5.99 al mes. No se realizaron compras.
- [Reporte y evidencia](https://github.com/mgh-nextlevelugc/academiamerlo/blob/fix/prelaunch-corrections-2026-11-26/docs/qa/prelaunch-2026-11-26/README.md).

## Textos legales para aprobación de Migue

Los textos públicos todavía omiten la suscripción y el teléfono y usan otro email de contacto. Estas propuestas quedan únicamente en documentación y en este PR. No se publican al integrar el cambio.

Privacidad, agregar en datos y finalidades:

> En el formulario de lista de espera también puedes compartir tu número de WhatsApp de forma opcional. Si aceptas recibir novedades y el aviso de apertura por email o WhatsApp, podemos contactarte por esos medios.
>
> Si te suscribes a la comunidad privada de WhatsApp, te pedimos el número asociado a tu cuenta de WhatsApp, con código de país, para agregarte a la comunidad. La suscripción es mensual y el pago se procesa en Hotmart.
>
> Usamos ese número para darte acceso a la comunidad de WhatsApp y gestionar tu acceso mientras tu suscripción esté activa. Si dejaste un número equivocado, puedes solicitar su corrección escribiendo a info@roikon.com.

Términos, agregar una sección de comunidad:

> La comunidad privada de WhatsApp es una suscripción mensual independiente de la academia. El pago se procesa en Hotmart. El precio y las condiciones de la suscripción se muestran antes de confirmar la compra.
>
> Para darte acceso usamos el número asociado a tu WhatsApp, con código de país, que dejas al comprar. El equipo te agrega a la comunidad en un plazo máximo de 72 horas. Si dejaste un número equivocado, escríbenos a info@roikon.com.
>
> Solo publican los administradores. Tienes acceso a la comunidad mientras tu suscripción esté activa. Puedes cancelar desde tu cuenta de Hotmart.

Propuesta de contacto para ambas páginas: `info@roikon.com`. [Texto completo, ubicación y alcance](https://github.com/mgh-nextlevelugc/academiamerlo/blob/fix/prelaunch-corrections-2026-11-26/docs/qa/prelaunch-2026-11-26/legal-proposals.md).

## Pendientes externos

- Cargar los tres checkouts en Hostinger, reconstruir el commit integrado y verificar los botones en producción. Las banderas de lanzamiento no se cambian ahora.
- En Tally, cambiar el placeholder del selector de perfil a "Elige una opción".
- Alinear en Hotmart la denominación del producto de WhatsApp con la comunidad.
- Aprobar las propuestas legales antes de incorporarlas a las páginas.

## Capturas 375 y 1280 px

Las capturas principales usan `launch/on` con checkouts configurados.

### Inscripciones

| 375 px | 1280 px |
| --- | --- |
| ![Inscripciones móvil](https://raw.githubusercontent.com/mgh-nextlevelugc/academiamerlo/fix/prelaunch-corrections-2026-11-26/docs/qa/prelaunch-2026-11-26/screenshots/inscripciones-375.png) | ![Inscripciones escritorio](https://raw.githubusercontent.com/mgh-nextlevelugc/academiamerlo/fix/prelaunch-corrections-2026-11-26/docs/qa/prelaunch-2026-11-26/screenshots/inscripciones-1280.png) |

### Comunidad

| 375 px | 1280 px |
| --- | --- |
| ![Comunidad móvil](https://raw.githubusercontent.com/mgh-nextlevelugc/academiamerlo/fix/prelaunch-corrections-2026-11-26/docs/qa/prelaunch-2026-11-26/screenshots/parte-375.png) | ![Comunidad escritorio](https://raw.githubusercontent.com/mgh-nextlevelugc/academiamerlo/fix/prelaunch-corrections-2026-11-26/docs/qa/prelaunch-2026-11-26/screenshots/parte-1280.png) |

### Gracias academia

| 375 px | 1280 px |
| --- | --- |
| ![Gracias academia móvil](https://raw.githubusercontent.com/mgh-nextlevelugc/academiamerlo/fix/prelaunch-corrections-2026-11-26/docs/qa/prelaunch-2026-11-26/screenshots/gracias-375.png) | ![Gracias academia escritorio](https://raw.githubusercontent.com/mgh-nextlevelugc/academiamerlo/fix/prelaunch-corrections-2026-11-26/docs/qa/prelaunch-2026-11-26/screenshots/gracias-1280.png) |

### Gracias comunidad

| 375 px | 1280 px |
| --- | --- |
| ![Gracias comunidad móvil](https://raw.githubusercontent.com/mgh-nextlevelugc/academiamerlo/fix/prelaunch-corrections-2026-11-26/docs/qa/prelaunch-2026-11-26/screenshots/parte-gracias-375.png) | ![Gracias comunidad escritorio](https://raw.githubusercontent.com/mgh-nextlevelugc/academiamerlo/fix/prelaunch-corrections-2026-11-26/docs/qa/prelaunch-2026-11-26/screenshots/parte-gracias-1280.png) |

### Checkouts ausentes

![Próximamente sin botones activos](https://raw.githubusercontent.com/mgh-nextlevelugc/academiamerlo/fix/prelaunch-corrections-2026-11-26/docs/qa/prelaunch-2026-11-26/screenshots/missing-checkouts-375.png)

### Imagen social

![Imagen social de comunidad](https://raw.githubusercontent.com/mgh-nextlevelugc/academiamerlo/fix/prelaunch-corrections-2026-11-26/docs/qa/prelaunch-2026-11-26/parte-og.png)
