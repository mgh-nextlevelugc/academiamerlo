"use client";

import { useState } from "react";

export const TALLY_CONTINUE_EVENT = "academia-merlo:tally-continue";

/**
 * Captura de email en el hero. Al enviar, notifica a <Register> (sección
 * #lista) por CustomEvent con el email para que monte/prefilee Tally, y
 * lleva el foco + scroll al tally-slot, igual que el script inline del
 * prototipo. Las dos áreas de estado (hero-status aquí, el status del
 * formulario en Register) son independientes, como en el HTML original.
 */
export function HeroForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    window.dispatchEvent(new CustomEvent(TALLY_CONTINUE_EVENT, { detail: { email: value } }));
    setStatus("Continúa abajo: revisa tu email y completa el formulario para sumarte.");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slot = document.getElementById("tally-slot");
    (document.activeElement as HTMLElement | null)?.blur();
    slot?.focus({ preventScroll: true });
    slot?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
  };

  return (
    <form className="hero-form" id="hero-form" aria-label="Sumarte a la lista de espera" onSubmit={onSubmit}>
      <label className="visually-hidden" htmlFor="hero-email">
        Tu email
      </label>
      <input
        id="hero-email"
        aria-describedby="hero-status"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="nombre@ejemplo.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn" type="submit">
        Continuar con mi email
      </button>
      <div className="status" id="hero-status" role="status" aria-live="polite">
        {status}
      </div>
    </form>
  );
}
