"use client";

import { useEffect, useState } from "react";
import { useTallyEmbed } from "@/hooks/useTallyEmbed";
import { TALLY_CONTINUE_EVENT } from "./HeroForm";
import { TALLY_FORM_ID } from "@/lib/site-config";

export function Register() {
  const { configured, slotRef, frameHostRef, mount, status, fallbackHref } =
    useTallyEmbed(TALLY_FORM_ID);
  const [mockStatus, setMockStatus] = useState("");
  const [mockEmailValue, setMockEmail] = useState("");

  useEffect(() => {
    const onContinue = (event: Event) => {
      const email = (event as CustomEvent<{ email: string }>).detail?.email ?? "";
      if (configured) {
        mount(email);
      } else {
        setMockEmail(email);
      }
    };
    window.addEventListener(TALLY_CONTINUE_EVENT, onContinue);
    return () => window.removeEventListener(TALLY_CONTINUE_EVENT, onContinue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configured]);

  const onMockSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMockStatus(
      "Vista de prueba: los campos están completos. No se guardó ni se envió ningún dato.",
    );
  };

  return (
    <section className="section register" id="lista">
      <div className="wrap register-grid">
        <div>
          <span className="label red">La próxima noticia puede ser tuya</span>
          <h2>El primer paso empieza acá.</h2>
          <p>Sumate a la lista y recibí por email el aviso de apertura de Academia Merlo.</p>
          <p className="form-note">Registrarte es gratis y no implica comprar el curso.</p>
        </div>
        <div
          className="tally-slot"
          id="tally-slot"
          ref={slotRef}
          tabIndex={-1}
          aria-label="Formulario de lista de espera"
        >
          <div id="tally-frame-host" ref={frameHostRef} />

          <form id="waitlist-form" className="js-waitlist" hidden={configured} onSubmit={onMockSubmit}>
            <label className="field" htmlFor="nombre">
              Tu nombre
              <input
                id="nombre"
                name="nombre"
                type="text"
                autoComplete="given-name"
                placeholder="¿Cómo te llamás?"
                required
                maxLength={100}
              />
            </label>
            <label className="field" htmlFor="email">
              Tu email
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="nombre@ejemplo.com"
                required
                defaultValue={mockEmailValue}
                key={mockEmailValue}
              />
            </label>
            <label className="consent">
              <input type="checkbox" required />
              Quiero recibir novedades y el aviso de apertura de Academia Merlo. Puedo darme de
              baja cuando quiera.
            </label>
            <button className="btn" type="submit">
              Quiero estar en la lista <small aria-hidden="true">↗</small>
            </button>
            <p className="form-note">Maqueta visual del formulario de Tally. No guarda ni envía datos.</p>
            <div className="status" role="status" aria-live="polite">
              {mockStatus}
            </div>
          </form>

          <p id="tally-status" className="form-note" role="status" aria-live="polite">
            {status}
          </p>
          <a
            id="tally-fallback"
            className="text-link"
            hidden={!fallbackHref}
            href={fallbackHref ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir el formulario en otra pestaña ↗
          </a>
        </div>
      </div>
    </section>
  );
}
