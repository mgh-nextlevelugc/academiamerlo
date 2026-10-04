import { Archivo, Source_Sans_3 } from "next/font/google";

// Reemplaza la fuente embebida en base64 (ArchivoDisplay, ~888KB) del
// prototipo. Variable en wght + wdth para igualar los font-variation-settings
// usados en program-live/stat/portrait-caption.
export const archivo = Archivo({
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

export const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-source-sans",
});
