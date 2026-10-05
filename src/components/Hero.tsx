import Image from "next/image";
import { HeroForm } from "./HeroForm";
import { CourseFacts } from "./CourseFacts";
import type { PageMode } from "@/lib/site-config";

export function Hero({ mode }: { mode: PageMode }) {
  return (
    <div className="wrap hero-shell">
      <section className="hero">
        <div>
          <span className="label red">Periodismo en el mercado de pases</span>
          <h1>
            <span>Lo que pasa</span>
            <span>
              <em>antes</em> del fichaje.
            </span>
          </h1>
          <p className="intro">
            Aprende con <strong>César Luis Merlo</strong> a construir fuentes, verificar
            información y contar lo que otros todavía están tratando de entender.
          </p>

          {mode === "waitlist" ? (
            <>
              <HeroForm />
              <p className="hero-note">
                Próxima apertura · Te avisamos por email · Registrarte es gratis ·{" "}
                <a href="#programa">Conoce el programa</a>
              </p>
            </>
          ) : (
            <>
              <div className="hero-actions">
                <a className="btn" href="#planes">
                  Elegir mi plan
                  <small aria-hidden="true">↗</small>
                </a>
                <a className="text-link" href="#programa">
                  Conoce el programa
                </a>
              </div>
              <p className="hero-note">Inscripciones abiertas · Curso online</p>
            </>
          )}
        </div>
        <div className="hero-visual">
          <figure className="portrait" style={{ margin: 0 }}>
            <Image
              src="/cesar-merlo-hero.jpg"
              alt="César Luis Merlo mostrando su teléfono"
              width={400}
              height={400}
              preload
            />
            <figcaption className="portrait-caption">
              <strong>César Luis Merlo</strong>
              <span>Periodista. Fuentes propias. Criterio propio.</span>
            </figcaption>
          </figure>
        </div>
      </section>
      <CourseFacts />
    </div>
  );
}
