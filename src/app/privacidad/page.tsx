import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";

export const metadata: Metadata = { title: "Política de privacidad" };

export default function PrivacidadPage() {
  return (
    <LegalPlaceholder
      title="Política de privacidad"
      description="Acá va a vivir la política de privacidad de Academia Merlo: qué datos pedimos en la lista de espera y en la inscripción, para qué los usamos y cómo dar de baja."
    />
  );
}
