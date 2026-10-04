"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Puerto 1:1 del comportamiento de los rails en merlo-v3.4/ajustes.js:
 * flechas con estado disabled, snap por posiciones reales de los hijos,
 * auto-avance cada 3.6s (pausable, respeta reduced-motion/hover/touch/foco/
 * visibilidad), y ocultar flechas cuando no hay overflow (ResizeObserver).
 */
export function useRail() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [manualPaused, setManualPaused] = useState<boolean | null>(null);
  const paused = manualPaused ?? reducedMotion;
  const [hidden, setHidden] = useState(true);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const visibleRef = useRef(false);
  const hoverRef = useRef(false);
  const touchRef = useRef(false);
  const pausedRef = useRef(false);

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
    (dir: 1 | -1, loop = false) => {
      const el = railRef.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const x = el.scrollLeft;
      const ps = positions();
      let target =
        dir > 0 ? ps.find((p) => p > x + 3) : [...ps].reverse().find((p) => p < x - 3);
      if (target === undefined) target = loop && dir > 0 ? 0 : dir > 0 ? max() : 0;
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
    pausedRef.current = paused;
  }, [paused]);

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
    paused,
    togglePaused: () => setManualPaused(!paused),
    hidden,
    prevDisabled,
    nextDisabled,
    move,
    onKeyDown,
  };
}
