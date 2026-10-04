import type { Metadata } from "next";
import { AcademiaMerloPage } from "@/components/AcademiaMerloPage";
import { SITE_PHASE } from "@/lib/site-config";

export const metadata: Metadata =
  SITE_PHASE === "waitlist"
    ? {
        title: "Lista de espera",
        description:
          "Sumate a la lista de espera de Academia Merlo y recibí el aviso de apertura del curso de periodismo en el mercado de pases con César Luis Merlo.",
      }
    : {
        title: "Inscripciones abiertas",
        description:
          "Periodismo en el mercado de pases con César Luis Merlo. Standard y VIP, pago único, acceso de por vida.",
      };

export default function HomePage() {
  return <AcademiaMerloPage mode={SITE_PHASE === "waitlist" ? "waitlist" : "venta"} />;
}
