import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Permisivo pero presente: pasa Lighthouse Best Practices sin romper el
// embed de Tally (widget script + iframe). 'unsafe-inline' en script-src
// es necesario para los scripts inline que Next.js inyecta para hidratar
// (sin esto, Chrome los bloquea y React tira el error #412 de hidratación
// — lo encontramos así, con Lighthouse, no es paranoia). Nada de analytics
// todavía — se suma a esta lista cuando se activen Meta Pixel / GA4 con
// IDs reales.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://tally.so",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self' https://tally.so",
  "frame-ancestors 'self'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // .ts falla al compilar en hosts con glibc vieja (SWC nativo no carga
  // ahí y el loader de config de Next se rompe al intentar el fallback) —
  // .mjs lo evita por completo, no necesita compilarse. Mismo patrón que
  // roikon-website.
  outputFileTracingRoot: __dirname,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
        ],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
};

export default nextConfig;
