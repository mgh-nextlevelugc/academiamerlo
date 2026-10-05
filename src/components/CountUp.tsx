"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Separador de miles ".", fijo, sin depender de un locale regional: la
// audiencia es LATAM-wide (sobre todo México), donde Intl.NumberFormat
// con "es-MX"/"es-419" usa coma, lo que rompería el "1.000M+" que el brief
// pide mantener exacto. Esto da el mismo resultado en cualquier entorno/
// versión de Node, sin sorpresas de locale/ICU.
function formatThousands(n: number) {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Count-up accesible para las cifras de audiencia (1.000M+ / 80M+ / 1M+):
 * arranca al entrar en viewport y respeta reduced-motion mostrando el
 * valor final de una. Siempre activo (no depende de NEXT_PUBLIC_MOTION):
 * es el mismo tipo de detalle que el ticker editorial.
 */
export function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // Arranca en el valor final: SSR, no-JS o JS lento nunca muestran "0M+".
  // El salto a 0 ocurre recién cuando el IntersectionObserver confirma que
  // vamos a animar, como paso inicial de esa misma animación.
  const [display, setDisplay] = useState(value);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        setDisplay(0);
        const duration = 900;
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(value * eased));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      // Sin esto la animación seguía corriendo tras desmontar o tras activar
      // reduced motion a mitad de camino.
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, reducedMotion]);

  const shown = reducedMotion ? value : display;

  // Un solo nodo con la cifra. Antes habia dos (uno animado con aria-hidden
  // y otro visually-hidden con el valor final) para que un lector de pantalla
  // no leyera un valor intermedio, pero eso dejaba el numero duplicado en el
  // HTML servido ("1.000M+1.000M+"), que es lo que ven los scrapers y el
  // extractor de texto de Google. No hace falta: un elemento que no es live
  // region no se anuncia al cambiar, solo cuando la persona navega hasta el,
  // y para entonces la animacion (900ms) ya termino.
  return (
    <span ref={ref}>
      {formatThousands(shown)}
      {suffix}
    </span>
  );
}
