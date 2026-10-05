import type { Metadata } from "next";
import { AcademiaMerloPage } from "@/components/AcademiaMerloPage";
import { SITE_PHASE } from "@/lib/site-config";

// En fase "waitlist" esta ruta es un duplicado de "/" (que ya muestra la
// waitlist): la dejamos sin indexar y apuntamos el canonical a "/" para no
// competir en buscadores. En fase "launch" pasa a ser la waitlist "viva"
// (para quienes la tengan guardada) y sí se indexa.
export const metadata: Metadata = {
  title: "Lista de espera",
  description:
    "Súmate a la lista de espera de Academia Merlo y recibe el aviso de apertura del programa de periodismo en el mercado de pases con César Luis Merlo.",
  alternates: SITE_PHASE === "waitlist" ? { canonical: "/" } : undefined,
  robots: SITE_PHASE === "waitlist" ? { index: false, follow: true } : undefined,
};

export default function ListaPage() {
  return <AcademiaMerloPage mode="waitlist" />;
}
