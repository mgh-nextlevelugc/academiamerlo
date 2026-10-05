import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Qué datos pide Academia Merlo, para qué los usa y cómo pedir el acceso, la corrección o la baja.",
};

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      lastUpdated="Última actualización: 5 de octubre de 2026"
      intro="Academia Merlo pide pocos datos y los usa para comunicarse contigo sobre el programa. Esta página explica cuáles, para qué y cómo pedir que los demos de baja."
      sections={[
        {
          heading: "Quiénes somos",
          paragraphs: [
            "Academia Merlo es el programa de periodismo en el mercado de pases de César Luis Merlo, producido por Roikon, con sede en el estado de Wyoming, Estados Unidos.",
          ],
        },
        {
          heading: "Qué datos pedimos",
          paragraphs: [
            "Para recibir noticias del programa te pedimos tu email y algunos datos básicos para saber quién nos escribe: nombre, país y en qué perfil te reconoces.",
            "Si te inscribes, el pago lo procesa Hotmart. Nosotros no pedimos ni almacenamos datos de tarjetas: esos quedan en manos de la plataforma de pago.",
            "No pedimos documentos ni información sensible.",
          ],
        },
        {
          heading: "Para qué los usamos",
          paragraphs: [
            "Para comunicarnos contigo sobre Academia Merlo: novedades del programa, apertura de inscripciones y, si te inscribes, lo necesario para darte acceso y acompañarte durante la cursada.",
            "No los usamos para ninguna otra finalidad, y no vendemos ni cedemos tus datos a terceros para que te ofrezcan sus productos.",
          ],
        },
        {
          heading: "Con quién los compartimos",
          paragraphs: [
            "Solo con los servicios que hacen funcionar el programa: la herramienta donde vive el formulario, el servicio que envía los emails y la plataforma que procesa los pagos y da acceso al contenido. Acceden a tus datos únicamente para prestarnos ese servicio.",
          ],
        },
        {
          heading: "Cuánto tiempo los guardamos",
          paragraphs: [
            "Conservamos tus datos mientras quieras seguir recibiendo noticias nuestras o mientras dure tu acceso al programa. Si pides la baja, dejamos de escribirte.",
          ],
        },
        {
          heading: "Tus derechos",
          paragraphs: [
            "Puedes pedir en cualquier momento acceder a tus datos, corregirlos, borrarlos o darte de baja de los envíos. Escríbenos y lo resolvemos.",
          ],
        },
        {
          heading: "Menores",
          paragraphs: [
            "El programa está pensado para personas mayores de 18 años. Si detectamos un registro de un menor sin autorización de quien ejerce su cuidado, lo damos de baja.",
          ],
        },
        {
          heading: "Cambios",
          paragraphs: [
            "Si cambiamos algo de esta política, lo actualizamos en esta página con su fecha.",
          ],
        },
        {
          heading: "Contacto",
          paragraphs: ["Para cualquier tema de datos o privacidad: admin@roikon.com"],
        },
      ]}
    />
  );
}
