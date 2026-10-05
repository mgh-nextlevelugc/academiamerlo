import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Términos",
  description:
    "Condiciones de uso del sitio de Academia Merlo, de la lista de espera y de la inscripción al programa de César Luis Merlo.",
};

export default function TerminosPage() {
  return (
    <LegalPage
      title="Términos y condiciones"
      lastUpdated="Última actualización: 5 de octubre de 2026"
      intro="Estas son las condiciones de uso de este sitio, de la lista de espera y de la inscripción al programa."
      sections={[
        {
          heading: "Quiénes somos",
          paragraphs: [
            "Academia Merlo es el programa de periodismo en el mercado de pases de César Luis Merlo, producido por Roikon, con sede en el estado de Wyoming, Estados Unidos.",
          ],
        },
        {
          heading: "La lista de espera",
          paragraphs: [
            "Anotarse en la lista es gratis y no es una compra, una reserva ni una inscripción. Solo sirve para recibir novedades del programa y el aviso cuando abran las inscripciones.",
            "Puedes darte de baja cuando quieras escribiéndonos.",
          ],
        },
        {
          heading: "Inscripción y pago",
          paragraphs: [
            "La inscripción al programa se procesa a través de Hotmart. El precio, lo que incluye cada modalidad, los medios de pago disponibles y las condiciones de devolución son los que se muestren en el checkout al momento de la compra, y se rigen por los términos de esa plataforma.",
          ],
        },
        {
          heading: "Acceso al programa",
          paragraphs: [
            "El acceso es personal y para una sola persona. Las clases, los materiales descargables y el resto del contenido son de sus autores: no se pueden compartir, revender, redistribuir ni usar para armar un producto propio.",
            "Podemos dar de baja un acceso que se comparta o se use de alguna de esas formas.",
          ],
        },
        {
          heading: "Qué ofrece el programa y qué no",
          paragraphs: [
            "Academia Merlo es formación: enseña un método de trabajo periodístico. No ofrece ni garantiza empleo, contactos, resultados económicos ni la publicación de ninguna información.",
          ],
        },
        {
          heading: "Este sitio",
          paragraphs: [
            "Los medios mencionados aparecen como referencia de la trayectoria de César Luis Merlo o porque citaron su información. No son patrocinadores del programa ni tienen relación con él.",
          ],
        },
        {
          heading: "Cambios",
          paragraphs: [
            "Podemos actualizar estas condiciones. Si lo hacemos, la nueva versión queda publicada en esta página con su fecha.",
          ],
        },
        {
          heading: "Contacto",
          paragraphs: ["Para cualquier consulta sobre estas condiciones: admin@roikon.com"],
        },
      ]}
    />
  );
}
