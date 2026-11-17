import Image from "next/image";
import type { PageMode } from "@/lib/site-config";
import { PARTE_LIVE } from "@/lib/site-config";
import { parteContent } from "@/lib/content";

/**
 * `anchorPrefix` existe para las páginas legales: ahí los anclas sueltas
 * (#programa, #cesar) no apuntan a nada porque esas secciones viven en la
 * home, así que se usan como "/#programa".
 */
export function Nav({ mode, anchorPrefix = "" }: { mode: PageMode; anchorPrefix?: string }) {
  const ctaHref = `${anchorPrefix}${mode === "waitlist" ? "#lista" : "#planes"}`;
  const ctaLabel = mode === "waitlist" ? "Quiero estar en la lista" : "Elegir mi plan";

  return (
    <header className="nav" id="inicio">
      <div className="wrap nav-inner">
        <a className="brand" href={anchorPrefix || "#inicio"} aria-label="Academia Merlo, inicio">
          <Image
            src="/academia-merlo-escudo.png"
            alt="Academia Merlo"
            width={1654}
            height={951}
            sizes="(max-width: 680px) 112px, 143px"
          />
        </a>
        <nav aria-label="Principal" className={PARTE_LIVE ? "has-parte" : undefined}>
          <a href={`${anchorPrefix}#programa`}>El programa</a>
          <a href={`${anchorPrefix}#cesar`}>César Merlo</a>
          {PARTE_LIVE && <a href="/parte" className="nav-parte">{parteContent.name}</a>}
          <a className="btn" href={ctaHref}>
            {ctaLabel}
            <small aria-hidden="true">↗</small>
          </a>
        </nav>
      </div>
    </header>
  );
}
