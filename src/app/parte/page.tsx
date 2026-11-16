import type { Metadata } from "next";
import { CommerceShell } from "@/components/CommerceShell";
import { parteContent } from "@/lib/content";
import { HOTMART_CHECKOUT, PARTE_ACCESS_MAX_HOURS, SITE_PHASE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "El Parte de Merlo",
  description: parteContent.description,
  alternates: { canonical: "/parte" },
  robots: SITE_PHASE === "waitlist" ? { index: false, follow: false } : undefined,
};

export default function PartePage() {
  return (
    <CommerceShell>
      <div className="parte-grid">
        <section className="parte-intro" aria-labelledby="parte-title">
          <span className="label commerce-label">Canal privado de WhatsApp</span>
          <h1 id="parte-title">El Parte de Merlo</h1>
          <p className="commerce-description">{parteContent.description}</p>
          <h2>Qué recibes</h2>
          <ul className="parte-benefits" role="list">
            {parteContent.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
        </section>
        <section className="parte-subscription" aria-labelledby="parte-price">
          <p className="label">Suscripción mensual</p>
          <h2 className="parte-price" id="parte-price"><span>US$</span>{parteContent.price}</h2>
          <p className="parte-price-period">al mes</p>
          <h3>Cómo funciona</h3>
          <ol className="commerce-steps parte-steps" role="list">
            <li>Te suscribes con pago mensual.</li>
            <li>Dejas tu número de WhatsApp al comprar.</li>
            <li>El equipo te agrega al canal en un plazo máximo de {PARTE_ACCESS_MAX_HOURS} horas.</li>
          </ol>
          {HOTMART_CHECKOUT.parte ? (
            <a className="btn commerce-button" href={HOTMART_CHECKOUT.parte} target="_blank" rel="noopener noreferrer">
              Suscribirme en Hotmart <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <p className="commerce-checkout-pending">La suscripción no está disponible en este momento.</p>
          )}
        </section>
      </div>
    </CommerceShell>
  );
}
