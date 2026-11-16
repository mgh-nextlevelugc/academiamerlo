import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function CommerceShell({ children }: { children: ReactNode }) {
  return (
    <div className="commerce-page">
      <a className="skip" href="#contenido">Ir al contenido</a>
      <header className="commerce-header" id="inicio">
        <div className="commerce-wrap commerce-header-inner">
          <Link href="/" aria-label="Academia Merlo, inicio">
            <Image
              src="/academia-merlo-escudo.png"
              alt="Academia Merlo"
              width={1654}
              height={951}
              sizes="126px"
              className="commerce-logo"
            />
          </Link>
          <Link href="/" className="commerce-home">Volver al inicio</Link>
        </div>
      </header>
      <main className="commerce-wrap commerce-main" id="contenido">{children}</main>
      <footer className="commerce-footer">
        <div className="commerce-wrap commerce-footer-inner">
          <p>La noticia no se mancha.</p>
          <nav aria-label="Información legal">
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/terminos">Términos</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
