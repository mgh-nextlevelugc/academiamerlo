// Fase del sitio: "waitlist" muestra la lista de espera en "/", "launch" muestra
// la venta en "/" y mueve la waitlist a "/lista". Ver docs/CHANGELOG del prototipo
// merlo-v3.4 (addendum 3-oct) para el razonamiento completo del switch.
export type SitePhase = "waitlist" | "launch";

// Modo de contenido de una página concreta, distinto de SitePhase: "/"
// cambia de modo según la fase, pero "/lista" siempre es "waitlist" y
// "/inscripciones" siempre es "venta", sin importar la fase.
export type PageMode = "waitlist" | "venta";

export const SITE_PHASE: SitePhase =
  process.env.NEXT_PUBLIC_PHASE === "launch" ? "launch" : "waitlist";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://academiamerlo.com";

// Vacío -> la maqueta local del formulario se muestra con su aviso ("Maqueta
// visual del formulario de Tally. No guarda ni envía datos.") en vez de montar
// el iframe real.
export const TALLY_FORM_ID = process.env.NEXT_PUBLIC_TALLY_FORM_ID ?? "";

// "on" activa reveals/stagger/count-up con IntersectionObserver; "off" (default)
// deja todo visible de entrada, sin animación de scroll.
export const MOTION_ENABLED = process.env.NEXT_PUBLIC_MOTION === "on";

export const HOTMART_CHECKOUT = {
  standard: process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_STANDARD ?? "",
  vip: process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_VIP ?? "",
};
