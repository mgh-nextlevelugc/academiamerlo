// Sugerencia de typos de dominio al estilo mailcheck, sin dependencias.
// La sugerencia nunca corrige sola: se le ofrece a la persona y ella decide.

const KNOWN_DOMAINS = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com",
  "icloud.com",
  "live.com",
] as const;

// Dominios legítimos que quedan a distancia corta de los de arriba y que por
// eso nunca hay que marcar como error. El caso claro es mail.com, que está a
// distancia 1 de gmail.com y es un proveedor real.
const NEVER_SUGGEST = new Set<string>([
  ...KNOWN_DOMAINS,
  "mail.com",
  "gmx.com",
  "aol.com",
  "me.com",
  "proton.me",
  "protonmail.com",
  "yandex.com",
  "zoho.com",
]);

// Gmail no tiene variantes por país: todo Gmail es @gmail.com, así que
// cualquier gmail.com.algo es un error. Hotmail, Yahoo y Live sí tuvieron
// dominios por país reales y en uso en LATAM (hotmail.com.ar, yahoo.com.mx),
// así que ahí no sugerimos nada: "corregir" una dirección válida es peor que
// no decir nada.
const NO_COUNTRY_VARIANT = new Set<string>(["gmail.com"]);

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) {
      row[j] = Math.min(
        prev[j] + 1,
        row[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = row;
  }
  return prev[b.length];
}

/**
 * Devuelve el email corregido sugerido, o null si no hay nada que sugerir.
 * Solo mira la parte de dominio: un dominio corporativo o desconocido
 * (tycsports.com) queda intacto porque no se parece a ninguno de la lista.
 */
export function suggestEmail(value: string): string | null {
  const trimmed = value.trim();
  const at = trimmed.lastIndexOf("@");
  if (at < 1 || at === trimmed.length - 1) return null;

  const local = trimmed.slice(0, at);
  const domain = trimmed.slice(at + 1).toLowerCase();
  if (NEVER_SUGGEST.has(domain)) return null;

  for (const known of KNOWN_DOMAINS) {
    if (NO_COUNTRY_VARIANT.has(known) && domain.startsWith(`${known}.`)) {
      return `${local}@${known}`;
    }
  }

  for (const known of KNOWN_DOMAINS) {
    if (levenshtein(domain, known) <= 2) return `${local}@${known}`;
  }

  return null;
}
