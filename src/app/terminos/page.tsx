import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Términos",
  description:
    "Condiciones de uso del sitio de Academia Merlo y de la lista de espera del programa de César Luis Merlo.",
};

export default function TerminosPage() {
  return (
    <LegalPage
      title="Términos y condiciones"
      lastUpdated="Última actualización: 5 de octubre de 2026"
      intro="Estas son las condiciones de uso de este sitio y de la lista de espera. Cuando el programa abra sus inscripciones, las condiciones de compra se suman a estas."
      sections={[
        {
          heading: "Quiénes somos",
          paragraphs: [
            "Academia Merlo es el programa de periodismo en el mercado de pases de César Luis Merlo, producido por Roikon, nombre comercial de Winnorts Group LLC, registrada en el estado de Wyoming, Estados Unidos.",
          ],
        },
        {
          heading: "La lista de espera",
          paragraphs: [
            "Anotarse en la lista es gratis y no es una compra, una reserva ni una inscripción. Solo sirve para que te avisemos cuando el programa abra.",
            "Puedes darte de baja cuando quieras escribiéndonos.",
          ],
        },
        {
          heading: "Cuando abran las inscripciones",
          paragraphs: [
            "La venta del programa se procesa a través de Hotmart. El precio, lo que incluye cada modalidad, las formas de pago y las condiciones de devolución son las que se muestren en el checkout, y se rigen por los términos de esa plataforma.",
          ],
        },
        {
          heading: "Contenido y propiedad intelectual",
          paragraphs: [
            "Las clases, los materiales descargables y el resto del contenido del programa son de sus autores. El acceso es personal: no se pueden compartir, revender ni redistribuir.",
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
            "Los medios mencionados en el sitio aparecen como referencia de la trayectoria de César Luis Merlo o porque citaron su información. No son patrocinadores del programa ni tienen relación con él.",
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
