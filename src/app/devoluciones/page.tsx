import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Devoluciones",
  description:
    "Cómo funcionan las devoluciones de Academia Merlo una vez que el programa abra sus inscripciones.",
};

export default function DevolucionesPage() {
  return (
    <LegalPage
      title="Devoluciones"
      lastUpdated="Última actualización: 5 de octubre de 2026"
      intro="El programa todavía no abrió sus inscripciones, así que por ahora no hay compras ni devoluciones posibles. Esto explica cómo van a funcionar cuando abra."
      sections={[
        {
          heading: "Dónde se compra",
          paragraphs: [
            "La venta del programa se procesa a través de Hotmart. Las devoluciones se gestionan por esa misma plataforma, que es la que procesó el pago.",
          ],
        },
        {
          heading: "Plazo de garantía",
          paragraphs: [
            "El período de garantía aplicable es el que figure en el checkout al momento de tu compra, y se cuenta desde la fecha de pago.",
            "Ese plazo es una garantía comercial y se suma a los derechos que te otorgue la ley de tu país. Si tu legislación local te reconoce un plazo mayor para desistir de una compra a distancia, ese derecho sigue vigente.",
          ],
        },
        {
          heading: "Cómo pedirla",
          paragraphs: [
            "Desde tu cuenta de Hotmart, con la compra a la vista, puedes solicitar el reembolso dentro del plazo. Si tienes algún problema con ese trámite, escríbenos y te ayudamos a resolverlo.",
          ],
        },
        {
          heading: "Qué pasa después",
          paragraphs: [
            "Una vez aprobada la devolución, Hotmart procesa el reembolso por el mismo medio de pago que usaste. El acceso al programa se da de baja.",
          ],
        },
        {
          heading: "Contacto",
          paragraphs: ["Para cualquier consulta sobre una devolución: admin@roikon.com"],
        },
      ]}
    />
  );
}
