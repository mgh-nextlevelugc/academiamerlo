import type { NextConfig } from "next";

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

const nextConfig: NextConfig = {
  // Hay otro package-lock.json en /Users/migue_h/Desktop/roikon (fuera de
  // este repo); sin esto, Next infiere mal la raíz del workspace.
  outputFileTracingRoot: process.cwd(),
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
