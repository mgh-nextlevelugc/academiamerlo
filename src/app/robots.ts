import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

/**
 * Crawl permitido en todas las rutas, en las dos fases.
 *
 * Las rutas que no queremos indexadas antes del lanzamiento (/inscripciones
 * y /lista mientras la fase es "waitlist") lo resuelven con meta robots
 * noindex en su propia metadata, no con Disallow. Son incompatibles: un
 * Disallow impide rastrear la página, y si Google no la rastrea nunca lee el
 * noindex, así que una URL enlazada desde afuera igual puede terminar
 * indexada (sin descripción, pero indexada). Dejar pasar al crawler para que
 * lea el noindex es la señal fuerte.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
