"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const esAr = new Intl.NumberFormat("es-AR");

/**
 * Count-up accesible para las cifras de audiencia (1.000M+ / 80M+ / 1M+):
 * arranca al entrar en viewport, formato es-AR, y respeta reduced-motion
 * mostrando el valor final de una. Siempre activo (no depende de
 * NEXT_PUBLIC_MOTION): es el mismo tipo de detalle que el ticker editorial.
 */
export function CountUp({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  /** Texto final exacto (ej. "1.000M+") para lectores de pantalla. */
  label: string;
}) {
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
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, reducedMotion]);

  const shown = reducedMotion ? value : display;

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {esAr.format(shown)}
        {suffix}
      </span>
      <span className="visually-hidden">{label}</span>
    </>
  );
}
