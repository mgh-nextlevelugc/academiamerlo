import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Qué datos pedimos en la lista de espera de Academia Merlo, para qué los usamos y cómo darte de baja.",
};

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      lastUpdated="Última actualización: 5 de octubre de 2026"
      intro="Academia Merlo pide pocos datos y los usa para una sola cosa: avisarte cuando abra el programa. Esta página explica eso en concreto."
      sections={[
        {
          heading: "Quiénes somos",
          paragraphs: [
            "Academia Merlo es el programa de periodismo en el mercado de pases de César Luis Merlo, producido por Roikon, nombre comercial de Winnorts Group LLC, registrada en el estado de Wyoming, Estados Unidos.",
            "Esa es la empresa responsable de los datos que nos dejas.",
          ],
        },
        {
          heading: "Qué datos pedimos",
          paragraphs: [
            "Al anotarte en la lista de espera te pedimos tu email y algunos datos básicos para saber quién nos escribe: nombre, país y en qué perfil te reconoces.",
            "No pedimos datos de pago, documentos ni información sensible. Mientras el programa no esté abierto, no hay ninguna compra de por medio.",
          ],
        },
        {
          heading: "Para qué los usamos",
          paragraphs: [
            "Para comunicarnos contigo sobre Academia Merlo: el aviso de apertura y las novedades del programa. No los usamos para ninguna otra finalidad.",
            "No vendemos ni cedemos tus datos a terceros para que te ofrezcan sus productos.",
          ],
        },
        {
          heading: "Con quién los compartimos",
          paragraphs: [
            "Solo con los servicios que hacen funcionar esto: la herramienta donde vive el formulario y el servicio que envía los emails. Acceden a tus datos únicamente para prestarnos ese servicio.",
          ],
        },
        {
          heading: "Cuánto tiempo los guardamos",
          paragraphs: [
            "Los conservamos mientras quieras seguir recibiendo noticias nuestras. Si pides la baja, dejamos de escribirte y damos de baja tu dirección.",
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
            "La lista está pensada para personas mayores de 18 años. Si detectamos un registro de un menor sin autorización de quien ejerce su cuidado, lo damos de baja.",
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
