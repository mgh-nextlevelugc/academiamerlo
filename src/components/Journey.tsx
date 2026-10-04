"use client";

import { useEffect, useRef } from "react";
import { journeyModules } from "@/lib/content";
import type { PageMode } from "@/lib/site-config";

export function Journey({ mode }: { mode: PageMode }) {
  const programRef = useRef<HTMLDivElement>(null);
  const moduleRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const program = programRef.current;
    const modules = moduleRefs.current.filter((m): m is HTMLElement => Boolean(m));
    if (!program || modules.length === 0) return;

    let pending = false;
    const update = () => {
      pending = false;
      const y = window.innerHeight * 0.52;
      const first = modules[0].getBoundingClientRect();
      const last = modules[modules.length - 1].getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (y - first.top - 24) / (last.top - first.top)));
      program.style.setProperty("--journey-progress", reduced.matches ? "1" : String(p));
      let current = 0;
      modules.forEach((m, i) => {
        if (m.getBoundingClientRect().top + 24 < y) current = i;
      });
      modules.forEach((m, i) => {
        m.classList.toggle("is-current", i === current);
        m.classList.toggle("is-passed", i < current);
      });
    };
    const schedule = () => {
      if (!pending) {
        pending = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <section className="section journey" id="programa">
      <div className="wrap">
        <div className="section-head">
          <span className="label red">El método</span>
          <h2>La noticia empieza mucho antes de publicarla.</h2>
          <p>
            Del primer contacto a la decisión de contar una historia. Seis módulos para
            entender cómo se trabaja la información en el mercado de pases.
          </p>
        </div>
        <div className="program program-live" ref={programRef}>
          <div className="journey-line" aria-hidden="true">
            <i />
          </div>
          {journeyModules.map((module, i) => (
            <article
              className="module"
              key={module.n}
              ref={(el) => {
                moduleRefs.current[i] = el;
              }}
            >
              <span>{module.n}</span>
              <div>
                <h3>{module.title}</h3>
                <p>{mode === "waitlist" ? module.waitlist : module.venta}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
