"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Comportamiento de los rails de medios: flechas con estado disabled, snap
 * por las posiciones reales de los hijos, teclado (flechas/Home/End) y
 * ocultar las flechas cuando no hay overflow (ResizeObserver).
 *
 * El prototipo traía además auto-avance cada 3.6s con un botón "Pausar
 * movimiento". Se quitaron los dos juntos: el botón era ruido visual, pero
 * sacarlo dejando el movimiento automático habría incumplido WCAG 2.2.2
 * (todo lo que se mueve solo más de 5s necesita una forma de pararlo). Sin
 * auto-avance no hace falta control: el rail se mueve solo si la persona lo
 * mueve, con flechas, arrastre o teclado.
 */
export function useRail() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const [hidden, setHidden] = useState(true);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const max = useCallback(() => {
    const el = railRef.current;
    if (!el) return 0;
    return Math.max(0, el.scrollWidth - el.clientWidth);
  }, []);

  const positions = useCallback(() => {
    const el = railRef.current;
    if (!el) return [0];
    const origin = el.getBoundingClientRect().left;
    const unique = new Set<number>();
    Array.from(el.children).forEach((child) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      unique.add(Math.min(max(), Math.round(rect.left - origin + el.scrollLeft)));
    });
    return [...unique];
  }, [max]);

  const move = useCallback(
    (dir: 1 | -1) => {
      const el = railRef.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const x = el.scrollLeft;
      const ps = positions();
      let target =
        dir > 0 ? ps.find((p) => p > x + 3) : [...ps].reverse().find((p) => p < x - 3);
      if (target === undefined) target = dir > 0 ? max() : 0;
      el.scrollTo({ left: target, behavior: reduced ? "instant" : "smooth" });
    },
    [positions, max],
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
    if (!el) return;

    const onScroll = () => sync();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    document.fonts?.ready.then(sync).catch(() => {});
    sync();

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [sync]);

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

  return { railRef, mediaRef, hidden, prevDisabled, nextDisabled, move, onKeyDown };
}
