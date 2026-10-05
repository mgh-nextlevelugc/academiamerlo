import type { Metadata } from "next";
import { archivo, sourceSans3 } from "@/fonts";
import { SITE_URL } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Academia Merlo",
    template: "%s · Academia Merlo",
  },
  description:
    "Periodismo en el mercado de pases con César Luis Merlo. Aprende a construir fuentes, verificar información y publicar con criterio.",
  openGraph: {
    siteName: "Academia Merlo",
    // Audiencia LATAM-wide, sobre todo México: es_MX en vez de es_AR.
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${archivo.variable} ${sourceSans3.variable}`}>
      <body>{children}</body>
    </html>
  );
}
