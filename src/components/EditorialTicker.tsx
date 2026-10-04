"use client";

import { useState } from "react";
import { editorialPhrases } from "@/lib/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// 2 mitades idénticas de 4 repeticiones cada una (8 en total, como en el
// prototipo) para que la animación `translateX(-50%)` haga loop sin salto.
const REPS_PER_HALF = 4;

function PhraseSet({ keyPrefix }: { keyPrefix: string }) {
  return (
    <>
      {Array.from({ length: REPS_PER_HALF }).map((_, repIndex) =>
        editorialPhrases.map((phrase, i) => (
          <span key={`${keyPrefix}-${repIndex}-${i}`} style={{ display: "contents" }}>
            <span className="phrase">{phrase}</span>
            <span className="tick" aria-hidden="true">
              ↗
            </span>
          </span>
        )),
      )}
    </>
  );
}

export function EditorialTicker() {
  const reducedMotion = usePrefersReducedMotion();
  const [manualPaused, setManualPaused] = useState<boolean | null>(null);
  const paused = manualPaused ?? reducedMotion;

  const label = paused ? "Reanudar el movimiento de la cinta" : "Pausar el movimiento de la cinta";

  return (
    <div
      className="editorial-band"
      role="group"
      aria-label={`${editorialPhrases.join(" ")}`}
      data-paused={paused ? "" : undefined}
    >
      <div className="band-viewport">
        <div className="band-track" aria-hidden="true">
          <PhraseSet keyPrefix="a" />
          <PhraseSet keyPrefix="b" />
        </div>
      </div>
      <button
        type="button"
        className="band-pause"
        aria-pressed={paused}
        aria-label={label}
        onClick={() => setManualPaused(!paused)}
      >
        {paused ? "▶" : "❚❚"}
      </button>
    </div>
  );
}
