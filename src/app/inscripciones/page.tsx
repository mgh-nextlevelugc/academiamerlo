import type { Metadata } from "next";
import { AcademiaMerloPage } from "@/components/AcademiaMerloPage";
import { SITE_PHASE } from "@/lib/site-config";

// Antes del switch de lanzamiento esta ruta existe (para poder compartirla
// en preview) pero no se indexa. Al pasar a NEXT_PUBLIC_PHASE=launch, "/"
// ya muestra lo mismo, así que el canonical apunta ahí.
export const metadata: Metadata = {
  title: "Inscripciones",
  description:
    "Periodismo en el mercado de pases con César Luis Merlo. Standard y VIP, pago único, acceso de por vida.",
  alternates: SITE_PHASE === "launch" ? { canonical: "/" } : undefined,
  robots: SITE_PHASE === "waitlist" ? { index: false, follow: false } : undefined,
};

export default function InscripcionesPage() {
  return <AcademiaMerloPage mode="venta" />;
}
