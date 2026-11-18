# QA de fuentes locales, 17 de noviembre de 2026

Corrección del fallo de `next/font/google` en Hostinger. Comparación contra
el build correcto de `56cd450`, con `next start`, no contra dev.

- Archivo y Source Sans 3: WOFF2 oficiales idénticos, byte por byte, a los
  subconjuntos latinos del build anterior. Hashes y licencias en
  [src/fonts/README.md](../../../src/fonts/README.md).
- `npm run build`: correcto desde una carpeta `.next` vacía, bloqueando
  HTTP, HTTPS, TCP, TLS y fetch de Node mediante un preload en `NODE_OPTIONS`.
  Telemetría desactivada. Esto verifica el build; `npm ci` sigue necesitando
  acceso al registro de paquetes si las dependencias no están instaladas.
- `npm run lint`: correcto. `npm test`: 15 pruebas correctas.
- Navegador headless aislado, sin sesión personal: ocho rutas a 375 y
  1280 px, comparadas antes y después. HTTP 200, sin errores JavaScript,
  sin desbordamiento horizontal. Carga de fuentes desde el mismo origen,
  exactamente dos WOFF2, sin solicitudes de fuentes a Google.
- En las 16 comparaciones coinciden texto, familia, peso, variaciones y
  cajas de todos los H1/H2/H3, párrafos y bloques de planes seleccionados.
  También coinciden los anchos medidos para Source Sans 3 a 400/500/600/700.
  Revisión visual de las capturas móviles de `/inscripciones` y `/parte`.
- CLS observado: 0 en esas navegaciones locales sin throttling. No es una
  nueva medición de Lighthouse móvil ni una garantía de rendimiento remoto.

Resultados: [results.json](results.json). La configuración visual probada
usa `waitlist/off`; las cuatro combinaciones de banderas están cubiertas
por la suite existente. No se cambian los valores remotos ni las banderas.

El loader local calcula sus propias métricas de fallback. Las fuentes ya
cargadas conservan el diseño; los archivos y sus ejes no se modificaron.
Next.js permanece en 16.3.8. El entorno GLIBC/WASM de Hostinger requiere
verificación en un nuevo despliegue que tome el código actualizado de `main`.
