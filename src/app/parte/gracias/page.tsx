import type { Metadata } from "next";
import { CommerceShell } from "@/components/CommerceShell";
import { PARTE_ACCESS_MAX_HOURS } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Gracias por suscribirte a El Parte de Merlo",
  description: "Información de acceso al canal privado de WhatsApp de César Luis Merlo.",
  alternates: { canonical: "/parte/gracias" },
  robots: { index: false, follow: false },
};

export default function ParteGraciasPage() {
  return (
    <CommerceShell>
      <section className="commerce-thanks parte-thanks" aria-labelledby="parte-gracias-title">
        <span className="label commerce-label">El Parte de Merlo</span>
        <h1 id="parte-gracias-title">Tu suscripción a El Parte de Merlo está activa.</h1>
        <div className="commerce-access-note">
          <p>El equipo te agrega al canal de WhatsApp en un plazo máximo de <strong>{PARTE_ACCESS_MAX_HOURS} horas</strong>, al número que dejaste al comprar.</p>
        </div>
        <p className="commerce-note">Puedes cancelar cuando quieras desde tu cuenta de Hotmart.</p>
        <a className="btn commerce-button" href="https://consumer.hotmart.com">
          Ir a mi cuenta de Hotmart <span aria-hidden="true">↗</span>
        </a>
      </section>
    </CommerceShell>
  );
}
