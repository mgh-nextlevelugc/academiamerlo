"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Comportamiento de los rails de medios: flechas con estado disabled, snap
 * por las posiciones reales de los hijos, teclado (flechas/Home/End),
 * ocultar las flechas cuando no hay overflow (ResizeObserver) y auto-avance
 * cada 3.6s.
 *
 * El auto-avance se pausa solo con hover, touch, foco dentro del bloque,
 * pestaña en segundo plano o prefers-reduced-motion, y expone un control de
 * pausa explícito. Ese control no es decorativo: WCAG 2.2.2 pide una forma
 * de detener cualquier cosa que se mueva sola más de 5 segundos, así que el
 * movimiento automático y el botón van juntos.
 */
export function useRail() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const [hidden, setHidden] = useState(true);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const reducedMotion = usePrefersReducedMotion();
  const [manualPaused, setManualPaused] = useState<boolean | null>(null);
  const paused = manualPaused ?? reducedMotion;

  const visibleRef = useRef(false);
  const hoverRef = useRef(false);
  const touchRef = useRef(false);
  // El intervalo de auto-avance se crea una sola vez; lee el estado de pausa
  // por ref para no reiniciarse en cada toggle.
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const max = useCallback(() => {
    const el = railRef.current;
    if (!el) return 0;
    return Math.max(0, el.scrollWidth - el.clientWidth);
  }, []);

  /** Offsets donde arranca cada hijo, sin recortar al máximo de scroll. */
  const childStarts = useCallback(() => {
    const el = railRef.current;
    if (!el) return [0];
    const origin = el.getBoundingClientRect().left;
    const unique = new Set<number>();
    Array.from(el.children).forEach((child) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      unique.add(Math.round(rect.left - origin + el.scrollLeft));
    });
    return [...unique].sort((a, b) => a - b);
  }, []);

  const move = useCallback(
    (dir: 1 | -1, loop = false) => {
      const el = railRef.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const x = el.scrollLeft;
      const limit = max();
      const starts = childStarts();

      let target: number | undefined;
      if (dir > 0) {
        // En el auto-avance solo valen posiciones donde un item queda
        // alineado a la izquierda. Antes se recortaba al tope del scroll, y
        // ese descanso deja el primer item visible cortado por la mitad.
        target = starts.find((p) => p > x + 3 && (!loop || p <= limit));
        if (target === undefined) target = loop ? 0 : limit;
      } else {
        target = [...starts].reverse().find((p) => p < x - 3);
        if (target === undefined) target = 0;
      }
      el.scrollTo({ left: Math.min(target, limit), behavior: reduced ? "instant" : "smooth" });
    },
    [childStarts, max],
  );

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const m = max();
    const fits = m < 3;
    setHidden(fits);
    setPrevDisabled(fits || el.scrollLeft < 3);
    setNextDisabled(fits || el.scrollLeft > m - 3);
  }, [max]);

  useEffect(() => {
    const el = railRef.current;
    const media = mediaRef.current ?? el?.closest<HTMLDivElement>(".media") ?? null;
    if (!el) return;

    const onScroll = () => sync();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    document.fonts?.ready.then(sync).catch(() => {});
    sync();

    const io = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    const onEnter = () => {
      hoverRef.current = true;
    };
    const onLeave = () => {
      hoverRef.current = false;
    };
    media?.addEventListener("mouseenter", onEnter);
    media?.addEventListener("mouseleave", onLeave);

    const onDown = () => {
      touchRef.current = true;
    };
    const onUp = () => {
      touchRef.current = false;
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    const interval = window.setInterval(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const active = document.activeElement;
      const focusedInside = Boolean(active && media?.contains(active));
      if (
        !pausedRef.current &&
        !reduced &&
        visibleRef.current &&
        !hoverRef.current &&
        !touchRef.current &&
        !document.hidden &&
        !focusedInside &&
        max() > 3
      ) {
        move(1, true);
      }
    }, 3600);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      io.disconnect();
      media?.removeEventListener("mouseenter", onEnter);
      media?.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.clearInterval(interval);
    };
  }, [sync, move, max]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.target !== railRef.current) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        move(event.key === "ArrowRight" ? 1 : -1);
      }
      if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        const el = railRef.current;
        if (!el) return;
        el.scrollTo({ left: event.key === "Home" ? 0 : max(), behavior: "instant" });
      }
    },
    [move, max],
  );

  return {
    railRef,
    mediaRef,
    hidden,
    prevDisabled,
    nextDisabled,
    move,
    onKeyDown,
    paused,
    togglePaused: () => setManualPaused(!paused),
  };
}
