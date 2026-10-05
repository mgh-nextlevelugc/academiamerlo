import type { Metadata } from "next";
import { AcademiaMerloPage } from "@/components/AcademiaMerloPage";
import { SITE_PHASE } from "@/lib/site-config";

// El title va en `absolute` a proposito: el template "%s · Academia Merlo"
// del layout raiz no aplica a "/", porque page.tsx y layout.tsx son el mismo
// segmento de ruta. Sin esto la home sale titulada solo "Lista de espera",
// sin marca, que es justo la pestana y el resultado de busqueda que mas
// importan. El resto de las rutas si heredan el template.
export const metadata: Metadata =
  SITE_PHASE === "waitlist"
    ? {
        title: { absolute: "Academia Merlo · Lista de espera" },
        description:
          "Súmate a la lista de espera de Academia Merlo y recibe el aviso de apertura del programa de periodismo en el mercado de pases con César Luis Merlo.",
      }
    : {
        title: { absolute: "Academia Merlo · Inscripciones abiertas" },
        description:
          "Periodismo en el mercado de pases con César Luis Merlo. Standard y VIP, pago único, acceso de por vida.",
      };

export default function HomePage() {
  return <AcademiaMerloPage mode={SITE_PHASE === "waitlist" ? "waitlist" : "venta"} />;
}
