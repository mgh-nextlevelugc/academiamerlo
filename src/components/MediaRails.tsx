"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { trayectoriaLinks, citadoPorLinks } from "@/lib/content";

type RailLink = { href: string; name: string; note: string };

/** Píxeles por segundo. Igual en las dos tiras, así corren al mismo ritmo
 *  aunque una tenga cinco nombres y la otra tres. */
const SPEED = 26;

/**
 * Tira de medios: no es un carrusel por saltos sino una cinta que corre sola,
 * el mismo mecanismo que la cinta editorial (la lista repetida y un
 * translateX de exactamente una vuelta, en bucle, que cierra sin costura).
 *
 * El avance por pasos que había antes dependía de que la fila desbordara, así
 * que al achicar los items dejaba de moverse, y con tres nombres no se movía
 * nunca. La cinta corre igual con los items que haya.
 *
 * Se detiene con hover, con foco dentro, con prefers-reduced-motion y con el
 * botón de pausa, que WCAG 2.2.2 exige para cualquier cosa que se mueva sola
 * más de cinco segundos. Quieta no es una cinta congelada: pasa a ser una fila
 * que se recorre a mano (una sola vuelta, con scroll propio), para que no
 * quede ningún nombre inalcanzable.
 */
function MediaStrip({
  id,
  label,
  links,
  reverse,
  showNotes = true,
}: {
  id: string;
  label: string;
  links: readonly RailLink[];
  reverse?: boolean;
  showNotes?: boolean;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [manualPaused, setManualPaused] = useState<boolean | null>(null);
  const paused = manualPaused ?? reducedMotion;
  const labelId = `${id}-label`;

  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Ancho de una vuelta y cuántas hacen falta. Se mide en vez de estimarse
  // porque de ahí salen las dos cosas que no se pueden adivinar: el
  // desplazamiento exacto del bucle y la velocidad en píxeles por segundo.
  const [geom, setGeom] = useState<{ shift: number; laps: number } | null>(null);

  useEffect(() => {
    if (paused) return;
    const strip = stripRef.current;
    const track = trackRef.current;
    if (!strip || !track) return;

    const measure = () => {
      const kids = track.children;
      if (kids.length <= links.length) return;
      // offsetLeft entre el primer item de una vuelta y el de la siguiente:
      // da el ancho de la vuelta con sus márgenes incluidos, exacto.
      const shift =
        (kids[links.length] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft;
      if (shift <= 0) return;
      // Una sola vuelta no alcanza si es más angosta que lo que se ve: al
      // cerrar el bucle quedaría un hueco vacío a la derecha. Hacen falta
      // tantas vueltas como quepan en el visible, más la que se desplaza.
      const laps = Math.max(2, Math.ceil(strip.clientWidth / shift) + 1);
      setGeom((prev) =>
        prev && prev.shift === shift && prev.laps === laps ? prev : { shift, laps },
      );
    };

    // ResizeObserver entrega una primera medición al observar, así que no hace
    // falta llamar a measure() a mano dentro del efecto.
    const ro = new ResizeObserver(measure);
    ro.observe(strip);
    // Las tipografías cambian el ancho de los wordmarks al cargar.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [paused, links.length]);

  const lap = (key: string, clone: boolean) =>
    links.map((link) => (
      <a
        key={`${key}-${link.name}`}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        // Las vueltas extra solo existen para cerrar el bucle: son la misma
        // lista, así que para un lector de pantalla y para el teclado no están.
        aria-hidden={clone || undefined}
        tabIndex={clone ? -1 : undefined}
      >
        <b>{link.name}</b>
        {showNotes && <span>{link.note}</span>}
      </a>
    ));

  return (
    <div className="media">
      <div className="media-head">
        <span className="label" id={labelId}>
          {label}
        </span>
        <button
          type="button"
          className="strip-pause"
          aria-controls={id}
          aria-pressed={paused}
          aria-label={`${paused ? "Reanudar" : "Pausar"} el movimiento de ${label}`}
          onClick={() => setManualPaused(!paused)}
        >
          {paused ? "▶" : "❚❚"}
        </button>
      </div>
      <div
        className="media-strip"
        id={id}
        ref={stripRef}
        aria-labelledby={labelId}
        data-paused={paused ? "" : undefined}
        // Quieta la tira se puede recorrer, así que es un contenedor de scroll
        // y necesita entrar en el orden de tabulación.
        tabIndex={paused ? 0 : undefined}
      >
        <div
          className="media-track"
          ref={trackRef}
          data-reverse={reverse ? "" : undefined}
          // Sin la segunda linea los nombres quedan mas angostos y la vuelta
          // se repite mas veces en pantalla. Un poco mas de aire entre ellos
          // lo compensa y ademas es lo que pide un wordmark suelto.
          data-sparse={showNotes ? undefined : ""}
          style={
            geom
              ? ({
                  "--strip-shift": `${geom.shift}px`,
                  "--strip-seconds": `${(geom.shift / SPEED).toFixed(1)}s`,
                } as CSSProperties)
              : undefined
          }
        >
          {paused
            ? lap("0", false)
            : Array.from({ length: geom?.laps ?? 2 }, (_, i) => lap(String(i), i > 0))}
        </div>
      </div>
    </div>
  );
}

export function MediaRails() {
  return (
    <section className="section media-section">
      <div className="wrap">
        {/* Los ids llevan prefijo a propósito: la hoja del prototipo tiene
            reglas colgadas de #citados (min-width: 36%, entre otras) que de
            otro modo se cuelan solo en la segunda tira. */}
        <MediaStrip
          id="medios-trayectoria"
          label="Trayectoria y colaboraciones"
          links={trayectoriaLinks}
        />
        {/* En sentido contrario: dos tiras corriendo igual se leen como un
            solo bloque que se desliza. */}
        <MediaStrip
          id="medios-citados"
          label="Su información fue citada por"
          links={citadoPorLinks}
          reverse
          // Los tres dicen "Citó su información", que es textualmente lo que
          // ya dice el encabezado encima. Repetido cinco veces en pantalla no
          // informa, solo ensucia la tira. El dato se queda en content.ts.
          showNotes={false}
        />
        {/* Ya no se promete que todos enlacen: Olé y Radio La Red van sin
            fuente enlazable por ahora. */}
        <p className="media-note">Los medios mencionados no son patrocinadores de la academia.</p>
      </div>
    </section>
  );
}
