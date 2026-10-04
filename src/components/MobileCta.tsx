"use client";

import { useEffect, useState } from "react";
import type { PageMode } from "@/lib/site-config";

/**
 * Puerto de la barra fija móvil + supresión cuando el formulario/tally-slot
 * está visible o hay teclado abierto (IntersectionObserver + visualViewport),
 * igual que el script inline de merlo-v3.4.
 */
export function MobileCta({ mode }: { mode: PageMode }) {
  const [suppressed, setSuppressed] = useState(false);
  const href = mode === "waitlist" ? "#lista" : "#planes";
  const label = mode === "waitlist" ? "Quiero estar en la lista" : "Elegir mi plan";

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".hero-form, .tally-slot"),
    );
    const visible = new Set<Element>();

    const sync = () => {
      const active = document.activeElement;
      const editing = Boolean(active?.matches("input,textarea,select,iframe"));
      const keyboardLikely = Boolean(
        window.visualViewport && window.visualViewport.height < window.innerHeight * 0.75,
      );
      setSuppressed(Boolean(editing || keyboardLikely || visible.size));
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) =>
        entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target),
      );
      sync();
    }, { threshold: 0 });
    targets.forEach((el) => observer.observe(el));

    document.addEventListener("focusin", sync);
    const onFocusOut = () => requestAnimationFrame(sync);
    document.addEventListener("focusout", onFocusOut);
    window.addEventListener("blur", onFocusOut);
    window.addEventListener("focus", sync);
    window.visualViewport?.addEventListener("resize", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", sync);
      document.removeEventListener("focusout", onFocusOut);
      window.removeEventListener("blur", onFocusOut);
      window.removeEventListener("focus", sync);
      window.visualViewport?.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <div className={`mobile-cta${suppressed ? " is-suppressed" : ""}`}>
      <a className="btn" href={href}>
        {label}
        <small aria-hidden="true">↗</small>
      </a>
    </div>
  );
}
