"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { MOTION_ENABLED } from "@/lib/site-config";

const useIsoEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Reveal al scroll detrás de NEXT_PUBLIC_MOTION. Anti-flicker: el contenido
 * es visible por defecto (sin clase .rv/.rv-dark) hasta que el efecto
 * confirma que el flag está en "on" y que no hay prefers-reduced-motion —
 * recién ahí se agrega la clase que oculta el elemento para animarlo al
 * entrar en viewport. Sin JS, con el flag apagado o con reduced-motion,
 * nunca se oculta nada.
 */
export function Reveal({
  children,
  dark = false,
  className = "",
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [inView, setInView] = useState(false);

  useIsoEffect(() => {
    if (!MOTION_ENABLED) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  const revealClass = active ? `${dark ? "rv-dark" : "rv"}${inView ? " in" : ""}` : "";
  const combined = [revealClass, className].filter(Boolean).join(" ");

  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} className={combined || undefined} style={style}>
      {children}
    </Component>
  );
}
