import Image from "next/image";
import Link from "next/link";
import { cesarSocials } from "@/lib/content";

export function Footer() {
  return (
    <footer className="footer rule">
      <div className="wrap">
        <div className="footer-inner">
          <a className="brand" href="#inicio" aria-label="Academia Merlo, inicio">
            <Image
              src="/academia-merlo-negro.png"
              alt="Academia Merlo"
              width={1654}
              height={951}
              sizes="190px"
            />
          </a>
          <div className="footer-about">
            <p>
              Periodismo en el Mercado de Pases
              <br />
              con César Luis Merlo
              <br />
              <em>«La noticia no se mancha.»</em>
            </p>
            <div className="social-links">
              {cesarSocials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`César Luis Merlo en ${social.name}`}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
          <div className="credits">
            <span>Producido por</span>
            <div className="producer-logos">
              <a
                className="roikon"
                href="https://roikon.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* SVG propio y de confianza: <img> plano evita requerir
                    dangerouslyAllowSVG solo para este ícono. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/roikon-logo.svg" alt="Roikon" width={112} height={30} />
              </a>
              <a
                href="https://www.instagram.com/tedejoenorsai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Te Dejo en Orsai en Instagram"
              >
                <Image
                  className="tdeo-logo"
                  src="/tdeo-logo.png"
                  alt="Te Dejo en Orsai"
                  width={100}
                  height={100}
                  sizes="76px"
                />
              </a>
            </div>
            <small>© {new Date().getFullYear()} Academia Merlo</small>
          </div>
        </div>
        <p className="footer-note footer-legal">
          <Link href="/privacidad">Privacidad</Link>
          <span aria-hidden="true">·</span>
          <Link href="/terminos">Términos</Link>
        </p>
      </div>
    </footer>
  );
}
