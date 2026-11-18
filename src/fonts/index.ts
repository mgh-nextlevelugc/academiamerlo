import localFont from "next/font/local";

// WOFF2 oficiales versionados: el build no necesita conectarse a Google.
// Conserva wght + wdth y el nombre Archivo usado también en globals.css.
// Origen, hashes y licencias: ./README.md.
export const archivo = localFont({
  src: "./archivo/latin.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  declarations: [
    { prop: "font-family", value: "Archivo" },
    { prop: "font-stretch", value: "62% 125%" },
  ],
});

export const sourceSans3 = localFont({
  // Un solo archivo variable; mantiene los cuatro pesos publicados antes.
  src: [
    { path: "./sourcesans3/latin.woff2", weight: "400" },
    { path: "./sourcesans3/latin.woff2", weight: "500" },
    { path: "./sourcesans3/latin.woff2", weight: "600" },
    { path: "./sourcesans3/latin.woff2", weight: "700" },
  ],
  style: "normal",
  display: "swap",
  variable: "--font-source-sans",
  declarations: [{ prop: "font-family", value: "Source Sans 3" }],
});
