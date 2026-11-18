# Fuentes locales

Los WOFF2 se guardan en el repositorio para que Hostinger pueda compilar sin
acceso a Google Fonts. No se generan ni descargan durante `npm run build`.
Se obtuvieron de Google Fonts el 17 de noviembre de 2026 y se compararon
byte por byte con el último build correcto: no cambian los dibujos ni las
métricas de los glifos. No se modificaron ni se reconvirtieron los archivos.

| Archivo | Bytes | Ejes incluidos | Uso CSS |
| --- | ---: | --- | --- |
| `archivo/latin.woff2` | 90096 | `wght` 100-900, `wdth` 62-125 | Peso variable 100-900 y ancho 62%-125% |
| `sourcesans3/latin.woff2` | 28804 | `wght` 200-900 | Pesos 400, 500, 600 y 700 |

El subconjunto latino incluye las tildes, la ñ, la ü y los signos de apertura
del español. Los caracteres fuera de esos archivos usan la pila de fallback
del sitio. No se distribuyen los subconjuntos cirílico, griego o vietnamita.
`next/font/local` conserva `display: swap`, precarga y ajuste del fallback.
Solo se descargan dos WOFF2, aunque Source Sans 3 declare cuatro pesos.

## Procedencia

- Archivo: [WOFF2 oficial](https://fonts.gstatic.com/s/archivo/v25/k3kQo8UDI-1M0wlSfdnoLmvDIaI.woff2),
  [CSS de origen](https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap),
  [licencia incluida](archivo/OFL.txt),
  [licencia upstream](https://github.com/google/fonts/blob/main/ofl/archivo/OFL.txt).
- Source Sans 3: [WOFF2 oficial](https://fonts.gstatic.com/s/sourcesans3/v20/nwpStKy2OAdR1K-IwhWudF-R3w8aZejf5Hc.woff2),
  [CSS de origen](https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&display=swap),
  [licencia incluida](sourcesans3/OFL.txt),
  [licencia upstream](https://github.com/google/fonts/blob/main/ofl/sourcesans3/OFL.txt).

Ambas se distribuyen con su licencia SIL Open Font License 1.1.

SHA-256:

```text
4c98b9d490d1698ec95f2ff17a6c7d0e72691864c0c5d7bc2a2c161b45afe5ad  archivo/latin.woff2
587435ca9d90732b8c1ce4958222c6ad3ade2b875500188e1d318efbcb61f4c5  sourcesans3/latin.woff2
```

Al actualizar las fuentes, verificar primero pesos, ejes y caracteres;
actualizar procedencia y hashes; ejecutar un build sin red y revisar el
resultado con `next start` a 375 px y escritorio. No agregar un descargador
al proceso de build, porque volvería a introducir la dependencia externa.
