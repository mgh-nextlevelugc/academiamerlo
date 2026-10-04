"use client";

import { useRail } from "@/hooks/useRail";
import { trayectoriaLinks, citadoPorLinks } from "@/lib/content";

type RailLink = { href: string; name: string; note: string };

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
  const { railRef, mediaRef, paused, togglePaused, hidden, prevDisabled, nextDisabled, move, onKeyDown } =
    useRail();

  return (
    <div className="media" ref={mediaRef}>
      <div className="media-head">
        <span className="label">{label}</span>
        <button
          type="button"
          className="auto-toggle"
          hidden={hidden}
          aria-controls={id}
          aria-label={`${paused ? "Reanudar" : "Pausar"} movimiento de ${ariaLabel}`}
          onClick={togglePaused}
        >
          {paused ? "Reanudar movimiento" : "Pausar movimiento"}
        </button>
        <div className={`arrows${hidden ? " is-hidden" : ""}`}>
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
        {links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
            <b>{link.name}</b>
            <span>{link.note}</span>
          </a>
        ))}
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
        <p className="media-note">
          Cada nombre enlaza a una fuente. Los medios citados no son patrocinadores de la
          academia.
        </p>
      </div>
    </section>
  );
}
