import type { Metadata } from "next";
import { CommerceShell } from "@/components/CommerceShell";

export const metadata: Metadata = {
  title: "Gracias por unirte",
  description: "Los próximos pasos para acceder a Academia Merlo desde Hotmart.",
  alternates: { canonical: "/gracias" },
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  return (
    <CommerceShell>
      <section className="commerce-thanks" aria-labelledby="gracias-title">
        <span className="label commerce-label">Academia Merlo</span>
        <h1 id="gracias-title">Ya eres parte de Academia Merlo.</h1>
        <ol className="commerce-steps academy-next-steps" role="list">
          <li><h2>Revisa tu email</h2><p>Hotmart te envía el acceso al programa.</p></li>
          <li><h2>Empieza por el Módulo 1</h2><p>Entra al área de miembros y empieza por el Módulo 1.</p></li>
          <li><h2>Si compraste VIP</h2><p>El equipo te escribe por email con el calendario de encuentros en vivo.</p></li>
        </ol>
        <p className="commerce-note">Si no ves el email en unos minutos, revisa spam o promociones.</p>
        <a className="btn commerce-button" href="https://consumer.hotmart.com">
          Ir a mis cursos en Hotmart <span aria-hidden="true">↗</span>
        </a>
      </section>
    </CommerceShell>
  );
}
