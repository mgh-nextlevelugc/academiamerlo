import { fileURLToPath } from "node:url";
import path from "node:path";
import { PHASE_PRODUCTION_BUILD } from "next/constants.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Permisivo pero presente: pasa Lighthouse Best Practices sin romper el
// embed de Tally (widget script + iframe). 'unsafe-inline' en script-src
// es necesario para los scripts inline que Next.js inyecta para hidratar
// (sin esto, Chrome los bloquea y React tira el error #412 de hidratación:
// lo encontramos así, con Lighthouse, no es paranoia). Meta Pixel solo se
// carga cuando NEXT_PUBLIC_META_PIXEL_ID tiene un ID configurado.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://tally.so https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.facebook.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.facebook.com https://connect.facebook.net",
  "frame-src 'self' https://tally.so",
  "frame-ancestors 'self'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // .ts falla al compilar en hosts con glibc vieja (SWC nativo no carga
  // ahí y el loader de config de Next se rompe al intentar el fallback):
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

export default function config(phase) {
  if (phase === PHASE_PRODUCTION_BUILD) {
    for (const product of ["STANDARD", "VIP", "PARTE"]) {
      const key = `NEXT_PUBLIC_HOTMART_CHECKOUT_${product}`;
      if (!process.env[key]?.trim()) {
        console.warn(`[Academia Merlo] Falta ${key}. No habrá enlace de compra para este producto. Configura la variable y vuelve a construir.`);
      }
    }
  }
  return nextConfig;
}
