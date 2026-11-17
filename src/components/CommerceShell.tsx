import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { commerceContent as content, parteContent } from "@/lib/content";
import { PARTE_LIVE } from "@/lib/site-config";

export function CommerceShell({ children }: { children: ReactNode }) {
  return (
    <div className="commerce-page">
      <a className="skip" href="#contenido">
        {content.skip}
      </a>
      <header className="commerce-header" id="inicio">
        <div className="commerce-wrap commerce-header-inner">
          <Link href="/" aria-label={content.homeLabel}>
            <Image
              src="/academia-merlo-escudo.png"
              alt={content.brand}
              width={1654}
              height={951}
              sizes="126px"
              className="commerce-logo"
            />
          </Link>
          <div className="commerce-header-links">
            <Link href="/" className="commerce-home">
              {content.home}
            </Link>
            {PARTE_LIVE && (
              <Link href="/parte" className="commerce-home">
                {parteContent.name}
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="commerce-wrap commerce-main" id="contenido">
        {children}
      </main>
      <footer className="commerce-footer">
        <div className="commerce-wrap commerce-footer-inner">
          <p>{content.motto}</p>
          <nav aria-label={content.legal}>
            {PARTE_LIVE && <Link href="/parte">{parteContent.name}</Link>}
            <Link href="/privacidad">{content.privacy}</Link>
            <Link href="/terminos">{content.terms}</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
