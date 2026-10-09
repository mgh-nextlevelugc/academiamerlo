"use client";

import { useRail } from "@/hooks/useRail";
import { trayectoriaLinks, citadoPorLinks } from "@/lib/content";

// href es opcional: hay medios de la trayectoria sin una nota firmada o
// página de autor a la que enlazar. Esos se renderizan como texto, no como
// un link muerto.
type RailLink = { href?: string; name: string; note: string };

function MediaRail({
  id,
  label,
  ariaLabel,
  links,
}: {
  id: string;
  label: string;
  ariaLabel: string;
  links: readonly RailLink[];
}) {
  const {
    railRef,
    mediaRef,
    hidden,
    prevDisabled,
    nextDisabled,
    move,
    onKeyDown,
    paused,
    togglePaused,
  } = useRail();

  return (
    <div className="media" ref={mediaRef}>
      <div className="media-head">
        <span className="label">{label}</span>
        <div className={`arrows${hidden ? " is-hidden" : ""}`}>
          {/* Control de pausa chico, en el mismo lenguaje visual que las
              flechas. No es decorativo: lo exige WCAG 2.2.2 porque el rail
              avanza solo. */}
          <button
            type="button"
            className="arrow arrow-pause"
            aria-controls={id}
            aria-pressed={paused}
            aria-label={`${paused ? "Reanudar" : "Pausar"} el movimiento de ${ariaLabel}`}
            onClick={togglePaused}
          >
            {paused ? "▶" : "❚❚"}
          </button>
          <button
            className="arrow"
            aria-controls={id}
            data-dir="-1"
            aria-label="Ver medios anteriores"
            disabled={prevDisabled}
            onClick={() => move(-1)}
          >
            ←
          </button>
          <button
            className="arrow"
            aria-controls={id}
            data-dir="1"
            aria-label="Ver más medios"
            disabled={nextDisabled}
            onClick={() => move(1)}
          >
            →
          </button>
        </div>
      </div>
      <div
        className="rail"
        id={id}
        ref={railRef}
        tabIndex={0}
        role="region"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
      >
        {links.map((link) =>
          link.href ? (
            <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
              <b>{link.name}</b>
              <span>{link.note}</span>
            </a>
          ) : (
            <div key={link.name} className="rail-item">
              <b>{link.name}</b>
              <span>{link.note}</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export function MediaRails() {
  return (
    <section className="section media-section">
      <div className="wrap">
        <MediaRail
          id="trayectoria"
          label="Trayectoria y colaboraciones"
          ariaLabel="Trayectoria y colaboraciones"
          links={trayectoriaLinks}
        />
        <MediaRail
          id="citados"
          label="Su información fue citada por"
          ariaLabel="Su información fue citada por"
          links={citadoPorLinks}
        />
        {/* Ya no se promete que todos enlacen: Olé y Radio La Red van sin
            fuente enlazable por ahora. */}
        <p className="media-note">
          Los medios mencionados no son patrocinadores de la academia.
        </p>
      </div>
    </section>
  );
}
