import Link from "next/link";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function LegalPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <a className="skip" href="#contenido">
        Ir al contenido
      </a>
      <Nav mode="waitlist" />
      <main id="contenido">
        <section className="section">
          <div className="wrap" style={{ maxWidth: "70ch" }}>
            <span className="label red">Pendiente de publicación</span>
            <h1 style={{ fontSize: "clamp(32px,4vw,48px)", marginBottom: 24 }}>{title}</h1>
            <p>{description}</p>
            <p>
              TODO: redactar el texto legal definitivo antes de abrir la captación de datos.
              Este es un placeholder de staging: no publicar el dominio productivo sin esta
              página terminada.
            </p>
            <p>
              <Link className="text-link" href="/">
                ← Volver al inicio
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer note="Página pendiente. No usar como referencia legal definitiva." />
    </>
  );
}
