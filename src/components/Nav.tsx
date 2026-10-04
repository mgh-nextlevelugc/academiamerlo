import Image from "next/image";
import type { PageMode } from "@/lib/site-config";

export function Nav({ mode }: { mode: PageMode }) {
  const ctaHref = mode === "waitlist" ? "#lista" : "#planes";
  const ctaLabel = mode === "waitlist" ? "Quiero estar en la lista" : "Elegir mi plan";

  return (
    <header className="nav" id="inicio">
      <div className="wrap nav-inner">
        <a className="brand" href="#inicio" aria-label="Academia Merlo, inicio">
          <Image
            src="/academia-merlo-escudo.png"
            alt="Academia Merlo"
            width={1654}
            height={951}
          />
        </a>
        <nav aria-label="Principal">
          <a href="#programa">El programa</a>
          <a href="#cesar">César Merlo</a>
          <a className="btn" href={ctaHref}>
            {ctaLabel}
            <small aria-hidden="true">↗</small>
          </a>
        </nav>
      </div>
    </header>
  );
}
