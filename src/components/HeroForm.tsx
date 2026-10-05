"use client";

import { useRef, useState } from "react";
import { suggestEmail } from "@/lib/email-suggestion";

export const TALLY_CONTINUE_EVENT = "academia-merlo:tally-continue";

/**
 * Captura de email en el hero. Al enviar, notifica a <Register> (sección
 * #lista) por CustomEvent con el email para que monte/prefilee Tally, y
 * lleva el foco + scroll al tally-slot, igual que el script inline del
 * prototipo. Las dos áreas de estado (hero-status aquí, el status del
 * formulario en Register) son independientes, como en el HTML original.
 *
 * El email no se guarda en ningún lado: solo viaja al iframe de Tally.
 */
export function HeroForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // Si ya le ofrecimos una corrección y la ignoró, el segundo submit pasa:
  // es su dirección y puede tener razón.
  const offeredRef = useRef<string | null>(null);

  const handoff = (value: string) => {
    setBusy(true);
    window.dispatchEvent(new CustomEvent(TALLY_CONTINUE_EVENT, { detail: { email: value } }));
    setStatus("Continúa abajo: revisa tu email y completa el formulario para sumarte.");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slot = document.getElementById("tally-slot");
    (document.activeElement as HTMLElement | null)?.blur();
    slot?.focus({ preventScroll: true });
    slot?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
    window.setTimeout(() => setBusy(false), reduced ? 0 : 500);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();

    const typo = suggestEmail(value);
    if (typo && offeredRef.current !== value) {
      // Primera vez que vemos este typo: mostramos la corrección en vez de
      // mandar el email mal escrito a Tally. El siguiente submit sigue.
      offeredRef.current = value;
      setSuggestion(typo);
      return;
    }

    setSuggestion(null);
    handoff(value);
  };

  const onBlur = () => {
    const value = email.trim();
    if (!value) {
      setSuggestion(null);
      return;
    }
    setSuggestion(suggestEmail(value));
  };

  const applySuggestion = () => {
    if (!suggestion) return;
    setEmail(suggestion);
    setSuggestion(null);
    offeredRef.current = null;
    handoff(suggestion);
  };

  return (
    <form
      className="hero-form"
      id="hero-form"
      aria-label="Sumarte a la lista de espera"
      onSubmit={onSubmit}
    >
      <label className="visually-hidden" htmlFor="hero-email">
        Tu email
      </label>
      <input
        id="hero-email"
        ref={inputRef}
        aria-describedby="hero-status"
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder="nombre@ejemplo.com"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (suggestion) setSuggestion(null);
        }}
        onBlur={onBlur}
      />
      {/* Va antes del submit en el DOM a propósito: desde el input, el
          siguiente Tab tiene que ser la corrección, no el botón de enviar.
          La grilla la reubica visualmente debajo (ver globals.css).
          Alto reservado para que aparecer y desaparecer no mueva el hero.
          role=status la anuncia a lectores de pantalla. */}
      <div className="hero-suggestion" role="status">
        {suggestion && (
          <button type="button" className="hero-suggestion-btn" onClick={applySuggestion}>
            ¿Quisiste decir <strong>{suggestion}</strong>?
          </button>
        )}
      </div>
      <button className="btn" type="submit" aria-busy={busy}>
        Continuar con mi email
      </button>
      <div className="status" id="hero-status" role="status" aria-live="polite">
        {status}
      </div>
    </form>
  );
}
